import { principles, movementRules, pressRules, passRules, COUNTER_MATRIX, STYLES } from "./rules";
import { ROLES, ROLE_ATTRIBUTES } from "./roles";
import { FORMATION_IDS, FORMATION_META } from "../formations";
import type { FormationId } from "../types";
import { SITUATIONS } from "./situations";

export function knowledgeBundle() {
  return {
    glossary: GLOSSARY,
    roles: ROLES,
    roleAttributes: ROLE_ATTRIBUTES,
    principles: principles(),
    movementRules: movementRules(),
    pressRules: pressRules(),
    passRules: passRules(),
    counters: COUNTER_MATRIX,
    styles: STYLES,
    situations: SITUATIONS,
    formations: FORMATION_IDS.map((id) => ({ id, ...FORMATION_META[id as FormationId] })),
    scoringModel: SCORING,
    datasetSchema: DATASET_COLUMNS,
    relationships: RELATIONSHIPS,
    battles: SAMPLE_BATTLES,
    laws: LAWS,
  };
}

export const GLOSSARY: Record<string, string> = {
  "half-space": "Vertical corridor between wing and central zone (Y 13.6–27.2 or 40.8–54.4 on a 68m pitch).",
  "Zone 14": "Central pocket outside the box, X 70–88.5, Y 27.2–40.8. High xT combination zone.",
  "xT": "Expected threat: value of having the ball at a location based on chance-creation probability.",
  "xG": "Expected goals of a shot given location, body part, assist type, defensive pressure.",
  "PPDA": "Passes allowed per defensive action in the opposition half. Lower ≈ more intense press.",
  "rest defense": "Players positioned behind the ball during your attack to survive a turnover.",
  "cover shadow": "The 30–45° lane behind a presser’s approach that a pass cannot safely use.",
  "third-man": "Player who becomes free because a first and second action dragged markers.",
  "pausa": "Deliberate delay on the ball to fix defenders before releasing the free player.",
  "pinning": "Occupying a defender so they cannot step or cover an adjacent runner.",
  "qualitative superiority": "Winning a 1v1 via player quality, not numbers.",
  "positional superiority": "Receiving between lines or in a lane the block cannot occupy without breaking.",
  "numerical superiority": "More players than opponents in a local zone (2v1, 3v2).",
  "gegenpress": "Immediate press after loss, typically 5–6 seconds, around the turnover.",
  "cutback": "Low, backward-breaking pass from the byline to the edge of the box.",
  "inverted full-back": "Full-back who tucks into midfield (Y ~20–48) to form a double pivot or back three.",
  "false nine": "Centre-forward who drops (e.g. 90m → 68m) to drag CBs and link.",
  "compactness": "Vertical distance between highest and lowest outfield lines; elite blocks often <30–35m.",
};

const SCORING = {
  range: "0-100",
  weights: {
    possessionControl: 0.07,
    buildupEffectiveness: 0.08,
    pressResistance: 0.08,
    pressingEffectiveness: 0.08,
    defensiveStability: 0.09,
    transitionThreat: 0.08,
    chanceCreation: 0.1,
    widthExploitation: 0.06,
    centralControl: 0.07,
    halfSpaceExploitation: 0.08,
    counterattackThreat: 0.07,
    defensiveCompactness: 0.07,
    roleSuitability: 0.04,
    tacticalCompatibility: 0.03,
  },
  note: "Score axes independently then weighted sum. Do not treat possessionControl as a proxy for chanceCreation.",
};

const DATASET_COLUMNS = [
  "match_id", "minute", "game_state", "team", "opponent", "formation", "phase",
  "ball_x", "ball_y", "player_id", "player_role", "player_x", "player_y",
  "nearest_opponent_distance", "nearest_teammate_distance", "pressure_level",
  "passing_options", "movement_type", "action", "action_success",
  "tactical_style", "pressing_style", "defensive_block", "space_available",
  "expected_action", "actual_action", "outcome", "xt_start", "xt_end",
  "rest_defense_count", "offside_flag", "stamina",
];

const RELATIONSHIPS = [
  "formation → default player roles → preferred zones",
  "player role → movement vocabulary (overlap, invert, pin, crash box)",
  "movement → space creation or occupation",
  "space → passing lane / xT opportunity",
  "pass completion → progression or chance",
  "ball loss → defensive transition clock (0–3s, 3–6s)",
  "rest-defense quality → counter xG conceded",
  "playing style → pass length, press height, block depth",
  "game state → risk tolerance (directness, line height)",
];

const SAMPLE_BATTLES = [
  {
    id: "b1",
    a: "4-3-3 Tiki-Taka high press",
    b: "5-4-1 park the bus",
    pattern: "Territory to A, shot quality contested. A must cut back; B must win first contact and go channel.",
  },
  {
    id: "b2",
    a: "4-2-3-1 gegenpress",
    b: "4-4-2 direct",
    pattern: "If A’s rest-defense is 2+3, B’s long ball into the channel is the shot. If A counters on the first loss, B never exits.",
  },
  {
    id: "b3",
    a: "3-4-3 positional",
    b: "4-4-2 mid block",
    pattern: "Wing-backs vs compact 4. Underlap of interior 10s vs tracking of wide mids.",
  },
  {
    id: "b4",
    a: "4-3-3 inverted FBs",
    b: "3-5-2",
    pattern: "Qualitative 1v1 on the wing vs extra midfielder. Switch speed decides.",
  },
  {
    id: "b5",
    a: "4-4-2 high press",
    b: "4-3-3 short build-up",
    pattern: "3v2 in first line if GK involved; otherwise B goes long to 9 and 8s attack second balls.",
  },
];

const LAWS = [
  { rule: "Offside", condition: "Attacker nearer to goal line than ball and second-last defender at pass", consequence: "Free kick / drop", effect: "High lines and through-balls are a coordinated trap, not a foot-race only" },
  { rule: "GK back-pass", condition: "Deliberate kick to GK from teammate", consequence: "Indirect FK", effect: "Pressing trap on CBs; GK must use feet under rules" },
  { rule: "Throw-in", condition: "Ball over touchline", consequence: "Restart, no offside", effect: "Long throws become set pieces; attacking-third throws create 5v4 boxes" },
  { rule: "Yellow/red", condition: "Foul denying a promising attack / last man", consequence: "Card, possible 10v11", effect: "Rest-defense fouls are calibrated; tactical fouls vs red-line fouls" },
  { rule: "Advantage", condition: "Fouled team keeps a better chance", consequence: "Play on", effect: "Counter-press fouls may be waved if a 2v1 already exists" },
];
