import { motion } from "framer-motion";
import { ArrowRight, Users, Zap, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const pillars = [
  {
    icon: Sparkles,
    label: "Early Access",
    desc: "Limited spots open",
  },
  {
    icon: Zap,
    label: "Shipping fast",
    desc: "New features every week",
  },
  {
    icon: Users,
    label: "Founder-led",
    desc: "Talk directly to the team",
  },
];

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-white/5 bg-brand-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left  -  heading + CTA */}
          <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })}>
            <p className="text-[#B8C9DC] text-xs font-bold uppercase tracking-[0.15em] mb-4">Early Access Program</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Built with field &amp; MEP teams,<br />
              <span className="text-[#DCE6F0]">for how jobs actually run.</span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-[#B8C9DC]">
              We’re focused on execution workflows (tasks, logs, inspections, punch) with teams who live on site. Want to help steer what ships next?
            </p>
            <a
              href="/early-access"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm transition-all duration-150 group"
              style={{ borderRadius: 6 }}
            >
              Join the early access program
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right  -  pillar tiles */}
          <div className="flex flex-col gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                {...scrollMotionProps(isMobile, { x: 20, duration: 0.4, delay: i * 0.1 })}
                className="flex items-center gap-5 border border-white/5 bg-brand-navy-soft px-6 py-5"
                style={{ borderRadius: 6 }}
              >
                <div className="w-11 h-11 bg-[#172B4D] border border-white/10 flex items-center justify-center shrink-0" style={{ borderRadius: 6 }}>
                  <p.icon size={18} className="text-brand-orange" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{p.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              {...scrollMotionProps(isMobile, { x: 20, duration: 0.4, delay: 0.35 })}
              className="bg-[#172B4D]/60 border border-white/10 px-6 py-5 mt-1"
              style={{ borderRadius: 6 }}
            >
              <p className="text-white/60 text-sm leading-relaxed">
                "We're at the stage where every conversation with a construction team directly shapes the product. Your feedback isn't a support ticket. it's the roadmap."
              </p>
              <p className="text-[#B8C9DC] text-xs font-semibold mt-3">- ZedOps founding team</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
