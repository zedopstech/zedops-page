import { ArrowRight, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import {
  PiCalendarBlankFill, PiChartLineUpFill, PiClipboardTextFill, PiCurrencyDollarFill,
  PiFolderOpenFill, PiGearSixFill, PiListChecksFill, PiPackageFill,
  PiShieldCheckFill, PiSparkleFill, PiSquaresFourFill, PiUsersThreeFill,
} from "react-icons/pi";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import { Container, Highlight, SplitHeader, TicketButton } from "@/components/design-preview/primitives";
import { getLandingSection } from "@/components/module/ModuleLandingTemplate";
import { moduleLandingContent } from "@/data/moduleLandingContent";

const groups = [
  {
    label: "Plan and deliver",
    title: "Keep the job moving, from first estimate to handover.",
    body: "The work stays connected as scope becomes a plan, reaches site, and moves through quality checks.",
    modules: [
      ["estimation", PiChartLineUpFill], ["planning-execution", PiCalendarBlankFill],
      ["projects", PiFolderOpenFill], ["daily-intelligence", PiClipboardTextFill],
      ["quality-safety-closeout", PiShieldCheckFill], ["punch-list", PiListChecksFill],
    ],
  },
  {
    label: "Run the operation",
    title: "Give every team the same project context.",
    body: "Keep resources, costs, people, documents, and reporting beside the work they support.",
    modules: [
      ["supply-chain", PiPackageFill], ["finance", PiCurrencyDollarFill],
      ["workforce-intelligence", PiUsersThreeFill], ["information-management", PiFolderOpenFill],
      ["reporting-exports", PiChartLineUpFill], ["settings", PiGearSixFill],
      ["core", PiSquaresFourFill], ["platform-access", PiShieldCheckFill],
    ],
  },
] as const;

export default function SolutionsPage() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Platform  -  ZedOps",
    description: "Explore ZedOps modules for MEP and construction project delivery, people, materials, cost, quality, and reporting.",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <main>
        <PageHero
          pill="Platform"
          PillIcon={Cpu}
          title={<>One place for the work <span className="text-brand-navy/60">behind every project.</span></>}
          subtitle="Explore the connected workflows that help MEP and construction teams plan, coordinate, and keep delivery visible."
        >
          <TicketButton href="/early-access">Request a demo</TicketButton>
        </PageHero>

        {groups.map((group, groupIndex) => (
          <section key={group.label} className={groupIndex % 2 ? "bg-[#F8F9FD] py-20 lg:py-[100px]" : "bg-white py-20 lg:py-[100px]"}>
            <Container>
              <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
                <SplitHeader label={group.label} title={group.title} body={group.body} />
              </motion.div>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.modules.map(([id, Icon], index) => {
                  const section = getLandingSection(id);
                  const content = moduleLandingContent[id];
                  if (!section) return null;
                  return (
                    <motion.a
                      key={id}
                      {...scrollMotionProps(isMobile, { y: 20, duration: 0.45, delay: (index % 3) * 0.05 })}
                      href={`/platform/module/${id}`}
                      className="group relative flex min-h-[225px] flex-col rounded-xl border border-[#E3E8F0] bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[#B8C7DA] hover:shadow-[0_22px_44px_-28px_rgba(23,43,77,0.4)] sm:p-7"
                    >
                      <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-brand-orange/60" aria-hidden />
                      <div className="flex items-start justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EDF3FA] text-brand-navy"><Icon size={23} aria-hidden /></span>
                        <span className="font-mono text-[10px] font-semibold text-[#9AA6B8]">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-6 text-[20px] font-semibold leading-tight tracking-[-0.025em] text-brand-navy">{section.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.55] text-[#5E6C84]">{content?.intro ?? section.items[0]?.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-brand-navy">Explore module <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
                    </motion.a>
                  );
                })}
              </div>
            </Container>
          </section>
        ))}

        <section className="relative overflow-hidden bg-brand-navy py-20 lg:py-24">
          <Container className="relative grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"><PiSparkleFill size={26} aria-hidden /></span>
              <h2 className="mt-6 max-w-2xl text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-[42px]">Project intelligence, <Highlight>grounded in the work.</Highlight></h2>
            </div>
            <div>
              <p className="text-[16px] leading-[1.65] text-white/70">Zed AI uses the same project context as the teams on the job to help surface what needs attention and support the next decision.</p>
              <a href="/zed-ai" className="mt-7 inline-flex items-center gap-2 border-b border-white/60 pb-1 text-[15px] font-semibold text-white transition-colors hover:border-brand-orange hover:text-brand-orange">Explore Zed AI <ArrowRight size={16} aria-hidden /></a>
            </div>
          </Container>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
