import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const NAVY = "#172B4D";
const ORANGE = "#FE5D02";

const cards = [
  {
    quote:
      "We're in early access  -  which means you get to shape the product. Every GC, developer, and PM who joins now directly influences what we build next.",
    name: "ZedOps Founding Team",
    role: "Building alongside construction teams",
    company: "Early\nAccess",
    badge: "Founding cohort",
    badgeBg: NAVY,
    badgeColor: "white",
  },
  {
    quote:
      "Be among the first construction teams to run on AI from day one. We're onboarding a select group of teams  -  each one gets a personal walkthrough with the founders.",
    name: "Founder-direct onboarding",
    role: "No account managers. No automated emails.",
    company: "Invite\nOnly",
    badge: "Personal setup",
    badgeBg: "#F0F4FF",
    badgeColor: NAVY,
  },
  {
    quote:
      "Your feedback isn't a support ticket  -  it's the roadmap. Early access customers get a direct line to the product team and see new features ship every week.",
    name: "Shipping every week",
    role: "New features land based on real team feedback",
    company: "Weekly\nReleases",
    badge: "Active roadmap",
    badgeBg: "#EBF0FF",
    badgeColor: ORANGE,
  },
];

export default function PricingTestimonials() {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };
  const prev = () => go((index - 1 + cards.length) % cards.length);
  const next = () => go((index + 1) % cards.length);

  const t = cards[index];

  return (
    <section className="bg-white border-t border-gray-100 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.h2
          {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })}
          className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-10"
          style={{ color: NAVY }}
        >
          Why join early?{" "}
          Here's what that means.
        </motion.h2>

        {/* Card */}
        <div
          className="relative overflow-hidden"
          style={{ background: "#EBF0FF", borderRadius: 6 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[1fr_260px]"
            >
              {/* Left  -  quote */}
              <div className="p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <div
                    className="text-7xl font-black leading-none mb-4 select-none"
                    style={{ color: NAVY, opacity: 0.18, fontFamily: "Georgia, serif", lineHeight: 1 }}
                  >
                    "
                  </div>
                  <p className="text-[#172B4D] text-lg leading-snug mb-8 font-medium">
                    "{t.quote}"
                  </p>
                </div>

                {/* Attribution + CTA */}
                <div>
                  <div className="text-sm font-bold mb-0.5" style={{ color: NAVY }}>{t.name}</div>
                  <div className="text-xs text-[#616D82] mb-5">{t.role}</div>
                  <a
                    href="/early-access"
                    className="inline-flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all duration-150"
                    style={{ color: ORANGE }}
                  >
                    Request early access <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right  -  badge panel */}
              <div className="flex items-center justify-center bg-white m-8 md:m-10 md:ml-0 rounded-md">
                <div className="text-center px-6 py-10">
                  <div
                    className="text-2xl font-black leading-snug whitespace-pre-line"
                    style={{ color: NAVY }}
                  >
                    {t.company}
                  </div>
                  <div
                    className="mt-3 inline-block text-[10px] font-black px-2.5 py-1 uppercase tracking-widest rounded"
                    style={{ background: t.badgeBg, color: t.badgeColor }}
                  >
                    {t.badge}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-200"
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  borderRadius: 6,
                  background: i === index ? NAVY : "#CBD5E1",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white hover:border-[#172B4D] hover:bg-[#172B4D] hover:text-white text-[#172B4D] transition-all duration-150"
              style={{ borderRadius: 6 }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white hover:border-[#172B4D] hover:bg-[#172B4D] hover:text-white text-[#172B4D] transition-all duration-150"
              style={{ borderRadius: 6 }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Trust strip */}
        <motion.div
          {...scrollMotionProps(isMobile, { fadeOnly: true, duration: 0.5, delay: 0.2 })}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 text-center border-t border-gray-100 pt-10"
        >
          {[
            { stat: "Invite only", label: "Early access is not self-serve" },
            { stat: "Founder-led", label: "Onboarding call with the team" },
            { stat: "Weekly", label: "New features shipped every week" },
          ].map(({ stat, label }) => (
            <div key={stat} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold" style={{ color: NAVY }}>{stat}</span>
              <span className="text-xs text-[#616D82] font-medium max-w-[160px]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
