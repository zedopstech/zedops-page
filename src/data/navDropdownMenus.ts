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
          desc: "Takeoffs, BOQs and bids",
          href: "/platform/module/estimation",
        },
        {
          icon: CalendarClock,
          label: "Planning & scheduling",
          desc: "Programmes and progress",
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
          desc: "Requests to deliveries",
          href: "/platform/module/supply-chain",
        },
        {
          icon: FolderOpen,
          label: "Daily execution intelligence",
          desc: "Daily logs and site reports",
          href: "/platform/module/daily-intelligence",
        },
        {
          icon: Users,
          label: "Workforce intelligence",
          desc: "Attendance and crews",
          href: "/platform/module/workforce-intelligence",
        },
        {
          icon: ShieldCheck,
          label: "Quality & safety",
          desc: "Inspections and incidents",
          href: "/platform/module/quality-safety-closeout",
        },
        {
          icon: FolderKanban,
          label: "Tasks resolution",
          desc: "Assign and close tasks",
          href: "/platform/module/projects",
        },
        {
          icon: Landmark,
          label: "Budget & cost control",
          desc: "Budgets, costs, cash flow",
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
          desc: "Snags to sign-off",
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
          desc: "Directory, library, admin",
          href: "/platform/module/core",
        },
      ],
    },
  ],
  cta: { label: "Explore modules", href: "/platform/module/core" },
  footerCard: {
    icon: Cpu,
    label: "Zed AI",
    desc: "Your copilot on live project data",
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
          desc: "Our story and team",
          href: "/about",
        },
        {
          icon: Shield,
          label: "Security",
          desc: "How we protect your data",
          href: "/security",
        },
        {
          icon: Mail,
          label: "Contact",
          desc: "Talk to our team",
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
          desc: "Find your role",
          href: "/who-we-serve",
        },
        {
          icon: Sparkles,
          label: "Early access",
          desc: "Get a guided walkthrough",
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
            desc: "Your project copilot",
            subtitle: "Insights, report prep, writing assist, and actions  -  live project data and your permissions.",
            href: "/zed-ai",
            highlight: true,
          },
          {
            icon: Compass,
            label: "How we help",
            desc: "By stage, team and role",
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
            desc: "Estimate and plan",
            href: "/how-we-help/project-stage#preconstruction",
          },
          {
            icon: HardHat,
            label: "Construction",
            desc: "Build and track",
            href: "/how-we-help/project-stage#construction",
          },
          {
            icon: Building2,
            label: "Closeout",
            desc: "Inspect and hand over",
            href: "/how-we-help/project-stage#closeout",
          },
          {
            icon: Layers,
            label: "Platform Core",
            desc: "Setup and admin",
            href: "/how-we-help/project-stage#platform-core",
          },
        ],
      },
    ],
    cta: { label: "Explore all capabilities", href: "/solutions" },
    featured: {
      tag: "Overview",
      title: "One platform from preconstruction to closeout.",
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
            desc: "Bid to closeout",
            href: "/who-we-serve/general-contractors",
            image: "/personas/site-supervisor.jpg",
          },
          {
            icon: Building2,
            label: "Owners & Developers",
            desc: "Portfolio visibility",
            href: "/who-we-serve/owners",
            image: "/personas/company-owner.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project Managers",
            desc: "One workspace for the job",
            href: "/who-we-serve/project-managers",
            image: "/personas/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM Firms",
            desc: "Many clients, one view",
            href: "/who-we-serve/consultants",
            image: "/contractors/subco.webp",
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
            desc: "Guides and how-tos",
            href: "https://docs.zedops.com/",
            tag: "Knowledge base",
            external: true,
          },
          {
            icon: BookOpen,
            label: "Blog",
            desc: "Notes from the field",
            href: "/blog",
            tag: "New posts weekly",
          },
          {
            icon: Map,
            label: "Product Roadmap",
            desc: "What’s live and next",
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
      title: "Turning daily logs into follow-up work.",
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
            desc: "Your project copilot",
            subtitle:
              "Summaries and drafts from the same tasks, logs, and cost records. No generic chat off your data.",
            href: "/zed-ai",
            highlight: true,
          },
          {
            icon: Compass,
            label: "How we help",
            desc: "By stage, team and role",
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
          { icon: ClipboardList, label: "Preconstruction", desc: "Estimate and plan", href: "/how-we-help/project-stage#preconstruction" },
          { icon: HardHat, label: "Construction", desc: "Build and track", href: "/how-we-help/project-stage#construction" },
          { icon: Building2, label: "Closeout", desc: "Inspect and hand over", href: "/how-we-help/project-stage#closeout" },
          {
            icon: Layers,
            label: "Platform Core",
            desc: "Setup and admin",
            href: "/how-we-help/project-stage#platform-core",
          },
        ],
      },
    ],
    cta: { label: "All capabilities", href: "/solutions" },
    featured: {
      tag: "MEP",
      title: "Programme to punch, on one project record.",
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
            desc: "Trades, logs and closeout",
            href: "/who-we-serve/general-contractors",
            image: "/personas/site-supervisor.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project managers",
            desc: "Schedule to punch",
            href: "/who-we-serve/project-managers",
            image: "/personas/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM firms",
            desc: "Many clients, one view",
            href: "/who-we-serve/consultants",
            image: "/contractors/subco.webp",
          },
          {
            icon: Building2,
            label: "Owners & developers",
            desc: "Portfolio visibility",
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
      title: "How Zed AI stays grounded in your permissions.",
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
 * to hold different copy, so `"Your project copilot"` is not assignable
 * to `"Your project copilot"`. The original code resolved that with
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
