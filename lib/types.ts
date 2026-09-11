export const PITCH_LENGTH = 105;
export const PITCH_WIDTH = 68;

export type Phase =
  | "BUILD_UP"
  | "PROGRESSION"
  | "FINAL_THIRD"
  | "DEFENSIVE_TRANSITION"
  | "LOW_BLOCK_DEFENSE";

export type PassType = "GROUND_DRIVEN" | "CHIPPED" | "THROUGH_BALL" | "CUTBACK";
export type RunType = "OVERLAP" | "UNDERLAP" | "THIRD_MAN" | "BLIND_SIDE" | "DECOY";
export type DefensiveAction =
  | "PRESS"
  | "COVER_SHADOW"
  | "DROP_DEEP"
  | "OFFSIDE_STEP"
  | "INTERCEPT";
export type Outcome =
  | "CLEAN_PROGRESSION"
  | "CHANCE_CREATED"
  | "DISRUPTED"
  | "COUNTER_ATTACK_CONCEDED";

export type FormationId =
  | "4-4-2"
  | "4-3-3"
  | "4-2-3-1"
  | "4-1-4-1"
  | "4-4-1-1"
  | "4-3-1-2"
  | "4-2-2-2"
  | "4-2-4"
  | "3-4-3"
  | "3-4-2-1"
  | "3-5-2"
  | "3-4-1-2"
  | "5-3-2"
  | "5-4-1"
  | "5-2-3"
  | "4-5-1"
  | "4-1-2-3"
  | "4-3-2-1";

export type StyleId =
  | "Tiki-Taka"
  | "Positional Play"
  | "Gegenpressing"
  | "Pragmatic Low Block"
  | "Direct Transition"
  | "Wing Play";

export type Lane = "RW" | "RHS" | "CZ" | "LHS" | "LW";
export type Third = "DEFENSIVE" | "MIDDLE" | "ATTACKING";

export type Vec2 = { x: number; y: number };

export interface PlayerToken {
  id: string;
  team: "home" | "away";
  role: string;
  x: number;
  y: number;
  stamina: number;
  number: number;
}

export interface PitchState {
  ball: { x: number; y: number; z: number };
  homePlayers: PlayerToken[];
  awayPlayers: PlayerToken[];
}

export interface GameState {
  matchMinute: number;
  score: { home: number; away: number };
  currentPhase: Phase;
}

export interface TacticalProfile {
  teamName: string;
  kitPrimary: string;
  kitSecondary: string;
  baseFormation: FormationId;
  opponentFormation: FormationId;
  style: StyleId;
  philosophyDescription: string;
  lineHeight: number;
  pressingIntensity: number;
  positionalFluidity: number;
  passingDirectness: number;
  theme: "turf" | "tactical";
}

export interface UserAction {
  ballCarrierId: string;
  passVector?: {
    targetCoordinates: Vec2;
    passType: PassType;
    speedMps: number;
  };
  playerRuns: Array<{
    playerId: string;
    trajectory: Vec2[];
    runType: RunType;
  }>;
  presses: Array<{
    playerId: string;
    targetCoordinates: Vec2;
  }>;
  tacticalExplanation: string;
}

export interface BattleTurnRequest {
  gameState: GameState;
  userTacticalProfile: {
    baseFormation: string;
    style: string;
    philosophyDescription: string;
    lineHeight: number;
    pressingIntensity: number;
  };
  pitchState: {
    ball: { x: number; y: number; z: number };
    homePlayers: Array<{ id: string; role: string; x: number; y: number; stamina: number }>;
    awayPlayers: Array<{ id: string; role: string; x: number; y: number; stamina: number }>;
  };
  userAction: UserAction;
}

export interface BattleTurnResponse {
  resolution: {
    outcome: Outcome;
    successProbability: number;
    turnoverRisk: number;
    expectedThreatDelta: number;
  };
  physicsFeedback: {
    ballTransitDurationSeconds: number;
    interceptingOpponentId?: string;
    defenderReactionDelaySeconds: number;
    staminaCost: number;
  };
  opponentCounterAdjustment: {
    description: string;
    counterMovements: Array<{
      playerId: string;
      newCoordinates: Vec2;
      defensiveAction: DefensiveAction;
    }>;
  };
  coachingBreakdown: {
    strengths: string;
    weaknesses: string;
    tacticalConsequence: string;
  };
  nextDilemma: {
    scenarioDescription: string;
    recommendedConsiderations: string[];
  };
}

export interface DrawArrow {
  id: string;
  kind: "pass" | "run" | "press";
  from: Vec2;
  to: Vec2;
  passType?: PassType;
  runType?: RunType;
  playerId?: string;
}

export type DebatePersona = "purist" | "anvil" | "analyst" | "chair" | "historian" | "coach" | "devil";
export type ExtendedDebatePersona = DebatePersona;
export type DebateCategory = "historic" | "ideology" | "modern" | "player" | "tactics" | "hypothetical" | "custom";

