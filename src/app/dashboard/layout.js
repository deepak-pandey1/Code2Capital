"use client";

import { useLoginModal } from "@/components/common/LoginModalProvider";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { openLogin } = useLoginModal();

  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Auth protection for dashboard, journal, analytics
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        openLogin();
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Close sidebar automatically when page changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg)] text-[var(--text)]">
        <p className="text-sm opacity-70">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        dark={dark}
        setDark={setDark}
      />

      {/* MAIN CONTENT */}
      <div className="relative flex-1 flex flex-col">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] md:hidden transition-opacity duration-300 ease-out"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* MOBILE TOP BAR */}
        <div className="relative z-40 md:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg)]">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg">
            <Menu />
          </button>
          <h1 className="font-bold">Code2Capital</h1>
        </div>

        {/* PAGE CONTENT */}
        <div
          className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8"
          onClick={() => {
            if (mobileOpen) setMobileOpen(false);
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}