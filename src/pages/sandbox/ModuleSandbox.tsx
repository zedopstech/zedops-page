import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  LayoutGrid,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { getModuleNavContext } from "@/data/platformFeatures";
import Navbar from "@/components/Navbar";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/Footer";
import {
  DailyLogMock,
  DocumentsMock,
} from "@/components/sandbox/ModuleMocks";
import {
  CenterHeader,
  Container,
  CornerTicks,
  darkBand,
  DotGrid,
  Eyebrow,
  GhostButton,
  Glow,
  Highlight,
  TicketButton,
} from "@/components/design-system/primitives";

const MODULE_ID = "information-management";

const itemVisual: Record<string, { icon: LucideIcon; mock: ReactNode }> = {
  Documents: { icon: FolderOpen, mock: <DocumentsMock /> },
  "Daily logs": { icon: ClipboardList, mock: <DailyLogMock /> },
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

/** "Information management" → head "Information", tail "management". */
function splitTitle(title: string) {
  const i = title.lastIndexOf(" ");
  return i < 0
    ? { head: "", tail: title }
    : { head: title.slice(0, i), tail: title.slice(i + 1) };
}

/** Design-direction mock of the generic platform module template. */
export default function ModulePreview() {
  const isMobile = useIsMobile();
  const ctx = useMemo(() => getModuleNavContext(MODULE_ID), []);
  useSEO({
    title: "Sandbox  -  Module",
    description: "Internal design-direction mock of a ZedOps module page.",
    noindex: true,
  });
  if (!ctx) return null;

  const { section, prev, next } = ctx;
  const itemCount = section.items.length;
  const subtitle = `This area includes ${itemCount} product ${itemCount === 1 ? "capability" : "capabilities"} - permissioned and tenant-scoped like the rest of ZedOps. Explore the feature cards below or continue to another module.`;
  const { head, tail } = splitTitle(section.title);
  const fade = (delay: number, y = 14) =>
    isMobile
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy antialiased">
      <Navbar />

      {/* Hero — same wash + two-tone headline as Home */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FCE7DA_0%,#F6EEEC_45%,#FFFFFF_100%)] pt-[140px] pb-20 sm:pt-[156px] lg:pb-24">
        <Container className="relative z-10 text-center">
          <motion.div {...fade(0)} className="mb-7 flex justify-center">
            <Eyebrow tag="Module">ZedOps platform</Eyebrow>
          </motion.div>
          <motion.h1
            {...fade(0.05, 18)}
            className="text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[46px] lg:text-[56px]"
          >
            {head ? <span className="text-brand-orange">{head}</span> : null}
            <br />
            <span className="text-brand-navy">{tail}.</span>
          </motion.h1>
          <motion.p
            {...fade(0.12)}
            className="mx-auto mt-5 max-w-2xl text-base font-medium leading-[1.55] text-brand-navy/75 sm:text-[17px]"
          >
            {subtitle}
          </motion.p>
          <motion.div
            {...fade(0.18)}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <TicketButton href="/early-access">
              Request early access
            </TicketButton>
            <GhostButton href="/contact?topic=demo" icon={CalendarDays}>
              Book a demo
            </GhostButton>
          </motion.div>
          <motion.div
            {...fade(0.24)}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {section.items.map((it) => {
              const Icon = itemVisual[it.name]?.icon ?? LayoutGrid;
              return (
                <a
                  key={it.name}
                  href={`#${slug(it.name)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E3E8F0] bg-white py-1.5 pr-4 pl-2 text-[14px] font-medium text-brand-navy shadow-[0_4px_14px_-8px_rgba(23,43,77,0.25)] transition-colors hover:border-brand-orange/40"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE9DD]">
                    <Icon size={13} className="text-brand-orange" aria-hidden />
                  </span>
                  {it.name}
                </a>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Everything in {section} — framed mock + copy, alternating sides */}
      <section className="relative bg-white pb-20 lg:pb-[100px]">
        <Container>
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
          >
            <CenterHeader
              title={
                <>
                  Everything in
                  <br />
                  <Highlight>{section.title}</Highlight>
                </>
              }
              body={
                <>
                  {itemCount} {itemCount === 1 ? "capability" : "capabilities"}{" "}
                  in this area - each explained below. Access follows your
                  organisation&apos;s roles.
                </>
              }
            />
          </motion.div>

          <div className="mt-14 space-y-16 lg:space-y-24">
            {section.items.map((item, i) => {
              const vis = itemVisual[item.name];
              const Icon = vis?.icon ?? LayoutGrid;
              const flip = i % 2 === 1;
              return (
                <article
                  key={item.name}
                  id={slug(item.name)}
                  className="grid scroll-mt-32 items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  {/* framed mock with crop-marks */}
                  <motion.div
                    {...scrollMotionProps(isMobile, { y: 22, duration: 0.5 })}
                    className={`relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-2xl border px-5 py-12 sm:px-10 lg:min-h-[440px] ${
                      flip ? "lg:order-2" : ""
                    } ${i % 2 === 0 ? "border-[#E3E8F0] bg-[#F4F6FA]" : `border-transparent ${darkBand}`}`}
                  >
                    <DotGrid dark={i % 2 === 1} />
                    <Glow className="-bottom-32 left-1/2 h-[360px] w-[360px] -translate-x-1/2" />
                    <CornerTicks tone={i % 2 === 1 ? "light" : "orange"} />
                    <div className="relative w-full max-w-[440px]">
                      {vis?.mock}
                    </div>
                  </motion.div>

                  {/* copy */}
                  <motion.div
                    {...scrollMotionProps(isMobile, {
                      y: 18,
                      duration: 0.45,
                      delay: 0.06,
                    })}
                    className={flip ? "lg:order-1" : ""}
                  >
                    <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#616D82]">
                      <span className="h-2 w-2 bg-brand-orange" aria-hidden />
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(itemCount).padStart(2, "0")}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-navy">
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="text-brand-orange"
                          aria-hidden
                        />
                      </span>
                      <h3 className="text-[30px] font-semibold leading-tight tracking-[-0.03em] text-brand-navy sm:text-[34px]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="mt-5 border-l-2 border-brand-orange pl-4 text-[17px] font-medium leading-snug text-brand-navy">
                      {item.summary}
                    </p>
                    <p className="mt-4 max-w-lg text-[15px] leading-[1.7] text-[#3D4F6E]">
                      {item.detail}
                    </p>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Other platform areas */}
      <section className="bg-[#F4F6FA] py-20 lg:py-[100px]">
        <Container>
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="mb-10"
          >
            <h2 className="text-[30px] font-semibold tracking-[-0.035em] text-brand-navy sm:text-[36px] lg:text-[40px]">
              Other platform <Highlight>areas</Highlight>
            </h2>
            <p className="mt-3 text-base text-[#5E6C84]">
              Step through adjacent modules from the same platform map.
            </p>
          </motion.div>
          <div
            className={`grid gap-4 ${prev && next ? "md:grid-cols-2" : "md:max-w-xl"}`}
          >
            {prev ? (
              <a
                href={`/platform/module/${prev.id}`}
                className="group flex min-w-0 items-center gap-5 rounded-xl border border-[#E3E8F0] bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(23,43,77,0.4)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E3E8F0] text-brand-navy transition-colors group-hover:border-brand-orange group-hover:text-brand-orange">
                  <ArrowLeft size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5F6B80]">
                    Previous module
                  </p>
                  <p className="mt-1 truncate text-[20px] font-semibold tracking-tight text-brand-navy">
                    {prev.title}
                  </p>
                </div>
              </a>
            ) : null}
            {next ? (
              <a
                href={`/platform/module/${next.id}`}
                className="group flex min-w-0 flex-row-reverse items-center gap-5 rounded-xl border border-[#E3E8F0] bg-white p-6 text-right transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(23,43,77,0.4)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <ArrowRight size={18} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5F6B80]">
                    Next module
                  </p>
                  <p className="mt-1 truncate text-[20px] font-semibold tracking-tight text-brand-navy">
                    {next.title}
                  </p>
                </div>
              </a>
            ) : null}
          </div>
        </Container>
      </section>

      <HomeCTA />
      <Footer />
    </div>
  );
}
