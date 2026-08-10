import { motion } from "framer-motion";
import {
  BookOpen,
  BookUser,
  CalendarClock,
  ClipboardList,
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
    title: "Materials & Procurement",
    desc: "Manage requests, approvals, purchasing and deliveries.",
    href: "/platform/module/supply-chain",
  },
  {
    icon: FolderOpen,
    title: "Daily Execution Intelligence",
    desc: "Daily logs, site reports, progress and issue tracking.",
    href: "/platform/module/information-management",
  },
  {
    icon: Users,
    title: "Workforce Intelligence",
    desc: "Track attendance, productivity and labor performance.",
    href: "/platform/module/core",
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
    <a
      href={item.href}
      className="group/item flex h-full min-h-0 flex-col items-center rounded-xl bg-[#F4F6FB] p-4 text-center transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#EEF2F7] hover:shadow-[0_10px_22px_-16px_rgba(23,43,77,0.28)] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EDF4] bg-white shadow-[0_1px_2px_rgba(23,43,77,0.06)]">
        <Icon size={20} className="text-brand-orange" aria-hidden />
      </div>
      <p className="text-[14px] font-bold leading-snug text-brand-navy">{item.title}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-[#6B778C]">{item.desc}</p>
    </a>
  );
}

export default function Capabilities() {
  const isMobile = useIsMobile();

  return (
    <>
      <section id="capabilities" className="relative overflow-hidden border-t border-gray-200 bg-[#F8FAFC] py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Section Heading */}
          <motion.div
            {...scrollMotionProps(isMobile, {
              y: 20,
              duration: 0.45,
            })}
            className="mx-auto mb-5 max-w-3xl text-center lg:mb-6"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              The ZedOps Platform for <span className="text-brand-orange">MEP &amp; Construction</span>
            </h2>
  
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B778C] sm:text-base">
              From pre-construction planning to execution, closeout, and the
              core systems that keep everything connected.
            </p>
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
            <article className="group/zone relative flex h-full min-h-0 flex-col border-b border-[#E5E7EB] p-5 md:border-r lg:border-b-0">
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
            <article className="group/zone relative flex h-full min-h-0 flex-col border-b border-[#E5E7EB] bg-white p-5 md:border-r-0 lg:border-r lg:border-b-0">
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
  
              <div className="mt-4 grid flex-1 auto-rows-fr content-start gap-2">
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
  
              <a
                href="/platform/module/core"
                className="group/item mt-4 flex min-h-0 flex-1 flex-col items-center rounded-xl bg-[#F4F6FB] p-4 text-center transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#EEF2F7] hover:shadow-[0_10px_22px_-16px_rgba(23,43,77,0.28)] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EDF4] bg-white shadow-[0_1px_2px_rgba(23,43,77,0.06)]">
                  <Layers size={20} className="text-brand-orange" aria-hidden />
                </div>
                <p className="text-[14px] font-bold leading-snug text-brand-navy">Core</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#6B778C]">
                  Documents, library, directory, projects, users and admin.
                </p>
              </a>
            </article>
          </motion.div>
        </div>
      </section>
    </>
  );}