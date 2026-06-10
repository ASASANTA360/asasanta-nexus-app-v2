import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TrustProof from "@/models/TrustProof";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const proof = await TrustProof.create({
      userId: body.userId,
      trustScore: body.trustScore,
      decision: body.decision,
      txHash: body.txHash,
      network: "Pharos Atlantic Testnet",
    });

    return NextResponse.json({
      success: true,
      proof,
    });

  } catch (error) {
    console.error("Save blockchain proof error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save proof",
      },
      {
        status: 500,
      }
    );
  }
}