import { LocalA } from "@/components/LocalLink";
import { motion } from "framer-motion";
import { Database, Cloud, Users, Lock, ShieldCheck, ArrowRight, Check, Key } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";

const pillars = [
  {
    icon: Database,
    title: "Your data, fully isolated",
    tag: "Dedicated DB per tenant",
    body: "Every organisation on ZedOps runs on its own dedicated database. Your project data is never co-mingled with another company's  -  by design, not just policy.",
    detail: "One database. One tenant. No exceptions.",
  },
  {
    icon: Cloud,
    title: "Hosted on AWS, private by default",
    tag: "Secured cloud infrastructure",
    body: "All data is hosted on Amazon Web Services with databases running in private VPCs  -  never exposed to the public internet. Data is encrypted at rest and in transit.",
    detail: "AES-256 at rest · TLS 1.3 in transit",
  },
  {
    icon: Users,
    title: "Granular role-based access",
    tag: "Role-based access control",
    body: "Every user action is governed by role. General Contractors, Project Managers, Site Supervisors, and Owners each see exactly what they need  -  nothing more.",
    detail: "Permissions enforced at the application and database layer.",
  },
  {
    icon: Key,
    title: "Use your own AI  -  your data never trains ours",
    tag: "Bring Your Own API Key",
    body: "Enterprise customers can connect ZedOps to their own OpenAI, Azure OpenAI, or Anthropic API keys. Your project data is processed within your own AI account  -  never used to train shared models.",
    detail: "Compatible with OpenAI, Azure OpenAI, Anthropic Claude",
  },
];

const checklist = [
  { label: "Encryption at rest (AES-256)", done: true },
  { label: "Encryption in transit (TLS 1.3)", done: true },
  { label: "Private VPC  -  database never exposed to public internet", done: true },
  { label: "Dedicated database per tenant", done: true },
  { label: "Role-based access control per user type", done: true },
  { label: "Bring Your Own AI API Key (BYOK) for enterprise", done: true },
  { label: "Regular internal security reviews", done: true },
  { label: "SOC 2 certification (on roadmap)", done: false },
  { label: "ISO 27001 certification (on roadmap)", done: false },
];

export default function Security() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white text-brand-navy">
      <PageHero
        pill="Security"
        PillIcon={ShieldCheck}
        title={<>Security is a first principle,<br />not an afterthought.</>}
        subtitle="ZedOps is built on enterprise-grade infrastructure. Here's exactly how we protect your data - no marketing language, no unclaimed certifications."
      />

      {/* Security pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FD] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-[0.15em] mb-3">How we protect you</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-brand-navy leading-tight tracking-tight">
              Four layers of protection, built in from day one.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...scrollMotionProps(isMobile, { y: 24, duration: 0.45, delay: i * 0.1 })}
                className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col gap-5 hover:border-[#C7D5F5] transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EBF0FF] flex items-center justify-center mb-4">
                    <pillar.icon size={22} className="text-brand-navy" />
                  </div>
                  <span className="inline-block text-[10px] font-bold text-brand-navy bg-[#EDF3FA] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                    {pillar.tag}
                  </span>
                  <h3 className="text-xl font-semibold text-brand-navy leading-snug mb-3">{pillar.title}</h3>
                  <p className="text-[#616D82] text-sm leading-snug">{pillar.body}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#42526E]">{pillar.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-[0.15em] mb-3">Security checklist</p>
              <h2 className="text-3xl font-semibold text-brand-navy leading-tight tracking-tight mb-4">
                What's in place today.
              </h2>
              <p className="text-[#616D82] text-sm leading-snug">
                We believe in full transparency about what's implemented now and what's on the roadmap. No checkbox we haven't earned.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {checklist.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${
                    item.done
                      ? "border-green-100 bg-green-50"
                      : "border-gray-100 bg-[#FAFBFC]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    item.done ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {item.done
                      ? <Check size={11} className="text-white" strokeWidth={3} />
                      : <Lock size={10} className="text-gray-400" />
                    }
                  </div>
                  <span className={`text-sm font-medium ${
                    item.done ? "text-brand-navy" : "text-[#97A0AF]"
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
              <p className="text-xs text-[#97A0AF] mt-1 ps-1">Items marked with a lock icon are planned for a future roadmap stage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture diagram  -  text-based */}
      <section className="bg-brand-navy px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#B8C9DC] text-xs font-bold uppercase tracking-[0.15em] mb-3">Infrastructure</p>
            <h2 className="text-2xl font-semibold text-white">How your data flows  -  and where it stays.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                icon: Users,
                title: "User authenticates",
                desc: "Role is verified. Access is scoped to their organisation and permissions before any data is returned.",
              },
              {
                step: "02",
                icon: Lock,
                title: "Request enters private VPC",
                desc: "All API traffic runs within a private AWS Virtual Private Cloud. The database has no public endpoint.",
              },
              {
                step: "03",
                icon: Database,
                title: "Dedicated DB serves the request",
                desc: "Your organisation's dedicated database  -  isolated from all other tenants  -  responds. Encrypted at rest.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: i * 0.1 })}
                className="bg-[#161B22] border border-white/5 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-orange font-black text-xs">{step.step}</span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <step.icon size={15} className="text-white/60" />
                  </div>
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-white/40 text-xs leading-snug">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <ShieldCheck size={32} className="text-brand-navy mx-auto mb-5 opacity-40" />
          <h2 className="text-2xl font-semibold text-brand-navy mb-3">Have security questions?</h2>
          <p className="text-[#616D82] text-sm leading-snug mb-7">
            We're happy to walk your IT or security team through our architecture, controls, and roadmap. No sales pitch  -  just a straightforward conversation.
          </p>
          <LocalA
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm transition-all duration-150 group rounded-md"
          >
            Talk to our team
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </LocalA>
        </div>
      </section>
    </div>
  );
}
