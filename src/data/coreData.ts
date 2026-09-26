import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  FolderKanban,
  FolderOpen,
  GanttChart,
  Landmark,
  Layers,
  ListChecks,
  Package,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserCog,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";

export const coreHero = {
  eyebrow: "Platform Core",
  titleLead: "One System. ",
  titleAccent: "Every Record.",
  subtitle:
    "Documents, library, directory, users and projects — the shared foundation every ZedOps module runs on.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
  imageSrc: "/screenshots/schedule-and-planning.png",
  imageAlt: "ZedOps platform core dashboard with documents, directory and projects",
} as const;

export const coreBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Layers, label: "One Foundation" },
  { icon: FolderOpen, label: "Documents in Context" },
  { icon: BookOpen, label: "Shared Library" },
  { icon: Users, label: "One Directory" },
  { icon: UserCog, label: "Admin & Control" },
];

export const coreFeaturesTitle = {
  lead: "Everything in ",
  accent: "platform core",
} as const;

export const coreFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: FolderOpen,
    title: "",
    bullets: [
      "Project folders with structure",
      "Contracts, drawings and photos",
      "Version discipline by default",
      "Permissioned access per job",
    ],
  },
  {
    icon: BookOpen,
    title: "Library",
    bullets: [
      "Materials, labour and rates",
      "Productivity and overheads",
      "Tools and equipment norms",
      "Shared with estimation and site",
    ],
  },
  {
    icon: Users,
    title: "Directory",
    bullets: [
      "Employees and external contacts",
      "Resolve owners across jobs",
      "Keep people current",
      "Reused on every project",
    ],
  },
  {
    icon: Building2,
    title: "Workforce Workflow",
    bullets: [
      "Organisation profile",
      "All jobs in one list",
      "Users, roles and admin",
      "Workflow and default settings",
    ],
  },
  {
    icon: UserCog,
    title: "Attendence",
    bullets: [
      "Invite and onboard quickly",
      "Role-based permissions",
      "Tenant-scoped and secure",
      "Audit trail of changes",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Roles & Permissions",
    bullets: [
      "Who sees what, by role",
      "Approval routing",
      "Consistent defaults",
      "Same rules across modules",
    ],
  },
];

export const coreWorkflowTitle = {
  lead: "Core ",
  accent: "workflow",
} as const;

export const coreWorkflow: { icon: LucideIcon; title: string }[] = [
  { icon: Building2, title: "Set Company" },
  { icon: Users, title: "Build Directory" },
  { icon: UserCog, title: "Invite Users" },
  { icon: FolderKanban, title: "Create Projects" },
  { icon: BookOpen, title: "Load Library" },
  { icon: Layers, title: "Connect Modules" },
];

export const coreConnected = {
  titleLead: "One Foundation. ",
  titleAccent: "Every Module.",
  subtitle: "From Setup to Execution",
  hubTitle: "ZEDOPS PLATFORM CORE",
  hubTagline: "Configure. Connect. Control.",
  footer: "Always in Sync. Always Up-to-Date.",
  steps: [
    { icon: Building2, label: "Set\nCompany" },
    { icon: Users, label: "Build\nDirectory" },
    { icon: UserCog, label: "Invite\nUsers" },
    { icon: FolderKanban, label: "Create\nProjects" },
    { icon: BookOpen, label: "Load\nLibrary" },
    { icon: Layers, label: "Connect\nModules" },
    { icon: ShieldCheck, label: "Stay in\nControl" },
  ],
} as const;

export const coreSimple = {
  title: "Configure. Connect. Control. It's That Simple.",
  imageSrc: "/photos/on-site.png",
  imageAlt: "Admin setting up the workspace and connecting modules",
  items: [
    { icon: Building2, tone: "blue" as const, title: "Set the Foundation", desc: "Company, projects and defaults." },
    { icon: Users, tone: "green" as const, title: "One Directory", desc: "People resolve on every job." },
    { icon: BookOpen, tone: "green" as const, title: "Shared Library", desc: "Estimate and site use the same data." },
    { icon: UserCog, tone: "orange" as const, title: "Role-Based Admin", desc: "Right access for the right people." },
    { icon: Zap, tone: "blue" as const, title: "Connect Everything", desc: "Modules share one record." },
  ],
} as const;

