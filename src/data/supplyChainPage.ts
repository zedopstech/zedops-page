import type { LucideIcon } from "lucide-react";
import type { DashboardData } from "@/components/dashboards/ProductDashboard";
import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Bookmark,
  Boxes,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eye,
  FileBarChart,
  FileSignature,
  FileText,
  GitCompare,
  Headphones,
  LayoutDashboard,
  Package,
  PackageCheck,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Timer,
  Truck,
  Undo2,
  User,
  UserCheck,
  UserCog,
  Users,
  Warehouse,
  Workflow,
  Link2,
  LineChart,
} from "lucide-react";

export const supplyChainHero = {
  eyebrow: "Construction",
  titleLead: "Materials  ",
  titleAccent: "Management",
  tagline: "Right material. Right time. Total control.",
  subtitle:
    "From material request to warehouse, PO, delivery, and site receipt — one workflow for MEP and construction teams.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
  imageSrc: "/platform/material-management.png",
  imageAlt: "ZedOps materials and procurement dashboard",
} as const;

export const supplyChainHeroHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Smartphone, label: "Mobile First" },
  { icon: Workflow, label: "Workflow Driven" },
  { icon: Eye, label: "Live Inventory" },
  { icon: Clock, label: "On-Time Delivery" },
];

export type SupplyChainFeatureTone = "blue" | "orange" | "green" | "purple" | "rose" | "teal";

export const supplyChainModules: {
  icon: LucideIcon;
  title: string;
  tone: SupplyChainFeatureTone;
  bullets: string[];
}[] = [
  {
    icon: ClipboardList,
    title: "Material Requests (MR)",
    tone: "teal",
    bullets: ["Raise MR from site or office", "Project and cost-code context", "Multi-level approval path", "Status from draft to issued"],
  },
  {
    icon: Workflow,
    title: "Workflow Engine",
    tone: "orange",
    bullets: ["Configure approval chains", "MR, PR, TR, and PO routes", "Role-aware sign-off", "Full audit trail"],
  },
  {
    icon: RefreshCw,
    title: "Warehouse Transfers",
    tone: "blue",
    bullets: ["Move stock between sites", "Transfer requests with checks", "In-transit visibility", "Receive against transfer"],
  },
  {
    icon: ShoppingCart,
    title: "Procurement",
    tone: "purple",
    bullets: ["RFQ to vendors", "Compare quotes side by side", "Award with a clear trail", "Handoff into PO"],
  },
  {
    icon: FileSignature,
    title: "Purchase Orders",
    tone: "rose",
    bullets: ["Issue POs from awarded RFQs", "Track variations", "Vendor and project linkage", "Status through delivery"],
  },
  {
    icon: Banknote,
    title: "Payment Management",
    tone: "green",
    bullets: ["Invoices against POs", "Payment status in one place", "Credit notes and returns", "Commercial visibility"],
  },
  {
    icon: Truck,
    title: "Delivery Tracking",
    tone: "orange",
    bullets: ["Dispatch from vendor", "ETA and shipment notes", "Site delivery confirmation", "Exception flags"],
  },
  {
    icon: Boxes,
    title: "Inventory",
    tone: "teal",
    bullets: ["Live stock by warehouse", "Bins and locations", "On-hand vs reserved", "Project-level view"],
  },
  {
    icon: PackageCheck,
    title: "GRN & Receipt",
    tone: "blue",
    bullets: ["Goods receipt against PO", "QC and quantity checks", "Partial receipts", "Stock updates on accept"],
  },
  {
    icon: FileBarChart,
    title: "Reports & Analytics",
    tone: "purple",
    bullets: ["Open requests and aging POs", "Inventory health", "Consumption trends", "Shareable ops reports"],
  },
];

export type WorkflowStageTone = "teal" | "orange" | "blue" | "purple" | "amber";

export type WorkflowNode = {
  icon: LucideIcon;
  label: string;
};

export type SupplyChainWorkflowStage = {
  n: number;
  title: string;
  blurb: string;
  tone: WorkflowStageTone;
  kind: "linear" | "split" | "procure" | "stack";
  steps?: WorkflowNode[];
  split?: {
    question: string;
    yes: WorkflowNode[];
    no: WorkflowNode[];
  };
  procure?: {
    rfq: WorkflowNode[];
    award: WorkflowNode;
    po: WorkflowNode[];
  };
};

