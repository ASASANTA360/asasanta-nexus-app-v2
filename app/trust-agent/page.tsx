"use client";

import { useState } from "react";

type Decision = "APPROVE" | "REVIEW_REQUIRED" | "DECLINE";
type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

type Assessment = {
  verificationId: string;
  createdAt: string;
  trustScore: number;
  decision: Decision;
  riskLevel: RiskLevel;
  scoreBreakdown: Array<{ label: string; points: number; detail: string }>;
  signals: string[];
  proofHash: string;
  assessmentVersion: string;
};

const contractPackageHash =
  "dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05";

const riskStyles: Record<RiskLevel, string> = {
  LOW: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  MEDIUM: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  HIGH: "border-rose-300/25 bg-rose-300/10 text-rose-100",
};

export default function TrustAgentPage() {
  const [form, setForm] = useState({
    caseReference: "DEMO-TRUST-001",
    identityEvidence: true,
    contactEvidence: true,
    walletAgeDays: 240,
    transactionCount: 36,
    flaggedSignals: 0,
  });
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [anchoring, setAnchoring] = useState(false);
  const [anchorMessage, setAnchorMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      setAnchorMessage(null);

      const response = await fetch("/api/trust-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to run the trust assessment.");
      }

      setAssessment(data.assessment);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to run the trust assessment.");
    } finally {
      setLoading(false);
    }
  };

  const copyProof = async () => {
    if (!assessment) return;
    await navigator.clipboard.writeText(assessment.proofHash);
    setAnchorMessage("Proof fingerprint copied to clipboard.");
  };

  const downloadReceipt = () => {
    if (!assessment) return;
    const payload = {
      product: "Asasanta Trust Agent",
      purpose: "Hackathon MVP receipt",
      ...assessment,
      privacy: "No government ID numbers, email addresses, phone numbers, or document images are included in this receipt.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assessment.verificationId}-receipt.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const anchorOnCasper = async () => {
    if (!assessment) return;
    try {
      setAnchoring(true);
      setAnchorMessage(null);
      const response = await fetch("/api/casper/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proofHash: assessment.proofHash,
          trustScore: assessment.trustScore,
          decision: assessment.decision,
          identityEvidence: form.identityEvidence,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to anchor the proof on Casper.");
      }

      setAnchorMessage("Proof submitted to Casper Testnet. Check the returned deployment output in your configured signer environment.");
    } catch (reason) {
      setAnchorMessage(
        reason instanceof Error
          ? reason.message
          : "Unable to anchor the proof on Casper.",
      );
    } finally {
      setAnchoring(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_30%),radial-gradient(circle_at_20%_20%,_rgba(99,102,241,0.13),_transparent_26%)]" />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 font-black text-slate-950">A</span>
            Asasanta Trust Agent
          </a>
          <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-semibold text-cyan-100">
            Privacy-first MVP · Casper Testnet
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Explainable trust review</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Run a transparent assessment, generate a proof receipt, then anchor only the hash.</h1>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            This MVP uses non-sensitive demo inputs. It does not request NIN, BVN, phone numbers, email addresses, or document images.
          </p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm text-slate-400">Step 1</p>
                <h2 className="mt-1 text-2xl font-bold">Demo assessment inputs</h2>
              </div>
              <span className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-300">NO PII</span>
            </div>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Case reference</span>
                <input
                  value={form.caseReference}
                  onChange={(event) => setForm({ ...form, caseReference: event.target.value })}
                  maxLength={64}
                  placeholder="DEMO-TRUST-001"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none ring-cyan-300/30 transition focus:ring-2"
                />
                <span className="mt-2 block text-xs leading-5 text-slate-500">Use a non-sensitive case label. Do not enter names, ID numbers, phone numbers, or email addresses.</span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.identityEvidence}
                      onChange={(event) => setForm({ ...form, identityEvidence: event.target.checked })}
                      className="mt-1 h-4 w-4 accent-cyan-300"
                    />
                    <span>
                      <span className="block font-medium">Identity evidence reviewed</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">Demo attestation only; not an official verification result.</span>
                    </span>
                  </div>
                </label>

                <label className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.contactEvidence}
                      onChange={(event) => setForm({ ...form, contactEvidence: event.target.checked })}
                      className="mt-1 h-4 w-4 accent-cyan-300"
                    />
                    <span>
                      <span className="block font-medium">Contact evidence available</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">Demo attestation only; no contact data is collected.</span>
                    </span>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-200">Wallet history (days)</span>
                  <input
                    type="number"
                    min="0"
                    value={form.walletAgeDays}
                    onChange={(event) => setForm({ ...form, walletAgeDays: Number(event.target.value) })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-2"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-200">Transaction count</span>
                  <input
                    type="number"
                    min="0"
                    value={form.transactionCount}
                    onChange={(event) => setForm({ ...form, transactionCount: Number(event.target.value) })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-2"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">Self-reported risk signals</span>
                <select
                  value={form.flaggedSignals}
                  onChange={(event) => setForm({ ...form, flaggedSignals: Number(event.target.value) })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-2"
                >
                  <option value={0}>0 — no risk signals reported</option>
                  <option value={1}>1 — minor signal for review</option>
                  <option value={2}>2 — multiple signals for review</option>
                  <option value={3}>3 — high review priority</option>
                </select>
              </label>

              <button
                onClick={runAssessment}
                disabled={loading}
                className="w-full rounded-2xl bg-cyan-300 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Running assessment…" : "Run explainable trust assessment"}
              </button>

              {error && <p className="rounded-xl border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-100">{error}</p>}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 sm:p-8">
            {!assessment ? (
              <div className="flex h-full min-h-[520px] flex-col justify-center rounded-2xl border border-dashed border-white/15 bg-black/15 p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-200/10 text-2xl text-cyan-200">✦</span>
                <h2 className="mt-5 text-2xl font-bold">Your evidence receipt will appear here</h2>
                <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
                  The result will show a deterministic score breakdown, reviewer signals, a tamper-evident proof fingerprint, and Casper anchoring status.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Step 2 · Assessment receipt</p>
                    <h2 className="mt-1 text-2xl font-bold">{assessment.verificationId}</h2>
                    <p className="mt-2 text-sm text-slate-400">{new Date(assessment.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${riskStyles[assessment.riskLevel]}`}>
                    {assessment.riskLevel} RISK
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-5">
                    <p className="text-sm text-slate-400">Trust score</p>
                    <p className="mt-2 text-6xl font-black text-cyan-100">{assessment.trustScore}</p>
                    <p className="mt-1 text-sm text-slate-300">out of 100</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-slate-400">Decision</p>
                    <p className="mt-2 text-2xl font-black">{assessment.decision.replace("_", " ")}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {assessment.decision === "APPROVE"
                        ? "The demo profile meets the configured threshold. A human reviewer remains responsible for final use decisions."
                        : assessment.decision === "REVIEW_REQUIRED"
                          ? "The demo profile needs human review before any next step."
                          : "The demo profile does not meet the configured threshold."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="font-bold">Explainable score breakdown</h3>
                  <div className="mt-4 space-y-3">
                    {assessment.scoreBreakdown.map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</p>
                        </div>
                        <span className={`shrink-0 text-sm font-bold ${item.points >= 0 ? "text-cyan-200" : "text-rose-200"}`}>
                          {item.points > 0 ? "+" : ""}{item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="font-bold">Reviewer signals</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    {assessment.signals.map((signal) => (
                      <li key={signal} className="flex gap-3"><span className="text-cyan-300">•</span>{signal}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.05] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-cyan-100">Step 3 · Privacy-preserving proof</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">Only this SHA-256 fingerprint is eligible for Casper anchoring.</p>
                    </div>
                    <span className="rounded-lg border border-cyan-200/20 px-2.5 py-1 text-xs text-cyan-100">SHA-256</span>
                  </div>
                  <code className="mt-4 block break-all rounded-xl bg-black/30 p-3 text-xs leading-6 text-cyan-100">{assessment.proofHash}</code>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button onClick={copyProof} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/5">Copy fingerprint</button>
                    <button onClick={downloadReceipt} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/5">Download JSON receipt</button>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">Casper Testnet anchoring</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">Configured contract: {contractPackageHash.slice(0, 12)}…{contractPackageHash.slice(-8)}</p>
                    </div>
                    <button
                      onClick={anchorOnCasper}
                      disabled={anchoring}
                      className="rounded-xl bg-indigo-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {anchoring ? "Anchoring…" : "Anchor proof on Casper"}
                    </button>
                  </div>
                  {anchorMessage && <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-6 text-slate-300">{anchorMessage}</p>}
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Data minimization", "The workflow uses a case reference and demo signals instead of raw personal identity data."],
            ["Explainability", "Every point added or deducted is visible to the reviewer, rather than hidden behind an opaque score."],
            ["Testnet audit trail", "The Casper layer is designed to anchor only the receipt fingerprint, not the assessment inputs."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
