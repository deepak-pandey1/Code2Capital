"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);
  const latestPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      latestPos.current = { x: e.clientX, y: e.clientY };

      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        setPos(latestPos.current);
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(34,197,94,0.12), transparent 60%)`,
      }}
    />
  );
}