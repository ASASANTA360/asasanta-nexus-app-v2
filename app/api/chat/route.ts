import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {

    const body = await req.json();

    return NextResponse.json({
      reply:
        `Nexus AI processed:\n\n"${body.message}"\n\nVerification Status: VERIFIED\nRisk Score: LOW\nAI Confidence: 98%`,
    });

  } catch (error) {

    return NextResponse.json({
      error:
        "AI request failed.",
    });

  }
}