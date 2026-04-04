"use client";

import { Award } from "lucide-react";

export default function Achievement() {
  return (
    <section className="py-24 px-5">
      
      <div className="max-w-6xl mx-auto bg-green-500 rounded-[3rem] p-12 md:p-20 text-black flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* LEFT */}
        <div className="max-w-md">
          <Award size={48} className="mb-6" />

          <h2 className="text-4xl font-black mb-6 leading-tight">
            Industry-Standard Security & Precision.
          </h2>

          <p className="font-medium opacity-80">
            We use AES-256 encryption to ensure your trade data remains yours. Secure, private, and always available.
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-black text-white p-8 rounded-3xl shadow-2xl rotate-2">
          
          <p className="text-sm font-mono opacity-50 mb-4">
            // System Status
          </p>

          <div className="space-y-3">
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-sm">Database: Connected</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm">Security: Active</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm">Encryption: AES-256</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}