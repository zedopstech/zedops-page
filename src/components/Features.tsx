import { motion } from "framer-motion";
import { FileText, PenTool, BarChart2, MessageSquare, Box, Zap, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const features = [
  { icon: FileText, title: "Smart Daily Logs", description: "Capture structured daily site activity with smart templates. AI summarizes key events and flags anomalies instantly." },
  { icon: PenTool, title: "Drawing Annotation", description: "Collaborate directly on construction drawings in real time with full version control and stakeholder notifications." },
  { icon: BarChart2, title: "Project Intelligence", description: "Real-time insights on progress, productivity, and risks. Executive summaries auto-generated with predictive schedule alerts." },
  { icon: MessageSquare, title: "AI Copilot", description: "Ask plain-English questions about your project data. Proactively surfaces risks and cost variance before they escalate." },
  { icon: Box, title: "BIM Integration", description: "Connect 3D models with real-world execution data. Overlay progress tracking on your BIM model to visualize completed scope." },
  { icon: Zap, title: "Automated Workflows", description: "Trigger actions based on site conditions. When a risk threshold is crossed, escalate to the owner automatically." },
];

export default function Features() {
  const isMobile = useIsMobile();

  return (
    <section id="features" className="bg-[#EFF6FF] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-end mb-14">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-sm bg-[#172B4D] rotate-45" />
              <span className="text-[#172B4D] text-xs font-bold tracking-[0.15em] uppercase">Key Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#172B4D] leading-tight tracking-tight">
              Everything your team <span className="text-[#172B4D]">needs.</span>
            </h2>
          </div>
          <p className="text-[#42526E] text-lg leading-relaxed">
            Purpose-built for construction. Every ZedOps feature solves a real problem your teams face on site every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: i * 0.07 })}
              className="bg-white border border-blue-100 p-7 group hover:border-[#172B4D]/30 transition-all duration-200 cursor-pointer rounded-md"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 bg-[#EBF0FF] flex items-center justify-center group-hover:bg-[#172B4D] transition-colors duration-200 rounded-md">
                  <feature.icon size={18} className="text-[#172B4D] group-hover:text-white transition-colors" />
                </div>
                <ArrowRight size={16} className="text-gray-200 group-hover:text-[#F79625] group-hover:translate-x-1 transition-all duration-200 mt-1" />
              </div>
              <h3 className="text-[#172B4D] font-bold text-base mb-2.5 leading-snug">{feature.title}</h3>
              <p className="text-[#6B778C] text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
