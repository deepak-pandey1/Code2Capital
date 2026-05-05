"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Globe,
  ShieldCheck,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const linkClass =
    "text-sm text-[var(--text)]/60 hover:text-[var(--primary)] transition-colors duration-300";

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[var(--primary)]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.9fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <Globe className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
                  Code2Capital
                </h2>
                <p className="text-sm text-[var(--text)]/50">
                  Precision trading analytics
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-[var(--text)]/65">
              Track trades, analyze performance, and build smarter trading habits with a clean,
              modern dashboard designed for serious traders.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
              >
                Open Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]/70">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link href="/dashboard" className={linkClass}>Dashboard</Link>
              <br />
              <Link href="/dashboard/journal" className={linkClass}>Journal</Link>
              <br />
              <Link href="/dashboard/analytics" className={linkClass}>Analytics</Link>
              <br />
              <Link href="/dashboard/screenshots" className={linkClass}>Screenshots</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]/70">
              Legal & Support
            </h3>

            <div className="space-y-3">
              <Link href="/privacy" className={linkClass}>Privacy Policy</Link>
              <br />
              <Link href="/terms" className={linkClass}>Terms & Conditions</Link>
              <br />
              <Link href="/contact" className={linkClass}>Contact Us</Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
        />

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[var(--text)]/45"
          >
            © 2026 Code2Capital. All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="mailto:support@code2capital.com"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--text)]/70 transition-all duration-300 hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
            >
              <Mail className="h-4 w-4" />
              support@code2capital.com
            </a>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[var(--text)]/45"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
            Secure & private
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5">
            <FileText className="h-3.5 w-3.5 text-[var(--primary)]" />
            Legal pages included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-[var(--primary)]" />
            Built for traders
          </span>
        </motion.div>
      </div>
    </footer>
  );
}