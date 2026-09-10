// ============================================================================
// TACTICAL STATE — Zustand store. UI <-> store <-> validator/engine/AI.
// The store owns NO physics logic; it delegates to the deterministic layer.
// ============================================================================

import { create } from "zustand";
import { resolveTurn } from "@/lib/engine";
import { computePitchControl, type ControlGrid } from "@/lib/pitchControl";
import { getLLM, toCorrection } from "@/lib/llm";
import { getScenario } from "@/lib/scenarios";
import type {
  BattleState, Correction, DrawnPass, Outcome, PersonaId,
  RunPath, SimulationResult, UserAction,
} from "@/lib/types";

export type Tool = "select" | "move" | "pass" | "run" | "defensive" | "press" | "annotate";
export type Overlay =
  | "grid" | "thirds" | "lanes" | "zone14" | "passingLanes"
  | "offsideLine" | "pitchControl" | "restDefence" | "pressingShadows";

interface BattleStore {
  battle: BattleState | null;
  persona: PersonaId;
  tool: Tool;
  overlays: Record<Overlay, boolean>;
  selectedPlayerId: string | null;
  control: ControlGrid | null;
  lastResult: SimulationResult | null;
  narration: string | null;
  corrections: Correction[];
  /** replay (§26) */
  replayT: number;
  replayPlaying: boolean;
  history: SimulationResult[];

  setPersona: (p: PersonaId) => void;
  setTool: (t: Tool) => void;
  toggleOverlay: (o: Overlay) => void;
  selectPlayer: (id: string | null) => void;
  loadScenario: (id: string) => void;
  movePlayer: (id: string, x: number, y: number) => void;
  addRun: (run: RunPath) => void;
  addPass: (pass: DrawnPass) => void;
  executeTurn: (action: Omit<UserAction, "runs"> & { runs?: RunPath[] }) => Promise<void>;
  challenge: (userArgument: string) => Promise<void>;
  setReplayT: (t: number) => void;
  setReplayPlaying: (p: boolean) => void;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  battle: null,
  persona: "anvil",
  tool: "move",
  overlays: {
    grid: true, thirds: false, lanes: true, zone14: false,
    passingLanes: false, offsideLine: false, pitchControl: false,
    restDefence: false, pressingShadows: false,
  },
  selectedPlayerId: null,
  control: null,
  lastResult: null,
  narration: null,
  corrections: [],
  replayT: 0,
  replayPlaying: false,
  history: [],

  setPersona: (persona) => set({ persona }),
  setTool: (tool) => set({ tool }),
  toggleOverlay: (o) =>
    set((s) => ({ overlays: { ...s.overlays, [o]: !s.overlays[o] } })),
  selectPlayer: (selectedPlayerId) => set({ selectedPlayerId }),

  loadScenario: (id) => {
    const battle = getScenario(id).build();
    const control = computePitchControl(battle.homePlayers, battle.awayPlayers);
    set({
      battle, control, lastResult: null, narration: null,
      replayT: 0, history: [], selectedPlayerId: battle.ball.carrierId,
    });
  },

  movePlayer: (id, x, y) => {
    const { battle } = get();
    if (!battle) return;
    const clampTo = (v: number, hi: number) => Math.min(hi, Math.max(0, v));
    const nx = clampTo(x, 105), ny = clampTo(y, 68);
    const home = battle.homePlayers.map((p) => (p.id === id ? { ...p, x: nx, y: ny } : p));
    const away = battle.awayPlayers.map((p) => (p.id === id ? { ...p, x: nx, y: ny } : p));
    const next = { ...battle, homePlayers: home, awayPlayers: away };
    set({ battle: next, control: computePitchControl(next.homePlayers, next.awayPlayers) });
  },

  addRun: (run) => {
    const { battle } = get();
    if (!battle) return;
    set({ battle: { ...battle, runs: [...battle.runs, run] } });
  },

  addPass: (pass) => {
    const { battle } = get();
    if (!battle) return;
    set({ battle: { ...battle, drawnPasses: [...battle.drawnPasses, pass] } });
  },

  executeTurn: async (action) => {
    const { battle, persona } = get();
    if (!battle) return;
    const full: UserAction = { ...action, runs: action.runs ?? battle.runs };
    const result = resolveTurn(battle, full, persona);
    const pkg = await getLLM().narrateTurn(result, persona);
    set((s) => ({
      lastResult: result,
      narration: pkg.explanation,
      replayT: 0,
      replayPlaying: true,
      history: [...s.history, result],
      battle: {
        ...battle,
        turn: battle.turn + 1,
        runs: [],
        drawnPasses: [],
        // ball moves to resolution point; carrier updated on success
        ball: result.timeline.length
          ? { ...battle.ball, x: result.timeline[result.timeline.length - 1].ball.x,
              y: result.timeline[result.timeline.length - 1].ball.y,
              carrierId: result.timeline[result.timeline.length - 1].ball.carrierId }
          : battle.ball,
      },
    }));
  },

  challenge: async (userArgument) => {
    const { battle, lastResult, corrections } = get();
    if (!battle || !lastResult) return;
    const adj = await getLLM().adjudicateCorrection({ result: lastResult, userArgument });
    const correction = toCorrection(adj, {
      scenarioId: battle.id,
      turn: lastResult.turn,
      originalClaim: lastResult.explanation.verdict,
      userArgument,
      boardCoordinates: [
        ...battle.homePlayers.map((p) => ({ playerId: p.id, x: p.x, y: p.y })),
        ...battle.awayPlayers.map((p) => ({ playerId: p.id, x: p.x, y: p.y })),
      ],
      tacticalConcept: lastResult.counter.moveId,
    });
    set({ corrections: [...corrections, correction], narration: adj.reasoning });
  },

  setReplayT: (replayT) => set({ replayT }),
  setReplayPlaying: (replayPlaying) => set({ replayPlaying }),
}));
