"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  Search,
  ExternalLink,
  PlusCircle,
} from "lucide-react";
import { getAllScenarios, subscribeMasterStore, type BattleScenario } from "@/lib/data/masterStore";
import { useBattleStore } from "@/store/battleStore";
import Link from "next/link";

export function ScenarioBrowser() {
  const router = useRouter();
  const battleStore = useBattleStore();
  const [scenarios, setScenarios] = useState<BattleScenario[]>([]);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState<string>("all");
  const [filterZone, setFilterZone] = useState<string>("all");
  const [filterPressure, setFilterPressure] = useState<string>("all");
  const [onlyCustom, setOnlyCustom] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 18;

  function reload() {
    setScenarios(getAllScenarios());
  }

  useEffect(() => {
    reload();
    return subscribeMasterStore(() => reload());
  }, []);

  const uniqueGameStates = useMemo(() => {
    const s = new Set<string>();
    scenarios.forEach((sc) => sc.game_state && s.add(sc.game_state));
    return Array.from(s).sort();
  }, [scenarios]);

  const uniqueZones = useMemo(() => {
    const s = new Set<string>();
    scenarios.forEach((sc) => sc.ball_zone && s.add(sc.ball_zone));
    return Array.from(s).sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, "") || "0", 10);
      const nb = parseInt(b.replace(/\D/g, "") || "0", 10);
      return na - nb;
    });
  }, [scenarios]);

  const filtered = useMemo(() => {
    return scenarios.filter((sc) => {
      if (onlyCustom && !sc.isCustom) return false;
      if (filterState !== "all" && sc.game_state !== filterState) return false;
      if (filterZone !== "all" && sc.ball_zone !== filterZone) return false;
      if (filterPressure !== "all" && sc.pressure_level !== filterPressure) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          sc.scenario_id.toLowerCase().includes(q) ||
          sc.game_state.toLowerCase().includes(q) ||
          sc.formation_a.toLowerCase().includes(q) ||
          sc.formation_b.toLowerCase().includes(q) ||
          sc.ball_zone.toLowerCase().includes(q) ||
          sc.best_action_estimate.toLowerCase().includes(q) ||
          (sc.style_a || "").toLowerCase().includes(q) ||
          (sc.style_b || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [scenarios, search, filterState, filterZone, filterPressure, onlyCustom]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  function loadIntoBattle(sc: BattleScenario) {
    battleStore.loadCustomScenarioState({
      name: `${sc.formation_a} vs ${sc.formation_b} (${sc.game_state})`,
      formationHome: sc.formation_a,
      formationAway: sc.formation_b,
      ballZone: sc.ball_zone,
      dilemmaPrompt: `State: ${sc.game_state}. Pressure: ${sc.pressure_level}. Space Value: ${sc.space_value_estimate}. Tactical challenge: execute progression or penetration from ${sc.ball_zone} against ${sc.opponent_shape_b || sc.formation_b}.`,
      bestAction: sc.best_action_estimate,
    });
    router.push("/battle");
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-lime-500/5 to-transparent p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-400/20 px-2.5 py-0.5 text-xs font-semibold text-sky-400">
              <Layers className="h-3.5 w-3.5" /> 300+ Scenarios
            </span>
            <span className="text-xs text-zinc-400">Tactical Situations & Matchup Bank</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Tactical Scenarios Lab
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-zinc-400">
            Browse, inspect, and play 300 pre-generated tactical scenarios across all game states, formations, and pitch zones.
            Each scenario defines initial space value, pressure intensity, and opponent defensive reactions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/datasets"
            className="flex items-center gap-1.5 rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-black hover:bg-lime-300 transition"
          >
            <PlusCircle className="h-4 w-4" /> Add Custom Scenario
          </Link>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by ID, formation, game state, zone..."
              className="w-full rounded-md border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500"
            />
          </div>

          {/* Game State */}
          <div>
            <select
              value={filterState}
              onChange={(e) => {
                setFilterState(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white capitalize"
            >
              <option value="all">All Game States ({scenarios.length})</option>
              {uniqueGameStates.map((st) => (
                <option key={st} value={st}>
                  {st.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Ball Zone */}
          <div>
            <select
              value={filterZone}
              onChange={(e) => {
                setFilterZone(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
            >
              <option value="all">All Zones (Z1–Z30)</option>
              {uniqueZones.map((z) => (
                <option key={z} value={z}>
                  Zone {z}
                </option>
              ))}
            </select>
          </div>

          {/* Pressure */}
          <div>
            <select
              value={filterPressure}
              onChange={(e) => {
                setFilterPressure(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white capitalize"
            >
              <option value="all">All Pressure Levels</option>
              <option value="low">Low Pressure</option>
              <option value="medium">Medium Pressure</option>
              <option value="high">High Pressure</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span>Showing {filtered.length} of {scenarios.length} scenarios</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={onlyCustom}
                onChange={(e) => {
                  setOnlyCustom(e.target.checked);
                  setPage(1);
                }}
                className="rounded border-zinc-700 bg-zinc-900 text-lime-400"
              />
              Only User-Created Scenarios
            </label>
          </div>

          {(search || filterState !== "all" || filterZone !== "all" || filterPressure !== "all" || onlyCustom) && (
            <button
              onClick={() => {
                setSearch("");
                setFilterState("all");
                setFilterZone("all");
                setFilterPressure("all");
                setOnlyCustom(false);
                setPage(1);
              }}
              className="text-lime-400 hover:underline text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Scenarios Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 p-12 text-center">
          <Layers className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
          <p className="text-sm font-semibold text-zinc-300">No matching scenarios found</p>
          <p className="text-xs text-zinc-500 mt-1">Try adjusting your search terms or zone filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((sc) => {
            const pressureColor =
              sc.pressure_level === "high"
                ? "text-rose-400 border-rose-500/30 bg-rose-500/10"
                : sc.pressure_level === "medium"
                ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";

            return (
              <div
                key={sc.scenario_id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition hover:border-sky-400/40 hover:bg-zinc-900/90"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400">
                      {sc.scenario_id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {sc.isCustom && (
                        <span className="rounded bg-lime-400/20 px-2 py-0.5 text-[10px] font-bold text-lime-300">
                          CUSTOM
                        </span>
                      )}
                      <span className={`rounded border px-2 py-0.5 text-[10px] uppercase font-semibold ${pressureColor}`}>
                        {sc.pressure_level} press
                      </span>
                    </div>
                  </div>

                  {/* Formations & Matchup */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="rounded bg-sky-500/20 px-2 py-0.5 text-sky-300 font-mono text-xs">
                      {sc.formation_a}
                    </span>
                    <span className="text-xs text-zinc-500">vs</span>
                    <span className="rounded bg-rose-500/20 px-2 py-0.5 text-rose-300 font-mono text-xs">
                      {sc.formation_b}
                    </span>
                    <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-xs text-zinc-300 font-mono">
                      {sc.ball_zone}
                    </span>
                  </div>

                  {/* Game State Title */}
                  <div className="text-xs font-medium text-zinc-300 capitalize">
                    {sc.game_state.replace(/_/g, " ")}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/5 bg-black/40 p-2 text-[11px]">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Space Value</span>
                      <span className="font-mono font-semibold text-lime-400">
                        {(sc.space_value_estimate ?? 0).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Best Action</span>
                      <span className="font-mono font-semibold text-sky-400 capitalize">
                        {sc.best_action_estimate}
                      </span>
                    </div>
                  </div>

                  {/* Actions Pills */}
                  {sc.available_actions && sc.available_actions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {sc.available_actions.slice(0, 4).map((act) => (
                        <span key={act} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                          {act}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Opponent Expected Reaction */}
                  <div className="text-[11px] text-zinc-400 leading-snug">
                    <span className="text-zinc-500 font-medium">Opponent response:</span>{" "}
                    <span className="capitalize">{sc.opponent_response_estimate?.replace(/_/g, " ")}</span>
                  </div>
                </div>

                {/* Bottom Launch Button */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => loadIntoBattle(sc)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-sky-400 py-2 text-xs font-bold text-black transition hover:bg-sky-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Play on 2D Board
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-zinc-400">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 disabled:opacity-30 hover:bg-white/10"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 disabled:opacity-30 hover:bg-white/10"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
