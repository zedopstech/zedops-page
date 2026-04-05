import { motion } from "framer-motion";
import { MessageSquareX, ClipboardList, Eye, TrendingDown, Timer } from "lucide-react";
import { useScrollSectionMotion, useVariantScrollReveal } from "@/hooks/useScrollSectionMotion";

const PRIMARY = "#172B4D";
const ORANGE = "#F79625";

const problems = [
  {
    num: "01",
    icon: MessageSquareX,
    tag: "Communication",
    title: "Fragmented Communication",
    description:
      "Teams rely on disconnected tools like WhatsApp, spreadsheets, and emails, creating information silos that slow every decision on site.",
    stat: "72%",
    statDetail: "of project delays caused by communication breakdowns",
  },
  {
    num: "02",
    icon: ClipboardList,
    tag: "Reporting",
    title: "Manual Site Reporting",
    description:
      "Daily reports are often delayed, incomplete, or inaccurate  -  costing project managers 12+ hours every week that should be spent leading teams.",
    stat: "12+ hrs",
    statDetail: "wasted per PM every week on manual data entry",
  },
  {
    num: "03",
    icon: Eye,
    tag: "Visibility",
    title: "Lack of Real-Time Visibility",
    description:
      "Project managers struggle to track progress across multiple sites. By the time data surfaces, it's already too late to act.",
    stat: "8%",
    statDetail: "of construction projects finish on time and on budget",
  },
  {
    num: "04",
    icon: TrendingDown,
    tag: "Budget",
    title: "Cost Overruns",
    description:
      "Poor coordination and delayed insights allow small variances to compound silently into project-wide budget crises that nobody saw coming.",
    stat: "$280B",
    statDetail: "lost annually to cost overruns in the US alone",
  },
  {
    num: "05",
    icon: Timer,
    tag: "Decisions",
    title: "Delayed Decision Making",
    description:
      "Critical project decisions are slowed by missing or outdated data. The average team waits 48–72 hours for actionable answers.",
    stat: "48–72 hrs",
    statDetail: "average delay for critical decisions on live projects",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Problems() {
  const headerReveal = useScrollSectionMotion({ y: 20, duration: 0.5 });
  const calloutReveal = useScrollSectionMotion({ y: 16, delay: 0.08, duration: 0.45 });
  const cardScroll = useVariantScrollReveal(cardVariants);

  return (
    <section className="bg-[#F4F6FB] border-t border-blue-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div {...headerReveal} className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-24 mb-14">
          <div className="shrink-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B4D] leading-tight tracking-tight">
              Challenges holding<br />
              construction <span className="text-[#172B4D]">back.</span>
            </h2>
          </div>
          <p className="text-[#42526E] text-base leading-relaxed max-w-md lg:pb-1">
            Every project lost to delays, cost blowouts, and missed milestones traces back to the same five underlying problems. ZedOps solves all of them.
          </p>
        </motion.div>

        {/* ── Top 2  -  wide cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {problems.slice(0, 2).map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                {...cardScroll(i)}
                className="relative bg-white border border-gray-200 rounded-md p-8 flex flex-col overflow-hidden group hover:border-gray-300 transition-all duration-200"
              >
                {/* Faded number watermark */}
                <span className="absolute top-4 right-6 text-[80px] font-black text-gray-100 leading-none select-none pointer-events-none" style={{ color: "#E8EDF5" }}>
                  {p.num}
                </span>

                {/* Icon + tag */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-11 h-11 bg-[#172B4D] flex items-center justify-center rounded-md shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#97A0AF]">{p.tag}</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#172B4D] mb-3 leading-snug relative z-10">{p.title}</h3>
                <p className="text-[#42526E] text-sm leading-relaxed flex-1 mb-8 relative z-10">{p.description}</p>

                {/* Stat */}
                <div className="border-t border-gray-100 pt-5 relative z-10">
                  <div className="text-3xl font-black leading-none mb-1.5" style={{ color: ORANGE }}>{p.stat}</div>
                  <p className="text-xs text-[#97A0AF] leading-snug">{p.statDetail}</p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F79625] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-md" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom 3 ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.slice(2).map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                {...cardScroll(i + 2)}
                className="relative bg-white border border-gray-200 rounded-md p-7 flex flex-col overflow-hidden group hover:border-gray-300 transition-all duration-200"
              >
                {/* Faded number watermark */}
                <span className="absolute top-3 right-5 text-[64px] font-black leading-none select-none pointer-events-none" style={{ color: "#E8EDF5" }}>
                  {p.num}
                </span>

                {/* Icon + tag */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-10 h-10 bg-[#172B4D] flex items-center justify-center rounded-md shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#97A0AF]">{p.tag}</span>
                </div>

                <h3 className="text-lg font-extrabold text-[#172B4D] mb-2.5 leading-snug relative z-10">{p.title}</h3>
                <p className="text-[#42526E] text-sm leading-relaxed flex-1 mb-7 relative z-10">{p.description}</p>

                {/* Stat */}
                <div className="border-t border-gray-100 pt-4 relative z-10">
                  <div className="text-2xl font-black leading-none mb-1.5" style={{ color: ORANGE }}>{p.stat}</div>
                  <p className="text-xs text-[#97A0AF] leading-snug">{p.statDetail}</p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F79625] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-md" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom callout ── */}
        <motion.div {...calloutReveal} className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-[#172B4D] rounded-md px-8 py-6">
          <p className="text-white text-sm font-semibold leading-relaxed max-w-lg">
            <span className="text-white font-extrabold">ZedOps addresses every one of these</span> - with a single platform built specifically for construction teams.
          </p>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 bg-[#F79625] hover:bg-[#e07a10] text-white text-sm font-bold px-6 py-3 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            See how we fix it →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
