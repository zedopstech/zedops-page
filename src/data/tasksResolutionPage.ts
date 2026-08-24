import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  CalendarClock,
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
  FileTextIcon,
  Gauge,
  UserCheck,
  Users,
} from "lucide-react";
import type { ModulePatternPage } from "@/components/ModulePatternLanding";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const tasksResolutionHero = {
  eyebrow: "Tasks Resolution",
  titleLead: "Assign. Track. ",
  titleAccent: "Resolve. Close.",
  tagline: "Manage every task. Ensure accountability. Track to closure.",
  subtitle:
    "Create tasks, assign to the right people, set due dates and priorities, track progress in real-time and ensure nothing falls through the cracks.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
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
  accent: "effective task Resoultion",
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
  lead: "Task Resoultion ",
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
    title: "One connected task Resoultion",
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

export const tasksResolutionSources: { icon: LucideIcon; label: string; current?: boolean }[] = [
  { icon: Users, label: "Employee Database" },
  { icon: CalendarClock, label: "Attendance & Leave" },
  { icon: BarChart3, label: "Workforce Intelligence" },
  { icon: ListChecks, label: "Task Resolution",current: true },
  { icon: Gauge, label: "Performance Scorecard" },
  { icon: FileTextIcon, label: "Reports & Analytics" },
  { icon: ShieldCheck, label: "Quality & Safety" },
];

export const tasksResolutionCta = {
  title: "Better tasks. Better execution.",
  accent: "Better projects.",
  body: "Assign, track, resolve and close work faster with one connected task Resoultion flow.",
} as const;

export const tasksKpis = {
  title: "Task Performance (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: { label: "View Full Tasks Dashboard", href: "/early-access" },
  sampleNote: "* Sample project data",
  stats: [
    {
      icon: TrendingUp,
      color: "orange" as const,
      label: "Tasks Completed",
      value: "96%",
      sparkPoints: [82, 85, 88, 90, 92, 94, 96],
    },
    {
      icon: BadgeCheck,
      color: "green" as const,
      label: "On-time Completion",
      value: "92%",
      sparkPoints: [84, 86, 87, 89, 90, 91, 92],
    },
    {
      icon: AlertTriangle,
      color: "red" as const,
      label: "Overdue Tasks",
      value: "4",
      sparkPoints: [9, 8, 7, 6, 5, 5, 4],
    },
    {
      icon: KanbanSquare,
      color: "purple" as const,
      label: "Active Tasks",
      value: "47",
      sparkPoints: [38, 41, 43, 45, 44, 46, 47],
    },
  ],
} as const;

export const tasksConnected = {
  titleLead: "One Task Flow. Every Source",
  titleAccent: "Connected.",
  subtitle: "From Creation to Closure",
  hubTitle: "ZEDOPS TASKS RESOLUTION",
  hubTagline: "Assign. Track. Resolve. Close.",
  footer: "Always in Sync. Always Up-to-Date.",
  steps: [
    { icon: FolderKanban, label: "Create\nTask" },
    { icon: UserCheck, label: "Assign\nOwner" },
    { icon: ClipboardList, label: "Set Priority\n& Due" },
    { icon: ListChecks, label: "Track\nProgress" },
    { icon: AlertTriangle, label: "Escalate\nIf Delayed" },
    { icon: BadgeCheck, label: "Verify\n& Close" },
  ],
} as const;

export const tasksComparison = {
  title: "Traditional Way vs ZEDOPS",
  subtitle: "From scattered task lists to one connected resolution flow",

  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Scattered emails & spreadsheets",
      description: "No single source of truth",
    },
    {
      title: "Unclear ownership & follow-up",
      description: "Tasks fall through the cracks",
    },
    {
      title: "Delayed / missing updates",
      description: "Status known too late",
    },
    {
      title: "Manual reporting & rework",
      description: "High effort, low accuracy",
    },
    {
      title: "Decisions after problems occur",
      description: "Issues found too late",
    },
  ],

  withZedops: [
    {
      title: "One connected task flow",
      description: "Every task in one place",
    },
    {
      title: "Clear assignment & accountability",
      description: "Right person, right task, always",
    },
    {
      title: "Real-time progress visibility",
      description: "Always up-to-date status",
    },
    {
      title: "Automated escalations & alerts",
      description: "Less manual work, more control",
    },
    {
      title: "Early action & verified closure",
      description: "Resolve issues before they grow",
    },
  ],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across tasks & sources",
    },
    {
      title: "Better Control",
      description: "Over work & deadlines",
    },
    {
      title: "Higher Productivity",
      description: "For teams & leads",
    },
    {
      title: "Stronger Accountability",
      description: "At every level",
    },
    {
      title: "Better Outcomes",
      description: "On time, every time",
    },
  ],
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

export const tasksDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Tasks Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Task Progress",
    insights: "Task Insights",
    upcoming: "Due Soon",
    alerts: "Task Alerts",
  },

  kpis: [
    { label: "LIVE TASKS", value: "47", description: "Active tasks" },
    { label: "OPEN", value: "12", description: "Not started" },
    { label: "IN PROGRESS", value: "23", description: "Being worked" },
    { label: "DONE TODAY", value: "8", description: "Completed" },
    { label: "OVERDUE", value: "4", description: "Past due date" },
  ],

  progress: { value: "68%", planned: "75%", actual: "68%" },

  insights: [
    { title: "4 tasks overdue", description: "2 critical path tasks need immediate attention." },
    { title: "Team productivity", description: "82% task completion rate this week." },
  ],

  upcoming: [
    { title: "MEP Installation", description: "Electrical works", date: "24 Jul" },
    { title: "Concrete Pour", description: "Level 3 slab", date: "25 Jul" },
    { title: "Formwork Removal", description: "Phase 2 columns", date: "26 Jul" },
  ],

  alerts: [
    { title: "Critical path delay", description: "Foundation task 2 days behind." },
    { title: "Resource conflict", description: "Crane double-booked Thursday." },
    { title: "Dependency blocked", description: "MEP waiting on structure completion." },
  ],

  mainSections: [
    {
      kind: "bars",
      title: "Task Status",
      items: [
        { label: "In Progress", value: "23" },
        { label: "Open", value: "12" },
        { label: "Done Today", value: "8" },
        { label: "Overdue", value: "4" },
      ],
    },
    {
      kind: "stat-grid",
      title: "By Priority",
      columns: 3,
      items: [
        { label: "Critical", value: "6" },
        { label: "High", value: "14" },
        { label: "Medium", value: "19" },
        { label: "Low", value: "8" },
        { label: "Blocked", value: "3" },
        { label: "Unassigned", value: "2" },
      ],
    },
  ],

  activity: [
    { text: "Task created", action: "created" },
    { text: "Task status updated", action: "updated" },
    { text: "Task marked overdue", action: "alert" },
    { text: "Dependency resolved", action: "updated" },
  ],
};
