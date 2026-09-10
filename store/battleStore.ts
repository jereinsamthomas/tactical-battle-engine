import { create } from "zustand";
import type {
  DrawArrow,
  FormationId,
  GameState,
  PassType,
  PitchState,
  PlayerToken,
  RunType,
  StyleId,
  TacticalProfile,
  UserAction,
  Vec2,
  BattleTurnResponse,
} from "@/lib/types";
import { spawnTeam } from "@/lib/formations";
import { generateOpeningDilemma } from "@/lib/simulation";

export type Tool = "select" | "pass" | "run" | "press";

const defaultProfile: TacticalProfile = {
  teamName: "North Dock FC",
  kitPrimary: "#3b82f6",
  kitSecondary: "#1e3a5f",
  baseFormation: "4-3-3",
  opponentFormation: "5-4-1",
  style: "Positional Play",
  philosophyDescription:
    "I play a fluid 4-3-3 that builds in a 3-2-5. My left back inverts alongside the defensive midfielder. I bait pressure to my right centre-back, then hit my left winger in 1v1 isolation. In the final third, I prioritize low cutbacks to the edge of the box rather than aerial crosses.",
  lineHeight: 42,
  pressingIntensity: 7,
  positionalFluidity: 65,
  passingDirectness: 35,
  theme: "turf",
};

function initialPitch(p: TacticalProfile): PitchState {
  const home = spawnTeam(p.baseFormation, "home", p.lineHeight);
  const away = spawnTeam(p.opponentFormation, "away", 28);
  const carrier = home.find((x) => x.number === 7) ?? home[8];
  return {
    ball: { x: carrier.x, y: carrier.y, z: 0 },
    homePlayers: home,
    awayPlayers: away,
  };
}

const opening = generateOpeningDilemma({
  baseFormation: defaultProfile.baseFormation,
  style: defaultProfile.style,
  philosophyDescription: defaultProfile.philosophyDescription,
  lineHeight: defaultProfile.lineHeight,
  pressingIntensity: defaultProfile.pressingIntensity,
});

interface BattleStore {
  profile: TacticalProfile;
  pitch: PitchState;
  game: GameState;
  dilemma: string;
  considerations: string[];
  tool: Tool;
  selectedId: string | null;
  passType: PassType;
  runType: RunType;
  arrows: DrawArrow[];
  explanation: string;
  overlays: { lanes: boolean; thirds: boolean; voronoi: boolean; offside: boolean };
  lastResult: BattleTurnResponse | null;
  animating: boolean;
  turn: number;
  setProfile: (p: Partial<TacticalProfile>) => void;
  applySetup: () => void;
  setTool: (t: Tool) => void;
  select: (id: string | null) => void;
  moveToken: (id: string, pos: Vec2) => void;
  setBall: (pos: Vec2) => void;
  addArrow: (a: Omit<DrawArrow, "id">) => void;
  clearArrows: () => void;
  setExplanation: (s: string) => void;
  toggleOverlay: (k: keyof BattleStore["overlays"]) => void;
  setPassType: (t: PassType) => void;
  setRunType: (t: RunType) => void;
  setResult: (r: BattleTurnResponse | null) => void;
  applyResolution: (r: BattleTurnResponse) => void;
  setAnimating: (v: boolean) => void;
  loadCustomScenarioState: (sc: {
    name: string;
    formationHome?: string;
    formationAway?: string;
    ballZone?: string;
    dilemmaPrompt?: string;
    bestAction?: string;
  }) => void;
}

