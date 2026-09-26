import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { framePad, Muted, Section } from "@/components/design-system/primitives";
import { contact, offices } from "@/data/contact";

const topics = ["Book a demo", "Pricing", "Security & IT", "Partnership", "Support", "Something else"];
const topicFromQuery: Record<string, string> = { demo: "Book a demo", security: "Security & IT", pricing: "Pricing" };

const field =
  "mt-1.5 h-11 w-full rounded-md border border-[#DCE3ED] bg-white px-3.5 text-[15px] text-brand-navy placeholder:text-[#A5AEBF] outline-none transition-colors focus:border-brand-navy";

export default function ContactPage() {
  useSEO({
    title: "Contact  -  ZedOps",
    description: "Talk to the ZedOps team about a demo, pricing, security or partnerships. We reply within one business day.",
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", topic: "", message: "" });

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && topicFromQuery[topic]) setForm((prev) => ({ ...prev, topic: topicFromQuery[topic]! }));
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const ways = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: ShieldCheck, label: "Security", value: contact.securityEmail, href: `mailto:${contact.securityEmail}` },
    { icon: Clock, label: "Hours", value: contact.hours },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Contact"
          PillIcon={Mail}
          title={<>Talk to the team. <Muted>Real people, one business day.</Muted></>}
          subtitle="Demos, pricing, security reviews or partnerships. Your message goes straight to the people building ZedOps."
        />

        <Section tone="mist" labelledBy="contact-form-title">
          <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className={`py-12 lg:py-16 ${framePad}`}>
              <h2 className="text-[22px] font-medium tracking-[-0.025em] text-brand-navy">Other ways to reach us</h2>
              <ul className="mt-6 divide-y divide-[#E3E8F0] border-y border-[#E3E8F0]">
                {ways.map((w) => (
                  <li key={w.label} className="flex items-start gap-3 py-4">
                    <w.icon size={17} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-[12.5px] text-[#8C97AB]">{w.label}</p>
                      {w.href ? (
                        <a href={w.href} className="text-[15px] text-brand-navy hover:underline">{w.value}</a>
                      ) : (
                        <p className="text-[15px] text-brand-navy">{w.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {offices.map((o) => (
                  <address key={o.name} className="text-[14px] not-italic leading-[1.6] text-[#5E6C84]">
                    <span className="flex items-center gap-2 text-[15px] font-medium text-brand-navy">
                      <MapPin size={15} className="text-brand-orange" aria-hidden />
                      {o.name}
                    </span>
                    <span className="mb-1 block text-[12.5px] text-[#8C97AB]">{o.role}</span>
                    {o.address.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                ))}
              </div>
              <p className="mt-8 text-[14px] leading-[1.6] text-[#6B778C]">
                Ready to try it on a live job?{" "}
                <a href="/early-access" className="font-medium text-brand-navy underline underline-offset-4 hover:text-brand-orange">Request early access</a>.
              </p>
            </div>

            <div className="border-t border-[#E3E8F0] bg-white px-5 py-12 sm:px-8 lg:border-t-0 lg:border-l lg:px-14 lg:py-16">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col items-start justify-center">
                  <CheckCircle2 size={36} className="text-[#1D9A5B]" aria-hidden />
                  <h2 className="mt-5 text-[28px] font-medium tracking-[-0.03em] text-brand-navy">Message received.</h2>
                  <p className="mt-2 max-w-sm text-[16px] leading-[1.6] text-[#5E6C84]">Thanks, {form.name.split(" ")[0] || "there"}. We’ll reply to {form.email || "you"} within one business day.</p>
                  <a href="/" className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-navy">
                    Back to home <ArrowRight size={15} aria-hidden />
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} aria-labelledby="contact-form-title">
                  <h2 id="contact-form-title" className="text-[22px] font-medium tracking-[-0.025em] text-brand-navy">Send us a message</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="text-[13px] text-[#5E6C84]">Full name
                      <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={field} autoComplete="name" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Work email
                      <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@company.com" className={field} autoComplete="email" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Company
                      <input name="company" value={form.company} onChange={onChange} placeholder="Company name" className={field} autoComplete="organization" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84]">Phone <span className="text-[#A5AEBF]">(optional)</span>
                      <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+971 50 000 0000" className={field} autoComplete="tel" />
                    </label>
                    <label className="text-[13px] text-[#5E6C84] sm:col-span-2">Topic
                      <select name="topic" required value={form.topic} onChange={onChange} className={field}>
                        <option value="">Choose a topic</option>
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="text-[13px] text-[#5E6C84] sm:col-span-2">Message
                      <textarea name="message" required value={form.message} onChange={onChange} rows={5} placeholder="Tell us about your projects and what you’d like to see." className={`${field} h-auto py-3`} />
                    </label>
                  </div>
                  <button type="submit" className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-navy px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#1E3760]">
                    Send message <ArrowRight size={16} aria-hidden />
                  </button>
                  <p className="mt-4 text-[13px] text-[#8C97AB]">
                    We use your details only to reply. See our <a href="/privacy" className="underline underline-offset-2 hover:text-brand-navy">privacy policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
