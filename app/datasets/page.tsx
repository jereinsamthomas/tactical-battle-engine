import { DatasetManager } from "@/components/datasets/DatasetManager";

export const metadata = {
  title: "Dataset Manager & Knowledge Ingestion — Tactics OS",
  description:
    "Add, import, validate, and persist custom tactical rules and battle scenarios into Tactics OS.",
};

export default function DatasetsPage() {
  return (
    <div>
      <DatasetManager />
    </div>
  );
}
