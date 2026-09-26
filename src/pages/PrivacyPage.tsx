import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const sections = [
  {
    title: "1. Who we are",
    body: `ZedOps is an AI-powered construction operations platform operated by ZedOps, Inc. ("ZedOps", "we", "us"). This Privacy Policy explains how we collect, use, and protect information when you use our website (zedops.com) and our platform.

If you have questions about this policy or how we handle your data, contact us at privacy@zedops.com.`,
  },
  {
    title: "2. What data we collect",
    body: `When you sign up for early access or contact us, we collect:
• Name, email address, company name, and role
• Information you voluntarily provide in forms
• Usage data from the platform (project activity, feature usage) once you are a customer
• Technical data such as IP address, browser type, and device identifiers

We do not sell your personal data to third parties.`,
  },
  {
    title: "3. How we use your data",
    body: `We use the data we collect to:
• Respond to your enquiry or process your early access application
• Provide and improve the ZedOps platform
• Send product updates and relevant communications (you may opt out at any time)
• Comply with legal obligations

We do not use your project data to train shared AI models. Enterprise customers may connect their own AI API keys (BYOK) so that no project data ever leaves their own AI account.`,
  },
  {
    title: "4. Where your data is stored",
    body: `All data is hosted on Amazon Web Services (AWS) infrastructure located in the United States (us-east-1 region by default). Enterprise customers may request a specific hosting region during onboarding.

Databases are hosted in private VPCs and are never exposed to the public internet. Data is encrypted at rest (AES-256) and in transit (TLS 1.3).`,
  },
  {
    title: "5. Data isolation",
    body: `Every organisation on ZedOps runs on its own dedicated database. Your project data is never co-mingled with another company's data at the database layer.`,
  },
  {
    title: "6. Your rights (GDPR / UK GDPR)",
    body: `If you are based in the European Economic Area or the United Kingdom, you have the right to:
• Access the personal data we hold about you
• Request correction or deletion of your data
• Object to or restrict certain processing
• Request a machine-readable export of your data
• Lodge a complaint with your local data protection authority

To exercise any of these rights, email privacy@zedops.com and we will respond within 30 days.`,
  },
  {
    title: "7. Cookies",
    body: `We use essential browser storage to operate the website and platform. We do not set advertising cookies and we do not build advertising profiles.

Analytics: we use Google Analytics to understand which pages are read so we can improve them. Google Analytics stays switched off until you accept it in the cookie banner, and declining means nothing is sent to Google at all - not that data is sent and then discarded. When you do accept, we enable IP anonymisation, disable Google Signals, and redact advertising identifiers, so what Google receives is aggregate visit counts rather than a profile of you.

Changing your mind: use "Cookie Settings" in the footer to reopen the banner at any time. You can also block or delete cookies through your browser settings. Your choice is kept in your browser's local storage rather than in a cookie, and is never transmitted to our servers.

This notice previously referred to "our cookie banner" at a time when no banner existed. One does now.`,
  },
  {
    title: "8. Data retention",
    body: `We retain your data for as long as your account is active or as needed to provide services. After account closure, data is held in read-only state for 90 days before deletion. You may request immediate deletion by emailing privacy@zedops.com.`,
  },
  {
    title: "9. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will update the "last updated" date below and, where material changes are made, notify customers via email. Continued use of ZedOps after changes are posted constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy  -  ZedOps",
    description:
      "How ZedOps collects, uses, and protects information when you use our website and platform, including your rights and how to contact us.",
  });

  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div>
        <PageHero
          pill="Legal"
          PillIcon={Shield}
          title="Privacy Policy"
          subtitle="Last updated: April 2026"
        />

        <LegalContent sections={sections} email="privacy@zedops.com" />
        <Footer />
      </div>
    </div>
  );
}
