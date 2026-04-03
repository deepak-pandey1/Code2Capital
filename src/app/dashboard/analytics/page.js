"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [journals, setJournals] = useState([]);
  const [selected, setSelected] = useState("");
  const [entries, setEntries] = useState([]);

  // ================= LOAD JOURNALS =================
  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        setJournals(data);
        if (data.length) setSelected(data[0]._id);
      });
  }, []);

  // ================= LOAD ENTRIES =================
  useEffect(() => {
    if (!selected) return;

    fetch(`/api/entry?journalId=${selected}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ only valid entries
        const valid = data.filter((e) => e.data);
        setEntries(valid);
      });
  }, [selected]);

  // ================= EMPTY STATES =================
  if (!journals.length) {
    return <div className="p-6">No journals found</div>;
  }

  // ================= STATS =================
  const totalTrades = entries.length;

  const wins = entries.filter(
    (e) => e.data?.["Trade Result"] === "Win"
  ).length;

  const losses = entries.filter(
    (e) => e.data?.["Trade Result"] === "Loss"
  ).length;

  const winRate = totalTrades
    ? ((wins / totalTrades) * 100).toFixed(1)
    : 0;

  const avgRR =
    totalTrades > 0
      ? (
          entries.reduce(
            (acc, e) =>
              acc + (Number(e.data?.["Risk Reward"]) || 0),
            0
          ) / totalTrades
        ).toFixed(2)
      : 0;

  // ================= GROUP FUNCTION =================
  const groupBy = (key) => {
    const map = {};

    entries.forEach((e) => {
      const val = e.data?.[key] || "Unknown";

      if (!map[val]) {
        map[val] = { name: val, total: 0, wins: 0 };
      }

      map[val].total++;

      if (e.data?.["Trade Result"] === "Win") {
        map[val].wins++;
      }
    });

    return Object.values(map);
  };

  // ================= BEST INSIGHT =================
  const getBest = (data) => {
    if (!data.length) return "";

    const best = data.reduce((a, b) =>
      b.wins / b.total > a.wins / a.total ? b : a
    );

    return `You are most profitable on ${best.name}`;
  };

  const dayData = groupBy("Day");
  const sessionData = groupBy("Session");
  const pairData = groupBy("Pair");
  const trendData = groupBy("Trend");
  const mistakeData = groupBy("Mistake");

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl mb-6 font-semibold">Analytics</h1>

      {/* ================= SELECT ================= */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="mb-6 p-3 bg-white/5 border border-white/10 rounded-lg w-full md:w-auto"
      >
        {journals.map((j) => (
          <option key={j._id} value={j._id}>
            {j.name}
          </option>
        ))}
      </select>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Trades" value={totalTrades} />
        <StatCard title="Win Rate" value={`${winRate}%`} />
        <StatCard title="Avg RR" value={avgRR} />
        <StatCard title="Wins" value={wins} />
      </div>

      {/* ================= SECTIONS ================= */}
      <Section title="By Day" data={dayData} />
      <Section title="By Session" data={sessionData} />
      <Section title="By Pair" data={pairData} />
      <Section title="By Trend" data={trendData} />
      <Section title="By Mistake" data={mistakeData} />
    </div>
  );
}

// ================= STAT CARD =================
function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl md:text-2xl font-semibold">{value}</h2>
    </div>
  );
}

// ================= SECTION =================
function Section({ title, data }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg mb-3 font-medium">{title}</h2>

      <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="wins" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-400 text-sm mt-2">
        {data.length
          ? `You are most profitable on ${data[0].name}`
          : "No data available"}
      </p>
    </div>
  );
}