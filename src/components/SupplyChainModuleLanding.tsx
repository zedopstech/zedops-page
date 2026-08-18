import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Eye,
  FileCheck2,
  IndianRupee,
  LineChart,
  Link2,
  MapPin,
  PackageCheck,
  PieChart,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UserCheck,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";        
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  supplyChainAiSoon,
  supplyChainConsumptionFlow,
  supplyChainConsumptionFooter,
  supplyChainCta,
  supplyChainHero,
  supplyChainHeroHighlights,
  supplyChainInsights,
  supplyChainInventoryMetric,
  supplyChainInventorySources,
  supplyChainInventoryStatuses,
  supplyChainModules,
  supplyChainReports,
  supplyChainTraditional,
  supplyChainWithZedops,
  supplyChainWhy,
  supplyChainWorkflowLoop,
  supplyChainWorkflowBenefits,
  supplyChainWorkflowStages,
  type InventoryChipTone,
  type SupplyChainWorkflowStage,
  type WorkflowBenefitTone,
  type WorkflowNode,
  type WorkflowStageTone,
} from "@/data/supplyChainPage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

const inventoryChip: Record<InventoryChipTone, { wash: string; icon: string }> = {
  green: { wash: "bg-[#E3FCEF]", icon: "text-[#006644]" },
  blue: { wash: "bg-[#DEEBFF]", icon: "text-[#0052CC]" },
  purple: { wash: "bg-[#EAE6FF]", icon: "text-[#6554C0]" },
  orange: { wash: "bg-brand-orange/10", icon: "text-brand-orange" },
  rose: { wash: "bg-[#FFEBE6]", icon: "text-[#BF2600]" },
  gray: { wash: "bg-[#F4F5F7]", icon: "text-[#6B778C]" },
};

const workflowBenefitTone: Record<WorkflowBenefitTone, { wash: string; icon: string }> = {
  orange: { wash: "bg-brand-orange/10", icon: "text-brand-orange" },
  teal: { wash: "bg-[#E3FCEF]", icon: "text-[#006644]" },
  blue: { wash: "bg-[#DEEBFF]", icon: "text-[#0052CC]" },
  purple: { wash: "bg-[#EAE6FF]", icon: "text-[#6554C0]" },
};

function CardDotPattern({ color }: { color: string }) {
  return (
    <div
      className="pointer-events-none absolute right-4 bottom-4 h-20 w-20 opacity-35"
      style={{
        backgroundImage: `radial-gradient(${color} 1.25px, transparent 1.25px)`,
        backgroundSize: "7px 7px",
      }}
      aria-hidden
    />
  );
}

