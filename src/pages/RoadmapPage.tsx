import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { motion } from "framer-motion";
import {
  FileText,
  BarChart2,
  PenLine,
  ShieldCheck,
  Database,
  Cloud,
  Brain,
  LayoutDashboard,
  Smartphone,
  Cpu,
  Eye,
  Zap,
  Workflow,
  Building2,
  KeyRound,
  Puzzle,
  Lock,
  ArrowRight,
  Map,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

const blueprintBg = {
  backgroundImage: [
    "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
} as const;

const columns = [
  {
    label: "Live Now",
    sublabel: "In production",
    accent: "#10B981",
    accentSoft: "rgba(16,185,129,0.12)",
    dot: "bg-emerald-500",
    dotRing: "ring-emerald-200/80",
    border: "border-emerald-200/60",
    items: [
      { icon: FileText, title: "Smart Daily Logs", desc: "Mobile-first daily log capture with photo attachments." },
      { icon: PenLine, title: "Drawing Annotation", desc: "View and mark up drawings across all devices." },
      { icon: LayoutDashboard, title: "Basic Project Dashboard", desc: "Live project status at a glance." },
      { icon: ShieldCheck, title: "Role-based Access", desc: "Permissions scoped by role at every layer." },
      { icon: Cloud, title: "AWS Private VPC Hosting", desc: "All data in a private cloud  -  no public exposure." },
      { icon: Database, title: "Dedicated DB per Tenant", desc: "Your data fully isolated from other organisations." },
    ],
  },
  {
    label: "Early Access",
    sublabel: "Available now  -  invite only",
    accent: "#FE5D02",
    accentSoft: "rgba(254,93,2,0.14)",
    dot: "bg-brand-orange",
    dotRing: "ring-brand-orange/25",
    border: "border-brand-orange/30",
    items: [
      { icon: Brain, title: "AI Copilot Essentials", desc: "Daily summaries and basic project Q&A powered by AI." },
      { icon: BarChart2, title: "Project Intelligence Dashboard", desc: "Real-time analytics across tasks, costs, and risk." },
      { icon: Smartphone, title: "Mobile App (iOS & Android)", desc: "Full platform access from site, not just desktop." },
    ],
  },
  {
    label: "Q3 2026",
    sublabel: "Coming soon",
    accent: "#0052CC",
    accentSoft: "rgba(0,82,204,0.1)",
    dot: "bg-[#0052CC]",
    dotRing: "ring-blue-200/90",
    border: "border-blue-200/70",
    items: [
      { icon: Cpu, title: "Full AI Copilot", desc: "Risk alerts, RFI drafting, schedule clash detection." },
      { icon: Eye, title: "BIM Viewer", desc: "3D model viewing integrated with drawings and RFIs." },
      { icon: Zap, title: "API Access", desc: "Integrate ZedOps with your existing tool stack." },
      { icon: Workflow, title: "Custom Workflows", desc: "Build approval chains and automations for your process." },
      { icon: PenLine, title: "Drawing Annotation (Full)", desc: "Full mark-up, versioning, and team collaboration." },
    ],
  },
  {
    label: "Q4 2026+",
    sublabel: "On the horizon",
    accent: "#6B778C",
    accentSoft: "rgba(107,119,140,0.12)",
    dot: "bg-[#6B778C]",
    dotRing: "ring-gray-200/90",
    border: "border-gray-200/80",
    items: [
      { icon: Building2, title: "White-label Client Portals", desc: "Your brand, your clients, powered by ZedOps." },
      { icon: Lock, title: "SSO / SAML Authentication", desc: "Single sign-on for enterprise teams." },
      { icon: KeyRound, title: "BYOK Full Rollout", desc: "Bring your own AI API key across all tiers." },
      { icon: Puzzle, title: "Custom Integrations", desc: "Deep ERP, accounting, and scheduling connections." },
      { icon: ShieldCheck, title: "SOC 2 Certification", desc: "Third-party security audit  -  on the roadmap." },
    ],
  },
];

export default function RoadmapPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Product Roadmap  -  ZedOps",
    description:
      "See what's live, in early access, and coming next on the ZedOps platform. Updated weekly as features ship. Early access customers shape what we build.",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <div className="pt-[100px]">
        {/* Hero  -  same language as home / platform: gradient, blueprint, glow */}
        <section className="relative overflow-hidden pb-16 pt-20 lg:pb-20" aria-labelledby="roadmap-page-title">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "url('/hero-grid.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "80px 80px",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0" style={blueprintBg} aria-hidden />
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="text-center lg:col-span-7 lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 inline-flex items-center gap-2 border border-brand-navy/20 bg-white/80 px-4 py-1.5"
                  style={{ borderRadius: 99 }}
                >
                  <Map size={12} className="text-brand-orange" aria-hidden />
                  <span className="text-xs font-bold tracking-[0.12em] text-brand-navy uppercase">Product Roadmap</span>
                </motion.div>
                <motion.h1
                  id="roadmap-page-title"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 }}
                  className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[52px]"
                >
                  What we&apos;re building and what&apos;s next.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="mx-auto mt-5 max-w-xl text-lg leading-snug text-[#42526E] lg:mx-0"
                >
                  We ship every week and update this page as features land. Early access customers influence what comes next.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="mx-auto mt-8 max-w-xl lg:mx-0"
                >
                  <div className="rounded-2xl border border-brand-navy/12 bg-white/75 px-5 py-4 shadow-[0_12px_40px_-28px_rgba(23,43,77,0.22)] backdrop-blur-sm">
                    <p className="text-sm leading-snug text-[#42526E]">
                      Roadmap updates as we ship.{" "}
                      <a
                        href="/early-access"
                        className="inline-flex items-center gap-1 font-bold text-[#0052CC] underline decoration-[#0052CC]/30 underline-offset-4 transition-colors hover:text-[#0747A6]"
                      >
                        Join early access to influence what&apos;s next
                        <ArrowRight size={14} className="shrink-0" aria-hidden />
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Timeline preview  -  hero-style floating stack */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:col-span-5"
              >
                <div
                  className="pointer-events-none absolute -right-6 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full opacity-40 blur-3xl lg:block"
                  style={{ background: "#C4D9FF" }}
                  aria-hidden
                />
                <div className="relative rounded-2xl border border-white/60 bg-white/40 p-6 shadow-[0_20px_60px_-34px_rgba(23,43,77,0.35)] backdrop-blur-md sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#97A0AF]">At a glance</p>
                  <div className="relative mt-5 space-y-0 border-l-2 border-brand-navy/10 pl-6">
                    {columns.map((col) => (
                      <div key={col.label} className="relative pb-6 last:pb-0">
                        <span
                          className={`absolute -left-[25px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white shadow-sm ring-2 ${col.dotRing} ${col.dot}`}
                          aria-hidden
                        />
                        <div
                          className="rounded-xl border border-gray-200/80 bg-white/95 px-4 py-3 shadow-[0_4px_20px_-12px_rgba(23,43,77,0.2)]"
                          style={{ borderLeftWidth: 3, borderLeftColor: col.accent }}
                        >
                          <p className="text-sm font-extrabold text-brand-navy">{col.label}</p>
                          <p className="mt-0.5 text-xs text-[#6B778C]">{col.sublabel}</p>
                          <p className="mt-2 text-xs font-semibold text-[#0052CC]">{col.items.length} initiatives</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Swimlanes */}
        <section className="relative border-t border-gray-200/90 bg-white py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-[#F2F6FF]/90 to-transparent" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4">
            <motion.p {...scrollMotionProps(isMobile, { y: 10, duration: 0.4 })} className="mx-auto mb-12 max-w-2xl text-center text-base leading-snug text-[#42526E] lg:mb-16">
              Four horizons from production to what we&apos;re exploring next  -  each card is something we&apos;re committed to
              shipping or evaluating with customers.
            </motion.p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
              {columns.map((col, ci) => (
                <motion.div
                  key={col.label}
                  {...scrollMotionProps(isMobile, { y: 22, duration: 0.45, delay: Math.min(ci * 0.07, 0.2) })}
                  className="group flex flex-col"
                >
                  <div
                    className={`mb-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_-16px_rgba(23,43,77,0.14)] ${col.border}`}
                    style={{ borderLeftWidth: 4, borderLeftColor: col.accent }}
                  >
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ring-4 ${col.dot} ${col.dotRing}`} aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold leading-tight text-brand-navy">{col.label}</p>
                      <p className="text-xs text-[#97A0AF]">{col.sublabel}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {col.items.map((item, ii) => (
                      <motion.div
                        key={item.title}
                        {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(ci * 0.05 + ii * 0.04, 0.25) })}
                        className="rounded-2xl border border-gray-200/90 bg-linear-to-br from-white to-[#FAFBFC] px-4 py-4 shadow-[0_1px_3px_rgba(23,43,77,0.06)] ring-1 ring-[#172B4D]/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C7D5F5] hover:shadow-[0_14px_32px_-18px_rgba(23,43,77,0.15)]"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF0FF]"
                            style={{ background: col.accentSoft }}
                          >
                            <item.icon size={16} className="text-brand-navy" aria-hidden />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold leading-snug text-brand-navy">{item.title}</p>
                            <p className="mt-1 text-xs leading-snug text-[#6B778C]">{item.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature request  -  navy band with subtle blueprint (home FinalCTA family) */}
        <section className="relative overflow-hidden bg-brand-navy py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={blueprintBg} aria-hidden />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <motion.p {...scrollMotionProps(isMobile, { y: 8, duration: 0.38 })} className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
              Your voice, on the roadmap
            </motion.p>
            <motion.h2 {...scrollMotionProps(isMobile, { y: 12, duration: 0.45, delay: 0.05 })} className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Tell us what your team needs.
            </motion.h2>
            <motion.p {...scrollMotionProps(isMobile, { y: 12, duration: 0.45, delay: 0.08 })} className="mb-10 text-base leading-snug text-white/65">
              Every feature on this roadmap came from a real conversation with a construction professional. If something is
              missing, let us know  -  we read every message.
            </motion.p>
            <motion.form
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.45, delay: 0.1 })}
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                window.location.href = `mailto:product@zedops.com?subject=Feature Request&body=${encodeURIComponent((data.get("request") as string) ?? "")}`;
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label htmlFor="role" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Your role
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white transition-colors focus:border-brand-orange focus:outline-none"
                >
                  <option value="" className="text-brand-navy">
                    Select your role
                  </option>
                  <option value="gc" className="text-brand-navy">
                    General Contractor
                  </option>
                  <option value="owner" className="text-brand-navy">
                    Owner / Developer
                  </option>
                  <option value="pm" className="text-brand-navy">
                    Project Manager
                  </option>
                  <option value="consultant" className="text-brand-navy">
                    Consultant / CM Firm
                  </option>
                  <option value="other" className="text-brand-navy">
                    Other
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="request" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
                  What would you like ZedOps to build?
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={4}
                  required
                  placeholder="Describe the feature or workflow you wish existed..."
                  className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-brand-orange focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-bold text-white transition-all duration-150 hover:bg-brand-orange-soft"
              >
                Send feature request
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="pt-1 text-center text-xs text-white/35">This opens your email client. We respond to every request personally.</p>
            </motion.form>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
