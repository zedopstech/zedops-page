import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  estimationAiSoon,
  estimationComparison,
  estimationFeatures,
  estimationSources,
  estimationWorkflow,
} from "@/data/estimationPage";
import { ModuleCapabilities, ModuleClosingCta, ModuleComparison, ModuleConnected, ModuleHero } from "@/components/module/ModuleSections";
import {
  Container,
  CornerTicks,
  DotGrid,
  Highlight,
  SplitHeader,
} from "@/components/design-system/primitives";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

const phases = [
  {
    label: "Define scope",
    title: "Start with a clear scope.",
    body: "Create an estimate from a template, structure the WBS, and keep the scope legible before pricing begins.",
    detail: "Estimate setup · Work breakdown structure",
    steps: estimationWorkflow.slice(0, 2),
  },
  {
    label: "Build costs",
    title: "Turn quantities into a priced BOQ.",
    body: "Work through takeoff and quantities, then apply material, labour, equipment, and subcontractor rates.",
    detail: "Takeoff · Rates · Cost build-up",
    steps: estimationWorkflow.slice(2, 4),
  },
  {
    label: "Review & approve",
    title: "Check the estimate before it leaves your team.",
    body: "Review cost breakdowns and scenarios, then move the estimate through internal checks and approvals.",
    detail: "Analysis · Internal review",
    steps: estimationWorkflow.slice(4, 6),
  },
  {
    label: "Submit & hand over",
    title: "Keep the bid connected to delivery.",
    body: "Prepare the submission, record the result, and carry the approved estimate into the wider project workflow.",
    detail: "Submission · Bid result · Project handover",
    steps: estimationWorkflow.slice(6, 8),
  },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Crop/zoom shared by the screenshot and its outline markers so the markers stay on target. */
const shotCrop = "absolute left-0 top-0 w-[200%] -translate-y-[8.4%] sm:w-[max(110%,740px)] lg:w-[max(100%,1000px)]";

/** Dashed drafting outline on a region of the screenshot (percentages of the full 2000×1134 image). */
function ShotMarker({ n, box, markerRef }: { n: string; box: [number, number, number, number]; markerRef: RefObject<HTMLDivElement | null> }) {
  const [left, top, width, height] = box;
  return (
    <div
      ref={markerRef}
      aria-hidden
      className="absolute hidden rounded-lg border-[1.5px] border-dashed border-brand-orange bg-brand-orange/[0.04] lg:block"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
    >
      <span className="absolute -left-[1.5px] -top-[22px] rounded-t-[4px] bg-brand-orange px-1.5 py-1 font-mono text-[10px] font-bold leading-none text-white">{n}</span>
    </div>
  );
}

function ProductView({ markerRefs }: { markerRefs: [RefObject<HTMLDivElement | null>, RefObject<HTMLDivElement | null>] }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-[#E3E8F0] bg-white">
      {/* Browser chrome: window dots · address-bar breadcrumb · live indicator. */}
      <div className="flex h-10 items-center gap-3 border-b border-[#E3E8F0] bg-[linear-gradient(180deg,#FFFFFF_0%,#F6F8FB_100%)] px-3.5 sm:h-12 sm:gap-4 sm:px-5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full border border-[#D5DCE7] bg-[#EDF0F5]" />
          ))}
        </span>
        <div className="mx-auto flex h-7 min-w-0 max-w-[420px] flex-1 items-center justify-center gap-1.5 rounded-md border border-[#E3E8F0] bg-white px-3 text-[11.5px] shadow-[0_1px_2px_rgba(23,43,77,0.05)] sm:text-[12px]">
          <Lock size={11} strokeWidth={2.2} className="shrink-0 text-[#8C97AB]" aria-hidden />
          <span className="font-semibold text-brand-navy">ZedOps</span>
          <ChevronRight size={12} className="shrink-0 text-[#B8C2D0]" aria-hidden />
          <span className="truncate font-medium text-[#5E6C84]">Estimation workspace</span>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B778C] sm:flex">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-orange/50 motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-brand-orange" />
          </span>
          Live
        </span>
      </div>
      <div className="relative h-[245px] overflow-hidden bg-[#F4F6FA] sm:h-[380px] lg:h-[510px]">
        <div className={shotCrop}>
          <img
            src="/screenshots/estimation-dashboard-new.png"
            alt="Illustrative Estimation dashboard with pipeline value, awarded and overdue offers, status distribution, and estimations created over time"
            className="block h-auto w-full"
          />
          <ShotMarker n="01" box={[6.2, 25.7, 17.8, 17.3]} markerRef={markerRefs[0]} />
          <ShotMarker n="02" box={[53.1, 46.2, 45.4, 43.2]} markerRef={markerRefs[1]} />
        </div>
      </div>
    </div>
  );
}

