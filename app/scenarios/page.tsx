import { ScenarioBrowser } from "@/components/scenarios/ScenarioBrowser";

export const metadata = {
  title: "Tactical Scenarios Lab — Tactics OS",
  description: "Explore, search, and simulate 300+ tactical battle scenarios across all pitch zones and formations.",
};

export default function ScenariosPage() {
  return (
    <div>
      <ScenarioBrowser />
    </div>
  );
}
