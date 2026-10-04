import type { LucideIcon } from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Calculator,
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
  GanttChart,
  HardHat,
  Images,
  Landmark,
  ListChecks,
  MessageSquare,
  Monitor,
  Package,
  Target,
  MapPin,
  PenLine,
  RefreshCcw,
  FileBarChart,
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
  eyebrow: "DAILY EXECUTION INTELLIGENCE",

  titleLead: "Capture. Connect. Act. ",

  titleAccent: "Daily Execution Intelligence.",

  tagline: "Turn daily site activity into connected project intelligence.",

  subtitle:
    "Capture site reality, connect instantly with the office, and turn every action into better decisions and on-time delivery.",

  primaryCta: { label: "Request a Demo", href: "/early-access" },
} as const;


export const dailyHeroHighlights: {
  icon: LucideIcon;
  label: string;
  blurb: string;
}[] = [
  {
    icon: Eye,
    label: "Real-time Site Visibility",
    blurb: "See what's happening on site.",
  },

  {
    icon: Zap,
    label: "Connected Execution Data",
    blurb: "Keep project data connected.",
  },

  {
    icon: Clock3,
    label: "Faster Issue Resolution",
    blurb: "Resolve issues faster.",
  },

  {
    icon: Users,
    label: "Better Accountability",
    blurb: "Keep teams accountable.",
  },

  {
    icon: ShieldCheck,
    label: "Actionable Insights",
    blurb: "Turn data into action.",
  },
];


export type DailyFeatureTone =
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "rose"
  | "teal"
  | "amber"
  | "indigo";


export const dailyCaptureCards: {
  icon: LucideIcon;
  title: string;
  blurb: string;
  tone: DailyFeatureTone;
}[] = [
  {
    icon: ClipboardList,
    title: "General Details",
    blurb: "Capture the key details of the day.",
    tone: "teal",
  },

  {
    icon: FileCheck2,
    title: "Work Log",
    blurb: "Record daily work activities and progress.",
    tone: "blue",
  },

  {
    icon: Users,
    title: "People",
    blurb: "Capture workforce and people on site.",
    tone: "purple",
  },

  {
    icon: Package,
    title: "Materials",
    blurb: "Track materials delivered and used.",
    tone: "orange",
  },

  {
    icon: Wrench,
    title: "Equipment",
    blurb: "Record equipment used on site.",
    tone: "rose",
  },

  {
    icon: AlertTriangle,
    title: "Issues & Concerns",
    blurb: "Identify and track issues immediately.",
    tone: "amber",
  },

  {
    icon: ClipboardCheck,
    title: "Survey",
    blurb: "Capture survey information from site.",
    tone: "indigo",
  },

  {
    icon: Eye,
    title: "Inspections",
    blurb: "Record inspections and verification.",
    tone: "blue",
  },

  {
    icon: ShieldAlert,
    title: "Incidents",
    blurb: "Capture and track site incidents.",
    tone: "rose",
  },

  {
    icon: PenLine,
    title: "Signature",
    blurb: "Complete digital sign-off.",
    tone: "green",
  },
];


export const dailyWorkflow: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Smartphone,
    title: "Open App",
    description: "Start Day",
  },

  {
    icon: ClipboardList,
    title: "Capture Daily Details",
    description: "Record the day's information.",
  },

  {
    icon: Wrench,
    title: "Log Work Activities",
    description: "Capture work activities.",
  },

  {
    icon: Users,
    title: "Record People",
    description: "Record people on site.",
  },

  {
    icon: Package,
    title: "Record Materials",
    description: "Record materials.",
  },

  {
    icon: HardHat,
    title: "Record Equipment",
    description: "Record equipment.",
  },

  {
    icon: AlertTriangle,
    title: "Identify Issues",
    description: "Identify issues and concerns.",
  },

  {
    icon: ShieldCheck,
    title: "Review & Submit",
    description: "Review and submit.",
  },

  {
    icon: ChartLine,
    title: "Data Connected",
    description: "Real-time project data.",
  },

  {
    icon: Target,
    title: "Insights & Action",
    description: "Turn data into action.",
  },
];


