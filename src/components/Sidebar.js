"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  ChevronLeft,
  X,
} from "lucide-react";

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
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
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
        transition={{ duration: 1.0, delay: 0.15 }}
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
        transition={{ duration: 1.0, delay: 0.15 }}
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
        transition={{ duration: 0.9, delay: 0.75 }}
      />
      <motion.circle
        cx="19"
        cy="19"
        r="1.6"
        fill="rgb(34 197 94)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.95 }}
      />
    </motion.svg>
  );
}

function BrandMark({ collapsed }) {
  return (
    <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
      <LogoMark size={40} />

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
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
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  ];

  return (
    <>      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 76 : 280,
        }}
        className={`
          fixed left-0 top-0 z-50 flex h-dvh flex-col border-r border-[var(--border)]
          bg-[var(--card)]/95 shadow-2xl backdrop-blur-xl
          transform transition-transform duration-300 ease-out
          w-[82vw] max-w-[320px]
          md:sticky md:top-0 md:w-auto md:max-w-none
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{
          "--sidebar-width": collapsed ? "76px" : "280px",
        }}
      >
        <div className="flex h-full flex-col p-3 md:p-3">
          {/* Top brand area */}
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl px-2 py-2">
            <BrandMark collapsed={collapsed} />

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(!collapsed)}
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
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    setMobileOpen(false);
                  }}
                  className={`
                    group flex w-full items-center rounded-2xl px-3 py-3 text-sm font-medium
                    transition-all duration-200 ease-out
                    ${collapsed ? "justify-center px-2" : "justify-start gap-3"}
                    ${
                      active
                        ? "bg-[var(--primary)]/15 text-[var(--text)] ring-1 ring-[var(--primary)]/20"
                        : "text-[var(--text)]/75 hover:bg-[var(--bg)] hover:text-[var(--text)]"
                    }
                  `}
                  title={collapsed ? item.name : undefined}
                  aria-label={item.name}
                >
                  <Icon
                    size={20}
                    className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      active ? "text-[var(--primary)]" : ""
                    }`}
                  />

                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.18 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </nav>

          <div className="pt-3" />
        </div>
      </motion.aside>
    </>
  );
}