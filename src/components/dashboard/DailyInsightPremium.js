"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useEffect } from "react";
import DailyQuote from "@/components/common/DailyQuote";

export default function DailyInsightPremium({ lang, setLang, onInitialLoaded }) {

  useEffect(() => {
    if (onInitialLoaded) {
      onInitialLoaded();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      style={{
        position: "relative",
        borderRadius: "18px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        padding: "18px 22px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          width: "84%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.25), transparent)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Zap size={13} color="var(--primary)" strokeWidth={2.5} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            Daily Insight
          </span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {["EN", "HN"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "4px 10px",
                fontSize: "10px",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                cursor: "pointer",
                fontWeight: 700,
                background: lang === l ? "var(--primary)" : "transparent",
                color: lang === l ? "#000" : "var(--text)",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: "15px", lineHeight: 1.8, opacity: 0.95 }}>
        <DailyQuote lang={lang} />
      </div>
    </motion.div>
  );
}