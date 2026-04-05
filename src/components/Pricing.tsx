import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Shield, Zap, Building2, ChevronDown, Brain, Clock, RefreshCw, Lock } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const NAVY = "#172B4D";
const ORANGE = "#F79625";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: { monthly: 199, annual: 159 },
    description: "Perfect for small contractors getting started with AI-native project tools  -  full platform, lighter AI depth.",
    badge: null,
    features: [
      "Up to 5 active projects",
      "10 team members",
      "AI Copilot essentials (daily summaries & basic Q&A)",
      "Smart Daily Logs",
      "Drawing Annotation (view only)",
      "Basic project dashboard",
      "Mobile app (iOS & Android)",
      "Email support",
      "5 GB storage",
    ],
    cta: "Request early access",
    ctaHref: "/early-access",
    ctaStyle: "bg-[#172B4D] text-white hover:bg-[#0d1d35]",
    isPro: false,
  },
  {
    name: "Professional",
    icon: Shield,
    price: { monthly: 599, annual: 479 },
    description: "For established contractors and teams that need full AI intelligence and deep integrations.",
    badge: "Most Popular",
    features: [
      "Unlimited active projects",
      "Unlimited team members",
      "Everything in Starter",
      "AI Copilot (full access)",
      "Drawing Annotation (full)",
      "Project Intelligence Dashboard",
      "BIM viewer integration",
      "Priority support & onboarding",
      "50 GB storage",
      "API access",
      "Custom workflows",
    ],
    cta: "Request early access",
    ctaHref: "/early-access",
    ctaStyle: "bg-[#F79625] text-white hover:bg-[#e07a10]",
    isPro: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: { monthly: null, annual: null },
    description: "For large enterprises, GCs, and developers managing complex multi-project portfolios.",
    badge: null,
    features: [
      "Everything in Professional",
      "Custom BIM integration",
      "SSO / SAML authentication",
      "White-label client portals",
      "Dedicated customer success manager",
      "On-premise deployment option",
      "Custom AI model training",
      "SLA with 99.99% uptime",
      "Unlimited storage",
      "Custom integrations",
    ],
    cta: "Talk to sales",
    ctaHref: "/contact",
    ctaStyle: "border-2 border-[#172B4D] text-[#172B4D] hover:bg-[#172B4D] hover:text-white",
    isPro: false,
  },
];

const whyZedOps = [
  {
    icon: Brain,
    label: "AI-native, not AI-added",
    desc: "Built around intelligence from day one  -  not bolted on.",
  },
  {
    icon: Clock,
    label: "Live across every site",
    desc: "Real-time dashboards, logs, and alerts from field to boardroom.",
  },
  {
    icon: RefreshCw,
    label: "From preconstruction to closeout",
    desc: "One platform covers your entire project lifecycle.",
  },
  {
    icon: Lock,
    label: "Enterprise-grade security",
    desc: "Dedicated DB per tenant, role-based access, and data encrypted at rest and in transit.",
  },
];

const comparisonRows = [
  { feature: "Active projects",    starter: "Up to 5",   pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team members",       starter: "10",         pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Smart Daily Logs",   starter: true,         pro: true,        enterprise: true },
  { feature: "Mobile app",         starter: true,         pro: true,        enterprise: true },
  { feature: "Drawing Annotation", starter: "View only",  pro: "Full",      enterprise: "Full" },
  { feature: "AI Copilot",         starter: "Essentials", pro: "Full",      enterprise: "Full + BYOK" },
  { feature: "BIM viewer",         starter: false,        pro: true,        enterprise: "Custom" },
  { feature: "API access",         starter: false,        pro: true,        enterprise: true },
  { feature: "White-label portals",starter: false,        pro: false,       enterprise: true },
  { feature: "SSO / SAML",         starter: false,        pro: false,       enterprise: true },
  { feature: "Custom AI training", starter: false,        pro: false,       enterprise: true },
  { feature: "Dedicated CSM",      starter: false,        pro: false,       enterprise: true },
  { feature: "Storage",            starter: "5 GB",       pro: "50 GB",     enterprise: "Unlimited" },
  { feature: "Support",            starter: "Email",      pro: "Priority",  enterprise: "SLA-backed" },
];

function Cell({ val }: { val: boolean | string }) {
  if (val === true)  return <Check size={16} className="mx-auto text-[#F79625]" />;
  if (val === false) return <X size={14} className="mx-auto text-gray-300" />;
  return <span className="text-[#42526E] text-sm font-medium">{val}</span>;
}

