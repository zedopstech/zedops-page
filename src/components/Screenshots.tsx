import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { BarChart2, FileText, PenTool, MessageSquare, ClipboardList, Calendar, Play } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
  { id: "logs", label: "Daily Logs", icon: FileText },
  { id: "drawings", label: "Drawing Review", icon: PenTool },
  { id: "copilot", label: "AI Copilot", icon: MessageSquare },
  { id: "reports", label: "Reports", icon: ClipboardList },
  { id: "scheduling", label: "Scheduling", icon: Calendar },
];

const tabContent: Record<string, { title: string; description: string; color: string }> = {
  dashboard: {
    title: "Live project overview  -  all your KPIs in one place",
    description: "See active projects, schedule health, budget variance, risk flags, and team activity updating in real time.",
    color: "#172B4D",
  },
  logs: {
    title: "Mobile daily logs  -  field data in under 3 minutes",
    description: "Smart templates guide field teams through structured reporting. Data flows instantly to dashboards without manual entry.",
    color: "#16A34A",
  },
  drawings: {
    title: "Collaborate on construction drawings in real time",
    description: "Markup, annotate, and resolve issues directly on drawings. Version control and full audit trail built in.",
    color: "#172B4D",
  },
  copilot: {
    title: "Ask your AI anything about your project",
    description: "Natural language queries, predictive risk alerts, and auto-generated executive summaries  -  powered by your live project data.",
    color: "#7C3AED",
  },
  reports: {
    title: "Executive-ready reports generated automatically",
    description: "One-click PDF and slide exports, weekly summaries auto-sent to stakeholders, and live portfolio status pages.",
    color: "#D97706",
  },
  scheduling: {
    title: "AI-powered schedule tracking and delay prediction",
    description: "Connect Primavera or MS Project. ZedOps overlays actual progress and flags delay risks before they hit your critical path.",
    color: "#DC2626",
  },
};

export default function Screenshots() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");
  const content = tabContent[activeTab];
  const tab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="product-tour" className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-sm bg-brand-navy rotate-45" />
              <span className="text-brand-navy text-xs font-bold tracking-[0.15em] uppercase">Product Tour</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight tracking-tight">
              See ZedOps in <span className="text-brand-navy">action.</span>
            </h2>
          </div>
          <p className="text-[#42526E] text-lg leading-snug">
            Explore every module  -  from field-level daily logs to AI-powered risk insights and executive dashboards.
          </p>
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5, delay: 0.1 })} className="border border-gray-200 overflow-hidden rounded-md">
          {/* Dark tab bar  -  like reference */}
          <div className="bg-[#0F1117] flex overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-150 border-b-2 flex-shrink-0 ${
                  activeTab === t.id
                    ? "bg-white text-brand-navy border-brand-orange"
                    : "text-white/50 border-transparent hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="bg-[#F6F8FA] min-h-[580px] flex flex-col"
            >
              {/* Top context bar */}
              <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${content.color}18`, borderRadius: 6 }}>
                    <tab.icon size={15} style={{ color: content.color }} />
                  </div>
                  <div>
                    <p className="text-brand-navy font-bold text-sm leading-tight">{content.title}</p>
                    <p className="text-[#616D82] text-xs mt-0.5">{content.description}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
              </div>

              {/* Video / GIF placeholder */}
              <div className="flex-1 flex items-center justify-center min-h-[480px] relative">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle, rgba(23,43,77,0.06) 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }} />
                <div className="relative z-10 text-center max-w-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 bg-white border-2 border-gray-200 flex items-center justify-center mx-auto mb-5 cursor-pointer"
                    style={{ borderRadius: 6 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center" style={{ background: content.color, borderRadius: 6 }}>
                      <Play size={20} className="text-white ms-1" fill="white" />
                    </div>
                  </motion.div>
                  <p className="text-brand-navy font-bold text-base mb-1.5">{tab.label}  -  video coming soon</p>
                  <p className="text-[#97A0AF] text-sm">
                    We're recording walkthroughs for each module.<br />
                    <span className="text-brand-orange font-semibold">Request early access</span> for a live demo instead.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
