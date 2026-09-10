"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PitchBoard } from "@/components/PitchBoard";
import { getScenario } from "@/lib/scenarios";
import { useBattleStore } from "@/stores/battleStore";
import type { PersonaId } from "@/lib/types";

const PERSONAS: { id: PersonaId; label: string }[] = [
  { id: "purist", label: "PURIST" }, { id: "anvil", label: "ANVIL" },
  { id: "analyst", label: "ANALYST" }, { id: "coach", label: "COACH" },
];

export default function BattlePage() {
  const { id } = useParams<{ id: string }>();
  const s = useBattleStore();
  const [explanation, setExplanation] = useState("");
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [challengeText, setChallengeText] = useState("");
  const scenario = getScenario(id);

  useEffect(() => { s.loadScenario(id); }, [id]); // eslint-disable-line

  const result = s.lastResult;

  return (
    <main className="max-w-[1400px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-4">
      {/* LEFT — tactical controls */}
      <aside className="space-y-3">
        <div className="border border-lab-edge rounded-lg p-3 bg-lab-panel">
          <div className="font-mono text-[10px] text-lab-dim mb-2">OPPONENT PERSONA</div>
          {PERSONAS.map((p) => (
            <button key={p.id} onClick={() => s.setPersona(p.id)}
              className={`block w-full text-left font-mono text-xs px-2 py-1 rounded mb-1 ${s.persona === p.id ? "bg-lab-home/20 text-lab-home" : "text-lab-dim hover:text-lab-ink"}`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="border border-lab-edge rounded-lg p-3 bg-lab-panel">
          <div className="font-mono text-[10px] text-lab-dim mb-2">SCENARIO</div>
          <p className="text-xs text-lab-ink/80 leading-relaxed">{scenario.prompt}</p>
        </div>
      </aside>

      {/* CENTER — the board dominates (§37) */}
      <section>
        <PitchBoard />
        <div className="mt-3 border border-lab-edge rounded-lg p-3 bg-lab-panel">
          <div className="font-mono text-[10px] text-lab-dim mb-2">YOUR REASONING (§11)</div>
          <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)}
            placeholder="I am forcing the wing-back to choose between the winger and the half-space runner..."
            className="w-full h-16 bg-lab-bg border border-lab-edge rounded p-2 text-sm text-lab-ink placeholder:text-lab-dim/60" />
          <button
            onClick={() => s.executeTurn({
              ballCarrierId: s.battle?.ball.carrierId ?? "",
              pass: s.battle?.drawnPasses[0],
              pressing: [], tempo: "normal", explanation,
            })}
            className="mt-2 w-full py-2 rounded bg-lab-home text-lab-bg font-mono text-sm font-bold hover:opacity-90">
            EXECUTE MOVE
          </button>
        </div>
      </section>

      {/* RIGHT — AI analysis panel (§25) */}
      <aside className="space-y-3">
        {result ? (
          <>
            <Card title="OPPONENT RESPONSE" tone="away">
              <p className="text-xs">{result.counter.moveName}</p>
              <p className="text-[11px] text-lab-dim mt-1">{result.counter.narration}</p>
            </Card>
            <Card title="PHYSICAL VALIDATION" tone={result.physical.valid ? "good" : "bad"}>
              {result.physical.checks.map((c) => (
                <div key={c.name} className="text-[11px] font-mono">
                  <span className={c.pass ? "text-lab-good" : "text-lab-bad"}>{c.pass ? "✓" : "✗"}</span>{" "}
                  <span className="text-lab-ink/80">{c.name}</span>
                  <div className="text-lab-dim pl-4">{c.detail}</div>
                </div>
              ))}
            </Card>
            <Card title="MODEL ESTIMATE" tone="warn">
              <Est label="success" v={result.successProbability} />
              <Est label="turnover" v={result.turnoverProbability} />
              <Est label="xT Δ" v={result.xTDelta} signed />
              <Est label="counter risk" v={result.counterattackRisk} />
              <div className="font-mono text-[10px] text-lab-dim mt-1">outcome: {result.outcome}</div>
            </Card>
            <Card title="VERDICT" tone={result.physical.valid ? "good" : "bad"}>
              <p className="text-xs whitespace-pre-wrap">{s.narration}</p>
            </Card>
            <div className="flex gap-2">
              <button onClick={() => setChallengeOpen(!challengeOpen)}
                className="flex-1 py-2 rounded border border-lab-warn text-lab-warn font-mono text-xs">
                CHALLENGE ANALYSIS
              </button>
              <button onClick={() => s.setReplayPlaying(true)}
                className="flex-1 py-2 rounded border border-lab-edge text-lab-dim font-mono text-xs">
                REPLAY
              </button>
            </div>
            {challengeOpen && (
              <div className="border border-lab-warn/40 rounded-lg p-3 bg-lab-panel">
                <textarea value={challengeText} onChange={(e) => setChallengeText(e.target.value)}
                  placeholder="You said the LCB can step, but my striker pins him..."
                  className="w-full h-16 bg-lab-bg border border-lab-edge rounded p-2 text-xs" />
                <button
                  onClick={async () => { await s.challenge(challengeText); setChallengeOpen(false); setChallengeText(""); }}
                  className="mt-2 w-full py-1.5 rounded bg-lab-warn text-lab-bg font-mono text-xs font-bold">
                  SUBMIT CHALLENGE
                </button>
              </div>
            )}
            {s.corrections.length > 0 && (
              <Card title="CORRECTION HISTORY" tone="edge">
                {s.corrections.map((c) => (
                  <div key={c.id} className="text-[11px] font-mono text-lab-dim">
                    <span className={c.adjudication === "USER_WAS_CORRECT" ? "text-lab-good" : "text-lab-dim"}>
                      {c.adjudication}
                    </span>{" · "}{c.status}
                  </div>
                ))}
              </Card>
            )}
          </>
        ) : (
          <Card title="AI INTENTION" tone="edge">
            <p className="text-xs text-lab-dim">Move players, draw a pass or a run, explain your idea, then EXECUTE MOVE.
            The Reality Engine validates; the persona counters.</p>
          </Card>
        )}
      </aside>
    </main>
  );
}

function Card({ title, tone, children }: { title: string; tone: "home" | "away" | "good" | "bad" | "warn" | "edge"; children: React.ReactNode }) {
  const tones = {
    home: "border-lab-home/40", away: "border-lab-away/40", good: "border-lab-good/40",
    bad: "border-lab-bad/40", warn: "border-lab-warn/40", edge: "border-lab-edge",
  };
  return (
    <div className={`border ${tones[tone]} rounded-lg p-3 bg-lab-panel`}>
      <div className="font-mono text-[10px] text-lab-dim mb-2">{title}</div>
      {children}
    </div>
  );
}

function Est({ label, v, signed }: { label: string; v: number; signed?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <span className="w-24 text-lab-dim">{label}</span>
      <div className="flex-1 h-1.5 bg-lab-edge rounded overflow-hidden">
        <div className={`h-full ${v >= 0 ? "bg-lab-home" : "bg-lab-bad"}`}
          style={{ width: `${Math.min(100, Math.abs(v) * 100)}%` }} />
      </div>
      <span className="w-12 text-right text-lab-ink/80">
        {signed && v > 0 ? "+" : ""}{v.toFixed(2)}
      </span>
    </div>
  );
}