export const coreKpis = {
  title: "Workspace Health (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: { label: "View Full Core Dashboard", href: "/early-access" },
  sampleNote: "* Sample workspace data",
  stats: [
    {
      icon: FolderOpen,
      color: "orange" as const,
      label: "Documents",
      value: "1,284",
      sparkPoints: [820, 910, 990, 1050, 1120, 1200, 1284],
    },
    {
      icon: Users,
      color: "green" as const,
      label: "Active Users",
      value: "62",
      sparkPoints: [38, 44, 49, 53, 57, 60, 62],
    },
    {
      icon: Building2,
      color: "red" as const,
      label: "Projects",
      value: "18",
      sparkPoints: [10, 12, 13, 15, 16, 17, 18],
    },
    {
      icon: BookOpen,
      color: "purple" as const,
      label: "Library Items",
      value: "436",
      sparkPoints: [210, 250, 300, 340, 380, 410, 436],
    },
  ],
} as const;

export const coreComparison = {
  title: "Traditional Way vs ZEDOPS",
  subtitle: "From scattered setup to one connected workspace",

  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

  traditional: [
    {
      title: "Shared drives & loose folders",
      description: "Files lost and duplicated",
    },
    {
      title: "Scattered contacts & org charts",
      description: "People hard to find",
    },
    {
      title: "Manual onboarding",
      description: "Slow and inconsistent",
    },
    {
      title: "Copy-paste rates & norms",
      description: "Drift between teams",
    },
    {
      title: "No single source of truth",
      description: "Every module re-keyed",
    },
  ],

  withZedops: [
    {
      title: "One structured document system",
      description: "Files live on the job, not in email",
    },
    {
      title: "One shared directory",
      description: "People resolve across all jobs",
    },
    {
      title: "Fast, role-based onboarding",
      description: "Invite and permission in minutes",
    },
    {
      title: "Shared library of rates & norms",
      description: "Estimate and site stay aligned",
    },
    {
      title: "One connected record",
      description: "Every module reads the same data",
    },
  ],

  benefits: [
    {
      title: "Complete Visibility",
      description: "Across the workspace",
    },
    {
      title: "Faster Setup",
      description: "Of users & projects",
    },
    {
      title: "Stronger Control",
      description: "Over access & data",
    },
    {
      title: "Better Consistency",
      description: "Across every team",
    },
    {
      title: "One Source of Truth",
      description: "For the whole platform",
    },
  ],
} as const;

export const coreAiEyebrow =
  "From setup to execution — keep every record connected across your workspace." as const;

export const coreAiRoadmap = {
  icon: Sparkles,
  title: "What's Coming Next – ZED AI (Roadmap)",
  items: [
    {
      icon: FileText,
      title: "AI Document Tagging",
      body: "Auto-classify and file documents to the right job and folder.",
    },
    {
      icon: Users,
      title: "AI Directory Sync",
      body: "Keep people and contacts current from a trusted source.",
    },
    {
      icon: UserCog,
      title: "AI Smart Library",
      body: "Find and recommend the right estimation resources for each project."
    },
    {
      icon: ShieldCheck,
      title: "AI Permission Checks",
      body: "Flag over-broad access and tighten permissions automatically.",
    },
  ],
} as const;

export const coreSourcesTitle = {
  lead: "Platform Core Connects ",
  accent: "Across ZEDOPS",
} as const;

export const coreSources: { icon: LucideIcon; label: string; current?: boolean }[] = [
  { icon: Calculator, label: "Estimation" },
  { icon: Landmark, label: "Budget & Cost Control" },
  { icon: Package, label: "Supply Chain Management" },
  { icon: Layers, label: "Platform Core", current: true },
  { icon: GanttChart, label: "Planning & Scheduling" },
  { icon: ClipboardList, label: "Daily Execution Intelligence" },
  { icon: ShieldCheck, label: "Quality & Safety" },
  
];

