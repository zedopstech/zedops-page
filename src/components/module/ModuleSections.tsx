import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  CenterHeader,
  Container,
  CornerTicks,
  darkBand,
  DotGrid,
  Eyebrow,
  GhostButton,
  HazardTape,
  Highlight,
  SectionLabel,
  SplitHeader,
  TicketButton,
} from "@/components/design-preview/primitives";

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
  productCaption = "Illustrative product view",
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF4EC_0%,#F7F4F2_44%,#EEF3F9_100%)] pb-20 pt-[148px] lg:pb-24 lg:pt-[164px]">
      <DotGrid className="[mask-image:linear-gradient(to_bottom,black_10%,transparent_78%)]" />
      <Container className="relative z-10">
        <motion.div {...scrollMotionProps(isMobile, { y: 14, duration: 0.45 })}>
          <Eyebrow tag="Platform">{eyebrow}</Eyebrow>
        </motion.div>
        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <motion.h1 {...scrollMotionProps(isMobile, { y: 18, duration: 0.55 })} className="text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] text-brand-navy sm:text-[54px] lg:text-[66px]">
            {title}
          </motion.h1>
          <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.55, delay: 0.08 })} className="lg:border-l lg:border-[#D9E1EC] lg:pb-1 lg:pl-8">
            <p className="max-w-md text-[16px] font-medium leading-[1.6] text-[#3D4F6E] sm:text-[17px]">{body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TicketButton href="/early-access">Request a demo</TicketButton>
              <GhostButton href={`#${capabilitiesId}`} icon={ArrowRight}>Explore capabilities</GhostButton>
            </div>
          </motion.div>
        </div>
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.65, delay: 0.12 })} className="relative mt-14 lg:mt-20">
          {product}
          <p className="mt-4 text-center text-[11px] text-[#8C97AB]">{productCaption}</p>
        </motion.div>
      </Container>
    </section>
  );
}

export type ModuleFeature = { title: string; bullets: readonly string[] };

