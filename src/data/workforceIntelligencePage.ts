import type { LucideIcon } from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";
import {
  AlertTriangle,
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
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Banknote,
  WifiOff,
  GanttChart,
  Warehouse,
  Boxes,
  Workflow,
} from "lucide-react";

export const workforceHero = {
  eyebrow: "Workforce Intelligence",
  titleLead: "Manage Your ",
  titleAccent: "People. Drive Performance.",
  subtitle:
    "Complete workforce management from employee database to performance insights – connected from site to office.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
} as const;

export const workforceFeaturesTitle = {
  lead: "Everything you need for complete ",
  accent: "workforce intelligence",
} as const;

export const workforceWorkflowTitle = {
  lead: "Workforce ",
  accent: "workflow",
} as const;

export const workforceKpis = {
  title: "Workforce Performance (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: { label: "View Full Workforce Dashboard", href: "/early-access" },
  sampleNote: "* Sample project data",
  stats: [
    {
      icon: Users,
      color: "orange" as const,
      label: "Total Workforce",
      value: "532",
      sparkPoints: [480, 495, 505, 512, 520, 528, 532],
    },
    {
      icon: TrendingUp,
      color: "green" as const,
      label: "Attendance Rate",
      value: "86%",
      sparkPoints: [78, 80, 82, 83, 84, 85, 86],
    },
    {
      icon: AlertTriangle,
      color: "red" as const,
      label: "Absenteeism",
      value: "14%",
      sparkPoints: [10, 11, 12, 12, 13, 13, 14],
    },
    {
      icon: Gauge,
      color: "purple" as const,
      label: "Avg Performance",
      value: "84",
      sparkPoints: [80, 81, 82, 83, 83, 84, 84],
    },
  ],
} as const;

export const workforceConnected = {
  titleLead: "One Workforce. Every Site",
  titleAccent: "Connected.",
  subtitle: "From Site to Office",
  hubTitle: "ZEDOPS WORKFORCE INTELLIGENCE",
  hubTagline: "Manage. Track. Perform. Improve.",
  footer: "Always in Sync. Always Up-to-Date.",
  steps: [
    { icon: Users, label: "Build\nPeople Record" },
    { icon: Smartphone, label: "Check In\n& Out" },
    { icon: CalendarCheck, label: "Record\nAttendance" },
    { icon: ListChecks, label: "Assign\nTasks" },
    { icon: Gauge, label: "Measure\nPerformance" },
    { icon: Star, label: "Improve\n& Support" },
  ],
} as const;

