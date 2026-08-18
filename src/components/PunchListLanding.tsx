import {
  BadgeCheck,
  Camera,
  Eye,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import ModulePatternLanding, { type ModulePatternPage } from "@/components/ModulePatternLanding";

const page: ModulePatternPage = {
  hero: {
    eyebrow: "Project Closeout",
    titleLead: "Punch List ",
    titleAccent: "Management",
    tagline: "Track, assign & close punch items efficiently.",
    subtitle: "Placeholder page — snags with photos, owners, and status through handover. Replace this copy later.",
  },
  highlights: [
    { icon: ListChecks, label: "Track items" },
    { icon: UserCheck, label: "Assign owners" },
    { icon: Camera, label: "Photos" },
    { icon: Target, label: "Close snags" },
  ],
  featuresTitleLead: "Everything you need to ",
  featuresTitleAccent: "close punch",
  featuresSubtitle: "Placeholder capabilities — edit this section when the real punch page is ready.",
  features: [
    { icon: ListChecks, title: "Track punch items", bullets: ["Create snags on walkthrough", "Location and trade", "Open vs closed", "One job list"] },
    { icon: UserCheck, title: "Assign & follow up", bullets: ["Owners and due dates", "Comments on the item", "Notify the right trade", "No email chase"] },
    { icon: Camera, title: "Photos & evidence", bullets: ["Before and after", "Attached to the item", "Visible to office", "Ready for handover"] },
    { icon: Target, title: "Close efficiently", bullets: ["Sign-off on site", "Measurable closeout", "Fewer last-minute loops", "Owner-ready pack"] },
  ],
  workflowTitleLead: "Punch ",
  workflowTitleAccent: "workflow",
  workflowSubtitle: "Placeholder path — replace with the real punch closeout flow later.",
  workflow: [
    { icon: ListChecks, title: "Walk the work", description: "Raise snags" },
    { icon: Camera, title: "Add photos", description: "Evidence on item" },
    { icon: UserCheck, title: "Assign owners", description: "Trade and due date" },
    { icon: Eye, title: "Track status", description: "Open vs closed" },
    { icon: Target, title: "Re-inspect", description: "Confirm fix" },
    { icon: BadgeCheck, title: "Sign off", description: "Ready for handover" },
  ],
  whyTitle: "Why teams choose ZedOps punch",
  why: [
    { icon: ListChecks, title: "One punch list", desc: "Every snag on the same job." },
    { icon: UserCheck, title: "Clear owners", desc: "Trades know what is still open." },
    { icon: Camera, title: "Photo evidence", desc: "Before and after on the item." },
    { icon: BadgeCheck, title: "Handover-ready", desc: "Closeout is measurable." },
  ],
  aiSoon: [
    { icon: Sparkles, title: "Smart drafts", body: "Placeholder — AI drafts from live project data." },
    { icon: Eye, title: "Risk cues", body: "Placeholder — surface issues before they escalate." },
    { icon: TrendingUp, title: "Look-ahead", body: "Placeholder — next-step suggestions from current work." },
    { icon: BadgeCheck, title: "Missing fields", body: "Placeholder — prompt when records are incomplete." },
  ],
  callout: {
    eyebrow: "Coming soon",
    title: "Punch list management. Preview page.",
    body: "Replace this page with the full track, assign, and close punch story when ready.",
  },
  cta: {
    title: "See punch on your jobs.",
    accent: "Book a demo.",
    body: "Walk through snags, owners, and closeout with the team.",
  },
};

export default function PunchListLanding(_props: {
  prev: Pick<PlatformFeatureSection, "id" | "title"> | null;
  next: Pick<PlatformFeatureSection, "id" | "title"> | null;
}) {
  return <ModulePatternLanding page={page} idPrefix="punch-list" />;
}
