// ============================================================================
// AI COUNTER ENGINE (§13/§14) — a POLICY layer, not a live LLM call.
// Each counter move is a rule over board state; personas differ in WEIGHTS
// and THRESHOLDS. The LLM only narrates what this layer already decided.
// ============================================================================

import { dist, DEFAULT_PHYSICS, type PhysicsConfig } from "./physics";
import type {
  BattleState, CounterInstruction, CounterSelection, PersonaId, PlayerState,
} from "./types";

export interface CounterContext {
  state: BattleState;
  /** where the ball is going (receiver position or pass target point) */
  threatPoint: { x: number; y: number };
  /** seconds until the pass arrives — how much time the defence has */
  timeToBallSec: number | null;
}

export interface CounterMove {
  id: string;
  name: string;
  description: string;
  /** 0..1 priority given raw board features; persona weights multiply this */
  applicability: (ctx: CounterContext, cfg: PhysicsConfig) => number;
  /** produce concrete instructions on the actual board */
  build: (ctx: CounterContext, cfg: PhysicsConfig) => CounterInstruction[];
}

const nearestDefender = (state: BattleState, pt: { x: number; y: number }): PlayerState => {
  const side: PlayerState[] = state.ball.carrierId &&
    state.homePlayers.some((p) => p.id === state.ball.carrierId)
      ? state.awayPlayers : state.homePlayers;
  return [...side].sort((a, b) => dist(a, pt) - dist(b, pt))[0];
};

export const COUNTER_MOVES: CounterMove[] = [
  {
    id: "cb-step-out",
    name: "Centre-back steps out",
    description: "Nearest CB steps to the receiver; line holds",
    applicability: (ctx) => {
      const inMiddleThird = ctx.threatPoint.x > 30 && ctx.threatPoint.x < 75;
      const time = ctx.timeToBallSec === null ? 1 : ctx.timeToBallSec > 0.7 ? 1 : 0.3;
      return inMiddleThird ? 0.7 * time : 0.1;
    },
    build: (ctx) => {
      const cb = nearestDefender(ctx.state, ctx.threatPoint);
      return [{
        playerId: cb.id,
        instruction: `step out and engage the receiver at (${ctx.threatPoint.x.toFixed(0)}, ${ctx.threatPoint.y.toFixed(0)})`,
        moveTo: { x: ctx.threatPoint.x, y: ctx.threatPoint.y },
      }];
    },
  },
  {
    id: "screen-pivot",
    name: "Screen the pivot",
    description: "Nearest midfielder goal-side of the receiver, lane denied",
    applicability: (ctx) => (ctx.threatPoint.x > 45 ? 0.6 : 0.2),
    build: (ctx) => {
      const mid = nearestDefender(ctx.state, ctx.threatPoint);
      return [{
        playerId: mid.id,
        instruction: "drop goal-side, screen the inside lane, force the ball backward",
        moveTo: { x: ctx.threatPoint.x - 3, y: ctx.threatPoint.y },
      }];
    },
  },
  {
    id: "collapse-lane",
    name: "Collapse the central lane",
    description: "Two defenders narrow the corridor, invite the wide pass",
    applicability: (ctx) =>
      ctx.threatPoint.y > 22 && ctx.threatPoint.y < 46 ? 0.75 : 0.15,
    build: (ctx) => {
      const side = ctx.state.ball.carrierId &&
        ctx.state.homePlayers.some((p) => p.id === ctx.state.ball.carrierId)
          ? ctx.state.awayPlayers : ctx.state.homePlayers;
      const two = [...side].sort((a, b) => dist(a, ctx.threatPoint) - dist(b, ctx.threatPoint)).slice(0, 2);
      return two.map((p, i) => ({
        playerId: p.id,
        instruction: i === 0 ? "tuck inside, close the half-space" : "squeeze central, protect Zone 14",
        moveTo: { x: ctx.threatPoint.x - (i === 0 ? 2 : 5), y: 34 + (i === 0 ? -4 : 4) },
      }));
    },
  },
  {
    id: "stay-compact",
    name: "Stay compact, do not chase",
    description: "Anvil default: hold the shell, concede the wide receive, protect the cutback",
    applicability: (ctx) => {
      const wide = ctx.threatPoint.y < 17 || ctx.threatPoint.y > 51;
      return wide ? 0.9 : 0.25;
    },
    build: (ctx) => {
      const side = ctx.state.ball.carrierId &&
        ctx.state.homePlayers.some((p) => p.id === ctx.state.ball.carrierId)
          ? ctx.state.awayPlayers : ctx.state.homePlayers;
      const wb = [...side].sort((a, b) => dist(a, ctx.threatPoint) - dist(b, ctx.threatPoint))[0];
      return [
        {
          playerId: wb.id,
          instruction: "hold, show outside, deny the inside lane",
          moveTo: { x: ctx.threatPoint.x, y: ctx.threatPoint.y },
        },
        {
          playerId: side.find((p) => p.position.includes("CB"))?.id ?? side[1].id,
          instruction: "protect the cutback zone, do not step",
        },
      ];
    },
  },
  {
    id: "counter-transition",
    name: "Counter the exposed space",
    description: "Leave the press, attack the space behind the advancing full-back",
    applicability: (ctx) => {
      const advancedFB = [...ctx.state.homePlayers, ...ctx.state.awayPlayers].some(
        (p) => /RB|LB|RWB|LWB/.test(p.position) && p.x > 62
      );
      return advancedFB ? 0.8 : 0.05;
    },
    build: (ctx) => {
      const side = ctx.state.ball.carrierId &&
        ctx.state.homePlayers.some((p) => p.id === ctx.state.ball.carrierId)
          ? ctx.state.awayPlayers : ctx.state.homePlayers;
      const fwd = side.filter((p) => /ST|LW|RW/.test(p.position));
      const fb = [...ctx.state.homePlayers, ...ctx.state.awayPlayers]
        .filter((p) => /RB|LB|RWB|LWB/.test(p.position) && p.x > 62)
        .sort((a, b) => b.x - a.x)[0];
      const channelX = fb ? fb.x : 70;
      return fwd.slice(0, 2).map((p) => ({
        playerId: p.id,
        instruction: `attack the channel behind the advanced full-back at x=${channelX.toFixed(0)}`,
        moveTo: { x: channelX, y: p.y < 34 ? 15 : 53 },
      }));
    },
  },
  {
    id: "press-trap",
    name: "Touchline pressing trap",
    description: "Double-team on the receive, use the line as an extra defender",
    applicability: (ctx) => {
      const onLine = ctx.threatPoint.y < 8 || ctx.threatPoint.y > 60;
      const slow = ctx.timeToBallSec !== null && ctx.timeToBallSec > 0.9;
      return onLine && slow ? 0.95 : 0.1;
    },
    build: (ctx) => {
      const side = ctx.state.ball.carrierId &&
        ctx.state.homePlayers.some((p) => p.id === ctx.state.ball.carrierId)
          ? ctx.state.awayPlayers : ctx.state.homePlayers;
      const two = [...side].sort((a, b) => dist(a, ctx.threatPoint) - dist(b, ctx.threatPoint)).slice(0, 2);
      return two.map((p, i) => ({
        playerId: p.id,
        instruction: i === 0 ? "press on the receive, curve the run" : "double-team, kill the exit",
        moveTo: { x: ctx.threatPoint.x, y: ctx.threatPoint.y },
      }));
    },
  },
];

