import { createHash, randomUUID } from "crypto";

export type TrustDecision = "APPROVE" | "REVIEW_REQUIRED" | "DECLINE";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type TrustAssessmentInput = {
  caseReference: string;
  identityEvidence: boolean;
  contactEvidence: boolean;
  walletAgeDays: number;
  transactionCount: number;
  flaggedSignals: number;
};

export type TrustAssessment = {
  verificationId: string;
  createdAt: string;
  trustScore: number;
  decision: TrustDecision;
  riskLevel: RiskLevel;
  scoreBreakdown: Array<{ label: string; points: number; detail: string }>;
  signals: string[];
  proofHash: string;
  assessmentVersion: string;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

function walletHistoryPoints(days: number) {
  if (days >= 365) return 15;
  if (days >= 180) return 12;
  if (days >= 90) return 8;
  if (days >= 30) return 4;
  return 0;
}

function transactionPoints(count: number) {
  if (count >= 100) return 15;
  if (count >= 25) return 12;
  if (count >= 10) return 8;
  if (count >= 3) return 4;
  return 0;
}

export function assessTrust(input: TrustAssessmentInput): TrustAssessment {
  const normalized = {
    caseReference: input.caseReference.trim().toUpperCase(),
    identityEvidence: Boolean(input.identityEvidence),
    contactEvidence: Boolean(input.contactEvidence),
    walletAgeDays: clamp(Math.floor(Number(input.walletAgeDays) || 0), 0, 36500),
    transactionCount: clamp(Math.floor(Number(input.transactionCount) || 0), 0, 1000000),
    flaggedSignals: clamp(Math.floor(Number(input.flaggedSignals) || 0), 0, 3),
  };

  const breakdown = [
    {
      label: "Base assessment",
      points: 35,
      detail: "Baseline score for a structured demo review.",
    },
    {
      label: "Identity evidence",
      points: normalized.identityEvidence ? 25 : 0,
      detail: normalized.identityEvidence
        ? "Demo evidence was marked as reviewed."
        : "No identity-evidence attestation was provided.",
    },
    {
      label: "Contact evidence",
      points: normalized.contactEvidence ? 10 : 0,
      detail: normalized.contactEvidence
        ? "Demo contact evidence was marked as available."
        : "No contact-evidence attestation was provided.",
    },
    {
      label: "Wallet history",
      points: walletHistoryPoints(normalized.walletAgeDays),
      detail: `${normalized.walletAgeDays} day(s) supplied for the demo profile.`,
    },
    {
      label: "Transaction activity",
      points: transactionPoints(normalized.transactionCount),
      detail: `${normalized.transactionCount} transaction(s) supplied for the demo profile.`,
    },
    {
      label: "Flagged risk signals",
      points: normalized.flaggedSignals * -15,
      detail:
        normalized.flaggedSignals === 0
          ? "No self-reported risk flags."
          : `${normalized.flaggedSignals} self-reported risk signal(s) require reviewer attention.`,
    },
  ];

  const trustScore = clamp(
    breakdown.reduce((total, item) => total + item.points, 0),
    0,
    100,
  );

  const riskLevel: RiskLevel = trustScore >= 75 ? "LOW" : trustScore >= 50 ? "MEDIUM" : "HIGH";
  const decision: TrustDecision =
    trustScore >= 80 && normalized.flaggedSignals === 0
      ? "APPROVE"
      : trustScore >= 50
        ? "REVIEW_REQUIRED"
        : "DECLINE";

  const signals = [
    normalized.identityEvidence
      ? "Identity evidence is marked as reviewed for this demo."
      : "Identity evidence was not attested in this demo.",
    normalized.contactEvidence
      ? "Contact evidence is marked as available for this demo."
      : "Contact evidence was not attested in this demo.",
    normalized.walletAgeDays >= 180
      ? "The supplied wallet-history value indicates an established profile."
      : "The supplied wallet-history value indicates a newer or limited profile.",
    normalized.transactionCount >= 25
      ? "The supplied transaction value indicates recurring activity."
      : "The supplied transaction value indicates limited activity.",
    normalized.flaggedSignals === 0
      ? "No self-reported risk flags were supplied."
      : `${normalized.flaggedSignals} self-reported risk flag(s) should be reviewed by a human operator.`,
  ];

  const verificationId = `ATA-${randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()}`;
  const createdAt = new Date().toISOString();
  const proofPayload = {
    verificationId,
    createdAt,
    caseReference: normalized.caseReference,
    trustScore,
    decision,
    riskLevel,
    assessmentVersion: "trust-engine-v1",
  };

  const proofHash = createHash("sha256")
    .update(JSON.stringify(proofPayload))
    .digest("hex");

  return {
    verificationId,
    createdAt,
    trustScore,
    decision,
    riskLevel,
    scoreBreakdown: breakdown,
    signals,
    proofHash,
    assessmentVersion: "trust-engine-v1",
  };
}
