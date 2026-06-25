# Asasanta Trust Agent

> AI-assisted trust-review MVP with explainable scoring and privacy-preserving Casper Testnet proof anchoring.

## What it demonstrates

Asasanta Trust Agent is a hackathon prototype for structured trust review. A reviewer enters non-sensitive demo signals, receives a transparent score and decision, generates a SHA-256 proof receipt, and can optionally anchor only that proof hash on Casper Testnet.

The MVP is intentionally designed to **avoid collecting raw government identifiers, BVN/NIN values, phone numbers, email addresses, or document images**.

## Core workflow

1. Enter a non-sensitive demo case reference and review signals.
2. Run the deterministic, explainable trust engine.
3. Review the score breakdown, risk level, decision, and reviewer signals.
4. Generate a privacy-preserving SHA-256 proof fingerprint.
5. Optionally submit the proof hash, score, and decision metadata to the Casper Testnet contract.

## Technical features

- **Explainable trust engine**: deterministic scoring with visible positive and negative factors.
- **Decision guardrails**: `APPROVE`, `REVIEW_REQUIRED`, and `DECLINE` are based on defined thresholds.
- **Privacy-first receipts**: only a generated proof hash is eligible for on-chain anchoring.
- **Casper Testnet integration**: contract entry point `register_user` receives a proof reference rather than raw identity data.
- **Downloadable audit receipt**: users can export a JSON receipt containing the score, decision, timestamp, and proof fingerprint.
- **Clear MVP limitations**: this app is not a government identity provider and does not replace KYC, AML, legal, or compliance processes.

## Architecture

```text
Demo reviewer
  ↓
Next.js Trust Agent UI
  ↓
/api/trust-agent
  ↓
lib/trust-engine.ts
  ↓
Explainable assessment + SHA-256 proof receipt
  ↓
/api/casper/register (optional, secure signer required)
  ↓
Casper Testnet contract: register_user
```

## Casper integration

The current MVP references this Casper Testnet contract package hash:

```text
dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05
```

For local or secure server deployment, configure the following environment variables. Do not commit a secret key to the repository.

```bash
CASPER_NODE_ADDRESS=http://YOUR_CASPER_RPC_HOST:7777/rpc
CASPER_CHAIN_NAME=casper-test
CASPER_SECRET_KEY_PATH=/secure/path/to/secret_key.pem
CASPER_CONTRACT_PACKAGE_HASH=dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05
```

When the secure signer is not configured, the UI reports that on-chain anchoring is unavailable rather than returning a fake success state.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo script

1. Open the landing page and explain the privacy-first scope.
2. Launch `/trust-agent`.
3. Enter a demo case reference such as `DEMO-TRUST-001`.
4. Run the assessment and show the score breakdown.
5. Copy or download the proof receipt.
6. Explain that the Casper step anchors only the proof hash, not raw identity data.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Casper JavaScript SDK / Casper client integration
- MongoDB (available for future persisted audit records)

## Important limitations

- The score is a deterministic demo model, not a credit score or official KYC result.
- The app must not be used to make legal, employment, lending, immigration, insurance, or other high-impact automated decisions.
- A production system should use verified evidence providers, human oversight, consent management, access controls, audit retention policies, and a dedicated secure signer service.

## Built for

Casper Agentic Buildathon · Asasanta Global Technologies
