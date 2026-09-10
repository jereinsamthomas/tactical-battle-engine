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

export type DebatePersona = "purist" | "anvil" | "analyst" | "chair";
export type DebateCategory = "historic" | "ideology" | "modern";

export interface DebateTopic {
  id: string;
  category: DebateCategory;
  title: string;
  prompt: string;
  homeShape: FormationId;
  awayShape: FormationId;
  radarHome: RadarStats;
  radarAway: RadarStats;
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
  speaker: DebatePersona | "user";
  stance: string;
  text: string;
  ts: number;
}
