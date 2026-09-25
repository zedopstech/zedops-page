import type { LucideIcon } from "lucide-react";

import {
  AlertTriangle,
  ArrowLeftRight,
  Banknote,
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileBarChart,
  FileSignature,
  Gauge,
  Link2,
  Package,
  PackageCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Trophy,
  Truck,
  UserCheck,
  Warehouse,
  Workflow,
  Zap,
  X,
  ShieldCheck,
  GanttChart,
  TrendingUp,
  LineChart,
} from "lucide-react";

import type { DashboardData } from "@/components/dashboards/ProductDashboard";

import { supplyChainDashboardData } from "@/data/supplyChainPage";

export const materialHero = {
  eyebrow: "MATERIAL MANAGEMENT",
  titleLead: "Plan. Procure. ",
  titleAccent: "Deliver. Track.",
  subtitle:
    "Manage every material and procurement process from request to site delivery. Connect people, processes and partners in one connected material management platform to deliver projects on time, every time.",
  primaryCta: { label: "Request a Demo", href: "/early-access" },
  imageSrc: "/platform/material-management.png",
  imageAlt: "ZedOps material management dashboard",
  videoSrc: "/supply_chain_demo.mp4",
} as const;

export const materialBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Eye, label: "Complete Visibility" },
  { icon: ShoppingCart, label: "Faster Procurement" },
  { icon: Gauge, label: "Better Control" },
  { icon: Truck, label: "On-time Delivery" },
  { icon: Target, label: "Actionable Insights" },
];

export const materialFeaturesTitle = {
  lead: "Everything You Need for Smart ",
  accent: "Material Management",
} as const;

