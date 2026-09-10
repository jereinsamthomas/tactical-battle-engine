import masterRaw from "./tactical_master.json";
import csvModelsRaw from "./csv_models.json";

export interface TacticalRule {
  rule_id: string;
  category: string;
  phase: string;
  trigger: string;
  condition: string;
  actor: string;
  action: string;
  target: string;
  purpose: string;
  expected_result: string;
  risk: string;
  counter: string;
  confidence: string;
  source_class: string;
  isCustom?: boolean;
}

export interface BattleScenario {
  scenario_id: string;
  game_state: string;
  formation_a: string;
  formation_b: string;
  style_a: string;
  style_b: string;
  ball_zone: string;
  team_shape_a: string;
  opponent_shape_b: string;
  pressure_level: string;
  space_value_estimate: number;
  numerical_state: string;
  available_actions: string[];
  best_action_estimate: string;
  opponent_response_estimate: string;
  counter_estimate: string;
  outcome_estimate: string;
  source_class: string;
  isCustom?: boolean;
}

export interface TacticalCausalityChain {
  chain_id: string;
  category: string;
  mechanism: string;
  context_formation: string;
  step_1_player_movement: string;
  step_2_space: string;
  step_3_opponent_response: string;
  step_4_team_adaptation: string;
  step_5_second_opponent_response: string;
  step_6_counter: string;
  step_7_outcome: string;
  source_class: string;
  reference: string;
  isCustom?: boolean;
}

export interface RelationalTableModel {
  tableName: string;
  fileName: string;
  description: string;
  columns: string[];
  sampleRows: string[][];
}

interface MasterDataStructure {
  meta?: Record<string, unknown>;
  rules: TacticalRule[];
  battle_scenarios: BattleScenario[];
  tactical_causality_chains: TacticalCausalityChain[];
}

const typedMaster = masterRaw as MasterDataStructure;
const typedCsvModels = csvModelsRaw as Record<string, RelationalTableModel>;

const STORAGE_KEY_CUSTOM_RULES = "tactics_os_custom_rules";
const STORAGE_KEY_CUSTOM_SCENARIOS = "tactics_os_custom_scenarios";

