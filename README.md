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

Casper Testnet Integration

Contract package hash:
dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05

The MVP anchors only a privacy-preserving proof hash on Casper Testnet. It does not store BVN, NIN, phone numbers, emails, document images, or raw identity data on-chain.

Testing steps:
1. Open the live demo.
2. Go to /trust-agent.
3. Enter a demo case reference such as DEMO-TRUST-001.
4. Run the trust assessment.
5. Review the score breakdown and decision.
6. Generate/download the proof receipt.
7. If secure signer is configured, submit the proof hash to Casper Testnet.
8. Confirm that only proof hash, score, and decision metadata are sent on-chain.

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

 ## Important Note

If secure signer environment variables are not configured, the UI clearly reports that on-chain anchoring is unavailable instead of returning a fake success state.

This ensures the MVP stays honest and transparent during testing. The app only allows Casper Testnet anchoring when the required secure signer configuration is available.

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

## Casper x402 Paid API

Asasanta Trust Agent includes a production x402-protected premium trust-report endpoint with real WCSPR settlement on Casper Testnet.

### Production endpoint

```text
GET https://asasanta-nexus-app-v2-ws55.vercel.app/api/x402/trust-report
```

An unpaid request returns:

```text
HTTP 402 Payment Required
```

### Payment configuration

- Protocol: x402 v2
- Scheme: `exact`
- Network: `casper:casper-test`
- Asset: Wrapped CSPR (`WCSPR`)
- Price: `1,000,000` atomic units (`0.001 WCSPR`)
- Settlement entry point: `transfer_with_authorization`
- WCSPR package hash: `3d80df21ba4ee4d66a2a1f60c32570dd5685e4b279f6538162a5fd1314847c1e`

### Verified end-to-end payment

```text
402 Payment Required
→ EIP-712 payment authorization
→ Facilitator verification
→ Casper Testnet settlement
→ 200 OK premium trust report
```

Successful Casper Testnet transaction:

```text
48b7e4b500d77167f434a2711d2144d42bf4f819ed24a87778034ba1ecb4973a
```

Successful response example:

```json
{
  "ok": true,
  "service": "Asasanta Trust Agent Premium Report",
  "payment": {
    "protocol": "x402",
    "network": "casper:casper-test",
    "asset": "WCSPR",
    "amountAtomic": "1000000"
  },
  "report": {
    "trustScore": 88,
    "riskLevel": "LOW",
    "recommendation": "APPROVE"
  }
}
```

### Test client

The repository includes:

```text
scripts/test-x402-client.ts
```

The test client reads the Casper private-key file path from an environment variable. Private keys, PEM files, API keys, and recovery phrases must never be committed to GitHub.