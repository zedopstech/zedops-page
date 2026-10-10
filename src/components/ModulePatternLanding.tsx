import { LocalA } from "@/components/LocalLink";
import { useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";

export type ModulePatternHighlight = { icon: LucideIcon; label: string };
export type ModulePatternFeature = { icon: LucideIcon; title: string; bullets?: string[]; blurb?: string };
export type ModulePatternStep = { icon: LucideIcon; title: string; description: string };
export type ModulePatternWhy = { icon: LucideIcon; title: string; desc: string };
export type ModulePatternAi = { icon: LucideIcon; title: string; body: string };

export type ModulePatternPage = {
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    tagline: string;
    subtitle: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  highlights: ModulePatternHighlight[];
  featuresTitleLead: string;
  featuresTitleAccent: string;
  featuresSubtitle: string;
  features: ModulePatternFeature[];
  workflowTitleLead: string;
  workflowTitleAccent: string;
  workflowSubtitle: string;
  workflow: ModulePatternStep[];
  whyTitle: string;
  whyVariant?: "default" | "tiles";
  why: ModulePatternWhy[];
  aiSoon: ModulePatternAi[];
  callout: {
    eyebrow: string;
    title: string;
    body: string;
    dashboardLabel?: string;
    stats?: readonly { label: string; value: string; trend?: "up" | "down" }[];
  };
  cta: { title: string; accent: string; body: string };
};

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

function FeatureCard({
  feat,
  open,
  onToggle,
  idPrefix,
}: {
  feat: ModulePatternFeature;
  open: boolean;
  onToggle: () => void;
  idPrefix: string;
}) {
  const Icon = feat.icon;
  const detailsId = `${idPrefix}-${feat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="w-full rounded-xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="flex w-full items-center justify-between gap-3 p-5 text-start"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/30">
            <Icon size={18} className="text-brand-orange" aria-hidden />
          </span>
          <h3 className="min-w-0 text-sm font-extrabold leading-snug text-brand-orange sm:text-[15px]">{feat.title}</h3>
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
            {feat.bullets?.map((line) => (
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

function DummyHeroMock({ title }: { title: string }) {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-brand-navy/8 bg-brand-navy shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] sm:h-[280px] lg:h-[380px] lg:w-[118%]">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <p className="text-[10px] font-bold tracking-[0.14em] text-brand-orange uppercase">Preview</p>
        <p className="mt-2 text-lg font-extrabold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/60">Dummy dashboard — replace with a real screenshot later.</p>
        <div className="mt-5 grid flex-1 grid-cols-3 gap-3">
          {["Live", "Open", "Done"].map((label) => (
            <div key={label} className="rounded-xl bg-white/8 p-3">
              <p className="text-[10px] font-bold tracking-wide text-white/45 uppercase">{label}</p>
              <p className="mt-2 text-xl font-black text-white">—</p>
            </div>
          ))}
        </div>
        <div className="mt-3 h-16 rounded-xl bg-white/8" />
      </div>
    </div>
  );
}

export default function ModulePatternLanding({
  page,
  idPrefix,
  afterWorkflow,
}: {
  page: ModulePatternPage;
  idPrefix: string;
  afterWorkflow?: ReactNode;
  prev?: NavModule | null;
  next?: NavModule | null;
}) {
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const colCount = Math.min(Math.max(page.workflow.length, 3), 9);

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/backgrounds/new-hero-banner.png')",
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
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{page.hero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {page.hero.titleLead}
                <span className="text-brand-orange">{page.hero.titleAccent}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl">{page.hero.tagline}</p>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{page.hero.subtitle}</p>
              <div className="mt-6">
                <LocalA
                  href="/early-access"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  Book a Demo
                  <ArrowRight size={15} aria-hidden />
                </LocalA>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {page.highlights.map((b) => {
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
              className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
            >
              <div
                className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-65 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 40%, rgba(254,93,2,0.14) 0%, rgba(23,43,77,0.06) 48%, transparent 72%)",
                }}
                aria-hidden
              />
              {page.hero.imageSrc ? (
                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] sm:h-[280px] lg:h-[380px] lg:w-[118%]">
                  <img
                    src={page.hero.imageSrc}
                    alt={page.hero.imageAlt ?? page.hero.titleAccent}
                    className="block h-full w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <DummyHeroMock title={`${page.hero.titleLead}${page.hero.titleAccent}`} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F3F6FA] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              title={
                <>
                  {page.featuresTitleLead}
                  <span className="text-brand-orange">{page.featuresTitleAccent}</span>
                </>
              }
              subtitle={page.featuresSubtitle}
            />
          </motion.div>
          <div
            className={`grid items-start gap-4 sm:grid-cols-2 ${
              page.features.length >= 8 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {page.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
                className="min-w-0 w-full"
              >
                <FeatureCard
                  feat={feat}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
                  idPrefix={idPrefix}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="Process"
              title={
                <>
                  {page.workflowTitleLead}<br/>
                  <span className="text-brand-orange">{page.workflowTitleAccent}</span>
                </>
              }
              subtitle={page.workflowSubtitle}
            />
          </motion.div>

          <div className="relative hidden lg:block">
            <div
              className="pointer-events-none absolute top-[27px] right-[calc(100%/12)] left-[calc(100%/12)] h-[2px] bg-brand-orange"
              aria-hidden
            />
            <ol className={`relative m-0 grid list-none gap-2.5 p-0`} style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
              {page.workflow.map((step, i) => {
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
                    <div className="-mt-7 flex min-h-[140px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white px-2.5 pb-4 pt-10 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.22)]">
                      <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                      <p className="mt-2 text-xs leading-snug text-[#616D82]">{step.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {page.workflow.map((step, i) => {
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
                    <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-[#616D82]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {afterWorkflow}

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            <motion.article
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-brand-navy p-6 shadow-[0_8px_28px_-20px_rgba(23,43,77,0.22)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
              <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">{page.whyTitle}</h3>
              <ul className={`mt-3 flex flex-1 flex-col ${page.whyVariant === "tiles" ? "gap-3" : ""}`}>
                {page.why.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className={
                        page.whyVariant === "tiles"
                          ? "flex items-center gap-4 rounded-2xl border border-white/8 bg-white/6 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                          : `flex items-center gap-2.5 py-1.5 ${i > 0 ? "border-t border-white/10" : ""}`
                      }
                    >
                      <span
                        className={
                          page.whyVariant === "tiles"
                            ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12"
                            : "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/30"
                        }
                      >
                        <Icon size={14} className="text-brand-orange" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p
                          className={
                            page.whyVariant === "tiles"
                              ? "text-[1.08rem] font-medium leading-[1.3] tracking-[-0.01em] text-white sm:text-[1.18rem]"
                              : "text-sm font-extrabold leading-snug text-white"
                          }
                        >
                          {item.title}
                        </p>
                        {page.whyVariant !== "tiles" && item.desc ? (
                          <p className="text-xs leading-snug text-white/70">{item.desc}</p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.article>

            <motion.article
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-brand-navy p-6 shadow-[0_8px_28px_-20px_rgba(23,43,77,0.22)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
              <div className="mb-1 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/30">
                  <Sparkles size={18} className="text-brand-orange" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">What’s coming next</h3>
                  <p className="text-xs font-bold tracking-[0.14em] text-brand-orange uppercase">AI roadmap</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-1 flex-col">
                {page.aiSoon.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-white/10" : ""}`}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/30">
                        <Icon size={16} className="text-brand-orange" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-extrabold text-white">{item.title}</p>
                          <span className="shrink-0 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[9px] font-bold tracking-wide text-brand-orange uppercase">
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

            <motion.article
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-[0_16px_40px_-20px_rgba(23,43,77,0.45)] sm:p-7"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
              <p className="text-xs font-bold tracking-[0.14em] text-brand-orange uppercase">{page.callout.eyebrow}</p>
              <h3 className="text-2xl font-extrabold leading-snug text-white">{page.callout.title}</h3>
              <p className="mt-3 text-sm leading-snug text-white/70">{page.callout.body}</p>
              {page.callout.stats?.length ? (
                <div className="my-5 grid gap-3 sm:grid-cols-3">
                  {page.callout.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                      <p className="text-[11px] font-semibold leading-snug text-white/65">{stat.label}</p>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-black tracking-tight text-white">{stat.value}</span>
                        {stat.trend ? (
                          <span
                            className={`mb-1 text-sm font-bold ${
                              stat.trend === "up" ? "text-[#22C55E]" : "text-[#22C55E]"
                            }`}
                          >
                            {stat.trend === "up" ? "↑" : "↓"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : page.callout.dashboardLabel ? (
                <div className="my-5 overflow-hidden rounded-xl border border-white/15 bg-[#E8EEF5] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#D5DEE8] px-2.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                    <span className="ms-2 h-3 flex-1 rounded-sm bg-white/70" />
                  </div>
                  <div className="flex min-h-[148px] items-center justify-center px-4 py-8">
                    <p className="text-center text-sm font-bold tracking-wide text-[#5A6A80]">{page.callout.dashboardLabel}</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1" />
              )}
              <LocalA
                href="/early-access"
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
              >
                Book a demo
                <ArrowRight size={15} aria-hidden />
              </LocalA>
            </motion.article>
          </div>
        </div>
      </section>

      <FinalCTA
        variant="brand-orange"
        compact
        title={
          <>
            {page.cta.title} <span className="text-brand-navy">{page.cta.accent}</span>
          </>
        }
        body={page.cta.body}
        primary={{ label: "Book a Demo", href: "/early-access" }}
      />
    </>
  );
}
