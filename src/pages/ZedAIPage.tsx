import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Brain,
  Zap,
  FileText,
  PenLine,
  Server,
  MessageSquare,
  LayoutDashboard,
  DollarSign,
  FileBarChart,
  ListChecks,
  ArrowRight,
  Plus,
  CheckCircle2,
  ShieldCheck,
  CalendarClock,
  Calculator,
  Wallet,
  ClipboardList,
  Package,
  Users,
  CheckSquare,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ZedAIHomeSection from "@/components/ZedAIHomeSection"; 
import { MockChat, MockWritingAssist, MockReports, MockDashboard, MockList } from "@/components/ProductMocks";

type ShowcaseTab = { id: string; label: string; icon: LucideIcon };

const showcaseTabs: ShowcaseTab[] = [
  { id: "copilot", label: "Copilot", icon: MessageSquare },
  { id: "writing", label: "Writing assist", icon: PenLine },
  { id: "insights", label: "Insights", icon: LayoutDashboard },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "actions", label: "Actions", icon: ListChecks },
];

type ShowcaseBlock = { title: string; body: string };

const showcaseCopy: Record<string, ShowcaseBlock[]> = {
  copilot: [
    {
      title: "Project copilot",
      body: "Ask in plain language about status, risks, and next steps. Zed AI reads the same project data you’re allowed to see - no generic web guesses.",
    },
    {
      title: "Conversational follow-through",
      body: "Turn answers into drafts and suggested actions where your org enables them, so the thread stays inside ZedOps instead of scattered across tools.",
    },
  ],
  writing: [
    {
      title: "In-field writing assist",
      body: "Improve, shorten, or expand text in supported fields - daily logs, descriptions, and notes ship faster with the same permissions as the rest of the app.",
    },
    {
      title: "Consistent tone",
      body: "Keep site and office documentation aligned without extra editing passes; you stay in control of what gets saved.",
    },
  ],
  insights: [
    {
      title: "Portfolio & project signals",
      body: "Surface patterns from schedules, tasks, and activity so PMs and leadership see heat early - not after the fact.",
    },
    {
      title: "Role-aware context",
      body: "What you get matches your access: field teams, PMs, and executives each see relevant summaries, not one-size-fits-all dashboards.",
    },
  ],
  reports: [
    {
      title: "Report prep & exports",
      body: "Draft summaries and structure outputs that map to inspections, logs, and financial views your teams already use.",
    },
    {
      title: "Review before send",
      body: "Everything is meant to be checked by a human - Zed AI accelerates assembly, not replaces sign-off.",
    },
  ],
  actions: [
    {
      title: "Tasks, RFIs, and lists",
      body: "Where enabled, move from insight to a concrete next step - new tasks, follow-ups, and checklist progress without retyping context.",
    },
    {
      title: "Same gates as always",
      body: "Actions respect roles and modules; if you can’t do it manually in ZedOps, the copilot can’t bypass it either.",
    },
  ],
};

function ShowcasePanel({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "copilot":
      return <MockChat />;
    case "writing":
      return <MockWritingAssist />;
    case "insights":
      return <MockDashboard />;
    case "reports":
      return <MockReports />;
    case "actions":
      return <MockList />;
    default:
      return <MockChat />;
  }
}

