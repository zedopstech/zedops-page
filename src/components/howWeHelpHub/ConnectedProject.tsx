import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  CalendarClock,
  Users,
  Package,
  ShieldCheck,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { framePad, Muted, Section, SplitHeader } from "@/components/design-system/primitives";

type Node = {
  key: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  x: number;
  y: number;
};

const nodes: Node[] = [
  { key: "schedule", title: "Schedule", desc: "Planned activities", Icon: CalendarClock, x: 50, y: 13 },
  { key: "workforce", title: "Workforce", desc: "People on site", Icon: Users, x: 15, y: 50 },
  { key: "materials", title: "Materials", desc: "Availability & usage", Icon: Package, x: 85, y: 50 },
  { key: "qaqc", title: "QA / QC", desc: "Inspections & issues", Icon: ShieldCheck, x: 28, y: 86 },
  { key: "cost", title: "Cost", desc: "Actual vs budget", Icon: DollarSign, x: 50, y: 86 },
  { key: "daily", title: "Daily Logs", desc: "Real field activity", Icon: ClipboardList, x: 72, y: 86 },
];

function curvePath(n: Node) {
  const midX = (n.x + 50) / 2;
  const midY = (n.y + 50) / 2;
  const dx = 50 - n.x;
  const dy = 50 - n.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const bow = 7;
  return `M ${n.x} ${n.y} Q ${midX + px * bow} ${midY + py * bow} 50 50`;
}

function NodeCard({ node }: { node: Node }) {
  const Icon = node.Icon;
  return (
    <div className="flex w-[196px] items-center gap-3 rounded-lg border border-[#E3E8F0] bg-white px-3.5 py-3 shadow-[0_10px_24px_-18px_rgba(14,27,51,0.35)]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#E3E8F0] text-brand-orange">
        <Icon size={16} aria-hidden />
      </span>
      <span className="min-w-0 text-start">
        <span className="block text-[14px] font-medium text-brand-navy">{node.title}</span>
        <span className="block truncate text-[12px] text-[#5F6B80]">{node.desc}</span>
      </span>
    </div>
  );
}

export default function ConnectedProject() {
  const isMobile = useIsMobile();

  return (
    <Section tone="mist" labelledBy="hub-connected">
      <div className={`pt-20 pb-6 lg:pt-28 ${framePad}`}>
        <SplitHeader
          id="hub-connected"
          title={<>One project. <Muted>Every decision connected.</Muted></>}
          body="Schedule, people, materials, quality, cost and daily logs all hang off the same project record."
        />
      </div>
        <motion.div
          {...scrollMotionProps(isMobile, { y: 22, duration: 0.45 })}
          className="relative px-5 pb-16 sm:px-10 lg:pb-24"
        >

          {/* Desktop diagram */}
          <div className="relative mx-auto mt-12 hidden h-[380px] w-full max-w-4xl lg:block">
            {/* Connecting lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {nodes.map((n) => (
                <path
                  key={n.key}
                  d={curvePath(n)}
                  fill="none"
                  stroke="#C9D2DF"
                  strokeWidth={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Central record */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex w-[200px] flex-col items-center rounded-xl bg-brand-navy px-6 py-5 text-center shadow-[0_24px_48px_-24px_rgba(14,27,51,0.6)]">
                <p className="text-[12px] text-white/55">Project record</p>
                <p className="mt-1 text-[18px] font-medium text-white">Commercial Tower</p>
              </div>
            </div>

            {/* Nodes */}
            {nodes.map((n) => (
              <div
                key={n.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <NodeCard node={n} />
              </div>
            ))}
          </div>

          {/* Mobile vertical diagram */}
          <div className="relative mx-auto mt-12 max-w-sm lg:hidden">
            <div className="flex flex-col items-center">
              <div className="flex w-full flex-col items-center rounded-xl bg-brand-navy px-6 py-5 text-center">
                <p className="text-[12px] text-white/55">Project record</p>
                <p className="mt-1 text-[18px] font-medium text-white">Commercial Tower</p>
              </div>
              <div className="my-2 h-6 w-px bg-[#C9D2DF]" aria-hidden />
              <div className="flex w-full flex-col gap-3">
                {nodes.map((n) => (
                  <div key={n.key} className="flex flex-col items-center">
                    <NodeCard node={n} />
                    {n.key !== "daily" ? (
                      <div className="my-2 h-4 w-px bg-[#C9D2DF]" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
    </Section>
  );
}
