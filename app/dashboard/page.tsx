"use client";

import { useEffect, useState } from "react";
import AIAssistant from "@/components/AIAssistant";
import PharosWallet from "@/components/PharosWallet";
import StoreOnPharos from "@/components/StoreOnPharos";
import { QRCodeSVG } from "qrcode.react";

export default function Dashboard() {

  const [analysis, setAnalysis] = useState({
  identity: "Not checked",
  trust: "Not calculated",
  fraud: "Not scanned",
  decision: "Waiting",
});

const [blockchainRecords, setBlockchainRecords] = useState<any[]>([]);

const [aiResult, setAIResult] = useState<any>(null);

const [certificateId, setCertificateId] = useState("");

useEffect(() => {
  const pi = (window as any).Pi;

  if (!pi) {
    console.log("Pi SDK not loaded");
    return;
  }

  try {
    pi.init({
      version: "2.0",
    });

    console.log("PI INIT SUCCESS");

  } catch (err) {
    console.error("PI INIT ERROR:", err);
  }
}, []);
       useEffect(() => {
  async function loadBlockchainRecords() {
    try {
      const res = await fetch(
        "/api/blockchain/records"
      );

      const data = await res.json();

      setBlockchainRecords(
        data.records || []
      );

    } catch (error) {
      console.error(
        "Failed to load blockchain records:",
        error
      );
    }
  }

  loadBlockchainRecords();

}, []);
  
const runAIAnalysis = async () => {
  try {

    setAnalysis({
      identity: "Checking...",
      trust: "Calculating...",
      fraud: "Scanning...",
      decision: "AI thinking...",
    });


    // Identity Skill
    const identity = await fetch(
      "/api/skills/identity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "Demo User",
          nin: "12345678901",
        }),
      }
    ).then(res => res.json());


    // Trust Skill
    const trust = await fetch(
      "/api/skills/trust-score",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identityVerified: true,
          transactions: 150,
          accountAge: 18,
        }),
      }
    ).then(res => res.json());


    // Fraud Skill
    const fraud = await fetch(
      "/api/skills/fraud-detection",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginAttempts: 1,
          newDevice: false,
          transactionAmount: 100,
        }),
      }
    ).then(res => res.json());


    // Final Agent Decision
    const decision = await fetch(
      "/api/agent/decision",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identityVerified: true,
          confidenceScore: 98,
          trustScore: 100,
          fraudScore: 5,
        }),
      }
    ).then(res => res.json());

const result = {
  userId: "ASASANTA001",
  identityScore: 98,
  trustScore: 100,
  fraudScore: 5,
  decision: decision.result.decision,
};

setAIResult(result);
setCertificateId(
  `CERT-${result.userId}-${crypto.randomUUID().slice(0, 8)}`
);

setAnalysis({
  identity: `Verified ${result.identityScore}%`,
  trust: `${result.trustScore}/100 Low Risk`,
  fraud: `Safe (Score ${result.fraudScore})`,
  decision: result.decision,
});


  } catch (error) {
    console.error(error);
  }
};

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Header */}
      <section className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>

            <h1 className="text-5xl md:text-6xl font-black">
              PI LOGIN 
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Monitor digital identity systems, AI analytics,
              trust infrastructure, and blockchain verification.
            </p>

          </div>
          
 <button
  onClick={async () => {
    try {
      const pi = (window as any).Pi;

      if (!pi) {
        alert("Pi SDK not loaded");
        return;
      }

      alert("Pi SDK found");

      console.log("Before authenticate");

      const auth = await pi.authenticate(["username"]);

      console.log("AUTH SUCCESS:", auth);

      alert(`Welcome ${auth.user.username}`);

    } catch (err: any) {
      console.error("LOGIN ERROR:", err);
      alert(err?.message || "Login failed");
    }
  }}
  className="px-8 py-4 rounded-2xl bg-purple-600 text-white font-bold"
>
  Login with Pi
