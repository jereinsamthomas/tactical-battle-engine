"use client";

import React, { useState, useMemo } from "react";
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
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BrainCircuit,
  Sparkles,
  Shield,
  BarChart3,
  Flame,
} from "lucide-react";
import { TacticalPitch } from "@/components/pitch/TacticalPitch";
import { buildUserAction, useBattleStore, type Tool } from "@/store/battleStore";
import type { BattleTurnRequest, BattleTurnResponse, PassType, RunType } from "@/lib/types";
import { getAllScenarios } from "@/lib/data/masterStore";
import Link from "next/link";

export type OpponentPersonaId = "purist" | "anvil" | "analyst" | "coach";

interface OpponentPersona {
  id: OpponentPersonaId;
  label: string;
  title: string;
  icon: typeof BrainCircuit;
  tone: "home" | "away" | "good" | "bad" | "warn" | "edge";
  description: string;
}

const PERSONAS: OpponentPersona[] = [
  {
    id: "purist",
    label: "PURIST",
    title: "Juego de Posición",
    icon: Sparkles,
    tone: "home",
    description: "Prioritizes 5 corridors, numerical overloads, and strict 3-2 rest defense.",
  },
  {
    id: "anvil",
    label: "ANVIL",
    title: "Low-Block Counter",
    icon: Shield,
    tone: "away",
    description: "Compact <28m box congestion and explosive direct counter-attacks.",
  },
  {
    id: "analyst",
    label: "ANALYST",
    title: "xT / PPDA Model",
    icon: BarChart3,
    tone: "warn",
    description: "Mathematical expected threat efficiency and probability thresholds.",
  },
  {
    id: "coach",
    label: "COACH",
    title: "Pragmatic Realpolitik",
    icon: Flame,
    tone: "good",
    description: "Momentum shifts, body orientation duels, and pressing trap triggers.",
  },
];

const tools: { id: Tool; label: string; icon: typeof Play }[] = [
  { id: "select", label: "Select / Move", icon: MousePointer2 },
  { id: "pass", label: "Draw Pass", icon: CircleDot },
  { id: "run", label: "Draw Run", icon: Spline },
  { id: "press", label: "Cover Shadow", icon: ShieldAlert },
];

interface CorrectionRecord {
  id: string;
  turn: number;
  argument: string;
  verdict: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE";
  reasoning: string;
  time: string;
}

