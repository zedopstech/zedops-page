import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BarChart3,
  Calculator,
  ClipboardCheck,
  Eye,
  FileBarChart,
  FileCheck2,
  FileText,
  Flag,
  FolderKanban,
  GanttChart,
  Landmark,
  ListChecks,
  Package,
  PieChart,
  Receipt,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  
  Zap,
} from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const budgetCostControlHero = {
  eyebrow: "Budget & Cost Control",
  titleLead: "Control Every Cost. ",
  titleAccent: "Deliver More Value.",
  subtitle:
    "Track budgets, commitments, actuals and forecasts in real time — from original budget to forecast at completion.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
} as const;

export const budgetCostControlFeaturesTitle = {
  lead: "Everything You Need for Powerful ",
  accent: "Budget Control",
} as const;

export const budgetCostControlFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: Landmark,
    title: "Budget Planning",
    bullets: [
      "Create budgets by cost groups & cost codes",
      "Original & revised budget setup",
      "Budget library & metadata",
    ],
  },

  {
    icon: BarChart3,
    title: "Real-time Tracking",
    bullets: [
      "Track committed, actual & variance",
      "Live updates from POs, PRs & costs",
      "Budget health & forecasts",
    ],
  },

  {
    icon: RefreshCcw,
    title: "Budget Revisions",
    bullets: [
      "Additional scope",
      "Quantity variation",
      "Budget adjustment",
      "De-scope",
      "Full approval workflow",
    ],
  },

  {
    icon: Eye,
    title: "Source Visibility",
    bullets: [
      "Drill-down to POs & payment requests",
      "Direct & indirect cost breakdown",
      "Know the source of every rupee",
    ],
  },

  {
    icon: FileBarChart,
    title: "Analytics & Reports",
    bullets: [
      "Budget vs actual reports",
      "Cost group & cost code analysis",
      "Custom dashboards & exports",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Complete Control",
    bullets: [
      "Audit trail for every change",
      "Role-based approvals",
      "Better decisions, stronger outcomes",
    ],
  },
];

export const budgetCostControlWorkflowTitle = {
  lead: "Budget & cost control ",
  accent: "workflow",
} as const;

export const budgetCostControlWorkflow: {
  icon: LucideIcon;
  title: string;
}[] = [
  {
    icon: Landmark,
    title: "Set Budget",
  },

  {
    icon: ClipboardCheck,
    title: "Commit",
  },

  {
    icon: Receipt,
    title: "Record Costs",
  },

  {
    icon: BarChart3,
    title: "Track & Analyze",
  },

  {
    icon: FileText,
    title: "Raise Revision",
  },

  {
    icon: FileCheck2,
    title: "Approve Revision",
  },

  {
    icon: RefreshCcw,
    title: "Apply Changes",
  },

  {
    icon: FolderKanban,
    title: "Monitor & Report",
  },
];

export const budgetCostControlConnected = {
  titleLead: "One Budget. Every Cost",
  titleAccent: "Connected.",
  subtitle: "From Plan to Forecast",
  hubTitle: "ZEDOPS BUDGET & COST CONTROL",
  hubTagline: "Plan. Commit. Track. Forecast. Control.",
  footer: "Always in Sync. Always in Control.",
  steps: [
    { icon: Landmark, label: "Set\nBudget" },
    { icon: ClipboardCheck, label: "Commit\nCosts" },
    { icon: Receipt, label: "Record\nActuals" },
    { icon: BarChart3, label: "Track &\nAnalyze" },
    { icon: RefreshCcw, label: "Revise &\nForecast" },
    { icon: Zap, label: "Take\nAction" },
    { icon: Flag, label: "Deliver\nOn Budget" },
  ],
} as const;

export const budgetCostControlComparison = {
  traditionalTitle: "Traditional Way",

  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Budgets in spreadsheets",
      description: "Disconnected and difficult to control",
    },

    {
      title: "Revisions via emails",
      description: "Slow approval and poor visibility",
    },

    {
      title: "Delayed visibility of actuals",
      description: "Decisions based on old data",
    },

    {
      title: "Manual consolidation",
      description: "High effort and risk of errors",
    },

    {
      title: "Limited tracking & reports",
      description: "No real-time control",
    },
  ],

  withZedops: [
    {
      title: "Connected budgets in one platform",
      description: "One source of truth",
    },

    {
      title: "Controlled revision workflow",
      description: "Every change is governed",
    },

    {
      title: "Real-time actuals & variance",
      description: "Always know where costs stand",
    },

    {
      title: "Automated consolidation",
      description: "Less manual effort",
    },

    {
      title: "Powerful tracking & reports",
      description: "Better control and better outcomes",
    },
  ],

  benefits: [
    {
      title: "Better Visibility",
      description: "Know where every cost stands",
    },

    {
      title: "Better Control",
      description: "Control spend and revisions",
    },

    {
      title: "Better Forecasting",
      description: "Make decisions earlier",
    },

    {
      title: "Better Accountability",
      description: "Every change is traceable",
    },

    {
      title: "Better Outcomes",
      description: "Better control. Better projects.",
    },
  ],
} as const;

export const budgetAiEyebrow =
  "From budgeting to closure — every decision is backed by accurate, real-time data." as const;

