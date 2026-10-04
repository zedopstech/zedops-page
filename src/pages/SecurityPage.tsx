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
  { icon: Database, title: "A database per customer", body: "Each organisation runs on its own dedicated database, so your project records are kept apart from every other customer’s.", detail: "One tenant, one database" },
  { icon: Cloud, title: "Private networking", body: "Application and database services run on private networks behind a single public web edge. The database is not exposed to the internet.", detail: "TLS in transit" },
  { icon: Users, title: "Access by role", body: "Every action is checked against the user’s role and permissions, so each person sees only what their job needs. Vendors sign in through a separate portal.", detail: "Permissions enforced in the application" },
  { icon: Key, title: "Control over AI", body: "Zed AI only reads what your role can already open, and any change it proposes waits for your approval. Customers can add their own OpenAI or Anthropic key.", detail: "AI keys stored encrypted" },
];

const flow = [
  { icon: Users, title: "Sign in", body: "Identity and role are verified, with two-factor sign-in and your session policy applied, before any data is returned." },
  { icon: Lock, title: "Private network", body: "Requests run on private networks, and the database is not exposed publicly." },
  { icon: Database, title: "Your database", body: "Your organisation’s own database answers the request, and the change is recorded in the activity log." },
];

const today = [
  "Dedicated database per customer",
  "Role-based access control, enforced in the application",
  "Two-factor sign-in with an authenticator app and recovery codes",
  "Session policy: idle timeout, session lifetime, concurrent-session limit and IP allowlist",
  "Rate limiting on sign-in and two-factor attempts",
  "Activity log of changes, with user and IP address",
  "Zed AI limited by role permissions, with approval before changes",
  "Your own OpenAI or Anthropic key for Zed AI, stored encrypted",
  "Short-lived, signed links for uploaded files",
  "Separate sign-in and access for the vendor portal",
  "Biometric app lock and secure token storage on mobile",
  "Encryption in transit (TLS)",
];
const planned = ["SSO / SAML", "SOC 2 certification", "ISO 27001 certification"];

export default function SecurityPage() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Security  -  ZedOps",
    description: "How ZedOps protects project data: a dedicated database per customer, role-based access, two-factor sign-in, session policy, activity logs and controls over Zed AI.",
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
              <SplitHeader id="sec-pillars" title={<>Four layers of <Highlight>protection.</Highlight></>} body="Isolation, private networking, role-based access and control over the AI your data touches." />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div key={p.title} {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.05 })} className="flex flex-col bg-white p-7 sm:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] text-brand-orange">
                  <p.icon size={19} aria-hidden />
                </span>
                <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#616D82]">{p.body}</p>
                <p className="mt-auto pt-6 font-mono text-[11.5px] text-[#5F6B80]">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section tone="mist" labelledBy="sec-flow">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="sec-flow" title={<>How a request <Highlight>travels.</Highlight></>} body="Every request is checked, kept on private networks, and served only from your own database." />
            </motion.div>
          </div>
          <ol className="grid border-t border-[#E3E8F0] lg:grid-cols-3">
            {flow.map((f, i) => (
              <li key={f.title} className={`border-[#E3E8F0] px-7 py-9 sm:px-9 ${i > 0 ? "border-t lg:border-t-0 lg:border-s" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE3ED] bg-white font-mono text-[12px] text-brand-navy">{String(i + 1).padStart(2, "0")}</span>
                  <f.icon size={17} className="text-[#5F6B80]" aria-hidden />
                </div>
                <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.55] text-[#616D82]">{f.body}</p>
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
                <p className="mb-4 text-[13px] font-medium text-[#5F6B80]">On the roadmap</p>
                {planned.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 py-1.5 text-[14.5px] text-[#5E6C84]">
                    <Lock size={14} className="mt-0.5 shrink-0 text-[#677388]" aria-hidden />
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
