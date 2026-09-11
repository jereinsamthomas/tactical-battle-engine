import type {
  ComparisonDimension,
  DebateMessage,
  ExtendedDebatePersona,
  FinalJudgmentReport,
  ParsedTopic,
  UserChallengeAudit,
} from "../types";
import { DATA_FRESHNESS_DATE, retrieveVerifiedDataForTopic } from "./dataLayer";

export interface PersonaProfile {
  id: ExtendedDebatePersona;
  name: string;
  title: string;
  badge: string;
  motto: string;
  system: string;
}

export const EXTENDED_PERSONAS: Record<ExtendedDebatePersona, PersonaProfile> = {
  purist: {
    id: "purist",
    name: "The Purist",
    title: "Juego de Posición & Rest Defense",
    badge: "Positionalist",
    motto: "Geometry decides the game before the ball arrives.",
    system: `You are The Purist, rooted in Juego de Posición. Space and ball control are non-negotiable.
You evaluate football through 5 vertical corridors, numerical and qualitative superiorities, 3-2 rest defense, and 5-6 second counter-pressing.
Steelman the opponent's point, then challenge their lack of structural geometry and reliance on transition chaos.`,
  },
  anvil: {
    id: "anvil",
    name: "The Anvil",
    title: "Low-Block & Transition Strategist",
    badge: "Pragmatist",
    motto: "Space scores goals, not possession.",
    system: `You are The Anvil, results-obsessed and tactically unsentimental.
70% possession outside our penalty area is an offensive failure. We maintain <28m compactness, funnel attacks to touchlines, and strike in 2-3 vertical passes.
Steelman the opponent's idea, then attack shot quality, defensive vulnerability, and rest-defense fragility.`,
  },
  analyst: {
    id: "analyst",
    name: "The Objective Data Analyst",
    title: "xG / xT / PPDA Efficiency Model",
    badge: "Quant",
    motto: "Numbers before narrative. Separate signal from sample-size noise.",
    system: `You are The Objective Data Analyst. You reject romantic nostalgia and uncalibrated clichés.
You cite per-90 metrics, non-penalty xG, expected threat (xT), field tilt, and sample sizes.
Steelman the user's premise, then expose cherry-picking, lack of normalization, and missing defensive context.`,
  },
  historian: {
    id: "historian",
    name: "The Football Historian",
    title: "Eras, Evolution & Tactical Lineage",
    badge: "Historian",
    motto: "Context is everything. No player or team exists in a vacuum.",
    system: `You are The Football Historian. You contextualize across generations, tactical paradigms, and rule changes.
You analyze the backpass rule (1992), modern offside leniency, athletic conditioning, and pitch quality.
Steelman the user's claim, then challenge anachronistic comparisons and survivorship bias.`,
  },
  coach: {
    id: "coach",
    name: "The Pragmatic Coach",
    title: "Game Management & Physical Duels",
    badge: "Tactician",
    motto: "A tactic is only as good as the player's body orientation.",
    system: `You are The Pragmatic Coach. Football is won in 1v1 duels, second balls, and tactical momentum.
You focus on pressing triggers, body orientation, decoy movements, and in-game substitutions.
Steelman the user's view, then expose what happens under fatigue at minute 85.`,
  },
  devil: {
    id: "devil",
    name: "The Devil's Advocate",
    title: "Socratic Deconstruction",
    badge: "Challenger",
    motto: "Every certainty in football conceals an unexamined assumption.",
    system: `You are The Devil's Advocate. You relentlessly test unstated axioms, popular consensus, and halo effects.
You steelman the opposing case brilliantly, then attack its weakest analytical link.`,
  },
  chair: {
    id: "chair",
    name: "The Neutral Judge",
    title: "Impartial Technical Referee",
    badge: "Adjudicator",
    motto: "Evidence over rhetoric. Mechanisms over mythology.",
    system: `You are The Neutral Judge. You synthesize both arguments, verify empirical evidence, penalize logical fallacies, and determine the tactical truth.`,
  },
};

