"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/common/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 text-[var(--text)]">
      <LoginForm onSuccess={() => router.push("/dashboard")} />
    </div>
  );
}