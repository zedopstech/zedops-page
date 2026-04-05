import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCountUp(target: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    setCount(0);
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * target);
      setCount(val);
      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function AnimatedStat({ target, suffix, duration = 1.6, className = "", inView }: {
  target: number; suffix: string; duration?: number; className?: string; inView: boolean;
}) {
  const count = useCountUp(target, duration, inView);
  return (
    <p className={className}>
      {count}<span className="text-[#F79625]">{suffix}</span>
    </p>
  );
}

export default function BentoStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0D1117] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          ref={ref}
          className="grid gap-2"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
        >
          {/* Cell 1  -  Brand badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="row-span-2 bg-[#172B4D] p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden"
            style={{ borderRadius: 6 }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)",
            }} />
            <div className="relative z-10">
              <img src="/logo.png" alt="ZedOps" className="w-10 h-10 mb-4 object-cover" style={{ borderRadius: 6 }} />
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Early Access</p>
              <p className="text-white font-extrabold text-xl leading-snug">AI-First<br />Construction<br />Platform</p>
            </div>
            <div className="relative z-10">
              <span className="inline-block border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ borderRadius: 6 }}>
                Built for Construction
              </span>
            </div>
          </motion.div>

          {/* Cell 2  -  Stat: Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="bg-[#161B22] flex flex-col justify-center p-8"
            style={{ borderRadius: 6 }}
          >
            <AnimatedStat target={500} suffix="+" duration={1.4} inView={inView} className="text-white font-black text-6xl leading-none mb-2" />
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Projects designed to support</p>
          </motion.div>

          {/* Cell 3  -  Stat: Reporting speed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#161B22] flex flex-col justify-center p-8 relative overflow-hidden"
            style={{ borderRadius: 6 }}
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-[#172B4D]/20 blur-2xl" />
            <AnimatedStat target={10} suffix="×" duration={1.2} inView={inView} className="text-white font-black text-6xl leading-none mb-2" />
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Faster reporting*</p>
          </motion.div>

          {/* Cell 4  -  Stat: Cost reduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="bg-[#161B22] flex flex-col justify-center p-8"
            style={{ borderRadius: 6 }}
          >
            <AnimatedStat target={35} suffix="%" duration={1.3} inView={inView} className="text-white font-black text-6xl leading-none mb-2" />
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Projected fewer cost overruns*</p>
          </motion.div>

          {/* Cell 5  -  Time recovered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="bg-[#161B22] p-8 flex flex-col justify-between"
            style={{ borderRadius: 6 }}
          >
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Hours saved · per PM · per week</p>
              <div className="flex items-end gap-1.5">
                <AnimatedStat target={52} suffix="" duration={1.5} inView={inView} className="text-white font-black text-5xl leading-none" />
                <span className="text-[#F79625] text-3xl font-black mb-0.5">hrs</span>
              </div>
              <p className="text-white/50 text-xs mt-2 leading-relaxed">Reclaimed from reporting, data entry, and status calls</p>
            </div>
            <div className="mt-5">
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-2">Before vs. After ZedOps</p>
              <div className="space-y-1.5">
                {[
                  { label: "Reporting", before: 80, after: 10, color: "#F79625" },
                  { label: "Data entry", before: 65, after: 8, color: "#172B4D" },
                  { label: "Status calls", before: 55, after: 15, color: "#4B5563" },
                ].map(({ label, before, after, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-white/30 text-[8px] w-14 shrink-0">{label}</span>
                    <div className="flex-1 h-3 bg-white/5 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-white/15" style={{ width: `${before}%` }} />
                      <motion.div
                        className="absolute inset-y-0 left-0"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${after}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white/15" /><span className="text-white/30 text-[8px]">Before</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#F79625]" /><span className="text-white/30 text-[8px]">After</span></div>
              </div>
            </div>
          </motion.div>

          {/* Cell 6  -  ROI impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="bg-[#161B22] p-8 flex flex-col justify-between"
            style={{ borderRadius: 6 }}
          >
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Projected ROI impact*</p>
              <p className="text-white font-black text-5xl leading-none">
                $2.4<span className="text-[#F79625] text-3xl">M</span>
              </p>
              <p className="text-white/50 text-xs mt-2 leading-relaxed">Projected savings per large commercial project</p>
            </div>
            <div className="mt-5 space-y-2">
              {[
                { label: "Reduced rework cost", val: "$640K" },
                { label: "Avoided delay penalties", val: "$890K" },
                { label: "Labour efficiency gains", val: "$870K" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="text-white/40 text-xs">{label}</span>
                  <span className="text-[#F79625] font-bold text-xs">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cell 7  -  CTA stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-[#F79625] p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ borderRadius: 6 }}
          >
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/10 rounded-full" />
            <div>
              <AnimatedStat target={3} suffix="×" duration={1.0} inView={inView} className="text-white font-black text-6xl leading-none mb-2" />
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Faster decisions</p>
            </div>
            <p className="text-white/70 text-xs mt-4 leading-relaxed">
              AI surfaces risks before they become problems.
            </p>
          </motion.div>
        </div>
        <p className="text-white/20 text-[10px] mt-4 text-right">* Based on design targets and industry benchmarks. Actual results will vary.</p>
      </div>
    </section>
  );
}
