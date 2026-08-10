import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Crosshair,
  Factory,
  Fuel,
  HardHat,
  Hospital,
  Landmark,
  Server,
  Settings,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const INDUSTRY_GAP_PX = 16;
const AUTO_MS = 2000;

const industries: {
  title: string;
  icon: LucideIcon;
  image: string;
  items: string[];
}[] = [
  {
    title: "Infrastructure",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=640&q=80&auto=format&fit=crop",
    items: ["Highways & roads", "Bridges & tunnels", "Rail & metro", "Airports"],
  },
  {
    title: "Power Generation",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=640&q=80&auto=format&fit=crop",
    items: ["Thermal plants", "Solar & wind", "Transmission", "Substations"],
  },
  {
    title: "Oil & Gas",
    icon: Fuel,
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=640&q=80&auto=format&fit=crop",
    items: ["Upstream", "Midstream", "Downstream", "Refineries"],
  },
  {
    title: "Industrial",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=640&q=80&auto=format&fit=crop",
    items: ["Manufacturing", "Process plants", "Warehousing", "Factories"],
  },
  {
    title: "Commercial",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&q=80&auto=format&fit=crop",
    items: ["Offices", "Retail", "Mixed-use", "Hospitality"],
  },
  {
    title: "Healthcare",
    icon: Hospital,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=640&q=80&auto=format&fit=crop",
    items: ["Hospitals", "Clinics", "Labs", "Medical campuses"],
  },
  {
    title: "Data Centres",
    icon: Server,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop",
    desc: "Run mechanical, electrical and plumbing work from one job record — schedule to punch.",
  },
  {
    title: "General Contractors",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
    desc: "Keep trades, programme and cost on one thread so field and office stop reconciling spreadsheets.",
    
  },
  {
    title: "Subcontractors",
    icon: Users,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80&auto=format&fit=crop",
    desc: "Take assigned packages, report from site, and hand work back without a second system.",
    
  },
  {
    title: "Specialty Contractors",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop",
    desc: "Execute scoped trades with checklists, QA and documents that roll into the main job.",
    
  },
  {
    title: "Service Contractors",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop",
    desc: "Maintain, install and respond with the same project context used during construction.",
  },
];

function useVisibleIndustryCount() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 768) setCount(2);
      else if (w < 1024) setCount(3);
      else setCount(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function IndustryCard({ item }: { item: (typeof industries)[number] }) {
  const Icon = item.icon;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EDF4] bg-white shadow-[0_8px_20px_-16px_rgba(23,43,77,0.2)]">
      <img src={item.image} alt="" className="h-44 w-full object-cover sm:h-48 lg:h-52" />
      <div className="flex flex-1 flex-col px-4 py-4">
        <Icon size={22} strokeWidth={1.75} className="text-brand-orange" aria-hidden />
        <h3 className="mt-2.5 text-sm font-extrabold leading-snug text-brand-navy">{item.title}</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {item.items.map((line) => (
            <li key={line} className="flex items-start gap-2 text-xs leading-snug text-[#42526E]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-orange" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function IndustryCarousel() {
  const visible = useVisibleIndustryCount();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const looped = [...industries, ...industries];

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const width = viewport.clientWidth;
      const cardWidth = (width - INDUSTRY_GAP_PX * (visible - 1)) / visible;
      setStepPx(cardWidth + INDUSTRY_GAP_PX);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  useEffect(() => {
    setIndex(0);
  }, [visible]);

  useEffect(() => {
    if (paused || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => current + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant]);

  const cardWidth = stepPx > 0 ? stepPx - INDUSTRY_GAP_PX : undefined;
  const active = ((index % industries.length) + industries.length) % industries.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Construction industries"
    >
      <div className="overflow-hidden" ref={viewportRef}>
        <ul
          className="m-0 flex list-none p-0"
          style={{
            gap: INDUSTRY_GAP_PX,
            transform: stepPx ? `translate3d(${-index * stepPx}px, 0, 0)` : undefined,
            transition: instant ? "none" : "transform 0.55s ease",
          }}
          onTransitionEnd={() => {
            if (index >= industries.length) {
              setInstant(true);
              setIndex((current) => current - industries.length);
            }
          }}
        >
          {looped.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="min-w-0 shrink-0"
              style={{ width: cardWidth ? `${cardWidth}px` : `${100 / visible}%` }}
              aria-hidden={i < index || i >= index + visible}
            >
              <IndustryCard item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Industry slides">
        {industries.map((item, i) => {
          const isActive = active === i;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.title}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                isActive ? "w-8 bg-brand-orange" : "w-2 bg-[#D0D7E2] hover:bg-[#B6BFC9]"
              }`}
              onClick={() => {
                const base = index >= industries.length ? industries.length : 0;
                setIndex(base + i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function IndustriesHomeSection() {
  const isMobile = useIsMobile();

  return (
    <section id="industries" className="border-t border-gray-100 bg-white" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })} className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <h2
            id="industries-heading"
            className="text-2xl font-extrabold tracking-tight text-brand-navy uppercase sm:text-3xl"
          >
            Built for every construction <span className="text-brand-orange">industry</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#42526E]">
          ZedOps empowers teams to plan, execute and deliver projects across a wide range of industries.
          </p>
        </motion.div>

        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.04 })}>
          <IndustryCarousel />
        </motion.div>

        <motion.div
          {...scrollMotionProps(isMobile, { y: 18, duration: 0.4 })}
          className="mx-auto mt-14 mb-8 max-w-3xl text-center lg:mt-16 lg:mb-10"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy uppercase sm:text-3xl">
            For every <span className="text-brand-orange">contractor</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#42526E]">
          One platform designed to streamline work, improve collaboration and drive project success for all types of contractors </p>
        </motion.div>

        <motion.ul
          {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.04 })}
          className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3"
        >
          {contractors.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="min-w-0">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EDF4] bg-white shadow-[0_8px_20px_-16px_rgba(23,43,77,0.2)]">
                  <div className="relative">
                    <img src={item.image} alt="" className="h-36 w-full object-cover sm:h-40" />
                    <div className="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-navy shadow-[0_8px_16px_-10px_rgba(23,43,77,0.55)]">
                      <Icon size={18} className="text-white" aria-hidden />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pt-8 pb-4">
                    <h3 className="text-[13px] font-extrabold tracking-tight text-brand-navy uppercase">{item.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#6B778C]">{item.desc}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </motion.ul>
      </div>

      <div className="border-b-[3px] border-brand-orange bg-brand-navy">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-9">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
            <Users size={22} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
            Whether you build, manage, install or maintain — ZedOps connects your people, processes and projects in one
            unified platform.
          </p>
          <p className="flex items-start gap-3 border-t border-white/10 pt-6 text-sm font-semibold leading-relaxed text-white lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 sm:text-[15px]">
            <Crosshair size={22} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
            One Platform. Every Industry. Every Contractor. Every Project.
          </p>
        </div>
      </div>
    </section>
  );
}