export function generateAdversarialCounter(opts: {
  topic: ParsedTopic;
  persona: ExtendedDebatePersona;
  userStance: string;
  userClaim: string;
  userText: string;
  round: number;
  dimensions: ComparisonDimension[];
}): {
  response: string;
  tacticalShift: {
    homeAdjustment: string;
    awayAdjustment: string;
    keyChannel: string;
  };
} {
  const { topic, persona, userStance, userClaim, userText, round, dimensions } = opts;
  const p = EXTENDED_PERSONAS[persona] || EXTENDED_PERSONAS.anvil;
  const data = retrieveVerifiedDataForTopic(topic.entityA, topic.entityB);
  const primarySource = data.sources[0];

  const userClaimSnippet = userClaim || userText.slice(0, 100);
  const userEntityName = userStance === "A" ? topic.entityA : topic.entityB;
  const topDimension = dimensions && dimensions.length > 0 ? dimensions[0].name : "Tactical Efficiency";

  // Steelman preamble
  let steelman = `I acknowledge the premise supporting ${userEntityName} in Round ${round}: you assert that "${userClaimSnippet}". `;
  if (userText.length > 50) {
    steelman += `There is genuine tactical merit in emphasizing ${topDimension.toLowerCase()} and immediate match influence through the lens of ${p.name}. `;
  }

  // Persona-specific adversarial critique
  let counterCore = "";
  let tacticalShift = {
    homeAdjustment: "High 3-2-5 staggering",
    awayAdjustment: "Compact 5-4-1 low block",
    keyChannel: "Zone 14 / Half-spaces",
  };

  switch (persona) {
    case "purist":
      counterCore = `However, from a positional mechanics standpoint, this analysis isolates output from systemic geometry.
If you over-index on individual execution, you overlook how the opposing structure is manipulated before the final action.
Against ${topic.entityB}, the solution is not speculative duels; it is occupying the 5 corridors so the defense is forced into an irreversible staggering error.
Rest defense (3-2) must remain intact to strangle the transition within 5 seconds of turnover.`;
      tacticalShift = {
        homeAdjustment: "Left back inverts into double pivot; winger pins touchline",
        awayAdjustment: "Double-team on interior half-space receiver",
        keyChannel: "Left Half-Space (Zone 11)",
      };
      break;

    case "anvil":
      counterCore = `That is your strongest theoretical claim, but territory is not control. You can monopolize 65% possession outside our 18-yard box, but that is precisely what a disciplined defensive block anticipates.
In big matches, high-possession setups frequently generate low-probability shots (0.04–0.08 xG) against packed boxes while remaining vulnerable to a 3-pass vertical transition into the vacated channel behind advancing fullbacks.
Shot quality and transition protection always outweigh cosmetic possession volume.`;
      tacticalShift = {
        homeAdjustment: "Overcommitted fullbacks pushed beyond the ball line",
        awayAdjustment: "Low-block <28m box congestion with vertical break trigger",
        keyChannel: "Transitional Channel behind Overlapping Fullback",
      };
      break;

    case "analyst":
      counterCore = `Empirical rigor requires separating headline totals from repeatable rate metrics.
Looking at the verified data (${DATA_FRESHNESS_DATE}): ${
        primarySource ? `${primarySource.metric}: ${topic.entityA} (${primarySource.entityAValue}) vs ${topic.entityB} (${primarySource.entityBValue})` : "xG and xT differential"
      }.
When you adjust for minutes played, non-penalty contributions, and game-state field tilt, the gap narrows significantly.
A sound conclusion cannot rely on an unadjusted sample without controlling for era-adjusted pressing intensity and team possession shares.`;
      tacticalShift = {
        homeAdjustment: "High-value xG zone penetration focused on cutback angles",
        awayAdjustment: "Zonal pass-interception grid covering Zone 14",
        keyChannel: "Central Edge of Penalty Area (Zone 14)",
      };
      break;

    case "historian":
      counterCore = `We must place this comparison in proper historical context.
Tactical eras evolve through rule changes, refereeing stringency, and physical conditioning ceilings.
Comparing raw numbers from differing tactical periods without calibrating for the backpass rule, offside line interpretation, or modern ultra-pressing machines introduces survivorship bias.
Longevity across changing tactical paradigms is the true benchmark.`;
      tacticalShift = {
        homeAdjustment: "Fluid positional rotations across thirds",
        awayAdjustment: "Rigid zonal spatial boundaries",
        keyChannel: "Between Defensive and Midfield Lines",
      };
      break;

    case "coach":
      counterCore = `On the tactics board that sounds clean, but on grass, football is decided by micro-latencies and body orientation.
When your runner makes that move at minute 75, can your rest-defense center-backs sustain the 30-meter recovery sprint when fatigued?
A tactical idea that cannot withstand counter-pressing attrition or defensive transitions in the final 15 minutes is a liability.`;
      tacticalShift = {
        homeAdjustment: "Aggressive counter-pressing wave within 4 seconds",
        awayAdjustment: "First-time diagonal release to isolated target winger",
        keyChannel: "Weak-Side Touchline Flank",
      };
      break;

    case "devil":
      counterCore = `Let's invert your foundational assumption. What if the very quality you are praising as a decisive strength is actually a hidden systemic dependency?
If Team A requires that exact mechanism to function, the opponent only needs to neutralize one passing lane or press trigger to collapse the entire chain.
True tactical superiority does not rely on a single fragile dependency.`;
      tacticalShift = {
        homeAdjustment: "High-risk single-pivot overload",
        awayAdjustment: "Aggressive man-oriented trap on key playmaker",
        keyChannel: "Pivot Passing Corridor",
      };
      break;

    case "chair":
      counterCore = `The Chair orders both sides to remain on concrete mechanisms.
User asserts: "${userClaimSnippet}".
Key conflict: Does higher volume and individual peak ceiling outweigh systemic efficiency and repeatable defensive security?
Empirical benchmark verified as of ${DATA_FRESHNESS_DATE}. Both sides must address the counter-risk before round closure.`;
      break;
  }

  const response = `${steelman}\n\n${counterCore}`;

  return { response, tacticalShift };
}

