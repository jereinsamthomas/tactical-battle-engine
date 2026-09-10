export interface RoleProfile {
  id: string;
  group: "GK" | "DF" | "MF" | "FW";
  primary: string;
  defensive: string;
  attacking: string;
  zones: string;
  passing: string;
  pressing: string;
  transition: string;
  combos: string;
  strengths: string;
  weaknesses: string;
}

export const ROLES: RoleProfile[] = [
  { id: "Traditional GK", group: "GK", primary: "Shot-stopping inside 6-yard box", defensive: "Organise wall and box", attacking: "Direct clearance under pressure", zones: "x 0-12, y 24-44", passing: "Long, safe", pressing: "Rarely leaves box", transition: "Restart quickly to target", combos: "Target man", strengths: "Aerial command", weaknesses: "Build-up press" },
  { id: "Sweeper Keeper", group: "GK", primary: "Clear space behind high line (x 18-30)", defensive: "Sweep through-balls", attacking: "Auxiliary pivot", zones: "x 8-30 CZ", passing: "Driven into midfield", pressing: "Starts counters from interceptions", transition: "First progressive pass", combos: "High CBs", strengths: "Range", weaknesses: "Chips over if too high" },
  { id: "Ball-Playing GK", group: "GK", primary: "Split CBs, bait press", defensive: "Claims crosses", attacking: "Line-breaking chips", zones: "edge of box", passing: "Diagonal switches", pressing: "Body as outlet", transition: "Reset vs press", combos: "BPCB", strengths: "Press resistance", weaknesses: "Turnovers on first touch" },
  { id: "Centre-back", group: "DF", primary: "Defend box and aerial duels", defensive: "Hold line", attacking: "Simple into 6", zones: "defensive third CZ/half-space", passing: "Short/safe", pressing: "Selective step", transition: "Delay runners", combos: "Cover partner", strengths: "Duels", weaknesses: "Progression" },
  { id: "Ball-Playing CB", group: "DF", primary: "Step into midfield", defensive: "Cover on blind side after carry", attacking: "Diagonal switches, drives", zones: "x 18-45", passing: "Line-breaking", pressing: "Bait then release", transition: "Secure first pass", combos: "Regista", strengths: "Progression", weaknesses: "Space behind carry" },
  { id: "Stopper", group: "DF", primary: "Step +10-15m vs target", defensive: "Prevent turns, high duel aggression", attacking: "Rare", zones: "ahead of partner", passing: "Clearance/simple", pressing: "Aggressive jump", transition: "Must be covered", combos: "Cover Defender", strengths: "First contact", weaknesses: "Blind-side runs" },
  { id: "Cover Defender", group: "DF", primary: "Drop 3-5m, sweep through-balls", defensive: "Offside line manager", attacking: "Switch", zones: "deeper CZ", passing: "Safe then progressive", pressing: "Holds", transition: "Last defender", combos: "Stopper", strengths: "Anticipation", weaknesses: "1v1 if isolated" },
  { id: "Libero", group: "DF", primary: "Drop off or step into midfield from a 3", defensive: "Sweep + organise", attacking: "First progressive carrier", zones: "central corridor", passing: "Regista-like", pressing: "Delayed", transition: "Rest-defense captain", combos: "Wing-backs", strengths: "Vision", weaknesses: "Pace vs channels" },
  { id: "Full-back", group: "DF", primary: "Width in both phases", defensive: "1v1 wide", attacking: "Overlap/cross", zones: "RW/LW", passing: "Cutbacks, switches", pressing: "Trap to touchline", transition: "Recovery run", combos: "Winger", strengths: "Stamina", weaknesses: "Half-space holes" },
  { id: "Defensive Full-Back", group: "DF", primary: "Hold height, protect channel", defensive: "Narrow when ball far", attacking: "Safe underlap only", zones: "defensive/middle wing", passing: "Back inside", pressing: "Show down the line", transition: "First recovery", combos: "Winger tracking", strengths: "Discipline", weaknesses: "Attacking 1v1" },
  { id: "Attacking Full-Back", group: "DF", primary: "High overlap/underlap", defensive: "Depends on rest-defense", attacking: "Byline cutbacks", zones: "final-third wing", passing: "Cutback, low cross", pressing: "Counter-press wide", transition: "Highest recovery cost", combos: "Inverted winger", strengths: "Width", weaknesses: "Space behind" },
  { id: "Wing-Back", group: "DF", primary: "Maximum width in a 3/5", defensive: "Drop to back 5", attacking: "Early crosses + underlaps", zones: "touchline full length", passing: "Cutback / switch", pressing: "Jump with trigger", transition: "5-4-1 morph", combos: "Interior 10", strengths: "Lane occupation", weaknesses: "Fatigue" },
  { id: "Inverted Full-Back", group: "DF", primary: "Tuck Y 20-48 to double pivot / back-3", defensive: "Central rest-defense", attacking: "Third-man wall", zones: "CZ/half-space", passing: "Vertical into 8s", pressing: "Cover shadow on 10", transition: "2+3 or 3+2", combos: "Anchor", strengths: "Central control", weaknesses: "Far-side isolation" },
  { id: "Anchor / Destroyer", group: "MF", primary: "Zone 14 shield, retention", defensive: "Screen, intercept", attacking: "Simple first pass", zones: "x 25-45 CZ", passing: "Safe, short", pressing: "Delay, don't dive", transition: "Foul if last line", combos: "CBs", strengths: "Positioning", weaknesses: "Progressive passing" },
  { id: "Regista", group: "MF", primary: "La pausa, switches from Zone 8", defensive: "Cover shadow on 10", attacking: "Tempo dictator", zones: "x 25-45", passing: "Diagonal 40m+", pressing: "Passive until trigger", transition: "First switch vs press", combos: "Free 8s", strengths: "Vision", weaknesses: "Athletic duels" },
  { id: "Deep-Lying Playmaker", group: "MF", primary: "Same as regista with slightly higher risk", defensive: "Angle cover", attacking: "Line-breaking", zones: "middle third", passing: "Vertical + switch", pressing: "Body orientation", transition: "Secure", combos: "BPCB", strengths: "Progression", weaknesses: "Pressing distance" },
  { id: "Box-to-Box", group: "MF", primary: "X 18-90, late box crash, second balls", defensive: "Counter-press then recover", attacking: "Edge-of-box shots", zones: "half-spaces", passing: "Wall + third-man", pressing: "Aggressive triggers", transition: "First 6s sprint", combos: "Mezzala pair", strengths: "Stamina", weaknesses: "Positional holes" },
  { id: "Mezzala", group: "MF", primary: "Attack half-spaces, underlap wingers, 3v2 wide", defensive: "Track inverted 8", attacking: "Arrive Zone 14", zones: "RHS/LHS", passing: "Through-ball, cutback receive", pressing: "Jump on backwards pass", transition: "If loses, rest-defense gap", combos: "Winger + FB", strengths: "Overloads", weaknesses: "Central vacancy" },
  { id: "Advanced Playmaker", group: "MF", primary: "Zone 14 half-turn through-balls", defensive: "First press on 6", attacking: "Between-lines receive", zones: "Zone 14", passing: "Split, chipped", pressing: "Cover shadow on pivot", transition: "Counter-press or foul", combos: "False nine", strengths: "Vision", weaknesses: "Physical 6s" },
  { id: "Winger", group: "FW", primary: "Hold width, 1v1, early/late cross", defensive: "Track FB, 4-4-2 morph", attacking: "Isolate FB", zones: "RW/LW", passing: "Cross, cutback", pressing: "Curve inside to trap", transition: "First sprint back", combos: "Overlap FB", strengths: "1v1", weaknesses: "Central help" },
  { id: "Inverted Winger", group: "FW", primary: "Cut wing → half-space onto strong foot", defensive: "Tuck to 4-4-2", attacking: "Shoot / combine", zones: "wing then RHS/LHS", passing: "Diagonal, through", pressing: "Inside-out press", transition: "Counter-press near ball", combos: "Underlapping 8", strengths: "Chance quality", weaknesses: "Width loss" },
  { id: "Inside Forward", group: "FW", primary: "Finish from half-space", defensive: "Press CB inside", attacking: "Blind-side near post", zones: "half-space / box", passing: "Layoff", pressing: "High", transition: "Stay high if rest-defense set", combos: "10", strengths: "Finishing", weaknesses: "Tracking FBs" },
  { id: "False Nine", group: "FW", primary: "Drop 90→68, drag CBs, release runners", defensive: "First press then delay", attacking: "Link 8s", zones: "middle/attacking CZ", passing: "Third-man", pressing: "Screen pivot", transition: "Must not leave 2v1 behind", combos: "Inside forwards", strengths: "Manipulation", weaknesses: "Box occupation" },
  { id: "Target Man", group: "FW", primary: "Pin CBs, aerial, wall", defensive: "Set block", attacking: "Hold-up", zones: "box / CZ", passing: "Layoff first time", pressing: "Selective", transition: "Outlet", combos: "Second striker", strengths: "Duels", weaknesses: "Pace in behind" },
  { id: "Poacher", group: "FW", primary: "Offside shoulder, near-post, 6-18 yard", defensive: "Minimal", attacking: "Finish", zones: "penalty box", passing: "Rare", pressing: "From front only if trigger", transition: "Stay high", combos: "Crossers", strengths: "Timing", weaknesses: "Build-up" },
  { id: "Pressing Forward", group: "FW", primary: "Angle CBs into trap", defensive: "First line of press", attacking: "Second balls", zones: "high CZ", passing: "Simple", pressing: "Aggressive triggers", transition: "Gegenpress leader", combos: "8s", strengths: "Work rate", weaknesses: "Chance volume" },
  { id: "Second Striker", group: "FW", primary: "Link 9 and 8s, half-turn", defensive: "Help press 6", attacking: "Late box", zones: "Zone 14", passing: "Through", pressing: "Hybrid", transition: "Secure", combos: "Target man", strengths: "Combination", weaknesses: "Width" },
];

