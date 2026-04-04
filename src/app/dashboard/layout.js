"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content */}
      <div
        className={`flex-1 p-6 md:p-10 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}