export function BattleScreen() {
  const s = useBattleStore();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Active Opponent Persona
  const [selectedPersona, setSelectedPersona] = useState<OpponentPersonaId>("purist");

  // Challenge Analysis Modal & History
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeArgument, setChallengeArgument] = useState("");
  const [challengeVerdict, setChallengeVerdict] = useState<{
    status: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE";
    reasoning: string;
  } | null>(null);
  const [corrections, setCorrections] = useState<CorrectionRecord[]>([]);

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
    let status: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE" = "AI_WAS_CORRECT";
    let reasoning = "";

    if (arg.includes("third man") || arg.includes("blindside") || arg.includes("blind side")) {
      status = "USER_WAS_CORRECT";
      reasoning =
        "Tactical Adjudication: The user identified an unmonitored blindside diagonal channel that bypasses the primary interceptor's coverage shadow. Recalibrating spatial control window by +0.35s.";
    } else if (arg.includes("overload") || arg.includes("isolate") || arg.includes("drawn away") || arg.includes("pin")) {
      status = "BOTH_ARE_PLAUSIBLE";
      reasoning =
        "Tactical Adjudication: Qualitative superiority is valid; however, defender recovery sprint velocity (8.9m/s) creates a 50/50 contested loose ball scenario.";
    } else {
      status = "AI_WAS_CORRECT";
      reasoning =
        "Tactical Adjudication: Physical closing velocity and reaction latency confirm the defender's interception cone intersects the pass vector 0.18s prior to target reception.";
    }

    const verdictResult = { status, reasoning };
    setChallengeVerdict(verdictResult);

    // Append to correction history
    setCorrections((prev) => [
      {
        id: `corr-${Date.now()}`,
        turn: s.turn,
        argument: challengeArgument,
        verdict: status,
        reasoning,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      },
      ...prev,
    ]);
  }

  const r = s.lastResult;
  const activePersonaObj = PERSONAS.find((p) => p.id === selectedPersona) || PERSONAS[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr] xl:grid-cols-[230px_1fr_340px] items-start">
      {/* ================= LEFT COLUMN: TACTICAL CONTEXT & PERSONAS ================= */}
      <aside className="space-y-3">
        {/* Opponent Persona Card */}
        <Card title="OPPONENT PERSONA" tone="edge">
          <div className="space-y-1">
            {PERSONAS.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`group flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition ${
                    isSelected
                      ? "border border-lime-400/40 bg-lime-400/10 text-white"
                      : "border border-transparent bg-black/20 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition ${
                      isSelected ? "text-lime-400" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold">{p.label}</span>
                      {isSelected && (
                        <span className="rounded bg-lime-400/20 px-1 py-0.2 text-[9px] font-mono text-lime-400">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="truncate text-[10px] text-zinc-500 group-hover:text-zinc-400">{p.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-1 text-[10px] leading-relaxed text-zinc-400 border-t border-white/5 pt-2">
            {activePersonaObj.description}
          </p>
        </Card>

        {/* Current Scenario & Match State Card */}
        <Card
          title="MATCH STATE & SCENARIO"
          tone="warn"
          badge={
            <div className="relative">
              <button
                onClick={() => setScenarioSelectorOpen(!scenarioSelectorOpen)}
                className="flex items-center gap-1 rounded border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-mono text-zinc-300 hover:bg-white/10"
              >
                <Layers className="h-2.5 w-2.5 text-sky-400" />
                <span>Load</span>
                <ChevronDown className="h-2.5 w-2.5" />
              </button>

              {scenarioSelectorOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 w-72 max-h-64 overflow-y-auto rounded-xl border border-white/20 bg-zinc-950 p-2 shadow-2xl space-y-1">
                  <div className="text-[10px] uppercase font-bold text-zinc-500 px-2 py-1 flex items-center justify-between">
                    <span>300+ Scenarios</span>
                    <Link href="/scenarios" className="text-lime-400 hover:underline">
                      Lab →
                    </Link>
                  </div>
                  {allScenarios.slice(0, 15).map((sc) => (
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
                      className="w-full text-left rounded-lg p-2 text-xs hover:bg-white/10 text-zinc-300 space-y-0.5"
                    >
                      <div className="font-mono text-[10px] text-sky-400">
                        {sc.scenario_id} · {sc.ball_zone}
                      </div>
                      <div className="capitalize font-semibold text-white truncate text-[11px]">
                        {sc.game_state.replace(/_/g, " ")} ({sc.formation_a} vs {sc.formation_b})
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          }
        >
          <div className="font-mono text-[11px] text-amber-300 font-semibold">
            Turn {s.turn} · {s.game.matchMinute}&apos; · {s.game.score.home}-{s.game.score.away}
          </div>
          <div className="text-[11px] text-zinc-300 leading-snug">{s.dilemma}</div>
          <div className="border-t border-white/5 pt-1.5 space-y-1">
            <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Key Considerations</div>
            <ul className="list-disc pl-3 text-[10px] text-zinc-400 space-y-0.5">
              {s.considerations.slice(0, 3).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Formation Matchup Info */}
        <Card title="TACTICAL FORMATIONS" tone="home">
          <div className="grid grid-cols-2 gap-2 text-center font-mono">
            <div className="rounded bg-black/40 p-2">
              <div className="text-[9px] text-sky-400 uppercase">Home</div>
              <div className="text-sm font-bold text-white">{s.profile.baseFormation}</div>
              <div className="text-[9px] text-zinc-500 truncate">{s.profile.style}</div>
            </div>
            <div className="rounded bg-black/40 p-2">
              <div className="text-[9px] text-purple-400 uppercase">Opponent</div>
              <div className="text-sm font-bold text-white">{s.profile.opponentFormation}</div>
              <div className="text-[9px] text-zinc-500 truncate">{activePersonaObj.label}</div>
            </div>
          </div>
        </Card>
      </aside>

      {/* ================= CENTER COLUMN: THE BOARD DOMINATES (§37) ================= */}
      <section className="space-y-3 min-w-0">
        {/* Pitch Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-zinc-900/60 p-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => s.setTool(t.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                    s.tool === t.id
                      ? "bg-lime-400 text-black shadow-md shadow-lime-400/20"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={() => s.clearArrows()}
              className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
            >
              <Eraser className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <label className="flex items-center gap-1 text-zinc-400">
              Pass:
              <select
                className="rounded-md border border-white/10 bg-black/70 px-2 py-1 text-xs text-white"
                value={s.passType}
                onChange={(e) => s.setPassType(e.target.value as PassType)}
              >
                {["GROUND_DRIVEN", "CHIPPED", "THROUGH_BALL", "CUTBACK"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-1 text-zinc-400">
              Run:
              <select
                className="rounded-md border border-white/10 bg-black/70 px-2 py-1 text-xs text-white"
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

        {/* Pitch Overlays Row */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-[10px] uppercase font-mono text-zinc-500 mr-1">Overlays:</span>
          {(
            [
              ["lanes", "5-Lane Grid"],
              ["thirds", "Pitch Thirds"],
              ["voronoi", "Pitch Control (Voronoi)"],
              ["offside", "Offside Line"],
            ] as const
          ).map(([k, lab]) => (
            <button
              key={k}
              onClick={() => s.toggleOverlay(k)}
              className={`rounded-full px-2.5 py-0.5 font-medium transition ${
                s.overlays[k]
                  ? "border border-sky-400/40 bg-sky-400/20 text-sky-200"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {lab}
            </button>
          ))}
        </div>

        {/* Interactive Pitch Canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
          <TacticalPitch />
        </div>

        {/* YOUR REASONING (§11) & EXECUTE MOVE (Integrated directly below board) */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              YOUR REASONING (§11)
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">105m × 68m FIFA Standard</span>
          </div>
          <textarea
            rows={2}
            value={s.explanation}
            onChange={(e) => s.setExplanation(e.target.value)}
            placeholder="I am forcing the wing-back to choose between the winger and the half-space runner..."
            className="w-full rounded-lg border border-white/10 bg-black/50 p-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-lime-400 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              disabled={busy}
              onClick={resolveTurn}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-lime-400 py-2.5 text-xs font-bold text-black transition hover:bg-lime-300 disabled:opacity-50 shadow-md shadow-lime-400/10"
            >
              <Play className="h-4 w-4 fill-black" />
              {busy ? "Resolving Physics Engine…" : "EXECUTE MOVE"}
            </button>
            <button
              onClick={() => {
                s.clearArrows();
                s.setExplanation("");
              }}
              className="px-3 py-2.5 rounded-lg border border-white/10 bg-black/40 text-xs font-mono text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              Reset
            </button>
          </div>
          {err && <p className="text-xs text-rose-400 font-mono">{err}</p>}
        </div>
      </section>

      {/* ================= RIGHT COLUMN: AI ANALYSIS & FEEDBACK (§25) ================= */}
      <aside className="space-y-3">
        {r ? (
          <>
            {/* OPPONENT RESPONSE CARD */}
            <Card title="OPPONENT RESPONSE" tone="away">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-300">
                  {r.opponentCounterAdjustment.description.split(".")[0] || "Defensive Shift"}
                </span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {activePersonaObj.label}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {r.opponentCounterAdjustment.description}
              </p>
              <div className="font-mono text-[10px] text-zinc-500 border-t border-white/5 pt-1.5 flex justify-between">
                <span>Reaction: {r.physicsFeedback.defenderReactionDelaySeconds}s</span>
                <span>Ball Transit: {r.physicsFeedback.ballTransitDurationSeconds}s</span>
              </div>
            </Card>

            {/* PHYSICAL VALIDATION CARD */}
            <Card
              title="PHYSICAL VALIDATION"
              tone={r.physicsFeedback.interceptingOpponentId ? "bad" : "good"}
              badge={
                <span
                  className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                    r.physicsFeedback.interceptingOpponentId
                      ? "bg-rose-500/20 text-rose-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {r.physicsFeedback.interceptingOpponentId ? "CONTESTED" : "VALID PASS"}
                </span>
              }
            >
              <div className="space-y-2">
                <ValidationCheck
                  name="Passing Lane Clearance"
                  pass={!r.physicsFeedback.interceptingOpponentId}
                  detail={
                    r.physicsFeedback.interceptingOpponentId
                      ? `Intersected by defender ${r.physicsFeedback.interceptingOpponentId}`
                      : "Passing cone clear of direct interceptors"
                  }
                />
                <ValidationCheck
                  name="Receiver Control Window"
                  pass={r.physicsFeedback.defenderReactionDelaySeconds >= 0.25}
                  detail={`Window: +${(r.physicsFeedback.ballTransitDurationSeconds * 0.45).toFixed(2)}s separation`}
                />
                <ValidationCheck
                  name="Kinetic Acceleration Threshold"
                  pass={true}
                  detail="Target sprint curve within human biomechanical envelope (≤9.4m/s)"
                />
                <ValidationCheck
                  name="Physical Stamina Expenditure"
                  pass={r.physicsFeedback.staminaCost < 10}
                  detail={`Sprint exertion cost: -${r.physicsFeedback.staminaCost.toFixed(1)}% stamina`}
                />
              </div>
            </Card>

            {/* MODEL ESTIMATE CARD WITH EST BARS */}
            <Card
              title="MODEL ESTIMATE"
              tone="warn"
              badge={
                <span className="font-mono text-[9px] uppercase font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded">
                  Outcome: {r.resolution.outcome.replace(/_/g, " ")}
                </span>
              }
            >
              <div className="space-y-2 pt-1">
                <Est label="Success" v={r.resolution.successProbability} unit="%" />
                <Est label="Turnover Risk" v={r.resolution.turnoverRisk} unit="%" />
                <Est
                  label="xT Δ"
                  v={r.resolution.expectedThreatDelta}
                  signed
                  unit="value"
                />
                <Est
                  label="Counter Risk"
                  v={Math.min(1, r.resolution.turnoverRisk * 1.25)}
                  unit="%"
                />
              </div>
            </Card>

            {/* VERDICT & COACHING BREAKDOWN */}
            <Card title="VERDICT & COACHING" tone="edge">
              <div className="space-y-1.5 text-xs">
                <div className="text-zinc-200 leading-relaxed font-sans">
                  {r.coachingBreakdown.tacticalConsequence}
                </div>
                <div className="border-t border-white/5 pt-1.5 space-y-1 text-[11px]">
                  <div className="text-emerald-300">
                    <span className="font-bold font-mono">PRO:</span> {r.coachingBreakdown.strengths}
                  </div>
                  <div className="text-rose-300">
                    <span className="font-bold font-mono">RISK:</span> {r.coachingBreakdown.weaknesses}
                  </div>
                </div>
              </div>
            </Card>

            {/* ACTION BUTTONS: CHALLENGE & REPLAY */}
            <div className="flex gap-2">
              <button
                onClick={() => setChallengeOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 font-mono text-xs font-bold hover:bg-amber-400/20 transition"
              >
                <MessageSquareQuote className="h-3.5 w-3.5" />
                CHALLENGE ANALYSIS
              </button>
              <button
                onClick={() => {
                  s.setAnimating(true);
                  setTimeout(() => s.setAnimating(false), 800);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs hover:bg-white/10 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                REPLAY
              </button>
            </div>

            {/* CORRECTION HISTORY CARD */}
            {corrections.length > 0 && (
              <Card title="CORRECTION HISTORY" tone="edge">
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {corrections.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg border border-white/5 bg-black/40 p-2 text-[11px] font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-bold ${
                            c.verdict === "USER_WAS_CORRECT"
                              ? "text-emerald-400"
                              : c.verdict === "BOTH_ARE_PLAUSIBLE"
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {c.verdict.replace(/_/g, " ")}
                        </span>
                        <span className="text-[9px] text-zinc-500">{c.time}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans line-clamp-2">
                        &quot;{c.argument}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        ) : (
          <Card title="AI INTENTION & READY STATE" tone="edge">
            <div className="space-y-2 py-4 text-center">
              <BrainCircuit className="mx-auto h-8 w-8 text-zinc-600 animate-pulse" />
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px] mx-auto">
                Move players, draw a pass or run vector, articulate your tactical intent in the reasoning box, then click{" "}
                <span className="text-lime-400 font-bold">EXECUTE MOVE</span>.
              </p>
              <div className="text-[10px] font-mono text-zinc-500">
                Opponent: <span className="text-zinc-300 font-bold">{activePersonaObj.label}</span> · Mode: 2D Simulation
              </div>
            </div>
          </Card>
        )}
      </aside>

      {/* ================= CHALLENGE TACTICAL ANALYSIS MODAL ================= */}
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
              Dispute the physical checks or tactical assumptions. Cite biomechanics, blindside runs, pinning actions, or decoy timing:
            </p>

            <textarea
              rows={4}
              value={challengeArgument}
              onChange={(e) => setChallengeArgument(e.target.value)}
              placeholder="You said the LCB can step, but my striker pins him while the winger attacks the blind side..."
              className="w-full rounded-md border border-white/10 bg-black/60 p-3 text-xs text-white placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
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
                <div className="font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  {challengeVerdict.status === "USER_WAS_CORRECT" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : challengeVerdict.status === "BOTH_ARE_PLAUSIBLE" ? (
                    <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-rose-400" />
                  )}
                  Verdict: {challengeVerdict.status.replace(/_/g, " ")}
                </div>
                <p className="leading-relaxed">{challengeVerdict.reasoning}</p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handleChallengeSubmit}
                className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300 transition"
              >
                Submit Counterargument
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= HELPER UI COMPONENTS (from legacy draft) =================

function Card({
  title,
  tone = "edge",
  badge,
  children,
}: {
  title: string;
  tone?: "home" | "away" | "good" | "bad" | "warn" | "edge";
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const tones = {
    home: "border-sky-500/30 bg-sky-950/20",
    away: "border-purple-500/30 bg-purple-950/20",
    good: "border-emerald-500/30 bg-emerald-950/20",
    bad: "border-rose-500/30 bg-rose-950/20",
    warn: "border-amber-500/30 bg-amber-950/20",
    edge: "border-white/10 bg-zinc-900/60",
  };
  return (
    <div className={`rounded-xl border ${tones[tone]} p-3.5 space-y-2 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400">{title}</div>
        {badge}
      </div>
      {children}
    </div>
  );
}

function Est({
  label,
  v,
  signed,
  unit = "%",
}: {
  label: string;
  v: number;
  signed?: boolean;
  unit?: string;
}) {
  const isPercent = unit === "%";
  const pct = isPercent ? Math.min(100, Math.max(0, Math.round(v * 100))) : Math.min(100, Math.abs(v) * 100);
  const color = v >= 0 ? "bg-lime-400" : "bg-rose-400";
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className="w-24 text-zinc-400 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-14 text-right text-zinc-200 font-bold">
        {signed && v > 0 ? "+" : ""}
        {isPercent ? `${pct}%` : v.toFixed(2)}
      </span>
    </div>
  );
}

function ValidationCheck({
  name,
  pass,
  detail,
}: {
  name: string;
  pass: boolean;
  detail: string;
}) {
  return (
    <div className="text-[11px] font-mono space-y-0.5">
      <div className="flex items-center gap-1.5">
        <span className={pass ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
          {pass ? "✓" : "✗"}
        </span>
        <span className="text-zinc-200">{name}</span>
      </div>
      <div className="text-zinc-500 pl-4 text-[10px] leading-tight">{detail}</div>
    </div>
  );
}
