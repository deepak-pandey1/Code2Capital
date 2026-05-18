"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  FileText,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

function AnimatedLogo() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: { opacity: 0, y: 14, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: "easeOut",
            staggerChildren: 0.08,
          },
        },
      }}
      className="flex items-center gap-3"
    >
      <motion.svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--text)]"
        style={{ willChange: "transform" }}
        variants={{
          hidden: { opacity: 0, scale: 0.85, rotate: -8 },
          show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.7, ease: "easeOut" },
          },
        }}
        whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 5 }}
      >
        <motion.circle
          cx="19"
          cy="19"
          r="17"
          stroke="rgb(34 197 94)"
          strokeWidth="2.5"
          strokeOpacity="0.22"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{
            opacity: 1,
            rotate: 360,
          }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut" },
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
          style={{ transformOrigin: "50% 50%" }}
        />

        <motion.circle
          cx="19"
          cy="19"
          r="13.5"
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth="3.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        <motion.path
          d="M12 13 L8.5 19 L12 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
        />

        <motion.path
          d="M26 13 L29.5 19 L26 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
        />

        <motion.path
          d="M16.5 23 L19 17 L21.5 23"
          fill="none"
          stroke="rgb(34 197 94)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
        />

        <motion.circle
          cx="19"
          cy="19"
          r="1.6"
          fill="rgb(34 197 94)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.25, 1], opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.55, delay: 0.7, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.div
        className="text-lg font-semibold tracking-[0.5px] sm:text-xl"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        <span className="text-[var(--text)]">Code</span>
        <span className="mx-[2px] text-green-400">2</span>
        <span className="text-[var(--text)]">Capital</span>
      </motion.div>
    </motion.div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const cardClass =
    "rounded-[28px] border border-[var(--border)]/70 bg-[var(--card)]/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]";
  const linkClass =
    "group inline-flex items-center gap-2 text-sm text-[var(--text)]/62 transition-all duration-300 hover:text-[var(--primary)]";
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 120, damping: 18 };

  const sectionVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[var(--primary)]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          variants={sectionVariants}
          className="grid gap-6 lg:grid-cols-12"
        >
          <motion.div variants={itemVariants} className={`${cardClass} p-6 sm:p-8 lg:col-span-5`}>
            <div className="mb-5">
              <AnimatedLogo />
            </div>

            <p className="max-w-md text-sm leading-6 text-[var(--text)]/65 sm:text-[15px]">
              Track trades, review performance, and build sharper trading habits with a calm,
              polished dashboard made for serious traders.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.div whileHover={reduceMotion ? {} : { y: -2 }} transition={spring}>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={reduceMotion ? {} : { y: -2 }} transition={spring}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                >
                  Open Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={`${cardClass} p-6 sm:p-8 lg:col-span-3`}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]/70">
              Quick Links
            </h3>

            <div className="space-y-3">
              {[
                ["Dashboard", "/dashboard"],
                ["Journal", "/dashboard/journal"],
                ["Analytics", "/dashboard/analytics"],
                ["Screenshots", "/dashboard/screenshots"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className={linkClass}>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={`${cardClass} p-6 sm:p-8 lg:col-span-4`}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]/70">
              Legal & Support
            </h3>

            <div className="space-y-3">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms & Conditions", "/terms"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className={linkClass}>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text)]/50">
                Need help?
              </p>
              <a
                href="mailto:support@code2capital.com"
                className="inline-flex items-center gap-2 text-sm text-[var(--text)]/70 transition-colors duration-300 hover:text-[var(--primary)]"
              >
                <Mail className="h-4 w-4" />
                support@code2capital.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reduceMotion ? {} : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.05 },
            },
          }}
          className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <motion.div variants={itemVariants} className="text-sm text-[var(--text)]/45">
            © 2026 Code2Capital. All rights reserved.
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--text)]/55">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
              Secure & private
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--text)]/55">
              <FileText className="h-3.5 w-3.5 text-[var(--primary)]" />
              Legal pages included
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--text)]/55">
              <MessageCircle className="h-3.5 w-3.5 text-[var(--primary)]" />
              Built for traders
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}