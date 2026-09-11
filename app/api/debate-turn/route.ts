import { NextResponse } from "next/server";
import type {
  ComparisonDimension,
  DebateMode,
  ExtendedDebatePersona,
  ParsedTopic,
} from "@/lib/types";
import { evaluateUserArgument } from "@/lib/debate/scoringEngine";
import {
  EXTENDED_PERSONAS,
  generateAdversarialCounter,
} from "@/lib/debate/adversarialEngine";
import { parseUserTopic } from "@/lib/debate/topicEngine";
import { DATA_FRESHNESS_DATE } from "@/lib/debate/dataLayer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic: ParsedTopic = body.topic || parseUserTopic(body.rawTopic || "Messi vs Ronaldo");
    const persona: ExtendedDebatePersona = body.persona || "anvil";
    const secondPersona: ExtendedDebatePersona = body.secondPersona || "purist";
    const mode: DebateMode = body.mode || "user_vs_ai";
    const includeJudge: boolean = Boolean(body.includeJudge);
    const userStance: string = body.userStance || "";
    const userClaim: string = body.claim || "";
    const userText: string = body.text || "";
    const tacticalReasoning: string = body.tacticalReasoning || "";
    const evidence: string[] = body.evidence || [];
    const round: number = Number(body.round || 1);
    const dimensions: ComparisonDimension[] = body.dimensions || topic.dimensions;

    // 1. Evaluate user argument across 8 dimensions + penalties
    const userAnalysis = evaluateUserArgument({
      text: userText,
      claim: userClaim,
      evidence,
      tacticalReasoning,
      topicTitle: topic.title,
      round,
    });

    const replies: Array<{
      speaker: ExtendedDebatePersona;
      text: string;
      tacticalShift?: {
        homeAdjustment: string;
        awayAdjustment: string;
        keyChannel: string;
      };
    }> = [];

    // Check for optional OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const personaSystem = EXTENDED_PERSONAS[persona]?.system || EXTENDED_PERSONAS.anvil.system;
        const prompt = `Topic: ${topic.title} (${topic.type})
User Stance: ${userStance}
User Claim: ${userClaim}
User Argument: ${userText}
Tactical Reasoning: ${tacticalReasoning}
Round: ${round}
Verified Data Freshness: ${DATA_FRESHNESS_DATE}

Instructions:
1. First, steelman the user's position in 1-2 sentences.
2. Attack the premise using concrete tactical mechanisms (5 corridors, rest-defense 3-2, compactness <28m, pressing triggers) or rate statistics (per-90, non-penalty xG, xT).
3. Do not be generic. Address the actual claim. Limit to 180 words.`;

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            temperature: 0.4,
            messages: [
              { role: "system", content: personaSystem },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const replyText = json.choices?.[0]?.message?.content;
          if (replyText) {
            replies.push({
              speaker: persona,
              text: replyText,
              tacticalShift: {
                homeAdjustment: "High 3-2-5 staggering",
                awayAdjustment: "Compact 5-4-1 low block",
                keyChannel: "Zone 14",
              },
            });

            if (includeJudge) {
              replies.push({
                speaker: "chair",
                text: `The Chair (Technical Referee): Round ${round} evaluated. User scored ${userAnalysis.totalScore}/100 with ${userAnalysis.evidenceStrength} evidence quality. Opponent countered on transition risk. Proceed to next phase.`,
              });
            }

            return NextResponse.json({
              userAnalysis,
              replies,
              source: "llm",
            });
          }
        }
      } catch {
        /* Fall back to local adversarial engine */
      }
    }

    // 2. Deterministic Local Adversarial Engine
    const primaryCounter = generateAdversarialCounter({
      topic,
      persona,
      userStance,
      userClaim,
      userText,
      round,
      dimensions,
    });

    replies.push({
      speaker: persona,
      text: primaryCounter.response,
      tacticalShift: primaryCounter.tacticalShift,
    });

    // Handle Three-Way Mode or AI vs AI mode
    if (mode === "three_way") {
      const secondCounter = generateAdversarialCounter({
        topic,
        persona: secondPersona,
        userStance,
        userClaim,
        userText,
        round,
        dimensions,
      });
      replies.push({
        speaker: secondPersona,
        text: secondCounter.response,
        tacticalShift: secondCounter.tacticalShift,
      });
    }

    // Neutral Judge note if active
    if (includeJudge) {
      replies.push({
        speaker: "chair",
        text: `The Chair (Technical Referee): Round ${round} evaluated. User argument rated at ${
          userAnalysis.totalScore
        }/100. Key strength: ${userAnalysis.breakdown.tactical > 7 ? "Tactical mechanics" : "Direct empirical clarity"}. Penalties applied: ${
          userAnalysis.penalties.length > 0 ? userAnalysis.penalties.map((p) => p.type).join(", ") : "None"
        }. Address the opposing transition counter before round closure.`,
      });
    }

    return NextResponse.json({
      userAnalysis,
      replies,
      source: "local-adversarial-engine",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process debate turn" },
      { status: 500 }
    );
  }
}
