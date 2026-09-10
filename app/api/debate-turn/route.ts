import { NextResponse } from "next/server";
import { DEBATE_TOPICS, PERSONAS, localDebateReply, MONTHLY_LAYER } from "@/lib/debate/personas";
import type { DebatePersona } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json();
  const topic = DEBATE_TOPICS.find((t) => t.id === body.topicId) ?? DEBATE_TOPICS[0];
  const persona = (body.persona as DebatePersona) || "anvil";
  const userStance = body.stance ?? "";
  const userText = body.text ?? "";
  const round = Number(body.round ?? 0);
  const includeChair = Boolean(body.includeChair);

  const key = process.env.OPENAI_API_KEY;
  if (key) {
    try {
      const speakers: DebatePersona[] = includeChair ? ["chair", persona] : [persona];
      const replies: { speaker: DebatePersona; text: string }[] = [];
      for (const sp of speakers) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
            temperature: 0.4,
            messages: [
              { role: "system", content: PERSONAS[sp].system },
              {
                role: "user",
                content: `Topic: ${topic.title}\n${topic.prompt}\nMonthly data: ${JSON.stringify(MONTHLY_LAYER)}\nUser stance: ${userStance}\nUser argument: ${userText}\nReply in <= 180 words. Tactical mechanics only.`,
              },
            ],
          }),
        });
        if (!res.ok) throw new Error("llm");
        const json = await res.json();
        replies.push({ speaker: sp, text: json.choices?.[0]?.message?.content ?? "" });
      }
      return NextResponse.json({ replies, source: "llm" });
    } catch {
      /* fall through */
    }
  }

  const replies = includeChair
    ? [
        {
          speaker: "chair" as const,
          text: localDebateReply({ persona: "chair", topic, userStance, userText, round }),
        },
        {
          speaker: persona,
          text: localDebateReply({ persona, topic, userStance, userText, round }),
        },
      ]
    : [{ speaker: persona, text: localDebateReply({ persona, topic, userStance, userText, round }) }];

  return NextResponse.json({ replies, source: "local-engine" });
}
