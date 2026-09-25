import { Database, Eye, Link2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Value = {
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const values: Value[] = [
  {
    title: "One project record",
    desc: "Everyone works from the same source of truth.",
    Icon: Database,
  },
  {
    title: "Real-time visibility",
    desc: "See what is happening as work happens.",
    Icon: Eye,
  },
  {
    title: "Connected operations",
    desc: "Schedule, workforce, materials, QA and cost stay connected.",
    Icon: Link2,
  },
  {
    title: "AI-powered insights",
    desc: "Turn project data into actionable decisions.",
    Icon: Sparkles,
  },
];

export default function ValueStrip() {
  return (
    <section className="border-y border-[#E3E8F0] bg-white px-4 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {values.map((v, i) => {
          const Icon = v.Icon;
          return (
            <div
              key={v.title}
              className={`flex items-start gap-3 px-0 lg:px-7 ${
                i !== 0 ? "lg:border-l lg:border-[#E3E8F0]" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF]">
                <Icon size={17} className="text-brand-navy" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-navy">{v.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-[#6B778C]">
                  {v.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
