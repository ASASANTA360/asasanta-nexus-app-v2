import {
  x402Client,
  x402HTTPClient,
  wrapFetchWithPayment,
  type PaymentRequirements,
} from "@x402/fetch";
import { createClientCasperSigner } from "@make-software/casper-x402";
import { ExactCasperScheme } from "@make-software/casper-x402/exact/client";
import casperSdk from "casper-js-sdk";

const { KeyAlgorithm } = casperSdk;

const privateKeyPath = process.env.CLIENT_PRIVATE_KEY_PATH?.trim();
const keyAlgorithm = process.env.CLIENT_KEY_ALGO?.trim().toLowerCase();
const url =
  process.env.X402_TEST_URL?.trim() ||
  "https://asasanta-nexus-app-v2-ws55.vercel.app/api/x402/trust-report";

if (!privateKeyPath) {
  throw new Error(
    "CLIENT_PRIVATE_KEY_PATH is missing. Set it to the local PEM private-key path.",
  );
}

const algorithm =
  keyAlgorithm === "secp256k1"
    ? KeyAlgorithm.SECP256K1
    : KeyAlgorithm.ED25519;

const signer = await createClientCasperSigner(
  privateKeyPath,
  algorithm,
);

const selectPayment = (
  _version: number,
  options: PaymentRequirements[],
): PaymentRequirements => {
  const casperTestnet = options.find(
    option =>
      option.network === "casper:casper-test" &&
      option.scheme === "exact",
  );

  if (!casperTestnet) {
    throw new Error(
      "The server did not offer a compatible Casper Testnet payment option.",
    );
  }

  return casperTestnet;
};

const client = new x402Client(selectPayment).register(
  "casper:*",
  new ExactCasperScheme(signer),
);

const fetchWithPayment = wrapFetchWithPayment(fetch, client);

console.log("Requesting protected x402 endpoint...");

const response = await fetchWithPayment(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});

const body = await response.text();

console.log("HTTP status:", response.status);
console.log("Response body:", body);

const paymentResponse = new x402HTTPClient(
  client,
).getPaymentSettleResponse(name => response.headers.get(name));

if (paymentResponse) {
  console.log("Payment settlement:", paymentResponse);
} else {
  console.log("No PAYMENT-RESPONSE header was returned.");
}

if (!response.ok) {
  process.exitCode = 1;
}
