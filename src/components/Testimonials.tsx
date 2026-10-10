import { LocalA } from "@/components/LocalLink";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  Database,
  Eye,
  FileX,
  LineChart,
  Minus,
  Shield,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";

type PointTone = "bad" | "good" | "mid";

const transitional = {
  title: "Traditional Way",
  icon: FileX,
  points: [
    { tone: "bad" as PointTone, text: "Paper & Excel based processes" },
    { tone: "bad" as PointTone, text: "Disconnected tools & data silos" },
    { tone: "bad" as PointTone, text: "Manual reports & no real-time insights" },
    { tone: "bad" as PointTone, text: "Delays, rework & cost overruns" },
    { tone: "bad" as PointTone, text: "Limited accountability & tracking" },

  ],
  footer: "Slow. Fragmented. Reactive.",
};

const digital = {
  title: "Digital Way",
  icon: BarChart3,
  points: [
    { tone: "good" as PointTone, text: "Digital tools & dashboards" },
    { tone: "good" as PointTone, text: "Centralized data & reports" },
    { tone: "good" as PointTone, text: "Better collaboration" },
    { tone: "mid" as PointTone, text: "Still disconnected workflows" },
    { tone: "good" as PointTone, text: "Real-time visibility" },
    { tone: "mid" as PointTone, text: "Manual follow-ups & approvals" },
    { tone: "mid" as PointTone, text: "Data without intelligence" },
    

  ],
};

const zedops = {
  title: "Intelligent Way with ZedOps",
  points: [
    "Connected workflows across every stage",
    "AI-powered insights & predictions",
    "Smart automation & follow-ups",
    "Real-time visibility & early risk detection",
    "Data-driven decisions & actions",
    "Zero-paper, complete accountability",
  ],
};

const outcomes: { icon: LucideIcon; text: string }[] = [
  { icon: Users, text: "One platform for every team" },
  { icon: Database, text: "One source of project truth" },
  { icon: Zap, text: "Real-time insights that drive action" },
  { icon: Shield, text: "Stronger control. Better outcomes." },
];

function PointMark({ tone }: { tone: PointTone }) {
  if (tone === "bad") {
    return (
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E11D48]">
        <X size={10} className="text-white" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  if (tone === "mid") {
    return <Minus size={14} className="mt-0.5 shrink-0 text-[#97A0AF]" strokeWidth={2.5} aria-hidden />;
  }
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22A06B]">
      <Check size={10} className="text-white" strokeWidth={3} aria-hidden />
    </span>
  );
}

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-200 bg-[#F8FAFC] py-12 lg:py-16" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })}>
          <SectionHeader
            id="compare-heading"
            title={
              <>
                Three ways of <span className="text-brand-orange">MEP & construction</span> management.
              </>
            }
            subtitle="From transitional processes to digital workflows and AI-powered execution — see how ZedOps changes the way construction teams work."
          />
        </motion.div>

        <motion.div
          {...scrollMotionProps(isMobile, { y: 10, duration: 0.35 })}
          className="mb-5 hidden items-center justify-center gap-3 sm:flex lg:mb-6 lg:gap-4"
          aria-hidden
        >
          <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#616D82] uppercase">
            <FileX size={14} />
            Transitional
          </span>
          <span className="h-px w-10 bg-[#C1C7D0] lg:w-16" />
          <ArrowRight size={12} className="text-[#C1C7D0]" />
          <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#0052CC] uppercase">
            <BarChart3 size={14} />
            Digital
          </span>
          <span className="h-px w-10 bg-brand-orange/50 lg:w-16" />
          <span className="h-2 w-2 rounded-full bg-brand-orange" />
          <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-orange uppercase">
            <Sparkles size={14} />
            Intelligent
          </span>
        </motion.div>

        <div className="grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_24px_-20px_rgba(23,43,77,0.28)]"
          >
            <div className="relative flex flex-1 flex-col overflow-hidden p-4 sm:p-5">
              <img
                src="/traditional%20bg1.png"
                alt=""
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full object-cover object-bottom opacity-90"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-white via-white/80 to-transparent"
                aria-hidden
              />
              <div className="relative z-10 mb-3 flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1F2]">
                  <FileX size={18} className="text-[#E11D48]" aria-hidden />
                </span>
                <h3 className="text-[19px] font-extrabold text-brand-orange">{transitional.title}</h3>
              </div>
              <ul className="relative z-10 flex flex-1 flex-col gap-1.5">
                {transitional.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-base leading-snug text-[#42526E]">
                    <PointMark tone={p.tone} />
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-2 bg-[#FFF1F2] px-4 py-2 text-sm font-extrabold text-[#E11D48]">
              <Clock size={15} aria-hidden />
              {transitional.footer}
            </p>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.05 })}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_24px_-20px_rgba(23,43,77,0.28)]"
          >
            <div className="relative flex flex-1 flex-col overflow-hidden p-4 sm:p-5">
              <img
                src="/photos/digital.jpg"
                alt=""
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full object-cover object-bottom opacity-60"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-white via-white/80 to-transparent"
                aria-hidden
              />
              <div className="relative z-10 mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF]">
                  <BarChart3 size={18} className="text-[#0052CC]" aria-hidden />
                </span>
                <h3 className="text-[19px] font-extrabold text-brand-orange">{digital.title}</h3>
              </div>
              <ul className="relative z-10 flex flex-1 flex-col gap-1.5">
                {digital.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-base leading-snug text-[#42526E]">
                    <PointMark tone={p.tone} />
                    {p.text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-2 bg-[#EAF2FF] px-4 py-2 text-sm font-extrabold text-[#0052CC]">
              <Eye size={15} aria-hidden />
              
            </p>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.1 })}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-navy shadow-[0_16px_36px_-20px_rgba(23,43,77,0.5)]"
          >
            <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-b-md bg-brand-orange px-3 py-1 text-[9px] font-extrabold tracking-[0.14em] text-white uppercase">
              With ZedOps
            </span>
            <div className="flex flex-1 flex-col p-4 pt-7 sm:p-5 sm:pt-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange">
                  <Sparkles size={18} className="text-white" aria-hidden />
                </span>
                <h3 className="text-[17px] font-extrabold leading-snug text-brand-orange">{zedops.title}</h3>
              </div>
              <ul className="flex flex-1 flex-col gap-1.5">
                {zedops.points.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm leading-snug text-white">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-orange">
                      <Check size={10} className="text-white" strokeWidth={3} aria-hidden />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-white/15 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <LineChart size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                  <div>
                    <p className="text-sm font-extrabold text-white">See what matters. Know what to do next.</p>
                    <p className="mt-1 text-sm leading-snug text-white/70">
                      Turn project data and field execution into intelligence and action.
                    </p>
                    <LocalA
                      href="#capabilities"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-white"
                    >
                      Explore ZedOps
                      <ArrowRight size={13} aria-hidden />
                    </LocalA>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div
          {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.08 })}
          className="mt-4 grid gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 sm:grid-cols-2 lg:mt-5 lg:grid-cols-4 lg:gap-0 lg:px-2 lg:py-3.5"
        >
          {outcomes.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className={`flex items-center gap-3 px-3 lg:justify-center ${i > 0 ? "lg:border-s lg:border-[#E5E7EB]" : ""}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F6FB]">
                  <Icon size={16} className="text-brand-orange" aria-hidden />
                </span>
                <p className="text-sm font-semibold leading-snug text-brand-navy">{item.text}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
