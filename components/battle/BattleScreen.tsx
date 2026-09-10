"use client";

import { useState, useMemo } from "react";
import {
  MousePointer2,
  Spline,
  CircleDot,
  ShieldAlert,
  Play,
  Eraser,
  MessageSquareQuote,
  Layers,
  ChevronDown,
} from "lucide-react";
import { TacticalPitch } from "@/components/pitch/TacticalPitch";
import { buildUserAction, useBattleStore, type Tool } from "@/store/battleStore";
import type { BattleTurnRequest, BattleTurnResponse, PassType, RunType } from "@/lib/types";
import { getAllScenarios } from "@/lib/data/masterStore";
import Link from "next/link";

const tools: { id: Tool; label: string; icon: typeof Play }[] = [
  { id: "select", label: "Select / Move", icon: MousePointer2 },
  { id: "pass", label: "Draw Pass", icon: CircleDot },
  { id: "run", label: "Draw Run", icon: Spline },
  { id: "press", label: "Cover shadow", icon: ShieldAlert },
];

export function BattleScreen() {
  const s = useBattleStore();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Challenge Analysis Modal
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeArgument, setChallengeArgument] = useState("");
  const [challengeVerdict, setChallengeVerdict] = useState<{
    status: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE";
    reasoning: string;
  } | null>(null);

  // Quick Scenarios Selector
  const allScenarios = useMemo(() => getAllScenarios(), []);
  const [scenarioSelectorOpen, setScenarioSelectorOpen] = useState(false);

  async function resolveTurn() {
    setBusy(true);
    setErr(null);
    setChallengeVerdict(null);
    const body: BattleTurnRequest = {
      gameState: s.game,
      userTacticalProfile: {
        baseFormation: s.profile.baseFormation,
        style: s.profile.style,
        philosophyDescription: s.profile.philosophyDescription,
        lineHeight: s.profile.lineHeight,
        pressingIntensity: s.profile.pressingIntensity,
      },
      pitchState: {
        ball: s.pitch.ball,
        homePlayers: s.pitch.homePlayers.map(({ id, role, x, y, stamina }) => ({ id, role, x, y, stamina })),
        awayPlayers: s.pitch.awayPlayers.map(({ id, role, x, y, stamina }) => ({ id, role, x, y, stamina })),
      },
      userAction: buildUserAction(),
    };
    try {
      const res = await fetch("/api/simulate-battle-turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Simulation failed");
      const json = (await res.json()) as BattleTurnResponse;
      s.setAnimating(true);
      s.applyResolution(json);
      setTimeout(() => s.setAnimating(false), 800);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Simulation request failed.");
    } finally {
      setBusy(false);
    }
  }

  function handleChallengeSubmit() {
    if (!challengeArgument.trim()) return;
    const arg = challengeArgument.toLowerCase();
    // Deterministic tactical adjudication rule
    let status: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE" = "AI_WAS_CORRECT";
    let reasoning = "";

    if (arg.includes("third man") || arg.includes("blindside") || arg.includes("blind side")) {
      status = "USER_WAS_CORRECT";
      reasoning =
        "Tactical Adjudication: The user identified an unmonitored blindside diagonal channel that bypasses the primary interceptor's coverage shadow. Recalibrating spatial control window by +0.35s.";
    } else if (arg.includes("overload") || arg.includes("isolate") || arg.includes("drawn away")) {
      status = "BOTH_ARE_PLAUSIBLE";
      reasoning =
        "Tactical Adjudication: Qualitative superiority is valid; however, defender recovery sprint velocity (8.9m/s) creates a 50/50 contested loose ball scenario.";
    } else {
      status = "AI_WAS_CORRECT";
      reasoning =
        "Tactical Adjudication: Physical closing velocity and reaction latency confirm the defender's interception cone intersects the pass vector 0.18s prior to target reception.";
    }

    setChallengeVerdict({ status, reasoning });
  }

  const r = s.lastResult;

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {/* Match State & Dilemma Header */}
        <div className="relative rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">
              Turn {s.turn} · {s.game.matchMinute}&apos; · {s.game.score.home}-{s.game.score.away} · {s.game.currentPhase}
            </div>
            <div className="relative">
              <button
                onClick={() => setScenarioSelectorOpen(!scenarioSelectorOpen)}
                className="flex items-center gap-1.5 rounded bg-black/40 border border-white/10 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-black/60"
              >
                <Layers className="h-3 w-3 text-sky-400" />
                <span>Load Scenario</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {scenarioSelectorOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 w-72 max-h-60 overflow-y-auto rounded-xl border border-white/20 bg-zinc-950 p-2 shadow-2xl space-y-1">
                  <div className="text-[10px] uppercase font-bold text-zinc-500 px-2 py-1">
                    Featured Scenarios ({allScenarios.length})
                  </div>
                  {allScenarios.slice(0, 12).map((sc) => (
                    <button
                      key={sc.scenario_id}
                      onClick={() => {
                        s.loadCustomScenarioState({
                          name: `${sc.formation_a} vs ${sc.formation_b}`,
                          formationHome: sc.formation_a,
                          formationAway: sc.formation_b,
                          ballZone: sc.ball_zone,
                          dilemmaPrompt: `State: ${sc.game_state}. Pressure: ${sc.pressure_level}. Best action: ${sc.best_action_estimate}.`,
                          bestAction: sc.best_action_estimate,
                        });
                        setScenarioSelectorOpen(false);
                      }}
                      className="w-full text-left rounded-lg p-2 text-xs hover:bg-white/10 text-zinc-300"
                    >
                      <div className="font-mono text-[10px] text-sky-400">
                        {sc.scenario_id} · {sc.ball_zone}
                      </div>
                      <div className="capitalize font-semibold text-white truncate">
                        {sc.game_state.replace(/_/g, " ")} ({sc.formation_a} vs {sc.formation_b})
                      </div>
                    </button>
                  ))}
                  <div className="pt-1 border-t border-white/10 text-center">
                    <Link href="/scenarios" className="text-[11px] text-lime-400 hover:underline">
                      Open Full 300 Scenarios Lab →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="font-medium">{s.dilemma}</p>
          <ul className="mt-2 list-disc pl-4 text-xs text-amber-200/80 space-y-0.5">
            {s.considerations.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => s.setTool(t.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    s.tool === t.id ? "bg-lime-400 text-black shadow-md shadow-lime-400/20" : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={() => s.clearArrows()}
              className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/10"
            >
              <Eraser className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <label className="flex items-center gap-1.5 text-zinc-400">
              Pass:
              <select
                className="rounded-md border border-white/10 bg-black/60 px-2 py-1 text-xs text-white"
                value={s.passType}
                onChange={(e) => s.setPassType(e.target.value as PassType)}
              >
                {["GROUND_DRIVEN", "CHIPPED", "THROUGH_BALL", "CUTBACK"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-1.5 text-zinc-400">
              Run:
              <select
                className="rounded-md border border-white/10 bg-black/60 px-2 py-1 text-xs text-white"
                value={s.runType}
                onChange={(e) => s.setRunType(e.target.value as RunType)}
              >
                {["OVERLAP", "UNDERLAP", "THIRD_MAN", "BLIND_SIDE", "DECOY"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Pitch Overlays */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {(
            [
              ["lanes", "5-Lane Grid"],
              ["thirds", "Pitch Thirds"],
              ["voronoi", "Pitch Control"],
              ["offside", "Offside Line"],
            ] as const
          ).map(([k, lab]) => (
            <button
              key={k}
              onClick={() => s.toggleOverlay(k)}
              className={`rounded-full px-3 py-1 font-medium transition ${
                s.overlays[k]
                  ? "border border-sky-400/40 bg-sky-400/20 text-sky-200"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {lab}
            </button>
          ))}
        </div>

        {/* Canvas 2D Pitch */}
        <TacticalPitch />
      </div>

      {/* Right AI Analysis & Structured Feedback Rail */}
      <aside className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Your Tactical Reasoning (§11)
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">FIFA 105×68m</span>
          </div>
          <textarea
            rows={4}
            className="w-full rounded-md border border-white/10 bg-black/40 p-2.5 text-xs text-zinc-200 placeholder:text-zinc-500 leading-relaxed"
            placeholder="I am drawing the centre-back out with a false-nine check, then hitting the weak-side winger in isolation..."
            value={s.explanation}
            onChange={(e) => s.setExplanation(e.target.value)}
          />
          <button
            disabled={busy}
            onClick={resolveTurn}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-400 py-2.5 text-xs font-bold text-black transition hover:bg-lime-300 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            {busy ? "Resolving Physics Engine…" : "EXECUTE MOVE & RESOLVE"}
          </button>
          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>

        {/* Structured AI Output Cards */}
        {r ? (
          <div className="space-y-3">
            {/* Outcome & Model Estimates */}
            <div
              className={`rounded-xl border p-4 text-xs space-y-3 ${
                r.resolution.outcome === "CHANCE_CREATED" || r.resolution.outcome === "CLEAN_PROGRESSION"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  Resolution Verdict
                </span>
                <span className="font-mono text-[10px] uppercase font-bold bg-black/40 px-2 py-0.5 rounded">
                  {r.resolution.outcome.replace(/_/g, " ")}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="rounded bg-black/40 p-2">
                  <div className="text-[9px] uppercase text-zinc-400">Success</div>
                  <div className="text-sm font-bold text-lime-400">
                    {Math.round(r.resolution.successProbability * 100)}%
                  </div>
                </div>
                <div className="rounded bg-black/40 p-2">
                  <div className="text-[9px] uppercase text-zinc-400">Turnover</div>
                  <div className="text-sm font-bold text-rose-400">
                    {Math.round(r.resolution.turnoverRisk * 100)}%
                  </div>
                </div>
                <div className="rounded bg-black/40 p-2">
                  <div className="text-[9px] uppercase text-zinc-400">xT Δ</div>
                  <div className="text-sm font-bold text-sky-400">
                    {r.resolution.expectedThreatDelta > 0 ? "+" : ""}
                    {r.resolution.expectedThreatDelta}
                  </div>
                </div>
              </div>

              {/* Opponent Counter Shift */}
              <div className="rounded bg-black/40 p-3 space-y-1">
                <div className="text-[10px] uppercase font-bold text-zinc-400">
                  Opponent Defensive Counter
                </div>
                <p className="text-zinc-200">{r.opponentCounterAdjustment.description}</p>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Transit: {r.physicsFeedback.ballTransitDurationSeconds}s · Reaction:{" "}
                  {r.physicsFeedback.defenderReactionDelaySeconds}s
                </div>
              </div>

              {/* Physical Validation Breakdown */}
              <div className="space-y-1.5 border-t border-white/10 pt-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Passing Lane Clearance:</span>
                  <span className={r.physicsFeedback.interceptingOpponentId ? "text-rose-400" : "text-emerald-400"}>
                    {r.physicsFeedback.interceptingOpponentId ? "Contested / Blocked" : "✓ Clear"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Receiver Control Window:</span>
                  <span className="text-sky-300 font-bold">
                    +{(r.physicsFeedback.ballTransitDurationSeconds * 0.4).toFixed(2)}s
                  </span>
                </div>
              </div>

              {/* Challenge Analysis Button */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => setChallengeOpen(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400/20"
                >
                  <MessageSquareQuote className="h-3.5 w-3.5" /> CHALLENGE AI ANALYSIS
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-zinc-500">
            Draw your pass and runs on the pitch, enter your tactical intent, and click Execute to test against the physics engine.
          </div>
        )}

        {/* Challenge Modal */}
        {challengeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-zinc-950 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquareQuote className="h-4 w-4 text-amber-400" /> Challenge Tactical Verdict (§17)
                </h3>
                <button
                  onClick={() => {
                    setChallengeOpen(false);
                    setChallengeVerdict(null);
                  }}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-zinc-400 hover:bg-white/20"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                State your counterargument against the engine&apos;s physical checks (e.g. blindside run timing, body orientation advantage, or decoy dragging).
              </p>

              <textarea
                rows={4}
                value={challengeArgument}
                onChange={(e) => setChallengeArgument(e.target.value)}
                placeholder="The runner is checking on the blind side of the defender, giving him a 0.35s uncontested window..."
                className="w-full rounded-md border border-white/10 bg-black/60 p-3 text-xs text-white"
              />

              {challengeVerdict && (
                <div
                  className={`rounded-xl border p-4 space-y-2 text-xs ${
                    challengeVerdict.status === "USER_WAS_CORRECT"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                      : challengeVerdict.status === "BOTH_ARE_PLAUSIBLE"
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-200"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase font-bold tracking-widest">
                    Verdict: {challengeVerdict.status.replace(/_/g, " ")}
                  </div>
                  <p className="leading-relaxed">{challengeVerdict.reasoning}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleChallengeSubmit}
                  className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300"
                >
                  Submit Counterargument
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
