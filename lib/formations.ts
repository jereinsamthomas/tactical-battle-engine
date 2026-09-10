import type { FormationId, PlayerToken } from "./types";

type Slot = { role: string; x: number; y: number; number: number };

const FORMATIONS: Record<FormationId, Slot[]> = {
  "4-3-3": [
    { role: "Sweeper Keeper", x: 8, y: 34, number: 1 },
    { role: "Attacking Full-Back", x: 24, y: 10, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Inverted Full-Back", x: 26, y: 54, number: 3 },
    { role: "Anchor / Destroyer", x: 36, y: 34, number: 6 },
    { role: "Mezzala", x: 48, y: 22, number: 8 },
    { role: "Box-to-Box", x: 48, y: 46, number: 10 },
    { role: "Inverted Winger", x: 72, y: 12, number: 7 },
    { role: "False Nine", x: 76, y: 34, number: 9 },
    { role: "Inverted Winger", x: 72, y: 56, number: 11 },
  ],
  "4-2-3-1": [
    { role: "Ball-Playing GK", x: 8, y: 34, number: 1 },
    { role: "Attacking Full-Back", x: 26, y: 8, number: 2 },
    { role: "Cover Defender", x: 18, y: 26, number: 4 },
    { role: "Stopper", x: 18, y: 42, number: 5 },
    { role: "Defensive Full-Back", x: 26, y: 60, number: 3 },
    { role: "Anchor / Destroyer", x: 38, y: 28, number: 6 },
    { role: "Regista", x: 38, y: 40, number: 8 },
    { role: "Inverted Winger", x: 62, y: 14, number: 7 },
    { role: "Advanced Playmaker", x: 62, y: 34, number: 10 },
    { role: "Inverted Winger", x: 62, y: 54, number: 11 },
    { role: "Poacher", x: 80, y: 34, number: 9 },
  ],
  "4-4-2": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Defensive Full-Back", x: 22, y: 10, number: 2 },
    { role: "Stopper", x: 16, y: 26, number: 4 },
    { role: "Cover Defender", x: 16, y: 42, number: 5 },
    { role: "Defensive Full-Back", x: 22, y: 58, number: 3 },
    { role: "Box-to-Box", x: 42, y: 22, number: 8 },
    { role: "Anchor / Destroyer", x: 42, y: 46, number: 6 },
    { role: "Winger", x: 58, y: 10, number: 7 },
    { role: "Winger", x: 58, y: 58, number: 11 },
    { role: "Target Man", x: 74, y: 30, number: 9 },
    { role: "Pressing Forward", x: 72, y: 40, number: 10 },
  ],
  "4-1-4-1": [
    { role: "Sweeper Keeper", x: 8, y: 34, number: 1 },
    { role: "Inverted Full-Back", x: 24, y: 12, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Inverted Full-Back", x: 24, y: 56, number: 3 },
    { role: "Anchor / Destroyer", x: 34, y: 34, number: 6 },
    { role: "Mezzala", x: 50, y: 22, number: 8 },
    { role: "Box-to-Box", x: 50, y: 46, number: 10 },
    { role: "Inverted Winger", x: 62, y: 10, number: 7 },
    { role: "Inverted Winger", x: 62, y: 58, number: 11 },
    { role: "False Nine", x: 76, y: 34, number: 9 },
  ],
  "4-4-1-1": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Defensive Full-Back", x: 22, y: 10, number: 2 },
    { role: "Stopper", x: 16, y: 26, number: 4 },
    { role: "Cover Defender", x: 16, y: 42, number: 5 },
    { role: "Defensive Full-Back", x: 22, y: 58, number: 3 },
    { role: "Box-to-Box", x: 40, y: 22, number: 8 },
    { role: "Anchor / Destroyer", x: 40, y: 46, number: 6 },
    { role: "Winger", x: 56, y: 12, number: 7 },
    { role: "Winger", x: 56, y: 56, number: 11 },
    { role: "Second Striker", x: 66, y: 34, number: 10 },
    { role: "Target Man", x: 78, y: 34, number: 9 },
  ],
  "4-3-1-2": [
    { role: "Ball-Playing GK", x: 8, y: 34, number: 1 },
    { role: "Attacking Full-Back", x: 26, y: 10, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Attacking Full-Back", x: 26, y: 58, number: 3 },
    { role: "Anchor / Destroyer", x: 36, y: 34, number: 6 },
    { role: "Mezzala", x: 48, y: 24, number: 8 },
    { role: "Box-to-Box", x: 48, y: 44, number: 10 },
    { role: "Advanced Playmaker", x: 62, y: 34, number: 11 },
    { role: "False Nine", x: 76, y: 28, number: 9 },
    { role: "Poacher", x: 76, y: 40, number: 7 },
  ],
  "4-2-2-2": [
    { role: "Sweeper Keeper", x: 8, y: 34, number: 1 },
    { role: "Inverted Full-Back", x: 24, y: 12, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Inverted Full-Back", x: 24, y: 56, number: 3 },
    { role: "Regista", x: 38, y: 28, number: 6 },
    { role: "Anchor / Destroyer", x: 38, y: 40, number: 8 },
    { role: "Inside Forward", x: 62, y: 22, number: 10 },
    { role: "Inside Forward", x: 62, y: 46, number: 11 },
    { role: "Pressing Forward", x: 76, y: 28, number: 9 },
    { role: "Target Man", x: 76, y: 40, number: 7 },
  ],
  "4-2-4": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Attacking Full-Back", x: 24, y: 10, number: 2 },
    { role: "Stopper", x: 16, y: 26, number: 4 },
    { role: "Cover Defender", x: 16, y: 42, number: 5 },
    { role: "Attacking Full-Back", x: 24, y: 58, number: 3 },
    { role: "Anchor / Destroyer", x: 40, y: 28, number: 6 },
    { role: "Box-to-Box", x: 40, y: 40, number: 8 },
    { role: "Winger", x: 70, y: 8, number: 7 },
    { role: "Winger", x: 70, y: 60, number: 11 },
    { role: "Poacher", x: 80, y: 28, number: 9 },
    { role: "Target Man", x: 80, y: 40, number: 10 },
  ],
  "3-4-3": [
    { role: "Sweeper Keeper", x: 10, y: 34, number: 1 },
    { role: "Cover Defender", x: 20, y: 20, number: 4 },
    { role: "Ball-Playing CB", x: 16, y: 34, number: 5 },
    { role: "Stopper", x: 20, y: 48, number: 3 },
    { role: "Wing-Back", x: 42, y: 8, number: 2 },
    { role: "Regista", x: 38, y: 28, number: 6 },
    { role: "Box-to-Box", x: 38, y: 40, number: 8 },
    { role: "Wing-Back", x: 42, y: 60, number: 7 },
    { role: "Inverted Winger", x: 70, y: 16, number: 10 },
    { role: "False Nine", x: 76, y: 34, number: 9 },
    { role: "Inverted Winger", x: 70, y: 52, number: 11 },
  ],
  "3-4-2-1": [
    { role: "Ball-Playing GK", x: 10, y: 34, number: 1 },
    { role: "Cover Defender", x: 20, y: 20, number: 4 },
    { role: "Libero", x: 16, y: 34, number: 5 },
    { role: "Stopper", x: 20, y: 48, number: 3 },
    { role: "Wing-Back", x: 44, y: 8, number: 2 },
    { role: "Anchor / Destroyer", x: 36, y: 28, number: 6 },
    { role: "Box-to-Box", x: 36, y: 40, number: 8 },
    { role: "Wing-Back", x: 44, y: 60, number: 7 },
    { role: "Advanced Playmaker", x: 62, y: 24, number: 10 },
    { role: "Advanced Playmaker", x: 62, y: 44, number: 11 },
    { role: "Poacher", x: 78, y: 34, number: 9 },
  ],
  "3-5-2": [
    { role: "Sweeper Keeper", x: 10, y: 34, number: 1 },
    { role: "Cover Defender", x: 20, y: 20, number: 4 },
    { role: "Ball-Playing CB", x: 16, y: 34, number: 5 },
    { role: "Stopper", x: 20, y: 48, number: 3 },
    { role: "Wing-Back", x: 48, y: 8, number: 2 },
    { role: "Regista", x: 36, y: 34, number: 6 },
    { role: "Mezzala", x: 50, y: 24, number: 8 },
    { role: "Mezzala", x: 50, y: 44, number: 10 },
    { role: "Wing-Back", x: 48, y: 60, number: 7 },
    { role: "Target Man", x: 74, y: 28, number: 9 },
    { role: "Pressing Forward", x: 74, y: 40, number: 11 },
  ],
  "3-4-1-2": [
    { role: "Ball-Playing GK", x: 10, y: 34, number: 1 },
    { role: "Cover Defender", x: 20, y: 20, number: 4 },
    { role: "Libero", x: 16, y: 34, number: 5 },
    { role: "Stopper", x: 20, y: 48, number: 3 },
    { role: "Wing-Back", x: 44, y: 8, number: 2 },
    { role: "Anchor / Destroyer", x: 36, y: 28, number: 6 },
    { role: "Box-to-Box", x: 36, y: 40, number: 8 },
    { role: "Wing-Back", x: 44, y: 60, number: 7 },
    { role: "Advanced Playmaker", x: 60, y: 34, number: 10 },
    { role: "False Nine", x: 76, y: 26, number: 9 },
    { role: "Poacher", x: 76, y: 42, number: 11 },
  ],
  "5-3-2": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Wing-Back", x: 28, y: 8, number: 2 },
    { role: "Cover Defender", x: 16, y: 22, number: 4 },
    { role: "Stopper", x: 14, y: 34, number: 5 },
    { role: "Cover Defender", x: 16, y: 46, number: 6 },
    { role: "Wing-Back", x: 28, y: 60, number: 3 },
    { role: "Anchor / Destroyer", x: 38, y: 34, number: 8 },
    { role: "Box-to-Box", x: 48, y: 24, number: 10 },
    { role: "Box-to-Box", x: 48, y: 44, number: 7 },
    { role: "Target Man", x: 72, y: 28, number: 9 },
    { role: "Pressing Forward", x: 70, y: 40, number: 11 },
  ],
  "5-4-1": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Defensive Full-Back", x: 26, y: 8, number: 2 },
    { role: "Cover Defender", x: 14, y: 22, number: 4 },
    { role: "Stopper", x: 12, y: 34, number: 5 },
    { role: "Cover Defender", x: 14, y: 46, number: 6 },
    { role: "Defensive Full-Back", x: 26, y: 60, number: 3 },
    { role: "Winger", x: 42, y: 14, number: 7 },
    { role: "Anchor / Destroyer", x: 36, y: 28, number: 8 },
    { role: "Box-to-Box", x: 36, y: 40, number: 10 },
    { role: "Winger", x: 42, y: 54, number: 11 },
    { role: "Target Man", x: 68, y: 34, number: 9 },
  ],
  "5-2-3": [
    { role: "Sweeper Keeper", x: 8, y: 34, number: 1 },
    { role: "Wing-Back", x: 30, y: 8, number: 2 },
    { role: "Cover Defender", x: 16, y: 22, number: 4 },
    { role: "Ball-Playing CB", x: 14, y: 34, number: 5 },
    { role: "Cover Defender", x: 16, y: 46, number: 6 },
    { role: "Wing-Back", x: 30, y: 60, number: 3 },
    { role: "Regista", x: 38, y: 28, number: 8 },
    { role: "Anchor / Destroyer", x: 38, y: 40, number: 10 },
    { role: "Inverted Winger", x: 70, y: 14, number: 7 },
    { role: "False Nine", x: 76, y: 34, number: 9 },
    { role: "Inverted Winger", x: 70, y: 54, number: 11 },
  ],
  "4-5-1": [
    { role: "Traditional GK", x: 8, y: 34, number: 1 },
    { role: "Defensive Full-Back", x: 22, y: 10, number: 2 },
    { role: "Stopper", x: 16, y: 26, number: 4 },
    { role: "Cover Defender", x: 16, y: 42, number: 5 },
    { role: "Defensive Full-Back", x: 22, y: 58, number: 3 },
    { role: "Winger", x: 48, y: 10, number: 7 },
    { role: "Box-to-Box", x: 40, y: 24, number: 8 },
    { role: "Anchor / Destroyer", x: 36, y: 34, number: 6 },
    { role: "Box-to-Box", x: 40, y: 44, number: 10 },
    { role: "Winger", x: 48, y: 58, number: 11 },
    { role: "Target Man", x: 70, y: 34, number: 9 },
  ],
  "4-1-2-3": [
    { role: "Sweeper Keeper", x: 8, y: 34, number: 1 },
    { role: "Attacking Full-Back", x: 26, y: 10, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Inverted Full-Back", x: 26, y: 58, number: 3 },
    { role: "Anchor / Destroyer", x: 34, y: 34, number: 6 },
    { role: "Mezzala", x: 50, y: 24, number: 8 },
    { role: "Mezzala", x: 50, y: 44, number: 10 },
    { role: "Inverted Winger", x: 72, y: 12, number: 7 },
    { role: "False Nine", x: 78, y: 34, number: 9 },
    { role: "Inverted Winger", x: 72, y: 56, number: 11 },
  ],
  "4-3-2-1": [
    { role: "Ball-Playing GK", x: 8, y: 34, number: 1 },
    { role: "Inverted Full-Back", x: 24, y: 12, number: 2 },
    { role: "Ball-Playing CB", x: 18, y: 26, number: 4 },
    { role: "Cover Defender", x: 18, y: 42, number: 5 },
    { role: "Inverted Full-Back", x: 24, y: 56, number: 3 },
    { role: "Regista", x: 36, y: 34, number: 6 },
    { role: "Mezzala", x: 48, y: 24, number: 8 },
    { role: "Box-to-Box", x: 48, y: 44, number: 10 },
    { role: "Advanced Playmaker", x: 64, y: 26, number: 7 },
    { role: "Advanced Playmaker", x: 64, y: 42, number: 11 },
    { role: "Poacher", x: 80, y: 34, number: 9 },
  ],
};