export const materialFeatures: {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}[] = [
  {
    icon: ClipboardList,
    title: "Request Management",
    bullets: [
      "Create MR / PR / TR",
      "Multi-level approvals",
      "Budget & availability check",
      "Status tracking",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Procurement & PO",
    bullets: [
      "Vendor management",
      "RFQ, comparison & select",
      "PO creation & tracking",
      "Amendments & expediting",
    ],
  },
  {
    icon: Warehouse,
    title: "Inventory & Warehouse",
    bullets: [
      "Real-time inventory",
      "GRN & stock updates",
      "Batch & serial tracking",
      "Stock transfer & audit",
    ],
  },
  {
    icon: Truck,
    title: "Materials Tracking",
    bullets: [
      "Track from order to site",
      "Delivery schedules",
      "Gate entry & consumption",
      "Returns & adjustments",
    ],
  },
  {
    icon: UserCheck,
    title: "Supplier Management",
    bullets: [
      "Supplier database",
      "Performance evaluation",
      "Rate contracts",
      "Onboarding & compliance",
    ],
  },
  {
    icon: BarChart3,
    title: "Reports & Insights",
    bullets: [
      "Procurement reports",
      "Inventory analysis",
      "Delivery performance",
      "Custom dashboards",
    ],
  },
];

export const materialWorkflowTitle = {
  lead: "Material Management ",
  accent: "Workflow",
} as const;

export const materialWorkflow: { icon: LucideIcon; title: string }[] = [
  { icon: ClipboardList, title: "Create Request" },
  { icon: UserCheck, title: "Approve Request" },
  { icon: FileSignature, title: "Create PO" },
  { icon: PackageCheck, title: "Receive & Inspect" },
  { icon: Warehouse, title: "Warehouse Update" },
  { icon: Truck, title: "Deliver to Site" },
  { icon: Target, title: "Track & Manage Consumption" },
  { icon: BarChart3, title: "Reports & Insights" },
];

export const materialConnected = {
  titleLead: "One Process. End-to-End ",
  titleAccent: "Visibility.",
  subtitle: "From Request to Site Delivery",
  hubTitle: "ZEDOPS MATERIAL MANAGEMENT",
  hubTagline: "Plan. Procure. Deliver. Track.",
  footer: "Always in Sync. Always On-time.",
  steps: [
    { icon: ClipboardList, label: "Request\nCreated" },
    { icon: UserCheck, label: "Approval\nWorkflow" },
    { icon: FileSignature, label: "PO\nCreated" },
    { icon: ShoppingCart, label: "Shipped &\nIn Transit" },
    { icon: PackageCheck, label: "Received\nat Site" },
    { icon: Boxes, label: "Consumed\non Site" },
    { icon: BarChart3, label: "Reporting &\nTracking" },
  ],
} as const;

export const materialKpis = {
  title: "Material Performance (KPIs)",
  subtitle: "KPIs for better decision making",
  cta: {
    label: "View Full Material Dashboard",
    href: "/early-access",
  },
  sampleNote: "* Sample project data",
  stats: [
    {
      icon: Target,
      color: "green" as const,
      label: "On-time Delivery",
      value: "94%",
      sparkPoints: [82, 84, 86, 89, 90, 92, 94],
    },
    {
      icon: Boxes,
      color: "orange" as const,
      label: "Inventory Turnover",
      value: "6.2x",
      sparkPoints: [4.8, 5.0, 5.3, 5.6, 5.8, 6.0, 6.2],
    },
    {
      icon: TrendingUp,
      color: "blue" as const,
      label: "Procurement Savings",
      value: "8.6%",
      sparkPoints: [5.2, 6.0, 6.8, 7.1, 7.6, 8.1, 8.6],
    },
    {
      icon: CheckCircle2,
      color: "purple" as const,
      label: "Stock Accuracy",
      value: "98%",
      sparkPoints: [91, 93, 94, 95, 96, 97, 98],
    },
  ],
} as const;

export const materialComparison = {
  title: "Traditional vs ZEDOPS Material Management",
  subtitle:
    "From request to site delivery — complete visibility, control & accountability.",
  traditionalTitle: "Traditional Way",
  zedopsTitle: "With ZEDOPS",

traditional: [
  {
    title: "Requests on paper / emails",
    description: "Hard to track and manage",
  },
  {
    title: "Manual approvals & follow-ups",
    description: "Slow procurement process",
  },
  {
    title: "Multiple spreadsheets",
    description: "Data is scattered and outdated",
  },
  {
    title: "Limited inventory & order visibility",
    description: "No real-time tracking",
  },
  {
    title: "Delivery delays & surprises",
    description: "Problems discovered late",
  },
],

withZedops: [
  {
    title: "Digital requests with approvals",
    description: "Structured request workflow",
  },
  {
    title: "End-to-end process in one platform",
    description: "Connected material workflow",
  },
  {
    title: "Real-time inventory visibility",
    description: "Always know available stock",
  },
  {
    title: "Live order-to-site tracking",
    description: "Stay ahead of delivery delays",
  },
  {
    title: "Accurate data & smart reports",
    description: "Better decisions and control",
  },
],

benefits: [
  {
    title: "Complete Visibility",
    description: "Across materials & orders",
  },
  {
    title: "Better Control",
    description: "Over procurement & stock",
  },
  {
    title: "Faster Procurement",
    description: "Reduce purchasing delays",
  },
  {
    title: "On-time Delivery",
    description: "Get materials where needed",
  },
  {
    title: "Actionable Insights",
    description: "Better decisions, better projects",
  },
],
} as const;

export const materialAiEyebrow =
  "From request to site delivery — complete visibility, control & accountability." as const;

export const materialAiRoadmap = {
  icon: Sparkles,
  title: "What's Coming Next – ZED AI (Roadmap)",
  items: [
    {
      icon: TrendingUp,
      title: "AI Demand Forecast",
      body: "Predict material demand by activity & schedule.",
    },
    {
      icon: AlertTriangle,
      title: "Supplier Risk Score",
      body: "Evaluate supplier risk & reliability.",
    },
    {
      icon: LineChart,
      title: "Price Intelligence",
      body: "Track market trends & price alerts.",
    },
    {
      icon: Truck,
      title: "Delivery Delay Predictor",
      body: "Predict & alert delivery delays before they happen.",
    },
  ],
} as const;

export const materialSourcesTitle = {
  lead: "Material Management Connects ",
  accent: "Across ZEDOPS",
} as const;

export const materialSources: {
  icon: LucideIcon;
  label: string;
  current?: boolean;
}[] = [
  { icon: Banknote, label: "Budget & Cost Control" },
  { icon: ClipboardList, label: "Estimation" },
  { icon: GanttChart, label: "Planning & Scheduling" },
  { icon: Warehouse, label: "Material Management", current: true },
  { icon: Boxes, label: "Daily Execution Intelligence" },
  { icon: Workflow, label: "Task Resoultion" },
  { icon: BarChart3, label: "Reports & Analytics" },
];

export const materialCta = {
  title: "Better Supply Chain. Better Control.",
  accent: "Better Projects.",
  body: "Procure smarter. Deliver on time. Keep projects moving.",
};

export const materialDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Material Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Supply Chain",

  floatingCards: {
    progress: "Supply Progress",
    insights: "Material Insights",
    upcoming: "Incoming Deliveries",
    alerts: "Supply Alerts",
  },

  customFloatCards: [
    {
      title: "Supply Progress",
      value: "94%",
      icon: Package,
      items: [
        { label: "Approved", value: "96" },
        { label: "On Order", value: "78" },
      ],
    },
    {
      title: "Material Insights",
      value: "128 Requests",
      icon: BarChart3,
      items: [
        { label: "Approved", value: "96" },
        { label: "Delivered", value: "52" },
        { label: "Overdue", value: "9" },
      ],
    },
    {
      title: "Incoming Deliveries",
      value: "5 Incoming",
      icon: Truck,
      items: [
        { label: "Zenith Engineering", value: "28 May" },
        { label: "Al Ghurair FZE", value: "27 May" },
        { label: "Middle East Wires", value: "20 May" },
      ],
    },
    {
      title: "Supply Alerts",
      value: "9 Overdue",
      icon: AlertTriangle,
      items: [
        { label: "Pending Approvals", value: "22" },
        { label: "On Order", value: "78" },
      ],
    },
  ],

  kpis: [
    {
      label: "TOTAL REQUESTS",
      value: "128",
      description: "12% increase",
    },
    {
      label: "APPROVED",
      value: "96",
      description: "8% increase",
    },
    {
      label: "ON ORDER",
      value: "78",
      description: "6% increase",
    },
    {
      label: "DELIVERED",
      value: "52",
      description: "10% increase",
    },
    {
      label: "OVERDUE",
      value: "9",
      description: "28% decrease",
    },
  ],

  progress: {
    value: "94%",
    planned: "90%",
    actual: "94%",
  },

  insights: [
    {
      title: "128 Total Requests",
      description: "Material requests across the project.",
    },
    {
      title: "96 Approved",
      description: "Requests approved for procurement.",
    },
    {
      title: "78 On Order",
      description: "Materials currently on order.",
    },
    {
      title: "52 Delivered",
      description: "Materials delivered to site.",
    },
  ],

  upcoming: [
    {
      title: "Zenith Engineering",
      description: "PO-1048",
      date: "28 May 2025",
    },
    {
      title: "Al Ghurair FZE",
      description: "PO-1047",
      date: "27 May 2025",
    },
    {
      title: "Middle East Wires LLC",
      description: "PO-1046",
      date: "20 May 2025",
    },
    {
      title: "Techno Velics LLC",
      description: "PO-1045",
      date: "19 May 2025",
    },
    {
      title: "Prime Electricals",
      description: "PO-1044",
      date: "17 May 2025",
    },
  ],

  alerts: [
    {
      title: "9 Overdue Requests",
      description: "Require immediate attention.",
    },
    {
      title: "22 Pending Approvals",
      description: "Awaiting approval.",
    },
    {
      title: "78 Materials On Order",
      description: "Currently being procured.",
    },
  ],

  mainSections: [
    {
      kind: "bars",
      title: "Procurement Status",
      items: [
        { label: "Draft", value: "8%" },
        { label: "Pending Approval", value: "17%" },
        { label: "Approved", value: "22%" },
        { label: "On Order", value: "30%" },
        { label: "Delivered", value: "17%" },
        { label: "Overdue", value: "7%" },
      ],
    },
    {
      kind: "list",
      title: "Top Material Categories",
      items: [
        {
          title: "Pipes & Fittings",
          description: "On Order €4.66M | Delivered €4.20M",
          meta: "92%",
        },
        {
          title: "Valves",
          description: "On Order €2.54M | Delivered €2.21M",
          meta: "87%",
        },
        {
          title: "Electrical",
          description: "On Order €1.89M | Delivered €1.71M",
          meta: "90%",
        },
        {
          title: "Equipment",
          description: "On Order €1.64M | Delivered €1.33M",
          meta: "81%",
        },
        {
          title: "Instruments",
          description: "On Order €1.24M | Delivered €1.15M",
          meta: "93%",
        },
      ],
    },
  ],

  activity: [
    {
      text: "Material request created",
      action: "created",
    },
    {
      text: "Request approved",
      action: "updated",
    },
    {
      text: "Purchase order created",
      action: "created",
    },
    {
      text: "Material delivered",
      action: "updated",
    },
    {
      text: "Overdue material alert",
      action: "alert",
    },
  ],
};