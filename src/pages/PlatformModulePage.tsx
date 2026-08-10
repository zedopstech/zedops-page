import { useMemo } from "react";
import type { RouteComponentProps } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import { getModuleNavContext } from "@/data/platformFeatures";
import { PlatformModuleFeatureMiniMock } from "@/components/PlatformModuleFeatureMiniMock";
import SupplyChainModuleLanding from "@/components/SupplyChainModuleLanding";
import PlanningScheduleLanding from "@/components/PlanningScheduleLanding";
import EstimationLanding from "@/components/EstimationLanding";

function moduleMetaDescription(section: { title: string; items: { name: string; summary: string }[] }): string {
  const preview = section.items
    .slice(0, 3)
    .map((i) => i.name)
    .join(", ");
  const tail = section.items.length > 3 ? `, and ${section.items.length - 3} more` : "";
  return `${section.title} in ZedOps: ${preview}${tail}. Full capability list and how it fits the rest of the platform.`;
}

export default function PlatformModulePage({ params }: RouteComponentProps<{ moduleId: string }>) {
  const ctx = useMemo(() => getModuleNavContext(params.moduleId), [params.moduleId]);
  const isMobile = useIsMobile();

  useSEO({
    title: ctx ? `${ctx.section.title}  -  ZedOps platform` : "Platform module  -  ZedOps",
    description:
      params.moduleId === "supply-chain"
        ? "ZedOps Material Management streamlines procurement, inventory, warehouse and material tracking for MEP contractors and construction projects."
        : params.moduleId === "estimation"
          ? "ZedOps Estimation & Proposals — BOQ mapping, productivity-based costing, markups, approvals, and client-ready proposals for MEP and construction."
          : params.moduleId === "planning-execution"
            ? "ZedOps Planning & Scheduling — import, create, and monitor programmes with baseline vs live views, assignments, and reports for MEP and construction."
            : ctx
              ? moduleMetaDescription(ctx.section)
              : "ZedOps platform modules.",
  });

  if (!ctx) {
    return (
      <div className="min-h-screen bg-white text-brand-navy">
        <Navbar />
        <div className="mx-auto max-w-lg px-6 pt-[120px] pb-24 text-center">
          <h1 className="text-2xl font-extrabold text-brand-navy">Module not found</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6B778C]">
            That platform area doesn’t exist or the link may be outdated.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 font-bold text-[#0052CC] transition-colors hover:text-[#0747A6]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back to home
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const { section, prev, next } = ctx;

  if (section.id === "supply-chain") {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
        <Navbar />
        <div className="pt-[100px]">
          <div className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:px-6 lg:px-8">
              <nav className="text-[13px] font-semibold text-[#6B778C]" aria-label="Breadcrumb">
                <a href="/" className="transition-colors hover:text-brand-orange">
                  Home
                </a>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span>Platform</span>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span className="text-brand-orange">Material Management</span>
              </nav>
            </div>
          </div>
          <SupplyChainModuleLanding prev={prev} next={next} />
          <Footer />
        </div>
      </div>
    );
  }

  if (section.id === "estimation") {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
        <Navbar />
        <div className="pt-[100px]">
          <div className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:px-6 lg:px-8">
              <nav className="text-[13px] font-semibold text-[#6B778C]" aria-label="Breadcrumb">
                <a href="/" className="transition-colors hover:text-brand-orange">
                  Home
                </a>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span>Platform</span>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span>Pre-Construction</span>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span className="text-brand-orange">Estimation & Proposals</span>
              </nav>
            </div>
          </div>
          <EstimationLanding prev={prev} next={next} />
          <Footer />
        </div>
      </div>
    );
  }

  if (section.id === "planning-execution") {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
        <Navbar />
        <div className="pt-[100px]">
          <div className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:px-6 lg:px-8">
              <nav className="text-[13px] font-semibold text-[#6B778C]" aria-label="Breadcrumb">
                <a href="/" className="transition-colors hover:text-brand-orange">
                  Home
                </a>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span>Platform</span>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span>Pre-Construction</span>
                <span className="mx-2 text-[#97A0AF]" aria-hidden>
                  /
                </span>
                <span className="text-brand-orange">Planning & Scheduling</span>
              </nav>
            </div>
          </div>
          <PlanningScheduleLanding prev={prev} next={next} />
          <Footer />
        </div>
      </div>
    );
  }

  const itemCount = section.items.length;
  /** 2 → 2-col; 4 or 7 → 4-col on xl (7 = 4+3 centered); else 3-col with centered last row */
  const forceTwoCol = itemCount === 2;
  const useFourColLayout = itemCount === 4 || itemCount === 7;
  const subtitle = `This area includes ${itemCount} product ${itemCount === 1 ? "capability" : "capabilities"} - permissioned and tenant-scoped like the rest of ZedOps. Explore the feature cards below or continue to another module.`;

  const cardWidthClass = forceTwoCol
    ? "w-full sm:w-[calc((100%-1.5rem)/2)]"
    : useFourColLayout
      ? "w-full sm:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-3.75rem)/4)]"
      : "w-full sm:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-3rem)/3)]";

  const cardPadClass = useFourColLayout
    ? "p-5 md:p-5"
    : "p-6 md:p-7";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <div className="pt-[100px]">
        {/* Breadcrumb  -  same width rhythm as home sections */}
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:px-6 lg:px-8">
            <nav className="text-[13px] font-semibold text-[#6B778C]" aria-label="Breadcrumb">
              <a href="/" className="transition-colors hover:text-[#0052CC]">
                Home
              </a>
              <span className="mx-2 text-[#97A0AF]" aria-hidden>
                /
              </span>
              <span>Platform</span>
              <span className="mx-2 text-[#97A0AF]" aria-hidden>
                /
              </span>
              <span className="text-brand-orange">{section.title}</span>
            </nav>
          </div>
        </div>

        <PageHero pill="Platform module" PillIcon={LayoutGrid} title={section.title} subtitle={subtitle} />

        {/* Everything in this module  -  headline, then feature cards with mini mocks */}
        <section className="border-t border-gray-200 bg-white py-20 lg:py-24">
          <div
            className={`mx-auto px-4 sm:px-6 lg:px-8 ${
              useFourColLayout ? "max-w-[90rem]" : "max-w-7xl"
            }`}
          >
            <motion.div {...scrollMotionProps(isMobile, { y: 22, duration: 0.45 })} className="mb-14 max-w-3xl lg:mb-16">
              <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-brand-navy sm:text-4xl lg:text-[2.65rem]">
                Everything in <span className="text-brand-orange">{section.title}</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#42526E] sm:text-xl">
                {itemCount}{" "}
                {itemCount === 1 ? "capability" : "capabilities"} in this area - each explained below.
                Access follows your organisation&apos;s roles.
              </p>
            </motion.div>

            {/*
              flex-wrap + justify-center centers incomplete last rows.
              2 → 2-col. 4 → one row of four. 7 → row of 4 + centered row of 3. Else → 3-col.
            */}
            <div
              className={`flex flex-wrap justify-center ${
                useFourColLayout ? "gap-5" : "gap-6"
              } ${forceTwoCol ? "mx-auto max-w-5xl" : ""}`}
            >
              {section.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  {...scrollMotionProps(isMobile, { y: 18, duration: 0.4, delay: Math.min(i * 0.05, 0.25) })}
                  className={`flex min-h-0 flex-col rounded-2xl border border-gray-200/90 bg-white shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)] transition-shadow duration-200 hover:shadow-[0_12px_28px_-12px_rgba(23,43,77,0.12)] ${cardPadClass} ${cardWidthClass}`}
                >
                  <div
                    className={`mb-3 flex shrink-0 items-center justify-center rounded-lg bg-[#EBF0FF] ${
                      useFourColLayout ? "h-9 w-9" : "h-10 w-10"
                    }`}
                  >
                    <LayoutGrid className={`text-brand-navy ${useFourColLayout ? "h-3.5 w-3.5" : "h-4 w-4"}`} aria-hidden />
                  </div>
                  <h3
                    className={`font-extrabold leading-snug text-brand-navy ${
                      useFourColLayout ? "text-base" : "text-lg"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`mt-2 font-semibold leading-snug text-brand-orange ${
                      useFourColLayout ? "text-xs" : "text-sm"
                    }`}
                  >
                    {item.summary}
                  </p>
                  <p
                    className={`mt-3 flex-1 leading-relaxed text-[#6B778C] ${
                      useFourColLayout ? "text-xs" : "text-sm"
                    }`}
                  >
                    {item.detail}
                  </p>
                  <div className={`overflow-hidden rounded-xl border border-gray-200 bg-[#F8FAFC] ${useFourColLayout ? "mt-4" : "mt-5"}`}>
                    <PlatformModuleFeatureMiniMock name={item.name} summary={item.summary} detail={item.detail} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Continue exploring  -  structured like a home sub-footer band */}
        <section className="border-t border-gray-200 bg-white py-14 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mb-8 text-center">
              <h2 className="mx-auto max-w-xl text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Other platform areas
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6B778C]">
                Step through adjacent modules from the same platform map.
              </p>
            </motion.div>

            <div
              className={`grid gap-4 ${
                prev && next ? "md:grid-cols-2" : "md:mx-auto md:max-w-xl md:grid-cols-1"
              }`}
            >
              {prev ? (
                <a
                  href={`/platform/module/${prev.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-orange hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200 transition-colors group-hover:ring-[#0052CC]/25">
                    <ChevronLeft className="h-5 w-5 text-[#0052CC]" aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#97A0AF]">Previous module</p>
                    <p className="truncate text-lg font-extrabold text-brand-navy transition-colors group-hover:text-brand-orange">
                      {prev.title}
                    </p>
                  </div>
                </a>
              ) : null}
              {next ? (
                <a
                  href={`/platform/module/${next.id}`}
                  className="group flex flex-row-reverse items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 text-right transition-all hover:border-brand-orange hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200 transition-colors group-hover:ring-[#0052CC]/25">
                    <ChevronRight className="h-5 w-5 text-[#0052CC]" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#97A0AF]">Next module</p>
                    <p className="truncate text-lg font-extrabold text-brand-navy transition-colors group-hover:text-brand-orange">
                      {next.title}
                    </p>
                  </div>
                </a>
              ) : null}
            </div>

          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
