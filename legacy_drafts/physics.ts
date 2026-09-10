// ============================================================================
// PHYSICAL REALITY ENGINE — deterministic, config-driven (§8/§41)
// The LLM proposes intent; THIS layer decides what is physically possible.
// All constants live in PhysicsConfig so they can be calibrated with
// empirical tracking data later. Units: metres, seconds, m/s.
// ============================================================================

import type { PassSpeed, PlayerState } from "./types";

export const PITCH = { length: 105, width: 68 } as const;

export interface Vec2 {
  x: number;
  y: number;
}

export interface PhysicsConfig {
  /** reaction latency for an average player (s) */
  baseReactionSec: number;
  /** each anticipation point above 10 shaves this much off reaction */
  reactionPerAnticipationPointSec: number;
  minReactionSec: number;
  /** sprint acceleration m/s^2 */
  accelerationMps2: number;
  /** sprint speed for pace = 0 (m/s) — added per pace point below */
  baseSprintMps: number;
  sprintPerPacePoint: number;
  /** penalty per radian of required direction change */
  turnPenaltyPerRadSec: number;
  /** ball speed per pass type (m/s) */
  ballVelocityMps: Record<PassSpeed, number>;
  /** receiving: base control time, reduced by first touch */
  controlBaseSec: number;
  controlPerTouchPointSec: number;
  /** fraction of max sprint lost at fatigue = 1 */
  fatigueSprintPenalty: number;
  /** a defender reaching the lane this much earlier than the ball blocks it */
  laneBlockMarginSec: number;
}

export const DEFAULT_PHYSICS: PhysicsConfig = {
  baseReactionSec: 0.35,
  reactionPerAnticipationPointSec: 0.02,
  minReactionSec: 0.08,
  accelerationMps2: 4.4,
  baseSprintMps: 3.4,
  sprintPerPacePoint: 0.23,
  turnPenaltyPerRadSec: 0.18,
  ballVelocityMps: { whipped: 26, driven: 21, lofted: 17, bounce: 15 },
  controlBaseSec: 0.55,
  controlPerTouchPointSec: 0.022,
  fatigueSprintPenalty: 0.28,
  laneBlockMarginSec: 0.1,
};

// ---------- geometry helpers ----------

export function dist(a: Vec2, b: Vec2): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** closest point on segment a->b to point p */
export function closestPointOnSegment(p: Vec2, a: Vec2, b: Vec2): Vec2 {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 === 0) return { ...a };
  const t = clamp(((p.x - a.x) * abx + (p.y - a.y) * aby) / len2, 0, 1);
  return { x: a.x + t * abx, y: a.y + t * aby };
}

// ---------- player physics ----------

/** max sprint velocity given pace attribute + fatigue */
export function maxSprintVelocity(p: PlayerState, cfg: PhysicsConfig = DEFAULT_PHYSICS): number {
  const fresh = cfg.baseSprintMps + p.attributes.pace * cfg.sprintPerPacePoint;
  return fresh * (1 - p.fatigue * cfg.fatigueSprintPenalty);
}

/** reaction latency: anticipation shortens it, bounded below (§9) */
export function reactionTime(p: PlayerState, cfg: PhysicsConfig = DEFAULT_PHYSICS): number {
  const raw =
    cfg.baseReactionSec -
    (p.attributes.anticipation - 10) * cfg.reactionPerAnticipationPointSec;
  return clamp(raw, cfg.minReactionSec, 1.2);
}

/** penalty for turning: depends on current velocity vs desired direction */
export function turnPenalty(
  p: PlayerState,
  target: Vec2,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): number {
  const speed = Math.hypot(p.velocityX, p.velocityY);
  if (speed < 0.5) return 0; // stationary player pivots freely
  const current = Math.atan2(p.velocityY, p.velocityX);
  const desired = Math.atan2(target.y - p.y, target.x - p.x);
  let d = Math.abs(desired - current) % (2 * Math.PI);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return cfg.turnPenaltyPerRadSec * d;
}

/**
 * travel_time ≈ reaction + acceleration phase + cruise phase + turn penalty
 * (§8). This is the number the whole battle engine races against.
 */
export function arrivalTime(
  p: PlayerState,
  target: Vec2,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): number {
  const d = dist(p, target);
  const vmax = maxSprintVelocity(p, cfg);
  const a = cfg.accelerationMps2;
  const tAcc = vmax / a;
  const dAcc = 0.5 * a * tAcc * tAcc;
  const move = d <= dAcc ? Math.sqrt((2 * d) / a) : tAcc + (d - dAcc) / vmax;
  return reactionTime(p, cfg) + move + turnPenalty(p, target, cfg);
}

// ---------- ball & receiving ----------

export function passTravelTime(
  distanceM: number,
  speed: PassSpeed,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): number {
  return distanceM / cfg.ballVelocityMps[speed];
}

/** first-touch + orientation: how long after arrival before the receiver can act */
export function controlTime(
  p: PlayerState,
  cfg: PhysicsConfig = DEFAULT_PHYSICS
): number {
  const raw =
    cfg.controlBaseSec -
    (p.attributes.firstTouch - 10) * cfg.controlPerTouchPointSec;
  // facing the ball shortens control; facing away (blind) lengthens it (§9)
  const toBall = Math.atan2(-p.velocityY, -p.velocityX); // informational; simplified
  return clamp(raw, 0.15, 1.0);
}

/**
 * The core race (§8): positive => receiver can act before the defender
 * arrives; negative => the defender wins the physical window.
 */
export function receiverWindowSec(
  ballArrivalSec: number,
  controlSec: number,
  defenderArrivalSec: number | null
): number | null {
  if (defenderArrivalSec === null) return null;
  return defenderArrivalSec - (ballArrivalSec + controlSec);
}
