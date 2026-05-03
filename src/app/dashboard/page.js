"use client";

import { FiTrendingUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DailyQuote from "@/components/common/DailyQuote";
import {
  Clock,
  PencilLine,
  Plus,
  Save,
  X,
  Trash2,
  Zap,
  BookMarked,
} from "lucide-react";
import WatchlistPanel from "@/components/dashboard/WatchlistPanel";

/* ═══════════════════════════════════════════════════
   AMBIENT BACKGROUND
═══════════════════════════════════════════════════ */
function AmbientBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-25%", left: "-15%",
          width: "65vw", height: "65vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 65%)",
          filter: "blur(45px)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute",
          bottom: "-20%", right: "-10%",
          width: "50vw", height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.13 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="var(--primary)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PREMIUM CARD
═══════════════════════════════════════════════════ */
function Card({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.22 } }}
      style={{
        position: "relative",
        borderRadius: "22px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
        ...style,
      }}
    >
      {/* top shimmer line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: "8%", width: "84%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   CARD HEADER
═══════════════════════════════════════════════════ */
function CardHeader({ icon: Icon, title, badge }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 22px 16px",
        borderBottom: "1px solid var(--border)",
        marginBottom: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <motion.div
          whileHover={{ rotate: 12, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          style={{
            width: 36, height: 36,
            borderRadius: "11px",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={15} color="var(--primary)" strokeWidth={2.2} />
        </motion.div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          {title}
        </span>
      </div>
      {badge && (
        <motion.div
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: "20px",
            background: "rgba(34,197,94,0.09)",
            border: "1px solid rgba(34,197,94,0.22)",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--primary)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.6, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            style={{
              width: 5, height: 5,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "inline-block",
            }}
          />
          {badge}
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function getISTTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  }).format(new Date());
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════ */
export default function Dashboard() {
  const [time, setTime] = useState(getISTTime());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getISTTime());
    }, 60000);
    return () => clearInterval(id);
  }, []);

  /* core rule */
  const [ruleText, setRuleText]   = useState("");
  const [savedRule, setSavedRule] = useState(null);
  const [editing, setEditing]     = useState(false);
  const [lang, setLang] = useState("EN");
  

  useEffect(() => {
    fetch("/api/core-rule")
      .then((r) => r.json())
      .then((d) => { if (d?.rule) { setSavedRule(d.rule); setRuleText(d.rule.text); } })
      .catch(() => {});
  }, []);

  const saveRule = async () => {
    const res  = await fetch("/api/core-rule", {
      method: savedRule ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: ruleText }),
    });
    const data = await res.json();
    setSavedRule(data.rule);
    setEditing(false);
  };

  const deleteRule = async () => {
    await fetch("/api/core-rule", { method: "DELETE" });
    setSavedRule(null);
    setRuleText("");
  };

  /* ─── RENDER ─── */
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", position: "relative" }}>
      <AmbientBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 40px)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
           padding: "2px 26px",
           
        }}
      >

        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* wordmark */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <motion.div
  animate={{ rotate: [0, 5, -5, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <FiTrendingUp
    size={16}
    style={{
      color: "var(--primary)",
      opacity: 0.85,
      filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
    }}
  />
</motion.div>
              <span style={{
                fontSize: "9px", fontWeight: 800,
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "var(--primary)", opacity: 0.75,
              }}>
                Trading Workspace
              </span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}>
              Dashboard
            </h1>
          </div>

          {/* live clock */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 20px",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              background: "var(--card)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 0 0.5px rgba(34,197,94,0.1) inset",
            }}
          >
            <Clock size={13} color="var(--primary)" strokeWidth={2.5} />
            <span style={{
              fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.05em",
              fontVariantNumeric: "tabular-nums",
            }}>
              {time}
            </span>           
            <motion.span
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }}
            />
          </motion.div>
        </motion.header>

        {/* ── QUOTE STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            borderRadius: "18px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            backdropFilter: "blur(12px)",
            padding: "18px 26px",
            overflow: "hidden",
          }}
        >
          <div aria-hidden style={{
            position: "absolute", top: 0, left: "8%", width: "84%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
          }} />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            style={{
              position: "absolute", left: 0, top: "10%",
              height: "80%", width: 3,
              borderRadius: "0 4px 4px 0",
              background: "linear-gradient(180deg, transparent, var(--primary), transparent)",
              transformOrigin: "top",
            }}
          />
          <div style={{ 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between",
  marginBottom: 10, 
  paddingLeft: 6 
}}>

  {/* LEFT SIDE (icon + text) */}
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <motion.div
      animate={{ rotate: [0, 20, -20, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5 }}
    >
      <Zap size={13} color="var(--primary)" strokeWidth={2.5} />
    </motion.div>

    <span style={{
      fontSize: "9px",
      fontWeight: 800,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      opacity: 0.4,
    }}>
      Daily Insight
    </span>
  </div>

  {/* RIGHT SIDE (toggle) */}
  <div style={{ display: "flex", gap: 6 }}>
    {["EN", "HN"].map((l) => (
      <motion.button
        key={l}
        onClick={() => setLang(l)}
        whileTap={{ scale: 0.95 }}
        animate={{
          background: lang === l ? "var(--primary)" : "transparent",
          color: lang === l ? "#000" : "var(--text)",
        }}
        transition={{ duration: 0.25 }}
        style={{
          padding: "4px 10px",
          fontSize: "10px",
          borderRadius: "20px",
          border: "1px solid var(--border)",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        {l}
      </motion.button>
    ))}
  </div>

</div>
          <div style={{ paddingLeft: 6 }}>
            <DailyQuote lang={lang} />
          </div>
        </motion.div>

        {/* ── TWO-COLUMN GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >

          <WatchlistPanel />


          {/* ══ CARD 2 — CORE RULE ══ */}
          <Card delay={0.28}>
            <CardHeader icon={BookMarked} title="Core Rule" />
            <div style={{ padding: "20px 22px 24px" }}>
              <AnimatePresence mode="wait">

                {/* EMPTY */}
                {!savedRule && !editing && (
                  <motion.button
                    key="empty"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setEditing(true)}
                    style={{
                      width: "100%",
                      minHeight: 164,
                      border: "1px dashed rgba(34,197,94,0.3)",
                      borderRadius: "16px",
                      background: "rgba(34,197,94,0.03)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 13,
                      color: "var(--text)",
                      boxSizing: "border-box",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: 46, height: 46,
                        borderRadius: "50%",
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Plus size={19} color="var(--primary)" strokeWidth={2.5} />
                    </motion.div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: 4, opacity: 0.65 }}>
                        Define your core rule
                      </p>
                      <p style={{ fontSize: "11px", opacity: 0.3 }}>
                        Your trading constitution — one principle above all
                      </p>
                    </div>
                  </motion.button>
                )}

                {/* EDITING */}
                {editing && (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", gap: 12 }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", opacity: 0.38, marginBottom: 2,
                    }}>
                      <PencilLine size={11} strokeWidth={2.5} />
                      Composing
                    </div>
                    <textarea
                      value={ruleText}
                      onChange={(e) => setRuleText(e.target.value)}
                      autoFocus
                      placeholder="e.g. Never risk more than 1% per trade. Discipline over emotion."
                      rows={5}
                      style={{
                        width: "100%",
                        borderRadius: "14px",
                        border: "1px solid rgba(34,197,94,0.35)",
                        background: "rgba(34,197,94,0.04)",
                        padding: "14px 16px",
                        fontSize: "14px",
                        lineHeight: 1.65,
                        color: "var(--text)",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(34,197,94,0.6)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(34,197,94,0.35)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={saveRule}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 7,
                          padding: "11px 0",
                          borderRadius: "12px",
                          background: "var(--primary)",
                          color: "#000",
                          fontWeight: 800,
                          fontSize: "12px",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          border: "none",
                          cursor: "pointer",
                          boxShadow: "0 4px 22px rgba(34,197,94,0.3)",
                        }}
                      >
                        <Save size={13} strokeWidth={2.5} />
                        Save Rule
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setEditing(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "11px 16px",
                          borderRadius: "12px",
                          background: "transparent",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          opacity: 0.5,
                        }}
                      >
                        <X size={13} strokeWidth={2.5} />
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* SAVED */}
                {savedRule && !editing && (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: "flex", flexDirection: "column", gap: 18 }}
                  >
                    {/* rule block */}
                    <div style={{
                      position: "relative",
                      padding: "20px 20px 20px 24px",
                      borderRadius: "16px",
                      background: "rgba(34,197,94,0.04)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      overflow: "hidden",
                    }}>
                      {/* accent bar */}
                      <div style={{
                        position: "absolute",
                        left: 0, top: "10%",
                        height: "80%", width: 3,
                        borderRadius: "0 3px 3px 0",
                        background: "linear-gradient(180deg, transparent, var(--primary), transparent)",
                      }} />
                      {/* decorative quote */}
                      <div aria-hidden style={{
                        position: "absolute",
                        top: -8, right: 14,
                        fontSize: "80px", lineHeight: 1,
                        fontFamily: "Georgia, serif",
                        color: "var(--primary)",
                        opacity: 0.08,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}>
                        "
                      </div>
                      <p style={{
                        fontSize: "15px",
                        fontStyle: "italic",
                        lineHeight: 1.78,
                        opacity: 0.85,
                        margin: 0,
                        position: "relative",
                        zIndex: 1,
                      }}>
                        {savedRule.text}
                      </p>
                    </div>

                    {/* action row */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        fontSize: "10px", opacity: 0.28,
                        fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                      }}>
                        <BookMarked size={10} strokeWidth={2.5} />
                        Your constitution
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setEditing(true)}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "7px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border)",
                            background: "transparent",
                            color: "var(--text)",
                            fontSize: "11px", fontWeight: 700,
                            cursor: "pointer",
                            letterSpacing: "0.04em",
                            opacity: 0.55,
                          }}
                        >
                          <PencilLine size={11} strokeWidth={2.5} />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={deleteRule}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "7px 14px",
                            borderRadius: "10px",
                            border: "1px solid rgba(239,68,68,0.25)",
                            background: "rgba(239,68,68,0.05)",
                            color: "#ef4444",
                            fontSize: "11px", fontWeight: 700,
                            cursor: "pointer",
                            letterSpacing: "0.04em",
                          }}
                        >
                          <Trash2 size={11} strokeWidth={2.5} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </Card>

        </div>
        {/* end grid */}

      </div>
    </div>
  );
}