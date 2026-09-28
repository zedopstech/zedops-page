import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, Mail, MessageCircle, Sparkles, StickyNote, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Section, SplitHeader } from "@/components/design-system/primitives";
import { Canvas } from "./mocks";

type Tone = "bad" | "good" | "mid";
type Way = { id: string; title: string; name: string; lead: string; points: { tone: Tone; text: string }[] };

const ways: Way[] = [
  {
    id: "traditional",
    name: "Traditional way",
    title: "When work lives in silos.",
    lead: "Plans, site updates, and decisions travel through separate files and messages, slowing every handoff.",
    points: [
      { tone: "bad", text: "Paper and spreadsheet workflows" },
      { tone: "bad", text: "Manual reports, delayed visibility" },
      { tone: "bad", text: "Unclear ownership and tracking" },
    ],
  },
  {
    id: "digital",
    name: "Digital way",
    title: "More data. Still too many gaps.",
    lead: "Dashboards improve visibility, but disconnected tools still leave teams coordinating by hand.",
    points: [
      { tone: "good", text: "Dashboards and central reports" },
      { tone: "mid", text: "Workflows remain disconnected" },
      { tone: "mid", text: "Follow-ups still chased manually" },
    ],
  },
  {
    id: "zedops",
    name: "Intelligent way, with ZedOps",
    title: "See what matters. Act on it.",
    lead: "Every team works from one live project record, and Zed AI points to the next decision.",
    points: [
      { tone: "good", text: "Connected workflows across every stage" },
      { tone: "good", text: "Zed AI highlights risks and next steps" },
      { tone: "good", text: "Clear ownership and traceable actions" },
    ],
  },
];

const DURATION = 6500;

/* ---- Visuals ---------------------------------------------------------- */

const scraps = [
  { icon: FileSpreadsheet, label: "Programme_v7_FINAL.xlsx", sub: "Last edited 3 weeks ago", x: 24, y: 28, r: -4 },
  { icon: MessageCircle, label: "Is the chiller on site yet??", sub: "Site WhatsApp · 11:42", x: 266, y: 14, r: 3 },
  { icon: Mail, label: "RE: RE: RE: Revised BOQ", sub: "14 messages", x: 276, y: 140, r: -2 },
  { icon: StickyNote, label: "Call supplier re: cable tray", sub: "Sticky note, desk 3", x: 20, y: 168, r: 4 },
  { icon: FileSpreadsheet, label: "Daily_log_Tue (scan).pdf", sub: "Handwritten", x: 150, y: 266, r: -3 },
];

