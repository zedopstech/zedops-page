import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { motion } from "framer-motion";
import { ArrowRight, HardHat, Building2, ClipboardList, Briefcase, Users, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const personas = [
  {
    icon: HardHat,
    title: "General Contractors",
    desc: "Projects, equipment, materials, work logs, daily logs, estimation, schedule, tasks, material management, and QHSE  -  one tenant-aware app with permissions for supers, PMs, and the back office.",
    image: "/Persona/site-supervisor.jpg",
    href: "/who-we-serve/general-contractors",
    accent: "#172B4D",
    tag: "Field-first",
  },
  {
    icon: Building2,
    title: "Owners & Developers",
    desc: "Portfolio and project analytics, budgets, change orders, payments, documents, and PDF reporting  -  with governed access so capital partners see what they should, and nothing else.",
    image: "/Persona/company-owner.jpg",
    href: "/who-we-serve/owners",
    accent: "#0052CC",
    tag: "Portfolio view",
  },
  {
    icon: ClipboardList,
    title: "Project Managers",
    desc: "Tasks, timelines, issues, inspections, punch lists, documents, daily logs, request workflows, and the Zed AI copilot  -  aligned to the same project record your field teams update.",
    image: "/Persona/project-managers.jpg",
    href: "/who-we-serve/project-managers",
    accent: "#00875A",
    tag: "Execution focused",
  },
  {
    icon: Briefcase,
    title: "Consultants & CM Firms",
    desc: "Multi-project oversight, correspondence and request dashboards, procurement alignment, PDF exports, and Zed AI  -  scoped per client and role.",
    image: "/Persona/subcontractor.jpg",
    href: "/who-we-serve/consultants",
    accent: "#6554C0",
    tag: "Multi-client",
  },
];

export default function WhoWeServePage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Built for you  -  ZedOps",
    description: "ZedOps is built for every role in construction: General Contractors, Owners & Developers, Project Managers, and Consultants & CM Firms.",
  });
  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Built for you"
          PillIcon={Users}
          title="Built for every role on the project."
          subtitle="Projects, planning, finance, material management, documents, quality, and Zed AI  -  menus and modules respect each person’s role."
        />

        {/* Human intro */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <MessageSquare size={20} className="text-brand-orange shrink-0 mt-1" />
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Before we built anything</p>
            </div>
            <p className="text-white text-xl lg:text-2xl font-semibold leading-snug mb-6">
              We sat down with general contractors, project managers, owners, and consultants  -  people running real projects  -  and just listened.
            </p>
            <p className="text-white/60 text-base leading-snug max-w-2xl">
              Today the product spans execution, cost, procurement, information management, and AI  -  but the story is the same: one system your whole team can trust, with visibility that matches responsibility.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
              {[
                { label: "Roles served", value: "4" },
                { label: "Conversations had", value: "50+" },
                { label: "Problems in common", value: "1" },
                { label: "Platform to solve them", value: "ZedOps" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-brand-orange mb-1">{stat.value}</div>
                  <div className="text-white/50 text-xs font-medium leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Persona grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8">
              {personas.map((p, i) => (
                <motion.a
                  key={p.title}
                  href={p.href}
                  {...scrollMotionProps(isMobile, { y: 24, duration: 0.45, delay: i * 0.08 })}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    <span
                      className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                      style={{ background: p.accent }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${p.accent}15` }}
                      >
                        <p.icon size={17} style={{ color: p.accent }} />
                      </div>
                      <h3 className="text-lg font-extrabold text-brand-navy">{p.title}</h3>
                    </div>
                    <p className="text-[#42526E] text-sm leading-snug mb-6 flex-1">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy group-hover:gap-2.5 transition-all duration-150">
                      See how ZedOps helps <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