export const FORMATION_IDS = Object.keys(FORMATIONS) as FormationId[];

export function spawnTeam(
  formation: FormationId,
  team: "home" | "away",
  lineHeight = 32
): PlayerToken[] {
  const slots = FORMATIONS[formation];
  const shift = (lineHeight - 32) * 0.35;
  return slots.map((s, i) => {
    let x = s.x + (team === "home" ? shift : -shift);
    let y = s.y;
    if (team === "away") {
      x = 105 - s.x - shift;
      y = 68 - s.y;
    }
    return {
      id: `${team}-${i + 1}`,
      team,
      role: s.role,
      x: Math.min(102, Math.max(3, x)),
      y,
      stamina: 86 + ((i * 7) % 12),
      number: s.number,
    };
  });
}

export function transformInPossession(players: PlayerToken[], base: FormationId): PlayerToken[] {
  if (base !== "4-3-3" && base !== "4-1-2-3") return players;
  return players.map((p) => {
    if (p.team !== "home") return p;
    if (p.role.includes("Inverted Full-Back")) return { ...p, x: 36, y: 40 };
    if (p.role.includes("Attacking Full-Back") && p.y < 34) return { ...p, x: 22, y: 22 };
    if (p.role.includes("Mezzala")) return { ...p, x: 62, y: 20 };
    if (p.role.includes("Box-to-Box")) return { ...p, x: 62, y: 48 };
    if (p.role.includes("Inverted Winger") && p.y < 34) return { ...p, x: 78, y: 8 };
    if (p.role.includes("Inverted Winger")) return { ...p, x: 78, y: 60 };
    if (p.role.includes("False Nine") || p.role.includes("Poacher")) return { ...p, x: 82, y: 34 };
    return p;
  });
}

