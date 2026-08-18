import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Eye,
  FileCheck2,
  FileText,
  FolderKanban,
  HardHat,
  KanbanSquare,
  ListChecks,
  MessagesSquare,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { ModulePatternPage } from "@/components/ModulePatternLanding";

export const tasksResolutionHero = {
  eyebrow: "Task Management",
  titleLead: "Assign. Track. ",
  titleAccent: "Resolve. Close.",
  tagline: "Manage every task. Ensure accountability. Track to closure.",
  subtitle:
    "Create tasks, assign to the right people, set due dates and priorities, track progress in real-time and ensure nothing falls through the cracks.",
} as const;

export const tasksResolutionHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Eye, label: "Complete visibility" },
  { icon: UserCheck, label: "Better accountability" },
  { icon: RefreshCcw, label: "On-time completion" },
  { icon: BarChart3, label: "Centralized tracking" },
  { icon: TrendingUp, label: "Actionable insights" },
];

export const tasksResolutionFeaturesTitle = {
  lead: "Everything you need for ",
  accent: "effective task management",
  subtitle: "From task creation to closure, every action stays connected, trackable, and accountable.",
} as const;

export const tasksResolutionFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: FolderKanban,
    title: "Create & assign tasks",
    bullets: [
      "Create tasks manually or from other modules",
      "Assign to individual or teams",
      "Set priority, due dates & dependencies",
      "Add details, attachments & checklists",
    ],
  },
  {
    icon: KanbanSquare,
    title: "Track & monitor progress",
    bullets: [
      "Real-time status tracking",
      "Comments, updates & file attachments",
      "Time spent tracking",
      "Linked to drawings, specs & documents",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Manage & escalate",
    bullets: [
      "Identify overdue & delayed tasks",
      "Escalation rules & reminders",
      "Reassign tasks when required",
      "Keep stakeholders informed",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Convert to tasks",
    bullets: [
      "Tasks from schedule activities",
      "Tasks from inspections & issues",
      "Tasks from daily execution",
      "Tasks from snags & punch lists",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Close & verify",
    bullets: [
      "Verify task completion",
      "Upload completion evidence",
      "Quality check & approval",
      "Close with full audit trail",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboards & reports",
    bullets: [
      "Open vs overdue tasks dashboards",
      "Task aging & workload reports",
      "Performance by user & team",
      "Custom reports & exports",
    ],
  },
];

export const tasksResolutionWorkflowTitle = {
  lead: "Task management ",
  accent: "workflow",
  subtitle: "Move every task through a clear resolution path, from creation to verified closure.",
} as const;

export const tasksResolutionWorkflow: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  { icon: FolderKanban, title: "Create task", description: "Log the work item with context, priority and deadline." },
  { icon: UserCheck, title: "Assign task", description: "Set clear ownership for the right person or team." },
  { icon: ClipboardList, title: "Set priority & due date", description: "Define urgency, sequence and expectations early." },
  { icon: FileText, title: "Execute & update", description: "Teams progress the task with notes, files and time updates." },
  { icon: ListChecks, title: "Track progress", description: "Monitor open, in-progress and completed work in real-time." },
  { icon: AlertTriangle, title: "Escalate if delayed", description: "Flag overdue items and trigger reminders or reassignment." },
  { icon: FileCheck2, title: "Verify & approve", description: "Review completion evidence before accepting closure." },
  { icon: BadgeCheck, title: "Close task", description: "Complete the task with a full audit trail." },
  { icon: BarChart3, title: "Reports & insights", description: "Analyze task aging, workload and team performance." },
];

export const tasksResolutionWhyTitle = "QC & site teams choose ZedOps";

export const tasksResolutionWhy: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: ClipboardList,
    title: "One connected task management",
    desc: "All tasks from schedules, inspections, daily logs & snags in one place.",
  },
  {
    icon: UserCheck,
    title: "Complete accountability",
    desc: "Right person, right time, clear responsibility.",
  },
  {
    icon: Eye,
    title: "Real-time visibility",
    desc: "Live updates, comments & status, always in control.",
  },
  {
    icon: RefreshCcw,
    title: "On-time task completion",
    desc: "Smart alerts, escalations & reminders.",
  },
  {
    icon: Target,
    title: "Better decision making",
    desc: "Powerful dashboards to close more tasks, faster.",
  },
];

export const tasksResolutionAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Sparkles,
    title: "AI task suggestions from delays",
    body: "Recommend tasks automatically when schedule slippage or blockers appear.",
  },
  {
    icon: TrendingUp,
    title: "Auto priority & risk prediction",
    body: "Surface the tasks most likely to impact delivery before they escalate.",
  },
  {
    icon: MessagesSquare,
    title: "Smart escalation recommendations",
    body: "Suggest the next action, owner or follow-up when progress stalls.",
  },
  {
    icon: BadgeCheck,
    title: "AI workload balancing",
    body: "Highlight overloaded teams and help redistribute work earlier.",
  },
];

export const tasksResolutionCallout = {
  eyebrow: "Connected execution",
  title: "Task sources. All connected, all tracked.",
  body: "Create tasks from schedule activities, inspections, daily execution, RFIs, submittals, change orders, meeting action items and custom workflows, then manage them through one shared resolution process.",
  stats: [
    { label: "On-time completion", value: "96%", trend: "up" as const },
    { label: "Overdue tasks reduced", value: "42%", trend: "down" as const },
    { label: "Avg. task closure time", value: "2.8 Days", trend: "down" as const },
  ],
} as const;

export const tasksResolutionSourcesTitle = {
  lead: "Tasks sources – ",
  accent: "all connected, all tracked",
} as const;

export const tasksResolutionSources: { icon: LucideIcon; label: string }[] = [
  { icon: ClipboardCheck, label: "Schedule Activities" },
  { icon: ShieldCheck, label: "Inspections & Issues" },
  { icon: ClipboardList, label: "Daily Execution" },
  { icon: HardHat, label: "Snags & Punch List" },
  { icon: FileText, label: "RFI & Submittals" },
  { icon: Cog, label: "Change Orders" },
  { icon: Users, label: "Meeting Action Items" },
  { icon: BadgeCheck, label: "Custom Tasks" },
];

export const tasksResolutionCta = {
  title: "Better tasks. Better execution.",
  accent: "Better projects.",
  body: "Assign, track, resolve and close work faster with one connected task management flow.",
} as const;

export const tasksResolutionPage: ModulePatternPage = {
  hero: tasksResolutionHero,
  highlights: tasksResolutionHighlights,
  featuresTitleLead: tasksResolutionFeaturesTitle.lead,
  featuresTitleAccent: tasksResolutionFeaturesTitle.accent,
  featuresSubtitle: tasksResolutionFeaturesTitle.subtitle,
  features: tasksResolutionFeatures,
  workflowTitleLead: tasksResolutionWorkflowTitle.lead,
  workflowTitleAccent: tasksResolutionWorkflowTitle.accent,
  workflowSubtitle: tasksResolutionWorkflowTitle.subtitle,
  workflow: tasksResolutionWorkflow,
  whyTitle: tasksResolutionWhyTitle,
  why: tasksResolutionWhy,
  aiSoon: tasksResolutionAiSoon,
  callout: tasksResolutionCallout,
  cta: tasksResolutionCta,
};
