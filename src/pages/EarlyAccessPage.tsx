import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Users, Rocket, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roles = [
  "General Contractor",
  "Owner / Developer",
  "Project Manager",
  "Consultant / CM Firm",
  "Subcontractor",
  "Other",
];

const sizes = [
  "1–10 people",
  "11–50 people",
  "51–200 people",
  "200+ people",
];

const perks = [
  {
    icon: Users,
    title: "Founder-direct onboarding",
    desc: "A real person from the founding team walks you through setup. No ticket queues.",
  },
  {
    icon: Zap,
    title: "Features shipping every week",
    desc: "We move fast. Early access customers see new capabilities land weekly.",
  },
  {
    icon: Rocket,
    title: "Early access pricing",
    desc: "Early members lock in founding-cohort rates before our public launch pricing kicks in.",
  },
];

const earlyAccessFaqs = [
  {
    q: "What happens after I apply?",
    a: "We read every submission. You’ll usually hear back within one business day with next steps. If there’s a fit, we’ll suggest a short call to align on your projects and how ZedOps maps to your workflows.",
  },
  {
    q: "Is there a cost to join?",
    a: "We discuss options on the call. Early cohorts often get terms that reflect where the product is today  -  scoped to your team size and how you plan to use the platform.",
  },
  {
    q: "Who is a good fit?",
    a: "Teams with live construction work who want execution data  -  schedules, logs, issues, documents, supply chain  -  in one system, and who are open to feedback as we ship improvements often.",
  },
  {
    q: "How does onboarding work?",
    a: "We walk you through tenant setup and how to structure projects. You can start with a limited scope or a single job, depending on what your team prefers.",
  },
  {
    q: "Can we review security and data handling?",
    a: "Yes. Bring your IT or procurement questions to the call  -  we’ll share an overview and next steps so you can complete your review.",
  },
];