/** Alternating feature rows  -  image / copy / overlay pattern (marketing reference layout). */
const roleStoryBlocks: {
  title: string;
  href: string;
  desc: string;
  image: string;
  imageAlt: string;
  imageOnLeft: boolean;
  overlay: "field" | "office" | "portfolio" | "multi";
}[] = [
  {
    title: "General Contractors",
    href: "/who-we-serve/general-contractors",
    desc: "Supers and field teams automate the tedious parts of documentation - daily logs, notes, and quick status questions - without leaving ZedOps. The copilot only sees the jobs and records your role already has, so answers stay grounded in the work on site.",
    image: "/Persona/site-supervisor.jpg",
    imageAlt: "Construction superintendent reviewing work on site",
    imageOnLeft: true,
    overlay: "field",
  },
  {
    title: "Owner & developer AI",
    href: "/who-we-serve/owners",
    desc: "Ask portfolio-wide questions in plain language and get rollups tied to projects you’re entitled to see. Prep investor or board updates faster with suggested narratives and exports - always review before anything goes out the door.",
    image: "/Persona/company-owner.jpg",
    imageAlt: "Owner reviewing project portfolio",
    imageOnLeft: false,
    overlay: "portfolio",
  },
  {
    title: "Project manager AI",
    href: "/who-we-serve/project-managers",
    desc: "Turn schedules, tasks, and activity into a single thread: what slipped, what needs a decision, and what to communicate next. Draft stakeholder updates and suggested follow-ups where your org enables actions - less context switching, same accountability.",
    image: "/Persona/project-managers.jpg",
    imageAlt: "Project manager coordinating delivery",
    imageOnLeft: true,
    overlay: "office",
  },
  {
    title: "Consultant & CM AI",
    href: "/who-we-serve/consultants",
    desc: "Serve multiple clients without mixing data: insights and drafts stay inside each engagement’s ZedOps workspace. Standardize status summaries and export prep so every account gets consistent quality and you spend less time reformatting the same story.",
    image: "/Persona/subcontractor.jpg",
    imageAlt: "Consultant in professional setting",
    imageOnLeft: false,
    overlay: "multi",
  },
];

function RoleStoryOverlay({ variant }: { variant: (typeof roleStoryBlocks)[number]["overlay"] }) {
  if (variant === "field") {
    return (
      <div className="absolute bottom-4 left-4 right-4 max-w-[min(100%,17rem)] rounded-lg border border-gray-200 bg-white p-3.5 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#6B778C]">In ZedOps</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-brand-navy">Writing assist on your daily log</p>
        <button
          type="button"
          tabIndex={-1}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-orange py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#E85F00]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          Refine with Zed AI
        </button>
      </div>
    );
  }
  if (variant === "office") {
    return (
      <div className="absolute bottom-4 right-4 left-4 max-w-[min(100%,18rem)] rounded-lg border border-gray-200 bg-white p-3.5 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:p-4">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00875A]" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-brand-navy leading-snug">AI-suggested workflow</p>
            <p className="mt-1 text-xs leading-snug text-[#6B778C]">Next steps from your schedule & tasks</p>
          </div>
        </div>
      </div>
    );
  }
  if (variant === "portfolio") {
    return (
      <div className="absolute bottom-4 left-4 right-4 max-w-[min(100%,17rem)] rounded-lg border border-gray-200 bg-white p-3.5 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#6B778C]">Portfolio view</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-brand-navy">Executive briefing draft</p>
        <button
          type="button"
          tabIndex={-1}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-orange py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#E85F00]"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          Generate summary
        </button>
      </div>
    );
  }
  return (
    <div className="absolute bottom-4 right-4 left-4 max-w-[min(100%,18rem)] rounded-lg border border-emerald-200/80 bg-white p-3.5 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:p-4">
      <div className="flex items-start gap-2.5">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00875A]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-brand-navy leading-snug">Per-client workspace</p>
          <p className="mt-1 text-xs leading-snug text-[#6B778C]">Zed AI stays inside tenant boundaries</p>
        </div>
      </div>
    </div>
  );
}

const capabilities = [
  {
    icon: Brain,
    title: "Context-aware copilot",
    desc: "Uses live project data you can access  -  tuned to GC, owner, PM, and consultant workflows without mixing what each role shouldn’t see.",
  },
  {
    icon: Zap,
    title: "Actions",
    desc: "Where enabled, supers and PMs can move from answers to follow-ups in-app; owners and consultants keep approval paths intact.",
  },
  {
    icon: FileText,
    title: "Reports & output",
    desc: "Summaries and structured drafts for site, office, and board audiences  -  aligned to the modules each role already uses.",
  },
  {
    icon: PenLine,
    title: "Writing assist",
    desc: "Faster logs and field notes for supers; cleaner descriptions and updates for PMs and consultants working in supported fields.",
  },
  {
    icon: Server,
    title: "Setup & roadmap",
    desc: "Configurable models and keys per org. Deeper templates roll out with the same permission model - no role gets more access than today.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & boundaries",
    desc: "Zed AI stays inside your tenant and roles - no mixing clients or projects you shouldn’t see. Human review stays in the loop where your org requires it.",
  },
];

