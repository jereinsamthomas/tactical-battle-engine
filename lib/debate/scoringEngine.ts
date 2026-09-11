import type {
  ArgumentAnalysis,
  ArgumentScoreBreakdown,
  ClaimClassification,
  EvidenceStrength,
  PenaltyItem,
} from "../types";

export function evaluateUserArgument(opts: {
  text: string;
  claim?: string;
  evidence?: string[];
  tacticalReasoning?: string;
  topicTitle: string;
  round: number;
}): ArgumentAnalysis {
  const { text, claim, evidence = [], tacticalReasoning, topicTitle, round } = opts;
  const combined = `${claim || ""} ${text} ${tacticalReasoning || ""}`.toLowerCase();

  const claims: Array<{ text: string; type: ClaimClassification; verified: boolean }> = [];
  const penalties: PenaltyItem[] = [];

  // 1. Detect claims & classify
  if (claim && claim.trim().length > 0) {
    const isFact = /\b(\d+|goals?|assists?|troph(?:y|ies)|titles?|champions league|world cup)\b/i.test(claim);
    claims.push({
      text: claim.trim(),
      type: isFact ? "FACT" : "INTERPRETATION",
      verified: isFact,
    });
  }

  // Sentence-level extraction
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  for (const s of sentences.slice(0, 4)) {
    let type: ClaimClassification = "OPINION";
    let verified = false;

    if (/\b(scored|won|has \d+|record|official|statsbomb|opta|uefa)\b/i.test(s)) {
      type = "FACT";
      verified = true;
    } else if (/\b(creates|forces|staggers|inverts|presses|overload|channel|half-space)\b/i.test(s)) {
      type = "INTERPRETATION";
      verified = true;
    } else if (/\b(would|could|hypothetically|simulated|if)\b/i.test(s)) {
      type = "HYPOTHESIS";
    } else if (/\b(therefore|which means|implies|results in|consequently)\b/i.test(s)) {
      type = "INFERENCE";
    }

    claims.push({ text: s, type, verified });
  }

  // 2. Multi-dimensional Score Breakdown (100 pts)
  let accuracy = 15;
  let evidenceScore = 12;
  let relevance = 12;
  if (topicTitle && topicTitle.toLowerCase().split(/\s+/).some((w) => w.length > 3 && combined.includes(w))) {
    relevance += 3;
  } else {
    relevance += 1;
  }
  let logic = 12;
  let tactical = 7;
  let counter = 7;
  let context = 3;
  let clarity = 4;

  // Accuracy evaluation
  if (claims.some((c) => c.type === "FACT" && c.verified)) {
    accuracy += 4;
  }
  if (combined.includes("per 90") || combined.includes("non-penalty") || combined.includes("conversion")) {
    accuracy += 1;
  }

  // Evidence evaluation
  if (evidence.length > 0 || /\b(opta|statsbomb|fbref|uefa|fifa|wyscout)\b/i.test(combined)) {
    evidenceScore += 6;
  }
  if (/\b(\d+%\s*|\d+\.\d+\s*|xg|xa|xt|ppda)\b/i.test(combined)) {
    evidenceScore += 2;
  }

  // Tactical depth evaluation
  if (
    combined.includes("half-space") ||
    combined.includes("zone 14") ||
    combined.includes("rest defense") ||
    combined.includes("third man") ||
    combined.includes("pinning") ||
    combined.includes("compactness") ||
    combined.includes("overload") ||
    combined.includes("blindside")
  ) {
    tactical = 10;
  }

  // Logic & counterargument
  if (combined.includes("however") || combined.includes("despite") || combined.includes("while") || combined.includes("trade-off")) {
    counter = 10;
    logic += 2;
  }

  // Context
  if (combined.includes("era") || combined.includes("system") || combined.includes("teammate") || combined.includes("competition")) {
    context = 5;
  }

  if (text.length >= 80 && text.length <= 450) {
    clarity = 5;
  }

  // 3. Penalty Calculations
  // Penalty 1: Personal Attack / Ad Hominem (-10)
  if (/\b(fraud|choker|overrated trash|clown|fanboy|idiot|stupid)\b/i.test(combined)) {
    penalties.push({
      type: "PERSONAL_ATTACK",
      deduction: 10,
      reason: "Emotional rhetoric or disparaging language detected. Keep focus on tactical & statistical mechanisms.",
    });
  }

  // Penalty 2: Cherry-Picking (-5)
  if (
    (combined.includes("scored more") || combined.includes("has more goals")) &&
    !combined.includes("per 90") &&
    !combined.includes("penalty") &&
    !combined.includes("minutes")
  ) {
    penalties.push({
      type: "CHERRY_PICKING",
      deduction: 5,
      reason: "Raw goal tally cited without normalizing for minutes played, penalties taken, or team possession volume.",
    });
  }

  // Penalty 3: Unverified Stat Presented as Absolute Fact (-15)
  if (/\b(obviously|undisputed fact|everyone knows that|statistically proved that)\b/i.test(combined) && evidence.length === 0) {
    penalties.push({
      type: "UNVERIFIED_STAT",
      deduction: 15,
      reason: "Subjective assertion presented as an absolute objective fact without verifiable data source citation.",
    });
  }

  // Penalty 4: Moving Goalposts / Logical Fallacy (-5)
  if (round > 2 && (combined.includes("that doesn't count because") || combined.includes("doesn't matter anymore"))) {
    penalties.push({
      type: "MOVING_GOALPOSTS",
      deduction: 5,
      reason: "Shifting evaluative criteria after previous evidence contradicted the initial premise.",
    });
  }

  // Evidence Strength
  let evidenceStrength: EvidenceStrength = "MODERATE";
  if (evidenceScore >= 18 && penalties.length === 0) {
    evidenceStrength = "VERY_STRONG";
  } else if (evidenceScore >= 15) {
    evidenceStrength = "STRONG";
  } else if (evidenceScore < 10 || penalties.some((p) => p.type === "UNVERIFIED_STAT")) {
    evidenceStrength = "UNVERIFIED";
  } else if (evidenceScore < 13) {
    evidenceStrength = "WEAK";
  }

  // Sum breakdown
  const breakdown: ArgumentScoreBreakdown = {
    accuracy: Math.min(20, accuracy),
    evidence: Math.min(20, evidenceScore),
    relevance: Math.min(15, relevance),
    logic: Math.min(15, logic),
    tactical: Math.min(10, tactical),
    counter: Math.min(10, counter),
    context: Math.min(5, context),
    clarity: Math.min(5, clarity),
  };

  const rawSum =
    breakdown.accuracy +
    breakdown.evidence +
    breakdown.relevance +
    breakdown.logic +
    breakdown.tactical +
    breakdown.counter +
    breakdown.context +
    breakdown.clarity;

  const totalDeductions = penalties.reduce((acc, p) => acc + p.deduction, 0);
  const totalScore = Math.max(15, Math.min(100, rawSum - totalDeductions));

  // Steelman synthesis
  const steelmanSummary = `Steelman formulation: The user contends that ${
    claim || text.slice(0, 100)
  }, resting on the premise of ${tactical > 7 ? "spatial manipulation and geometry" : "output volume and direct efficiency"}.`;

  return {
    claims,
    breakdown,
    penalties,
    totalScore,
    evidenceStrength,
    steelmanSummary,
  };
}
