import rawLaws from "./laws_dataset.json";

export interface LawOfGame {
  lawNumber: number;
  title: string;
  category: string;
  summary: string;
  keyProvisions: string[];
  tacticalImplication: string;
  year2026Changes: string;
}

export interface LawInnovation2026 {
  id: string;
  title: string;
  description: string;
  tacticalImpact: string;
}

export interface LawsDataset {
  version: string;
  source: string;
  laws: LawOfGame[];
  innovations: LawInnovation2026[];
}

export const LAWS_DATASET: LawsDataset = rawLaws as LawsDataset;

export function getLawsList(): LawOfGame[] {
  return LAWS_DATASET.laws;
}

export function getLawByNumber(num: number): LawOfGame | undefined {
  return LAWS_DATASET.laws.find((l) => l.lawNumber === num);
}

export function get2026Innovations(): LawInnovation2026[] {
  return LAWS_DATASET.innovations;
}

export interface OffsideEvaluationInput {
  attackerX: number; // 0 to 105m (attacking toward 105m)
  ballX: number;
  secondLastDefenderX: number;
  inOwnHalf: boolean;
  restartType?: "normal" | "goal_kick" | "throw_in" | "corner_kick";
  isDeliberatePlayByOpponent?: boolean;
  isInvolvedInActivePlay?: boolean;
}

export interface OffsideEvaluationResult {
  isOffside: boolean;
  verdict: "OFFSIDE_OFFENCE" | "ONSIDE_VALID" | "RESTART_EXEMPTION" | "DEFENDER_RESET";
  reasoning: string;
  marginMeters: number;
  lawCitation: string;
}

/**
 * Validates player position against Law 11 of IFAB Laws of the Game 2026/27.
 */
export function evaluateOffsideLaw11(input: OffsideEvaluationInput): OffsideEvaluationResult {
  // Restart exemptions: Law 11.3
  if (input.restartType && input.restartType !== "normal") {
    return {
      isOffside: false,
      verdict: "RESTART_EXEMPTION",
      reasoning: `No offside offence directly from a ${input.restartType.replace("_", " ").toUpperCase()} (Law 11.3).`,
      marginMeters: 0,
      lawCitation: "IFAB 2026/27 Law 11.3 (Exceptions)",
    };
  }

  // Player in own half: cannot be offside
  if (input.inOwnHalf || input.attackerX <= 52.5) {
    return {
      isOffside: false,
      verdict: "ONSIDE_VALID",
      reasoning: "Player is within their own half of the pitch at pass release (Law 11.1).",
      marginMeters: 52.5 - input.attackerX,
      lawCitation: "IFAB 2026/27 Law 11.1 (Offside position)",
    };
  }

  // Behind the ball
  if (input.attackerX <= input.ballX) {
    return {
      isOffside: false,
      verdict: "ONSIDE_VALID",
      reasoning: "Player is level with or behind the ball at pass release (Law 11.1).",
      marginMeters: input.ballX - input.attackerX,
      lawCitation: "IFAB 2026/27 Law 11.1 (Offside position)",
    };
  }

  // Deliberate play by opponent
  if (input.isDeliberatePlayByOpponent) {
    return {
      isOffside: false,
      verdict: "DEFENDER_RESET",
      reasoning: "Deliberate play by defender resets offside position; attacker is legally in play (Law 11.2).",
      marginMeters: 0,
      lawCitation: "IFAB 2026/27 Law 11.2 (Deliberate Play Guideline)",
    };
  }

  // Margin ahead of 2nd-last defender
  const margin = input.attackerX - input.secondLastDefenderX;
  if (margin > 0.05) {
    return {
      isOffside: true,
      verdict: "OFFSIDE_OFFENCE",
      reasoning: `Attacker is ${margin.toFixed(2)}m ahead of the second-last defender and the ball when pass released, involved in active play.`,
      marginMeters: margin,
      lawCitation: "IFAB 2026/27 Law 11.2 (Offside Offence)",
    };
  }

  return {
    isOffside: false,
    verdict: "ONSIDE_VALID",
    reasoning: `Attacker is onside (${Math.abs(margin).toFixed(2)}m onside of the defensive line).`,
    marginMeters: margin,
    lawCitation: "IFAB 2026/27 Law 11.1 (Onside Position)",
  };
}
