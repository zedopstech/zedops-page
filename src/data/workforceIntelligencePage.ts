import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  FileTextIcon,
  Gauge,
  HardHat,
  ListChecks,
  MapPin,
  MonitorSmartphone,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  WifiOff,
} from "lucide-react";

export const workforceHero = {
  eyebrow: "Workforce Management",
  titleLead: "Manage Your ",
  titleAccent: "People.",
  titleRest: " Drive ",
  titleAccent2: "Performance.",
  subtitle:
    "Complete workforce management from employee database to performance insights – connected from site to office.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
} as const;

export const workforceHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Users, label: "One Workforce One Platform" },
  { icon: MapPin, label: "Real-time Attendance" },
  { icon: ClipboardList, label: "Tasks & Approvals" },
  { icon: BarChart3, label: "Performance Insights" },
];

export const workforceFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: Users,
    title: "Employee Database",
    bullets: [
      "Complete employee profiles",
      "Roles & skills",
      "Departments & teams",
      "Documents & certificates",
    ],
  },
  {
    icon: CalendarClock,
    title: "Attendance & Leave",
    bullets: [
      "GPS based check-in/out",
      "Multiple sites & geofencing",
      "Shift & overtime tracking",
      "Leave management",
    ],
  },
  {
    icon: FileCheck2,
    title: "Requests & Approvals",
    bullets: [
      "Leave request",
      "Asset / PPE request",
      "Punch correction",
      "Custom requests",
    ],
  },
  {
    icon: ListChecks,
    title: "Task Management",
    bullets: [
      "Assign tasks to individuals or teams",
      "Track progress",
      "Due dates & priorities",
      "Task completion",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Scorecard",
    bullets: [
      "Punctuality",
      "Task completion",
      "Productivity",
      "Overall performance",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile & Offline",
    bullets: [
      "Mobile & web access",
      "Works offline",
      "Auto sync when online",
      "Real-time updates",
    ],
  },
  {
    icon: TrendingUp,
    title: "Productivity Tracking",
    bullets: [
      "Output vs plan",
      "By trade and activity",
      "Team productivity today",
      "Course-correct early",
    ],
  },
  {
    icon: WifiOff,
    title: "Offline Capability",
    bullets: [
      "Work without signal",
      "Auto-sync when online",
      "No lost check-ins",
      "Site-ready",
    ],
  },
];

export const workforceWorkflow: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Users, title: "Employee Database", description: "Build one people record for every worker." },
  { icon: Smartphone, title: "Check-in / Out (Site Location)", description: "Capture attendance on the employee app." },
  { icon: CalendarCheck, title: "Attendance Recorded", description: "Hours and location land the same day." },
  { icon: ListChecks, title: "Tasks Assigned", description: "Give crews clear work and owners." },
  { icon: FileCheck2, title: "Requests & Approvals", description: "Leave and assets move through one queue." },
  { icon: Gauge, title: "Performance Calculated", description: "Scorecards update from real work." },
  { icon: Star, title: "Feedback & Improvement", description: "See who needs support next." },
];

export const workforceWhy: string[] = [
  "Real-time visibility of your workforce",
  "Higher productivity every day",
  "Faster approvals, less admin",
  "Fair, transparent performance",
  "Site and office on one record",
  "Better people decisions",
];

export const workforceAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: FileTextIcon, title: "Export reports", body: "Export monthly and weekly reports." },
  { icon: HardHat, title: "Crew matching", body: "Suggest the right people by trade, certs, and availability." },
  { icon: TrendingUp, title: "Productivity look-ahead", body: "Surface crews likely to miss plan before the day ends." },
  { icon: ShieldCheck, title: "Missing certifications", body: "Prompt when documents or tickets are about to expire." },
];

export const workforceCallout = {
  eyebrow: "Connected workforce",
  title: "Right People. Right Work. Right Results.",
  body: "Attendance, tasks, and performance live on the same people record — so site and office decide from one view.",
  points: ["Connected People & Projects",
"Live Workforce Intelligence",
"Faster, Smarter Decisions",
"Improved Team Productivity",
"Stronger Project Outcomes"],
} as const;

export const workforceCta = {
  title: "Right People. Right Work. Right Results.",
  body: "See how ZedOps connects attendance, tasks, and performance from site to office.",
  primary: { label: "Book a Demo", href: "/early-access" },
} as const;
