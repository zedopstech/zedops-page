import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import HeroVideoBand from "@/components/HeroVideoBand";
import {
  Eyebrow,
  framePad,
  GhostButton,
  Muted,
  TicketButton,
} from "@/components/design-system/primitives";

const projectHighlights = [
  { value: "1", label: "Shared view of the project", detail: "Know what needs attention" },
  { value: "3", label: "Stages connected", detail: "Plan · Execute · Close out" },
  { value: "5", label: "Priorities in sync", detail: "Schedule · Crews · Materials · Costs · Quality" },
  { value: "10", label: "Project tools in one place", detail: "Built around project work" },
];

/** Hero: framed blueprint field with a two-tone headline, then the full-bleed reel and a stat bar. */
export default function HeroPreview() {
  const isMobile = useIsMobile();
  const fade = (delay: number, y = 14) =>
    isMobile
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-white">
        <div className={`relative mx-auto max-w-[1200px] pt-[132px] pb-12 sm:pt-[144px] lg:border-x lg:border-[#E8ECF2] lg:pb-16 ${framePad}`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
            <div>
              <motion.div {...fade(0)} className="mb-6">
                <Eyebrow tag="AI-powered">MEP &amp; construction execution platform</Eyebrow>
              </motion.div>
              <motion.h1
              {...fade(0.06, 18)}
              className="text-[40px] font-medium leading-[1] tracking-[-0.045em] text-brand-navy sm:text-[56px] lg:text-[64px]"
            >
              From takeoff <br className="hidden sm:block" />
              to handover.
              <br />
              <Muted>One job, one record.</Muted>
              </motion.h1>
            </div>

            <motion.div {...fade(0.14)} className="lg:pb-1.5">
              <p className="max-w-md text-[16px] leading-[1.6] text-[#4D5E77] sm:text-[17px]">
                Estimates, schedules, materials, site work, quality and cost stay connected, so every team works
                from the same facts and Zed AI shows what to fix next.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TicketButton href="/early-access">Request early access</TicketButton>
                <GhostButton href="/contact?topic=demo" icon={CalendarDays}>
                  Book a demo
                </GhostButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-bleed construction reel, with a pause control and reduced-motion opt-out. */}
      <HeroVideoBand />

      <section className="relative z-10 -mt-20 sm:-mt-24" aria-label="Project highlights">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-0">
          <motion.dl
            {...scrollMotionProps(isMobile, { y: 32, duration: 0.7 })}
            className="grid grid-cols-2 overflow-hidden rounded-xl border border-[#E3E8F0] bg-white shadow-[0_32px_64px_-32px_rgba(14,27,51,0.4)] lg:grid-cols-4"
          >
            {projectHighlights.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col border-[#E8ECF2] px-5 py-6 sm:px-8 sm:py-9 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dt className="order-2 mt-4 text-[14px] font-medium leading-snug text-brand-navy sm:text-[15px]">{label}</dt>
                <dd className="order-1 text-[44px] font-medium leading-none tracking-[-0.05em] text-brand-navy sm:text-[60px]">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>
    </>
  );
}