export default function Pricing() {
  const isMobile = useIsMobile();
  const [annual, setAnnual] = useState(true);
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="pricing" className="bg-[#F0F4FF] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── Billing toggle (horizontal tabs on all breakpoints) ── */}
        <div className="mb-10 flex justify-center px-1">
          <div className="inline-flex items-center gap-1 border border-blue-200 bg-white p-1" style={{ borderRadius: 6 }}>
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-150 sm:px-5 sm:py-2 ${!annual ? "bg-[#172B4D] text-white" : "text-[#6B778C] hover:text-[#42526E]"}`}
              style={{ borderRadius: 6 }}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-150 sm:gap-2 sm:px-5 sm:py-2 ${annual ? "bg-[#172B4D] text-white" : "text-[#6B778C] hover:text-[#42526E]"}`}
              style={{ borderRadius: 6 }}
            >
              Annual
              <span className="shrink-0 rounded border border-green-200 bg-green-100 px-1 py-0.5 text-[10px] font-bold text-green-800 sm:px-1.5 sm:text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* ── Why ZedOps? ── */}
        <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.5, delay: 0.1 })} className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-blue-100 bg-blue-100 sm:grid-cols-2 lg:grid-cols-4">
          {whyZedOps.map(({ icon: Icon, label, desc }, i) => (
            <div key={label} className="flex min-w-0 items-start gap-3 bg-white px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 lg:px-6">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{ background: i === 0 ? NAVY : "#EBF0FF", borderRadius: 6 }}
              >
                <Icon size={16} color={i === 0 ? "white" : NAVY} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-sm font-bold leading-snug" style={{ color: NAVY }}>{label}</div>
                <div className="text-xs leading-relaxed text-[#6B778C]">{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 overflow-hidden mb-8 rounded-md">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...scrollMotionProps(isMobile, { y: 24, duration: 0.5, delay: i * 0.1 })}
              className={`relative flex flex-col p-6 sm:p-8 lg:p-10 ${i < plans.length - 1 ? "border-b border-gray-200 lg:border-b-0" : ""} ${i < 2 ? "lg:border-r lg:border-gray-200" : ""} ${plan.isPro ? "bg-[#172B4D]" : "bg-white"}`}
            >
              {plan.badge && <div className="absolute top-0 left-0 right-0 h-1 bg-[#F79625]" />}
              {plan.badge && (
                <span className="inline-block text-[#F79625] text-xs font-black uppercase tracking-widest mb-4">{plan.badge}</span>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: plan.isPro ? "rgba(255,255,255,0.15)" : "#EBF0FF", borderRadius: 6 }}
                >
                  <plan.icon size={18} style={{ color: plan.isPro ? "white" : NAVY }} />
                </div>
                <h3 className={`font-extrabold text-xl ${plan.isPro ? "text-white" : "text-[#172B4D]"}`}>{plan.name}</h3>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${plan.isPro ? "text-blue-200" : "text-[#6B778C]"}`}>{plan.description}</p>

              <div className="mb-8 pb-8 border-b" style={{ borderColor: plan.isPro ? "rgba(255,255,255,0.1)" : "#E5E7EB" }}>
                {plan.price.monthly ? (
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-5xl font-extrabold ${plan.isPro ? "text-white" : "text-[#172B4D]"}`}>
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className={`text-sm ${plan.isPro ? "text-blue-300" : "text-[#6B778C]"}`}>/mo</span>
                    </div>
                    {annual && (
                      <p className={`text-xs mt-1 ${plan.isPro ? "text-blue-300" : "text-[#97A0AF]"}`}>
                        Billed annually · save ${((plan.price.monthly! - plan.price.annual!) * 12).toLocaleString()}/yr
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <span className={`text-4xl font-extrabold ${plan.isPro ? "text-white" : "text-[#172B4D]"}`}>Custom</span>
                    <p className={`text-xs mt-1 ${plan.isPro ? "text-blue-300" : "text-[#97A0AF]"}`}>Tailored to your portfolio</p>
                  </div>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={14} className={`shrink-0 mt-0.5 ${plan.isPro ? "text-[#F79625]" : "text-[#172B4D]"}`} />
                    <span className={plan.isPro ? "text-blue-200" : "text-[#42526E]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 py-4 px-6 text-sm font-bold transition-all duration-150 group ${plan.ctaStyle}`}
                style={{ borderRadius: 6 }}
              >
                {plan.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* ── Compare plans toggle ── */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowTable(!showTable)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 bg-white text-sm font-semibold text-[#172B4D] hover:border-[#172B4D] transition-all duration-150"
            style={{ borderRadius: 6 }}
          >
            {showTable ? "Hide" : "Compare all features"}
            <motion.div animate={{ rotate: showTable ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={15} />
            </motion.div>
          </button>
        </div>

        {/* ── Comparison table (collapsible) ── */}
        <AnimatePresence initial={false}>
          {showTable && (
            <motion.div
              key="table"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white border border-gray-200 overflow-hidden rounded-md">
                <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-[#172B4D] font-extrabold text-base">Full feature comparison</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left px-8 py-4 text-[#172B4D] font-bold w-1/2">Feature</th>
                        {plans.map((p) => (
                          <th key={p.name} className="px-4 py-4 text-center font-extrabold" style={{ color: NAVY, width: "16.6%" }}>
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <tr key={row.feature} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}>
                          <td className="px-8 py-3.5 text-[#42526E] font-medium">{row.feature}</td>
                          <td className="px-4 py-3.5 text-center"><Cell val={row.starter} /></td>
                          <td className="px-4 py-3.5 text-center bg-[#F0F4FF]"><Cell val={row.pro} /></td>
                          <td className="px-4 py-3.5 text-center"><Cell val={row.enterprise} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p {...scrollMotionProps(isMobile, { fadeOnly: true, duration: 0.45 })} className="text-center text-[#6B778C] text-sm">
          All plans include a <strong className="text-[#172B4D]">14-day free trial</strong> with no credit card required.{" "}
          <a href="#" className="text-[#172B4D] hover:underline font-semibold">Contact sales</a> for volume discounts.
        </motion.p>
      </div>
    </section>
  );
}
