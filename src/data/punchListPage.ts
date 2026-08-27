import type { LucideIcon } from "lucide-react";

import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Camera,
  CheckSquare,
  ClipboardCheck,
  Eye,
  FileBarChart,
  GanttChart,
  ListChecks,
  Package,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Wallet,
  Zap,
} from "lucide-react";

import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const punchListHero = {

  eyebrow: "Punch List Management",

  titleLead: "Identify. Assign. ",

  titleAccent: "Resolve. Close.",

  subtitle:
    "Capture punch items through walkthroughs or individually, assign responsibility, track resolution and close with proof.",

  primaryCta: { label: "Request a Demo", href: "/early-access" },

} as const;

export const punchListFeaturesTitle = {

  lead: "Everything You Need for Comprehensive ",

  accent: "Punch List Management",

} as const;

export const punchListFeatures: {

  icon: LucideIcon;

  title: string;

  bullets: string[];

}[] = [

  {

    icon: ListChecks,

    title: "Create Punch Items",

    bullets: [

      "Walk-through punch items",

      "Individual punch items",

      "Photo & video capture",

      "Location & categorization",

    ],

  },

  {

    icon: UserCheck,

    title: "Assign & Notify",

    bullets: [

      "Assign to right person / team",

      "Discipline or contractor",

      "Due dates & priority",

      "Auto notifications",

    ],

  },

  {

    icon: Camera,

    title: "Track & Collaborate",

    bullets: [

      "Real-time status tracking",

      "Comments & chat",

      "Mentions, updates & tags",

      "Full activity history",

    ],

  },

  {

    icon: Eye,

    title: "Verify & Close",

    bullets: [

      "Review & verify resolution",

      "Add completion notes",

      "Verify & approve",

      "Close with evidence",

    ],

  },

  {

    icon: Target,

    title: "Evaluate & Improve",

    bullets: [

      "Root cause evaluation",

      "Recurring issue tracking",

      "Quality analytics",

      "Lessons learned",

    ],

  },

  {

    icon: BadgeCheck,

    title: "Reports & Insights",

    bullets: [

      "Punch list reports & summary",

      "Overdue & aging reports",

      "Closure performance",

      "Custom dashboards",

    ],

  },

];

export const punchListWorkflowTitle = {

  lead: "Punch List Management ",

  accent: "Workflow",

} as const;

export const punchListWorkflow: { icon: LucideIcon; title: string }[] = [

  { icon: ListChecks, title: "Create Punch" },

  { icon: UserCheck, title: "Assign Punch" },

  { icon: Target, title: "Set Priority" },

  { icon: Zap, title: "Resolve Punch" },

  { icon: Eye, title: "Update Progress" },

  { icon: ClipboardCheck, title: "Verify Punch" },

  { icon: BadgeCheck, title: "Close Punch" },

  { icon: BarChart3, title: "Reports & Insights" },

];

export const punchListConnected = {

  titleLead: "One Punch. Complete",

  titleAccent: "Lifecycle.",

  subtitle: "From identification to closure with full accountability.",

  hubTitle: "ZEDOPS PUNCH LIST MANAGEMENT",

  hubTagline: "Identify. Assign. Resolve. Close. Hand Over.",

  footer: "Better quality. Faster closure. Full visibility.",

  steps: [

    { icon: ListChecks, label: "Identify" },

    { icon: UserCheck, label: "Assign" },

    { icon: Target, label: "Prioritize" },

    { icon: Zap, label: "Resolve" },

    { icon: Eye, label: "Update" },

    { icon: BadgeCheck, label: "Verify" },

    { icon: BarChart3, label: "Report" },

  ],

} as const;

export const punchListComparison = {

  traditionalTitle: "Traditional Way",

  zedopsTitle: "With ZEDOPS",

  traditional: [

    {

      title: "Snags noted on paper / WhatsApp",

      description: "Responsibility is unclear",

    },

    {

      title: "Responsibility unclear",

      description: "Open snags get forgotten",

    },

    {

      title: "Follow-up depends on calls",

      description: "Limited visibility & reports",

    },

    {

      title: "Evidence scattered in folders",

      description: "Management reacts late",

    },

    {

      title: "Closure difficult to verify",

      description: "Open items are difficult to track",

    },

  ],

  withZedops: [

    {

      title: "Snags captured digitally on site",

      description: "Assigned instantly to the right person",

    },

    {

      title: "Real-time tracking & notifications",

      description: "Overdue & open snags visible",

    },

    {

      title: "Complete history & reports",

      description: "Full project visibility",

    },

    {

      title: "Evidence stays with the snag",

      description: "Verify, approve & close with proof",

    },

    {

      title: "Management takes action early",

      description: "Faster and cleaner handover",

    },

  ],

  benefits: [

    {

      title: "Complete Visibility",

      description: "Across areas & trades",

    },

    {

      title: "Better Accountability",

      description: "Every snag has an owner",

    },

    {

      title: "Faster Resolution",

      description: "Reduce delays and follow-ups",

    },

    {

      title: "Quality Assurance",

      description: "Verify every fix with evidence",

    },

    {

      title: "Actionable Insights",

      description: "Improve project outcomes",

    },

  ],

} as const;