function SiloVisual({ run }: { run: boolean }) {
  return (
    <div className="relative h-[340px]">
      {scraps.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute flex w-[230px] items-start gap-3 rounded-lg border border-[#E3E8F0] bg-white p-3 shadow-[0_12px_28px_-16px_rgba(14,27,51,0.3)]"
          style={{ left: s.x, top: s.y, rotate: s.r }}
          initial={run ? { opacity: 0, y: 12 } : false}
          animate={run ? { opacity: 1, y: [0, i % 2 ? 3 : -3, 0] } : { opacity: 1 }}
          transition={{ opacity: { duration: 0.35, delay: i * 0.12 }, y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" } }}
        >
          <s.icon size={16} className="mt-0.5 shrink-0 text-[#677388]" />
          <span className="min-w-0">
            <span className="block truncate text-[13.5px] text-brand-navy">{s.label}</span>
            <span className="block text-[11.5px] text-[#5F6B80]">{s.sub}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const apps = [
  { name: "Schedule tool", rows: 4, x: 10 },
  { name: "Cost spreadsheet", rows: 5, x: 185 },
  { name: "Site app", rows: 3, x: 360 },
];

function DisconnectedVisual({ run }: { run: boolean }) {
  return (
    <div className="relative h-[340px]">
      <svg className="absolute inset-0" width={520} height={340} fill="none">
        {[160, 335].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 150 L${x + 25} 150`}
            stroke="#B8C2D0"
            strokeWidth={1.5}
            strokeDasharray="4 5"
            initial={run ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          />
        ))}
      </svg>
      {[172, 347].map((x, i) => (
        <motion.span
          key={x}
          className="absolute top-[137px] flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#F7E1AE] bg-[#FEF4DE] text-[#B7791F]"
          style={{ left: x }}
          initial={run ? { opacity: 0, scale: 0.6 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.2 }}
        >
          <X size={12} strokeWidth={3} />
        </motion.span>
      ))}
      {apps.map((a, i) => (
        <motion.div
          key={a.name}
          className="absolute top-[70px] w-[150px] overflow-hidden rounded-lg border border-[#E3E8F0] bg-white shadow-[0_12px_28px_-16px_rgba(14,27,51,0.3)]"
          style={{ left: a.x }}
          initial={run ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.15 }}
        >
          <div className="flex items-center gap-1 border-b border-[#EDF0F5] px-2.5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#DCE3ED]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#DCE3ED]" />
            <span className="ml-1.5 truncate text-[11px] text-[#616D82]">{a.name}</span>
          </div>
          <div className="space-y-2 p-2.5">
            {Array.from({ length: a.rows }).map((_, k) => (
              <div key={k} className="h-2 rounded-full bg-[#EEF1F5]" style={{ width: `${55 + ((k * 23 + i * 11) % 40)}%` }} />
            ))}
          </div>
        </motion.div>
      ))}
      <motion.p
        className="absolute inset-x-0 bottom-12 text-center text-[13px] text-[#5F6B80]"
        initial={run ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        Three tools, three versions of the truth.
      </motion.p>
    </div>
  );
}

const linked = [
  { k: "Schedule", v: "6 activities at risk", tone: "text-[#B42B29]" },
  { k: "Materials", v: "PO-1043 arriving Thu", tone: "text-brand-navy" },
  { k: "Issues", v: "ISS-441 assigned to Ahmed", tone: "text-brand-navy" },
  { k: "Cost", v: "Materials +7% vs budget", tone: "text-[#9A6400]" },
];

function ConnectedVisual({ run }: { run: boolean }) {
  return (
    <div className="relative flex h-[340px] items-center justify-center">
      <motion.div
        className="w-[380px] overflow-hidden rounded-xl border border-[#E3E8F0] bg-white shadow-[0_24px_48px_-24px_rgba(14,27,51,0.35)]"
        initial={run ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between border-b border-[#EDF0F5] px-4 py-3">
          <span className="text-[14px] font-medium text-brand-navy">Marina Heights · Block C</span>
          <span className="rounded-[5px] bg-[#E8F6EE] px-1.5 py-0.5 text-[11px] text-[#1D7446]">Live</span>
        </div>
        {linked.map((l, i) => (
          <motion.div
            key={l.k}
            className="grid grid-cols-[88px_1fr] border-b border-[#F1F3F7] px-4 py-2.5 text-[13px]"
            initial={run ? { opacity: 0, x: -6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
          >
            <span className="text-[#5F6B80]">{l.k}</span>
            <span className={l.tone}>{l.v}</span>
          </motion.div>
        ))}
        <motion.div
          className="flex items-start gap-2.5 bg-[#FFF6F0] px-4 py-3 text-[13px] text-brand-navy"
          initial={run ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 1.1 }}
        >
          <Sparkles size={14} className="mt-0.5 shrink-0 text-brand-orange" />
          Chiller delay pushes L4 testing. Zed suggests two actions.
        </motion.div>
      </motion.div>
    </div>
  );
}

const visuals = [SiloVisual, DisconnectedVisual, ConnectedVisual];

/**
 * Three ways of working, Attio-style: an auto-advancing list with a progress line on the left,
 * and a visual of that way of working on the right (dark section).
 */
export default function ThreeWaysPreview() {
  const isMobile = useIsMobile();
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const run = inView && !reduce;

  useEffect(() => {
    if (!run || paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % ways.length), DURATION);
    return () => window.clearTimeout(id);
  }, [active, run, paused]);

  const Visual = visuals[active]!;

  return (
    <Section tone="mist" labelledBy="dp-compare">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-compare"
            title={<>Three ways to run <Highlight>MEP &amp; construction</Highlight> work.</>}
            body="From paper processes to digital tools to AI-assisted execution: what changes for the team at each step."
          />
        </motion.div>
      </div>

      <div ref={ref} className="grid border-t border-[#E3E8F0] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div
          role="tablist"
          aria-label="Ways of working"
          className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {ways.map((w, i) => {
            const on = i === active;
            return (
              <div key={w.id} className="border-b border-[#E3E8F0] py-5 first:pt-0 last:border-b-0">
                <button
                  type="button"
                  role="tab"
                  id={`ways-tab-${i}`}
                  aria-selected={on}
                  aria-controls="ways-panel"
                  onClick={() => setActive(i)}
                  className={`text-left text-[18px] font-medium tracking-[-0.02em] transition-colors ${on ? "text-brand-navy" : "text-[#677388] hover:text-[#5E6C84]"}`}
                >
                  {w.name}
                </button>
                <AnimatePresence initial={false}>
                  {on ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-[#616D82]">{w.lead}</p>
                      <div className="mt-5 h-[2px] overflow-hidden rounded-full bg-[#E3E8F0]">
                        <motion.div
                          key={`${active}-${paused}-${run}`}
                          className="h-full origin-left bg-brand-orange"
                          initial={{ scaleX: run && !paused ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: run && !paused ? DURATION / 1000 : 0, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div
          id="ways-panel"
          role="tabpanel"
          aria-labelledby={`ways-tab-${active}`}
          className="relative flex items-center justify-center overflow-hidden border-t border-[#E3E8F0] bg-white px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(23,43,77,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative w-full max-w-[520px]">
            <Canvas width={520} height={340}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Visual run={run} />
                </motion.div>
              </AnimatePresence>
            </Canvas>
          </div>
        </div>
      </div>
    </Section>
  );
}
