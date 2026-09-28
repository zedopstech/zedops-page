import { motion } from "framer-motion";
import { ArrowRight, Building2, Layers, ShieldCheck, Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Section, SplitHeader } from "@/components/design-system/primitives";

type Lens = { label: string; Icon: LucideIcon; href: string; chips: string[]; desc: string };

const lenses: Lens[] = [
  { label: "By project stage", Icon: Layers, href: "/how-we-help/project-stage", chips: ["Preconstruction", "Construction", "Closeout"], desc: "How ZedOps supports every phase of the job." },
  { label: "By company type", Icon: Building2, href: "/how-we-help/company", chips: ["Owner", "Contractor", "Consultant"], desc: "Fits the way owners, contractors and consultants work." },
  { label: "By team", Icon: Users2, href: "/how-we-help/team", chips: ["PM", "Site", "Commercial", "QA/QC"], desc: "The right tools for each team, on one platform." },
  { label: "By role & access", Icon: ShieldCheck, href: "/how-we-help/role", chips: ["Admin", "Manager", "Engineer", "Field"], desc: "Role-based access, permissions and workflows." },
];

/** Four ways into the platform, as a rail-to-rail grid of links. */
export default function LensGrid() {
  const isMobile = useIsMobile();
  return (
    <Section labelledBy="hub-lenses">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="hub-lenses"
            title={<>One platform. <Highlight>Four ways in.</Highlight></>}
            body="Start from the stage of the job, your kind of company, your team or your role."
          />
        </motion.div>
      </div>
      <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
        {lenses.map((lens, i) => (
          <motion.a
            key={lens.href}
            href={lens.href}
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.05 })}
            className="group flex min-h-[280px] flex-col bg-white p-7 transition-colors hover:bg-[#FAFBFC] sm:p-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] text-[#5E6C84] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
              <lens.Icon size={19} aria-hidden />
            </span>
            <h3 className="mt-10 text-[20px] font-medium tracking-[-0.025em] text-brand-navy">{lens.label}</h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-[#616D82]">{lens.desc}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {lens.chips.map((c) => (
                <span key={c} className="rounded-[5px] border border-[#E3E8F0] bg-[#F7F8FA] px-2 py-0.5 text-[12px] text-[#5E6C84]">{c}</span>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-brand-navy">
              Explore
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
