import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { PiCalendarCheckFill, PiCurrencyDollarFill, PiFileTextFill, PiShieldCheckFill, PiTruckFill, PiUsersFill, PiWarningFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  h2Class,
  Highlight,
} from "./primitives";

type Item = { icon: IconType; title: string; description: string };

const solutions: Item[] = [
  {
    icon: PiFileTextFill,
    title: "Accurate estimates",
    description: "BOQ-linked costs, productivity rates, and controlled approvals.",
  },
  {
    icon: PiCalendarCheckFill,
    title: "Plans tied to progress",
    description: "Live programmes connect tasks, progress, and baseline views.",
  },
  {
    icon: PiTruckFill,
    title: "Connected procurement",
    description: "Follow materials from request to purchase order to delivery.",
  },
  {
    icon: PiUsersFill,
    title: "Field and office in sync",
    description: "One view of tasks, daily updates, and workforce activity.",
  },
  {
    icon: PiShieldCheckFill,
    title: "Quality through closeout",
    description: "Inspections, checklists, and punch tracked to completion.",
  },
  {
    icon: PiCurrencyDollarFill,
    title: "Control cost and risk",
    description: "See commitments and exposure; use Zed AI to find next steps.",
  },
];

/** Floating pain-point callouts around the rings (desktop positions, % of the stage). */
const floaters: { title: string; pos: string; from: [number, number] }[] = [
  { title: "Reactive Decisions", pos: "left-[22%] top-[6%]", from: [270, 220] },
  { title: "Inaccurate Estimation", pos: "left-[4%] top-[30%]", from: [470, 90] },
  { title: "Unrealistic Planning", pos: "left-[9%] top-[62%]", from: [420, -75] },
  { title: "Procurement Delays", pos: "left-[27%] top-[84%]", from: [240, -205] },
  { title: "Quality & Safety Issues", pos: "right-[14%] top-[4%]", from: [-360, 235] },
  { title: "Poor Visibility", pos: "right-[3%] top-[34%]", from: [-485, 75] },
  { title: "Budget Overruns", pos: "right-[8%] top-[64%]", from: [-430, -85] },
  { title: "Productivity Loss", pos: "right-[30%] top-[86%]", from: [-210, -215] },
];

