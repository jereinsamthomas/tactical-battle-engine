import { AnalyticsSandbox } from "@/components/analytics/AnalyticsSandbox";

export const metadata = {
  title: "Decision Engine Analytics Sandbox — Tactics OS",
  description:
    "Interactive calculators for Space Value, Pressure Index, Action Rankings, and Player Fatigue Curves.",
};

export default function AnalyticsPage() {
  return (
    <div>
      <AnalyticsSandbox />
    </div>
  );
}
