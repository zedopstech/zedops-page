import { useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Check, ChevronDown, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  planningAiSoon,
  planningBenefits,
  planningCta,
  planningFeatures,
  planningHero,
  planningWhy,
  planningWorkflow,
  planningWorkflowLoop,
} from "@/data/planningSchedulePage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

type PlanningFeature = (typeof planningFeatures)[number];

function PlanningFeatureCard({
  feat,
  open,
  onToggle,
}: {
  feat: PlanningFeature;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = feat.icon;
  const detailsId = `planning-feature-${feat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

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
          <h3 className="min-w-0 whitespace-nowrap text-sm font-extrabold leading-snug text-brand-orange sm:text-[15px]">
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

function PlanningFeaturesGrid({ isMobile }: { isMobile: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {planningFeatures.map((feat, i) => (
        <motion.div
          key={feat.title}
          {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
        >
          <PlanningFeatureCard
            feat={feat}
            open={openIndex === i}
            onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
          />
        </motion.div>
      ))}
    </div>
  );
}

function HeroDemoVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <div className="relative w-full lg:w-[135%] lg:max-w-none">
      <video
        ref={videoRef}
        className="h-auto w-full cursor-pointer bg-transparent object-contain object-center mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        aria-label={label}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function PlanningScheduleLanding({
  prev,
  next,
}: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();
  const LoopIcon = planningWorkflowLoop.icon;

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
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{planningHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                Planning & <span className="text-brand-orange">Scheduling</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl"><span className="text-brand-orange">Plan smarter. Track faster.</span> Deliver on time.</p>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{planningHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={planningHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {planningHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {planningBenefits.map((b) => {
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
              className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
            >
              <HeroDemoVideo src={planningHero.videoSrc} label={planningHero.imageAlt} />
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
                  Everything you need for <span className="text-brand-orange">planning & scheduling</span>
                </>
              }
              subtitle="Import, monitor, and manage programmes with the tools planners use every day."
            />
          </motion.div>
          <PlanningFeaturesGrid isMobile={isMobile} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="Process"
              title={
                <>
                  Planning & scheduling <span className="text-brand-orange">workflow</span>
                </>
              }
              subtitle="From import to export — one connected programme."
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto hidden max-w-[96rem] px-4 sm:px-6 lg:block lg:px-8">
          <div className="relative">
            <div
              className="pointer-events-none absolute top-[27px] right-[calc((100%-8.75rem)/16)] left-[calc((100%-8.75rem)/16)] h-[2px] bg-brand-orange"
              aria-hidden
            />
            <ol className="relative m-0 grid list-none grid-cols-8 gap-5 p-0">
              {planningWorkflow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.24) })}
                    className="flex min-w-0 flex-col items-center text-center"
                  >
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-orange bg-white shadow-[0_0_18px_rgba(254,93,2,0.28)]">
                      <Icon size={22} className="text-brand-orange" strokeWidth={2} aria-hidden />
                    </span>
                    <div className="-mt-7 w-full min-w-0 rounded-2xl border border-gray-100 bg-white px-2 pb-4 pt-10 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.22)] xl:px-2.5">
                      <h3 className="text-xs font-extrabold leading-tight hyphens-none text-brand-navy [overflow-wrap:normal] [word-break:keep-all]">
                        {step.title.split("\n").map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-2 text-xs leading-snug hyphens-none text-[#6B778C] [overflow-wrap:normal] [word-break:keep-all]">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <div className="relative h-[104px]">
              <div className="pointer-events-none absolute inset-0 grid grid-cols-8 gap-5" aria-hidden>
                <div className="relative">
                  <div className="absolute top-0 bottom-6 left-1/2 w-0 -translate-x-[1px] border-l-2 border-dashed border-brand-orange" />
                  <div className="absolute bottom-6 left-1/2 h-4 w-4 -translate-x-[1px] rounded-bl-[10px] border-b-2 border-l-2 border-dashed border-brand-orange" />
                  <div className="absolute right-0 bottom-6 left-1/2 border-t-2 border-dashed border-brand-orange" />
                  <svg
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[5px] text-brand-orange"
                    width="11"
                    height="9"
                    viewBox="0 0 11 9"
                    fill="currentColor"
                  >
                    <path d="M5.5 0L10.5 8H0.5L5.5 0Z" />
                  </svg>
                </div>
                <div className="relative col-span-6">
                  <div className="absolute -inset-x-5 bottom-6 border-t-2 border-dashed border-brand-orange" />
                </div>
                <div className="relative">
                  <div className="absolute top-0 bottom-6 left-1/2 w-0 -translate-x-[1px] border-l-2 border-dashed border-brand-orange" />
                  <div className="absolute right-1/2 bottom-6 h-4 w-4 translate-x-[1px] rounded-br-[10px] border-r-2 border-b-2 border-dashed border-brand-orange" />
                  <div className="absolute right-1/2 bottom-6 left-0 border-t-2 border-dashed border-brand-orange" />
                </div>
              </div>

              <div className="absolute bottom-[0px] left-1/2 z-10 flex w-max max-w-[min(92%,36rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-[0_10px_28px_-16px_rgba(23,43,77,0.28)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <LoopIcon size={16} className="text-brand-orange" aria-hidden />
                </span>
                <p className="text-left text-sm leading-snug">
                  <span className="font-extrabold text-brand-navy">{planningWorkflowLoop.title}</span>
                  <span className="ml-1.5 font-medium text-[#6B778C]">{planningWorkflowLoop.description}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:hidden lg:px-8">
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {planningWorkflow.map((step, i) => {
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
                    <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title.replace(/\n/g, " ")}</h3>
                    <p className="mt-1 text-sm leading-snug text-[#6B778C]">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
            <motion.li
              {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.2 })}
              className="flex gap-3 rounded-2xl border border-dashed border-brand-orange/40 bg-[#FFF7F2] px-4 py-4 sm:col-span-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                <LoopIcon size={18} className="text-brand-orange" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{planningWorkflowLoop.title}</h3>
                <p className="mt-1 text-sm leading-snug text-[#6B778C]">{planningWorkflowLoop.description}</p>
              </div>
            </motion.li>
          </ol>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F8FAFC] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                <BadgeCheck size={20} className="text-brand-orange" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">Why planners choose ZedOps</h3>
                <p className="mt-1 text-sm font-medium text-brand-orange">Smarter planning. Fewer delays. Greater site control.</p>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {planningWhy.map((line) => (
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
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                  <Sparkles size={20} className="text-brand-orange" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">AI-powered schedule intelligence</h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-brand-orange uppercase">Coming soon</p>
                </div>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {planningAiSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15">
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

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-[0_16px_40px_-20px_rgba(23,43,77,0.45)]"
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
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                  <Clock size={20} className="text-brand-orange" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">
                    One connected schedule. Every update. Real impact.
                  </h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-brand-orange ">Connected programmer</p>
                </div>
              </div>
              <p className="text-base leading-snug text-white/70">
                When the programme lives next to tasks, logs, and punch, updates on site change what planners see — without a
                second spreadsheet.
              </p>
              <ul className="mt-5 mb-6 flex flex-col gap-2">
                {["Live progress visibility", "Faster risk response", "Aligned teams", "Real-time updates", "Easy access to data", "No more spreadsheets"].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-base font-medium text-white/85">
                    <Check size={14} className="shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href="/early-access"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
              >
                Book a demo
                <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      <FinalCTA
        variant="brand-navy"
        title={
          <>
            Plan Better. <span className="text-white">Track Smarter.</span> Deliver On Time.
          </>
        }
        body={planningCta.body}
      
      />
    </>
  );
}
