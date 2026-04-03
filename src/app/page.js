"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Image as ImageIcon,
  TrendingUp,
  Shield,
  Zap,
  MousePointer2,
  PieChart,
  History,
  Target,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

/* Counter */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(to / 60);
        const id = setInterval(() => {
          start += step;
          if (start >= to) {
            setCount(to);
            clearInterval(id);
          } else setCount(start);
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const router = useRouter();
  const { scrollYProgress, scrollY } = useScroll();

  /* 🔥 smoother spring */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const heroY = useTransform(scrollY, [0, 500], [0, -120]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dark, setDark] = useState(true);

  /* Cursor Glow */
  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Load theme */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
  }, []);

  /* Apply theme */
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <main className="relative bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(34,197,94,0.10), transparent 80%)`,
        }}
      />

      {/* Scroll Bar */}
      <motion.div
        style={{
          scaleX,
          background: "linear-gradient(90deg, #22c55e, #16a34a)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 100,
        }}
      />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl px-6 py-3 z-50 
        backdrop-blur-xl bg-[var(--card)] border border-[var(--border)] rounded-full 
        flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        <h1 className="text-lg font-semibold tracking-wide">
          Code2Capital
        </h1>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setDark(!dark)}
            whileTap={{ scale: 0.85 }}
            className="relative w-10 h-10 flex items-center justify-center rounded-full 
            bg-[var(--card)] border border-[var(--border)] overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: dark ? 90 : 0,
                scale: dark ? 0 : 1,
                opacity: dark ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute"
            >
              <FiSun className="text-yellow-400 text-lg drop-shadow-[0_0_6px_rgba(255,200,0,0.6)]" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                rotate: dark ? 0 : -90,
                scale: dark ? 1 : 0,
                opacity: dark ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute"
            >
              <FiMoon className="text-[var(--text)] text-lg drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            </motion.div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-full text-sm 
            bg-[var(--card)] hover:opacity-80 transition"
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
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
          onClick={() => router.push("/signup")}
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

      {/* FEATURES */}
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
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-[var(--text)]/40 text-sm">
                Powerful feature for better trading decisions.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1. DASHBOARD PREVIEW */}
      <section className="py-20 px-5 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Powerful <span className="text-green-400">Trading Console</span>
          </motion.h2>
          <p className="text-[var(--text)]/60">Everything you need in one sleek interface.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Animated Glow behind image */}
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
            {/* Placeholder Image */}
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

      
      {/* 3. BENEFITS (Grid/Bullet) */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
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
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-4 items-start"
                >
                  <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={20} />
                  <p className="text-lg opacity-80">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* LEFT COLUMN */}
{/* RIGHT SIDE GRID (FINAL FIXED) */}
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

      {/* DOT (REAL SYNC) */}
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

     
      {/* 6. GLOBAL REACH (Extra 1) */}
<section className="py-24 px-5 text-center relative overflow-hidden">

  {/* 🌍 Animated Globe */}
  <motion.div
    initial={{ opacity: 0.15, scale: 1 }}
    animate={{ opacity: 0.18, rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 pointer-events-none"
  >
    <Globe size={600} />
  </motion.div>

  {/* ✨ Soft Glow Background */}
  <div className="absolute inset-0 bg-green-500/5 blur-[120px] pointer-events-none" />

  <div className="max-w-3xl mx-auto relative z-10">

    {/* 🟢 Badge */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Globe size={16} />
      </motion.div>
      Available Globally
    </motion.div>

    {/* ✨ Heading */}
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold mb-6 leading-tight"
    >
      Trade Across{" "}
      <span className="text-green-400 relative">
        Any Market
        {/* shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_infinite]" />
      </span>
      <br />
      With One Powerful Platform
    </motion.h2>

    {/* 📄 Description */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-[var(--text)]/60 text-lg mb-10"
    >
      Whether you're trading Forex, Crypto, Stocks, or Commodities — 
      Code2Capital helps you log every trade, analyze patterns, and 
      continuously improve your win rate with data-driven insights.
    </motion.p>

    {/* 🧩 Categories */}
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {[
        "Crypto (BTC, ETH)",
        "Forex (EUR/USD)",
        "Commodities (Gold, Oil)",
        "Stocks (NSE, NYSE)",
        "Indices (NIFTY 50)"
      ].map((item, i) => (
        <motion.span 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.08, y: -4 }}
          className="px-4 py-2 text-sm rounded-full border border-[var(--border)] 
          bg-[var(--card)] opacity-80 hover:opacity-100 transition 
          hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        >
          {item}
        </motion.span>
      ))}
    </div>

  </div>
</section>

      {/* 7. ACHIEVEMENT/TRUST (Extra 2) */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto bg-green-500 rounded-[3rem] p-12 md:p-20 text-black flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="max-w-md">
              <Award size={48} className="mb-6" />
              <h2 className="text-4xl font-black mb-6 leading-tight">Industry-Standard Security & Precision.</h2>
              <p className="font-medium opacity-80">We use AES-256 encryption to ensure your trade data remains yours. Secure, private, and always available.</p>
           </div>
           <div className="bg-black text-white p-8 rounded-3xl shadow-2xl rotate-2">
              <p className="text-sm font-mono opacity-50 mb-4">// System Status</p>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    <span className="text-sm">Database: Connected</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm">Security: Active</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm">Encryption: AES-256</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-12 px-5 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-left">
              <h2 className="text-xl font-bold mb-2">Code2Capital</h2>
              <p className="text-sm opacity-40">Precision trading analytics for the modern era.</p>
           </div>
           <div className="flex gap-8 text-sm opacity-60">
              <a href="#" className="hover:text-green-400 transition">Terms</a>
              <a href="#" className="hover:text-green-400 transition">Privacy</a>
              <a href="#" className="hover:text-green-400 transition">Discord</a>
           </div>
           <p className="text-[var(--text)]/30 text-sm">
             © 2026 Code2Capital
           </p>
        </div>
      </footer>
    </main>
  );
}