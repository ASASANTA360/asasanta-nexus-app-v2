export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 mb-2">
          Total Users
        </p>

        <h2 className="text-5xl font-bold">
          12K
        </h2>

        <p className="text-green-400 text-sm mt-3">
          +12% growth
        </p>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 mb-2">
          Verified Identities
        </p>

        <h2 className="text-5xl font-bold text-green-400">
          8.4K
        </h2>

        <p className="text-green-400 text-sm mt-3">
          +18% increase
        </p>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 mb-2">
          Active Loans
        </p>

        <h2 className="text-5xl font-bold">
          1.2K
        </h2>

        <p className="text-yellow-400 text-sm mt-3">
          245 pending reviews
        </p>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400 mb-2">
          AI Requests
        </p>

        <h2 className="text-5xl font-bold">
          52K
        </h2>

        <p className="text-blue-400 text-sm mt-3">
          Stable system performance
        </p>
      </div>
    </div>
  );
}