import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const isProofHash = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);

const isDecision = (value: unknown): value is "APPROVE" | "REVIEW_REQUIRED" | "DECLINE" =>
  value === "APPROVE" || value === "REVIEW_REQUIRED" || value === "DECLINE";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!isProofHash(body.proofHash) || !isDecision(body.decision)) {
      return NextResponse.json(
        { success: false, error: "Invalid proof payload." },
        { status: 400 },
      );
    }

    const trustScore = Number(body.trustScore);
    if (!Number.isInteger(trustScore) || trustScore < 0 || trustScore > 100) {
      return NextResponse.json(
        { success: false, error: "Trust score must be an integer from 0 to 100." },
        { status: 400 },
      );
    }

    const nodeAddress = process.env.CASPER_NODE_ADDRESS;
    const secretKeyPath = process.env.CASPER_SECRET_KEY_PATH;
    const chainName = process.env.CASPER_CHAIN_NAME ?? "casper-test";
    const contractPackageHash =
      process.env.CASPER_CONTRACT_PACKAGE_HASH ??
      "dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05";

    if (!nodeAddress || !secretKeyPath) {
      return NextResponse.json(
        {
          success: false,
          code: "CASPER_SIGNER_NOT_CONFIGURED",
          error:
            "Casper proof anchoring is not configured in this deployment. Configure the secure signer environment before anchoring a proof.",
        },
        { status: 503 },
      );
    }

    const sessionArgs = JSON.stringify([
      { name: "user_id", type: "String", value: body.proofHash },
      { name: "trust_score", type: "U64", value: trustScore },
      { name: "kyc_status", type: "Bool", value: Boolean(body.identityEvidence) },
      { name: "ai_decision", type: "String", value: body.decision },
    ]);

    const { stdout } = await execFileAsync("casper-client", [
      "put-deploy",
      "--node-address",
      nodeAddress,
      "--chain-name",
      chainName,
      "--secret-key",
      secretKeyPath,
      "--payment-amount",
      "3000000000",
      "--session-package-hash",
      contractPackageHash,
      "--session-entry-point",
      "register_user",
      "--session-args-json",
      sessionArgs,
    ]);

    return NextResponse.json({
      success: true,
      network: "Casper Testnet",
      contractPackageHash,
      result: stdout,
      message: "A privacy-preserving proof hash was submitted to Casper.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Casper anchoring failed. Verify the secure signer, contract package hash, and network configuration.",
      },
      { status: 500 },
    );
  }
}
