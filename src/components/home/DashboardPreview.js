"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardPreview() {
  return (
    <section className="py-20 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Powerful <span className="text-green-400">Trading Console</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-[var(--text)]/60 text-base md:text-lg"
        >
          Everything you need in one sleek interface.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Soft premium glow - static */}
        <div className="absolute -inset-8 bg-gradient-to-r from-green-500/10 via-emerald-400/8 to-transparent blur-3xl rounded-[3rem] z-0" />

        <motion.div
          whileHover={{ y: -2, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 120, damping: 24, mass: 1 }}
          className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
        >
          {/* Top bar */}
          <div className="h-10 w-full flex items-center px-4 gap-1.5 bg-white/5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <div className="ml-4 h-2 w-28 rounded-full bg-white/10" />
          </div>

          {/* Image */}
          <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
            <Image
              src="/dashboard.png"
              alt="Dashboard Preview"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-center"
            />

            {/* Premium overlay, no motion */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}