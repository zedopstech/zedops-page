import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BarChart3,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Coins,
  FileStack,
  FileText,
  GanttChart,
  GitBranch,
  Landmark,
  ListChecks,
  Package,
  Percent,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Upload,
  Users,
  Workflow,
} from "lucide-react";

import type { DashboardData } from "@/components/dashboards/ProductDashboard";

/* -------------------------------------------------------------------------- */
/*                                  HERO                                      */
/* -------------------------------------------------------------------------- */

export const estimationHero = {
  eyebrow: "ESTIMATION & Proposal",
  titleLead: "Estimate. Plan. ",
  titleAccent: "Win. Deliver.",
  subtitle:
    "Create accurate, competitive, and data-driven estimates connected to real project execution.",
  description:
    "Build estimates with confidence, standardize your process, and handover seamlessly to budgeting, procurement and execution.",
  primaryCta: {
    label: "Request a Demo",
    href: "/early-access",
  },
  secondaryCta: {
    label: "Watch 2-Minute Video",
    href: "#",
  },
  imageSrc: "/estimation dashboard.png",
  imageAlt:
    "ZEDOPS Estimation Dashboard showing estimates, cost summary, accuracy, status, and recent activity",
} as const;

/* -------------------------------------------------------------------------- */
/*                                BENEFITS                                    */
/* -------------------------------------------------------------------------- */

export const estimationBenefits: {
  icon: LucideIcon;
  label: string;
}[] = [
  {
    icon: Target,
    label: "Accurate Estimates",
  },
  {
    icon: Timer,
    label: "Faster Turnaround",
  },
  {
    icon: TrendingUp,
    label: "Better Win Rate",
  },
  {
    icon: BadgeCheck,
    label: "Standardized Process",
  },
  {
    icon: GitBranch,
    label: "Connected to Execution",
  },
];

/* -------------------------------------------------------------------------- */
/*                              FEATURES                                      */
/* -------------------------------------------------------------------------- */

export const estimationFeaturesTitle = {
  lead: "Everything You Need for Powerful ",
  accent: "Estimation",
} as const;

export type EstimationFeatureTone =
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "rose"
  | "teal";

