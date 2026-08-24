import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileCheck2,
  FileText,
  GanttChart,
  Landmark,
  ListChecks,
  Package,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  Upload,
  Zap,
} from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const qualityHero = {
  eyebrow: "Quality & Safety",
  titleLead: "Inspect. Record. ",
  titleAccent: "Resolve. Comply.",
  subtitle:
    "Run inspections, capture observations, log incidents and keep every record audit-ready — all tied to the same job, the same day.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
  imageSrc: "/schedule and planning.png",
  imageAlt: "ZedOps quality and safety dashboard with inspections, incidents and compliance",
  videoSrc: "/Daily log ad.mp4",
} as const;

export const qualityBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Standard Inspections" },
  { icon: ClipboardCheck, label: "Consistent Checklists" },
  { icon: AlertTriangle, label: "Incident Tracking" },
  { icon: FileCheck2, label: "Audit-Ready Records" },
  { icon: BadgeCheck, label: "Compliance Evidence" },
];

export const qualityFeaturesTitle = {
  lead: "Everything you need for ",
  accent: "quality & safety",
} as const;

export const qualityFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: ClipboardList,
    title: "Inspection Templates",
    bullets: [
      "Reusable QA/QC and HSE forms",
      "Required fields and scoring rules",
      "Trade and phase specific checklists",
      "Version controlled standards",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Observations & Deficiencies",
    bullets: [
      "Log defects with photos and notes",
      "Severity and trade classification",
      "Link to the responsible activity",
      "Track to closure on one thread",
    ],
  },
  {
    icon: FileText,
    title: "Incident Logging",
    bullets: [
      "What happened, when and who",
      "Root cause and corrective actions",
      "Near-miss and first-aid capture",
      "Regulator-ready timeline",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Permits & Compliance",
    bullets: [
      "Work permits and method statements",
      "Approval routing and sign-off",
      "Standard criteria across sites",
      "Evidence kept on the job record",
    ],
  },
  {
    icon: Camera,
    title: "Photo & Document Evidence",
    bullets: [
      "Capture from the field in-app",
      "Auto-tagged to location and date",
      "Attach drawings and references",
      "One source of truth per record",
    ],
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    bullets: [
      "Open vs closed by trade and phase",
      "Incident and near-miss trends",
      "Compliance scorecards",
      "Export for clients and auditors",
    ],
  },
];

export const qualityWorkflowTitle = {
  lead: "Quality & safety ",
  accent: "workflow",
} as const;

export const qualityWorkflow: { icon: LucideIcon; title: string }[] = [
  { icon: Upload, title: "Create Checklist" },
  { icon: ClipboardCheck, title: "Inspect / Observe" },
  { icon: Camera, title: "Capture Evidence" },
  { icon: AlertTriangle, title: "Log Incidents" },
  { icon: UserCheck, title: "Assign Actions" },
  { icon: Eye, title: "Review & Verify" },
  { icon: BadgeCheck, title: "Close & Comply" },
];

export const qualityConnected = {
  titleLead: "One Record. Every Check",
  titleAccent: "Connected.",
  subtitle: "From Observation to Closeout",
  hubTitle: "ZEDOPS QUALITY & SAFETY",
  hubTagline: "Inspect. Record. Resolve. Comply.",
  footer: "Always in Sync. Always Audit-Ready.",
  steps: [
    { icon: ClipboardCheck, label: "Build\nChecklists" },
    { icon: ShieldCheck, label: "Inspect &\nObserve" },
    { icon: Camera, label: "Capture\nEvidence" },
    { icon: AlertTriangle, label: "Log\nIncidents" },
    { icon: UserCheck, label: "Assign\nActions" },
    { icon: BadgeCheck, label: "Verify &\nClose" },
    { icon: FileCheck2, label: "Stay\nCompliant" },
  ],
} as const;

