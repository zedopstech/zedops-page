import { Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import LegalContent from "@/components/LegalContent";
import Footer from "@/components/Footer";

// Plain-language draft. Entity name, registered address and regulator references should be confirmed by counsel.
const sections = [
  {
    title: "1. Who we are",
    body: `ZedOps ("ZedOps", "we", "us") provides a project execution platform for construction and MEP teams. This policy explains what personal data we collect through our website and platform, why, and how we protect it.

We follow the data protection laws that apply where we operate, including the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), the Saudi Personal Data Protection Law and, where relevant, the DIFC and ADGM data protection regulations.

Contact: privacy@zedops.com`,
  },
  {
    title: "2. Our role",
    body: `For website visitors and people who contact us, we decide how data is used (we are the controller).

For project data your organisation stores in ZedOps, your organisation is the controller and we process it on its instructions (we are the processor). Your organisation’s own privacy notice applies to that data.`,
  },
  {
    title: "3. What we collect",
    body: `• Contact details you give us: name, work email, company, role, phone number and country
• What you tell us in forms and emails
• Account details for platform users: name, email, role and project access
• Usage and device data: pages viewed, features used, IP address, browser and device type

We do not sell personal data.`,
  },
  {
    title: "4. How we use it",
    body: `• To reply to enquiries and early-access applications
• To provide, secure and support the platform
• To improve the product, using aggregated usage data
• To send product updates, which you can opt out of at any time
• To meet legal and tax obligations

We use your data only where the law allows: to perform a contract with you or your organisation, with your consent, for our legitimate interests, or to meet a legal obligation.`,
  },
  {
    title: "5. Zed AI",
    body: `Zed AI works only on data the requesting user is allowed to see. We do not use your project data to train shared AI models. Enterprise customers can connect their own AI provider account so that requests are processed under their own agreement with that provider.`,
  },
  {
    title: "6. Where data is stored",
    body: `Data is hosted on Amazon Web Services in the United States by default. Enterprise customers can ask for a specific hosting region during onboarding.

Each organisation has its own dedicated database in a private network. Data is encrypted at rest (AES-256) and in transit (TLS 1.3).`,
  },
  {
    title: "7. International transfers",
    body: `Our product and engineering team is based in India and may access data where needed to build, maintain and support the Service. That access is limited to what each role needs.

Where personal data moves outside the country it was collected in, we use the safeguards the applicable law requires, such as contractual protections with our group companies and service providers, and we transfer only what is needed.`,
  },
  {
    title: "8. Who we share it with",
    body: `We share personal data only with service providers that help us run ZedOps (for example hosting, email and analytics), under contracts that require them to protect it, and with authorities where the law requires it. Each provider receives only what it needs.`,
  },
  {
    title: "9. How long we keep it",
    body: `We keep account data while your organisation’s account is active. After it closes, data stays read-only for 90 days so it can be exported, then it is deleted. Enquiry data is kept for up to 24 months unless you ask us to delete it sooner.`,
  },
  {
    title: "10. Your rights",
    body: `Depending on where you are, you can ask to:
• Access the personal data we hold about you
• Correct or complete it
• Delete it, or restrict or object to how we use it
• Receive a copy in a portable format
• Withdraw consent you have given

Email privacy@zedops.com and we will respond within 30 days. You can also complain to your data protection regulator, such as the UAE Data Office or the Saudi Data & AI Authority (SDAIA).`,
  },
  {
    title: "11. Cookies and analytics",
    body: `We use essential browser storage to run the website and platform. We do not use advertising cookies.

We use Google Analytics to understand which pages are useful. It stays off until you accept it in the cookie banner; if you decline, nothing is sent. When enabled, IP addresses are anonymised and advertising features are switched off.

Use "Cookie settings" in the footer to change your choice at any time.`,
  },
  {
    title: "12. Changes",
    body: `We may update this policy. We will change the date above and, for material changes, tell customers by email.`,
  },
];

export default function PrivacyPage() {
  useSEO({
    title: "Privacy Policy  -  ZedOps",
    description: "How ZedOps collects, uses and protects personal data on its website and platform, where it is stored, and your rights.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero pill="Legal" PillIcon={Shield} title="Privacy Policy" subtitle="Last updated: September 2026" />
        <LegalContent sections={sections} email="privacy@zedops.com" />
      </main>
      <Footer />
    </div>
  );
}
