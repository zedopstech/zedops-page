import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BookUser,
  CalendarClock,
  ClipboardList,
  Cpu,
  FolderKanban,
  FolderOpen,
  HardHat,
  Landmark,
  Layers,
  ListChecks,
  Package,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";

type Capability = {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
};

const preConstruction: Capability[] = [
  {
    icon: ClipboardList,
    title: "Estimation & Proposals",
    desc: "Accurate takeoffs, BOQs, proposals and cost estimation.",
    href: "/platform/module/estimation",
  },
  {
    icon: CalendarClock,
    title: "Planning & Scheduling",
    desc: "Create realistic schedules and track progress in real time.",
    href: "/platform/module/planning-execution",
  },
];

const execution: Capability[] = [
  {
    icon: Package,
    title: "Materials Management",
    desc: "Manage requests, approvals, purchasing and deliveries.",
    href: "/platform/module/supply-chain",
  },
  {
    icon: FolderOpen,
    title: "Daily Execution Intelligence",
    desc: "Daily logs, site reports, progress and issue tracking.",
    href: "/platform/module/daily-intelligence",
  },
  {
    icon: Users,
    title: "Workforce Intelligence",
    desc: "Track attendance, productivity and labor performance.",
    href: "/platform/module/projects",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Safety",
    desc: "Inspections, checklists, incidents and compliance.",
    href: "/platform/module/quality-safety-closeout",
  },
  {
    icon: FolderKanban,
    title: "Tasks Resolution",
    desc: "Assign, track and close tasks faster across teams.",
    href: "/platform/module/projects",
  },
  {
    icon: Landmark,
    title: "Budget & Cost Control",
    desc: "Track budgets, actual commitments and cash flow.",
    href: "/platform/module/finance",
  },
];

const closeout: Capability[] = [
  {
    icon: ListChecks,
    title: "Punch List Management",
    desc: "Track, assign and close punch items efficiently.",
    href: "/platform/module/quality-safety-closeout",
  },
];

const platformCore: Capability[] = [
  {
    icon: Layers,
    title: "Core",
    desc: "Documents, library, directory, projects, users and admin.",
    href: "/platform/module/core",
  },
];

const coreModules = [
  { icon: Users, label: "People" },
  { icon: FolderOpen, label: "Documents" },
  { icon: BookOpen, label: "Library" },
  { icon: FolderKanban, label: "Projects" },
  { icon: HardHat, label: "Workforce" },
  { icon: BookUser, label: "Directory" },
  { icon: UserCog, label: "Users & Admin" },
] as const;

function CapabilityRow({ item }: { item: Capability }) {
  const Icon = item.icon;

  return (
    <div className="group/item flex h-full min-h-0 flex-col items-center rounded-xl bg-[#F4F6FB] p-4 text-center">
      <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EDF4] bg-white shadow-[0_1px_2px_rgba(23,43,77,0.06)]">
        <Icon size={20} className="text-brand-orange" aria-hidden />
      </div>
      <p className="text-sm font-bold leading-snug text-brand-navy">{item.title}</p>
      <p className="mt-1.5 text-sm leading-snug text-[#616D82]">{item.desc}</p>
      <a
        href={item.href}
        className="mt-auto inline-flex items-center justify-center gap-1 pt-3 text-sm font-semibold text-brand-orange transition-[gap] duration-150 hover:gap-1.5"
      >
        Explore more
        <ArrowRight size={13} aria-hidden />
      </a>
    </div>
  );
}

export default function Capabilities() {
  const isMobile = useIsMobile();

  return (
    <>
      <section id="capabilities" className="relative overflow-hidden border-t border-gray-200 bg-[#F8FAFC] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Section Heading */}
          <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })}>
            <SectionHeader
              id="connected-flow-heading"
              title={
                <>
                  The ZedOps Platform for <span className="text-brand-orange">MEP &amp; Construction</span>
                </>
              }
              subtitle="From pre-construction planning to execution, closeout, and the core systems that keep everything connected."
            />
          </motion.div>
  
          {/* Platform Architecture */}
          <motion.div
            {...scrollMotionProps(isMobile, {
              y: 16,
              duration: 0.4,
              delay: 0.05,
            })}
            className="grid items-stretch overflow-hidden rounded-md border border-[#E5E7EB] bg-white md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            {/* =======================================================
                01 — PRE-CONSTRUCTION
            ======================================================== */}
            <article className="group/zone relative flex h-full min-h-0 flex-col border-b border-[#E5E7EB] p-5 md:border-r lg:row-span-2 lg:border-b-0">
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange"
                aria-hidden
              />
  
              <h3 className="text-[15px] font-extrabold tracking-tight text-brand-navy">
                Pre-Construction
              </h3>
  
              <div className="mt-4 grid flex-1 auto-rows-fr content-start gap-2">
                {preConstruction.map((item) => (
                  <CapabilityRow
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            </article>
  
            {/* =======================================================
                02 — CONSTRUCTION EXECUTION
            ======================================================== */}
            <article className="group/zone relative flex h-full min-h-0 flex-col border-b border-[#E5E7EB] bg-white p-5 md:border-r-0 lg:row-span-2 lg:border-r lg:border-b-0">
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange"
                aria-hidden
              />
  
              <h3 className="text-[15px] font-extrabold tracking-tight text-brand-navy">
                Construction Execution
              </h3>
  
              <div className="mt-4 grid flex-1 auto-rows-fr grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {execution.map((item) => (
                  <CapabilityRow
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            </article>
  
            {/* =======================================================
                03 — PROJECT CLOSEOUT
            ======================================================== */}
            <article className="group/zone relative flex h-full min-h-0 flex-col border-b border-[#E5E7EB] p-5 md:border-r lg:border-b-0">
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange"
                aria-hidden
              />
  
              <h3 className="text-[15px] font-extrabold tracking-tight text-brand-navy">
                Project Closeout
              </h3>
  
              <div className="mt-4 grid content-start gap-2">
                {closeout.map((item) => (
                  <CapabilityRow
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            </article>
  
            {/* =======================================================
                04 — PLATFORM CORE
            ======================================================== */}
            <article className="group/zone relative flex h-full min-h-0 flex-col p-5">
              <span
                className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange"
                aria-hidden
              />
  
              <h3 className="text-[15px] font-extrabold tracking-tight text-brand-navy">
                Platform Core
              </h3>
  
              <div className="mt-4 grid content-start gap-2">
                {platformCore.map((item) => (
                  <CapabilityRow
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
              
              
            </article>

            <a
              href="/zed-ai"
              className="group/ai flex items-start gap-4 border-t border-[#E5E7EB] bg-white p-5 md:col-span-2 lg:col-span-2 lg:col-start-3"
            >
              <div className="flex w-full items-start gap-4 rounded-2xl bg-brand-navy px-4 py-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(23,43,77,0.45)] motion-reduce:transform-none sm:px-5 sm:py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Cpu size={20} className="text-brand-orange" aria-hidden />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-base font-extrabold text-white">Zed AI</p>
                  <p className="mt-1 text-sm leading-snug text-[#B8C4D4] sm:text-sm">
                    Copilot on live project data — insights, drafts, and actions with your permissions.
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-orange">
                    Open
                    <ArrowRight size={14} className="transition-transform duration-150 group-hover/ai:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}