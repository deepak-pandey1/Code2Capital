"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3">
      
      <motion.svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text)]"   // ✅ FIX: dynamic theme color
        style={{ willChange: "transform" }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.08, rotate: 5 }}
      >

        {/* 🔥 OUTER RING */}
        <motion.circle
          cx="19"
          cy="19"
          r="17"
          stroke="rgb(34 197 94)"
          strokeWidth="2.5"
          strokeOpacity="0.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* MAIN CIRCLE */}
        <circle
          cx="19"
          cy="19"
          r="13.5"
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth="3.5"
        />

        {/* LEFT BRACKET < */}
        <motion.path
          d="M12 13 L8.5 19 L12 25"
          fill="none"
          stroke="currentColor"   // ✅ auto theme color
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* RIGHT BRACKET > */}
        <motion.path
          d="M26 13 L29.5 19 L26 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* ARROW (CAPITAL GROWTH) */}
        <motion.path
          d="M16.5 23 L19 17 L21.5 23"
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        />

        {/* CENTER DOT */}
        <motion.circle
          cx="19"
          cy="19"
          r="1.6"
          fill="rgb(34 197 94)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
      </motion.svg>

      {/* TEXT */}
      <motion.div
        className="text-lg font-semibold tracking-[0.5px]"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="text-[var(--text)]">Code</span>
        <span className="text-green-400 mx-[2px]">2</span>
        <span className="text-[var(--text)]">Capital</span>
      </motion.div>

    </div>
  );
}