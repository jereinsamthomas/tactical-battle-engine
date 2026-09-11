import { create } from "zustand";
import type {
  ComparisonDimension,
  DebateMessage,
  DebateMode,
  ExtendedDebatePersona,
  FinalJudgmentReport,
  ParsedTopic,
  UserChallengeAudit,
} from "@/lib/types";
import { applyWeightPreset, parseUserTopic, type WeightPreset } from "@/lib/debate/topicEngine";
import { auditUserChallenge, synthesizeFinalJudgment } from "@/lib/debate/adversarialEngine";

interface DebateState {
  rawTopicInput: string;
  parsedTopic: ParsedTopic;
  mode: DebateMode;
  userSide: "A" | "B" | "neutral" | "custom";
  userStance: string;
  aiPersona: ExtendedDebatePersona;
  secondAiPersona: ExtendedDebatePersona;
  includeJudge: boolean;
  currentRound: number;
  maxRounds: number;
  messages: DebateMessage[];
  dimensions: ComparisonDimension[];
  weightPreset: WeightPreset;
  userScoreSum: number;
  aiScoreSum: number;
  challengeAudits: UserChallengeAudit[];
  finalReport: FinalJudgmentReport | null;
  activeTab: "feed" | "tactical" | "evidence" | "radar" | "report";
  busy: boolean;

  setRawTopicInput: (val: string) => void;
  loadTopic: (query: string) => void;
  setMode: (mode: DebateMode) => void;
  setUserSide: (side: "A" | "B" | "neutral" | "custom", customText?: string) => void;
  setAiPersona: (p: ExtendedDebatePersona) => void;
  setSecondAiPersona: (p: ExtendedDebatePersona) => void;
  toggleJudge: () => void;
  setWeightPreset: (preset: WeightPreset) => void;
  updateDimensionWeight: (dimensionId: string, newWeight: number) => void;
  addMessage: (msg: DebateMessage) => void;
  submitChallenge: (targetClaim: string, userArgument: string) => void;
  finalizeDebate: () => void;
  setActiveTab: (tab: "feed" | "tactical" | "evidence" | "radar" | "report") => void;
  setBusy: (b: boolean) => void;
  resetDebate: () => void;
}

const defaultParsed = parseUserTopic("Messi vs Ronaldo");

export const useDebateStore = create<DebateState>((set, get) => ({
  rawTopicInput: "Messi vs Ronaldo",
  parsedTopic: defaultParsed,
  mode: "user_vs_ai",
  userSide: "A",
  userStance: "Messi possesses superior spatial gravity, chance creation volume, and progressive playmaking.",
  aiPersona: "anvil",
  secondAiPersona: "purist",
  includeJudge: true,
  currentRound: 1,
  maxRounds: 6,
  messages: [],
  dimensions: defaultParsed.dimensions,
  weightPreset: "OVERALL_CAREER",
  userScoreSum: 0,
  aiScoreSum: 0,
  challengeAudits: [],
  finalReport: null,
  activeTab: "feed",
  busy: false,

  setRawTopicInput: (val) => set({ rawTopicInput: val }),

  loadTopic: (query) => {
    const parsed = parseUserTopic(query);
    set({
      rawTopicInput: query,
      parsedTopic: parsed,
      dimensions: parsed.dimensions,
      messages: [],
      currentRound: 1,
      userScoreSum: 0,
      aiScoreSum: 0,
      challengeAudits: [],
      finalReport: null,
      userSide: "A",
      userStance: `In the debate of ${parsed.entityA} vs ${parsed.entityB}, ${parsed.entityA} offers higher peak leverage and structural influence.`,
    });
  },

  setMode: (mode) => set({ mode }),

  setUserSide: (side, customText) => {
    const { parsedTopic } = get();
    let userStance = "";
    if (side === "A") {
      userStance = `${parsedTopic.entityA} demonstrates greater technical mastery and match impact.`;
    } else if (side === "B") {
      userStance = `${parsedTopic.entityB} provides superior decisive execution and big-game ruthlessness.`;
    } else if (side === "neutral") {
      userStance = "Evaluating purely on verified data and tactical trade-offs without initial bias.";
    } else {
      userStance = customText || get().userStance;
    }
    set({ userSide: side, userStance });
  },

  setAiPersona: (aiPersona) => set({ aiPersona }),
  setSecondAiPersona: (secondAiPersona) => set({ secondAiPersona }),
  toggleJudge: () => set((state) => ({ includeJudge: !state.includeJudge })),

  setWeightPreset: (preset) => {
    const updated = applyWeightPreset(get().dimensions, preset);
    set({ weightPreset: preset, dimensions: updated });
  },

  updateDimensionWeight: (id, newWeight) => {
    const updated = get().dimensions.map((d) => (d.id === id ? { ...d, weight: Math.max(0, Math.min(100, newWeight)) } : d));
    set({ dimensions: updated, weightPreset: "CUSTOM" });
  },

  addMessage: (msg) => {
    const nextRound = msg.speaker === "user" ? get().currentRound + 1 : get().currentRound;
    const userDelta = msg.speaker === "user" ? (msg.analysis?.totalScore ?? 80) : 0;
    const aiDelta = msg.speaker !== "user" && msg.speaker !== "chair" ? 82 : 0;

    set((state) => ({
      messages: [...state.messages, msg],
      currentRound: nextRound,
      userScoreSum: state.userScoreSum + userDelta,
      aiScoreSum: state.aiScoreSum + aiDelta,
    }));

    if (nextRound > get().maxRounds && !get().finalReport) {
      get().finalizeDebate();
    }
  },

  submitChallenge: (targetClaim, userArgument) => {
    const audit = auditUserChallenge({
      turn: get().currentRound,
      originalClaim: targetClaim,
      userArgument,
      topic: get().parsedTopic,
    });

    set((state) => ({
      challengeAudits: [audit, ...state.challengeAudits],
      userScoreSum: audit.verdict === "USER_CORRECT" ? state.userScoreSum + 10 : state.userScoreSum,
    }));
  },

  finalizeDebate: () => {
    const { parsedTopic, userStance, aiPersona, messages, dimensions, userScoreSum, aiScoreSum } = get();
    const report = synthesizeFinalJudgment({
      topic: parsedTopic,
      userStance,
      aiPersona,
      messages,
      dimensions,
      userScoreSum,
      aiScoreSum,
    });

    set({ finalReport: report, activeTab: "report" });
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setBusy: (busy) => set({ busy }),

  resetDebate: () => {
    const defaultP = parseUserTopic(get().rawTopicInput || "Messi vs Ronaldo");
    set({
      parsedTopic: defaultP,
      dimensions: defaultP.dimensions,
      messages: [],
      currentRound: 1,
      userScoreSum: 0,
      aiScoreSum: 0,
      challengeAudits: [],
      finalReport: null,
      activeTab: "feed",
    });
  },
}));
