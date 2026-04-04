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
    <div
  className="w-full flex items-center justify-center 
  text-[var(--text)]"
>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl 
        bg-[var(--card)] backdrop-blur-xl 
        border border-[var(--border)] 
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login to Code2Capital
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-xl mb-4 
          bg-[var(--primary)] 
          text-white font-semibold
          hover:scale-[1.03] hover:shadow-lg hover:shadow-green-500/30
          transition-all duration-200"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>

        {/* Phone Input */}
        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded-lg mb-3 
          bg-[var(--card)] text-[var(--text)]
          border border-[var(--border)] 
          outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        {!confirm ? (
          <button
            onClick={handleSendOTP}
            className="w-full py-3 rounded-xl 
            border border-[var(--primary)] text-[var(--primary)]
            hover:bg-[var(--primary)] hover:text-white
            transition-all duration-200"
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
              className="w-full p-3 rounded-lg mt-3 
              bg-[var(--card)] text-[var(--text)]
              border border-[var(--border)] 
              outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 rounded-xl mt-3 
              bg-[var(--primary)] text-white font-semibold
              hover:brightness-110 hover:shadow-lg hover:shadow-green-500/30
              transition-all duration-200"
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha" className="mt-4"></div>
      </motion.div>
    </div>
  );
}