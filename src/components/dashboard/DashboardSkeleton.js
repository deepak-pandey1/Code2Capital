"use client";

/* Small reusable line */
function SkeletonLine({ width = "100%", height = 14, radius = 999 }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, rgba(34,197,94,0.05) 0%, rgba(34,197,94,0.12) 50%, rgba(34,197,94,0.05) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

/* Simple Card (duplicate safe version, no dependency) */
function SkeletonCard({ children }) {
  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        overflow: "hidden",
        boxShadow:
          "0 12px 30px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.04) inset",
      }}
    >
      {children}
    </div>
  );
}

/* MAIN SKELETON */
export default function DashboardSkeleton() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 980px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "10px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* HEADER */}
        <div>
          <SkeletonLine width={180} height={10} />
          <div style={{ height: 10 }} />
          <SkeletonLine width={240} height={44} radius={14} />
        </div>

        {/* INSIGHT */}
        <SkeletonCard>
          <div style={{ padding: "20px 22px" }}>
            <SkeletonLine width={120} height={10} />
            <div style={{ height: 18 }} />
            <SkeletonLine width="100%" height={150} radius={16} />
          </div>
        </SkeletonCard>

        {/* GRID */}
        <div
          className="dashboard-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {/* NEWS */}
          <SkeletonCard>
            <div style={{ padding: "20px 22px" }}>
              <div style={{ marginBottom: 18 }}>
                <SkeletonLine width={120} height={10} />
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <SkeletonLine height={62} radius={12} />
                <SkeletonLine height={62} radius={12} />
                <SkeletonLine height={62} radius={12} />
              </div>
            </div>
          </SkeletonCard>

          {/* CORE RULE */}
          <SkeletonCard>
            <div style={{ padding: "20px 22px" }}>
              <SkeletonLine width={90} height={10} />
              <div style={{ height: 18 }} />

              {/* SAME HEIGHT AS REAL CARD */}
              <SkeletonLine height={170} radius={16} />

              <div style={{ height: 18 }} />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <SkeletonLine width={110} height={12} />
                <div style={{ display: "flex", gap: 8 }}>
                  <SkeletonLine width={54} height={30} radius={10} />
                  <SkeletonLine width={64} height={30} radius={10} />
                </div>
              </div>
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}