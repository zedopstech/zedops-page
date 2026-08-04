import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Puzzle, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const supportCards = [
  { icon: MessageCircle, title: "Founder-led support", description: "During early access, you talk directly to the team who built the product, with fast answers on workflows like schedule → task and punch closeout." },
  { icon: Puzzle, title: "Key integrations built-in", description: "Connect scheduling, documents, and ERP-style systems so execution data isn’t trapped in a silo." },
  { icon: Users, title: "MEP & field–first roadmap", description: "We’re prioritising trade execution (tasks, logs, inspections, and punch) alongside AI that respects permissions." },
];

export default function FinalCTA() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA block */}
        <div className="py-24 border-b border-white/10">
          <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-tight tracking-tight">
                Run <span className="text-[#DCE6F0]">MEP jobs</span> with execution in the loop.
              </h2>
            </div>
            <div>
              <p className="mb-8 text-lg leading-relaxed text-[#B8C9DC]">
                Give supers and PMs one place where the schedule, daily log, inspections, and punch list all drive assigned work, with AI that fits your permissions, not a generic chatbox.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/early-access"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm transition-all duration-150 group"
                  style={{ borderRadius: 6 }}
                >
                  Get a personalised demo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/pricing" className="text-white font-semibold text-sm hover:text-brand-orange transition-colors duration-150">
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
                className="flex gap-4 border border-white/5 bg-brand-navy-soft px-7 py-7 transition-colors duration-200 group hover:bg-[#132038]"
                style={{ borderRadius: 6 }}
              >
                <div className="w-11 h-11 bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6 }}>
                  <card.icon size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1.5 group-hover:text-brand-orange transition-colors">{card.title}</h4>
                  <p className="text-sm leading-relaxed text-[#97A0AF]">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
