/**
 * Mega-menu definitions for the main nav.
 *
 * `dropdownMenusGeneral` is the full marketing site (GCs, owners, broad construction).
 * `dropdownMenusMep` keeps the same structure and routes but MEP + execution + AI copy.
 *
 * Toggle which one is active via `SITE_FOCUS_MEP_EXECUTION` in `@/config/siteFocus`.
 * To go back to general marketing: set `SITE_FOCUS_MEP_EXECUTION` to `false`; no need to
 * uncomment anything; both datasets stay in this file.
 */
import {
  Cpu,
  Building2,
  HardHat,
  ClipboardList,
  Briefcase,
  BookOpen,
  Map,
  ScrollText,
  CalendarClock,
  FolderOpen,
  ShieldCheck,
  FolderKanban,
  Layers,
  Landmark,
  Package,
  Info,
  Shield,
  Mail,
  Sparkles,
  Users,
  Compass,
  ListChecks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_FOCUS_MEP_EXECUTION, HIDE_PRICING } from "@/config/siteFocus";

/** Shared Platform mega-menu (lifecycle groups → module pages). No hub `/platform` page. */
const platformMenu = {
  sections: [
    {
      heading: "Pre-construction",
      items: [
        {
          icon: ClipboardList,
          label: "Estimation & proposals",
          desc: "Accurate takeoffs, BOQ, proposals & cost estimation.",
          href: "/platform/module/estimation",
        },
        {
          icon: CalendarClock,
          label: "Planning & scheduling",
          desc: "Create realistic schedules, track progress in real-time.",
          href: "/platform/module/planning-execution",
        },
      ],
    },
    {
      heading: "Construction execution",
      items: [
        {
          icon: Package,
          label: "Materials Management",
          desc: "Manage requests, approvals, purchasing & deliveries.",
          href: "/platform/module/supply-chain",
        },
        {
          icon: FolderOpen,
          label: "Daily execution intelligence",
          desc: "Daily logs, site reports, progress & issue tracking.",
          href: "/platform/module/daily-intelligence",
        },
        {
          icon: Users,
          label: "Workforce intelligence",
          desc: "Track attendance, productivity & labor performance.",
          href: "/platform/module/workforce-intelligence",
        },
        {
          icon: ShieldCheck,
          label: "Quality & safety",
          desc: "Inspections, checklists, incidents & compliance.",
          href: "/platform/module/quality-safety-closeout",
        },
        {
          icon: FolderKanban,
          label: "Tasks resolution",
          desc: "Assign, track & close tasks faster across teams.",
          href: "/platform/module/projects",
        },
        {
          icon: Landmark,
          label: "Budget & cost control",
          desc: "Track budgets, actuals, commitments & cash flow.",
          href: "/platform/module/finance",
        },
      ],
    },
    {
      heading: "Project closeout",
      items: [
        {
          icon: ListChecks,
          label: "Punch list management",
          desc: "Track, assign & close punch items efficiently.",
          href: "/platform/module/punch-list",
        },
      ],
    },
    {
      heading: "Platform core",
      items: [
        {
          icon: Layers,
          label: "Core",
          desc: "Documents, library, workflow, directory, company, projects, users & admin.",
          href: "/platform/module/core",
        },
      ],
    },
  ],
  cta: { label: "Explore modules", href: "/platform/module/core" },
  footerCard: {
    icon: Cpu,
    label: "Zed AI",
    desc: "Copilot on live project data — insights, drafts, and actions with your permissions.",
    href: "/zed-ai",
  },
} as const;

/** Shared Company mega-menu. */
const companyMenu = {
  sections: [
    {
      heading: "About ZedOps",
      items: [
        {
          icon: Info,
          label: "About Us",
          desc: "Mission, values, and why we built ZedOps",
          href: "/about",
        },
        {
          icon: Shield,
          label: "Security",
          desc: "How we protect tenant data and access",
          href: "/security",
        },
        {
          icon: Mail,
          label: "Contact",
          desc: "Talk to the founding team",
          href: "/contact",
        },
      ],
    },
    {
      heading: "Connect",
      items: [
        {
          icon: Users,
          label: "Who we serve",
          desc: "GCs, owners, PMs, and consultants",
          href: "/who-we-serve",
        },
        {
          icon: Sparkles,
          label: "Early access",
          desc: "Request a walkthrough with the founders",
          href: "/early-access",
        },
      ],
    },
  ],
  cta: { label: "Contact us", href: "/contact" },
} as const;

