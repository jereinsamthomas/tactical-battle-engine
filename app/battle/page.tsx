import { BattleScreen } from "@/components/battle/BattleScreen";

export default function BattlePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Interactive 2D battle</h1>
      <BattleScreen />
    </div>
  );
}
