import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps, scrollRevealViewport } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import {
  supplyChainBenefits,
  supplyChainCapabilityGroups,
  supplyChainCta,
  supplyChainFeatures,
  supplyChainHero,
  supplyChainMobile,
  supplyChainWorkflow,
  type SupplyChainFeaturePreview,
} from "@/data/supplyChainPage";
import type { PlatformFeatureSection } from "@/data/platformFeatures";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

const workflowEase = [0.25, 0.1, 0.25, 1] as const;

function StatusPill({
  label,
  tone = "amber",
}: {
  label: string;
  tone?: "amber" | "green" | "navy" | "red" | "blue" | "orange";
}) {
  const tones = {
    amber: "bg-[#FFF7E6] text-[#B76E00]",
    green: "bg-[#E3FCEF] text-[#006644]",
    navy: "bg-brand-navy text-white",
    red: "bg-[#FFEBE6] text-[#BF2600]",
    blue: "bg-[#DEEBFF] text-[#0052CC]",
    orange: "bg-brand-orange/10 text-brand-orange",
  };
  return (
    <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[8px] font-bold whitespace-nowrap ${tones[tone]}`}>
      {label}
    </span>
  );
}

function FeatureDesktopPreview({ kind }: { kind: SupplyChainFeaturePreview }) {
  if (kind === "rfq") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-3 py-2">
          <div>
            <p className="text-[11px] font-extrabold text-brand-navy">RFQ List</p>
            <p className="text-[9px] text-[#97A0AF]">View and manage RFQs</p>
          </div>
          <span className="rounded-md bg-brand-navy px-2 py-1 text-[8px] font-bold text-white">+ Create RFQ</span>
        </div>
        <div className="border-b border-gray-100 bg-white px-3 py-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded border border-gray-200 bg-[#FAFBFC] px-2 py-1 text-[8px] text-[#97A0AF]">Search request...</span>
            <span className="rounded border border-gray-200 bg-[#FAFBFC] px-2 py-1 text-[8px] text-brand-navy">Venus Plaza</span>
            <span className="rounded border border-gray-200 bg-[#FAFBFC] px-2 py-1 text-[8px] text-[#6B778C]">All Status</span>
          </div>
        </div>
        <div className="overflow-x-auto bg-white">
          <div className="grid min-w-[320px] grid-cols-[28px_1fr_1fr_64px_56px] gap-1 border-b border-gray-100 bg-[#F4F5F7] px-3 py-1.5 text-[7px] font-bold tracking-wide text-[#6B778C] uppercase">
            <span>#</span>
            <span>RFQ ID</span>
            <span>Project</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {[
            { id: "RFQ-91cd", project: "Venus Plaza", due: "26 Jul", status: "Pending" as const },
            { id: "RFQ-82ab", project: "Al Noor", due: "02 Aug", status: "Pending" as const },
          ].map((row, i) => (
            <div
              key={row.id}
              className="grid min-w-[320px] grid-cols-[28px_1fr_1fr_64px_56px] items-center gap-1 border-b border-gray-50 px-3 py-2 last:border-0"
            >
              <span className="text-[9px] text-[#97A0AF]">{i + 1}</span>
              <span className="truncate text-[9px] font-bold text-[#0052CC]">{row.id}</span>
              <span className="truncate text-[9px] text-brand-navy">{row.project}</span>
              <span className="text-[8px] text-[#6B778C]">{row.due}</span>
              <StatusPill label={row.status} tone="amber" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "po") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-3 py-2">
          <div>
            <p className="text-[11px] font-extrabold text-brand-navy">Purchase Order</p>
            <p className="text-[9px] text-[#97A0AF]">Track recent POs and status</p>
          </div>
          <span className="rounded-md bg-brand-navy px-2 py-1 text-[8px] font-bold text-white">+ Create New PO</span>
        </div>
        <div className="grid grid-cols-4 gap-px border-b border-gray-100 bg-gray-100">
          {[
            { label: "Total PO", value: "164" },
            { label: "Pending", value: "0" },
            { label: "Approved", value: "104" },
            { label: "Draft", value: "40" },
          ].map((m) => (
            <div key={m.label} className="bg-white px-2 py-2 text-center">
              <p className="text-[7px] font-medium text-[#97A0AF]">{m.label}</p>
              <p className="text-[12px] font-black text-brand-navy">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto bg-white">
          <div className="grid min-w-[300px] grid-cols-[1.2fr_1fr_0.8fr_56px] gap-1 border-b border-gray-100 bg-[#F4F5F7] px-3 py-1.5 text-[7px] font-bold tracking-wide text-[#6B778C] uppercase">
            <span>PO ID</span>
            <span>Vendor</span>
            <span>Items</span>
            <span>Status</span>
          </div>
          {[
            { id: "PO-20164-2025", vendor: "Al Maqal", items: "12", status: "Draft" as const },
            { id: "PO-20150-2025", vendor: "RAK Supply", items: "8", status: "Approved" as const },
          ].map((row) => (
            <div
              key={row.id}
              className="grid min-w-[300px] grid-cols-[1.2fr_1fr_0.8fr_56px] items-center gap-1 border-b border-gray-50 px-3 py-2 last:border-0"
            >
              <span className="truncate text-[9px] font-bold text-[#0052CC]">{row.id}</span>
              <span className="truncate text-[9px] text-brand-navy">{row.vendor}</span>
              <span className="text-[9px] text-[#6B778C]">{row.items}</span>
              {row.status === "Approved" ? (
                <StatusPill label="Approved" tone="green" />
              ) : (
                <span className="text-[8px] font-bold text-[#6B778C]">Draft</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "workflow") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
        <div className="border-b border-gray-100 bg-white px-3 py-2">
          <p className="text-[11px] font-extrabold text-brand-navy">Workflow List</p>
          <p className="text-[9px] text-[#97A0AF]">Manage approval workflows</p>
        </div>
        <div className="space-y-1.5 bg-white p-2.5">
          {[
            { title: "Material Request Template", tool: "Material Request", steps: "1", on: true },
            { title: "Workflow MI", tool: "Material Issue", steps: "1", on: true },
            { title: "Workflow For PO", tool: "Purchase Order", steps: "3", on: false },
          ].map((row) => (
            <div key={row.title} className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-extrabold text-brand-navy">{row.title}</p>
                <p className="text-[8px] text-[#97A0AF]">
                  {row.tool} · {row.steps} steps
                </p>
              </div>
              <StatusPill label={row.on ? "Configured" : "Not Configured"} tone={row.on ? "navy" : "orange"} />
              <span className={`h-3.5 w-6 rounded-full p-0.5 ${row.on ? "bg-brand-navy" : "bg-gray-200"}`}>
                <span className={`block h-2.5 w-2.5 rounded-full bg-white ${row.on ? "ml-auto" : ""}`} />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "returns") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 bg-white px-3 py-2">
          <div>
            <p className="text-[11px] font-extrabold text-brand-navy">Purchase Return</p>
            <p className="text-[9px] text-[#97A0AF]">Returns to vendors</p>
          </div>
          <span className="rounded-md bg-brand-navy px-2 py-1 text-[8px] font-bold text-white">+ Create Return</span>
        </div>
        <div className="overflow-x-auto bg-white">
          <div className="grid min-w-[300px] grid-cols-[1.1fr_0.9fr_64px_64px] gap-1 border-b border-gray-100 bg-[#F4F5F7] px-3 py-1.5 text-[7px] font-bold tracking-wide text-[#6B778C] uppercase">
            <span>Return ID</span>
            <span>Type</span>
            <span>Status</span>
            <span>Approval</span>
          </div>
          {[
            { id: "PRR-10006", type: "Defective", typeTone: "red" as const, status: "Completed", approval: "Approved" },
            { id: "PRR-10005", type: "Excess", typeTone: "blue" as const, status: "Completed", approval: "Not Approved" },
          ].map((row) => (
            <div
              key={row.id}
              className="grid min-w-[300px] grid-cols-[1.1fr_0.9fr_64px_64px] items-center gap-1 border-b border-gray-50 px-3 py-2 last:border-0"
            >
              <span className="truncate text-[9px] font-bold text-[#0052CC]">{row.id}</span>
              <StatusPill label={row.type} tone={row.typeTone} />
              <StatusPill label={row.status} tone="green" />
              <span className={`text-[8px] font-bold ${row.approval === "Approved" ? "text-[#006644]" : "text-brand-navy"}`}>
                {row.approval}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "inventory") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
        <div className="flex gap-2 border-b border-gray-100 bg-white px-3 py-2">
          {["Stock Details", "Warehouse", "Bulk Upload"].map((tab, i) => (
            <span
              key={tab}
              className={`rounded-md px-2 py-1 text-[8px] font-bold ${
                i === 0 ? "bg-[#EBECF0] text-brand-navy" : "text-[#97A0AF]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-px border-b border-gray-100 bg-gray-100">
          {[
            { label: "Total Items", value: "430" },
            { label: "Low Stock", value: "56" },
            { label: "Warehouses", value: "18" },
            { label: "Reserved", value: "12k" },
          ].map((m) => (
            <div key={m.label} className="bg-white px-1.5 py-2 text-center">
              <p className="text-[7px] font-medium text-[#97A0AF]">{m.label}</p>
              <p className="text-[11px] font-black text-brand-navy">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto bg-white">
          <div className="grid min-w-[300px] grid-cols-[1fr_1.2fr_56px_56px] gap-1 border-b border-gray-100 bg-[#F4F5F7] px-3 py-1.5 text-[7px] font-bold tracking-wide text-[#6B778C] uppercase">
            <span>Code</span>
            <span>Item</span>
            <span>Stock</span>
            <span>Avail</span>
          </div>
          {[
            { code: "MEC-10008", name: "Measuring Tape", stock: "111", avail: "90" },
            { code: "FLR-9006", name: "Tile Adhesive", stock: "251", avail: "144" },
          ].map((row) => (
            <div
              key={row.code}
              className="grid min-w-[300px] grid-cols-[1fr_1.2fr_56px_56px] items-center gap-1 border-b border-gray-50 px-3 py-2 last:border-0"
            >
              <span className="truncate text-[9px] font-bold text-brand-navy">{row.code}</span>
              <span className="truncate text-[9px] text-[#6B778C]">{row.name}</span>
              <span className="text-[9px] font-bold text-brand-navy">{row.stock}</span>
              <span className="text-[9px] text-[#6B778C]">{row.avail}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // dashboard
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFBFC]">
      <div className="border-b border-gray-100 bg-white px-3 py-2">
        <p className="text-[11px] font-extrabold text-brand-navy">Material Dashboard</p>
        <p className="text-[9px] text-[#97A0AF]">Live ops and report exports</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 bg-white p-2.5">
        {[
          { label: "Open MRs", value: "24", tone: "text-brand-orange" },
          { label: "Delayed POs", value: "3", tone: "text-[#BF2600]" },
          { label: "Low stock", value: "56", tone: "text-brand-navy" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-gray-100 px-2 py-2 text-center">
            <p className="text-[7px] font-medium text-[#97A0AF]">{m.label}</p>
            <p className={`text-[14px] font-black ${m.tone}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5 border-t border-gray-100 bg-white px-2.5 pb-2.5 pt-2">
        {[
          { name: "PO summary", st: "Ready" },
          { name: "Stock movement", st: "Ready" },
          { name: "Returns export", st: "Queued" },
        ].map((row) => (
          <div key={row.name} className="flex items-center gap-2 rounded-lg border border-gray-100 px-2.5 py-1.5">
            <div className="flex h-7 w-6 shrink-0 items-center justify-center rounded border border-red-200 bg-red-50 text-[7px] font-black text-red-600">
              PDF
            </div>
            <p className="min-w-0 flex-1 truncate text-[9px] font-bold text-brand-navy">{row.name}</p>
            <span className={`text-[8px] font-bold ${row.st === "Ready" ? "text-[#006644]" : "text-[#B76E00]"}`}>
              {row.st}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const workflowRailVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.42 },
  },
};

const workflowStepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.86 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: workflowEase },
  },
};

export default function SupplyChainModuleLanding({
  prev,
  next,
}: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const animateWorkflow = !isMobile && !reduceMotion;
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = supplyChainFeatures[activeFeature] ?? supplyChainFeatures[0];
  const FeatureIcon = feature.icon;

  return (
    <>
      {/* Hero — lean product split */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.9) 42%, rgba(255,255,255,0.92) 100%), url('/hero-banner.png')",
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
              "linear-gradient(rgba(1,47,176,0.035) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.035) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[min(100%,720px)] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.1) 0%, transparent 70%)",
            filter: "blur(36px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: workflowEase }}
              className="min-w-0"
            >
              <div
                className="mb-3 inline-flex items-center gap-2 border border-brand-navy/15 bg-white/85 px-3.5 py-1.5 backdrop-blur-sm"
                style={{ borderRadius: 99 }}
              >
                <Package size={12} className="text-brand-orange" aria-hidden />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
                  {supplyChainHero.eyebrow}
                </span>
              </div>

              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.06] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.15rem] xl:text-[3.35rem]">
                {supplyChainHero.titleLead}{" "}
                <span className="text-brand-orange">{supplyChainHero.titleAccent}</span>
              </h1>

              <p className="mt-3 max-w-md text-base leading-relaxed text-[#42526E] sm:text-lg">
                {supplyChainHero.subtitle}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="/early-access"
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                  style={{ borderRadius: 6 }}
                >
                  Request Demo
                  <ArrowRight size={15} aria-hidden />
                </a>
                <a
                  href="/contact?topic=demo"
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-navy px-7 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
                  style={{ borderRadius: 6 }}
                >
                  Book a walkthrough
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: workflowEase }}
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
              <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)]">
                <img
                  src={supplyChainHero.imageSrc}
                  alt={supplyChainHero.imageAlt}
                  className="block h-auto w-full object-contain object-center"
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

      {/* Key Capabilities — grouped capability board */}
      <section className="relative overflow-hidden border-t border-gray-100 bg-[#F8FAFC] py-9 lg:py-11">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="mx-auto mb-6 max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">Capabilities</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">Key Capabilities</h2>
            <p className="mt-1.5 text-base leading-relaxed text-[#6B778C]">
              From request to stock — one connected material flow
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-3 lg:gap-4">
            {supplyChainCapabilityGroups.map((group, gi) => (
              <motion.div
                key={group.id}
                {...scrollMotionProps(isMobile, { y: 18, duration: 0.4, delay: Math.min(gi * 0.08, 0.2) })}
                className="flex flex-col"
              >
                <div className="mb-2 flex items-center gap-2.5 px-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden />
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy/55">{group.label}</p>
                </div>

                <div className="flex flex-1 flex-col gap-2.5">
                  {group.items.map((cap, i) => (
                    <motion.article
                      key={cap.title}
                      {...scrollMotionProps(isMobile, {
                        y: 12,
                        duration: 0.35,
                        delay: Math.min(gi * 0.06 + i * 0.04, 0.28),
                      })}
                      className="group relative overflow-hidden rounded-xl border border-gray-200/90 bg-white p-4 shadow-[0_1px_2px_rgba(23,43,77,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/35 hover:shadow-[0_14px_32px_-18px_rgba(23,43,77,0.2)]"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 bg-brand-orange transition-transform duration-200 group-hover:scale-y-100"
                        aria-hidden
                      />
                      <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange/10 transition-colors group-hover:bg-brand-orange/15">
                        <cap.icon size={18} className="text-brand-orange" aria-hidden />
                      </div>
                      <h3 className="text-[15px] font-extrabold leading-snug text-brand-navy">{cap.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6B778C]">{cap.description}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow — polished end-to-end process rail */}
      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-9 lg:py-11">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(254,93,2,0.07), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="mx-auto mb-6 max-w-2xl text-center lg:mb-7">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">Process</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">Material Management Workflow</h2>
            <p className="mt-1.5 text-base leading-relaxed text-[#6B778C]">
              End-to-end visibility from request to delivery
            </p>
          </motion.div>

          {/* Desktop: single continuous rail */}
          <div className="relative hidden lg:block">
            {/* Continuous connector — draws left → right */}
            <motion.div
              className="pointer-events-none absolute top-[29px] right-[calc(100%/14)] left-[calc(100%/14)] origin-left"
              aria-hidden
              initial={animateWorkflow ? { scaleX: 0, opacity: 0 } : false}
              whileInView={animateWorkflow ? { scaleX: 1, opacity: 1 } : undefined}
              viewport={scrollRevealViewport}
              transition={{ duration: 0.95, ease: workflowEase }}
            >
              <div className="h-0 border-t-2 border-dashed border-brand-orange/55" />
            </motion.div>
            {/* Traveling pulse — separate so scaleX on the line doesn’t squash it */}
            {animateWorkflow ? (
              <motion.span
                className="pointer-events-none absolute top-[25px] z-20 h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[0_0_12px_2px_rgba(254,93,2,0.55)]"
                aria-hidden
                initial={{ left: "7.14%", opacity: 0 }}
                whileInView={{
                  left: ["7.14%", "92.86%"],
                  opacity: [0, 1, 1, 0],
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.4, delay: 0.12, ease: workflowEase }}
              />
            ) : null}

            <motion.ol
              className="relative grid grid-cols-7 gap-3"
              initial={animateWorkflow ? "hidden" : false}
              whileInView={animateWorkflow ? "visible" : undefined}
              viewport={scrollRevealViewport}
              variants={animateWorkflow ? workflowRailVariants : undefined}
            >
              {supplyChainWorkflow.map((step, i) => {
                const n = String(i + 1).padStart(2, "0");
                return (
                  <motion.li
                    key={step.title}
                    variants={animateWorkflow ? workflowStepVariants : undefined}
                    className="group relative flex flex-col items-center px-1 text-center"
                  >
                    <div className="relative z-10 mb-3">
                      <span className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white px-1.5 text-[10px] font-black tabular-nums tracking-wide text-brand-navy/35 ring-1 ring-brand-navy/8">
                        {n}
                      </span>
                      <motion.div
                        className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full bg-linear-to-b from-white to-[#FFF7F2] shadow-[0_10px_28px_-14px_rgba(254,93,2,0.55)] ring-1 ring-brand-orange/20 transition-shadow duration-200 group-hover:shadow-[0_16px_32px_-14px_rgba(254,93,2,0.65)] group-hover:ring-brand-orange/45"
                        whileHover={animateWorkflow ? { y: -3, scale: 1.04 } : undefined}
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      >
                        {/* Soft ring bloom once per step */}
                        {animateWorkflow ? (
                          <motion.span
                            className="pointer-events-none absolute inset-0 rounded-full border border-brand-orange/40"
                            initial={{ scale: 1, opacity: 0.55 }}
                            whileInView={{ scale: 1.55, opacity: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 + i * 0.09, ease: "easeOut" }}
                            aria-hidden
                          />
                        ) : null}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10 transition-colors group-hover:bg-brand-orange/15">
                          <motion.span
                            className="inline-flex"
                            animate={
                              animateWorkflow
                                ? { y: [0, -2, 0] }
                                : undefined
                            }
                            transition={
                              animateWorkflow
                                ? {
                                    duration: 2.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.1 + i * 0.12,
                                  }
                                : undefined
                            }
                          >
                            <step.icon size={20} className="text-brand-orange" strokeWidth={2} aria-hidden />
                          </motion.span>
                        </div>
                      </motion.div>
                    </div>
                    <h3 className="text-[13px] font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                    <p className="mt-1.5 max-w-[9.5rem] text-[12px] leading-snug text-[#6B778C]">{step.description}</p>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>

          {/* Mobile / tablet: vertical process list */}
          <ol className="mx-auto max-w-lg space-y-0 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-[0_12px_40px_-28px_rgba(23,43,77,0.2)] sm:p-5 lg:hidden">
            {supplyChainWorkflow.map((step, i) => {
              const n = String(i + 1).padStart(2, "0");
              const isLast = i === supplyChainWorkflow.length - 1;
              return (
                <li key={step.title} className="relative flex gap-4">
                  <div className="relative flex w-12 shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-b from-white to-[#FFF7F2] shadow-[0_8px_20px_-12px_rgba(254,93,2,0.5)] ring-1 ring-brand-orange/25">
                      <step.icon size={18} className="text-brand-orange" strokeWidth={2} aria-hidden />
                    </div>
                    {!isLast ? (
                      <div className="my-1 w-0 flex-1 border-l-2 border-dashed border-brand-orange/50" aria-hidden />
                    ) : null}
                  </div>
                  <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-6"} pt-1.5`}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[10px] font-black tabular-nums tracking-wide text-brand-orange">{n}</span>
                      <h3 className="text-sm font-extrabold text-brand-navy">{step.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#6B778C] sm:text-[13px]">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Feature spotlight rail */}
      <section className="relative overflow-hidden border-t border-gray-100 bg-[#F8FAFC] py-9 lg:py-11">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="mx-auto mb-6 max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">Beyond the workflow</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              What you can run in Material Management
            </h2>
            <p className="mt-1.5 text-base leading-relaxed text-[#6B778C]">
              Built for procurement desks and site crews — same system, different screens.
            </p>
          </motion.div>

          <div className="grid items-start gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
            <motion.div
              {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
              className="rounded-2xl border border-gray-200/90 bg-white p-1.5 shadow-[0_12px_40px_-28px_rgba(23,43,77,0.18)] sm:p-2"
              role="listbox"
              aria-label="Material management features"
            >
              {supplyChainFeatures.map((item, i) => {
                const active = i === activeFeature;
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setActiveFeature(i)}
                    onMouseEnter={() => {
                      if (!isMobile) setActiveFeature(i);
                    }}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                      active
                        ? "bg-brand-orange/[0.07] shadow-[inset_3px_0_0_0_#FE5D02]"
                        : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        active ? "bg-brand-orange/15" : "bg-brand-orange/10 group-hover:bg-brand-orange/12"
                      }`}
                    >
                      <ItemIcon size={15} className="text-brand-orange" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-extrabold leading-snug ${active ? "text-brand-navy" : "text-brand-navy/80"}`}>
                        {item.title}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-[#6B778C]">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            <motion.div
              {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.06 })}
              className="flex flex-col rounded-2xl border border-gray-200/90 bg-white p-4 shadow-[0_12px_40px_-28px_rgba(23,43,77,0.18)] sm:p-5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: workflowEase }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange/10">
                    <FeatureIcon size={18} className="text-brand-orange" aria-hidden />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-[1.35rem]">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B778C]">{feature.detail}</p>
                  <span className="mt-2.5 inline-flex w-fit items-center rounded-full border border-brand-navy/10 bg-[#F8FAFC] px-3 py-1 text-[11px] font-bold tracking-wide text-brand-navy/70">
                    Used in: {feature.usedIn}
                  </span>

                  <div className="mt-4 flex-1 border-t border-gray-100 pt-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#97A0AF]">Desktop preview</p>
                    <FeatureDesktopPreview kind={feature.preview} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile app — text left, two phones right */}
      <section className="border-t border-gray-100 bg-white py-9 lg:py-11">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:gap-12">
            <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="flex flex-col justify-center">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">Field access</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                {supplyChainMobile.title}
              </h2>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-[#6B778C]">
                {supplyChainMobile.subtitle}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6B778C]">
                {supplyChainMobile.body}
              </p>
              <ul className="mt-5 space-y-3">
                {supplyChainMobile.bullets.map((bullet) => (
                  <li key={bullet.title} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-brand-navy sm:text-[15px]">{bullet.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B778C]">{bullet.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...scrollMotionProps(isMobile, { y: 18, duration: 0.4, delay: 0.08 })}
              className="relative mx-auto flex h-full w-full max-w-xl items-center justify-center lg:mx-0 lg:max-w-none lg:justify-end"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 45%, rgba(254,93,2,0.12) 0%, rgba(23,43,77,0.05) 50%, transparent 72%)",
                }}
                aria-hidden
              />
              <div className="relative flex h-[420px] w-full items-center justify-center gap-3 sm:h-[480px] sm:gap-4 lg:h-full lg:min-h-[460px] lg:max-h-[520px] lg:justify-end lg:gap-5">
                {supplyChainMobile.phones.map((phone) => (
                  <div key={phone.src} className="relative h-full w-[48%] max-w-[240px]">
                    <img
                      src={phone.src}
                      alt={phone.alt}
                      className="h-full w-full object-contain object-center drop-shadow-[0_24px_40px_rgba(23,43,77,0.22)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-gray-100 bg-white py-9 lg:py-11">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="mx-auto mb-5 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Why Construction Teams Choose ZedOps Material Management
            </h2>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supplyChainBenefits.map((benefit, i) => (
              <motion.article
                key={benefit.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
                className="rounded-xl border border-gray-200/90 p-3.5"
              >
                <benefit.icon size={18} className="text-brand-orange" aria-hidden />
                <h3 className="mt-2 text-base font-extrabold text-brand-navy">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6B778C]">{benefit.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Module-specific CTA band */}
      <section className="border-t border-gray-100 bg-brand-navy py-8 lg:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{supplyChainCta.title}</h2>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-white/65">{supplyChainCta.body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="/early-access"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                style={{ borderRadius: 6 }}
              >
                Request Demo
                <ArrowRight size={15} aria-hidden />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                style={{ borderRadius: 6 }}
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Continue exploring */}
      <section className="border-t border-gray-200 bg-white py-8 lg:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })} className="mb-4 text-center">
            <h2 className="mx-auto max-w-xl text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Other platform areas
            </h2>
            <p className="mx-auto mt-1.5 max-w-lg text-sm leading-relaxed text-[#6B778C]">
              Step through adjacent modules from the same platform map.
            </p>
          </motion.div>

          <div className={`grid gap-3 ${prev && next ? "md:grid-cols-2" : "md:mx-auto md:max-w-xl md:grid-cols-1"}`}>
            {prev ? (
              <a
                href={`/platform/module/${prev.id}`}
                className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3.5 transition-all hover:border-brand-orange hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
                  <ChevronLeft className="h-5 w-5 text-brand-orange" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#97A0AF]">Previous module</p>
                  <p className="truncate text-lg font-extrabold text-brand-navy transition-colors group-hover:text-brand-orange">
                    {prev.title}
                  </p>
                </div>
              </a>
            ) : null}
            {next ? (
              <a
                href={`/platform/module/${next.id}`}
                className="group flex flex-row-reverse items-center gap-4 rounded-xl border border-gray-200 bg-white p-3.5 text-right transition-all hover:border-brand-orange hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
                  <ChevronRight className="h-5 w-5 text-brand-orange" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#97A0AF]">Next module</p>
                  <p className="truncate text-lg font-extrabold text-brand-navy transition-colors group-hover:text-brand-orange">
                    {next.title}
                  </p>
                </div>
              </a>
            ) : null}
          </div>

        </div>
      </section>
      <FinalCTA />
    </>
  );
}
