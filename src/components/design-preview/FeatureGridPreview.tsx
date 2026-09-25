import { motion } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import { PiBankFill, PiCalendarCheckFill, PiClipboardTextFill, PiCpuFill, PiFolderOpenFill, PiKanbanFill, PiListChecksFill, PiPackageFill, PiShieldCheckFill, PiStackFill, PiUsersFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  CenterHeader,
  Container,
  darkBand,
  DotGrid,
  Glow,
  Highlight,
  TicketButton,
} from "./primitives";

type Capability = {
  icon: IconType;
  title: string;
  desc: string;
  href: string;
  group: string;
};

const caps: Capability[] = [
  {
    group: "Pre-Construction",
    icon: PiClipboardTextFill,
    title: "Estimation & Proposals",
    desc: "Accurate takeoffs, BOQs, proposals and cost estimation.",
    href: "/platform/module/estimation",
  },
  {
    group: "Pre-Construction",
    icon: PiCalendarCheckFill,
    title: "Planning & Scheduling",
    desc: "Create realistic schedules and track progress in real time.",
    href: "/platform/module/planning-execution",
  },
  {
    group: "Execution",
    icon: PiPackageFill,
    title: "Materials Management",
    desc: "Manage requests, approvals, purchasing and deliveries.",
    href: "/platform/module/supply-chain",
  },
  {
    group: "Execution",
    icon: PiFolderOpenFill,
    title: "Daily Execution Intelligence",
    desc: "Daily logs, site reports, progress and issue tracking.",
    href: "/platform/module/daily-intelligence",
  },
  {
    group: "Execution",
    icon: PiUsersFill,
    title: "Workforce Intelligence",
    desc: "Track attendance, productivity and labor performance.",
    href: "/platform/module/workforce-intelligence",
  },
  {
    group: "Execution",
    icon: PiShieldCheckFill,
    title: "Quality & Safety",
    desc: "Inspections, checklists, incidents and compliance.",
    href: "/platform/module/quality-safety-closeout",
  },
  {
    group: "Execution",
    icon: PiKanbanFill,
    title: "Tasks Resolution",
    desc: "Assign, track and close tasks faster across teams.",
    href: "/platform/module/projects",
  },
  {
    group: "Execution",
    icon: PiBankFill,
    title: "Budget & Cost Control",
    desc: "Track budgets, actual commitments and cash flow.",
    href: "/platform/module/finance",
  },
  {
    group: "Closeout",
    icon: PiListChecksFill,
    title: "Punch List Management",
    desc: "Track, assign and close punch items efficiently.",
    href: "/platform/module/punch-list",
  },
  {
    group: "Platform Core",
    icon: PiStackFill,
    title: "Core",
    desc: "Documents, library, directory, projects, users and admin.",
    href: "/platform/module/core",
  },
];

function Cell({ c }: { c: Capability }) {
  return (
    <a
      href={c.href}
      className="group relative flex flex-col border-[#EDF0F5] bg-white p-6 sm:min-h-[230px] sm:p-7 transition-colors duration-200 hover:bg-[#FFF8F3] lg:min-h-[250px] lg:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <c.icon
          size={30}
          className="text-brand-navy transition-colors group-hover:text-brand-orange"
          aria-hidden
        />
        <span className="rounded-full bg-[#F4F6FA] px-2.5 py-1 text-[11px] font-semibold text-[#6B778C]">
          {c.group}
        </span>
      </div>
      <h3 className="pt-6 text-[18px] sm:pt-10 font-semibold tracking-[-0.02em] text-brand-navy">
        {c.title}
      </h3>
      <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#5E6C84]">
        {c.desc}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-brand-navy opacity-70 transition-opacity group-hover:text-brand-orange group-hover:opacity-100">
        Explore more{" "}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </a>
  );
}

/** hexalog feature grid: centred header, then one bordered 12px card split into hairline cells. */
export default function FeatureGridPreview() {
  const isMobile = useIsMobile();
  return (
    <section
      id="capabilities"
      className="relative bg-white py-20 lg:py-[100px]"
      aria-labelledby="dp-capabilities"
    >
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <CenterHeader
            id="dp-capabilities"
            title={
              <>
                Purpose-built tools
                <br />
                for <Highlight>MEP teams.</Highlight>
              </>
            }
            body="Estimators, planners, buyers, site teams, and managers get dedicated tools that work from the same project record."
          />
        </motion.div>

        <motion.div
          {...scrollMotionProps(isMobile, {
            y: 18,
            duration: 0.45,
            delay: 0.05,
          })}
          className="mt-14 overflow-hidden rounded-2xl border border-[#E3E8F0] bg-[#EDF0F5] shadow-[0_24px_48px_-32px_rgba(23,43,77,0.3)]"
        >
          {/* 1px gap on a hairline-coloured backdrop = crisp dividers at every breakpoint */}
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {caps.map((c) => (
              <Cell key={c.title} c={c} />
            ))}
            <div
              className={`group relative flex min-h-[230px] flex-col overflow-hidden p-7 sm:col-span-2 lg:p-8 ${darkBand}`}
            >
              <DotGrid dark />
              <Glow className="-top-20 -right-10 h-72 w-72" />
              <div className="relative flex items-start justify-between">
                <PiCpuFill
                  size={30}
                  className="text-white/90"
                  aria-hidden
                />
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80">
                  New
                </span>
              </div>
              <div className="relative mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-white">
                    Zed AI
                  </h3>
                  <p className="mt-1.5 max-w-md text-[14.5px] leading-[1.5] text-white/70">
                    Copilot on live project data — insights, drafts, and actions
                    with your permissions.
                  </p>
                </div>
                <TicketButton href="/zed-ai" variant="orange">
                  Open Zed AI
                </TicketButton>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
