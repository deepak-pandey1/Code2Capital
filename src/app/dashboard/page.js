"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DailyQuote from "@/components/common/DailyQuote";

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Simple state for the checklist
  const checklist = [
    "High-impact news checked?",
    "Daily bias identified?",
    "Risk-per-trade calculated?",
    "Physical/Mental state is 100%?",
  ];

  // Logic to determine active market session
  const getSession = () => {
    const hour = new Date().getUTCHours();
    if (hour >= 8 && hour < 16) return { name: "London", color: "bg-blue-500" };
    if (hour >= 13 && hour < 21) return { name: "New York", color: "bg-green-500" };
    return { name: "Asian", color: "bg-purple-500" };
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const session = getSession();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 md:p-8 bg-[var(--bg)] text-[var(--text)]"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TOP SECTION: Welcome & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
            <p className="text-gray-400">Welcome back. Plan your trade, trade your plan.</p>
          </div>
          <button 
            onClick={() => router.push("/dashboard/journal")}
            className="w-full md:w-auto px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            + Create Journal Entry
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Quote & Sessions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Daily Wisdom */}
            <DailyQuote />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Market Session Tracker */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${session.color} animate-pulse`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Session</span>
                  </div>
                  <h3 className="text-2xl font-bold">{session.name} Market</h3>
                </div>
                <p className="text-sm text-gray-400">Volatility is currently expected to be moderate.</p>
              </div>

              {/* Mindset Pulse */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] min-h-[160px]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Psychology Pulse</h3>
                <p className="text-sm mb-4 text-gray-300">How is your discipline right now?</p>
                <div className="flex justify-between gap-2">
                  {['😡', '😨', '😐', '🙂', '🔥'].map((emoji, i) => (
                    <button key={i} className="flex-1 py-2 text-xl rounded-lg bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--primary)] transition-all">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Checklist & Goals */}
          <div className="space-y-6">
            
            {/* Pre-Flight Checklist */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pre-Flight Checklist
              </h3>
              <div className="space-y-4">
                {checklist.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-700 bg-transparent accent-[var(--primary)] cursor-pointer" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Note / Daily Goal */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Today's Main Focus</h3>
              <textarea 
                placeholder="Example: Don't revenge trade if I hit my stop loss..."
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--primary)] min-h-[100px] resize-none text-gray-300"
              />
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}