export default function Notifications() {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Notifications
      </h2>

      <div className="space-y-4">
        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="font-semibold mb-1">
            KYC Approved
          </p>

          <p className="text-sm text-gray-400">
            Your identity verification has been approved.
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="font-semibold mb-1">
            Loan Review Started
          </p>

          <p className="text-sm text-gray-400">
            Your loan application is currently under review.
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="font-semibold mb-1">
            AI Recommendation
          </p>

          <p className="text-sm text-gray-400">
            Improve your repayment history to increase credit score.
          </p>
        </div>
      </div>
    </div>
  );
}