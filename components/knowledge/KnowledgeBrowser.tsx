"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  GitCommit,
  Database,
  Users,
  Shield,
  Compass,
  Sparkles,
} from "lucide-react";
import {
  getAllRules,
  getAllCausalityChains,
  getAllCsvDataModels,
  subscribeMasterStore,
  type TacticalRule,
  type TacticalCausalityChain,
  type RelationalTableModel,
} from "@/lib/data/masterStore";
import { knowledgeBundle } from "@/lib/knowledge";
import Link from "next/link";

export function KnowledgeBrowser() {
  const [tab, setTab] = useState<"rules" | "chains" | "models" | "principles" | "roles" | "glossary">("rules");
  const [q, setQ] = useState("");
  const [rules, setRules] = useState<TacticalRule[]>([]);
  const [chains, setChains] = useState<TacticalCausalityChain[]>([]);
  const [csvModels, setCsvModels] = useState<Record<string, RelationalTableModel>>({});

  // Filters for Rules
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [rulePage, setRulePage] = useState<number>(1);
  const pageSize = 15;

  // Causality Chain Selection
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);

  // Relational Model Selection
  const [selectedModelName, setSelectedModelName] = useState<string>("passes.csv");

  const legacyBundle = useMemo(() => knowledgeBundle(), []);

  function reload() {
    setRules(getAllRules());
    setChains(getAllCausalityChains());
    setCsvModels(getAllCsvDataModels());
  }

  useEffect(() => {
    reload();
    return subscribeMasterStore(() => reload());
  }, []);

  const uniqueCategories = useMemo(() => {
    const s = new Set<string>();
    rules.forEach((r) => r.category && s.add(r.category));
    return Array.from(s).sort();
  }, [rules]);

  const uniqueZones = useMemo(() => {
    const s = new Set<string>();
    rules.forEach((r) => r.target && s.add(r.target));
    return Array.from(s).sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, "") || "0", 10);
      const nb = parseInt(b.replace(/\D/g, "") || "0", 10);
      return na - nb;
    });
  }, [rules]);

  const filteredRules = useMemo(() => {
    return rules.filter((r) => {
      if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
      if (zoneFilter !== "all" && r.target !== zoneFilter) return false;
      if (phaseFilter !== "all" && r.phase !== phaseFilter) return false;
      if (q.trim()) {
        const query = q.toLowerCase();
        const match =
          r.rule_id.toLowerCase().includes(query) ||
          r.actor.toLowerCase().includes(query) ||
          r.action.toLowerCase().includes(query) ||
          r.trigger.toLowerCase().includes(query) ||
          r.purpose.toLowerCase().includes(query) ||
          r.expected_result.toLowerCase().includes(query) ||
          (r.condition || "").toLowerCase().includes(query) ||
          (r.counter || "").toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    });
  }, [rules, categoryFilter, zoneFilter, phaseFilter, q]);

  const totalRulePages = Math.ceil(filteredRules.length / pageSize) || 1;
  const pagedRules = useMemo(() => {
    const start = (rulePage - 1) * pageSize;
    return filteredRules.slice(start, start + pageSize);
  }, [filteredRules, rulePage]);

  const filteredChains = useMemo(() => {
    if (!q.trim()) return chains;
    const query = q.toLowerCase();
    return chains.filter(
      (c) =>
        c.chain_id.toLowerCase().includes(query) ||
        c.mechanism.toLowerCase().includes(query) ||
        c.step_1_player_movement.toLowerCase().includes(query) ||
        c.step_7_outcome.toLowerCase().includes(query)
    );
  }, [chains, q]);

  const activeChain = useMemo(() => {
    if (!selectedChainId) return chains[0];
    return chains.find((c) => c.chain_id === selectedChainId) || chains[0];
  }, [chains, selectedChainId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-lime-500/10 via-sky-500/10 to-transparent p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/20 px-2.5 py-0.5 text-xs font-semibold text-lime-400">
              <BookOpen className="h-3.5 w-3.5" /> 1,240+ Tactical Rules
            </span>
            <span className="text-xs text-zinc-400">Master Grounded Knowledge Matrix</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Tactical Knowledge Matrix & Causality Chains
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-zinc-400">
            Machine-readable rule engine: 1,240 rules, 300 7-step causality chains, 14 relational data models,
            and comprehensive principles of play covering positional play, pressing triggers, and spatial manipulation.
          </p>
        </div>
        <Link
          href="/datasets"
          className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-black hover:bg-lime-300 transition"
        >
          <Sparkles className="h-4 w-4" /> Contribute New Rule
        </Link>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: "rules", label: `Rules Database (${rules.length})`, icon: BookOpen },
          { id: "chains", label: `Causality Chains (${chains.length})`, icon: GitCommit },
          { id: "models", label: `Relational Schemas (14)`, icon: Database },
          { id: "principles", label: `Principles (${legacyBundle.principles.length})`, icon: Shield },
          { id: "roles", label: `Roles & Formations`, icon: Users },
          { id: "glossary", label: `Tactical Glossary`, icon: Compass },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                active ? "bg-lime-400 text-black shadow-lg shadow-lime-400/20" : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 1. RULES DATABASE (1,240 Rules) */}
      {tab === "rules" && (
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setRulePage(1);
                  }}
                  placeholder="Filter rules by actor, trigger, action..."
                  className="w-full rounded-md border border-white/10 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setRulePage(1);
                  }}
                  className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="all">All Categories ({rules.length})</option>
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={zoneFilter}
                  onChange={(e) => {
                    setZoneFilter(e.target.value);
                    setRulePage(1);
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

              <div>
                <select
                  value={phaseFilter}
                  onChange={(e) => {
                    setPhaseFilter(e.target.value);
                    setRulePage(1);
                  }}
                  className="w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="all">All Phases</option>
                  <option value="attacking_organisation">Attacking Organisation</option>
                  <option value="progression">Progression</option>
                  <option value="chance_creation">Chance Creation</option>
                  <option value="defensive_transition">Defensive Transition</option>
                  <option value="defensive_organisation">Defensive Organisation</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-white/5 pt-2">
              <span>Showing {filteredRules.length} matching rules</span>
              {(categoryFilter !== "all" || zoneFilter !== "all" || phaseFilter !== "all" || q) && (
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setZoneFilter("all");
                    setPhaseFilter("all");
                    setQ("");
                    setRulePage(1);
                  }}
                  className="text-lime-400 hover:underline text-[11px]"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {pagedRules.map((rule) => (
              <div
                key={rule.rule_id}
                className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-2 transition hover:border-lime-400/40 hover:bg-zinc-900/90"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-lime-400">{rule.rule_id}</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                      {rule.category.replace(/_/g, " ")}
                    </span>
                    <span className="rounded bg-lime-400/10 border border-lime-400/30 px-2 py-0.5 text-[10px] font-mono font-bold text-lime-300">
                      {rule.target}
                    </span>
                    {rule.isCustom && (
                      <span className="rounded bg-sky-400/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                        USER CUSTOM
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Phase: {rule.phase.replace(/_/g, " ")} · Confidence: {rule.confidence}
                  </span>
                </div>

                <div className="text-sm font-semibold text-white">
                  <span className="text-lime-300 capitalize">{rule.actor}:</span> {rule.action.replace(/_/g, " ")}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">{rule.purpose}</p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 pt-2 border-t border-white/5 text-[11px]">
                  <div className="rounded bg-black/40 p-2">
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Trigger</span>
                    <span className="text-zinc-300">{rule.trigger.replace(/_/g, " ")}</span>
                  </div>
                  <div className="rounded bg-black/40 p-2">
                    <span className="text-emerald-400/80 block text-[10px] uppercase font-bold">Expected Result</span>
                    <span className="text-zinc-300">{rule.expected_result}</span>
                  </div>
                  <div className="rounded bg-black/40 p-2">
                    <span className="text-rose-400/80 block text-[10px] uppercase font-bold">Risk / Counter</span>
                    <span className="text-zinc-400">{rule.risk || rule.counter}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalRulePages > 1 && (
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-zinc-400">
              <div>
                Page {rulePage} of {totalRulePages}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={rulePage <= 1}
                  onClick={() => setRulePage((p) => Math.max(1, p - 1))}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 disabled:opacity-30 hover:bg-white/10"
                >
                  Previous
                </button>
                <button
                  disabled={rulePage >= totalRulePages}
                  onClick={() => setRulePage((p) => Math.min(totalRulePages, p + 1))}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 disabled:opacity-30 hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CAUSALITY CHAINS (300 7-Step Chains) */}
      {tab === "chains" && (
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 max-h-[750px] overflow-y-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Select Causality Chain ({filteredChains.length})
            </div>
            <div className="space-y-1.5">
              {filteredChains.slice(0, 50).map((c) => {
                const isSelected = (selectedChainId || chains[0]?.chain_id) === c.chain_id;
                return (
                  <button
                    key={c.chain_id}
                    onClick={() => setSelectedChainId(c.chain_id)}
                    className={`w-full text-left rounded-lg p-2.5 text-xs transition ${
                      isSelected
                        ? "border border-lime-400/40 bg-lime-400/20 text-lime-300 font-semibold"
                        : "border border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span>{c.chain_id}</span>
                      <span className="text-zinc-500">{c.context_formation}</span>
                    </div>
                    <div className="mt-1 font-sans text-xs text-white capitalize line-clamp-1">
                      {c.mechanism.replace(/_/g, " ")}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chain Visualizer */}
          {activeChain && (
            <div className="space-y-4 rounded-xl border border-white/10 bg-zinc-900/60 p-6">
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-lime-400">{activeChain.chain_id}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                    Formation: {activeChain.context_formation}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-white capitalize">
                  {activeChain.mechanism.replace(/_/g, " ")}
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  7-step causality sequence demonstrating progressive spatial manipulation from movement to realized outcome.
                </p>
              </div>

              {/* 7 Steps Visualizer */}
              <div className="space-y-3 pt-2">
                {[
                  { step: "Step 1: Player Movement", desc: activeChain.step_1_player_movement, color: "border-sky-400 bg-sky-400/10 text-sky-300" },
                  { step: "Step 2: Spatial Distortion", desc: activeChain.step_2_space, color: "border-amber-400 bg-amber-400/10 text-amber-300" },
                  { step: "Step 3: Opponent Response", desc: activeChain.step_3_opponent_response, color: "border-rose-400 bg-rose-400/10 text-rose-300" },
                  { step: "Step 4: Team Adaptation", desc: activeChain.step_4_team_adaptation, color: "border-emerald-400 bg-emerald-400/10 text-emerald-300" },
                  { step: "Step 5: Second Opponent Response", desc: activeChain.step_5_second_opponent_response, color: "border-rose-400 bg-rose-400/10 text-rose-300" },
                  { step: "Step 6: Counter / Follow-up", desc: activeChain.step_6_counter, color: "border-purple-400 bg-purple-400/10 text-purple-300" },
                  { step: "Step 7: Realized Outcome", desc: activeChain.step_7_outcome, color: "border-lime-400 bg-lime-400/10 text-lime-300 font-bold" },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-mono font-bold text-white">
                        {idx + 1}
                      </div>
                      {idx < 6 && <div className="h-6 w-0.5 bg-white/10 my-1" />}
                    </div>
                    <div className={`flex-1 rounded-lg border p-3 text-xs ${s.color}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                        {s.step}
                      </div>
                      <div className="text-zinc-200">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. RELATIONAL DATA SCHEMAS (14 Tables) */}
      {tab === "models" && (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-1 rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              14 Relational Data Models
            </div>
            {Object.keys(csvModels).map((fileName) => {
              const model = csvModels[fileName];
              const isSelected = selectedModelName === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setSelectedModelName(fileName)}
                  className={`w-full text-left rounded-lg p-2.5 text-xs transition ${
                    isSelected
                      ? "border border-lime-400/40 bg-lime-400/20 text-lime-300 font-bold"
                      : "border border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="font-mono text-[11px] text-white">{model.tableName}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{fileName}</div>
                </button>
              );
            })}
          </div>

          {/* Model Schema Preview */}
          {csvModels[selectedModelName] && (
            <div className="space-y-4 rounded-xl border border-white/10 bg-zinc-900/60 p-6">
              <div>
                <span className="font-mono text-xs text-lime-400">DATA MODEL TABLE</span>
                <h2 className="text-xl font-bold text-white capitalize">
                  {csvModels[selectedModelName].tableName}
                </h2>
                <p className="mt-1 text-xs text-zinc-400">
                  {csvModels[selectedModelName].description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Table Columns ({csvModels[selectedModelName].columns.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {csvModels[selectedModelName].columns.map((col) => (
                    <span
                      key={col}
                      className="rounded bg-black/60 border border-white/10 px-2.5 py-1 text-xs font-mono text-zinc-300"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {csvModels[selectedModelName].sampleRows.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Sample Data Records
                  </h4>
                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="border-b border-white/10 bg-black/60 text-[10px] uppercase text-zinc-400">
                        <tr>
                          {csvModels[selectedModelName].columns.map((col) => (
                            <th key={col} className="p-2">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-zinc-950">
                        {csvModels[selectedModelName].sampleRows.map((row, i) => (
                          <tr key={i} className="hover:bg-white/5">
                            {row.map((cell, j) => (
                              <td key={j} className="p-2 text-zinc-300 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. PRINCIPLES OF PLAY */}
      {tab === "principles" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {legacyBundle.principles.map((pr) => (
              <div key={pr.id} className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-lime-400">{pr.id}</span>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">{pr.category}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{pr.principle}</h3>
                <p className="text-xs text-zinc-300">{pr.description}</p>
                <div className="pt-2 border-t border-white/5 text-[11px] text-zinc-400">
                  <span className="text-zinc-500">Condition:</span> {pr.condition}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ROLES & FORMATIONS */}
      {tab === "roles" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {legacyBundle.roles.map((rl) => (
              <div key={rl.id} className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{rl.id}</h3>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-zinc-300 font-bold">
                    {rl.group}
                  </span>
                </div>
                <p className="text-xs text-zinc-300">{rl.primary}</p>
                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-zinc-400">
                  <div>
                    <span className="text-zinc-500">Defensive:</span> {rl.defensive}
                  </div>
                  <div>
                    <span className="text-zinc-500">Zones:</span> {rl.zones}
                  </div>
                  <div>
                    <span className="text-emerald-400/80">Strengths:</span> {rl.strengths}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. GLOSSARY */}
      {tab === "glossary" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(legacyBundle.glossary).map(([term, definition]) => (
            <div key={term} className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 space-y-1">
              <h3 className="text-sm font-bold text-lime-400 capitalize">{term}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
