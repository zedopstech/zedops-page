import { FileText } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n";

// Plain-language draft. Entity name, registered address and jurisdiction should be confirmed by counsel.
const sections = [
  {
    title: "1. Agreement",
    body: `These Terms govern your use of the ZedOps website and platform (the "Service"). By using the Service you agree to them. If you use the Service for a company, you confirm you can bind that company to these Terms.`,
  },
  {
    title: "2. The Service",
    body: `ZedOps is a project execution platform for construction and MEP teams, including Zed AI. During early access, features and pricing may change. We will give you reasonable notice by email of any material change.`,
  },
  {
    title: "3. Your account",
    body: `You are responsible for your users, their roles and keeping login details secure. Tell us promptly at security@zedops.com if you suspect unauthorised access.`,
  },
  {
    title: "4. Acceptable use",
    body: `You agree not to:
• Access data or parts of the Service you are not authorised to use
• Probe, disrupt or attempt to bypass our security
• Copy, reverse engineer or resell the Service without our written consent
• Use the Service for anything unlawful, harmful or fraudulent

We may suspend accounts that break these rules.`,
  },
  {
    title: "5. Fees and taxes",
    body: `Fees are set out in your order or agreement and are billed in advance, monthly or annually. Fees exclude VAT and other applicable taxes, which we add where the law requires. Except where the law says otherwise, fees are non-refundable. We will give 30 days’ written notice of any price change.`,
  },
  {
    title: "6. Your data",
    body: `You own the data you put into the Service ("Customer Data"). You give us a limited licence to process it only to provide, secure and support the Service. We handle personal data as described in our Privacy Policy. We may use anonymised, aggregated usage statistics that never identify you or your projects.`,
  },
  {
    title: "7. Zed AI",
    body: `Zed AI produces suggestions, drafts and summaries from your project data. Outputs can be wrong and must be reviewed by a competent person before you rely on them. Zed AI only uses data the requesting user is allowed to see, and we do not use Customer Data to train shared models.`,
  },
  {
    title: "8. Ending the agreement",
    body: `Either party may end a subscription at the end of the current billing period by written notice. We may end it immediately for a material breach. After termination your data stays available read-only for 90 days so you can export it, and is then permanently deleted.`,
  },
  {
    title: "9. Liability",
    body: `To the extent the law allows, our total liability for any claim is limited to the fees you paid in the 12 months before the claim. Neither party is liable for indirect or consequential loss, including lost profit or lost data. Nothing in these Terms limits liability that cannot be limited by law.`,
  },
  {
    title: "10. Changes",
    body: `We may update these Terms. We will email you at least 30 days before a material change takes effect. Continuing to use the Service after that date means you accept the updated Terms.`,
  },
  {
    title: "11. Governing law",
    body: `These Terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have exclusive jurisdiction over any dispute. If these Terms are translated, the English version prevails.`,
  },
];

export default function TermsPage() {
  const { t } = useI18n();
  useSEO({
    title: "Terms of Use – ZedOps",
    description: "The terms that govern use of the ZedOps website and platform: accounts, acceptable use, fees, data, Zed AI and liability.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero pill={t("Legal")} PillIcon={FileText} title={t("Terms of Service")} subtitle={t("Last updated: September 2026")} />
        <LegalContent sections={sections} email="legal@zedops.com" />
      </main>
      <Footer />
    </div>
  );
}
