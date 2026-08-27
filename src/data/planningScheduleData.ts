import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  CalendarClock,
  CalendarPlus,
  ClipboardList,
  Crown,
  FileBarChart,
  Flag,
  FolderKanban,
  GanttChart,
  Gauge,
  GitBranch,
  Landmark,
  LineChart,
  ListChecks,
  MapPin,
  Package,
  RefreshCcw,
  Route,
  Target,
  Timer,
  Triangle,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  Workflow,
  Zap,
  Sparkles,
} from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const planningHero = {
  eyebrow: "Planning & Scheduling",
  titleLead: "Plan. Assign. Track. ",
  titleAccent: "Update. Deliver.",
  subtitle:
    "Assign activities to the right people, track progress in real-time and keep your schedule always up-to-date. Every update you make, updates the schedule automatically.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
  imageSrc: "/schedule and planning.png",
  imageAlt: "ZedOps schedule dashboard with baseline timeline and Gantt",
  videoSrc: "/Shedule_demo1_transparent (2).webm",
} as const;

export const planningBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Target, label: "Accurate Planning" },
  { icon: Gauge, label: "Real-time Tracking" },
  { icon: RefreshCcw, label: "Auto Schedule Update" },
  { icon: Users, label: "Better Resource Utilization" },
  { icon: Timer, label: "On-time Delivery" },
];

export const planningFeaturesTitle = {
  lead: "Everything you need for powerful ",
  accent: "planning & scheduling",
} as const;

export const planningFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: CalendarPlus,
    title: "Schedule Creation",
    bullets: [
      "Create schedules from Primavera P6 / MS Project",
      "CSV / Excel import",
      "WBS based scheduling",
      "Calendars & constraints",
    ],
  },
  {
    icon: UserCheck,
    title: "Activity Assignment",
    bullets: [
      "Assign activities to people or teams",
      "Role based assignment",
      "Resource availability check",
      "Reassign & take over",
    ],
  },
  {
    icon: Gauge,
    title: "Progress Tracking",
    bullets: [
      "Daily / Weekly progress update",
      "Actual vs Planned progress",
      "% Complete & Remaining",
      "Progress comments & photos",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Auto Schedule Update",
    bullets: [
      "Instant schedule recalculation",
      "Baseline vs Actual comparison",
      "Delay & variance detection",
      "Critical path auto update",
    ],
  },
  {
    icon: Users,
    title: "Resource Planning",
    bullets: [
      "Manpower, equipment, material planning",
      "Resource leveling",
      "Over-allocation alerts",
      "Utilization reports",
    ],
  },
  {
    icon: FileBarChart,
    title: "Reports & Analytics",
    bullets: [
      "S-curve & dashboards",
      "Lookahead schedules",
      "Variance analysis",
      "Export & share",
    ],
  },
];

export const planningWorkflowTitle = {
  lead: "Planning & scheduling ",
  accent: "workflow",
} as const;

export const planningWorkflow: { icon: LucideIcon; title: string}[] = [
  { icon: Upload, title: "Create Schedule" },
  { icon: FolderKanban, title: "Define WBS & Activities" },
  { icon: UserCheck, title: "Assign Activities" },
  { icon: GitBranch, title: "Set Logic & Constraints" },
  { icon: Flag, title: "Baseline Schedule" },
  { icon: CalendarClock, title: "Track Progress" },
  { icon: RefreshCcw, title: "Auto Update Schedule" },
  { icon: LineChart, title: "Analyze & Control" },
  { icon: FileBarChart, title: "Report & Communicate" },
];

export const planningConnected = {
  titleLead: "One Plan. Every Update",
  titleAccent: "Connected.",
  subtitle: "From Plan to Project Delivery",
  hubTitle: "ZEDOPS PLANNING & SCHEDULING",
  hubTagline: "Plan. Assign. Track. Update. Deliver.",
  footer: "Always in Sync. Always Up-to-Date.",
  steps: [
    { icon: CalendarPlus, label: "Plan &\nBuild" },
    { icon: UserCheck, label: "Assign\nActivities" },
    { icon: Gauge, label: "Track &\nUpdate" },
    { icon: RefreshCcw, label: "Auto Update\nSchedule" },
    { icon: LineChart, label: "Analyze\nPerformance" },
    { icon: Zap, label: "Take\nAction" },
    { icon: Flag, label: "Deliver\nOn Time" },
  ],
} as const;

