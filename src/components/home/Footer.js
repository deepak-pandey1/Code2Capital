"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-[var(--border)]">
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-left">
          <h2 className="text-xl font-bold mb-2">Code2Capital</h2>
          <p className="text-sm opacity-40">
            Precision trading analytics for the modern era.
          </p>
        </div>

        <div className="flex gap-8 text-sm opacity-60">
          <a href="#" className="hover:text-green-400 transition">Terms</a>
          <a href="#" className="hover:text-green-400 transition">Privacy</a>
          <a href="#" className="hover:text-green-400 transition">Discord</a>
        </div>

        <p className="text-[var(--text)]/30 text-sm">
          © 2026 Code2Capital
        </p>

      </div>

    </footer>
  );
}