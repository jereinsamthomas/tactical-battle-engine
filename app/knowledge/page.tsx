import { KnowledgeBrowser } from "@/components/knowledge/KnowledgeBrowser";

export default function KnowledgePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Tactical knowledge base</h1>
      <p className="text-sm text-zinc-400">
        Coaching-manual rules compiled for the battle AI. Distinguish universal principles (offside, compactness)
        from stylistic preferences (tiki-taka vs low block).
      </p>
      <KnowledgeBrowser />
    </div>
  );
}
