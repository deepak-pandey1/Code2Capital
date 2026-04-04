"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <section className="py-20 px-5 overflow-hidden">
      
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          Powerful <span className="text-green-400">Trading Console</span>
        </motion.h2>

        <p className="text-[var(--text)]/60">
          Everything you need in one sleek interface.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Animated Glow */}
        <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-[2.5rem] z-0 animate-pulse" />
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)] shadow-2xl"
        >
          <div className="h-8 bg-[var(--border)] w-full flex items-center px-4 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>

          {/* Image */}
          <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1642790103300-97e45107c6ea?q=80&w=2832&auto=format&fit=crop" 
              alt="Dashboard Preview"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}