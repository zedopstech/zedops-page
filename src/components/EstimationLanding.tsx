import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  estimationAiSoon,
  estimationBenefits,
  estimationCallout,
  estimationCta,
  estimationFeatures,
  estimationHero,
  estimationWhy,
  estimationWorkflow,
} from "@/data/estimationPage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

type EstimationFeature = (typeof estimationFeatures)[number];

function EstimationFeatureCard({
  feat,
  open,
  onToggle,
}: {
  feat: EstimationFeature;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = feat.icon;
  const detailsId = `estimation-feature-${feat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="rounded-xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]">
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
          <h3 className="min-w-0 whitespace-nowrap text-sm font-extrabold leading-snug text-brand-orange/100 sm:text-[15px]">
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

function EstimationFeaturesGrid({ isMobile }: { isMobile: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {estimationFeatures.map((feat, i) => (
        <motion.div
          key={feat.title}
          {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
        >
          <EstimationFeatureCard
            feat={feat}
            open={openIndex === i}
            onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
          />
        </motion.div>
      ))}
    </div>
  );
}

function EstimateBoqMock() {
  const tabs = ["Estimate", "BOQ", "Rates", "Markup"];
  const rows = [
    { name: "HVAC", amt: "$128,400" },
    { name: "Electrical", amt: "$94,250" },
    { name: "Plumbing", amt: "$71,800" },
    { name: "Fire", amt: "$53,200" },
  ];
  const legend = [
    { label: "HVAC", color: "#3B82F6" },
    { label: "Elec", color: "#FE5D02" },
    { label: "Plumb", color: "#22C55E" },
    { label: "Fire", color: "#EAB308" },
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-lg bg-[#07101C] ring-1 ring-white/12">
      <div className="grid grid-cols-[3.4rem_minmax(0,1fr)]">
        <aside className="border-r border-white/10 py-2">
          {tabs.map((tab) => (
            <p
              key={tab}
              className={`truncate px-1.5 py-1.5 text-center text-[8px] font-bold tracking-wide uppercase ${
                tab === "BOQ" ? "bg-brand-orange/20 text-brand-orange" : "text-white/40"
              }`}
            >
              {tab}
            </p>
          ))}
        </aside>
        <div className="min-w-0 p-2.5">
          <p className="mb-1.5 text-[9px] font-extrabold tracking-[0.08em] text-white/45 uppercase">BOQ Summary</p>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {rows.map((row) => (
              <li key={row.name} className="flex items-center justify-between gap-2 text-[10px]">
                <span className="font-medium text-white/70">{row.name}</span>
                <span className="font-extrabold text-white">{row.amt}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center gap-2.5 border-t border-white/10 pt-2.5">
            <div
              className="relative h-14 w-14 shrink-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#3B82F6 0 37%, #FE5D02 37% 64%, #22C55E 64% 85%, #EAB308 85% 100%)",
              }}
              aria-hidden
            >
              <span className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-[#07101C]">
                <span className="text-[7px] font-bold tracking-wide text-white/45 uppercase">Total</span>
                <span className="text-[8px] font-extrabold leading-none text-white">$348k</span>
              </span>
            </div>
            <ul className="m-0 grid min-w-0 flex-1 list-none grid-cols-2 gap-x-2 gap-y-1 p-0">
              {legend.map((item) => (
                <li key={item.label} className="flex items-center gap-1 text-[8px] font-semibold text-white/65">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EstimationLanding(_props: {
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
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{estimationHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {estimationHero.titleLead}
                <span className="text-brand-orange">{estimationHero.titleAccent}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl">{estimationHero.tagline}</p>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{estimationHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={estimationHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {estimationHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {estimationBenefits.map((b) => {
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
              <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] sm:h-[280px] lg:h-[380px] lg:w-[118%]">
                <img
                  src={estimationHero.imageSrc}
                  alt={estimationHero.imageAlt}
                  className="block h-full w-full object-cover object-top"
                  width={1600}
                  height={1000}
                  loading="eager"
                  decoding="async"
                />
              </div>
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
                  Everything You Need for Accurate{" "}
                  <span className="text-brand-orange">Estimation & Winning Proposals</span>
                </>
              }
              subtitle="Build estimates, apply markups, and deliver client-ready proposals from one connected workflow."
            />
          </motion.div>
          <EstimationFeaturesGrid isMobile={isMobile} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="Process"
              title={
                <>
                  Estimation to Proposal — <span className="text-brand-navy">Seamless Workflow</span>
                </>
              }
              titleClassName="text-brand-orange"
              subtitle="From client BOQ to submitted proposal — one connected path."
            />
          </motion.div>

          <div className="relative hidden lg:block">
            <div
              className="pointer-events-none absolute top-[27px] right-[calc(100%/16)] left-[calc(100%/16)] h-[2px] bg-brand-orange"
              aria-hidden
            />
            <ol className="relative m-0 grid list-none grid-cols-8 gap-2.5 p-0 xl:gap-3">
              {estimationWorkflow.map((step, i) => {
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
                    <div className="-mt-7 flex min-h-[140px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white px-2.5 pb-4 pt-10 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.22)] xl:px-3">
                      <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                      <p className="mt-2 text-xs leading-snug text-[#6B778C]">{step.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {estimationWorkflow.map((step, i) => {
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
                    <p className="mt-1 text-sm leading-snug text-[#6B778C]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mb-8 max-w-3xl lg:mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Built for estimators:{" "}
              <span className="font-bold text-[#42526E]">From first takeoff to winning bid.</span>
            </h2>
          </motion.div> */}

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            <motion.article
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-brand-navy p-6 shadow-[0_8px_28px_-20px_rgba(23,43,77,0.22)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
              <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">Why estimators choose ZedOps</h3>
              <p className="mt-1 text-sm leading-snug text-white/70">
                Library rates, mapping, and revisions on one record.
              </p>
              <ul className="mt-4 flex flex-1 flex-col">
                {estimationWhy.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/30">
                        <Icon size={16} className="text-brand-orange" aria-hidden />
                      </span>
                      <Check size={14} className="mt-2 shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-white">{item.title}</p>
                        <p className="mt-0.5 text-sm leading-snug text-white/70">{item.desc}</p>
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
                {estimationAiSoon.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}
                    >
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
                        <p className="mt-0.5 text-sm leading-snug text-[#6B778C]">{item.body}</p>
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
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage: "url('/new-hero-banner.png')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/85 to-brand-navy"
                aria-hidden
              />
              <div className="relative z-10 flex h-full flex-col">
                <p className="mb-2 text-xs font-bold tracking-[0.14em] text-brand-orange uppercase">
                  {estimationCallout.eyebrow}
                </p>
                <h3 className="text-2xl font-extrabold leading-snug text-white">{estimationCallout.title}</h3>
                <EstimateBoqMock />
                <div className="mt-auto pt-5">
                  <a
                    href="/early-access"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                  >
                    Book a demo
                    <ArrowRight size={15} aria-hidden />
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <FinalCTA
        variant="brand-orange"
        compact
        title={<>Create Accurate Estimates. <span className="text-brand-navy">Win More Projects.</span></>}
        body={estimationCta.body}
        primary={estimationCta.primary}
      />
    </>
  );
}
