"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  Send,
  AlertTriangle,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { useDebateStore } from "@/store/debateStore";
import { FEATURED_OPEN_TOPICS } from "@/lib/debate/topicEngine";
import { EXTENDED_PERSONAS } from "@/lib/debate/adversarialEngine";
import { DATA_FRESHNESS_DATE } from "@/lib/debate/dataLayer";
import { TacticalDebateBoard } from "./TacticalDebateBoard";
import { DebateScorecard } from "./DebateScorecard";
import { EvidencePanel } from "./EvidencePanel";
import { FinalJudgmentReport } from "./FinalJudgmentReport";
import type { DebateMode, ExtendedDebatePersona } from "@/lib/types";

export function DebateArena() {
  const s = useDebateStore();

  // Input States for Rich Argument Submission
  const [topicInput, setTopicInput] = useState("");
  const [claim, setClaim] = useState("");
  const [evidenceText, setEvidenceText] = useState("");
  const [tacticalReasoning, setTacticalReasoning] = useState("");
  const [mainArgument, setMainArgument] = useState("");
  const [customStanceText, setCustomStanceText] = useState("");
  const [customStanceOpen, setCustomStanceOpen] = useState(false);

  // Challenge AI claim modal state
  const [challengeTargetClaim, setChallengeTargetClaim] = useState<string | null>(null);
  const [challengeDisputeText, setChallengeDisputeText] = useState("");

  // Radar attributes for active comparison
  const radarData = s.dimensions.slice(0, 6).map((d) => ({
    dimension: d.name.split(" ")[0],
    [s.parsedTopic.entityA]: d.scoreA,
    [s.parsedTopic.entityB]: d.scoreB,
  }));

  async function handleSendArgument() {
    if (!mainArgument.trim()) return;

    const evidenceArray = evidenceText
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);

    s.setBusy(true);

    try {
      const res = await fetch("/api/debate-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: s.parsedTopic,
          persona: s.aiPersona,
          secondPersona: s.secondAiPersona,
          mode: s.mode,
          includeJudge: s.includeJudge,
          userStance: s.userStance,
          claim: claim.trim(),
          text: mainArgument.trim(),
          tacticalReasoning: tacticalReasoning.trim(),
          evidence: evidenceArray,
          round: s.currentRound,
          dimensions: s.dimensions,
        }),
      });

      if (!res.ok) throw new Error("Debate turn failed");
      const json = await res.json();

      // Push user message with analysis
      s.addMessage({
        id: `user-${Date.now()}`,
        speaker: "user",
        stance: s.userStance,
        claim: claim.trim(),
        evidence: evidenceArray,
        tacticalReasoning: tacticalReasoning.trim(),
        text: mainArgument.trim(),
        ts: Date.now(),
        round: s.currentRound,
        analysis: json.userAnalysis,
      });

      // Push AI replies
      for (const r of json.replies || []) {
        s.addMessage({
          id: `ai-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          speaker: r.speaker,
          stance: r.speaker === "chair" ? "Neutral Adjudication" : "Opposing Counter",
          text: r.text,
          ts: Date.now(),
          round: s.currentRound,
          tacticalShift: r.tacticalShift,
        });
      }

      // Clear draft inputs
      setClaim("");
      setEvidenceText("");
      setTacticalReasoning("");
      setMainArgument("");
    } catch (err) {
      console.error(err);
    } finally {
      s.setBusy(false);
    }
  }

  function handleTopicSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (topicInput.trim()) {
      s.loadTopic(topicInput.trim());
      setTopicInput("");
    }
  }

  function handleDisputeSubmit() {
    if (challengeTargetClaim && challengeDisputeText.trim()) {
      s.submitChallenge(challengeTargetClaim, challengeDisputeText.trim());
      setChallengeTargetClaim(null);
      setChallengeDisputeText("");
    }
  }

  const latestUserAnalysis = [...s.messages]
    .reverse()
    .find((m) => m.speaker === "user")?.analysis;

  const latestTacticalShift = [...s.messages]
    .reverse()
    .find((m) => m.tacticalShift)?.tacticalShift;

  return (
    <div className="space-y-4">
      {/* ================= 1. TOP HEADER & OPEN TOPIC INPUT ================= */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 space-y-4 shadow-xl">
        {/* Open Topic Input Form */}
        <form onSubmit={handleTopicSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Enter any football debate (e.g. Messi vs Ronaldo, Guardiola vs Mourinho, 4-3-3 vs 3-5-2)..."
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-lime-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-xs font-mono font-bold text-black hover:bg-lime-300 transition shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>Parse & Start Debate</span>
          </button>
        </form>

        {/* Preloaded Featured Topics Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-thin">
          <span className="text-zinc-500 shrink-0 uppercase text-[10px] font-bold">Trending:</span>
          {FEATURED_OPEN_TOPICS.map((ft) => (
            <button
              key={ft.title}
              onClick={() => s.loadTopic(ft.query)}
              className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-zinc-300 hover:border-lime-400/40 hover:text-white transition shrink-0"
            >
              {ft.title}
            </button>
          ))}
        </div>

        {/* Current Active Topic Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase rounded bg-sky-400/20 text-sky-300 border border-sky-400/30 px-2 py-0.5">
                {s.parsedTopic.type.replace(/_/g, " ")}
              </span>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Data Verified: {DATA_FRESHNESS_DATE}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{s.parsedTopic.title}</h1>
            <p className="text-xs text-zinc-400 leading-snug max-w-2xl">{s.parsedTopic.coreDilemma}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-[10px] text-zinc-500 uppercase">Round Progress</div>
              <div className="text-sm font-bold text-amber-400">
                Round {s.currentRound} / {s.maxRounds}
              </div>
            </div>
            <button
              onClick={() => s.finalizeDebate()}
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-mono font-bold text-amber-300 hover:bg-amber-400/20 transition"
            >
              Finalize & Judge
            </button>
          </div>
        </div>

        {/* Settings Bar: Mode, Persona & Stance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-white/5 pt-3 text-xs font-mono">
          {/* Mode Selector */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] uppercase font-bold">Debate Mode</label>
            <select
              value={s.mode}
              onChange={(e) => s.setMode(e.target.value as DebateMode)}
              className="w-full rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-white"
            >
              <option value="user_vs_ai">Mode A: User vs AI</option>
              <option value="ai_vs_ai">Mode B: AI vs AI Spectator</option>
              <option value="user_vs_ai_judge">Mode C: User vs AI + Neutral Judge</option>
              <option value="three_way">Mode D: Three-Way (User vs Purist vs Anvil)</option>
              <option value="neutral_analysis">Mode E: Impartial Analysis</option>
            </select>
          </div>

          {/* AI Opponent Persona */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] uppercase font-bold">Opponent Persona</label>
            <select
              value={s.aiPersona}
              onChange={(e) => s.setAiPersona(e.target.value as ExtendedDebatePersona)}
              className="w-full rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-white"
            >
              <option value="anvil">The Anvil (Low-Block Counter)</option>
              <option value="purist">The Purist (Juego de Posición)</option>
              <option value="analyst">The Analyst (xG/xT Data Model)</option>
              <option value="historian">The Historian (Eras & Lineage)</option>
              <option value="coach">The Coach (Duels & Momentum)</option>
              <option value="devil">The Devil&apos;s Advocate (Steelman)</option>
            </select>
          </div>

          {/* User Side Selection */}
          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] uppercase font-bold">Your Position</label>
            <div className="flex gap-1">
              <button
                onClick={() => s.setUserSide("A")}
                className={`flex-1 rounded py-1.5 text-[11px] truncate transition ${
                  s.userSide === "A"
                    ? "bg-sky-400 text-black font-bold"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {s.parsedTopic.entityA}
              </button>
              <button
                onClick={() => s.setUserSide("B")}
                className={`flex-1 rounded py-1.5 text-[11px] truncate transition ${
                  s.userSide === "B"
                    ? "bg-purple-400 text-black font-bold"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {s.parsedTopic.entityB}
              </button>
              <button
                onClick={() => setCustomStanceOpen(!customStanceOpen)}
                className={`px-2 rounded py-1.5 text-[11px] transition ${
                  s.userSide === "custom"
                    ? "bg-lime-400 text-black font-bold"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                Nuanced
              </button>
            </div>
          </div>
        </div>

        {/* Custom Stance Drawer */}
        {customStanceOpen && (
          <div className="rounded-xl border border-lime-400/30 bg-black/60 p-3 space-y-2 text-xs">
            <div className="font-mono text-[10px] text-lime-400 font-bold uppercase">
              Articulate Custom Nuanced Position
            </div>
            <textarea
              rows={2}
              value={customStanceText}
              onChange={(e) => setCustomStanceText(e.target.value)}
              placeholder="e.g. Messi is superior in overall creative playmaking, but Ronaldo offers higher decisive leverage in UCL knockout moments..."
              className="w-full rounded-lg border border-white/10 bg-black/70 p-2 text-white placeholder:text-zinc-600 focus:border-lime-400 focus:outline-none"
            />
            <button
              onClick={() => {
                s.setUserSide("custom", customStanceText);
                setCustomStanceOpen(false);
              }}
              className="rounded bg-lime-400 px-3 py-1 text-xs font-mono font-bold text-black hover:bg-lime-300"
            >
              Set Nuanced Stance
            </button>
          </div>
        )}
      </div>

      {/* ================= 2. MAIN 3-PANEL INTERFACE ================= */}
      {s.finalReport ? (
        <FinalJudgmentReport report={s.finalReport} onRestart={() => s.resetDebate()} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px] items-start">
          {/* LEFT: Structured Argument Builder */}
          <aside className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Your Argument Submission
                </h3>
                <span className="font-mono text-[10px] text-zinc-500">Round {s.currentRound}</span>
              </div>

              {/* Core Claim Input */}
              <div className="space-y-1 font-mono text-[11px]">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">
                  1. Core Claim / Thesis
                </label>
                <input
                  type="text"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  placeholder="e.g. Ronaldo was more decisive in UCL knockouts..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white placeholder:text-zinc-600 text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              {/* Main Argument Text */}
              <div className="space-y-1 font-mono text-[11px]">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">
                  2. Argument & Reasoning
                </label>
                <textarea
                  rows={4}
                  value={mainArgument}
                  onChange={(e) => setMainArgument(e.target.value)}
                  placeholder="Articulate your tactical and empirical case..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white placeholder:text-zinc-600 text-xs focus:border-lime-400 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Verifiable Evidence */}
              <div className="space-y-1 font-mono text-[11px]">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">
                  3. Verifiable Evidence (Stats / Sources)
                </label>
                <textarea
                  rows={2}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="e.g. 67 UCL knockout goals, 1.10 goals/90 peak (Opta)"
                  className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white placeholder:text-zinc-600 text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              {/* Tactical Mechanism */}
              <div className="space-y-1 font-mono text-[11px]">
                <label className="text-zinc-400 font-bold uppercase text-[10px]">
                  4. Tactical Mechanism / Geometry
                </label>
                <input
                  type="text"
                  value={tacticalReasoning}
                  onChange={(e) => setTacticalReasoning(e.target.value)}
                  placeholder="e.g. Far-post blindside diagonal movement..."
                  className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white placeholder:text-zinc-600 text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              <button
                disabled={s.busy || !mainArgument.trim()}
                onClick={handleSendArgument}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime-400 py-2.5 font-mono text-xs font-bold text-black hover:bg-lime-300 transition disabled:opacity-50 shadow-lg shadow-lime-400/10"
              >
                <Send className="h-4 w-4" />
                <span>{s.busy ? "AI Opponent Steelmanning…" : "Submit Argument"}</span>
              </button>
            </div>
          </aside>

          {/* CENTER: Live Adversarial Debate Arena */}
          <section className="space-y-3 min-w-0">
            {/* View Tabs */}
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-1 font-mono text-xs">
              <button
                onClick={() => s.setActiveTab("feed")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  s.activeTab === "feed"
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Debate Arena Feed ({s.messages.length})
              </button>
              <button
                onClick={() => s.setActiveTab("tactical")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  s.activeTab === "tactical"
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Tactical Pitch
              </button>
              <button
                onClick={() => s.setActiveTab("evidence")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  s.activeTab === "evidence"
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Verified Data Layer
              </button>
              <button
                onClick={() => s.setActiveTab("radar")}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  s.activeTab === "radar"
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Attribute Radar
              </button>
            </div>

            {/* TAB CONTENT: DEBATE FEED */}
            {s.activeTab === "feed" && (
              <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
                {s.messages.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-950 p-8 text-center space-y-3">
                    <BrainCircuit className="h-10 w-10 text-zinc-600 mx-auto animate-pulse" />
                    <h4 className="text-sm font-bold text-zinc-300">Open Football Debate Engine Ready</h4>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                      Submit your initial thesis on the left. The AI will steelman your argument before
                      attacking the tactical mechanisms and statistics.
                    </p>
                  </div>
                ) : (
                  s.messages.map((m) => {
                    const isUser = m.speaker === "user";
                    const isJudge = m.speaker === "chair";
                    return (
                      <article
                        key={m.id}
                        className={`rounded-2xl border p-4 space-y-3 transition backdrop-blur-sm ${
                          isUser
                            ? "border-sky-500/30 bg-sky-950/20"
                            : isJudge
                            ? "border-amber-500/30 bg-amber-950/20"
                            : "border-purple-500/30 bg-purple-950/20"
                        }`}
                      >
                        {/* Message Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono text-xs font-bold uppercase ${
                                isUser ? "text-sky-400" : isJudge ? "text-amber-400" : "text-purple-400"
                              }`}
                            >
                              {isUser ? "Your Argument" : EXTENDED_PERSONAS[m.speaker as ExtendedDebatePersona]?.name || m.speaker}
                            </span>
                            {m.round && (
                              <span className="font-mono text-[9px] text-zinc-500">
                                Round {m.round}
                              </span>
                            )}
                          </div>

                          {/* Dispute / Challenge button on AI messages */}
                          {!isUser && !isJudge && (
                            <button
                              onClick={() => {
                                setChallengeTargetClaim(m.text.slice(0, 120));
                              }}
                              className="font-mono text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              <span>Challenge Claim (AI Got This Wrong)</span>
                            </button>
                          )}
                        </div>

                        {/* Claim Badge */}
                        {m.claim && (
                          <div className="font-mono text-[11px] text-sky-300 bg-black/40 border border-white/5 rounded p-2">
                            <span className="text-zinc-500 uppercase font-bold text-[9px] block">
                              Claim:
                            </span>
                            &quot;{m.claim}&quot;
                          </div>
                        )}

                        {/* Message Content */}
                        <p className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
                          {m.text}
                        </p>

                        {/* Tactical Shift Indicator if present */}
                        {m.tacticalShift && (
                          <div className="rounded-lg border border-white/5 bg-black/40 p-2 text-[10px] font-mono text-zinc-400 space-y-0.5">
                            <div>
                              <span className="text-purple-400 font-bold">Counter-Shift:</span>{" "}
                              {m.tacticalShift.awayAdjustment}
                            </div>
                            <div>
                              <span className="text-amber-400 font-bold">Channel Contested:</span>{" "}
                              {m.tacticalShift.keyChannel}
                            </div>
                          </div>
                        )}

                        {/* User Analysis Tag Chips */}
                        {m.analysis && (
                          <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-2">
                            {m.analysis.claims.map((cl, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-zinc-400"
                              >
                                {cl.type}: {cl.text.slice(0, 30)}...
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB CONTENT: TACTICAL PITCH */}
            {s.activeTab === "tactical" && (
              <TacticalDebateBoard
                homeShape={s.parsedTopic.suggestedHomeFormation}
                awayShape={s.parsedTopic.suggestedAwayFormation}
                keyChannel={latestTacticalShift?.keyChannel || "Zone 14 / Half-Spaces"}
                homeAdjustment={latestTacticalShift?.homeAdjustment}
                awayAdjustment={latestTacticalShift?.awayAdjustment}
              />
            )}

            {/* TAB CONTENT: EVIDENCE PANEL */}
            {s.activeTab === "evidence" && (
              <EvidencePanel
                entityA={s.parsedTopic.entityA}
                entityB={s.parsedTopic.entityB}
              />
            )}

            {/* TAB CONTENT: RADAR */}
            {s.activeTab === "radar" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400 font-bold uppercase">Attribute Comparison Radar</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sky-400 font-bold">■ {s.parsedTopic.entityA}</span>
                    <span className="text-purple-400 font-bold">■ {s.parsedTopic.entityB}</span>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="dimension" stroke="#a1a1aa" fontSize={11} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#71717a" fontSize={9} />
                      <Radar
                        name={s.parsedTopic.entityA}
                        dataKey={s.parsedTopic.entityA}
                        stroke="#38bdf8"
                        fill="#38bdf8"
                        fillOpacity={0.25}
                      />
                      <Radar
                        name={s.parsedTopic.entityB}
                        dataKey={s.parsedTopic.entityB}
                        stroke="#c084fc"
                        fill="#c084fc"
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT: Real-time Multi-Dimensional Scorecard */}
          <aside className="space-y-3">
            <DebateScorecard
              analysis={latestUserAnalysis}
              dimensions={s.dimensions}
              activePreset={s.weightPreset}
              onSelectPreset={(p) => s.setWeightPreset(p)}
              onUpdateWeight={(id, w) => s.updateDimensionWeight(id, w)}
              entityA={s.parsedTopic.entityA}
              entityB={s.parsedTopic.entityB}
            />

            {/* User Challenge Audits Log */}
            {s.challengeAudits.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 space-y-2 text-xs font-mono">
                <div className="font-bold text-amber-300 uppercase text-[10px]">
                  Intellectual Accountability Audits
                </div>
                {s.challengeAudits.map((a) => (
                  <div key={a.id} className="rounded bg-black/40 p-2 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-bold ${
                          a.verdict === "USER_CORRECT"
                            ? "text-emerald-400"
                            : a.verdict === "BOTH_PARTIALLY_CORRECT"
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}
                      >
                        {a.verdict.replace(/_/g, " ")}
                      </span>
                      <span className="text-[9px] text-zinc-500">{a.timestamp}</span>
                    </div>
                    <p className="text-zinc-300 text-[10px] font-sans">{a.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= 3. CHALLENGE AI MODAL ================= */}
      {challengeTargetClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-zinc-950 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Challenge AI Claim (§31)</span>
              </h3>
              <button
                onClick={() => setChallengeTargetClaim(null)}
                className="rounded bg-white/10 px-2.5 py-1 text-xs text-zinc-400 hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div className="rounded-lg bg-black/40 border border-white/10 p-3 text-xs font-mono text-zinc-300">
              <span className="text-zinc-500 font-bold uppercase text-[9px] block">
                Target AI Statement:
              </span>
              &quot;{challengeTargetClaim}&quot;
            </div>

            <div className="space-y-1 text-xs font-mono">
              <label className="text-zinc-400 font-bold">
                Your Counter-Evidence / Methodology Correction:
              </label>
              <textarea
                rows={4}
                value={challengeDisputeText}
                onChange={(e) => setChallengeDisputeText(e.target.value)}
                placeholder="Cite per-90 rates, penalty exclusions, official competition rules, or source methodology variances..."
                className="w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs text-white placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handleDisputeSubmit}
                className="rounded-lg bg-amber-400 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-amber-300 transition"
              >
                Submit Audit Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
