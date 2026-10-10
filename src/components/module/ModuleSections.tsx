import { LocalA } from "@/components/LocalLink";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { t } from "@/i18n";
import {
  Eyebrow,
  framePad,
  GhostButton,
  Highlight,
  Muted,
  Section,
  SplitHeader,
  TicketButton,
} from "@/components/design-system/primitives";

/**
 * Shared blocks for the platform module pages, in the site's framed light layout:
 * white/mist sections between hairline rails, two-tone headlines, rail-to-rail grids,
 * one navy closing band. Props are unchanged from the earlier version so every module
 * page (template, Estimation, Planning) picks this up as-is. `label` fields are accepted
 * but no longer drawn (eyebrow labels were retired site-wide).
 */

/** Translate a string prop at render time; JSX passes through untouched. */
const tx = (value: ReactNode): ReactNode => (typeof value === "string" ? t(value) : value);

const pad = (value: number) => String(value).padStart(2, "0");

type SectionHeading = {
  id: string;
  label: string;
  title: ReactNode;
  body: ReactNode;
};

export function ModuleHero({
  isMobile,
  eyebrow,
  title,
  body,
  product,
  capabilitiesId,
  productCaption,
}: {
  isMobile: boolean;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  product: ReactNode;
  capabilitiesId: string;
  productCaption?: string;
}) {
  return (
    <section className="relative bg-white">
      <div className={`relative mx-auto max-w-[1200px] pt-[140px] pb-14 sm:pt-[152px] lg:border-x lg:border-[#E8ECF2] lg:pb-16 ${framePad}`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
          <div>
            <motion.div initial={false} className="mb-6">
              <Eyebrow tag={t("Platform")}>{t(eyebrow)}</Eyebrow>
            </motion.div>
            <motion.h1
              initial={false}
              className="text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-brand-navy [text-wrap:balance] sm:text-[52px] lg:text-[60px]"
            >
              {tx(title)}
            </motion.h1>
          </div>
          <motion.div initial={false} className="lg:pb-1.5">
            <p className="max-w-md text-[16px] leading-[1.6] text-[#4D5E77] sm:text-[17px]">{tx(body)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TicketButton href="/early-access">{t("Request a demo")}</TicketButton>
              <GhostButton href={`#${capabilitiesId}`} icon={ArrowRight}>
                {t("Explore capabilities")}
              </GhostButton>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-[#E8ECF2] bg-[#F7F8FA]">
        <motion.div
          {...scrollMotionProps(isMobile, { y: 24, duration: 0.65, delay: 0.12 })}
          className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14 lg:border-x lg:border-[#E3E8F0] lg:px-14"
        >
          {product}
          {productCaption ? <p className="mt-4 text-center text-[12px] text-[#5F6B80]">{t(productCaption)}</p> : null}
        </motion.div>
      </div>
    </section>
  );
}

export type ModuleFeature = { title: string; bullets: readonly string[] };

/** Capabilities: a rail-to-rail hairline grid. Each cell is a title and one short line. */
export function ModuleCapabilities({
  isMobile,
  heading,
  features,
  renderVisual,
  formatBullet,
}: {
  isMobile: boolean;
  heading: SectionHeading;
  features: readonly ModuleFeature[];
  renderVisual?: (index: number) => ReactNode;
  formatBullet?: (bullet: string) => { text: string; badge?: string };
  note?: string;
}) {
  void renderVisual;
  const cols = features.length % 3 === 0 || features.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <Section id={heading.id} labelledBy={`${heading.id}-title`} className="scroll-mt-[100px]">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader id={`${heading.id}-title`} title={tx(heading.title)} body={tx(heading.body)} />
        </motion.div>
      </div>
      <div className={`grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 ${cols}`}>
        {features.map((feature, index) => {
          const first = formatBullet?.(feature.bullets[0] ?? "") ?? { text: feature.bullets[0] ?? "" };
          return (
            <motion.article
              key={feature.title}
              {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: (index % 3) * 0.05 })}
              className="flex flex-col bg-white p-6 sm:min-h-[210px] sm:p-8"
            >
              <span className="font-mono text-[11px] text-[#677388]">{pad(index + 1)}</span>
              <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">
                {t(feature.title)}
                {first.badge ? (
                  <span className="ms-2 rounded-[4px] bg-[#FFF1E8] px-1.5 py-0.5 align-middle text-[11px] font-medium text-[#C2410C]">{first.badge}</span>
                ) : null}
              </h3>
              {first.text ? <p className="mt-2 max-w-[38ch] text-[14.5px] leading-[1.55] text-[#616D82]">{t(first.text)}</p> : null}
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

export type ModuleComparisonItem = { title: string; description?: string };

export type ModuleWorkflowTab = { label: string; title: string; body: string; steps?: readonly string[] };

/** Workflow: a rail-to-rail tab row, then one calm two-column panel. */
export function ModuleWorkflowTabs({ isMobile, heading, tabs }: { isMobile: boolean; heading: SectionHeading; tabs: readonly ModuleWorkflowTab[] }) {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;
  const cols = tabs.length >= 5 ? "lg:grid-cols-5" : tabs.length === 4 ? "lg:grid-cols-4" : tabs.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <Section tone="mist" labelledBy={heading.id}>
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader id={heading.id} title={tx(heading.title)} body={tx(heading.body)} />
        </motion.div>
      </div>
      <div role="tablist" aria-label={t("Workflow steps")} className={`grid grid-cols-2 border-t border-[#E3E8F0] ${cols}`}>
        {tabs.map((item, index) => {
          const on = active === index;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`${heading.id}-tab-${index}`}
              aria-selected={on}
              aria-controls={`${heading.id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
                else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`${heading.id}-tab-${next}`)?.focus();
              }}
              className={`relative border-[#E3E8F0] px-5 py-5 text-start outline-none transition-colors focus-visible:bg-white sm:px-6 ${index % 2 === 1 ? "border-s" : ""} ${index >= 2 ? "border-t lg:border-t-0" : ""} ${index > 0 ? "lg:border-s" : ""} ${on ? "bg-white" : "hover:bg-white/60"}`}
            >
              <span aria-hidden className={`absolute inset-x-0 -top-px h-[2px] ${on ? "bg-brand-orange" : "bg-transparent"}`} />
              <span className="block font-mono text-[11px] text-[#677388]">{pad(index + 1)}</span>
              <span className={`mt-1 block text-[14.5px] font-medium leading-snug tracking-[-0.01em] ${on ? "text-brand-navy" : "text-[#5E6C84]"}`}>{t(item.label)}</span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-[#E3E8F0] bg-white">
        <motion.div
          key={active}
          id={`${heading.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${heading.id}-tab-${active}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-16 ${framePad}`}
        >
          <h3 className="max-w-lg text-[26px] font-medium leading-[1.15] tracking-[-0.035em] text-brand-navy [text-wrap:balance] sm:text-[32px]">{t(tab.title)}</h3>
          <div>
            <p className="max-w-xl text-[16px] leading-[1.65] text-[#5E6C84]">{t(tab.body)}</p>
            {tab.steps?.length ? (
              <ul className="mt-6 space-y-2.5">
                {tab.steps.map((step) => (
                  <li key={step} className="flex items-center gap-2.5 text-[14.5px] text-brand-navy">
                    <Check size={15} strokeWidth={2.4} className="shrink-0 text-brand-orange" aria-hidden />
                    {t(step)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/** Before / after as two rail-to-rail columns: muted with crosses, then navy with checks. */
export function ModuleComparison({
  isMobile,
  heading,
  before,
  after,
  beforeLabel,
  afterLabel = "With ZedOps",
}: {
  isMobile: boolean;
  heading: SectionHeading;
  before: readonly ModuleComparisonItem[];
  after: readonly ModuleComparisonItem[];
  beforeLabel: string;
  afterLabel?: string;
  beforeStamp?: string;
  afterStamp?: string;
  afterTone?: "light" | "dark";
}) {
  return (
    <Section labelledBy={heading.id}>
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader id={heading.id} title={tx(heading.title)} body={tx(heading.body)} />
        </motion.div>
      </div>
      <div className="grid border-t border-[#E8ECF2] lg:grid-cols-2">
        {[before, after].map((items, side) => (
          <motion.div
            key={side}
            {...scrollMotionProps(isMobile, { y: 18, duration: 0.5, delay: side * 0.08 })}
            className={`px-6 py-10 sm:px-10 lg:px-14 lg:py-14 ${side ? "border-t border-[#E8ECF2] lg:border-t-0 lg:border-s" : "bg-[#FAFBFC]"}`}
          >
            <p className={`text-[15px] font-medium ${side ? "text-brand-navy" : "text-[#5F6B80]"}`}>{t(side ? afterLabel : beforeLabel)}</p>
            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span
                    className={`mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] ${side ? "bg-brand-orange text-white" : "border border-[#DCE3ED] text-[#677388]"}`}
                  >
                    {side ? <Check size={12} strokeWidth={3} aria-hidden /> : <X size={12} strokeWidth={3} aria-hidden />}
                  </span>
                  <span>
                    <span className={`block text-[16px] leading-snug ${side ? "text-brand-navy" : "text-[#5E6C84]"}`}>{t(item.title)}</span>
                    {item.description ? <span className="mt-0.5 block text-[14px] text-[#5F6B80]">{t(item.description)}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export type ModuleConnection = { label: string; icon: LucideIcon; category?: string; href?: string };
export type ModuleRoadmapItem = { title: string; body: string };

/** Connected modules as a rail-to-rail grid of links, with an optional roadmap row. */
export function ModuleConnected({
  isMobile,
  heading,
  sourceTitle,
  sourceBody,
  modules,
  roadmapLabel,
  roadmapBody,
  roadmapItems,
}: {
  isMobile: boolean;
  heading: SectionHeading;
  sourceTitle: string;
  sourceBody: string;
  sourceRows?: readonly { label: string; status: string }[];
  modules: readonly ModuleConnection[];
  roadmapLabel?: string;
  roadmapBody?: string;
  roadmapItems?: readonly ModuleRoadmapItem[];
}) {
  return (
    <Section tone="mist" labelledBy={heading.id}>
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader id={heading.id} title={tx(heading.title)} body={tx(heading.body)} />
        </motion.div>
      </div>
      <div className="grid border-t border-[#E3E8F0] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <h3 className="text-[22px] font-medium leading-[1.3] tracking-[-0.025em] text-brand-navy">
            {t(sourceTitle)}. <Muted>{t(sourceBody)}</Muted>
          </h3>
        </div>
        <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:border-t-0 lg:border-s">
          {modules.map((module) => {
            const inner = (
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E3E8F0] bg-white text-[#5E6C84] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
                  <module.icon size={17} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="flex-1 text-[15px] font-medium text-brand-navy">{t(module.label)}</span>
                {module.href ? <ArrowUpRight size={15} className="text-[#677388] transition-colors group-hover:text-brand-orange" aria-hidden /> : null}
              </>
            );
            return module.href ? (
              <LocalA key={module.label} href={module.href} className="group flex items-center gap-3.5 bg-[#F7F8FA] px-6 py-5 transition-colors hover:bg-white sm:px-7">
                {inner}
              </LocalA>
            ) : (
              <div key={module.label} className="group flex items-center gap-3.5 bg-[#F7F8FA] px-6 py-5 sm:px-7">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
      {roadmapItems?.length ? (
        <div className="border-t border-[#E3E8F0]">
          <div className={`flex flex-wrap items-end justify-between gap-4 pt-12 pb-8 ${framePad}`}>
            <h3 className="max-w-xl text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-brand-navy">
              {t(roadmapLabel ?? "On the roadmap")}. <Muted>{roadmapBody ? t(roadmapBody) : roadmapBody}</Muted>
            </h3>
            <span className="rounded-md border border-[#E3E8F0] bg-white px-2.5 py-1 text-[12px] font-medium text-[#616D82]">{t("Planned")}</span>
          </div>
          <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-4">
            {roadmapItems.map((item) => (
              <div key={item.title} className="bg-[#F7F8FA] px-6 py-7 sm:px-8">
                <p className="text-[15px] font-medium text-brand-navy">{t(item.title)}</p>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-[#616D82]">{t(item.body)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  );
}

/** Closing CTA: framed navy band, headline left, actions right (matches the home page). */
export function ModuleClosingCta({
  isMobile,
  id,
  title,
  body,
  primary,
  secondary,
  secondaryIcon = CalendarDays,
}: {
  isMobile: boolean;
  id: string;
  label?: string;
  title: ReactNode;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  secondaryIcon?: LucideIcon;
}) {
  return (
    <Section tone="navy" labelledBy={id}>
      <motion.div
        {...scrollMotionProps(isMobile, { y: 18, duration: 0.5 })}
        className={`grid gap-10 py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:py-24 ${framePad}`}
      >
        <h2 id={id} className="max-w-2xl text-[34px] font-medium leading-[1.05] tracking-[-0.045em] text-white [text-wrap:balance] sm:text-[44px] lg:text-[52px]">
          {tx(title)}
        </h2>
        <div className="lg:pb-2">
          <p className="max-w-sm text-[16px] leading-[1.6] text-white/60">{t(body)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TicketButton href={primary?.href ?? "/early-access"} variant="white">
              {t(primary?.label ?? "Request a demo")}
            </TicketButton>
            <GhostButton href={secondary?.href ?? "/contact?topic=demo"} icon={secondaryIcon} tone="dark">
              {t(secondary?.label ?? "Talk to our team")}
            </GhostButton>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

export { Highlight };
