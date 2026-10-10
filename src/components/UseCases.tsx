import { LocalA } from "@/components/LocalLink";
import { motion } from "framer-motion";
import { HardHat, Building2, ClipboardList, Briefcase, ArrowRight, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const useCases = [
  {
    icon: HardHat,
    label: "General Contractors",
    title: "Win more bids. Deliver every project on time.",
    description: "ZedOps gives GCs complete control over subcontractors, daily operations, and risk  -  from a single command center. AI-powered risk detection catches issues before they become expensive change orders.",
    benefits: [
      "Subcontractor coordination & accountability",
      "Real-time schedule vs. baseline tracking",
      "Automated daily log aggregation",
      "Punch list and QA management",
      "RFI & submittal workflows",
    ],
    stat: { value: "70%", label: "reduction in daily reporting time" },
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop&crop=center",
    tag: "Built for you",
    accent: "#172B4D",
  },
  {
    icon: Building2,
    label: "Owners & Developers",
    title: "Full portfolio visibility without being on site.",
    description: "Get real-time financial exposure, schedule performance, and quality metrics across your entire portfolio. Stop waiting for weekly calls and incomplete reports  -  see everything that matters, live.",
    benefits: [
      "Portfolio-level executive dashboards",
      "Budget vs. actual tracking in real time",
      "Change order impact analysis",
      "Lender reporting automation",
      "ESG and compliance reporting",
    ],
    stat: { value: "48hr → 4min", label: "average decision lag improvement" },
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85&auto=format&fit=crop&crop=center",
    tag: "Built for you",
    accent: "#FE5D02",
  },
  {
    icon: ClipboardList,
    label: "Project Managers",
    title: "Stop chasing updates. Start making decisions.",
    description: "ZedOps puts everything you need in one place. Centralized tasks, AI meeting summaries, and one-click reports let you focus on high-value work instead of endless data collection.",
    benefits: [
      "Centralized task and issue tracking",
      "AI meeting minutes summarization",
      "Risk register with auto-escalation",
      "One-click status report generation",
      "Mobile field reporting app",
    ],
    stat: { value: "4hrs → 15min", label: "weekly report generation time" },
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=85&auto=format&fit=crop&crop=center",
    tag: "Built for you",
    accent: "#172B4D",
  },
  {
    icon: Briefcase,
    label: "Consultants & CM Firms",
    title: "Manage 3× more clients with the same team.",
    description: "Standardized workflows, white-label portals, and cross-project resource tracking let CM firms scale their practice without scaling headcount. Deliver premium intelligence to every client.",
    benefits: [
      "Multi-project client portals",
      "White-label reporting for clients",
      "Standardized inspection workflows",
      "Cross-project resource allocation",
      "Dedicated client data isolation",
    ],
    stat: { value: "3×", label: "projects managed per consultant" },
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=85&auto=format&fit=crop&crop=center",
    tag: "Built for you",
    accent: "#FE5D02",
  },
];

export default function UseCases() {
  const isMobile = useIsMobile();

  return (
    <section id="use-cases" className="bg-white border-t border-gray-200">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-sm bg-brand-navy rotate-45" />
              <span className="text-brand-navy text-xs font-bold tracking-[0.15em] uppercase">Built for you</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight tracking-tight">
              Built for every <span className="text-brand-navy">role</span> in construction.
            </h2>
          </div>
          <p className="text-[#42526E] text-lg leading-snug">
            Whether you're in the field or the boardroom, ZedOps gives you exactly what you need  -  purpose-built for how construction teams actually work.
          </p>
        </motion.div>
      </div>

      {/* Full-width role sections */}
      {useCases.map((uc, i) => (
        <motion.div
          key={uc.label}
          {...scrollMotionProps(isMobile, { y: 32, duration: 0.55, delay: 0.05 })}
          className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}
        >
          <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[480px] ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
            {/* Text panel */}
            <div className={`px-8 lg:px-16 py-14 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: `${uc.accent}18`, borderRadius: 6 }}>
                  <uc.icon size={18} style={{ color: uc.accent }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: uc.accent }}>{uc.label}</span>
              </div>
              <h3 className="text-3xl font-extrabold text-brand-navy leading-tight mb-4">{uc.title}</h3>
              <p className="text-[#42526E] text-base leading-snug mb-8">{uc.description}</p>
              <ul className="space-y-2.5 mb-8">
                {uc.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-[#616D82]">
                    <Check size={14} className="flex-shrink-0" style={{ color: uc.accent }} />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Stat callout */}
              <div className="border-s-4 ps-5" style={{ borderColor: uc.accent }}>
                <p className="text-3xl font-extrabold" style={{ color: uc.accent }}>{uc.stat.value}</p>
                <p className="text-[#616D82] text-sm mt-1">{uc.stat.label}</p>
              </div>
              <LocalA
                href="#"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-white px-6 py-3 transition-all duration-150 self-start"
                style={{ background: uc.accent, borderRadius: 6 }}
              >
                See how it works <ArrowRight size={14} />
              </LocalA>
            </div>
            {/* Full-bleed image */}
            <div className={`relative overflow-hidden min-h-80 lg:min-h-auto ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <img
                src={uc.img}
                alt={uc.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(23,43,77,0.18) 0%, transparent 60%)" }} />
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
