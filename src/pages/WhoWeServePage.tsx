import { ArrowUpRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import PageHero from "@/components/PageHero";
import { framePad, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";

const personas = [
  { title: "General contractors", desc: "Field work, coordination, materials and quality in the same job record.", image: "/personas/site-supervisor.jpg", href: "/who-we-serve/general-contractors", tag: "Field and office" },
  { title: "Owners & developers", desc: "Portfolio progress, budgets, changes and the decisions behind them.", image: "/personas/company-owner.jpg", href: "/who-we-serve/owners", tag: "Portfolio view" },
  { title: "Project managers", desc: "Schedule, daily updates, issues, inspections and closeout, connected.", image: "/personas/project-managers.jpg", href: "/who-we-serve/project-managers", tag: "Project delivery" },
  { title: "Consultants & CM firms", desc: "The right work across clients, with each team’s access kept clear.", image: "/contractors/subco.webp", href: "/who-we-serve/consultants", tag: "Client oversight" },
];

export default function WhoWeServePage() {
  const isMobile = useIsMobile();
  useSEO({ title: "Built for you  -  ZedOps", description: "Explore how ZedOps supports general contractors, owners, project managers, and consultants." });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Built for you"
          PillIcon={Users}
          title={<>The whole project team. <Muted>Working from one place.</Muted></>}
          subtitle="Every role needs a different view of the work. ZedOps keeps those views connected to the same project record."
        >
          <TicketButton href="/early-access">Request a demo</TicketButton>
        </PageHero>

        <Section labelledBy="wws-roles">
          <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="wws-roles"
                title={<>Find your place in the <Highlight>project story.</Highlight></>}
                body="The job looks different from site, office and boardroom. Each view stays linked to the same work."
              />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2">
            {personas.map((p, index) => (
              <motion.a
                key={p.title}
                href={p.href}
                {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: (index % 2) * 0.06 })}
                className="group flex flex-col bg-white p-5 transition-colors hover:bg-[#FAFBFC] sm:p-8"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-[#EEF1F5]">
                  <img src={p.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8C97AB]">{p.tag}</span>
                    <h3 className="mt-2 text-[22px] font-medium tracking-[-0.025em] text-brand-navy">{p.title}</h3>
                    <p className="mt-1.5 max-w-md text-[15px] leading-[1.55] text-[#6B778C]">{p.desc}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-[#A5AEBF] transition-colors group-hover:text-brand-orange" aria-hidden />
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
