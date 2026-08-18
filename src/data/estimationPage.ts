import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpen,
  Calculator,
  ClipboardCheck,
  Coins,
  FileStack,
  FileText,
  GitBranch,
  Layers,
  Lightbulb,
  ListChecks,
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

export const estimationHero = {
  eyebrow: "Pre-Construction",
  titleLead: "Estimation & ",
  titleAccent: "Proposals",
  tagline: "Estimate Faster. Bid Smarter. Win More Projects.",
  subtitle:
    "Build accurate BOQ-based estimates, apply productivity and markups, and turn them into client-ready proposals — all in one ZedOps workspace.",
  primaryCta: { label: "Book a Demo", href: "/early-access" },
  imageSrc: "/estimation dashboard.png",
  imageAlt: "ZedOps estimation dashboard with cost summary, trends, and recent estimates",
} as const;

export const estimationBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Target, label: "Accurate Estimates" },
  { icon: Timer, label: "Faster Turnaround" },
  { icon: BadgeCheck, label: "Better Control" },
  { icon: TrendingUp, label: "Win More Projects" },
];

export type EstimationFeatureTone = "blue" | "orange" | "green" | "purple" | "rose" | "teal";

export const estimationFeatures: {
  icon: LucideIcon;
  title: string;
  tone: EstimationFeatureTone;
  bullets: string[];
}[] = [
  {
    icon: ScanSearch,
    title: "Smart BOQ Mapping",
    tone: "orange",
    bullets: [
      "Import client BOQ from Excel or CSV",
      "Map lines to library items and cost codes",
      "Match units and flag unmapped rows",
      "Reuse mappings on the next tender",
    ],
  },
  {
    icon: Calculator,
    title: "Productivity-Based Estimation",
    tone: "blue",
    bullets: [
      "Labour from approved productivity norms",
      "Crew mix, output rates, and durations",
      "Quantities drive hours — not guesswork",
      "Stay aligned with the organisation library",
    ],
  },
  {
    icon: Percent,
    title: "Cost Management",
    tone: "green",
    bullets: [
      "Material, labour, equipment, and overheads",
      "Markups by package or cost type",
      "Live totals as the estimate changes",
      "Cost codes that match how you report",
    ],
  },
  {
    icon: FileText,
    title: "Commercial Proposal Builder",
    tone: "purple",
    bullets: [
      "Turn the estimate into a client proposal",
      "Scope, exclusions, and assumptions in one place",
      "Branded templates for consistent bids",
      "Export PDF ready for submission",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow & Approvals",
    tone: "rose",
    bullets: [
      "Draft → review → approved in a clear path",
      "Role-based sign-off before it goes out",
      "Status visible to estimators and commercial",
      "Full trail of who changed what",
    ],
  },
  {
    icon: GitBranch,
    title: "Revision Management",
    tone: "teal",
    bullets: [
      "Version every bid round without losing history",
      "Compare revisions side by side",
      "Lock approved estimates before issue",
      "Defend numbers in client meetings",
    ],
  },
];

export const estimationWorkflow: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Upload, title: "Upload BOQ", description: "Receive from Client" },
  { icon: ListChecks, title: "Map BOQ Items", description: "Match with Library" },
  { icon: Calculator, title: "Estimate Materials", description: "Add Items & Quantities" },
  { icon: Users, title: "Load Productivity", description: "Auto Resources & Manhours" },
  { icon: Coins, title: "Apply Markups", description: "Cost Summary" },
  { icon: ClipboardCheck, title: "Prepare Proposal", description: "BOQ or Lump Sum" },
  { icon: ShieldCheck, title: "Review & Approve", description: "Internal Workflow" },
  { icon: Send, title: "Submit to Client", description: "Manage Revisions" },
];

export const estimationWhy: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BookOpen, title: "Library-backed rates", desc: "Approved data for every bid." },
  { icon: ScanSearch, title: "BOQ mapping", desc: "Cuts rework on repeat tenders." },
  { icon: Percent, title: "Markups & commercial terms", desc: "Live in the same estimate." },
  { icon: GitBranch, title: "Revision history", desc: "Explain every bid round." },
  { icon: Layers, title: "One platform", desc: "From estimate through delivery." },
];

export const estimationAiSoon: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Sparkles, title: "Auto BOQ mapping", body: "Suggest library matches from item descriptions and historical bids." },
  { icon: ScanSearch, title: "Rate anomaly checks", body: "Flag lines that sit well outside typical rates for that trade." },
  { icon: TrendingUp, title: "Win-probability cues", body: "Surface how similar bids performed before you submit." },
  { icon: FileStack, title: "Proposal drafts", body: "Draft scope and exclusion language from the live estimate." },
];

export const estimationCallout = {
  icon: Lightbulb,
  eyebrow: "Connected estimating",
  title: "One Platform. All Estimations. Complete Control.",
  body: "BOQ, productivity, markups, and proposals live next to the same library and project record you’ll run after you win — so the bid is not a dead spreadsheet.",
} as const;

export const estimationCta = {
  title: "Create Accurate Estimates. Win More Projects.",
  body: "Book a personalized demo and see how ZEDOPS helps you estimate faster, control cost, and submit stronger proposals.",
  primary: { label: "Book a Demo", href: "/early-access" },
} as const;
