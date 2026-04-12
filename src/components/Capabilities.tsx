import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Sparkles,
  CheckCircle2,
  Layers,
  FolderKanban,
  CalendarClock,
  ShieldCheck,
  FolderOpen,
  Landmark,
} from "lucide-react";

const aiCap = {
  description:
    "Zed AI is the intelligence layer on every module below: same tenants, same permissions. Draft from a daily log, tighten an inspection note, prep a pay-app narrative, or ask what’s still open on punch, without exporting to a generic LLM.",
  features: [
    "Scoped to projects and records you can already open",
    "Task- and log-aware summaries and drafts",
    "Suggested next steps where your org enables actions",
    "No answers from data you wouldn’t see in the app",
  ],
  stat: "3×",
  statLabel: "faster follow-through on open items",
};

const CHAT_MSGS = [
  { id: 0, role: "user", text: "Where do we stand on Harbor Bridge  -  budget and schedule?" },
  {
    id: 1,
    role: "ai",
    text: "Foundation slip risk (Issues #441–443); structure trending +8% vs plan. Want a one-pager or variance bullets for your report?",
  },
  { id: 2, role: "user", text: "Start the follow-up from that." },
  {
    id: 3,
    role: "ai",
    text: "Draft opened in ZedOps  -  linked to Harbor. Review and submit when your workflow allows.",
  },
];

const MSG_DELAYS = [500, 1800, 2200, 1800];
const TYPING_DURATION = 1100;
const RESET_DELAY = 3800;

