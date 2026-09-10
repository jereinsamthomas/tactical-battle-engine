// ============================================================================
// TACTICAL BATTLE TURN ENGINE (§12/§16/§27)
// ORDER OF OPERATIONS (never let the LLM reorder these):
//   user intent -> physical validation -> persona counter selection ->
//   deterministic resolution -> probabilities -> timeline -> structured verdict
// ============================================================================

import { validateAction, passLaneThreats } from "./validator";
import { selectCounter } from "./personas";
import { computePitchControl, controlAt } from "./pitchControl";
import { xTAt } from "./xt";
import {
  arrivalTime, dist, passTravelTime, controlTime, clamp,
  DEFAULT_PHYSICS, type PhysicsConfig,
} from "./physics";
import type {
  BattleState, Keyframe, Outcome, PersonaId, SimulationResult, UserAction,
} from "./types";

export function resolveTurn(
  state: BattleState,
  action: UserAction,
  persona: PersonaId,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): SimulationResult {
  const physical = validateAction(state, { ballCarrierId: action.ballCarrierId, pass: action.pass }, cfg);

  // ---- where is the threat? (drives counter selection) ----
  const carrier = [...state.homePlayers, ...state.awayPlayers]
    .find((p) => p.id === action.ballCarrierId);
  const targetPt = action.pass
    ? (pointOf(state, action.pass.toPlayerId) ?? action.pass.toPoint ?? null)
    : null;
  const threatPoint = targetPt ?? { x: state.ball.x, y: state.ball.y };
  const ballT = physical.ballArrivalSec;
  const counter = selectCounter(
    { state, threatPoint, timeToBallSec: ballT }, persona, cfg
  );

  // ---- lane pressure after the counter shifts defenders ----
  const laneBlocked = !physical.checks.find((c) => c.name === "passing-lane")?.pass;
  const window = physical.receiverWindowSec;
  const offside = !physical.checks.find((c) => c.name === "offside")?.pass;

  // ---- outcome resolution (deterministic given state + action) ----
  let outcome: Outcome = "POSSESSION_RETAINED";
  let successP = 0.5;
  if (offside) {
    outcome = "OFFSIDE"; successP = 0;
  } else if (laneBlocked) {
    outcome = "INTERCEPTED"; successP = 0.12;
  } else if (window !== null && window < 0) {
    outcome = window < -0.35 ? "TURNOVER" : "PRESSURE_FORCED_ERROR";
    successP = clamp(0.45 + window * 0.9, 0.05, 0.5);
  } else if (window !== null) {
    successP = clamp(0.55 + window * 0.8, 0.5, 0.95);
    const receiver = targetPt ? nearestTo(state, targetPt) : null;
    const xtNow = xTAt(threatPoint.x, threatPoint.y);
    outcome = xtNow > 0.1 ? "CHANCE_CREATED" : window > 0.4 ? "LINE_BROKEN" : "SUCCESSFUL_PROGRESSION";
  }
  const turnoverP = clamp(1 - successP + (counter.moveId === "counter-transition" ? 0.12 : 0), 0, 0.97);

  // ---- value estimates (MODEL ESTIMATE labels belong in UI, §16) ----
  const xTBefore = xTAt(state.ball.x, state.ball.y);
  const xTAfter = xTAt(threatPoint.x, threatPoint.y);
  const xTDelta = (xTAfter - xTBefore) * successP;
  const gridBefore = controlAt(computePitchControl(state.homePlayers, state.awayPlayers, cfg, 4), state.ball.x, state.ball.y);
  const counterShiftsDefence = counter.instructions.some((i) => i.moveTo);
  const pcDelta = (successP - 0.5) * 0.3 + (counterShiftsDefence ? -0.05 : 0);
  const counterRisk = counter.moveId === "counter-transition"
    ? clamp(0.45 + (1 - successP) * 0.4, 0, 1)
    : clamp((1 - successP) * 0.25, 0, 0.6);

  const timeline = buildTimeline(state, action, counter, physical, cfg);

  const explanation = buildExplanation(state, action, physical, counter, outcome, window);

  return {
    turn: state.turn,
    outcome,
    successProbability: round2(successP),
    turnoverProbability: round2(turnoverP),
    xTDelta: round3(xTDelta),
    pitchControlDelta: round3(pcDelta),
    chanceQuality: outcome === "CHANCE_CREATED" ? round2(xTAfter * successP) : null,
    counterattackRisk: round2(counterRisk),
    defensiveStability: round2(clamp(1 - counterRisk, 0, 1)),
    physical,
    counter,
    explanation,
    timeline,
    confidence: 0.72, // engine self-confidence; rises with scenario specificity
  };
}

