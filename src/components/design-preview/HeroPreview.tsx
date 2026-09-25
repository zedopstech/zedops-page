import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { PiClipboardTextFill, PiEyeFill, PiFlowArrowFill, PiListChecksFill } from "react-icons/pi";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  DotGrid,
  Highlight,
  Eyebrow,
  GhostButton,
  GradientCard,
  TicketButton,
} from "./primitives";

/**
 * Split hero: tinted wash + blueprint grid, squared eyebrow, left headline / right copy + CTAs; headline,
 * ticket CTA + ghost button, then a full-bleed visual and product scope cards.
 */
export default function HeroPreview() {
  const projectHighlights = [
    { value: "1", label: "Shared view of the project", detail: "Know what needs attention", icon: PiEyeFill },
    { value: "3", label: "Stages connected", detail: "Plan · Execute · Close out", icon: PiFlowArrowFill },
    { value: "5", label: "Priorities in sync", detail: "Schedule · Crews · Materials · Costs · Quality", icon: PiListChecksFill },
    { value: "10", label: "Project tools in one place", detail: "Built around project work", icon: PiClipboardTextFill },
  ];
  const isMobile = useIsMobile();
  const fade = (delay: number, y = 14) =>
    isMobile
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF4EC_0%,#F7F4F2_50%,#EEF3F9_100%)] pt-[136px] pb-14 sm:pt-[150px] lg:pb-16"
      >
        <DotGrid className="[mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />
        <Container className="relative z-10">
          <motion.div {...fade(0)} className="mb-4">
            <Eyebrow tag="AI-powered">MEP project execution</Eyebrow>
          </motion.div>

          {/* Split hero: headline left, copy and CTAs right */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
            <motion.h1
              {...fade(0.06, 18)}
              className="text-[36px] font-bold leading-[1.04] tracking-[-0.045em] text-brand-navy sm:text-[50px] lg:text-[64px]"
            >
              <span className="block">
                See the <Highlight>whole job.</Highlight>
              </span>
              <span className="block text-brand-navy/70">
                Move it forward.
              </span>
            </motion.h1>

            <motion.div
              {...fade(0.14)}
              className="lg:border-l lg:border-[#E3E8F0] lg:pb-2 lg:pl-8"
            >
              <p className="max-w-md text-base font-medium leading-[1.55] text-[#3D4F6E] sm:text-[17px]">
                Bring schedules, field work, materials, costs, and quality into
                one project view. Zed AI helps teams spot what needs attention
                and decide what to do next.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <TicketButton href="/early-access">
                  Request early access
                </TicketButton>
                <GhostButton href="/contact?topic=demo" icon={CalendarDays}>
                  Book a demo
                </GhostButton>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Full-bleed hero video */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/web video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10" />
          {/* Fade the video into the product scope cards. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      <section
        className="relative z-10 -mt-20 bg-transparent sm:-mt-24"
        aria-label="Project highlights"
      >
        <Container>
          <motion.div
            {...scrollMotionProps(isMobile, { y: 32, duration: 0.7 })}
            className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
          >
            {projectHighlights.map(({ value, label, detail, icon: Icon }) => (
              <GradientCard
                key={label}
                className="shadow-[0_12px_32px_-18px_rgba(23,43,77,0.35)]"
                inner="flex min-h-[190px] flex-col justify-between px-5 py-5 sm:min-h-[198px] sm:px-6 sm:py-6"
              >
                <Icon size={25} className="text-brand-orange" aria-hidden />
                <div>
                  <p className="text-[42px] font-semibold leading-none tracking-[-0.06em] text-brand-navy sm:text-[50px]">
                    {value}
                  </p>
                  <p className="mt-2 text-[13px] font-medium leading-snug text-[#5E6C84] sm:text-[14px]">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-snug text-[#8793A6] sm:text-[12px]">
                    {detail}
                  </p>
                </div>
              </GradientCard>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
