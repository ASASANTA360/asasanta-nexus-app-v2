"use client";

import { useEffect, useState } from "react";
import { submitTrustProof } from "@/lib/AsasantaTrust";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    analyses: 0,
    proofs: 0,
    certificates: 0,
  });

const [users, setUsers] = useState<any[]>([]);

const [analysesList, setAnalysesList] = useState<any[]>([]);

const [blockchainRecords, setBlockchainRecords] = useState<any[]>([]);

const [proofsList, setProofsList] = useState<any[]>([]);

const [certificatesList, setCertificatesList] = useState<any[]>([]);

const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
     const [
  usersRes,
  analysesRes,
  proofsRes,
  certificatesRes,
  blockchainRes,
] = await Promise.all([
  fetch("/api/database/users"),
  fetch("/api/database/analysis-history"),
  fetch("/api/database/trust-proofs"),
  fetch("/api/database/certificates"),
  fetch("/api/blockchain/records"),
]);

       const usersData = await usersRes.json();
        const analysesData = await analysesRes.json();
       const proofsData = await proofsRes.json();
       const certificatesData = await certificatesRes.json();
       const blockchainData = await blockchainRes.json();
       
 setStats({
  users: usersData.totalUsers || 0,

  analyses: analysesData.totalAnalyses || 0,

  proofs: proofsData.totalProofs || 0,
  
  certificates: certificatesData.totalCertificates || 0,
});

