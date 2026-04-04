"use client";

import { motion, AnimatePresence } from "framer-motion";
import Login from "@/app/login/page";

export default function LoginModal({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"
          />

          {/* MODAL CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md p-[1px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* INNER CARD */}
            <div
              className="relative z-10 rounded-2xl"
              style={{
                background: "var(--bg)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              <Login />
            </div>

            {/* GLOW EFFECT */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl blur-xl bg-green-500/10 opacity-40"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}