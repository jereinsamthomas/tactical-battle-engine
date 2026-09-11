import type {
  ComparisonDimension,
  FormationId,
  ParsedTopic,
  TopicType,
} from "../types";

export type WeightPreset =
  | "PEAK"
  | "LONGEVITY"
  | "OVERALL_CAREER"
  | "TACTICAL_IMPACT"
  | "STATISTICAL_PERFORMANCE"
  | "BIG_GAMES"
  | "CUSTOM";

export const FEATURED_OPEN_TOPICS = [
  {
    title: "Messi vs Ronaldo",
    query: "Messi vs Ronaldo",
    type: "player_vs_player" as TopicType,
    badge: "All-Time Debate",
  },
  {
    title: "Guardiola vs Mourinho",
    query: "Guardiola vs Mourinho",
    type: "manager_vs_manager" as TopicType,
    badge: "Ideological Clash",
  },
  {
    title: "Real Madrid 2017 vs Barcelona 2011",
    query: "Real Madrid 2017 vs Barcelona 2011",
    type: "team_vs_team" as TopicType,
    badge: "Peak Era Matchup",
  },
  {
    title: "4-3-3 vs 3-5-2",
    query: "4-3-3 vs 3-5-2",
    type: "formation_vs_formation" as TopicType,
    badge: "Structural Battle",
  },
  {
    title: "Positional Play vs Direct Counterattack",
    query: "Positional Play vs Direct Counterattack",
    type: "philosophy" as TopicType,
    badge: "Football Philosophy",
  },
  {
    title: "Haaland vs Lewandowski",
    query: "Haaland vs Lewandowski",
    type: "player_vs_player" as TopicType,
    badge: "Elite No. 9s",
  },
  {
    title: "High Press vs Low Block",
    query: "High Press vs Low Block",
    type: "tactic_vs_tactic" as TopicType,
    badge: "Spatial Control",
  },
  {
    title: "Is xG a better measure than goals?",
    query: "Is xG a better measure than goals?",
    type: "statistical" as TopicType,
    badge: "Analytics Debate",
  },
  {
    title: "Klopp vs Guardiola",
    query: "Klopp vs Guardiola",
    type: "manager_vs_manager" as TopicType,
    badge: "Gegenpress vs Juego",
  },
  {
    title: "Vinícius Jr vs Salah",
    query: "Vinícius Jr vs Salah",
    type: "player_vs_player" as TopicType,
    badge: "Modern Wingers",
  },
  {
    title: "Zidane vs Ancelotti",
    query: "Zidane vs Ancelotti",
    type: "manager_vs_manager" as TopicType,
    badge: "Man-Management Masters",
  },
  {
    title: "What if Haaland played for 2011 Barcelona?",
    query: "What if Haaland played for 2011 Barcelona?",
    type: "hypothetical" as TopicType,
    badge: "Hypothetical Simulation",
  },
];

