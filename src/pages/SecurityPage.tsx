import { motion } from "framer-motion";
import { Check, Cloud, Database, Key, Lock, ShieldCheck, Users } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { framePad, Highlight, Muted, Section, SplitHeader } from "@/components/design-system/primitives";
import { ModuleClosingCta } from "@/components/module/ModuleSections";

const pillars = [
  { icon: Database, title: "A database per customer", body: "Each organisation runs on its own dedicated database. Your project data is never mixed with anyone else’s.", detail: "One tenant, one database" },
  { icon: Cloud, title: "Private cloud hosting", body: "Hosted on AWS with databases inside private networks, never exposed to the public internet.", detail: "AES-256 at rest · TLS 1.3 in transit" },
  { icon: Users, title: "Access by role", body: "Every action is checked against the user’s role, so each person sees only what their job needs.", detail: "Enforced in the app and the database" },
  { icon: Key, title: "Bring your own AI key", body: "Enterprise customers can run Zed AI on their own OpenAI, Azure OpenAI or Anthropic account.", detail: "Your data never trains shared models" },
];

const flow = [
  { icon: Users, title: "Sign in", body: "Identity and role are verified before any data is returned." },
  { icon: Lock, title: "Private network", body: "Requests run inside a private cloud network with no public database endpoint." },
  { icon: Database, title: "Your database", body: "Your organisation’s own encrypted database answers the request." },
];

const today = [
  "Encryption at rest (AES-256)",
  "Encryption in transit (TLS 1.3)",
  "Private network, no public database endpoint",
  "Dedicated database per customer",
  "Role-based access control",
  "Bring your own AI key (enterprise)",
  "Regular internal security reviews",
];
const planned = ["SOC 2 certification", "ISO 27001 certification"];

export default function SecurityPage() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Security  -  ZedOps",
    description: "How ZedOps protects project data: a dedicated database per customer, private cloud hosting, encryption, role-based access and bring-your-own AI keys.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Security"
          PillIcon={ShieldCheck}
          title={<>Your project data, isolated. <Muted>And in your control.</Muted></>}
          subtitle="Exactly how we protect your data today, and what is still on the roadmap. No badges we haven’t earned."
        />

        <Section labelledBy="sec-pillars">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="sec-pillars" title={<>Four layers of <Highlight>protection.</Highlight></>} body="Isolation, private hosting, role-based access and control over the AI your data touches." />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div key={p.title} {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.05 })} className="flex flex-col bg-white p-7 sm:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] text-brand-orange">
                  <p.icon size={19} aria-hidden />
                </span>
                <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#6B778C]">{p.body}</p>
                <p className="mt-auto pt-6 font-mono text-[11.5px] text-[#8C97AB]">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section tone="mist" labelledBy="sec-flow">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="sec-flow" title={<>How a request <Highlight>travels.</Highlight></>} body="Every request is checked, kept inside a private network, and served only from your own database." />
            </motion.div>
          </div>
          <ol className="grid border-t border-[#E3E8F0] lg:grid-cols-3">
            {flow.map((f, i) => (
              <li key={f.title} className={`border-[#E3E8F0] px-7 py-9 sm:px-9 ${i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE3ED] bg-white font-mono text-[12px] text-brand-navy">{String(i + 1).padStart(2, "0")}</span>
                  <f.icon size={17} className="text-[#8C97AB]" aria-hidden />
                </div>
                <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-[#6B778C]">{f.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="sec-status">
          <div className={`grid gap-10 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <h2 id="sec-status" className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px]">
                In place today. <Muted>And what’s next.</Muted>
              </h2>
              <p className="mt-5 max-w-sm text-[16px] leading-[1.6] text-[#5E6C84]">
                We list only what is live. Certifications move to the left column when they are awarded.
              </p>
            </motion.div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2">
              <ul className="bg-white p-6">
                <p className="mb-4 text-[13px] font-medium text-[#1D7446]">Live</p>
                {today.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 py-1.5 text-[14.5px] text-brand-navy">
                    <Check size={15} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[#1D9A5B]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <ul className="bg-[#FAFBFC] p-6">
                <p className="mb-4 text-[13px] font-medium text-[#8C97AB]">On the roadmap</p>
                {planned.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 py-1.5 text-[14.5px] text-[#7A869A]">
                    <Lock size={14} className="mt-0.5 shrink-0 text-[#A5AEBF]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <ModuleClosingCta
          isMobile={isMobile}
          id="sec-cta"
          title={<>Have security questions? <span className="text-white/55">Let’s talk them through.</span></>}
          body="We will walk your IT or security team through our architecture, controls, hosting and roadmap."
          primary={{ label: "Talk to our team", href: "/contact?topic=security" }}
          secondary={{ label: "Request early access", href: "/early-access" }}
        />
      </main>
      <Footer />
    </div>
  );
}