export const ROLE_ATTRIBUTES: Record<string, Record<string, number>> = Object.fromEntries(
  ROLES.map((r, i) => {
    const base = {
      pace: 12, acceleration: 12, agility: 12, strength: 12, stamina: 13,
      positioning: 14, vision: 12, passing: 13, shortPassing: 13, longPassing: 11,
      crossing: 10, dribbling: 11, ballControl: 13, firstTouch: 13, finishing: 8,
      heading: 10, tackling: 11, interceptions: 12, defensiveAwareness: 12,
      anticipation: 13, decisionMaking: 13, composure: 13, workRate: 13,
      aggression: 11, balance: 12, offBall: 13,
    };
    const bump = (k: keyof typeof base, n: number) => {
      base[k] = Math.min(20, base[k] + n);
    };
    if (r.group === "GK") {
      bump("positioning", 4); bump("composure", 3); bump("longPassing", 2);
    }
    if (r.id.includes("Winger") || r.id.includes("Wing")) {
      bump("pace", 5); bump("dribbling", 4); bump("crossing", 4);
    }
    if (r.id.includes("Anchor") || r.id.includes("Stopper")) {
      bump("tackling", 5); bump("strength", 4); bump("aggression", 3);
    }
    if (r.id.includes("Playmaker") || r.id.includes("Regista")) {
      bump("vision", 6); bump("passing", 5); bump("longPassing", 4);
    }
    if (r.id.includes("Poacher") || r.id.includes("Nine") || r.id.includes("Forward")) {
      bump("finishing", 5); bump("offBall", 4); bump("anticipation", 3);
    }
    bump("stamina", i % 3);
    return [r.id, base];
  })
);