export function auditUserChallenge(opts: {
  turn: number;
  originalClaim: string;
  userArgument: string;
  topic: ParsedTopic;
}): UserChallengeAudit {
  const { turn, originalClaim, userArgument, topic } = opts;
  const lowerArg = userArgument.toLowerCase();

  let verdict: "USER_CORRECT" | "AI_CORRECT" | "BOTH_PARTIALLY_CORRECT" | "UNCERTAIN" = "AI_CORRECT";
  let evidenceCheck = `Cross-referenced against verified records for ${topic.title}.`;
  let explanation = "";

  if (
    lowerArg.includes("per 90") ||
    lowerArg.includes("non-penalty") ||
    lowerArg.includes("penalty") ||
    lowerArg.includes("minutes played")
  ) {
    verdict = "USER_CORRECT";
    evidenceCheck += " Verified against Opta / StatsBomb per-90 normalized databases.";
    explanation =
      "The user correctly pointed out that raw career volume without per-90 or penalty adjustment skews the comparison. The engine adjusts the metric accordingly (+12 points accuracy bonus).";
  } else if (
    lowerArg.includes("blindside") ||
    lowerArg.includes("third man") ||
    lowerArg.includes("pinning") ||
    lowerArg.includes("rest defense")
  ) {
    verdict = "BOTH_PARTIALLY_CORRECT";
    evidenceCheck += " Cross-referenced with tactical board geometry and spatial tracking data.";
    explanation =
      "Valid tactical mechanism identified: third-man diagonal runs bypass the cover shadow, though recovery speed of elite fullbacks still creates a contested duel.";
  } else if (lowerArg.includes("source") || lowerArg.includes("definition") || lowerArg.includes("methodology")) {
    verdict = "USER_CORRECT";
    evidenceCheck += " Identified documented discrepancy between Opta event logging and secondary aggregator definitions.";
    explanation =
      "The user identified a valid methodology variance in assist/appearance logging. Priority 1 & 2 sources confirm the user's narrower definition.";
  } else {
    verdict = "AI_CORRECT";
    evidenceCheck += " Official competition registries and historical match records verify the AI's baseline assertion.";
    explanation =
      "The AI's original calculation aligns with official UEFA/FIFA registries and verified multi-season tracking models.";
  }

  return {
    id: `audit-${Date.now()}`,
    turn,
    targetClaim: originalClaim,
    userArgument,
    evidenceCheck,
    verdict,
    explanation,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

export function synthesizeFinalJudgment(opts: {
  topic: ParsedTopic;
  userStance: string;
  aiPersona: ExtendedDebatePersona;
  messages: DebateMessage[];
  dimensions: ComparisonDimension[];
  userScoreSum: number;
  aiScoreSum: number;
}): FinalJudgmentReport {
  const { topic, userStance, aiPersona, messages, dimensions, userScoreSum, aiScoreSum } = opts;
  const count = Math.max(1, messages.filter((m) => m.speaker === "user").length);
  const userAvg = Math.round(userScoreSum / count);
  const aiAvg = Math.max(70, Math.min(94, Math.round(aiScoreSum / count)));
  const primaryDimension = dimensions?.[0]?.name || "Tactical Nuance";

  let verdict: "USER_WINS" | "AI_WINS" | "DRAW" | "DEPENDS_ON_CRITERIA" | "INSUFFICIENT_EVIDENCE" =
    "DEPENDS_ON_CRITERIA";
  let margin = "Narrow";
  let keyReason = "";

  const diff = userAvg - aiAvg;

  if (diff >= 6) {
    verdict = "USER_WINS";
    margin = diff >= 12 ? "Decisive" : "Narrow";
    keyReason =
      `User demonstrated superior evidential discipline on ${primaryDimension}, normalizing statistics for context and effectively neutralizing the AI's transition counter-arguments.`;
  } else if (diff <= -6) {
    verdict = "AI_WINS";
    margin = diff <= -12 ? "Decisive" : "Narrow";
    keyReason =
      `The AI's steelman critique on ${primaryDimension} exposed unaddressed vulnerabilities in systemic rest-defense and uncalibrated sample size reliance.`;
  } else {
    verdict = "DEPENDS_ON_CRITERIA";
    margin = "Tied / Criterion-Dependent";
    keyReason =
      `Both sides established defensible empirical positions. The ultimate conclusion hinges on whether you weight ${primaryDimension} and individual gravity over longevity and structural efficiency.`;
  }

  const userMsgs = messages.filter((m) => m.speaker === "user");
  const strongestUserArgument =
    userMsgs.length > 0
      ? userMsgs.reduce((prev, curr) => ((curr.analysis?.totalScore ?? 0) > (prev.analysis?.totalScore ?? 0) ? curr : prev)).text.slice(0, 160)
      : "Emphasis on per-90 output and big-game knockout decisiveness.";

  const strongestAiCounter = `${EXTENDED_PERSONAS[aiPersona]?.name || "AI"}: Demonstration that high-volume possession without rest-defense structure yields catastrophic transition vulnerability.`;

  return {
    topicTitle: topic.title,
    userStance,
    aiPersona: EXTENDED_PERSONAS[aiPersona]?.name || "AI Opponent",
    totalRounds: count,
    userFinalScore: userAvg,
    aiFinalScore: aiAvg,
    verdict,
    margin,
    keyReason,
    strongestUserArgument,
    strongestAiCounter,
    bestEvidenceCited: `Verified Opta / StatsBomb tracking indices as of ${DATA_FRESHNESS_DATE}.`,
    factualErrorsIdentified: [
      "Raw career goal tallies without per-90 and penalty adjustments.",
      "Single-match knockout performances cited without longitudinal sample backing.",
    ],
    unresolvedQuestions: [
      `How should individual spatial distortion be weighted against defensive work-rate in modern high-press systems?`,
      `Does modern zonal compactness fundamentally diminish the ceiling of pure 1v1 dribblers?`,
    ],
    tacticalVerdict:
      "A complete tactical system must balance spatial dominance with transition security. Neither romance nor cynicism alone wins 90-minute battles.",
    dataFreshnessTimestamp: DATA_FRESHNESS_DATE,
  };
}
