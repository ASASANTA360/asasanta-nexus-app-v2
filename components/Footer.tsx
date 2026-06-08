export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Asasanta Nexus
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered decentralized identity, KYC verification,
            and blockchain lending infrastructure for African
            businesses and communities.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Platform
          </h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <p>Dashboard</p>
            <p>KYC Verification</p>
            <p>Smart Lending</p>
            <p>AI Assistant</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Company
          </h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <p>About</p>
            <p>Technology</p>
            <p>Security</p>
            <p>Partners</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <p>asasantaglobaltech@gmail.com</p>
            <p>07033764842</p>
            <p>Abuja, Nigeria</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-gray-500 text-sm">
        © 2026 Asasanta Nexus. All rights reserved.
      </div>
    </footer>
  );
}