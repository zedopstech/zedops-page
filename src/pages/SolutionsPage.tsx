import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { Brain, FileText, PenLine, BarChart2, ArrowRight, Check, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const modules = [
  {
    icon: Brain,
    tag: "AI Copilot & Risk Engine",
    title: "A project copilot  -  not a standalone chat assistant.",
    desc: "Zed AI runs on live, permissioned project data  -  insights, report prep, writing assist, and in-product actions where you enable them. Templates and more automation on the roadmap.",
    features: [
      "Summaries and variance views from module data",
      "Report drafts grounded in what teams already entered",
      "Writing assist in supported fields",
      "Actions where configured",
    ],
    tiers: [
      { label: "Essentials", plan: "Starter", color: "bg-gray-100 text-gray-600" },
      { label: "Full access", plan: "Professional", color: "bg-[#EBF0FF] text-[#172B4D]" },
      { label: "Full + BYOK", plan: "Enterprise", color: "bg-[#172B4D] text-white" },
    ],
    image: "right",
    accent: "#172B4D",
  },
  {
    icon: FileText,
    tag: "Field Operations & Daily Logs",
    title: "Mobile-first logging from the site, not the office.",
    desc: "Field crews capture daily progress, photos, crew counts, and safety observations directly from their phone. Supervisors review and approve in the same place. Every entry is timestamped, searchable, and linked to the project record.",
    features: [
      "Mobile iOS and Android app for field capture",
      "Photo, video, and document attachments per log entry",
      "Crew tracking and equipment usage logging",
      "Instant sync to project dashboard  -  no manual uploads",
    ],
    tiers: [
      { label: "Included", plan: "All plans", color: "bg-green-50 text-green-700" },
    ],
    image: "left",
    accent: "#00875A",
  },
  {
    icon: PenLine,
    tag: "Drawing Annotation & BIM",
    title: "Every drawing, always current. Every markup, always saved.",
    desc: "Upload, version, and annotate drawings in one place. Every trade sees the latest revision. Markups sync instantly to the project record. Professional plans add full collaborative annotation and BIM viewer integration.",
    features: [
      "Upload and version control for all drawing sets",
      "View and annotate on any device, including mobile",
      "RFI links attached directly to drawing markups",
      "BIM 3D viewer with drawing overlay (Professional+)",
    ],
    tiers: [
      { label: "View only", plan: "Starter", color: "bg-gray-100 text-gray-600" },
      { label: "Full annotation", plan: "Professional", color: "bg-[#EBF0FF] text-[#172B4D]" },
      { label: "BIM + custom", plan: "Enterprise", color: "bg-[#172B4D] text-white" },
    ],
    image: "right",
    accent: "#0052CC",
  },
  {
    icon: BarChart2,
    tag: "Reporting & Dashboards",
    title: "Real-time intelligence from site to boardroom.",
    desc: "Live dashboards consolidate cost tracking, schedule status, open RFIs, and risk scores into a single view. Share a live link with clients instead of building a deck. Portfolio owners see every project at once.",
    features: [
      "Live project dashboard  -  cost, schedule, and risk in one view",
      "Portfolio overview for owners managing multiple projects",
      "Automated weekly reports compiled from daily log data",
      "Export to PDF, CSV, and shareable live links",
    ],
    tiers: [
      { label: "Basic dashboard", plan: "Starter", color: "bg-gray-100 text-gray-600" },
      { label: "Full intelligence", plan: "Professional", color: "bg-[#EBF0FF] text-[#172B4D]" },
      { label: "Portfolio + custom", plan: "Enterprise", color: "bg-[#172B4D] text-white" },
    ],
    image: "left",
    accent: "#F79625",
  },
];

export default function SolutionsPage() {
  useSEO({
    title: "Platform  -  ZedOps",
    description:
      "How ZedOps groups AI copilot, field operations, drawings, and reporting. See the complete product module list  -  projects, finance, supply chain, quality, Zed AI  -  on the platform features page.",
  });
  return (
    <div className="min-h-screen bg-white text-[#172B4D] overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Platform"
          PillIcon={Cpu}
          title="Every tool your project needs, connected by AI."
          subtitle="Projects, planning, finance, supply chain, quality and safety, documents, reporting, and Zed AI  -  multi-tenant, role-based. Below is how we group the ideas; the full checklist is on the platform features page."
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/platform"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#172B4D] hover:bg-[#0e1e38] text-white font-bold text-sm rounded-md transition-all duration-150 group"
            >
              Full feature list
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/early-access"
              className="text-sm font-bold text-[#42526E] hover:text-[#172B4D] transition-colors"
            >
              Request early access
            </a>
          </div>
        </PageHero>

        {/* Capability modules */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.tag}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:border-gray-300 transition-all duration-200"
              >
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${mod.image === "left" ? "lg:flex-row-reverse" : ""}`}>

                  {/* Text side */}
                  <div className={mod.image === "left" ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${mod.accent}18` }}
                      >
                        <mod.icon size={20} style={{ color: mod.accent }} />
                      </div>
                      <span
                        className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: `${mod.accent}12`, color: mod.accent }}
                      >
                        {mod.tag}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-[#172B4D] leading-snug tracking-tight mb-4">
                      {mod.title}
                    </h2>
                    <p className="text-[#42526E] text-sm leading-relaxed mb-6">{mod.desc}</p>

                    {/* Feature bullets */}
                    <ul className="flex flex-col gap-2.5 mb-7">
                      {mod.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-[#172B4D]">
                          <Check size={14} className="text-[#F79625] mt-0.5 shrink-0" strokeWidth={3} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Tier availability */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {mod.tiers.map((t) => (
                        <span key={t.plan} className={`text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 ${t.color}`}>
                          {t.label} <span className="font-normal opacity-70"> -  {t.plan}</span>
                        </span>
                      ))}
                    </div>

                    <a
                      href="/early-access"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#172B4D] hover:gap-2.5 transition-all duration-150 group"
                    >
                      Get early access <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Visual side  -  illustrated placeholder */}
                  <div
                    className={`rounded-xl h-56 lg:h-64 flex items-center justify-center ${mod.image === "left" ? "lg:order-1" : ""}`}
                    style={{ background: `linear-gradient(135deg, ${mod.accent}10 0%, ${mod.accent}05 100%)`, border: `1px solid ${mod.accent}20` }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: `${mod.accent}18` }}
                      >
                        <mod.icon size={32} style={{ color: mod.accent }} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: mod.accent, opacity: 0.6 }}>
                        {mod.tag}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Built for you callout */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#97A0AF] text-xs font-bold uppercase tracking-widest mb-4">Tailored by role</p>
            <h2 className="text-2xl font-extrabold text-[#172B4D] mb-4">Not every role needs every tool.</h2>
            <p className="text-[#6B778C] text-sm leading-relaxed mb-7">
              ZedOps surfaces the right features for each team member. See how we've designed the platform for your specific role.
            </p>
            <a
              href="/who-we-serve"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#172B4D] text-[#172B4D] hover:bg-[#172B4D] hover:text-white font-bold text-sm rounded-md transition-all duration-150 group"
            >
              Built for you <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
