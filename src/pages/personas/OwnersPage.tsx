import { useSEO } from "@/hooks/useSEO";
import { Building2, PieChart, AlertOctagon, Users2, BarChart2, FileText, ShieldCheck, Receipt } from "lucide-react";
import PersonaTemplate from "@/components/PersonaTemplate";
import type { Feature } from "@/components/PersonaTemplate";

const challenges = [
  {
    icon: PieChart,
    title: "Portfolio truth arrives as attachments",
    desc: "Project analytics and budgets live in PDFs and slide decks. You are always one or two reporting cycles behind what is happening on the ground.",
  },
  {
    icon: AlertOctagon,
    title: "Budget and change-order drift is hard to see early",
    desc: "Budget revisions, change orders, direct and indirect costs, and payment requests are critical  -  but they are painful to consolidate across GCs and internal finance.",
  },
  {
    icon: Users2,
    title: "Everyone wants access; not everyone should see everything",
    desc: "Investors, lenders, and partners need confidence without exposing every line item. Ad-hoc shares and email threads do not scale.",
  },
];

const features: Feature[] = [
  {
    icon: BarChart2,
    title: "Project and portfolio visibility",
    desc: "Drill from all projects into a single job, use project-level analytics where enabled, and see execution signals  -  equipment, materials, issues, surveys, and work logs  -  in context instead of in separate reports.",
    badge: "Visibility",
    mockType: "dashboard",
    mockScenario: "owners-portfolio",
  },
  {
    icon: Receipt,
    title: "Finance on the same project record",
    desc: "Budgets and cost structures, routed budget revisions, change orders, direct and indirect cost tracking, and payment requests  -  aligned to the same project your teams execute in.",
    badge: "Finance",
    mockType: "dashboard",
    mockScenario: "owners-finance",
  },
  {
    icon: FileText,
    title: "Documents, logs, and board-ready output",
    desc: "Project document libraries sit next to daily logs. When it is time to report, generate PDF and document reports for the artefacts you need  -  inspections, incidents, POs, goods receipt, movements, and more  -  plus bulk export where implemented.",
    badge: "Reporting",
    mockType: "annotation",
    mockScenario: "owners-documents",
  },
  {
    icon: ShieldCheck,
    title: "Governed access for every stakeholder",
    desc: "Roles and permissions flow through the whole app  -  menus, modules, and Zed AI respect the same flags. You decide who sees financial detail versus high-level status.",
    badge: "Governance",
    mockType: "list",
    mockScenario: "owners-governance",
  },
];

export default function OwnersPage() {
  useSEO({
    title: "ZedOps for Owners & Developers",
    description:
      "Owners use ZedOps for portfolio and project analytics, budgets, change orders, payments, documents, reporting, and permissioned access  -  aligned to how GCs run the job.",
  });

  return (
    <PersonaTemplate
      heroImage="/Persona/company-owner.jpg"
      imageAlt="Real estate developer reviewing project portfolio"
      pill="Owners & Developers"
      PillIcon={Building2}
      title="Portfolio oversight without the patchwork of PDFs."
      subtitle="See projects, cost, and risk in one permissioned environment  -  the same platform your GCs use for execution, so you are not translating between three different reporting formats."
      quote="I sign off on numbers that were true three weeks ago. By the time I ask a follow-up question, the answer is already out of date."
      quoteAttribution="What owners tell us, again and again"
      challengesHeading="When capital and construction do not share one source of truth."
      challengesIntro="Owners care about outcomes, cash, and control. These are the visibility and governance gaps that show up once you have more than a handful of active projects."
      challenges={challenges}
      featuresHeading="What ZedOps gives the capital side."
      features={features}
      earlyAccessLabel="Get portfolio visibility for your team"
    />
  );
}
