import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/i18n";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import type { MockType } from "@/components/ProductMocks";
import type { PersonaMockScenario } from "@/components/PersonaMocks";
import { framePad, GhostButton, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { GcDailyLog, GcPlanning, OwnersPortfolio, personaScenes, PmScheduleTasks, PmZedAi, QualityMarkup } from "@/components/mocks/scenes";

export type { MockType, PersonaMockScenario };

interface Challenge {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}

export interface Feature {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  badge: string;
  mockType: MockType;
  mockScenario?: PersonaMockScenario;
}

interface PersonaTemplateProps {
  heroImage: string;
  imageAlt: string;
  pill: string;
  PillIcon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  quote: string;
  quoteAttribution: string;
  challengesHeading: string;
  challengesIntro: string;
  challenges: Challenge[];
  featuresHeading: string;
  features: Feature[];
  earlyAccessLabel?: string;
}

const typeMocks: Partial<Record<string, ComponentType>> = {
  dashboard: OwnersPortfolio,
  log: GcDailyLog,
  schedule: PmScheduleTasks,
  list: GcPlanning,
  chat: PmZedAi,
  annotation: QualityMarkup,
};

const firstSentence = (s: string) => (s.split(/(?<=[.!?])\s+/)[0] ?? s).replace(/\s+-\s+/g, ", ");

/** Split "Main idea  -  second idea." into a two-tone headline. */
function twoTone(title: string, t: (s: string) => string) {
  const [head, ...rest] = title.split(/\s+-\s+/);
  if (!rest.length) return t(title);
  const tail = t(rest.join(" "));
  return (
    <>
      {t(head).replace(/[.,]?$/, ".")} <Muted>{tail.charAt(0).toUpperCase() + tail.slice(1)}</Muted>
    </>
  );
}

export default function PersonaTemplate({
  heroImage, imageAlt, pill, PillIcon, title, subtitle, quote, quoteAttribution,
  challengesHeading, challengesIntro, challenges, featuresHeading, features,
  earlyAccessLabel = "Request a demo for your team",
}: PersonaTemplateProps) {
  const isMobile = useIsMobile();
  const { t } = useI18n();

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero pill={t(pill)} PillIcon={PillIcon} title={twoTone(title, t)} subtitle={t(firstSentence(subtitle))}>
          <div className="flex flex-wrap gap-3">
            <TicketButton href="/early-access">{t(earlyAccessLabel)}</TicketButton>
            <GhostButton href="/contact" icon={ArrowRight}>{t("Talk to our team")}</GhostButton>
          </div>
        </PageHero>

        <Section tone="mist" label={t(`${pill} at work`)}>
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-14">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#E3E8F0] sm:aspect-[21/9]">
              <img src={heroImage} alt={imageAlt} className="h-full w-full object-cover object-center" />
            </div>
          </div>
        </Section>

        <Section label={t("What we hear")}>
          <figure className={`py-16 lg:py-24 ${framePad}`}>
            <blockquote className="max-w-4xl text-[26px] font-medium leading-[1.3] tracking-[-0.03em] text-brand-navy [text-wrap:balance] sm:text-[34px]">
              “{t(quote)}”
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-[#5F6B80]">{t(quoteAttribution)}</figcaption>
          </figure>
        </Section>

        <Section tone="mist" labelledBy="persona-challenges">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="persona-challenges" title={t(challengesHeading)} body={t(firstSentence(challengesIntro))} />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge, index) => (
              <motion.article
                key={challenge.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (index % 3) * 0.05 })}
                className="bg-[#F7F8FA] p-7 sm:p-8"
              >
                <span className="font-mono text-[11px] text-[#677388]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[19px] font-medium leading-snug tracking-[-0.02em] text-brand-navy">{t(challenge.title)}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#616D82]">{t(firstSentence(challenge.desc))}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section labelledBy="persona-features">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <h2 id="persona-features" className="max-w-[20ch] text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px] lg:text-[48px]">
                {t(featuresHeading)}
              </h2>
            </motion.div>
          </div>
          {features.map((feature, index) => {
            const Mock = (feature.mockScenario && personaScenes[feature.mockScenario]) || typeMocks[feature.mockType] || OwnersPortfolio;
            const flip = index % 2 === 1;
            return (
              <motion.article
                key={feature.title}
                {...scrollMotionProps(isMobile, { y: 20, duration: 0.5 })}
                className="grid border-t border-[#E8ECF2] lg:grid-cols-2"
              >
                <div className={`flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14 ${flip ? "lg:order-2 lg:border-s lg:border-[#E8ECF2]" : ""}`}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5F6B80]">{t(feature.badge)}</span>
                  <h3 className="mt-4 max-w-md text-[24px] font-medium leading-[1.2] tracking-[-0.03em] text-brand-navy [text-wrap:balance] sm:text-[28px]">{t(feature.title)}</h3>
                  <p className="mt-4 max-w-md text-[15.5px] leading-[1.6] text-[#5E6C84]">{t(firstSentence(feature.desc))}</p>
                </div>
                <div className={`border-t border-[#E8ECF2] bg-[#F7F8FA] px-6 py-10 sm:px-10 lg:border-t-0 lg:px-12 lg:py-12 ${flip ? "lg:order-1" : "lg:border-s"}`}>
                  <div className="mx-auto max-w-[520px]">
                    <Mock />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </Section>

        <FinalCTA title={<>{t("Make every team’s work")} <Highlight>{t("easier to see.")}</Highlight></>} body={t("Walk through the workflows that matter to your role and see how they connect across a project.")} />
      </main>
      <Footer />
    </div>
  );
}
