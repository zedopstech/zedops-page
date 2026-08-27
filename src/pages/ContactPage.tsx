import { useSEO } from "@/hooks/useSEO";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, MessageCircle, Shield, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const subjects = [
  "General enquiry",
  "Early access / demo",
  "Pricing & plans",
  "Technical question",
  "Partnership",
  "Press enquiry",
  "Other",
];

const perks = [
  {
    icon: Clock,
    title: "Reply within one business day",
    desc: "We read every message. No auto-replies pretending a human wrote them.",
  },
  {
    icon: MessageCircle,
    title: "Talk to the people building it",
    desc: "Product, security, or partnership questions go straight to the team  -  not a call centre script.",
  },
  {
    icon: Shield,
    title: "IT & security welcome",
    desc: "Need architecture details, data flow, or BYOK? We're happy to go deep with your team.",
  },
];

export default function ContactPage() {
  useSEO({
    title: "Contact  -  ZedOps",
    description: "Get in touch with the ZedOps team. Product questions, pricing, partnerships, or security enquiries  -  a real person responds within one business day.",
  });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic === "demo") {
      setForm((prev) => ({ ...prev, subject: "Early access / demo" }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Contact"
          PillIcon={Mail}
          title={<>We'd love to<br />hear from you.</>}
          subtitle="Ask us anything  -  product, pricing, partnerships, or security. A real person will get back to you within one business day."
        />

        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left  -  why reach out */}
            <div>
              <SectionHeader
                eyebrow="Why reach out"
                title="Talk to a real person."
                subtitle="No auto-replies. Your message goes straight to the team building ZedOps."
              />

              <div className="flex flex-col gap-4">
                {perks.map((perk, i) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-4 bg-white border border-gray-200/90 px-4 py-3.5 rounded-xl"
                  >
                    <div className="w-9 h-9 bg-brand-navy flex items-center justify-center shrink-0 rounded-lg mt-0.5">
                      <perk.icon size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-brand-navy font-bold text-sm">{perk.title}</p>
                      <p className="text-[#42526E] text-xs mt-0.5 leading-snug">{perk.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 text-sm text-[#42526E] flex items-center gap-2"
              >
                <Mail size={16} className="text-brand-navy shrink-0" />
                <span>Prefer email? We read the same inbox  -  just use the form.</span>
              </motion.p>
            </div>

            {/* Right  -  form */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_-4px_rgba(23,43,77,0.08)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center max-w-md mx-auto"
                >
                  <CheckCircle2 size={52} className="text-green-500 mx-auto mb-5" />
                  <h2 className="text-2xl font-extrabold text-brand-navy mb-3">Message received.</h2>
                  <p className="text-[#6B778C] leading-snug mb-6">
                    Thanks for reaching out. We'll get back to you within one business day.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm rounded-md transition-all"
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
                  <h2 className="text-2xl font-extrabold text-brand-navy mb-1">Send us a message</h2>
                  <p className="text-[#6B778C] text-sm mb-7">We typically reply within one business day.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-navy uppercase tracking-wide mb-1.5">Name *</label>
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-brand-navy placeholder:text-[#97A0AF] focus:outline-none focus:border-brand-navy transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-navy uppercase tracking-wide mb-1.5">Email *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-brand-navy placeholder:text-[#97A0AF] focus:outline-none focus:border-brand-navy transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wide mb-1.5">Subject *</label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-navy transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wide mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm text-brand-navy placeholder:text-[#97A0AF] focus:outline-none focus:border-brand-navy transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-brand-orange-soft text-white font-bold text-sm rounded-md transition-all duration-150 group mt-1"
                    >
                      Send message
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <p className="text-xs text-[#97A0AF] text-center">
                      For early access onboarding, you can also use the dedicated request form  -  it helps us prepare for your call.
                    </p>
                    <a href="/early-access" className="text-center text-xs font-semibold text-[#0052CC] hover:underline">
                      Request early access instead
                    </a>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
