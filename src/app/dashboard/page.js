"use client";

import { onAuthStateChanged } from "firebase/auth";
import { FiTrendingUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PencilLine, Plus, Save, X, Trash2, BookMarked } from "lucide-react";

import RecentNewsPanel from "@/components/dashboard/RecentNewsPanel";
import { auth } from "@/lib/firebase";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DailyInsightPremium from "@/components/dashboard/DailyInsightPremium";

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
        background:
          "radial-gradient(circle at 15% 15%, rgba(34,197,94,0.05), transparent 30%), radial-gradient(circle at 85% 80%, rgba(34,197,94,0.03), transparent 28%)",
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="34"
            height="34"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.05" fill="var(--primary)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════ */
function Card({ children, delay = 0, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        borderRadius: "22px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        overflow: "hidden",
        boxShadow:
          "0 12px 30px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.04) inset",
       animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
        willChange: "transform, opacity",
        // 🔥 ADD THESE 3 LINES (important for zero jerk)
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          width: "84%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.22), transparent)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
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
        <div
          style={{
            width: 36,
            height: 36,
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
        </div>
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
        <div
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
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "inline-block",
            }}
          />
          {badge}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════ */
export default function Dashboard() {
  const [ruleText, setRuleText] = useState("");
  const [savedRule, setSavedRule] = useState(null);
  const [editing, setEditing] = useState(false);
  const [lang, setLang] = useState("EN");

const [userId, setUserId] = useState("");
const [authReady, setAuthReady] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

const [coreRuleReady, setCoreRuleReady] = useState(false);
const [minLoadingDone, setMinLoadingDone] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user || null);
    setUserId(user ? user.uid : "");
    setAuthReady(true);
  });

  return () => unsubscribe();
}, []);

useEffect(() => {
  if (!authReady) return;

  if (!currentUser) {
    setSavedRule(null);
    setRuleText("");
    setEditing(false);
    setCoreRuleReady(true);
    return;
  }

  setSavedRule(null);
  setRuleText("");
  setEditing(false);
  setCoreRuleReady(false);

  const loadRule = async () => {
    try {
      const token = await currentUser.getIdToken();

      const res = await fetch("/api/core-rule", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const d = await res.json();

      if (d?.rule) {
        setSavedRule(d.rule);
        setRuleText(d.rule.text || "");
      } else {
        setSavedRule(null);
        setRuleText("");
      }
    } catch (error) {
      setSavedRule(null);
      setRuleText("");
    } finally {
      setCoreRuleReady(true);
    }
  };

  loadRule();
}, [currentUser, authReady]);

useEffect(() => {
  const t = setTimeout(() => setMinLoadingDone(true), 650);
  return () => clearTimeout(t);
}, []);

const saveRule = async () => {
  if (!currentUser) {
    alert("Please login first");
    return;
  }

  try {
    const token = await currentUser.getIdToken();

    const res = await fetch("/api/core-rule", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: ruleText }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Failed to save core rule");
      return;
    }

    setSavedRule(data.rule);
    setEditing(false);
  } catch (error) {
    alert("Network error while saving core rule");
  }
};

const deleteRule = async () => {
  if (!currentUser) return;

  const token = await currentUser.getIdToken();

  await fetch("/api/core-rule", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: savedRule?._id }),
  });

  setSavedRule(null);
  setRuleText("");
  setEditing(false);
};

if (!authReady || !minLoadingDone || !coreRuleReady) {
  return <DashboardSkeleton />;
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflowX: "hidden",
            // 🔥 ADD THESE
    WebkitOverflowScrolling: "touch",
    scrollBehavior: "smooth",
      }}
    >
      <style>{`
  html, body {
    scroll-behavior: smooth;
    overscroll-behavior-y: none;
    scrollbar-gutter: stable;
  }

  body {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* smooth premium scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(34,197,94,0.24) transparent;
  }

  *::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(34,197,94,0.22);
    border-radius: 999px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: rgba(34,197,94,0.34);
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 980px) {
    .dashboard-shell {
      padding: 2px 16px !important;
    }
    .dashboard-grid {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 640px) {
    .dashboard-shell {
      padding: 2px 12px !important;
    }
    .dashboard-card-body {
      padding: 16px 16px 18px !important;
    }
    .dashboard-card-header {
      padding: 16px 16px 14px !important;
    }
  }
`}</style>

      <AmbientBackground />

      <div
        className="dashboard-shell"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "2px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          transform: "translateZ(0)",
        }}
      >
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <FiTrendingUp
                size={16}
                style={{
                  color: "var(--primary)",
                  opacity: 0.85,
                }}
              />
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  opacity: 0.75,
                }}
              >
                Trading Workspace
              </span>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              Dashboard
            </h1>
          </div>
        </header>

        {/* Sirf yeh one insight component rakho */}
        <DailyInsightPremium lang={lang} setLang={setLang} />

        <div
          className="dashboard-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <div style={{ minWidth: 0, height: "100%", display: "flex", width: "100%" }}>
  <div style={{ width: "100%", minWidth: 0, flex: 1, alignSelf: "stretch" }}>
    <RecentNewsPanel />
  </div>