export const qualitySimple = {
  title: "Inspect. Record. Resolve. It's That Simple.",
  imageSrc: "/on site.png",
  imageAlt: "Site engineer logging a quality check on a phone",
  items: [
    { icon: ClipboardCheck, tone: "blue" as const, title: "Standard Checklists", desc: "Same criteria on every walk." },
    { icon: Camera, tone: "green" as const, title: "Evidence in the Field", desc: "Photos and notes captured on the spot." },
    { icon: UserCheck, tone: "green" as const, title: "Clear Ownership", desc: "Every action has an owner and due date." },
    { icon: Eye, tone: "orange" as const, title: "Real-time Visibility", desc: "Office sees the latest record instantly." },
    { icon: Zap, tone: "blue" as const, title: "Close Faster", desc: "Resolve deficiencies before they escalate." },
  ],
} as const;

export const qualityKpis = {
  title: "Quality & Safety Performance (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: { label: "View Full QHSE Dashboard", href: "/early-access" },
  sampleNote: "* Sample project data",
  stats: [
    {
      icon: ShieldCheck,
      color: "orange" as const,
      label: "Open Inspections",
      value: "42",
      sparkPoints: [28, 31, 34, 36, 38, 40, 42],
    },
    {
      icon: CheckCircle2,
      color: "green" as const,
      label: "Checks Completed",
      value: "78%",
      sparkPoints: [52, 58, 63, 68, 72, 75, 78],
    },
    {
      icon: AlertTriangle,
      color: "red" as const,
      label: "Open Incidents",
      value: "9",
      sparkPoints: [14, 13, 12, 11, 10, 10, 9],
    },
    {
      icon: BadgeCheck,
      color: "purple" as const,
      label: "Compliance Score",
      value: "94%",
      sparkPoints: [88, 89, 90, 91, 92, 93, 94],
    },
  ],
} as const;

export const qualityComparison = {
  title: "Traditional Way vs ZEDOPS",
  subtitle: "From disconnected records to connected project execution",

  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Paper forms & scattered photos",
      description: "Lost, late and hard to find",
    },
    {
      title: "Manual incident registers",
      description: "Slow to compile and report",
    },
    {
      title: "Unclear ownership & follow-up",
      description: "Deficiencies fall through the cracks",
    },
    {
      title: "Audit prep is a scramble",
      description: "Evidence pulled together by hand",
    },
    {
      title: "Issues found too late",
      description: "Escalate before anyone acts",
    },
  ],

  withZedops: [
    {
      title: "One connected QHSE record",
      description: "All checks, photos and actions in one place",
    },
    {
      title: "Live incident & deficiency tracking",
      description: "Always up-to-date and reportable",
    },
    {
      title: "Clear assignment & accountability",
      description: "Right person, right action, always",
    },
    {
      title: "Audit-ready by default",
      description: "Evidence attached to every record",
    },
    {
      title: "Early alerts & faster closure",
      description: "Spot issues early, resolve quickly",
    },
  ],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across sites & trades",
    },
    {
      title: "Faster Resolution",
      description: "Of deficiencies & incidents",
    },
    {
      title: "Stronger Accountability",
      description: "At every level",
    },
    {
      title: "Lower Risk",
      description: "Fewer surprises on site",
    },
    {
      title: "Better Compliance",
      description: "Ready when auditors ask",
    },
  ],
} as const;

export const qualityAiEyebrow =
  "From inspection to closeout — keep every record connected and audit-ready." as const;

export const qualityAiRoadmap = {
  icon: Sparkles,
  title: "What's Coming Next – ZED AI (Roadmap)",
  items: [
    {
      icon: ShieldAlert,
      title: "AI Risk Detection",
      body: "Surface high-risk activities and sites before incidents happen.",
    },
    {
      icon: ClipboardList,
      title: "AI Inspection Drafts",
      body: "Auto-draft inspections from live project and trade data.",
    },
    {
      icon: FileText,
      title: "AI Incident Summaries",
      body: "Generate clear incident narratives and corrective actions.",
    },
    {
      icon: BadgeCheck,
      title: "AI Compliance Checks",
      body: "Flag missing evidence and incomplete records automatically.",
    },
  ],
} as const;

