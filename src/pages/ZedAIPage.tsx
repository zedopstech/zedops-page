import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
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
  FileBarChart,
  ListChecks,
  ArrowRight,
  Plus,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
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
    title: "Field & jobsite AI",
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
        <p className="mt-1 text-sm font-extrabold leading-snug text-brand-navy">Writing assist on your daily log</p>
        <button
          type="button"
          tabIndex={-1}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-linear-to-r from-[#4d90fe] to-[#012FB0] py-2.5 text-xs font-bold text-white shadow-sm"
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
            <p className="text-sm font-extrabold text-brand-navy leading-snug">AI-suggested workflow</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B778C]">Next steps from your schedule & tasks</p>
          </div>
        </div>
      </div>
    );
  }
  if (variant === "portfolio") {
    return (
      <div className="absolute bottom-4 left-4 right-4 max-w-[min(100%,17rem)] rounded-lg border border-gray-200 bg-white p-3.5 shadow-lg sm:bottom-6 sm:left-6 sm:right-auto sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#6B778C]">Portfolio view</p>
        <p className="mt-1 text-sm font-extrabold leading-snug text-brand-navy">Executive briefing draft</p>
        <button
          type="button"
          tabIndex={-1}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-linear-to-r from-[#4d90fe] to-[#012FB0] py-2.5 text-xs font-bold text-white shadow-sm"
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
          <p className="text-sm font-extrabold text-brand-navy leading-snug">Per-client workspace</p>
          <p className="mt-1 text-xs leading-relaxed text-[#6B778C]">Zed AI stays inside tenant boundaries</p>
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

export default function ZedAIPage() {
  const isMobile = useIsMobile();
  const [showcaseTab, setShowcaseTab] = useState("copilot");

  useSEO({
    title: "Zed AI  -  ZedOps",
    description:
      "Zed AI for general contractors, owners, project managers, and consultants: a project copilot in ZedOps with insights, actions, reports, writing assist, and configurable models  -  gated like the rest of the app.",
  });

  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Zed AI"
          PillIcon={Sparkles}
          title="Get Intelligent Insights & Take Action"
          subtitle="Whether you run jobs in the field, own the portfolio, coordinate delivery, or advise multiple clients - Zed AI meets you with grounded answers and drafts from your ZedOps data."
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-sm rounded-md transition-all duration-150"
            >
              Explore solutions
            </a>
            <a href="/early-access" className="text-sm font-bold text-[#42526E] hover:text-brand-navy transition-colors">
              Request early access
            </a>
          </div>
        </PageHero>

        {/* Tabbed showcase  -  pill tabs, tinted frame, two-column copy + visual (reference layout) */}
        <section className="border-t border-gray-100 bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })} className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-brand-navy sm:text-3xl md:text-4xl">
                AI features that add speed and clarity from preconstruction through closeout
              </h2>
            </motion.div>

            <div className="mb-8 flex justify-center md:mb-10">
              <div
                className="inline-flex max-w-full overflow-x-auto rounded-lg border border-gray-200/80 bg-[#F1F3F9] p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Zed AI capabilities"
              >
                {showcaseTabs.map((t) => {
                  const Icon = t.icon;
                  const active = showcaseTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      id={`zed-ai-tab-${t.id}`}
                      aria-controls="zed-ai-showcase-panel"
                      onClick={() => setShowcaseTab(t.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-md px-3.5 py-2.5 text-left text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm ${
                        active
                          ? "bg-brand-navy text-white shadow-sm"
                          : "text-[#42526E] hover:bg-white/70 hover:text-brand-navy"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={active ? 2.35 : 2} aria-hidden />
                      <span className="whitespace-nowrap">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl bg-[#E4EBFA] p-3 sm:p-5 md:rounded-2xl md:p-8">
              <motion.div
                key={showcaseTab}
                id="zed-ai-showcase-panel"
                role="tabpanel"
                aria-labelledby={`zed-ai-tab-${showcaseTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="relative overflow-visible rounded-lg border border-white/70 bg-white p-6 shadow-sm sm:rounded-xl sm:p-8 md:p-10 lg:p-12"
              >
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="flex flex-col gap-8 lg:col-span-5">
                    {(showcaseCopy[showcaseTab] ?? showcaseCopy.copilot).map((block) => (
                      <div key={block.title}>
                        <h3 className="mb-2 text-lg font-bold text-[#0052CC] sm:text-xl">{block.title}</h3>
                        <p className="text-[15px] leading-relaxed text-[#42526E]">{block.body}</p>
                      </div>
                    ))}
                    <a
                      href="/early-access"
                      className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#0052CC] hover:text-[#0747A6] transition-colors"
                    >
                      Request early access
                      <span aria-hidden>→</span>
                    </a>
                  </div>

                  <div className="relative lg:col-span-7">
                    {/* Layered blue plate behind mock (depth like reference) */}
                    <div
                      className="pointer-events-none absolute inset-[12%_-4%_-6%_8%] z-0 rounded-md bg-[#B8CDF5] sm:rounded-lg"
                      aria-hidden
                    />
                    <div className="relative z-10 min-h-[280px] sm:min-h-[340px] [&>div]:min-h-0 [&>div]:flex [&>div]:flex-col [&>div]:shadow-md">
                      <ShowcasePanel tabId={showcaseTab} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Alternating image + copy blocks (role stories) */}
        <section className="border-t border-gray-100 bg-[#F8FAFC] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8 md:space-y-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">Zed AI for every role on the job</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B778C]">
                Same permissions as today  -  different leverage for the field, the office, the portfolio, and multi-client teams.
              </p>
            </div>

            {roleStoryBlocks.map((block, i) => (
              <motion.div
                key={block.href}
                {...scrollMotionProps(isMobile, { y: 18, duration: 0.42, delay: i * 0.04 })}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:rounded-2xl md:p-10 lg:p-12"
              >
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div
                    className={`relative aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100 ${block.imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <img src={block.image} alt={block.imageAlt} className="h-full w-full object-cover object-center" loading="lazy" />
                    <RoleStoryOverlay variant={block.overlay} />
                  </div>
                  <div className={block.imageOnLeft ? "lg:order-2" : "lg:order-1"}>
                    <h3 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">{block.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#42526E]">{block.desc}</p>
                    <a
                      href={block.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0052CC] hover:text-[#0747A6] transition-colors"
                    >
                      Learn more for this role
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Three pillars */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center text-brand-navy mb-10">What Zed AI covers</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {capabilities.map((c, i) => (
                <motion.div
                  key={c.title}
                  {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: i * 0.06 })}
                  className="text-center sm:text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EBF0FF] flex items-center justify-center mx-auto sm:mx-0 mb-4">
                    <c.icon size={20} className="text-brand-navy" />
                  </div>
                  <h3 className="font-extrabold text-brand-navy mb-2">{c.title}</h3>
                  <p className="text-[#6B778C] text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
