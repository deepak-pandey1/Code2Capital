"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import DashboardPreview from "@/components/home/DashboardPreview";
import Benefits from "@/components/home/Benefits";
import GlobalReach from "@/components/home/GlobalReach";
import Achievement from "@/components/home/Achievement";
import Footer from "@/components/home/Footer";

export default function Home() {
  const router = useRouter();
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
  }, []);

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
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(34,197,94,0.10), transparent 80%)`,
        }}
      />

      {/* Scroll Bar */}
<motion.div
  style={{
    scaleX,
    transformOrigin: "center", // ✅ THIS LINE IS IMPORTANT
    background: "linear-gradient(90deg, #22c55e, #16a34a)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    zIndex: 100,
  }}
/>

      <Navbar dark={dark} setDark={setDark} router={router} />

      <Hero router={router} scrollY={scrollY} />
      <Features />
      <DashboardPreview />
      <Benefits />
      <GlobalReach />
      <Achievement />
      <Footer />

    </main>
  );
}