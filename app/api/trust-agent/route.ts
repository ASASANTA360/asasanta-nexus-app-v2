import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    trustScore: 95,
    aiDecision: "TRUSTED",
  });
}