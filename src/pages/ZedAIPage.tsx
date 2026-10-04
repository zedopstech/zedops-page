import { useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Brain, Check, CheckCircle2, FileBarChart, LayoutDashboard, ListChecks, MessageSquare, PenLine, Server, ShieldCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { framePad, GhostButton, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import ZedSpecialistsSection from "@/components/zed/ZedSpecialistsSection";
import { ModuleClosingCta } from "@/components/module/ModuleSections";
import { ZaiActions, ZaiCopilot, ZaiHeroAsk, ZaiInsights, ZaiReports, ZaiRisk, ZaiWriting } from "@/components/mocks/scenes";

const pad = (n: number) => String(n).padStart(2, "0");

type Capability = { id: string; label: string; icon: LucideIcon; title: string; body: string; detail: string; Mock: ComponentType };

const capabilities: Capability[] = [
  {
    id: "copilot",
    label: "Copilot",
    icon: MessageSquare,
    title: "Ask about the job in plain language.",
    body: "Status, risks and next steps, answered from the same project data you’re allowed to see. No generic web guesses.",
    detail: "Turn answers into drafts and suggested actions, so the thread stays inside ZedOps.",
    Mock: ZaiCopilot,
  },
  {
    id: "writing",
    label: "Writing assist",
    icon: PenLine,
    title: "Draft the follow-up, not just the answer.",
    body: "Improve, shorten or expand text in supported fields. Daily logs, descriptions and notes ship faster.",
    detail: "Site and office documentation stays consistent, and you choose what gets saved.",
    Mock: ZaiWriting,
  },
  {
    id: "insights",
    label: "Insights",
    icon: LayoutDashboard,
    title: "See trouble before it becomes a delay.",
    body: "Patterns from schedules, tasks, materials and cost surface early for PMs and leadership, not after the fact. Built-in models flag likely schedule delays, material demand and budget anomalies.",
    detail: "What you see matches your access: field teams, PMs and executives each get relevant summaries.",
    Mock: ZaiRisk,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileBarChart,
    title: "Reports assembled from the record.",
    body: "Summaries and structured drafts that map to the inspections, logs and financial views your teams already use.",
    detail: "Everything is meant to be checked by a person. Zed AI speeds up assembly; it doesn’t replace sign-off.",
    Mock: ZaiReports,
  },
  {
    id: "actions",
    label: "Actions",
    icon: ListChecks,
    title: "From insight to the next step.",
    body: "Where enabled, draft material, purchase, transfer and reserve requests, tasks and snags without retyping context.",
    detail: "Every action arrives as an approval card for you to confirm. Actions respect roles and modules: if you can’t do it manually in ZedOps, the copilot can’t either.",
    Mock: ZaiActions,
  },
];

const prompts = [
  { module: "Core", prompt: "Summarise this week’s activity across all modules" },
  { module: "Planning", prompt: "What slipped, and what’s the recovery plan?" },
  { module: "Estimation", prompt: "Draft a bid narrative from this estimate" },
  { module: "Budget & cost", prompt: "Explain the cost variance on MEP" },
  { module: "Daily logs", prompt: "Turn today’s notes into a clean daily report" },
  { module: "Quality & safety", prompt: "Summarise open findings by severity" },
  { module: "Materials", prompt: "Which deliveries are at risk this week?" },
  { module: "Tasks", prompt: "Group overdue tasks by owner" },
  { module: "Workforce", prompt: "Why are 19 check-ins delayed?" },
  { module: "Punch list", prompt: "Prioritise punch items by closeout impact" },
];

const flow = [
  { title: "Ask", body: "A plain-language question about your project data." },
  { title: "Draft", body: "Zed AI assembles a summary, report or update." },
  { title: "Review", body: "You, or your approver, confirm before it goes out." },
  { title: "Log", body: "Approved output and actions land back in ZedOps." },
];

const beforeAfter = [
  { module: "Daily logs", before: "Hours spent writing and reconciling field notes", after: "Structured daily reports drafted from site notes" },
  { module: "Budget & cost", before: "Manual variance write-ups every week", after: "Cost variances explained from the record" },
  { module: "Quality & safety", before: "Findings scattered across spreadsheets", after: "Open items summarised by severity" },
];

const roles = [
  { title: "General contractors", href: "/who-we-serve/general-contractors", image: "/personas/site-supervisor.jpg", body: "Supers automate the tedious parts of documentation, grounded in the jobs their role can see." },
  { title: "Owners & developers", href: "/who-we-serve/owners", image: "/personas/company-owner.jpg", body: "Portfolio questions in plain language, with rollups tied to the projects you’re entitled to." },
  { title: "Project managers", href: "/who-we-serve/project-managers", image: "/personas/project-managers.jpg", body: "What slipped, what needs a decision, and what to communicate next, in one thread." },
  { title: "Consultants & CM firms", href: "/who-we-serve/consultants", image: "/contractors/subco.webp", body: "Serve multiple clients without mixing data; each engagement stays in its own workspace." },
];

const trust = [
  { icon: ShieldCheck, title: "Permissioned", body: "Only sees records your role can already open." },
  { icon: Server, title: "Tenant-isolated", body: "Clients and projects never mix." },
  { icon: CheckCircle2, title: "Human in the loop", body: "You review before anything is sent." },
];

function CapabilityShowcase({ isMobile }: { isMobile: boolean }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const c = capabilities[active]!;
  return (
    <Section labelledBy="zai-capabilities">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="zai-capabilities"
            title={<>One copilot, <Highlight>five jobs.</Highlight></>}
            body="Zed AI answers, drafts, spots risk, prepares reports and takes the next step, all inside ZedOps and within your permissions."
          />
        </motion.div>
      </div>
      <div role="tablist" aria-label="Zed AI capabilities" className="grid grid-cols-2 border-t border-[#E8ECF2] sm:grid-cols-3 lg:grid-cols-5">
        {capabilities.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`zai-tab-${i}`}
              aria-selected={on}
              aria-controls="zai-panel"
              onClick={() => setActive(i)}
              className={`relative flex items-center gap-2.5 border-[#E8ECF2] px-5 py-5 text-start outline-none transition-colors focus-visible:bg-[#F7F8FA] sm:px-6 ${i > 0 ? "border-s" : ""} ${on ? "bg-[#F7F8FA]" : "hover:bg-[#FAFBFC]"}`}
            >
              <span aria-hidden className={`absolute inset-x-0 -top-px h-[2px] ${on ? "bg-brand-orange" : "bg-transparent"}`} />
              <item.icon size={17} className={on ? "text-brand-orange" : "text-[#677388]"} aria-hidden />
              <span className={`text-[15px] font-medium ${on ? "text-brand-navy" : "text-[#5E6C84]"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-[#E8ECF2] bg-[#F7F8FA]">
        <motion.div
          key={c.id}
          id="zai-panel"
          role="tabpanel"
          aria-labelledby={`zai-tab-${active}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-16 ${framePad}`}
        >
          <div>
            <h3 className="text-[24px] font-medium leading-[1.3] tracking-[-0.025em] text-brand-navy sm:text-[28px]">
              {c.title} <Muted>{c.body}</Muted>
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-[1.6] text-[#616D82]">{c.detail}</p>
          </div>
          <div className="mx-auto w-full max-w-[520px]">
            <c.Mock />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default function ZedAIPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Zed AI - ZedOps",
    description:
      "Zed AI gives construction teams insights, drafts, reports, and actions directly from ZedOps project data, within the permissions each role already has.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Zed AI"
          PillIcon={Brain}
          title={<>Turn project data into decisions. <Muted>Instantly.</Muted></>}
          subtitle="Insights, drafts, reports and actions from your ZedOps project data, grounded in what each person is allowed to see."
        >
          <div className="flex flex-wrap gap-3">
            <TicketButton href="/early-access">Request early access</TicketButton>
            <GhostButton href="#how-it-works" icon={ArrowRight}>
              See how it works
            </GhostButton>
          </div>
        </PageHero>

        <div className="border-t border-[#E8ECF2] bg-[#F7F8FA]">
          <motion.div
            {...scrollMotionProps(isMobile, { y: 24, duration: 0.6, delay: 0.1 })}
            className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:border-x lg:border-[#E3E8F0] lg:px-14"
          >
            <div className="mx-auto w-full max-w-[520px]"><ZaiHeroAsk /></div>
            <div className="mx-auto hidden w-full max-w-[520px] lg:block"><ZaiInsights /></div>
          </motion.div>
        </div>

        <CapabilityShowcase isMobile={isMobile} />

        <ZedSpecialistsSection />

        <Section labelledBy="zai-prompts">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="zai-prompts"
                title={<>Ask about <Highlight>any module.</Highlight></>}
                body="Zed AI works across the whole platform. A few of the questions teams ask every week:"
              />
            </motion.div>
          </div>
          <ul className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-5">
            {prompts.map((p, i) => (
              <motion.li
                key={p.module}
                {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: (i % 5) * 0.04 })}
                className="flex flex-col bg-[#F7F8FA] px-6 py-7"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5F6B80]">{p.module}</span>
                <p className="mt-4 text-[16px] leading-[1.4] font-medium tracking-[-0.01em] text-brand-navy">“{p.prompt}”</p>
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section tone="mist" id="how-it-works" labelledBy="zai-flow" className="scroll-mt-[100px]">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="zai-flow"
                title={<>How Zed AI <Highlight>works.</Highlight></>}
                body="From a question to an approved action, with a person deciding at every step that matters."
              />
            </motion.div>
          </div>
          <ol className="grid border-t border-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <motion.li
                key={f.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.06 })}
                className={`border-[#E8ECF2] px-6 py-9 sm:px-8 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-s" : ""} ${i === 2 ? "lg:border-s" : ""}`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E3E8F0] font-mono text-[12px] text-brand-navy">{pad(i + 1)}</span>
                <h3 className="mt-8 text-[20px] font-medium tracking-[-0.02em] text-brand-navy">{f.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#616D82]">{f.body}</p>
              </motion.li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="zai-before-after">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="zai-before-after"
                title={<>Less busywork. <Muted>More time for decisions.</Muted></>}
                body="Three routine jobs, before and after Zed AI."
              />
            </motion.div>
          </div>
          <div className="border-t border-[#E3E8F0] bg-white">
            {beforeAfter.map((row, i) => (
              <motion.div
                key={row.module}
                {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: i * 0.05 })}
                className={`grid gap-4 py-7 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10 ${framePad} ${i > 0 ? "border-t border-[#EDF0F5]" : ""}`}
              >
                <span className="text-[15px] font-medium text-brand-navy">{row.module}</span>
                <span className="flex items-start gap-2.5 text-[15px] text-[#5F6B80]">
                  <X size={15} strokeWidth={2.6} className="mt-1 shrink-0 text-[#C9D2DF]" aria-hidden />
                  {row.before}
                </span>
                <span className="flex items-start gap-2.5 text-[15px] text-brand-navy">
                  <Check size={15} strokeWidth={2.6} className="mt-1 shrink-0 text-brand-orange" aria-hidden />
                  {row.after}
                </span>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section tone="mist" labelledBy="zai-roles">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="zai-roles"
                title={<>Built for <Highlight>every role.</Highlight></>}
                body="Each person gets answers and drafts shaped by the work they do and the records they can access."
              />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <motion.a
                key={r.title}
                href={r.href}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.05 })}
                className="group flex flex-col bg-white p-5 transition-colors hover:bg-[#FAFBFC] sm:p-6"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#EEF1F5]">
                  <img src={r.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-5 flex items-center justify-between gap-2 text-[17px] font-medium tracking-[-0.02em] text-brand-navy">
                  {r.title}
                  <ArrowUpRight size={16} className="shrink-0 text-[#677388] transition-colors group-hover:text-brand-orange" aria-hidden />
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-[#616D82]">{r.body}</p>
              </motion.a>
            ))}
          </div>
        </Section>

        <Section labelledBy="zai-trust">
          <div className={`grid gap-10 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:py-20 ${framePad}`}>
            <h2 id="zai-trust" className="text-[26px] font-medium leading-[1.2] tracking-[-0.03em] text-brand-navy sm:text-[30px]">
              Grounded in your data. <Muted>Bounded by your permissions.</Muted>
            </h2>
            <ul className="grid gap-6 sm:grid-cols-3">
              {trust.map((t) => (
                <li key={t.title}>
                  <t.icon size={20} className="text-brand-orange" aria-hidden />
                  <p className="mt-4 text-[15px] font-medium text-brand-navy">{t.title}</p>
                  <p className="mt-1 text-[14px] leading-[1.5] text-[#616D82]">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <ModuleClosingCta
          isMobile={isMobile}
          id="zai-cta"
          title={<>Your project has the data. <span className="text-white/55">Zed AI puts it to work.</span></>}
          body="See Zed AI on your own schedule, logs and punch list. We’ll walk you through it."
          primary={{ label: "Request early access", href: "/early-access" }}
        />
      </main>
      <Footer />
    </div>
  );
}
