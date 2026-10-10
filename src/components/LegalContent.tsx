import { LocalA } from "@/components/LocalLink";
import { Section } from "@/components/design-system/primitives";
import { useI18n } from "@/i18n";

/** Legal document layout: sticky section index beside numbered clauses, inside the page frame. */
export default function LegalContent({ sections, email }: { sections: readonly { title: string; body: string }[]; email: string }) {
  const { t, lang } = useI18n();
  const clean = (title: string) => t(title).replace(/^\d+\.\s*/, "");
  return (
    <Section label={t("Policy")}>
      <div className="grid gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:py-20">
        <aside className="lg:sticky lg:top-[132px] lg:self-start">
          <p className="mb-3 text-[13px] font-medium text-brand-navy">{t("On this page")}</p>
          <nav aria-label={t("Policy sections")} className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible">
            {sections.map((section, index) => (
              <LocalA
                key={section.title}
                href={`#policy-section-${index + 1}`}
                className="shrink-0 py-1.5 text-[13.5px] text-[#616D82] transition-colors hover:text-brand-navy lg:shrink"
              >
                {clean(section.title)}
              </LocalA>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">
          {lang === "ar" && (
            <p className="mb-8 border-s-2 border-[#E8ECF2] ps-4 text-[14.5px] leading-[1.7] text-[#5E6C84]">{t("The English version of this document prevails in case of any difference.")}</p>
          )}
          {sections.map((section, index) => (
            <article key={section.title} id={`policy-section-${index + 1}`} className="scroll-mt-[130px] border-t border-[#E8ECF2] py-8 first:border-t-0 first:pt-0">
              <h2 className="text-[22px] font-medium leading-tight tracking-[-0.025em] text-brand-navy">
                <span className="me-2 font-mono text-[13px] text-[#677388]">{String(index + 1).padStart(2, "0")}</span>
                {clean(section.title)}
              </h2>
              <div className="mt-4 max-w-[720px] whitespace-pre-line text-[15.5px] leading-[1.75] text-[#3D4F6E]">{section.body.split("\n").map((line) => (line ? t(line) : line)).join("\n")}</div>
            </article>
          ))}
          <p className="border-t border-[#E8ECF2] pt-8 text-[14.5px] text-[#5E6C84]">
            {t("Questions? Email ")}<LocalA href={`mailto:${email}`} className="font-medium text-brand-navy underline underline-offset-4 hover:text-brand-orange">{email}</LocalA>.
          </p>
        </div>
      </div>
    </Section>
  );
}
