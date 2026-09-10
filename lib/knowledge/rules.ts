export interface Principle {
  id: string;
  category: string;
  principle: string;
  description: string;
  condition: string;
  playerAction: string;
  teamAction: string;
  expected: string;
  risk: string;
  counter: string;
}

export interface MovementRule {
  id: string;
  trigger: string;
  player: string;
  currentZone: string;
  movement: string;
  targetZone: string;
  purpose: string;
  teammate: string;
  opponent: string;
  risk: string;
}

export interface PressRule {
  id: string;
  trigger: string;
  presser: string;
  support: string;
  cover: string;
  direction: string;
  targetZone: string;
  trap: string;
  expected: string;
  risk: string;
}

export interface PassRule {
  id: string;
  ballZone: string;
  receiver: string;
  passType: string;
  targetZone: string;
  purpose: string;
  pressure: string;
  risk: string;
  expected: string;
}

const lanes = ["RW", "RHS", "CZ", "LHS", "LW"] as const;
const thirds = ["defensive third", "middle third", "attacking third"] as const;
const players = [
  "inverted full-back",
  "mezzala",
  "false nine",
  "inverted winger",
  "regista",
  "wing-back",
  "ball-playing CB",
  "anchor",
  "poacher",
  "attacking full-back",
] as const;
const triggers = [
  "back pass",
  "slow first touch",
  "pass toward sideline",
  "weak-foot reception",
  "CB receiving square",
  "GK on the ball",
  "isolated full-back",
  "horizontal pass in middle third",
  "ball travelling backwards",
  "second-ball bounce",
] as const;

export function principles(): Principle[] {
  const cats = [
    "space",
    "superiority",
    "pressing",
    "rest-defense",
    "build-up",
    "final-third",
    "transition",
    "set-piece",
    "game-state",
    "offside",
  ];
  const out: Principle[] = [];
  let n = 1;
  const seeds: Array<Omit<Principle, "id">> = [
    { category: "space", principle: "Occupy five lanes", description: "At least one player in each vertical corridor in possession.", condition: "Settled possession, middle/final third", playerAction: "Wingers hold touchline", teamAction: "8s occupy half-spaces, 9 pins", expected: "Stretch defensive width", risk: "Thin rest-defense", counter: "Touchline trap + compact 5-4-1" },
    { category: "space", principle: "Max 3 on a horizontal line", description: "Positional play staggering.", condition: "Build-up vs organised block", playerAction: "Drop or push off the line", teamAction: "Create passing ladders", expected: "Line-breaking angles", risk: "Over-stagger loses compactness", counter: "Jump the free player immediately" },
    { category: "superiority", principle: "Create 3v2 wide", description: "FB + winger + mezzala vs FB + wide mid.", condition: "Ball in attacking half-space", playerAction: "Mezzala underlaps", teamAction: "Far-side winger stays wide", expected: "Cutback lane", risk: "Opposite channel counter", counter: "Weak-side striker pins far CB" },
    { category: "pressing", principle: "Cover shadow the 6", description: "Presser's body denies the pivot.", condition: "High press vs 4-3-3", playerAction: "9 curves run", teamAction: "8s jump CBs if bounce", expected: "Force wide", risk: "Chip over 9", counter: "GK lofted into 9" },
    { category: "rest-defense", principle: "Keep 3+2 behind the ball", description: "Three defenders + two pivots.", condition: "Attacking third possession", playerAction: "IFB tucks", teamAction: "Hold 3-2 rest", expected: "Survive turnover 5s", risk: "Fewer box attackers", counter: "Direct channel ball behind IFB" },
    { category: "build-up", principle: "Split CBs, GK as third", description: "Create 3v2 vs two strikers.", condition: "Opponent 4-4-2 high press", playerAction: "GK steps between", teamAction: "Full-backs high or invert", expected: "Free 6", risk: "Press trap on GK", counter: "Striker jump + 8 screens 6" },
    { category: "final-third", principle: "Prefer cutback to aerial cross vs compact box", description: "Low cutback to edge/near zone 14.", condition: "5-4-1 low block", playerAction: "Byline carrier cutback", teamAction: "Late 8 at 18 yards", expected: "Higher xG", risk: "Blocked lane / counter", counter: "Narrow the cutback corridor with WB" },
    { category: "transition", principle: "Gegenpress 5-6 seconds", description: "Immediate recovery around loss.", condition: "Turnover in attacking third", playerAction: "Nearest 3 collapse", teamAction: "Lock inside", expected: "Regain or foul", risk: "If fail, rest-defense exposed", counter: "First-time vertical bypass" },
    { category: "game-state", principle: "Protect a 1-goal lead after 75'", description: "Lower line 8-12m, keep compactness <30m.", condition: "Winning, late", playerAction: "Wingers drop 4-4-2/5-4-1", teamAction: "Fewer inverted FBs", expected: "Limit xG", risk: "Territory conceded", counter: "Opponent overload Zone 14" },
    { category: "offside", principle: "Step as a unit on the pass", description: "Line jumps on attacker’s first touch, not on the kick.", condition: "High line vs through-ball", playerAction: "Cover CB commands", teamAction: "Synchronised step", expected: "Trap", risk: "Desync → 1v1 GK", counter: "Timed blind-side run" },
  ];
  for (const s of seeds) out.push({ id: `P${String(n++).padStart(3, "0")}`, ...s });
  for (const cat of cats) {
    for (const lane of lanes) {
      out.push({
        id: `P${String(n++).padStart(3, "0")}`,
        category: cat,
        principle: `${cat} control of ${lane}`,
        description: `If the ball is near ${lane}, occupy or deny that corridor according to ${cat} principles.`,
        condition: `Ball in ${lane} during ${cat}`,
        playerAction: `Nearest specialist attacks or screens ${lane}`,
        teamAction: `Shift as a block; far-side tucks 8-12m`,
        expected: `Local superiority or denied progression`,
        risk: `Far-side switch if shift is late`,
        counter: `Switch of play into vacated ${lane === "RW" ? "LW" : lane === "LW" ? "RW" : "CZ"}`,
      });
      if (out.length >= 120) return out;
    }
  }
  return out;
}

