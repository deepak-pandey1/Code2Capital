"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Mail, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text)]/60 transition-colors duration-300 hover:text-[var(--primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
              <MessageCircle className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <p className="mt-1 text-sm text-[var(--text)]/55">
                We are here to help
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-7 text-[var(--text)]/75">
            <p>
              For support, feedback, partnership, or privacy requests, contact us using the
              details below.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:support@code2capital.com"
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5 text-[var(--primary)]" />
                <span>support@code2capital.com</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 transition-all duration-300 hover:border-[var(--primary)]/40 hover:-translate-y-0.5"
              >
                <Send className="h-5 w-5 text-[var(--primary)]" />
                <span>Discord / Community</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}