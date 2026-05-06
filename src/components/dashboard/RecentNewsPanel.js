"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Newspaper,
  Clock3,
  RefreshCw,
  Languages,
  Maximize2,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { convertToHinglish } from "@/utils/convertToHinglish";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function isWithinLast7Days(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;

  return Date.now() - date.getTime() <= ONE_WEEK_MS;
}

function normalizeSource(val = "") {
  return val.toLowerCase().trim();
}

function timeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const diff = Math.max(0, now - date);

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hr ago`;
  return `${days} day ago`;
}

function sortLatestFirst(items = []) {
  return [...items].sort(
    (a, b) =>
      new Date(b?.publishedAt || 0).getTime() -
      new Date(a?.publishedAt || 0).getTime()
  );
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const readTheme = () =>
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark");

    const sync = () => setIsDark(readTheme());

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function PremiumLoaderCard({ isDark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        borderRadius: 18,
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(34,197,94,0.12)",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
          : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
        padding: 16,
        minHeight: 138,
        position: "relative",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 14px 34px rgba(0,0,0,0.24)"
          : "0 12px 28px rgba(15,23,42,0.06)",
      }}
    >
      <motion.div
        animate={{ x: ["-120%", "220%"] }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.12), transparent)",
          width: "45%",
          transform: "skewX(-18deg)",
          filter: "blur(2px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            height: 12,
            width: "70%",
            borderRadius: 999,
            background: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(15,23,42,0.06)",
            marginBottom: 12,
          }}
        />
        <div
          style={{
            height: 12,
            width: "92%",
            borderRadius: 999,
            background: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(15,23,42,0.06)",
            marginBottom: 10,
          }}
        />
        <div
          style={{
            height: 12,
            width: "62%",
            borderRadius: 999,
            background: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(15,23,42,0.06)",
            marginBottom: 20,
          }}
        />

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <motion.div
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: isDark
                ? "rgba(34,197,94,0.20)"
                : "rgba(34,197,94,0.16)",
            }}
          />
          <div
            style={{
              height: 10,
              width: 74,
              borderRadius: 999,
              background: isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(15,23,42,0.06)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function PremiumNewsCard({ item, language, isDark = false }) {
  const title =
    language === "hinglish"
      ? convertToHinglish(item?.title || "")
      : item?.title || "";

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -3, scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        mass: 0.6,
      }}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderRadius: 18,
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(34,197,94,0.12)",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))"
          : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,250,252,0.90))",
        boxShadow: isDark
          ? "0 12px 36px rgba(0,0,0,0.36), 0 1px 0 rgba(255,255,255,0.04) inset"
          : "0 10px 30px rgba(15,23,42,0.05), 0 1px 0 rgba(255,255,255,0.6) inset",
        overflow: "hidden",
        position: "relative",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, rgba(34,197,94,0.0), rgba(34,197,94,0.72), rgba(34,197,94,0.0))",
        }}
      />

      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 10,
              background: isDark
                ? "rgba(34,197,94,0.12)"
                : "rgba(34,197,94,0.10)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              border: isDark
                ? "1px solid rgba(34,197,94,0.18)"
                : "1px solid rgba(34,197,94,0.14)",
            }}
          >
            <ArrowUpRight size={14} color="var(--primary)" />
          </div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            fontSize: 11,
            color: isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.70)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 8px",
              borderRadius: 999,
              background: isDark
                ? "rgba(34,197,94,0.10)"
                : "rgba(34,197,94,0.06)",
              border: isDark
                ? "1px solid rgba(34,197,94,0.16)"
                : "1px solid rgba(34,197,94,0.10)",
            }}
          >
            <Clock3 size={11} />
            {timeAgo(item.publishedAt)}
          </span>

          <span
            style={{
              padding: "5px 8px",
              borderRadius: 999,
              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(15,23,42,0.03)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(15,23,42,0.06)",
            }}
          >
            {item.source || "News"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function ModalShell({
  children,
  onClose,
  language,
  refreshing,
  newsLength,
  isDark,
  sourceFilter,
  setSourceFilter,
  sourceOptions,
}) {
  const [sourceOpen, setSourceOpen] = useState(false);
const sourceWrapRef = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark
          ? "radial-gradient(circle at 20% 10%, rgba(34,197,94,0.10), transparent 26%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.08), transparent 28%), rgba(3,5,10,0.82)"
          : "radial-gradient(circle at 20% 10%, rgba(34,197,94,0.10), transparent 26%), rgba(8, 15, 23, 0.46)",
        backdropFilter: "blur(22px) saturate(140%)",
        WebkitBackdropFilter: "blur(22px) saturate(140%)",
        display: "grid",
        placeItems: "center",
        padding: 14,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 24,
          mass: 0.75,
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1120px, 100%)",
          maxHeight: "88vh",
          borderRadius: 28,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transform: "translateZ(0)",
          background: isDark
            ? "linear-gradient(180deg, rgba(10,13,20,0.94), rgba(6,8,14,0.92))"
            : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(247,250,252,0.94))",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.18)",
          boxShadow: isDark
            ? "0 35px 100px rgba(0,0,0,0.68), 0 1px 0 rgba(255,255,255,0.03) inset"
            : "0 30px 90px rgba(0,0,0,0.34)",
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.08)",
            background: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))"
              : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.78))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 16,
                background: isDark
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(34,197,94,0.10)",
                border: isDark
                  ? "1px solid rgba(34,197,94,0.18)"
                  : "1px solid rgba(34,197,94,0.16)",
                display: "grid",
                placeItems: "center",
                boxShadow: isDark ? "0 10px 24px rgba(0,0,0,0.28)" : "none",
                flexShrink: 0,
              }}
            >
              <Newspaper size={17} color="var(--primary)" />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
                Recent News
              </div>
              <div
                style={{
                  fontSize: 12,
                  opacity: isDark ? 0.72 : 0.64,
                  color: "var(--text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {language === "hinglish" ? "Hinglish mode" : "English mode"} •{" "}
                {newsLength} stories
              </div>
            </div>
          </div>

         <div
  ref={sourceWrapRef}
  style={{
    display: "flex",
    gap: 10,
    alignItems: "center",
    position: "relative",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  }}
>
  <button
    onClick={() => setSourceOpen((v) => !v)}
    style={{
      height: 40,
      minWidth: 165,
      padding: "0 14px",
      borderRadius: 14,
      border: isDark
        ? "1px solid rgba(255,255,255,0.10)"
        : "1px solid rgba(15,23,42,0.10)",
      background: isDark
        ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
        : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
      color: "var(--text)",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      fontSize: 12,
      fontWeight: 700,
      boxShadow: isDark
        ? "0 10px 24px rgba(0,0,0,0.22)"
        : "0 8px 18px rgba(15,23,42,0.06)",
      backdropFilter: "blur(14px) saturate(140%)",
      WebkitBackdropFilter: "blur(14px) saturate(140%)",
      transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
      transform: "translateZ(0)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0px)";
    }}
  >
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {sourceOptions.find((opt) => opt.key === sourceFilter)?.label || "All sources"}
    </span>

    <motion.span
      animate={{ rotate: sourceOpen ? 180 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ display: "inline-flex", flexShrink: 0 }}
    >
      <ChevronDown size={15} />
    </motion.span>
  </button>

  <AnimatePresence>
    {sourceOpen ? (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.75,
        }}
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          zIndex: 10010,
          minWidth: 240,
          maxHeight: 280,
          overflowY: "auto",
          padding: 8,
          borderRadius: 18,
          border: isDark
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(15,23,42,0.08)",
          background: isDark
            ? "linear-gradient(180deg, rgba(10,13,20,0.98), rgba(7,10,16,0.96))"
            : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96))",
          boxShadow: isDark
            ? "0 30px 90px rgba(0,0,0,0.55)"
            : "0 24px 70px rgba(15,23,42,0.18)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
        }}
      >
        {sourceOptions.map((opt, index) => {
          const active = opt.key === sourceFilter;

          return (
            <motion.button
              key={opt.key}
              onClick={() => {
                setSourceFilter(opt.key);
                setSourceOpen(false);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                textAlign: "left",
                color: "var(--text)",
                background: active
                  ? isDark
                    ? "rgba(34,197,94,0.16)"
                    : "rgba(34,197,94,0.10)"
                  : "transparent",
                transition: "background 160ms ease",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: active ? 800 : 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {opt.label}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                {active ? (
                  <motion.span
                    key="active-dot"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "var(--primary)",
                      boxShadow: "0 0 0 4px rgba(34,197,94,0.12)",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <span style={{ width: 8, height: 8, flexShrink: 0 }} />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>
    ) : null}
  </AnimatePresence>

<motion.button
  type="button"
  onClick={onClose}
  whileHover={{ y: -1, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
  style={{
    width: 40,
    height: 40,
    borderRadius: 14,
    border: isDark
      ? "1px solid rgba(255,255,255,0.10)"
      : "1px solid rgba(15,23,42,0.10)",
    background: isDark
      ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
      : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
    cursor: "pointer",
    color: "var(--text)",
    boxShadow: isDark
      ? "0 10px 24px rgba(0,0,0,0.22)"
      : "0 8px 18px rgba(15,23,42,0.06)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    lineHeight: 0,
    flexShrink: 0,
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    transform: "translateZ(0)",
    willChange: "transform",
  }}
  aria-label="Close news modal"
>
  <span style={{ display: "grid", placeItems: "center", lineHeight: 0 }}>
    <X size={16} />
  </span>
</motion.button>
</div>
        </div>

        <div
          className="news-scroll"
          style={{
            padding: 18,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            position: "relative",
            flex: 1,
            background: isDark
              ? "radial-gradient(circle at top, rgba(34,197,94,0.08), transparent 34%), radial-gradient(circle at bottom right, rgba(59,130,246,0.06), transparent 28%), linear-gradient(180deg, rgba(5,5,10,0.96), rgba(7,10,16,0.92))"
              : "radial-gradient(circle at top, rgba(34,197,94,0.05), transparent 40%)",
            willChange: "scroll-position",
          }}
        >
          {refreshing ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: 18,
                pointerEvents: "none",
                background: isDark
                  ? "linear-gradient(180deg, rgba(5,5,10,0.10), rgba(5,5,10,0.04))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 14,
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <PremiumLoaderCard  key={i} isDark={isDark} />
                ))}
              </div>
            </div>
          ) : null}

          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CompactNewsSkeleton({ isDark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        height: 62,
        borderRadius: 12,
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(34,197,94,0.10)",
        background: isDark
          ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
          : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,250,252,0.90))",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          width: "45%",
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.10), transparent)",
        }}
      />
      <div style={{ padding: 12, position: "relative", zIndex: 1 }}>
        <div
          style={{
            height: 11,
            width: "85%",
            borderRadius: 999,
            background: isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.06)",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 9,
            width: "46%",
            borderRadius: 999,
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.05)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function RecentNewsPanel({ onInitialLoaded }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [language, setLanguage] = useState("en");
  const [expanded, setExpanded] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [mounted, setMounted] = useState(false);
  const inFlightRef = useRef(false);
  const isDark = useIsDarkMode();
  const reduceMotion = useReducedMotion();

  // ✅ Only last 7 days news
const visibleNews = useMemo(() => {
  return sortLatestFirst(news).filter((item) =>
    isWithinLast7Days(item?.publishedAt)
  );
}, [news]);

  // ✅ create source dropdown options
const sourceOptions = useMemo(() => {
  const map = new Map();

  visibleNews.forEach((item) => {
    const src = item?.source || "News";
    const key = normalizeSource(src);

    if (!map.has(key)) map.set(key, src);
  });

  return [
    { key: "all", label: "All sources" },
    ...Array.from(map, ([key, label]) => ({ key, label })),
  ];
}, [visibleNews]);

// ✅ filter news by source
const filteredNews = useMemo(() => {
  if (sourceFilter === "all") return visibleNews;

  return visibleNews.filter(
    (item) =>
      normalizeSource(item?.source || "News") ===
      normalizeSource(sourceFilter)
  );
}, [visibleNews, sourceFilter]);

// ✅ final display news
const displayNews = useMemo(() => {
  return filteredNews.map((item) => ({
    ...item,
    displayTitle:
      language === "hinglish"
        ? convertToHinglish(item?.title || "")
        : item?.title || "",
  }));
}, [filteredNews, language]);

  const fetchNews = async (manual = false) => {
    if (inFlightRef.current) return;

    try {
      inFlightRef.current = true;

      if (manual) {
        setRefreshing(true);
        setRefreshKey((n) => n + 1);
      } else {
        setLoading(true);
      }

      const startedAt = Date.now();
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();

      const items = Array.isArray(data?.news) ? data.news : [];
      setNews(sortLatestFirst(items));

      if (manual) {
        const elapsed = Date.now() - startedAt;
        const minimumVisibleTime = 650;
        const remaining = Math.max(0, minimumVisibleTime - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
      }
    } catch {
      setNews([]);
    } finally {
  setLoading(false);
  setRefreshing(false);
  inFlightRef.current = false;

  if (!manual && onInitialLoaded) {
    onInitialLoaded();
  }
}
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchNews(false);

    const id = setInterval(() => {
      fetchNews(false);
    }, 10 * 60 * 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

const showLoader = loading || refreshing;

  const animationSpring = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 220, damping: 26, mass: 0.75 };

  return (
    <>
      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid var(--border)",
          background: isDark
            ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))"
            : "var(--card)",
          overflow: "hidden",
          boxShadow: isDark
            ? "0 16px 45px rgba(0,0,0,0.34)"
            : "0 2px 8px rgba(0,0,0,0.06)",
          minWidth: 0,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            background: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
              : "transparent",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                background: isDark
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(34,197,94,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: "translateZ(0)",
                border: isDark ? "1px solid rgba(34,197,94,0.16)" : "none",
              }}
            >
              <Newspaper size={15} color="var(--primary)" />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  color: "var(--text)",
                }}
              >
                Top News
              </div>
              <div
                style={{
                  fontSize: 12,
                  opacity: 0.62,
                  color: "var(--text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Latest market headlines
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() =>
                setLanguage((prev) => (prev === "en" ? "hinglish" : "en"))
              }
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 11px",
                borderRadius: 10,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--border)",
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.02)",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text)",
                opacity: loading ? 0.7 : 1,
                transition: "transform 0.16s ease, opacity 0.16s ease",
                transform: "translateZ(0)",
              }}
              aria-label="Toggle language"
              title="Toggle EN ↔ Hinglish"
            >
              <Languages size={13} />
              {language === "en" ? "EN" : "Hinglish"}
            </button>

            <button
              onClick={() => setExpanded(true)}
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px 10px",
                borderRadius: 10,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--border)",
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.02)",
                cursor: loading ? "not-allowed" : "pointer",
                color: "var(--text)",
                opacity: loading ? 0.7 : 1,
                transition: "transform 0.16s ease, opacity 0.16s ease",
                transform: "translateZ(0)",
              }}
              aria-label="Expand news"
              title="Open in modal"
            >
              <Maximize2 size={13} />
            </button>

            <button
              onClick={() => fetchNews(true)}
              disabled={refreshing || loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 11px",
                borderRadius: 10,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--border)",
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.02)",
                cursor: refreshing || loading ? "not-allowed" : "pointer",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text)",
                opacity: refreshing || loading ? 0.85 : 1,
                transition: "transform 0.16s ease, opacity 0.16s ease",
                transform: "translateZ(0)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  animation: refreshing ? "newsSpin 0.9s linear infinite" : "none",
                  willChange: "transform",
                }}
              >
                <RefreshCw size={13} />
              </span>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div
          className="news-scroll"
          style={{
            padding: 12,
            maxHeight: 242, // 3 news compact view remains same
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarGutter: "stable",
            transform: "translateZ(0)",
            willChange: "scroll-position",
            position: "relative",
            background: isDark ? "rgba(255,255,255,0.01)" : "transparent",
          }}
        >
          <style>{`
            .news-scroll {
              scroll-behavior: smooth;
            }
            .news-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .news-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .news-scroll::-webkit-scrollbar-thumb {
              background: rgba(34,197,94,0.24);
              border-radius: 999px;
            }
            .news-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(34,197,94,0.34);
            }

            @keyframes newsSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes softShimmer {
              0% { background-position: -200px 0; }
              100% { background-position: 200px 0; }
            }

            .news-skeleton {
              height: 70px;
              border-radius: 12px;
              background: linear-gradient(
                90deg,
                rgba(34,197,94,0.04) 25%,
                rgba(34,197,94,0.10) 50%,
                rgba(34,197,94,0.04) 75%
              );
              background-size: 400px 100%;
              animation: softShimmer 1.15s ease-in-out infinite;
              border: 1px solid rgba(34,197,94,0.08);
            }

            .news-item {
              display: block;
              padding: 12px;
              border-radius: 12px;
              border: 1px solid rgba(34,197,94,0.10);
              text-decoration: none;
              color: inherit;
              transition:
                border-color 0.16s ease,
                background 0.16s ease,
                box-shadow 0.16s ease,
                transform 0.16s ease;
              transform: translateZ(0);
              will-change: transform, opacity;
            }

            .news-item:hover {
              border-color: rgba(34,197,94,0.18);
              background: rgba(34,197,94,0.04);
              box-shadow: 0 6px 12px rgba(0,0,0,0.04);
              transform: translateY(-1px);
            }

            @media (max-width: 640px) {
              .news-item {
                padding: 11px;
              }
            }
          `}</style>

                    <AnimatePresence mode="wait" initial={false}>
  {showLoader ? (
  <motion.div
    key={refreshing ? "refresh-loader" : "initial-loader"}
    initial={{ opacity: 0, y: 8, scale: 0.995 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -6, scale: 0.995 }}
    transition={animationSpring}
    style={{
      display: "grid",
      gap: 10,
    }}
  >
    {Array.from({ length: 3 }).map((_, i) => (
      <CompactNewsSkeleton key={i} isDark={isDark} />
    ))}
  </motion.div>
) : visibleNews.length === 0 ? (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={animationSpring}
      style={{
        padding: 18,
        borderRadius: 12,
        border: isDark
          ? "1px dashed rgba(255,255,255,0.12)"
          : "1px dashed rgba(34,197,94,0.18)",
        fontSize: 12,
        opacity: 0.72,
        textAlign: "center",
        color: "var(--text)",
      }}
    >
      News abhi available nahi hai.
    </motion.div>
  ) : (
    <motion.div
      key={`news-${language}`}
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={animationSpring}
      style={{
        display: "grid",
        gap: 10,
        transform: "translateZ(0)",
      }}
    >
      {displayNews.map((item, i) => (
        <a
          key={`${item.title}-${i}`}
          className="news-item"
          href={item.link}
          target="_blank"
          rel="noreferrer"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(34,197,94,0.025)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
              color: "var(--text)",
            }}
          >
            {item.displayTitle}
          </div>

          <div
            style={{
              marginTop: 7,
              fontSize: 11,
              opacity: 0.62,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
              color: "var(--text)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Clock3 size={11} />
              {timeAgo(item.publishedAt)}
            </span>
            <span>•</span>
            <span>{item.source || "News"}</span>
          </div>
        </a>
      ))}
    </motion.div>
  )}
</AnimatePresence>

          
        </div>
      </div>

      {mounted
  ? createPortal(
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <ModalShell
            onClose={() => setExpanded(false)}
            language={language}
            refreshing={refreshing}
            newsLength={displayNews.length}
            isDark={isDark}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            sourceOptions={sourceOptions}
          >
            {displayNews.length === 0 ? (
              <div
                style={{
                  padding: 22,
                  borderRadius: 18,
                  border: isDark
                    ? "1px dashed rgba(255,255,255,0.12)"
                    : "1px dashed rgba(34,197,94,0.18)",
                  fontSize: 13,
                  opacity: 0.72,
                  textAlign: "center",
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.70)",
                  color: "var(--text)",
                }}
              >
                News abhi available nahi hai.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: 14,
                }}
              >
                {displayNews.map((item, i) => (
                  <PremiumNewsCard
                    key={`${item.title}-${i}-modal`}
                    item={item}
                    language={language}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </ModalShell>
        ) : null}
      </AnimatePresence>,
      document.body
    )
  : null}
    </>
  );
}