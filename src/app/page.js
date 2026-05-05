"use client";

import CursorGlow from "@/components/CursorGlow";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import DashboardPreview from "@/components/home/DashboardPreview";
import Benefits from "@/components/home/Benefits";
// import GlobalReach from "@/components/home/GlobalReach";
import Footer from "@/components/home/Footer";

// ✅ ADD THIS IMPORT
import LoginModal from "@/components/common/LoginModal";

export default function Home() {
  const router = useRouter();
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  });

  const [dark, setDark] = useState(true);

  // ✅ ADD THIS STATE (THIS IS STEP 2)
  const [openLogin, setOpenLogin] = useState(false);

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

      <CursorGlow />
      

      {/* Scroll Bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "center",
          background: "linear-gradient(90deg, #22c55e, #16a34a)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 100,
        }}
      />

      {/* ✅ PASS PROP HERE */}
      <Navbar 
        dark={dark} 
        setDark={setDark} 
        router={router}
        openLogin={() => setOpenLogin(true)}
      />

      {/* ✅ PASS PROP HERE */}
      <Hero 
        router={router} 
        scrollY={scrollY}
        openLogin={() => setOpenLogin(true)}
      />

      <Features />
      <DashboardPreview />
      <Benefits />
      {/* <GlobalReach /> */}
      {/* <Achievement /> */}
      <Footer />

      {/* ✅ ADD MODAL HERE (IMPORTANT) */}
      <LoginModal open={openLogin} setOpen={setOpenLogin} />

    </main>
  );
}