"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowRight, BarChart3, BookOpen, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-[#07070A] text-white overflow-x-hidden">

      {/* 🔥 TOP PROGRESS BAR */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] 
        bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 
        origin-left z-50"
      />

      {/* 🔥 BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] 
          bg-purple-600 opacity-20 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] 
          bg-yellow-400 opacity-20 blur-[140px] rounded-full"
        />
      </div>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 relative">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight 
          bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 
          bg-clip-text text-transparent">
            Code2Capital
          </h1>

          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Turn your trading data into profit with a premium journal and analytics platform built for serious traders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">

            <button
              onClick={() =>
                document.getElementById("features").scrollIntoView({ behavior: "smooth" })
              }
              className="group px-6 py-3 rounded-xl 
              bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 
              font-medium flex items-center justify-center gap-2 
              hover:scale-105 active:scale-95 transition-all 
              shadow-lg shadow-purple-500/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-xl border border-white/10 
              bg-white/5 backdrop-blur-md hover:bg-white/10 
              hover:scale-105 transition-all"
            >
              Login
            </button>
          </div>
        </motion.div>

        <ScrollMouse />
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 px-5">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-center mb-16"
        >
          Everything You Need to Win 📈
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <FeatureCard
            icon={<BookOpen />}
            title="Smart Journal"
            desc="Log every trade with precision and structured insights."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Advanced Analytics"
            desc="Track performance and improve faster."
          />

          <FeatureCard
            icon={<ImageIcon />}
            title="Trade Screenshots"
            desc="Attach charts and review execution visually."
          />

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3">
            Built for Serious Traders
          </h3>

          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Stop guessing. Start improving with real data.
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold 
            hover:scale-105 transition-all shadow-lg"
          >
            Start Free
          </button>
        </motion.div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-white/10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Code2Capital
      </footer>
    </main>
  );
}

/* ================= SCROLL MOUSE ================= */

function ScrollMouse() {
  return (
    <div className="absolute bottom-8 flex flex-col items-center gap-2">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
        <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 
      backdrop-blur-md hover:shadow-purple-500/20 transition-all"
    >
      <div className="text-purple-500 mb-3">{icon}</div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}