export function movementRules(): MovementRule[] {
  const moves = [
    "overlap",
    "underlap",
    "invert",
    "third-man run",
    "decoy",
    "blind-side",
    "depth run",
    "recovery",
    "rotation",
    "box entry",
  ] as const;
  const out: MovementRule[] = [];
  let n = 1;
  out.push({
    id: "M001",
    trigger: "Winger receives in wide attacking third; FB overlaps",
    player: "inverted winger",
    currentZone: "LW/RW",
    movement: "out-to-in into half-space",
    targetZone: "LHS/RHS",
    purpose: "Open outside lane and shoot/combine",
    teammate: "FB continues overlap",
    opponent: "FB must choose inside or outside",
    risk: "Offside if CBs step",
  });
  for (const p of players) {
    for (const m of moves) {
      const third = thirds[n % 3];
      const lane = lanes[n % 5];
      out.push({
        id: `M${String(++n).padStart(3, "0")}`,
        trigger: `${p} sees ${m} trigger: free space or 2v1 in ${lane}`,
        player: p,
        currentZone: `${third} ${lane}`,
        movement: m,
        targetZone: m === "recovery" ? "defensive third" : "attacking third " + lane,
        purpose: `${m} to create or deny space`,
        teammate: "Nearest support occupies opposite lane",
        opponent: "Marker either follows (space behind) or holds (receiver free)",
        risk: m === "overlap" ? "rest-defense hole" : m === "depth run" ? "offside" : "loss of compactness",
      });
      if (out.length >= 110) return out;
    }
  }
  return out;
}

export function pressRules(): PressRule[] {
  const out: PressRule[] = [];
  let n = 1;
  const pressers = ["pressing forward", "8", "winger", "wing-back", "inverted FB"] as const;
  for (const t of triggers) {
    for (const p of pressers) {
      out.push({
        id: `PR${String(n++).padStart(3, "0")}`,
        trigger: t,
        presser: p,
        support: "nearest 8 locks inside",
        cover: "6 covers Zone 14 / cover shadow",
        direction: t.includes("sideline") ? "show down the line" : "curve inside, deny CZ",
        targetZone: t.includes("GK") ? "defensive third" : "ball-side half-space",
        trap: t.includes("sideline") ? "touchline trap" : "force weak-foot or back to GK",
        expected: "turnover or backwards pass",
        risk: "third-man bounce if jump is late",
      });
      if (out.length >= 110) return out;
    }
  }
  return out;
}

export function passRules(): PassRule[] {
  const types = ["short", "driven", "chip", "through-ball", "switch", "cutback", "layoff", "third-man"] as const;
  const out: PassRule[] = [];
  let n = 1;
  for (const third of thirds) {
    for (const lane of lanes) {
      for (const type of types) {
        out.push({
          id: `PA${String(n++).padStart(3, "0")}`,
          ballZone: `${third} ${lane}`,
          receiver: type === "cutback" ? "late 8 / far 9" : type === "switch" ? "far winger" : "free 8 or 10",
          passType: type,
          targetZone:
            type === "cutback"
              ? "edge of box / Zone 14"
              : type === "switch"
                ? "opposite wing"
                : "next vertical lane",
          purpose: type === "through-ball" ? "penetration" : type === "switch" ? "relocate block" : "progression",
          pressure: lane === "CZ" ? "high" : "medium",
          risk: type === "through-ball" ? "offside / interception cone" : type === "switch" ? "intercepted aerial" : "press on receiver",
          expected: type === "cutback" ? "0.15-0.30 xG" : "retain + xT gain",
        });
        if (out.length >= 120) return out;
      }
    }
  }
  return out;
}

