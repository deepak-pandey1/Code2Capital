"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terms & Conditions</h1>
              <p className="mt-1 text-sm text-[var(--text)]/55">
                Last updated: 5 May 2026
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-7 text-[var(--text)]/75">
            <p>
              By using Code2Capital, you agree to these Terms & Conditions. Please read them
              carefully before using the platform.
            </p>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Use of service</h2>
              <p>
                You agree to use the website only for lawful purposes and in a way that does
                not disrupt the service, other users, or our systems.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Account responsibility</h2>
              <p>
                You are responsible for keeping your account credentials secure and for all
                activity under your account.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Trading disclaimer</h2>
              <p>
                Code2Capital provides tools for tracking and analysis. It does not provide
                financial advice, and we are not responsible for trading losses.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Content ownership</h2>
              <p>
                The platform, design, text, and features are owned by Code2Capital unless
                otherwise stated. You may not copy or redistribute without permission.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Service changes</h2>
              <p>
                We may update, improve, or change features at any time to enhance performance
                and user experience.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Contact</h2>
              <p>
                For questions about these terms, email support@code2capital.com.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}