export const punchAiEyebrow =

  "From identifying a snag to verified closure — every action stays connected." as const;

export const punchAiRoadmap = {

  icon: Sparkles,

  title: "What's Coming Next – ZED AI (Roadmap)",

  items: [

    {

      icon: Target,

      title: "AI Due Date Prediction",

      body: "Predict realistic due dates for faster closure.",

    },

    {

      icon: TrendingUp,

      title: "Recurring Snag Detection",

      body: "Identify recurring issues and patterns.",

    },

    {

      icon: AlertTriangle,

      title: "Impact & Risk Scoring",

      body: "Score snags by impact and project risk.",

    },

    {

      icon: FileBarChart,

      title: "AI Summary & Reports",

      body: "Auto-generate snag summaries & insights.",

    },

  ],

} as const;

export const punchListSourcesTitle = {

  lead: "Punch List Management Connects ",

  accent: "Across ZEDOPS",

} as const;

export const punchListSources: { icon: LucideIcon; label: string; current?: boolean }[] = [

  { icon: ClipboardCheck, label: "Daily Execution Intelligence" },

  { icon: CheckSquare, label: "Inspections Management" },

  { icon: GanttChart, label: "Planning & Scheduling" },

  { icon: ListChecks, label: "Punch List Management", current: true },

  { icon: Package, label: "Task Resoultion" },

  { icon: Wallet, label: "Budget & Cost Control" },

  { icon: BarChart3, label: "Reports & Analytics" },

];

export const punchListCta = {

  title: "Better Quality. Better Closure.",

  accent: "Better Projects.",

  body: "Identify early. Resolve faster. Close with confidence.",

};

export const punchDashboardData: DashboardData = {

  projectName: "Dubai Mall",

  title: "Punch List Dashboard",

  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Punch Progress",
    insights: "Punch Insights",
    upcoming: "Closing Soon",
    alerts: "Punch Alerts",
  },

  customFloatCards: [
    {
      title: "Punch Overview",
      value: "31 Total Items",
      icon: ListChecks,
      items: [
        { label: "Closed", value: "16" },
        { label: "Open", value: "3" },
        { label: "Ready for Inspection", value: "2" },
      ],
    },
    {
      title: "Walkthrough Insights",
      value: "32 Walkthroughs",
      icon: Eye,
      items: [
        { label: "Total Walkthroughs", value: "" },
        { label: "Punch list activity across project", value: "" },
      ],
    },
    {
      title: "Priority Breakdown",
      value: "65% Medium",
      icon: BarChart3,
      items: [
        { label: "High", value: "29%" },
        { label: "Medium", value: "65%" },
        { label: "Low", value: "6%" },
      ],
    },
    {
      title: "Discipline Issues",
      icon: ClipboardCheck,
      items: [
        { label: "Electrical", value: "7" },
        { label: "Civil", value: "7" },
        { label: "Finishing", value: "5" },
        { label: "Safety", value: "5" },
        { label: "Architecture", value: "4" },
        { label: "MEP", value: "3" },
      ],
    },
  ],

  kpis: [

    { label: "TOTAL PUNCH", value: "254", description: "Total Punches" },

    { label: "OPEN PUNCH", value: "86", description: "34% of total" },

    { label: "IN PROGRESS", value: "96", description: "38% of total" },

    { label: "CLOSED PUNCH", value: "162", description: "64% of total" },

    { label: "OVERDUE", value: "24", description: "9% of total" },

  ],

  progress: { value: "78%", planned: "82%", actual: "78%" },

  insights: [

    { title: "24 overdue snags", description: "Across active project areas." },

    { title: "MEP nearing closeout", description: "82% items closed." },

  ],

  upcoming: [

    { title: "Duct Installation - L3", description: "SN-1048", date: "7 days" },

    { title: "Painting Touch-up - L2", description: "SN-1052", date: "5 days" },

    { title: "Cable Tray Fixing - L1", description: "SN-1056", date: "4 days" },

  ],

  alerts: [

    { title: "24 overdue snags", description: "Require immediate attention." },

    { title: "Owner awaiting sign-off", description: "Level 1 pack pending." },

    { title: "Photo missing", description: "3 items lack evidence." },

  ],

  mainSections: [

    {

      kind: "bars",

      title: "Open Punch by Trade",

      items: [

        { label: "MEP", value: "34%" },

        { label: "Civil", value: "22%" },

        { label: "Finishes", value: "28%" },

        { label: "Facade", value: "16%" },

      ],

    },

    {

      kind: "list",

      title: "Recent Punch Items",

      items: [

        { title: "Duct Installation - L3", description: "SN-1048", meta: "7 days" },

        { title: "Painting Touch-up - L2", description: "SN-1052", meta: "5 days" },

        { title: "Cable Tray Fixing - L1", description: "SN-1056", meta: "4 days" },

      ],

    },

  ],

  activity: [

    { text: "Punch item created", action: "created" },

    { text: "Photo attached", action: "updated" },

    { text: "Item reassigned", action: "updated" },

    { text: "Overdue alert", action: "alert" },

  ],

};