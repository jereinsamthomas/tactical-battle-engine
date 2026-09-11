"use client";

import React from "react";
import type { FinalJudgmentReport as FinalReportType } from "@/lib/types";
import { Scale, HelpCircle, AlertTriangle, CheckCircle, RotateCcw, Sparkles } from "lucide-react";

interface FinalJudgmentReportProps {
  report: FinalReportType;
  onRestart: () => void;
}

export function FinalJudgmentReport({ report, onRestart }: FinalJudgmentReportProps) {
  const isUserWin = report.verdict === "USER_WINS";
  const isAiWin = report.verdict === "AI_WINS";

  return (
    <div className="rounded-2xl border border-white/20 bg-zinc-950 p-6 space-y-6 shadow-2xl">
      {/* Top Banner */}
      <div className="text-center space-y-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-mono font-bold text-amber-300">
          <Scale className="h-3.5 w-3.5" />
          <span>NEUTRAL JUDGE FINAL ADJUDICATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">{report.topicTitle}</h2>

        {/* Verdict Badge */}
        <div className="pt-2">
          <span
            className={`inline-block font-mono text-base sm:text-lg font-black px-6 py-2 rounded-xl shadow-lg ${
              isUserWin
                ? "bg-lime-400 text-black shadow-lime-400/20"
                : isAiWin
                ? "bg-purple-600 text-white shadow-purple-600/20"
                : "bg-amber-400 text-black shadow-amber-400/20"
            }`}
          >
            {report.verdict === "USER_WINS"
              ? "VERDICT: USER WINS NARROWLY"
              : report.verdict === "AI_WINS"
              ? "VERDICT: AI OPPONENT WINS"
              : "VERDICT: DEPENDS ON CRITERIA"}
          </span>
        </div>

        <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-2">
          {report.keyReason}
        </p>
      </div>

      {/* Score Summary Box */}
      <div className="grid grid-cols-2 gap-4 text-center font-mono">
        <div className="rounded-xl border border-sky-400/30 bg-sky-950/20 p-4 space-y-1">
          <div className="text-xs text-sky-300 font-bold uppercase">Your Argument Average</div>
          <div className="text-3xl font-black text-white">{report.userFinalScore}/100</div>
          <div className="text-[11px] text-zinc-400">Rounds Contested: {report.totalRounds}</div>
        </div>

        <div className="rounded-xl border border-purple-400/30 bg-purple-950/20 p-4 space-y-1">
          <div className="text-xs text-purple-300 font-bold uppercase">{report.aiPersona} Counter</div>
          <div className="text-3xl font-black text-white">{report.aiFinalScore}/100</div>
          <div className="text-[11px] text-zinc-400">Margin: {report.margin}</div>
        </div>
      </div>

      {/* Key Analysis Grids */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Strongest User Point */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-2">
          <div className="font-mono text-xs font-bold text-lime-400 flex items-center gap-1.5 uppercase">
            <CheckCircle className="h-4 w-4 text-lime-400" />
            <span>Strongest User Argument</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed italic">
            &quot;{report.strongestUserArgument}&quot;
          </p>
        </div>

        {/* Strongest AI Counter */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-2">
          <div className="font-mono text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Strongest AI Rebuttal</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed italic">
            &quot;{report.strongestAiCounter}&quot;
          </p>
        </div>
      </div>

      {/* Factual Errors & Best Evidence */}
      <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-zinc-400 uppercase font-bold">Best Evidence Cited:</span>
          <span className="text-sky-300 font-bold">{report.bestEvidenceCited}</span>
        </div>

        <div className="space-y-1">
          <div className="text-amber-400 font-bold uppercase flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" /> Factual & Methodological Notes
          </div>
          <ul className="list-disc pl-4 text-zinc-300 space-y-1">
            {report.factualErrorsIdentified.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-1 pt-2 border-t border-white/5">
          <div className="text-sky-400 font-bold uppercase flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" /> Most Important Unresolved Question
          </div>
          <ul className="list-disc pl-4 text-zinc-300 space-y-1">
            {report.unresolvedQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tactical Conclusion */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
        <div className="font-mono text-xs font-bold text-emerald-300 uppercase">
          Tactical Synthesis Verdict
        </div>
        <p className="text-xs text-zinc-200 leading-relaxed">{report.tacticalVerdict}</p>
        <div className="text-[10px] font-mono text-zinc-500 pt-1">
          Data Verified: {report.dataFreshnessTimestamp} · Model: Tactics OS Reality Engine
        </div>
      </div>

      {/* Restart & Action Buttons */}
      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-lime-300 transition shadow-lg shadow-lime-400/20"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start New Debate</span>
        </button>
      </div>
    </div>
  );
}
