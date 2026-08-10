import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Calculator,
  CalendarClock,
  ListChecks,
  Package,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const stages = [
  { title: "Estimation", icon: Calculator },
  { title: "Planning & Scheduling", icon: CalendarClock },
  { title: "Procurement & Materials", icon: Package },
  { title: "Execution Intelligence", icon: Activity },
  { title: "Budget Tracking", icon: Wallet },
  { title: "Workforce Management", icon: Users },
  { title: "Quality & Safety", icon: ShieldCheck },
  { title: "Punch List Management", icon: ListChecks },
  { title: "Successful Handover", icon: BadgeCheck },
] as const;

function flowClip(index: number, total: number) {
  if (index === 0) {
    return "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)";
  }
  if (index === total - 1) {
    return "polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%)";
  }
  return "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)";
}

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-100 bg-[#F8FAFC]" aria-labelledby="connected-flow-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })}
          className="mb-8 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:gap-20"
        >
          <h2
            id="connected-flow-heading"
            className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl"
          >
            Zedops connects <span className="text-brand-orange">Every Stage</span> of MEP & Construction.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[#42526E] lg:pb-1">
            ZedOps connects every stage of MEP & construction so teams work from one continuous flow of data, decisions, and
            execution.
          </p>
        </motion.div>

        <motion.ol
          {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.05 })}
          className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-stretch lg:gap-0"
        >
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isFirst = index === 0;
            const isLast = index === stages.length - 1;

            return (
              <li
                key={stage.title}
                className={`min-w-0 lg:flex-1 ${isFirst ? "" : "lg:-ml-4"}`}
                style={
                  {
                    zIndex: stages.length - index,
                    "--flow-clip": flowClip(index, stages.length),
                  } as CSSProperties
                }
              >
                <article
                  className={`group flex h-full min-h-[168px] flex-col items-center justify-center rounded-md bg-brand-navy px-5 py-6 text-center transition-[filter,transform] duration-150 hover:-translate-y-0.5 hover:brightness-110 motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[180px] lg:min-h-[200px] lg:rounded-none lg:[clip-path:var(--flow-clip)] ${
                    isFirst ? "" : "lg:pl-8"
                  } ${isLast ? "" : "lg:pr-8"}`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-white/10 sm:h-14 sm:w-14">
                    <Icon
                      size={26}
                      className="text-brand-orange transition-colors duration-150 group-hover:text-white"
                      aria-hidden
                    />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-white sm:text-[15px]">{stage.title}</p>
                </article>
              </li>
            );
          })}
        </motion.ol>

        <p className="mt-8 text-center text-[13px] font-semibold tracking-tight text-[#6B778C]">
          One platform. One data flow. One source of truth.
        </p>
      </div>
    </section>
  );
}
