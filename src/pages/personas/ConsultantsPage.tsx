import { useSEO } from "@/hooks/useSEO";
import { Briefcase, Layers, CreditCard, GitMerge, BarChart2, Brain, Inbox, FileOutput } from "lucide-react";
import PersonaTemplate from "@/components/PersonaTemplate";
import type { Feature } from "@/components/PersonaTemplate";

const challenges = [
  {
    icon: Layers,
    title: "Every client wants a different stack",
    desc: "One client lives in email, another in a legacy PM tool, a third in shared drives. Your team context-switches instead of delivering advice.",
  },
  {
    icon: CreditCard,
    title: "Requests and correspondence multiply with engagements",
    desc: "Material, transfer, purchase, and reserve requests  -  plus general correspondence  -  need a dashboard view, not another inbox tab per client.",
  },
  {
    icon: GitMerge,
    title: "Reporting does not scale with headcount",
    desc: "Monthly packs for four clients means four data pulls and four formats. Quality slips or your senior people become full-time report writers.",
  },
];

const features: Feature[] = [
  {
    icon: BarChart2,
    title: "Multi-project oversight",
    desc: "Move between client projects with the same modules your clients use: all projects, analytics where enabled, execution data, and finance hooks  -  so you advise from live data, not stale exports.",
    badge: "Portfolio",
    mockType: "dashboard",
    mockScenario: "consult-portfolio",
  },
  {
    icon: Inbox,
    title: "Requests and correspondence in one rhythm",
    desc: "Use the correspondence and request dashboard plus lifecycles for material, transfer, purchase, and reserve requests  -  aligned to procurement, POs, and inventory when those clients run material management in ZedOps.",
    badge: "Requests",
    mockType: "list",
    mockScenario: "consult-requests",
  },
  {
    icon: Brain,
    title: "Zed AI copilot for client-ready output",
    desc: "Writing assist, insights, and report angles from permitted context  -  role-bounded like the rest of the tenant.",
    badge: "Zed AI",
    mockType: "chat",
    mockScenario: "consult-zed-ai",
  },
  {
    icon: FileOutput,
    title: "Consistent PDFs and exports",
    desc: "Generate the same categories of PDF and document reports your clients expect  -  projects, inspections, incidents, POs, goods receipt, movements, returns  -  and use bulk export routes where you need raw data for analysis.",
    badge: "Deliverables",
    mockType: "dashboard",
    mockScenario: "consult-exports",
  },
];

export default function ConsultantsPage() {
  useSEO({
    title: "ZedOps for Consultants & CM Firms",
    description:
      "CM firms and consultants use ZedOps for multi-project visibility, request and correspondence workflows, reporting, exports, and the Zed AI copilot  -  with tenant and role separation per client.",
  });

  return (
    <PersonaTemplate
      heroImage="/personas/subcontractor.jpg"
      imageAlt="Construction consultant reviewing project with team"
      pill="Consultants & CM Firms"
      PillIcon={Briefcase}
      title="Deliver the same rigor across every engagement."
      subtitle="One platform vocabulary for projects, requests, documents, and reporting  -  so your team scales insight, not spreadsheet hours."
      quote="We are hired for judgment, but we sell hours reconciling other people’s tools. There has to be a better operating cadence."
      quoteAttribution="What CM firms tell us, again and again"
      challengesHeading="When process overhead caps your practice."
      challengesIntro="Consultants win on expertise and trust. These are the operational patterns that cap how many clients you can serve well."
      challenges={challenges}
      featuresHeading="Infrastructure for multi-client delivery."
      features={features}
      earlyAccessLabel="Request early access for your firm"
    />
  );
}
