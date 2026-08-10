import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  ShoppingCart,
  Users,
  Package,
  Warehouse,
  Truck,
  FileBarChart,
  FileText,
  FileSignature,
  Timer,
  SearchCheck,
  Undo2,
  Boxes,
  QrCode,
  LayoutDashboard,
  Eye,
  Shield,
  Clock,
  Recycle,
  PiggyBank,
  LineChart,
  Send,
  BadgeCheck,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";

export const supplyChainHero = {
  eyebrow: "Material Management",
  titleLead: "Right Material. Right Time.",
  titleAccent: "Right Place.",
  subtitle:
    "Procurement, inventory, and site delivery in one system for MEP teams.",
  imageSrc: "/platform/material-management.png",
  imageAlt: "ZedOps material management overview",
} as const;

export type SupplyChainCapability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type SupplyChainCapabilityGroup = {
  id: string;
  label: string;
  items: SupplyChainCapability[];
};

export const supplyChainCapabilityGroups: SupplyChainCapabilityGroup[] = [
  {
    id: "plan-buy",
    label: "Plan & buy",
    items: [
      {
        icon: ClipboardList,
        title: "Material Requests",
        description: "Create MR, PR, and TR with multi-level approvals.",
      },
      {
        icon: ShoppingCart,
        title: "Procurement Management",
        description: "Run RFQ, PO, and purchase workflows in one place.",
      },
      {
        icon: Users,
        title: "Vendor Management",
        description: "Track vendors, performance, and purchase history.",
      },
    ],
  },
  {
    id: "move-store",
    label: "Move & store",
    items: [
      {
        icon: Package,
        title: "Inventory Management",
        description: "See live stock across projects and warehouses.",
      },
      {
        icon: Warehouse,
        title: "Warehouse Management",
        description: "Manage warehouses, locations, and bin levels.",
      },
      {
        icon: Truck,
        title: "Material Tracking",
        description: "Follow material movement from PO to site.",
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    items: [
      {
        icon: PackageCheck,
        title: "Stock Management",
        description: "Verify physical stock and track consumption.",
      },
      {
        icon: FileBarChart,
        title: "Reports & Analytics",
        description: "Get live insights and custom supply reports.",
      },
    ],
  },
];

/** Flat list kept for any consumers that still map a single array. */
export const supplyChainCapabilities: SupplyChainCapability[] =
  supplyChainCapabilityGroups.flatMap((group) => group.items);

export type SupplyChainWorkflowStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const supplyChainWorkflow: SupplyChainWorkflowStep[] = [
  { icon: ClipboardList, title: "Material Request", description: "Create MR / PR / TR" },
  { icon: BadgeCheck, title: "Approval", description: "Multi-level approvals" },
  { icon: FileSignature, title: "Purchase Order", description: "Raise PO to vendor" },
  { icon: Send, title: "Vendor Confirmation", description: "Confirm delivery schedule" },
  { icon: Truck, title: "Delivery to Site", description: "Track shipment & delivery" },
  { icon: SearchCheck, title: "Goods Receipt (GRN)", description: "Inspect & receive goods" },
  { icon: Boxes, title: "Inventory Update", description: "Update stock in real-time" },
];

export type SupplyChainFeaturePreview =
  | "rfq"
  | "po"
  | "workflow"
  | "returns"
  | "inventory"
  | "dashboard";

export type SupplyChainFeature = SupplyChainCapability & {
  detail: string;
  usedIn: string;
  preview: SupplyChainFeaturePreview;
};

export const supplyChainFeatures: SupplyChainFeature[] = [
  {
    icon: FileText,
    title: "RFQ Management",
    description: "Create, compare and award RFQs.",
    detail: "Send RFQs, compare vendor quotes side-by-side, and award with a clear audit trail before the PO is raised.",
    usedIn: "Request → RFQ → PO",
    preview: "rfq",
  },
  {
    icon: FileSignature,
    title: "PO & Contract Mgmt",
    description: "Manage POs, contracts and variations.",
    detail: "Issue purchase orders, track variations, and keep contract terms tied to the project and vendor.",
    usedIn: "Approval → PO → Delivery",
    preview: "po",
  },
  {
    icon: Timer,
    title: "Workflows",
    description: "Route approvals your way.",
    detail: "Configure multi-level approvals and handoffs so material, purchase, and transfer requests follow your rules.",
    usedIn: "MR → Approval → Action",
    preview: "workflow",
  },
  {
    icon: Undo2,
    title: "Returns Management",
    description: "Handle returns and credit notes.",
    detail: "Process returns, replacements, and credit notes without losing the trail from the original PO.",
    usedIn: "Receive → Return → Credit",
    preview: "returns",
  },
  {
    icon: Boxes,
    title: "Inventory Management",
    description: "See live stock across projects and warehouses.",
    detail: "Manage warehouses, locations, and bin levels.",
    usedIn: "PO → Warehouse → Site",
    preview: "inventory",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Reports",
    description: "Live dashboards and reports.",
    detail: "Monitor open requests, delayed POs, and inventory health with reports you can share with the team.",
    usedIn: "Ops → Insight → Action",
    preview: "dashboard",
  },
];

export const supplyChainMobile = {
  title: "Mobile App for Material Management",
  subtitle:
    "Keep material work moving from the site — raise requests, clear approvals, and check stock without waiting on a desktop.",
  body: "ZedOps mobile gives supervisors and field teams the actions they need on site, synced to the same Material Management data your office uses.",
  phones: [
    {
      src: "/platform/phone-material-request1.png",
      alt: "ZedOps Material Request mobile screen",
    },
    {
      src: "/platform/phone-approvals1.png",
      alt: "ZedOps Approvals mobile screen",
    },
  ],
  bullets: [
    {
      title: "Raise material requests",
      description: "Create MRs from site with project context and item details.",
    },
    {
      title: "Approve requests",
      description: "Review and clear pending approvals without leaving the field.",
    },
    {
      title: "Easy multi-level approval",
      description: "See what’s waiting on you and move work to the next step.",
    },
    {
      title: "Track request status",
      description: "Follow open vs approved requests in one mobile list.",
    },

    {
      title: "View inventory levels",
      description: "Check what’s available before you raise the next request.",
    },
  ],
} as const;

export const supplyChainBenefits: SupplyChainCapability[] = [
  {
    icon: Eye,
    title: "End-to-End Visibility",
    description: "Complete visibility from request to site delivery.",
  },
  {
    icon: Shield,
    title: "Better Control",
    description: "Better control over materials, costs and suppliers.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Ensure materials arrive on time, every time.",
  },
  {
    icon: Recycle,
    title: "Reduced Wastage",
    description: "Optimize inventory and reduce material wastage.",
  },
  {
    icon: PiggyBank,
    title: "Cost Savings",
    description: "Negotiate better and reduce procurement costs.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Decisions",
    description: "Make informed decisions with real-time data.",
  },
];

export const supplyChainCta = {
  title: "Streamline Material Management. Deliver Projects On Time.",
  body: "See how ZedOps Material Management can help you optimize procurement, inventory and delivery.",
} as const;
