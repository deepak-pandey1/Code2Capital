"use client";
import { useState, useEffect } from "react";

const quotes = [
  "The goal of a successful trader is to make the best trades. Money is secondary.",
  "Amateurs hope. Professionals have a plan and the discipline to stick to it.",
  "In trading, you have to be defensive. If you don't protect your capital, you can't play.",
  "Markets are made by discounting the obvious and betting on the unexpected.",
  "Focus on the execution. If you do the right thing, the money will follow."
];

export default function DailyQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Daily Trading Wisdom</h3>
      <p className="text-xl font-medium italic">“{quote}”</p>
    </div>
  );
}