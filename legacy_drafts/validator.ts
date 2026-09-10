// ============================================================================
// ACTION VALIDATOR (§41) — asks, for every proposed move:
// WHERE? WHEN? WHO DEFENDS? HOW FAST? IS THE LANE BLOCKED? IS IT OFFSIDE?
// The LLM never gets to skip these questions.
// ============================================================================

import {
  arrivalTime, closestPointOnSegment, dist, passTravelTime, receiverWindowSec,
  controlTime, clamp, DEFAULT_PHYSICS, type PhysicsConfig,
} from "./physics";
import type {
  BattleState, DrawnPass, PhysicalCheck, PhysicalValidation, PlayerState, TeamSide,
} from "./types";

export interface LaneThreat {
  defenderId: string;
  intersection: { x: number; y: number };
  defenderArrivalSec: number;
  ballArrivalSec: number;
  blocked: boolean;
}

/** every defender's chance to intersect the pass line, with the race result */
export function passLaneThreats(
  state: BattleState,
  from: { x: number; y: number },
  pass: DrawnPass,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): LaneThreat[] {
  const to = pass.toPoint ?? pointOf(state, pass.toPlayerId);
  if (!to) return [];
  const defending: PlayerState[] =
    state.ball.carrierId && playerTeam(state, state.ball.carrierId) === "home"
      ? state.awayPlayers
      : state.homePlayers;
  const threats: LaneThreat[] = [];
  for (const d of defending) {
    const ip = closestPointOnSegment(d, from, to);
    const ballT = passTravelTime(dist(from, ip), pass.speed, cfg);
    const defT = arrivalTime(d, ip, cfg);
    threats.push({
      defenderId: d.id,
      intersection: ip,
      defenderArrivalSec: defT,
      ballArrivalSec: ballT,
      blocked: defT < ballT - cfg.laneBlockMarginSec,
    });
  }
  threats.sort((a, b) => a.defenderArrivalSec - b.defenderArrivalSec);
  return threats;
}

function pointOf(state: BattleState, id?: string) {
  if (!id) return undefined;
  const all = [...state.homePlayers, ...state.awayPlayers];
  const p = all.find((p) => p.id === id);
  return p ? { x: p.x, y: p.y } : undefined;
}

function playerTeam(state: BattleState, id: string): TeamSide | null {
  if (state.homePlayers.some((p) => p.id === id)) return "home";
  if (state.awayPlayers.some((p) => p.id === id)) return "away";
  return null;
}

/**
 * Offside against the attacking team (§15). Home attacks +x.
 * Simple model: beyond second-last defender AND beyond the ball, in the
 * opponent half, at the moment of the pass.
 */
export function offsideCheck(
  state: BattleState,
  receiverId: string
): { offside: boolean; reason: string } {
  const receiver =
    state.homePlayers.find((p) => p.id === receiverId) ??
    state.awayPlayers.find((p) => p.id === receiverId);
  if (!receiver) return { offside: false, reason: "receiver not found" };
  const attackers = receiver.team === "home" ? state.homePlayers : state.awayPlayers;
  const defenders = receiver.team === "home" ? state.awayPlayers : state.homePlayers;
  const dir = receiver.team === "home" ? 1 : -1;
  const sorted = [...defenders].sort((a, b) => dir * (b.x - a.x));
  const secondLastX = sorted.length >= 2 ? sorted[1].x : dir > 0 ? 105 : 0;
  const ballX = state.ball.x;
  const attackingHalf = dir > 0 ? receiver.x > 52.5 : receiver.x < 52.5;
  const beyondLine = dir > 0 ? receiver.x > secondLastX : receiver.x < secondLastX;
  const beyondBall = dir > 0 ? receiver.x > ballX : receiver.x < ballX;
  const involved = attackers.some((p) => p.id === receiverId);
  const offside = involved && attackingHalf && beyondLine && beyondBall;
  return {
    offside,
    reason: offside
      ? `receiver x=${receiver.x.toFixed(1)} beyond second-last defender x=${secondLastX.toFixed(1)} and ball x=${ballX.toFixed(1)}`
      : "onside",
  };
}

