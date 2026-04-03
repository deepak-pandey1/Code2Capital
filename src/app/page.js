"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Image as ImageIcon,
  TrendingUp,
  Shield,
  Zap,
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
          zIndex: 50,
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

  {/* Sun */}
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

  {/* Moon */}
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
  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}

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

      {/* CTA */}
      <section className="text-center py-20">
        <h2 className="text-5xl font-extrabold mb-6">
          Start Your Trading Journey
        </h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/signup")}
          className="px-10 py-4 rounded-xl font-bold 
          bg-gradient-to-r from-green-400 to-green-600 
          text-white shadow-lg shadow-green-500/40"
        >
          Start Free Trial
        </motion.button>
      </section>

      <footer className="text-center py-6 text-[var(--text)]/30 border-t border-[var(--border)]">
        © 2026 Code2Capital
      </footer>
    </main>
  );
}