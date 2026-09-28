import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ClipboardList,
  HardHat,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { framePad, Highlight, Section, SplitHeader } from "@/components/design-system/primitives";

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
    <div className="bg-white p-6">
      <p className="text-[13px] text-[#5F6B80]">
        {m.label}
      </p>
      <p className="mt-2 text-[32px] font-medium leading-none tracking-[-0.03em] text-brand-navy tabular-nums">
        {m.prefix}
        {display}
        {m.suffix}
      </p>
      <p className="mt-2 text-[13px] text-[#616D82]">{m.sub}</p>
      {typeof m.progress === "number" ? (
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
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
    <Section labelledBy="hub-perspectives">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <SplitHeader
          id="hub-perspectives"
          title={<>One record. <Highlight>Different perspectives.</Highlight></>}
          body="The same job, seen the way each team needs to see it. Figures below are illustrative."
        />
      </div>
        <div className="grid border-t border-[#E8ECF2] lg:grid-cols-[280px_1fr]">
          {/* Team selector */}
          <div className="flex gap-2 overflow-x-auto px-5 py-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-10 lg:py-10">
            {perspectives.map((p, i) => {
              const Icon = p.Icon;
              const isActive = i === active;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors lg:w-full ${
                    isActive ? "bg-[#F7F8FA] text-brand-navy" : "text-[#5F6B80] hover:text-brand-navy"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-brand-orange" : "text-[#C9D2DF]"}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap text-[15px] font-medium">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* View panel */}
          <div className="border-t border-[#E8ECF2] bg-[#F7F8FA] p-5 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mb-5 text-[15px] font-medium text-brand-navy">
                  {current.label} view <span className="font-normal text-[#5F6B80]">· same record, scoped to this team</span>
                </p>

                <div className="grid gap-px overflow-hidden rounded-lg border border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2">
                  {current.metrics.map((m) => (
                    <Stat key={m.label} m={m} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
    </Section>
  );
}
