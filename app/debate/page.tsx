import { DebateArena } from "@/components/debate/DebateArena";

export const metadata = {
  title: "Open Football Debate Engine | Tactics OS",
  description:
    "Adversarial AI football reasoning, live-verified statistics, tactical board simulation, and multi-dimensional debate scoring.",
};

export default function DebatePage() {
  return (
    <div className="space-y-4">
      <DebateArena />
    </div>
  );
}
