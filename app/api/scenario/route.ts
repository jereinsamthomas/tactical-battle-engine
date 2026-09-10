import { NextResponse } from "next/server";
import { generateOpeningDilemma } from "@/lib/simulation";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(generateOpeningDilemma(body.userTacticalProfile ?? body));
}
