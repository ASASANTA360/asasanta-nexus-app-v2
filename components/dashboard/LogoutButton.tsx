"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("asasanta-user");

    alert("Logged out successfully");

    router.push("/auth/login");
  }

  return (
    <button
      onClick={logout}
      className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold mt-6"
    >
      Logout
    </button>
  );
}