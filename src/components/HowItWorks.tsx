import { motion } from "framer-motion";
import {
  Calculator,
  CalendarClock,
  Handshake,
  LineChart,
  ListChecks,
  ShieldCheck,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";

const stages: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Estimation", desc: "Accurate takeoffs and cost planning.", icon: Calculator },
  { title: "Planning & Scheduling", desc: "Realistic schedules that match site realities.", icon: CalendarClock },
  { title: "Procurement & Materials", desc: "Timely procurement and material availability.", icon: ShoppingCart },
  { title: "Execution Intelligence", desc: "Track progress in real time and stay ahead of issues.", icon: LineChart },
  { title: "Budget Tracking", desc: "Monitor budgets and control costs effectively.", icon: Wallet },
  { title: "Workforce Management", desc: "Assign the right people and maximize productivity.", icon: Users },
  { title: "Quality & Safety", desc: "Ensure quality and safety at every step.", icon: ShieldCheck },
  { title: "Punch List Management", desc: "Track and close punch items systematically.", icon: ListChecks },
  { title: "Successful Handover", desc: "Deliver projects on time with complete confidence.", icon: Handshake },
];

const topRow = stages.slice(0, 5);
const bottomRow = stages.slice(5);

function StageCard({ title, desc, icon: Icon }: (typeof stages)[number]) {
  return (
    <article className="relative z-10 flex h-full flex-col items-center rounded-xl bg-brand-navy px-4 py-6 text-center sm:px-5 sm:py-7">
      <span
        className="pointer-events-none absolute top-1/2 left-0 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-orange shadow-[0_0_0_3px_rgba(254,93,2,0.18)] lg:block"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute top-1/2 right-0 hidden h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-orange shadow-[0_0_0_3px_rgba(254,93,2,0.18)] lg:block"
        aria-hidden
      />

      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[2px]">
        <Icon size={22} strokeWidth={1.75} className="text-brand-orange" aria-hidden />
      </span>
      <h3 className="text-sm font-extrabold leading-snug text-brand-orange sm:text-base">{title}</h3>
      <span className="mx-auto mt-2 mb-3 block h-[2px] w-8 rounded-full bg-brand-orange" aria-hidden />
      <p className="text-sm leading-snug text-white/90 sm:text-sm">{desc}</p>
    </article>
  );
}

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-100 bg-[#F8FAFC]" aria-labelledby="connected-flow-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })}>
          <SectionHeader
            id="connected-flow-heading"
            title={
              <>
                Zedops connects <span className="text-brand-orange">Every Stage</span> of MEP & Construction.
              </>
            }
            subtitle="ZedOps connects every stage of MEP & construction so teams work from one continuous flow of data, decisions, and execution."
          />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.05 })} className="relative">
          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {stages.map((stage) => (
              <li key={stage.title}>
                <StageCard {...stage} />
              </li>
            ))}
          </ol>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div
                className="pointer-events-none absolute top-1/2 right-0 left-0 z-0 h-px -translate-y-1/2 bg-[#C1C7D0]"
                aria-hidden
              />
              <ol className="relative z-10 m-0 grid list-none grid-cols-5 gap-4 p-0 xl:gap-5">
                {topRow.map((stage) => (
                  <li key={stage.title} className="min-w-0">
                    <StageCard {...stage} />
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mt-4">
              <div
                className="pointer-events-none absolute top-1/2 right-0 left-0 z-0 h-px -translate-y-1/2 bg-[#C1C7D0]"
                aria-hidden
              />
              <ol className="relative z-10 m-0 grid list-none grid-cols-4 gap-4 p-0 xl:gap-5">
                {bottomRow.map((stage) => (
                  <li key={stage.title} className="min-w-0">
                    <StageCard {...stage} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        <p className="mt-10 flex items-center justify-center gap-3 text-center text-base font-semibold leading-snug text-brand-navy sm:text-base">
          <span className="hidden h-px w-10 bg-[#C1C7D0] sm:block" aria-hidden />
          <span className="hidden h-2 w-2 rounded-full bg-brand-orange sm:block" aria-hidden />
          <span>
            Every update connects to the <span className="text-brand-orange">next action.</span>
          </span>
          <span className="hidden h-2 w-2 rounded-full bg-brand-orange sm:block" aria-hidden />
          <span className="hidden h-px w-10 bg-[#C1C7D0] sm:block" aria-hidden />
        </p>
      </div>
    </section>
  );
}