export const planningSimple = {
  title: "Assign. Track. Update. It's That Simple.",
  imageSrc: "/on site.png",
  imageAlt: "Site engineer reviewing the live schedule on a phone",
  items: [
    { icon: UserCheck, tone: "blue" as const, title: "Assign to the Right People", desc: "Ensure ownership and accountability." },
    { icon: RefreshCcw, tone: "green" as const, title: "Daily Progress Updates", desc: "Update % complete with comments & photos." },
    { icon: Workflow, tone: "green" as const, title: "Instant Schedule Updates", desc: "The schedule updates automatically." },
    { icon: MapPin, tone: "orange" as const, title: "Real-time Visibility", desc: "Everyone sees the latest plan." },
    { icon: Zap, tone: "blue" as const, title: "Act Early, Deliver On Time", desc: "Identify delays early and take corrective actions." },
  ],
} as const;

export const planningKpis = {
  title: "Schedule Performance (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: { label: "View Full Schedule Dashboard", href: "/early-access" },
  sampleNote: "* Sample project data",
  stats: [
    {
      icon: Crown,
      color: "orange" as const,
      label: "Schedule Performance Index (SPI)",
      value: "0.86",
      sparkPoints: [0.94, 0.91, 0.89, 0.88, 0.87, 0.85, 0.86],
    },
    {
      icon: Target,
      color: "green" as const,
      label: "Planned vs Actual Progress",
      value: "68%",
      sparkPoints: [52, 56, 59, 62, 64, 66, 68],
    },
    {
      icon: AlertTriangle,
      color: "red" as const,
      label: "Critical Activities",
      value: "36",
      sparkPoints: [28, 30, 31, 33, 34, 35, 36],
    },
    {
      icon: Triangle,
      color: "purple" as const,
      label: "Delay (Days)",
      value: "12",
      sparkPoints: [6, 7, 8, 9, 10, 11, 12],
    },
  ],
} as const;

