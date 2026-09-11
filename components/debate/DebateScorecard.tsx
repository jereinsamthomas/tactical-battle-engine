"use client";

import React from "react";
import type { ArgumentAnalysis, ComparisonDimension } from "@/lib/types";
import type { WeightPreset } from "@/lib/debate/topicEngine";
import { AlertCircle, Award, Scale } from "lucide-react";

interface DebateScorecardProps {
  analysis?: ArgumentAnalysis;
  dimensions: ComparisonDimension[];
  activePreset: WeightPreset;
  onSelectPreset: (preset: WeightPreset) => void;
  onUpdateWeight: (id: string, weight: number) => void;
  entityA: string;
  entityB: string;
}

const PRESETS: { id: WeightPreset; label: string }[] = [
  { id: "OVERALL_CAREER", label: "Career" },
  { id: "PEAK", label: "Peak Level" },
  { id: "LONGEVITY", label: "Longevity" },
  { id: "TACTICAL_IMPACT", label: "Tactics" },
  { id: "BIG_GAMES", label: "Big Games" },
  { id: "STATISTICAL_PERFORMANCE", label: "Stats" },
  { id: "CUSTOM", label: "Custom" },
];

export function DebateScorecard({
  analysis,
  dimensions,
  activePreset,
  onSelectPreset,
  onUpdateWeight,
  entityA,
  entityB,
}: DebateScorecardProps) {
  const b = analysis?.breakdown || {
    accuracy: 16,
    evidence: 14,
    relevance: 14,
    logic: 13,
    tactical: 8,
    counter: 8,
    context: 4,
    clarity: 5,
  };

  const score = analysis?.totalScore ?? 82;
  const penalties = analysis?.penalties || [];
  const strength = analysis?.evidenceStrength || "STRONG";

  // Calculate weighted head-to-head score based on current dimension weights
  const totalWeight = dimensions.reduce((acc, d) => acc + d.weight, 0) || 100;
  const weightedScoreA = Math.round(
    dimensions.reduce((acc, d) => acc + d.scoreA * (d.weight / totalWeight), 0)
  );
  const weightedScoreB = Math.round(
    dimensions.reduce((acc, d) => acc + d.scoreB * (d.weight / totalWeight), 0)
  );

  return (
    <div className="space-y-4">
      {/* 1. Argument Score Panel */}
      <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-lime-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Argument Score (100 Max)
            </h3>
          </div>
          <span
            className={`font-mono text-sm font-black px-2.5 py-0.5 rounded ${
              score >= 80
                ? "bg-lime-400/20 text-lime-400 border border-lime-400/40"
                : score >= 65
                ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
            }`}
          >
            {score}/100
          </span>
        </div>

        {/* Evidence Strength Meter */}
        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
          <span className="text-zinc-400 font-mono text-[11px]">Evidence Strength:</span>
          <span
            className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              strength === "VERY_STRONG"
                ? "bg-emerald-500/20 text-emerald-300"
                : strength === "STRONG"
                ? "bg-sky-500/20 text-sky-300"
                : strength === "MODERATE"
                ? "bg-amber-500/20 text-amber-300"
                : "bg-rose-500/20 text-rose-300"
            }`}
          >
            {strength.replace(/_/g, " ")}
          </span>
        </div>

        {/* 8-Dimensional Score Bars */}
        <div className="space-y-2 pt-1">
          <ScoreBar label="Factual Accuracy" val={b.accuracy} max={20} color="bg-emerald-400" />
          <ScoreBar label="Evidence Quality" val={b.evidence} max={20} color="bg-sky-400" />
          <ScoreBar label="Topic Relevance" val={b.relevance} max={15} color="bg-cyan-400" />
          <ScoreBar label="Logical Consistency" val={b.logic} max={15} color="bg-indigo-400" />
          <ScoreBar label="Tactical Depth" val={b.tactical} max={10} color="bg-lime-400" />
          <ScoreBar label="Counter Resistance" val={b.counter} max={10} color="bg-amber-400" />
          <ScoreBar label="Contextual Nuance" val={b.context} max={5} color="bg-purple-400" />
          <ScoreBar label="Argument Clarity" val={b.clarity} max={5} color="bg-zinc-300" />
        </div>

        {/* Penalties Log */}
        {penalties.length > 0 && (
          <div className="border-t border-white/10 pt-2 space-y-1.5">
            <div className="font-mono text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Deductions Applied
            </div>
            {penalties.map((p, idx) => (
              <div
                key={idx}
                className="rounded bg-rose-950/40 border border-rose-500/20 p-2 text-[11px] font-mono text-rose-200 flex justify-between gap-2"
              >
                <span>{p.reason}</span>
                <span className="font-bold text-rose-400 shrink-0">-{p.deduction}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Interactive Comparison Weights */}
      <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-sky-400" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Evaluation Criteria & Weights
            </h3>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">Dynamic Re-weighting</span>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1">
          {PRESETS.map((pr) => (
            <button
              key={pr.id}
              onClick={() => onSelectPreset(pr.id)}
              className={`rounded px-2 py-1 text-[10px] font-mono transition ${
                activePreset === pr.id
                  ? "bg-sky-400 text-black font-bold"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>

        {/* Weighted Outcome Header */}
        <div className="grid grid-cols-2 gap-2 text-center font-mono pt-1">
          <div className="rounded bg-black/40 border border-white/5 p-2">
            <div className="text-[10px] text-zinc-400 truncate">{entityA}</div>
            <div className="text-base font-bold text-sky-400">{weightedScoreA} pts</div>
          </div>
          <div className="rounded bg-black/40 border border-white/5 p-2">
            <div className="text-[10px] text-zinc-400 truncate">{entityB}</div>
            <div className="text-base font-bold text-purple-400">{weightedScoreB} pts</div>
          </div>
        </div>

        {/* Dimension Sliders */}
        <div className="space-y-2.5 pt-2 max-h-56 overflow-y-auto pr-1">
          {dimensions.map((d) => (
            <div key={d.id} className="space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="truncate pr-2">{d.name}</span>
                <span className="font-bold text-sky-300 shrink-0">{d.weight}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={d.weight}
                onChange={(e) => onUpdateWeight(d.id, Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[9px] text-zinc-500">
                <span>{entityA}: {d.scoreA}</span>
                <span>{entityB}: {d.scoreB}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  val,
  max,
  color,
}: {
  label: string;
  val: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, Math.round((val / max) * 100));
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className="w-28 text-zinc-400 truncate text-[10px]">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right text-zinc-200 font-bold text-[10px]">
        {val}/{max}
      </span>
    </div>
  );
}
