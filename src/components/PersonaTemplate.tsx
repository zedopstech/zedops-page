import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import type { MockType } from "@/components/ProductMocks";
import { productMockComponents } from "@/components/ProductMocks";
import type { PersonaMockScenario } from "@/components/PersonaMocks";
import { PersonaFeatureMock } from "@/components/PersonaMocks";

export type { MockType };
export type { PersonaMockScenario };

interface Challenge {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}

export interface Feature {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  badge: string;
  /** Fallback when `mockScenario` is not set (e.g. reuse on other pages). */
  mockType: MockType;
  /** Built-for-you / persona pages: content-specific UI; takes precedence over `mockType`. */
  mockScenario?: PersonaMockScenario;
}

interface PersonaTemplateProps {
  heroImage: string;
  imageAlt: string;
  pill: string;
  PillIcon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  quote: string;
  quoteAttribution: string;
  challengesHeading: string;
  challengesIntro: string;
  challenges: Challenge[];
  featuresHeading: string;
  features: Feature[];
  earlyAccessLabel?: string;
}

const blueprintBg = {
  backgroundImage: [
    "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
};

// --- Main template ---

export default function PersonaTemplate({
  heroImage,
  imageAlt,
  pill,
  PillIcon,
  title,
  subtitle,
  quote,
  quoteAttribution,
  challengesHeading,
  challengesIntro,
  challenges,
  featuresHeading,
  features,
  earlyAccessLabel = "Request early access for your team",
}: PersonaTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-[#172B4D] overflow-x-hidden">
      <Navbar />

      {/* Split hero */}
      <div className="pt-[100px] lg:min-h-[calc(100vh-100px)] lg:grid lg:grid-cols-2">
        {/* Left  -  photo */}
        <div className="relative h-72 sm:h-96 lg:h-auto overflow-hidden">
          <img
            src={heroImage}
            alt={imageAlt}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30 lg:bg-linear-to-r lg:from-transparent lg:to-black/20" />
        </div>

        {/* Right  -  content */}
        <div
          className="relative flex items-center"
          style={{
            background:
              "linear-gradient(155deg, #C4D9FF 0%, #D9EBFF 28%, #ECF3FF 58%, #F2F6FF 100%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={blueprintBg} />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(247,150,37,0.12) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex border border-[#172B4D]/20 bg-white/80 items-center gap-2 px-4 py-1.5"
              style={{ borderRadius: 99 }}
            >
              <PillIcon size={12} className="text-[#F79625]" />
              <span className="text-[#172B4D] text-xs font-bold tracking-[0.12em] uppercase">{pill}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#172B4D] mb-5"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-[#42526E] text-lg leading-relaxed max-w-md mb-8"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/early-access"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#172B4D] hover:bg-[#0e1e38] text-white font-bold text-sm rounded-md transition-all duration-150 group"
              >
                {earlyAccessLabel}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#172B4D]/30 hover:border-[#172B4D]/60 text-[#172B4D] font-bold text-sm rounded-md transition-all duration-150 bg-white/60 hover:bg-white/80"
              >
                Talk to our team
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pull quote */}
      <section className="bg-[#172B4D] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="text-[#F79625] leading-none mb-4 font-serif select-none"
            style={{ fontSize: "5rem" }}
            aria-hidden="true"
          >
            "
          </div>
          <blockquote className="text-white text-xl lg:text-2xl font-semibold leading-relaxed mb-6">
            {quote}
          </blockquote>
          <p className="text-[#97A0AF] text-sm font-medium tracking-wide uppercase">
            {quoteAttribution}
          </p>
        </div>
      </section>

      {/* Challenges  -  modern big cards */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(168deg, #C4D9FF 0%, #E8EFFF 22%, #F6F9FF 48%, #FFFFFF 72%, #FDF8F3 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={blueprintBg}
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-widest mb-3">
              Sound familiar?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] tracking-tight mb-5">
              {challengesHeading}
            </h2>
            <p className="text-[#6B778C] text-base max-w-xl mx-auto leading-relaxed">
              {challengesIntro}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative py-10 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-10 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex flex-col bg-transparent"
              >
                <div
                  className="absolute top-6 right-2 sm:right-6 font-extrabold leading-none select-none text-gray-200/90"
                  style={{ fontSize: "6.5rem" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-[0_8px_24px_-8px_rgba(0,82,204,0.35)] ring-1 ring-white/25"
                  style={{
                    background: "linear-gradient(142deg, #0052CC 0%, #172B4D 55%, #0f2840 100%)",
                  }}
                >
                  <c.icon size={26} className="text-white" />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="font-extrabold text-[#172B4D] text-xl mb-4 leading-snug">{c.title}</h3>
                  <p className="text-[#6B778C] text-base leading-relaxed flex-1">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features  -  alternating left/right with mock UIs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-widest mb-3">
              How ZedOps helps
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] tracking-tight">
              {featuresHeading}
            </h2>
          </div>

          <div className="space-y-28">
            {features.map((f, i) => {
              const MockComponent = productMockComponents[f.mockType];
              const isEven = i % 2 === 0;
              const mockUi = f.mockScenario ? <PersonaFeatureMock scenario={f.mockScenario} /> : <MockComponent />;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-stretch lg:items-center`}
                >
                  {/* Mock UI side  -  tall rectangle */}
                  <div className="w-full lg:w-1/2 flex">
                    <div className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[520px] flex">
                      <div
                        className="absolute -inset-4 sm:-inset-6 rounded-3xl"
                        style={{
                          background: isEven
                            ? "linear-gradient(135deg, #EBF0FF 0%, #F2F6FF 100%)"
                            : "linear-gradient(135deg, #FFF7ED 0%, #FFFBF5 100%)",
                        }}
                      />
                      <div
                        className="absolute w-40 h-40 rounded-full blur-3xl opacity-45"
                        style={{
                          background: isEven ? "#C4D9FF" : "#F79625",
                          top: "-12px",
                          [isEven ? "right" : "left"]: "-8px",
                        }}
                      />
                      <div className="relative w-full flex items-stretch">
                        <div className="w-full flex flex-col [&>div]:flex-1 [&>div]:min-h-0">
                          {mockUi}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <span className="inline-block text-[10px] font-black text-[#0052CC] bg-[#EBF2FF] px-3 py-1 rounded-full uppercase tracking-wider">
                      {f.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[#42526E] text-base leading-relaxed">
                      {f.desc}
                    </p>
                    <a
                      href="/early-access"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#172B4D] hover:text-[#0052CC] transition-colors group"
                    >
                      See it in action
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-24 pt-16 border-t border-gray-100">
            <a
              href="/early-access"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#172B4D] hover:bg-[#0e1e38] text-white font-bold text-sm rounded-md transition-all duration-150 group"
            >
              {earlyAccessLabel}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
}
