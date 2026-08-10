import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarClock,
  CalendarPlus,
  CalendarRange,
  Clock,
  CloudDownload,
  CloudRain,
  Eye,
  FileBarChart,
  GanttChart,
  Lightbulb,
  Link2,
  ListChecks,
  Route,
  ShieldAlert,
  Sparkles,
  Timer,
  TrendingUp,
  Upload,
  UserCheck,
  Workflow,
} from "lucide-react";

export const planningHero = {
  eyebrow: "Pre-Construction",
  title: "Planning & Scheduling",
  tagline: "Plan smarter. Track faster. Deliver on time.",
  subtitle:
    "Import, create, and manage programmes in ZedOps — with live progress, baseline vs updated views, and AI alerts where you enable them.",
  primaryCta: { label: "Book a demo", href: "/early-access" },
  secondaryCta: { label: "Watch 2-minute demo", href: "/Schedule_ad_video.mp4" },
  imageSrc: "/schedule and planning.png",
  imageAlt: "ZedOps schedule dashboard with baseline timeline and Gantt",
} as const;

export const planningBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Clock, label: "On-time delivery" },
  { icon: Eye, label: "Better visibility" },
  { icon: Lightbulb, label: "Smarter decisions" },
  { icon: TrendingUp, label: "Higher productivity" },
  { icon: ShieldAlert, label: "Risk reduction" },
];

export type PlanningFeatureTone = "blue" | "orange" | "green" | "purple" | "rose" | "teal";

export const planningFeatures: {
  icon: LucideIcon;
  title: string;
  tone: PlanningFeatureTone;
  bullets: string[];
}[] = [
  {
    icon: CloudDownload,
    title: "Schedule integration",
    tone: "blue",
    bullets: [
      "Import from Primavera P6 / MS Project",
      "CSV upload for quick start",
      "Keep activity IDs aligned",
      "Export back to Primavera or CSV",
    ],
  },
  {
    icon: CalendarPlus,
    title: "Schedule creation",
    tone: "orange",
    bullets: [
      "Build programmes inside ZedOps",
      "Milestones and phase gates",
      "WBS structure support",
      "Link activities and dependencies",
    ],
  },
  {
    icon: UserCheck,
    title: "Activity assignment & tracking",
    tone: "green",
    bullets: [
      "Assign activities to owners",
      "Track performance against plan",
      "Real-time status updates",
      "Clear task ownership",
    ],
  },
  {
    icon: GanttChart,
    title: "Schedule monitoring",
    tone: "purple",
    bullets: [
      "Baseline vs updated views",
      "Gantt and timeline views",
      "Slippage, critical path, and float",
      "Progress tracking on the job",
    ],
  },
  {
    icon: Sparkles,
    title: "Smart schedule intelligence",
    tone: "rose",
    bullets: [
      "Due-date and delay alerts",
      "Critical-path identification",
      "Suggested recovery actions",
      "Pop-ups before dates slip",
    ],
  },
  {
    icon: FileBarChart,
    title: "Reporting & export",
    tone: "teal",
    bullets: [
      "Weekly and monthly summaries",
      "Smart recommendations in reports",
      "Export to CSV",
      "Re-import after planner edits",
    ],
  },
];

export const planningWorkflow: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Upload, title: "Import Schedule(P6/MS Project/CSV)", description: "Bring your plans and schedules into the system with ease." },
  { icon: ListChecks, title: "Define Milestones & WBS", description: "Break down the project and set clear milestones." },
  { icon: CalendarClock, title: "Create Activities(main & sub)", description: "Build activities with dependencies, durations and resources." },
  { icon: UserCheck, title: "Assign Activities To Users", description: "Allocate tasks to the right people and teams." },
  { icon: Workflow, title: "Track & Update Progress", description: "Monitor real-time progress and keep everyone aligned." },
  { icon: Bell, title: "AI Detect Delays & Critical Path", description: "Identify risks and delays early to stay on track." },
  { icon: Sparkles, title: "Smart Recommendations & Auto Recovery", description: "Get AI-powered insights to optimize outcomes." },
  { icon: FileBarChart, title: "Generate Reports & Export", description: "Create detailed reports and share actionable insights." },
];

export const planningWorkflowLoop = {
  icon: Link2,
  title: "Export & Re-import",
  description: "Keep your data connected and updated.",
} as const;

export const planningWhy: string[] = [
  "One programme tied to the same project as logs, tasks, and punch",
  "Baseline vs live so slippage is visible before it compounds",
  "Assignments that become real work — not a Gantt nobody updates",
  "Import from tools planners already use, then stay in ZedOps",
  "Role-aware access so field and office see the right slice",
];

export const planningAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Timer, title: "Delay prediction", body: "Flag activities likely to slip from current progress and float." },
  { icon: CloudRain, title: "Weather impact", body: "Surface outdoor-work risk against the programme calendar." },
  { icon: Route, title: "Recovery options", body: "Suggest resequence or resource moves when the critical path moves." },
  { icon: CalendarRange, title: "Look-ahead packs", body: "Draft weekly look-aheads from live activities and owners." },
];

export const planningCta = {
  title: "Plan Better. Track Smarter. Deliver On Time.",
  body: "See how ZEDOPS helps you plan, monitor and deliver projects successfully.",
  primary: { label: "Book a Demo", href: "/early-access", caption: "No Credit Card Required" },
  secondary: { label: "Start Free Trial", href: "/early-access", caption: "Cancel Anytime" },
} as const;