export const supplyChainWorkflowStages: SupplyChainWorkflowStage[] = [
  {
    n: 1,
    title: "Material Request",
    blurb: "Raise a material request with required details.",
    tone: "teal",
    kind: "linear",
    steps: [
      { icon: Smartphone, label: "Create Material Request (MR)" },
      { icon: UserCheck, label: "Workflow Approval" },
    ],
  },
  {
    n: 2,
    title: "After Approval — Split",
    blurb: "Split request based on availability and need.",
    tone: "orange",
    kind: "split",
    split: {
      question: "Material Available?",
      yes: [
        { icon: Warehouse, label: "Transfer Request (From Stock)" },
        { icon: Users, label: "Transfer Workflow Approval" },
        { icon: Truck, label: "Material Moved to Requested Location" },
      ],
      no: [
        { icon: FileText, label: "Purchase Request (PR)" },
        { icon: UserCheck, label: "PR Workflow Approval" },
        { icon: ShoppingCart, label: "Procurement" },
      ],
    },
  },
  {
    n: 3,
    title: "Procurement Process",
    blurb: "Procure materials from approved vendors.",
    tone: "blue",
    kind: "procure",
    procure: {
      rfq: [
        { icon: FileBarChart, label: "RFQ (If Required)" },
        { icon: GitCompare, label: "Vendor Quotes & Comparison" },
      ],
      award: { icon: BadgeCheck, label: "Select Best Vendor" },
      po: [
        { icon: FileSignature, label: "Create Purchase Order (PO)" },
        { icon: UserCheck, label: "PO Workflow Approval" },
      ],
    },
  },
  {
    n: 4,
    title: "Payment & Delivery",
    blurb: "Process payment and track delivery.",
    tone: "purple",
    kind: "stack",
    steps: [
      { icon: Banknote, label: "Payment Request" },
      { icon: UserCheck, label: "Workflow Approval" },
      { icon: BadgeCheck, label: "Payment Settled" },
      { icon: Truck, label: "Track Delivery & Follow up" },
    ],
  },
  {
    n: 5,
    title: "Receipt & Close",
    blurb: "Receive materials and close the request.",
    tone: "amber",
    kind: "stack",
    steps: [
      { icon: PackageCheck, label: "Goods Receipt (GRN)" },
      { icon: Truck, label: "Material Issue to Requested Location" },
      { icon: ClipboardCheck, label: "Close Material Request (MR)" },
    ],
  },
];

export const supplyChainWorkflowLoop = {
  title: "One Connected Workflow.",
  description:
    "Track every step, maintain transparency, and ensure the right material reaches the right place at the right time.",
} as const;

export type WorkflowBenefitTone = "orange" | "teal" | "blue" | "purple";

export const supplyChainWorkflowBenefits: {
  icon: LucideIcon;
  title: string;
  blurb: string;
  tone: WorkflowBenefitTone;
}[] = [
  {
    icon: Link2,
    title: "One Connected Workflow.",
    blurb:
      "Track every step, maintain transparency, and ensure the right material reaches the right place at the right time.",
    tone: "orange",
  },
  {
    icon: Eye,
    title: "Full Visibility",
    blurb: "Track every step in real time.",
    tone: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Better Control",
    blurb: "Maintain accuracy and accountability.",
    tone: "orange",
  },
  {
    icon: Clock,
    title: "Faster Decisions",
    blurb: "Get real-time insights and act quickly.",
    tone: "blue",
  },
  {
    icon: LineChart,
    title: "Smarter Operations",
    blurb: "Improve efficiency across projects.",
    tone: "purple",
  },
];

export type InventoryChipTone = "green" | "blue" | "purple" | "orange" | "rose" | "gray";

export const supplyChainInsights = {
  eyebrow: "Insights",
  titleLead: "Consumption, inventory ",
  titleAccent: "& reports",
  subtitle: "See what the site used today, what you hold on hand, and the analytics that follow.",
} as const;

export const supplyChainConsumptionFlow: { icon: LucideIcon; title: string }[] = [
  { icon: Building2, title: "Today's Work at Site" },
  { icon: ClipboardList, title: "Materials Used" },
  { icon: User, title: "Supervisor Verification" },
  { icon: UserCog, title: "Authorized Approval" },
  { icon: ShieldCheck, title: "Inventory Updated" },
  { icon: FileBarChart, title: "Reports & Intelligence" },
];

export const supplyChainConsumptionFooter =
  "Ensures accurate consumption capture, verification and inventory control.";

export const supplyChainInventoryMetric = {
  title: "Live Inventory",
  items: "3,248",
  itemsLabel: "Total Items",
  value: "SAR 6.25M",
  valueLabel: "Inventory Value",
} as const;

export const supplyChainInventorySources: { icon: LucideIcon; label: string; tone: InventoryChipTone }[] = [
  { icon: Warehouse, label: "Main Warehouse", tone: "green" },
  { icon: Warehouse, label: "Project Warehouse A", tone: "blue" },
  { icon: Warehouse, label: "Project Warehouse B", tone: "purple" },
  { icon: Truck, label: "In Transit", tone: "orange" },
];

