"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DailyQuote from "@/components/common/DailyQuote";
import {
  Clock3,
  Calculator,
  Sparkles,
  Plus,
  PencilLine,
  Trash2,
  Save,
  X,
} from "lucide-react";

/* ---------- PREMIUM SMALL CARD ---------- */
const SectionCard = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm"
  >
    <div className="flex items-center gap-2 px-4 pt-4">
      <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-[rgba(34,197,94,0.08)] border border-[var(--border)]">
        <Icon className="h-4 w-4 text-[var(--primary)]" />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    <div className="px-4 pb-4 pt-3">{children}</div>
  </motion.div>
);

/* ---------- TIME + SESSION ---------- */
function getISTTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function getActiveSessions() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const h = Number(parts.find((p) => p.type === "hour")?.value || 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value || 0);
  const current = h * 60 + m;

  const inRange = (s, e) =>
    s <= e ? current >= s && current < e : current >= s || current < e;

  const sessions = [
    { name: "Sydney", s: 210, e: 750 },
    { name: "Tokyo", s: 330, e: 870 },
    { name: "London", s: 810, e: 1350 },
    { name: "New York", s: 1110, e: 210 },
  ];

  return sessions.filter((x) => inRange(x.s, x.e)).map((x) => x.name);
}

/* ---------- MAIN ---------- */
export default function Dashboard() {
  const istTime = useMemo(() => getISTTime(), []);
  const activeSessions = useMemo(() => getActiveSessions(), []);

  /* ---------- CALCULATOR ---------- */
  const [accountSize, setAccountSize] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [sl, setSl] = useState("20");
  const [pip, setPip] = useState("10");

  const riskAmount = (accountSize * riskPercent) / 100;
  const lot = riskAmount / (sl * pip || 1);
  const units = lot * 100000;

  /* ---------- CORE RULE ---------- */
  const [ruleText, setRuleText] = useState("");
  const [savedRule, setSavedRule] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/api/core-rule")
      .then((res) => res.json())
      .then((d) => {
        if (d?.rule) {
          setSavedRule(d.rule);
          setRuleText(d.rule.text);
        }
      });
  }, []);

  const saveRule = async () => {
    const method = savedRule ? "PUT" : "POST";
    const res = await fetch("/api/core-rule", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: ruleText }),
    });
    const data = await res.json();
    setSavedRule(data.rule);
    setEditing(false);
  };

  const deleteRule = async () => {
    await fetch("/api/core-rule", { method: "DELETE" });
    setSavedRule(null);
    setRuleText("");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-5 md:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[var(--primary)] uppercase">
              Trading Workspace
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          </div>

          <div className="text-sm border border-[var(--border)] px-3 py-2 rounded-xl">
            {istTime}
          </div>
        </div>

        {/* MOTIVATION (TOP STRIP) */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <DailyQuote />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* SESSION */}
          <SectionCard title="Active Session" icon={Clock3}>
  <div className="space-y-3">

    {/* ACTIVE NOW */}
    <div className="flex flex-wrap gap-2">
      {activeSessions.length > 0 ? (
        activeSessions.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="relative px-3 py-1.5 rounded-full text-xs font-medium 
            bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 
            flex items-center gap-2 overflow-hidden"
          >
            {/* glowing pulse */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
            </span>

            {s}
          </motion.div>
        ))
      ) : (
        <p className="text-xs text-[var(--text)]/60">
          Low activity period
        </p>
      )}
    </div>

    {/* SESSION CARDS */}
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "Sydney", time: "3:30 AM" },
        { name: "Tokyo", time: "5:30 AM" },
        { name: "London", time: "1:30 PM" },
        { name: "New York", time: "6:30 PM" },
      ].map((s, i) => {
        const active = activeSessions.includes(s.name);

        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className={`relative rounded-xl p-3 border transition-all
            ${
              active
                ? "border-[var(--primary)]/40 bg-[var(--primary)]/10 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                : "border-[var(--border)] bg-[var(--bg)]/40"
            }`}
          >
            {/* ACTIVE DOT */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold">{s.name}</span>

              <span
                className={`h-2 w-2 rounded-full ${
                  active ? "bg-[var(--primary)]" : "bg-gray-300"
                }`}
              />
            </div>

            {/* TIME */}
            <p className="text-[11px] mt-1 text-[var(--text)]/60">
              {s.time}
            </p>

            {/* subtle glow line */}
            {active && (
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--primary)] opacity-60 rounded-full"></div>
            )}
          </motion.div>
        );
      })}
    </div>

  </div>
</SectionCard>

          {/* CALCULATOR */}
          <SectionCard title="Position Size" icon={Calculator}>
            <div className="space-y-2 text-sm">
              <input
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                placeholder="Account"
                className="input"
              />
              <input
                value={riskPercent}
                onChange={(e) => setRiskPercent(e.target.value)}
                placeholder="Risk %"
                className="input"
              />
              <input
                value={sl}
                onChange={(e) => setSl(e.target.value)}
                placeholder="SL pips"
                className="input"
              />
              <input
                value={pip}
                onChange={(e) => setPip(e.target.value)}
                placeholder="Pip value"
                className="input"
              />

              <div className="text-xs mt-2">
                Risk: ${riskAmount.toFixed(2)} <br />
                Lot: {lot.toFixed(2)} <br />
                Units: {Math.round(units)}
              </div>
            </div>
          </SectionCard>

          {/* CORE RULE */}
          <SectionCard title="Core Rule" icon={PencilLine}>
            <div className="group relative">

              {!savedRule && !editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full border border-dashed rounded-xl py-4 text-sm flex justify-center gap-2"
                >
                  <Plus size={14} /> Add rule
                </button>
              )}

              {editing && (
                <>
                  <textarea
                    value={ruleText}
                    onChange={(e) => setRuleText(e.target.value)}
                    className="w-full border rounded-xl p-2 text-sm"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={saveRule} className="btn-primary">
                      Save
                    </button>
                    <button onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {savedRule && !editing && (
                <>
                  <p className="italic text-lg">“{savedRule.text}”</p>

                  {/* HOVER BUTTONS */}
                  <div className="opacity-0 group-hover:opacity-100 transition absolute top-0 right-0 flex gap-2">
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={deleteRule}>Delete</button>
                  </div>
                </>
              )}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}