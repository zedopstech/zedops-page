import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const NAVY = "#172B4D";
const ORANGE = "#F79625";

const faqs = [
  {
    q: "How does early access work?",
    a: "Early access is invite-based. Once you apply, a member of the founding team reviews your application and reaches out within one business day to schedule a personal onboarding call. We walk you through the platform together  -  no self-serve trial, no automated drip emails. You get direct access to the people building ZedOps.",
  },
  {
    q: "Can I change plans mid-contract?",
    a: "Yes, upgrades take effect immediately and we prorate the difference so you're never charged twice for the same period. Downgrades take effect at the next billing cycle. There are no penalties for changing plans  -  we want you on the tier that makes sense for your current portfolio size.",
  },
  {
    q: "How does per-seat pricing work for the Professional plan?",
    a: "Professional is priced per workspace (not per seat), so you can invite your entire project team  -  field crews, subcontractors, clients  -  without worrying about seat count. The plan covers unlimited members across unlimited projects.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your data stays accessible in read-only mode for 90 days after cancellation. You can export everything  -  projects, drawings, daily logs, reports  -  in standard formats (PDF, CSV, IFC) at any point during or after your subscription. We do not delete data within that 90-day window.",
  },
  {
    q: "Does ZedOps integrate with our existing ERP or accounting tools?",
    a: "Starter plans get our native integrations (Xero, QuickBooks, Procore import). Professional adds full REST API access and webhooks, so your team can connect any tool. Enterprise includes custom integration development and dedicated integration support as part of your package.",
  },
  {
    q: "How is the AI Copilot different from a basic chatbot?",
    a: "Zed Copilot is context-aware  -  it reads your actual live project data (schedules, drawings, RFIs, daily logs, risk flags) before answering. It can generate a risk summary for a specific project, draft an RFI response using the relevant drawing markups, or flag upcoming delivery clashes based on your supply chain data. It is not a generic LLM wrapper; it has deep read access to your ZedOps workspace.",
  },
  {
    q: "Is there a minimum contract length for Enterprise?",
    a: "Enterprise agreements are typically annual, but we do offer quarterly and multi-year options depending on portfolio scale. All Enterprise pricing is custom  -  talk to our sales team and we'll structure a contract that fits your procurement cycle.",
  },
  {
    q: "Can I bring my own AI API key?",
    a: "Yes  -  Enterprise customers can connect ZedOps to their own OpenAI, Azure OpenAI, or Anthropic API keys. When you use BYOK, your project data is processed within your own AI account and is never used to train shared models. This gives you full control over your AI usage costs and ensures your data stays within your own AI account boundary.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.055 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-base font-bold leading-snug transition-colors duration-150"
          style={{ color: open ? ORANGE : NAVY }}
        >
          {q}
        </span>
        <div
          className="w-7 h-7 flex items-center justify-center shrink-0 transition-colors duration-150"
          style={{
            background: open ? ORANGE : "#F0F4FF",
            borderRadius: 6,
          }}
        >
          {open
            ? <Minus size={13} color="white" />
            : <Plus size={13} color={NAVY} />
          }
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-[#42526E] text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingFAQ() {
  return (
    <section className="bg-[#F8FAFF] border-t border-blue-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left  -  sticky heading */}
          <div className="lg:w-80 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-sm rotate-45 bg-[#172B4D]" />
                <span className="text-[#172B4D] text-xs font-bold tracking-[0.15em] uppercase">FAQ</span>
              </div>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: NAVY }}>
                Got questions? We're here to{" "}
                <span className="text-[#172B4D]">help.</span>
              </h2>
              <p className="text-[#42526E] text-base leading-relaxed mb-8">
                Whether you're exploring or ready to get started, our team is here to guide you every step of the way.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white transition-all duration-150 hover:opacity-90"
                style={{ background: NAVY, borderRadius: 6 }}
              >
                Contact support
              </a>
            </motion.div>
          </div>

          {/* Right  -  accordion list */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 px-8" style={{ borderRadius: 6 }}>
              {faqs.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
