import { ArrowUpRight, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import {
  PiCalendarBlankFill, PiChartLineUpFill, PiClipboardTextFill, PiCurrencyDollarFill,
  PiFolderOpenFill, PiGearSixFill, PiListChecksFill, PiPackageFill,
  PiShieldCheckFill, PiSquaresFourFill, PiUsersThreeFill,
} from "react-icons/pi";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import { framePad, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { getLandingSection } from "@/components/module/ModuleLandingTemplate";
import { moduleLandingContent } from "@/data/moduleLandingContent";
import { SolutionsAsk } from "@/components/mocks/scenes";

const groups = [
  {
    id: "deliver",
    title: <>Plan and <Highlight>deliver.</Highlight></>,
    body: "From the first estimate to handover: scope becomes a plan, reaches site, and moves through quality checks.",
    modules: [
      ["estimation", PiChartLineUpFill], ["planning-execution", PiCalendarBlankFill],
      ["projects", PiFolderOpenFill], ["daily-intelligence", PiClipboardTextFill],
      ["quality-safety-closeout", PiShieldCheckFill], ["punch-list", PiListChecksFill],
    ],
  },
  {
    id: "operate",
    title: <>Run the <Highlight>operation.</Highlight></>,
    body: "Materials, cost, people, documents and reporting, kept beside the work they support.",
    modules: [
      ["supply-chain", PiPackageFill], ["finance", PiCurrencyDollarFill],
      ["workforce-intelligence", PiUsersThreeFill], ["information-management", PiFolderOpenFill],
      ["reporting-exports", PiChartLineUpFill], ["settings", PiGearSixFill],
      ["core", PiSquaresFourFill], ["platform-access", PiShieldCheckFill],
    ],
  },
] as const;

/** Platform overview: two module groups as rail-to-rail link grids, then Zed AI, then the CTA. */
export default function SolutionsPage() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Platform  -  ZedOps",
    description: "Explore ZedOps modules for MEP and construction project delivery, people, materials, cost, quality, and reporting.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Platform"
          PillIcon={Cpu}
          title={<>Every module on one project record. <Muted>Nothing to reconcile.</Muted></>}
          subtitle="Fourteen connected modules for MEP and construction teams. Pick the ones you need; they all share the same job data."
        >
          <TicketButton href="/early-access">Request a demo</TicketButton>
        </PageHero>

        {groups.map((group, g) => (
          <Section key={group.id} tone={g % 2 ? "mist" : "white"} labelledBy={`sol-${group.id}`}>
            <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
              <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
                <SplitHeader id={`sol-${group.id}`} title={group.title} body={group.body} />
              </motion.div>
            </div>
            <div className={`grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3 ${g % 2 ? "border-[#E3E8F0] bg-[#E3E8F0]" : "border-[#E8ECF2] bg-[#E8ECF2]"}`}>
              {group.modules.map(([id, Icon], index) => {
                const section = getLandingSection(id);
                const content = moduleLandingContent[id];
                if (!section) return null;
                return (
                  <motion.a
                    key={id}
                    {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (index % 3) * 0.05 })}
                    href={`/platform/module/${id}`}
                    className={`group flex min-h-[200px] flex-col p-6 transition-colors sm:p-8 ${g % 2 ? "bg-[#F7F8FA] hover:bg-white" : "bg-white hover:bg-[#FAFBFC]"}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] bg-white text-[#5E6C84] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
                        <Icon size={20} aria-hidden />
                      </span>
                      <ArrowUpRight size={16} className="text-[#677388] transition-colors group-hover:text-brand-orange" aria-hidden />
                    </div>
                    <h3 className="mt-10 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{section.title}</h3>
                    <p className="mt-1.5 max-w-[38ch] text-[14.5px] leading-[1.55] text-[#616D82]">{content?.intro ?? section.items[0]?.summary}</p>
                  </motion.a>
                );
              })}
            </div>
          </Section>
        ))}

        <Section labelledBy="sol-ai">
          <div className={`grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <h2 id="sol-ai" className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px]">
                Zed AI across every module. <Muted>Grounded in the work.</Muted>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-[#5E6C84]">
                The copilot reads the same project context as your team, so it can point to what needs attention and draft the next step.
              </p>
              <div className="mt-8">
                <TicketButton href="/zed-ai">Explore Zed AI</TicketButton>
              </div>
            </motion.div>
            <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.5, delay: 0.06 })} className="rounded-xl bg-[#F7F8FA] p-6 sm:p-10">
              <div className="mx-auto max-w-[460px]">
                <SolutionsAsk />
              </div>
            </motion.div>
          </div>
        </Section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
