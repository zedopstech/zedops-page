import {
  BadgeCheck,
  ClipboardCheck,
  Eye,
  FileText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import ModulePatternLanding, { type ModulePatternPage } from "@/components/ModulePatternLanding";

const page: ModulePatternPage = {
  hero: {
    eyebrow: "Construction Execution",
    titleLead: "Quality & ",
    titleAccent: "Safety",
    tagline: "Inspections, checklists, incidents & compliance.",
    subtitle: "Placeholder page — inspections, observations, and incidents on the same job record. Replace this copy later.",
  },
  highlights: [
    { icon: ShieldCheck, label: "Inspections" },
    { icon: ClipboardCheck, label: "Checklists" },
    { icon: FileText, label: "Incidents" },
    { icon: BadgeCheck, label: "Compliance" },
  ],
  featuresTitleLead: "Everything you need for ",
  featuresTitleAccent: "quality & safety",
  featuresSubtitle: "Placeholder capabilities — edit this section when the real QHSE page is ready.",
  features: [
    { icon: ShieldCheck, title: "Inspections", bullets: ["Run from templates", "Photos and notes", "Link corrective actions", "Tie to daily logs"] },
    { icon: ClipboardCheck, title: "Checklists", bullets: ["Reusable forms", "Required fields", "Consistent scoring", "History preserved"] },
    { icon: FileText, title: "Incidents", bullets: ["What happened and when", "Who was involved", "Follow-up and reporting", "Audit-ready timeline"] },
    { icon: BadgeCheck, title: "Compliance", bullets: ["Standard criteria", "Evidence on record", "Ready for regulators", "Same job thread"] },
  ],
  workflowTitleLead: "QHSE ",
  workflowTitleAccent: "workflow",
  workflowSubtitle: "Placeholder path — replace with the real inspection and incident flow later.",
  workflow: [
    { icon: ClipboardCheck, title: "Use checklist", description: "Standard forms" },
    { icon: ShieldCheck, title: "Inspect / observe", description: "Walk the work" },
    { icon: FileText, title: "Log incidents", description: "Safety record" },
    { icon: UserCheck, title: "Assign actions", description: "Owners and due dates" },
    { icon: Eye, title: "Review evidence", description: "Photos and notes" },
    { icon: BadgeCheck, title: "Close the loop", description: "Compliance ready" },
  ],
  whyTitle: "Why teams choose ZedOps QHSE",
  why: [
    { icon: ShieldCheck, title: "Standard inspections", desc: "Same criteria every walk." },
    { icon: ClipboardCheck, title: "Checklists that stick", desc: "No improvised paper forms." },
    { icon: FileText, title: "Incident trail", desc: "Ready when insurance asks." },
    { icon: BadgeCheck, title: "Compliance evidence", desc: "Photos and owners on record." },
  ],
  aiSoon: [
    { icon: Sparkles, title: "Smart drafts", body: "Placeholder — AI drafts from live project data." },
    { icon: Eye, title: "Risk cues", body: "Placeholder — surface issues before they escalate." },
    { icon: TrendingUp, title: "Look-ahead", body: "Placeholder — next-step suggestions from current work." },
    { icon: BadgeCheck, title: "Missing fields", body: "Placeholder — prompt when records are incomplete." },
  ],
  callout: {
    eyebrow: "Coming soon",
    title: "Quality and safety. Preview page.",
    body: "Replace this page with the full inspection, checklist, and incident story when ready.",
  },
  cta: {
    title: "See QHSE on your jobs.",
    accent: "Book a demo.",
    body: "Inspections, checklists, and incidents in one walkthrough.",
  },
};

export default function QualitySafetyLanding(_props: {
  prev: Pick<PlatformFeatureSection, "id" | "title"> | null;
  next: Pick<PlatformFeatureSection, "id" | "title"> | null;
}) {
  return <ModulePatternLanding page={page} idPrefix="quality-safety" />;
}
