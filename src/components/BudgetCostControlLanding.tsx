import {
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  Eye,
  FileText,
  Landmark,
  Sparkles,
  Timer,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import ModulePatternLanding, { type ModulePatternPage } from "@/components/ModulePatternLanding";

const page: ModulePatternPage = {
  hero: {
    eyebrow: "Construction Execution",
    titleLead: "Budget & ",
    titleAccent: "Cost Control",
    tagline: "Track budgets, actuals, commitments & cash flow.",
    subtitle: "Placeholder page — budget, changes, commitments, and pay apps on one commercial record. Replace this copy later.",
  },
  highlights: [
    { icon: Landmark, label: "Budgets" },
    { icon: Wallet, label: "Actuals" },
    { icon: FileText, label: "Commitments" },
    { icon: TrendingUp, label: "Cash flow" },
  ],
  featuresTitleLead: "Everything you need for ",
  featuresTitleAccent: "cost control",
  featuresSubtitle: "Placeholder capabilities — edit this section when the real budget page is ready.",
  features: [
    { icon: Landmark, title: "Budgets", bullets: ["Cost-code structure", "Baseline vs forecast", "Same codes as posting", "Honest variance"] },
    { icon: Wallet, title: "Actuals & commitments", bullets: ["What is spent", "What is committed", "Live exposure", "No month-end surprise"] },
    { icon: FileText, title: "Change orders", bullets: ["Scope additions", "Deductions and status", "Link to budget", "Contract value stays aligned"] },
    { icon: Timer, title: "Cash flow", bullets: ["Progress billing", "Retention visible", "Pay-app packs", "Track status"] },
  ],
  workflowTitleLead: "Cost ",
  workflowTitleAccent: "workflow",
  workflowSubtitle: "Placeholder path — replace with the real budget and cash-flow later.",
  workflow: [
    { icon: Landmark, title: "Set budget", description: "Cost codes" },
    { icon: BarChart3, title: "Track actuals", description: "Spend vs plan" },
    { icon: Wallet, title: "See commitments", description: "POs and contracts" },
    { icon: FileText, title: "Raise change", description: "Scope shifts" },
    { icon: ClipboardCheck, title: "Revise baseline", description: "Controlled versions" },
    { icon: Timer, title: "Manage cash flow", description: "Pay apps" },
  ],
  whyTitle: "Why commercial teams choose ZedOps",
  why: [
    { icon: Landmark, title: "Same cost codes", desc: "Budget matches how you post." },
    { icon: Wallet, title: "Live exposure", desc: "Actuals and commitments together." },
    { icon: FileText, title: "Change trail", desc: "Contract value stays honest." },
    { icon: TrendingUp, title: "Cash-flow view", desc: "Pay apps without a second tool." },
  ],
  aiSoon: [
    { icon: Sparkles, title: "Smart drafts", body: "Placeholder — AI drafts from live project data." },
    { icon: Eye, title: "Risk cues", body: "Placeholder — surface issues before they escalate." },
    { icon: TrendingUp, title: "Look-ahead", body: "Placeholder — next-step suggestions from current work." },
    { icon: BadgeCheck, title: "Missing fields", body: "Placeholder — prompt when records are incomplete." },
  ],
  callout: {
    eyebrow: "Coming soon",
    title: "Budget and cost control. Preview page.",
    body: "Replace this page with the full budget, actuals, and cash-flow story when ready.",
  },
  cta: {
    title: "See cost control on your jobs.",
    accent: "Book a demo.",
    body: "Budget, commitments, and cash flow in one walkthrough.",
  },
};

export default function BudgetCostControlLanding(_props: {
  prev: Pick<PlatformFeatureSection, "id" | "title"> | null;
  next: Pick<PlatformFeatureSection, "id" | "title"> | null;
}) {
  return <ModulePatternLanding page={page} idPrefix="budget" />;
}