function PainPill({ title }: { title: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-[#E3E8F0] bg-white py-1.5 pr-3 pl-1.5 text-[13px] font-medium text-brand-navy shadow-[0_6px_16px_-10px_rgba(23,43,77,0.3)]">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#FDECE8]"
        aria-hidden
      >
        <X size={11} strokeWidth={3} className="text-[#E5432A]" />
      </span>
      {title}
    </span>
  );
}

/** A blueprint challenge stage followed by the connected ZedOps response. */
export default function ChallengesPreview() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { once: true, amount: 0.35 });
  const rippleInView = useInView(stageRef, { amount: 0.15 });
  return (
    <>
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-[75px]"
      aria-labelledby="dp-challenges"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(23,43,77,0.12)_1px,transparent_1px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
      />
      <Container>
        <div ref={stageRef} className="relative mx-auto flex min-h-[440px] max-w-[1200px] flex-col items-center justify-center lg:min-h-[560px]">
          {/* Soft filled waves expand from the central issue, then fade away. */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 lg:h-[720px] lg:w-[720px]"
          >
            {reduce ? (
              <>
                <div className="absolute inset-0 rounded-full bg-[#FFF9F6]" />
                <div className="absolute inset-[90px] rounded-full bg-[#FFF0E9]" />
                <div className="absolute inset-[180px] rounded-full bg-[#FFE0D4]" />
                <div className="absolute inset-[270px] rounded-full bg-[#FFD3C2]" />
              </>
            ) : [
              "#FFF7F3",
              "#FFEFE7",
              "#FFE0D4",
              "#FFD3C2",
            ].map((fill, ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: fill }}
                initial={{ opacity: 0, scale: 0.08 }}
                animate={rippleInView
                  ? { opacity: [0, 0.85, 0.68, 0.3, 0], scale: [0.08, 0.22, 0.48, 0.78, 1.12] }
                  : { opacity: 0, scale: 0.08 }}
                transition={{
                  duration: rippleInView ? 3.6 : 0.2,
                  delay: rippleInView ? ring * 0.72 : 0,
                  repeat: rippleInView ? Infinity : 0,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* floating callouts (desktop) */}
          <div className="absolute inset-0 hidden lg:block">
            {floaters.map((f, i) => (
              <motion.div
                key={f.title}
                className={`absolute ${f.pos}`}
                initial={reduce ? false : { opacity: 0, x: f.from[0], y: f.from[1], scale: 0.55 }}
                animate={reduce || !stageInView ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.24 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={reduce || !stageInView ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }}
                  transition={{ duration: 5 + (i % 3), delay: 1.15 + i * 0.09, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PainPill title={f.title} />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })}
            className="relative text-center"
          >
            <motion.span
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg border border-[#E3E8F0] bg-white shadow-[0_12px_28px_-14px_rgba(240,68,42,0.5)]"
              animate={reduce || !rippleInView
                ? { y: 0, scale: 1, rotate: 0 }
                : { y: [0, -6, 0], scale: [1, 1.08, 1], rotate: [0, -2, 0] }}
              transition={{ duration: 3.4, repeat: reduce || !rippleInView ? 0 : Infinity, ease: "easeInOut" }}
            >
              <PiWarningFill
                size={30}
                className="text-[#F0442A]"
                aria-hidden
              />
            </motion.span>
            <motion.div
              animate={reduce || !rippleInView ? { y: 0 } : { y: [0, -4, 0] }}
              transition={{ duration: 4.6, repeat: reduce || !rippleInView ? 0 : Infinity, ease: "easeInOut" }}
            >
              <h2
                id="dp-challenges"
                className={`${h2Class} text-brand-navy lg:!text-[46px]`}
              >
                What slows <Highlight>MEP projects down?</Highlight>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-[1.6] text-[#5E6C84]">
                Disconnected plans, field updates, procurement, quality, and
                costs make progress harder to see and harder to control.
              </p>
            </motion.div>
          </motion.div>

          {/* mobile: callouts as a wrap below the headline */}
          <div className="relative mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
            {floaters.map((f, i) => (
              <motion.div
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: -24, scale: 0.8 }}
                animate={reduce || !stageInView ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <PainPill title={f.title} />
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>

    <section
      className="relative overflow-hidden bg-brand-navy py-20 lg:py-28"
      aria-labelledby="dp-solutions"
    >
      <Container className="relative">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[14px] font-semibold text-brand-navy shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <Check size={16} strokeWidth={2.5} className="text-brand-navy" aria-hidden />
              With ZedOps
            </span>
            <h3
              id="dp-solutions"
              className="mt-9 text-[32px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[46px]"
            >
              One connected way to{" "}
              <span className="box-decoration-clone bg-brand-orange px-2 text-white">
                get work done.
              </span>
            </h3>
          </motion.div>

          <ul className="grid gap-px overflow-hidden rounded-2xl bg-[#E3E8F0] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item, index) => (
                <motion.li
                  key={item.title}
                  {...scrollMotionProps(isMobile, { y: 32, delay: (index % 3) * 0.08, duration: 0.65 })}
                  className="relative flex min-h-[235px] flex-col overflow-hidden bg-white p-7 sm:p-8"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-80 [mask-image:linear-gradient(to_right,transparent,black)]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(30deg,transparent 0 19px,rgba(23,43,77,0.06) 20px 21px),repeating-linear-gradient(150deg,transparent 0 19px,rgba(23,43,77,0.06) 20px 21px)",
                    }}
                  />
                  <item.icon
                    size={42}
                    className="relative text-brand-navy"
                    aria-hidden
                  />
                  <div className="relative mt-auto pt-10">
                    <h4 className="text-[17px] font-semibold tracking-tight text-brand-navy sm:text-[18px]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#5E6C84] sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
          </ul>
        </div>
      </Container>
    </section>
    </>
  );
}