export const supplyChainInventoryStatuses: { icon: LucideIcon; label: string; tone: InventoryChipTone }[] = [
  { icon: BadgeCheck, label: "Available Stock", tone: "green" },
  { icon: Bookmark, label: "Reserved Stock", tone: "blue" },
  { icon: AlertTriangle, label: "Low Stock Items", tone: "rose" },
  { icon: AlertTriangle, label: "Expired / Obsolete", tone: "gray" },
];

export const supplyChainReports: { icon: LucideIcon; title: string; soon?: boolean }[] = [
  { icon: FileText, title: "Inventory Reports", soon: true },
  { icon: CircleDollarSign, title: "PO Reports & Aging", soon: true },
  { icon: Headphones, title: "Vendor Performance", soon: true },
  { icon: Package, title: "Consumption Reports", soon: true },
  { icon: Truck, title: "Delivery Performance", soon: true },
  { icon: LayoutDashboard, title: "Custom Dashboards", soon: true },
];

export const supplyChainTraditional: string[] = [
  "Requests in WhatsApp and spreadsheets",
  "No stock check before buying again",
  "POs disconnected from site receipt",
  "Inventory nobody trusts",
  "Chasing vendors for status",
];

export const supplyChainWithZedops: string[] = [
  "One MR → approval → buy or transfer path",
  "Live stock before the next purchase",
  "PO, GRN, and inventory on the same record",
  "Warehouses that match the job",
  "Delivery and payment status in one place",
];

export const supplyChainWhy: string[] = [
  "Right material at the right time",
  "Fewer emergency buys and overstock",
  "Approvals that match how you actually work",
  "Site and office on the same quantities",
  "Cost visibility from request to receipt",
  "Real-time inventory and consumption visibility",
];

export const supplyChainAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ScanSearch, title: "Price trend cues", body: "Surface unusual vendor rates before you award." },
  { icon: Undo2, title: "Reorder suggestions", body: "Draft the next MR or PR from usage and lead time." },
];

export const supplyChainCta = {
  title: "One Platform. Every Material. Total Control.",
  body: "Book a demo and see how ZedOps runs requests, stock, procurement, and delivery in one system.",
  primary: { label: "Book a Demo", href: "/early-access" },
} as const;

export const supplyChainDashboardData: DashboardData = {
  projectName: "Dubai Mall",
  title: "Supply Chain Dashboard",
  subtitle: "Dubai Mall Expansion",

  accent: "bg-white",
  activeTab: "Supply Chain",

  floatingCards: {
    progress: "Supply Progress",
    insights: "Material Insights",
    upcoming: "Incoming Deliveries",
    alerts: "Supply Alerts",
  },

  kpis: [
    { label: "TOTAL REQUESTS", value: "1,286", description: "Material requests" },
    { label: "PENDING APPROVALS", value: "156", description: "Awaiting review" },
    { label: "IN TRANSIT", value: "84", description: "On the way" },
    { label: "ON-TIME DELIVERY", value: "92%", description: "Delivery rate" },
    { label: "STOCK VALUE", value: "$2.1M", description: "Current inventory" },
  ],

  progress: { value: "78%", planned: "85%", actual: "78%" },

  insights: [
    { title: "5 materials at risk", description: "Lead time exceeding 14 days." },
    { title: "Vendor performance", description: "92% on-time delivery this month." },
  ],

  upcoming: [
    { title: "Steel Delivery", description: "Structural phase 2", date: "24 Jul" },
    { title: "HVAC Units", description: "MEP equipment", date: "28 Jul" },
    { title: "Finishes Materials", description: "Level 2 tiles", date: "02 Aug" },
  ],

  alerts: [
    { title: "Stock shortage", description: "Cement below minimum level." },
    { title: "Price increase", description: "Steel prices up 8% from supplier." },
    { title: "Delivery delay", description: "Glass panels delayed 5 days." },
  ],

  mainSections: [
    {
      kind: "bars",
      title: "Material Requests by Status",
      items: [
        { label: "Delivered", value: "1046" },
        { label: "Pending", value: "156" },
        { label: "In Transit", value: "84" },
      ],
    },
    {
      kind: "stat-grid",
      title: "Inventory by Category",
      columns: 3,
      items: [
        { label: "Structural", value: "$820k" },
        { label: "MEP", value: "$640k" },
        { label: "Finishes", value: "$410k" },
        { label: "Consumables", value: "$140k" },
        { label: "Safety", value: "$90k" },
        { label: "Total", value: "$2.1M" },
      ],
    },
  ],

  activity: [
    { text: "Material request raised", action: "created" },
    { text: "Delivery received", action: "updated" },
    { text: "Stock level alert", action: "alert" },
    { text: "PO approved", action: "created" },
  ],
};
