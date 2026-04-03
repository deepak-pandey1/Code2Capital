"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle, setupRecaptcha, sendOTP } from "@/utils/auth";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Google Login
  const handleGoogle = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setupRecaptcha("recaptcha");
      const confirmation = await sendOTP(phone);
      setConfirm(confirmation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      await confirm.confirm(otp);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login to Code2Capital
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-yellow-400 mb-4 hover:scale-105 transition"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        {/* Phone Input */}
        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-3"
        />

        {!confirm ? (
          <button
            onClick={handleSendOTP}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
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
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mt-3"
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 rounded-xl bg-purple-600 mt-3"
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha"></div>
      </motion.div>
    </main>
  );
}