type Line = { x1: number; y1: number; x2: number; y2: number };

/**
 * H1 · Drawing sheet: the product view mounted on a white mat with crop marks, a dimension line,
 * a title block, and numbered callouts whose leader lines are measured from the DOM (lg+ only).
 */
function HeroSheet() {
  const stageRef = useRef<HTMLDivElement>(null);
  const marker1 = useRef<HTMLDivElement>(null);
  const marker2 = useRef<HTMLDivElement>(null);
  const callout1 = useRef<HTMLDivElement>(null);
  const callout2 = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const s = stage.getBoundingClientRect();
      const m1 = marker1.current?.getBoundingClientRect();
      const m2 = marker2.current?.getBoundingClientRect();
      const c1 = callout1.current?.getBoundingClientRect();
      const c2 = callout2.current?.getBoundingClientRect();
      if (!m1 || !m2 || !c1 || !c2 || m1.width === 0 || c1.width === 0) {
        setLines([]);
        return;
      }
      setLines([
        // 01: from the callout's top edge up to the Pipeline card's bottom edge.
        { x1: c1.left + c1.width * 0.5 - s.left, y1: c1.top - s.top, x2: m1.left + m1.width * 0.35 - s.left, y2: m1.bottom - s.top },
        // 02: from the callout's bottom edge down to the trend chart's top edge.
        { x1: c2.left + c2.width * 0.5 - s.left, y1: c2.bottom - s.top, x2: m2.left + m2.width * 0.72 - s.left, y2: m2.top - s.top },
      ]);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    const img = stage.querySelector("img");
    img?.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      img?.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto max-w-[1110px] pt-9">
      {/* Dimension line */}
      <div className="absolute inset-x-0 top-0 flex h-5 items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C97AB]" aria-hidden>
        <span className="absolute left-0 top-1 h-3 w-px bg-[#A8B8CC]" />
        <span className="h-px flex-1 bg-[#A8B8CC]" />
        <span className="shrink-0">Estimation workspace · live project view</span>
        <span className="h-px flex-1 bg-[#A8B8CC]" />
        <span className="absolute right-0 top-1 h-3 w-px bg-[#A8B8CC]" />
      </div>

      {/* Sheet */}
      <div className="relative rounded-[10px] border border-[#CFD9E6] bg-white p-2.5 shadow-[0_40px_80px_-40px_rgba(23,43,77,0.45)] sm:p-3.5">
        <CornerTicks />
        <ProductView markerRefs={[marker1, marker2]} />
        {/* Title block */}
        <div className="absolute bottom-2.5 right-2.5 z-10 flex border border-brand-navy bg-white font-mono text-[9.5px] font-semibold uppercase leading-none tracking-[0.1em] text-brand-navy sm:bottom-3.5 sm:right-3.5 sm:text-[10px]">
          <span className="bg-brand-navy px-2.5 py-2 text-white">E-01</span>
          <span className="hidden border-l border-brand-navy px-2.5 py-2 sm:block">Estimation dashboard</span>
          <span className="border-l border-brand-navy px-2.5 py-2">Rev <b className="font-bold text-brand-orange">B</b></span>
        </div>
      </div>

      {/* Leader lines (measured) */}
      {lines.length ? (
        <svg className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block" aria-hidden>
          {lines.map((l, i) => (
            <g key={i}>
              <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#FE5D02" strokeWidth={1.5} />
              <circle cx={l.x1} cy={l.y1} r={3} fill="#FE5D02" />
              <circle cx={l.x2} cy={l.y2} r={3.5} fill="#fff" stroke="#FE5D02" strokeWidth={1.5} />
            </g>
          ))}
        </svg>
      ) : null}

      {/* Callouts */}
      <div ref={callout1} className="absolute -left-10 top-[58%] z-30 hidden w-[250px] items-start gap-2.5 rounded-xl border border-[#DCE3EE] bg-white p-4 shadow-[0_18px_36px_-18px_rgba(12,31,63,0.45)] lg:flex">
        <span className="rounded-[4px] bg-brand-orange px-1.5 py-1 font-mono text-[11px] font-bold leading-none text-white">01</span>
        <div>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8C97AB]">ESTIMATE INPUT</span>
          <p className="mt-1.5 text-[15px] font-semibold text-brand-navy">Scope, quantities, rates.</p>
          <p className="mt-1 text-[12px] leading-snug text-[#6B778C]">The detail behind every price stays visible.</p>
        </div>
      </div>
      <div ref={callout2} className="absolute -right-10 top-[17%] z-30 hidden w-[230px] items-start gap-2.5 rounded-xl border border-[#DCE3EE] bg-white p-4 shadow-[0_18px_36px_-18px_rgba(12,31,63,0.45)] lg:flex">
        <span className="rounded-[4px] bg-brand-orange px-1.5 py-1 font-mono text-[11px] font-bold leading-none text-white">02</span>
        <div>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8C97AB]">CONNECTED HANDOVER</span>
          <div className="mt-2 flex items-center gap-2 text-[12.5px] font-medium text-brand-navy"><Check size={14} strokeWidth={2.4} className="text-brand-orange" aria-hidden /> Estimate to execution</div>
          <div className="mt-1.5 flex items-center gap-2 text-[12.5px] font-medium text-brand-navy"><Check size={14} strokeWidth={2.4} className="text-brand-orange" aria-hidden /> One project context</div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  C1 · Capability vignettes (illustrative product slices, figures are fake)  */
