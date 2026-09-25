import { Container, SectionLabel } from "@/components/design-preview/primitives";

export default function LegalContent({ sections, email }: { sections: readonly { title: string; body: string }[]; email: string }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-[128px] lg:self-start">
          <SectionLabel>On this page</SectionLabel>
          <nav aria-label="Policy sections" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {sections.map((section, index) => <a key={section.title} href={`#policy-section-${index + 1}`} className="shrink-0 border-b border-[#E3E8F0] px-1 py-2 text-[13px] font-medium text-[#5E6C84] transition-colors hover:border-brand-orange hover:text-brand-navy lg:shrink">{section.title}</a>)}
          </nav>
        </aside>
        <div className="min-w-0">
          {sections.map((section, index) => (
            <article key={section.title} id={`policy-section-${index + 1}`} className="scroll-mt-[130px] border-t border-[#DCE3ED] py-9 first:pt-0">
              <span className="font-mono text-[11px] font-semibold text-brand-orange">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.025em] text-brand-navy sm:text-[28px]">{section.title.replace(/^\d+\.\s*/, "")}</h2>
              <div className="mt-5 max-w-[760px] whitespace-pre-line text-[15px] leading-[1.8] text-[#3D4F6E]">{section.body}</div>
            </article>
          ))}
          <div className="border-t border-[#DCE3ED] pt-8 text-[14px] text-[#5E6C84]">Questions? Email <a href={`mailto:${email}`} className="font-semibold text-brand-navy underline decoration-[#A8B8CC] underline-offset-4 hover:decoration-brand-orange">{email}</a>.</div>
        </div>
      </Container>
    </section>
  );
}
