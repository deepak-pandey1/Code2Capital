"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0B0B0F] text-white">
  
  {/* Sidebar */}
  <Sidebar />

  {/* Main Content */}
  <div className="flex-1 md:ml-64 p-6 md:p-10">
    {children}
  </div>

</div>
  );
}