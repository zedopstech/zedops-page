import { LocalA } from "@/components/LocalLink";
import type { RouteComponentProps } from "wouter";
import { ChevronLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimationLanding from "@/components/EstimationLanding";
import PlanningScheduleLanding from "@/components/PlanningScheduleLanding";
import ModuleLandingTemplate, { getLandingSection } from "@/components/module/ModuleLandingTemplate";
import { getModuleNavContext } from "@/data/platformFeatures";

export default function PlatformModulePage({ params }: RouteComponentProps<{ moduleId: string }>) {
  const id = params.moduleId;
  const section = getLandingSection(id);
  const context = getModuleNavContext(id);

  useSEO({
    title: section ? `${section.title} – ZedOps platform` : "Platform module – ZedOps",
    description: section
      ? `${section.title} in ZedOps. Explore the connected workflows, project records, and capabilities for MEP and construction teams.`
      : "Explore the ZedOps platform modules for MEP and construction execution.",
  });

  if (!section) {
    return <div className="min-h-screen bg-white text-brand-navy"><Navbar /><div className="mx-auto max-w-lg px-6 pb-24 pt-[140px] text-center"><h1 className="text-2xl font-semibold">Module not found</h1><p className="mt-3 text-sm text-[#616D82]">That platform area doesn’t exist or the link may be outdated.</p><LocalA href="/" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-navy"><ChevronLeft size={16} aria-hidden />Back to home</LocalA></div><Footer /></div>;
  }

  const landing = id === "estimation"
    ? <EstimationLanding prev={context?.prev ?? null} next={context?.next ?? null} />
    : id === "planning-execution"
      ? <PlanningScheduleLanding prev={context?.prev ?? null} next={context?.next ?? null} />
      : <ModuleLandingTemplate section={section} />;

  return <div className="min-h-screen overflow-x-clip bg-white text-brand-navy"><Navbar />{landing}<Footer /></div>;
}
