import type { Lane, Third, Vec2 } from "./types";
import { PITCH_LENGTH, PITCH_WIDTH } from "./types";

export const ZONES = {
  defensiveThird: { x0: 0, x1: 35 },
  middleThird: { x0: 35, x1: 70 },
  attackingThird: { x0: 70, x1: 105 },
  rw: { y0: 0, y1: 13.6 },
  rhs: { y0: 13.6, y1: 27.2 },
  cz: { y0: 27.2, y1: 40.8 },
  lhs: { y0: 40.8, y1: 54.4 },
  lw: { y0: 54.4, y1: 68 },
  zone14: { x0: 70, x1: 88.5, y0: 27.2, y1: 40.8 },
  penaltyBox: { x0: 88.5, x1: 105, y0: 13.84, y1: 54.16 },
  defensiveBox: { x0: 0, x1: 16.5, y0: 13.84, y1: 54.16 },
  sixYardHome: { x0: 0, x1: 5.5, y0: 24.84, y1: 43.16 },
  sixYardAway: { x0: 99.5, x1: 105, y0: 24.84, y1: 43.16 },
} as const;

export function clampPitch(p: Vec2): Vec2 {
  return {
    x: Math.min(PITCH_LENGTH, Math.max(0, p.x)),
    y: Math.min(PITCH_WIDTH, Math.max(0, p.y)),
  };
}

export function dist(a: Vec2, b: Vec2): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function laneAt(y: number): Lane {
  if (y < 13.6) return "RW";
  if (y < 27.2) return "RHS";
  if (y <= 40.8) return "CZ";
  if (y <= 54.4) return "LHS";
  return "LW";
}

export function thirdAt(x: number): Third {
  if (x < 35) return "DEFENSIVE";
  if (x < 70) return "MIDDLE";
  return "ATTACKING";
}

export function inZone14(p: Vec2): boolean {
  const z = ZONES.zone14;
  return p.x >= z.x0 && p.x <= z.x1 && p.y >= z.y0 && p.y <= z.y1;
}

export function inPenaltyBox(p: Vec2): boolean {
  const z = ZONES.penaltyBox;
  return p.x >= z.x0 && p.x <= z.x1 && p.y >= z.y0 && p.y <= z.y1;
}

/** Zone expected threat (0.01 defensive third → 0.18+ box / Zone 14). */
export function expectedThreat(p: Vec2): number {
  const progress = Math.min(1, Math.max(0, p.x / PITCH_LENGTH));
  let xt = 0.01 + progress * 0.08;
  const lane = laneAt(p.y);
  if (lane === "RHS" || lane === "LHS") xt += 0.02;
  if (lane === "CZ" && p.x > 50) xt += 0.015;
  if (inZone14(p)) xt += 0.06;
  if (inPenaltyBox(p)) xt += 0.09;
  if (p.x > 95 && (lane === "RW" || lane === "LW")) xt += 0.04;
  return Math.min(0.32, Number(xt.toFixed(3)));
}

export function zoneLabel(p: Vec2): string {
  const bits = [thirdAt(p.x).toLowerCase(), laneAt(p.y)];
  if (inZone14(p)) bits.push("Zone 14");
  if (inPenaltyBox(p)) bits.push("penalty box");
  return bits.join(" / ");
}

export function angleDeg(from: Vec2, to: Vec2): number {
  return (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
}

export function pointAlong(a: Vec2, b: Vec2, t: number): Vec2 {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
