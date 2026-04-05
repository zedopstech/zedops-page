import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing or using the ZedOps platform and website ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you are using the Service on behalf of a company, you represent that you have the authority to bind that entity to these Terms.

If you do not agree to these Terms, do not use the Service.`,
  },
  {
    title: "2. Description of service",
    body: `ZedOps provides an AI-powered construction operations and project management platform. During the early access period, features and pricing are subject to change. We will notify customers of material changes via email with reasonable notice.`,
  },
  {
    title: "3. Acceptable use",
    body: `You agree not to:
• Use the Service to store, transmit, or process any data you are not authorised to access
• Attempt to gain unauthorised access to any part of the Service or its infrastructure
• Reverse engineer, decompile, or disassemble the Service
• Use the Service to engage in any activity that is unlawful, harmful, or fraudulent
• Resell or sublicense the Service without written consent from ZedOps

ZedOps reserves the right to suspend or terminate accounts that violate these terms without prior notice.`,
  },
  {
    title: "4. Subscription and billing",
    body: `Subscription fees are billed in advance on a monthly or annual basis as described on the Pricing page. During early access, pricing may be fixed for the duration of your initial agreement.

All fees are non-refundable except where required by applicable law. ZedOps may change pricing with 30 days' written notice.`,
  },
  {
    title: "5. Intellectual property",
    body: `You retain ownership of all data you input into the Service ("Customer Data"). ZedOps retains all rights in the platform, software, and any aggregated, anonymised insights derived from usage patterns (which never include identifiable Customer Data).

You grant ZedOps a limited licence to process Customer Data solely to provide and improve the Service.`,
  },
  {
    title: "6. Termination",
    body: `Either party may terminate the subscription at the end of the current billing period with written notice. ZedOps may terminate immediately for material breach of these Terms.

Upon termination, your Customer Data is held in read-only state for 90 days to allow export, after which it is permanently deleted.`,
  },
  {
    title: "7. Limitation of liability",
    body: `To the maximum extent permitted by law, ZedOps's total liability to you arising from or in connection with the Service shall not exceed the fees you paid in the 12 months preceding the claim.

ZedOps is not liable for any indirect, incidental, consequential, or punitive damages, including loss of profit or data, even if ZedOps has been advised of the possibility of such damages.`,
  },
  {
    title: "8. Changes to these Terms",
    body: `We may update these Terms from time to time. We will notify you of material changes at least 30 days in advance via email. Continued use of the Service after changes take effect constitutes your acceptance of the updated Terms.`,
  },
  {
    title: "9. Governing law",
    body: `These Terms are governed by and construed in accordance with the laws of the jurisdiction in which ZedOps is incorporated, without regard to conflict of law provisions.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#172B4D] overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Legal"
          PillIcon={FileText}
          title="Terms of Service"
          subtitle="Last updated: April 2026"
        />

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="text-lg font-extrabold text-[#172B4D] mb-3">{s.title}</h2>
                  <div className="text-[#42526E] text-sm leading-relaxed whitespace-pre-line">{s.body}</div>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-8 text-sm text-[#6B778C]">
                <p>Questions? Email us at <a href="mailto:legal@zedops.com" className="text-[#0052CC] font-medium hover:underline">legal@zedops.com</a></p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
