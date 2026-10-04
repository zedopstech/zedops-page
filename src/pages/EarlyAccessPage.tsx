import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Minus, Plus, Rocket, Users, Zap } from "lucide-react";
import { FormError, Honeypot, SubmitButton, useLeadForm } from "@/components/forms/useLeadForm";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { framePad, Highlight, Muted, Section } from "@/components/design-system/primitives";

const roles = ["MEP contractor", "General contractor", "Owner / developer", "Consultant / CM firm", "Subcontractor", "Other"];
const sizes = ["1–50 people", "51–200 people", "201–1,000 people", "1,000+ people"];
const countries = ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Other"];

const perks = [
  { icon: Users, title: "Onboarding with our team", body: "We set up your first project with you, not a help article." },
  { icon: Zap, title: "New features every week", body: "Early customers see improvements land weekly, often from their own feedback." },
  { icon: Rocket, title: "Founding-customer pricing", body: "Early teams keep founding rates after public launch." },
];

const steps = [
  { title: "Apply", body: "Tell us about your team and projects. It takes two minutes." },
  { title: "Short call", body: "We walk through your workflows and agree a first project." },
  { title: "Go live", body: "We set up your workspace and get your first job running." },
];

const faqs = [
  { q: "What happens after I apply?", a: "We read every application and reply within one business day. If there is a fit, we suggest a short call about your projects." },
  { q: "Is there a cost?", a: "We agree terms on the call, based on your team size and how you plan to use ZedOps. Early teams get founding-customer pricing." },
  { q: "Who is a good fit?", a: "Contractors with live projects who want estimates, programmes, materials, site logs and cost in one place, and who are happy to share feedback." },
  { q: "How long does onboarding take?", a: "We agree a first project on the call and set it up with you. You can start with one job and add more when you are ready." },
  { q: "Can our IT team review security first?", a: "Yes. We share our architecture and controls, and walk your IT or procurement team through them before you start." },
];

const field =
  "mt-1.5 h-11 w-full rounded-md border border-[#DCE3ED] bg-white px-3.5 text-[15px] text-brand-navy placeholder:text-[#677388] outline-none transition-colors focus:border-brand-navy";

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E3E8F0]">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 py-5 text-start">
        <span className="text-[17px] font-medium tracking-[-0.01em] text-brand-navy">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#E3E8F0] text-brand-navy">
          {open ? <Minus size={14} aria-hidden /> : <Plus size={14} aria-hidden />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="max-w-2xl pb-5 text-[15.5px] leading-[1.6] text-[#5E6C84]">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function EarlyAccessPage() {
  const isMobile = useIsMobile();
  useSEO({
    title: "Request Early Access  -  ZedOps",
    description: "Apply for early access to ZedOps. Onboarding with our team, weekly releases and founding-customer pricing for construction and MEP teams.",
    // The visible FAQ answers are mirrored here, so the markup can never drift from the page.
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
  });

  const lead = useLeadForm("early_access");
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", size: "", country: "", challenge: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void lead.submit({
      name: form.name,
      email: form.email,
      company: form.company,
      country: form.country,
      role: form.role,
      companySize: form.size,
      message: form.challenge,
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Early access"
          PillIcon={Rocket}
          title={<>Run your next project on ZedOps. <Muted>With our team beside you.</Muted></>}
          subtitle="We are onboarding a small number of contractors. Tell us about your projects and we will be in touch within one business day."
        />

        <Section tone="mist" labelledBy="ea-form-title">
          <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className={`py-12 lg:py-16 ${framePad}`}>
              <h2 className="text-[22px] font-medium tracking-[-0.025em] text-brand-navy">What you get</h2>
              <ul className="mt-6 space-y-6">
                {perks.map((p) => (
                  <li key={p.title} className="flex gap-3.5">
                    <p.icon size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                    <div>
                      <p className="text-[15.5px] font-medium text-brand-navy">{p.title}</p>
                      <p className="mt-0.5 text-[14.5px] leading-[1.55] text-[#616D82]">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className="mt-12 text-[15px] font-medium text-brand-navy">What happens next</h3>
              <ol className="mt-4 border-s border-[#DCE3ED]">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative pb-5 ps-6 last:pb-0">
                    <span className="absolute top-0 -left-[9px] flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#DCE3ED] bg-white font-mono text-[10px] text-brand-navy">{i + 1}</span>
                    <p className="text-[14.5px] font-medium text-brand-navy">{s.title}</p>
                    <p className="text-[14px] text-[#616D82]">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-[#E3E8F0] bg-white px-5 py-12 sm:px-8 lg:border-t-0 lg:border-s lg:px-14 lg:py-16">
              {lead.sent ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[460px] flex-col items-start justify-center">
                  <CheckCircle2 size={36} className="text-[#1D9A5B]" aria-hidden />
                  <h2 className="mt-5 text-[28px] font-medium tracking-[-0.03em] text-brand-navy">You’re on the list.</h2>
                  <p className="mt-2 max-w-sm text-[16px] leading-[1.6] text-[#5E6C84]">Thanks, {form.name.split(" ")[0] || "there"}. We’ll email {form.email || "you"} within one business day to arrange a call.</p>
                  <a href="/" className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-navy">Back to home <ArrowRight size={15} aria-hidden /></a>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} aria-labelledby="ea-form-title" className="relative">
                  <Honeypot inputRef={lead.honeypot} />
                  <h2 id="ea-form-title" className="text-[22px] font-medium tracking-[-0.025em] text-brand-navy">Apply for early access</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="text-[13px] text-[#5E6C84]">Full name
                      <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={field} autoComplete="name" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Work email
                      <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@company.com" className={field} autoComplete="email" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Company
                      <input name="company" required value={form.company} onChange={onChange} placeholder="Company name" className={field} autoComplete="organization" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Country
                      <select name="country" required value={form.country} onChange={onChange} className={field}>
                        <option value="">Select country</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Your company is a
                      <select name="role" required value={form.role} onChange={onChange} className={field}>
                        <option value="">Select type</option>
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Company size
                      <select name="size" required value={form.size} onChange={onChange} className={field}>
                        <option value="">Select size</option>
                        {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </label>
                    <label className="text-[13px] text-[#5E6C84] sm:col-span-2">What would you like to fix first? <span className="text-[#677388]">(optional)</span>
                      <textarea name="challenge" value={form.challenge} onChange={onChange} rows={4} placeholder="For example: material tracking across sites, daily reporting, cost visibility…" className={`${field} h-auto py-3`} />
                    </label>
                  </div>
                  <FormError message={lead.error} />
                  <SubmitButton sending={lead.sending}>Apply for early access</SubmitButton>
                  <p className="mt-4 text-[13px] text-[#5F6B80]">
                    We use your details only to respond to your application. See our <a href="/privacy" className="underline underline-offset-2 hover:text-brand-navy">privacy policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Section>

        <Section labelledBy="ea-faq">
          <div className={`grid gap-10 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <h2 id="ea-faq" className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy sm:text-[40px]">Questions, <Highlight>answered.</Highlight></h2>
            </motion.div>
            <div className="border-t border-[#E3E8F0]">
              {faqs.map((f) => <Faq key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
