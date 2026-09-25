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
import SectionHeader from "@/components/SectionHeader";

const problems: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Calculator,
    title: "Poor Estimation",
    desc: "Inaccurate takeoffs lead to wrong quotations.",
  },
  {
    icon: CalendarClock,
    title: "Unrealistic Planning",
    desc: "Schedules don't align with site realities.",
  },
  {
    icon: Clock,
    title: "Procurement Delays",
    desc: "Late approvals and supplier bottlenecks.",
  },
  {
    icon: Package,
    title: "Material Shortages",
    desc: "Right materials aren't available at the right time.",
  },
  {
    icon: TrendingDown,
    title: "Productivity Loss",
    desc: "Labor inefficiencies reduce performance.",
  },
  {
    icon: RotateCcw,
    title: "Quality Rework",
    desc: "Poor quality creates additional work.",
  },
];

const impacts = [
  { value: "20%", label: "Time lost" },
  { value: "15%", label: "Budget impact" },
  { value: "30%", label: "Productivity lost" },
] as const;

export default function Problems() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          {...scrollMotionProps(isMobile, {
            y: 20,
            duration: 0.4,
          })}
        >
          <SectionHeader
            title={
              <>
                Why MEP & Construction<span className="text-brand-orange"> Projects Struggle</span>.
              </>
            }
            subtitle="MEP & Construction projects face unique challenges that can lead to delays, cost overruns, and quality issues."
          />
        </motion.div>

        {/* Problems */}
        <motion.ul
          {...scrollMotionProps(isMobile, {
            y: 16,
            duration: 0.4,
          })}
          className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <li key={problem.title} className="min-w-0">
                <article className="flex h-full min-h-[165px] flex-col rounded-lg bg-brand-navy p-5 transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-16px_rgba(23,43,77,0.45)] motion-reduce:transform-none motion-reduce:transition-none">
                  {/* Icon */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className="text-brand-orange"
                      aria-hidden
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold leading-snug text-brand-orange sm:text-lg">
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-snug text-white sm:text-sm">
                    {problem.desc}
                  </p>
                </article>
              </li>
            );
          })}
        </motion.ul>

        {/* Impact */}
        <motion.div
          {...scrollMotionProps(isMobile, {
            y: 12,
            duration: 0.35,
            delay: 0.05,
          })}
          className="mt-10 flex flex-col gap-5 border-t border-[#D0D7E2] pt-6 sm:mt-11 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          {/* Impact heading */}
          <div className="min-w-0 sm:max-w-[280px]">
            <h3 className="text-lg font-extrabold tracking-tight text-brand-navy sm:text-xl">
              Small gaps. Compounding impact.
            </h3>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#97A0AF] sm:text-xs">
              Average project impact
            </p>
          </div>

          {/* Impact stats */}
          <ul className="grid min-w-0 flex-1 grid-cols-3">
            {impacts.map((item, i) => (
              <li
                key={item.label}
                className={`px-2 text-center sm:px-4 ${
                  i > 0 ? "border-l border-[#D0D7E2]" : ""
                }`}
              >
                <p className="text-2xl font-black tracking-tight text-brand-orange sm:text-3xl">
                  {item.value}
                </p>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#6B778C] sm:text-xs">
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

