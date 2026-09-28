import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { dropdownMenus, type DropdownKey } from "@/data/navDropdownMenus";

type NavItem = {
  icon: LucideIcon;
  label: string;
  desc: string;
  href: string;
  external?: boolean;
  image?: string;
  subtitle?: string;
  tag?: string;
};

const intros: Record<DropdownKey, { title: string; body: string }> = {
  Platform: { title: "Platform", body: "Ten modules. One project record." },
  Solutions: { title: "Solutions", body: "How ZedOps helps, stage by stage." },
  "Built for you": { title: "Built for you", body: "A view that fits your role." },
  Resources: { title: "Resources", body: "Guides, updates and field notes." },
  Company: { title: "Company", body: "Who we are and how to reach us." },
};

function ItemLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <a
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onNavigate}
      className="group -mx-2.5 flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[#F5F7FA]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E3E8F0] bg-white text-[#5E6C84] shadow-[0_1px_2px_rgba(14,27,51,0.05)] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
        <item.icon size={17} strokeWidth={1.7} aria-hidden />
      </span>
      <span className="min-w-0 pt-px">
        <span className="flex items-center gap-1 text-[14px] font-medium leading-snug text-brand-navy">
          {item.label}
          {item.external ? <ArrowUpRight size={13} className="text-[#5F6B80]" aria-hidden /> : null}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-[#616D82]">{item.desc}</span>
      </span>
    </a>
  );
}

function Column({ heading, items, onNavigate, cols = 1 }: { heading: string; items: readonly NavItem[]; onNavigate: () => void; cols?: 1 | 2 }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[#5F6B80]">{heading}</p>
      <div className={cols === 2 ? "grid grid-cols-2 gap-x-8" : ""}>
        {items.map((item) => <ItemLink key={item.label} item={item} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}

function Frame({ active, cta, onNavigate, children }: { active: DropdownKey; cta?: { label: string; href: string }; onNavigate: () => void; children: ReactNode }) {
  const intro = intros[active];
  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-12 py-9">
      <div className="flex flex-col border-r border-[#EDF0F5] pr-10">
        <p className="text-[22px] font-medium tracking-[-0.03em] text-brand-navy">{intro.title}</p>
        <p className="mt-3 text-[14px] leading-[1.55] text-[#5E6C84]">{intro.body}</p>
        {cta ? (
          <a href={cta.href} onClick={onNavigate} className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-navy hover:text-brand-orange">
            {cta.label}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function FeatureCard({ href, eyebrow, title, action, image, onNavigate }: { href: string; eyebrow: string; title: string; action: string; image?: string; onNavigate: () => void }) {
  return (
    <a href={href} onClick={onNavigate} className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#E3E8F0] bg-[#F7F9FC] transition-colors hover:border-[#C9D2DF]">
      {image ? (
        <div className="h-32 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5F6B80]">{eyebrow}</span>
        <span className="mt-2 text-[15px] font-semibold leading-snug text-brand-navy">{title}</span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-brand-navy group-hover:text-brand-orange">
          {action}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </a>
  );
}

export default function MegaMenu({ active, onNavigate }: { active: DropdownKey; onNavigate: () => void }) {
  if (active === "Platform") {
    const p = dropdownMenus.Platform;
    const [pre, exec, closeout, core] = p.sections;
    return (
      <Frame active={active} cta={p.cta} onNavigate={onNavigate}>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-10">
          <Column heading={pre.heading} items={pre.items} onNavigate={onNavigate} />
          <Column heading={exec.heading} items={exec.items} cols={2} onNavigate={onNavigate} />
          <div className="space-y-6">
            <Column heading={closeout.heading} items={closeout.items} onNavigate={onNavigate} />
            <Column heading={core.heading} items={core.items} onNavigate={onNavigate} />
          </div>
        </div>
        <a
          href={p.footerCard.href}
          onClick={onNavigate}
          className="group mt-7 flex items-center justify-between gap-6 rounded-lg bg-brand-navy px-5 py-4 text-white transition-colors hover:bg-[#0E1B33]"
        >
          <span className="flex items-center gap-3">
            <p.footerCard.icon size={18} className="text-[#FFB37F]" aria-hidden />
            <span className="text-[14.5px] font-semibold">{p.footerCard.label}</span>
            <span className="text-[13.5px] text-white/70">{p.footerCard.desc}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-white/90">
            Explore Zed AI <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </a>
      </Frame>
    );
  }

  if (active === "Solutions") {
    const s = dropdownMenus.Solutions;
    return (
      <Frame active={active} cta={s.cta} onNavigate={onNavigate}>
        <div className="grid grid-cols-[1fr_1fr_280px] gap-10">
          <div>
            <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[#5F6B80]">{s.sections[0].heading}</p>
            <div className="space-y-2">
              {s.sections[0].items.map((item) => (
                <a key={item.label} href={item.href} onClick={onNavigate} className="group -mx-3 block rounded-md px-3 py-3 transition-colors hover:bg-[#F5F7FA]">
                  <span className="flex items-center gap-2.5 text-[15px] font-semibold text-brand-navy">
                    <item.icon size={18} strokeWidth={1.7} className="text-[#5F6B80] group-hover:text-brand-orange" aria-hidden />
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-[#616D82]">{item.desc}</span>
                </a>
              ))}
            </div>
          </div>
          <Column heading={s.sections[1].heading} items={s.sections[1].items} onNavigate={onNavigate} />
          <FeatureCard href={s.featured.href} eyebrow={s.featured.tag} title={s.featured.title} action={s.featured.readTime} onNavigate={onNavigate} />
        </div>
      </Frame>
    );
  }

  if (active === "Built for you") {
    const b = dropdownMenus["Built for you"];
    return (
      <Frame active={active} cta={b.cta} onNavigate={onNavigate}>
        <div className="grid grid-cols-4 gap-5">
          {b.sections[0].items.map((item) => (
            <a key={item.label} href={item.href} onClick={onNavigate} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-[#EEF2F8]">
                <img src={item.image} alt="" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-navy group-hover:text-brand-orange">
                {item.label}
                <ArrowRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#616D82]">{item.desc}</p>
            </a>
          ))}
        </div>
      </Frame>
    );
  }

  if (active === "Resources") {
    const r = dropdownMenus.Resources;
    return (
      <Frame active={active} cta={{ label: "Browse the blog", href: "/blog" }} onNavigate={onNavigate}>
        <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-10">
          <Column heading={r.sections[0].heading} items={r.sections[0].items} cols={2} onNavigate={onNavigate} />
          <FeatureCard href={r.featured.href} eyebrow={`Featured · ${r.featured.tag}`} title={r.featured.title} action={r.featured.readTime} image={r.featured.image || undefined} onNavigate={onNavigate} />
        </div>
      </Frame>
    );
  }

  const menu = dropdownMenus[active];
  return (
    <Frame active={active} cta={menu.cta} onNavigate={onNavigate}>
      <div className="grid max-w-[640px] grid-cols-2 gap-10">
        {menu.sections.map((section) => <Column key={section.heading} heading={section.heading} items={section.items} onNavigate={onNavigate} />)}
      </div>
    </Frame>
  );
}