function TypingDots() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex items-center gap-1 px-3 py-2.5" style={{ borderRadius: 6 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-1.5 w-1.5 rounded-full bg-blue-400/60" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-1 items-center px-3 py-2.5" style={{ borderRadius: 6 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-blue-400/60"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ZedAIChat({ active }: { active: boolean }) {
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runSequence = () => {
    clearAll();
    setVisibleIds([]);
    setTyping(false);

    let elapsed = 0;
    CHAT_MSGS.forEach((msg, i) => {
      elapsed += MSG_DELAYS[i];
      if (msg.role === "ai") {
        const t1 = setTimeout(() => setTyping(true), elapsed - TYPING_DURATION);
        const t2 = setTimeout(() => {
          setTyping(false);
          setVisibleIds((prev) => [...prev, msg.id]);
        }, elapsed);
        timeoutsRef.current.push(t1, t2);
      } else {
        const t = setTimeout(() => {
          setVisibleIds((prev) => [...prev, msg.id]);
        }, elapsed);
        timeoutsRef.current.push(t);
      }
    });

    const tReset = setTimeout(() => runSequence(), elapsed + RESET_DELAY);
    timeoutsRef.current.push(tReset);
  };

  useEffect(() => {
    if (active) {
      runSequence();
    } else {
      clearAll();
      setVisibleIds([]);
      setTyping(false);
    }
    return clearAll;
  }, [active]);

  return (
    <div className="flex flex-col gap-2.5 overflow-hidden" style={{ minHeight: 200 }}>
      <AnimatePresence>
        {CHAT_MSGS.filter((m) => visibleIds.includes(m.id)).map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-5 h-5 rounded-full bg-[#F79625]/20 flex items-center justify-center mr-1.5 flex-shrink-0 mt-0.5">
                <Sparkles size={9} className="text-[#F79625]" />
              </div>
            )}
            <div
              className={`max-w-[82%] px-3 py-2 text-[11px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#172B4D] text-white/80 ml-4"
                  : "bg-[#1A3352] text-white/90 border border-blue-800/30"
              }`}
              style={{ borderRadius: 8, ...(msg.role === "user" ? { borderBottomRightRadius: 2 } : { borderBottomLeftRadius: 2 }) }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-start items-center"
          >
            <div className="w-5 h-5 rounded-full bg-[#F79625]/20 flex items-center justify-center mr-1.5 flex-shrink-0">
              <Sparkles size={9} className="text-[#F79625]" />
            </div>
            <div className="bg-[#1A3352] border border-blue-800/30" style={{ borderRadius: 8, borderBottomLeftRadius: 2 }}>
              <TypingDots />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Six flagship areas aligned with `platformFeatureSections` in @/data/platformFeatures.
 * Order emphasises execution: schedule → log → QA/punch → job context → org spine → cost.
 */
const corePlatformModules = [
  {
    moduleId: "planning-execution",
    icon: CalendarClock,
    title: "Planning & execution",
    description:
      "The programme becomes a queue of work: estimates and library rates feed plans; schedules and dependencies roll into tasks with owners, so MEP supers assign the next trade action, not just stare at a Gantt.",
    features: [
      "Build estimates from library-backed cost structures.",
      "Plan phases, milestones, and dependencies in one timeline.",
      "Assign work, track status, and export or hand off where supported.",
    ],
    stat: "3",
    statLabel: "capabilities in Planning",
  },
  {
    moduleId: "information-management",
    icon: FolderOpen,
    title: "Information management",
    description:
      "Daily logs and documents stay on the job. Open the log from anywhere, pick the project once, and feed what happened on site into tasks and follow-ups; the paper trail stays tied to execution.",
    features: [
      "Folders and files organised per project  -  your controlled repository.",
      "Top-bar access to the daily log with a project picker when none is active.",
      "Structured work logs that connect to reporting and AI context.",
    ],
    stat: "2",
    statLabel: "capabilities in IM",
  },
  {
    moduleId: "quality-safety-closeout",
    icon: ShieldCheck,
    title: "Quality, safety, and closeout",
    description:
      "Inspections and punch are operational: template-based walks, defects with owners, and incidents with follow-up, so QA and closeout are lists of work to finish, not PDFs in a folder.",
    features: [
      "Run inspections from templates; link to daily logs and corrective actions.",
      "Track defects from walkthrough to sign-off.",
      "Document safety and other incidents with follow-up and reporting.",
    ],
    stat: "4",
    statLabel: "capabilities in QSC",
  },
  {
    moduleId: "projects",
    icon: FolderKanban,
    title: "Projects",
    description:
      "One active job context for MEP: equipment, materials, issues, surveys, and work logs roll up under the project you’re executing, so field and office aren’t reconciling three spreadsheets.",
    features: [
      "Browse every job or open one project for day-to-day execution.",
      "Charts and views that summarise how a single project is performing.",
      "Structured work log entries connected to real project activity.",
    ],
    stat: "7",
    statLabel: "capabilities in Projects",
  },
  {
    moduleId: "core",
    icon: Layers,
    title: "Core",
    description:
      "People, roles, time, and the shared library hub: one backbone for estimating and operations so MEP teams price and run work from the same masters.",
    features: [
      "Single place for people and contacts tied to your organisation.",
      "Capture and review hours for payroll and job costing inputs.",
      "Shared reference data for estimating and operations  -  one structured library.",
    ],
    stat: "4",
    statLabel: "capabilities in Core",
  },
  {
    moduleId: "finance",
    icon: Landmark,
    title: "Finance",
    description:
      "Budget, change, and pay apps stay aligned to what happened on site, so when execution shifts scope, the money thread matches the task thread.",
    features: [
      "Project budgets anchored to cost codes from settings.",
      "Financial change orders from scope shifts through approval.",
      "Request, review, and track payments against contract and progress.",
    ],
    stat: "5",
    statLabel: "capabilities in Finance",
  },
];

export default function Capabilities() {
  const isMobile = useIsMobile();
  const aiCardRef = useRef<HTMLDivElement>(null);
  const aiCardInView = useInView(aiCardRef, {
    once: true,
    ...(isMobile ? { margin: "0px" as const } : { margin: "-100px 0px" as const }),
  });

  return (
    <section id="capabilities" className="bg-white border-t border-gray-200 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#172B4D] leading-tight tracking-tight">
              Built for <span className="text-[#172B4D]">MEP execution</span>, not just views.
            </h2>
          </div>
          <p className="text-[#42526E] text-base sm:text-lg leading-relaxed">
            Planning through supply, built for action, not just dashboards.{" "}
            <span className="font-semibold text-[#172B4D]">Zed AI</span> uses the same permissioned data.{" "}
            <a href="/platform" className="font-semibold text-[#0052CC] hover:text-[#0747A6]">
              Full platform
            </a>{" "}
            for reporting, access, and settings.
          </p>
        </motion.div>

        {/* AI Copilot  -  wide hero card */}
        <motion.div
          {...scrollMotionProps(isMobile, { y: 24, duration: 0.5, delay: 0.1 })}
          ref={aiCardRef}
          className="mb-px flex flex-col overflow-hidden rounded-t-md bg-[#172B4D] min-w-0 lg:flex-row"
        >
          {/* Left text */}
          <div className="min-w-0 flex-1 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F79625] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6 }}>
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <span className="text-[9px] font-bold bg-white/10 text-white/70 px-2 py-0.5 uppercase tracking-widest mr-2">New</span>
                <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">Zed AI</span>
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug mb-4">
              Zed AI: copilot on<br />tasks, logs &amp; cost
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-7 max-w-md">
              {aiCap.description}
            </p>
            <ul className="space-y-2.5">
              {aiCap.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                  <CheckCircle2 size={14} className="text-[#F79625] mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="/zed-ai"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F79625] hover:bg-[#e5870f] text-white text-sm font-bold transition-colors"
                style={{ borderRadius: 6 }}
              >
                Learn more →
              </a>
              
            </div>
          </div>

          {/* Right  -  animated AI chat */}
          <div className="flex w-full min-w-0 flex-col justify-between border-t border-white/5 bg-[#0E1E38] p-6 lg:w-[420px] lg:max-w-full lg:shrink-0 lg:border-l lg:border-t-0 lg:border-white/5 lg:p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#F79625] animate-pulse" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Live · Zed AI Copilot</span>
            </div>

            {/* Animated chat  -  triggers only when section is in view */}
            <div className="flex-1">
              <ZedAIChat active={aiCardInView} />
            </div>

            {/* Input bar */}
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 bg-[#172B4D]/60 border border-white/8 px-3 py-2" style={{ borderRadius: 8 }}>
                <span className="text-white/25 text-[11px] flex-1">Insights, report prep, or next action…</span>
                <div className="w-6 h-6 bg-[#F79625] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 4 }}>
                  <Sparkles size={11} className="text-white" />
                </div>
              </div>
              {/* Stat */}
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-black text-[#F79625] leading-none">{aiCap.stat}</span>
                <span className="text-white/35 text-xs pb-1">{aiCap.statLabel}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform modules  -  six flagship areas, same ids as /platform/module/:id */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-b-md">
          {corePlatformModules.map((cap, i) => (
            <motion.article
              key={cap.moduleId}
              {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: Math.min(i * 0.05, 0.25) })}
              className="bg-white p-7 flex h-full flex-col group hover:bg-[#FAFBFC] transition-colors duration-150"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={{ background: "#172B4D15", borderRadius: 6 }}>
                  <cap.icon size={20} style={{ color: "#172B4D" }} aria-hidden />
                </div>
              </div>
              <h3 className="text-base font-extrabold text-[#172B4D] mb-2 leading-tight">{cap.title}</h3>
              <p className="text-[#42526E] text-sm leading-relaxed mb-5 flex-1">{cap.description}</p>
              <ul className="space-y-1.5 mb-5">
                {cap.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#42526E]">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#172B4D] mt-1.5" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100 pt-4 mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-2xl font-black text-[#172B4D] leading-none">{cap.stat}</div>
                  <div className="text-xs text-[#97A0AF] mt-0.5">{cap.statLabel}</div>
                </div>
                <a
                  href={`/platform/module/${cap.moduleId}`}
                  className="text-xs font-bold text-[#0052CC] inline-flex items-center gap-1 transition-colors hover:text-[#0747A6]"
                >
                  View module
                  <span aria-hidden>→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
