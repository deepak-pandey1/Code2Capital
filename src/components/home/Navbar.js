"use client";

import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import AnimatedLogo from "./AnimatedLogo";

export default function Navbar({ dark, setDark, router }) {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl px-6 py-3 z-50 
      backdrop-blur-xl bg-[var(--card)] border border-[var(--border)] rounded-full 
      flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
    >
      <h1 className="text-lg font-semibold tracking-wide">
        <AnimatedLogo />
      </h1>

      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setDark(!dark)}
          whileTap={{ scale: 0.85 }}
          className="w-10 h-10 flex items-center justify-center rounded-full 
          bg-[var(--card)] border border-[var(--border)]"
        >
          {dark ? <FiMoon /> : <FiSun />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/login")}
          className="px-4 py-2 rounded-full text-sm bg-[var(--card)]"
        >
          Login
        </motion.button>
      </div>
    </motion.nav>
  );
}