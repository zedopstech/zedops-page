import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode, ComponentType } from "react";
import { Container, DotGrid, Eyebrow } from "@/components/design-preview/primitives";

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
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
  });

  return (
    <section className={`relative overflow-hidden bg-[linear-gradient(180deg,#FFF4EC_0%,#F7F4F2_48%,#EEF3F9_100%)] pb-16 sm:pb-20 lg:pb-24 ${compact ? "pt-14 lg:pt-16" : "pt-[156px] lg:pt-[174px]"}`}>
      <DotGrid className="[mask-image:linear-gradient(to_bottom,black_5%,transparent_82%)]" />
      <Container className="relative z-10">
        <motion.div {...enter(0)}>
          <Eyebrow tag="ZedOps"><span className="inline-flex items-center gap-1.5"><PillIcon size={13} className="text-brand-orange" />{pill}</span></Eyebrow>
        </motion.div>
        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <motion.h1 {...enter(0.07)} className="max-w-[800px] text-[40px] font-semibold leading-[1.06] tracking-[-0.045em] text-brand-navy sm:text-[54px] lg:text-[64px]">
            {title}
          </motion.h1>
          {(subtitle || children) && (
            <motion.div {...enter(0.14)} className="lg:border-l lg:border-[#D9E1EC] lg:pb-1 lg:pl-8">
              {subtitle && <p className="max-w-md text-[16px] font-medium leading-[1.6] text-[#3D4F6E] sm:text-[17px]">{subtitle}</p>}
              {children && <div className={subtitle ? "mt-7" : ""}>{children}</div>}
            </motion.div>
          )}
        </div>
        <div className="mt-14 flex items-center gap-3 border-t border-[#D9E1EC] pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C97AB]" aria-hidden>
          <span className="h-[6px] w-[6px] bg-brand-orange" />
          <span>{pill}</span>
          <span className="ml-auto">ZedOps</span>
        </div>
      </Container>
    </section>
  );
}