export type TopicType =
  | "player_vs_player"
  | "team_vs_team"
  | "manager_vs_manager"
  | "formation_vs_formation"
  | "tactic_vs_tactic"
  | "era_vs_era"
  | "philosophy"
  | "statistical"
  | "hypothetical"
  | "custom";

export type DebateMode =
  | "user_vs_ai"
  | "ai_vs_ai"
  | "user_vs_ai_judge"
  | "three_way"
  | "neutral_analysis"
  | "cross_examination";

export type ClaimClassification =
  | "FACT"
  | "INTERPRETATION"
  | "INFERENCE"
  | "OPINION"
  | "SIMULATION"
  | "HYPOTHESIS";

export type EvidenceStrength = "VERY_STRONG" | "STRONG" | "MODERATE" | "WEAK" | "UNVERIFIED";

export interface ComparisonDimension {
  id: string;
  name: string;
  weight: number; // percentage 0-100
  scoreA: number; // 0-100
  scoreB: number; // 0-100
  unit?: string;
  explanation: string;
}

export interface ParsedTopic {
  id: string;
  rawInput: string;
  type: TopicType;
  title: string;
  entityA: string;
  entityB: string;
  timePeriod: string;
  competition: string;
  isHypothetical: boolean;
  coreDilemma: string;
  dimensions: ComparisonDimension[];
  suggestedHomeFormation: FormationId;
  suggestedAwayFormation: FormationId;
}

export interface ArgumentScoreBreakdown {
  accuracy: number; // max 20
  evidence: number; // max 20
  relevance: number; // max 15
  logic: number; // max 15
  tactical: number; // max 10
  counter: number; // max 10
  context: number; // max 5
  clarity: number; // max 5
}

export interface PenaltyItem {
  type:
    | "FALSE_FACT"
    | "UNVERIFIED_STAT"
    | "OUT_OF_CONTEXT"
    | "LOGICAL_FALLACY"
    | "CHERRY_PICKING"
    | "MOVING_GOALPOSTS"
    | "PERSONAL_ATTACK"
    | "IGNORED_COUNTER";
  deduction: number;
  reason: string;
}

export interface ArgumentAnalysis {
  claims: Array<{
    text: string;
    type: ClaimClassification;
    verified: boolean;
  }>;
  breakdown: ArgumentScoreBreakdown;
  penalties: PenaltyItem[];
  totalScore: number;
  evidenceStrength: EvidenceStrength;
  steelmanSummary: string;
}

export interface VerifiedDataSource {
  id: string;
  metric: string;
  entityAValue: string | number;
  entityBValue: string | number;
  provider: string;
  priorityTier: 1 | 2 | 3 | 4;
  dataPeriod: string;
  lastUpdated: string;
  confidence: "VERY_HIGH" | "HIGH" | "MODERATE" | "ESTIMATED";
  conflictNote?: string;
}

export interface UserChallengeAudit {
  id: string;
  turn: number;
  targetClaim: string;
  userArgument: string;
  evidenceCheck: string;
  verdict: "USER_CORRECT" | "AI_CORRECT" | "BOTH_PARTIALLY_CORRECT" | "UNCERTAIN";
  explanation: string;
  timestamp: string;
}

export interface FinalJudgmentReport {
  topicTitle: string;
  userStance: string;
  aiPersona: string;
  totalRounds: number;
  userFinalScore: number;
  aiFinalScore: number;
  verdict: "USER_WINS" | "AI_WINS" | "DRAW" | "DEPENDS_ON_CRITERIA" | "INSUFFICIENT_EVIDENCE";
  margin: string;
  keyReason: string;
  strongestUserArgument: string;
  strongestAiCounter: string;
  bestEvidenceCited: string;
  factualErrorsIdentified: string[];
  unresolvedQuestions: string[];
  tacticalVerdict: string;
  dataFreshnessTimestamp: string;
}

export interface DebateTopic {
  id: string;
  category: DebateCategory;
  title: string;
  prompt: string;
  homeShape: FormationId;
  awayShape: FormationId;
  radarHome: RadarStats;
  radarAway: RadarStats;
  parsedTopic?: ParsedTopic;
}

export interface RadarStats {
  possession: number;
  ppda: number;
  xgCreated: number;
  restDefense: number;
  pressing: number;
  compactness: number;
}

export interface DebateMessage {
  id: string;
  speaker: ExtendedDebatePersona | "user";
  stance: string;
  text: string;
  ts: number;
  round?: number;
  claim?: string;
  evidence?: string[];
  tacticalReasoning?: string;
  analysis?: ArgumentAnalysis;
  tacticalShift?: {
    homeAdjustment: string;
    awayAdjustment: string;
    keyChannel: string;
  };
}
