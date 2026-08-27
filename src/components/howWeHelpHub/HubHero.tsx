import { motion } from "framer-motion";
import { ArrowRight, Database, Activity, Sparkles, HardHat } from "lucide-react";

const capabilities = [
  { icon: Database, label: "One project record" },
  { icon: Activity, label: "Real-time insights" },
  { icon: Sparkles, label: "AI-powered decisions" },
  { icon: HardHat, label: "Built for MEP" },
];

export default function HubHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:pb-28 lg:pt-28">
      {/* Background gradient + hero banner (matches site PageHero) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.82) 32%, rgba(255,255,255,0.76) 60%, rgba(255,255,255,0.84) 100%), url('/new-hero-banner.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        aria-hidden
      />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
            "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
        }}
        aria-hidden
      />

      {/* Warm glow at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[260px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 inline-flex items-center gap-2 border border-[#102B57]/15 bg-white px-4 py-1.5"
          style={{ borderRadius: 99 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6200]" aria-hidden />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#102B57]">
            How ZedOps fits
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#102B57] sm:text-5xl lg:text-[58px]"
        >
          One MEP platform.
          <br />
          <span className="text-[#FF6200]">Every way your team works.</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="mx-auto mt-6 max-w-[650px] text-base leading-snug text-[#42526E] sm:text-lg"
        >
          Plan, execute, track, and manage mechanical, electrical, and plumbing
          projects from one connected record.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="/how-we-help/project-stage"
            className="inline-flex items-center gap-2 rounded-md bg-[#FF6200] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E25800]"
          >
            Explore by project stage
            <ArrowRight size={14} aria-hidden />
          </a>
          <a
            href="/how-we-help/team"
            className="inline-flex items-center gap-2 rounded-md border border-[#102B57]/20 bg-white px-6 py-3 text-sm font-bold text-[#102B57] transition-colors hover:border-[#102B57]/35"
          >
            Explore by team
            <ArrowRight size={14} className="opacity-70" aria-hidden />
          </a>
        </motion.div>

        {/* Capability indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex items-center gap-2 text-sm font-semibold text-[#42526E]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FF]">
                  <Icon size={15} className="text-[#102B57]" aria-hidden />
                </span>
                {c.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
