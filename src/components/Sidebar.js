"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Image,
  BarChart3,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./home/AnimatedLogo";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Screenshots", icon: Image, path: "/dashboard/screenshots" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  if (
    pathname === "/dashboard/journal"
  ) {
    setCollapsed(true);
  }
}, [pathname]);

  const [open, setOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div
        className="md:hidden flex items-center justify-between p-4 border-b"
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          borderColor: "var(--border)",
        }}
      >
        <h1 className="font-semibold">Code2Capital</h1>
        <Menu onClick={() => setOpen(!open)} className="cursor-pointer" />
      </div>

      {/* ================= SIDEBAR ================= */}
      <motion.aside
  initial={false}
  animate={{
    width: collapsed ? 56 : 260, // 👈 yaha width kam ki hai
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 30,
  }}
  className={`
    fixed top-0 left-0 h-full z-50 overflow-hidden
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
  style={{
    background: "var(--bg)",
    color: "var(--text)",
    borderRight: "1px solid var(--border)",
  }}
>
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between p-2.5">
          
          <div className="flex items-center gap-2 ">
            <AnimatedLogo />

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  key="logo-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold whitespace-nowrap"
                >
                  {/* Code2Capital */}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ===== EDGE TOGGLE BUTTON ===== */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-50"
          >
            <div
              className="
                w-9 h-12 flex items-center justify-center
                rounded-xl
                border
                shadow-md
                transition-all duration-300
                hover:scale-105
              "
              style={{
                background: "var(--bg)",
                borderColor: "var(--border)",
              }}
            >
              <ChevronLeft
                size={18}
                className={`transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* ===== MENU ===== */}
        <nav className="flex flex-col gap-2 px-2 mt-4">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition"
                style={{
                  background: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "#fff" : "var(--text)",
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                <Icon size={18} />

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      key={`text-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 md:hidden"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}
    </>
  );
}