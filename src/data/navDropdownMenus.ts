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
  LayoutGrid,
  ScrollText,
  CalendarClock,
  FolderOpen,
  ShieldCheck,
  FolderKanban,
} from "lucide-react";
import { SITE_FOCUS_MEP_EXECUTION } from "@/config/siteFocus";

export const dropdownMenusGeneral = {
  Solutions: {
    sections: [
      {
        heading: "Platform",
        items: [
          {
            icon: LayoutGrid,
            label: "All platform features",
            desc: "Full module list from the product",
            subtitle:
              "Planning, execution, finance, documents, quality, and closeout - every module in one place, with permissions that match how your teams actually work.",
            href: "/platform",
            highlight: true,
          },
          {
            icon: Cpu,
            label: "Zed AI",
            desc: "In-product copilot",
            subtitle: "Insights, report prep, writing assist, and actions  -  live project data and your permissions.",
            href: "/zed-ai",
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
            image: "/Persona/site-supervisor.jpg",
          },
          {
            icon: Building2,
            label: "Owners & Developers",
            desc: "Portfolio-level visibility across every project",
            href: "/who-we-serve/owners",
            image: "/Persona/company-owner.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project Managers",
            desc: "Unified workspace for every task and team",
            href: "/who-we-serve/project-managers",
            image: "/Persona/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM Firms",
            desc: "Multi-client management from one dashboard",
            href: "/who-we-serve/consultants",
            image: "/Persona/subcontractor.jpg",
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
          // {
          //   icon: Video,
          //   label: "Webinars",
          //   desc: "Live and on-demand expert sessions",
          //   href: "#",
          //   tag: "Live every month",
          // },
          // {
          //   icon: FileQuestion,
          //   label: "Case Studies",
          //   desc: "Real results from construction teams",
          //   href: "#",
          //   tag: "12 stories",
          // },
          // {
          //   icon: Users,
          //   label: "Community",
          //   desc: "Connect with peers and share best practices",
          //   href: "#",
          //   tag: "2,400+ members",
          // },
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
    // featured: {
    //   tag: "Case Study",
    //   title: "How a mid-size GC cut RFI response time by 60% with ZedOps",
    //   readTime: "4 min read",
    //   date: "April 3, 2026",
    //   href: "#",
    //   image:
    //     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=480&h=320&q=80",
    // },
  },
} as const;

/** MEP-focused: same routes; copy highlights actions, modules, and Zed AI. */
export const dropdownMenusMep = {
  Solutions: {
    sections: [
      {
        heading: "Platform & AI",
        items: [
          {
            icon: LayoutGrid,
            label: "All platform features",
            desc: "Full module checklist",
            subtitle:
              "Every module your MEP teams execute on, from planning through supply, with permissions that match real roles.",
            href: "/platform",
            highlight: true,
          },
          {
            icon: Cpu,
            label: "Zed AI",
            desc: "Copilot on live project data",
            subtitle:
              "Summaries and drafts from the same tasks, logs, and cost records. No generic chat off your data.",
            href: "/zed-ai",
            highlight: true,
          },
        ],
      },
      {
        heading: "Key modules",
        items: [
          {
            icon: CalendarClock,
            label: "Planning & execution",
            desc: "Schedule, tasks & estimates",
            href: "/platform/module/planning-execution",
          },
          {
            icon: FolderOpen,
            label: "Information management",
            desc: "Daily logs & document control",
            href: "/platform/module/information-management",
          },
          {
            icon: ShieldCheck,
            label: "Quality, safety & closeout",
            desc: "Inspections, punch & incidents",
            href: "/platform/module/quality-safety-closeout",
          },
          {
            icon: FolderKanban,
            label: "Projects",
            desc: "Equipment, materials & work logs",
            href: "/platform/module/projects",
          },
          {
            icon: LayoutGrid,
            label: "All modules",
            desc: "Finance, supply chain & full checklist",
            href: "/platform",
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
            image: "/Persona/site-supervisor.jpg",
          },
          {
            icon: ClipboardList,
            label: "Project managers",
            desc: "Drive schedule → task, field reporting & punch for MEP scopes",
            href: "/who-we-serve/project-managers",
            image: "/Persona/project-managers.jpg",
          },
          {
            icon: Briefcase,
            label: "Consultants & CM firms",
            desc: "Multi-project oversight when mechanical, electrical & plumbing overlap",
            href: "/who-we-serve/consultants",
            image: "/Persona/subcontractor.jpg",
          },
          {
            icon: Building2,
            label: "Owners & developers",
            desc: "Portfolio visibility when execution and trade performance matter",
            href: "/who-we-serve/owners",
            image: "/Persona/company-owner.jpg",
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
} as const;

export type DropdownMenus = typeof dropdownMenusGeneral;
export type DropdownKey = keyof DropdownMenus;

/** Active mega-menus for the current marketing mode (see `siteFocus.ts`). */
export const dropdownMenus: DropdownMenus = (
  SITE_FOCUS_MEP_EXECUTION ? dropdownMenusMep : dropdownMenusGeneral
) as unknown as DropdownMenus;

/** Mobile drawer links: general (full) list preserved for when `SITE_FOCUS_MEP_EXECUTION` is false. */
export const mobileNavLinksGeneral = [
  { label: "Solutions", href: "/solutions" },
  { label: "All features", href: "/platform" },
  { label: "How we help", href: "/how-we-help" },
  { label: "Zed AI", href: "/zed-ai" },
  { label: "ZedDocs", href: "https://docs.zedops.com/", external: true as const },
  { label: "Built for you", href: "/who-we-serve" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

/** MEP mode: same destinations; order highlights AI & platform first. */
export const mobileNavLinksMep = [
  { label: "Zed AI", href: "/zed-ai" },
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "How we help", href: "/how-we-help" },
  { label: "Built for you (MEP & roles)", href: "/who-we-serve" },
  { label: "ZedDocs", href: "https://docs.zedops.com/", external: true as const },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export const mobileNavLinks = SITE_FOCUS_MEP_EXECUTION ? mobileNavLinksMep : mobileNavLinksGeneral;