function zoneToCoords(zoneStr: string): { x: number; y: number } {
  const match = zoneStr.match(/Z(\d+)/i);
  if (!match) return { x: 52.5, y: 34 };
  const num = Math.min(30, Math.max(1, parseInt(match[1], 10)));
  const index = num - 1;
  const row = Math.floor(index / 5);
  const col = index % 5;
  return {
    x: Number((row * 17.5 + 8.75).toFixed(1)),
    y: Number((col * 13.6 + 6.8).toFixed(1)),
  };
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  profile: defaultProfile,
  pitch: initialPitch(defaultProfile),
  game: {
    matchMinute: opening.matchMinute,
    score: opening.score,
    currentPhase: opening.currentPhase,
  },
  dilemma: opening.scenarioDescription,
  considerations: opening.recommendedConsiderations,
  tool: "select",
  selectedId: null,
  passType: "CUTBACK",
  runType: "UNDERLAP",
  arrows: [],
  explanation: "",
  overlays: { lanes: true, thirds: false, voronoi: false, offside: true },
  lastResult: null,
  animating: false,
  turn: 1,
  setProfile: (p) => set({ profile: { ...get().profile, ...p } }),
  applySetup: () => {
    const profile = get().profile;
    const pitch = initialPitch(profile);
    const d = generateOpeningDilemma({
      baseFormation: profile.baseFormation,
      style: profile.style,
      philosophyDescription: profile.philosophyDescription,
      lineHeight: profile.lineHeight,
      pressingIntensity: profile.pressingIntensity,
    });
    set({
      pitch,
      dilemma: d.scenarioDescription,
      considerations: d.recommendedConsiderations,
      game: { matchMinute: d.matchMinute, score: d.score, currentPhase: d.currentPhase },
      arrows: [],
      lastResult: null,
      turn: 1,
    });
  },
  setTool: (tool) => set({ tool }),
  select: (selectedId) => set({ selectedId }),
  moveToken: (id, pos) => {
    const pitch = get().pitch;
    const patch = (arr: PlayerToken[]) => arr.map((p) => (p.id === id ? { ...p, ...pos } : p));
    set({
      pitch: {
        ...pitch,
        homePlayers: patch(pitch.homePlayers),
        awayPlayers: patch(pitch.awayPlayers),
      },
    });
  },
  setBall: (pos) => set({ pitch: { ...get().pitch, ball: { ...get().pitch.ball, ...pos } } }),
  addArrow: (a) =>
    set({ arrows: [...get().arrows, { ...a, id: `a-${Date.now()}-${Math.random().toString(16).slice(2)}` }] }),
  clearArrows: () => set({ arrows: [] }),
  setExplanation: (explanation) => set({ explanation }),
  toggleOverlay: (k) => set({ overlays: { ...get().overlays, [k]: !get().overlays[k] } }),
  setPassType: (passType) => set({ passType }),
  setRunType: (runType) => set({ runType }),
  setResult: (lastResult) => set({ lastResult }),
  applyResolution: (r) => {
    const pitch = get().pitch;
    const awayPlayers = pitch.awayPlayers.map((p) => {
      const m = r.opponentCounterAdjustment.counterMovements.find((c) => c.playerId === p.id);
      return m ? { ...p, x: m.newCoordinates.x, y: m.newCoordinates.y } : p;
    });
    const pass = get().arrows.find((a) => a.kind === "pass");
    const ball = pass ? { ...pitch.ball, x: pass.to.x, y: pass.to.y } : pitch.ball;
    const minute = Math.min(90, get().game.matchMinute + 2);
    set({
      pitch: { ...pitch, awayPlayers, ball },
      lastResult: r,
      dilemma: r.nextDilemma.scenarioDescription,
      considerations: r.nextDilemma.recommendedConsiderations,
      game: { ...get().game, matchMinute: minute },
      turn: get().turn + 1,
      arrows: [],
    });
  },
  setAnimating: (animating) => set({ animating }),
  loadCustomScenarioState: (sc) => {
    const coords = zoneToCoords(sc.ballZone || "Z14");
    const homeForm = (sc.formationHome && FORMATION_OPTIONS.includes(sc.formationHome as FormationId)
      ? sc.formationHome
      : "4-3-3") as FormationId;
    const awayForm = (sc.formationAway && FORMATION_OPTIONS.includes(sc.formationAway as FormationId)
      ? sc.formationAway
      : "5-4-1") as FormationId;
    const home = spawnTeam(homeForm, "home", 45);
    const away = spawnTeam(awayForm, "away", 28);
    set({
      profile: {
        ...get().profile,
        baseFormation: homeForm,
        opponentFormation: awayForm,
      },
      pitch: {
        ball: { x: coords.x, y: coords.y, z: 0 },
        homePlayers: home,
        awayPlayers: away,
      },
      dilemma: sc.dilemmaPrompt || `Scenario: ${sc.name}. Target Zone: ${sc.ballZone || "Z14"}.`,
      considerations: [
        `Target Zone: ${sc.ballZone || "Z14"} at (${coords.x}m, ${coords.y}m)`,
        `Formation Matchup: ${homeForm} attacking vs ${awayForm} defensive block`,
        sc.bestAction ? `Recommended action: ${sc.bestAction}` : "Find spatial superiority in half-spaces",
      ],
      arrows: [],
      lastResult: null,
      turn: 1,
    });
  },
}));

export function buildUserAction(): UserAction {
  const s = useBattleStore.getState();
  const pass = s.arrows.find((a) => a.kind === "pass");
  const runs = s.arrows.filter((a) => a.kind === "run");
  const presses = s.arrows.filter((a) => a.kind === "press");
  const carrier =
    s.pitch.homePlayers.find((p) => Math.hypot(p.x - s.pitch.ball.x, p.y - s.pitch.ball.y) < 4) ??
    s.pitch.homePlayers[8];
  return {
    ballCarrierId: carrier.id,
    passVector: pass
      ? {
          targetCoordinates: pass.to,
          passType: pass.passType ?? s.passType,
          speedMps: pass.passType === "CHIPPED" ? 14 : 18,
        }
      : undefined,
    playerRuns: runs.map((r) => ({
      playerId: r.playerId ?? carrier.id,
      trajectory: [r.from, r.to],
      runType: r.runType ?? s.runType,
    })),
    presses: presses.map((p) => ({
      playerId: p.playerId ?? carrier.id,
      targetCoordinates: p.to,
    })),
    tacticalExplanation: s.explanation,
  };
}

export const FORMATION_OPTIONS: FormationId[] = [
  "4-3-3",
  "4-2-3-1",
  "3-5-2",
  "5-3-2",
  "4-4-2",
  "3-4-3",
  "5-4-1",
  "4-1-4-1",
  "4-4-1-1",
  "4-3-1-2",
  "4-2-2-2",
  "4-2-4",
  "3-4-2-1",
  "3-4-1-2",
  "5-2-3",
  "4-5-1",
  "4-1-2-3",
  "4-3-2-1",
];

export const STYLE_OPTIONS: StyleId[] = [
  "Tiki-Taka",
  "Positional Play",
  "Gegenpressing",
  "Pragmatic Low Block",
  "Direct Transition",
  "Wing Play",
];
