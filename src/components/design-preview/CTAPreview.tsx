import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { HIDE_PRICING } from "@/config/siteFocus";
import {
  DotGrid,
  GhostButton,
  Glow,
  Highlight,
  TicketButton,
} from "./primitives";

/** hexalog closing CTA: centred, big medium-weight headline, ticket + ghost buttons on a quiet textured field. */
export default function CTAPreview() {
  const isMobile = useIsMobile();
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-[120px]">
      <DotGrid className="[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <Glow className="top-1/2 left-1/2 h-[380px] w-[760px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-80" />
      <motion.div
        {...scrollMotionProps(isMobile, { y: 20, duration: 0.5 })}
        className="relative mx-auto max-w-4xl px-5 text-center"
      >
        <h2 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.04em] text-brand-navy sm:text-[44px] lg:text-[52px]">
          Run <Highlight>MEP jobs</Highlight>
          <br className="hidden sm:block" /> with execution in the loop.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <TicketButton href="/early-access">
            Get a personalised demo
          </TicketButton>
          {!HIDE_PRICING ? (
            <GhostButton href="/pricing" icon={Tag}>
              View pricing
            </GhostButton>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
