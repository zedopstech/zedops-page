import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { BudgetMock, CloseoutMock, DailyLogMock, EstimateMock, GanttMock, InspectionMock, ProcurementMock } from "./stageMocks";

type Stage = { id: string; title: string; headline: string; description: string; Mock: ComponentType };

const stages: Stage[] = [
  { id: "estimation", title: "Estimation", headline: "Know the scope before you price it.", description: "Measure drawings, build quantities, and shape a cost estimate that stays connected to the project.", Mock: EstimateMock },
  { id: "planning", title: "Planning & scheduling", headline: "Turn the scope into a workable plan.", description: "Set the programme, organise tasks, and see slippage the day it happens.", Mock: GanttMock },
  { id: "procurement", title: "Procurement & materials", headline: "Keep materials moving to the work.", description: "Raise requests, move approved needs into purchasing, and follow materials through delivery.", Mock: ProcurementMock },
  { id: "field", title: "Field execution", headline: "Keep site and office in step.", description: "Crews, weather, delays and completed work, logged once and visible to everyone.", Mock: DailyLogMock },
  { id: "budget", title: "Budget & cost control", headline: "See the cost of every decision.", description: "Budgets, commitments and actuals stay tied to the work, so overruns show up early.", Mock: BudgetMock },
  { id: "quality", title: "Quality & safety", headline: "Turn site findings into action.", description: "A failed inspection item becomes an assigned issue, tracked until it is resolved.", Mock: InspectionMock },
  { id: "closeout", title: "Closeout", headline: "Finish with the record intact.", description: "Clear punch items and hand over with every open item accounted for.", Mock: CloseoutMock },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Seven stages: a sticky index on the left tracks whichever stage panel is in view (desktop);
 * each panel pairs a two-tone line with a small live mock of that part of the product.
 */
export default function StagesPreview() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = panelRefs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section tone="mist" labelledBy="dp-stages">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-stages"
            title={<>Every stage of the job, <Highlight>connected.</Highlight></>}
            body="From the first estimate to the last punch item, each step works from the same project record."
            cta={<TicketButton href="/early-access">Get started</TicketButton>}
          />
        </motion.div>
      </div>

      <div className="grid border-t border-[#E3E8F0] lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav aria-label="Project stages" className="hidden lg:block">
          <ol className="sticky top-[132px] px-10 py-12">
            {stages.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#stage-${s.id}`}
                    aria-current={on ? "step" : undefined}
                    className={`relative flex items-baseline gap-3 py-2 text-[15px] transition-colors duration-200 ${on ? "text-brand-navy" : "text-[#A5AEBF] hover:text-[#5E6C84]"}`}
                  >
                    <span aria-hidden className={`absolute top-2 bottom-2 -left-10 w-[2px] transition-colors ${on ? "bg-brand-orange" : "bg-transparent"}`} />
                    <span className="font-mono text-[11px]">{pad(i + 1)}</span>
                    {s.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="lg:border-l lg:border-[#E3E8F0]">
          {stages.map((s, i) => (
            <article
              key={s.id}
              id={`stage-${s.id}`}
              data-index={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={`scroll-mt-[120px] ${i > 0 ? "border-t border-[#E3E8F0]" : ""}`}
            >
              <div className="px-6 pt-10 sm:px-10 sm:pt-12 lg:px-14">
                <span className="font-mono text-[11px] text-[#A5AEBF] lg:hidden">
                  {pad(i + 1)} · {s.title}
                </span>
                <h3 className="mt-2 max-w-[34ch] text-[20px] leading-[1.35] font-medium tracking-[-0.02em] text-brand-navy sm:text-[22px] lg:mt-0">
                  {s.headline} <Muted>{s.description}</Muted>
                </h3>
              </div>
              <div className="px-6 pt-8 pb-10 sm:px-10 sm:pb-12 lg:px-14">
                <div className="rounded-xl bg-[#EEF1F5] p-5 sm:p-8">
                  <div className="mx-auto max-w-[520px]">
                    <s.Mock />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
