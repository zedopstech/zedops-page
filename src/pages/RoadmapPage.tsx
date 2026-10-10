import { type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Map } from "lucide-react";
import { FormError, Honeypot, SubmitButton, useLeadForm } from "@/components/forms/useLeadForm";
import { useSEO } from "@/hooks/useSEO";
import { useI18n } from "@/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { framePad, Muted, Section } from "@/components/design-system/primitives";

type Column = { label: string; note: string; dot: string; items: { title: string; desc: string }[] };

const columns: Column[] = [
  {
    label: "Live",
    note: "In production",
    dot: "bg-[#1D9A5B]",
    items: [
      { title: "Estimation & BOQs", desc: "Takeoffs, rate library and priced BOQs." },
      { title: "Planning & scheduling", desc: "Programmes, tasks and progress." },
      { title: "Material management", desc: "Requests, POs and deliveries." },
      { title: "Daily logs", desc: "Site reports with photos, from any device." },
      { title: "Quality, safety & punch", desc: "Inspections, incidents and closeout." },
      { title: "Budget & cost control", desc: "Budgets, commitments and actuals." },
      { title: "Roles & isolation", desc: "Role-based access, a database per customer." },
      { title: "Zed AI risk alerts", desc: "RFI drafting and clash checks." },
      { title: "Custom workflows", desc: "Your own approval chains and automations." },
      { title: "Drawing takeoff", desc: "Measure drawings and push quantities to the estimate." },
      { title: "Vendor portal", desc: "RFQ quotes, purchase orders and invoices for vendors." },
      { title: "Inventory valuation", desc: "Valuation ledger, revaluation and write-downs." },
      { title: "Smart alerts & forecasts", desc: "Budget alerts, material demand and stock-out risk." },
      { title: "Multi-currency finance", desc: "Exchange-rate policy, advances, invoices and retention." },
    ],
  },
  {
    label: "Early access",
    note: "Invite only",
    dot: "bg-brand-orange",
    items: [
      { title: "Zed AI copilot", desc: "Seven specialists that answer from project data." },
      { title: "Zed AI drafts & approvals", desc: "Requests, tasks and snags drafted for your approval." },
      { title: "Scheduled AI briefs", desc: "Recurring summaries delivered to your team." },
      { title: "Project intelligence", desc: "Live analytics across tasks, cost and risk." },
      { title: "Mobile apps", desc: "Daily logs, time cards, inspections and approvals on site." },
    ],
  },
  {
    label: "Next",
    note: "Q4 2026",
    dot: "bg-[#2A62DE]",
    items: [
      { title: "Integrations", desc: "Third-party software and communication apps." },
      { title: "API access", desc: "Connect ZedOps to the tools you already use." },
      { title: "Full drawing markup", desc: "Versions, markup and team review." },
    ],
  },
  {
    label: "Later",
    note: "2027",
    dot: "bg-[#677388]",
    items: [
      { title: "BIM viewer", desc: "Models alongside drawings and RFIs." },
      { title: "SSO / SAML", desc: "Single sign-on for enterprise teams." },
      { title: "Client portals", desc: "Branded views for your clients." },
      { title: "ERP & accounting links", desc: "Deeper finance and ERP integrations." },
      { title: "SOC 2", desc: "Independent security audit." },
    ],
  },
];

const field =
  "mt-1.5 w-full rounded-md border border-[#DCE3ED] bg-white px-3.5 text-[15px] text-brand-navy placeholder:text-[#677388] outline-none transition-colors focus:border-brand-navy";

export default function RoadmapPage() {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  const lead = useLeadForm("roadmap");
  useSEO({
    title: "Roadmap – ZedOps",
    description: "What is live on ZedOps, what is in early access, and what is coming next. Updated as features ship.",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    void lead.submit({
      email: String(data.get("email") ?? ""),
      role: String(data.get("role") ?? ""),
      message: String(data.get("request") ?? ""),
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill={t("Roadmap")}
          PillIcon={Map}
          title={<>{t("What’s live, and what’s next.")} <Muted>{t("Shaped by our customers.")}</Muted></>}
          subtitle={t("We ship every week and update this page as features land.")}
        />

        <Section label={t("Roadmap")}>
          <div className="grid gap-px bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col, ci) => (
              <motion.div key={col.label} {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: ci * 0.06 })} className="bg-white">
                <div className="flex items-center justify-between border-b border-[#E8ECF2] px-6 py-5">
                  <span className="flex items-center gap-2 text-[16px] font-medium text-brand-navy">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} aria-hidden />
                    {t(col.label)}
                  </span>
                  <span className="font-mono text-[11.5px] text-[#5F6B80]">{t(col.note)}</span>
                </div>
                <ul className="px-6 py-3">
                  {col.items.map((item) => (
                    <li key={item.title} className="border-b border-[#F1F3F7] py-3.5 last:border-b-0">
                      <p className="text-[15px] font-medium text-brand-navy">{t(item.title)}</p>
                      <p className="mt-0.5 text-[13.5px] leading-[1.5] text-[#616D82]">{t(item.desc)}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section tone="mist" labelledBy="roadmap-request">
          <div className={`grid gap-10 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-28 ${framePad}`}>
            <div>
              <h2 id="roadmap-request" className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px]">
                {t("Missing something?")} <Muted>{t("Tell us what your team needs.")}</Muted>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-[#5E6C84]">{t("Most of this roadmap came from conversations with site and project teams. We read every request.")}</p>
            </div>
            {lead.sent ? (
              <div className="flex flex-col justify-center rounded-xl border border-[#E3E8F0] bg-white p-6 sm:p-8">
                <CheckCircle2 size={32} className="text-[#1D9A5B]" aria-hidden />
                <p className="mt-4 text-[22px] font-medium tracking-[-0.025em] text-brand-navy">{t("Thanks, request received.")}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#5E6C84]">{t("We read every one, and we will reply if we have questions.")}</p>
              </div>
            ) : (
            <form onSubmit={onSubmit} className="relative rounded-xl border border-[#E3E8F0] bg-white p-6 sm:p-8">
              <Honeypot inputRef={lead.honeypot} />
              <label className="block text-[13px] text-[#5E6C84]">{t("Work email")}
                <input name="email" type="email" required autoComplete="email" placeholder={t("you@company.com")} className={`${field} h-11`} />
              </label>
              <label className="mt-5 block text-[13px] text-[#5E6C84]">{t("Your role")}
                <select name="role" className={`${field} h-11`} defaultValue="">
                  <option value="">{t("Select your role")}</option>
                  <option value="Project manager">{t("Project manager")}</option>
                  <option value="Site engineer / foreman">{t("Site engineer / foreman")}</option>
                  <option value="Estimator / QS">{t("Estimator / QS")}</option>
                  <option value="Procurement">{t("Procurement")}</option>
                  <option value="Owner / developer">{t("Owner / developer")}</option>
                  <option value="Other">{t("Other")}</option>
                </select>
              </label>
              <label className="mt-5 block text-[13px] text-[#5E6C84]">{t("What would help?")}
                <textarea name="request" required rows={4} placeholder={t("Describe the feature and the problem it solves.")} className={`${field} py-3`} />
              </label>
              <FormError message={lead.error} />
              <SubmitButton sending={lead.sending}>{t("Send request")}</SubmitButton>
            </form>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
