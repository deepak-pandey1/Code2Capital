"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Lightbulb } from "lucide-react";

const quotes = [
  { text: "The goal of a successful trader is to make the best trades. Money is secondary.", type: "Discipline" },
  { text: "Amateurs hope. Professionals have a plan and the discipline to stick to it.", type: "Mindset" },
  { text: "In trading, you have to be defensive. If you don't protect your capital, you can't play.", type: "Risk" },
  { text: "Markets are made by discounting the obvious and betting on the unexpected.", type: "Strategy" },
  { text: "Focus on the execution. If you do the right thing, the money will follow.", type: "Execution" },
  { text: "The market is a device for transferring money from the impatient to the patient.", type: "Patience" }
];

export default function DailyQuote() {
  const [quote, setQuote] = useState({ text: "", type: "" });

  useEffect(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Quote size={60} />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={14} className="text-[var(--primary)]" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">{quote.type} Wisdom</span>
      </div>
      <p className="text-xl font-medium text-[var(--text)] leading-relaxed italic">“{quote.text}”</p>
    </motion.div>
  );
}