export function parseUserTopic(rawInput: string): ParsedTopic {
  const clean = rawInput.trim();
  const lower = clean.toLowerCase();

  const isHypothetical =
    lower.startsWith("what if") ||
    lower.includes("hypothetical") ||
    lower.includes("what would happen if") ||
    lower.includes("could 20");

  let type: TopicType = "custom";
  let entityA = "Perspective A";
  let entityB = "Perspective B";

  // Check for vs / versus splitter
  const vsMatch = clean.split(/\s+(?:vs\.?|versus|or|\/)\s+/i);
  if (vsMatch.length >= 2) {
    entityA = vsMatch[0].trim();
    entityB = vsMatch[1].trim();
  }

  // Type classification heuristics
  const formationsPattern = /\b([345]-[0-9]-[0-9](?:-[0-9])?)\b/i;
  const isFormationA = formationsPattern.test(entityA);
  const isFormationB = formationsPattern.test(entityB);

  if (isFormationA || isFormationB || lower.includes("formation")) {
    type = "formation_vs_formation";
  } else if (
    lower.includes("messi") ||
    lower.includes("ronaldo") ||
    lower.includes("haaland") ||
    lower.includes("mbappé") ||
    lower.includes("mbappe") ||
    lower.includes("lewandowski") ||
    lower.includes("neymar") ||
    lower.includes("ronaldinho") ||
    lower.includes("salah") ||
    lower.includes("vinicius") ||
    lower.includes("de bruyne") ||
    lower.includes("modric") ||
    lower.includes("kane") ||
    lower.includes("pele") ||
    lower.includes("maradona") ||
    lower.includes("cruyff") ||
    lower.includes("striker") ||
    lower.includes("winger") ||
    lower.includes("midfielder") ||
    lower.includes("goalkeeper") ||
    lower.includes("ballon d'or")
  ) {
    type = "player_vs_player";
  } else if (
    lower.includes("guardiola") ||
    lower.includes("mourinho") ||
    lower.includes("klopp") ||
    lower.includes("ancelotti") ||
    lower.includes("ferguson") ||
    lower.includes("arteta") ||
    lower.includes("sacchi") ||
    lower.includes("zidane") ||
    lower.includes("simeone") ||
    lower.includes("manager") ||
    lower.includes("coach")
  ) {
    type = "manager_vs_manager";
  } else if (
    lower.includes("real madrid") ||
    lower.includes("barcelona") ||
    lower.includes("liverpool") ||
    lower.includes("man city") ||
    lower.includes("manchester city") ||
    lower.includes("manchester united") ||
    lower.includes("bayern") ||
    lower.includes("arsenal") ||
    lower.includes("inter") ||
    lower.includes("milan") ||
    lower.includes("juventus") ||
    lower.includes("chelsea") ||
    lower.includes("psg")
  ) {
    type = "team_vs_team";
  } else if (
    lower.includes("press") ||
    lower.includes("block") ||
    lower.includes("counter") ||
    lower.includes("zonal") ||
    lower.includes("man-marking") ||
    lower.includes("inverted") ||
    lower.includes("overlap") ||
    lower.includes("buildup")
  ) {
    type = "tactic_vs_tactic";
  } else if (
    lower.includes("xg") ||
    lower.includes("xa") ||
    lower.includes("xt") ||
    lower.includes("ppda") ||
    lower.includes("stat") ||
    lower.includes("data") ||
    lower.includes("numbers")
  ) {
    type = "statistical";
  } else if (
    lower.includes("philosophy") ||
    lower.includes("positional play") ||
    lower.includes("juego") ||
    lower.includes("direct football") ||
    lower.includes("tiki taka") ||
    lower.includes("catenaccio") ||
    lower.includes("possession")
  ) {
    type = "philosophy";
  } else if (isHypothetical) {
    type = "hypothetical";
  }

  // Time Period & Competition detection
  let timePeriod = "All-Time / Modern Era";
  if (lower.includes("2008") || lower.includes("2011") || lower.includes("2012") || lower.includes("2017") || lower.includes("1989")) {
    const years = clean.match(/\b(19[89][0-9]|20[0-2][0-9])\b/g);
    if (years) timePeriod = years.join(" vs ");
  }

  let competition = "UEFA Champions League & Domestic League";
  if (lower.includes("world cup")) competition = "FIFA World Cup";
  else if (lower.includes("premier league")) competition = "Premier League";
  else if (lower.includes("la liga")) competition = "La Liga";

  // Build specialized comparison dimensions based on classified topic
  const dimensions = buildDimensions(type, entityA, entityB, isHypothetical);

  // Suggested formations for tactical board
  const { homeShape, awayShape } = suggestFormations(type, entityA, entityB);

  const coreDilemma = isHypothetical
    ? `Hypothetical Simulation: Assessing tactical feasibility, spatial compromises, and output variances under simulated elite competition conditions.`
    : `Evaluating the trade-off between structural process, statistical efficiency, peak ceiling, and decisive big-match leverage between ${entityA} and ${entityB}.`;

  return {
    id: `topic-${Date.now()}`,
    rawInput: clean,
    type,
    title: clean,
    entityA,
    entityB,
    timePeriod,
    competition,
    isHypothetical,
    coreDilemma,
    dimensions,
    suggestedHomeFormation: homeShape,
    suggestedAwayFormation: awayShape,
  };
}

