/**
 * About page people and story.
 *
 * Both co-founders' backgrounds are real (supplied by the team; co-founder 1's employer is
 * deliberately not named). Still DRAFT: names, the notes' wording, the founding team and the
 * journey moments. Confirm or replace them before publishing.
 *
 * Photos: drop headshots into `public/team/` using the `photo` file names below
 * (at least 800px wide, JPG or WebP). Until a file exists the card shows the person's
 * initials, so the page never renders a broken image.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/cofounder-1.jpg". */
  photo: string;
  /** One line on what they did before, or what they own at ZedOps. */
  bio: string;
  base?: "Dubai" | "Madurai";
  linkedin?: string;
};

export type Cofounder = TeamMember & {
  /** false keeps the person in the data but off the page (e.g. not announced yet). */
  show?: boolean;
  /** Short line used as the note's heading, in their own words. */
  headline: string;
  /** First-person note; the first paragraph is set large. Draft wording for their approval. */
  note: string[];
  experience: {
    years: string;
    title: string;
    where: string;
    groups: { label: string; items: string[] }[];
  };
};

export const cofounders: Cofounder[] = [
  {
    name: "Baseeth Mohammed",
    role: "Founder",
    photo: "/team/cofounder-1.jpg",
    bio: "10+ years leading engineering, estimation, procurement and delivery on large projects across Saudi Arabia.",
    linkedin: "https://www.linkedin.com/in/baseeth-mohammed-53ab23375/",
    headline: "A note from our founder",
    note: [
      "For more than ten years I ran engineering, estimation, procurement and delivery on large projects: power plants, transmission lines, desalination plants, ports and hospitals.",
      "The engineering was rarely the hardest part. Keeping the estimate, the purchase orders, the site and the budget telling the same story was. Every team had its own file, and the truth lived in someone's phone.",
      "ZedOps is the system I wanted on those projects: one record from the first BOQ line to handover, fast enough that a site engineer will actually use it at the end of a long day.",
    ],
    experience: {
      years: "10+",
      title: "Chief Operating Engineer",
      where: "Contracting, Riyadh, Saudi Arabia",
      groups: [
        {
          label: "Projects delivered across",
          items: ["Power", "Transmission & distribution", "Desalination plants", "Commercial ports", "Hospitals", "Industrial", "Infrastructure"],
        },
        {
          label: "Led",
          items: ["Engineering", "Estimation", "Procurement", "Planning & budgeting", "Contracts", "Project execution", "Business development"],
        },
      ],
    },
  },
  {
    name: "Co-founder Name",
    role: "Co-founder",
    show: false,
    photo: "/team/cofounder-2.jpg",
    bio: "Software engineer with 5+ years building ERP systems and complex business applications.",
    linkedin: "",
    headline: "A note from our co-founder",
    note: [
      "For more than five years I built ERP systems and complex business applications, working closely with the people who run finance, procurement and operations.",
      "The code was rarely the hardest part. Understanding how the business really works was: who approves what, where each number comes from, and what happens when two teams disagree. Good software follows the business, not the other way round.",
      "ZedOps is where that comes together with a decade of project experience: the way contractors actually run a job, turned into one system that is simple on site and dependable in the office. And because every part of the job lives in one record, Zed AI can give real answers from it, only ever showing each person what they are allowed to see.",
    ],
    experience: {
      years: "5+",
      title: "Software Engineer",
      where: "ERP and complex business applications",
      groups: [
        { label: "Built", items: ["ERP systems", "Oracle", "AI stack", "Complex business applications", "Integrations & APIs", "Workflow automation", "Reporting & dashboards"] },
        { label: "Focus", items: ["Understanding how businesses work", "Turning processes into software", "Reliable, data-heavy systems"] },
      ],
    },
  },
];

export const foundingTeam: TeamMember[] = [
  { name: "Deva Praveen", role: "Senior Software Engineer", photo: "/team/member-1.jpg", bio: "Built ZedOps from the ground up. Every module runs on the foundations he laid.", base: "Madurai", linkedin: "https://www.linkedin.com/in/deva-praveen/" },
  { name: "Anish Fathima", role: "Software Engineer", photo: "/team/member-2.jpg", bio: "Makes the money add up. Every budget line, PO and delivery traced back to where it started.", base: "Madurai", linkedin: "https://www.linkedin.com/in/anish-fathima-74139827b/" },
  { name: "Raj Kumar", role: "Software Engineer", photo: "/team/member-3.jpg", bio: "Keeps the programme moving, from the Gantt chart in the office to the app in every site engineer’s pocket.", base: "Madurai", linkedin: "https://www.linkedin.com/in/rajkumar0304/" },
  { name: "Nithya Shree", role: "Researcher & Software Engineer", photo: "/team/member-4.jpg", bio: "Studies how estimators really work, then turns drawings and rates into priced BOQs.", base: "Madurai", linkedin: "https://www.linkedin.com/in/shree0602/" },
  { name: "Mohammed Arif", role: "Software Engineer", photo: "/team/member-5.jpg", bio: "Knows who is on site, where and on what, so crews get planned instead of guessed.", base: "Madurai", linkedin: "https://www.linkedin.com/in/mohammed-arif-in/" },
];

export type JourneyMoment = {
  /** "low" = a hard part, "high" = a good day, "now" = today, "next" = still ahead (keep in step with the roadmap page). */
  mood: "low" | "high" | "now" | "next";
  /** Short time marker; keep it loose unless you want real dates. */
  when: string;
  title: string;
  body: string;
};

export const journey: JourneyMoment[] = [
  {
    mood: "low",
    when: "Before ZedOps",
    title: "A decade of reconciling spreadsheets",
    body: "On power, desalination and hospital projects, the same scope was described three times: in the estimate, the purchase orders and the site reports. None of them agreed.",
  },
  {
    mood: "high",
    when: "The idea",
    title: "Writing down how projects really run",
    body: "We mapped a real job from BOQ to handover, step by step and role by role. That map became the project record every ZedOps module is built on.",
  },
  {
    mood: "low",
    when: "First version",
    title: "We threw away our first build",
    body: "Estimation, procurement and site logs started as separate tools, and nothing connected. We rebuilt the core so every module shares the same record.",
  },
  {
    mood: "high",
    when: "Designing for site",
    title: "Designing for a phone at 6 pm",
    body: "We cut the daily log until it took minutes, not a desk session. If it is slow on a dusty phone, the data never arrives.",
  },
  {
    mood: "low",
    when: "Zed AI",
    title: "Making AI safe to trust",
    body: "An assistant that can see everything is a liability on a live project. Making Zed AI respect every role and cite its sources is taking longer than we planned, and that is fine.",
  },
  {
    mood: "now",
    when: "Now",
    title: "Still building, with early partners",
    body: "ZedOps is in active development. We are opening early access to a small group of contractors and shaping the product around their projects.",
  },
  {
    mood: "next",
    when: "Q4 2026",
    title: "First live jobs with early partners",
    body: "Moving real projects onto ZedOps with our early-access contractors, from BOQ to handover, and learning from every one.",
  },
  {
    mood: "next",
    when: "Q4 2026",
    title: "Zed AI that takes action",
    body: "Risk alerts, RFI drafts and custom approval workflows, plus an API to connect the tools teams already use.",
  },
  {
    mood: "next",
    when: "2027",
    title: "Ready for larger teams",
    body: "Single sign-on, client portals, BIM alongside drawings, ERP links and an independent SOC 2 audit.",
  },
];
