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
    <div className="group/node flex w-[156px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200]/40 hover:bg-white/[0.08]">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6200]/30 to-[#FF6200]/10 ring-1 ring-[#FF6200]/30">
        <Icon size={18} className="text-[#FF8A3D]" aria-hidden />
      </span>
      <p className="mt-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white">
        {node.title}
      </p>
      <p className="mt-0.5 text-[11px] leading-tight text-[#9DB0CC]">{node.desc}</p>
    </div>
  );
}

export default function ConnectedProject() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-white px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...scrollMotionProps(isMobile, { y: 22, duration: 0.45 })}
          className="relative overflow-hidden rounded-[28px] bg-brand-navy px-5 py-12 sm:px-10 lg:py-16"
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(45,107,255,0.18) 0%, transparent 60%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              One project. Every decision connected.
            </h2>
          </div>

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
                  stroke="rgba(157,176,204,0.28)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Central record */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex w-[210px] flex-col items-center rounded-3xl border border-[#FF6200]/50 bg-gradient-to-b from-[#0E2747] to-[#0B1F3A] px-6 py-6 text-center shadow-[0_0_60px_rgba(255,98,0,0.22)] ring-1 ring-white/5">
                <span className="absolute -inset-px rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,98,0,0.15),transparent_70%)] blur-md" aria-hidden />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A3D]">
                  Project record
                </p>
                <p className="relative mt-2 text-xl font-extrabold text-white">
                  Commercial Tower
                </p>
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
              <div className="flex w-full flex-col items-center rounded-3xl border border-[#FF6200]/50 bg-gradient-to-b from-[#0E2747] to-[#0B1F3A] px-6 py-5 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF8A3D]">
                  Project record
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">Commercial Tower</p>
              </div>
              <div className="my-2 h-6 w-px bg-white/20" aria-hidden />
              <div className="flex w-full flex-col gap-3">
                {nodes.map((n) => (
                  <div key={n.key} className="flex flex-col items-center">
                    <NodeCard node={n} />
                    {n.key !== "daily" ? (
                      <div className="my-2 h-4 w-px bg-white/20" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
