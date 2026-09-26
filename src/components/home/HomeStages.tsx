import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Calculator,
  CalendarClock,
  ClipboardCheck,
  HardHat,
  ImageIcon,
} from "lucide-react";
import { PiCalculatorFill, PiCalendarCheckFill, PiClipboardTextFill, PiFileTextFill, PiHardHatFill, PiListChecksFill, PiPackageFill, PiRulerFill, PiShieldCheckFill, PiShoppingCartFill, PiTruckFill, PiUsersFill, PiWalletFill, PiWarningFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  DotGrid,
  Highlight,
  SplitHeader,
  TicketButton,
} from "@/components/design-system/primitives";

type Visual = { title: string; icon: IconType };
type StageBase = {
  title: string;
  headline: string;
  description: string;
  caption: string;
};
type Stage =
  | (StageBase & { layout: "duo"; visuals: [Visual, Visual] })
  | (StageBase & {
      layout: "leftTall" | "rightTall";
      visuals: [Visual, Visual, Visual];
    })
  | (StageBase & { layout: "quad"; visuals: [Visual, Visual, Visual, Visual] });

const stages: Stage[] = [
  {
    title: "Estimation",
    headline: "Know the scope before you price it.",
    description:
      "Measure drawings, build quantities, and shape a cost estimate that stays connected to the project.",
    caption: "Scope and cost in view.",
    layout: "duo",
    visuals: [
      { title: "Drawing takeoff", icon: PiRulerFill },
      { title: "Estimate & cost", icon: PiCalculatorFill },
    ],
  },
  {
    title: "Planning & scheduling",
    headline: "Turn the scope into a workable plan.",
    description:
      "Set the programme, organise tasks, and line up people against the work ahead.",
    caption: "A plan built for the site.",
    layout: "leftTall",
    visuals: [
      { title: "Project schedule", icon: PiCalendarCheckFill },
      { title: "Task plan", icon: PiClipboardTextFill },
      { title: "Workforce plan", icon: PiUsersFill },
    ],
  },
  {
    title: "Procurement & materials",
    headline: "Keep materials moving to the work.",
    description:
      "Raise requests, move approved needs into purchasing, and follow materials through delivery.",
    caption: "Materials tied to work.",
    layout: "rightTall",
    visuals: [
      { title: "Material requests", icon: PiPackageFill },
      { title: "Purchase orders", icon: PiShoppingCartFill },
      { title: "Material tracking", icon: PiTruckFill },
    ],
  },
  {
    title: "Field execution",
    headline: "Keep site and office in step.",
    description:
      "Follow assigned work, daily updates, and workforce activity with the project plan in view.",
    caption: "Every update in context.",
    layout: "duo",
    visuals: [
      { title: "Tasks & daily updates", icon: PiHardHatFill },
      { title: "Workforce & progress", icon: PiUsersFill },
    ],
  },
  {
    title: "Budget & cost control",
    headline: "See the cost of every decision.",
    description:
      "Keep budgets, direct costs, payment requests, and client invoices connected to the work they represent.",
    caption: "Cost clarity as work moves.",
    layout: "rightTall",
    visuals: [
      { title: "Budget overview", icon: PiWalletFill },
      { title: "Direct costs", icon: PiCalculatorFill },
      { title: "Payments & invoices", icon: PiFileTextFill },
    ],
  },
  {
    title: "Quality & safety",
    headline: "Turn site findings into action.",
    description:
      "Record inspections and incidents, assign follow-ups, and keep the status visible until work is resolved.",
    caption: "Find it. Assign it. Resolve it.",
    layout: "leftTall",
    visuals: [
      { title: "Inspections", icon: PiShieldCheckFill },
      { title: "Incidents", icon: PiWarningFill },
      { title: "Follow-up tasks", icon: PiListChecksFill },
    ],
  },
  {
    title: "Closeout",
    headline: "Finish with the record intact.",
    description:
      "Clear punch items and keep project documents together so open work is easy to see through completion.",
    caption: "Every open item accounted for.",
    layout: "quad",
    visuals: [
      { title: "Punch list", icon: PiListChecksFill },
      { title: "Open items", icon: PiClipboardTextFill },
      { title: "Project documents", icon: PiFileTextFill },
      { title: "Closeout status", icon: PiShieldCheckFill },
    ],
  },
];