const aiModules = [
  { icon: LayoutDashboard, label: "Core", prompt: "Summarize this week's activity across all modules" },
  { icon: CalendarClock, label: "Planning & Scheduling", prompt: "What tasks slipped and what's the recovery plan?" },
  { icon: Calculator, label: "Estimation", prompt: "Draft a bid narrative from this estimate" },
  { icon: Wallet, label: "Budget & Cost", prompt: "Explain the cost variance on MEP" },
  { icon: ClipboardList, label: "Daily Intelligence", prompt: "Turn today's notes into a clean daily report" },
  { icon: ShieldCheck, label: "Quality & Safety", prompt: "Summarize open findings by severity" },
  { icon: Package, label: "Material Management", prompt: "Which deliveries are at risk this week?" },
  { icon: ListChecks, label: "Tasks Resolution", prompt: "Group overdue tasks by owner" },
  { icon: Users, label: "Workforce", prompt: "Why are 19 check-ins delayed?" },
  { icon: CheckSquare, label: "Punch List", prompt: "Prioritize punch items by closeout impact" },
];

const aiMetrics = [
  { value: "~6 hrs", label: "Saved per PM each week" },
  { value: "3x", label: "Faster daily report turnaround" },
  { value: "100%", label: "Grounded in your permissioned data" },
];

const aiTrust = [
  { icon: ShieldCheck, title: "Permissioned", desc: "Only sees records your role can access" },
  { icon: Server, title: "Tenant-isolated", desc: "Clients and projects never mix" },
  { icon: CheckCircle2, title: "Human-in-the-loop", desc: "You review before anything is sent" },
];

const aiFlow = [
  { icon: MessageSquare, title: "Ask", desc: "A plain-language question about your project data." },
  { icon: PenLine, title: "Draft", desc: "Zed AI assembles a summary, report, or update." },
  { icon: CheckCircle2, title: "Review", desc: "You — or your approver — confirm before it goes out." },
  { icon: ListChecks, title: "Log", desc: "Approved output and actions land back in ZedOps." },
];

const aiBeforeAfter = [
  { module: "Daily Logs", before: "2 hrs writing & reconciling field notes", after: "10 min with AI-structured reports" },
  { module: "Budget & Cost", before: "Manual variance write-ups each week", after: "Auto-explained cost variances" },
  { module: "Quality & Safety", before: "Findings scattered across spreadsheets", after: "Open items summarized by severity" },
];

