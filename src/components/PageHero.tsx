import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode, ComponentType } from "react";

interface PageHeroProps {
  pill: string;
  PillIcon?: ComponentType<{ size?: number; className?: string }>;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHero({ pill, PillIcon = Sparkles, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      {/* Background gradient  -  identical to home hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.82) 32%, rgba(255,255,255,0.76) 60%, rgba(255,255,255,0.84) 100%), url('/hero-banner.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
        }}
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
      />

      {/* Warm glow at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[260px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex border border-[#172B4D]/20 bg-white/80 items-center gap-2 px-4 py-1.5"
          style={{ borderRadius: 99 }}
        >
          <PillIcon size={12} className="text-brand-orange" />
          <span className="text-[#172B4D] text-xs font-bold tracking-[0.12em] uppercase">{pill}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold leading-[1.05] tracking-tight text-[#172B4D] mb-5"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="text-[#42526E] text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Optional children (CTAs etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