function EarlyAccessFaqItem({
  q,
  a,
  index,
  invert = false,
}: {
  q: string;
  a: string;
  index: number;
  invert?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: index * 0.05 })}
      className={invert ? "border-b border-white/10 last:border-b-0" : "border-b border-gray-200 last:border-b-0"}
    >
      <button type="button" onClick={() => setOpen(!open)} className="group flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5">
        <span
          className={`text-sm font-bold leading-snug sm:text-base ${
            open ? "text-[#F79625]" : invert ? "text-white" : "text-[#172B4D]"
          }`}
        >
          {q}
        </span>
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-150"
          style={{
            background: open ? "#F79625" : invert ? "rgba(255,255,255,0.12)" : "#F0F4FF",
            borderRadius: 6,
          }}
        >
          {open ? (
            <Minus size={13} className="text-white" />
          ) : (
            <Plus size={13} className={invert ? "text-white" : "text-[#172B4D]"} />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className={`pb-4 pr-10 text-sm leading-relaxed sm:pb-5 ${invert ? "text-white/70" : "text-[#42526E]"}`}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EarlyAccessPage() {
  useSEO({
    title: "Request Early Access  -  ZedOps",
    description: "Apply for early access to ZedOps. Limited spots available for construction teams. Founder-direct onboarding, weekly feature releases, and early access pricing.",
  });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    size: "",
    email: "",
    challenge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#172B4D] overflow-x-hidden">
      <Navbar />

      {/* Full-bleed split section */}
      <div className="min-h-screen pt-[100px] grid lg:grid-cols-2">

        {/* ── Left panel  -  content ── */}
        <div
          className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24 relative overflow-hidden"
          style={{
            background: "linear-gradient(155deg, #C4D9FF 0%, #D9EBFF 28%, #ECF3FF 58%, #F2F6FF 100%)",
          }}
        >
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
                "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
            }}
          />
          {/* Warm glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(247,150,37,0.13) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 max-w-md">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-7 inline-flex border border-[#172B4D]/20 bg-white/80 items-center gap-2 px-4 py-1.5"
              style={{ borderRadius: 99 }}
            >
              <Sparkles size={12} className="text-[#F79625]" />
              <span className="text-[#172B4D] text-xs font-bold tracking-[0.12em] uppercase">Early Access · Limited spots</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-[#172B4D] mb-5"
            >
              Get early access<br />
              to ZedOps.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-[#42526E] text-base leading-relaxed mb-10"
            >
              We're onboarding a select group of construction teams. Every applicant gets a personal review  -  and a direct call with the founding team.
            </motion.p>

            {/* Perks */}
            <div className="flex flex-col gap-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4 bg-white/70 border border-white/60 px-4 py-3.5 rounded-xl backdrop-blur-sm"
                >
                  <div className="w-9 h-9 bg-[#172B4D] flex items-center justify-center shrink-0 rounded-lg mt-0.5">
                    <perk.icon size={16} className="text-[#F79625]" />
                  </div>
                  <div>
                    <p className="text-[#172B4D] font-bold text-sm">{perk.title}</p>
                    <p className="text-[#42526E] text-xs mt-0.5 leading-relaxed">{perk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel  -  form ── */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24 bg-white">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-md mx-auto"
            >
              <CheckCircle2 size={52} className="text-green-500 mx-auto mb-5" />
              <h2 className="text-2xl font-extrabold text-[#172B4D] mb-3">You're on the list.</h2>
              <p className="text-[#6B778C] leading-relaxed mb-6">
                Thanks for applying. We review every request personally and will reach out within one business day to schedule your onboarding call.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#172B4D] hover:bg-[#0e1e38] text-white font-bold text-sm rounded-md transition-all"
              >
                Back to home <ArrowRight size={14} />
              </a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-md w-full mx-auto"
            >
              <h2 className="text-2xl font-extrabold text-[#172B4D] mb-1">Request your spot</h2>
              <p className="text-[#6B778C] text-sm mb-7">We'll be in touch within one business day.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Full name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Sarah Chen"
                      className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] placeholder:text-[#97A0AF] focus:outline-none focus:border-[#172B4D] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Company *</label>
                    <input
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Meridian Build Group"
                      className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] placeholder:text-[#97A0AF] focus:outline-none focus:border-[#172B4D] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Your role *</label>
                    <select
                      name="role"
                      required
                      value={form.role}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] focus:outline-none focus:border-[#172B4D] transition-colors bg-white"
                    >
                      <option value="">Select role</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Company size *</label>
                    <select
                      name="size"
                      required
                      value={form.size}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] focus:outline-none focus:border-[#172B4D] transition-colors bg-white"
                    >
                      <option value="">Select size</option>
                      {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Work email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="sarah@meridianbuilds.com"
                    className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] placeholder:text-[#97A0AF] focus:outline-none focus:border-[#172B4D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B4D] uppercase tracking-wide mb-1.5">Biggest project management challenge?</label>
                  <textarea
                    name="challenge"
                    value={form.challenge}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. PMs spend too much time on reporting instead of being on site..."
                    className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-[#172B4D] placeholder:text-[#97A0AF] focus:outline-none focus:border-[#172B4D] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#F79625] hover:bg-[#e07a10] text-white font-bold text-sm rounded-md transition-all duration-150 group mt-1"
                >
                  Request early access
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p className="text-[11px] text-[#97A0AF] text-center">
                  We review every application personally  -  a real person will reach out within one business day.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* FAQ + quick links */}
      <section
        className="border-t border-white/10 bg-[#172B4D] py-16 sm:py-20"
        aria-labelledby="early-access-faq-heading"
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
          <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#B8C9DC]">
            Before you apply
          </p>
          <h2
            id="early-access-faq-heading"
            className="mb-3 text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            Common questions
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm leading-relaxed text-white/65">
            Quick answers about timing, fit, and what to expect. Still unsure?{" "}
            <a
              href="/contact"
              className="font-semibold text-[#F79625] underline-offset-2 hover:text-white hover:underline"
            >
              Contact us
            </a>
            .
          </p>
          <div className="rounded-2xl border border-white/12 bg-[#0f1c33]/90 px-4 backdrop-blur-sm sm:px-6">
            {earlyAccessFaqs.map((item, i) => (
              <EarlyAccessFaqItem key={item.q} q={item.q} a={item.a} index={i} invert />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-semibold text-white/55">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8C9DC]">Explore</span>
            <a href="/platform" className="text-white/90 hover:text-[#F79625]">
              Platform features
            </a>
            <span className="hidden text-white/25 sm:inline">·</span>
            <a href="/solutions" className="text-white/90 hover:text-[#F79625]">
              Solutions
            </a>
            <span className="hidden text-white/25 sm:inline">·</span>
            <a href="/zed-ai" className="text-white/90 hover:text-[#F79625]">
              Zed AI
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
