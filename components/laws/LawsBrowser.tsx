"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Scale,
  Sparkles,
} from "lucide-react";
import {
  getLawsList,
  get2026Innovations,
  evaluateOffsideLaw11,
  type LawOfGame,
} from "@/lib/data/lawsOfTheGame2026";

export function LawsBrowser() {
  const [tab, setTab] = useState<"laws" | "innovations" | "offside_tool">("laws");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedLaw, setSelectedLaw] = useState<LawOfGame | null>(null);

  const laws = useMemo(() => getLawsList(), []);
  const innovations = useMemo(() => get2026Innovations(), []);

  // Offside Tool Interactive State
  const [attackerX, setAttackerX] = useState<number>(75);
  const [ballX, setBallX] = useState<number>(70);
  const [defenderX, setDefenderX] = useState<number>(72);
  const [restartType, setRestartType] = useState<"normal" | "goal_kick" | "throw_in" | "corner_kick">("normal");
  const [deliberatePlay, setDeliberatePlay] = useState<boolean>(false);

  const offsideVerdict = useMemo(() => {
    return evaluateOffsideLaw11({
      attackerX,
      ballX,
      secondLastDefenderX: defenderX,
      inOwnHalf: attackerX <= 52.5,
      restartType,
      isDeliberatePlayByOpponent: deliberatePlay,
      isInvolvedInActivePlay: true,
    });
  }, [attackerX, ballX, defenderX, restartType, deliberatePlay]);

  const filteredLaws = useMemo(() => {
    return laws.filter((l) => {
      if (categoryFilter !== "all" && l.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const m =
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.tacticalImplication.toLowerCase().includes(q) ||
          `law ${l.lawNumber}`.includes(q);
        if (!m) return false;
      }
      return true;
    });
  }, [laws, search, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-sky-500/5 to-transparent p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <Scale className="h-3.5 w-3.5" /> Official IFAB 2026/27
            </span>
            <span className="text-xs text-zinc-400">International Football Association Board</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Laws of the Game (2026/27 Edition)
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-zinc-400">
            Authoritative rules grounding the simulation engine: All 17 Laws analyzed for tactical mechanics, spatial manipulation,
            and the new 2026/27 protocols (sin-bins, only-the-captain, countdown restarts, and concussion substitutions).
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: "laws", label: "All 17 Laws & Tactical Implications", icon: BookOpen },
          { id: "innovations", label: "2026/27 Rule Innovations & Protocols", icon: Sparkles },
          { id: "offside_tool", label: "Law 11 Offside Interactive Simulator", icon: Scale },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                active ? "bg-emerald-400 text-black shadow-lg shadow-emerald-400/20" : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: All 17 Laws */}
      {tab === "laws" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Law by title, rule number, or tactical effect..."
                className="w-full rounded-md border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
            >
              <option value="all">All Categories ({laws.length})</option>
              <option value="core_rules">Core Rules (Offside, Fouls)</option>
              <option value="set_pieces">Set Pieces (Free Kicks, Penalties, Corners, Goal Kicks)</option>
              <option value="pitch">Field & Dimensions</option>
              <option value="equipment">Ball & Equipment</option>
              <option value="personnel">Players & Substitutions</option>
              <option value="officiating">Referee & Officials</option>
              <option value="match_flow">Match Duration & Restarts</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLaws.map((law) => (
              <div
                key={law.lawNumber}
                onClick={() => setSelectedLaw(law)}
                className="cursor-pointer rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-3 transition hover:border-emerald-400/50 hover:bg-zinc-900/90"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    LAW {law.lawNumber}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase font-semibold text-zinc-300">
                    {law.category.replace("_", " ")}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{law.title}</h3>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{law.summary}</p>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-zinc-300">
                  <span className="font-semibold text-emerald-400">Tactical Impact:</span>{" "}
                  <span className="line-clamp-2">{law.tacticalImplication}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-500">
                  <span>2026/27 Updated</span>
                  <span className="text-emerald-400 font-medium">View Full Law Details →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Drawer for Selected Law */}
          {selectedLaw && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-zinc-950 p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      IFAB 2026/27 · LAW {selectedLaw.lawNumber}
                    </span>
                    <h2 className="text-xl font-bold text-white">{selectedLaw.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedLaw(null)}
                    className="rounded-lg bg-white/10 px-3 py-1 text-xs text-zinc-300 hover:bg-white/20"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Summary</h4>
                    <p className="text-zinc-200">{selectedLaw.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Key Provisions & Official Rules
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-300">
                      {selectedLaw.keyProvisions.map((k, i) => (
                        <li key={i}>{k}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                      Tactical Implication & Strategic Optimization
                    </h4>
                    <p className="text-emerald-100">{selectedLaw.tacticalImplication}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      2026/27 Circular Updates
                    </h4>
                    <p className="text-zinc-300">{selectedLaw.year2026Changes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: 2026/27 Innovations */}
      {tab === "innovations" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {innovations.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                    2026/27 PROTOCOL
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{inv.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{inv.description}</p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-zinc-200">
                <span className="font-semibold text-emerald-400">Tactical Impact:</span>{" "}
                {inv.tacticalImpact}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Interactive Law 11 Offside Simulator */}
      {tab === "offside_tool" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5 rounded-xl border border-white/10 bg-black/40 p-6">
            <div>
              <h2 className="text-base font-bold text-white">Law 11 Offside Evaluation Simulator</h2>
              <p className="text-xs text-zinc-400">
                Simulate exact pitch coordinates at the release of the pass to test IFAB Law 11 conditions.
              </p>
            </div>

            {/* Pitch Diagram Visualizer */}
            <div className="relative h-28 w-full rounded-xl border border-white/10 bg-[#164e29] overflow-hidden p-2">
              {/* Halfway line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40" />
              {/* Attacking Direction */}
              <div className="absolute top-2 left-2 text-[10px] text-white/60 font-mono">
                Attacking → (Own Goal 0m, Opponent Goal 105m)
              </div>

              {/* Defender Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-rose-400 shadow-sm"
                style={{ left: `${(defenderX / 105) * 100}%` }}
              >
                <span className="absolute -bottom-1 -left-8 text-[9px] font-mono bg-rose-950/80 border border-rose-400 text-rose-300 px-1 rounded">
                  2nd-Last: {defenderX}m
                </span>
              </div>

              {/* Ball Position */}
              <div
                className="absolute top-8 h-3.5 w-3.5 rounded-full bg-white border border-black shadow"
                style={{ left: `calc(${(ballX / 105) * 100}% - 7px)` }}
                title={`Ball: ${ballX}m`}
              />

              {/* Attacker Position */}
              <div
                className={`absolute top-14 h-4 w-4 rounded-full border-2 border-white font-bold flex items-center justify-center text-[8px] text-black ${
                  offsideVerdict.isOffside ? "bg-rose-400" : "bg-emerald-400"
                }`}
                style={{ left: `calc(${(attackerX / 105) * 100}% - 8px)` }}
                title={`Attacker: ${attackerX}m`}
              >
                A
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Attacker X (Meters from Own Goal):</span>
                  <span className="font-mono font-bold text-white">{attackerX}m</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="104"
                  value={attackerX}
                  onChange={(e) => setAttackerX(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Ball X (At Kick Release Moment):</span>
                  <span className="font-mono font-bold text-white">{ballX}m</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={ballX}
                  onChange={(e) => setBallX(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Second-Last Defender X (Offside Line):</span>
                  <span className="font-mono font-bold text-rose-400">{defenderX}m</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="104"
                  value={defenderX}
                  onChange={(e) => setDefenderX(Number(e.target.value))}
                  className="w-full accent-rose-400"
                />
              </div>
            </div>

            {/* Exceptions & Modifiers */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t border-white/5">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Restart Origin</label>
                <select
                  value={restartType}
                  onChange={(e) => setRestartType(e.target.value as typeof restartType)}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="normal">Normal Open Play Pass</option>
                  <option value="goal_kick">Goal Kick (Law 11.3 Exemption)</option>
                  <option value="throw_in">Throw-in (Law 11.3 Exemption)</option>
                  <option value="corner_kick">Corner Kick (Law 11.3 Exemption)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={deliberatePlay}
                    onChange={(e) => setDeliberatePlay(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-emerald-400"
                  />
                  <span>Defender played the ball deliberately (Law 11.2)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="space-y-4">
            <div
              className={`rounded-2xl border p-5 space-y-3 ${
                offsideVerdict.isOffside
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Law 11 Simulation Verdict
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                    offsideVerdict.isOffside ? "bg-rose-500 text-black" : "bg-emerald-400 text-black"
                  }`}
                >
                  {offsideVerdict.verdict}
                </span>
              </div>

              <div className="text-xl font-bold">
                {offsideVerdict.isOffside ? "OFFSIDE OFFENCE" : "LEGAL / ONSIDE"}
              </div>

              <p className="text-xs leading-relaxed">{offsideVerdict.reasoning}</p>

              <div className="pt-2 border-t border-white/10 font-mono text-[11px] text-zinc-400">
                Citation: {offsideVerdict.lawCitation}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-xs text-zinc-300">
              <h4 className="font-semibold text-white">Tactical Application in Battle Board</h4>
              <p>
                In the 2D pitch simulator, every forward pass calculates the receiver&apos;s X position relative to the away backline at T+0s (release). Passes behind the line with through balls trigger Law 11 validation automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
