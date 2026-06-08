import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-950 border-r border-gray-800 p-6">
      <h2 className="text-3xl font-bold mb-10">
        Nexus
      </h2>

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="block bg-black border border-gray-800 rounded-xl px-4 py-3 hover:bg-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/kyc"
          className="block bg-black border border-gray-800 rounded-xl px-4 py-3 hover:bg-gray-900"
        >
          KYC Verification
        </Link>

        <Link
          href="/loans"
          className="block bg-black border border-gray-800 rounded-xl px-4 py-3 hover:bg-gray-900"
        >
          Smart Lending
        </Link>

        <Link
          href="/admin"
          className="block bg-black border border-gray-800 rounded-xl px-4 py-3 hover:bg-gray-900"
        >
          Admin Panel
        </Link>

        <Link
          href="/auth/login"
          className="block bg-black border border-gray-800 rounded-xl px-4 py-3 hover:bg-gray-900"
        >
          Authentication
        </Link>
      </div>
    </aside>
  );
}