"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  ChevronLeft,
  ChevronUp,
  X,
  LogOut,
  UserCircle2,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logoutUser } from "@/utils/auth";

export function LogoMark({ size = 40, className = "" }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 text-[var(--text)] ${className}`}
      style={{ willChange: "transform" }}
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.circle
        cx="19"
        cy="19"
        r="17"
        stroke="rgb(34 197 94)"
        strokeWidth="2.5"
        strokeOpacity="0.2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "center" }}
      />
      <circle
        cx="19"
        cy="19"
        r="13.5"
        fill="none"
        stroke="rgb(34 197 94)"
        strokeWidth="3.5"
      />
      <motion.path
        d="M12 13 L8.5 19 L12 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.08 }}
      />
      <motion.path
        d="M26 13 L29.5 19 L26 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.08 }}
      />
      <motion.path
        d="M16.5 23 L19 17 L21.5 23"
        fill="none"
        stroke="rgb(34 197 94)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      />
      <motion.circle
        cx="19"
        cy="19"
        r="1.6"
        fill="rgb(34 197 94)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ duration: 0.45, delay: 0.7 }}
      />
    </motion.svg>
  );
}

function BrandMark({ compact }) {
  return (
    <div className={`flex items-center ${compact ? "justify-center" : "gap-3"}`}>
      <LogoMark size={40} />

      <AnimatePresence initial={false}>
        {!compact && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="min-w-0 select-none"
          >
            <div className="text-base font-semibold tracking-tight text-[var(--text)]">
              <span>Code</span>
              <span className="mx-[2px] text-green-400">2</span>
              <span>Capital</span>
            </div>
            <div className="text-[11px] text-[var(--text)]/55">
              Build smart. Grow faster.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  dark,
  setDark,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const compact = !isMobile && collapsed;

  const menuItems = useMemo(
    () => [
      { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
      { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    ],
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!event.target.closest("[data-account-menu]")) {
        setAccountMenuOpen(false);
      }
    };

    if (accountMenuOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }

    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [accountMenuOpen]);

  useEffect(() => {
    // Prefetch routes so click feels instant.
    menuItems.forEach((item) => {
      router.prefetch(item.path);
    });
  }, [menuItems, router]);

  const handleLogout = async () => {
    try {
      setAccountMenuOpen(false);
      setMobileOpen(false);

      setTimeout(async () => {
        await logoutUser();
        router.replace("/");
      }, 120);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const displayName =
    user?.displayName ||
    user?.phoneNumber ||
    user?.email?.split("@")?.[0] ||
    "Guest";

  const initials = (displayName || "U")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setAccountMenuOpen(false);
  }, [setMobileOpen]);

  return (
    <motion.aside
      initial={false}
      animate={
        isMobile
          ? { x: mobileOpen ? 0 : "-105%" }
          : { width: compact ? 76 : 280, x: 0 }
      }
      transition={
        isMobile
          ? {
              x: { type: "spring", stiffness: 420, damping: 38, mass: 0.85 },
            }
          : {
              width: { duration: 0.22, ease: "easeOut" },
            }
      }
      className={`
        fixed left-0 top-0 z-50 flex h-dvh flex-col border-r border-[var(--border)]
        bg-[var(--card)]/85 backdrop-blur-xl shadow-2xl
        md:bg-[var(--card)] md:backdrop-blur-none
        transform-gpu
        ${isMobile ? "w-[88vw] max-w-[340px]" : ""}
        md:sticky md:top-0 md:translate-x-0
      `}
      style={{
        width: isMobile ? undefined : compact ? "76px" : "280px",
        willChange: "transform, width",
      }}
    >
      <div className="flex h-full flex-col p-3 md:p-3">
        {/* Top brand */}
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl px-2 py-2">
          <BrandMark compact={compact} />

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="hidden rounded-xl p-2 text-[var(--text)]/80 transition hover:bg-[var(--bg)] hover:text-[var(--text)] md:inline-flex"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                size={18}
                className={`transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex rounded-xl p-2 text-[var(--text)]/80 transition hover:bg-[var(--bg)] hover:text-[var(--text)] md:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                prefetch
                scroll={false}
                onClick={closeMenus}
                className={`
                  group flex w-full items-center rounded-2xl px-3 py-3 text-sm font-medium
                  transition-all duration-200 ease-out
                  ${compact ? "justify-center px-2" : "justify-start gap-3"}
                  ${
                    active
                      ? "bg-[var(--primary)]/15 text-[var(--text)] ring-1 ring-[var(--primary)]/20"
                      : "text-[var(--text)]/75 hover:bg-[var(--bg)] hover:text-[var(--text)]"
                  }
                `}
                title={compact ? item.name : undefined}
                aria-label={item.name}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    active ? "text-[var(--primary)]" : ""
                  }`}
                />

                <AnimatePresence initial={false}>
                  {!compact && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Bottom account section */}
        <div className="mt-auto border-t border-[var(--border)] pt-3">
          <div className="relative" data-account-menu>
            <button
              onClick={() => setAccountMenuOpen((v) => !v)}
              className={`
                flex w-full items-center rounded-2xl border border-[var(--border)]
                bg-[var(--bg)]/50 px-3 py-3 text-sm font-medium text-[var(--text)]
                transition-all duration-200 ease-out hover:bg-[var(--bg)]/80
                ${compact ? "justify-center px-2" : "justify-start gap-3"}
              `}
              aria-label="Open account menu"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 font-bold text-[var(--primary)]">
                {initials}
              </div>

              {!compact && (
                <>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-semibold leading-tight">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-[var(--text)]/55">
                      Manage account
                    </p>
                  </div>

                  <ChevronUp
                    size={16}
                    className={`shrink-0 transition-transform duration-200 ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className={`
                    absolute bottom-[74px] z-50 overflow-hidden rounded-3xl
                    border border-[var(--border)] bg-[var(--card)]/98 backdrop-blur-2xl
                    shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                    ${isMobile ? "left-0 w-full" : compact ? "left-0 w-[260px]" : "left-0 w-full"}
                  `}
                >
                  <div className="border-b border-[var(--border)] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                        <UserCircle2 size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[var(--text)]">
                          {displayName}
                        </p>
                        <p className="truncate text-xs text-[var(--text)]/55">
                          Signed in
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text)]/45">
                      Theme
                    </p>

                    <button
                      onClick={() => setDark((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[var(--bg)]/70"
                    >
                      <span className="text-[var(--text)]">
                        {dark ? "Dark mode" : "Light mode"}
                      </span>

                      <div
                        className={`
                          relative h-6 w-11 rounded-full border border-[var(--border)]
                          transition-colors duration-300
                          ${dark ? "bg-[var(--bg)]" : "bg-[var(--card)]"}
                        `}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: dark ? 20 : 2 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                            mass: 0.8,
                          }}
                          className="absolute top-[2px] h-5 w-5 rounded-full bg-[var(--text)] shadow-sm"
                        />
                      </div>
                    </button>
                  </div>

                  <div className="px-2 pb-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-[var(--text)]/80 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut size={18} />
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}