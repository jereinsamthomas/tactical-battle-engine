import { SetupForm } from "@/components/battle/SetupForm";

export default function SetupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Tactical setup</h1>
        <p className="text-sm text-zinc-400">Ingest philosophy, formation morphs, and line height before battle.</p>
      </div>
      <SetupForm />
    </div>
  );
}