</div>

          <Card delay={0.08}>
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardHeader icon={BookMarked} title="Core Rule" />
              <div className="dashboard-card-body" style={{ padding: "20px 22px 24px" }}>
                <AnimatePresence mode="wait">
                  {!savedRule && !editing && (
                    <button
                      key="empty"
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
                        transition: "transform 0.18s ease, border-color 0.18s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          background: "rgba(34,197,94,0.1)",
                          border: "1px solid rgba(34,197,94,0.22)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Plus size={19} color="var(--primary)" strokeWidth={2.5} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            marginBottom: 4,
                            opacity: 0.65,
                          }}
                        >
                          Define your core rule
                        </p>
                        <p style={{ fontSize: "11px", opacity: 0.3 }}>
                          Your trading constitution — one principle above all
                        </p>
                      </div>
                    </button>
                  )}

                  {editing && (
                    <div
                      key="editing"
                      style={{ display: "flex", flexDirection: "column", gap: 12 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          opacity: 0.38,
                          marginBottom: 2,
                        }}
                      >
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
                          border: "1px solid rgba(34,197,94,0.26)",
                          background: "rgba(34,197,94,0.03)",
                          padding: "14px 16px",
                          fontSize: "14px",
                          lineHeight: 1.65,
                          color: "var(--text)",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          boxSizing: "border-box",
                          transition: "border-color 0.18s ease, box-shadow 0.18s ease",
                        }}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
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
                            boxShadow: "0 4px 20px rgba(34,197,94,0.20)",
                            transition: "transform 0.18s ease",
                          }}
                        >
                          <Save size={13} strokeWidth={2.5} />
                          Save Rule
                        </button>
                        <button
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
                            opacity: 0.55,
                            transition: "transform 0.18s ease",
                          }}
                        >
                          <X size={13} strokeWidth={2.5} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {savedRule && !editing && (
                    <div
                      key="saved"
                      style={{ display: "flex", flexDirection: "column", gap: 18 }}
                    >
                      <div
                        style={{
                          position: "relative",
                          padding: "20px 20px 20px 24px",
                          borderRadius: "16px",
                          background: "rgba(34,197,94,0.04)",
                          border: "1px solid rgba(34,197,94,0.15)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "10%",
                            height: "80%",
                            width: 3,
                            borderRadius: "0 3px 3px 0",
                            background:
                              "linear-gradient(180deg, transparent, var(--primary), transparent)",
                          }}
                        />
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: -8,
                            right: 14,
                            fontSize: "80px",
                            lineHeight: 1,
                            fontFamily: "Georgia, serif",
                            color: "var(--primary)",
                            opacity: 0.08,
                            userSelect: "none",
                            pointerEvents: "none",
                          }}
                        >
                          "
                        </div>
                        <p
  style={{
    fontSize: "15px",
    fontStyle: "italic",
    lineHeight: 1.78,
    opacity: 0.85,
    margin: 0,
    position: "relative",
    zIndex: 1,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  }}
>
  {savedRule.text}
</p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: "10px",
                            opacity: 0.28,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          <BookMarked size={10} strokeWidth={2.5} />
                          Your constitution
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => setEditing(true)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "7px 14px",
                              borderRadius: "10px",
                              border: "1px solid var(--border)",
                              background: "transparent",
                              color: "var(--text)",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                              letterSpacing: "0.04em",
                              opacity: 0.55,
                              transition: "transform 0.18s ease",
                            }}
                          >
                            <PencilLine size={11} strokeWidth={2.5} />
                            Edit
                          </button>
                          <button
                            onClick={deleteRule}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "7px 14px",
                              borderRadius: "10px",
                              border: "1px solid rgba(239,68,68,0.25)",
                              background: "rgba(239,68,68,0.05)",
                              color: "#ef4444",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                              letterSpacing: "0.04em",
                              transition: "transform 0.18s ease",
                            }}
                          >
                            <Trash2 size={11} strokeWidth={2.5} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}