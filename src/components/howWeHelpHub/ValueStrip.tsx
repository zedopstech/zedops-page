import { Database, Eye, Link2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/design-system/primitives";

const values: { title: string; desc: string; Icon: LucideIcon }[] = [
  { title: "One project record", desc: "Everyone works from the same source of truth.", Icon: Database },
  { title: "Live visibility", desc: "See what is happening as the work happens.", Icon: Eye },
  { title: "Connected operations", desc: "Schedule, workforce, materials, QA and cost stay linked.", Icon: Link2 },
  { title: "Zed AI insights", desc: "Turn project data into the next decision.", Icon: Sparkles },
];

/** Four value statements in hairline cells. */
export default function ValueStrip() {
  return (
    <Section label="What you get">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <li
            key={v.title}
            className={`border-[#E8ECF2] px-6 py-8 sm:px-8 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i === 2 ? "lg:border-s" : ""}`}
          >
            <v.Icon size={18} className="text-brand-orange" aria-hidden />
            <p className="mt-4 text-[15px] font-medium text-brand-navy">{v.title}</p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#616D82]">{v.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