type ChangeListener = () => void;
const listeners: Set<ChangeListener> = new Set();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function subscribeMasterStore(fn: ChangeListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// In-memory cache of custom entries
let customRulesCache: TacticalRule[] | null = null;
let customScenariosCache: BattleScenario[] | null = null;

function loadCustomRulesFromStorage(): TacticalRule[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_RULES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function loadCustomScenariosFromStorage(): BattleScenario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_SCENARIOS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getCustomRules(): TacticalRule[] {
  if (customRulesCache === null) {
    customRulesCache = loadCustomRulesFromStorage();
  }
  return customRulesCache;
}

export function getCustomScenarios(): BattleScenario[] {
  if (customScenariosCache === null) {
    customScenariosCache = loadCustomScenariosFromStorage();
  }
  return customScenariosCache;
}

/**
 * Returns all rules: Seed master rules (1,240) plus user-added custom rules.
 */
export function getAllRules(): TacticalRule[] {
  const custom = getCustomRules();
  return [...custom, ...typedMaster.rules];
}

/**
 * Returns all scenarios: Seed master scenarios (300) plus user-added custom scenarios.
 */
export function getAllScenarios(): BattleScenario[] {
  const custom = getCustomScenarios();
  return [...custom, ...typedMaster.battle_scenarios];
}

/**
 * Returns all 300 tactical causality chains.
 */
export function getAllCausalityChains(): TacticalCausalityChain[] {
  return typedMaster.tactical_causality_chains;
}

/**
 * Returns all 14 relational CSV models with descriptions, schemas, and rows.
 */
export function getAllCsvDataModels(): Record<string, RelationalTableModel> {
  return typedCsvModels;
}

/**
 * Validates a tactical rule schema.
 */
export function validateRuleInput(rule: Partial<TacticalRule>): { valid: boolean; error?: string } {
  if (!rule.category || rule.category.trim() === "") {
    return { valid: false, error: "Rule category is required." };
  }
  if (!rule.actor || rule.actor.trim() === "") {
    return { valid: false, error: "Actor / player role is required." };
  }
  if (!rule.action || rule.action.trim() === "") {
    return { valid: false, error: "Tactical action is required." };
  }
  if (rule.target && !/^Z([1-9]|[12][0-9]|30)$/i.test(rule.target.trim())) {
    return { valid: false, error: `Invalid zone '${rule.target}'. Must be between Z1 and Z30.` };
  }
  return { valid: true };
}

/**
 * Validates a battle scenario schema.
 */
export function validateScenarioInput(scenario: Partial<BattleScenario>): { valid: boolean; error?: string } {
  if (!scenario.formation_a || !scenario.formation_b) {
    return { valid: false, error: "Both team formations (A and B) are required." };
  }
  if (!scenario.game_state) {
    return { valid: false, error: "Game state dilemma is required." };
  }
  if (scenario.ball_zone && !/^Z([1-9]|[12][0-9]|30)$/i.test(scenario.ball_zone.trim())) {
    return { valid: false, error: `Invalid ball zone '${scenario.ball_zone}'. Must be between Z1 and Z30.` };
  }
  return { valid: true };
}

/**
 * Adds a custom tactical rule to the persistent dataset.
 */
export function addCustomRule(
  rule: Omit<TacticalRule, "rule_id" | "isCustom" | "source_class"> & { source_class?: string }
): { success: boolean; ruleId?: string; error?: string } {
  const val = validateRuleInput(rule);
  if (!val.valid) return { success: false, error: val.error };

  const current = getCustomRules();
  const ruleId = `CUST_RULE_${Date.now().toString(36).toUpperCase()}`;
  const newRule: TacticalRule = {
    ...rule,
    rule_id: ruleId,
    confidence: rule.confidence || "high",
    source_class: rule.source_class || "USER_CUSTOM",
    isCustom: true,
  };

  current.unshift(newRule);
  customRulesCache = current;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CUSTOM_RULES, JSON.stringify(current));
  }
  notifyListeners();
  return { success: true, ruleId };
}

/**
 * Adds a custom battle scenario to the persistent dataset.
 */
export function addCustomScenario(
  scenario: Omit<BattleScenario, "scenario_id" | "isCustom" | "source_class"> & { source_class?: string }
): { success: boolean; scenarioId?: string; error?: string } {
  const val = validateScenarioInput(scenario);
  if (!val.valid) return { success: false, error: val.error };

  const current = getCustomScenarios();
  const scenarioId = `CUST_SCEN_${Date.now().toString(36).toUpperCase()}`;
  const newScenario: BattleScenario = {
    ...scenario,
    scenario_id: scenarioId,
    space_value_estimate: Number(scenario.space_value_estimate) || 0.15,
    available_actions: scenario.available_actions && scenario.available_actions.length > 0 ? scenario.available_actions : ["pass", "dribble", "cross", "switch"],
    source_class: "USER_CUSTOM",
    isCustom: true,
  };

  current.unshift(newScenario);
  customScenariosCache = current;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_CUSTOM_SCENARIOS, JSON.stringify(current));
  }
  notifyListeners();
  return { success: true, scenarioId };
}

/**
 * Deletes a custom item by ID.
 */
export function deleteCustomItem(id: string): boolean {
  if (id.startsWith("CUST_RULE_")) {
    const current = getCustomRules().filter((r) => r.rule_id !== id);
    customRulesCache = current;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_CUSTOM_RULES, JSON.stringify(current));
    }
    notifyListeners();
    return true;
  }
  if (id.startsWith("CUST_SCEN_")) {
    const current = getCustomScenarios().filter((s) => s.scenario_id !== id);
    customScenariosCache = current;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_CUSTOM_SCENARIOS, JSON.stringify(current));
    }
    notifyListeners();
    return true;
  }
  return false;
}

/**
 * Imports a dataset from raw JSON or CSV text.
 */
