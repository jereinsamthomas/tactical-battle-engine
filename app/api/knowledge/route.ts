import { NextResponse } from "next/server";
import { knowledgeBundle } from "@/lib/knowledge";

export async function GET() {
  return NextResponse.json(knowledgeBundle());
}
