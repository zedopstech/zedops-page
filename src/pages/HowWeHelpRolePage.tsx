import { motion } from "framer-motion";
import { ArrowUpRight, Check, UserCog } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { framePad, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";

const guardrails = [
  "Tenant isolation keeps each customer’s data in its own boundary.",
  "Field, office and leadership views emphasise different modules without forking the product.",
  "Consultants and CMs can work across clients without leaking sensitive detail.",
];

const personas = [
  { label: "General contractors", href: "/who-we-serve/general-contractors" },
  { label: "Owners & developers", href: "/who-we-serve/owners" },
  { label: "Project managers", href: "/who-we-serve/project-managers" },
  { label: "Consultants & CM firms", href: "/who-we-serve/consultants" },
];

export default function HowWeHelpRolePage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Roles & permissions  -  How ZedOps helps  -  ZedOps",
    description:
      "How ZedOps uses application roles for menus, data scope, exports, and Zed AI. Persona stories and outcomes live under Built for you.",
  });

  return (
    <HowWeHelpPageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How we help", href: "/how-we-help" },
        { label: "Roles & permissions" },
      ]}
    >
      <PageHero
        compact
        pill="Roles & access"
        PillIcon={UserCog}
        title={<>Roles decide the view. <Muted>And what Zed AI can see.</Muted></>}
        subtitle="Application roles drive navigation, data scope and exports. If someone can’t open a screen manually, the copilot can’t reach it either."
      >
        <TicketButton href="/who-we-serve">Built for you</TicketButton>
      </PageHero>

      <Section tone="mist" labelledBy="role-guardrails">
        <div className={`grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <h2 id="role-guardrails" className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-brand-navy [text-wrap:balance] sm:text-[40px]">
              One permission model. <Muted>For the app and the copilot.</Muted>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-[#5E6C84]">
              Administrators map people to roles that unlock specific modules and actions, from preconstruction through closeout.
            </p>
          </motion.div>
          <motion.ul {...scrollMotionProps(isMobile, { y: 18, duration: 0.45, delay: 0.06 })} className="divide-y divide-[#E3E8F0] rounded-xl border border-[#E3E8F0] bg-white">
            {guardrails.map((line) => (
              <li key={line} className="flex items-start gap-3 px-6 py-5 text-[15px] leading-[1.5] text-brand-navy">
                <Check size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                {line}
              </li>
            ))}
          </motion.ul>
        </div>
      </Section>

      <Section labelledBy="role-personas">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SplitHeader
              id="role-personas"
              title={<>See it through <Highlight>your role.</Highlight></>}
              body="Built for you tells the day-to-day story for each persona. This page covers the access model behind it."
            />
          </motion.div>
        </div>
        <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <a key={p.href} href={p.href} className="group flex items-center justify-between bg-white px-6 py-7 transition-colors hover:bg-[#FAFBFC] sm:px-8">
              <span className="text-[16px] font-medium text-brand-navy">{p.label}</span>
              <ArrowUpRight size={16} className="text-[#677388] transition-colors group-hover:text-brand-orange" aria-hidden />
            </a>
          ))}
        </div>
      </Section>
    </HowWeHelpPageShell>
  );
}