export function importDataset(rawText: string, format: "json" | "csv", targetType: "rules" | "scenarios"): { importedCount: number; error?: string } {
  try {
    if (format === "json") {
      const parsed = JSON.parse(rawText);
      const items = Array.isArray(parsed) ? parsed : (parsed.rules || parsed.scenarios || parsed.battle_scenarios || [parsed]);
      let count = 0;
      for (const item of items) {
        if (targetType === "rules") {
          const res = addCustomRule(item);
          if (res.success) count++;
        } else {
          const res = addCustomScenario(item);
          if (res.success) count++;
        }
      }
      return { importedCount: count };
    } else {
      // CSV parser
      const lines = rawText.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) return { importedCount: 0, error: "CSV file has no data rows." };
      const headers = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));
      let count = 0;
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
        const record: Record<string, string> = {};
        headers.forEach((h, idx) => {
          record[h] = values[idx] ?? "";
        });

        if (targetType === "rules") {
          const res = addCustomRule({
            category: record.category || "CUSTOM",
            phase: record.phase || "attacking_organisation",
            trigger: record.trigger || "space_identified",
            condition: record.condition || "",
            actor: record.actor || "player",
            action: record.action || "move",
            target: record.target || "Z14",
            purpose: record.purpose || "",
            expected_result: record.expected_result || "",
            risk: record.risk || "",
            counter: record.counter || "",
            confidence: record.confidence || "medium",
            source_class: "CSV_IMPORT",
          });
          if (res.success) count++;
        } else {
          const res = addCustomScenario({
            game_state: record.game_state || "in_possession",
            formation_a: record.formation_a || "4-3-3",
            formation_b: record.formation_b || "4-4-2",
            style_a: record.style_a || "positional",
            style_b: record.style_b || "counter",
            ball_zone: record.ball_zone || "Z13",
            team_shape_a: record.team_shape_a || "4-3-3",
            opponent_shape_b: record.opponent_shape_b || "4-4-2",
            pressure_level: record.pressure_level || "medium",
            space_value_estimate: parseFloat(record.space_value_estimate) || 0.15,
            numerical_state: record.numerical_state || "equal",
            available_actions: (record.available_actions || "pass,dribble").split(";"),
            best_action_estimate: record.best_action_estimate || "pass",
            opponent_response_estimate: record.opponent_response_estimate || "shift",
            counter_estimate: record.counter_estimate || "hold_line",
            outcome_estimate: record.outcome_estimate || "retained",
            source_class: "CSV_IMPORT",
          });
          if (res.success) count++;
        }
      }
      return { importedCount: count };
    }
  } catch (err) {
    return { importedCount: 0, error: err instanceof Error ? err.message : "Failed to parse import." };
  }
}

/**
 * Exports custom datasets to JSON or CSV download string.
 */
export function exportDataset(target: "custom_rules" | "custom_scenarios" | "all_rules" | "all_scenarios", format: "json" | "csv"): { data: string; filename: string; mimeType: string } {
  let items: unknown[];
  const filename = `tactics_os_${target}_${Date.now()}`;

  if (target === "custom_rules") items = getCustomRules();
  else if (target === "custom_scenarios") items = getCustomScenarios();
  else if (target === "all_rules") items = getAllRules();
  else items = getAllScenarios();

  if (format === "json") {
    return {
      data: JSON.stringify(items, null, 2),
      filename: `${filename}.json`,
      mimeType: "application/json",
    };
  } else {
    // Convert to CSV
    if (items.length === 0) {
      return { data: "", filename: `${filename}.csv`, mimeType: "text/csv" };
    }
    const headers = Object.keys(items[0] as object);
    const rows = items.map((it) => {
      const rec = it as Record<string, unknown>;
      return headers.map((h) => {
        const val = Array.isArray(rec[h]) ? rec[h].join(";") : String(rec[h] ?? "");
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",");
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    return {
      data: csvContent,
      filename: `${filename}.csv`,
      mimeType: "text/csv",
    };
  }
}

/**
 * Resets user custom datasets.
 */
export function resetCustomDatasets(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_RULES);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_SCENARIOS);
  }
  customRulesCache = [];
  customScenariosCache = [];
  notifyListeners();
}
