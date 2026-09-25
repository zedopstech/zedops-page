import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Check,
  FileX,
  Minus,
  Sparkles,
  X,
} from "lucide-react";
import { PiChartLineUpFill, PiDatabaseFill, PiFileXFill, PiLightningFill, PiShieldCheckFill, PiSparkleFill, PiUsersFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  CornerTicks,
  darkBand,
  DotGrid,
  Highlight,
  SplitHeader,
  TicketButton,
} from "./primitives";

type Tone = "bad" | "good" | "mid";
type Way = {
  id: string;
  tab: string;
  shortTab: string;
  icon: IconType;
  step: string;
  title: string;
  lead: string;
  listTitle: string;
  points: { tone: Tone; text: string }[];
};

const ways: Way[] = [
  {
    id: "traditional",
    tab: "Traditional Way",
    shortTab: "Traditional",
    icon: PiFileXFill,
    step: "01 / Traditional",
    title: "When work lives in silos.",
    lead: "Plans, site updates, and decisions travel through separate files and messages, slowing every handoff.",
    listTitle: "Where work gets stuck",
    points: [
      { tone: "bad", text: "Paper and spreadsheet workflows" },
      { tone: "bad", text: "Disconnected tools & data silos" },
      { tone: "bad", text: "Manual reports and delayed visibility" },
      { tone: "bad", text: "Delays, rework & cost overruns" },
      { tone: "bad", text: "Unclear ownership and tracking" },
    ],
  },
  {
    id: "digital",
    tab: "Digital Way",
    shortTab: "Digital",
    icon: PiChartLineUpFill,
    step: "02 / Digital",
    title: "More data. Still too many gaps.",
    lead: "Dashboards improve visibility, but disconnected workflows still leave teams coordinating by hand.",
    listTitle: "What changes, and what remains",
    points: [
      { tone: "good", text: "Digital tools and dashboards" },
      { tone: "good", text: "Centralized data and reports" },
      { tone: "good", text: "Faster team collaboration" },
      { tone: "good", text: "Real-time visibility" },
      { tone: "mid", text: "Workflows remain disconnected" },
      { tone: "mid", text: "Follow-ups still need manual coordination" },
    ],
  },
  {
    id: "zedops",
    tab: "Intelligent Way with ZedOps",
    shortTab: "With ZedOps",
    icon: PiSparkleFill,
    step: "03 / With ZedOps",
    title: "See what matters. Act on it.",
    lead: "Connect project work and live updates so the next decision has the right context.",
    listTitle: "What your team gains",
    points: [
      { tone: "good", text: "Connected workflows across every stage" },
      { tone: "good", text: "Zed AI highlights risks and next steps" },
      { tone: "good", text: "Approvals and follow-ups in context" },
      { tone: "good", text: "Live visibility into progress and blockers" },
      { tone: "good", text: "Decisions tied to project data" },
      { tone: "good", text: "Clear ownership and traceable actions" },
    ],
  },
];

