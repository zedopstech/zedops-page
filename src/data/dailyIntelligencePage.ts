import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  Camera,
  ChartLine,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Clock3,
  Cloud,
  Eye,
  FileCheck2,
  HardHat,
  Images,
  ListChecks,
  MessageSquare,
  Monitor,
  Package,
  PenLine,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export const dailyHero = {
  eyebrow: "Construction Execution",
  titleLead: "Daily Execution ",
  titleAccent: "Intelligence",
  tagline: "Capture site reality. Connect office instantly.",
  subtitle:
    "Drive actions from one daily log — work, people, materials, equipment, issues, and sign-off — so projects stay on time.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
} as const;

export const dailyHeroHighlights: { icon: LucideIcon; label: string; blurb: string }[] = [
  { icon: Eye, label: "Real-time Visibility", blurb: "See site progress the same day." },
  { icon: Users, label: "Better Collaboration", blurb: "Site and office on one record." },
  { icon: Zap, label: "Faster Actions", blurb: "Issues become assigned work." },
  { icon: ShieldCheck, label: "Complete Traceability", blurb: "Photos, owners, and sign-off." },
];

export type DailyFeatureTone = "blue" | "orange" | "green" | "purple" | "rose" | "teal" | "amber" | "indigo";

export const dailyCaptureCards: {
  icon: LucideIcon;
  title: string;
  blurb: string;
  tone: DailyFeatureTone;
}[] = [
  { icon: ClipboardList, title: "General Details", blurb: "Weather, location, shift, and site photos that frame the day.", tone: "teal" },
  { icon: FileCheck2, title: "Work Log", blurb: "Activities completed, quantities, and progress against plan.", tone: "blue" },
  { icon: Users, title: "People on Site", blurb: "Headcount by trade, hours, visitors, and overtime.", tone: "purple" },
  { icon: Package, title: "Materials", blurb: "Delivered, consumed, remaining, and shortages flagged.", tone: "orange" },
  { icon: Wrench, title: "Equipment", blurb: "Plant on site, hours used, idle time, and breakdowns.", tone: "rose" },
  { icon: AlertTriangle, title: "Issues & Concerns", blurb: "Raise, assign, and track problems until they close.", tone: "amber" },
  { icon: ShieldCheck, title: "Survey, Inspection & Incidents", blurb: "Checklists, QA walks, and safety events on the same log.", tone: "indigo" },
  { icon: PenLine, title: "Signature", blurb: "Supervisor digital sign-off with timestamp and lock.", tone: "green" },
];

export const dailyWorkflow: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Smartphone, title: "Site Opens App", description: "Start your day with ZedOps." },
  { icon: CalendarDays, title: "Record General Details", description: "Time, weather, schedule & delays." },
  { icon: ClipboardList, title: "Log Work Activities", description: "Select activity, add quantity, team & photos." },
  { icon: Users, title: "People on Site", description: "Auto-capture team & visitors." },
  { icon: Package, title: "Materials", description: "Record delivered & consumed materials." },
  { icon: Wrench, title: "Equipment", description: "Add delivered, used equipment & tools." },
  { icon: AlertTriangle, title: "Issues & Concerns", description: "Raise, assign & track issues." },
  { icon: ClipboardCheck, title: "Surveys, Inspections & Incidents", description: "Capture surveys, inspections & incidents." },
  { icon: PenLine, title: "Sign & Submit", description: "Digital sign and submit report." },
];

export const dailyWorkflowSync: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: HardHat, title: "At Site", description: "Record accurate data on the go." },
  { icon: Cloud, title: "Real-time Sync", description: "Instant visibility to office for faster decisions." },
  { icon: Building2, title: "At Office", description: "View, act and drive projects forward." },
];

export const dailyWorkflowPhone = {
  src: "/phone_dailylog%20img2.png",
  alt: "ZedOps Daily Intelligence mobile log with completed capture steps",
} as const;

export const dailyWorkflowSite: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  points: { icon: LucideIcon; label: string }[];
} = {
  badge: "At Site",
  imageSrc: "/on site.png",
  imageAlt: "Supervisors capturing work on a live construction site",
  points: [
    { icon: Camera, label: "Capture in Real-time" },
    { icon: RefreshCcw, label: "Works Offline & Syncs Later" },
    { icon: Images, label: "Attach Photos & Documents" },
    { icon: Users, label: "Assign Tasks to Teams" },
    { icon: Package, label: "Track Materials & Equipment" },
  ],
};

export const dailyWorkflowOffice: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  points: { icon: LucideIcon; label: string }[];
} = {
  badge: "At Office",
  imageSrc: "/at office.png",
  imageAlt: "Project manager reviewing daily intelligence on a dashboard",
  points: [
    { icon: Monitor, label: "Instant Visibility" },
    { icon: ClipboardCheck, label: "Raise Tasks & Assign" },
    { icon: Clock, label: "Track to Closure & Sign-off" },
    {icon: UserCheck, label: "Action & Assignments"},
    {icon: ChartLine, label: "Progress Monitoring & Reporting"},
    
  ],
};

