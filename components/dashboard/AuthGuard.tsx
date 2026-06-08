"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem(
      "asasanta-user"
    );

    if (!user) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}