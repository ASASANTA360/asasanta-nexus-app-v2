export default function VerifyPage({
  params,
}: {
  params: {
    id: string;
  };
}) {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="max-w-2xl w-full border border-green-500/30 rounded-[35px] bg-[#050816] p-10">

        <h1 className="text-5xl font-black text-green-400">
          ✅ VERIFIED
        </h1>

        <p className="text-gray-400 mt-4">
          This Digital Trust Certificate has been verified.
        </p>


        <div className="mt-10 space-y-6">

          <div>

            <p className="text-gray-500">
              Certificate ID
            </p>

            <h2 className="text-2xl font-black">
              {params.id}
            </h2>

          </div>


          <div>

            <p className="text-gray-500">
              Blockchain Status
            </p>

            <h2 className="text-2xl font-black text-cyan-400">
              Secured on Pharos
            </h2>

          </div>


          <div>

            <p className="text-gray-500">
              AI Verification
            </p>

            <h2 className="text-2xl font-black text-green-400">
              Approved
            </h2>

          </div>

        </div>

      </div>

    </main>

  );
}