/** persona weight multipliers — same library, different brains (§14/§35) */
export const PERSONA_WEIGHTS: Record<PersonaId, Record<string, number>> = {
  purist:   { "cb-step-out": 1.4, "screen-pivot": 1.5, "collapse-lane": 1.3, "stay-compact": 0.4, "counter-transition": 0.5, "press-trap": 0.8 },
  anvil:    { "cb-step-out": 0.5, "screen-pivot": 0.9, "collapse-lane": 1.2, "stay-compact": 1.6, "counter-transition": 1.5, "press-trap": 0.9 },
  analyst:  { "cb-step-out": 1.0, "screen-pivot": 1.0, "collapse-lane": 1.0, "stay-compact": 1.0, "counter-transition": 1.0, "press-trap": 1.0 },
  coach:    { "cb-step-out": 1.1, "screen-pivot": 1.1, "collapse-lane": 1.1, "stay-compact": 1.1, "counter-transition": 1.0, "press-trap": 1.0 },
  historian:{ "cb-step-out": 1.0, "screen-pivot": 1.0, "collapse-lane": 1.0, "stay-compact": 1.0, "counter-transition": 1.0, "press-trap": 1.0 },
  referee:  { "cb-step-out": 1.0, "screen-pivot": 1.0, "collapse-lane": 1.0, "stay-compact": 1.0, "counter-transition": 1.0, "press-trap": 1.0 },
};

export const PERSONA_VOICE: Record<PersonaId, string> = {
  purist: "Structure holds. We do not chase — we control the reference points.",
  anvil: "Let them have the wide touchline. The shell does not break for one winger.",
  analyst: "Selected the highest expected-value response given the arrival-time race.",
  coach: "Show them outside, keep your hips goal-side, communicate the drop.",
  historian: "This denial echoes catenaccio's corridor lock, modernised with a mid-block.",
  referee: "Counter selected by policy engine; physical feasibility independently verified.",
};

/** pick the persona's counter: highest weight x applicability wins */
export function selectCounter(
  ctx: CounterContext,
  persona: PersonaId,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): CounterSelection {
  const weights = PERSONA_WEIGHTS[persona];
  let best: CounterMove | null = null;
  let bestScore = -1;
  for (const move of COUNTER_MOVES) {
    const score = move.applicability(ctx, cfg) * (weights[move.id] ?? 1);
    if (score > bestScore) { bestScore = score; best = move; }
  }
  const chosen = best ?? COUNTER_MOVES[3];
  return {
    moveId: chosen.id,
    moveName: chosen.name,
    narration: PERSONA_VOICE[persona],
    instructions: chosen.build(ctx, cfg),
  };
}
