import { NextRequest, NextResponse } from "next/server";
import { withX402, x402ResourceServer } from "@x402/next";
import {
  HTTPFacilitatorClient,
  type FacilitatorConfig,
} from "@x402/core/server";
import type { AssetAmount, Network } from "@x402/core/types";
import { ExactCasperScheme } from "@make-software/casper-x402/exact/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name]?.trim() || fallback;

  if (!value) {
    throw new Error(`${name} is missing.`);
  }

  return value;
}

const facilitatorUrl = readEnv(
  "X402_FACILITATOR_URL",
  "https://x402-facilitator.cspr.cloud",
);

const apiKey = readEnv("CSPR_CLOUD_API_KEY");

const network = readEnv(
  "X402_NETWORK",
  "casper:casper-test",
) as Network;

const assetPackage = readEnv("X402_ASSET_PACKAGE")
  .replace(/^hash-/, "");

const assetName = readEnv(
  "X402_ASSET_NAME",
  "Wrapped CSPR",
);

const assetSymbol = readEnv(
  "X402_ASSET_SYMBOL",
  "WCSPR",
);

const assetVersion = readEnv(
  "X402_ASSET_VERSION",
  "1",
);

const priceAmount = readEnv(
  "X402_PRICE_AMOUNT",
  "1000000",
);

const payeeAddress = readEnv("X402_PAYEE_ADDRESS")
  .replace(/^account-hash-/, "00");

const decimals = Number.parseInt(
  readEnv("X402_ASSET_DECIMALS", "9"),
  10,
);

if (!/^[0-9a-fA-F]{64}$/.test(assetPackage)) {
  throw new Error(
    "X402_ASSET_PACKAGE must contain 64 hexadecimal characters.",
  );
}

if (!/^(00|01)[0-9a-fA-F]{64}$/.test(payeeAddress)) {
  throw new Error(
    "X402_PAYEE_ADDRESS must be a valid Casper account hash.",
  );
}

if (!/^\d+$/.test(priceAmount)) {
  throw new Error(
    "X402_PRICE_AMOUNT must be an atomic integer amount.",
  );
}

if (!Number.isInteger(decimals) || decimals < 0) {
  throw new Error("X402_ASSET_DECIMALS is invalid.");
}

const authHeaders = {
  Authorization: apiKey,
};

const facilitatorConfig: FacilitatorConfig = {
  url: facilitatorUrl,
  createAuthHeaders: async () => ({
    verify: authHeaders,
    settle: authHeaders,
    supported: authHeaders,
    bazaar: authHeaders,
  }),
};

const facilitatorClient =
  new HTTPFacilitatorClient(facilitatorConfig);

const casperScheme = new ExactCasperScheme()
  .registerAsset(network, assetPackage, decimals);

const resourceServer = new x402ResourceServer(
  facilitatorClient,
).register(network, casperScheme);

const price: AssetAmount = {
  asset: assetPackage,
  amount: priceAmount,
  extra: {
    name: assetName,
    symbol: assetSymbol,
    version: assetVersion,
    decimals: String(decimals),
  },
};

async function handler(_request: NextRequest) {
  return NextResponse.json({
    ok: true,
    service: "Asasanta Trust Agent Premium Report",
    payment: {
      protocol: "x402",
      network,
      asset: assetSymbol,
      amountAtomic: priceAmount,
    },
    report: {
      trustScore: 88,
      riskLevel: "LOW",
      recommendation: "APPROVE",
      verificationSource: "Asasanta Trust Agent",
      generatedAt: new Date().toISOString(),
    },
  });
}

export const GET = withX402(
  handler,
  {
    accepts: {
      scheme: "exact",
      network,
      payTo: payeeAddress,
      price,
      maxTimeoutSeconds: 120,
    },
    description:
      "Access an Asasanta Trust Agent premium risk report.",
    mimeType: "application/json",
    unpaidResponseBody: async () => ({
      contentType: "application/json",
      body: {
        ok: false,
        error: "Payment required",
        protocol: "x402",
        network,
        asset: assetSymbol,
        amountAtomic: priceAmount,
      },
    }),
  },
  resourceServer,
);
