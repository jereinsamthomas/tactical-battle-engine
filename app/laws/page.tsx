import { LawsBrowser } from "@/components/laws/LawsBrowser";

export const metadata = {
  title: "IFAB Laws of the Game 2026/27 — Tactics OS",
  description:
    "Official IFAB 2026/27 Laws of the Game analyzed for tactical mechanics, offside rules, and new protocols.",
};

export default function LawsPage() {
  return (
    <div>
      <LawsBrowser />
    </div>
  );
}