export const estimationFeatures: {
  icon: LucideIcon;
  title: string;
  tone: EstimationFeatureTone;
  bullets: string[];
}[] = [
  {
    icon: ScanSearch,
    title: "Estimate & Build",
    tone: "orange",
    bullets: [
      "WBS based estimates",
      "BOQ from drawings",
      "Rate libraries & assemblies",
      "Template based estimates",
    ],
  },

  {
    icon: Percent,
    title: "Rate & Cost Management",
    tone: "green",
    bullets: [
      "Material, labour & equipment rates",
      "Subcontractor supplier rates",
      "Escalation & indexation",
      "Rate analysis & benchmarking",
    ],
  },

  {
    icon: Calculator,
    title: "Takeoff & Quantities",
    tone: "blue",
    bullets: [
      "2D drawings & markups",
      "Auto quantity extraction (Coming Soon)",
      "Manual & digital takeoff",
      "Quantity validation",
    ],
  },

  {
    icon: BarChart3,
    title: "Analysis & Review",
    tone: "purple",
    bullets: [
      "Cost breakdown & rollups",
      "Compare scenarios",
      "Cost vs budget & targets",
      "Margin & competitiveness",
    ],
  },

  {
    icon: Send,
    title: "Bid & Submission",
    tone: "rose",
    bullets: [
      "Cover letter & bid form",
      "Attachments & document packs",
      "Submission tracking",
      "Bid opening & results",
    ],
  },

  {
    icon: FileStack,
    title: "Reports & Insights",
    tone: "teal",
    bullets: [
      "Estimate summary reports",
      "Cost breakdown reports",
      "Win rate analytics",
      "Custom dashboards & exports",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               WORKFLOW                                     */
/* -------------------------------------------------------------------------- */

export const estimationWorkflowTitle = {
  lead: "Estimation ",
  accent: "Workflow",
} as const;

export const estimationWorkflow: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: FileText,
    title: "Create Estimate",
    description: "Select Template",
  },

  {
    icon: GitBranch,
    title: "Define Scope",
    description: "& WBS",
  },

  {
    icon: Calculator,
    title: "Takeoff & Build",
    description: "Quantities",
  },

  {
    icon: Coins,
    title: "Apply Rates",
    description: "& Build Costs",
  },

  {
    icon: BarChart3,
    title: "Analyze & Review",
    description: "Estimate",
  },

  {
    icon: ShieldCheck,
    title: "Internal Review",
    description: "& Approval",
  },

  {
    icon: Send,
    title: "Submit Estimate",
    description: "Bid Submission",
  },

  {
    icon: TrendingUp,
    title: "Bid Result &",
    description: "Conversion",
  },
];

/* -------------------------------------------------------------------------- */
/*                         CONNECTED TO EXECUTION                             */
/* -------------------------------------------------------------------------- */

export const estimationConnected = {
  titleLead: "One Estimate.",
  titleAccent: "Connected to Execution.",
  subtitle: "From Estimate to Project Delivery",
  hubTitle: "ZEDOPS ESTIMATION",
  hubTagline: "Accurate. Competitive. Connected.",
  footer: "Seamless handover. Real-time alignment.",

  steps: [
    {
      icon: GitBranch,
      label: "WBS",
    },
    {
      icon: FileText,
      label: "BOQ",
    },
    {
      icon: Coins,
      label: "Rates",
    },
    {
      icon: Calculator,
      label: "Costing",
    },
    {
      icon: ClipboardCheck,
      label: "Review",
    },
    {
      icon: Landmark,
      label: "Budget",
    },
    {
      icon: Package,
      label: "Procurement",
    },
    {
      icon: TrendingUp,
      label: "Execution",
    },
    {
      icon: Target,
      label: "Cost Control",
    },
    {
      icon: BarChart3,
      label: "Analytics",
    },
  ],
} as const;


  export const estimationDashboardHero = {
  eyebrow: "ESTIMATION",
  titleLead: "Build Better Estimates. ",
  titleAccent: "Deliver Better Projects.",
  subtitle:
    "Standardize your estimating process, control costs, and connect every estimate directly to project execution.",
  supportingText:
    "From estimate to execution — all connected.",
} as const;


/* -------------------------------------------------------------------------- */
/*                              COMPARISON                                    */
/* -------------------------------------------------------------------------- */

export const estimationComparison = {
  title:
    "Traditional Estimation (Excel / Simple Software) vs ZEDOPS Estimation",

  subtitle:
    "Future-ready advantages for accurate, connected and intelligent estimation",

  traditionalTitle: "Traditional Estimation",

  zedopsTitle: "ZEDOPS Estimation",

traditional: [
  {
    title: "Manual takeoff & calculations",
    description: "Time-consuming and error-prone",
  },

  {
    title: "Inconsistent templates & processes",
    description: "Limited standardization",
  },

  {
    title: "Limited collaboration & version control",
    description: "Difficult to track changes",
  },

  {
    title: "Disconnected from project execution",
    description: "No seamless handover",
  },

  {
    title: "Outdated rates & limited insights",
    description: "No real-time intelligence",
  },
],

  withZedops: [
  {
    title: "Automated takeoff & quantity extraction",
    description: "2D & 3D quantity extraction",
  },

  {
    title: "Standardized templates & validations",
    description: "Consistent and accurate estimates",
  },

  {
    title: "Real-time collaboration & audit trail",
    description: "Every change is tracked",
  },

  {
    title: "Connected project execution",
    description: "Seamless handover from estimate to delivery",
  },

  {
    title: "Live rates, analytics & AI insights",
    description: "Real-time intelligence for better decisions",
  },
],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across estimates, bids & projects",
    },

    {
      title: "Better Control",
      description: "Over cost, margins & revisions",
    },

    {
      title: "Higher Win Rate",
      description: "Faster, more competitive bids",
    },

    {
      title: "Connected Execution",
      description: "Seamless handover from estimate to delivery",
    },

    {
      title: "Intelligent Decisions",
      description: "Data-driven estimation and insights",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*                              ZED AI                                        */
/* -------------------------------------------------------------------------- */

export const estimationAiEyebrow =
  "From accurate estimation to winning more bids — with confidence, control & complete visibility." as const;

export const estimationAiSoon: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [

  {
    icon: Sparkles,
    title: "AI Rate Suggestions",
    body: "Smart rate suggestions for better accuracy.",
  },

  {
    icon: ScanSearch,
    title: "AI Estimate Review",
    body: "Detect gaps and suggest improvements.",
  },

  {
    icon: TrendingUp,
    title: "Win Probability Prediction",
    body: "Predict win chances using AI.",
  },

  {
    icon: Target,
    title: "Cost Risk Analysis",
    body: "Identify cost risks in estimates.",
  },


];

/* -------------------------------------------------------------------------- */
/*                       ESTIMATION CONNECTS ACROSS ZEDOPS                   */
/* -------------------------------------------------------------------------- */

export const estimationSourcesTitle = {
  lead: "Estimation Connects ",
  accent: "Across ZEDOPS",
} as const;

export const estimationSources: {
  icon: LucideIcon;
  label: string;
  current?: boolean;
}[] = [
  {
    icon: Landmark,
    label: "Budget & Cost Control",
  },

  {
    icon: Package,
    label: "Supply Chain Management",
  },

  {
    icon: GanttChart,
    label: "Planning & Scheduling",
  },

  {
    icon: Calculator,
    label: "Estimation",
    current: true,
  },

  {
    icon: ClipboardList,
    label: "Daily Execution Intelligence",
  },

  {
    icon: ListChecks,
    label: "Task Management",
  },

  {
    icon: BarChart3,
    label: "Reports & Analytics",
  },
];

/* -------------------------------------------------------------------------- */
/*                         ESTIMATION DASHBOARD                               */
/* -------------------------------------------------------------------------- */
/*
 * Dashboard values below are based on the dashboard screenshot provided:
 *
 * Active estimations : 11
 * Draft              : 9
 * Submitted          : 1
 * Awarded            : 1
 * Due in 7 days      : 0
 * Total revisions    : 16
 *
 * Charts:
 * - Status distribution
 * - Estimations created
 * - Scope type mix
 * - Portfolio cost mix
 */

export const estimationDashboardData: DashboardData = {
  projectName: "All Projects",

  title: "Estimation Dashboard",

  subtitle:
    "Portfolio overview and estimation list for active revisions across all projects.",

  /* ---------------------------------------------------------------------- */
  /*                              KPI CARDS                                 */
  /* ---------------------------------------------------------------------- */

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Estimation Progress",
    insights: "Cost Insights",
    upcoming: "Pending Bids",
    alerts: "Estimation Alerts",
  },

  kpis: [
    {
      label: "ACTIVE ESTIMATIONS",
      value: "11",
      description: "Active revisions",
    },

    {
      label: "DRAFT",
      value: "9",
      description: "In preparation",
    },

    {
      label: "SUBMITTED",
      value: "1",
      description: "Awaiting award",
    },

    {
      label: "AWARDED",
      value: "1",
      description: "Won tenders",
    },

    {
      label: "DUE IN 7 DAYS",
      value: "0",
      description: "Offer deadlines approaching",
    },

    {
      label: "TOTAL REVISIONS",
      value: "16",
      description: "Across all estimates",
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*                             PROGRESS                                   */
  /* ---------------------------------------------------------------------- */

  /*
   * The existing DashboardData component expects a progress object.
   * Since the screenshot does not show a progress percentage,
   * this is represented using the active revision count.
   */

  progress: {
    value: "11",
    planned: "16",
    actual: "11",
  },

  /* ---------------------------------------------------------------------- */
  /*                              INSIGHTS                                  */
  /* ---------------------------------------------------------------------- */

  insights: [
    {
      title: "11 Active Estimates",
      description: "Active revisions across the portfolio.",
    },

    {
      title: "9 Draft Estimates",
      description: "Estimates currently in preparation.",
    },

    {
      title: "1 Submitted",
      description: "Awaiting award decision.",
    },

    {
      title: "1 Awarded",
      description: "Tender successfully won.",
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*                             UPCOMING                                   */
  /* ---------------------------------------------------------------------- */

  upcoming: [
    {
      title: "Due in 7 days",
      description: "Offer deadlines approaching",
      date: "0",
    },

    {
      title: "Active Revisions",
      description: "Current active estimation revisions",
      date: "11",
    },

    {
      title: "Draft Estimates",
      description: "Estimates currently in preparation",
      date: "9",
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*                               ALERTS                                   */
  /* ---------------------------------------------------------------------- */

  alerts: [
    {
      title: "Submitted Estimate",
      description: "1 estimate is awaiting award.",
    },

    {
      title: "Awarded Estimate",
      description: "1 tender has been won.",
    },

    {
      title: "Upcoming Deadlines",
      description: "No offer deadlines approaching in the next 7 days.",
    },

    {
      title: "Total Revisions",
      description: "16 revisions across all estimates.",
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*                            MAIN SECTIONS                               */
  /* ---------------------------------------------------------------------- */

  sectionColumns: 2,

  mainSections: [
    {
      kind: "bars",
      title: "Status Distribution",
      items: [
        { label: "Draft", value: "9" },
        { label: "Submitted", value: "1" },
        { label: "Awarded", value: "1" },
      ],
    },
    {
      kind: "bars",
      title: "Estimations Created (12 mo)",
      items: [
        { label: "May", value: "6" },
        { label: "Jun", value: "2" },
        { label: "Jul", value: "2" },
        { label: "Aug", value: "1" },
      ],
    },
    {
      kind: "bars",
      title: "Scope Type Mix",
      items: [{ label: "Full Scope", value: "11" }],
    },
    {
      kind: "bars",
      title: "Portfolio Cost Mix",
      items: [
        { label: "Labour", value: "$260k" },
        { label: "Material", value: "$70k" },
        { label: "Engineering", value: "$30k" },
        { label: "Indirect", value: "$0" },
      ],
    },
  ],

  activity: [
    { text: "New estimate created", action: "created" },
    { text: "Draft estimate updated", action: "updated" },
    { text: "Estimate submitted for award", action: "created" },
    { text: "Tender awarded", action: "alert" },
  ],
};

/* -------------------------------------------------------------------------- */
/*                       DASHBOARD CHART DATA                                */
/* -------------------------------------------------------------------------- */

/**
 * Status Distribution
 *
 * Total active = 11
 * Draft = 9
 * Submitted = 1
 * Awarded = 1
 */

export const estimationStatusDistribution = [
  {
    name: "Awarded",
    value: 1,
  },

  {
    name: "Draft",
    value: 9,
  },

  {
    name: "Submitted",
    value: 1,
  },
] as const;

/**
 * Estimations Created - 12 Months
 *
 * Values are based on the visible trend in the provided screenshot.
 */

export const estimationsCreatedTrend = [
  {
    month: "2026-05",
    value: 6,
  },

  {
    month: "2026-06",
    value: 2,
  },

  {
    month: "2026-07",
    value: 2,
  },

  {
    month: "2026-08",
    value: 1,
  },
] as const;

/**
 * Scope Type Mix
 */

export const estimationScopeTypeMix = [
  {
    name: "Full Scope",
    value: 11,
  },
] as const;

/**
 * Portfolio Cost Mix
 *
 * The screenshot visually shows:
 * Material
 * Labour
 * Engineering
 * Indirect
 *
 * Values below are approximate based on the visible chart scale.
 */

export const estimationPortfolioCostMix = [
  {
    name: "Material",
    value: 70000,
  },

  {
    name: "Labour",
    value: 260000,
  },

  {
    name: "Engineering",
    value: 30000,
  },

  {
    name: "Indirect",
    value: 0,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                              CTA                                           */
/* -------------------------------------------------------------------------- */

export const estimationCta = {
  title: "Better Estimates. Better Wins. Better Projects.",

  body:
    "Estimate with confidence. Deliver with control.",

  primary: {
    label: "Request a Demo",
    href: "/early-access",
  },

  secondary: {
    label: "Start Free Trial",
    href: "/early-access",
  },
} as const;