export const dailyCaptureDetails: {
  icon: LucideIcon;
  title: string;
  tone: DailyFeatureTone;
  bullets: string[];
}[] = [
  {
    icon: ClipboardList,
    title: "General Details",
    tone: "teal",
    bullets: ["Weather and site conditions", "Location / area of work", "Shift and working hours", "Photos of site condition"],
  },
  {
    icon: FileCheck2,
    title: "Work Log",
    tone: "blue",
    bullets: ["Activities completed today", "Progress against the plan", "Quantities and % complete", "Supervisor notes"],
  },
  {
    icon: Users,
    title: "People on Site",
    tone: "purple",
    bullets: ["Headcount by trade", "Hours worked", "Visitors and subcontractors", "Absentees and overtime"],
  },
  {
    icon: Package,
    title: "Materials",
    tone: "orange",
    bullets: ["Materials delivered today", "Materials consumed today", "Remaining on site", "Shortages flagged"],
  },
  {
    icon: Wrench,
    title: "Equipment",
    tone: "rose",
    bullets: ["Equipment on site", "Hours used", "Idle / downtime", "Breakdowns logged"],
  },
  {
    icon: AlertTriangle,
    title: "Issues & Concerns",
    tone: "amber",
    bullets: ["Raise issues with photos", "Assign owner and due date", "Track status to close", "Notify office instantly"],
  },
  {
    icon: ListChecks,
    title: "Survey",
    tone: "indigo",
    bullets: ["Checklist-based surveys", "Reusable site templates", "Answers tied to the day", "Photos on each item"],
  },
  {
    icon: ShieldCheck,
    title: "Inspection",
    tone: "blue",
    bullets: ["QA / QC walks from templates", "Pass / fail with notes", "Corrective actions linked", "Results on the same log"],
  },
  {
    icon: ShieldAlert,
    title: "Incident",
    tone: "rose",
    bullets: ["Safety and site incidents", "What happened and who", "Follow-up owners", "Report-ready record"],
  },
  {
    icon: PenLine,
    title: "Signature",
    tone: "green",
    bullets: ["Supervisor digital sign-off", "Timestamp and location", "Locked after submit", "Audit-ready record"],
  },
];

export const dailyWhyPain: { icon: LucideIcon; title: string }[] = [
  { icon: Users, title: "Site and office disconnected" },
  { icon: MessageSquare, title: "Paper, WhatsApp, and late reports" },
  { icon: Eye, title: "No same-day visibility" },
  { icon: AlertTriangle, title: "Issues lost between shifts" },
  { icon: Camera, title: "No photos or owners on the record" },
  { icon: Clock3, title: "Reactive decisions after the fact" },
];

export const dailyWhyGain: { icon: LucideIcon; title: string }[] = [
  { icon: Users, title: "Bridge the site–office gap" },
  { icon: ClipboardCheck, title: "Structured digital capture" },
  { icon: Eye, title: "Live visibility every day" },
  { icon: CheckCircle2, title: "Issues tracked through close" },
  { icon: Images, title: "Complete photo and audit trail" },
  { icon: Zap, title: "Actions driven the same day" },
];

export const dailyWhyPainPills = [
  "Disconnected teams",
  "Paper & WhatsApp",
  "No same-day view",
  "Lost issues",
  "No photo trail",
  "Late decisions",
] as const;

export const dailyWhyGainPills = [
  "One daily log",
  "Digital capture",
  "Live visibility",
  "Issues tracked",
  "Audit trail",
  "Same-day action",
] as const;

export const dailyWhyMatters: {
  icon: LucideIcon;
  label: string;
  tone: DailyFeatureTone;
}[] = [
  { icon: Eye, label: "Know what's happening at site", tone: "blue" },
  { icon: Users, label: "Bridge the site-office gap", tone: "blue" },
  { icon: Zap, label: "Act faster on issues & delays", tone: "orange" },
  { icon: TrendingUp, label: "Improve productivity & performance", tone: "green" },
  { icon: ShieldCheck, label: "Better quality & safety", tone: "blue" },
  { icon: Clock3, label: "Deliver projects on time", tone: "teal" },
];

export const dailyImpact: {
  icon: LucideIcon;
  value: string;
  label: string;
  tone: DailyFeatureTone;
}[] = [
  { icon: Eye, value: "100%", label: "Daily Visibility", tone: "blue" },
  { icon: Users, value: "35%", label: "Faster Issue Resolution", tone: "green" },
  { icon: Clock3, value: "25%", label: "Reduction in Delays", tone: "orange" },
  { icon: TrendingUp, value: "20%", label: "Improvement in Productivity", tone: "purple" },
  { icon: ShieldCheck, value: "100%", label: "Traceability & Accountability", tone: "teal" },
];

export const   dailyWhyChoose: string[] = [
  "One daily log for work, people, materials, and plant",
  "Issues and inspections live next to the day’s record",
  "Mobile capture that the office sees instantly",
  "Digital sign-off instead of paper diaries",
  "Role-aware access for field and PMs",
  "Photos, owners, and a complete audit trail",
];

export const dailyAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Sparkles, title: "AI Daily Log Report", body: "AI-generated daily log report for office review and action." },
  { icon: ChartLine, title: "Productivity Analytics Report", body: "AI-generated productivity analytics report for office review and action." },
  { icon: Eye, title: "Project Performance Report", body: "AI-generated project performance report for office review and action." },
  { icon: ClipboardCheck, title: "AI Issue Tracking", body: "AI-generated issue tracking report for office review and action." },
];

export const dailyCta = {
  title: "Capture Today. Control Tomorrow. Deliver On Time.",
  body: "Book a demo and see how ZedOps turns the daily site log into live intelligence for the office.",
  primary: { label: "Book a Demo", href: "/early-access" },
} as const;
