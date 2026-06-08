 "use client";
  import { useState } from "react";

  import Script from "next/script";

 export default function TrustAgentPage() {

  const [form, setForm] = useState({

    firstName: "",

    surname: "",

    email: "",

    phone: "",

    nin: "",

    bvn: "",

    ninVerified: false,

    bvnVerified: false,

    phoneVerified: false,

    walletAgeDays: 0,

    transactions: 0,

  });


  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const connectPi = async () => {
  try {
    const auth = await (window as any).Pi.authenticate(
      ["username", "payments"],
      () => {}
    );

    console.log(auth);

    alert(
      `Welcome ${auth.user.username}`
    );
  } catch (error) {
    console.error(error);
    alert("Pi Login Failed");
  }
};

 const submit = async () => {

    try {

      setLoading(true);



      const res = await fetch("/api/trust-agent", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(form),

      });



      const data = await res.json();

      setResult(data);

    } catch (error) {

      console.error(error);

      alert("Error analyzing trust score");

    } finally {

      setLoading(false);

    }

   };
   return (
<div>
  <Script
      src="https://sdk.minepi.com/pi-sdk.js"
      strategy="afterInteractive"
      onLoad={() => {
        if ((window as any).Pi) {
          (window as any).Pi.init({
            version: "2.0",
          });
        }
      }}
    />

    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Asasanta Trust Agent AI
        </h1>

        <p className="text-gray-400 mb-8">
          AI Powered Trust Scoring & KYC Verification
        </p>

        <button
          onClick={connectPi}
          className="mb-6 bg-purple-600 px-6 py-3 rounded font-bold"
        >
          Login With Pi
        </button>

   

      



        <div className="border border-gray-700 rounded-xl p-6">

          <div className="grid md:grid-cols-2 gap-4">

            <input

              type="text"

              placeholder="First Name"

              value={form.firstName}

              onChange={(e) =>

                setForm({ ...form, firstName: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="text"

              placeholder="Surname"

              value={form.surname}

              onChange={(e) =>

                setForm({ ...form, surname: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="email"

              placeholder="Email"

              value={form.email}

              onChange={(e) =>

                setForm({ ...form, email: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="text"

              placeholder="Phone Number"

              value={form.phone}

              onChange={(e) =>

                setForm({ ...form, phone: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="text"

              placeholder="NIN"

              value={form.nin}

              onChange={(e) =>

                setForm({ ...form, nin: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="text"

              placeholder="BVN"

              value={form.bvn}

              onChange={(e) =>

                setForm({ ...form, bvn: e.target.value })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="number"

              placeholder="Wallet Age (Days)"

              value={form.walletAgeDays}

              onChange={(e) =>

                setForm({

                  ...form,

                  walletAgeDays: Number(e.target.value),

                })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />



            <input

              type="number"

              placeholder="Transactions"

              value={form.transactions}

              onChange={(e) =>

                setForm({

                  ...form,

                  transactions: Number(e.target.value),

                })

              }

              className="p-3 rounded bg-gray-900 border border-gray-700"

            />

          </div>



          <div className="mt-6 space-y-3">

            <label className="block">

              <input

                type="checkbox"

                checked={form.ninVerified}

                onChange={(e) =>

                  setForm({

                    ...form,

                    ninVerified: e.target.checked,

                  })

                }

              />{" "}

              NIN Verified

            </label>



            <label className="block">

              <input

                type="checkbox"

                checked={form.bvnVerified}

                onChange={(e) =>

                  setForm({

                    ...form,

                    bvnVerified: e.target.checked,

                  })

                }

              />{" "}

              BVN Verified

            </label>



            <label className="block">

              <input

                type="checkbox"

                checked={form.phoneVerified}

                onChange={(e) =>

                  setForm({

                    ...form,

                    phoneVerified: e.target.checked,

                  })

                }

              />{" "}

              Phone Verified

            </label>

          </div>



          <button

            onClick={submit}

            disabled={loading}

            className="mt-6 bg-cyan-500 text-black px-6 py-3 rounded font-bold"

          >

            {loading ? "Analyzing..." : "Analyze Trust Score"}

          </button>

        </div>



        {result && (
  <div className="mt-8 border border-gray-700 rounded-xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Trust Analysis Result
    </h2>

    <p>
  Trust Score:
  <strong className="ml-2 text-cyan-400">
    {result.trustScore}
  </strong>
</p>

<p className="mt-2">
  AI Decision:
  <strong className="ml-2">
    {result.aiDecision}
  </strong>
</p>

<p className="mt-2">
  Risk Level:
  <strong
    className={`ml-2 ${
      result.trustScore >= 80
        ? "text-green-400"
        : result.trustScore >= 50
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >
    {result.trustScore >= 80
      ? "LOW RISK"
      : result.trustScore >= 50
      ? "MEDIUM RISK"
      : "HIGH RISK"}
  </strong>
</p>

<div className="mt-6 bg-gray-900 p-4 rounded-lg">
  <h3 className="font-bold mb-3">
    AI Trust Explanation
  </h3>

  <ul className="space-y-2 text-gray-300">
    {form.ninVerified && (
      <li>✅ Identity verification completed</li>
    )}

    {form.bvnVerified && (
      <li>✅ BVN verification completed</li>
    )}

    {form.phoneVerified && (
      <li>✅ Phone number verified</li>
    )}

    {form.walletAgeDays > 180 && (
      <li>✅ Established wallet history</li>
    )}

    {form.transactions > 20 && (
      <li>✅ Consistent transaction activity</li>
    )}

    {form.walletAgeDays < 30 && (
      <li>⚠ New wallet detected</li>
    )}

    {form.transactions < 5 && (
      <li>⚠ Limited transaction history</li>
    )}
  </ul>
</div>
<div className="mt-6 bg-gray-900 p-4 rounded-lg">
  <h3 className="font-bold mb-3">
    DeFi Eligibility Assessment
  </h3>

  <p>
    Eligibility:
    <strong className="ml-2 text-green-400">
      APPROVED
    </strong>
  </p>

  <p className="mt-2">
    Suggested Credit Limit:
    <strong className="ml-2 text-cyan-400">
      $500
    </strong>
  </p>

  <ul className="mt-3 space-y-2 text-gray-300">
    <li>✔ Eligible for DeFi onboarding</li>
    <li>✔ Eligible for Micro-loans</li>
    <li>✔ Eligible for Trust-based Access</li>
    <li>✔ Eligible for Future RWA Verification</li>
  </ul>
</div>
<div className="mt-6 bg-gray-900 p-4 rounded-lg">
  <h3 className="font-bold mb-3">
    Casper Blockchain Status
  </h3>

  <p>
    Network:
    <strong className="ml-2 text-cyan-400">
      Casper Testnet
    </strong>
  </p>

  <p className="mt-2">
    Contract Status:
    <strong className="ml-2 text-green-400">
      ACTIVE
    </strong>
  </p>

  <p className="mt-2 break-all text-sm text-gray-300">
    Contract Package:
    dcc0ba60b15e82e5d3cada693f5ece98cb825faa1314dd7d81dee90fad180d05
  </p>
</div>

    <button
      onClick={async () => {
        try {
          const res = await fetch(
            "/api/casper/register",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                firstName: form.firstName,
                surname: form.surname,
                nin: form.nin,
                trustScore:
                  result.trustScore,
                aiDecision:
                  result.aiDecision,
              }),
            }
          );

          const data = await res.json();

          alert(
            data.success
              ? "Stored on Casper Testnet ✓"
              : "Casper storage failed"
          );
        } catch {
          alert(
            "Failed to connect to Casper"
          );
        }
       }}
           className="mt-6 bg-blue-600 px-6 py-3 rounded font-bold"
    >
                  Save To Casper
          </button>
     </div>
  )}

      </div>
   </main>
</div>
);
}

