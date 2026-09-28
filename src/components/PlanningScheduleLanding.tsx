import { Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import { planningAiRoadmap, planningFeatures, planningSources } from "@/data/planningScheduleData";
import { ModuleCapabilities, ModuleClosingCta, ModuleComparison, ModuleConnected, ModuleHero, ModuleWorkflowTabs } from "@/components/module/ModuleSections";
import {
  CornerTicks,
  Highlight,
} from "@/components/design-system/primitives";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;

const phases = [
  {
    label: "Build the plan",
    title: "Give every activity a place in the programme.",
    body: "Organise the work by WBS, sequence the activities, and account for calendars and constraints before teams start on site.",
    steps: ["Set the WBS", "Add activities", "Link dependencies"],
  },
  {
    label: "Set the baseline",
    title: "Agree on the plan the team will measure against.",
    body: "Keep a baseline alongside the working schedule so planned and actual dates remain easy to compare.",
    steps: ["Review dates", "Set the baseline", "Share the programme"],
  },
  {
    label: "Coordinate work",
    title: "Put the next activities in the right hands.",
    body: "Assign work to people and teams, bring resources into view, and make upcoming activities clear to the field.",
    steps: ["Assign ownership", "Check resources", "Plan the lookahead"],
  },
  {
    label: "Track & respond",
    title: "See what moved and decide what happens next.",
    body: "Record progress from site, compare it with the baseline, and review delays before they affect the next trade.",
    steps: ["Capture progress", "Review variance", "Update the plan"],
  },
] as const;

function ScheduleVisual({ index }: { index: number }) {
  if (index === 0 || index === 3) {
    const rows = [
      { name: "Engineering", start: "8%", width: "38%", color: "bg-brand-navy" },
      { name: "Procurement", start: "28%", width: "42%", color: "bg-brand-orange" },
      { name: "Installation", start: "53%", width: "36%", color: "bg-[#6685B2]" },
    ];
    return (
      <div className="overflow-hidden rounded-lg border border-[#DCE3ED] bg-white text-[11px] shadow-[0_10px_24px_-18px_rgba(23,43,77,0.35)]">
        <div className="flex items-center justify-between border-b border-[#E3E8F0] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5F6B80]">
          <span>{index === 0 ? "Project programme" : "Baseline / current"}</span><span>Wk 01 — 08</span>
        </div>
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-[90px_1fr] border-b border-[#EDF0F5] last:border-b-0">
            <span className="truncate border-r border-[#EDF0F5] px-3 py-2 text-[#3D4F6E]">{row.name}</span>
            <div className="relative my-2.5 h-2.5 bg-[linear-gradient(90deg,transparent_24%,#E3E8F0_24%,#E3E8F0_25%,transparent_25%,transparent_49%,#E3E8F0_49%,#E3E8F0_50%,transparent_50%,transparent_74%,#E3E8F0_74%,#E3E8F0_75%,transparent_75%)]">
              <span className={`absolute top-0 h-full rounded-sm ${row.color}`} style={{ left: row.start, width: row.width }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1 || index === 4) {
    const rows = index === 1 ? [["Ductwork install", "MEP team A"], ["Electrical rough-in", "Electrical"], ["Pressure testing", "QA team"]] : [["Mechanical", "78%"], ["Electrical", "62%"], ["Plumbing", "84%"]];
    return (
      <div className="rounded-lg border border-[#DCE3ED] bg-white p-3 shadow-[0_10px_24px_-18px_rgba(23,43,77,0.35)]">
        <div className="mb-3 flex justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5F6B80]"><span>{index === 1 ? "Activity owners" : "Resource load"}</span><span>03 / 03</span></div>
        {rows.map(([name, value], row) => (
          <div key={name} className="flex items-center justify-between gap-3 border-t border-[#EDF0F5] py-2 text-[12px] text-brand-navy">
            <span className="truncate">{name}</span><span className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] ${row === 1 ? "bg-[#FFF1E8] text-brand-orange" : "bg-[#EDF3FA] text-brand-navy"}`}>{value}</span>
          </div>
        ))}
      </div>
    );
  }
  const bars = index === 2 ? [42, 57, 63, 69, 77, 82] : [28, 40, 54, 61, 74, 86];
  return (
    <div className="rounded-lg border border-[#DCE3ED] bg-white p-4 shadow-[0_10px_24px_-18px_rgba(23,43,77,0.35)]">
      <div className="flex justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5F6B80]"><span>{index === 2 ? "Planned / actual" : "Progress trend"}</span><span>6 weeks</span></div>
      <div className="mt-4 flex h-[94px] items-end justify-between gap-3 border-b border-[#A8B8CC] px-2">
        {bars.map((height, i) => <div key={i} className="flex h-full flex-1 items-end"><div className="w-full rounded-t-sm bg-[#DCE7F5]" style={{ height: `${height}%` }}><div className="ml-auto h-full w-1/2 rounded-t-sm bg-brand-navy" style={{ height: `${Math.max(height - (i % 2 ? 13 : 7), 20)}%` }} /></div></div>)}
      </div>
    </div>
  );
}

function Capabilities({ isMobile }: { isMobile: boolean }) {
  return <ModuleCapabilities
    isMobile={isMobile}
    heading={{ id: "planning-capabilities", label: "Built for project teams", title: <>Make the schedule a <Highlight>working plan.</Highlight></>, body: "Keep sequence, ownership, resources, and progress in one place so the next decision has the right context." }}
    features={planningFeatures}
    renderVisual={(index) => <ScheduleVisual index={index} />}
    note="Illustrative schedule data"
  />;
}

function Workflow({ isMobile }: { isMobile: boolean }) {
  return <ModuleWorkflowTabs
    isMobile={isMobile}
    heading={{ id: "planning-workflow-title", label: "Planning workflow", title: <>From the first programme to the <Highlight>next site update.</Highlight></>, body: "Four connected phases keep the baseline, assignments, and field progress in the same conversation." }}
    tabs={phases}
  />;
}

const before = ["Separate spreadsheets for each trade", "Updates arrive after the plan has changed", "Unclear ownership of upcoming activities", "Baseline and current dates drift apart"];
const after = ["One schedule across the project", "Progress recorded against activities", "Named owners and visible lookaheads", "Baseline and current dates viewed together"];

function Comparison({ isMobile }: { isMobile: boolean }) {
  return <ModuleComparison
    isMobile={isMobile}
    heading={{ id: "planning-comparison-title", label: "Before and after", title: <>A plan the field can <Highlight>actually work from.</Highlight></>, body: "Give the team a clear programme and a reliable way to see what changed." }}
    before={before.map((title) => ({ title }))}
    after={after.map((title) => ({ title }))}
    beforeLabel="Fragmented planning"
    beforeStamp="Old process"
    afterStamp="Current plan"
    afterTone="dark"
  />;
}

function Connected({ isMobile }: { isMobile: boolean }) {
  const modules = planningSources.filter((source) => !source.current).slice(0, 6);
  return <ModuleConnected
    isMobile={isMobile}
    heading={{ id: "planning-connected-title", label: "Connected across ZedOps", title: <>The schedule gives every team <Highlight>a shared sequence.</Highlight></>, body: "Link the plan with estimates, materials, daily updates, tasks, and costs so project decisions keep their context." }}
    sourceTitle="Project schedule"
    sourceBody="Activities, owners, baseline dates, and site progress in one working plan."
    sourceRows={[{ label: "Work breakdown structure", status: "defined" }, { label: "Baseline and current dates", status: "visible" }, { label: "Activity ownership", status: "assigned" }]}
    modules={modules}
    roadmapLabel="Zed AI for planning"
    roadmapBody="Ideas on the roadmap for spotting delays, understanding progress, and planning recovery."
    roadmapItems={planningAiRoadmap.items}
  />;
}

function PlanningProductView() {
  return <div className="relative mx-auto max-w-[1110px] pt-9">
    <div className="absolute inset-x-0 top-0 flex h-5 items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5F6B80]" aria-hidden><span className="h-px flex-1 bg-[#A8B8CC]" /><span>Schedule workspace · project timeline</span><span className="h-px flex-1 bg-[#A8B8CC]" /></div>
    <div className="relative rounded-[10px] border border-[#CFD9E6] bg-white p-2.5 shadow-[0_40px_80px_-40px_rgba(23,43,77,0.45)] sm:p-3.5"><CornerTicks /><div className="overflow-hidden rounded-md border border-[#E3E8F0] bg-white"><div className="flex h-10 items-center gap-3 border-b border-[#E3E8F0] bg-[#F8F9FD] px-4 sm:h-12"><span className="flex gap-1.5" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full border border-[#D5DCE7] bg-[#EDF0F5]" />)}</span><span className="mx-auto flex h-7 items-center gap-2 rounded-md border border-[#E3E8F0] bg-white px-4 text-[11px] font-medium text-brand-navy"><Lock size={11} className="text-[#5F6B80]" aria-hidden />ZedOps / Schedule dashboard</span></div><div className="h-[240px] overflow-hidden bg-[#F4F6FA] sm:h-[400px] lg:h-[510px]"><img src="/screenshots/schedule-and-planning.png" alt="ZedOps schedule dashboard showing activities alongside a baseline timeline" className="h-full w-full object-cover object-left-top" /></div></div><div className="absolute bottom-2.5 right-2.5 flex border border-brand-navy bg-white font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-navy sm:bottom-3.5 sm:right-3.5"><span className="bg-brand-navy px-2.5 py-2 text-white">P-01</span><span className="hidden px-2.5 py-2 sm:block">Schedule workspace</span></div></div>
  </div>;
}

export default function PlanningScheduleLanding(_props: { prev: NavModule | null; next: NavModule | null }) {
  const isMobile = useIsMobile();
  return <>
    <ModuleHero isMobile={isMobile} eyebrow="Planning & scheduling" title={<>Make the plan clear.<span className="block text-brand-navy/65">Keep the work moving.</span></>} body="Build the programme, assign activities, and compare field progress with the baseline in one connected scheduling workflow." product={<PlanningProductView />} capabilitiesId="planning-capabilities" />
    <Capabilities isMobile={isMobile} />
    <Workflow isMobile={isMobile} />
    <Comparison isMobile={isMobile} />
    <Connected isMobile={isMobile} />
    <ModuleClosingCta isMobile={isMobile} id="planning-cta-title" label="See it with your own project" title={<>Plan the work. <Highlight>See what changes.</Highlight></>} body="Walk through your programme, trade assignments, progress updates, and baseline reviews with our team." />
  </>;
}
