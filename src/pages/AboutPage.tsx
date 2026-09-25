import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { motion } from "framer-motion";
import { Building2, ArrowRight, Hammer, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Hammer,
    title: "Built for the site, not the spreadsheet",
    body: "Construction teams move fast and can't afford software that slows them down. Every ZedOps feature is designed to work the way field teams actually work.",
  },
  {
    icon: Users,
    title: "Founder-direct, always",
    body: "During early access, every customer speaks directly with the founding team. We do not hand you off to a support ticket queue. Your feedback shapes the roadmap.",
  },
  {
    icon: Zap,
    title: "Shipping every week",
    body: "We are a small, focused team committed to moving faster than any enterprise software company. If we say something is coming, it is coming soon.",
  },
];

export default function AboutPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "About  -  ZedOps",
    description: "ZedOps is building the operating system for construction. Learn about our mission to give every construction team the visibility of a $10B developer.",
  });
  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div>
        <PageHero
          pill="About ZedOps"
          PillIcon={Building2}
          title={<>We're building the operating<br />system for construction.</>}
          subtitle="ZedOps exists because construction is the world's largest industry and still runs on spreadsheets and WhatsApp groups."
        />

        {/* Mission */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })}>
                <SectionHeader
                  eyebrow="Our mission"
                  title="Give every construction team the visibility of a $10B developer."
                />
                <p className="text-[#42526E] text-base leading-snug mt-6">
                  The biggest property developers in the world have custom dashboards, real-time cost tracking, and AI-assisted project planning. The mid-market GC running 20 concurrent projects has a spreadsheet.
                </p>
                <p className="text-[#42526E] text-base leading-snug mt-4">
                  ZedOps closes that gap. We are building the intelligence layer for construction  -  connecting site activity, financials, RFIs, and scheduling into a single operating view.
                </p>
              </motion.div>

              <motion.div
                {...scrollMotionProps(isMobile, { x: 20, duration: 0.5 })}
                className="rounded-xl bg-brand-navy p-8 text-white"
              >
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Founding team note</p>
                <p className="text-white/80 text-base leading-snug">
                  "We started ZedOps after watching construction teams spend more time fighting their tools than building. AI changes what's possible  -  but only if it's designed around how construction actually works. That's what we're doing."
                </p>
                <p className="text-[#B8C9DC] text-sm font-semibold mt-5"> -  ZedOps founding team</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#97A0AF] uppercase tracking-widest mb-4 text-center">How we work</p>
            <h2 className="text-3xl font-semibold tracking-tight text-center mb-12">What we believe in</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: i * 0.08 })}
                  className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)] transition-shadow duration-200 hover:shadow-[0_12px_28px_-12px_rgba(23,43,77,0.12)]"
                >
                  <div className="w-10 h-10 bg-brand-navy/8 rounded-lg flex items-center justify-center mb-4">
                    <v.icon size={18} className="text-brand-navy" />
                  </div>
                  <h3 className="font-semibold text-brand-navy mb-2 text-sm">{v.title}</h3>
                  <p className="text-[#42526E] text-sm leading-snug">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring */}
        <section className="bg-brand-navy px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">We're hiring</p>
            <h2 className="text-3xl font-semibold text-white mb-4">
              Want to help us build it?
            </h2>
            <p className="text-white/60 text-base leading-snug mb-8 max-w-xl mx-auto">
              We're a small team moving fast. If you care about construction, AI, and shipping real software  -  we'd love to talk.
            </p>
            <a
              href="mailto:careers@zedops.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm rounded-md transition-all duration-150 group"
            >
              careers@zedops.com
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

        
        <Footer />
      </div>
    </div>
  );
}
