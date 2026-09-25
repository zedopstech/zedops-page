import { useSEO } from "@/hooks/useSEO";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "wouter";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { platformFeatureSections, PLATFORM_FEATURE_PREVIEW_COUNT } from "@/data/platformFeatures";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import { platformSectionMockType } from "@/data/platformSectionMocks";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import type { MockType } from "@/components/ProductMocks";
import { PlatformSectionRichMock } from "@/components/PlatformSectionRichMock";

export default function PlatformPage() {
  const params = useParams<{ sectionId?: string }>();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useSEO({
    title: "Platform features  -  ZedOps",
    description:
      "Full overview of ZedOps: multi-tenant access, people, library, projects, planning, quality & safety, documents, finance, material management, reporting, and settings. Zed AI (in-product copilot) has its own page.",
  });

  useEffect(() => {
    const id = params.sectionId;
    if (!id) return;
    const exists = platformFeatureSections.some((s) => s.id === id);
    if (!exists) return;
    const el = document.getElementById(id);
    if (!el) return;
    const frame = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [params.sectionId]);

  const toggleSectionExpanded = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <div className="pt-[100px]">
        <section className="relative overflow-hidden pt-20 pb-14 lg:pb-20" aria-labelledby="platform-page-title">
          {/* Light hero backdrop (single header zone) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.82) 32%, rgba(255,255,255,0.76) 60%, rgba(255,255,255,0.84) 100%), url('/new-hero-banner.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
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
            className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
            <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Primary headline  -  one clear page header */}
              <div className="text-center lg:col-span-7 lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 inline-flex items-center gap-2 border border-brand-navy/20 bg-white/80 px-4 py-1.5"
                  style={{ borderRadius: 99 }}
                >
                  <LayoutGrid size={12} className="text-brand-orange" />
                  <span className="text-brand-navy text-xs font-bold tracking-[0.12em] uppercase">Product</span>
                </motion.div>
                <motion.h1
                  id="platform-page-title"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 }}
                  className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[52px]"
                >
                  Everything in ZedOps, in one place.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="mx-auto mt-5 max-w-xl text-lg leading-snug text-[#42526E] lg:mx-0"
                >
                  Full module map from access and core data to projects, finance, material management, and settings.
                 
                </motion.p>
             
              </div>

              {/* Zed AI as supporting card  -  not a second hero */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="lg:col-span-5"
              >
                <div className="platform-intelligence-spin-border">
                  <div
                    className="platform-intelligence-spin-border-inner relative overflow-hidden"
                    aria-labelledby="platform-intelligence-heading"
                  >
                    <div className="platform-intelligence-base absolute inset-0" aria-hidden />
                    <div className="platform-intelligence-card-aurora-slow" aria-hidden />
                    <div className="platform-intelligence-card-aurora" aria-hidden />
                    <div
                      className="absolute inset-0 opacity-[0.1] pointer-events-none"
                      aria-hidden
                      style={{
                        backgroundImage: [
                          "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
                          "linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
                        ].join(", "),
                        backgroundSize: "48px 48px",
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#060d18]/90 via-[#060d18]/25 to-transparent pointer-events-none" aria-hidden />

                    <div className="relative z-10 flex flex-col p-6 sm:p-8">
                      <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-sky-200/90">
                        <Sparkles size={11} className="text-sky-300" />
                        Intelligence layer
                      </p>
                      <h2
                        id="platform-intelligence-heading"
                        className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
                      >
                        Zed AI
                      </h2>
                      <p className="mb-1 text-sm leading-snug text-white/65 sm:text-base">
                        Copilot for insights, reports, writing assist, and actions  -  permissioned like every module. More workflows on the roadmap.
                      </p>
                      <a
                        href="/zed-ai"
                        className="mt-3 inline-block text-sm font-semibold text-sky-300 underline decoration-sky-400/40 underline-offset-[5px] transition-colors hover:text-white hover:decoration-white/60"
                      >
                        Zed AI overview
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto space-y-24 lg:space-y-32">
            {platformFeatureSections.map((section, si) => (
              <PlatformSectionBlock
                key={section.id}
                section={section}
                si={si}
                isExpanded={!!expandedSections[section.id]}
                onToggleExpand={() => toggleSectionExpanded(section.id)}
              />
            ))}
          </div>
        </section>

        <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-gray-100 text-center bg-white">
          <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-widest mb-3">See it in context</p>
          <h2 className="text-xl font-extrabold text-brand-navy mb-4">How capabilities map to your workflow</h2>
          <p className="text-[#6B778C] text-sm max-w-lg mx-auto mb-6">
            The Solutions page groups the big ideas  -  this page is the full module checklist.
          </p>
          <a
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-sm rounded-md transition-all duration-150 group"
          >
            Platform overview
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

const mockSkeletonClass =
  "flex-1 rounded-xl bg-white/50 border border-brand-navy/10 animate-pulse min-h-[240px] sm:min-h-[280px] lg:min-h-[360px]";

function DeferredSectionMock({ variant, section }: { variant: MockType; section: PlatformFeatureSection }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin: "180px 0px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flex h-full min-h-[260px] w-full flex-col sm:min-h-[300px] lg:min-h-[380px] [&>div]:min-h-0 [&>div]:flex-1"
    >
      {mounted ? (
        <PlatformSectionRichMock section={section} variant={variant} />
      ) : (
        <div className={mockSkeletonClass} aria-hidden />
      )}
    </div>
  );
}

function PlatformSectionBlock({
  section,
  si,
  isExpanded,
  onToggleExpand,
}: {
  section: PlatformFeatureSection;
  si: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const isMobile = useIsMobile();
  const mockType = platformSectionMockType[section.id] ?? "dashboard";
  const isEven = si % 2 === 0;
  const limit = PLATFORM_FEATURE_PREVIEW_COUNT;
  const hasOverflow = section.items.length > limit;
  const visibleItems = !hasOverflow || isExpanded ? section.items : section.items.slice(0, limit);
  const remaining = section.items.length - limit;

  return (
    <motion.div
      id={section.id}
      {...scrollMotionProps(isMobile, { y: 24, duration: 0.5, delay: Math.min(si * 0.03, 0.12) })}
      className="scroll-mt-[116px]"
    >
      <div className={`flex flex-col gap-12 lg:gap-16 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch`}>
        <div className="w-full lg:w-[46%] shrink-0">
          <div
            className="relative w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl flex flex-col"
            style={{
              background: isEven
                ? "linear-gradient(145deg, #EBF0FF 0%, #F4F7FF 50%, #FFFFFF 100%)"
                : "linear-gradient(145deg, #EBF0FF 0%, #F8FAFC 50%, #FFFFFF 100%)",
            }}
          >
            <div
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{
                background: isEven ? "#C4D9FF" : "#FE5D02",
                top: "-10%",
                [isEven ? "right" : "left"]: "-5%",
              }}
            />
            <div className="relative z-10 flex min-h-[320px] flex-1 flex-col p-5 sm:min-h-[380px] sm:p-7 lg:min-h-[460px]">
              <DeferredSectionMock variant={mockType} section={section} />
            </div>
          </div>
        </div>

        <div className="w-full lg:flex-1 min-w-0 flex flex-col justify-center">
          <a
            href={`/platform/module/${section.id}`}
            className="group mb-10 flex items-start justify-between gap-4 border-b border-gray-200 pb-4 transition-colors hover:border-[#0052CC]/35"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight transition-colors group-hover:text-[#0052CC]">
              {section.title}
            </h2>
            <ArrowRight
              strokeWidth={2.25}
              className="mt-1 h-10 w-10 shrink-0 text-[#0052CC] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2"
              aria-hidden
            />
          </a>
          <ul className="space-y-0 divide-y divide-gray-200/90">
            {visibleItems.map((item) => (
              <li key={item.name} className="py-5 first:pt-0">
                <h3 className="font-extrabold text-brand-navy text-base mb-1.5">{item.name}</h3>
                <p className="text-[#6B778C] text-sm leading-snug">{item.summary}</p>
              </li>
            ))}
          </ul>
          {hasOverflow ? (
            <button
              type="button"
              onClick={onToggleExpand}
              aria-expanded={isExpanded}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-2.5 text-left text-sm font-bold text-brand-navy transition-colors hover:border-brand-navy/25 hover:bg-white"
            >
              {isExpanded ? (
                <>
                  Show fewer
                  <ChevronUp size={16} className="text-[#0052CC]" aria-hidden />
                </>
              ) : (
                <>
                  View {remaining} more
                  <ChevronDown size={16} className="text-[#0052CC]" aria-hidden />
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
