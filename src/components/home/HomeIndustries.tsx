import { motion } from "framer-motion";
import { PiBankFill, PiBuildingsFill, PiDatabaseFill, PiFactoryFill, PiGasPumpFill, PiGearFill, PiHardHatFill, PiHospitalFill, PiLightningFill, PiUsersFill, PiWrenchFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  framePad,
  Highlight,
  Section,
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

/**
 * Industry bento: seven photo tiles. The lead tile is large and always shows its sectors;
 * the rest reveal theirs on hover or focus (and always on touch screens).
 */
const tileLayout = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
];

function IndustryTile({ it, index, isMobile }: { it: (typeof industries)[number]; index: number; isMobile: boolean }) {
  const lead = index === 0;
  return (
    <motion.a
      href="/who-we-serve"
      {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: (index % 4) * 0.05 })}
      className={`group relative isolate flex min-h-[240px] flex-col justify-end overflow-hidden rounded-xl bg-[#0E1B33] p-5 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:p-6 ${lead ? "min-h-[320px] lg:min-h-0" : ""} ${tileLayout[index] ?? ""}`}
    >
      <img
        src={it.image}
        alt=""
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(14,27,51,0)_25%,rgba(14,27,51,0.55)_60%,rgba(14,27,51,0.92)_100%)]" />
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">
            <it.icon size={13} className="text-[#FFB37F]" aria-hidden />
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-2 font-medium tracking-[-0.03em] text-white ${lead ? "text-[28px] sm:text-[32px]" : "text-[20px]"}`}>{it.title}</h3>
          {lead ? <p className="mt-1.5 max-w-[42ch] text-[15px] leading-[1.5] text-white/75">{it.blurb}</p> : null}
          <ul
            className={`flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ${
              lead
                ? "mt-4 max-h-24 opacity-100"
                : "max-h-24 opacity-100 [@media(hover:hover)]:mt-0 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:mt-3 [@media(hover:hover)]:group-hover:max-h-24 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:mt-3 [@media(hover:hover)]:group-focus-visible:max-h-24 [@media(hover:hover)]:group-focus-visible:opacity-100 mt-3"
            }`}
          >
            {it.items.map((line) => (
              <li key={line} className="rounded-[4px] border border-white/20 bg-white/10 px-2 py-0.5 text-[12px] text-white/90 backdrop-blur-sm">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <ArrowUpRight size={18} className="mb-1 shrink-0 text-white/50 transition-colors group-hover:text-white" aria-hidden />
      </div>
    </motion.a>
  );
}

function IndustryShowcase({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="grid auto-rows-[240px] gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
      {industries.map((it, i) => (
        <IndustryTile key={it.title} it={it} index={i} isMobile={isMobile} />
      ))}
    </div>
  );
}

export default function IndustriesPreview() {
  const isMobile = useIsMobile();
  return (
    <>
      <Section id="industries" labelledBy="dp-industries">
        <div className={`py-20 lg:py-28 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SplitHeader
              id="dp-industries"
              title={<>Built for every construction <Highlight>industry.</Highlight></>}
              body="ZedOps helps teams plan, execute and deliver projects across a wide range of industries."
            />
          </motion.div>
          <div className="mt-14 lg:mt-16">
            <IndustryShowcase isMobile={isMobile} />
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="dp-contractors">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SplitHeader
              id="dp-contractors"
              title={<>For every <Highlight>contractor.</Highlight></>}
              body="Whether you build, manage, install or maintain, ZedOps connects your people, processes and projects in one platform."
              cta={<TicketButton href="/contact">Request a demo</TicketButton>}
            />
          </motion.div>
        </div>

        <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-6">
          {contractors.map((c, i) => (
            <motion.a
              key={c.title}
              href="/who-we-serve"
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: i * 0.05 })}
              className={`group flex flex-col bg-[#F7F8FA] p-5 transition-colors hover:bg-white sm:p-6 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <div className={`overflow-hidden rounded-lg ${i < 2 ? "h-60" : "h-44"}`}>
                <img
                  src={c.image}
                  alt={c.title}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 flex items-center justify-between gap-2 text-[17px] font-medium tracking-[-0.02em] text-brand-navy">
                {c.title}
                <ArrowUpRight size={16} className="shrink-0 text-[#A5AEBF] transition-colors group-hover:text-brand-orange" aria-hidden />
              </h3>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6B778C]">{c.desc}</p>
            </motion.a>
          ))}
        </div>
      </Section>
    </>
  );
}
