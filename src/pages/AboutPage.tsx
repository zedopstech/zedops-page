import { motion } from "framer-motion";
import { Building2, Hammer, Mail, MessageSquare, RefreshCw } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { framePad, Highlight, Muted, Section, SplitHeader } from "@/components/design-system/primitives";
import { ModuleClosingCta } from "@/components/module/ModuleSections";

const principles = [
  { icon: Hammer, title: "Built with site teams", body: "Every workflow starts on a live job, with the engineers and foremen who will use it." },
  { icon: MessageSquare, title: "A direct line to us", body: "Early customers work with the team building the product, not a ticket queue." },
  { icon: RefreshCw, title: "Ship, listen, repeat", body: "We release every week and change course when the site tells us to." },
];

const beliefs = [
  { title: "One record beats ten tools", body: "Estimates, programmes, materials, site logs and cost belong to the same job, so nobody reconciles them by hand." },
  { title: "The field comes first", body: "If it is slow to use on site, the data never arrives. Capture has to take seconds, not minutes." },
  { title: "AI should know the job", body: "Zed AI works on the project record your team already keeps, inside the permissions you already set." },
];

export default function AboutPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "About  -  ZedOps",
    description: "ZedOps builds the project execution platform for MEP and construction teams: one record from estimate to handover, with Zed AI on the same data.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="About ZedOps"
          PillIcon={Building2}
          title={<>Software for the people who build. <Muted>Starting with MEP.</Muted></>}
          subtitle="ZedOps is a project execution platform for contractors running fast, multi-site programmes, from the first estimate to handover."
        />

        <Section labelledBy="about-why">
          <div className={`grid gap-10 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-28 ${framePad}`}>
            <motion.h2
              {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
              id="about-why"
              className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px] lg:text-[48px]"
            >
              Most jobs still run on spreadsheets and chat groups. <Muted>We think the site deserves better.</Muted>
            </motion.h2>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.06 })} className="space-y-5 text-[16px] leading-[1.65] text-[#5E6C84] lg:pt-3">
              <p>
                MEP packages carry the most coordination on any project: hundreds of materials, several trades, tight
                testing windows and a long closeout. Yet the information that runs them is spread across files,
                inboxes and phones.
              </p>
              <p>
                We are building one place for that work, so the estimate, the programme, the delivery and the daily
                log all describe the same job, and the next decision is easier to make.
              </p>
            </motion.div>
          </div>
        </Section>

        <Section tone="mist" labelledBy="about-beliefs">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="about-beliefs" title={<>What we <Highlight>believe.</Highlight></>} body="Three ideas shape every decision we make about the product." />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <motion.div key={b.title} {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.06 })} className="bg-[#F7F8FA] p-7 sm:p-9">
                <span className="font-mono text-[11px] text-[#A5AEBF]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[20px] font-medium tracking-[-0.025em] text-brand-navy">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#6B778C]">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section labelledBy="about-how">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="about-how" title={<>How we <Highlight>work.</Highlight></>} body="A small team, close to our customers, shipping every week." />
            </motion.div>
          </div>
          <ul className="grid border-t border-[#E8ECF2] lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className={`border-[#E8ECF2] px-7 py-9 sm:px-9 ${i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""}`}>
                <p.icon size={20} className="text-brand-orange" aria-hidden />
                <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-[#6B778C]">{p.body}</p>
              </li>
            ))}
          </ul>
        </Section>

        <ModuleClosingCta
          isMobile={isMobile}
          id="about-careers"
          title={<>Want to help us build it? <span className="text-white/55">We’re hiring.</span></>}
          body="Engineers, designers and construction people who care about shipping real software for real sites."
          primary={{ label: "careers@zedops.com", href: "mailto:careers@zedops.com" }}
          secondary={{ label: "Talk to us", href: "/contact" }}
          secondaryIcon={Mail}
        />
      </main>
      <Footer />
    </div>
  );
}
