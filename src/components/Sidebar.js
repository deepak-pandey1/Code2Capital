"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Image,
  BarChart3, // ✅ NEW
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" }, // ✅ NEW
  { name: "Screenshots", icon: Image, path: "/dashboard/screenshots" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0B0B0F]">
        <h1 className="font-semibold">Code2Capital</h1>
        <Menu onClick={() => setOpen(!open)} className="cursor-pointer" />
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-64 min-w-[256px]
          bg-white/5 backdrop-blur-lg border-r border-white/10

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0

          transition-transform duration-300
        `}
      >
        <div className="p-6 font-bold text-lg">
          Code2Capital
        </div>

        <nav className="flex flex-col gap-2 px-4">
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
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-yellow-400 text-white shadow-lg"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                {item.name}
              </motion.div>
            );
          })}
        </nav>
      </aside>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}