</button>

        </div>

      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Stats */}
        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              value: "98%",
              label: "AI Trust Score",
            },
            {
              value: "8.4K",
              label: "Verified Users",
            },
            {
              value: "1.2K",
              label: "Active Loans",
            },
            {
              value: "99.9%",
              label: "System Health",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-[30px] bg-[#050816] p-8 hover:-translate-y-2 transition-all duration-300 shadow-[0_0_50px_rgba(34,211,238,0.05)]"
            >

              <p className="text-gray-400 text-lg">
                {item.label}
              </p>

              <h2 className="text-5xl md:text-6xl font-black mt-5">
                {item.value}
              </h2>

            </div>
          ))}

        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* AI Activity */}
          <div className="md:col-span-2 border border-white/10 rounded-[35px] bg-[#050816] p-8 shadow-[0_0_50px_rgba(34,211,238,0.04)]">

            <div className="flex items-center justify-between mb-10">

              <div>

                <h2 className="text-4xl font-black">
                  Live AI Activity
                </h2>

                <p className="text-gray-400 mt-2">
                  Real-time intelligent infrastructure monitoring.
                </p>

              </div>

              <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />

            </div>

            <div className="space-y-6">

              {[
                {
                  title: "Identity Verification Completed",
                  desc: "AI verification system approved new onboarding request.",
                },
                {
                  title: "Fraud Detection Scan",
                  desc: "1,204 financial transactions analyzed successfully.",
                },
                {
                  title: "Blockchain Synchronization",
                  desc: "Trust infrastructure synced across distributed nodes.",
                },
                {
                  title: "Smart Lending Update",
                  desc: "AI credit scoring updated borrower risk profiles.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-2xl p-6 bg-black hover:border-cyan-400/20 transition-all duration-300"
                >

                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-3 leading-relaxed">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Risk Panel */}
          <div className="border border-white/10 rounded-[35px] bg-[#050816] p-8 shadow-[0_0_50px_rgba(34,211,238,0.04)]">

            <h2 className="text-4xl font-black mb-10">
              Risk Analysis
            </h2>

            <div className="space-y-10">

              <div>

                <div className="flex items-center justify-between mb-3">

                  <p className="text-gray-400">
                    Fraud Risk
                  </p>

                  <p className="font-bold text-red-400">
                    15%
                  </p>

                </div>

                <div className="w-full h-4 rounded-full bg-black overflow-hidden">

                  <div className="w-[15%] h-full bg-red-500 rounded-full" />

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-3">

                  <p className="text-gray-400">
                    Trust Stability
                  </p>

                  <p className="font-bold text-cyan-400">
                    92%
                  </p>

                </div>

                <div className="w-full h-4 rounded-full bg-black overflow-hidden">

                  <div className="w-[92%] h-full bg-cyan-400 rounded-full" />

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-3">

                  <p className="text-gray-400">
                    AI Accuracy
                  </p>

                  <p className="font-bold text-green-400">
                    98%
                  </p>

                </div>

                <div className="w-full h-4 rounded-full bg-black overflow-hidden">

                  <div className="w-[98%] h-full bg-green-400 rounded-full" />

                </div>

              </div>

            </div>

            <div className="mt-14 border border-white/10 rounded-[30px] p-8 bg-black">

              <p className="text-gray-400 text-lg">
                AI Core Status
              </p>

              <h3 className="text-6xl font-black text-green-400 mt-4">
                ACTIVE
              </h3>

              <p className="text-gray-500 mt-4">
                All infrastructure systems operational.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* Analytics */}
          <div className="border border-white/10 rounded-[35px] bg-[#050816] p-8">

            <h2 className="text-3xl font-black mb-8">
              Verification Analytics
            </h2>

            <div className="space-y-5">

              {[
                "NIN Verification",
                "Face Match",
                "Document Validation",
                "Fraud Detection",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-white/10 rounded-2xl p-4 bg-black"
                >

                  <span>{item}</span>

                  <span className="text-green-400 font-bold">
                    Success
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendations */}
          <div className="md:col-span-2 border border-white/10 rounded-[35px] bg-[#050816] p-8">

            <h2 className="text-3xl font-black mb-8">
              AI Recommendations
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {[
                "Increase lending trust threshold for high-risk borrowers.",
                "Enable additional biometric verification layers.",
                "Optimize blockchain synchronization frequency.",
                "Improve onboarding speed using AI automation.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-2xl p-6 bg-black hover:border-cyan-400/20 transition-all duration-300"
                >

                  <p className="text-gray-300 leading-relaxed">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
      {/* AI Agent Control Center */}
<section className="max-w-7xl mx-auto px-6 pb-12">
    
  <div className="border border-white/10 rounded-[35px] bg-[#050816] p-8">

    <button
  onClick={runAIAnalysis}
  className="mb-8 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition"
>
  ▶ Run AI Trust Analysis
</button>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="border border-white/10 rounded-2xl p-6 bg-black">
        <p className="text-gray-400">
          Identity Skill
        </p>

        <h3 className="text-3xl font-black text-green-400 mt-3">
          {analysis.identity}
        </h3>

        <p className="text-gray-500 mt-2">
          Confidence: 98%
        </p>
      </div>


      <div className="border border-white/10 rounded-2xl p-6 bg-black">
        <p className="text-gray-400">
          Trust Score
        </p>

        <h3 className="text-3xl font-black text-cyan-400 mt-3">
          {analysis.trust}
        </h3>

        <p className="text-gray-500 mt-2">
          Low Risk
        </p>
      </div>


      <div className="border border-white/10 rounded-2xl p-6 bg-black">
        <p className="text-gray-400">
          Fraud Detection
        </p>

        <h3 className="text-3xl font-black text-red-400 mt-3">
  {analysis.fraud}
</h3>

<p className="text-gray-500 mt-2">
  Real-time fraud analysis
</p>
      </div>


      <div className="border border-white/10 rounded-2xl p-6 bg-black">
        <p className="text-gray-400">
          AI Final Decision
        </p>

        <h3 className="text-3xl font-black text-green-400 mt-3">
          {analysis.decision}
        </h3>

        <p className="text-gray-500 mt-2">
          User can access trusted services
        </p>
      </div>

    </div>

  </div>

</section>

{/* Digital Trust Certificate */}
<section className="max-w-7xl mx-auto px-6 pb-12">

  <div className="border border-yellow-500/30 rounded-[35px] bg-[#050816] p-8">

    <div className="flex items-center justify-between">

      <div>
        <h2 className="text-4xl font-black">
          🪪 Digital Trust Certificate
        </h2>

        <p className="text-gray-400 mt-2">
          AI Verified • Blockchain Secured
        </p>
      </div>

      <div className="text-green-400 font-bold text-xl">
            {aiResult ? "ACTIVE" : "PENDING"}
      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-8">

      <div className="bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          Certificate ID
        </p>

        <h3 className="text-2xl font-black mt-2">
              {certificateId || "Pending"}
        </h3>

      </div>


      <div className="bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          Owner
        </p>

        <h3 className="text-2xl font-black mt-2">
            {aiResult?.userId || "No User"}
      </h3>

      </div>


      <div className="bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          Trust Score
        </p>

        <h3 className="text-2xl font-black text-cyan-400 mt-2">
             {aiResult ? `${aiResult.trustScore} / 100` : "No Score"}
        </h3>

      </div>


      <div className="bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          AI Decision
        </p>

       <h3 className="text-2xl font-black text-green-400 mt-2">
            {aiResult?.decision || "Waiting"}
       </h3>

      </div>


      <div className="md:col-span-2 bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          Blockchain Transaction
        </p>

        <h3 className="text-lg font-mono text-purple-400 mt-2 break-all">
          0x8571d82ee7721
        </h3>

      </div>


      <div className="md:col-span-2 bg-black border border-white/10 rounded-2xl p-6">

        <p className="text-gray-500">
          Pharos Trust Proof
        </p>

        <h3 className="text-lg font-bold mt-2">
          TRUST-75DJMF8G
        </h3>

      </div>

    </div>

  </div>
  
</section>
{/* Pharos Wallet */}
<section className="max-w-7xl mx-auto px-6 pb-12">
  <PharosWallet />
</section>
{/* Store AI Trust Proof */}
<section className="max-w-7xl mx-auto px-6 pb-12">

  <StoreOnPharos aiResult={aiResult} />

</section>

      {/* AI Assistant */}
      <AIAssistant />

      <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-6">
    Pharos Blockchain Records
  </h2>

  <div className="space-y-4">

    {blockchainRecords.length === 0 ? (

      <p className="text-gray-400">
        No blockchain records found
      </p>

    ) : (

      blockchainRecords.map((record, index) => (

        <div
          key={index}
          className="bg-black border border-gray-800 rounded-xl p-4"
        >

          <p className="font-bold text-cyan-400">
            User ID: {record.userId}
          </p>

          <p className="text-green-400">
            Trust Score: {record.trustScore}
          </p>

          <p className="text-yellow-400">
            Decision: {record.decision}
          </p>

          <p className="text-gray-400">
            Network: {record.network}
          </p>

          <p className="text-purple-400 break-all">
            Transaction:
            {record.txHash}
          </p>

          <p className="text-gray-500">
            Date:
            {new Date(record.createdAt)
              .toLocaleString()}
          </p>

        </div>

      ))

    )}

  </div>

</div>

    </main>
  );
}
