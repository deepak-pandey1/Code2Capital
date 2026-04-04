"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Zap, 
  Image as ImageIcon 
} from "lucide-react";

export default function Features() {
  return (
    <section className="py-20 px-5">
      
      <h2 className="text-center text-4xl font-bold mb-12">
        Platform <span className="text-green-400">Features</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { icon: <BookOpen />, title: "Journal" },
          { icon: <BarChart3 />, title: "Analytics" },
          { icon: <TrendingUp />, title: "Profit Tracking" },
          { icon: <Shield />, title: "Risk Control" },
          { icon: <Zap />, title: "Insights" },
          { icon: <ImageIcon />, title: "Charts" },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              scale: 1.06,
              rotateX: 6,
              rotateY: -6,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-xl 
            transition-all duration-500 ease-out will-change-transform"
          >
            <div className="text-green-400 mb-4">
              {f.icon}
            </div>

            <h3 className="font-semibold mb-2">
              {f.title}
            </h3>

            <p className="text-[var(--text)]/40 text-sm">
              Powerful feature for better trading decisions.
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}