export function ModuleCapabilities({
  isMobile,
  heading,
  features,
  renderVisual,
  formatBullet,
  note = "Illustrative figures",
}: {
  isMobile: boolean;
  heading: SectionHeading;
  features: readonly ModuleFeature[];
  renderVisual: (index: number) => ReactNode;
  formatBullet?: (bullet: string) => { text: string; badge?: string };
  note?: string;
}) {
  return (
    <section id={heading.id} className="scroll-mt-[100px] bg-white py-20 lg:py-[100px]" aria-labelledby={`${heading.id}-title`}>
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader id={`${heading.id}-title`} label={heading.label} title={heading.title} body={heading.body} />
        </motion.div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => {
            const count = features.length;
            const wide = count >= 5 && index < 2;
            const full = count === 6 && index === 5;
            const tail = (count - 2) % 3;
            const span = count === 1 ? "lg:col-span-6" : count === 2 || count === 4 ? "lg:col-span-3" : count === 3 ? "lg:col-span-2" : count === 6 ? (wide ? "lg:col-span-3" : full ? "lg:col-span-6 lg:grid lg:grid-cols-[1fr_1.4fr]" : "lg:col-span-2") : wide ? "lg:col-span-3" : tail === 1 && index === count - 1 ? "lg:col-span-6" : tail === 2 && index >= count - 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <motion.article key={feature.title} {...scrollMotionProps(isMobile, { y: 22, duration: 0.5, delay: (index % 3) * 0.06 })} className={`group flex flex-col overflow-hidden rounded-2xl border border-[#E3E8F0] bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_44px_-28px_rgba(23,43,77,0.4)] ${span} ${full ? "sm:col-span-2" : ""}`}>
                <div className={`flex min-h-[185px] flex-col justify-center border-[#E3E8F0] bg-[#F8F9FD] p-5 ${full ? "order-2 border-t lg:border-l lg:border-t-0" : "border-b"}`}>
                  {renderVisual(index)}
                </div>
                <div className={`p-6 sm:p-7 ${full ? "order-1 flex flex-col justify-center" : ""}`}>
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-brand-navy">{feature.title}</h3>
                  <ul className={`mt-3.5 grid gap-x-4 gap-y-2 ${wide || full ? "sm:grid-cols-2" : ""}`}>
                    {feature.bullets.map((bullet) => {
                      const item = formatBullet?.(bullet) ?? { text: bullet };
                      return <li key={bullet} className="flex items-start gap-2 text-[13px] leading-snug text-[#5E6C84]"><Check size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-navy/55" aria-hidden /><span>{item.text}{item.badge ? <span className="ml-1.5 whitespace-nowrap rounded-[3px] bg-[#FFF1E8] px-1.5 py-0.5 align-middle font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-brand-orange">{item.badge}</span> : null}</span></li>;
                    })}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="mt-4 text-right text-[11px] text-[#8C97AB]">{note}</p>
      </Container>
    </section>
  );
}

export type ModuleComparisonItem = { title: string; description?: string };

export type ModuleWorkflowTab = { label: string; title: string; body: string; steps?: readonly string[] };

export function ModuleWorkflowTabs({ isMobile, heading, tabs }: { isMobile: boolean; heading: SectionHeading; tabs: readonly ModuleWorkflowTab[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;
  return (
    <section className="relative overflow-hidden bg-[#F8F9FD] py-20 lg:py-[108px]" aria-labelledby={heading.id}>
      <DotGrid className="opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative">
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}><SplitHeader id={heading.id} label={heading.label} title={heading.title} body={heading.body} /></motion.div>
        <motion.div {...scrollMotionProps(isMobile, { y: 26, duration: 0.55 })} className="mt-14">
          <div role="tablist" aria-label={`${heading.label} steps`} className={`grid grid-cols-2 gap-2 lg:gap-0 ${tabs.length >= 5 ? "lg:grid-cols-5" : tabs.length === 4 ? "lg:grid-cols-4" : tabs.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {tabs.map((item, index) => <button key={item.label} type="button" role="tab" id={`${heading.id}-tab-${index}`} aria-selected={active === index} aria-controls={`${heading.id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => { let next = index; if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length; else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = tabs.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`${heading.id}-tab-${next}`)?.focus(); }} className={`relative border px-3 py-3 text-left text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange lg:border-0 lg:border-b-2 lg:bg-transparent lg:text-center ${active === index ? "border-brand-orange bg-white text-brand-navy lg:border-brand-orange" : "border-[#DCE3ED] text-[#8C97AB] hover:text-brand-navy lg:border-[#DCE3ED]"}`}><span className="mr-2 font-mono text-[11px] text-brand-orange">{pad(index + 1)}</span>{item.label}</button>)}
          </div>
          <motion.div key={active} id={`${heading.id}-panel`} role="tabpanel" aria-labelledby={`${heading.id}-tab-${active}`} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 grid overflow-hidden rounded-xl border border-[#DCE3ED] bg-white shadow-[0_20px_40px_-30px_rgba(23,43,77,0.25)] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10"><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange">{pad(active + 1)} / {pad(tabs.length)}</span><h3 className="mt-5 max-w-lg text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-brand-navy sm:text-[34px]">{tab.title}</h3><p className="mt-4 max-w-xl text-[16px] leading-[1.65] text-[#5E6C84]">{tab.body}</p></div>
            <div className="relative border-t border-[#DCE3ED] bg-[#EDF3FA] p-7 sm:p-10 lg:border-l lg:border-t-0"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6B778C]">{tab.steps?.length ? "Inside this phase" : "Also in this module"}</p><ol className="mt-6 space-y-5">{(tab.steps?.length ? tab.steps : tabs.filter((_, index) => index !== active).slice(0, 3).map((other) => other.label)).map((step, index) => <li key={step} className="flex items-center gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-navy/20 bg-white font-mono text-[11px] font-bold text-brand-navy">{pad(index + 1)}</span><span className="text-[15px] font-semibold text-brand-navy">{step}</span></li>)}</ol></div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export function ModuleComparison({
  isMobile,
  heading,
  before,
  after,
  beforeLabel,
  afterLabel = "With ZedOps",
  beforeStamp,
  afterStamp,
  afterTone = "light",
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
    <section className="bg-white py-20 lg:py-[100px]" aria-labelledby={heading.id}>
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <CenterHeader id={heading.id} label={heading.label} title={heading.title} body={heading.body} />
        </motion.div>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {[before, after].map((items, side) => {
            const dark = side === 1 && afterTone === "dark";
            return <motion.div key={side} {...scrollMotionProps(isMobile, { y: 22, duration: 0.5, delay: side * 0.08 })} className={`relative rounded-xl border px-6 pb-7 pt-6 sm:px-8 ${dark ? "border-brand-navy bg-brand-navy shadow-[0_24px_48px_-30px_rgba(23,43,77,0.45)]" : side ? "border-[#E3E8F0] bg-white shadow-[0_24px_48px_-30px_rgba(23,43,77,0.35)]" : "border-[#E3E8F0] bg-[#F4F6FA]"}`}>
              {side ? <CornerTicks tone={dark ? "light" : "orange"} /> : null}
              <div className={`flex items-center justify-between border-b pb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${dark ? "border-white/25 text-white/75" : side ? "border-brand-navy text-brand-navy" : "border-[#B8C2D0] text-[#6B778C]"}`}><span>{side ? afterLabel : beforeLabel}</span><span>{side ? afterStamp : beforeStamp}</span></div>
              <ol>{items.map((item, index) => <li key={item.title} className={`grid grid-cols-[36px_1fr] gap-2 border-b py-4 last:border-b-0 last:pb-0 ${dark ? "border-white/15" : "border-[#E3E8F0]"}`}><span className={`pt-0.5 font-mono text-[12px] ${dark ? "text-white/55" : side ? "text-brand-orange" : "text-[#A5AEBF]"}`}>{pad(index + 1)}</span><div><p className={`text-[15px] ${dark ? "font-semibold text-white" : side ? "font-semibold text-brand-navy" : "font-medium text-[#7A8799] line-through decoration-[#7A8799]/50"}`}>{item.title}</p>{item.description ? <p className={`mt-0.5 text-[13px] ${dark ? "text-white/60" : side ? "text-[#6B778C]" : "text-[#8C97AB]"}`}>{item.description}</p> : null}</div></li>)}</ol>
            </motion.div>;
          })}
        </div>
      </Container>
    </section>
  );
}

export type ModuleConnection = { label: string; icon: LucideIcon; category?: string };
export type ModuleRoadmapItem = { title: string; body: string };

export function ModuleConnected({
  isMobile,
  heading,
  sourceTitle,
  sourceBody,
  sourceRows,
  modules,
  roadmapLabel,
  roadmapBody,
  roadmapItems,
}: {
  isMobile: boolean;
  heading: SectionHeading;
  sourceTitle: string;
  sourceBody: string;
  sourceRows: readonly { label: string; status: string }[];
  modules: readonly ModuleConnection[];
  roadmapLabel?: string;
  roadmapBody?: string;
  roadmapItems?: readonly ModuleRoadmapItem[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FD] py-20 lg:py-[100px]" aria-labelledby={heading.id}>
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}><SplitHeader id={heading.id} label={heading.label} title={heading.title} body={heading.body} /></motion.div>
        <motion.div {...scrollMotionProps(isMobile, { y: 22, duration: 0.5, delay: 0.05 })} className="mt-14 grid overflow-hidden rounded-2xl border border-[#E3E8F0] bg-white shadow-[0_24px_48px_-32px_rgba(23,43,77,0.3)] lg:grid-cols-[1fr_1.25fr]">
          <div className="relative border-b border-[#E3E8F0] p-8 sm:p-10 lg:border-b-0 lg:border-r"><CornerTicks /><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B778C]">Source record</p><h3 className="mt-3.5 text-[28px] font-semibold tracking-[-0.03em] text-brand-navy">{sourceTitle}</h3><p className="mt-2.5 max-w-sm text-[14.5px] leading-[1.55] text-[#5E6C84]">{sourceBody}</p><div className="mt-7 grid gap-2">{sourceRows.map((row) => <div key={row.label} className="flex justify-between border-b border-dashed border-[#E3E8F0] pb-2 text-[13px] text-[#3D4F6E]">{row.label}<span className="font-mono text-[12px] text-[#6B778C]">{row.status}</span></div>)}</div></div>
          <div className="grid gap-px bg-[#EDF0F5] sm:grid-cols-2">{modules.map((module, index) => <div key={module.label} className="flex items-center gap-3.5 bg-white px-6 py-6 sm:px-7"><module.icon size={20} strokeWidth={1.8} className="shrink-0 text-brand-navy" aria-hidden /><div><span className="block font-mono text-[10px] uppercase tracking-[0.06em] text-[#9AA6B8]">{pad(index + 1)} / {module.category ?? "Connected"}</span><p className="text-[15px] font-semibold text-brand-navy">{module.label}</p></div></div>)}</div>
        </motion.div>
        {roadmapItems?.length ? <>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mt-20 flex flex-wrap items-end justify-between gap-4"><div><SectionLabel>{roadmapLabel}</SectionLabel><p className="max-w-xl text-base leading-[1.6] text-[#3D4F6E]">{roadmapBody}</p></div><span className="rounded-full border border-[#E3E8F0] bg-white px-3 py-1 text-[11px] font-semibold text-[#6B778C]">On the roadmap</span></motion.div>
          <div className="mt-10 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">{roadmapItems.map((item, index) => <motion.div key={item.title} {...scrollMotionProps(isMobile, { y: 18, duration: 0.45, delay: index * 0.06 })} className="relative border-t border-dashed border-[#A8B8CC] pr-5 pt-6"><span aria-hidden className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border-2 border-brand-orange bg-[#F8F9FD]" /><span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-orange">Planned</span><p className="text-[15px] font-semibold text-brand-navy">{item.title}</p><p className="mt-1 text-[13px] leading-snug text-[#6B778C]">{item.body}</p></motion.div>)}</div>
        </> : null}
      </Container>
    </section>
  );
}

export function ModuleClosingCta({ isMobile, id, label, title, body, primary, secondary, secondaryIcon = CalendarDays }: { isMobile: boolean; id: string; label: string; title: ReactNode; body: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string }; secondaryIcon?: LucideIcon }) {
  return <><HazardTape /><section className={`relative overflow-hidden py-20 lg:py-24 ${darkBand}`} aria-labelledby={id}><DotGrid dark className="[mask-image:linear-gradient(to_right,transparent,black)]" /><Container className="relative"><motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.5 })} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"><div><SectionLabel tone="dark">{label}</SectionLabel><h2 id={id} className="max-w-2xl text-[34px] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[52px]">{title}</h2></div><div><p className="max-w-md text-base leading-[1.6] text-white/70">{body}</p><div className="mt-7 flex flex-wrap gap-3.5"><TicketButton href={primary?.href ?? "/early-access"} variant="white">{primary?.label ?? "Request a demo"}</TicketButton><GhostButton href={secondary?.href ?? "/contact?topic=demo"} icon={secondaryIcon} tone="dark">{secondary?.label ?? "Talk to our team"}</GhostButton></div></div></motion.div></Container></section></>;
}

export { Highlight };
