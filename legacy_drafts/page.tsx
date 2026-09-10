"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { TacticalPitch } from "@/components/pitch/TacticalPitch";
import { getAllScenarios } from "@/lib/data/masterStore";
import { useBattleStore, buildUserAction } from "@/store/battleStore";
import type { BattleTurnRequest, BattleTurnResponse } from "@/lib/types";

export type PersonaId = "purist" | "anvil" | "analyst" | "coach";

const PERSONAS: { id: PersonaId; label: string; desc: string }[] = [
  { id: "purist", label: "PURIST", desc: "Juego de Posición & Positional Superiority" },
  { id: "anvil", label: "ANVIL", desc: "Low Block <28m & Direct Counter" },
  { id: "analyst", label: "ANALYST", desc: "xG/xT Mathematical Efficiency Model" },
  { id: "coach", label: "COACH", desc: "Pragmatic Realpolitik & Momentum" },
];

interface Correction {
  id: string;
  adjudication: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE";
  status: string;
  argument: string;
}

export default function BattlePage() {
  const params = useParams();
  const scenarioId = typeof params?.id === "string" ? params.id : "SCN-001";
  const s = useBattleStore();
  const [persona, setPersona] = useState<PersonaId>("anvil");
  const [explanation, setExplanation] = useState("");
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeText, setChallengeText] = useState("");
  const [busy, setBusy] = useState(false);
  const [corrections, setCorrections] = useState<Correction[]>([]);

  const scenarios = useMemo(() => getAllScenarios(), []);
  const scenario = useMemo(() => {
    return (
      scenarios.find((sc) => sc.scenario_id === scenarioId) ||
      scenarios[0] || {
        scenario_id: "SCN-001",
        game_state: "mid_block",
        formation_a: "4-3-3",
        formation_b: "5-4-1",
        ball_zone: "Z14",
        pressure_level: "High",
        best_action_estimate: "Half-space penetration",
      }
    );
  }, [scenarios, scenarioId]);

  useEffect(() => {
    if (scenario) {
      s.loadCustomScenarioState({
        name: `${scenario.formation_a} vs ${scenario.formation_b}`,
        formationHome: scenario.formation_a,
        formationAway: scenario.formation_b,
        ballZone: scenario.ball_zone,
        dilemmaPrompt: `State: ${scenario.game_state}. Pressure: ${scenario.pressure_level}. Best action: ${scenario.best_action_estimate}.`,
        bestAction: scenario.best_action_estimate,
      });
    }
  }, [scenario, s]);

  const result = s.lastResult;

  async function handleExecuteMove() {
    setBusy(true);
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
      if (res.ok) {
        const json = (await res.json()) as BattleTurnResponse;
        s.setAnimating(true);
        s.applyResolution(json);
        setTimeout(() => s.setAnimating(false), 800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  function handleChallengeSubmit() {
    if (!challengeText.trim()) return;
    const arg = challengeText.toLowerCase();
    let adjudication: "USER_WAS_CORRECT" | "AI_WAS_CORRECT" | "BOTH_ARE_PLAUSIBLE" = "AI_WAS_CORRECT";
    let status = "Physical closing speed overrides reception window";

    if (arg.includes("third man") || arg.includes("blindside") || arg.includes("blind side")) {
      adjudication = "USER_WAS_CORRECT";
      status = "Unmonitored diagonal channel verified (+0.35s spatial control)";
    } else if (arg.includes("overload") || arg.includes("isolate") || arg.includes("drawn away")) {
      adjudication = "BOTH_ARE_PLAUSIBLE";
      status = "Qualitative superiority verified (contested 50/50 loose ball)";
    }

    setCorrections((prev) => [
      {
        id: `c-${Date.now()}`,
        adjudication,
        status,
        argument: challengeText,
      },
      ...prev,
    ]);
    setChallengeOpen(false);
    setChallengeText("");
  }

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-4 text-zinc-200">
      {/* LEFT — tactical controls */}
      <aside className="space-y-3">
        <div className="border border-white/10 rounded-lg p-3 bg-zinc-900/70 backdrop-blur-sm">
          <div className="font-mono text-[10px] text-zinc-400 mb-2 font-bold tracking-wider">OPPONENT PERSONA</div>
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              className={`block w-full text-left font-mono text-xs px-2 py-1.5 rounded mb-1 transition ${
                persona === p.id
                  ? "bg-lime-400/20 text-lime-400 border border-lime-400/30"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="font-bold">{p.label}</div>
              <div className="text-[10px] text-zinc-500 truncate">{p.desc}</div>
            </button>
          ))}
        </div>

        <div className="border border-white/10 rounded-lg p-3 bg-zinc-900/70 backdrop-blur-sm space-y-1.5">
          <div className="font-mono text-[10px] text-zinc-400 mb-1 font-bold tracking-wider">SCENARIO (§32)</div>
          <div className="font-mono text-xs text-sky-400 font-bold">{scenario.scenario_id}</div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {scenario.formation_a} vs {scenario.formation_b} in zone {scenario.ball_zone}. State:{" "}
            {scenario.game_state.replace(/_/g, " ")}.
          </p>
          <div className="text-[11px] text-amber-300/90 font-mono pt-1 border-t border-white/5">
            Pressure: {scenario.pressure_level}
          </div>
        </div>
      </aside>

      {/* CENTER — the board dominates (§37) */}
      <section className="space-y-3">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
          <TacticalPitch />
        </div>

        <div className="border border-white/10 rounded-lg p-3 bg-zinc-900/70 backdrop-blur-sm">
          <div className="font-mono text-[10px] text-zinc-400 mb-2 font-bold tracking-wider">YOUR REASONING (§11)</div>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="I am forcing the wing-back to choose between the winger and the half-space runner..."
            className="w-full h-16 bg-zinc-950/80 border border-white/10 rounded p-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-lime-400"
          />
          <button
            disabled={busy}
            onClick={handleExecuteMove}
            className="mt-2 w-full py-2 rounded bg-lime-400 text-zinc-950 font-mono text-xs font-bold hover:bg-lime-300 transition disabled:opacity-50"
          >
            {busy ? "RESOLVING REALITY ENGINE..." : "EXECUTE MOVE"}
          </button>
        </div>
      </section>

      {/* RIGHT — AI analysis panel (§25) */}
      <aside className="space-y-3">
        {result ? (
          <>
            <Card title="OPPONENT RESPONSE" tone="away">
              <p className="text-xs font-bold text-purple-300">
                {result.opponentCounterAdjustment.description.split(".")[0] || "Counter Defensive Shift"}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                {result.opponentCounterAdjustment.description}
              </p>
            </Card>

            <Card
              title="PHYSICAL VALIDATION"
              tone={result.physicsFeedback.interceptingOpponentId ? "bad" : "good"}
            >
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      result.physicsFeedback.interceptingOpponentId
                        ? "text-rose-400 font-bold"
                        : "text-emerald-400 font-bold"
                    }
                  >
                    {result.physicsFeedback.interceptingOpponentId ? "✗" : "✓"}
                  </span>
                  <span className="text-zinc-200">Passing Lane Clearance</span>
                </div>
                <div className="text-[10px] text-zinc-500 pl-4">
                  {result.physicsFeedback.interceptingOpponentId
                    ? `Intercepted by defender ${result.physicsFeedback.interceptingOpponentId}`
                    : "Clear trajectory cone to target"}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-zinc-200">Receiver Control Window</span>
                </div>
                <div className="text-[10px] text-zinc-500 pl-4">
                  Separation: +{(result.physicsFeedback.ballTransitDurationSeconds * 0.4).toFixed(2)}s advantage
                </div>
              </div>
            </Card>

            <Card title="MODEL ESTIMATE" tone="warn">
              <div className="space-y-1.5">
                <Est label="success" v={result.resolution.successProbability} />
                <Est label="turnover" v={result.resolution.turnoverRisk} />
                <Est label="xT Δ" v={result.resolution.expectedThreatDelta} signed />
                <Est label="counter risk" v={Math.min(1, result.resolution.turnoverRisk * 1.2)} />
                <div className="font-mono text-[10px] text-zinc-400 mt-1 pt-1 border-t border-white/5">
                  outcome:{" "}
                  <span className="font-bold text-amber-300">
                    {result.resolution.outcome.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            </Card>

            <Card
              title="VERDICT"
              tone={
                result.resolution.outcome === "CHANCE_CREATED" ||
                result.resolution.outcome === "CLEAN_PROGRESSION"
                  ? "good"
                  : "bad"
              }
            >
              <p className="text-xs text-zinc-300 leading-relaxed">
                {result.coachingBreakdown.tacticalConsequence}
              </p>
            </Card>

            <div className="flex gap-2">
              <button
                onClick={() => setChallengeOpen(!challengeOpen)}
                className="flex-1 py-2 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300 font-mono text-xs font-bold hover:bg-amber-400/20 transition"
              >
                CHALLENGE ANALYSIS
              </button>
              <button
                onClick={() => {
                  s.setAnimating(true);
                  setTimeout(() => s.setAnimating(false), 800);
                }}
                className="flex-1 py-2 rounded border border-white/10 bg-white/5 text-zinc-300 font-mono text-xs hover:bg-white/10 transition"
              >
                REPLAY
              </button>
            </div>

            {challengeOpen && (
              <div className="border border-amber-400/40 rounded-lg p-3 bg-zinc-900 space-y-2">
                <div className="font-mono text-[10px] text-amber-300 font-bold">SUBMIT COUNTERARGUMENT</div>
                <textarea
                  value={challengeText}
                  onChange={(e) => setChallengeText(e.target.value)}
                  placeholder="You said the LCB can step, but my striker pins him..."
                  className="w-full h-16 bg-zinc-950 border border-white/10 rounded p-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleChallengeSubmit}
                  className="w-full py-1.5 rounded bg-amber-400 text-zinc-950 font-mono text-xs font-bold hover:bg-amber-300 transition"
                >
                  SUBMIT CHALLENGE
                </button>
              </div>
            )}

            {corrections.length > 0 && (
              <Card title="CORRECTION HISTORY" tone="edge">
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {corrections.map((c) => (
                    <div key={c.id} className="text-[11px] font-mono text-zinc-400 border-b border-white/5 pb-1">
                      <span
                        className={
                          c.adjudication === "USER_WAS_CORRECT"
                            ? "text-emerald-400 font-bold"
                            : c.adjudication === "BOTH_ARE_PLAUSIBLE"
                            ? "text-amber-400 font-bold"
                            : "text-rose-400 font-bold"
                        }
                      >
                        {c.adjudication.replace(/_/g, " ")}
                      </span>
                      <div className="text-[10px] text-zinc-500 truncate">{c.status}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        ) : (
          <Card title="AI INTENTION" tone="edge">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Move players, draw a pass or a run, explain your idea, then click{" "}
              <span className="text-lime-400 font-bold">EXECUTE MOVE</span>. The Reality Engine validates; the persona counters.
            </p>
          </Card>
        )}
      </aside>
    </main>
  );
}

function Card({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "home" | "away" | "good" | "bad" | "warn" | "edge";
  children: React.ReactNode;
}) {
  const tones = {
    home: "border-sky-500/30 bg-sky-950/20",
    away: "border-purple-500/30 bg-purple-950/20",
    good: "border-emerald-500/30 bg-emerald-950/20",
    bad: "border-rose-500/30 bg-rose-950/20",
    warn: "border-amber-500/30 bg-amber-950/20",
    edge: "border-white/10 bg-zinc-900/70",
  };
  return (
    <div className={`border ${tones[tone]} rounded-lg p-3 backdrop-blur-sm space-y-1`}>
      <div className="font-mono text-[10px] text-zinc-400 mb-1 font-bold tracking-wider">{title}</div>
      {children}
    </div>
  );
}

function Est({ label, v, signed }: { label: string; v: number; signed?: boolean }) {
  const pct = Math.min(100, Math.max(0, Math.abs(v) * 100));
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className="w-24 text-zinc-400 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded overflow-hidden">
        <div
          className={`h-full ${v >= 0 ? "bg-lime-400" : "bg-rose-400"} transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-12 text-right text-zinc-200">
        {signed && v > 0 ? "+" : ""}
        {v.toFixed(2)}
      </span>
    </div>
  );
}
