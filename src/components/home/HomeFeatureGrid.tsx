import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import {
  ArrowRight,
} from "lucide-react";
import { PiBankFill, PiCalendarCheckFill, PiClipboardTextFill, PiCpuFill, PiFolderOpenFill, PiKanbanFill, PiListChecksFill, PiPackageFill, PiShieldCheckFill, PiStackFill, PiUsersFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  framePad,
  Highlight,
  Section,
  SplitHeader,
  TicketButton,
} from "@/components/design-system/primitives";

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
  const { t } = useI18n();
  return (
    <a
      href={c.href}
      className="group relative flex flex-col bg-white p-4 transition-colors duration-200 hover:bg-[#FAFBFC] sm:min-h-[248px] sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] bg-white text-[#5E6C84] shadow-[0_1px_2px_rgba(14,27,51,0.05)] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
          <c.icon size={20} aria-hidden />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#677388]">{t(c.group)}</span>
      </div>
      <h3 className="pt-6 text-[16px] sm:pt-10 sm:text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{t(c.title)}</h3>
      <p className="mt-1.5 max-w-[36ch] text-[13px] leading-[1.5] sm:text-[14.5px] sm:leading-[1.55] text-[#616D82]">{t(c.desc)}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-brand-navy">
        {t("Explore")}
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </span>
    </a>
  );
}

/** Ten modules in one hairline grid that runs rail to rail, closed by the Zed AI cell. */
export default function FeatureGridPreview() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  return (
    <Section id="capabilities" labelledBy="dp-capabilities">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-capabilities"
            title={<>{t("Purpose-built tools for ")}<Highlight>{t("MEP teams.")}</Highlight></>}
            body={t("Estimators, planners, buyers, site teams, and managers get dedicated tools that work from the same project record.")}
          />
        </motion.div>
      </div>
      <motion.div
        {...scrollMotionProps(isMobile, { y: 18, duration: 0.45, delay: 0.05 })}
        className="m-carousel grid grid-cols-2 gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] lg:grid-cols-3"
      >
        {caps.map((c) => (
          <Cell key={c.title} c={c} />
        ))}
        <div className="relative flex min-h-[248px] flex-col overflow-hidden bg-[#0E1B33] col-span-2 p-5 sm:p-8">
          <div className="relative flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] text-[#FFB37F]">
              <PiCpuFill size={20} aria-hidden />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/45">{t("New")}</span>
          </div>
          <div className="relative mt-auto flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[22px] font-medium tracking-[-0.03em] text-white">Zed AI</h3>
              <p className="mt-1.5 max-w-md text-[14.5px] leading-[1.55] text-white/60">
                {t("Copilot on live project data: insights, drafts, and actions with your permissions.")}
              </p>
            </div>
            <TicketButton href="/zed-ai" variant="white">
              {t("Open Zed AI")}
            </TicketButton>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