export const dailyWorkflowSync: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: HardHat,
    title: "One Daily Entry. Multiple Project Actions.",
    description:
      "One connected record across planning, workforce, materials, quality, tasks and cost.",
  },

  {
    icon: Cloud,
    title: "Capture From The Site. No Office Waiting.",
    description:
      "Capture site information and connect it instantly with the office.",
  },

  {
    icon: Building2,
    title: "Live Site Snapshot",
    description:
      "See today's progress, issues, tasks, workforce and materials in real time.",
  },
];


export const dailyWorkflowPhone = {
  src: "/phone_dailylog%20img2.png",
  alt: "Daily Execution Intelligence mobile log",
} as const;


export const dailyWorkflowSite: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  points: { icon: LucideIcon; label: string }[];
} = {
  badge: "Capture From The Site",

  imageSrc: "/photos/on-site.png",

  imageAlt: "Daily execution activity captured from construction site",

  points: [
    {
      icon: Smartphone,
      label: "Work Offline",
    },

    {
      icon: MapPin,
      label: "Auto Time & Location",
    },

    {
      icon: Images,
      label: "Photos & Evidence",
    },

    {
      icon: Zap,
      label: "Quick & Easy",
    },

    {
      icon: Cloud,
      label: "Submit & Sync",
    },
  ],
};


