import { useMemo } from "react";
import { t } from "@/i18n";
import { Calculator, ClipboardList, FolderOpen, GanttChart, Landmark, Package, Settings2, ShieldCheck, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import { platformFeatureSections } from "@/data/platformFeatures";
import { moduleLandingContent } from "@/data/moduleLandingContent";
import type { ModuleFeature, ModuleWorkflowTab } from "./ModuleSections";
import { ModuleCapabilities, ModuleClosingCta, ModuleComparison, ModuleConnected, ModuleHero, ModuleWorkflowTabs } from "./ModuleSections";
import { Highlight, Muted } from "@/components/design-system/primitives";
import { moduleScenes } from "@/components/mocks/scenes";

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

function shortSentence(value: string): string {
  return value.split(/(?<=[.!?])\s+/)[0]?.trim() ?? value;
}

function featureBullets(item: FeatureItem): string[] {
  const first = item.summary.replace(/\s+-\s+/g, " — ").trim();
  const next = shortSentence(item.detail).replace(/\s+-\s+/g, " — ").trim();
  return next && next !== first ? [first, next] : [first];
}

function ModuleProductPreview({ id }: { id: string }) {
  const [A, B] = moduleScenes[id] ?? moduleScenes.core!;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="mx-auto w-full max-w-[520px]"><A /></div>
      <div className="mx-auto hidden w-full max-w-[520px] lg:block"><B /></div>
    </div>
  );
}

export default function ModuleLandingTemplate({ section }: { section: PlatformFeatureSection }) {
  const isMobile = useIsMobile();
  const content = moduleLandingContent[section.id];
  const features: ModuleFeature[] = useMemo(() => section.items.map((item) => ({ title: item.name, bullets: featureBullets(item) })), [section]);
  const workflowTabs: ModuleWorkflowTab[] = useMemo(() => section.items.slice(0, 5).map((item) => ({ label: item.name, title: item.summary, body: item.detail })), [section]);
  if (!content) return null;
  const related = connectedIds.filter((id) => id !== section.id).slice(0, 6).map((id) => { const found = getLandingSection(id); return { label: found?.title ?? id, icon: connectedIcons[id] ?? FolderOpen, href: `/platform/module/${id}` }; });
  return <>
    <ModuleHero isMobile={isMobile} eyebrow={content.eyebrow} title={<>{t(content.headline)} <Muted>{t(content.secondLine)}</Muted></>} body={content.intro} product={<ModuleProductPreview id={section.id} />} productCaption="Illustrative product views" capabilitiesId={`${section.id}-capabilities`} />
    <ModuleCapabilities isMobile={isMobile} heading={{ id: `${section.id}-capabilities`, label: `Built for ${content.eyebrow.toLowerCase()}`, title: content.capabilityTitle, body: content.capabilityBody }} features={features} />
    <ModuleWorkflowTabs isMobile={isMobile} heading={{ id: `${section.id}-workflow-title`, label: `${content.eyebrow} workflow`, title: content.workflowTitle, body: content.workflowBody }} tabs={workflowTabs} />
    <ModuleComparison isMobile={isMobile} heading={{ id: `${section.id}-comparison-title`, label: "Before and after", title: content.comparisonTitle, body: "Keep the work and the decisions behind it connected." }} before={content.before.map((title) => ({ title }))} after={content.after.map((title) => ({ title }))} beforeLabel="Fragmented workflow" afterTone="dark" />
    <ModuleConnected isMobile={isMobile} heading={{ id: `${section.id}-connected-title`, label: "Connected across ZedOps", title: <>{t("Keep this work in")} <Highlight>{t("project context.")}</Highlight></>, body: "The same project record connects the teams and modules that depend on this work." }} sourceTitle={content.sourceTitle} sourceBody={content.sourceBody} modules={related} />
    <ModuleClosingCta isMobile={isMobile} id={`${section.id}-cta-title`} label="See it with your own workflow" title={content.ctaTitle} body={content.ctaBody} />
  </>;
}
