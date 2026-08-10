import { ArrowRight, BadgeCheck, Check, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
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
  type EstimationFeatureTone,
} from "@/data/estimationPage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

const toneClass: Record<EstimationFeatureTone, { icon: string; check: string; wash: string }> = {
  blue: { icon: "text-[#0052CC]", check: "text-[#0052CC]", wash: "bg-[#DEEBFF]" },
  orange: { icon: "text-brand-orange", check: "text-brand-orange", wash: "bg-brand-orange/10" },
  green: { icon: "text-[#006644]", check: "text-[#006644]", wash: "bg-[#E3FCEF]" },
  purple: { icon: "text-[#6554C0]", check: "text-[#6554C0]", wash: "bg-[#EAE6FF]" },
  rose: { icon: "text-[#BF2600]", check: "text-[#BF2600]", wash: "bg-[#FFEBE6]" },
  teal: { icon: "text-[#008DA6]", check: "text-[#008DA6]", wash: "bg-[#E6FCFF]" },
};

export default function EstimationLanding(_props: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();
  const CalloutIcon = estimationCallout.icon;

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/hero-banner.png')",
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
              <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-brand-orange uppercase">{estimationHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {estimationHero.titleLead}
                <span className="text-brand-orange">{estimationHero.titleAccent}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl">{estimationHero.tagline}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#42526E] sm:text-base">{estimationHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={estimationHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {estimationHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
                <a
                  href={estimationHero.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand-navy px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
                >
                  <Play size={14} aria-hidden />
                  {estimationHero.secondaryCta.label}
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
                      <span className="text-[11px] font-semibold leading-snug text-brand-navy">{b.label}</span>
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
              <div className="relative flex h-[240px] w-[108%] items-center justify-center overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] sm:h-[280px] lg:h-[320px]">
                <img
                  src={estimationHero.imageSrc}
                  alt={estimationHero.imageAlt}
                  className="block h-full w-full object-contain object-center"
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
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Everything you need for accurate estimation & winning proposals
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {estimationFeatures.map((feat, i) => {
              const Icon = feat.icon;
              const tone = toneClass[feat.tone];
              return (
                <motion.article
                  key={feat.title}
                  {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
                  className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(23,43,77,0.04)] transition-shadow hover:shadow-[0_12px_28px_-16px_rgba(23,43,77,0.18)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.wash}`}>
                      <Icon size={18} className={tone.icon} aria-hidden />
                    </span>
                    <h3 className="text-[15px] font-extrabold leading-snug text-brand-navy">{feat.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {feat.bullets.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[13px] leading-snug text-[#42526E]">
                        <Check size={14} className={`mt-0.5 shrink-0 ${tone.check}`} strokeWidth={2.4} aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-orange/50" aria-hidden />
              <p className="text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">Process</p>
              <span className="h-px w-8 bg-brand-orange/50" aria-hidden />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-[42px]">
              Estimation to proposal — seamless workflow
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#6B778C] sm:text-lg">
              From client BOQ to submitted proposal — one connected path.
            </p>
            <span className="mx-auto mt-4 block h-[3px] w-10 rounded-full bg-brand-orange" aria-hidden />
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
                      <h3 className="text-[13px] font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                      <p className="mt-2 text-[11px] leading-relaxed text-[#6B778C]">{step.description}</p>
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
                    <p className="mt-1 text-[12px] leading-relaxed text-[#6B778C]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F8FAFC] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-[0_8px_28px_-20px_rgba(23,43,77,0.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(23,43,77,0.28)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 ring-1 ring-brand-orange/15">
                <BadgeCheck size={20} className="text-brand-orange" aria-hidden />
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-brand-navy sm:text-xl">Why estimators choose ZedOps</h3>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {estimationWhy.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] px-3.5 py-2.5 text-[13px] leading-snug text-[#42526E] ring-1 ring-gray-100"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3FCEF]">
                    <Check size={12} className="text-[#006644]" strokeWidth={2.6} aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 shadow-[0_8px_28px_-20px_rgba(23,43,77,0.22)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(23,43,77,0.28)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-navy" aria-hidden />
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAE6FF] ring-1 ring-[#6554C0]/15">
                  <Sparkles size={20} className="text-[#6554C0]" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-brand-navy sm:text-xl">What’s coming next (AI roadmap)</h3>
                  <p className="mt-1 text-[11px] font-bold tracking-[0.12em] text-brand-orange uppercase">Coming soon</p>
                </div>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {estimationAiSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-xl border border-gray-100 bg-[#FAFBFC] p-3 transition-colors group-hover:bg-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                      <Icon size={16} className="text-brand-orange" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13px] font-extrabold text-brand-navy">{item.title}</p>
                        <span className="shrink-0 rounded-full bg-[#DEEBFF] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#0052CC] uppercase">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-snug text-[#6B778C]">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-navy p-7 text-white shadow-[0_16px_40px_-20px_rgba(23,43,77,0.45)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: [
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                  "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "28px 28px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/20 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <CalloutIcon size={22} className="text-brand-orange" aria-hidden />
              </span>
              <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-brand-orange uppercase">{estimationCallout.eyebrow}</p>
              <h3 className="text-2xl font-extrabold leading-snug">{estimationCallout.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">{estimationCallout.body}</p>
              <a
                href="/early-access"
                className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-white transition-colors hover:text-brand-orange"
              >
                Book a demo
                <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      <FinalCTA
        variant="orange"
        compact
        title={<>Create Accurate Estimates. <span className="text-brand-navy">Win More Projects.</span></>}
        body={estimationCta.body}
        primary={estimationCta.primary}
        secondary={estimationCta.secondary}
      />
    </>
  );
}
