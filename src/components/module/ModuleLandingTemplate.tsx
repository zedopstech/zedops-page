import { useMemo } from "react";
import { Lock } from "lucide-react";
import { PiChartLineUpFill, PiClipboardTextFill, PiFolderOpenFill, PiKanbanFill } from "react-icons/pi";
import { Calculator, ClipboardList, FolderOpen, GanttChart, Landmark, Package, Settings2, ShieldCheck, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import { platformFeatureSections } from "@/data/platformFeatures";
import { moduleLandingContent } from "@/data/moduleLandingContent";
import type { ModuleFeature, ModuleWorkflowTab } from "./ModuleSections";
import { ModuleCapabilities, ModuleClosingCta, ModuleComparison, ModuleConnected, ModuleHero, ModuleWorkflowTabs } from "./ModuleSections";
import { CornerTicks, Highlight } from "@/components/design-preview/primitives";

type FeatureItem = PlatformFeatureSection["items"][number];

const extraSections: Record<string, PlatformFeatureSection> = {
  "workforce-intelligence": {
    id: "workforce-intelligence",
    title: "Workforce Intelligence",
    items: [
      { name: "People directory", summary: "Keep employee, role, and team details together.", detail: "Use one people record for team details, roles, skills, and the project work they support." },
      { name: "Attendance & leave", summary: "Record who is available and where they are working.", detail: "Review attendance and leave in the context of the people and projects they affect." },
      { name: "Requests & approvals", summary: "Give people a clear path for routine requests.", detail: "Keep leave, equipment, and other requests visible from submission to decision." },
      { name: "Task ownership", summary: "Connect assignments to the people doing the work.", detail: "See responsibility, due dates, and progress alongside the project task." },
      { name: "Field visibility", summary: "Help site and office work from the same people context.", detail: "Keep team information and daily activity available where work is coordinated." },
      { name: "Workforce reporting", summary: "Understand attendance and assignments over time.", detail: "Bring people records and work activity together for clearer review." },
    ],
  },
  "punch-list": {
    id: "punch-list",
    title: "Punch List Management",
    items: [
      { name: "Capture punch items", summary: "Record the location, detail, and evidence for each issue.", detail: "Give every item a clear description and photos so the next person knows what needs to change." },
      { name: "Assign responsibility", summary: "Put each item with the right team or contractor.", detail: "Keep ownership and due dates visible as closeout work moves forward." },
      { name: "Track resolution", summary: "Follow status and discussion in one place.", detail: "Keep updates with the issue instead of spreading them across calls and messages." },
      { name: "Verify completion", summary: "Review the fix before an item is closed.", detail: "Attach completion evidence and confirm the work meets the expected standard." },
      { name: "Closeout record", summary: "Carry a reliable issue history into handover.", detail: "See what was raised, who resolved it, and when it was accepted." },
      { name: "Punch reporting", summary: "Review open and closed work by area or owner.", detail: "Use the punch record to focus the next walk-through and closeout meeting." },
    ],
  },
};

export function getLandingSection(id: string): PlatformFeatureSection | undefined {
  return platformFeatureSections.find((section) => section.id === id) ?? extraSections[id];
}

const connectedIcons: Record<string, typeof Calculator> = {
  core: Users,
  projects: FolderOpen,
  estimation: Calculator,
  "planning-execution": GanttChart,
  "daily-intelligence": ClipboardList,
  "quality-safety-closeout": ShieldCheck,
  finance: Landmark,
  "supply-chain": Package,
  settings: Settings2,
};

const connectedIds = ["core", "projects", "estimation", "planning-execution", "daily-intelligence", "quality-safety-closeout", "finance", "supply-chain", "settings"];
const miniIcons = [PiKanbanFill, PiClipboardTextFill, PiChartLineUpFill, PiFolderOpenFill];

function shortSentence(value: string): string {
  return value.split(/(?<=[.!?])\s+/)[0]?.trim() ?? value;
}

function featureBullets(item: FeatureItem): string[] {
  const first = item.summary.replace(/\s+-\s+/g, " — ").trim();
  const next = shortSentence(item.detail).replace(/\s+-\s+/g, " — ").trim();
  return next && next !== first ? [first, next] : [first];
}

function ModuleProductPreview({ section }: { section: PlatformFeatureSection }) {
  const visible = section.items.slice(0, 4);
  return (
    <div className="relative mx-auto max-w-[1110px] pt-9">
      <div className="absolute inset-x-0 top-0 flex h-5 items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C97AB]" aria-hidden><span className="h-px flex-1 bg-[#A8B8CC]" /><span>{section.title} · workspace concept</span><span className="h-px flex-1 bg-[#A8B8CC]" /></div>
      <div className="relative rounded-[10px] border border-[#CFD9E6] bg-white p-2.5 shadow-[0_40px_80px_-40px_rgba(23,43,77,0.45)] sm:p-3.5"><CornerTicks />
        <div className="overflow-hidden rounded-md border border-[#E3E8F0] bg-white">
          <div className="flex h-10 items-center gap-3 border-b border-[#E3E8F0] bg-[#F8F9FD] px-4 sm:h-12"><span className="flex gap-1.5" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full border border-[#D5DCE7] bg-[#EDF0F5]" />)}</span><span className="mx-auto flex h-7 max-w-[65%] items-center gap-2 truncate rounded-md border border-[#E3E8F0] bg-white px-4 text-[11px] font-medium text-brand-navy"><Lock size={11} className="shrink-0 text-[#8C97AB]" aria-hidden /><span className="truncate">ZedOps / {section.title}</span></span></div>
          <div className="grid h-[325px] sm:h-[400px] lg:h-[510px] lg:grid-cols-[205px_1fr]">
            <div className="hidden border-r border-[#DCE3ED] bg-[#F4F6FA] p-5 lg:block"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy"><PiFolderOpenFill size={17} aria-hidden />Project workspace</div><div className="mt-7 space-y-2">{visible.map((item, index) => <div key={item.name} className={`truncate rounded-md px-3 py-2 text-[12px] ${index === 0 ? "bg-white font-semibold text-brand-navy shadow-sm" : "text-[#7A8799]"}`}>{item.name}</div>)}</div></div>
            <div className="min-w-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)] p-5 sm:p-8 lg:p-10"><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8C97AB]">Project workspace</p><h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-brand-navy sm:text-[30px]">{section.title}</h3></div><span className="hidden rounded-full border border-[#DCE3ED] px-3 py-1 font-mono text-[10px] text-[#6B778C] sm:block">Illustrative</span></div>
              <div className="mt-7 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-9">{visible.map((item, index) => { const Icon = miniIcons[index % miniIcons.length]; return <div key={item.name} className="min-h-[78px] rounded-lg border border-[#E3E8F0] bg-white p-3 shadow-[0_10px_24px_-20px_rgba(23,43,77,0.35)] sm:min-h-[105px] sm:p-5"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EDF3FA] text-brand-navy"><Icon size={17} aria-hidden /></span><span className="line-clamp-2 text-[11px] font-semibold leading-tight text-brand-navy sm:text-[14px]">{item.name}</span></div><span className="mt-3 hidden h-1.5 w-4/5 rounded-full bg-[#E3E8F0] sm:block" /><span className="mt-1.5 hidden h-1.5 w-2/3 rounded-full bg-[#EDF0F5] sm:block" /></div>; })}</div>
            </div>
          </div>
        </div><div className="absolute bottom-2.5 right-2.5 hidden border border-brand-navy bg-white px-2.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-navy sm:bottom-3.5 sm:right-3.5 sm:block">Module concept</div>
      </div>
    </div>
  );
}

function ModuleMiniVisual({ name, index }: { name: string; index: number }) {
  const Icon = miniIcons[index % miniIcons.length];
  return <div className="rounded-lg border border-[#DCE3ED] bg-white p-4 shadow-[0_10px_24px_-18px_rgba(23,43,77,0.35)]"><div className="flex items-center justify-between gap-4 border-b border-[#E3E8F0] pb-3"><div className="flex min-w-0 items-center gap-2"><Icon size={19} className="shrink-0 text-brand-navy" aria-hidden /><span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6B778C]">{name}</span></div><span className="font-mono text-[10px] text-[#8C97AB]">{String(index + 1).padStart(2, "0")}</span></div><div className="mt-4 space-y-3">{[0, 1, 2].map((row) => <div key={row} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${row === 1 ? "bg-brand-orange" : "bg-brand-navy/65"}`} /><span className={`h-2 rounded-full bg-[#E3E8F0] ${row === 0 ? "w-4/5" : row === 1 ? "w-3/5" : "w-2/3"}`} /><span className="ml-auto h-2 w-7 rounded-full bg-[#EDF3FA]" /></div>)}</div></div>;
}

export default function ModuleLandingTemplate({ section }: { section: PlatformFeatureSection }) {
  const isMobile = useIsMobile();
  const content = moduleLandingContent[section.id];
  const features: ModuleFeature[] = useMemo(() => section.items.map((item) => ({ title: item.name, bullets: featureBullets(item) })), [section]);
  const workflowTabs: ModuleWorkflowTab[] = useMemo(() => section.items.slice(0, 5).map((item) => ({ label: item.name, title: item.summary, body: item.detail })), [section]);
  if (!content) return null;
  const related = connectedIds.filter((id) => id !== section.id).slice(0, 6).map((id) => { const found = getLandingSection(id); return { label: found?.title ?? id, icon: connectedIcons[id] ?? FolderOpen, category: "Module" }; });
  const rows = section.items.slice(0, 3).map((item, index) => ({ label: item.name, status: String(index + 1).padStart(2, "0") }));
  return <>
    <ModuleHero isMobile={isMobile} eyebrow={content.eyebrow} title={<>{content.headline}<span className="block text-brand-navy/65">{content.secondLine}</span></>} body={content.intro} product={<ModuleProductPreview section={section} />} productCaption="Illustrative module workspace" capabilitiesId={`${section.id}-capabilities`} />
    <ModuleCapabilities isMobile={isMobile} heading={{ id: `${section.id}-capabilities`, label: `Built for ${content.eyebrow.toLowerCase()}`, title: <Highlight>{content.capabilityTitle}</Highlight>, body: content.capabilityBody }} features={features} renderVisual={(index) => <ModuleMiniVisual name={features[index]?.title ?? section.title} index={index} />} note="Illustrative interface elements" />
    <ModuleWorkflowTabs isMobile={isMobile} heading={{ id: `${section.id}-workflow-title`, label: `${content.eyebrow} workflow`, title: content.workflowTitle, body: content.workflowBody }} tabs={workflowTabs} />
    <ModuleComparison isMobile={isMobile} heading={{ id: `${section.id}-comparison-title`, label: "Before and after", title: content.comparisonTitle, body: "Keep the work and the decisions behind it connected." }} before={content.before.map((title) => ({ title }))} after={content.after.map((title) => ({ title }))} beforeLabel="Fragmented workflow" afterTone="dark" />
    <ModuleConnected isMobile={isMobile} heading={{ id: `${section.id}-connected-title`, label: "Connected across ZedOps", title: <>Keep this work in <Highlight>project context.</Highlight></>, body: "The same project record connects the teams and modules that depend on this work." }} sourceTitle={content.sourceTitle} sourceBody={content.sourceBody} sourceRows={rows} modules={related} />
    <ModuleClosingCta isMobile={isMobile} id={`${section.id}-cta-title`} label="See it with your own workflow" title={<Highlight>{content.ctaTitle}</Highlight>} body={content.ctaBody} />
  </>;
}