export const COUNTER_MATRIX = [
  { a: "High press", b: "Short build-up", adv: "Forces errors in first line", weak: "Space behind pressers", counter: "Lofted into vacated channel or third-man bounce", result: "If CBs are slow, long build-up wins" },
  { a: "High press", b: "Long build-up", adv: "Can win first contact if athletic", weak: "Second balls if 9 is isolated", counter: "Rest-defense 3+2 and midfield box-out", result: "Territorial but chaotic" },
  { a: "Low block", b: "Possession / tiki-taka", adv: "Protects box, low xG shots", weak: "Cutbacks and switches", counter: "Patient 3-2-5 + cutback 8s", result: "Low event game unless quality 1v1" },
  { a: "Low block", b: "Crossing", adv: "Aerial numbers in 18", weak: "Cutback corridor", counter: "Low cutbacks + far-post delayed runs", result: "Crosses underperform vs 5-4-1" },
  { a: "Tiki-taka", b: "High press", adv: "3v2 GK+CBs if prepared", weak: "First-line turnover", counter: "Invert FB, GK as 3rd, or go long once", result: "Depends on press resistance" },
  { a: "Gegenpress", b: "Direct football", adv: "If loss is around box, regain", weak: "Bypass with 2 vertical passes", counter: "First-time channel balls", result: "Direct often wins the 6-second window" },
  { a: "Wing play", b: "Narrow defence", adv: "1v1 isolations", weak: "Inside combinations conceded if overcommit", counter: "Underlap 8 + switch", result: "Width stretches then cutback" },
  { a: "Central attack", b: "Wide defence", adv: "Zone 14 free", weak: "If CBs jump, no width outlet", counter: "Pin CBs with 9, 10 receives", result: "High xT if 10 is free" },
  { a: "Man marking", b: "Positional play", adv: "Removes qualitative 1v1", weak: "Rotations create 3rd-man free", counter: "Interchange 8/FB/winger", result: "Rotations usually break man-mark" },
  { a: "Zonal defence", b: "Rotations", adv: "Protects space not shirts", weak: "Occupancy mismatches at edges", counter: "Flood one zone then switch", result: "Switch after overload" },
  { a: "Park the bus", b: "Possession", adv: "Game-state protection", weak: "Set pieces + cutbacks", counter: "Rest-defense stay 3+2 while recycling", result: "Need a moment of quality" },
  { a: "Counterattack", b: "High line", adv: "Space to attack", weak: "If rest-defense 3+2 is set, counters die", counter: "Hold 3+2, delay runner", result: "Biggest xG swings" },
];

export const STYLES = [
  { id: "Tiki-Taka", principles: "Short circulation, positional rest, bait", formation: "4-3-3 / 4-3-2-1", passing: "short, third-man", pressing: "counter-press 5s", defend: "high rest-defense 3+2", weak: "compact 5-4-1 cutback denial", counters: "vertical first-time balls" },
  { id: "Positional Play", principles: "Superiorities + 5 lanes + stagger", formation: "4-3-3 → 3-2-5", passing: "line-breaking then pausa", pressing: "hybrid, cover shadows", defend: "3+2", weak: "hyper-compact central block", counters: "touchline traps" },
  { id: "Gegenpressing", principles: "Win it back where you lost it", formation: "4-2-3-1 / 4-3-3", passing: "vertical after regain", pressing: "aggressive triggers", defend: "high, athletic", weak: "fatigue + long bypass", counters: "direct over press" },
  { id: "Pragmatic Low Block", principles: "Deny CZ, funnel wide, vertical transition", formation: "5-4-1 / 5-3-2", passing: "direct 2-4 passes", pressing: "low, trap wide", defend: "compact <30m", weak: "Zone 14 cutbacks", counters: "patient overload + late 8" },
  { id: "Direct Transition", principles: "Space scores, not possession", formation: "4-4-2 / 4-2-4", passing: "channel balls", pressing: "mid, then sprint", defend: "mid-block", weak: "if trapped in own third", counters: "rest-defense + delay" },
  { id: "Wing Play", principles: "Isolate FB, cross/cutback", formation: "4-3-3 / 3-4-3", passing: "switch then 1v1", pressing: "trap inside", defend: "wide rest", weak: "narrow elite CBs", counters: "WB support + inside trap" },
];
