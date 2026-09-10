import { NextResponse } from "next/server";
import { simulateBattleTurn } from "@/lib/simulation";
import type { BattleTurnRequest } from "@/lib/types";

export async function POST(req: Request) {
  const body = (await req.json()) as BattleTurnRequest;
  if (!body?.pitchState || !body?.userAction) {
    return NextResponse.json({ error: "Invalid BattleTurnRequest" }, { status: 400 });
  }
  const result = simulateBattleTurn(body);
  return NextResponse.json(result);
}