export const budgetAiRoadmap = {
  icon: Sparkles,

  title: "What's Coming Next – ZED AI (Roadmap)",

  items: [

    {
      icon: BadgeCheck,
      title: "Smart Budget Alerts",
      body: "Detect risks and decisions before they become problems.",
    },

    {
      icon: RefreshCcw,
      title: "AI Revision Suggestions",
      body: "Recommend the best actions for budget changes.",
    },

    {
      icon: ShieldCheck,
      title: "Budget Health Predictor",
      body: "Predict budget health and identify emerging risks.",
    },

    {
      icon: FileBarChart,
      title: "AI Summary & Reports",
      body: "Generate intelligent budget summaries and reports.",
    },
  ],
} as const;

export const budgetCostControlSourcesTitle = {
  lead: "Budget Management Connects ",
  accent: "Across ZEDOPS",
} as const;

export const budgetCostControlSources: {
  icon: LucideIcon;
  label: string;
  current?: boolean;
}[] = [
  {
    icon: ClipboardCheck,
    label: "Daily Execution Intelligence",
  },

  {
    icon: GanttChart,
    label: "Planning & Scheduling",
  },

  {
    icon: Calculator,
    label: "Estimation & Takeoff",
  },

  {
    icon: Landmark,
    label: "Budget Management",
    current: true,
  },

  {
    icon: Package,
    label: "Supply Chain Management",
  },

  {
    icon: ListChecks,
    label: "Task Resoultion",
  },

  {
    icon: PieChart,
    label: "Reports & Analytics",
  },
];

export const budgetCostControlCta = {
  title: "Better Budgets. Better Control.",
  accent: "Better Projects.",
  body: "See how ZEDOPS helps you track commitments, actuals and revisions in one place so every cost stays visible and governed.",
};

export const budgetDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Budget Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Finance",

  floatingCards: {
    progress: "Budget Progress",
    insights: "Spend Insights",
    upcoming: "Upcoming Payments",
    alerts: "Budget Alerts",
  },

  customFloatCards: [
    {
      title: "Budget Overview",
      value: "0",
      icon: Landmark,
      items: [
        { label: "Original Budget", value: "" },
        { label: "Approved Budget", value: "" },
        { label: "0.0% of total", value: "" },
      ],
    },
    {
      title: "Cost Status",
      value: "0",
      icon: Receipt,
      items: [
        { label: "Committed Cost", value: "" },
        { label: "Actual Cost", value: "" },
        { label: "Committed: 0", value: "" },
        { label: "Actual: 0", value: "" },
      ],
    },
    {
      title: "Budget Utilization",
      value: "0.0%",
      icon: PieChart,
      items: [
        { label: "Actual Cost vs Approved Budget", value: "" },
        { label: "Remaining Budget", value: "0" },
      ],
    },
    {
      title: "Spending Trend",
      value: "Monthly Spending",
      icon: TrendingUp,
      items: [
        { label: "Jan → Aug", value: "" },
        { label: "Track spending patterns over time", value: "" },
      ],
    },
  ],

  kpis: [
    { label: "TOTAL BUDGET", value: "$12.4M", description: "Original budget" },
    { label: "COMMITTED", value: "$8.9M", description: "Purchase orders" },
    { label: "ACTUAL SPENT", value: "$6.2M", description: "Invoiced to date" },
    { label: "VARIANCE", value: "8.6%", description: "Cost overrun" },
    { label: "FORECAST", value: "$13.5M", description: "At completion" },
  ],

  progress: { value: "72%", planned: "75%", actual: "72%" },

  insights: [
    { title: "Material costs trending up", description: "Steel prices increased 12% this quarter." },
    { title: "Labor within budget", description: "Workforce costs aligned with forecast." },
  ],

  upcoming: [
    { title: "MEP Payment", description: "Contractor milestone", date: "25 Jul" },
    { title: "Steel Delivery", description: "Phase 2 structural", date: "28 Jul" },
    { title: "Finishes Procurement", description: "Level 2 materials", date: "03 Aug" },
  ],

  alerts: [
    { title: "Budget threshold breach", description: " MEP package exceeds 110% of estimate." },
    { title: "Pending approvals", description: "3 change orders awaiting review." },
    { title: "Forecast variance", description: "EAC exceeds baseline by $1.1M." },
  ],

  mainSections: [
    {
      kind: "bars",
      title: "Spend vs Budget by Package",
      items: [
        { label: "MEP", value: "110%" },
        { label: "Structure", value: "82%" },
        { label: "Civil", value: "67%" },
        { label: "Finishes", value: "45%" },
      ],
    },
    {
      kind: "stat-grid",
      title: "Cost Breakdown",
      columns: 3,
      items: [
        { label: "Material", value: "$5.1M", sub: "Procured" },
        { label: "Labour", value: "$3.4M", sub: "Workforce" },
        { label: "Subcontract", value: "$2.8M", sub: "Specialists" },
        { label: "Plant", value: "$0.9M", sub: "Equipment" },
        { label: "Indirect", value: "$0.6M", sub: "Site overhead" },
        { label: "Contingency", value: "$0.7M", sub: "Reserve" },
      ],
    },
  ],

  activity: [
    { text: "Payment certificate approved", action: "created" },
    { text: "Change order updated", action: "updated" },
    { text: "Budget threshold breached", action: "alert" },
    { text: "Forecast revised", action: "updated" },
  ],
};
