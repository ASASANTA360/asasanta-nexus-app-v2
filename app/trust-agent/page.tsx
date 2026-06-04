"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";
import jsPDF from "jspdf";

export default function TrustAgentPage() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState<number | null>(null);
const [risk, setRisk] = useState("");
const [analysis, setAnalysis] = useState("");

const [walletAge, setWalletAge] = useState("");
const [firstTxDate, setFirstTxDate] = useState("");
const [lastTxDate, setLastTxDate] = useState("");
const [txCount, setTxCount] = useState<number | null>(null);

const [recommendations, setRecommendations] = useState<string[]>([]);
const [signal, setSignal] = useState("");
const [reputation, setReputation] = useState("");
const [decision, setDecision] = useState("");


  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        alert("MetaMask not detected");
        return;
      }

      const provider = new BrowserProvider(ethereum);

      const accounts = await provider.send(
        "eth_requestAccounts",
        []
      );

      if (accounts.length > 0) {
        setWallet(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const analyzeWallet = async () => {
    if (!wallet) return;

    try {
      setLoading(true);

      const response = await fetch("/api/analyze-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet,
        }),
      });

      const data = await response.json();

console.log(data);

setScore(data.score);
setRisk(data.risk);
setAnalysis(data.analysis);

setSignal(data.signal || "");
setDecision(data.signal || "");
setReputation(data.reputation || "");

setWalletAge(data.walletAge || "");
setFirstTxDate(data.firstTxDate || "");
setLastTxDate(data.lastTxDate || "");
setTxCount(data.txCount || 0);

setRecommendations(data.recommendations || []);

    } catch (error) {
      console.error(error);

      setAnalysis("Failed to analyze wallet.");
    } finally {
      setLoading(false);
    }
  };

  const copyReport = async () => {
    const report = `
Wallet: ${wallet}

Trust Score: ${score}%

Risk Level: ${risk}

Analysis:
${analysis}

Recommendations:
${recommendations.join("\n")}
`;

    await navigator.clipboard.writeText(report);

    alert("Report copied successfully");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Asasanta AI Trust Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Wallet: ${wallet}`, 20, 40);
    doc.text(`Trust Score: ${score}%`, 20, 55);
    doc.text(`Risk Level: ${risk}`, 20, 70);

    doc.text("AI Analysis:", 20, 90);

    const lines = doc.splitTextToSize(
      analysis,
      160
    );

    doc.text(lines, 20, 105);

    let y = 140;

    doc.text("Recommendations:", 20, y);

    recommendations.forEach((item, index) => {
      y += 12;
      doc.text(`• ${item}`, 25, y);
    });

    doc.save("asasanta-trust-report.pdf");
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold">
            AI Trust Agent
          </h1>

          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
            Gemini AI Active
          </span>
        </div>

        <p className="text-gray-400 mb-10">
          AI-powered wallet intelligence and trust scoring system. Version 2
        </p>

        <div className="border border-white/10 rounded-3xl p-8 bg-[#050816]">

          <div className="flex gap-4 mb-6 flex-wrap">

            <button
              onClick={connectWallet}
              className="px-5 py-3 bg-purple-600 rounded-xl font-bold"
            >
              Connect MetaMask
            </button>

            <button
              onClick={analyzeWallet}
              disabled={loading}
              className="px-5 py-3 bg-cyan-400 text-black rounded-xl font-bold"
            >
              {loading ? "Analyzing..." : "Analyze Wallet"}
            </button>

          </div>

          <label className="block mb-3 text-gray-400">
            Wallet Address
          </label>

          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            type="text"
            placeholder="Enter wallet address..."
            className="w-full p-4 rounded-xl bg-black border border-white/10"
          />

        </div>

        {score !== null && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

              <div className="bg-[#050816] border border-white/10 rounded-3xl p-6">

                <p className="text-gray-400">
                  Trust Score
                </p>

                <h2 className="text-6xl font-black text-green-400 mt-4">
                  {score}%
                </h2>

                <div className="w-full h-3 bg-white/10 rounded-full mt-5">
                  <div
                    className="h-3 bg-green-400 rounded-full transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />
                </div>

              </div>

              <div className="bg-[#050816] border border-white/10 rounded-3xl p-6">

                <p className="text-gray-400">
                  Risk Level
                </p>

                <h2 className="text-4xl font-bold text-yellow-400 mt-4">
                  {risk}
                </h2>

              </div>

            </div>
            <div className="bg-[#050816] border border-white/10 rounded-3xl p-6">
  <p className="text-gray-400">
    AI Decision
  </p>

  <h2
    className={`text-4xl font-bold mt-4 ${
      decision === "Trade"
        ? "text-green-400"
        : decision === "Avoid"
        ? "text-red-400"
        : "text-yellow-400"
    }`}
  >
    {decision}
  </h2>
</div>
            <div className="bg-[#050816] border border-white/10 rounded-3xl p-6">
  <p className="text-gray-400">Trading Signal</p>
  <h2 className="text-4xl font-bold text-cyan-400 mt-4">
    {signal}
  </h2>
</div>

<div className="bg-[#050816] border border-white/10 rounded-3xl p-6">
  <p className="text-gray-400">Wallet Reputation</p>
  <h2 className="text-3xl font-bold text-purple-400 mt-4">
    {reputation}
  </h2>
</div>

<div className="bg-[#050816] border border-white/10 rounded-3xl p-6">
  <p className="text-gray-400">Wallet Age</p>
  <h2 className="text-3xl font-bold text-green-400 mt-4">
    {walletAge}
  </h2>
</div>

<div className="bg-[#050816] border border-white/10 rounded-3xl p-6">
  <p className="text-gray-400">Transactions</p>
  <h2 className="text-4xl font-bold text-orange-400 mt-4">
    {txCount}
  </h2>
</div>

            <div className="mt-8 bg-[#050816] border border-white/10 rounded-3xl p-8">

              <div className="flex gap-4 mb-6 flex-wrap">

                <button
                  onClick={copyReport}
                  className="px-4 py-2 bg-green-600 rounded-xl"
                >
                  Copy Report
                </button>

                <button
                  onClick={downloadPdf}
                  className="px-4 py-2 bg-orange-600 rounded-xl"
                >
                  Download PDF
                </button>

              </div>

              <h3 className="text-2xl font-bold mb-4">
                AI Analysis
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {analysis}
              </p>

            </div>

            <div className="mt-6 bg-[#050816] border border-white/10 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-4">
                AI Recommendations
              </h3>

              <ul className="space-y-3 text-gray-300">
                {recommendations.map((item, index) => (
                  <li key={index}>
                    ✓ {item}
                  </li>
                ))}
              </ul>

            </div>
          </>
        )}

    </div>
</main>
);
}