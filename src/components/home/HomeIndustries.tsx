import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiBankFill, PiBuildingsFill, PiDatabaseFill, PiFactoryFill, PiGasPumpFill, PiGearFill, PiHardHatFill, PiHospitalFill, PiLightningFill, PiUsersFill, PiWrenchFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import {
  ArrowUpRight,
  Factory,
  Landmark,
  Server,
  Zap,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  darkBand,
  DotGrid,
  Glow,
  h2Class,
  Highlight,
  SplitHeader,
  TicketButton,
} from "@/components/design-system/primitives";

const industries: {
  title: string;
  icon: IconType;
  image: string;
  blurb: string;
  items: string[];
}[] = [
  {
    title: "Infrastructure",
    icon: PiBankFill,
    image: "/industries/infrastructure.webp",
    blurb:
      "Highways, bridges, rail and airports — one programme from site to handover.",
    items: [
      "Highways & roads",
      "Bridges & tunnels",
      "Rail & metro",
      "Airports",
    ],
  },
  {
    title: "Power Generation",
    icon: PiLightningFill,
    image: "/industries/power-generation.jpg",
    blurb: "Thermal, renewables, transmission and substations on one thread.",
    items: ["Thermal plants", "Solar & wind", "Transmission", "Substations"],
  },
  {
    title: "Oil & Gas",
    icon: PiGasPumpFill,
    image: "/industries/oil-gas.jpg",
    blurb:
      "Upstream to refinery — materials, QA and closeout on the same record.",
    items: ["Upstream", "Midstream", "Downstream", "Refineries"],
  },
  {
    title: "Industrial",
    icon: PiFactoryFill,
    image: "/industries/industrial1.png",
    blurb:
      "Manufacturing and process plants with field execution that matches the plan.",
    items: ["Manufacturing", "Process plants", "Warehousing", "Factories"],
  },
  {
    title: "Commercial",
    icon: PiBuildingsFill,
    image: "/industries/commercial.webp",
    blurb:
      "Offices, retail and mixed-use — trades coordinated without spreadsheet lag.",
    items: ["Offices", "Retail", "Mixed-use", "Hospitality"],
  },
  {
    title: "Healthcare",
    icon: PiHospitalFill,
    image: "/industries/healthcare.jpg",
    blurb:
      "Hospitals and labs where inspections, punch and documents stay tied together.",
    items: ["Hospitals", "Clinics", "Labs", "Medical campuses"],
  },
  {
    title: "Data Centres",
    icon: PiDatabaseFill,
    image: "/photos/data-center.png",
    blurb:
      "Hyperscale to edge — MEP packages tracked from install through commissioning.",
    items: ["Hyperscale", "Colocation", "Enterprise", "Edge sites"],
  },
];

const contractors: {
  title: string;
  icon: IconType;
  image: string;
  desc: string;
}[] = [
  {
    title: "MEP Contractors",
    icon: PiLightningFill,
    image: "/contractors/MEPc.png",
    desc: "Run mechanical, electrical and plumbing work from one job record — schedule to punch.",
  },
  {
    title: "General Contractors",
    icon: PiHardHatFill,
    image: "/contractors/general2.png",
    desc: "Keep trades, programme and cost on one thread so field and office stop reconciling spreadsheets.",
  },
  {
    title: "Subcontractors",
    icon: PiUsersFill,
    image: "/contractors/subco.webp",
    desc: "Take assigned packages, report from site, and hand work back without a second system.",
  },
  {
    title: "Specialty Contractors",
    icon: PiGearFill,
    image: "/contractors/spec.webp",
    desc: "Execute scoped trades with checklists, QA and documents that roll into the main job.",
  },
  {
    title: "Service Contractors",
    icon: PiWrenchFill,
    image: "/contractors/service2.webp",
    desc: "Maintain, install and respond with the same project context used during construction.",
  },
];

