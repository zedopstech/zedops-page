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

function ItemLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <a
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onNavigate}
      className="group flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[#F4F6FA]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF2F8] text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-white">
        <item.icon size={16} strokeWidth={1.8} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold leading-snug text-brand-navy">{item.label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-[#6B778C]">{item.desc}</span>
        {item.tag ? <span className="mt-1.5 inline-block rounded-full bg-[#EEF2F8] px-2 py-0.5 text-[10px] font-medium text-[#5E6C84]">{item.tag}</span> : null}
      </span>
    </a>
  );
}

function Section({ heading, items, onNavigate, columns = 1 }: { heading: string; items: readonly NavItem[]; onNavigate: () => void; columns?: 1 | 2 }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 px-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C97AB]">{heading}</p>
      <div className={columns === 2 ? "grid grid-cols-2 gap-x-1" : "space-y-0.5"}>
        {items.map((item) => <ItemLink key={item.label} item={item} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}

function MenuHeading({ eyebrow, title, cta, onNavigate }: { eyebrow: string; title: string; cta?: { label: string; href: string }; onNavigate: () => void }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-6 border-b border-[#E3E8F0] pb-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C97AB]">{eyebrow}</p>
        <p className="mt-1 text-[15px] font-semibold text-brand-navy">{title}</p>
      </div>
      {cta ? <a href={cta.href} onClick={onNavigate} className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-brand-navy hover:text-brand-orange">{cta.label}<ArrowRight size={13} aria-hidden /></a> : null}
    </div>
  );
}

export default function MegaMenu({ active, onNavigate }: { active: DropdownKey; onNavigate: () => void }) {
  const menu = dropdownMenus[active];

  if (active === "Platform") {
    const platform = dropdownMenus.Platform;
    return (
      <div className="p-6">
        <MenuHeading eyebrow="Platform" title="From preconstruction through closeout" onNavigate={onNavigate} />
        <div className="grid grid-cols-[1fr_2.15fr_1.8fr] gap-5">
          <Section heading={platform.sections[0].heading} items={platform.sections[0].items} onNavigate={onNavigate} />
          <div className="border-l border-[#E3E8F0] pl-5"><Section heading={platform.sections[1].heading} items={platform.sections[1].items} columns={2} onNavigate={onNavigate} /></div>
          <div className="border-l border-[#E3E8F0] pl-5">
            <div className="grid grid-cols-2 gap-3">
              {platform.sections.slice(2).map((section) => <Section key={section.heading} heading={section.heading} items={section.items} onNavigate={onNavigate} />)}
            </div>
            <a href={platform.footerCard.href} onClick={onNavigate} className="mt-4 flex items-start gap-3 rounded-lg bg-brand-navy p-4 text-white hover:bg-[#243C60]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10"><platform.footerCard.icon size={18} className="text-white" aria-hidden /></span>
              <span><span className="block text-[13px] font-semibold">{platform.footerCard.label}</span><span className="mt-1 block text-[11px] leading-snug text-white/70">{platform.footerCard.desc}</span><span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-white/85">Open <ArrowRight size={11} aria-hidden /></span></span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (active === "Solutions") {
    const solutions = dropdownMenus.Solutions;
    const featured = solutions.featured;
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_270px]">
        <div className="p-6">
          <MenuHeading eyebrow="Solutions" title="AI & how we help for field execution" cta={solutions.cta} onNavigate={onNavigate} />
          <div className="grid grid-cols-[1.25fr_0.85fr] gap-5">
            <div className="grid grid-cols-2 gap-3">
              {solutions.sections[0].items.map((item) => (
                <a key={item.label} href={item.href} onClick={onNavigate} className="group flex flex-col rounded-xl border border-[#E3E8F0] bg-[#F8FAFC] p-4 hover:border-[#BFCBDC] hover:bg-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8EEF7] text-brand-navy"><item.icon size={22} aria-hidden /></span>
                  <span className="mt-4 text-[15px] font-semibold text-brand-navy">{item.label}</span>
                  <span className="mt-2 text-[12px] leading-relaxed text-[#5E6C84]">{item.subtitle}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[11px] font-semibold text-brand-navy">Open <ArrowRight size={11} aria-hidden /></span>
                </a>
              ))}
            </div>
            <div className="border-l border-[#E3E8F0] pl-5"><Section heading={solutions.sections[1].heading} items={solutions.sections[1].items} onNavigate={onNavigate} /></div>
          </div>
        </div>
        <a href={featured.href} onClick={onNavigate} className="flex flex-col justify-between bg-brand-navy p-6 text-white hover:bg-[#243C60]">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">{featured.tag}</span>
          <span className="text-[22px] font-semibold leading-tight tracking-tight">{featured.title}</span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-white/75">{featured.readTime} <ArrowUpRight size={13} aria-hidden /></span>
        </a>
      </div>
    );
  }

  if (active === "Built for you") {
    const built = dropdownMenus["Built for you"];
    return (
      <div className="p-6">
        <MenuHeading eyebrow="Built for you" title="MEP trades & field leadership" cta={built.cta} onNavigate={onNavigate} />
        <a href="/how-we-help/role" onClick={onNavigate} className="mb-4 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-navy hover:text-brand-orange">How roles &amp; AI access work <ArrowRight size={12} aria-hidden /></a>
        <div className="grid grid-cols-4 gap-4">
          {built.sections[0].items.map((item) => (
            <a key={item.label} href={item.href} onClick={onNavigate} className="group overflow-hidden rounded-lg border border-[#E3E8F0] bg-white hover:border-[#BFCBDC]">
              <div className="h-32 overflow-hidden bg-[#EEF2F8]"><img src={item.image} alt="" className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]" /></div>
              <div className="p-3.5"><p className="text-[13px] font-semibold text-brand-navy">{item.label}</p><p className="mt-1.5 text-[11px] leading-relaxed text-[#5E6C84]">{item.desc}</p></div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (active === "Resources") {
    const resources = dropdownMenus.Resources;
    const featured = resources.featured;
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-6">
          <MenuHeading eyebrow="Resources" title="Guides, updates, and product news" cta={{ label: "Browse the blog", href: "/blog" }} onNavigate={onNavigate} />
          <Section heading={resources.sections[0].heading} items={resources.sections[0].items} columns={2} onNavigate={onNavigate} />
        </div>
        <a href={featured.href} onClick={onNavigate} className="flex flex-col bg-[#EEF2F8] p-5 text-brand-navy hover:bg-[#E5EBF4]">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B778C]">Featured · {featured.tag}</span>
          <span className="mt-5 text-[16px] font-semibold leading-snug">{featured.title}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold">{featured.readTime}<ArrowUpRight size={12} aria-hidden /></span>
          {featured.image ? <img src={featured.image} alt="" className="mt-auto h-28 w-full rounded-lg object-cover pt-4" /> : null}
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      <MenuHeading eyebrow={active} title="About ZedOps and how we work" cta={menu.cta} onNavigate={onNavigate} />
      <div className="grid grid-cols-2 gap-5">
        {menu.sections.map((section) => <Section key={section.heading} heading={section.heading} items={section.items} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}
