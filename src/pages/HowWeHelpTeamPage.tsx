import { motion } from "framer-motion";
import { ArrowRight, UsersRound } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { framePad, GhostButton, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { teamFocusAreas } from "@/data/howWeHelp";

export default function HowWeHelpTeamPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "By team  -  How ZedOps helps  -  ZedOps",
    description:
      "Field, project office, commercial, quality, and leadership teams - one tenant, permission-aware workflows.",
  });

  return (
    <HowWeHelpPageShell>
      <PageHero
        pill="By team"
        PillIcon={UsersRound}
        title={<>One company. Different teams. <Muted>The same facts.</Muted></>}
        subtitle="Every team works from one project record, with menus and Zed AI scoped to their role."
      >
        <div className="flex flex-wrap gap-3">
          <TicketButton href="/how-we-help/role">Roles &amp; permissions</TicketButton>
          <GhostButton href="/how-we-help/company">By company type</GhostButton>
        </div>
      </PageHero>

      <Section labelledBy="team-areas">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SplitHeader
              id="team-areas"
              title={<>How the work shows up <Highlight>for each team.</Highlight></>}
              body="Field, office, commercial, quality and leadership each get a view shaped around their part of the job."
            />
          </motion.div>
        </div>
        <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] md:grid-cols-2 lg:grid-cols-6">
          {teamFocusAreas.map((t, i) => (
            <motion.a
              key={t.title}
              href={t.relatedPath}
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (i % 3) * 0.05 })}
              className={`group flex min-h-[250px] flex-col bg-white p-7 transition-colors hover:bg-[#FAFBFC] sm:p-8 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] text-[#5E6C84] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
                <t.icon size={19} aria-hidden />
              </span>
              <h3 className="mt-10 text-[20px] font-medium tracking-[-0.025em] text-brand-navy">{t.title}</h3>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-[1.55] text-[#616D82]">{t.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-brand-navy">
                {t.relatedLabel}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </motion.a>
          ))}
        </div>
      </Section>
    </HowWeHelpPageShell>
  );
}
