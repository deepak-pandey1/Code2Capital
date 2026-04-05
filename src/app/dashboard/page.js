"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DailyQuote from "@/components/common/DailyQuote";
import { 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Brain, 
  ShieldAlert, 
  BarChart3, 
  Camera, 
  Activity, 
  Layers, 
  Target, 
  Clock,
  PlusCircle // <--- Add this one
} from "lucide-react";

// --- Reusable Premium Card ---
const SectionCard = ({ children, title, icon: Icon, badge }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -4 }}
    className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex flex-col h-full transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
        {Icon && <Icon size={16} className="text-[var(--primary)]" />} {title}
      </div>
      {badge && <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-gray-400">{badge}</span>}
    </div>
    <div className="flex-1">{children}</div>
  </motion.div>
);

export default function Dashboard() {
  const [mood, setMood] = useState(2);
  const [checklist, setChecklist] = useState([false, false, false, false]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 md:p-8 space-y-6">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">COMMAND CENTER</h1>
          <p className="text-gray-500 font-medium">Precision Trading Architecture v2.0</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-xs font-bold hover:bg-white/10">PRE-MARKET</button>
          <button className="px-4 py-2 bg-[var(--primary)] text-black rounded-xl text-xs font-bold hover:scale-105 transition-transform">GO LIVE</button>
        </div>
      </header>

      {/* GRID LAYOUT: 10 SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. DAILY INSIGHT (Span 2) */}
        <div className="lg:col-span-2">
          <DailyQuote />
        </div>

        {/* 2. MARKET SESSION */}
        <SectionCard title="Active Session" icon={Clock}>
          <div className="flex items-center justify-between mt-2">
            <div>
              <h4 className="text-2xl font-bold">London</h4>
              <p className="text-xs text-gray-500">High Volume Expected</p>
            </div>
            <div className="relative h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative block h-3 w-3 rounded-full bg-green-500"></span>
            </div>
          </div>
        </SectionCard>

        {/* 3. PSYCHOLOGY METER */}
        <SectionCard title="Psychology" icon={Brain}>
          <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl">
            {['😡', '😨', '😐', '🙂', '🔥'].map((emoji, i) => (
              <button key={i} onClick={() => setMood(i)} className={`text-xl transition-all ${mood === i ? "scale-125 grayscale-0" : "grayscale opacity-30 hover:opacity-100"}`}>
                {emoji}
              </button>
            ))}
          </div>
          <p className="text-[10px] mt-2 text-center text-gray-500 font-medium">Status: {mood > 2 ? 'Optimal' : 'Caution Advised'}</p>
        </SectionCard>

        {/* 4. PRE-TRADE CHECKLIST */}
        <SectionCard title="Checklist" icon={CheckCircle2} badge="4 Tasks">
          <div className="space-y-2 mt-1">
            {["Economic Calendar", "HTF Bias", "Risk Per Trade", "Mental Check"].map((item, i) => (
              <label key={i} className="flex items-center gap-3 text-sm cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-[var(--border)] accent-[var(--primary)]" />
                <span className="text-gray-400 group-hover:text-white transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </SectionCard>

        {/* 5. VOLATILITY HEATMAP (Advanced) */}
        <SectionCard title="Market Heat" icon={Activity}>
          <div className="grid grid-cols-2 gap-2">
            {[{p:'EUR', v:'+0.4%'}, {p:'USD', v:'-0.1%'}, {p:'XAU', v:'+1.2%'}, {p:'BTC', v:'-2.4%'}].map((coin, i) => (
              <div key={i} className="bg-white/5 p-2 rounded-lg text-center">
                <div className="text-[10px] font-bold text-gray-500">{coin.p}</div>
                <div className={`text-xs font-bold ${coin.v.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{coin.v}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 6. TRADE BIAS PANEL */}
        <SectionCard title="Bias Center" icon={TrendingUp}>
          <div className="space-y-3">
            {[{pair: 'EURUSD', b: 'BULLISH'}, {pair: 'Gold', b: 'BEARISH'}].map((b, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-xs font-bold">{b.pair}</span>
                <span className={`text-[10px] font-black ${b.b === 'BULLISH' ? 'text-green-400' : 'text-red-400'}`}>{b.b}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 7. RISK CALCULATOR (Advanced) */}
        <SectionCard title="Risk Engine" icon={Target} badge="Calculator">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-gray-500"><span>Acc Size</span><span>Risk 1%</span></div>
            <div className="text-lg font-mono font-bold">$10,000 → $100</div>
            <button className="w-full py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10">ADJUST PARAMS</button>
          </div>
        </SectionCard>

        {/* 8. QUICK ACTIONS (Span 2) */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-dashed border-[var(--border)] rounded-2xl hover:bg-[var(--primary)] hover:text-black transition-all group">
              <PlusCircle className="group-hover:rotate-90 transition-transform" /> <span className="font-bold text-sm">New Journal</span>
           </button>
           <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-dashed border-[var(--border)] rounded-2xl hover:bg-blue-500 hover:text-white transition-all group">
              <Camera /> <span className="font-bold text-sm">Capture Chart</span>
           </button>
        </div>

        {/* 9. TODAY'S RULE */}
        <SectionCard title="Core Rule" icon={ShieldAlert}>
          <div className="h-full flex items-center justify-center">
            <textarea 
              className="w-full bg-transparent text-lg font-medium italic border-none outline-none text-center placeholder:text-gray-700 resize-none"
              placeholder="Write your #1 rule..."
              defaultValue="No trades after 2 losses."
            />
          </div>
        </SectionCard>

        {/* 10. MISTAKE REMINDER */}
        <SectionCard title="Avoid This" icon={Layers}>
          <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl">
            <p className="text-xs text-orange-200/80 leading-relaxed italic">
              "Over-leveraging on high-impact news days is a gamble, not a trade. Protect your capital first."
            </p>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}