export const FORMATION_META: Record<
  FormationId,
  { strengths: string; weaknesses: string; weakZone: string; restDefense: string }
> = {
  "4-3-3": {
    strengths: "Width + half-space 8s; easy 3-2-5 rest-attack.",
    weaknesses: "Full-back inversion can leave the far-side channel.",
    weakZone: "Half-space behind inverting full-back",
    restDefense: "3+2",
  },
  "4-2-3-1": {
    strengths: "Double pivot press resistance; 10 in Zone 14.",
    weaknesses: "Wide 10 isolation if wingers tuck too early.",
    weakZone: "Half-spaces beside the double pivot",
    restDefense: "2+3",
  },
  "4-4-2": {
    strengths: "Horizontal compactness; two-striker press.",
    weaknesses: "Outnumbered in midfield 2v3.",
    weakZone: "Central midfield pocket",
    restDefense: "4+2",
  },
  "4-1-4-1": {
    strengths: "Single pivot shield of Zone 14; mid-block density.",
    weaknesses: "Striker isolation; slow box occupation.",
    weakZone: "Between pivot and back four",
    restDefense: "4+1",
  },
  "4-4-1-1": {
    strengths: "Second-striker link; compact 4-4 rest.",
    weaknesses: "Narrow chance creation.",
    weakZone: "Wide attacking third",
    restDefense: "4+2",
  },
  "4-3-1-2": {
    strengths: "Central overloads; diamond 10.",
    weaknesses: "No natural width without full-backs.",
    weakZone: "Touchline 1v1 vs wing-backs",
    restDefense: "4+1",
  },
  "4-2-2-2": {
    strengths: "Interior forwards in half-spaces (Magista).",
    weaknesses: "Wings empty unless full-backs fly.",
    weakZone: "Wide channels",
    restDefense: "2+2",
  },
  "4-2-4": {
    strengths: "Immediate vertical threat.",
    weaknesses: "Catastrophic rest-defense.",
    weakZone: "Space behind full-backs",
    restDefense: "2+2",
  },
  "3-4-3": {
    strengths: "5-lane occupation; wing-back width.",
    weaknesses: "Wing-back recovery distance.",
    weakZone: "Half-space if WB jumps",
    restDefense: "3+2",
  },
  "3-4-2-1": {
    strengths: "Two 10s between lines.",
    weaknesses: "Striker service if 10s are marked.",
    weakZone: "Wide rest-defense",
    restDefense: "3+2",
  },
  "3-5-2": {
    strengths: "Midfield 3; target + runner pair.",
    weaknesses: "Box occupation vs back five.",
    weakZone: "Half-spaces vs 4-3-3 wingers",
    restDefense: "3+3",
  },
  "3-4-1-2": {
    strengths: "Central 1-2 combination.",
    weaknesses: "Wide overload conceded.",
    weakZone: "Flanks",
    restDefense: "3+2",
  },
  "5-3-2": {
    strengths: "Box density; counter channels.",
    weaknesses: "Passive territorial concession.",
    weakZone: "Zone 14 if midfield is pinned",
    restDefense: "5+3",
  },
  "5-4-1": {
    strengths: "Low-block compactness <30m.",
    weaknesses: "Outlet isolation; fatigue chasing.",
    weakZone: "Edge of box / cutback corridor",
    restDefense: "5+4",
  },
  "5-2-3": {
    strengths: "Front three press + back five safety.",
    weaknesses: "2-man midfield bypassed.",
    weakZone: "Central corridor",
    restDefense: "5+2",
  },
  "4-5-1": {
    strengths: "Mid-block lanes; winger tracking.",
    weaknesses: "Lone striker hold-up burden.",
    weakZone: "Between 9 and midfield",
    restDefense: "4+5",
  },
  "4-1-2-3": {
    strengths: "3-2-5 morph; qualitative wide 1v1.",
    weaknesses: "Pivot isolated vs two 8s.",
    weakZone: "Beside the 6",
    restDefense: "3+2",
  },
  "4-3-2-1": {
    strengths: "Christmas-tree half-space 10s.",
    weaknesses: "Width and box numbers.",
    weakZone: "Wide final third",
    restDefense: "4+3",
  },
};
