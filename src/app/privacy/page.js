"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              <ShieldCheck className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="mt-1 text-sm text-[var(--text)]/55">
                Last updated: 5 May 2026
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-7 text-[var(--text)]/75">
            <p>
              Code2Capital respects your privacy. This policy explains how we collect,
              use, and protect your information when you use our website and dashboard.
            </p>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Information we collect</h2>
              <p>
                We may collect account details such as name, email address, login data,
                trading journal entries, watchlist items, and usage information that helps us
                improve the experience.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">How we use it</h2>
              <p>
                We use your data to provide journal features, analytics, account access,
                personalization, security, and product improvement.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Data protection</h2>
              <p>
                We use reasonable security measures to protect your information. However, no
                online system is completely secure, so we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Cookies</h2>
              <p>
                We may use cookies or similar technologies to remember preferences and improve
                performance.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Third-party services</h2>
              <p>
                Some features may rely on trusted third-party services like authentication,
                analytics, or hosting. Their privacy practices may apply separately.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Your choices</h2>
              <p>
                You can contact us to request access, correction, or deletion of your personal
                information, subject to technical and legal limitations.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Contact</h2>
              <p>
                For privacy-related questions, email us at support@code2capital.com.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}