import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import type { ComponentType } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import type { MockType } from "@/components/ProductMocks";
import { productMockComponents } from "@/components/ProductMocks";
import type { PersonaMockScenario } from "@/components/PersonaMocks";
import { PersonaFeatureMock } from "@/components/PersonaMocks";
import { Container, CornerTicks, DotGrid, GhostButton, Highlight, SectionLabel, SplitHeader, TicketButton } from "@/components/design-preview/primitives";

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

export default function PersonaTemplate({
  heroImage, imageAlt, pill, PillIcon, title, subtitle, quote, quoteAttribution,
  challengesHeading, challengesIntro, challenges, featuresHeading, features,
  earlyAccessLabel = "Request a demo for your team",
}: PersonaTemplateProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <main>
        <PageHero pill={pill} PillIcon={PillIcon} title={title} subtitle={subtitle}>
          <div className="flex flex-wrap gap-3">
            <TicketButton href="/early-access">{earlyAccessLabel}</TicketButton>
            <GhostButton href="/contact" icon={ArrowRight}>Talk to our team</GhostButton>
          </div>
        </PageHero>

        <div className="relative h-[300px] overflow-hidden bg-[#E3E8F0] sm:h-[430px] lg:h-[560px]">
          <img src={heroImage} alt={imageAlt} className="h-full w-full object-cover object-center" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-navy/35 to-transparent" />
          <span className="absolute bottom-6 left-5 border border-white/50 bg-brand-navy/80 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm lg:left-[max(24px,calc((100vw-1200px)/2))]">Built for {pill}</span>
        </div>

        <section className="relative overflow-hidden bg-brand-navy py-16 lg:py-20">
          <DotGrid dark className="opacity-40 [mask-image:linear-gradient(to_right,transparent,black)]" />
          <Container className="relative grid gap-5 lg:grid-cols-[1fr_0.45fr] lg:items-end lg:gap-16">
            <blockquote className="max-w-4xl text-[25px] font-semibold leading-[1.3] tracking-[-0.025em] text-white sm:text-[31px]">“{quote}”</blockquote>
            <p className="border-l border-white/30 pl-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65">{quoteAttribution}</p>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#F8F9FD] py-20 lg:py-[100px]">
          <DotGrid className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <Container className="relative">
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader label="Where teams get stuck" title={challengesHeading} body={challengesIntro} />
            </motion.div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {challenges.map((challenge, index) => (
                <motion.article key={challenge.title} {...scrollMotionProps(isMobile, { y: 20, duration: 0.45, delay: (index % 3) * 0.05 })} className="relative min-h-[230px] rounded-xl border border-[#E3E8F0] bg-white p-6 sm:p-7">
                  <CornerTicks />
                  <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EDF3FA] text-brand-navy"><challenge.icon size={21} /></span><span className="font-mono text-[10px] font-semibold text-[#9AA6B8]">{String(index + 1).padStart(2, "0")}</span></div>
                  <h3 className="mt-7 text-[19px] font-semibold leading-tight tracking-[-0.02em] text-brand-navy">{challenge.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[#5E6C84]">{challenge.desc}</p>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-[100px]">
          <Container>
            <SectionLabel>How ZedOps helps</SectionLabel>
            <h2 className="max-w-3xl text-[32px] font-semibold leading-[1.12] tracking-[-0.035em] text-brand-navy sm:text-[40px]">{featuresHeading}</h2>
            <div className="mt-14 space-y-16 lg:space-y-24">
              {features.map((feature, index) => {
                const MockComponent = productMockComponents[feature.mockType];
                const mock = feature.mockScenario ? <PersonaFeatureMock scenario={feature.mockScenario} /> : <MockComponent />;
                return (
                  <motion.article key={feature.title} {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className={`grid gap-10 border-t border-[#DCE3ED] pt-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-[#DCE3ED] bg-[#EEF3F9] p-3 shadow-[0_24px_44px_-32px_rgba(23,43,77,0.3)] sm:min-h-[400px] sm:p-5 lg:min-h-[500px]"><div className="h-full min-h-[294px] overflow-hidden rounded-lg border border-[#DCE3ED] bg-white sm:min-h-[360px] lg:min-h-[458px]">{mock}</div></div>
                    <div>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-orange">{String(index + 1).padStart(2, "0")} / {feature.badge}</span>
                      <h3 className="mt-5 max-w-lg text-[30px] font-semibold leading-[1.14] tracking-[-0.03em] text-brand-navy sm:text-[36px]">{feature.title}</h3>
                      <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-[#3D4F6E]">{feature.desc}</p>
                      <a href="/early-access" className="mt-7 inline-flex items-center gap-2 border-b border-brand-navy pb-1 text-[15px] font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange">See it in action <ArrowRight size={16} aria-hidden /></a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </Container>
        </section>

        <FinalCTA title={<>Make every team’s work <Highlight>easier to see.</Highlight></>} body="Walk through the workflows that matter to your role and see how they connect across a project." />
      </main>
      <Footer />
    </div>
  );
}