export const dropdownMenusGeneral = {
  Platform: platformMenu,
  Solutions: {
    sections: [
      {
        heading: "Highlights",
        items: [
          {
            icon: Cpu,
            label: "Zed AI",
            desc: "In-product copilot",
            subtitle: "Insights, report prep, writing assist, and actions  -  live project data and your permissions.",
            href: "/zed-ai",
            highlight: true,
          },
          {
            icon: Compass,
            label: "How we help",
            desc: "By stage, role & team",
            subtitle:
              "See how ZedOps fits preconstruction through closeout — and which modules matter for each team.",
            href: "/how-we-help",
            highlight: true,
          },
        ],
      },
      {
        heading: "By Project Stage",
        items: [
          {
            icon: ClipboardList,
            label: "Preconstruction",
            desc: "Estimation & library",
            href: "/how-we-help/project-stage#preconstruction",
          },
          {
            icon: HardHat,
            label: "Construction",
            desc: "Projects, tasks, work logs",
            href: "/how-we-help/project-stage#construction",
          },
          {
            icon: Building2,
            label: "Closeout",
            desc: "Punch list & inspections",
            href: "/how-we-help/project-stage#closeout",
          },
          {
            icon: Layers,
            label: "Platform Core",
            desc: "Core & administration",
            href: "/how-we-help/project-stage#platform-core",
          },
        ],
      },
    ],
    cta: { label: "Explore all capabilities", href: "/solutions" },
    featured: {
      tag: "Overview",
      title: "One platform from preconstruction through closeout - projects, logs, RFIs, and field teams in sync.",
      readTime: "How we help",
      href: "/how-we-help",
      image: "",
    },
  },
  "Built for you": {
    sections: [
      {
        heading: "By Role",
        items: [
          {
            icon: HardHat,
            label: "General Contractors",
            desc: "End-to-end project control from bid to closeout",
            href: "/who-we-serve/general-contractors",
            image: "/personas/site-supervisor.jpg",
          },
          {
            icon: Building2,
            label: "Owners & Developers",
            desc: "Portfolio-level visibility across every project",
            href: "/who-we-serve/owners",
            image: "/personas/company-owner.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project Managers",
            desc: "Unified workspace for every task and team",
            href: "/who-we-serve/project-managers",
            image: "/personas/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM Firms",
            desc: "Multi-client management from one dashboard",
            href: "/who-we-serve/consultants",
            image: "/personas/subcontractor.jpg",
          },
        ],
      },
    ],
    cta: { label: "Find your use case", href: "/who-we-serve" },
  },
  Resources: {
    sections: [
      {
        heading: "Explore",
        items: [
          {
            icon: ScrollText,
            label: "ZedDocs",
            desc: "Official guides, modules, and ZedDocs Assistant  -  hosted at docs.zedops.com",
            href: "https://docs.zedops.com/",
            tag: "Knowledge base",
            external: true,
          },
          {
            icon: BookOpen,
            label: "Blog",
            desc: "Construction tech insights and how-tos",
            href: "/blog",
            tag: "New posts weekly",
          },
          {
            icon: Map,
            label: "Product Roadmap",
            desc: "See what's live, in progress, and coming next",
            href: "/roadmap",
            tag: "Updated weekly",
          },
        ],
      },
    ],
    cta: { label: "See all resources", href: "#" },
    // Present on every menu in both collections. It was missing here only, which
    // meant dropdownMenusMep - which spreads this object and adds its own
    // featured - was a structural superset, and the `as unknown as DropdownMenus`
    // cast below existed purely to hide that from the compiler. MegaMenu reads
    // resources.featured unconditionally, so with SITE_FOCUS_MEP_EXECUTION
    // flipped to false the Resources panel would have thrown on featured.href.
    featured: {
      tag: "Guide",
      title: "How MEP contractors connect daily logs to follow-up work.",
      readTime: "Read",
      href: "/blog/daily-logs-that-people-actually-use",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=480&h=320&q=80",
    },
  },
  Company: companyMenu,
} as const;

