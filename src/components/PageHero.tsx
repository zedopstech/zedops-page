import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode, ComponentType } from "react";
import { Eyebrow } from "@/components/design-system/primitives";

interface PageHeroProps {
  pill: string;
  PillIcon?: ComponentType<{ size?: number; className?: string }>;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  compact?: boolean;
}

/** Shared editorial hero for marketing, resource, and information pages. */
export default function PageHero({ pill, PillIcon = Sparkles, title, subtitle, children, compact = false }: PageHeroProps) {
  // The hero is the first thing painted (and usually the LCP element), so it is rendered visible:
  // `initial={false}` keeps opacity:0 out of the static HTML. Below-the-fold sections still animate.
  const enter = (_delay: number) => ({ initial: false as const });

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className={`relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 lg:border-x lg:border-[#E8ECF2] lg:px-14 ${
          compact ? "pt-14 pb-14 lg:pt-16" : "pt-[140px] pb-16 sm:pt-[152px] lg:pb-20"
        }`}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
          <div>
            <motion.div {...enter(0)} className="mb-6">
              <Eyebrow tag="ZedOps">
                <span className="inline-flex items-center gap-1.5">
                  <PillIcon size={13} className="text-brand-orange" />
                  {pill}
                </span>
              </Eyebrow>
            </motion.div>
            <motion.h1
              {...enter(0.07)}
              className="max-w-[800px] text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-brand-navy [text-wrap:balance] sm:text-[52px] lg:text-[60px]"
            >
              {title}
            </motion.h1>
          </div>
          {(subtitle || children) && (
            <motion.div {...enter(0.14)} className="lg:pb-1.5">
              {subtitle && <p className="max-w-md text-[16px] leading-[1.6] text-[#4D5E77] sm:text-[17px]">{subtitle}</p>}
              {children && <div className={subtitle ? "mt-6" : ""}>{children}</div>}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
