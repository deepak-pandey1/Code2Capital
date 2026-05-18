"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loginWithGoogle, setupRecaptcha, sendOTP } from "@/utils/auth";

export default function LoginForm({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setupRecaptcha("recaptcha");
      const confirmation = await sendOTP(phone);
      setConfirm(confirmation);
    } catch (err) {
      setError(err.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      await confirm.confirm(otp);
      onSuccess?.();
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full max-w-md rounded-[28px] border border-[var(--border)] bg-[var(--card)]/85 p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl"
    >
      <h2 className="text-center text-2xl font-semibold tracking-tight text-[var(--text)]">
        Login to Code2Capital
      </h2>
      <p className="mt-2 text-center text-sm text-[var(--text)]/55">
        Continue with Google or verify using OTP
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text)]/35 focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
        />

        {!confirm ? (
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full rounded-xl border border-[var(--primary)] px-4 py-3 font-semibold text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-all duration-300 placeholder:text-[var(--text)]/35 focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
            />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha" className="pt-1" />
      </div>
    </motion.div>
  );
}