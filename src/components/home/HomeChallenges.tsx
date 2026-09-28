import { motion } from "framer-motion";
import { PiCalendarCheckFill, PiCurrencyDollarFill, PiFileTextFill, PiShieldCheckFill, PiTruckFill, PiUsersFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Section, SplitHeader } from "@/components/design-system/primitives";

const pains = [
  { title: "Reactive decisions", body: "Problems surface after they have already cost time." },
  { title: "Inaccurate estimation", body: "Quantities and rates drift away from the drawings." },
  { title: "Unrealistic planning", body: "Programmes that ignore crews, access and materials." },
  { title: "Procurement delays", body: "Materials arrive late, or not where the work is." },
  { title: "Quality & safety issues", body: "Findings get logged, then lost between teams." },
  { title: "Poor visibility", body: "No single view of progress across the job." },
  { title: "Budget overruns", body: "Costs found at month-end instead of as they happen." },
  { title: "Productivity loss", body: "Crews waiting on information, access or approvals." },
];

const solutions: { icon: IconType; title: string; description: string }[] = [
  { icon: PiFileTextFill, title: "Accurate estimates", description: "BOQ-linked costs, productivity rates, and controlled approvals." },
  { icon: PiCalendarCheckFill, title: "Plans tied to progress", description: "Live programmes connect tasks, progress, and baseline views." },
  { icon: PiTruckFill, title: "Connected procurement", description: "Follow materials from request to purchase order to delivery." },
  { icon: PiUsersFill, title: "Field and office in sync", description: "One view of tasks, daily updates, and workforce activity." },
  { icon: PiShieldCheckFill, title: "Quality through closeout", description: "Inspections, checklists, and punch tracked to completion." },
  { icon: PiCurrencyDollarFill, title: "Control cost and risk", description: "See commitments and exposure; use Zed AI to find next steps." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** The problem, stated plainly in a framed grid. */
export default function ChallengesPreview() {
  const isMobile = useIsMobile();
  return (
    <>
      <Section labelledBy="dp-challenges">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })}>
            <SplitHeader
              id="dp-challenges"
              title="What slows MEP projects down?"
              body="Disconnected plans, field updates, procurement, quality, and costs make progress harder to see and harder to control."
            />
          </motion.div>
        </div>
        <ul className="grid border-t border-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, i) => (
            <motion.li
              key={p.title}
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (i % 4) * 0.05 })}
              className={`border-[#E8ECF2] px-6 py-7 sm:px-8 sm:py-9 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i >= 4 ? "lg:border-t" : "lg:border-t-0"} ${i % 2 === 1 ? "sm:border-l" : ""} ${i % 4 !== 0 ? "lg:border-l" : "lg:border-l-0"}`}
            >
              <span className="font-mono text-[12px] text-[#677388]">{pad(i + 1)}</span>
              <h3 className="mt-6 text-[17px] font-medium tracking-[-0.02em] text-brand-navy">{p.title}</h3>
            </motion.li>
          ))}
        </ul>
      </Section>
    </>
  );
}

/** The connected answer, on the dark band. */
export function HomeSolutions() {
  const isMobile = useIsMobile();
  return (
    <>
      <Section tone="navy" labelledBy="dp-solutions">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })}>
            <SplitHeader
              id="dp-solutions"
              tone="dark"
              title={<>One connected way to <Highlight>get work done.</Highlight></>}
              body="Every team works from the same project record, from the first estimate to the last punch item."
            />
          </motion.div>
        </div>
        <ul className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, i) => (
            <motion.li
              key={item.title}
              {...scrollMotionProps(isMobile, { y: 18, duration: 0.5, delay: (i % 3) * 0.06 })}
              className={`flex flex-col border-white/10 px-6 py-8 sm:px-8 sm:py-10 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i >= 2 ? "sm:border-t" : ""} ${i >= 3 ? "lg:border-t" : "lg:border-t-0"} ${i % 2 === 1 ? "sm:border-l" : "sm:border-l-0"} ${i % 3 !== 0 ? "lg:border-l" : "lg:border-l-0"}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-[#FFB37F]">
                <item.icon size={20} aria-hidden />
              </span>
              <h3 className="mt-10 text-[18px] font-medium tracking-[-0.02em] text-white">{item.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-[1.55] text-white/60">{item.description}</p>
            </motion.li>
          ))}
        </ul>
      </Section>
    </>
  );
}
