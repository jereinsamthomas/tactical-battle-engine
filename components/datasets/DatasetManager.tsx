"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Database,
  Layers,
} from "lucide-react";
import {
  getAllRules,
  getAllScenarios,
  getCustomRules,
  getCustomScenarios,
  addCustomRule,
  addCustomScenario,
  deleteCustomItem,
  importDataset,
  exportDataset,
  resetCustomDatasets,
  subscribeMasterStore,
  type TacticalRule,
  type BattleScenario,
} from "@/lib/data/masterStore";
import { useBattleStore } from "@/store/battleStore";
import { useRouter } from "next/navigation";

export function DatasetManager() {
  const router = useRouter();
  const battleStore = useBattleStore();
  const [tab, setTab] = useState<"rule" | "scenario" | "import" | "browse">("rule");

  const [stats, setStats] = useState({
    totalRules: 0,
    customRules: 0,
    totalScenarios: 0,
    customScenarios: 0,
  });

  const [customRules, setCustomRules] = useState<TacticalRule[]>([]);
  const [customScenarios, setCustomScenarios] = useState<BattleScenario[]>([]);

  function reloadData() {
    const allR = getAllRules();
    const allS = getAllScenarios();
    const cR = getCustomRules();
    const cS = getCustomScenarios();
    setStats({
      totalRules: allR.length,
      customRules: cR.length,
      totalScenarios: allS.length,
      customScenarios: cS.length,
    });
    setCustomRules(cR);
    setCustomScenarios(cS);
  }

  useEffect(() => {
    reloadData();
    return subscribeMasterStore(() => reloadData());
  }, []);

  // Form State: Rule
  const [ruleForm, setRuleForm] = useState({
    category: "MOVEMENT",
    phase: "attacking_organisation",
    trigger: "ball_in_half_space_overload",
    condition: "opposing_pivot_dragged_wide",
    actor: "false nine",
    action: "drop_into_zone_14_to_receive_between_lines",
    target: "Z18",
    purpose: "create numerical superiority in Zone 14 against a 4-man block",
    expected_result: "unmarked reception with body orientation facing goal",
    risk: "centre-back steps out aggressively to intercept",
    counter: "winger makes blindside vertical run into vacated centre-back space",
    confidence: "high",
  });
  const [ruleNotice, setRuleNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Form State: Scenario
  const [scenForm, setScenForm] = useState({
    game_state: "break_low_block",
    formation_a: "4-3-3",
    formation_b: "5-4-1",
    style_a: "positional",
    style_b: "low_block",
    ball_zone: "Z14",
    team_shape_a: "3-2-5_possession",
    opponent_shape_b: "5-4-1_deep_compact",
    pressure_level: "medium",
    space_value_estimate: 0.28,
    numerical_state: "overload_wide_right",
    available_actions: "pass,dribble,switch,cutback",
    best_action_estimate: "cutback",
    opponent_response_estimate: "collapse_six_yard_box",
    counter_estimate: "recycle_to_edge_of_box",
    outcome_estimate: "chance_created",
  });
  const [scenNotice, setScenNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Import State
  const [importText, setImportText] = useState("");
  const [importFormat, setImportFormat] = useState<"json" | "csv">("json");
  const [importTarget, setImportTarget] = useState<"rules" | "scenarios">("rules");
  const [importNotice, setImportNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function handleAddRule(e: React.FormEvent) {
    e.preventDefault();
    const res = addCustomRule(ruleForm);
    if (res.success) {
      setRuleNotice({ type: "success", msg: `Rule added successfully! ID: ${res.ruleId}` });
      setTimeout(() => setRuleNotice(null), 4000);
    } else {
      setRuleNotice({ type: "error", msg: res.error || "Failed to add rule" });
    }
  }

  function handleAddScenario(e: React.FormEvent) {
    e.preventDefault();
    const res = addCustomScenario({
      ...scenForm,
      available_actions: scenForm.available_actions.split(",").map((s) => s.trim()),
    });
    if (res.success) {
      setScenNotice({ type: "success", msg: `Scenario created! ID: ${res.scenarioId}` });
      setTimeout(() => setScenNotice(null), 4000);
    } else {
      setScenNotice({ type: "error", msg: res.error || "Failed to add scenario" });
    }
  }

  function handleImport() {
    if (!importText.trim()) {
      setImportNotice({ type: "error", msg: "Please paste or enter file content." });
      return;
    }
    const res = importDataset(importText, importFormat, importTarget);
    if (res.error) {
      setImportNotice({ type: "error", msg: res.error });
    } else {
      setImportNotice({
        type: "success",
        msg: `Successfully imported ${res.importedCount} new ${importTarget}!`,
      });
      setImportText("");
      setTimeout(() => setImportNotice(null), 4000);
    }
  }

  function triggerDownload(target: "custom_rules" | "custom_scenarios" | "all_rules" | "all_scenarios", format: "json" | "csv") {
    const { data, filename, mimeType } = exportDataset(target, format);
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function loadScenarioToBattle(sc: BattleScenario) {
    battleStore.loadCustomScenarioState({
      name: `${sc.formation_a} vs ${sc.formation_b} (${sc.game_state})`,
      formationHome: sc.formation_a,
      formationAway: sc.formation_b,
      ballZone: sc.ball_zone,
      dilemmaPrompt: `State: ${sc.game_state}. Pressure: ${sc.pressure_level}. Space Value: ${sc.space_value_estimate}. Tactical objective: exploit ${sc.ball_zone} against ${sc.opponent_shape_b}.`,
      bestAction: sc.best_action_estimate,
    });
    router.push("/battle");
  }

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-lime-500/10 via-sky-500/10 to-transparent p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/20 px-2.5 py-0.5 text-xs font-semibold text-lime-400">
                <Database className="h-3.5 w-3.5" /> Ingestion & Studio
              </span>
              <span className="text-xs text-zinc-400">Tactics OS Extensible Data Layer</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Dataset Manager & Knowledge Ingestion
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-zinc-400">
              Expand the tactical engine in real time. Add new movement rules, game-state scenarios, and pressing triggers.
              Import CSV or JSON files with automated schema verification and instant integration across all simulation tools.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <div className="text-lg font-bold text-lime-400">{stats.totalRules.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Total Rules</div>
              {stats.customRules > 0 && (
                <div className="text-[9px] text-lime-300 font-mono">+{stats.customRules} custom</div>
              )}
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <div className="text-lg font-bold text-sky-400">{stats.totalScenarios.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Scenarios</div>
              {stats.customScenarios > 0 && (
                <div className="text-[9px] text-sky-300 font-mono">+{stats.customScenarios} custom</div>
              )}
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <div className="text-lg font-bold text-amber-400">300</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Causality Chains</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-center">
              <div className="text-lg font-bold text-emerald-400">17 + 5</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Laws 2026/27</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: "rule", label: "Add Tactical Rule", icon: PlusCircle },
          { id: "scenario", label: "Add Battle Scenario", icon: Layers },
          { id: "import", label: "File Import (CSV / JSON)", icon: Upload },
          { id: "browse", label: `Manage Custom (${stats.customRules + stats.customScenarios})`, icon: Database },
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

      {/* 1. Add Tactical Rule */}
      {tab === "rule" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleAddRule} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Create New Tactical Principle or Rule</h2>
              <span className="text-[11px] text-zinc-500">Z1–Z30 Grid Schema Grounded</span>
            </div>

            {ruleNotice && (
              <div
                className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
                  ruleNotice.type === "success"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border border-rose-500/30 bg-rose-500/10 text-rose-300"
                }`}
              >
                {ruleNotice.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                )}
                {ruleNotice.msg}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Category</label>
                <select
                  value={ruleForm.category}
                  onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="MOVEMENT">Movement (Off-Ball)</option>
                  <option value="PRESSING">Pressing Trigger</option>
                  <option value="OVERLOAD_ISOLATION">Overload → Isolation</option>
                  <option value="THIRD_MAN">Third Man Pattern</option>
                  <option value="MANIPULATION_CHAIN">Manipulation Chain</option>
                  <option value="SUCCESS_PATTERN">Success Pattern</option>
                  <option value="FAILURE_PATTERN">Failure Risk</option>
                  <option value="DEFENSIVE_ORGANISATION">Defensive Organization</option>
                  <option value="SET_PIECE">Set Piece Tactic</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Phase of Play</label>
                <select
                  value={ruleForm.phase}
                  onChange={(e) => setRuleForm({ ...ruleForm, phase: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="attacking_organisation">Attacking Organization (Build-up)</option>
                  <option value="progression">Progression (Middle Third)</option>
                  <option value="chance_creation">Chance Creation (Final Third)</option>
                  <option value="defensive_transition">Defensive Transition (Counterpress)</option>
                  <option value="offensive_transition">Offensive Transition (Counterattack)</option>
                  <option value="defensive_organisation">Defensive Block (Low/Mid)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Target Zone (Z1–Z30)</label>
                <input
                  type="text"
                  value={ruleForm.target}
                  onChange={(e) => setRuleForm({ ...ruleForm, target: e.target.value.toUpperCase() })}
                  placeholder="e.g. Z14, Z18, Z28"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Actor / Player Role</label>
                <input
                  type="text"
                  value={ruleForm.actor}
                  onChange={(e) => setRuleForm({ ...ruleForm, actor: e.target.value })}
                  placeholder="e.g. false nine, inverted full-back, mezzala"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Trigger Event</label>
                <input
                  type="text"
                  value={ruleForm.trigger}
                  onChange={(e) => setRuleForm({ ...ruleForm, trigger: e.target.value })}
                  placeholder="e.g. opposing pivot pressed from behind"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400">Pre-Condition</label>
              <input
                type="text"
                value={ruleForm.condition}
                onChange={(e) => setRuleForm({ ...ruleForm, condition: e.target.value })}
                placeholder="e.g. defender has body shape turned toward touchline"
                className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400">Tactical Action</label>
              <textarea
                value={ruleForm.action}
                onChange={(e) => setRuleForm({ ...ruleForm, action: e.target.value })}
                placeholder="Specific movement, pass trajectory, or spatial occupation..."
                className="mt-1 h-16 w-full rounded-md border border-white/10 bg-zinc-900 p-2.5 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Expected Tactical Result</label>
                <input
                  type="text"
                  value={ruleForm.expected_result}
                  onChange={(e) => setRuleForm({ ...ruleForm, expected_result: e.target.value })}
                  placeholder="e.g. 1.2s uncontested window to shoot or pass"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Potential Risk / Vulnerability</label>
                <input
                  type="text"
                  value={ruleForm.risk}
                  onChange={(e) => setRuleForm({ ...ruleForm, risk: e.target.value })}
                  placeholder="e.g. turnover leaves space behind inverted full-back"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400">Opponent Counter-Action</label>
              <input
                type="text"
                value={ruleForm.counter}
                onChange={(e) => setRuleForm({ ...ruleForm, counter: e.target.value })}
                placeholder="e.g. near-side centre-back tracks runner while midfield shifts"
                className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-lime-400 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-lime-300"
            >
              <PlusCircle className="h-4 w-4" /> Add Rule to Live Knowledge Matrix
            </button>
          </form>

          {/* Quick Guide */}
          <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-lime-400">6×5 Pitch Grid Guide</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Rules ground to the 30-zone pitch model (Section 1.5). Left to Right: LW, LHS, Central (CZ), RHS, RW.
            </p>
            <div className="grid grid-cols-5 gap-1 font-mono text-[10px] text-center">
              {["LW", "LHS", "CZ", "RHS", "RW"].map((l) => (
                <div key={l} className="bg-white/10 py-1 text-zinc-300 rounded">
                  {l}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const z = `Z${i + 1}`;
                const isHighlight = z === ruleForm.target;
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setRuleForm({ ...ruleForm, target: z })}
                    className={`py-1 rounded border ${
                      isHighlight
                        ? "border-lime-400 bg-lime-400/20 text-lime-300 font-bold"
                        : "border-white/5 bg-black/40 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    {z}
                  </button>
                );
              })}
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-[11px] text-zinc-400">
              <span className="font-semibold text-white">Zone 14 (Z18):</span> Critical attacking hub directly outside the central box.
              <br />
              <span className="font-semibold text-white">Half-spaces (Z7, Z12, Z17, Z22, Z27):</span> Premier chance-creation corridors.
            </div>
          </div>
        </div>
      )}

      {/* 2. Add Battle Scenario */}
      {tab === "scenario" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleAddScenario} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Design Custom Battle Scenario</h2>
              <span className="text-[11px] text-zinc-500">Playable on 2D Pitch Board</span>
            </div>

            {scenNotice && (
              <div
                className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
                  scenNotice.type === "success"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border border-rose-500/30 bg-rose-500/10 text-rose-300"
                }`}
              >
                {scenNotice.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                )}
                {scenNotice.msg}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Game State</label>
                <select
                  value={scenForm.game_state}
                  onChange={(e) => setScenForm({ ...scenForm, game_state: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="break_low_block">Break Low Block (Deep Compact)</option>
                  <option value="escape_high_press">Escape High Press (Build-Up)</option>
                  <option value="chase_equalizer">Chase Equalizer (85&apos;+)</option>
                  <option value="protect_lead">Protect Lead (Compact 5-4-1)</option>
                  <option value="counter_attack_transition">Counter Attack Transition</option>
                  <option value="half_space_overload">Half-space Overload 3v2</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Home Formation</label>
                <select
                  value={scenForm.formation_a}
                  onChange={(e) => setScenForm({ ...scenForm, formation_a: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="4-3-3">4-3-3</option>
                  <option value="4-2-3-1">4-2-3-1</option>
                  <option value="3-5-2">3-5-2</option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="3-4-2-1">3-4-2-1</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Away Formation</label>
                <select
                  value={scenForm.formation_b}
                  onChange={(e) => setScenForm({ ...scenForm, formation_b: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="5-4-1">5-4-1</option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="4-3-3">4-3-3</option>
                  <option value="4-2-3-1">4-2-3-1</option>
                  <option value="5-3-2">5-3-2</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Ball Zone (Z1–Z30)</label>
                <input
                  type="text"
                  value={scenForm.ball_zone}
                  onChange={(e) => setScenForm({ ...scenForm, ball_zone: e.target.value.toUpperCase() })}
                  placeholder="e.g. Z14, Z22"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Pressure Level</label>
                <select
                  value={scenForm.pressure_level}
                  onChange={(e) => setScenForm({ ...scenForm, pressure_level: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                >
                  <option value="low">Low (&gt;4m distance)</option>
                  <option value="medium">Medium (2–4m distance)</option>
                  <option value="high">High (&lt;2m immediate pressing)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Space Value Estimate (0–1)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={scenForm.space_value_estimate}
                  onChange={(e) => setScenForm({ ...scenForm, space_value_estimate: parseFloat(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Recommended / Best Action</label>
                <input
                  type="text"
                  value={scenForm.best_action_estimate}
                  onChange={(e) => setScenForm({ ...scenForm, best_action_estimate: e.target.value })}
                  placeholder="e.g. cutback, through_ball, switch"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Opponent Response Estimate</label>
                <input
                  type="text"
                  value={scenForm.opponent_response_estimate}
                  onChange={(e) => setScenForm({ ...scenForm, opponent_response_estimate: e.target.value })}
                  placeholder="e.g. shift_across, drop_off, step_out"
                  className="mt-1 w-full rounded-md border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-2.5 text-xs font-bold text-black transition hover:bg-sky-300"
            >
              <PlusCircle className="h-4 w-4" /> Save Scenario to Scenarios Lab
            </button>
          </form>

          <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400">Scenario Integration</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every custom scenario you create is immediately registered in the 300+ Scenarios Lab, and can be loaded directly onto the 2D Pitch Board to test player coordinates, passing lane threats, and AI persona counter-shifts.
            </p>
            <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3 text-xs text-zinc-300">
              <span className="font-semibold text-sky-400">Physics Tested:</span> Custom scenarios will execute through the same sub-second validation pipeline as seed scenarios.
            </div>
          </div>
        </div>
      )}

      {/* 3. File Import */}
      {tab === "import" && (
        <div className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Batch Dataset Ingestion</h2>
              <p className="text-xs text-zinc-400">Import CSV or JSON tactical datasets into active runtime.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={importTarget}
                onChange={(e) => setImportTarget(e.target.value as typeof importTarget)}
                className="rounded-md border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs text-white"
              >
                <option value="rules">Target: Tactical Rules</option>
                <option value="scenarios">Target: Battle Scenarios</option>
              </select>
              <select
                value={importFormat}
                onChange={(e) => setImportFormat(e.target.value as typeof importFormat)}
                className="rounded-md border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs text-white"
              >
                <option value="json">Format: JSON</option>
                <option value="csv">Format: CSV</option>
              </select>
            </div>
          </div>

          {importNotice && (
            <div
              className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
                importNotice.type === "success"
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border border-rose-500/30 bg-rose-500/10 text-rose-300"
              }`}
            >
              {importNotice.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              )}
              {importNotice.msg}
            </div>
          )}

          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={
              importFormat === "json"
                ? `Paste JSON array of rules or scenarios:\n[\n  {\n    "category": "MOVEMENT",\n    "actor": "inverted winger",\n    "action": "underlap into half-space",\n    "target": "Z17"\n  }\n]`
                : `Paste CSV with header row:\ncategory,phase,trigger,actor,action,target\nMOVEMENT,chance_creation,overlap_run,full-back,cross_far_post,Z28`
            }
            className="h-60 w-full rounded-md border border-white/10 bg-zinc-950 p-3 font-mono text-xs text-zinc-200"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleImport}
              className="flex items-center gap-2 rounded-lg bg-lime-400 px-5 py-2 text-xs font-bold text-black hover:bg-lime-300"
            >
              <Upload className="h-4 w-4" /> Parse & Ingest Dataset
            </button>
            <button
              onClick={() => {
                const sample =
                  importFormat === "json"
                    ? JSON.stringify(
                        [
                          {
                            category: "MOVEMENT",
                            phase: "progression",
                            trigger: "space_behind_pivot",
                            actor: "mezzala",
                            action: "burst into half-space channel",
                            target: "Z17",
                            expected_result: "receives beyond midfield line",
                            risk: "counter-attack if pass intercepted",
                            counter: "defensive full-back tucks inside",
                          },
                        ],
                        null,
                        2
                      )
                    : "category,phase,trigger,actor,action,target\nMOVEMENT,progression,space_behind_pivot,mezzala,burst into half-space,Z17";
                setImportText(sample);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 hover:bg-white/10"
            >
              Load Sample Data
            </button>
          </div>
        </div>
      )}

      {/* 4. Manage Custom Datasets & Exports */}
      {tab === "browse" && (
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => triggerDownload("custom_rules", "json")}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                <Download className="h-3.5 w-3.5 text-lime-400" /> Export Custom Rules (JSON)
              </button>
              <button
                onClick={() => triggerDownload("custom_rules", "csv")}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                <Download className="h-3.5 w-3.5 text-lime-400" /> Export Custom Rules (CSV)
              </button>
              <button
                onClick={() => triggerDownload("custom_scenarios", "json")}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                <Download className="h-3.5 w-3.5 text-sky-400" /> Export Custom Scenarios (JSON)
              </button>
              <button
                onClick={() => triggerDownload("all_rules", "json")}
                className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                <Download className="h-3.5 w-3.5 text-amber-400" /> Export All Master Rules (1,240)
              </button>
            </div>

            {(customRules.length > 0 || customScenarios.length > 0) && (
              <button
                onClick={() => {
                  if (confirm("Reset all user-added rules and scenarios back to default seed?")) {
                    resetCustomDatasets();
                  }
                }}
                className="flex items-center gap-1.5 rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/20"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear Custom Records
              </button>
            )}
          </div>

          {/* Custom Rules List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              User-Contributed Rules ({customRules.length})
            </h3>
            {customRules.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-xs text-zinc-500">
                No custom rules created yet. Use the &quot;Add Tactical Rule&quot; tab or file import.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {customRules.map((r) => (
                  <div key={r.rule_id} className="relative rounded-xl border border-lime-500/20 bg-lime-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-lime-400">{r.rule_id}</span>
                      <span className="rounded bg-lime-400/20 px-2 py-0.5 text-[10px] font-semibold text-lime-300">
                        {r.category} · {r.target}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {r.actor}: {r.action}
                    </div>
                    <p className="text-xs text-zinc-300">{r.purpose}</p>
                    <div className="text-[11px] text-zinc-400">
                      <span className="text-zinc-500">Trigger:</span> {r.trigger}
                    </div>
                    <button
                      onClick={() => deleteCustomItem(r.rule_id)}
                      className="mt-2 flex items-center gap-1 text-[11px] text-rose-400 hover:underline"
                    >
                      <Trash2 className="h-3 w-3" /> Remove rule
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom Scenarios List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">
              User-Contributed Battle Scenarios ({customScenarios.length})
            </h3>
            {customScenarios.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-xs text-zinc-500">
                No custom scenarios created yet. Use the &quot;Add Battle Scenario&quot; tab.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {customScenarios.map((sc) => (
                  <div key={sc.scenario_id} className="relative rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-400">{sc.scenario_id}</span>
                      <span className="rounded bg-sky-400/20 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                        {sc.formation_a} vs {sc.formation_b} · {sc.ball_zone}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {sc.game_state} (Pressure: {sc.pressure_level})
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {sc.available_actions.map((act) => (
                        <span key={act} className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-300 font-mono">
                          {act}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => loadScenarioToBattle(sc)}
                        className="flex items-center gap-1 rounded bg-sky-400 px-2.5 py-1 text-xs font-semibold text-black hover:bg-sky-300"
                      >
                        <ExternalLink className="h-3 w-3" /> Load in Pitch Simulator
                      </button>
                      <button
                        onClick={() => deleteCustomItem(sc.scenario_id)}
                        className="flex items-center gap-1 text-[11px] text-rose-400 hover:underline"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
