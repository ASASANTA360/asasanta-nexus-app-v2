import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TrustProof from "@/models/TrustProof";

export async function GET() {
  try {
    await connectDB();

    const records = await TrustProof
      .find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      records,
    });

  } catch (error) {

    console.error(
      "Blockchain records error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load records",
      },
      {
        status: 500,
      }
    );
  }
}