function buildDimensions(
  type: TopicType,
  a: string,
  b: string,
  isHypo: boolean
): ComparisonDimension[] {
  if (type === "player_vs_player") {
    const isMessiRonaldo =
      (a.toLowerCase().includes("messi") && b.toLowerCase().includes("ronaldo")) ||
      (a.toLowerCase().includes("ronaldo") && b.toLowerCase().includes("messi"));

    if (isMessiRonaldo) {
      const isMessiA = a.toLowerCase().includes("messi");
      return [
        {
          id: "scoring_volume",
          name: "Scoring Volume & Finishing Efficiency",
          weight: 20,
          scoreA: isMessiA ? 96 : 98,
          scoreB: isMessiA ? 98 : 96,
          unit: "xG/Shot",
          explanation: "Ronaldo: 890+ career goals, peak 1.10 goals/90. Messi: 840+ goals, supreme open-play shot conversion (+0.18 over xG).",
        },
        {
          id: "playmaking_creation",
          name: "Playmaking, Through-Balls & Key Passes",
          weight: 20,
          scoreA: isMessiA ? 99 : 82,
          scoreB: isMessiA ? 82 : 99,
          unit: "xA/90",
          explanation: "Messi: 360+ career assists, 3.4 key passes/90, master of half-space line-breaking through-balls.",
        },
        {
          id: "dribbling_progression",
          name: "Dribbling, Carries & Ball Retention",
          weight: 15,
          scoreA: isMessiA ? 98 : 84,
          scoreB: isMessiA ? 84 : 98,
          unit: "Prog. Carries",
          explanation: "Messi dominates progressive carry volume (6.8/90) and press evasion in tight central zones.",
        },
        {
          id: "big_game_ucl",
          name: "UCL Knockout Decisiveness",
          weight: 15,
          scoreA: isMessiA ? 93 : 99,
          scoreB: isMessiA ? 99 : 93,
          unit: "KO Goals",
          explanation: "Ronaldo: 67 UCL knockout goals, 3 final goals, unprecedented clutch knock-out goalscoring streak.",
        },
        {
          id: "aerial_athleticism",
          name: "Aerial Threat & Penalty Box Presence",
          weight: 10,
          scoreA: isMessiA ? 68 : 99,
          scoreB: isMessiA ? 99 : 68,
          unit: "Aerial Win %",
          explanation: "Ronaldo: 145+ headed goals, 2.93m vertical leap record, dominant far-post pinning.",
        },
        {
          id: "tactical_gravity",
          name: "Tactical Gravity & System Reshaping",
          weight: 10,
          scoreA: isMessiA ? 98 : 91,
          scoreB: isMessiA ? 91 : 98,
          unit: "Spatial Pull",
          explanation: "Messi distorts opponent defensive blocks as false nine/inside creator; Ronaldo demands dedicated wing service.",
        },
        {
          id: "longevity_trophies",
          name: "Longevity, World Cup & Trophies",
          weight: 10,
          scoreA: isMessiA ? 99 : 95,
          scoreB: isMessiA ? 95 : 99,
          unit: "Major Titles",
          explanation: "Messi: 44 trophies including 2022 World Cup & 8 Ballons d'Or. Ronaldo: 5 UCLs, Euro 2016, 5 Ballons d'Or.",
        },
      ];
    }

    return [
      { id: "scoring", name: "Goalscoring & Finishing", weight: 25, scoreA: 88, scoreB: 85, explanation: "Open-play efficiency and penalty box conversion." },
      { id: "creation", name: "Chance Creation & Assists", weight: 20, scoreA: 82, scoreB: 86, explanation: "Key passes, progressive passes, and crossing accuracy." },
      { id: "ball_progression", name: "Progression & Dribbling", weight: 15, scoreA: 84, scoreB: 89, explanation: "Take-ons, carries into final third, and line-breaking runs." },
      { id: "defensive_work", name: "Pressing & Defensive Workload", weight: 10, scoreA: 78, scoreB: 72, explanation: "Pressures in attacking third and counter-press regains." },
      { id: "big_games", name: "Big Game & Knockout Impact", weight: 15, scoreA: 90, scoreB: 87, explanation: "Decisive contributions in finals, derbies, and elimination matches." },
      { id: "longevity", name: "Peak vs Longevity Consistency", weight: 15, scoreA: 85, scoreB: 88, explanation: "Sustained output across multiple seasons and tactical eras." },
    ];
  }

  if (type === "team_vs_team" || type === "era_vs_era") {
    return [
      { id: "possession_buildup", name: "Buildup Structure & Ball Control", weight: 20, scoreA: 94, scoreB: 88, explanation: "Circulation under high press and progressive corridor control." },
      { id: "pressing_compactness", name: "Pressing Intensity & Rest Defense", weight: 20, scoreA: 90, scoreB: 85, explanation: "PPDA, rest defense staggered lines, and counter-press recovery." },
      { id: "chance_creation", name: "xG Creation & Penetration", weight: 20, scoreA: 92, scoreB: 91, explanation: "Box entries, open-play xG, and half-space combination speed." },
      { id: "transition_speed", name: "Defensive Transition & Vulnerability", weight: 15, scoreA: 84, scoreB: 93, explanation: "Reaction to sudden turnovers and pace defending deep channels." },
      { id: "tactical_adaptability", name: "Game Management & Adaptability", weight: 15, scoreA: 88, scoreB: 92, explanation: "In-game adjustments when trailing or defending slim leads." },
      { id: "silverware", name: "Dominance & Silverware Peak", weight: 10, scoreA: 96, scoreB: 95, explanation: "Trophies secured in peak cycle (Treble vs back-to-back UCLs)." },
    ];
  }

  if (type === "manager_vs_manager") {
    return [
      { id: "tactical_innovation", name: "Tactical Innovation & Blueprint", weight: 25, scoreA: 96, scoreB: 88, explanation: "Influence on modern game philosophy, spatial concepts, and player roles." },
      { id: "league_consistency", name: "League Dominance & Repeatability", weight: 20, scoreA: 95, scoreB: 86, explanation: "Points per match, high win percentages over 38-game marathons." },
      { id: "knockout_clutch", name: "Knockout Strategy & Cup Decisiveness", weight: 20, scoreA: 85, scoreB: 95, explanation: "Tactical adaptations in two-legged European knockout ties." },
      { id: "player_development", name: "Player Development & Peak Extraction", weight: 15, scoreA: 92, scoreB: 84, explanation: "Elevating individual players into world-class performers." },
      { id: "game_management", name: "Substitutions & Mid-Match Shifting", weight: 10, scoreA: 84, scoreB: 94, explanation: "Inverting momentum with tactical changes and halftime fixes." },
      { id: "resource_efficiency", name: "Resource Context & Asymmetric Wins", weight: 10, scoreA: 80, scoreB: 92, explanation: "Achieving major titles with underdog or defensively limited squads." },
    ];
  }

  if (type === "formation_vs_formation" || type === "tactic_vs_tactic" || type === "philosophy") {
    return [
      { id: "central_control", name: "Central Corridor & Half-Space Control", weight: 25, scoreA: 90, scoreB: 82, explanation: "Numerical and positional superiority in Zone 14 and interior channels." },
      { id: "wing_superiority", name: "Flank Dynamics & 1v1 Isolation", weight: 20, scoreA: 84, scoreB: 89, explanation: "Overlaps, underlaps, and width retention vs wing-back systems." },
      { id: "pressing_traps", name: "Pressing Efficiency & Ball Regains", weight: 20, scoreA: 88, scoreB: 80, explanation: "Triggering pressing traps and forcing turnovers in opponent third." },
      { id: "counter_resistance", name: "Rest-Defense & Transition Security", weight: 20, scoreA: 78, scoreB: 91, explanation: "Coverage behind attacking players against direct 2-3 pass counters." },
      { id: "fatigue_sustainability", name: "Physical Load & 90-Minute Endurance", weight: 15, scoreA: 82, scoreB: 85, explanation: "Stamina degradation and mental fatigue when executing the system." },
    ];
  }

  if (isHypo) {
    return [
      { id: "tactical_fit", name: "System Compatibility & Role Role-Overlap", weight: 30, scoreA: 85, scoreB: 80, explanation: "How player/team tendencies align with tactical principles." },
      { id: "physical_transition", name: "Biomechanical & Intensity Adaptation", weight: 25, scoreA: 82, scoreB: 86, explanation: "Handling differing league pace, collision thresholds, and ref leeway." },
      { id: "output_projection", name: "Projected xG & Creation Differential", weight: 25, scoreA: 88, scoreB: 84, explanation: "Statistical conversion using underlying simulation models." },
      { id: "dressing_room_synergy", name: "Tactical Hierarchy & Chemistry", weight: 20, scoreA: 79, scoreB: 83, explanation: "Resource distribution, ball usage share, and positional sacrifices." },
    ];
  }

  return [
    { id: "evidence_strength", name: "Empirical & Statistical Evidence", weight: 30, scoreA: 85, scoreB: 82, explanation: "Underlying verified data and measurable metrics." },
    { id: "tactical_rigor", name: "Tactical Mechanics & Geometry", weight: 30, scoreA: 88, scoreB: 84, explanation: "Coherence of pitch movement and space exploitation." },
    { id: "context_fairness", name: "Historical & Resource Context", weight: 20, scoreA: 80, scoreB: 85, explanation: "Accounting for eras, rule changes, and asymmetric constraints." },
    { id: "rebuttal_quality", name: "Counter-Argument Resilience", weight: 20, scoreA: 84, scoreB: 81, explanation: "Ability to withstand opposing steelman critiques." },
  ];
}

