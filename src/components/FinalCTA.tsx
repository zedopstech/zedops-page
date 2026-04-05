import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Puzzle, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const supportCards = [
  { icon: MessageCircle, title: "Founder-led support", description: "During early access, you talk directly to the team who built the product  -  fast response, real answers." },
  { icon: Puzzle, title: "Key integrations built-in", description: "Connect to Procore, Primavera, AutoCAD, and ERP systems  -  more integrations added based on your feedback." },
  { icon: Users, title: "Construction community", description: "Join a growing network of construction professionals shaping the future of project management with AI." },
];

export default function FinalCTA() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-[#172B4D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA block */}
        <div className="py-24 border-b border-white/10">
          <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-tight tracking-tight">
                Build <span className="text-[#DCE6F0]">smarter</span> projects with ZedOps.
              </h2>
            </div>
            <div>
              <p className="text-blue-200 text-lg leading-relaxed mb-8">
                Stop reacting to problems. Start predicting and preventing them. Be among the first construction teams to run on AI from day one.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/early-access"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F79625] hover:bg-[#e07a10] text-white font-bold text-sm transition-all duration-150 group"
                  style={{ borderRadius: 6 }}
                >
                  Get a personalised demo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/pricing" className="text-white font-semibold text-sm hover:text-[#F79625] transition-colors duration-150">
                  View pricing →
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support cards */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: i * 0.08 })}
                className="bg-[#1E3A5F] px-7 py-7 flex gap-4 border border-white/5 hover:bg-[#234270] transition-colors duration-200 group"
                style={{ borderRadius: 6 }}
              >
                <div className="w-11 h-11 bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6 }}>
                  <card.icon size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1.5 group-hover:text-[#F79625] transition-colors">{card.title}</h4>
                  <p className="text-blue-300 text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
