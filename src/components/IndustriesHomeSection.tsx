import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Factory,
  Fuel,
  HardHat,
  Hospital,
  Landmark,
  Plus,
  Server,
  Settings,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";

const AUTO_MS = 4000;

const industries: {
  title: string;
  icon: LucideIcon;
  image: string;
  blurb: string;
  items: string[];
}[] = [
  {
    title: "Infrastructure",
    icon: Landmark,
    image: "/industries/infrastructure.jpg",
    blurb: "Highways, bridges, rail and airports — one programme from site to handover.",
    items: ["Highways & roads", "Bridges & tunnels", "Rail & metro", "Airports"],
  },
  {
    title: "Power Generation",
    icon: Zap,
    image: "/industries/power-generation.jpg",
    blurb: "Thermal, renewables, transmission and substations on one thread.",
    items: ["Thermal plants", "Solar & wind", "Transmission", "Substations"],
  },
  {
    title: "Oil & Gas",
    icon: Fuel,
    image: "/industries/oil-gas.jpg",
    blurb: "Upstream to refinery — materials, QA and closeout on the same record.",
    items: ["Upstream", "Midstream", "Downstream", "Refineries"],
  },
  {
    title: "Industrial",
    icon: Factory,
    image: "/industries/industrial1.png",
    blurb: "Manufacturing and process plants with field execution that matches the plan.",
    items: ["Manufacturing", "Process plants", "Warehousing", "Factories"],
  },
  {
    title: "Commercial",
    icon: Building2,
    image: "/industries/commercial.jpg",
    blurb: "Offices, retail and mixed-use — trades coordinated without spreadsheet lag.",
    items: ["Offices", "Retail", "Mixed-use", "Hospitality"],
  },
  {
    title: "Healthcare",
    icon: Hospital,
    image: "/industries/healthcare.jpg",
    blurb: "Hospitals and labs where inspections, punch and documents stay tied together.",
    items: ["Hospitals", "Clinics", "Labs", "Medical campuses"],
  },
  {
    title: "Data Centres",
    icon: Server,
    image: "/data-center.png",
    blurb: "Hyperscale to edge — MEP packages tracked from install through commissioning.",
    items: ["Hyperscale", "Colocation", "Enterprise", "Edge sites"],
  },
];

const contractors: {
  title: string;
  icon: LucideIcon;
  image: string;
  desc: string;
}[] = [
  {
    title: "MEP Contractors",
    icon: Zap,
    image: "/contractors/MEPc.png",
    desc: "Run mechanical, electrical and plumbing work from one job record — schedule to punch.",
  },
  {
    title: "General Contractors",
    icon: HardHat,
    image: "/contractors/general2.png",
    desc: "Keep trades, programme and cost on one thread so field and office stop reconciling spreadsheets.",
  },
  {
    title: "Subcontractors",
    icon: Users,
    image: "/contractors/subco.png",
    desc: "Take assigned packages, report from site, and hand work back without a second system.",
  },
  {
    title: "Specialty Contractors",
    icon: Settings,
    image: "/contractors/spec.png",
    desc: "Execute scoped trades with checklists, QA and documents that roll into the main job.",
  },
  {
    title: "Service Contractors",
    icon: Wrench,
    image: "/contractors/service2.png",
    desc: "Maintain, install and respond with the same project context used during construction.",
  },
];

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

function CornerTicks() {
  return (
    <>
      <span className="pointer-events-none absolute -left-1 -top-1 h-3.5 w-3.5 border-l-2 border-t-2 border-brand-orange" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-3.5 w-3.5 border-r-2 border-t-2 border-brand-orange" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-brand-orange" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-brand-orange" />
    </>
  );
}