function InventorySpokes({
  items,
  side,
}: {
  items: { icon: LucideIcon; label: string; tone: InventoryChipTone }[];
  side: "left" | "right";
}) {
  return (
    <ul className="flex h-full flex-col justify-between gap-2.5 py-1">
      {items.map((item) => {
        const Icon = item.icon;
        const chip = inventoryChip[item.tone];
        return (
          <li
            key={item.label}
            className={`flex min-w-0 items-center gap-0.5 ${side === "left" ? "flex-row-reverse" : ""}`}
          >
            <span className="flex shrink-0 items-center text-[#B3BAC5]" aria-hidden>
              {side === "left" ? (
                <>
                  <span className="w-3 border-t border-dashed border-[#B3BAC5] sm:w-5" />
                  <ArrowRight size={9} strokeWidth={2} />
                </>
              ) : (
                <>
                  <ArrowRight size={9} className="rotate-180" strokeWidth={2} />
                  <span className="w-3 border-t border-dashed border-[#B3BAC5] sm:w-5" />
                </>
              )}
            </span>
            <span className={`flex min-w-0 items-center gap-1.5 ${side === "left" ? "flex-row-reverse text-right" : ""}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${chip.wash}`}>
                <Icon size={13} className={chip.icon} aria-hidden />
              </span>
              <p className="min-w-0 text-[10px] font-semibold leading-snug text-[#42526E] sm:text-[11px]">{item.label}</p>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function InventoryMetricCard() {
  return (
    <div className="relative z-10 min-h-[260px] rounded-xl border border-gray-200/90 bg-white px-5 py-6 text-center shadow-[0_20px_44px_-14px_rgba(23,43,77,0.28)]">
      <span className="inline-flex rounded-full bg-[#22A06B] px-3 py-1 text-[9px] font-bold tracking-[0.14em] text-white uppercase">
        {supplyChainInventoryMetric.title}
      </span>

      <p className="mt-5 text-[30px] font-black leading-none text-brand-navy">
        {supplyChainInventoryMetric.items}
      </p>

      <p className="mt-2 text-sm font-medium text-[#6B778C]">
        {supplyChainInventoryMetric.itemsLabel}
      </p>

      <span
        className="mx-auto my-5 block h-px w-[78%] bg-gray-200"
        aria-hidden
      />

      <p className="text-[23px] font-black leading-none text-brand-navy">
        {supplyChainInventoryMetric.value}
      </p>

      <p className="mt-2 text-sm font-medium text-[#6B778C]">
        {supplyChainInventoryMetric.valueLabel}
      </p>
    </div>
  );
}

const stageShell: Record<WorkflowStageTone, { wrap: string; badge: string; icon: string; title: string; wash: string; border: string }> = {
  teal: { wrap: "bg-[#E7F8F4]", badge: "bg-[#0D9488]", icon: "text-[#0D9488]", title: "text-[#0F766E]", wash: "bg-[#CCFBF1]", border: "border-[#0D9488]" },
  orange: { wrap: "bg-[#FFF1E8]", badge: "bg-brand-orange", icon: "text-brand-orange", title: "text-brand-orange", wash: "bg-[#FFE4D1]", border: "border-brand-orange" },
  blue: { wrap: "bg-[#EAF1FF]", badge: "bg-[#2563EB]", icon: "text-[#2563EB]", title: "text-[#1D4ED8]", wash: "bg-[#DBEAFE]", border: "border-[#2563EB]" },
  purple: { wrap: "bg-[#F1ECFF]", badge: "bg-[#7C3AED]", icon: "text-[#7C3AED]", title: "text-[#6D28D9]", wash: "bg-[#EDE9FE]", border: "border-[#7C3AED]" },
  amber: { wrap: "bg-[#FFF6E5]", badge: "bg-[#B45309]", icon: "text-[#B45309]", title: "text-[#92400E]", wash: "bg-[#FEF3C7]", border: "border-[#B45309]" },
};

function ChartNode({
  icon: Icon,
  label,
  tone,
  compact = false,
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  tone: WorkflowStageTone;
  compact?: boolean;
  className?: string;
}) {
  const t = stageShell[tone];
  return (
    <div
      className={`flex min-w-0 items-center rounded-md border border-gray-200 bg-white shadow-[0_2px_8px_-6px_rgba(23,43,77,0.25)] ${
        compact ? "gap-1 px-1.5 py-2" : "gap-2 px-2.5 py-2"
      } ${className}`}
    >
      <span className={`flex shrink-0 items-center justify-center rounded ${compact ? "h-5 w-5" : "h-6 w-6"} ${t.wash}`}>
        <Icon size={compact ? 12 : 13} className={t.icon} aria-hidden />
      </span>
      <p
        className={`min-w-0 text-left font-bold leading-snug break-words text-brand-navy ${
          compact ? "text-[10px]" : "text-sm"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function ArrowDown({ color = "#334155" }: { color?: string }) {
  return (
    <div className="flex flex-col items-center py-0.5" aria-hidden>
      <span className="h-2 w-px" style={{ backgroundColor: color }} />
      <span className="h-0 w-0 border-x-[3px] border-t-[5px] border-x-transparent" style={{ borderTopColor: color }} />
    </div>
  );
}

function WorkflowArrow() {
  return (
    <span
      className="pointer-events-none absolute top-5 -right-3 z-10 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm ring-1 ring-gray-200 xl:flex"
      aria-hidden
    >
      <ArrowRight size={12} />
    </span>
  );
}

function VChain({
  steps,
  tone,
  compact = false,
}: {
  steps: WorkflowNode[];
  tone: WorkflowStageTone;
  compact?: boolean;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col">
      {steps.map((step, i) => (
        <div key={step.label} className="flex min-w-0 flex-col">
          {i > 0 ? <ArrowDown /> : null}
          <ChartNode icon={step.icon} label={step.label} tone={tone} compact={compact} className="w-full" />
        </div>
      ))}
    </div>
  );
}

function Float({
  children,
  duration,
  delay = 0,
  amplitude = 3,
  className = "",
}: {
  children: ReactNode;
  duration: number;
  delay?: number;
  amplitude?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

function StageLane({
  n,
  title,
  blurb,
  tone,
  showNextArrow,
  children,
}: {
  n: number;
  title: string;
  blurb: string;
  tone: WorkflowStageTone;
  showNextArrow?: boolean;
  children: ReactNode;
}) {
  const t = stageShell[tone];
  return (
    <div
      className="relative flex min-w-0 flex-col border border-gray-200/90 bg-white p-3 shadow-[0_18px_50px_-20px_rgba(23,43,77,0.22)]"
      style={{ borderRadius: 10 }}
    >
      {showNextArrow ? (
        <span className="absolute top-5 -right-3 z-10 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm ring-1 ring-gray-200 xl:flex" aria-hidden>
          <ArrowRight size={12} />
        </span>
      ) : null}
      <div className="mb-2.5 flex flex-col items-center text-center">
        <span className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${t.badge}`}>
          {String(n).padStart(2, "0")}
        </span>
        <h3 className={`text-xs font-extrabold leading-snug tracking-[0.04em] uppercase ${t.title}`}>{title}</h3>
        <p className="mt-0.5 max-w-[16rem] text-[10px] leading-snug text-[#6B778C]">{blurb}</p>
      </div>
      <div className="flex min-w-0 flex-col">{children}</div>
    </div>
  );
}

type WorkflowVisualStep = {
  // n: number;
  title: string;
  lines: [string, string];
  color: string;
  icon: LucideIcon;
  source: SupplyChainWorkflowStage;
  floatDelay: number;
  floatDuration: number;
};

const workflowVisualSteps: WorkflowVisualStep[] = [
  {
    // n: 1,
    title: "Request",
    lines: ["Site / Project", "Material Request"],
    color: "#2563EB",
    icon: ClipboardList,
    source: supplyChainWorkflowStages[0]!,
    floatDelay: 0,
    floatDuration: 3.4,
  },
  {
    // n: 2,
    title: "Check Stock",
    lines: ["Check Availability", "Across Locations"],
    color: "#25823B",
    icon: Warehouse,
    source: supplyChainWorkflowStages[1]!,
    floatDelay: 0.15,
    floatDuration: 3.1,
  },
  {
    // n: 3,
    title: "Transfer or Procure",
    lines: ["Transfer Stock", "or Create PR"],
    color: "#F97316",
    icon: ArrowLeftRight,
    source: supplyChainWorkflowStages[1]!,
    floatDelay: 0.28,
    floatDuration: 3.6,
  },
  {
    // n: 4,
    title: "Approve & Procure",
    lines: ["RFQ, Compare,", "Select Vendor & PO"],
    color: "#2563EB",
    icon: ShoppingCart,
    source: supplyChainWorkflowStages[2]!,
    floatDelay: 0.4,
    floatDuration: 3.2,
  },
  {
    // n: 5,
    title: "Delivery",
    lines: ["Track Delivery", "in Real Time"],
    color: "#5934B8",
    icon: Truck,
    source: supplyChainWorkflowStages[3]!,
    floatDelay: 0.52,
    floatDuration: 2.9,
  },
  {
    // n: 6,
    title: "Receive & Issue",
    lines: ["GRN & Issue", "to Site"],
    color: "#13899C",
    icon: PackageCheck,
    source: supplyChainWorkflowStages[4]!,
    floatDelay: 0.64,
    floatDuration: 3.3,
  },
  {
    // n: 7,
    title: "Track & Close",
    lines: ["Update Inventory", "& Close Request"],
    color: "#15804A",
    icon: FileCheck2,
    source: supplyChainWorkflowStages[4]!,
    floatDelay: 0.76,
    floatDuration: 3.15,
  },
];

const workflowBenefitVisual: { icon: LucideIcon; title: string; blurb: string }[] = [
  { icon: Eye, title: "Complete Visibility", blurb: supplyChainWorkflowBenefits[1]?.blurb ?? "Track every step in real time." },
  { icon: Clock3, title: "Faster Turnaround", blurb: supplyChainWorkflowBenefits[3]?.blurb ?? "Get real-time insights and act quickly." },
  { icon: ShieldCheck, title: "Better Control", blurb: supplyChainWorkflowBenefits[2]?.blurb ?? "Maintain accuracy and accountability." },
  { icon: IndianRupee, title: "Lower Costs", blurb: "Reduce waste, overstock, and emergency buys." },
  { icon: BarChart3, title: "Data-Driven Decisions", blurb: supplyChainWorkflowBenefits[4]?.blurb ?? "Improve efficiency across projects." },
];

const workflowEntities: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "Site", icon: Building2, color: "#2563EB" },
  { label: "Warehouse", icon: Warehouse, color: "#25823B" },
  { label: "Approvals", icon: UserCheck, color: "#F97316" },
  { label: "Vendors", icon: Truck, color: "#5934B8" },
  { label: "Delivery", icon: MapPin, color: "#13899C" },
  { label: "Inventory", icon: Boxes, color: "#15804A" },
  { label: "Site", icon: Building2, color: "#2563EB" },
];

function WorkflowCircle({ step }: { step: WorkflowVisualStep }) {
  const Icon = step.icon;
  return (
    <div className="flex min-w-0 flex-col items-center text-center" title={step.source.title}>
      <div className="relative">
        <div
          className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-16px_rgba(23,43,77,0.45)]"
          style={{ border: `1.5px solid ${step.color}55` }}
        >
          <Icon size={34} strokeWidth={1.55} style={{ color: step.color }} aria-hidden />
        </div>
      </div>
      <p className="mt-3 max-w-[7.5rem] text-[11px] font-extrabold tracking-[0.08em] text-balance uppercase" style={{ color: step.color }}>
        {step.title}
      </p>
      <span className="mt-1 block h-px w-8" style={{ backgroundColor: step.color }} aria-hidden />
      <p className="mt-1.5 text-[11px] leading-snug text-[#5A6578]">
        {step.lines[0]}
        <br />
        {step.lines[1]}
      </p>
    </div>
  );
}

function WorkflowLineArrow() {
  return (
    <span className="text-[#94A3B8]" aria-hidden>
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        <path d="M0 6H22" stroke="currentColor" strokeWidth="1.25" />
        <path d="M18 2L25 6L18 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function WorkflowEntityNode({ label, icon: Icon, color }: { label: string; icon: LucideIcon; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_12px_28px_-14px_rgba(23,43,77,0.45)]"
        style={{ border: `1.5px solid ${color}55` }}
      >
        <Icon size={26} strokeWidth={1.7} style={{ color }} aria-hidden />
      </div>
      <p className="text-[10px] font-extrabold tracking-[0.12em] uppercase" style={{ color }}>
        {label}
      </p>
    </div>
  );
}

function WorkflowPhone() {
  const rows = ["Requested", "Approved", "PO Created", "In Transit", "GRN Received", "Issued to Site", "Closed"];
  return (
    <div className="flex min-h-[320px] w-[148px] flex-col rounded-[1.6rem] border-[5px] border-[#1B2433] bg-white p-3.5 shadow-[0_18px_40px_-18px_rgba(23,43,77,0.55)] sm:min-h-[360px] sm:w-[168px]">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#D0D5DD]" aria-hidden />
      <p className="text-[10px] font-bold tracking-wide text-[#6B778C] uppercase">Material Request</p>
      <p className="text-[13px] font-extrabold text-brand-navy">MR-1258</p>
      <ul className="mt-3 flex flex-1 flex-col justify-between space-y-2.5 pb-1">
        {rows.map((row) => (
          <li key={row} className="flex items-center justify-between gap-2 text-[10px] font-semibold text-[#42526E]">
            {row}
            <CheckCircle2 size={13} className="shrink-0 text-[#22A06B]" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkflowDashboard() {
  const kpis = [
    { label: "Total Requests", value: "1286" },
    { label: "Pending Approvals", value: "156" },
    { label: "In Transit", value: "84" },
    { label: "On-Time Delivery", value: "92%" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="overflow-hidden rounded-xl border border-[#D5DCE8] bg-[#F4F7FB] shadow-[0_28px_60px_-30px_rgba(23,43,77,0.5)]">
        <div className="flex h-8 items-center gap-1.5 border-b border-[#E5EAF1] bg-white px-3">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2 flex h-4 flex-1 items-center rounded bg-[#EEF2F7] px-2 text-[9px] text-[#97A0AF]">
            zedops.app / materials
          </span>
        </div>
        <div className="grid min-h-[300px] grid-cols-[56px_minmax(0,1fr)] sm:min-h-[340px]">
          <div className="flex flex-col items-center gap-4 bg-brand-navy py-5">
            <span className="h-6 w-6 rounded-md bg-brand-orange/90" />
            <span className="h-5 w-5 rounded bg-white/20" />
            <span className="h-5 w-5 rounded bg-white/20" />
            <span className="h-5 w-5 rounded bg-white/20" />
            <span className="mt-auto h-5 w-5 rounded-full bg-white/25" />
          </div>
          <div className="flex min-h-0 flex-col p-4 sm:p-5">
            <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-lg border border-[#E6EBF3] bg-white px-2.5 py-3">
                  <p className="text-[8px] font-bold tracking-wide text-[#97A0AF] uppercase">{kpi.label}</p>
                  <p className="mt-1 text-base font-black text-brand-navy">{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="grid min-h-0 flex-1 gap-2.5 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col rounded-lg border border-[#E6EBF3] bg-white p-3">
                <p className="text-[10px] font-bold text-brand-navy">Material Overview</p>
                <div className="mt-3 flex flex-1 items-center gap-3">
                  <span className="relative h-[4.5rem] w-[4.5rem] shrink-0 rounded-full" style={{ background: "conic-gradient(#2563EB 0 42%, #F97316 42% 68%, #22A06B 68% 100%)" }}>
                    <span className="absolute inset-[7px] rounded-full bg-white" />
                  </span>
                  <div className="space-y-1.5 text-[9px] font-semibold text-[#6B778C]">
                    <p>In stock 42%</p>
                    <p>In transit 26%</p>
                    <p>Issued 32%</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-[#E6EBF3] bg-white p-3">
                <p className="text-[10px] font-bold text-brand-navy">Delivery Performance</p>
                <svg viewBox="0 0 180 64" className="mt-3 h-20 w-full flex-1" aria-hidden>
                  <path d="M4 48 C28 44, 36 20, 58 28 S90 54, 112 30 S150 12, 176 18" fill="none" stroke="#2563EB" strokeWidth="2.2" />
                  <path d="M4 52 H176" stroke="#E6EBF3" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[92%] rounded-b-xl bg-[#C9D2E0]" aria-hidden />
      <div className="mx-auto h-2 w-[68%] rounded-b-md bg-[#B7C1D1]" aria-hidden />
      <div className="absolute top-[14%] -right-4 z-10 sm:-right-12">
        <WorkflowPhone />
      </div>
    </div>
  );
}

function WorkflowEcosystem() {
  const nodes = [
    {
      ...workflowEntities[0]!,
      left: "8%",
      top: "18%",
    },
    {
      ...workflowEntities[1]!,
      left: "15%",
      top: "51%",
    },
    {
      ...workflowEntities[2]!,
      left: "30%",
      top: "83%",
    },
    {
      ...workflowEntities[3]!,
      left: "50%",
      top: "88%",
    },
    {
      ...workflowEntities[4]!,
      left: "70%",
      top: "83%",
    },
    {
      ...workflowEntities[5]!,
      left: "85%",
      top: "51%",
    },
    {
      ...workflowEntities[6]!,
      left: "92%",
      top: "18%",
    },
  ];

  const dash = {
    fill: "none" as const,
    strokeDasharray: "2.5 5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeOpacity: 0.85,
  };

  return (
    <div className="relative h-[540px]">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1200 540"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/*
          7-col rail centers: 86, 257, 429, 600, 771, 943, 1114
          Nodes: SITE 96/86, WH 180/264, APPR 360/437, VEND 600/464,
                 DEL 840/437, INV 1020/264, SITE-R 1104/86
        */}

        {/* 01 blue → SITE */}
        <path d="M86 0 L96 86" stroke="#2563EB" strokeWidth="1.25" {...dash} />

        {/* 03 orange → APPROVALS */}
        <path d="M429 0 C429 90 400 240 360 420" stroke="#F97316" strokeWidth="1.25" {...dash} />

        {/* 04 blue → stop above dashboard */}
        <path d="M600 0 L600 92" stroke="#2563EB" strokeWidth="1.25" {...dash} />

        {/* 05 purple → DELIVERY */}
        <path d="M771 0 C771 90 800 240 840 420" stroke="#5934B8" strokeWidth="1.25" {...dash} />

        {/* 07 green → SITE */}
        <path d="M1114 0 L1104 86" stroke="#15804A" strokeWidth="1.25" {...dash} />

        {/* U-chain: Site → Warehouse → Approvals → Vendors → Delivery → Inventory → Site */}
        <path
          d="M96 86 C96 150 120 210 180 264 C200 340 270 410 360 437 C430 470 520 485 600 464 C680 485 770 470 840 437 C930 410 1000 340 1020 264 C1080 210 1104 150 1104 86"
          stroke="#98A4B3"
          strokeWidth="1.3"
          {...dash}
        />

        {/* VENDORS → dashboard (stop below laptop) */}
        <path
          d="M600 368 L600 430"
          stroke="#5934B8"
          strokeWidth="1.55"
          strokeDasharray="3 4"
          strokeLinecap="round"
          fill="none"
        />

        {/* 2nd green dot → short drop, rounded 90° → dashboard sidebar */}
        <path
          d="M257 0 L257 118 C257 146 285 154 313 154 L348 154"
          stroke="#25823B"
          strokeWidth="1.55"
          strokeDasharray="3 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* <circle cx="257" cy="154" r="4.5" fill="#25823B" /> */}

        {/* warehouse → dashboard (diagonal) */}
        <path
          d="M198 255 C240 220 290 180 348 160"
          stroke="#25823B"
          strokeWidth="1.55"
          strokeDasharray="3 4"
          strokeLinecap="round"
          fill="none"
        />

        {/* 6th dot → short drop, rounded 90° → dashboard */}
        <path
          d="M943 0 L943 118 C943 146 915 154 887 154 L852 154"
          stroke="#13899C"
          strokeWidth="1.55"
          strokeDasharray="3 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* <circle cx="943" cy="154" r="4.5" fill="#13899C" /> */}

        {/* inventory → dashboard (diagonal) */}
        <path
          d="M1002 255 C960 220 910 180 852 160"
          stroke="#13899C"
          strokeWidth="1.55"
          strokeDasharray="3 4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* =====================================================
          ECOSYSTEM NODES
      ====================================================== */}

      {nodes.map((node, i) => (
        <div
          key={`${node.label}-${i}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${node.label === "Delivery" ? "z-40" : "z-20"}`}
          style={{
            left: node.left,
            top: node.top,
          }}
        >
          <WorkflowEntityNode
            label={node.label}
            icon={node.icon}
            color={node.color}
          />
        </div>
      ))}

      {/* =====================================================
          CENTRAL DASHBOARD
      ====================================================== */}

      <div className="absolute top-[5%] left-1/2 z-30 w-[min(100%,540px)] -translate-x-1/2">
        <WorkflowDashboard />
      </div>
    </div>
  );
}

export default function SupplyChainModuleLanding(_props: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/new-hero-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{supplyChainHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {supplyChainHero.titleLead}
                <span className="text-brand-orange">{supplyChainHero.titleAccent}</span>
              </h1>
              <p className="mt-3 text-lg font-semibold text-brand-navy sm:text-xl">{supplyChainHero.tagline}</p>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{supplyChainHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={supplyChainHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {supplyChainHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {supplyChainHeroHighlights.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.label} className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white ring-1 ring-gray-200">
                        <Icon size={15} className="text-brand-orange" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold leading-snug text-brand-navy">{b.label}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
            >
              <div
                className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-65 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 40%, rgba(254,93,2,0.14) 0%, rgba(23,43,77,0.06) 48%, transparent 72%)",
                }}
                aria-hidden
              />
              <div className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] sm:h-[280px] lg:h-[380px] lg:w-[118%]">
                <img
                  src={supplyChainHero.imageSrc}
                  alt={supplyChainHero.imageAlt}
                  className="block h-full w-full object-cover object-top"
                  width={1536}
                  height={1024}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-visible border-t border-gray-100 py-3 lg:py-5">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.86) 35%, rgba(255,255,255,0.82) 62%, rgba(255,255,255,0.9) 100%), url('/new-hero-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.1) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mx-auto mb-3 max-w-4xl text-center lg:mb-4">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Materials. From Request to Site. <span className="text-brand-orange">Fully Connected.</span>
            </h2>
            <div className="mt-2 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-px w-16 bg-[#D0D7E2]" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              <span className="h-px w-16 bg-[#D0D7E2]" />
            </div>
            <p className="mt-1.5 text-base leading-snug text-[#6B778C]">One material. One flow. Total visibility.</p>
          </motion.div>

          {(() => {
            const wrap = (delay: number, duration: number, node: ReactNode) =>
              isMobile ? (
                node
              ) : (
                <Float className="min-w-0" duration={duration} delay={delay} amplitude={3}>
                  {node}
                </Float>
              );

            return (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
                  {workflowVisualSteps.map((step, i) => (
                    <div key={step.title} className="flex flex-col items-center">
                      {wrap(step.floatDelay, step.floatDuration, <WorkflowCircle step={step} />)}
                      {i < workflowVisualSteps.length - 1 ? (
                        <div className="mt-2 sm:hidden">
                          <ArrowDown color="#94A3B8" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="relative hidden xl:block">
                  <div className="relative rounded-[24px] border border-[#D5DCE8] bg-white/80 px-4 pb-4 pt-6">
                    <div className="grid grid-cols-7 items-start">
                      {workflowVisualSteps.map((step, i) => (
                        <div key={step.title} className="relative flex flex-col items-center px-1">
                          {wrap(step.floatDelay, step.floatDuration, <WorkflowCircle step={step} />)}
                          {i < workflowVisualSteps.length - 1 ? (
                            <span className="pointer-events-none absolute top-[44px] right-0 z-10 translate-x-1/2">
                              <WorkflowLineArrow />
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-x-4 -bottom-[5px] z-20 grid grid-cols-7" aria-hidden>
                      {workflowVisualSteps.map((step) => (
                        <span key={step.title} className="flex justify-center">
                          <span
                            className="h-2.5 w-2.5 rounded-full ring-[3px] ring-white"
                            style={{ backgroundColor: step.color }}
                          />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-4">
                    <WorkflowEcosystem />
                  </div>
                </div>

                <div className="mt-3 xl:hidden">
                  <WorkflowDashboard />
                  <div className="mt-6 flex flex-wrap justify-center gap-5">
                    {workflowEntities.slice(0, 6).map((entity) => (
                      <WorkflowEntityNode key={`${entity.label}-${entity.color}`} {...entity} />
                    ))}
                  </div>
                </div>

                <motion.div
                  {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.06 })}
                  className="mt-3 grid gap-3 rounded-2xl border border-[#D8DEE9] bg-white px-3 py-4 shadow-[0_10px_30px_-18px_rgba(23,43,77,0.35)] sm:grid-cols-2 xl:grid-cols-5 xl:gap-0 xl:px-2 xl:py-4"
                >
                  {workflowBenefitVisual.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className={`flex items-center gap-3 px-3 py-1 ${i > 0 ? "xl:border-l xl:border-[#E6EBF3]" : ""}`}
                      >
                        <Icon size={18} className="shrink-0 text-brand-navy" strokeWidth={1.8} aria-hidden />
                        <p className="text-sm font-extrabold leading-snug text-brand-navy">{item.title}</p>
                      </div>
                    );
                  })}
                </motion.div>

                <div className="mt-4 flex gap-2.5 rounded-2xl border border-dashed border-brand-orange/40 bg-[#FFF7F2] px-3 py-2 xl:hidden">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <Link2 size={16} className="text-brand-orange" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{supplyChainWorkflowLoop.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#6B778C]">{supplyChainWorkflowLoop.description}</p>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              title={
                <>
                  Powerful modules to <span className="text-brand-orange">manage every step</span>
                </>
              }
              subtitle="Material requests, workflows, transfers, procurement, and inventory — connected in one platform."
            />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {supplyChainModules.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.article
                  key={feat.title}
                  {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.03, 0.2) })}
                  className="rounded-xl border border-gray-200/90 bg-brand-navy p-5 shadow-[0_1px_2px_rgba(23,43,77,0.04)] transition-shadow hover:shadow-[0_12px_28px_-16px_rgba(23,43,77,0.18)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/30">
                      <Icon size={18} className="text-brand-orange" aria-hidden />
                    </span>
                    <h3 className="text-base font-extrabold leading-snug text-brand-orange">{feat.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {feat.bullets.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm leading-snug text-white/80">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.4} aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F7F9FC] py-12 lg:py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
      <SectionHeader
        eyebrow={supplyChainInsights.eyebrow}
        title={
          <>
            {supplyChainInsights.titleLead}
            <span className="text-brand-orange">{supplyChainInsights.titleAccent}</span>
          </>
        }
        subtitle={supplyChainInsights.subtitle}
      />
    </motion.div>

    {/* Main Intelligence Panels */}
    <div className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.25fr_0.95fr]">

      {/* 01. Daily Intelligence */}
      <motion.article
        {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-[#FFD8BF] bg-white shadow-[0_10px_36px_-20px_rgba(23,43,77,0.22)]"
      >
        {/* <CardDotPattern color="#FE5D02" /> */}

        <div className="flex items-start gap-3 px-5 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF1E8]">
            <LineChart size={18} className="text-brand-orange" aria-hidden />
          </span>
          <h3 className="pt-0.5 text-sm font-extrabold leading-snug text-brand-navy sm:text-[15px]">
            Daily Intelligence – Material Consumption Flow
          </h3>
        </div>

        <div className="flex flex-1 flex-col px-4 pt-4 sm:px-5">
          <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
            {supplyChainConsumptionFlow.map((step, i) => {
              const Icon = step.icon;
              const last = i === supplyChainConsumptionFlow.length - 1;

              return (
                <li key={step.title} className="flex min-w-0 gap-3">
                  <div className="flex w-8 shrink-0 flex-col items-center" aria-hidden>
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-orange/35 bg-[#FFF8F3]">
                      <Icon size={14} className="text-brand-orange" strokeWidth={1.8} />
                    </span>
                    {!last ? <span className="mt-1 h-3 border-l border-dashed border-brand-orange/70" /> : null}
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-xs sm:text-[15px] font-semibold leading-snug text-brand-navy">
                      {step.title}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mx-0 mt-auto mb-4 flex items-center gap-2.5 rounded-lg bg-[#FFF4ED] px-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFE4D1]">
              <ShieldCheck size={14} className="text-brand-orange" aria-hidden />
            </span>
            <p className="text-xs font-medium leading-snug text-brand-navy">{supplyChainConsumptionFooter}</p>
          </div>
        </div>
      </motion.article>

      {/* 02. Complete Inventory Visibility */}
      <motion.article
        {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-[#B8E6CF] bg-white shadow-[0_10px_36px_-20px_rgba(23,43,77,0.22)]"
      >
        {/* <CardDotPattern color="#22A06B" /> */}

        <div className="flex items-center gap-3 px-5 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F1]">
            <Boxes size={18} className="text-[#16845B]" aria-hidden />
          </span>
          <div>
            <h3 className="text-sm font-extrabold leading-tight text-brand-orange sm:text-[15px]">
              Complete Inventory Visibility
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[#6B778C]">Real-time inventory overview</p>
          </div>
        </div>

        <div className="flex flex-1 items-center px-3 pt-6 pb-20 sm:px-4 ">
          <div className="flex w-full flex-col gap-4 sm:hidden">
            <InventoryMetricCard />
            <div className="grid grid-cols-2 gap-2">
              <InventorySpokes items={supplyChainInventorySources} side="left" />
              <InventorySpokes items={supplyChainInventoryStatuses} side="right" />
            </div>
          </div>

          <div className="hidden w-full grid-cols-[minmax(0,1fr)_minmax(10rem,1.1fr)_minmax(0,1fr)] items-center gap-2 sm:grid">
            <InventorySpokes items={supplyChainInventorySources} side="left" />
            <div className="relative px-1">
              <InventoryMetricCard />
            </div>
            <InventorySpokes items={supplyChainInventoryStatuses} side="right" />
          </div>
        </div>
      </motion.article>

      {/* 03. Reports & Analytics */}
      <motion.article
        {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-[#B3D4FF] bg-white shadow-[0_10px_36px_-20px_rgba(23,43,77,0.22)]"
      >
        {/* <CardDotPattern color="#0052CC" /> */}

        <div className="flex items-center gap-3 px-5 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <PieChart size={18} className="text-[#0052CC]" aria-hidden />
          </span>
          <div>
            <h3 className="text-sm font-extrabold leading-tight text-brand-navy sm:text-[15px]">Reports & Analytics</h3>
            <p className="mt-0.5 text-xs font-medium text-[#6B778C]">Insights that drive better decisions</p>
          </div>
        </div>

        <ul className="m-0 flex flex-1 list-none flex-col gap-2 px-4 py-4 sm:px-5">
          {supplyChainReports.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.title}
                className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-[#FAFBFD] px-3 py-2 transition-colors hover:border-[#B3D4FF] hover:bg-[#F7FAFF]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EAF2FF]">
                  <Icon size={15} className="text-[#0052CC]" aria-hidden />
                </span>
                <p className="min-w-0 flex-1 text-xs font-bold text-brand-navy sm:text-[13px]">{item.title}</p>
                {item.soon ? (
                  <span className="shrink-0 rounded-full border border-[#0052CC]/35 bg-white px-2 py-0.5 text-[8px] font-bold tracking-wide text-[#0052CC] uppercase">
                    Coming Soon
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </motion.article>

    </div>
  </div>
</section>

      <section className="border-t border-gray-100 bg-[#F8FAFC] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <h3 className="mb-5 text-lg font-extrabold leading-snug text-white sm:text-xl">Why ZedOps is different?</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-2 text-xs font-bold tracking-wide text-[#FF8F73] uppercase">Traditional</p>
                <ul className="flex flex-col gap-2">
                  {supplyChainTraditional.map((line) => (
                    <li key={line} className="flex items-start gap-1.5 text-sm leading-snug text-white/75">
                      <X size={13} className="mt-0.5 shrink-0 text-[#FF8F73]" strokeWidth={2.6} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold tracking-wide text-brand-orange uppercase">With ZedOps</p>
                <ul className="flex flex-col gap-2">
                  {supplyChainWithZedops.map((line) => (
                    <li key={line} className="flex items-start gap-1.5 text-sm leading-snug text-white/75">
                      <Check size={13} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/30 ring-1 ring-white/20">
                <BadgeCheck size={20} className="text-brand-orange" aria-hidden />
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">Key benefits</h3>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {supplyChainWhy.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl bg-white/5 px-3.5 py-2.5 text-sm leading-snug text-white/80 ring-1 ring-white/10"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
                    <Check size={12} className="text-brand-orange" strokeWidth={2.6} aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/30 ring-1 ring-brand-orange/20">
                <Sparkles size={20} className="text-brand-orange" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">AI roadmap</h3>
                <p className="mt-1 text-xs font-bold tracking-[0.12em] text-brand-orange uppercase">Coming soon</p>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {supplyChainAiSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/30">
                      <Icon size={16} className="text-brand-orange" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-extrabold text-white">{item.title}</p>
                        <span className="shrink-0 rounded-full bg-brand-orange/15 px-2 py-0.5 text-[9px] font-bold tracking-wide text-brand-orange uppercase">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-white/70">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.article>
        </div>
      </section>

      <FinalCTA
        variant="brand-orange"
        compact
        title={
          <>
            <span className="text-brand-navy">One Platform. Every Material. Total Control.</span>
          </>
        }
        body={supplyChainCta.body}
        primary={supplyChainCta.primary}
      />
    </>
  );
}
