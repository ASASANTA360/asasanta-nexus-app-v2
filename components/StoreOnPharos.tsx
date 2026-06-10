"use client";

import { useState } from "react";
import { submitTrustProof } from "@/lib/AsasantaTrust";

export default function StoreOnPharos({
  aiResult,
}: {
  aiResult: any;
}) {

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  async function handleStore() {

    try {

      setLoading(true);

      if (!aiResult) {
  alert("Run AI analysis first");
  return;
}

const hash = await submitTrustProof(
  aiResult.userId,
  aiResult.trustScore,
  aiResult.decision
);

await fetch("/api/blockchain/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: aiResult.userId,
    trustScore: aiResult.trustScore,
    decision: aiResult.decision,
    txHash: hash,
  }),
});

setTxHash(hash);

    } catch (error) {

      console.error(
        "Blockchain transaction failed:",
        error
      );

      alert(
        "Transaction failed. Check console."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="bg-[#050816] border border-white/10 rounded-3xl p-8">

      <h2 className="text-3xl font-black mb-4">
        Store AI Trust Proof
      </h2>

      <p className="text-gray-400 mb-6">
        Save AI verification result to Pharos Blockchain.
      </p>


      <button
        onClick={handleStore}
        disabled={loading}
        className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold"
      >

        {loading
          ? "Processing Transaction..."
          : "Store on Pharos"}

      </button>


      {txHash && (

  <div className="mt-6">

    <p className="text-green-400 font-bold">
      Transaction Successful ✅
    </p>

    <p className="break-all text-gray-300 mt-2">
      {txHash}
    </p>


    <a
      href={`https://atlantic.pharosscan.xyz/tx/${txHash}`}
      target="_blank"
      className="inline-block mt-4 px-5 py-3 rounded-xl bg-green-500 text-black font-bold"
    >
      View on Pharos Explorer
    </a>


  </div>

)}

    </div>
  );
}