function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const current = industries[active]!;
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((i) => (i + 1) % industries.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8EDF4] bg-[#F4F6FB] shadow-[0_16px_40px_-28px_rgba(23,43,77,0.28)]"
      aria-roledescription="carousel"
      aria-label="Construction industries"
    >
      <div className="grid lg:grid-cols-[minmax(17rem,0.38fr)_minmax(0,1fr)]">
        <ul className="m-0 flex list-none flex-col p-0" role="tablist" aria-label="Industries">
          {industries.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === active;
            return (
              <li key={item.title} className="min-w-0 border-b border-[#E5E7EB] last:border-b-0 lg:border-r">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="industry-panel"
                  className={`flex w-full min-h-[64px] items-start gap-3 px-5 py-5 text-left transition-colors lg:min-h-[72px] ${
                    isActive ? "bg-brand-navy" : "bg-transparent hover:bg-white"
                  }`}
                  onClick={() => setActive(i)}
                >
                  <Icon
                    size={18}
                    className={`mt-0.5 shrink-0 ${isActive ? "text-brand-orange" : "text-brand-navy"}`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-extrabold tracking-[0.08em] uppercase ${
                        isActive ? "text-brand-orange" : "text-brand-navy"
                      }`}
                    >
                      {item.title}
                    </span>
                    {isActive ? (
                      <>
                        <span className="mt-2 block text-sm leading-snug font-medium text-white/85">
                          {item.blurb}
                        </span>
                      </>
                    ) : null}
                  </span>
                  {isActive ? (
                    <X size={16} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                  ) : (
                    <Plus size={16} className="mt-0.5 shrink-0 text-[#97A0AF]" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div id="industry-panel" className="relative min-h-[280px] overflow-hidden bg-brand-navy lg:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <img
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1220]/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-3 flex items-center gap-2">
                  <CurrentIcon size={18} className="text-brand-orange" aria-hidden />
                  <p className="text-sm font-extrabold text-white">{current.title}</p>
                </div>
                <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-1.5 p-0">
                  {current.items.map((line) => (
                    <li key={line} className="flex items-center gap-2 text-sm font-medium text-white/90">
                      <span className="h-1.5 w-1.5 shrink-0 bg-brand-orange" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ContractorShowcase() {
  const [active, setActive] = useState(0);
  const n = contractors.length;
  const current = contractors[active]!;
  const CurrentIcon = current.icon;
  const prev = wrapIndex(active - 1, n);
  const next = wrapIndex(active + 1, n);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((i) => wrapIndex(i + 1, n));
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <div
      className="overflow-hidden rounded-2xl bg-brand-navy py-6 sm:py-7 lg:py-8"
      aria-roledescription="carousel"
      aria-label="Contractor types"
    >
      <div className="flex items-center justify-center gap-3 px-3 sm:gap-4 sm:px-5 lg:px-6">
        <button
          type="button"
          className="relative hidden h-[230px] w-[17%] shrink-0 overflow-hidden rounded-xl opacity-40 transition-opacity hover:opacity-55 lg:block"
          onClick={() => setActive(prev)}
          aria-label={`Show ${contractors[prev]!.title}`}
        >
          <img src={contractors[prev]!.image} alt="" className="h-full w-full object-cover" />
        </button>

        <article className="relative w-full max-w-4xl lg:w-[66%]">
          <CornerTicks />
          <div className="overflow-hidden rounded-xl">
            <div className="relative h-[250px] sm:h-[290px] lg:h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <img src={current.image} alt={current.title} className="h-full w-full object-cover object-center" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/75 via-[#0B1220]/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-2.5 sm:bottom-6 sm:left-6">
                    <CurrentIcon size={20} className="text-brand-orange" aria-hidden />
                    <p className="text-[28px] font-extrabold tracking-tight text-white sm:text-[32px] lg:text-[38px]">
                      {current.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-6">
              <p className="m-0 max-w-2xl text-base leading-snug font-medium text-white/90">
                “{current.desc}”
              </p>
              <a
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-brand-orange px-5 py-3 text-sm font-extrabold text-white uppercase transition-colors hover:bg-brand-orange-soft"
              >
                Request Demo
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </div>
        </article>

        <button
          type="button"
          className="relative hidden h-[230px] w-[17%] shrink-0 overflow-hidden rounded-xl opacity-40 transition-opacity hover:opacity-55 lg:block"
          onClick={() => setActive(next)}
          aria-label={`Show ${contractors[next]!.title}`}
        >
          <img src={contractors[next]!.image} alt="" className="h-full w-full object-cover" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-brand-orange transition-colors hover:text-white"
          onClick={() => setActive(prev)}
          aria-label="Previous contractor"
        >
          <ChevronLeft size={22} aria-hidden />
        </button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Contractor slides">
          {contractors.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={item.title}
              className={`h-2 w-2 rounded-[2px] transition-colors ${
                i === active ? "bg-brand-orange" : "bg-white/25 hover:bg-white/45"
              }`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-brand-orange transition-colors hover:text-white"
          onClick={() => setActive(next)}
          aria-label="Next contractor"
        >
          <ChevronRight size={22} aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default function IndustriesHomeSection() {
  const isMobile = useIsMobile();

  return (
    <section id="industries" className="border-t border-gray-100 bg-white" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })}>
          <SectionHeader
            id="industries-heading"
            title={
              <>
                Built for every construction <span className="text-brand-orange">industry</span>
              </>
            }
            subtitle="ZedOps empowers teams to plan, execute and deliver projects across a wide range of industries."
          />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.04 })}>
          <IndustryShowcase />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })}>
          <SectionHeader
            className="mt-14 lg:mt-16"
            title={
              <>
                For every <span className="text-brand-orange">contractor</span>
              </>
            }
            subtitle="One platform designed to streamline work, improve collaboration and drive project success for all types of contractors."
          />
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.04 })}>
          <ContractorShowcase />
        </motion.div>
      </div>

      <div className="border-b-[3px] border-brand-orange bg-brand-navy">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-9">
          <p className="flex items-start gap-3 text-sm leading-snug text-white/85 sm:text-base">
            <Users size={22} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
            Whether you build, manage, install or maintain — ZedOps connects your people, processes and projects in one
            unified platform.
          </p>
          <p className="flex items-start gap-3 border-t border-white/10 pt-6 text-sm font-semibold leading-snug text-white lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 sm:text-base">
            <Crosshair size={22} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
            One Platform. Every Industry. Every Contractor. Every Project.
          </p>
        </div>
      </div>
    </section>
  );
}
