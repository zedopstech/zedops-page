import {
  BadgeCheck,
  BookOpen,
  Building2,
  Eye,
  FolderKanban,
  FolderOpen,
  Layers,
  Sparkles,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import ModulePatternLanding, { type ModulePatternPage } from "@/components/ModulePatternLanding";

const page: ModulePatternPage = {
  hero: {
    eyebrow: "Platform Core",
    titleLead: "Platform ",
    titleAccent: "Core",
    tagline: "Documents, library, workflow, directory, company, projects, users & admin.",
    subtitle: "Placeholder page — the shared system of record every other module uses. Replace this copy later.",
  },
  highlights: [
    { icon: FolderOpen, label: "Documents" },
    { icon: BookOpen, label: "Library" },
    { icon: Users, label: "Directory" },
    { icon: UserCog, label: "Users & admin" },
  ],
  featuresTitleLead: "Everything in ",
  featuresTitleAccent: "platform core",
  featuresSubtitle: "Placeholder capabilities — edit this section when the real Core page is ready.",
  features: [
    { icon: FolderOpen, title: "Documents", bullets: ["Project folders", "Contracts and photos", "Version discipline", "Permissioned access"] },
    { icon: BookOpen, title: "Library", bullets: ["Materials and labour", "Productivity and overheads", "Tools and equipment", "Shared with estimating"] },
    { icon: Users, title: "Directory", bullets: ["Employees and contacts", "Resolve owners", "Keep people current", "Use across projects"] },
    { icon: Building2, title: "Company & projects", bullets: ["Organisation profile", "All jobs in one list", "Users and admin", "Workflow defaults"] },
  ],
  workflowTitleLead: "Core ",
  workflowTitleAccent: "workflow",
  workflowSubtitle: "Placeholder path — replace with the real Core flow later.",
  workflow: [
    { icon: Building2, title: "Set company", description: "Profile and defaults" },
    { icon: Users, title: "Build directory", description: "People and contacts" },
    { icon: UserCog, title: "Invite users", description: "Roles and admin" },
    { icon: FolderKanban, title: "Create projects", description: "Jobs to run" },
    { icon: BookOpen, title: "Load library", description: "Rates and norms" },
    { icon: Layers, title: "Connect modules", description: "Estimate and execute" },
  ],
  whyTitle: "Why teams choose ZedOps core",
  why: [
    { icon: Layers, title: "One foundation", desc: "Every module shares the same record." },
    { icon: FolderOpen, title: "Documents in context", desc: "Files sit on the job, not in email." },
    { icon: BookOpen, title: "Shared library", desc: "Estimate and site use the same data." },
    { icon: Users, title: "One directory", desc: "People resolve on every job." },
  ],
  aiSoon: [
    { icon: Sparkles, title: "Smart drafts", body: "Placeholder — AI drafts from live project data." },
    { icon: Eye, title: "Risk cues", body: "Placeholder — surface issues before they escalate." },
    { icon: TrendingUp, title: "Look-ahead", body: "Placeholder — next-step suggestions from current work." },
    { icon: BadgeCheck, title: "Missing fields", body: "Placeholder — prompt when records are incomplete." },
  ],
  callout: {
    eyebrow: "Coming soon",
    title: "Platform core. Preview page.",
    body: "Replace this page with the full documents, library, directory, and admin story when ready.",
  },
  cta: {
    title: "See core on your workspace.",
    accent: "Book a demo.",
    body: "Walk through documents, library, directory, and admin with the team.",
  },
};

export default function CoreLanding(_props: {
  prev: Pick<PlatformFeatureSection, "id" | "title"> | null;
  next: Pick<PlatformFeatureSection, "id" | "title"> | null;
}) {
  return <ModulePatternLanding page={page} idPrefix="core" />;
}
