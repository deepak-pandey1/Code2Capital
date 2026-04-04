"use client";

import { motion, useTransform } from "framer-motion";
import Counter from "./Counter";

export default function Hero({ router, scrollY, openLogin }) {

  const heroY = useTransform(scrollY, [0, 500], [0, -120]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-28">
      
      <motion.h1
        style={{ y: heroY }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-[900]"
      >
        Turn Data Into{" "}
        <span className="text-green-400">
          Profitable Decisions
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-[var(--text)]/60 text-lg max-w-xl"
      >
        Track, analyze, and improve every trade with precision.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={openLogin}
        className="mt-8 px-10 py-4 rounded-xl font-semibold 
        bg-gradient-to-r from-green-400 to-green-600 
        text-white shadow-lg shadow-green-500/30"
      >
        Get Started
      </motion.button>

      {/* Stats */}
      <div className="flex gap-12 mt-16">
        <div>
          <h2 className="text-green-400 text-3xl font-bold">
            <Counter to={12000} suffix="+" />
          </h2>
          <p className="text-[var(--text)]/40 text-sm">Users</p>
        </div>

        <div>
          <h2 className="text-green-400 text-3xl font-bold">
            <Counter to={98} suffix="%" />
          </h2>
          <p className="text-[var(--text)]/40 text-sm">Uptime</p>
        </div>
      </div>

    </section>
  );
}