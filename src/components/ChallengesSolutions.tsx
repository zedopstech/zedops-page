import { motion } from "framer-motion";
import {
  AlertTriangle,
  CalendarCheck2,
  CalendarX2,
  Check,
  ChevronsRight,
  CircleDollarSign,
  FileCheck2,
  FileX2,
  Lightbulb,
  ShieldCheck,
  ShieldX,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const challenges: Item[] = [
  {
    icon: FileX2,
    title: "Inaccurate Estimation",
    description: "Estimates built on outdated data, spreadsheets, and guesswork.",
  },
  {
    icon: CalendarX2,
    title: "Unrealistic Planning",
    description: "Programmes disconnected from site progress and field reality.",
  },
  {
    icon: Truck,
    title: "Procurement Delays",
    description: "Materials ordered late, tracked manually, and often out of sync.",
  },
  {
    icon: Users,
    title: "Productivity Loss",
    description: "Teams waiting on information, approvals, and handoffs.",
  },
  {
    icon: ShieldX,
    title: "Quality & Safety Issues",
    description: "Inspections, punch, and closeout work scattered across tools.",
  },
  {
    icon: TrendingDown,
    title: "Poor Visibility",
    description: "No single view of cost, schedule, materials, and field status.",
  },
  {
    icon: CircleDollarSign,
    title: "Budget Overruns",
    description: "Cost drift discovered too late to course-correct effectively.",
  },
  {
    icon: AlertTriangle,
    title: "Reactive Decisions",
    description: "Issues found after delays, rework, and margin erosion begin.",
  },
];

const solutions: Item[] = [
  {
    icon: FileCheck2,
    title: "Accurate Estimation",
    description: "BOQ-linked costing with productivity rates and approval control.",
  },
  {
    icon: CalendarCheck2,
    title: "Realistic Planning",
    description: "Live programmes tied to tasks, progress, and baseline views.",
  },
  {
    icon: Truck,
    title: "Smart Procurement",
    description: "MR to PO to delivery on one connected materials workflow.",
  },
  {
    icon: Users,
    title: "Higher Productivity",
    description: "Field and office aligned on the same tasks and updates.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Safety Control",
    description: "QA, inspections, and punch tracked through closeout.",
  },
  {
    icon: TrendingUp,
    title: "Complete Visibility",
    description: "Dashboards across estimation, planning, materials, and site.",
  },
  {
    icon: CircleDollarSign,
    title: "Budget Control",
    description: "Track commitments, changes, and cost exposure in real time.",
  },
  {
    icon: Lightbulb,
    title: "Proactive Decisions",
    description: "AI alerts and insights surface risks before they escalate.",
  },
];

const challengePills = [
  "Scattered Data",
  "Manual Processes",
  "Communication Gaps",
  "Delays & Rework",
  "Cost Overruns",
  "Missed Deadlines",
];

const solutionPills = [
  "Connected Data",
  "Automated Workflows",
  "Real-time Collaboration",
  "On-time Delivery",
  "Cost Control",
  "Predictive Insights",
];

const columnHeightClass = "h-[360px] sm:h-[420px] lg:h-[480px]";

function ListColumn({
  tone,
  heading,
  items,
}: {
  tone: "challenge" | "solution";
  heading: string;
  items: Item[];
}) {
  const isChallenge = tone === "challenge";

  return (
    <div
      className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 lg:px-5 lg:py-4 ${columnHeightClass} max-lg:h-auto ${
        isChallenge
          ? "border-[#F1DADA] bg-[#FFF9F9]"
          : "border-[#DCEDE3] bg-[#F9FFFB]"
      }`}
    >
      <div className="mb-2.5 flex shrink-0 items-center gap-2.5 lg:mb-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-7 sm:w-7 ${
            isChallenge ? "bg-[#E74C3C]" : "bg-[#20A464]"
          }`}
        >
          {isChallenge ? (
            <X size={13} strokeWidth={3.5} className="text-white" aria-hidden />
          ) : (
            <Check size={13} strokeWidth={3.5} className="text-white" aria-hidden />
          )}
        </span>

        <h3 className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand-navy sm:text-sm lg:text-[13px]">
          {heading}
        </h3>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`flex min-h-0 flex-1 items-center gap-2 lg:gap-2.5 ${
                index !== items.length - 1
                  ? isChallenge
                    ? "border-b border-[#F0E2E2]"
                    : "border-b border-[#E2EEE7]"
                  : ""
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8 ${
                  isChallenge
                    ? "bg-[#FFEDEE] text-[#E74C3C]"
                    : "bg-[#E7F6EC] text-[#20A464]"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} aria-hidden />
              </span>

              <div className="min-w-0 py-2 lg:py-0">
                <h4 className="text-s font-bold leading-snug text-brand-navy sm:text-lg lg:text-[16px] lg:leading-tight">
                  {item.title}
                </h4>
                {/* <p className="mt-0.5 text-[11px] leading-snug text-[#616D82] sm:text-xs lg:mt-1 lg:text-[11px] lg:leading-[1.35]">
                  {item.description}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompareVisual() {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-[#E1E4E8] ${columnHeightClass}`}
    >
      {/* =========================================================
          LEFT - TRADITIONAL / PROBLEM
      ========================================================= */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <img
          src="/traditional%20bg1.png"
          alt="Traditional construction"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            grayscale
          "
        />

        {/* Dark grayscale overlay */}
        <div className="absolute inset-0 bg-[#1C2738]/40" />

        {/* Left labels */}
        <div className="absolute left-[34px] top-[56px] z-10 flex flex-col gap-3 sm:top-[72px]">
          {challengePills.map((label) => (
            <div
              key={label}
              className="
                flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-[#29384C]/95
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-white
                shadow-sm
                sm:text-[11px]
              "
            >
              <X
                size={10}
                strokeWidth={3}
                className="text-[#FF5B52]"
              />

              {label}
            </div>
          ))}
        </div>

        
      </div>

      {/* =========================================================
          RIGHT - ZEDOPS / SOLUTION
      ========================================================= */}
      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <img
          src="/photos/modern.png"
          alt="Connected construction"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Slight overlay */}
        <div className="absolute inset-0 bg-white/5" />

        {/* Right labels */}
        <div className="absolute right-[20px] top-[56px] z-10 flex flex-col items-end gap-3 sm:top-[72px]">
          {solutionPills.map((label) => (
            <div
              key={label}
              className="
                flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-white/95
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-brand-navy
                shadow-sm
                sm:text-[11px]
              "
            >
              <Check
                size={10}
                strokeWidth={3}
                className="text-[#20A464]"
              />

              {label}
            </div>
          ))}
        </div>


      </div>

      {/* =========================================================
          CENTER DIVIDER + ARROW
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-1/2
          z-30
          -translate-x-1/2
        "
      >
        {/* Divider */}
        <div className="h-full w-[2px] bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />

        {/* Arrow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-[52px]
            w-[52px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            bg-white
            text-brand-navy
            shadow-[0_5px_15px_rgba(0,0,0,0.15)]
          "
        >
          <ChevronsRight
            size={21}
            strokeWidth={2.4}
          />
        </div>
      </div>
    </div>
  );
}

export default function ChallengesSolutions() {
  const isMobile = useIsMobile();

  return (
    <section
      className="w-full bg-white"
      aria-labelledby="challenges-solutions-heading"
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-4
          py-12
          sm:px-6
          lg:px-8
          lg:py-16
        "
      >
        {/* =====================================================
            HEADING
        ===================================================== */}
        <motion.div
          {...scrollMotionProps(isMobile, {
            y: 15,
            duration: 0.4,
          })}
        >
          <SectionHeader
            id="challenges-solutions-heading"
            className="lg:mb-12"
            titleClassName="lg:text-[42px] lg:leading-[1.08]"
            title={
              <>
                From Construction Challenges to{" "}
                <span className="text-brand-orange">Connected Execution.</span>
              </>
            }
            subtitle="ZedOps connects every stage of MEP & Construction projects so teams can plan better, execute on time, and deliver with confidence."
          />
        </motion.div>

        {/* =====================================================
            THREE COLUMN LAYOUT
        ===================================================== */}
        <motion.div
          {...scrollMotionProps(isMobile, {
            y: 12,
            duration: 0.4,
            delay: 0.05,
          })}
          className="
            grid
            grid-cols-1
            items-stretch
            gap-5
            lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)]
            lg:gap-5
            xl:gap-6
          "
        >
          {/* LEFT CARD */}
          <ListColumn
            tone="challenge"
            heading="The Challenges"
            items={challenges}
          />

          {/* CENTER VISUAL */}
          <CompareVisual />

          {/* RIGHT CARD */}
          <ListColumn
            tone="solution"
            heading="The ZedOps Solution"
            items={solutions}
          />
        </motion.div>
      </div>
    </section>
  );
}