export const workforceComparison = {
  title: "Traditional Way vs ZEDOPS",
  subtitle: "From disconnected workforce processes to one connected people record",

  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Spreadsheets & paper logs",
      description: "Manual attendance and costly errors",
    },
    {
      title: "Delayed / missing data",
      description: "Decisions on stale numbers",
    },
    {
      title: "Unclear ownership & follow-up",
      description: "Tasks fall through the cracks",
    },
    {
      title: "Manual approvals & rework",
      description: "Slow, error-prone admin",
    },
    {
      title: "Decisions after problems occur",
      description: "Issues identified too late",
    },
  ],

  withZedops: [
    {
      title: "One connected platform",
      description: "All people data in one place",
    },
    {
      title: "Real-time attendance visibility",
      description: "Always up-to-date information",
    },
    {
      title: "Clear assignment & accountability",
      description: "Right person, right task, always",
    },
    {
      title: "Automated tracking & approvals",
      description: "Less manual work, more accuracy",
    },
    {
      title: "Early alerts & actionable decisions",
      description: "Identify issues early, act faster",
    },
  ],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across sites & crews",
    },
    {
      title: "Better Control",
      description: "Over attendance & output",
    },
    {
      title: "Higher Productivity",
      description: "For teams & leaders",
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

export const workforceAiRoadmap = {
  icon: Sparkles,
  title: "What's Coming Next – ZED AI (Roadmap)",
  items: [
    {
      icon: HardHat,
      title: "AI Team Performance",
      body: "Analyze team productivity and performance trends.",
    },
    {
      icon: TrendingUp,
      title: "AI Productivity Look-ahead",
      body: "Surface crews likely to miss plan before the day ends.",
    },
    {
      icon: ShieldCheck,
      title: "AI Certification Alerts",
      body: "Prompt when documents or tickets are about to expire.",
    },
    {
      icon: FileTextIcon,
      title: "AI Export Reports",
      body: "Generate intelligent monthly and weekly workforce reports.",
    },
  ],
} as const;

export const workforceSourcesTitle = {
  lead: "Workforce Intelligence Connects ",
  accent: "Across ZEDOPS",
} as const;

export const workforceSources: { icon: LucideIcon; label: string; current?: boolean }[] = [
  { icon: Users, label: "Employee Database" },
  { icon: CalendarClock, label: "Attendance & Leave" },
  { icon: ListChecks, label: "Task Resoultion" },
  { icon: BarChart3, label: "Workforce Intelligence", current: true },
  { icon: Gauge, label: "Performance Scorecard" },
  { icon: FileTextIcon, label: "Reports & Analytics" },
  { icon: ShieldCheck, label: "Quality & Safety" },
];

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
    title: "Task Resoultion",
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

export const workforceDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Workforce Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Workforce Progress",
    insights: "Crew Insights",
    upcoming: "Upcoming Shifts",
    alerts: "Workforce Alerts",
  },

  extraCard: {
    title: "Employee Delays",
    value: "19",
    sub: "Late check-ins today",
    items: [
      { title: "Traffic", description: "8 workers delayed by commute" },
      { title: "Approval", description: "6 pending site access" },
      { title: "No-show", description: "5 unexcused absences" },
    ],
  },

  kpis: [
    { label: "TOTAL STAFF", value: "532", description: "Registered workers" },
    { label: "PRESENT TODAY", value: "412", description: "Checked in" },
    { label: "ON LEAVE", value: "32", description: "Approved leave" },
    { label: "OFF DUTY", value: "88", description: "Not scheduled" },
    { label: "ATTENDANCE", value: "86%", description: "Check-in rate" },
  ],

  progress: { value: "86%", planned: "90%", actual: "86%" },

  insights: [
    { title: "3 crews understaffed", description: "MEP team at 65% capacity." },
    { title: "Overtime trending up", description: "12% increase vs last week." },
  ],

  upcoming: [
    { title: "Shift Change", description: "Morning to afternoon", date: "12:00" },
    { title: "Safety Briefing", description: "All crews zone A", date: "06:30" },
    { title: "Certification Expiry", description: "5 workers this week", date: "26 Jul" },
  ],

  alerts: [
    { title: "Certification expiring", description: "3 welder certs expire in 7 days." },
    { title: "Absenteeism spike", description: "Zone B attendance dropped 15%." },
    { title: "Safety incident", description: "2 near-misses reported today." },
  ],

  mainSections: [
    {
      kind: "bars",
      title: "Attendance by Trade",
      items: [
        { label: "Masons", value: "94%" },
        { label: "Helpers", value: "91%" },
        { label: "Carpenters", value: "88%" },
        { label: "Electricians", value: "82%" },
        { label: "Plumbers", value: "79%" },
      ],
    },
    {
      kind: "stat-grid",
      title: "Labour Deployment",
      columns: 3,
      items: [
        { label: "Present", value: "412", sub: "Checked in" },
        { label: "On Leave", value: "32", sub: "Approved" },
        { label: "Off Duty", value: "88", sub: "Not scheduled" },
        { label: "Overtime", value: "12%", sub: "vs last week" },
        { label: "Crews", value: "18", sub: "Active" },
        { label: "Attendance", value: "86%", sub: "Rate" },
      ],
    },
  ],

  activity: [
    { text: "Worker checked in", action: "created" },
    { text: "Certification updated", action: "updated" },
    { text: "Crew understaffed", action: "alert" },
    { text: "Shift assigned", action: "created" },
  ],
};