function round2(n: number) { return Math.round(n * 100) / 100; }
function round3(n: number) { return Math.round(n * 1000) / 1000; }

function pointOf(state: BattleState, id?: string) {
  if (!id) return undefined;
  return [...state.homePlayers, ...state.awayPlayers].find((p) => p.id === id);
}
function nearestTo(state: BattleState, pt: { x: number; y: number }) {
  return [...state.homePlayers, ...state.awayPlayers]
    .sort((a, b) => dist(a, pt) - dist(b, pt))[0];
}

/** §26 — keyframes every 0.25s: runners move, ball flies, defenders respond */
function buildTimeline(
  state: BattleState,
  action: UserAction,
  counter: SimulationResult["counter"],
  physical: SimulationResult["physical"],
  cfg: PhysicsConfig
): Keyframe[] {
  const frames: Keyframe[] = [];
  const duration = Math.max(1.5, (physical.ballArrivalSec ?? 0) + 0.8);
  const all = [...state.homePlayers, ...state.awayPlayers];

  const runTargets = new Map<string, { x: number; y: number }>();
  for (const r of action.runs) {
    const last = r.points[r.points.length - 1];
    if (last) runTargets.set(r.playerId, { x: last.x, y: last.y });
  }
  const counterTargets = new Map<string, { x: number; y: number }>();
  for (const i of counter.instructions) {
    if (i.moveTo) counterTargets.set(i.playerId, i.moveTo);
  }

  const carrier = all.find((p) => p.id === action.ballCarrierId);
  const passFrom = carrier ? { x: carrier.x, y: carrier.y } : { x: state.ball.x, y: state.ball.y };
  const passTo = action.pass
    ? (pointOf(state, action.pass.toPlayerId)
      ? { x: pointOf(state, action.pass.toPlayerId)!.x, y: pointOf(state, action.pass.toPlayerId)!.y }
      : action.pass.toPoint)
    : null;

  for (let t = 0; t <= duration + 0.001; t += 0.25) {
    const players = all.map((p) => {
      const rt = runTargets.get(p.id) ?? counterTargets.get(p.id);
      if (!rt) return { id: p.id, x: p.x, y: p.y };
      const tArr = arrivalTime(p, rt, cfg);
      const k = clamp(t / Math.max(tArr, 0.01), 0, 1);
      return { id: p.id, x: p.x + (rt.x - p.x) * k, y: p.y + (rt.y - p.y) * k };
    });

    let ball = { x: state.ball.x, y: state.ball.y, carrierId: state.ball.carrierId };
    if (passTo && physical.ballArrivalSec !== null) {
      if (t < physical.ballArrivalSec) {
        const k = t / physical.ballArrivalSec;
        ball = {
          x: passFrom.x + (passTo.x - passFrom.x) * k,
          y: passFrom.y + (passTo.y - passFrom.y) * k,
          carrierId: null,
        };
      } else {
        ball = { x: passTo.x, y: passTo.y, carrierId: action.pass?.toPlayerId ?? null };
      }
    }
    frames.push({ t: Math.round(t * 100) / 100, players, ball });
  }
  return frames;
}

/** §27 format — engine fills the skeleton; the LLM polishes the prose later */
function buildExplanation(
  state: BattleState,
  action: UserAction,
  physical: SimulationResult["physical"],
  counter: SimulationResult["counter"],
  outcome: Outcome,
  window: number | null
): SimulationResult["explanation"] {
  const intent = action.explanation.trim() ||
    (action.pass ? `Play ${action.pass.speed} ${action.pass.type} pass to ${action.pass.toPlayerId ?? "space"}` : "carry the ball");
  const windowText = window === null
    ? "no direct defender contests the receiver"
    : `receiver has ${window >= 0 ? "+" : ""}${window.toFixed(2)}s after control before the nearest defender arrives`;
  return {
    intention: intent,
    geometry: `${action.runs.length} runner(s) declared; opponent shape: ${state.awayShape.outOfPossession}`,
    physicalWindow: windowText +
      (physical.ballArrivalSec !== null ? `; ball arrives in ${physical.ballArrivalSec.toFixed(2)}s` : ""),
    opponentResponse: `${counter.moveName}: ${counter.instructions.map((i) => i.instruction).join("; ")}`,
    consequence: `outcome ${outcome}; xT ${state.ball.x >= 0 ? "recomputed" : ""} on resolution`.trim(),
    verdict: physical.valid
      ? `PHYSICALLY VALID — ${outcome.replace(/_/g, " ")}`
      : `PHYSICALLY INVALID — ${physical.checks.filter((c) => !c.pass).map((c) => c.name).join(", ")} failed`,
  };
}