/** hexalog "Integrated supply chain solutions": tab rail | image | gradient copy card with full-width CTA. */
function IndustryShowcase() {
  const [active, setActive] = useState(0);
  const current = industries[active]!;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) setActive((i) => (i + 1) % industries.length);
    }, 4500);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-0">
      <div
        role="tablist"
        aria-label="Industries"
        className="-mx-5 flex gap-5 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-r lg:border-[#E3E8F0] lg:px-0 lg:pr-6"
      >
        {industries.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center justify-between gap-3 border-b py-3 text-left text-[16px] font-medium transition-colors lg:py-3.5 ${
                on
                  ? "border-brand-navy text-brand-navy"
                  : "border-[#E3E8F0] text-[#8C97AB] hover:text-brand-navy"
              }`}
            >
              {it.title}
              <it.icon
                size={18}
                className={on ? "text-brand-orange" : "text-[#A5AEBF]"}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="relative h-[280px] overflow-hidden rounded-xl bg-[#E9EEF6] sm:h-[360px] lg:mx-4 lg:h-auto lg:min-h-[400px]">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            // The image sits in a fixed-aspect container, but explicit dimensions
            // still let the browser reserve space before the file arrives.
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <motion.div
        key={current.title}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col rounded-xl border border-[#E3E8F0] p-5"
        style={{
          backgroundImage: "linear-gradient(200deg, #FFE3D2 0%, #fff 45%)",
        }}
      >
        <p className="text-[15px] leading-[1.6] text-brand-navy">
          {current.blurb}
        </p>
        <ul className="mt-5 space-y-2">
          {current.items.map((line) => (
            <li
              key={line}
              className="flex items-center gap-2 text-[14px] text-[#3D4F6E]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <TicketButton href="/contact" full>
            Request Demo
          </TicketButton>
        </div>
      </motion.div>
    </div>
  );
}

export default function IndustriesPreview() {
  const isMobile = useIsMobile();
  return (
    <>
      <section
        id="industries"
        className="relative bg-white py-20 lg:py-[100px]"
        aria-labelledby="dp-industries"
      >
        <Container>
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
          >
            <SplitHeader
              id="dp-industries"
              title={
                <>
                  Built for every construction <Highlight>industry</Highlight>
                </>
              }
              body="ZedOps empowers teams to plan, execute and deliver projects across a wide range of industries."
              icons={[Landmark, Zap, Factory, Server]}
            />
          </motion.div>
          <motion.div
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="mt-14"
          >
            <IndustryShowcase />
          </motion.div>
        </Container>
      </section>

      {/* hexalog "Discover what's new": dark band, white 16px cards with tag pill + inset image */}
      <section
        className={`relative overflow-hidden py-20 lg:py-[100px] ${darkBand}`}
        aria-labelledby="dp-contractors"
      >
        <DotGrid
          dark
          className="[mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <Glow color="navy" className="-top-40 right-0 h-[520px] w-[520px]" />
        <Container className="relative">
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <h2 id="dp-contractors" className={`${h2Class} text-white`}>
                For every <Highlight>contractor</Highlight>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-[1.6] text-white/70">
                One platform designed to streamline work, improve collaboration
                and drive project success for all types of contractors.
              </p>
            </div>
            <TicketButton href="/contact" variant="orange">
              Request Demo
            </TicketButton>
          </motion.div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {contractors.map((c, i) => (
              <motion.article
                key={c.title}
                {...scrollMotionProps(isMobile, {
                  y: 14,
                  duration: 0.35,
                  delay: i * 0.05,
                })}
                className={`group flex flex-col rounded-2xl bg-white p-2.5 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <div className="px-2 pt-1.5 pb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E8F0] bg-[#F4F6FA] px-2.5 py-0.5 text-[12px] font-semibold text-brand-navy">
                    <c.icon
                      size={12}
                      className="text-brand-orange"
                      aria-hidden
                    />
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className={`overflow-hidden rounded-xl ${i < 2 ? "h-56" : "h-44"}`}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                  <h3 className="flex items-center justify-between gap-2 text-[17px] font-semibold tracking-tight text-brand-navy">
                    {c.title}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-[#A5AEBF] transition-colors group-hover:text-brand-orange"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-[#5E6C84]">
                    {c.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 lg:grid-cols-2 lg:gap-16">
            <p className="text-[15px] leading-[1.6] text-white/70">
              Whether you build, manage, install or maintain — ZedOps connects
              your people, processes and projects in one unified platform.
            </p>
            <p className="text-[20px] font-semibold leading-snug tracking-[-0.02em] text-white">
              One Platform. Every Industry.{" "}
              <span className="text-[#C9D7EB]">
                Every Contractor. Every Project.
              </span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
