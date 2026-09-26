import { motion } from "framer-motion";
import { CalendarDays, Tag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { HIDE_PRICING } from "@/config/siteFocus";
import { framePad, GhostButton, Muted, Section, TicketButton } from "@/components/design-system/primitives";

/** Closing CTA: framed navy band, two-tone headline left, actions right. */
export default function CTAPreview() {
  const isMobile = useIsMobile();
  return (
    <Section tone="navy" frameClassName="overflow-hidden" labelledBy="dp-cta">
      <motion.div
        {...scrollMotionProps(isMobile, { y: 20, duration: 0.5 })}
        className={`relative grid gap-10 py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:py-28 ${framePad}`}
      >
        <h2 id="dp-cta" className="text-[36px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[48px] lg:text-[60px]">
          Run MEP jobs with
          <br className="hidden sm:block" /> <Muted dark>execution in the loop.</Muted>
        </h2>
        <div className="lg:pb-2">
          <p className="max-w-sm text-[16px] leading-[1.6] text-white/60">
            See your own programme, logs and punch list in ZedOps. We will walk you through it with your data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TicketButton href="/early-access" variant="white">
              Get a personalised demo
            </TicketButton>
            {HIDE_PRICING ? (
              <GhostButton href="/contact?topic=demo" icon={CalendarDays} tone="dark">
                Talk to us
              </GhostButton>
            ) : (
              <GhostButton href="/pricing" icon={Tag} tone="dark">
                View pricing
              </GhostButton>
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