function ScreenshotPlaceholder({
  visual,
  caption,
}: {
  visual: Visual;
  caption?: string;
}) {
  const Icon = visual.icon;
  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#DCE3ED] bg-[#EBF0F7]"
    >
      <DotGrid className="opacity-60" />
      <div className="relative flex h-10 shrink-0 items-center gap-1.5 border-b border-[#DCE3ED] bg-white/80 px-4">
        <span className="h-2 w-2 rounded-full bg-[#CDD6E3]" />
        <span className="h-2 w-2 rounded-full bg-[#CDD6E3]" />
        <span className="h-2 w-2 rounded-full bg-[#CDD6E3]" />
        <span className="ml-3 hidden font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8C97AB] sm:inline">
          ZedOps application
        </span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-2 py-5 text-center sm:px-5 sm:py-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE3ED] bg-white text-brand-navy shadow-[0_8px_22px_-14px_rgba(23,43,77,0.45)] sm:h-12 sm:w-12">
          <Icon size={23} aria-hidden />
        </span>
        <p className="mt-3 text-[13px] font-semibold leading-tight text-brand-navy sm:mt-4 sm:text-[15px]">
          {visual.title}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[9px] font-medium text-[#8C97AB] sm:gap-1.5 sm:text-[11px]">
          <ImageIcon size={12} strokeWidth={1.7} aria-hidden />
          Screenshot placeholder
        </p>
      </div>
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy via-brand-navy/90 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-5 sm:pt-14">
          <p className="text-[16px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[25px]">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

function StageGallery({ stage }: { stage: Stage }) {
  if (stage.layout === "duo") {
    return (
      <div className="grid h-[330px] grid-cols-2 gap-3 sm:h-[460px] sm:gap-4">
        <ScreenshotPlaceholder visual={stage.visuals[0]} />
        <ScreenshotPlaceholder visual={stage.visuals[1]} caption={stage.caption} />
      </div>
    );
  }

  if (stage.layout === "leftTall") {
    return (
      <div className="grid h-[330px] grid-cols-2 gap-3 sm:h-[460px] sm:gap-4">
        <ScreenshotPlaceholder visual={stage.visuals[0]} />
        <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
          <ScreenshotPlaceholder visual={stage.visuals[1]} />
          <ScreenshotPlaceholder visual={stage.visuals[2]} caption={stage.caption} />
        </div>
      </div>
    );
  }

  if (stage.layout === "rightTall") {
    return (
      <div className="grid h-[330px] grid-cols-2 gap-3 sm:h-[460px] sm:gap-4">
        <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
          <ScreenshotPlaceholder visual={stage.visuals[0]} />
          <ScreenshotPlaceholder visual={stage.visuals[1]} />
        </div>
        <ScreenshotPlaceholder visual={stage.visuals[2]} caption={stage.caption} />
      </div>
    );
  }

  return (
    <div className="grid h-[345px] grid-cols-2 grid-rows-2 gap-3 sm:h-[460px] sm:gap-4">
      {stage.visuals.map((visual, index) => (
        <ScreenshotPlaceholder
          key={visual.title}
          visual={visual}
          caption={index === 3 ? stage.caption : undefined}
        />
      ))}
    </div>
  );
}

/** Seven workflows across planning, execution, and closeout. */
const STAGE_DURATION_SECONDS = 4;

export default function StagesPreview() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRailRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const progress = useMotionValue(0);
  const stage = stages[active];

  useEffect(() => {
    if (!inView || paused || reduceMotion) return;
    const remaining = (1 - progress.get()) * STAGE_DURATION_SECONDS;
    const controls = animate(progress, 1, {
      duration: remaining,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setActive((index) => (index + 1) % stages.length);
      },
    });
    return () => controls.stop();
  }, [active, inView, paused, progress, reduceMotion]);

  const selectStage = (index: number) => {
    progress.set(0);
    setActive(index);
  };

  useEffect(() => {
    const rail = tabRailRef.current;
    const tab = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !tab || rail.scrollWidth <= rail.clientWidth) return;
    const tabLeft = tab.getBoundingClientRect().left;
    const railLeft = rail.getBoundingClientRect().left;
    rail.scrollTo({
      left: rail.scrollLeft + tabLeft - railLeft - 20,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F9FD] py-20 lg:py-[108px]"
      aria-labelledby="dp-stages"
    >
      <Container>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-stages"
            title={
              <>
                Keep work moving from
                <br className="hidden sm:block" /> <Highlight>takeoff to handover.</Highlight>
              </>
            }
            body="Explore each step of the project, from estimating and planning through field execution, cost control, quality, and closeout."
            cta={<TicketButton href="/early-access">Get started</TicketButton>}
            icons={[Calculator, CalendarClock, HardHat, ClipboardCheck]}
          />
        </motion.div>

        <motion.div
          {...scrollMotionProps(isMobile, { y: 32, duration: 0.7, delay: 0.08 })}
          className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-[minmax(240px,0.32fr)_minmax(0,1fr)] lg:items-center lg:gap-14"
        >
          <div
            ref={tabRailRef}
            role="tablist"
            aria-label="Project workflows"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setPaused(false);
              }
            }}
            className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
          >
            {stages.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  id={"project-stage-tab-" + index}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="project-stage-panel"
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === "ArrowRight" || event.key === "ArrowDown"
                        ? (index + 1) % stages.length
                        : event.key === "ArrowLeft" || event.key === "ArrowUp"
                          ? (index + stages.length - 1) % stages.length
                          : null;
                    if (next !== null) {
                      event.preventDefault();
                      selectStage(next);
                      document.getElementById("project-stage-tab-" + next)?.focus();
                    }
                  }}
                  className={[
                    "group relative shrink-0 border-b border-[#D8E0EA] pb-4 text-left text-[17px] font-medium tracking-tight transition-colors lg:w-full lg:py-5 lg:text-[19px]",
                    selected
                      ? "text-brand-navy"
                      : "text-[#8C97AB] hover:text-brand-navy",
                  ].join(" ")}
                >
                  {item.title}
                  {selected && (
                    <span
                      className="absolute bottom-[-1px] left-0 h-[3px] w-2/3 lg:w-1/2"
                      aria-hidden
                    >
                      {reduceMotion ? (
                        <span className="block h-full w-full bg-brand-orange" />
                      ) : (
                        <motion.span
                          className="block h-full w-full origin-left bg-brand-orange"
                          style={{ scaleX: progress }}
                        />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="project-stage-panel"
            role="tabpanel"
            aria-labelledby={"project-stage-tab-" + active}
            className="min-w-0"
          >
            <motion.div
              key={stage.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <span className="inline-flex rounded-full bg-[#EDECF9] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-navy">
                {String(active + 1).padStart(2, "0")} / {stage.title}
              </span>
              <h3 className="mt-6 max-w-3xl text-[29px] font-semibold leading-[1.13] tracking-[-0.04em] text-brand-navy sm:text-[38px]">
                {stage.headline}
              </h3>
              <p className="mt-4 max-w-3xl text-[15px] leading-[1.65] text-[#4D5E77] sm:text-[17px]">
                {stage.description}
              </p>
              <div className="my-8 h-px bg-[#DCE3ED]" />
              <StageGallery stage={stage} />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
