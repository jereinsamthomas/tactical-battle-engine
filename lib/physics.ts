import type { PassType, PlayerToken, Vec2 } from "./types";
import { dist } from "./pitch";

export const PHYSICS = {
  reactionMin: 0.25,
  reactionMax: 0.45,
  sprintMin: 8.5,
  sprintMax: 9.8,
  accelMin: 3.5,
  accelMax: 4.5,
  turnPenalty: 0.3,
  groundPassMin: 16,
  groundPassMax: 22,
  chipMin: 12,
  chipMax: 16,
  standingReach: 1.5,
  slidingReach: 2.5,
  coverShadowDeg: 38,
  grassDecel: 1.8,
} as const;

export function passSpeed(type: PassType, requested?: number): number {
  if (type === "CHIPPED") return clamp(requested ?? 14, PHYSICS.chipMin, PHYSICS.chipMax);
  if (type === "CUTBACK") return clamp(requested ?? 15, 12, 18);
  return clamp(requested ?? 18, PHYSICS.groundPassMin, PHYSICS.groundPassMax);
}

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export function ballTransitSeconds(from: Vec2, to: Vec2, type: PassType, speedMps: number): number {
  const d = dist(from, to);
  const v = passSpeed(type, speedMps);
  const friction = type === "CHIPPED" ? 0.4 : PHYSICS.grassDecel;
  const vEff = Math.max(8, v - friction * (d / 20));
  const hang = type === "CHIPPED" ? 0.35 : 0;
  return d / vEff + hang;
}

export function playerSprintCap(stamina: number): number {
  return PHYSICS.sprintMin + (PHYSICS.sprintMax - PHYSICS.sprintMin) * (stamina / 100);
}

/** Time for a player to reach a point, including reaction latency and a turn penalty heuristic. */
export function timeToPoint(
  player: Pick<PlayerToken, "x" | "y" | "stamina">,
  target: Vec2,
  facingToward?: Vec2
): number {
  const reaction =
    PHYSICS.reactionMin +
    (PHYSICS.reactionMax - PHYSICS.reactionMin) * (1 - player.stamina / 120);
  const d = dist({ x: player.x, y: player.y }, target);
  const vmax = playerSprintCap(player.stamina);
  const accel = PHYSICS.accelMin + ((PHYSICS.accelMax - PHYSICS.accelMin) * player.stamina) / 100;
  const tAccel = vmax / accel;
  const dAccel = 0.5 * accel * tAccel * tAccel;
  let travel: number;
  if (d <= dAccel) travel = Math.sqrt((2 * d) / accel);
  else travel = tAccel + (d - dAccel) / vmax;
  let turn = 0;
  if (facingToward) {
    const a1 = Math.atan2(facingToward.y - player.y, facingToward.x - player.x);
    const a2 = Math.atan2(target.y - player.y, target.x - player.x);
    let diff = Math.abs(a1 - a2);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;
    if (diff > Math.PI / 2) turn = PHYSICS.turnPenalty;
  }
  return reaction + travel + turn;
}

export function interceptionWindow(
  defenders: PlayerToken[],
  ballFrom: Vec2,
  ballTo: Vec2,
  transit: number,
  passType: PassType
): { id?: string; delay: number; arrives: number } {
  const reach = passType === "CHIPPED" ? PHYSICS.slidingReach : PHYSICS.standingReach;
  let best: { id: string; delay: number; arrives: number } | null = null;
  for (const d of defenders) {
    const closest = closestPointOnSegment({ x: d.x, y: d.y }, ballFrom, ballTo);
    const extra = dist({ x: d.x, y: d.y }, closest) > reach ? dist({ x: d.x, y: d.y }, closest) - reach : 0;
    const target = extra === 0 ? closest : closest;
    const arrives = timeToPoint(d, target, ballFrom);
    const delay = PHYSICS.reactionMin + (1 - d.stamina / 100) * 0.15;
    if (arrives <= transit + 0.05 && extra < reach + 2.2) {
      if (!best || arrives < best.arrives) best = { id: d.id, delay, arrives };
    }
  }
  return best ?? { delay: 0.32, arrives: Infinity };
}

function closestPointOnSegment(p: Vec2, a: Vec2, b: Vec2): Vec2 {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const len2 = vx * vx + vy * vy || 1;
  let t = ((p.x - a.x) * vx + (p.y - a.y) * vy) / len2;
  t = Math.min(1, Math.max(0, t));
  return { x: a.x + t * vx, y: a.y + t * vy };
}

export function offsideLine(defenders: PlayerToken[], attackingTowardPositiveX: boolean): number {
  const sorted = [...defenders].sort((a, b) => (attackingTowardPositiveX ? a.x - b.x : b.x - a.x));
  const secondLast = sorted[1] ?? sorted[0];
  return secondLast?.x ?? (attackingTowardPositiveX ? 16.5 : 88.5);
}

export function isOffside(
  receiver: Vec2,
  ballX: number,
  line: number,
  attackingTowardPositiveX: boolean
): boolean {
  if (attackingTowardPositiveX) {
    if (receiver.x <= ballX) return false;
    return receiver.x > line && receiver.x > 52.5;
  }
  if (receiver.x >= ballX) return false;
  return receiver.x < line && receiver.x < 52.5;
}

/** Discrete pitch-control sample: P(home reaches cell first). */
export function pitchControl(
  home: PlayerToken[],
  away: PlayerToken[],
  cell: Vec2
): number {
  const th = Math.min(...home.map((p) => timeToPoint(p, cell)));
  const ta = Math.min(...away.map((p) => timeToPoint(p, cell)));
  const k = 1.8;
  return 1 / (1 + Math.exp(k * (th - ta)));
}

export function compactnessMeters(players: PlayerToken[]): { vertical: number; horizontal: number } {
  const outfield = players.filter((p) => !p.role.toLowerCase().includes("gk"));
  const xs = outfield.map((p) => p.x);
  const ys = outfield.map((p) => p.y);
  return {
    vertical: Math.max(...xs) - Math.min(...xs),
    horizontal: Math.max(...ys) - Math.min(...ys),
  };
}
