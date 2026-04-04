"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function GlobalReach() {
  const assets = [
    "Crypto (BTC, ETH)",
    "Forex (EUR/USD)",
    "Commodities (Gold, Oil)",
    "Stocks (NSE, NYSE)",
    "Indices (NIFTY 50)"
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center relative overflow-hidden">

      {/* 🌍 Animated Globe */}
      <motion.div
        initial={{ opacity: 0.12, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: 1, rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        scale-[1.2] sm:scale-[1.4] md:scale-[1.6] 
        pointer-events-none"
      >
        <Globe 
          strokeWidth={0.6}
          className="w-[300px] sm:w-[450px] md:w-[600px] h-auto 
          opacity-60 text-green-400"
        />
      </motion.div>

      {/* ✨ Soft Glow */}
      <div className="absolute inset-0 bg-green-500/10 blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 
          rounded-full bg-green-500/10 text-green-400 
          text-xs sm:text-sm font-medium mb-6
          shadow-[0_0_25px_rgba(34,197,94,0.25)] backdrop-blur-md"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <Globe size={16} />
          </motion.div>
          Available Globally
        </motion.div>

        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-5 leading-tight"
        >
          Journal{" "}
          <span className="text-green-400 relative inline-block">
            Any Asset, Anywhere

            <span className="absolute inset-0 
            bg-gradient-to-r from-transparent via-white/40 to-transparent 
            opacity-0 hover:opacity-100 
            animate-[shine_3s_infinite] blur-sm" />
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base md:text-lg 
          text-[var(--text)]/60 mb-8 leading-relaxed"
        >
          One journal. Every market.
        </motion.p>

        {/* 💎 Premium Categories */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {assets.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.07, y: -3 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full 
              bg-green-400/20 blur-md opacity-0 
              group-hover:opacity-100 transition duration-300" />

              {/* Pill */}
              <div className="relative px-4 py-2 
              text-xs sm:text-sm rounded-full 
              border border-white/10 
              bg-white/5 backdrop-blur-xl 
              text-white/80 group-hover:text-white
              transition-all duration-300
              shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)]">
                {item}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}