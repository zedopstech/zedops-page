import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  X,
  Zap,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import SupplyChainDashboard from "@/components/dashboards/supplyChain/SupplyChainDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  materialAiEyebrow,
  materialAiRoadmap,
  materialBenefits,
  materialComparison,
  materialConnected,
  materialCta,
  materialFeatures,
  materialFeaturesTitle,
  materialHero,
  materialKpis,
  materialSources,
  materialSourcesTitle,
  materialWorkflow,
  materialWorkflowTitle,
  materialDashboardData,
} from "@/data/materialManagementData";
import { DemoPlaceholder } from "@/components/design-system/primitives";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

type MaterialFeature = (typeof materialFeatures)[number];

function MaterialFeatureCard({ feat }: { feat: MaterialFeature }) {
  const Icon = feat.icon;
  return (
    <article className="w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/30">
          <Icon size={20} className="text-brand-orange" strokeWidth={2} aria-hidden />
        </span>

        <h3 className="text-base font-extrabold leading-snug text-brand-orange sm:text-lg">
          {feat.title}
        </h3>
      </div>

      <div className="border-t border-white/10 px-5 pb-6 pt-4">
        <ul className="flex flex-col gap-3">
          {feat.bullets.map((line) => (
            <li
              key={line}
              className="flex items-start gap-2.5 text-sm leading-snug text-white/80 sm:text-base"
            >
              <Check size={16} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.4} aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function KpiSparkline({
  points,
  color,
  id,
  className,
}: {
  points: readonly number[];
  color: string;
  id: string;
  className?: string;
}) {
  const width = 64;
  const height = 28;
  const padX = 3;
  const padY = 4;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((value, i) => ({
    x: padX + (i / (points.length - 1)) * (width - padX * 2),
    y: padY + (1 - (value - min) / range) * (height - padY * 2),
  }));

  const linePath = coords.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = coords[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${path} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - 1} L ${coords[0].x} ${height - 1} Z`;

  return (
    <svg
      className={`h-7 w-[60px] shrink-0 sm:h-8 sm:w-[68px] ${className ?? ""}`}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${id})`} />
      <path d={linePath} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="2" fill={color} />
      ))}
    </svg>
  );
}

/**
 * Tone per KPI colour. `blue` was missing while materialKpis.stats already asked
 * for `color: "blue"`, so `kpiTone[stat.color]` was undefined and the very next
 * line - `tone.icon` - would have thrown. It never did because
 * MaterialScheduleKpiCard is never rendered (see the reachability note in
 * README), so the bug sat latent. Added here rather than changing the data,
 * because the data is right: four tones read better on that card than three,
 * and blue is the one the designer picked.
 */
const kpiTone = {
  orange: { icon: "bg-brand-orange/15 text-brand-orange", spark: "#FE5D02" },
  green: { icon: "bg-[#E3FCEF] text-[#00875A]", spark: "#22C55E" },
  red: { icon: "bg-[#FFEBE6] text-[#DE350B]", spark: "#EF4444" },
  purple: { icon: "bg-[#EAE6FF] text-[#5243AA]", spark: "#7C3AED" },
  blue: { icon: "bg-[#E1F0FF] text-[#0B63CE]", spark: "#3B82F6" },
} as const;