export const coreCta = {
  title: "One Foundation. ",
  accent: "Every Module.",
  body: "See how ZedOps core keeps documents, people and projects connected across your workspace.",
};

export const coreDashboardData: DashboardData = {
  projectName: "Dubia Mall",
  title: "Platform Core Dashboard",
  subtitle: "Acme Construction",

  accent: "bg-white",
  activeTab: "Core",

  floatingCards: {
    progress: "Project Progress",
    insights: "AI Insights",
    upcoming: "Upcoming Activities",
    alerts: "Alerts",
  },

  customFloatCards: [
    {
      title: "People Overview",
      value: "70 Employees",
      icon: Users,
      items: [
        { label: "Total Users", value: "69" },
        { label: "Employees managed in the directory", value: "" },
      ],
    },
    {
      title: "Contractor Network",
      value: "24",
      icon: UserCog,
      items: [
        { label: "Contractors", value: "" },
        { label: "External workforce managed in directory", value: "" },
      ],
    },
    {
      title: "Business Network",
      value: "29 Vendors",
      icon: Building2,
      items: [
        { label: "29 Clients", value: "" },
        { label: "Partners & customers in the directory", value: "" },
      ],
    },
    {
      title: "Directory Users",
      value: "69",
      icon: FolderOpen,
      items: [
        { label: "Total Users", value: "" },
        { label: "Managed and organized in the system", value: "" },
      ],
    },
  ],

  kpis: [
    {
      label: "DOCUMENTS",
      value: "1,284",
      description: "Across all jobs",
    },
    {
      label: "ACTIVE USERS",
      value: "62",
      description: "In workspace",
    },
    {
      label: "PROJECTS",
      value: "18",
      description: "Live and archived",
    },
    {
      label: "LIBRARY ITEMS",
      value: "436",
      description: "Rates & norms",
    },
    {
      label: "SETUP",
      value: "92%",
      description: "Workspace complete",
    },
  ],

  progress: {
    value: "92%",
    planned: "95%",
    actual: "92%",
  },

  insights: [
    {
      title: "3 projects missing owners",
      description: "Assign leads to keep them moving.",
    },
    {
      title: "Library in good shape",
      description: "Rates synced with estimation.",
    },
  ],

  upcoming: [
    {
      title: "Contract Renewal",
      description: "Main contractor docs",
      date: "24 Jul",
    },
    {
      title: "User Training",
      description: "New site team",
      date: "28 Jul",
    },
    {
      title: "Library Review",
      description: "Quarterly rates check",
      date: "02 Aug",
    },
  ],

  alerts: [
    {
      title: "Over-broad access",
      description: "Two users with admin on all jobs.",
    },
    {
      title: "Unassigned project",
      description: "Project 18 has no lead.",
    },
    {
      title: "Stale contact",
      description: "Directory has 4 unreviewed entries.",
    },
  ],

  mainSections: [
    {
      kind: "timeline",
      title: "Module Adoption",
      rows: [
        { title: "Estimation", start: "5%", width: "22%", color: "bg-[#22A866]" },
        { title: "Planning", start: "18%", width: "26%", color: "bg-[#0065FF]" },
        { title: "Daily Intelligence", start: "38%", width: "24%", color: "bg-brand-orange" },
        { title: "Quality & Safety", start: "58%", width: "20%", color: "bg-[#6554C0]" },
        { title: "Cost Control", start: "72%", width: "18%", color: "bg-[#00A3BF]" },
      ],
    },
    {
      kind: "bars",
      title: "Documents by Type",
      items: [
        { label: "Drawings", value: "482" },
        { label: "Contracts", value: "216" },
        { label: "Photos", value: "388" },
        { label: "Reports", value: "124" },
        { label: "Other", value: "74" },
      ],
    },
  ],

  activity: [
    { text: "Project created", action: "created" },
    { text: "User invited to workspace", action: "created" },
    { text: "Document folder updated", action: "updated" },
    { text: "Over-broad access flagged", action: "alert" },
  ],
};
