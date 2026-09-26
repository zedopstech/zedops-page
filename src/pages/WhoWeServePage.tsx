import { ArrowRight, Building2, Briefcase, ClipboardList, HardHat, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import { Container, DotGrid, Highlight, SplitHeader, TicketButton } from "@/components/design-system/primitives";

const personas = [
  { icon: HardHat, title: "General Contractors", desc: "Keep field work, project coordination, materials, and quality in the same job record.", image: "/personas/site-supervisor.jpg", href: "/who-we-serve/general-contractors", tag: "Field and office" },
  { icon: Building2, title: "Owners & Developers", desc: "Follow portfolio progress, budgets, changes, documents, and the decisions behind them.", image: "/personas/company-owner.jpg", href: "/who-we-serve/owners", tag: "Portfolio view" },
  { icon: ClipboardList, title: "Project Managers", desc: "Connect the schedule, daily updates, issues, inspections, and closeout work.", image: "/personas/project-managers.jpg", href: "/who-we-serve/project-managers", tag: "Project delivery" },
  { icon: Briefcase, title: "Consultants & CM Firms", desc: "See the right work across clients and projects while keeping each team’s access clear.", image: "/personas/subcontractor.jpg", href: "/who-we-serve/consultants", tag: "Client oversight" },
];

export default function WhoWeServePage() {
  const isMobile = useIsMobile();
  useSEO({ title: "Built for you  -  ZedOps", description: "Explore how ZedOps supports general contractors, owners, project managers, and consultants." });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <main>
        <PageHero pill="Built for you" PillIcon={Users} title={<>The whole project team, <span className="text-brand-navy/60">working from one place.</span></>} subtitle="Every role needs a different view of the work. ZedOps keeps those views connected to the same project record.">
          <TicketButton href="/early-access">Request a demo</TicketButton>
        </PageHero>

        <section className="relative overflow-hidden bg-brand-navy py-16 lg:py-20">
          <DotGrid dark className="opacity-30 [mask-image:linear-gradient(to_right,transparent,black)]" />
          <Container className="relative grid gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16">
            <h2 className="max-w-2xl text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-white sm:text-[36px]">The job looks different from site, office, and boardroom.</h2>
            <p className="max-w-md border-l border-white/25 pl-6 text-[16px] leading-[1.65] text-white/70">Planning, cost, materials, quality, and reporting stay linked while each person sees the work they are responsible for.</p>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-[100px]">
          <Container>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader label="Built for your role" title={<>Find your place in the <Highlight>project story.</Highlight></>} body="Explore the workflows and project views designed around how your team works." />
            </motion.div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {personas.map((persona, index) => (
                <motion.a key={persona.title} href={persona.href} {...scrollMotionProps(isMobile, { y: 22, duration: 0.48, delay: (index % 2) * 0.06 })} className="group overflow-hidden rounded-xl border border-[#E3E8F0] bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_22px_44px_-28px_rgba(23,43,77,0.4)]">
                  <div className="relative h-[235px] overflow-hidden bg-[#EDF3FA] sm:h-[290px]"><img src={persona.image} alt="" className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute bottom-4 left-4 border border-white/25 bg-brand-navy/85 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm">{persona.tag}</span></div>
                  <div className="p-6 sm:p-8"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF3FA] text-brand-navy"><persona.icon size={20} aria-hidden /></span><h3 className="text-[23px] font-semibold tracking-[-0.025em] text-brand-navy">{persona.title}</h3></div><p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-[#5E6C84]">{persona.desc}</p><span className="mt-6 inline-flex items-center gap-2 border-b border-brand-navy pb-1 text-[14px] font-semibold text-brand-navy">See how ZedOps helps <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
                </motion.a>
              ))}
            </div>
          </Container>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
