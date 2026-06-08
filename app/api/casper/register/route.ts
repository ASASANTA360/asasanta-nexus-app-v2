import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const args = JSON.stringify([
      {
        name: "user_id",
        type: "String",
        value: body.nin || "UNKNOWN",
      },
      {
        name: "trust_score",
        type: "U64",
        value: Number(body.trustScore),
      },
      {
        name: "kyc_status",
        type: "Bool",
        value: true,
      },
      {
        name: "ai_decision",
        type: "String",
        value: body.aiDecision,
      },
    ]);

    const command = `
~/.cargo/bin/casper-client put-deploy \
--node-address http://65.109.89.88:7777/rpc \
--chain-name casper-test \
--secret-key /home/asasanta/casper_new_keys/secret_key.pem \
--payment-amount 3000000000 \
--session-package-hash dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05 \
--session-entry-point register_user \
--session-args-json '${args}'
`;

    const { stdout } = await execAsync(command);

    return NextResponse.json({
      success: true,
      network: "Casper Testnet",
      result: stdout,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}