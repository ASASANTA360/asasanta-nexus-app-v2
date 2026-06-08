import LogoutButton from "./LogoutButton";

export default function ProfileCard() {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
          SA
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            Salisu Asasanta
          </h2>

          <p className="text-gray-400">
            Founder • Asasanta Global Technologies
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">
            Email
          </p>

          <p>
            asasantaglobaltech@gmail.com
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">
            Phone
          </p>

          <p>
            07033764842
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">
            Verification Status
          </p>

          <p className="text-green-400 font-semibold">
            Verified
          </p>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}