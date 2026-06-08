export default function ActivityTimeline() {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">
        <div className="border-l-2 border-green-500 pl-4">
          <p className="font-semibold">
            KYC Verification Approved
          </p>

          <p className="text-sm text-gray-400">
            Your identity verification was successfully approved.
          </p>

          <p className="text-xs text-gray-500 mt-1">
            2 hours ago
          </p>
        </div>

        <div className="border-l-2 border-blue-500 pl-4">
          <p className="font-semibold">
            Loan Application Submitted
          </p>

          <p className="text-sm text-gray-400">
            Your smart lending request is currently under review.
          </p>

          <p className="text-xs text-gray-500 mt-1">
            5 hours ago
          </p>
        </div>

        <div className="border-l-2 border-yellow-500 pl-4">
          <p className="font-semibold">
            AI Risk Assessment Updated
          </p>

          <p className="text-sm text-gray-400">
            Your financial trust score increased by 12%.
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Yesterday
          </p>
        </div>

        <div className="border-l-2 border-purple-500 pl-4">
          <p className="font-semibold">
            Blockchain Identity Synced
          </p>

          <p className="text-sm text-gray-400">
            Your decentralized identity profile was updated.
          </p>

          <p className="text-xs text-gray-500 mt-1">
            2 days ago
          </p>
        </div>
      </div>
    </div>
  );
}