setBlockchainRecords(
  blockchainData.records || []
);


     } catch (error) {
        console.error("Dashboard error:", error);
      }
    }

    loadData();

  }, []);
  async function publishToBlockchain() {
  try {
    setPublishing(true);

    const txHash = await submitTrustProof(
      "ASASANTA001",
      100,
      "Approved"
    );

    alert(
      "Trust Proof Published!\n\nTransaction Hash:\n" +
      txHash
    );

    console.log(
      "Blockchain Transaction:",
      txHash
    );

  } catch (error) {
    console.error(
      "Blockchain error:",
      error
    );

    alert("Publishing failed");

  } finally {
    setPublishing(false);
  }
}

  return (

    
  <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Admin Dashboard
        </h1>

<button
  onClick={publishToBlockchain}
  disabled={publishing}
  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
>
  {publishing
    ? "Publishing..."
    : "Publish to Pharos Blockchain"}
</button>

        <p className="text-gray-400 text-lg mb-12">
          Manage users, KYC approvals, loans, and AI analytics.
        </p>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              Total Users
            </h2>

            <p className="text-5xl font-bold">
              {stats.users}
              </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              Verified KYC
            </h2>

            <p className="text-5xl font-bold text-green-400">
              {stats.analyses}
            </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              Active Loans
            </h2>

            <p className="text-5xl font-bold">
              {stats.proofs}
            </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              AI Requests
            </h2>

            <p className="text-5xl font-bold">
              {stats.certificates}
            </p>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KYC Requests */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Pending KYC Requests
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black border border-gray-800 rounded-xl p-4">
                <div>
                  <p className="font-semibold">
                    Salisu Asasanta
                  </p>

                  <p className="text-sm text-gray-500">
                    NIN Verification Pending
                  </p>
                </div>

                <button className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold">
                  Approve
                </button>
              </div>

              <div className="flex items-center justify-between bg-black border border-gray-800 rounded-xl p-4">
                <div>
                  <p className="font-semibold">
                    Amina Yusuf
                  </p>

                  <p className="text-sm text-gray-500">
                    Selfie Verification Pending
                  </p>
                </div>

                <button className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold">
                  Approve
                </button>
              </div>
            </div>
          </div>

          {/* Loan Requests */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Loan Applications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black border border-gray-800 rounded-xl p-4">
                <div>
                  <p className="font-semibold">
                    Asasanta Global Technologies
                  </p>

                  <p className="text-sm text-gray-500">
                    ₦2,500,000 Business Expansion Loan
                  </p>
                </div>

                <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold">
                  Review
                </button>
              </div>

              <div className="flex items-center justify-between bg-black border border-gray-800 rounded-xl p-4">
                <div>
                  <p className="font-semibold">
                    Nexus Agro Ventures
                  </p>

                  <p className="text-sm text-gray-500">
                    ₦850,000 Agricultural Loan
                  </p>
                </div>

                <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Monitoring */}
        <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            AI System Monitoring
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                AI Status
              </h3>

              <p className="text-green-400 font-bold">
                Operational
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                API Requests
              </h3>

              <p className="text-4xl font-bold">
                152K
              </p>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                Fraud Detection
              </h3>

              <p className="text-4xl font-bold text-yellow-400">
                98%
              </p>
            </div>
          </div>
        </div>
      </div>
    <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
  <h2 className="text-2xl font-semibold mb-6">
    Recent Users
  </h2>

  <div className="space-y-4">
    {users.length === 0 ? (
      <p className="text-gray-400">
        No users found
      </p>
    ) : (
      users.map((user, index) => (
        <div
          key={index}
          className="bg-black border border-gray-800 rounded-xl p-4"
        >
          <p className="font-bold">
            {user.name}
          </p>

          <p className="text-gray-400">
            ID: {user.userId}
          </p>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>
      ))
    )}
  </div>
</div> 
<div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
  <h2 className="text-2xl font-semibold mb-6">
    AI Analysis History
  </h2>

  <div className="space-y-4">

    {analysesList.length === 0 ? (
      <p className="text-gray-400">
        No AI analyses found
      </p>
    ) : (
      analysesList.map((analysis, index) => (
        <div
          key={index}
          className="bg-black border border-gray-800 rounded-xl p-4"
        >
          <p className="font-bold">
            User: {analysis.userId}
          </p>

          <p className="text-blue-400">
            Identity Score: {analysis.identityScore}
          </p>

          <p className="text-green-400">
            Trust Score: {analysis.trustScore}
          </p>

          <p className="text-yellow-400">
            Fraud Score: {analysis.fraudScore}
          </p>

          <p className="font-bold text-cyan-400">
            Decision: {analysis.decision}
          </p>

        </div>
      ))
    )}

  </div>
</div>
<div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
  <h2 className="text-2xl font-semibold mb-6">
    Blockchain Trust Proofs
  </h2>

  <div className="space-y-4">
    {proofsList.length === 0 ? (
      <p className="text-gray-400">
        No trust proofs found
      </p>
    ) : (
      proofsList.map((proof, index) => (
        <div
          key={index}
          className="bg-black border border-gray-800 rounded-xl p-4"
        >
          <p className="font-bold text-cyan-400">
            Proof ID: {proof.proofId}
          </p>

          <p>
            User: {proof.userId}
          </p>

          <p className="text-green-400">
            Status: {proof.status}
          </p>

          <p className="text-gray-500">
            Stored in Pharos Trust Layer
          </p>
        </div>
      ))
    )}
  </div>
</div>
<div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
  <h2 className="text-2xl font-semibold mb-6">
    Digital Certificates
  </h2>

  <div className="space-y-4">
    {certificatesList.length === 0 ? (
      <p className="text-gray-400">
        No certificates found
      </p>
    ) : (
      certificatesList.map((certificate, index) => (
        <div
          key={index}
          className="bg-black border border-gray-800 rounded-xl p-4"
        >
          <p className="font-bold text-green-400">
            {certificate.certificateId}
          </p>

          <p>
            Owner: {certificate.owner}
          </p>

          <p>
            Trust Score: {certificate.trustScore}
          </p>

          <p className="text-cyan-400 break-all">
            {certificate.blockchainHash}
          </p>

          <p className="text-yellow-400">
            Status: {certificate.status}
          </p>
        </div>
      ))
    )}
  </div>
</div>
    </main>
  );
}