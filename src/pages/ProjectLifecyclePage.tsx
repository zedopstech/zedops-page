import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Layers } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { framePad, GhostButton, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { StageCloseout, StageConstruction, StageCore, StagePrecon } from "@/components/mocks/scenes";
import { projectStages } from "@/data/howWeHelp";

const stageMocks: Record<string, ComponentType> = {
  preconstruction: StagePrecon,
  construction: StageConstruction,
  closeout: StageCloseout,
  "platform-core": StageCore,
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Lifecycle: sticky stage index (desktop) beside one panel per stage, each with a live mock. */
export default function ProjectLifecyclePage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useSEO({
    title: "Project lifecycle  -  How ZedOps helps  -  ZedOps",
    description:
      "Preconstruction, construction, closeout, and platform core: how ZedOps modules line up with each project phase and where to dive into the live capability list.",
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting)[0];
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="By project stage"
          PillIcon={Layers}
          title={<>From estimate to handover. <Muted>Without switching tools.</Muted></>}
          subtitle="One platform across preconstruction, construction and closeout, on one project record."
        >
          <div className="flex flex-wrap gap-3">
            <TicketButton href="/early-access">Request a demo</TicketButton>
            <GhostButton href="/how-we-help" icon={ArrowRight}>
              How we help
            </GhostButton>
          </div>
        </PageHero>

        <Section tone="mist" labelledBy="lifecycle-title">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="lifecycle-title"
                title={<>How ZedOps maps <Highlight>to the job.</Highlight></>}
                body="Each phase uses the modules it needs, and all of them share the same people, permissions and project data."
              />
            </motion.div>
          </div>

          <div className="grid border-t border-[#E3E8F0] lg:grid-cols-[260px_minmax(0,1fr)]">
            <nav aria-label="Project stages" className="hidden lg:block">
              <ol className="sticky top-[132px] px-10 py-12">
                {projectStages.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={on ? "step" : undefined}
                        className={`relative flex items-baseline gap-3 py-2 text-[15px] transition-colors ${on ? "text-brand-navy" : "text-[#A5AEBF] hover:text-[#5E6C84]"}`}
                      >
                        <span aria-hidden className={`absolute top-2 bottom-2 -left-10 w-[2px] ${on ? "bg-brand-orange" : "bg-transparent"}`} />
                        <span className="font-mono text-[11px]">{pad(i + 1)}</span>
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="lg:border-l lg:border-[#E3E8F0]">
              {projectStages.map((stage, i) => {
                const Mock = stageMocks[stage.id] ?? StageCore;
                return (
                  <article
                    key={stage.id}
                    id={stage.id}
                    data-index={i}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className={`scroll-mt-[120px] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 ${i > 0 ? "border-t border-[#E3E8F0]" : ""}`}
                  >
                    <span className="font-mono text-[11px] text-[#A5AEBF]">
                      {pad(i + 1)} · {stage.title}
                    </span>
                    <h3 className="mt-3 max-w-[36ch] text-[20px] leading-[1.35] font-medium tracking-[-0.02em] text-brand-navy sm:text-[22px]">
                      {stage.tagline} <Muted>{stage.body}</Muted>
                    </h3>
                    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
                      <div>
                        <ul className="space-y-2.5">
                          {stage.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2.5 text-[14.5px] text-[#3D4F6E]">
                              <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                              {o}
                            </li>
                          ))}
                        </ul>
                        <a href={stage.platformPath} className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-navy">
                          {stage.platformLabel}
                          <ArrowUpRight size={15} className="text-[#A5AEBF] transition-colors group-hover:text-brand-orange" aria-hidden />
                        </a>
                      </div>
                      <div className="rounded-xl bg-[#EEF1F5] p-5 sm:p-6">
                        <Mock />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Section>

        <Section label="Related">
          <div className="grid gap-px bg-[#E8ECF2] sm:grid-cols-2">
            {[
              { label: "Roles & permissions", body: "How menus and Zed AI follow access.", href: "/how-we-help/role" },
              { label: "Built for you", body: "The day-to-day story for each persona.", href: "/who-we-serve" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="group flex items-center justify-between gap-4 bg-white px-6 py-7 transition-colors hover:bg-[#FAFBFC] sm:px-10">
                <span>
                  <span className="block text-[16px] font-medium text-brand-navy">{l.label}</span>
                  <span className="mt-0.5 block text-[14px] text-[#6B778C]">{l.body}</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-[#A5AEBF] transition-colors group-hover:text-brand-orange" aria-hidden />
              </a>
            ))}
          </div>
        </Section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
