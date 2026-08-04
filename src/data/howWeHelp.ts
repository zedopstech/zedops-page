import type { LucideIcon } from "lucide-react";
import { HardHat, Building2, ClipboardList, Briefcase, Users2, LineChart, ShieldCheck, Calculator } from "lucide-react";
export const howWeHelpHubLinks = [
  {
    href: "/how-we-help/project-stage",
    title: "By project stage",
    desc: "Preconstruction, active construction, and closeout - what matters in each phase and which modules show up when.",
    accent: "#0052CC",
    Icon: LineChart,
  },
  {
    href: "/how-we-help/company",
    title: "By company type",
    desc: "General contractors, owners, consultants, and delivery models - how ZedOps fits your organisation, not the other way around.",
    accent: "#172B4D",
    Icon: Building2,
  },
  {
    href: "/how-we-help/team",
    title: "By team",
    desc: "Field, project office, commercial, and leadership - surface the right workflows for each group inside the same tenant.",
    accent: "#00875A",
    Icon: Users2,
  },
  {
    href: "/how-we-help/role",
    title: "Roles & permissions",
    desc: "How application roles gate menus, records, exports, and Zed AI - without a second set of persona pages.",
    accent: "#6554C0",
    Icon: ShieldCheck,
  },
] as const;

export type ProjectStageId = "preconstruction" | "construction" | "closeout";

export type ProjectStageBlock = {
  id: ProjectStageId;
  title: string;
  tagline: string;
  body: string;
  outcomes: string[];
  platformPath: string;
  platformLabel: string;
};

export const projectStages: ProjectStageBlock[] = [
  {
    id: "preconstruction",
    title: "Preconstruction",
    tagline: "Estimate, plan, and align before shovels hit the ground.",
    body: "Library data, structured estimating inputs, and planning artefacts stay in one place so bid teams and operations aren’t reconciling conflicting spreadsheets. When you win the job, the same thread carries into execution without re-keying everything.",
    outcomes: [
      "Shared library for labour, materials, equipment, and productivity assumptions",
      "Planning and scheduling context linked to how you’ll run the project",
      "Cleaner handoff from bid rationale to project setup and procurement",
    ],
    platformPath: "/platform/planning-execution",
    platformLabel: "Planning & execution modules",
  },
  {
    id: "construction",
    title: "Construction",
    tagline: "Execution, supply chain, and information flow in real time.",
    body: "Projects, daily logs, tasks, RFIs, materials, equipment, and finance hooks share one record. Field teams capture truth on site; the office sees the same numbers and documents without chasing threads across tools.",
    outcomes: [
      "Mobile-first logging tied to the active project context",
      "Supply chain and site activity visible next to schedule and cost signals",
      "Documents, drawings, and correspondence anchored to what’s happening now",
    ],
    platformPath: "/platform/projects",
    platformLabel: "Projects & field execution",
  },
  {
    id: "closeout",
    title: "Closeout",
    tagline: "Punch, quality, handover, and exports without losing the trail.",
    body: "Inspections, punch lists, and safety histories stay attached to the job as you finish. Reporting and PDF exports pull from the same governed data leaders and owners already trusted during construction.",
    outcomes: [
      "Structured inspections and punch tracked through resolution",
      "Quality and safety evidence organised for turnover and audits",
      "Reporting packs assembled from live data, not weekend rewrites",
    ],
    platformPath: "/platform/quality-safety-closeout",
    platformLabel: "Quality, safety & closeout",
  },
];

export type CompanyArchetype = {
  icon: LucideIcon;
  title: string;
  tag: string;
  summary: string;
  bullets: string[];
  href: string;
  accent: string;
};

export const companyArchetypes: CompanyArchetype[] = [
  {
    icon: HardHat,
    title: "General contractors & builders",
    tag: "Delivery",
    summary:
      "You run multiple jobs with mixed crews and subs. ZedOps is the execution layer - projects, logs, procurement signals, and QHSE - so supers, PMs, and the back office aren’t maintaining parallel systems.",
    bullets: ["Portfolio of projects with consistent field capture", "Role-aware menus for site vs office", "Zed AI grounded in projects you already have access to"],
    href: "/who-we-serve/general-contractors",
    accent: "#172B4D",
  },
  {
    icon: Building2,
    title: "Owners & developers",
    tag: "Capital",
    summary:
      "You need confidence across budgets, change, and schedule without sitting in every submittal queue. Governed visibility and exports match what capital partners should see - no accidental exposure of subcontractor-level detail.",
    bullets: ["Portfolio and project analytics where enabled", "Financial and document views scoped by role", "Board-ready reporting without manual deck assembly"],
    href: "/who-we-serve/owners",
    accent: "#0052CC",
  },
  {
    icon: Briefcase,
    title: "Consultants & construction managers",
    tag: "Multi-client",
    summary:
      "Tenant isolation and per-client permissions matter. Run oversight, correspondence, and reporting across engagements while keeping each owner’s data in its own lane.",
    bullets: ["Repeatable workflows per client engagement", "Exports and dashboards tuned to your scope", "Zed AI answers only from permitted context"],
    href: "/who-we-serve/consultants",
    accent: "#6554C0",
  },
  {
    icon: Calculator,
    title: "Preconstruction & estimating teams",
    tag: "Commercial",
    summary:
      "Estimator workflows lean on library fidelity and clean assumptions. When commercial and operations share one library hub, pricing and field reality drift less between bid and build.",
    bullets: ["Central library for engineering, labour, and equipment norms", "Handoff hooks from planning into active projects", "Less duplication between estimating and PM systems"],
    href: "/platform/core",
    accent: "#FE5D02",
  },
];

export type TeamFocus = {
  icon: LucideIcon;
  title: string;
  tag: string;
  summary: string;
  relatedPath: string;
  relatedLabel: string;
  accent: string;
};

export const teamFocusAreas: TeamFocus[] = [
  {
    icon: HardHat,
    title: "Field & site",
    tag: "Site-first",
    summary: "Capture logs, tasks, and photos on the job - without wrestling a desktop ERP.",
    relatedPath: "/who-we-serve/general-contractors",
    relatedLabel: "GC workflows",
    accent: "#172B4D",
  },
  {
    icon: ClipboardList,
    title: "Project & delivery office",
    tag: "Coordination",
    summary: "RFIs, issues, and documents sit next to what the field already logged.",
    relatedPath: "/who-we-serve/project-managers",
    relatedLabel: "PM workflows",
    accent: "#0052CC",
  },
  {
    icon: LineChart,
    title: "Commercial, finance & procurement",
    tag: "Margin",
    summary: "Costs and commitments roll up so variance conversations start sooner.",
    relatedPath: "/platform/finance",
    relatedLabel: "Finance modules",
    accent: "#FE5D02",
  },
  {
    icon: ShieldCheck,
    title: "Quality, safety & compliance",
    tag: "Assurance",
    summary: "Inspections and evidence that still make sense at closeout and audit time.",
    relatedPath: "/platform/quality-safety-closeout",
    relatedLabel: "QHSE modules",
    accent: "#00875A",
  },
  {
    icon: Users2,
    title: "Leadership & portfolio",
    tag: "Executive",
    summary: "Rollups and exports for boards and lenders - without every menu in the way.",
    relatedPath: "/who-we-serve/owners",
    relatedLabel: "Owner views",
    accent: "#6554C0",
  },
];