function suggestFormations(
  type: TopicType,
  a: string,
  b: string
): { homeShape: FormationId; awayShape: FormationId } {
  const normA = a.toLowerCase();
  const normB = b.toLowerCase();

  const toFormation = (text: string, fallback: FormationId): FormationId => {
    if (text.includes("3-5-2")) return "3-5-2";
    if (text.includes("5-4-1")) return "5-4-1";
    if (text.includes("5-3-2")) return "5-3-2";
    if (text.includes("4-4-2")) return "4-4-2";
    if (text.includes("4-2-3-1")) return "4-2-3-1";
    if (text.includes("3-4-3")) return "3-4-3";
    if (text.includes("4-3-3")) return "4-3-3";
    return fallback;
  };

  const home = toFormation(normA, "4-3-3");
  const away = toFormation(normB, home === "4-3-3" ? "5-4-1" : "4-3-3");

  return { homeShape: home, awayShape: away };
}

export function applyWeightPreset(
  dimensions: ComparisonDimension[],
  preset: WeightPreset
): ComparisonDimension[] {
  if (preset === "CUSTOM") return dimensions;

  return dimensions.map((dim) => {
    let weight = dim.weight;
    const lower = dim.name.toLowerCase();

    if (preset === "PEAK") {
      if (lower.includes("peak") || lower.includes("scoring") || lower.includes("innovation") || lower.includes("ucl")) {
        weight = 35;
      } else if (lower.includes("longevity") || lower.includes("trophies")) {
        weight = 10;
      } else {
        weight = 15;
      }
    } else if (preset === "LONGEVITY") {
      if (lower.includes("longevity") || lower.includes("trophies") || lower.includes("consistency")) {
        weight = 35;
      } else if (lower.includes("dribbling") || lower.includes("peak")) {
        weight = 10;
      } else {
        weight = 15;
      }
    } else if (preset === "TACTICAL_IMPACT") {
      if (lower.includes("tactical") || lower.includes("buildup") || lower.includes("pressing") || lower.includes("space")) {
        weight = 35;
      } else if (lower.includes("trophies") || lower.includes("silverware")) {
        weight = 10;
      } else {
        weight = 15;
      }
    } else if (preset === "STATISTICAL_PERFORMANCE") {
      if (lower.includes("xg") || lower.includes("scoring") || lower.includes("creation") || lower.includes("empirical")) {
        weight = 35;
      } else if (lower.includes("gravity") || lower.includes("development")) {
        weight = 10;
      } else {
        weight = 15;
      }
    } else if (preset === "BIG_GAMES") {
      if (lower.includes("big game") || lower.includes("ucl") || lower.includes("knockout") || lower.includes("clutch")) {
        weight = 40;
      } else if (lower.includes("league") || lower.includes("endurance")) {
        weight = 10;
      } else {
        weight = 15;
      }
    } else if (preset === "OVERALL_CAREER") {
      weight = Math.round(100 / dimensions.length);
    }

    return { ...dim, weight };
  });
}