export default function ZedAIPage() {
  const isMobile = useIsMobile();
  const [showcaseTab, setShowcaseTab] = useState("copilot");

  useSEO({
    title: "Zed AI - ZedOps",
    description:
      "Zed AI gives construction teams intelligent insights, recommendations, reports, and actions directly from ZedOps project data.",
  });

  const aiQuestions = [
    {
      icon: CalendarClock,
      question: "Which activities are delayed?",
    },
    {
      icon: Package,
      question: "What materials are running low?",
    },
    {
      icon: Wallet,
      question: "Why is Project A over budget?",
    },
    {
      icon: FileText,
      question: "Generate this week's project report.",
    },
    {
      icon: LayoutDashboard,
      question: "Which inspections are still pending?",
    },
    {
      icon: ShieldCheck,
      question: "Show me safety incidents this month.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <PageHero
          pill="Zed AI"
          PillIcon={Brain}
          title={
            <>
              Turn construction data
              <br />
              into decisions.
              <br />
              <span className="text-brand-orange">Instantly.</span>
            </>
          }
          subtitle="Zed AI gives construction teams intelligent insights, recommendations, reports, and actions directly from your ZedOps project data."
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:bg-[#E85F00]"
            >
              Explore Zed AI
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#CBD5E5] bg-white px-6 py-3.5 text-sm font-bold text-brand-navy transition-all hover:border-brand-navy hover:bg-[#F8F9FD]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-navy">
                <span className="ml-0.5 text-[8px]">▶</span>
              </span>
              See how it works
            </a>

            
          </div>
        </PageHero>

        {/* =====================================================
            AI COPILOT
        ====================================================== */}
        <ZedAIHomeSection />
        {/* <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <motion.div
                {...scrollMotionProps(isMobile, {
                  x: -20,
                  duration: 0.5,
                })}
              >
                <p className="text-sm font-black uppercase tracking-widest text-[#1677FF]">
                  AI COPILOT
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  AI Copilot for Construction
                </h2>

                <p className="mt-3 max-w-lg text-base leading-7 text-[#64748B]">
                  Ask, analyze and act — all in one place.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {showcaseTabs.slice(0, 4).map((tab) => {
                    const Icon = tab.icon;
                    const active = showcaseTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setShowcaseTab(tab.id)}
                        className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-bold transition ${
                          active
                            ? "bg-brand-navy text-white shadow-sm"
                            : "border border-[#DCE3EF] bg-white text-[#52627A] hover:bg-[#F5F8FF]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1677FF]" />
                    <p className="text-sm leading-6 text-[#52627A]">
                      Natural conversation with your project data
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1677FF]" />
                    <p className="text-sm leading-6 text-[#52627A]">
                      Real-time insights and recommendations
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1677FF]" />
                    <p className="text-sm leading-6 text-[#52627A]">
                      Context-aware and role-aware responses
                    </p>
                  </div>
                </div>

                <a
                  href="/early-access"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF]"
                >
                  See Copilot in action
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                {...scrollMotionProps(isMobile, {
                  x: 20,
                  duration: 0.5,
                })}
                className="relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-[#E4ECFF]" />

                <div className="relative p-5 sm:p-8">
                  <div className="rounded-xl border border-[#DCE5F5] bg-white p-5 shadow-xl sm:p-7">
                    <div className="rounded-lg bg-[#EEF4FF] px-4 py-3 text-xs font-bold text-brand-navy">
                      Show me activities at risk this week.
                    </div>

                    <div className="mt-5 flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F0FF]">
                      <Sparkles className="h-4 w-4 text-brand-orange" />
                      </div>

                      <div>
                        <p className="text-xs font-black text-[#1677FF]">
                          Zed AI
                        </p>

                        <p className="mt-2 text-sm font-bold text-brand-navy">
                          Here are 7 activities at risk this week.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-5">
                      {[
                        ["Concrete Works", "5", "100%"],
                        ["Electrical Works", "3", "65%"],
                        ["HVAC Works", "2", "42%"],
                      ].map(([name, count, width]) => (
                        <div key={name}>
                          <div className="flex justify-between text-xs font-bold text-[#52627A]">
                            <span>{name}</span>
                            <span>{count}</span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EDF1F7]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FFB37A]"
                              style={{ width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="mt-6 rounded-lg border border-[#DCE3EF] px-4 py-2.5 text-xs font-bold text-brand-navy">
                      View all at-risk activities
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}
        

        {/* =====================================================
            AI FOR EVERY ROLE
        ====================================================== */}
        <section className="bg-[#F8F9FD] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
                AI for <span className="text-brand-orange">Every Role</span>
              </h2>
              <p className="mt-3 text-base text-[#42526E]">
                Intelligent support for every stakeholder across the project
                lifecycle.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {roleStoryBlocks.map((role, i) => (
                <motion.div
                  key={role.title}
                  {...scrollMotionProps(isMobile, {
                    y: 18,
                    duration: 0.45,
                    delay: i * 0.05,
                  })}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_-12px_rgba(23,43,77,0.12)]"
                >
                  <div className="relative aspect-[1.25] overflow-hidden">
                    <img
                      src={role.image}
                      alt={role.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md">
                      <Sparkles className="h-4 w-4 text-brand-orange" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-brand-navy">
                      {role.title}
                    </h3>

                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#42526E]">
                        {role.desc}
                      </p>

                    <a
                      href={role.href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy"
                    >
                      Explore Zed AI
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW ZED AI WORKS
        ====================================================== */}
        <section
          id="how-it-works"
          className="relative overflow-hidden bg-brand-navy px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-0 top-1/2 h-px w-full bg-[#5A8DEE]" />
            <div className="absolute left-[10%] top-1/3 h-48 w-48 rounded-full border border-[#5A8DEE]" />
            <div className="absolute right-[10%] bottom-1/4 h-64 w-64 rounded-full border border-[#5A8DEE]" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                How <span className="text-brand-orange">Zed AI</span> Works
              </h2>

              <p className="mt-3 text-sm text-blue-100">
                From project data to intelligent actions in seconds.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {[
                {
                  icon: Server,
                  title: "Connect",
                  text: "Bring your project data into ZedOps.",
                },
                {
                  icon: Brain,
                  title: "Understand",
                  text: "AI analyzes data to find patterns, risks and opportunities.",
                },
                {
                  icon: Zap,
                  title: "Act",
                  text: "Get recommendations, alerts and answers to move faster.",
                },
                {
                  icon: CheckCircle2,
                  title: "Improve",
                  text: "Better decisions lead to better execution and outcomes.",
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    {...scrollMotionProps(isMobile, {
                      y: 15,
                      duration: 0.4,
                      delay: index * 0.05,
                    })}
                    className="relative text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#DCE8FF] bg-white/35 shadow-xl">
                      <Icon className="h-7 w-7 text-brand-orange" />
                    </div>


                    <h3 className="mt-1 text-lg font-black text-white">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-blue-100">
                      {step.text}
                    </p>

                    {index < 3 && (
                      <div className="absolute left-[70%] top-8 hidden w-[65%] border-t border-dashed border-blue-300/60 md:block" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT CAN YOU ASK
        ====================================================== */}
        <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
                What Can You Ask <span className="text-brand-orange">Zed AI</span>?
              </h2>
              <p className="mt-3 text-sm text-[#42526E]">
                Ask anything about your projects in simple, natural language.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aiQuestions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.question}
                    {...scrollMotionProps(isMobile, {
                      y: 12,
                      duration: 0.35,
                      delay: index * 0.04,
                    })}
                    className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)] transition hover:-translate-y-0.5 hover:border-brand-orange hover:shadow-[0_12px_28px_-12px_rgba(23,43,77,0.12)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                      <Icon className="h-5 w-5 text-brand-orange" />
                    </div>

                    <p className="text-sm font-bold text-brand-navy">
                      {item.question}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            MODULES
        ====================================================== */}
        <section className="bg-[#F8F9FD] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
                Zed AI Across Every <span className="text-brand-orange">ZedOps Module</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#42526E]">
                AI-powered intelligence across your entire construction
                ecosystem.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {aiModules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <motion.div
                    key={module.label}
                    {...scrollMotionProps(isMobile, {
                      y: 12,
                      duration: 0.35,
                      delay: index * 0.03,
                    })}
                    className="group rounded-xl border border-gray-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-brand-orange hover:shadow-[0_12px_28px_-12px_rgba(23,43,77,0.12)]"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                      <Icon className="h-5 w-5 text-brand-orange" />
                    </div>

                    <h3 className="mt-3 text-xs font-black text-brand-navy sm:text-sm">
                      {module.label}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

<section className="relative overflow-hidden bg-white px-4 py-9 sm:px-6 lg:px-8">
  {/* Background decoration */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-100/40 blur-3xl" />
    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* HEADER */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-brand-orange">
        Intelligent Automation
      </p>

      <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
        Three Problems.
        <span className="text-brand-orange"> One AI Solution.</span>
      </h2>

      <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B778C]">
        Zed AI turns repetitive project work into clear, actionable insights.
      </p>
    </div>


    {/* WORKFLOW */}
    <div className="relative mt-8">

      {/* Connecting line */}
      <div className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-blue-100 lg:block" />

      <div className="grid items-center gap-4 lg:grid-cols-[1fr_160px_1fr]">

        {/* LEFT */}
        <div className="space-y-3">

          {/* Daily Logs */}
          <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                <FileText className="h-4 w-4 text-brand-orange" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-brand-navy">
                    Daily Logs
                  </h3>

                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-500">
                    MANUAL
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#6B778C]">
                  2 hrs writing & reconciling field notes
                </p>
              </div>

            </div>
          </div>


          {/* Budget */}
          <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <DollarSign className="h-4 w-4 text-brand-orange" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-brand-navy">
                    Budget & Cost
                  </h3>

                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-500">
                    MANUAL
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#6B778C]">
                  Manual variance write-ups every week
                </p>
              </div>

            </div>
          </div>


          {/* Quality */}
          <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-brand-navy">
                    Quality & Safety
                  </h3>

                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-500">
                    SCATTERED
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#6B778C]">
                  Findings scattered across spreadsheets
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* CENTER ZED AI */}
        <div className="relative flex items-center justify-center">

          <div className="absolute h-32 w-32 rounded-full bg-orange-200/40 blur-2xl" />

          <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-3xl border border-orange-200 bg-white shadow-[0_15px_40px_-15px_rgba(255,107,0,0.35)]">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <p className="mt-2 text-base font-black text-brand-navy">
              Zed AI
            </p>

            <p className="text-[8px] font-bold uppercase tracking-wider text-brand-orange">
              AI Automation
            </p>

          </div>

          <ArrowRight className="absolute -left-2 z-20 hidden h-5 w-5 text-brand-orange lg:block" />

          <ArrowRight className="absolute -right-2 z-20 hidden h-5 w-5 text-brand-orange lg:block" />

        </div>


        {/* RIGHT */}
        <div className="space-y-3">

          {/* Reports */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <Zap className="h-4 w-4 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-brand-navy">
                  AI-Structured Reports
                </h3>

                <p className="mt-1 text-xs text-[#42526E]">
                  10 min instead of 2 hours
                </p>

                <span className="text-[9px] font-bold text-emerald-600">
                  ✓ Automated
                </span>
              </div>

            </div>
          </div>


          {/* Cost */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-brand-navy">
                  Explained Cost Variances
                </h3>

                <p className="mt-1 text-xs text-[#42526E]">
                  Auto-generated variance explanations
                </p>

                <span className="text-[9px] font-bold text-emerald-600">
                  ✓ AI Explained
                </span>
              </div>

            </div>
          </div>


          {/* Safety */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-brand-navy">
                  Prioritized Safety Items
                </h3>

                <p className="mt-1 text-xs text-[#42526E]">
                  Open items summarized by severity
                </p>

                <span className="text-[9px] font-bold text-emerald-600">
                  ✓ Prioritized
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>


      {/* Bottom message */}
      <div className="mt-7 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-xs font-bold text-brand-navy">
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
          Less busywork. More time for decisions.
        </span>
      </div>

    </div>
  </div>
</section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="relative overflow-hidden bg-brand-navy px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <div className="absolute right-10 top-10 h-32 w-32 rounded-xl border border-blue-300" />
            <div className="absolute right-32 top-32 h-20 w-20 rounded-xl border border-blue-300" />
            <div className="absolute bottom-10 right-16 h-24 w-24 rounded-xl border border-blue-300" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">

            {/* LEFT CONTENT */}
            <div className="flex-1">
              <h2 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Your project has the data.
                <br />
                Now turn it into action.
              </h2>

              <p className="mt-3 text-sm text-blue-100">
                Explore Zed AI and see what’s possible.
              </p>
            </div>

            {/* RIGHT SIDE BUTTON */}
            <div className="flex items-center md:ml-8">
              <a
                href="/early-access"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#E85F00]"
              >
                Explore Zed AI
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* RIGHT DECORATIVE CARD */}
            <div className="hidden h-40 w-64 items-center justify-center rounded-xl border border-blue-300/30 bg-white/5 lg:flex">
              <div className="relative flex h-24 w-24 rotate-45 items-center justify-center rounded-xl border border-blue-300/40 bg-[#163968] shadow-2xl">
                <Sparkles className="h-10 w-10 -rotate-45 text-[#5A9BFF]" />
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