/** The full physical adjudication of a user action. */
export function validateAction(
  state: BattleState,
  action: { ballCarrierId: string; pass?: DrawnPass },
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): PhysicalValidation {
  const checks: PhysicalCheck[] = [];
  const carrier =
    state.homePlayers.find((p) => p.id === action.ballCarrierId) ??
    state.awayPlayers.find((p) => p.id === action.ballCarrierId);
  if (!carrier) {
    return {
      valid: false,
      checks: [{ name: "carrier", pass: false, detail: "ball carrier not on pitch" }],
      ballArrivalSec: null, receiverControlSec: 0, defenderArrivalSec: null, receiverWindowSec: null,
    };
  }
  const from = { x: carrier.x, y: carrier.y };

  // ---- pass checks ----
  if (action.pass) {
    const to = pointOf(state, action.pass.toPlayerId) ?? action.pass.toPoint;
    if (!to) {
      checks.push({ name: "target", pass: false, detail: "no pass target" });
      return finish(checks, null, 0, null, cfg);
    }
    const passDist = dist(from, to);
    const ballT = passTravelTime(passDist, action.pass.speed, cfg);
    checks.push({
      name: "pass-range", pass: passDist < 65,
      detail: `${passDist.toFixed(1)}m ${action.pass.speed} pass = ${ballT.toFixed(2)}s`,
      values: { passDist, ballArrivalSec: ballT },
    });

    // lane blockage: who reaches the line first?
    const threats = passLaneThreats(state, from, action.pass, cfg);
    const blockers = threats.filter((t) => t.blocked);
    checks.push({
      name: "passing-lane",
      pass: blockers.length === 0,
      detail: blockers.length
        ? `${blockers.length} defender(s) reach the lane first (e.g. ${blockers[0].defenderId} by ${(blockers[0].ballArrivalSec - blockers[0].defenderArrivalSec).toFixed(2)}s)`
        : "lane clear at kick",
    });

    // receiver race
    let receiver: PlayerState | undefined;
    let ctrl = 0;
    let defenderT: number | null = null;
    if (action.pass.toPlayerId) {
      const os = offsideCheck(state, action.pass.toPlayerId);
      checks.push({ name: "offside", pass: !os.offside, detail: os.reason });
      receiver =
        state.homePlayers.find((p) => p.id === action.pass!.toPlayerId) ??
        state.awayPlayers.find((p) => p.id === action.pass!.toPlayerId);
      ctrl = receiver ? controlTime(receiver, cfg) : 0;
      const defending = receiver?.team === "home" ? state.awayPlayers : state.homePlayers;
      let best = Infinity;
      for (const d of defending) {
        const t = arrivalTime(d, to, cfg);
        if (t < best) best = t;
      }
      defenderT = best === Infinity ? null : best;
      const window = receiverWindowSec(ballT, ctrl, defenderT);
      checks.push({
        name: "receiver-window",
        pass: window === null ? true : window > 0,
        detail:
          window === null
            ? "no defender contests the receiver"
            : `window ${window >= 0 ? "+" : ""}${window.toFixed(2)}s (ball ${ballT.toFixed(2)}s + control ${ctrl.toFixed(2)}s vs defender ${defenderT!.toFixed(2)}s)`,
        values: { ballArrivalSec: ballT, controlSec: ctrl, defenderArrivalSec: defenderT ?? -1, windowSec: window ?? -1 },
      });
    }
    return finish(checks, ballT, ctrl, defenderT, cfg);
  }

  // ball-carry / no pass: validate the carrier's own movement window
  checks.push({ name: "carrier-free", pass: true, detail: "carrier retains possession" });
  return finish(checks, null, 0, null, cfg);
}

function finish(
  checks: PhysicalCheck[],
  ballT: number | null,
  ctrl: number,
  defT: number | null,
  cfg: PhysicsConfig
): PhysicalValidation {
  const window = receiverWindowSec(ballT ?? 0, ctrl, defT);
  return {
    valid: checks.every((c) => c.pass),
    checks,
    ballArrivalSec: ballT,
    receiverControlSec: ctrl,
    defenderArrivalSec: defT,
    receiverWindowSec: ballT === null ? null : window,
  };
}

export { clamp };
