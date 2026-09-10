import { create } from "zustand";
import type { DebateCategory, DebateMessage, DebatePersona, DebateTopic } from "@/lib/types";
import { DEBATE_TOPICS } from "@/lib/debate/personas";

interface DebateStore {
  topic: DebateTopic;
  category: DebateCategory;
  stance: string;
  aiPersona: DebatePersona;
  includeChair: boolean;
  messages: DebateMessage[];
  setCategory: (c: DebateCategory) => void;
  setTopic: (id: string) => void;
  setStance: (s: string) => void;
  setPersona: (p: DebatePersona) => void;
  toggleChair: () => void;
  push: (m: Omit<DebateMessage, "id" | "ts">) => void;
  reset: () => void;
}

export const useDebateStore = create<DebateStore>((set, get) => ({
  topic: DEBATE_TOPICS[0],
  category: "historic",
  stance: "Positional play breaks any low block given enough rest-defense discipline.",
  aiPersona: "anvil",
  includeChair: true,
  messages: [],
  setCategory: (category) => {
    const topic = DEBATE_TOPICS.find((t) => t.category === category) ?? DEBATE_TOPICS[0];
    set({ category, topic, messages: [] });
  },
  setTopic: (id) => {
    const topic = DEBATE_TOPICS.find((t) => t.id === id) ?? get().topic;
    set({ topic, messages: [] });
  },
  setStance: (stance) => set({ stance }),
  setPersona: (aiPersona) => set({ aiPersona }),
  toggleChair: () => set({ includeChair: !get().includeChair }),
  push: (m) =>
    set({
      messages: [
        ...get().messages,
        { ...m, id: `m-${Date.now()}-${Math.random().toString(16).slice(2)}`, ts: Date.now() },
      ],
    }),
  reset: () => set({ messages: [] }),
}));
