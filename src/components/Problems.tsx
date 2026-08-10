import { motion } from "framer-motion";
import {
  Calculator,
  CalendarClock,
  Clock,
  Package,
  RotateCcw,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const problems: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Calculator, title: "Poor Estimation", desc: "Inaccurate takeoffs lead to wrong quotations." },
  { icon: CalendarClock, title: "Unrealistic Planning", desc: "Schedules don't align with site realities." },
  { icon: Clock, title: "Procurement Delays", desc: "Late approvals and supplier bottlenecks." },
  { icon: Package, title: "Material Shortages", desc: "Right materials aren't available at the right time." },
  { icon: TrendingDown, title: "Productivity Loss", desc: "Labor inefficiencies reduce performance." },
  { icon: RotateCcw, title: "Quality Rework", desc: "Poor quality creates additional work." },
];

const impacts = [
  { value: "20%", label: "Time lost" },
  { value: "15%", label: "Budget impact" },
  { value: "30%", label: "Productivity lost" },
] as const;

export default function Problems() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-200 bg-[#F4F6FB] py-12 lg:py-14" aria-labelledby="friction-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollMotionProps(isMobile, { y: 20, duration: 0.45 })}
          className="mb-6 flex flex-col gap-2 lg:mb-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          <h2
            id="friction-heading"
            className="max-w-lg text-2xl font-extrabold leading-snug tracking-tight text-brand-navy sm:text-3xl"
          >
            Why MEP & Construction Projects <span className="text-brand-orange">Struggle</span>.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[#42526E]">
            MEP & Construction projects face unique challenges that can lead to delays, cost overruns, and quality issues.
          </p>
        </motion.div>

        <motion.ul
          {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
          className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <li key={problem.title} className="min-w-0">
                <article className="flex h-full min-h-[148px] flex-col rounded-md bg-brand-navy p-4 transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-16px_rgba(23,43,77,0.45)] motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                    <Icon size={15} className="text-brand-orange" aria-hidden />
                  </div>
                  <h3 className="text-[13px] font-semibold leading-snug text-brand-orange">{problem.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-snug text-white">{problem.desc}</p>
                </article>
              </li>
            );
          })}
        </motion.ul>

        <motion.div
          {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.05 })}
          className="mt-8 flex flex-col gap-4 border-t border-[#D0D7E2] pt-5 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <div className="min-w-0 sm:max-w-[240px]">
            <h3 className="text-[15px] font-extrabold tracking-tight text-brand-navy sm:text-base">
              Small gaps. Compounding impact.
            </h3>
            <p className="mt-0.5 text-[10px] font-bold tracking-[0.16em] text-[#97A0AF] uppercase">
              Average project impact
            </p>
          </div>
          <ul className="grid min-w-0 flex-1 grid-cols-3">
            {impacts.map((item, i) => (
              <li key={item.label} className={`px-1 text-center sm:px-3 ${i > 0 ? "border-l border-[#D0D7E2]" : ""}`}>
                <p className="text-xl font-black tracking-tight text-brand-orange sm:text-2xl">{item.value}</p>
                <p className="mt-0.5 text-[9px] font-bold tracking-[0.12em] text-[#6B778C] uppercase sm:text-[10px]">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