export const dailyWorkflowOffice: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  points: { icon: LucideIcon; label: string }[];
} = {
  badge: "Live Site Snapshot",

  imageSrc: "/photos/at-office.png",

  imageAlt: "Daily execution dashboard showing live site snapshot",

  points: [
    {
      icon: ChartLine,
      label: "Today's Progress",
    },

    {
      icon: AlertTriangle,
      label: "Issues Pending",
    },

    {
      icon: ClipboardList,
      label: "Tasks Created",
    },

    {
      icon: Users,
      label: "Workforce (Avg.)",
    },

    {
      icon: Package,
      label: "Materials Status",
    },
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
    bullets: [
      "Date and project details",
      "Location and work area",
      "Daily site information",
      "Site conditions",
    ],
  },

  {
    icon: FileCheck2,
    title: "Work Log",
    tone: "blue",
    bullets: [
      "Daily work activities",
      "Progress and quantities",
      "Work completed",
      "Activity details",
    ],
  },

  {
    icon: Users,
    title: "People",
    tone: "purple",
    bullets: [
      "People on site",
      "Workforce details",
      "Trade information",
      "Attendance details",
    ],
  },

  {
    icon: Package,
    title: "Materials",
    tone: "orange",
    bullets: [
      "Materials received",
      "Materials used",
      "Material status",
      "Material availability",
    ],
  },

  {
    icon: Wrench,
    title: "Equipment",
    tone: "rose",
    bullets: [
      "Equipment on site",
      "Equipment usage",
      "Equipment status",
      "Equipment availability",
    ],
  },

  {
    icon: AlertTriangle,
    title: "Issues & Concerns",
    tone: "amber",
    bullets: [
      "Identify issues",
      "Capture concerns",
      "Track pending issues",
      "Notify responsible teams",
    ],
  },

  {
    icon: ListChecks,
    title: "Survey",
    tone: "indigo",
    bullets: [
      "Capture survey details",
      "Site survey information",
      "Survey records",
      "Survey tracking",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Inspections",
    tone: "blue",
    bullets: [
      "Inspection details",
      "Inspection status",
      "Quality checks",
      "Inspection records",
    ],
  },

  {
    icon: ShieldAlert,
    title: "Incidents",
    tone: "rose",
    bullets: [
      "Record incidents",
      "Incident details",
      "Track incident status",
      "Incident records",
    ],
  },

  {
    icon: PenLine,
    title: "Signature",
    tone: "green",
    bullets: [
      "Digital signature",
      "Supervisor approval",
      "Submission confirmation",
      "Completed daily record",
    ],
  },
];


export const dailyWhyPain: { icon: LucideIcon; title: string }[] = [
  {
    icon: MessageSquare,
    title: "Manual data entry & paperwork",
  },

  {
    icon: AlertTriangle,
    title: "Error-prone & inconsistent",
  },

  {
    icon: Eye,
    title: "Scattered data across files",
  },

  {
    icon: Camera,
    title: "No photo / evidence capture",
  },

  {
    icon: Clock3,
    title: "Delayed visibility & reporting",
  },

  {
    icon: Users,
    title: "No audit trail",
  },

  {
    icon: Zap,
    title: "No real-time updates",
  },

  {
    icon: Eye,
    title: "Difficult to track accountability",
  },

  {
    icon: MessageSquare,
    title: "Limited collaboration",
  },

  {
    icon: Clock,
    title: "Decisions based on outdated data",
  },
];


export const dailyWhyGain: { icon: LucideIcon; title: string }[] = [
  {
    icon: CheckCircle2,
    title: "Real-time data capture from site",
  },

  {
    icon: CheckCircle2,
    title: "Single source of truth, always connected",
  },

  {
    icon: CheckCircle2,
    title: "Instant dashboards & live visibility",
  },

  {
    icon: CheckCircle2,
    title: "Automated reports & analytics",
  },

  {
    icon: CheckCircle2,
    title: "Seamless office-site collaboration",
  },

  {
    icon: CheckCircle2,
    title: "Photo, evidence & location tagging",
  },

  {
    icon: CheckCircle2,
    title: "Complete audit trail & accountability",
  },

  {
    icon: CheckCircle2,
    title: "Mobile-first, offline & easy to use",
  },

  {
    icon: CheckCircle2,
    title: "Data-driven decisions, on time",
  },

  {
    icon: CheckCircle2,
    title: "Better control. Better projects.",
  },
];


export const dailyWhyPainPills = [
  "Manual data entry",
  "Scattered data",
  "No real-time updates",
  "Limited collaboration",
  "Error-prone data",
  "No photo / evidence",
] as const;


export const dailyWhyGainPills = [
  "Real-time capture",
  "Single source of truth",
  "Live visibility",
  "Automated reports",
  "Complete accountability",
  "Data-driven decisions",
] as const;


export const dailyWhyMatters: {
  icon: LucideIcon;
  label: string;
  tone: DailyFeatureTone;
}[] = [
  {
    icon: Eye,
    label: "Complete Visibility",
    tone: "blue",
  },

  {
    icon: Users,
    label: "Connected Execution",
    tone: "blue",
  },

  {
    icon: Zap,
    label: "Faster Resolution",
    tone: "orange",
  },

  {
    icon: TrendingUp,
    label: "Better Productivity",
    tone: "green",
  },

  {
    icon: ShieldCheck,
    label: "Better Quality & Safety",
    tone: "blue",
  },

  {
    icon: Clock3,
    label: "On-Time Delivery",
    tone: "teal",
  },
];


export const dailyImpact: {
  icon: LucideIcon;
  value: string;
  label: string;
  tone: DailyFeatureTone;
}[] = [
  {
    icon: Eye,
    value: "72%",
    label: "Daily Progress",
    tone: "blue",
  },

  {
    icon: AlertTriangle,
    value: "2",
    label: "Issues Pending",
    tone: "orange",
  },

  {
    icon: ClipboardList,
    value: "36",
    label: "Tasks Created",
    tone: "green",
  },

  {
    icon: Users,
    value: "186",
    label: "Workforce (Avg.)",
    tone: "purple",
  },

  {
    icon: Package,
    value: "On Track",
    label: "Materials Status",
    tone: "teal",
  },
];


export const dailyWhyChoose: string[] = [
  "Real-time data capture from site",
  "Single source of truth, always connected",
  "Instant dashboards & live visibility",
  "Automated reports & analytics",
  "Seamless office-site collaboration",
  "Photo, evidence & location tagging",
];


export const dailyAiSoon: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [


  {
    icon: Sparkles,
    title: "AI Weather Delay Intelligence",
    body: "Analyze weather conditions and predict potential delays to help teams plan ahead.",
  },

  {
    icon: AlertTriangle,
    title: "AI Productivity Summary",
    body: "Summarize daily productivity, identify performance gaps, and highlight improvement areas.",
  },

];


export const dailyCta = {
  title: "Capture Today. Control Tomorrow. Deliver On Time.",

  body: "Turn daily site activity into real project success.",

  primary: {
    label: "Request a Demo",
    href: "/early-access",
  },
} as const;


export const dailyAiEyebrow =
  "From site to office — stay ahead with real-time execution intelligence." as const;


export const dailyAiRoadmap = {
  icon: Sparkles,

  title: "What's Coming Next – ZED AI (Roadmap)",

  items: [
    {
  icon: Sparkles,
    title: "AI Weather Delay Intelligence",
    body: "Analyze weather conditions and predict potential delays to help teams plan ahead.",
  },

  {
    icon: AlertTriangle,
    title: "AI Productivity Summary",
    body: "Summarize daily productivity, identify performance gaps, and highlight improvement areas.",
  },

  ],
} as const;


export const dailyConnected = {
  titleLead: "From Accurate Capture to Actionable",
  titleAccent: "Intelligence.",
  subtitle: "Complete visibility, control & faster decisions.",

  hubTitle: "DAILY EXECUTION INTELLIGENCE",

  hubTagline: "One connected record. Many project outcomes.",

  footer: "From accurate capture to actionable intelligence.",

  steps: [
    {
      icon: Smartphone,
      label: "Open App",
    },

    {
      icon: ClipboardList,
      label: "Capture\nDaily Details",
    },

    {
      icon: Wrench,
      label: "Log Work\nActivities",
    },

    {
      icon: Users,
      label: "Record\nPeople",
    },

    {
      icon: Package,
      label: "Record\nMaterials",
    },

    {
      icon: HardHat,
      label: "Record\nEquipment",
    },

    {
      icon: AlertTriangle,
      label: "Identify\nIssues",
    },

    {
      icon: ShieldCheck,
      label: "Review &\nSubmit",
    },

    {
      icon: ChartLine,
      label: "Data Connected\n(Real-time)",
    },

    {
      icon: Target,
      label: "Insights &\nAction",
    },
  ],
} as const;


export const dailyComparison = {
  traditionalTitle: "Traditional (Excel / Simple Software)",

  zedopsTitle: "ZEDOPS (Future-Ready Advantages)",

  traditional: [
    {
      title: "Manual data entry & paperwork",
      description: "Error-prone & inconsistent",
    },

    {
      title: "Scattered data across files",
      description: "No photo / evidence capture",
    },

    {
      title: "Delayed visibility & reporting",
      description: "No audit trail",
    },

    {
      title: "No real-time updates",
      description: "Difficult to track accountability",
    },

    {
      title: "Limited collaboration",
      description: "Decisions based on outdated data",
    },
  ],

  withZedops: [
    {
      title: "Real-time data capture from site",
      description: "Photo, evidence & location tagging",
    },

    {
      title: "Single source of truth, always connected",
      description: "Complete audit trail & accountability",
    },

    {
      title: "Instant dashboards & live visibility",
      description: "Mobile-first, offline & easy to use",
    },

    {
      title: "Automated reports & analytics",
      description: "Data-driven decisions, on time",
    },

    {
      title: "Seamless office-site collaboration",
      description: "Better control. Better projects.",
    },
  ],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across site and office",
    },

    {
      title: "Better Control",
      description: "Over daily execution",
    },

    {
      title: "Higher Productivity",
      description: "For site & office teams",
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


export const dailySourcesTitle = {
  lead: "Daily Execution Intelligence Connects ",
  accent: "Across ZEDOPS",
} as const;


export const dailySources: {
  icon: LucideIcon;
  label: string;
  current?: boolean;
}[] = [
  {
    icon: GanttChart,
    label: "Planning & Scheduling",
  },

  {
    icon: Users,
    label: "Workforce Management",
  },

  {
    icon: Package,
    label: "Materials Procurement",
  },

  {
    icon: ClipboardList,
    label: "Daily Execution Intelligence",
    current: true,
  },

  {
    icon: ShieldCheck,
    label: "Quality & Inspections",
  },

  {
    icon: ListChecks,
    label: "Task Resoultion",
  },

  {
    icon: BarChart3,
    label: "Budget & Cost Control",
  },


];


export const dailyDashboardData: DashboardData = {
  projectName: "Dubai Mall",

  title: "Daily Execution Dashboard",

  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Daily Logs",

  floatingCards: {
    progress: "Daily Progress",
    insights: "Daily Insights",
    upcoming: "Today's Plan",
    alerts: "Field Alerts",
  },

  customFloatCards: [
    {
      title: "Project Health",
      value: "82/100",
      icon: Activity,
      items: [
        { label: "Status", value: "Good" },
        { label: "Updated", value: "today 07:45" },
      ],
    },
    {
      title: "Productivity Trend",
      value: "Trending Up",
      icon: TrendingUp,
      items: [
        { label: "3 Months", value: "" },
        { label: "Productivity performance has improved over 3 months", value: "" },
      ],
    },
    {
      title: "Daily Target",
      value: "72%",
      icon: Target,
      items: [
        { label: "22 of 30 work logs on target", value: "" },
        { label: "Expected / Actual 0 / 0 units", value: "" },
      ],
    },
    {
      title: "Material Status",
      value: "2",
      icon: Package,
      items: [
        { label: "Below Stock Threshold", value: "" },
        { label: "Materials requiring stock attention", value: "" },
      ],
    },
  ],

  extraCard: {
    title: "Daily Logs",
    value: "0 Approved",
    items: [
      { title: "19 Submitted" },
      { title: "3 Drafts Pending" },
    ],
  },

  kpis: [
    {
      label: "TODAY'S ENTRIES",
      value: "128",
      description: "12% increase",
    },

    {
      label: "WORK ACTIVITIES",
      value: "46",
      description: "8% increase",
    },

    {
      label: "WORKFORCE (AVG.)",
      value: "186",
      description: "5% increase",
    },

    {
      label: "ISSUES IDENTIFIED",
      value: "24",
      description: "14% increase",
    },

    {
      label: "INCIDENTS",
      value: "3",
      description: "29% increase",
    },
  ],

  progress: {
    value: "72%",
    planned: "75%",
    actual: "72%",
  },

  insights: [
    {
      title: "2 High priority issues pending",
      description: "Requires immediate attention.",
    },

    {
      title: "36 tasks created from issues",
      description: "Issues converted into actions.",
    },

    {
      title: "0 incidents reported today",
      description: "Safety status is clear.",
    },

    {
      title: "Materials on site are adequate",
      description: "Material status is on track.",
    },
  ],

  upcoming: [
    {
      title: "20 May 2025 - Main Building - Zone A",
      description: "Daily execution update",
      date: "On Time",
    },

    {
      title: "20 May 2025 - Main Building - Zone B",
      description: "Daily execution update",
      date: "On Time",
    },

    {
      title: "19 May 2025 - Main Building - Zone C",
      description: "Daily execution update",
      date: "Delayed",
    },

    {
      title: "19 May 2025 - Main Building - Zone D",
      description: "Daily execution update",
      date: "On Time",
    },
  ],

  alerts: [
    {
      title: "2 High priority issues pending",
      description: "Requires immediate action.",
    },

    {
      title: "36 tasks created from issues",
      description: "Tasks require follow-up.",
    },

    {
      title: "Materials on site are adequate",
      description: "Material status is on track.",
    },
  ],

  mainSections: [
    {
      kind: "bars",

      title: "Work Progress by Area",

      items: [
        {
          label: "Zone A",
          value: "65%",
        },

        {
          label: "Zone B",
          value: "70%",
        },

        {
          label: "Zone C",
          value: "85%",
        },

        {
          label: "Zone D",
          value: "45%",
        },

        {
          label: "Zone E",
          value: "80%",
        },
      ],
    },

    {
      kind: "list",

      title: "Key Highlights",

      items: [
        {
          title: "2 High priority issues pending",
          description: "Requires immediate attention.",
          meta: "2",
        },

        {
          title: "36 tasks created from issues",
          description: "Issues converted into tasks.",
          meta: "36",
        },

        {
          title: "0 incidents reported today",
          description: "Safety status is clear.",
          meta: "0",
        },

        {
          title: "Materials on site are adequate",
          description: "Material status is on track.",
          meta: "✓",
        },
      ],
    },
  ],

  activity: [
    {
      text: "Daily entry submitted",
      action: "created",
    },

    {
      text: "Work activity recorded",
      action: "created",
    },

    {
      text: "Issue identified",
      action: "alert",
    },

    {
      text: "Task created from issue",
      action: "updated",
    },

    {
      text: "Inspection completed",
      action: "created",
    },
  ],
};