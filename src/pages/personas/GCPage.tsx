import { useSEO } from "@/hooks/useSEO";
import { HardHat, AlertTriangle, Layers, Clock, BarChart2, FileText, ListChecks, ClipboardList } from "lucide-react";
import PersonaTemplate from "@/components/PersonaTemplate";
import type { Feature } from "@/components/PersonaTemplate";

const challenges = [
  {
    icon: Layers,
    title: "One job, six systems",
    desc: "Project equipment, materials, work logs, and issues live in different places than your schedule and financial view. Nobody sees the same picture of the job.",
  },
  {
    icon: AlertTriangle,
    title: "Field data never catches the office in time",
    desc: "Daily logs, surveys, and site photos sit in inboxes or paper. By the time they are in a report, the crew has already moved on.",
  },
  {
    icon: Clock,
    title: "Supply chain and site are out of sync",
    desc: "POs, goods receipt, inventory, and material tracking run on one track; the site runs on another. Chasing what was delivered versus what was installed is a weekly ritual.",
  },
];

const features: Feature[] = [
  {
    icon: BarChart2,
    title: "Projects, analytics, and execution in one hub",
    desc: "Manage the project record in depth: list or drill into a job, run analytics where enabled, track equipment and materials on the project, log issues and concerns, assign surveys, and tie work logs to activity  -  without exporting to a second tool.",
    badge: "Projects",
    mockType: "dashboard",
    mockScenario: "gc-project-hub",
  },
  {
    icon: FileText,
    title: "Daily logs the way the field actually works",
    desc: "Per-project daily log workflow from the app chrome, with a project picker when none is selected. Crews capture what happened on site; the office reviews in the same thread as documents and tasks.",
    badge: "Field",
    mockType: "log",
    mockScenario: "gc-daily-log",
  },
  {
    icon: ClipboardList,
    title: "Planning: estimation, schedule, and tasks",
    desc: "Build estimates against your library and cost structure, plan timelines, and run task boards with assignments and workflows  -  including exports where your process needs them.",
    badge: "Planning",
    mockType: "schedule",
    mockScenario: "gc-planning",
  },
  {
    icon: ListChecks,
    title: "Quality, safety, and closeout",
    desc: "Inspections from templates with daily-log links and action tasks, configurable inspection templates, punch lists and walkthroughs, plus incident reporting  -  so closeout is not a separate scramble.",
    badge: "QHSE",
    mockType: "list",
    mockScenario: "gc-qhse",
  },
];

export default function GCPage() {
  useSEO({
    title: "ZedOps for General Contractors",
    description:
      "ZedOps for GCs: projects, equipment, materials, work logs, daily logs, estimation, schedule, tasks, supply chain, finance hooks, inspections, punch list, and the Zed AI copilot  -  with role-based access.",
  });

  return (
    <PersonaTemplate
      heroImage="/Persona/site-supervisor.jpg"
      imageAlt="General contractor reviewing site plans"
      pill="General Contractors"
      PillIcon={HardHat}
      title="Run the job on one platform  -  from logs to ledger."
      subtitle="Projects, field logs, planning, documents, procurement, and quality workflows connected in ZedOps. What each superintendent, PM, or accountant sees is controlled by roles and permissions."
      quote="We have a tool for POs, another for daily reports, and spreadsheets for everything else. I spend half my week reconciling them instead of building."
      quoteAttribution="What GCs tell us, again and again"
      challengesHeading="The cost of a fragmented job record."
      challengesIntro="General contractors live in ZedOps across projects, field capture, and supply chain. These are the gaps we hear about when those areas do not share one system."
      challenges={challenges}
      featuresHeading="How ZedOps matches how you run work."
      features={features}
      earlyAccessLabel="Request early access for your team"
    />
  );
}