export const qualitySourcesTitle = {
  lead: "Quality & Safety Connects ",
  accent: "Across ZEDOPS",
} as const;

export const qualitySources: { icon: LucideIcon; label: string; current?: boolean }[] = [
  { icon: Calculator, label: "Estimation" },
  { icon: Landmark, label: "Budget & Cost Control" },
  { icon: Package, label: "Supply Chain Management" },
  { icon: ShieldCheck, label: "Quality & Safety", current: true },
  { icon: GanttChart, label: "Planning & Scheduling" },
  { icon: ListChecks, label: "Task Resolution" },
  { icon: BarChart3, label: "Reports & Analytics" },
];

export const qualityCta = {
  title: "Safer Sites. ",
  accent: "Stronger Compliance.",
  body: "See how ZEDOPS brings inspections, incidents and closeout into one connected record.",
};

export const qualityDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Quality & Safety Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Project",

  floatingCards: {
    progress: "Compliance Progress",
    insights: "Safety Insights",
    upcoming: "Upcoming Inspections",
    alerts: "Quality Alerts",
  },

  extraCard: {
    title: "Open Findings",
    value: "23",
    sub: "Across 8 active inspections",
    items: [
      { title: "Critical", description: "2 items need immediate action" },
      { title: "Major", description: "9 items pending review" },
      { title: "Minor", description: "12 items scheduled for fix" },
    ],
  },

  kpis: [
    {
      label: "OPEN INSPECTIONS",
      value: "42",
      description: "Across all trades",
    },
    {
      label: "DEFICIENCIES",
      value: "37",
      description: "Open items",
    },
    {
      label: "INCIDENTS",
      value: "9",
      description: "Open / in review",
    },
    {
      label: "COMPLIANCE",
      value: "94%",
      description: "Scorecard",
    },
    {
      label: "CLOSED",
      value: "78%",
      description: "Checks complete",
    },
  ],

  progress: {
    value: "78%",
    planned: "82%",
    actual: "78%",
  },

  insights: [
    {
      title: "3 high-risk deficiencies",
      description: "Need owner confirmation this week.",
    },
    {
      title: "Incident trend improving",
      description: "Open incidents down 36% this month.",
    },
  ],

  upcoming: [
    {
      title: "MEP QA/QC Walk",
      description: "Level 2 inspections",
      date: "24 Jul",
    },
    {
      title: "Fire Safety Audit",
      description: "Compliance check",
      date: "28 Jul",
    },
    {
      title: "Structural Sign-off",
      description: "Closeout review",
      date: "02 Aug",
    },
  ],

  alerts: [
    {
      title: "High-risk deficiency",
      description: "Fire sealing incomplete on Level 2.",
    },
    {
      title: "Permit expiring",
      description: "Confined space permit ends tomorrow.",
    },
    {
      title: "Incident awaiting review",
      description: "Near-miss logged by site team.",
    },
  ],

  mainSections: [
    {
      kind: "timeline",
      title: "Inspection Progress by Phase",
      rows: [
        { title: "Foundation Works", start: "5%", width: "25%", color: "bg-[#22A866]" },
        { title: "Structure Works", start: "20%", width: "30%", color: "bg-[#0065FF]" },
        { title: "MEP Installation", start: "40%", width: "30%", color: "bg-brand-orange" },
        { title: "Finishing Works", start: "65%", width: "20%", color: "bg-[#6554C0]" },
        { title: "Testing & Commissioning", start: "75%", width: "15%", color: "bg-[#00A3BF]" },
      ],
    },
    {
      kind: "bars",
      title: "Open Deficiencies by Trade",
      items: [
        { label: "Electrical", value: "14" },
        { label: "HVAC", value: "11" },
        { label: "Plumbing", value: "9" },
        { label: "Fire", value: "6" },
        { label: "Civil", value: "4" },
      ],
    },
  ],

  activity: [
    { text: "Safety inspection submitted", action: "created" },
    { text: "High-risk deficiency logged", action: "alert" },
    { text: "MEP deficiency closed", action: "updated" },
    { text: "Work permit approved", action: "created" },
  ],
};
