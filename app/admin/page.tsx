export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Admin Dashboard
        </h1>

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
              12K
            </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              Verified KYC
            </h2>

            <p className="text-5xl font-bold text-green-400">
              8.4K
            </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              Active Loans
            </h2>

            <p className="text-5xl font-bold">
              1.2K
            </p>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-400 mb-2">
              AI Requests
            </h2>

            <p className="text-5xl font-bold">
              52K
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
    </main>
  );
}