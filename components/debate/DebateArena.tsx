"use client";

import { useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { DEBATE_TOPICS } from "@/lib/debate/personas";
import { spawnTeam } from "@/lib/formations";
import { useDebateStore } from "@/store/debateStore";
import type { DebateCategory, DebatePersona } from "@/lib/types";

export function DebateArena() {
  const s = useDebateStore();
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const topics = DEBATE_TOPICS.filter((t) => t.category === s.category);

  async function send() {
    if (!draft.trim()) return;
    s.push({ speaker: "user", stance: s.stance, text: draft.trim() });
    setBusy(true);
    try {
      const res = await fetch("/api/debate-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: s.topic.id,
          persona: s.aiPersona,
          includeChair: s.includeChair,
          stance: s.stance,
          text: draft,
          round: s.messages.length,
        }),
      });
      const json = await res.json();
      for (const r of json.replies ?? []) {
        s.push({ speaker: r.speaker, stance: s.stance, text: r.text });
      }
      setDraft("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(["historic", "ideology", "modern"] as DebateCategory[]).map((c) => (
            <button
              key={c}
              onClick={() => s.setCategory(c)}
              className={`rounded-md px-3 py-1.5 text-xs capitalize ${s.category === c ? "bg-lime-400 text-black" : "bg-white/5"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={s.topic.id}
          onChange={(e) => s.setTopic(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <p className="text-sm text-zinc-300">{s.topic.prompt}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <MiniBoard home={s.topic.homeShape} away={s.topic.awayShape} />
          <TopicRadar topic={s.topic} />
        </div>
        <div className="max-h-[420px] space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-3">
          {s.messages.length === 0 && (
            <p className="text-xs text-zinc-500">State your case. The Chair will keep both sides on mechanisms.</p>
          )}
          {s.messages.map((m) => (
            <article
              key={m.id}
              className={`rounded-lg p-3 text-sm leading-relaxed ${
                m.speaker === "user"
                  ? "bg-lime-400/10"
                  : m.speaker === "chair"
                    ? "bg-amber-400/10"
                    : m.speaker === "purist"
                      ? "bg-sky-400/10"
                      : m.speaker === "anvil"
                        ? "bg-red-400/10"
                        : "bg-violet-400/10"
              }`}
            >
              <div className="mb-1 text-[10px] uppercase tracking-widest text-zinc-400">{m.speaker}</div>
              <div className="whitespace-pre-wrap text-zinc-100">{m.text}</div>
            </article>
          ))}
        </div>
        <textarea
          rows={4}
          className="w-full rounded-md border border-white/10 bg-black/40 p-3 text-sm"
          placeholder="Tactical argument (no rhetoric)…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          disabled={busy}
          onClick={send}
          className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black disabled:opacity-50"
        >
          {busy ? "Adjudicating…" : "Submit argument"}
        </button>
      </div>
      <aside className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
        <label className="block text-xs text-zinc-400">
          Your stance
          <textarea
            rows={4}
            className="mt-1 w-full rounded border border-white/10 bg-black/40 p-2 text-xs"
            value={s.stance}
            onChange={(e) => s.setStance(e.target.value)}
          />
        </label>
        <label className="block text-xs text-zinc-400">
          AI persona (counter)
          <select
            className="mt-1 w-full rounded border border-white/10 bg-black/40 px-2 py-2"
            value={s.aiPersona}
            onChange={(e) => s.setPersona(e.target.value as DebatePersona)}
          >
            <option value="purist">The Purist</option>
            <option value="anvil">The Anvil (pragmatist)</option>
            <option value="analyst">Objective Data Analyst</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={s.includeChair} onChange={s.toggleChair} />
          Include The Chair
        </label>
        <button onClick={s.reset} className="text-xs text-zinc-400 underline">
          Reset transcript
        </button>
        <p className="text-[11px] leading-relaxed text-zinc-500">
          Local engine always runs. Set OPENAI_API_KEY to route structured debate through an LLM; otherwise the
          knowledge-base personas reply.
        </p>
      </aside>
    </div>
  );
}

function MiniBoard({ home, away }: { home: string; away: string }) {
  const h = spawnTeam(home as never, "home", 36);
  const a = spawnTeam(away as never, "away", 28);
  return (
    <div className="rounded-xl border border-white/10 bg-[#14532d] p-2">
      <div className="relative h-44 w-full">
        {[...h, ...a].map((p) => (
          <span
            key={p.id}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${(p.x / 105) * 100}%`,
              top: `${(p.y / 68) * 100}%`,
              background: p.team === "home" ? "#60a5fa" : "#f87171",
            }}
            title={p.role}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-white/70">
        <span>Home {home}</span>
        <span>Away {away}</span>
      </div>
    </div>
  );
}

function TopicRadar({ topic }: { topic: (typeof DEBATE_TOPICS)[0] }) {
  const data = useMemo(
    () =>
      [
        ["Possession", topic.radarHome.possession, topic.radarAway.possession],
        ["PPDA idx", topic.radarHome.ppda, topic.radarAway.ppda],
        ["xG created", topic.radarHome.xgCreated, topic.radarAway.xgCreated],
        ["Rest def.", topic.radarHome.restDefense, topic.radarAway.restDefense],
        ["Pressing", topic.radarHome.pressing, topic.radarAway.pressing],
        ["Compact", topic.radarHome.compactness, topic.radarAway.compactness],
      ].map(([k, h, a]) => ({ k, home: h, away: a })),
    [topic]
  );
  return (
    <div className="h-48 rounded-xl border border-white/10 bg-black/40 p-1">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="k" tick={{ fill: "#94a3b8", fontSize: 10 }} />
          <PolarRadiusAxis tick={false} domain={[0, 100]} />
          <Radar dataKey="home" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.3} />
          <Radar dataKey="away" stroke="#f87171" fill="#f87171" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
