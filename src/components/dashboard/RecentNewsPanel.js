"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Newspaper, Clock3, RefreshCw } from "lucide-react";

function timeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

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

export default function RecentNewsPanel() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const inFlightRef = useRef(false);

  const visibleNews = useMemo(() => sortLatestFirst(news), [news]);

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
        const minimumVisibleTime = 700;
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
    }
  };

  useEffect(() => {
    fetchNews(false);

    const id = setInterval(() => {
      fetchNews(false);
    }, 10 * 60 * 1000);

    return () => clearInterval(id);
  }, []);

  const showSkeleton = loading || refreshing;
  const skeletonCount = Math.max(visibleNews.length, 6);

  return (
    <div
      style={{
        borderRadius: "20px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              background: "rgba(34,197,94,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Newspaper size={15} color="var(--primary)" />
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Top News
            </div>
            <div style={{ fontSize: 12, opacity: 0.62 }}>
              Latest market headlines
            </div>
          </div>
        </div>

        <button
          onClick={() => fetchNews(true)}
          disabled={refreshing || loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 11px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.02)",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text)",
            opacity: refreshing || loading ? 0.85 : 1,
            transition: "transform 0.18s ease, opacity 0.18s ease",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              animation: refreshing ? "newsSpin 0.8s linear infinite" : "none",
            }}
          >
            <RefreshCw size={13} />
          </span>
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div
        className="news-scroll"
        style={{
          padding: 12,
          maxHeight: 242,
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          scrollbarGutter: "stable",
          transform: "translateZ(0)",
          willChange: "scroll-position",
        }}
      >
        <style>{`
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
            background: rgba(34,197,94,0.025);
            text-decoration: none;
            color: inherit;
            transition:
              border-color 0.16s ease,
              background 0.16s ease,
              box-shadow 0.16s ease;
            transform: translateZ(0);
          }

          .news-item:hover {
            border-color: rgba(34,197,94,0.18);
            background: rgba(34,197,94,0.04);
            box-shadow: 0 6px 12px rgba(0,0,0,0.04);
          }
        `}</style>

        {showSkeleton ? (
          <div key={`skeleton-${refreshKey}`} style={{ display: "grid", gap: 10 }}>
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="news-skeleton" />
            ))}
          </div>
        ) : visibleNews.length === 0 ? (
          <div
            style={{
              padding: 18,
              borderRadius: 12,
              border: "1px dashed rgba(34,197,94,0.18)",
              fontSize: 12,
              opacity: 0.6,
              textAlign: "center",
            }}
          >
            News abhi available nahi hai.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {visibleNews.map((item, i) => (
              <a
                key={`${item.title}-${i}`}
                className="news-item"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>
                  {item.title}
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
                  }}
                >
                  <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                    <Clock3 size={11} />
                    {timeAgo(item.publishedAt)}
                  </span>
                  <span>•</span>
                  <span>{item.source || "News"}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}