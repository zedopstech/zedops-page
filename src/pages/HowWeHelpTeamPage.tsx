import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, UsersRound } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { teamFocusAreas } from "@/data/howWeHelp";

type IconComp = ComponentType<{ size?: number; className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

function StippleIconIllustration({ Icon }: { Icon: IconComp }) {
  return (
    <div className="relative mt-auto flex w-full justify-center pt-10 sm:pt-12">
      <div className="relative flex h-36 w-44 max-w-full items-center justify-center sm:h-40 sm:w-48">
        <div
          className="pointer-events-none absolute inset-[-12%] opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, #172B4D 1.1px, transparent 1.1px)",
            backgroundSize: "5px 5px",
            maskImage: "radial-gradient(ellipse 72% 65% at 50% 50%, black 15%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 65% at 50% 50%, black 15%, transparent 72%)",
          }}
          aria-hidden
        />
        <Icon className="relative z-1 h-22 w-22 text-[#172B4D]/30 sm:h-24 sm:w-24" strokeWidth={1.15} aria-hidden />
      </div>
    </div>
  );
}

export default function HowWeHelpTeamPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "By team  -  How ZedOps helps  -  ZedOps",
    description:
      "Field, project office, commercial, quality, and leadership teams - one tenant, permission-aware workflows.",
  });

  return (
    <HowWeHelpPageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How we help", href: "/how-we-help" },
        { label: "By team" },
      ]}
    >
      <PageHero
        pill="Inside your org"
        PillIcon={UsersRound}
        title="One tenant. Different teams."
        subtitle="Same facts everywhere - different menus and Zed AI scope by role."
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <a
            href="/how-we-help/company"
            className="inline-flex items-center gap-2 rounded-md border border-[#172B4D]/15 bg-white/80 px-6 py-3 text-base font-bold text-[#172B4D] transition-colors hover:border-[#172B4D]/25"
          >
            <ArrowLeft className="h-4 w-4 opacity-60" aria-hidden />
            Company type
          </a>
          <a
            href="/how-we-help/role"
            className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-base font-bold text-white transition-colors hover:bg-brand-orange-soft"
          >
            Roles &amp; permissions
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </PageHero>

      <section className="border-t border-neutral-200 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.header {...scrollMotionProps(isMobile, { y: 8, duration: 0.35 })} className="mb-10 max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#172B4D] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
              How the work shows up inside ZedOps
            </h2>
          </motion.header>

          {/* Bento grid: 3 × 260px columns on lg, bottom row two wide cells */}
          <div className="grid grid-cols-1 border-t border-l border-neutral-200 md:grid-cols-2 lg:grid-cols-6">
            {teamFocusAreas.map((t, i) => {
              const Icon = t.icon as IconComp;
              const span =
                i < 3 ? "md:col-span-1 lg:col-span-2" : "md:col-span-1 lg:col-span-3";
              return (
                <motion.a
                  key={t.title}
                  href={t.relatedPath}
                  {...scrollMotionProps(isMobile, { y: 10, duration: 0.3, delay: Math.min(i * 0.05, 0.15) })}
                  className={`group flex min-h-[280px] flex-col border-r border-b border-neutral-200 bg-white px-7 py-9 transition-colors hover:bg-neutral-50/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0052CC] sm:min-h-[300px] sm:px-9 sm:py-10 ${span}`}
                  aria-label={`${t.title}: ${t.relatedLabel}`}
                >
                  <h3 className="text-2xl font-bold leading-[1.15] tracking-tight text-[#172B4D] sm:text-[1.65rem] lg:text-[1.75rem]">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-none text-base leading-snug text-[#5e6c84] sm:text-lg">{t.summary}</p>
                  <StippleIconIllustration Icon={Icon} />
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0052CC] opacity-70 transition-opacity group-hover:opacity-100">
                    {t.relatedLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base font-semibold text-[#42526E]">
            <a href="/how-we-help" className="transition-colors hover:text-[#172B4D]">
              ← All lenses
            </a>
            <a href="/platform" className="text-[#0052CC] transition-colors hover:text-[#0747A6]">
              Platform →
            </a>
          </div>
        </div>
      </section>
    </HowWeHelpPageShell>
  );
}