/* -------------------------------------------------------------------------- */

const th = "border-b border-[#E3E8F0] bg-[#FBFCFE] px-2.5 py-2 text-left font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#8C97AB]";
const td = "whitespace-nowrap border-b border-[#EDF0F5] px-2.5 py-2 text-[#3D4F6E]";

function VignetteTable({ head, rows, right, total, mobileHidden = [] }: { head: string[]; rows: ReactNode[][]; right: number[]; total?: ReactNode[]; mobileHidden?: number[] }) {
  const hide = (i: number) => (mobileHidden.includes(i) ? "hidden sm:table-cell" : "");
  return (
    <div className="overflow-x-auto rounded-lg border border-[#E3E8F0] bg-white shadow-[0_10px_24px_-18px_rgba(23,43,77,0.35)]">
      <table className="w-full border-collapse text-[12px] tabular-nums">
        <thead>
          <tr>{head.map((h, i) => <th key={h} className={`${th} ${right.includes(i) ? "!text-right" : ""} ${hide(i)}`}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="transition-colors hover:bg-[#FFF8F3]">
              {r.map((c, i) => <td key={i} className={`${td} ${right.includes(i) ? "text-right" : ""} ${hide(i)}`}>{c}</td>)}
            </tr>
          ))}
          {total ? (
            <tr className="bg-[#FFF8F3]">
              {total.map((c, i) => <td key={i} className={`whitespace-nowrap px-2.5 py-2 font-bold text-brand-navy ${right.includes(i) ? "text-right" : ""} ${hide(i)}`}>{c}</td>)}
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

const code = (c: string) => <span className="font-mono text-[11px] text-[#6B778C]">{c}</span>;

function BoqVignette() {
  return (
    <VignetteTable
      head={["Code", "Item", "Qty", "Rate", "Amount"]}
      right={[2, 3, 4]}
      mobileHidden={[2, 3]}
      rows={[
        [code("23 31 13"), "GI ductwork, 0.8 mm", "1,240 m²", "42.50", "52,700.00"],
        [code("22 11 16"), "Copper pipe, 15 mm", "860 m", "11.80", "10,148.00"],
        [code("26 05 19"), "LV cable, 4C × 16 mm²", "2,150 m", "9.35", "20,102.50"],
      ]}
      total={["", "Section total", "", "", "82,950.50"]}
    />
  );
}

function RateVignette() {
  const up = (v: string) => <span className="font-medium text-brand-orange">{v}</span>;
  return (
    <VignetteTable
      head={["Resource", "Unit", "Base", "Index"]}
      right={[2, 3]}
      mobileHidden={[1]}
      rows={[
        ["Pipefitter, labour", "hr", "38.00", up("+3.2%")],
        ["Scissor lift, 8 m", "day", "145.00", up("+1.5%")],
        ["Insulation, subcontract", "m²", "9.40", up("+4.0%")],
        ["Cable tray, 300 mm", "m", "18.60", up("+2.1%")],
      ]}
    />
  );
}

function TakeoffVignette() {
  return (
    <div className="flex h-[130px] items-center justify-center rounded-lg border border-[#E3E8F0] bg-white">
    <svg viewBox="0 10 260 110" className="h-[112px] w-auto max-w-full" aria-hidden>
      <g stroke="#DCE3ED" strokeWidth="1" fill="none">
        <path d="M20 20h220M20 110h220M20 20v90M240 20v90M90 20v90M170 20v55" />
      </g>
      <path d="M40 95 L40 40 L150 40 L150 70 L215 70" fill="none" stroke="#FE5D02" strokeWidth="2.5" strokeLinejoin="round" />
      <g fill="#FE5D02">
        {[[40, 95], [40, 40], [150, 40], [150, 70], [215, 70]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}
      </g>
      <rect x="160" y="84" width="74" height="20" rx="3" fill="#172B4D" />
      <text x="197" y="98" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#fff">42.6 m</text>
    </svg>
    </div>
  );
}

function CostSplitVignette() {
  const rows = [
    { label: "Material", pct: 46, color: "bg-brand-navy" },
    { label: "Labour", pct: 31, color: "bg-[#496B9D]" },
    { label: "Equipment", pct: 8, color: "bg-[#8FA7C8]" },
    { label: "Subcontract", pct: 15, color: "bg-brand-orange" },
  ];
  return (
    <div className="flex h-[130px] flex-col justify-center gap-2.5 rounded-lg border border-[#E3E8F0] bg-white px-4">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[78px_1fr_34px] items-center gap-2 text-[11px] text-[#6B778C]">
          <span>{r.label}</span>
          <span className="h-2 overflow-hidden rounded-sm bg-[#EDF0F5]">
            <span className={`block h-full rounded-sm ${r.color}`} style={{ width: `${Math.round((r.pct / 46) * 100)}%` }} />
          </span>
          <b className="text-right font-semibold tabular-nums text-brand-navy">{r.pct}%</b>
        </div>
      ))}
    </div>
  );
}

function BidVignette() {
  const states = ["Draft", "Review", "Approved", "Submitted", "Won"];
  return (
    <div className="flex h-[130px] flex-col justify-center rounded-lg border border-[#E3E8F0] bg-white px-4">
      <p className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[#8C97AB]">BID · TOWER B MEP PACKAGE</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {states.map((s) => (
          <span
            key={s}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
              s === "Submitted"
                ? "border-brand-navy bg-brand-navy text-white"
                : s === "Won"
                  ? "border-[#CDE8D9] bg-[#E8F5EE] text-[#1F7A4D]"
                  : "border-[#E3E8F0] bg-white text-[#6B778C]"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-[#6B778C]">Cover letter, bid form, 14 attachments</p>
    </div>
  );
}

function TrendVignette() {
  return (
    <div className="relative h-[150px] w-full">
    <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <g stroke="#E3E8F0">
        <path d="M0 30h400M0 70h400M0 110h400" />
      </g>
      <path d="M0 110 L50 96 L100 100 L150 78 L200 82 L250 60 L300 54 L350 40 L400 34 L400 140 L0 140Z" fill="rgba(23,43,77,0.07)" />
      <path d="M0 110 L50 96 L100 100 L150 78 L200 82 L250 60 L300 54 L350 40 L400 34" fill="none" stroke="#172B4D" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
    <span aria-hidden className="absolute right-0 top-[24.3%] h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-orange ring-4 ring-brand-orange/15" />
    </div>
  );
}

const vignettes = [BoqVignette, RateVignette, TakeoffVignette, CostSplitVignette, BidVignette, TrendVignette];

function CapabilitiesBento({ isMobile }: { isMobile: boolean }) {
  return <ModuleCapabilities
    isMobile={isMobile}
    heading={{ id: "estimation-capabilities", label: "Built for estimators", title: <>Everything needed to build a <Highlight>better bid.</Highlight></>, body: "A connected workspace for the details behind every estimate, from the first quantity to the final submission." }}
    features={estimationFeatures}
    renderVisual={(index) => {
      const Vignette = vignettes[index] ?? BoqVignette;
      return <Vignette />;
    }}
    formatBullet={(raw) => ({ text: raw === "Win rate analytics" ? "Bid status and results" : raw.replace(" (Coming Soon)", ""), badge: raw.includes("(Coming Soon)") ? "Soon" : undefined })}
  />;
}

/* -------------------------------------------------------------------------- */
/*  B2 · Workflow as a dimensioned ruler                                      */
/* -------------------------------------------------------------------------- */

function WorkflowRuler({ isMobile }: { isMobile: boolean }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const phase = phases[active] ?? phases[0];
  const allSteps = phases.flatMap((p, pi) => p.steps.map((s) => ({ ...s, phase: pi })));

  return (
    <section className="relative overflow-hidden bg-[#F8F9FD] py-20 lg:py-[108px]" aria-labelledby="estimation-process-title">
      <DotGrid className="opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative">
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="estimation-process-title"
            label="Estimation workflow"
            title={<>A clear path from <Highlight>scope to submission.</Highlight></>}
            body="Move the estimate through four practical phases. Each step keeps the next person working from the same context."
          />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 28, duration: 0.6, delay: 0.06 })} className="mt-16">
          {/* Dimension brackets: one per phase, spanning its two steps. */}
          <div role="tablist" aria-label="Estimation workflow phases" className="grid grid-cols-2 gap-x-3 gap-y-2 lg:grid-cols-4 lg:gap-0">
            {phases.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`estimation-phase-${index}`}
                  aria-selected={selected}
                  aria-controls="estimation-phase-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % phases.length;
                    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + phases.length) % phases.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = phases.length - 1;
                    else return;
                    event.preventDefault();
                    setActive(next);
                    document.getElementById(`estimation-phase-${next}`)?.focus();
                  }}
                  className={`group relative rounded-lg border px-3 py-2.5 text-left text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:text-[15px] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-2.5 lg:pb-5 lg:pt-2 lg:text-center ${
                    selected ? "border-brand-orange/40 bg-white text-brand-orange" : "border-[#E3E8F0] text-[#8C97AB] hover:text-brand-navy"
                  }`}
                >
                  <span className="mr-1.5 font-mono text-[11px]">{pad(index + 1)}</span>
                  {item.label}
                  <span aria-hidden className="absolute hidden lg:block left-[6px] right-3 bottom-[6px] h-px bg-current" />
                  <span aria-hidden className="absolute hidden lg:block bottom-px left-[6px] h-[11px] w-px bg-current" />
                  <span aria-hidden className="absolute hidden lg:block bottom-px right-3 h-[11px] w-px bg-current" />
                </button>
              );
            })}
          </div>

          {/* Ruler: eight steps on a navy baseline. */}
          <ol className="mt-8 grid grid-cols-2 gap-y-7 lg:mt-1 lg:grid-cols-8 lg:gap-y-0">
            {allSteps.map((step, index) => {
              const on = step.phase === active;
              return (
                <li
                  key={step.title}
                  className={`relative border-t-2 border-brand-navy pr-3 pt-6 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-45"}`}
                >
                  <span
                    aria-hidden
                    className={`absolute -top-[7px] left-0 h-3 w-3 rotate-45 border-2 transition-colors duration-300 ${
                      on ? "border-brand-orange bg-brand-orange" : "border-brand-navy bg-[#F8F9FD]"
                    }`}
                  />
                  <span className="font-mono text-[11px] font-semibold text-[#6B778C]">{pad(index + 1)}</span>
                  <p className="mt-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-brand-navy">{step.title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-[#6B778C]">{step.description}</p>
                </li>
              );
            })}
          </ol>

          <motion.div
            key={active}
            id="estimation-phase-panel"
            role="tabpanel"
            aria-labelledby={`estimation-phase-${active}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid gap-5 border-t border-[#DCE3ED] pt-8 lg:grid-cols-2 lg:gap-12"
          >
            <h3 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.035em] text-brand-navy sm:text-[30px]">{phase.title}</h3>
            <div>
              <p className="max-w-xl text-[16px] leading-[1.65] text-[#3D4F6E]">{phase.body}</p>
              <p className="mt-4 font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B778C]">{phase.detail}</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  B3 · Comparison as two sheets with a revision stamp                       */
/* -------------------------------------------------------------------------- */

function ComparisonSheets({ isMobile }: { isMobile: boolean }) {
  const improved = estimationComparison.withZedops.map((better, index) => ({
    title: index === 0 ? "Drawings, takeoff, and quantity checks in one estimating flow" : index === 4 ? "Rate libraries, cost analysis, and clearer review context" : better.title,
    description: index === 0 ? "Review quantities against drawings and scope" : index === 4 ? "Use shared rates and cost breakdowns during review" : better.description,
  }));
  return <ModuleComparison
    isMobile={isMobile}
    heading={{ id: "estimation-comparison-title", label: "Before and after", title: <>Less rework between the <Highlight>bid and the build.</Highlight></>, body: "Bring scattered estimating work into a process the project team can follow." }}
    before={estimationComparison.traditional}
    after={improved}
    beforeLabel="Fragmented workflow"
    beforeStamp="Rev A"
    afterStamp="Rev B · Approved"
  />;
}

/* -------------------------------------------------------------------------- */
/*  A4 · Connected record + module grid, with the B4 Zed AI roadmap line      */
/* -------------------------------------------------------------------------- */

const moduleTags = ["Budget", "Procurement", "Plan", "Site", "Tasks", "Reports"];
const recordRows = [
  ["Scope & WBS", "locked"],
  ["Quantities", "validated"],
  ["Rates & cost build-up", "approved"],
] as const;

function ConnectedSection({ isMobile }: { isMobile: boolean }) {
  const modules = estimationSources.filter((source) => !source.current).map((source, index) => ({ ...source, category: moduleTags[index] ?? "Connected" }));
  return <ModuleConnected
    isMobile={isMobile}
    heading={{ id: "estimation-connected-title", label: "Connected across ZedOps", title: <>The approved estimate becomes <Highlight>project context.</Highlight></>, body: "Keep budget, procurement, planning, and execution aligned with the scope and costs the team approved." }}
    sourceTitle="Approved estimate"
    sourceBody="Scope, quantities, rates, and review decisions ready for the project team."
    sourceRows={recordRows.map(([label, status]) => ({ label, status }))}
    modules={modules}
    roadmapLabel="Zed AI for estimation"
    roadmapBody="Ideas on the roadmap for reviewing rates, spotting gaps, and understanding bid risk."
    roadmapItems={estimationAiSoon}
  />;
}

/* -------------------------------------------------------------------------- */
/*  B5 · Closing CTA with a hazard-tape edge                                  */
/* -------------------------------------------------------------------------- */

function ClosingCta({ isMobile }: { isMobile: boolean }) {
  return <ModuleClosingCta
    isMobile={isMobile}
    id="estimation-cta-title"
    label="See it with your own workflow"
    title={<>Price with confidence. <Highlight>Build from the same plan.</Highlight></>}
    body="Walk through your scope, rate structure, review steps, and the handover to the project team."
  />;
}

export default function EstimationLanding(_props: { prev: NavModule | null; next: NavModule | null }) {
  const isMobile = useIsMobile();
  return <>
    <ModuleHero
      isMobile={isMobile}
      eyebrow="Estimation & proposals"
      title={<>Build estimates with <Highlight>clarity.</Highlight><span className="block text-brand-navy/65">Carry them into delivery.</span></>}
      body="Bring scope, quantities, rates, review, and proposals into one estimating workflow. Keep the approved cost plan connected to the project that follows."
      product={<HeroSheet />}
      capabilitiesId="estimation-capabilities"
    />
    <CapabilitiesBento isMobile={isMobile} />
    <WorkflowRuler isMobile={isMobile} />
    <ComparisonSheets isMobile={isMobile} />
    <ConnectedSection isMobile={isMobile} />
    <ClosingCta isMobile={isMobile} />
  </>;
}
