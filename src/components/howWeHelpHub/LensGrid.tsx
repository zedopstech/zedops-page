import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { ArrowRight, Layers, Building2, Users2, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Fragment } from "react";

type Lens = {
  num: string;
  label: string;
  Icon: LucideIcon;
  accent: string;
  href: string;
  visual: string[];
  timeline?: boolean;
  desc: string;
};

const lenses: Lens[] = [
  {
    num: "01",
    label: "By project stage",
    Icon: Layers,
    accent: "#2D6BFF",
    href: "/how-we-help/project-stage",
    timeline: true,
    visual: ["Preconstruction", "Active Construction", "Closeout"],
    desc: "See how ZedOps supports every phase of the project lifecycle.",
  },
  {
    num: "02",
    label: "By company type",
    Icon: Building2,
    accent: "#102B57",
    href: "/how-we-help/company",
    visual: ["Owner", "General Contractor", "Consultant"],
    desc: "Designed to fit the way owners, contractors and consultants work.",
  },
  {
    num: "03",
    label: "By team",
    Icon: Users2,
    accent: "#00875A",
    href: "/how-we-help/team",
    visual: ["Project Manager", "Site Team", "Commercial", "QA / QC"],
    desc: "Give every team the right tools inside the same platform.",
  },
  {
    num: "04",
    label: "By role & access",
    Icon: ShieldCheck,
    accent: "#6554C0",
    href: "/how-we-help/role",
    visual: ["Admin", "Manager", "Engineer", "Field User"],
    desc: "Role based access, permissions and workflows.",
  },
];

function Visual({ lens }: { lens: Lens }) {
  if (lens.timeline) {
    return (
      <div className="flex items-start">
        {lens.visual.map((step, i) => (
          <Fragment key={step}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: lens.accent }}
              >
                {i + 1}
              </span>
              <span className="max-w-[68px] text-center text-[10px] font-semibold leading-tight text-[#42526E]">
                {step}
              </span>
            </div>
            {i < lens.visual.length - 1 ? (
              <span
                className="mx-1 mb-5 h-px flex-1"
                style={{ backgroundColor: `${lens.accent}40` }}
                aria-hidden
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {lens.visual.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold text-[#102B57]"
          style={{
            borderColor: `${lens.accent}33`,
            backgroundColor: `${lens.accent}0D`,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: lens.accent }}
            aria-hidden
          />
          {item}
        </span>
      ))}
    </div>
  );
}

export default function LensGrid() {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden bg-[#F6F8FC] px-4 py-14 lg:py-20">
      {/* Soft decorative blobs */}
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2D6BFF]/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#FF6200]/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6200]">
            Explore ZedOps
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#102B57] sm:text-4xl">
            One platform. Four lenses.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {lenses.map((lens, i) => {
            const Icon = lens.Icon;
            return (
              <motion.a
                key={lens.href}
                href={lens.href}
                {...scrollMotionProps(isMobile, { y: 24, duration: 0.42, delay: i * 0.06 })}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E3E8F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-20px_rgba(23,43,77,0.22)]"
              >
                {/* Top accent bar (reveals on hover) */}
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: lens.accent }}
                  aria-hidden
                />

                {/* Header: icon + number */}
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${lens.accent}22, ${lens.accent}0A)`,
                      boxShadow: `inset 0 0 0 1px ${lens.accent}33`,
                    }}
                  >
                    <Icon size={20} style={{ color: lens.accent }} aria-hidden />
                  </div>
                  <span className="font-mono text-xs font-bold tabular-nums text-[#97A0AF]">
                    {lens.num}
                  </span>
                </div>

                {/* Category label */}
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#97A0AF]">
                  {lens.label}
                </p>

                {/* Visual */}
                <div className="mt-5">
                  <Visual lens={lens} />
                </div>

                {/* Description */}
                <p className="mt-5 flex-1 text-sm leading-snug text-[#6B778C]">
                  {lens.desc}
                </p>

                {/* Link */}
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy transition-colors group-hover:text-brand-navy/75">
                  Explore
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
