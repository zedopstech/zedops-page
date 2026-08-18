import { motion } from "framer-motion";
import { ArrowRight, CircleCheck, MessageCircle, Puzzle, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { HIDE_PRICING } from "@/config/siteFocus";

const supportCards = [
  { icon: MessageCircle, title: "Founder-led support", description: "During early access, you talk directly to the team who built the product, with fast answers on workflows like schedule → task and punch closeout." },
  { icon: Puzzle, title: "Key integrations built-in", description: "Connect scheduling, documents, and ERP-style systems so execution data isn’t trapped in a silo." },
  { icon: Users, title: "MEP & field–first roadmap", description: "We’re prioritising trade execution (tasks, logs, inspections, and punch) alongside AI that respects permissions." },
];

export type FinalCtaLink = {
  label: string;
  href: string;
  caption?: string;
};

export type FinalCTAProps = {
  variant?: "brand-navy" | "brand-orange";
  compact?: boolean;
  title?: React.ReactNode;
  body?: string;
  primary?: FinalCtaLink;
  secondary?: FinalCtaLink;
};

function OrangeFinalCTA({
  title,
  body,
  primary,
  secondary,
  compact,
}: {
  title: React.ReactNode;
  body: string;
  primary: FinalCtaLink;
  secondary?: FinalCtaLink;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-orange">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-multiply"
        style={{
          backgroundImage: "url('/new-hero-banner.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        aria-hidden
      />
      <div
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compact ? "py-7 lg:py-8" : "py-12 lg:py-14"
        }`}
      >
        <div
          className={`grid items-center lg:grid-cols-[minmax(0,1.15fr)_auto] ${
            compact ? "gap-5 lg:gap-8" : "gap-8 lg:gap-12"
          }`}
        >
          <div>
            <h2
              className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {title}
            </h2>
            <p
              className="mt-3 max-w-xl text-base leading-snug text-white/90"
            >
              {body}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:justify-end">
            <div className="flex min-w-[168px] flex-col items-center gap-2">
              <a
                href={primary.href}
                className="inline-flex w-full items-center justify-center rounded-md bg-brand-navy px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0F1F3A] sm:w-auto sm:min-w-[168px]"
              >
                {primary.label}
              </a>
              {primary.caption ? (
                <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <CircleCheck size={13} strokeWidth={2.4} aria-hidden />
                  {primary.caption}
                </p>
              ) : null}
            </div>
            {secondary ? (
              <div className="flex min-w-[168px] flex-col items-center gap-2">
                <a
                  href={secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-md border border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:w-auto sm:min-w-[168px]"
                >
                  {secondary.label}
                </a>
                {secondary.caption ? (
                  <p className="flex items-center gap-1.5 text-xs font-medium text-white">
                    <CircleCheck size={13} strokeWidth={2.4} aria-hidden />
                    {secondary.caption}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FinalCTA({
  variant = "brand-navy",
  compact,
  title,
  body,
  primary,
  secondary,
}: FinalCTAProps) {
  const isMobile = useIsMobile();

  if (variant === "brand-orange") {
    return (
      <OrangeFinalCTA
        compact={compact}
        title={title ?? "Ready to see ZedOps on your jobs?"}
        body={body ?? "Talk to the team about how planning, materials, and field execution stay in one system."}
        primary={primary ?? { label: "Book a Demo", href: "/early-access" }}
        secondary={secondary}
      />
    );
  }

  return (
    <section className="bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA block */}
        <div className="border-b border-white/10 py-10 lg:py-12">
          <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-orange sm:text-4xl">
                {title ?? (
                  <>
                    Run <span className="text-brand-orange">MEP jobs</span> with execution in the loop.
                  </>
                )}
              </h2>
            </div>
            <div>
              <p className="mb-5 text-base leading-snug text-white/90">
                {body ??
                  "Give supers and PMs one place where the schedule, daily log, inspections, and punch list all drive assigned work, with AI that fits your permissions, not a generic chatbox."}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={primary?.href ?? "/early-access"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm transition-all duration-150 group"
                  style={{ borderRadius: 6 }}
                >
                  {primary?.label ?? "Get a personalised demo"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                {secondary ? (
                  <a href={secondary.href} className="text-white font-semibold text-sm hover:text-brand-orange transition-colors duration-150">
                    {secondary.label} →
                  </a>
                ) : !HIDE_PRICING ? (
                  <a href="/pricing" className="text-white font-semibold text-sm hover:text-brand-orange transition-colors duration-150">
                    View pricing →
                  </a>
                ) : (
                  <a href="/contact?topic=demo" className="text-white font-semibold text-sm hover:text-brand-orange transition-colors duration-150">
                    Book a demo →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support cards */}
        {/* <div className="py-8 lg:py-9">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {supportCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: i * 0.08 })}
                className="group flex gap-3 border border-white/5 bg-brand-navy-soft px-5 py-4 transition-colors duration-200 hover:bg-[#132038]"
                style={{ borderRadius: 6 }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/10" style={{ borderRadius: 6 }}>
                  <card.icon size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-white transition-colors group-hover:text-brand-orange">{card.title}</h4>
                  <p className="text-sm leading-snug text-[#97A0AF]">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
