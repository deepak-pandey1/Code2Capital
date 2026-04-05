"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border)]">
          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
          <h1 className="font-bold">Code2Capital</h1>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}