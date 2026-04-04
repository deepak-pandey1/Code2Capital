"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-24 px-5">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* LEFT TEXT */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-8 leading-tight">
            Why Traders <br /> Choose <span className="text-green-400">Code2Capital</span>
          </h2>

          <div className="space-y-6">
            {[
              "Eliminate emotional decision-making with data.",
              "Identify which setups actually make you money.",
              "Automated risk management calculations.",
              "Community-driven strategy improvements.",
              "100% Free - No hidden subscriptions."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={20} />
                <p className="text-lg opacity-80">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="flex-1 grid grid-cols-2 gap-4">

          {/* LEFT COLUMN */}
          <div className="space-y-4">
            
            {/* CARD 1 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 h-48 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 flex flex-col justify-between"
            >
              <h4 className="font-bold mb-1">Smart Decisions</h4>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs opacity-60"
              >
                Eliminate emotional decision-making with data.
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-[2px] bg-green-400 mt-2"
              />
            </motion.div>

            {/* CARD 2 */}
            <motion.div 
              whileHover={{ y: -6, rotate: 0.5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 h-64 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h4 className="font-bold mb-2">Winning Setups</h4>

                <motion.p 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1 }}
                  className="text-xs opacity-60"
                >
                  Identify which setups actually make you money.
                </motion.p>
              </div>

              <div className="relative h-20 mt-4">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                  
                  {/* LINE */}
                  <motion.path
                    d="M0 30 Q20 10, 40 25 T80 15 T100 5"
                    fill="transparent"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* DOT */}
                  <motion.circle
                    r="2.5"
                    fill="#22c55e"
                    style={{
                      offsetPath: "path('M0 30 Q20 10, 40 25 T80 15 T100 5')",
                    }}
                    initial={{ offsetDistance: "0%" }}
                    whileInView={{ offsetDistance: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                </svg>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 pt-8">
            
            {/* CARD 3 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 h-64 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between overflow-hidden"
            >
              <div>
                <h4 className="font-bold mb-2">Risk Automation</h4>

                <motion.p 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2 }}
                  className="text-xs opacity-60 overflow-hidden whitespace-nowrap"
                >
                  Automated risk management calculations.
                </motion.p>
              </div>

              <div className="flex items-end gap-2 h-16 mt-4">
                {[30, 50, 70, 40, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex-1 bg-green-400/30 rounded-md relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-green-400/40"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CARD 4 */}
            <motion.div 
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 h-48 rounded-2xl bg-gradient-to-tr from-green-500/20 to-green-500/5 border border-green-400/30 flex flex-col justify-center items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-lg font-bold text-green-400"
              >
                100% Free
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[10px] uppercase font-bold opacity-60"
              >
                No hidden subscriptions
              </motion.p>
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}