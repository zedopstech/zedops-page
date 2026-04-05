import { motion } from "framer-motion";
import { Map, HardHat, Brain } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const steps = [
  {
    step: "01",
    icon: Map,
    title: "Plan your project",
    description: "Create your project structure, set milestones, define scope, and connect your team. Import schedules from Primavera or MS Project in seconds.",
    details: ["Gantt & CPM scheduling", "Budget breakdown structure", "Subcontractor onboarding", "Document library setup"],
  },
  {
    step: "02",
    icon: HardHat,
    title: "Track site execution",
    description: "Field teams log daily activity, capture photos, submit RFIs, and report progress from any device. Data flows instantly to dashboards.",
    details: ["Mobile daily logs", "QA inspection checklists", "Material delivery tracking", "Safety incident reporting"],
  },
  {
    step: "03",
    icon: Brain,
    title: "Get AI insights and act faster",
    description: "ZedOps AI analyzes patterns, detects risks, and surfaces actionable recommendations before problems escalate.",
    details: ["Delay risk prediction", "Cost variance analysis", "Resource optimization", "Automated executive reports"],
  },
];

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-[#FFFBF5] border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Compact heading */}
        <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })} className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-20 mb-10">
          <div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] leading-tight tracking-tight">
              From plan to <span className="text-[#172B4D]">closeout</span> - three steps.
            </h2>
          </div>
          <p className="text-[#42526E] text-base leading-relaxed lg:max-w-xs lg:pb-1">
            Simple, powerful, and built for how construction teams actually work.
          </p>
        </motion.div>

        {/* 3-column cards */}
        <div className="grid lg:grid-cols-3 gap-px bg-orange-100 border border-orange-100 overflow-hidden rounded-md">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: i * 0.1 })}
              className="bg-white p-7 flex flex-col group"
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl font-black text-orange-100 leading-none select-none">{step.step}</span>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-md" style={{ background: "#FFF3E0" }}>
                  <step.icon size={18} className="text-[#F79625]" />
                </div>
              </div>

              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-6 h-px bg-orange-200" style={{ transform: "translateY(-50%)" }} />
              )}

              <h3 className="text-[#172B4D] font-extrabold text-lg mb-2.5 leading-snug">{step.title}</h3>
              <p className="text-[#42526E] text-sm leading-relaxed mb-5 flex-1">{step.description}</p>

              <ul className="space-y-2 pt-4 border-t border-gray-100">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-xs text-[#6B778C]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F79625] flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
