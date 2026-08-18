import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  dailyAiSoon,
  dailyCaptureDetails,
  dailyCta,
  dailyHero,
  dailyHeroHighlights,
  dailyImpact,
  dailyWhyChoose,
  dailyWhyGain,
  dailyWhyMatters,
  dailyWhyPain,
  dailyWorkflow,
  dailyWorkflowSync,
  type DailyFeatureTone,
} from "@/data/dailyIntelligencePage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;
type DailyCaptureFeature = (typeof dailyCaptureDetails)[number];

function DailyCaptureFeatureCard({
  feat,
  open,
  onToggle,
}: {
  feat: DailyCaptureFeature;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = feat.icon;
  const detailsId = `daily-capture-${feat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="w-full rounded-xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/30">
            <Icon size={18} className="text-brand-orange" aria-hidden />
          </span>
          <h3 className="min-w-0 text-sm font-extrabold leading-snug text-brand-orange sm:text-[15px]">
            {feat.title}
          </h3>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={detailsId} className="border-t border-white/10 px-5 pt-3 pb-5">
          <ul className="flex flex-col gap-2">
            {feat.bullets.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm leading-snug text-white/80">
                <Check size={14} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.4} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function DailyCaptureFeaturesGrid({ isMobile }: { isMobile: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {dailyCaptureDetails.map((feat, i) => (
        <motion.div
          key={feat.title}
          {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
          className="min-w-0 w-full"
        >
          <DailyCaptureFeatureCard
            feat={feat}
            open={openIndex === i}
            onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
          />
        </motion.div>
      ))}
    </div>
  );
}

const featureTone: Record<DailyFeatureTone, { wash: string; icon: string }> = {
  blue: { wash: "bg-[#DEEBFF]", icon: "text-[#0052CC]" },
  orange: { wash: "bg-brand-orange/10", icon: "text-brand-orange" },
  green: { wash: "bg-[#E3FCEF]", icon: "text-[#006644]" },
  purple: { wash: "bg-[#EAE6FF]", icon: "text-[#6554C0]" },
  rose: { wash: "bg-[#FFEBE6]", icon: "text-[#BF2600]" },
  teal: { wash: "bg-[#E6FCFF]", icon: "text-[#00A3BF]" },
  amber: { wash: "bg-[#FFFAE6]", icon: "text-[#FF8B00]" },
  indigo: { wash: "bg-[#EBF0FF]", icon: "text-[#403294]" },
};

const phoneTasks = [
  "General Details",
  "Work Log",
  "People",
  "Materials",
  "Equipments",
  "Issues & Concerns",
  "Survey",
  "Signature",
];

const recentIssues = [
  { title: "Cable tray clash — L2", cat: "MEP", status: "Open" },
  { title: "Missing fire sleeves", cat: "QA", status: "Assigned" },
  { title: "Access delay — Shaft B", cat: "Site", status: "Closed" },
];

function DailyHeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-65 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 55% 40%, rgba(254,93,2,0.14) 0%, rgba(23,43,77,0.06) 48%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8 bg-[#F4F7FB] shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] lg:w-[118%]">
        <div className="flex items-center justify-between border-b border-gray-200/80 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            <p className="text-[11px] font-extrabold tracking-wide text-brand-navy uppercase">Daily Intelligence Dashboard</p>
          </div>
          <p className="text-[10px] font-semibold text-[#6B778C]">Tower B · 13 Aug</p>
        </div>

        <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] sm:p-4">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Today’s overview</p>
            <div className="flex items-center gap-3">
              <div
                className="relative h-16 w-16 shrink-0 rounded-full"
                style={{
                  background: "conic-gradient(#22A06B 0 62%, #FE5D02 62% 84%, #0052CC 84% 100%)",
                }}
                aria-hidden
              >
                <span className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-[11px] font-black leading-none text-brand-navy">62%</span>
                  <span className="text-[8px] font-semibold text-[#6B778C]">Done</span>
                </span>
              </div>
              <ul className="m-0 min-w-0 flex-1 list-none space-y-1.5 p-0">
                {[
                  { label: "Work logged", value: "14", color: "#22A06B" },
                  { label: "Open issues", value: "4", color: "#FE5D02" },
                  { label: "People on site", value: "38", color: "#0052CC" },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="flex items-center gap-1.5 font-medium text-[#42526E]">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.color }} />
                      {row.label}
                    </span>
                    <span className="font-extrabold text-brand-navy">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Issues by category</p>
            <div className="flex h-[72px] items-end gap-2">
              {[
                { h: "42%", color: "#FE5D02" },
                { h: "70%", color: "#0052CC" },
                { h: "34%", color: "#6554C0" },
                { h: "86%", color: "#22A06B" },
                { h: "54%", color: "#FF8B00" },
              ].map((bar, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: bar.h, background: bar.color, opacity: 0.85 }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:col-span-2">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Recent issues</p>
            <ul className="m-0 list-none divide-y divide-gray-100 p-0">
              {recentIssues.map((issue) => (
                <li key={issue.title} className="flex items-center justify-between gap-2 py-1.5 text-[10px]">
                  <span className="min-w-0 truncate font-semibold text-brand-navy">{issue.title}</span>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                      issue.status === "Closed"
                        ? "bg-[#E3FCEF] text-[#006644]"
                        : issue.status === "Assigned"
                          ? "bg-[#DEEBFF] text-[#0052CC]"
                          : "bg-[#FFEBE6] text-[#BF2600]"
                    }`}
                  >
                    {issue.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="absolute -bottom-6 left-2 w-[min(100%,220px)] sm:left-4 sm:w-[240px] lg:-bottom-8 lg:left-0 lg:w-[260px]">
        <DailyPhoneMock />
      </div> */}
    </div>
  );
}

function DailyPhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="overflow-hidden rounded-[1.85rem] border-[5px] border-[#1B2433] bg-[#0F1724] shadow-[0_24px_48px_-18px_rgba(23,43,77,0.55)]">
        <div className="mx-auto mt-1.5 h-1 w-12 rounded-full bg-white/25" />
        <div className="m-1.5 overflow-hidden rounded-[1.25rem] bg-[#F2F4F7]">
          <div className="flex items-center justify-between bg-white px-2.5 py-2">
            <ChevronLeft size={16} className="text-brand-navy" strokeWidth={2.2} aria-hidden />
            <p className="text-[13px] font-extrabold tracking-tight text-brand-navy">Daily Intelligence</p>
            <div className="flex items-center gap-1.5">
              <span className="relative">
                <Bell size={14} className="text-brand-navy" aria-hidden />
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#DE350B]" />
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
                A
              </span>
            </div>
          </div>

          <div className="space-y-1 p-1.5">
            <div className="rounded-lg border border-gray-200 bg-white px-2.5 py-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-extrabold leading-none text-brand-navy">03 Jul, 2026</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-[#6B778C]">• 10:00 AM</p>
                </div>
                <span className="rounded-md bg-[#E3FCEF] px-1.5 py-0.5 text-[10px] font-bold text-[#006644]">Submitted</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <p className="text-[9px] font-bold tracking-[0.12em] text-[#6B778C] uppercase">Overall Progress</p>
                <p className="text-[11px] font-extrabold text-brand-navy">8 / 8</p>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E6E9EE]">
                <div className="h-full w-full rounded-full bg-brand-orange" />
              </div>
              <p className="mt-0.5 text-center text-[10px] font-medium text-[#6B778C]">8 of 8 sections recorded</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-[#DE350B]" aria-hidden />
                <p className="flex-1 text-[12px] font-extrabold text-brand-navy">Related incidents</p>
                <span className="rounded-full bg-[#FFEBE6] px-1.5 py-0.5 text-[10px] font-bold text-[#BF2600]">1</span>
              </div>
              <p className="mt-0.5 text-[10px] leading-snug text-[#6B778C]">Incidents on 03 Jul, 2026 only.</p>
              <div className="mt-1 flex items-center gap-2 rounded-md bg-[#FFF8F7] px-2 py-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#DE350B]" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold leading-none text-brand-navy">Injury</p>
                  <p className="mt-0.5 text-[9px] font-medium text-[#6B778C]">2026-07-03 05:58 PM</p>
                </div>
                <ChevronRight size={12} className="shrink-0 text-[#97A0AF]" aria-hidden />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <ClipboardList size={13} className="text-[#0052CC]" aria-hidden />
                <p className="flex-1 text-[12px] font-extrabold text-brand-navy">Related inspections</p>
                <span className="rounded-full bg-[#DEEBFF] px-1.5 py-0.5 text-[10px] font-bold text-[#0052CC]">1</span>
              </div>
              <p className="mt-0.5 text-[10px] leading-snug text-[#6B778C]">Inspections linked to this daily log.</p>
              <div className="mt-1 flex items-center gap-2 rounded-md bg-[#F6F9FF] px-2 py-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0052CC]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold leading-none text-brand-navy">Water Supply Line Installation</p>
                  <p className="mt-0.5 text-[9px] font-medium text-[#6B778C]">Jul 3, 2026 06:17 PM • submitted</p>
                </div>
                <ChevronRight size={12} className="shrink-0 text-[#97A0AF]" aria-hidden />
              </div>
            </div>

            <ul className="m-0 list-none space-y-0.5 p-0">
              {phoneTasks.map((label, i) => (
                <li key={label} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3FCEF] text-[10px] font-extrabold text-[#006644]">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-extrabold leading-none text-brand-navy">{label}</p>
                    <p className="mt-px text-[10px] font-semibold leading-none text-[#6B778C]">Completed</p>
                  </div>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22A06B]">
                    <Check size={11} className="text-white" strokeWidth={3} aria-hidden />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DailyIntelligenceLanding(_props: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/new-hero-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{dailyHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {dailyHero.titleLead}
                <span className="text-brand-orange">{dailyHero.titleAccent}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl">{dailyHero.tagline}</p>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{dailyHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={dailyHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {dailyHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {dailyHeroHighlights.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.label} className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white ring-1 ring-gray-200">
                        <Icon size={15} className="text-brand-orange" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold leading-snug text-brand-navy">{b.label}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="pb-16 sm:pb-12 lg:pb-10"
            >
              <DailyHeroMock />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              title={
                <>
                  What You Can Capture with <span className="text-brand-orange">Daily Execution Intelligence</span>
                </>
              }
              subtitle="Every field the site already knows — structured so the office can act on it."
            />
          </motion.div>
          <DailyCaptureFeaturesGrid isMobile={isMobile} />
        </div>
      </section>

      {/* <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              title={
                <>
                  Capture <span className="text-brand-orange">Every Detail.</span> Leave Nothing Behind.
                </>
              }
              subtitle="One structured daily log for work, people, materials, plant, issues, and sign-off."
            />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dailyCaptureCards.map((card, i) => {
              const Icon = card.icon;
              const tone = featureTone[card.tone];
              return (
                <motion.article
                  key={card.title}
                  {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.03, 0.2) })}
                  className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(23,43,77,0.04)] transition-shadow hover:shadow-[0_12px_28px_-16px_rgba(23,43,77,0.18)]"
                >
                  <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${tone.wash}`}>
                    <Icon size={18} className={tone.icon} aria-hidden />
                  </span>
                  <h3 className="text-base font-extrabold leading-snug text-brand-navy">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-[#6B778C]">{card.blurb}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section> */}

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="Process"
              title={
                <>
                  Daily Execution intelligence <span className="text-brand-orange">Workflow</span>
                </>
              }
              subtitle="Nine steps on site. Real-time sync to the office. One daily log connecting both."
            />
          </motion.div>

          <div className="relative hidden lg:block">
            <div
              className="pointer-events-none absolute top-[27px] right-[calc(100%/18)] left-[calc(100%/18)] h-[2px] bg-brand-orange"
              aria-hidden
            />
            <ol className="relative m-0 grid list-none grid-cols-9 gap-2 p-0 xl:gap-2.5">
              {dailyWorkflow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.24) })}
                    className="flex min-w-0 flex-col items-center text-center"
                  >
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-orange bg-white shadow-[0_0_18px_rgba(254,93,2,0.28)]">
                      <Icon size={22} className="text-brand-orange" strokeWidth={2} aria-hidden />
                    </span>
                    <div className="-mt-7 flex min-h-[168px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white px-2 pb-4 pt-10 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.22)] xl:px-2.5">
                      
                      <h3 className="mt-1 text-xs font-extrabold leading-snug text-brand-navy xl:text-sm">{step.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-snug text-[#6B778C]">{step.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {dailyWorkflow.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.2) })}
                  className="flex gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_8px_24px_-18px_rgba(23,43,77,0.18)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-orange bg-white">
                    <Icon size={18} className="text-brand-orange" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.14em] text-brand-orange">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-[#6B778C]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-8 grid items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
            {dailyWorkflowSync.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.08 + i * 0.04 })}
                  className="relative flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-4 sm:px-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                    <Icon size={18} className="text-brand-orange" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-brand-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-[#6B778C]">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F8FAFC] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SectionHeader
                eyebrow="On the job"
                title={
                  <>
                    Daily Intelligence on <span className="text-brand-orange">mobile</span>
                  </>
                }
                subtitle="Capture the day on site — then submit. The office sees the same log instantly."
              />
              <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                {[
                  "Date, shift time, and Submitted status on one screen",
                  "Overall progress 8 / 8 with a live completion bar",
                  "Related incidents for that day, with count and timestamp",
                  "Inspections linked to the same daily log",
                  "General details: weather, location, and site photos",
                  "Work log with activities, quantities, and progress",
                  "People on site — crew, visitors, hours, and overtime",
                  "Materials delivered, consumed, remaining, and shortages",
                  "Equipment hours, idle time, and breakdowns",
                  "Issues and concerns raised, assigned, and tracked",
                  "Surveys, inspections, and incidents in the same report",
                  "Digital signature, lock, and instant office sync",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm leading-snug text-[#42526E]">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: 0.06 })}>
              <DailyPhoneMock />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <h3 className="mb-5 text-lg font-extrabold leading-snug text-white sm:text-xl">Why ZedOps is different?</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-xs font-bold tracking-wide text-[#FF8F73] uppercase">Traditional</p>
                <ul className="flex flex-col gap-2">
                  {dailyWhyPain.map((item) => (
                    <li key={item.title} className="flex items-start gap-1.5 text-sm leading-snug text-white/75">
                      <X size={13} className="mt-0.5 shrink-0 text-[#FF8F73]" strokeWidth={2.6} aria-hidden />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold tracking-wide text-brand-orange uppercase">With ZedOps</p>
                <ul className="flex flex-col gap-2">
                  {dailyWhyGain.map((item) => (
                    <li key={item.title} className="flex items-start gap-1.5 text-sm leading-snug text-white/75">
                      <Check size={13} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/30 ring-1 ring-white/20">
                <BadgeCheck size={20} className="text-brand-orange" aria-hidden />
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">Key benefits</h3>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {dailyWhyChoose.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl bg-white/5 px-3.5 py-2.5 text-sm leading-snug text-white/80 ring-1 ring-white/10"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
                    <Check size={12} className="text-brand-orange" strokeWidth={2.6} aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/30 ring-1 ring-brand-orange/20">
                <Sparkles size={20} className="text-brand-orange" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">AI roadmap</h3>
                <p className="mt-1 text-xs font-bold tracking-[0.12em] text-brand-orange uppercase">Coming soon</p>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {dailyAiSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/30">
                      <Icon size={16} className="text-brand-orange" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-extrabold text-white">{item.title}</p>
                        <span className="shrink-0 rounded-full bg-brand-orange/15 px-2 py-0.5 text-[9px] font-bold tracking-wide text-brand-orange uppercase">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-white/70">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.article>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-8 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.18)] sm:px-8"
          >
            <h2 className="mb-8 text-center text-sm font-extrabold tracking-[0.14em] text-brand-navy uppercase sm:text-base">
              Why Daily Execution Intelligence <span className="text-brand-orange">Matters</span>
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
              {dailyWhyMatters.map((item, i) => {
                const Icon = item.icon;
                const tone = featureTone[item.tone];
                return (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center px-3 text-center ${
                      i > 0 ? "lg:border-l lg:border-gray-200" : ""
                    }`}
                  >
                    <Icon size={28} className={tone.icon} strokeWidth={1.7} aria-hidden />
                    <p className="mt-3 text-sm font-semibold leading-snug text-[#42526E]">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.article>

          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.06 })} className="mt-12">
            <h2 className="mb-8 text-center text-sm font-extrabold tracking-[0.14em] text-brand-navy uppercase sm:text-base">
              The <span className="text-brand-orange">Impact</span> You Get
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {dailyImpact.map((item, i) => {
                const Icon = item.icon;
                const tone = featureTone[item.tone];
                return (
                  <motion.article
                    key={item.label}
                    {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
                    className={`flex items-center gap-3 rounded-xl px-4 py-4 ${tone.wash}`}
                  >
                    <Icon size={28} className={`shrink-0 ${tone.icon}`} strokeWidth={1.7} aria-hidden />
                    <div className="min-w-0">
                      <p className={`text-2xl font-black leading-none ${tone.icon}`}>{item.value}</p>
                      <p className="mt-1 text-xs font-semibold leading-snug text-brand-navy">{item.label}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTA
        variant="brand-orange"
        compact
        title={
          <>
            Capture Today. <span className="text-brand-navy">Control Tomorrow. Deliver On Time.</span>
          </>
        }
        body={dailyCta.body}
        primary={dailyCta.primary}
      />
    </>
  );
}