const outcomes: { icon: IconType; text: string }[] = [
  { icon: PiUsersFill, text: "One platform for every team" },
  { icon: PiDatabaseFill, text: "One source of project truth" },
  { icon: PiLightningFill, text: "Real-time insights that drive action" },
  { icon: PiShieldCheckFill, text: "Stronger control. Better outcomes." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Status mark: squared like the rest of the system. Gains are solid orange; gaps are outlined. */
function Mark({ tone }: { tone: Tone }) {
  const cfg = {
    bad: { Icon: X, cls: "border border-white/25 text-white/60" },
    mid: { Icon: Minus, cls: "border border-dashed border-white/35 text-white/55" },
    good: { Icon: Check, cls: "bg-brand-orange text-white shadow-[0_6px_14px_-6px_rgba(254,93,2,0.7)]" },
  }[tone];
  return (
    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] ${cfg.cls}`}>
      <cfg.Icon size={13} strokeWidth={3} aria-hidden />
    </span>
  );
}

/**
 * Three ways: a measured progression rail (01 → 03, orange fill up to the active stage) above a
 * navy drawing sheet. The sheet pairs the stage narrative with a hairline spec table of points.
 */
export default function ThreeWaysPreview() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(2);
  const w = ways[active]!;
  const odd = w.points.length % 2 === 1;

  const focusTab = (next: number) => {
    setActive(next);
    document.getElementById(`ways-tab-${next}`)?.focus();
  };

  return (
    <section className="relative bg-white py-20 lg:py-[100px]" aria-labelledby="dp-compare">
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-compare"
            title={
              <>
                Three ways of <Highlight>MEP &amp; construction</Highlight> management.
              </>
            }
            body="From transitional processes to digital workflows and AI-powered execution — see how ZedOps changes the way construction teams work."
            cta={<TicketButton href="#capabilities">Explore ZedOps</TicketButton>}
            icons={[FileX, BarChart3, Sparkles]}
          />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.45, delay: 0.05 })} className="mt-14">
          {/* Progression rail */}
          <div role="tablist" aria-label="Ways of working" className="relative grid grid-cols-3 border-t border-[#D5DCE7]">
            <motion.span
              aria-hidden
              className="absolute -top-px left-0 h-[3px] bg-brand-orange"
              initial={false}
              animate={{ width: `${((active + 1) / ways.length) * 100}%` }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {ways.map((it, i) => {
              const on = i === active;
              const passed = i < active;
              return (
                <button
                  key={it.id}
                  id={`ways-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="ways-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") focusTab((i + 1) % ways.length);
                    else if (event.key === "ArrowLeft") focusTab((i + ways.length - 1) % ways.length);
                    else return;
                    event.preventDefault();
                  }}
                  className="group relative flex min-h-[76px] flex-col items-start justify-between gap-2 pb-4 pl-0 pr-2 pt-4 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:min-h-[92px] sm:flex-row sm:items-center sm:gap-4 sm:pr-6 sm:pt-5"
                >
                  {/* Stage tick on the rail */}
                  <span
                    aria-hidden
                    className={`absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-[2px] border-2 transition-colors ${
                      on || passed ? "border-brand-orange bg-brand-orange" : "border-[#B8C2D0] bg-white"
                    }`}
                  />
                  <span className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                    <span
                      className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        on ? "text-brand-orange" : "text-[#8C97AB]"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={`text-[14px] font-semibold leading-tight tracking-[-0.01em] transition-colors sm:text-[17px] lg:text-[19px] ${
                        on ? "text-brand-navy" : "text-[#7A8799] group-hover:text-brand-navy"
                      }`}
                    >
                      <span className="sm:hidden">{it.shortTab}</span>
                      <span className="hidden sm:inline">{it.tab}</span>
                    </span>
                  </span>
                  <span
                    className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors md:flex ${
                      on
                        ? "border-brand-navy bg-brand-navy text-white shadow-[0_10px_22px_-12px_rgba(23,43,77,0.7)]"
                        : "border-[#E3E8F0] bg-white text-[#A5AEBF] group-hover:border-[#CDD5E3] group-hover:text-brand-navy"
                    }`}
                  >
                    <it.icon size={19} aria-hidden />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail sheet */}
          <div className={`relative mt-4 overflow-hidden rounded-[20px] sm:mt-6 ${darkBand}`}>
            <DotGrid dark />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_6%_8%,rgba(86,124,178,0.32),transparent_42%),radial-gradient(circle_at_96%_100%,rgba(254,93,2,0.10),transparent_40%)]"
            />
            <CornerTicks />
            <motion.div
              key={w.id}
              id="ways-panel"
              role="tabpanel"
              aria-labelledby={`ways-tab-${active}`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-9 px-5 py-9 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:px-14 lg:py-14"
            >
              <div className="flex flex-col">
                <p className="inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  <span className="h-2 w-2 bg-brand-orange" aria-hidden />
                  {w.step}
                </p>
                <h3 className="mt-5 max-w-lg text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[40px] lg:text-[44px]">
                  {w.title}
                </h3>
                <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-white/70">{w.lead}</p>

                <div className="mt-10 border-t border-white/15 pt-5 lg:mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 whitespace-nowrap font-mono text-[13px] font-semibold text-white">
                      {pad(active + 1)} <span className="text-white/40">/ {pad(ways.length)}</span>
                    </span>
                    <span className="flex flex-1 gap-1" aria-hidden>
                      {ways.map((it, i) => (
                        <span key={it.id} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-brand-orange" : "bg-white/15"}`} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] text-white/50">From fragmented work to connected execution</p>
                </div>
              </div>

              {/* Spec table of points */}
              <div className="self-start overflow-hidden rounded-xl border border-white/15 bg-[#0E1B33]/35 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/15 bg-white/[0.04] px-5 py-3.5">
                  <p className="text-[14px] font-semibold text-white">{w.listTitle}</p>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-white/45">{pad(w.points.length)} POINTS</span>
                </div>
                <ul className="grid sm:grid-cols-2">
                  {w.points.map((p, index) => {
                    const last = index === w.points.length - 1;
                    const spans = last && odd;
                    const inLastRow = spans || index >= w.points.length - (odd ? 1 : 2);
                    return (
                      <motion.li
                        key={p.text}
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + index * 0.04 }}
                        className={`flex items-start gap-3.5 border-white/10 px-5 py-5 ${last ? "" : "border-b"} ${
                          inLastRow ? "sm:border-b-0" : "sm:border-b"
                        } ${index % 2 === 0 && !spans ? "sm:border-r" : ""} ${spans ? "sm:col-span-2" : ""}`}
                      >
                        <Mark tone={p.tone} />
                        <p
                          className={`min-w-0 flex-1 pt-[2px] text-[15px] font-medium leading-snug ${
                            p.tone === "good" ? "text-white" : "text-white/70"
                          }`}
                        >
                          {p.text}
                        </p>
                        <span className="pt-[4px] font-mono text-[11px] text-white/30">{pad(index + 1)}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Outcomes strip */}
        <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o, index) => (
            <motion.div
              key={o.text}
              {...scrollMotionProps(isMobile, { y: 24, delay: index * 0.07 })}
              className="flex items-center gap-3.5 bg-white px-5 py-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E3E8F0] bg-[#F4F6FA] text-brand-navy">
                <o.icon size={20} aria-hidden />
              </span>
              <p className="text-[14px] font-semibold leading-snug tracking-tight text-brand-navy">{o.text}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
