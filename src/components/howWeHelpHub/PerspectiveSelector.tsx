import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ClipboardList,
  HardHat,
  PieChart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  sub: string;
  progress?: number;
};

type Perspective = {
  key: string;
  label: string;
  Icon: LucideIcon;
  metrics: Metric[];
};

const perspectives: Perspective[] = [
  {
    key: "pm",
    label: "Project Manager",
    Icon: ClipboardList,
    metrics: [
      { label: "Schedule", value: 82, suffix: "%", sub: "on track", progress: 82 },
      { label: "Workforce", value: 248, sub: "on site", progress: 80 },
      { label: "Open issues", value: 12, sub: "across modules" },
      { label: "Today's progress", value: 72, suffix: "%", sub: "complete", progress: 72 },
    ],
  },
  {
    key: "site",
    label: "Site Team",
    Icon: HardHat,
    metrics: [
      { label: "Tasks due today", value: 34, sub: "assigned to crew" },
      { label: "Photos uploaded", value: 18, sub: "this shift", progress: 60 },
      { label: "My open tasks", value: 7, sub: "awaiting action" },
      { label: "Safety status", value: 100, suffix: "%", sub: "clear", progress: 100 },
    ],
  },
  {
    key: "commercial",
    label: "Commercial",
    Icon: PieChart,
    metrics: [
      { label: "Committed", value: 4.2, prefix: "$", suffix: "M", decimals: 1, sub: "against budget" },
      { label: "Cost vs budget", value: 2.1, prefix: "-", suffix: "%", decimals: 1, sub: "under plan", progress: 48 },
      { label: "Pending POs", value: 9, sub: "awaiting approval" },
      { label: "Margin", value: 18.4, suffix: "%", decimals: 1, sub: "projected", progress: 84 },
    ],
  },
  {
    key: "qaqc",
    label: "QA / QC",
    Icon: ShieldCheck,
    metrics: [
      { label: "Inspections", value: 26, sub: "completed", progress: 76 },
      { label: "Punch items", value: 14, sub: "open" },
      { label: "Critical", value: 2, sub: "needs review" },
      { label: "Compliance", value: 96, suffix: "%", sub: "documented", progress: 96 },
    ],
  },
];

function useCountUp(target: number, decimals = 0, duration = 0.8) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

function Stat({ m }: { m: Metric }) {
  const display = useCountUp(m.value, m.decimals ?? 0);
  return (
    <div className="rounded-xl border border-[#E3E8F0] bg-white p-5">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-[#97A0AF]">
        {m.label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-brand-navy">
        {m.prefix}
        {display}
        {m.suffix}
      </p>
      <p className="mt-0.5 text-[12px] text-[#6B778C]">{m.sub}</p>
      {typeof m.progress === "number" ? (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#E3E8F0]">
          <motion.div
            className="h-full rounded-full bg-[#FE5D02]"
            initial={{ width: 0 }}
            animate={{ width: `${m.progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function PerspectiveSelector() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const current = perspectives[active];

  return (
    <section className="bg-[#F8F9FD] px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            One record. Different perspectives.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Team selector */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible lg:pb-0">
            {perspectives.map((p, i) => {
              const Icon = p.Icon;
              const isActive = i === active;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#102B57] bg-brand-navy text-white shadow-[0_10px_24px_-12px_rgba(16,43,87,0.5)]"
                      : "border-[#E3E8F0] bg-white text-[#42526E] hover:border-[#102B57]/30"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-[#FF8A3D]" : "text-[#97A0AF]"}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap text-sm font-bold">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* View panel */}
          <div className="rounded-xl border border-[#E3E8F0] bg-[#F8F9FD] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF]">
                    <current.Icon size={19} className="text-brand-navy" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      {current.label} view
                    </p>
                    <p className="text-[12px] text-[#6B778C]">
                      Same project record, scoped to this team
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {current.metrics.map((m) => (
                    <Stat key={m.label} m={m} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-[#97A0AF]">
              Every number above is read live from the shared project record.
              <ArrowRight size={14} aria-hidden />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