/** MEP-focused: same routes; copy highlights actions, modules, and Zed AI. */
export const dropdownMenusMep = {
  Platform: platformMenu,
  Solutions: {
    sections: [
      {
        heading: "Highlights",
        items: [
          {
            icon: Cpu,
            label: "Zed AI",
            desc: "Copilot on live project data",
            subtitle:
              "Summaries and drafts from the same tasks, logs, and cost records. No generic chat off your data.",
            href: "/zed-ai",
            highlight: true,
          },
          {
            icon: Compass,
            label: "How we help",
            desc: "By stage, role & team",
            subtitle:
              "MEP execution from programme to punch — pick the path that matches how your teams work.",
            href: "/how-we-help",
            highlight: true,
          },
        ],
      },
      {
        heading: "By Project Stage",
        items: [
          { icon: ClipboardList, label: "Preconstruction", desc: "Estimation & library", href: "/how-we-help/project-stage#preconstruction" },
          { icon: HardHat, label: "Construction", desc: "Projects, tasks, work logs", href: "/how-we-help/project-stage#construction" },
          { icon: Building2, label: "Closeout", desc: "Punch list & inspections", href: "/how-we-help/project-stage#closeout" },
          {
            icon: Layers,
            label: "Platform Core",
            desc: "Core & administration",
            href: "/how-we-help/project-stage#platform-core",
          },
        ],
      },
    ],
    cta: { label: "Explore MEP-ready capabilities", href: "/solutions" },
    featured: {
      tag: "MEP",
      title: "Programme to punch: one thread for mechanical, electrical & plumbing. Zed AI on the same job data.",
      readTime: "How we help",
      href: "/how-we-help",
      image: "",
    },
  },
  "Built for you": {
    sections: [
      {
        heading: "By role",
        items: [
          {
            icon: HardHat,
            label: "General contractors",
            desc: "Coordinate MEP trades with tasks, logs & closeout in one thread",
            href: "/who-we-serve/general-contractors",
            image: "/personas/site-supervisor.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project managers",
            desc: "Drive schedule → task, field reporting & punch for MEP scopes",
            href: "/who-we-serve/project-managers",
            image: "/personas/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM firms",
            desc: "Multi-project oversight when mechanical, electrical & plumbing overlap",
            href: "/who-we-serve/consultants",
            image: "/personas/subcontractor.jpg",
          },
          {
            icon: Building2,
            label: "Owners & developers",
            desc: "Portfolio visibility when execution and trade performance matter",
            href: "/who-we-serve/owners",
            image: "/personas/company-owner.jpg",
          },
        ],
      },
    ],
    cta: { label: "Who we serve", href: "/who-we-serve" },
  },
  Resources: {
    ...dropdownMenusGeneral.Resources,
    featured: {
      tag: "Product",
      title: "Zed AI + field execution: how permissions keep copilot answers grounded in real tasks and logs.",
      readTime: "Overview",
      href: "/zed-ai",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=480&h=320&q=80",
    },
  },
  Company: companyMenu,
} as const;

/**
 * Widen `as const` literal types back to their base types, while leaving icon
 * components alone.
 *
 * The mega-menu data is `as const`, so every string is a literal type. That is
 * what made the two collections incompatible: dropdownMenusMep exists precisely
 * to hold different copy, so `"Copilot on live project data"` is not assignable
 * to `"In-product copilot"`. The original code resolved that with
 * `as unknown as DropdownMenus`, and because the cast silenced the compiler, a
 * real shape difference slipped through - only the MEP collection had
 * `Resources.featured`, while MegaMenu read it unconditionally. Flipping
 * SITE_FOCUS_MEP_EXECUTION to false would have thrown on `featured.href`.
 *
 * The type is derived from the data rather than hand-written so it cannot drift:
 * a field added to the menus shows up here automatically, and a field *removed*
 * from the data is a compile error at the point of use.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends LucideIcon
          ? T
          : T extends object
            ? { readonly [K in keyof T]: Widen<T[K]> }
            : T;

export type DropdownMenus = Widen<typeof dropdownMenusGeneral>;
export type DropdownKey = keyof DropdownMenus;

/**
 * Active mega-menus for the current marketing mode (see `siteFocus.ts`).
 *
 * No cast here. dropdownMenusMep spreads dropdownMenusGeneral.Resources and
 * overrides copy, so the two are structurally compatible and the compiler now
 * proves that on every build. The `as unknown as DropdownMenus` this replaced was
 * hiding a real divergence: MegaMenu read `resources.featured`, which only the
 * MEP collection provided, so the component was typed against a shape it did
 * not have and would have crashed in general mode.
 */
export const dropdownMenus: DropdownMenus = SITE_FOCUS_MEP_EXECUTION
  ? dropdownMenusMep
  : dropdownMenusGeneral;

/** Mobile drawer links: general (full) list preserved for when `SITE_FOCUS_MEP_EXECUTION` is false. */
export const mobileNavLinksGeneral = [
  { label: "Estimation & proposals", href: "/platform/module/estimation" },
  { label: "Materials & procurement", href: "/platform/module/supply-chain" },
  { label: "Core", href: "/platform/module/core" },
  { label: "Solutions", href: "/solutions" },
  { label: "How we help", href: "/how-we-help" },
  { label: "Zed AI", href: "/zed-ai" },
  { label: "ZedDocs", href: "https://docs.zedops.com/", external: true as const },
  { label: "Built for you", href: "/who-we-serve" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About Us", href: "/about" },
  { label: "Who we serve", href: "/who-we-serve" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

/** MEP mode: same destinations; order highlights platform first. */
export const mobileNavLinksMep = [
  { label: "Estimation & proposals", href: "/platform/module/estimation" },
  { label: "Materials & procurement", href: "/platform/module/supply-chain" },
  { label: "Core", href: "/platform/module/core" },
  { label: "Solutions", href: "/solutions" },
  { label: "Zed AI", href: "/zed-ai" },
  { label: "How we help", href: "/how-we-help" },
  { label: "Built for you (MEP & roles)", href: "/who-we-serve" },
  { label: "ZedDocs", href: "https://docs.zedops.com/", external: true as const },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About Us", href: "/about" },
  { label: "Who we serve", href: "/who-we-serve" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export const mobileNavLinks = (
  SITE_FOCUS_MEP_EXECUTION ? mobileNavLinksMep : mobileNavLinksGeneral
).filter((link) => !(HIDE_PRICING && link.href === "/pricing"));
