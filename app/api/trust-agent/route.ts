import { NextResponse } from "next/server";
import { assessTrust } from "@/lib/trust-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const caseReference = String(body.caseReference ?? "").trim();

    if (caseReference.length < 3 || caseReference.length > 64) {
      return NextResponse.json(
        {
          success: false,
          error: "Use a non-sensitive demo case reference between 3 and 64 characters.",
        },
        { status: 400 },
      );
    }

    const assessment = assessTrust({
      caseReference,
      identityEvidence: Boolean(body.identityEvidence),
      contactEvidence: Boolean(body.contactEvidence),
      walletAgeDays: Number(body.walletAgeDays),
      transactionCount: Number(body.transactionCount),
      flaggedSignals: Number(body.flaggedSignals),
    });

    return NextResponse.json({
      success: true,
      mode: "deterministic-demo-engine",
      assessment,
      privacyNotice:
        "This demo does not require NIN, BVN, email, phone number, or raw identity-document data.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process the trust assessment. Please check the submitted demo values.",
      },
      { status: 400 },
    );
  }
}