export const planningComparison = {
  title: "Traditional Way vs ZEDOPS",
  subtitle: "From disconnected processes to connected project execution",

  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Spreadsheets & manual updates",
      description: "Time-consuming and error-prone",
    },
    {
      title: "Delayed / outdated information",
      description: "Decisions based on old data",
    },
    {
      title: "Unclear ownership & follow-up",
      description: "Tasks fall through the cracks",
    },
    {
      title: "Manual reporting & rework",
      description: "High effort, low accuracy",
    },
    {
      title: "Decisions after problems occur",
      description: "Issues identified too late",
    },
  ],

  withZedops: [
    {
      title: "One connected platform",
      description: "All project data in one place",
    },
    {
      title: "Real-time project visibility",
      description: "Always up-to-date information",
    },
    {
      title: "Clear assignment & accountability",
      description: "Right person, right task, always",
    },
    {
      title: "Automated tracking & insights",
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
      description: "Across projects & sites",
    },
    {
      title: "Better Control",
      description: "Over time, cost & resources",
    },
    {
      title: "Higher Productivity",
      description: "For teams & stakeholders",
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

export const planningAiEyebrow =
  "From planning to delivery — stay ahead with real-time visibility and control." as const;

export const planningAiRoadmap = {
  icon: Sparkles,
  title: "What's Coming Next – ZED AI (Roadmap)",
  items: [
    {
      icon: Timer,
      title: "AI Delay Prediction",
      body: "Predict potential delays before they impact the schedule.",
    },
    {
      icon: Gauge,
      title: "AI Progress Insights",
      body: "Understand progress trends and performance gaps instantly.",
    },
    // {
    //   icon: Users,
    //   title: "AI Resource Optimization",
    //   body: "Optimize manpower and equipment allocation.",
    // },
    // {
    //   icon: Route,
    //   title: "Scenario Simulation",
    //   body: "Simulate schedule scenarios and recovery options.",
    // },
    {
      icon: TrendingUp,
      title: "AI Forecasting",
      body: "Forecast completion dates based on real progress.",
    },
    {
      icon: FileBarChart,
      title: "AI Summary & Reports",
      body: "Generate intelligent schedule summaries and reports.",
    },
  ],
} as const;

export const planningSourcesTitle = {
  lead: "Planning & Scheduling Connects ",
  accent: "Across ZEDOPS",
} as const;

export const planningSources: { icon: LucideIcon; label: string; current?: boolean }[] = [
  { icon: Calculator, label: "Estimation" },
  { icon: Landmark, label: "Budget & Cost Control" },
  { icon: Package, label: "Supply Chain Management" },
  { icon: GanttChart, label: "Planning & Scheduling", current: true },
  { icon: ClipboardList, label: "Daily Execution Intelligence" },
  { icon: ListChecks, label: "Task Resoultion" },
  { icon: BarChart3, label: "Reports & Analytics" },
];

export const planningCta = {
  title: "Better Plans. Better Execution.",
  accent: "Better Projects.",
  body: "See how ZEDOPS helps you plan, monitor and deliver projects successfully.",
};

export const scheduleDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Schedule Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Schedule Progress",
    insights: "Planning Insights",
    upcoming: "Upcoming Tasks",
    alerts: "Schedule Alerts",
  },

  customFloatCards: [
    {
      title: "Schedule Overview",
      value: "53 Activities",
      icon: GanttChart,
      items: [
        { label: "Window", value: "08 Jul → 18 Oct 2026" },
        { label: "Status", value: "Updated Schedule" },
      ],
    },
    {
      title: "Critical Path",
      value: "103 Days",
      icon: GitBranch,
      items: [
        { label: "Span", value: "Jul → Oct 2026" },
        { label: "Activities", value: "53" },
      ],
    },
    {
      title: "Upcoming Schedule",
      value: "17 Jul – 03 Aug",
      icon: CalendarClock,
      items: [
        { label: "Planned", value: "20 Jul" },
        { label: "Planned", value: "25 Jul" },
        { label: "Planned", value: "03 Aug" },
      ],
    },
    {
      title: "Schedule Alerts",
      value: "Action Required",
      icon: AlertTriangle,
      items: [
        { label: "Progress", value: "0.00%" },
        { label: "Progress", value: "0.00%" },
        { label: "Progress", value: "18.00%" },
      ],
    },
  ],

  kpis: [
    {
      label: "SCHEDULE HEALTH",
      value: "86%",
      description: "On track",
    },
    {
      label: "ACTIVITIES",
      value: "249",
      description: "Total activities",
    },
    {
      label: "CRITICAL PATH",
      value: "12",
      description: "Activities",
    },
    {
      label: "VARIANCE",
      value: "+3d",
      description: "Schedule delay",
    },
    {
      label: "COMPLETION",
      value: "68%",
      description: "Overall progress",
    },
  ],

  progress: {
    value: "68%",
    planned: "72%",
    actual: "68%",
  },

  insights: [
    {
      title: "3 activities at risk",
      description: "Potential 2-day schedule impact.",
    },
    {
      title: "Resource utilization healthy",
      description: "86% workforce allocation.",
    },
  ],

  upcoming: [
    {
      title: "MEP Installation",
      description: "Electrical works",
      date: "24 Jul",
    },
    {
      title: "HVAC Testing",
      description: "System testing",
      date: "28 Jul",
    },
    {
      title: "Ceiling Works",
      description: "Level 2 ceiling",
      date: "02 Aug",
    },
  ],

  alerts: [
    {
      title: "Critical path delay",
      description: "MEP installation delayed by 2 days.",
    },
    {
      title: "Material dependency",
      description: "AHU units pending delivery.",
    },
    {
      title: "Resource conflict",
      description: "Plumbing team overallocated.",
    },
  ],

  mainSections: [
    {
      kind: "timeline",
      title: "Project Schedule Timeline",
      rows: [
        { title: "Foundation Works", start: "5%", width: "25%", color: "bg-[#22A866]" },
        { title: "Structure Works", start: "20%", width: "30%", color: "bg-[#0065FF]" },
        { title: "MEP Installation", start: "40%", width: "30%", color: "bg-brand-orange" },
        { title: "Finishing Works", start: "65%", width: "20%", color: "bg-[#6554C0]" },
        { title: "Testing & Commissioning", start: "75%", width: "15%", color: "bg-[#00A3BF]" },
      ],
    },
  ],

  activity: [
    { text: "Schedule activity updated", action: "created" },
    { text: "MEP activity updated", action: "updated" },
    { text: "Daily schedule submitted", action: "created" },
    { text: "Material dependency added", action: "alert" },
  ],
};