function MaterialScheduleKpiCard() {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold leading-snug text-white sm:text-lg">{materialKpis.title}</h3>
          <p className="mt-0.5 text-xs text-white/60 sm:text-sm">{materialKpis.subtitle}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
          <BarChart3 size={16} className="text-brand-orange" strokeWidth={2} aria-hidden />
        </span>
      </div>

      <ul className="mt-3 flex flex-1 flex-col gap-1.5">
        {materialKpis.stats.map((stat, i) => {
          const Icon = stat.icon;
          const tone = kpiTone[stat.color];
          return (
            <li key={stat.label} className="rounded-lg bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/10">
              <div className="flex items-start gap-2.5">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${tone.icon}`}>
                  <Icon size={14} strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1.5">
                    <p className="min-w-0 text-[11px] leading-snug text-white/65 sm:text-xs">{stat.label}</p>
                    <KpiSparkline
                      points={stat.sparkPoints}
                      color={tone.spark}
                      id={`material-kpi-spark-${i}`}
                      className="-mt-0.5"
                    />
                  </div>
                  <p className="mt-0.5 text-xl font-black leading-none tracking-tight text-white">{stat.value}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <a
        href={materialKpis.cta.href}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
      >
        {materialKpis.cta.label}
        <ArrowRight size={14} aria-hidden />
      </a>
      <p className="mt-1 text-[9px] text-white/45">{materialKpis.sampleNote}</p>
    </>
  );
}

function MaterialConnectedCard() {
  return (
    <section className="mx-auto flex min-h-[390px] w-full max-w-[557px] flex-col justify-center px-6 py-6">
      <div className="max-w-md">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
          {materialHero.eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
          {materialConnected.titleLead}
          <span className="text-brand-orange">{materialConnected.titleAccent}</span>
        </h2>

        <p className="mt-5 text-sm leading-6 text-[#616D82] sm:text-base">
          {materialHero.subtitle}
        </p>

        <p className="mt-4 text-sm font-semibold text-brand-navy">
          {materialConnected.subtitle}
        </p>
      </div>
    </section>
  );
}

export default function MaterialManagementLanding(_props: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const colCount = Math.min(Math.max(materialWorkflow.length, 3), 9);

  return (
    <>
      <section className="relative mb-6 overflow-visible border-b border-gray-100">
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
          className="pointer-events-none absolute bottom-0 left-1/2 h-[180px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.10) 0%, transparent 65%)",
            filter: "blur(35px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center text-center"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
              {materialHero.eyebrow}
            </p>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {materialHero.titleLead}{" "}
              <span className="text-brand-orange">{materialHero.titleAccent}</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#42526E] sm:text-base">
              {materialHero.subtitle}
            </p>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-brand-orange
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_20px_-8px_rgba(254,93,2,0.45)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-brand-orange-soft
                "
              >
                {materialHero.primaryCta.label}
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </motion.div>

          <section className="relative z-10 mt-0 overflow-visible border-t border-gray-100 px-2 py-2 sm:px-4 lg:px-6 lg:py-4">
            <div className="relative mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <SupplyChainDashboard data={materialDashboardData} onWatchDemo={() => setIsDemoOpen(true)} />
            </div>
          </section>
        </div>
      </section>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Material management demo"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDemoOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
              aria-label="Close video"
            >
              ×
            </button>

            <DemoPlaceholder title="Material management demo" />
          </div>
        </div>
      )}

      <section className="border-t border-gray-100 bg-[#F3F6FA] py-6 lg:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mb-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {materialFeaturesTitle.lead}{" "}
              <span className="text-brand-orange">{materialFeaturesTitle.accent}</span>
              <span className="mx-auto mt-2 block h-[3px] w-16 rounded-full bg-brand-navy" />
            </h2>
          </motion.div>
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materialFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
                className="min-w-0 w-full"
              >
                <MaterialFeatureCard feat={feat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-visible border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">Process</span>
              <span className="h-px w-10 bg-brand-orange" />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {materialWorkflowTitle.lead}{" "}
              <span className="text-brand-orange">{materialWorkflowTitle.accent}</span>
            </h2>
          </motion.div>

          <div className="relative hidden lg:block">
            <ol
              className="relative m-0 grid list-none gap-2.5 p-0"
              style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
            >
              {materialWorkflow.map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.li
                    key={step.title}
                    {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.24) })}
                    className="relative flex min-w-0 flex-col items-center text-center"
                  >
                    {i < materialWorkflow.length - 1 && (
                      <div
                        className="pointer-events-none absolute left-1/2 right-[-5px] top-[27px] z-0 flex items-center"
                        aria-hidden
                      >
                        <div className="h-px flex-1 bg-brand-orange/70" />
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 text-brand-orange">
                          <path d="M1.5 5H8M5.5 2.5L8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}

                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-orange bg-white shadow-[0_0_18px_rgba(254,93,2,0.28)]">
                      <Icon size={22} className="text-brand-orange" strokeWidth={2} aria-hidden />
                    </span>

                    <span className="h-7 w-px bg-brand-orange" aria-hidden />

                    <div className="flex min-h-[72px] items-start justify-center px-2">
                      <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {materialWorkflow.map((step, i) => {
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
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mx-auto max-w-7xl px-2 py-16 sm:px-4 lg:px-8">
          <div className="grid items-stretch gap-5 lg:grid-cols-[1.15fr_2.05fr]">
            <motion.article {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })} className="relative flex flex-col">
              <MaterialConnectedCard />
            </motion.article>

            <motion.article
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
              className="relative min-h-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.22)]"
            >
              <img
                src={materialHero.imageSrc}
                alt={materialHero.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" aria-hidden />
            </motion.article>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F3F6FA] py-6 lg:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Traditional Way <span className="font-medium text-[#616D82]">vs</span>{" "}
              <span className="text-brand-orange">ZEDOPS</span>
            </h2>
            <span className="mx-auto mt-2 block h-[3px] w-16 rounded-full bg-brand-orange" />
          </motion.div>

          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: 0.05 })} className="relative mt-6">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
              <article className="overflow-hidden rounded-3xl border border-red-100 bg-[#FFF8F8] shadow-[0_12px_32px_-22px_rgba(23,43,77,0.25)]">
                <div className="px-6 py-3 text-center sm:px-8">
                  <h3 className="text-xl font-extrabold text-[#C62828] sm:text-2xl">{materialComparison.traditionalTitle}</h3>
                </div>
                <div className="mx-3 mb-3 overflow-hidden rounded-2xl border border-red-100 bg-white">
                  {materialComparison.traditional.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 sm:px-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5F5] text-[#DE350B] ring-1 ring-red-100">
                        <BarChart3 size={19} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold leading-snug text-brand-navy sm:text-[15px]">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-snug text-[#616D82] sm:text-sm">{item.description}</p>
                      </div>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EF4444]">
                        <X size={13} className="text-white" strokeWidth={3} />
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-emerald-100 bg-[#F5FCF8] shadow-[0_12px_32px_-22px_rgba(23,43,77,0.25)]">
                <div className="px-6 py-3 text-center sm:px-8">
                  <h3 className="text-xl font-extrabold text-[#00875A] sm:text-2xl">{materialComparison.zedopsTitle}</h3>
                </div>
                <div className="mx-3 mb-3 overflow-hidden rounded-2xl border border-emerald-100 bg-white">
                  {materialComparison.withZedops.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 sm:px-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0FFF7] text-[#00875A] ring-1 ring-emerald-100">
                        <TrendingUp size={19} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold leading-snug text-brand-navy sm:text-[15px]">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-snug text-[#616D82] sm:text-sm">{item.description}</p>
                      </div>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22A866]">
                        <Check size={13} className="text-white" strokeWidth={3} />
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-base font-black text-white shadow-xl ring-8 ring-white">VS</div>
            </div>
          </motion.div>

          <motion.div
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_28px_-20px_rgba(23,43,77,0.25)]"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-5">
              {materialComparison.benefits.map((benefit, index) => {
                const icons = [Eye, Target, BarChart3, ShieldCheck, Trophy];
                const Icon = icons[index];
                return (
                  <div
                    key={benefit.title}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      index < materialComparison.benefits.length - 1
                        ? "border-b border-gray-100 lg:border-b-0 lg:border-r"
                        : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center text-brand-navy">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold leading-snug text-brand-navy">{benefit.title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-[#616D82]">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.14 })}
            className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_28px_-20px_rgba(23,43,77,0.25)]"
          >
            <div className="grid md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="flex items-center gap-3 px-5 py-3 sm:px-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                  <Zap size={21} className="text-brand-orange" fill="currentColor" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-snug text-brand-navy sm:text-base">
                    From manual & delayed → to automated & real-time.
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-brand-orange">That&apos;s the ZEDOPS advantage.</p>
                </div>
              </div>
              <div className="hidden h-12 w-px bg-gray-200 md:block" />
              <div className="flex items-center gap-3 px-5 py-3 sm:px-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-lg font-black text-brand-orange">Z</span>
                <div>
                  <p className="text-sm font-extrabold leading-snug text-brand-navy sm:text-base">One Platform. Every Material.</p>
                  <p className="mt-0.5 text-sm font-bold text-brand-orange">Request. Transfer. Procure. Receive. Close.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 12, duration: 0.35 })} className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <BarChart3 size={26} className="shrink-0 text-[#0052CC]" aria-hidden />
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                From <span className="text-brand-orange">request to receipt</span> — stay ahead with real-time inventory and delivery control.
              </h2>
            </div>
            <span className="mx-auto mt-4 block h-[4px] w-20 rounded-full bg-brand-orange" />
          </motion.div>

          <motion.div
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.04 })}
            className="overflow-hidden rounded-2xl border border-[#E1E5EB] bg-white shadow-[0_8px_30px_-18px_rgba(23,43,77,0.25)]"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex shrink-0 items-center border-b border-[#E1E5EB] bg-[#F4F6F8] px-7 py-8 lg:w-[235px] lg:border-b-0 lg:border-r xl:w-[255px]">
                <p className="text-lg font-extrabold leading-snug text-brand-navy">
                  What's Coming Next —
                  <span className="mt-1 block text-brand-orange">
                    ZED AI <span className="font-semibold text-[#42526E]">(Roadmap)</span>
                  </span>
                </p>
              </div>
              <ul className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {materialAiRoadmap.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="flex min-w-0 border-b border-[#E1E5EB] px-5 py-7 sm:px-6 lg:border-r lg:border-b-0 lg:last:border-r-0"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="mb-4 flex h-9 w-9 items-center justify-center">
                          <Icon size={24} className="text-brand-orange" strokeWidth={1.8} aria-hidden />
                        </span>
                        <p className="text-sm font-extrabold leading-snug text-brand-navy">{item.title}</p>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-[#42526E]">{item.body}</p>
                        <span className="mt-4 inline-flex w-fit rounded-full bg-[#EEF6FF] px-3 py-1 text-[10px] font-bold leading-none text-[#2563EB]">
                          Coming Soon
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6 lg:px-8">
        <motion.div {...scrollMotionProps(isMobile, { y: 12, duration: 0.4 })}>
          <h2 className="text-center text-[30px] font-extrabold tracking-tight text-brand-navy">
            {materialSourcesTitle.lead}
            <span className="text-brand-orange">{materialSourcesTitle.accent}</span>
          </h2>
          <span className="mx-auto mt-2 block h-[3px] w-15 rounded-full bg-brand-orange" />
        </motion.div>

        <div className="mt-8 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ol className="mx-auto flex min-w-max list-none items-center gap-0 p-0 lg:min-w-0 lg:w-full lg:justify-between">
            {materialSources.map((source, i) => {
              const Icon = source.icon;
              return (
                <li key={source.label} className="flex min-w-0 items-center">
                  {i > 0 ? (
                    <span className="mx-3 hidden h-px w-8 shrink-0 border-t border-dashed border-brand-navy sm:block lg:w-10" aria-hidden />
                  ) : null}
                  <div
                    className={`flex flex-col items-center text-center ${
                      source.current
                        ? "min-w-[7.5rem] rounded-xl border border-white/10 bg-brand-navy px-3 py-3 shadow-[0_8px_24px_-16px_rgba(23,43,77,0.22)] sm:min-w-[8.5rem]"
                        : "min-w-[5.5rem] px-1 sm:min-w-[6.5rem]"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                        source.current ? "bg-white/30 ring-1 ring-[#0052CC]/20" : "bg-white ring-1 ring-gray-200"
                      }`}
                    >
                      <Icon size={22} className="text-brand-orange" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span
                      className={`mt-2 max-w-[7rem] text-[10px] font-semibold leading-snug sm:text-xs ${
                        source.current ? "text-brand-orange" : "text-[#42526E]"
                      }`}
                    >
                      {source.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <section className="border-t border-gray-100 bg-white pt-12 lg:pt-16">
        <FinalCTA
          variant="brand-orange"
          compact
          title={
            <>
              {materialCta.title} <span className="text-brand-navy">{materialCta.accent}</span>
            </>
          }
          body={materialCta.body}
          primary={{ label: "Book a Demo", href: "/early-access" }}
        />
      </section>
    </>
  );
}
