/**
 * Single source of truth for every indexable route and its SEO metadata.
 *
 * Consumed by both `generate-sitemap.mjs` and `prerender.mjs`, so the sitemap and
 * the prerendered HTML can never disagree with each other - which is exactly how
 * the hand-maintained sitemap drifted out of sync with the router before.
 *
 * NOTE ON DUPLICATION: page components also pass a title and description to
 * `useSEO` at runtime. Those are a second place this copy lives. Changing a page
 * title here without changing it in the component means the prerendered HTML
 * (what crawlers and social scrapers read) and the client-rendered title can
 * disagree. `npm run check:seo` compares the two and fails if they drift.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// This file lives in scripts/lib/, so the repo root is two levels up.
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BLOG_DIR = path.join(ROOT, "src/content/blog");
export const SITE_URL = (process.env.VITE_SITE_URL ?? "https://zedops.com").replace(/\/+$/, "");

/** Minimal frontmatter reader: simple `key: value` lines only, no YAML engine. */
export function frontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "").trimStart();
  if (!text.startsWith("---")) return { data: {}, body: text };
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return { data: {}, body: text };
  const data = {};
  let i = 1;
  for (; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") { i += 1; break; }
    const c = lines[i].indexOf(":");
    if (c > -1) data[lines[i].slice(0, c).trim()] = lines[i].slice(c + 1).trim();
  }
  return { data, body: lines.slice(i).join("\n") };
}

export function blogPosts() {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, body } = frontmatter(readFileSync(path.join(BLOG_DIR, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? f,
        description: data.description ?? "",
        date: data.date ?? "",
        author: data.author ?? "ZedOps",
        image: data.image ?? "",
        body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function moduleMeta() {
  const src = readFileSync(path.join(ROOT, "src/data/platformFeatures.ts"), "utf8");
  // Split the file at each `id:` so a title is always read from the same object as
  // its id. A single lookahead regex risks pairing an id with the next section's
  // title, which would put the wrong copy in the sitemap.
  const chunks = src.split(/\n\s*id:\s*"/).slice(1);
  const out = [];
  for (const chunk of chunks) {
    const id = chunk.slice(0, chunk.indexOf('"'));
    const title = chunk.slice(0, 900).match(/\btitle:\s*"([^"]+)"/)?.[1];
    if (!title) continue;
    // The sections have no `description` of their own; PlatformModulePage composes
    // one from the title. Mirrored here so the two agree.
    out.push({
      id,
      title: `${title}  -  ZedOps platform`,
      description: `${title} in ZedOps. Explore the connected workflows, project records, and capabilities for MEP and construction teams.`,
    });
  }
  return out;
}

/**
 * @typedef {{path:string,title:string,description:string,priority:number,changefreq:string,type:"website"|"article",image?:string,noindex?:boolean,jsonLd?:object,source:string}} RouteMeta
 */

/** @type {RouteMeta[]} */
const STATIC = [
  ["/", "ZedOps  -  MEP Operations & Field Execution",
    "ZedOps for mechanical, electrical, and plumbing contractors: connect schedule to tasks, daily logs to follow-ups, inspections and punch to closeout work, with AI where you need it.",
    1.0, "weekly", "src/pages/Home.tsx"],
  ["/solutions", "Platform - ZedOps",
    "One place for the work behind every project: scheduling, site execution, materials, quality and closeout, connected instead of scattered across tools.",
    0.85, "monthly", "src/pages/SolutionsPage.tsx"],
  ["/zed-ai", "Zed AI - ZedOps",
    "Turn construction data into decisions. Zed AI reads the same project record as your crews and surfaces what needs attention next.",
    0.85, "monthly", "src/pages/ZedAIPage.tsx"],
  ["/how-we-help", "How we help - ZedOps",
    "One project record, every view of the work. How ZedOps serves owners, general contractors, project managers and consultants.",
    0.8, "monthly", "src/pages/HowWeHelpHubPage.tsx"],
  ["/how-we-help/project-stage", "Project stages - ZedOps",
    "From preconstruction to closeout: how a ZedOps project record stays complete at every stage of the job.",
    0.7, "monthly", "src/pages/ProjectLifecyclePage.tsx"],
  ["/how-we-help/company", "How ZedOps helps your company - ZedOps",
    "Standardise how work gets planned, executed and reported across every project your company runs.",
    0.7, "monthly", "src/pages/HowWeHelpCompanyPage.tsx"],
  ["/how-we-help/team", "How ZedOps helps your team - ZedOps",
    "Give crews and PMs the same live view of the job, with follow-ups that do not get lost in a group chat.",
    0.7, "monthly", "src/pages/HowWeHelpTeamPage.tsx"],
  ["/how-we-help/role", "How ZedOps helps your role - ZedOps",
    "Role-specific workflows for owners, contractors, project managers and consultants working in ZedOps.",
    0.7, "monthly", "src/pages/HowWeHelpRolePage.tsx"],
  ["/who-we-serve", "Who we serve - ZedOps",
    "ZedOps is built for teams running live construction work: general contractors, owners, project managers and consultants.",
    0.8, "monthly", "src/pages/WhoWeServePage.tsx"],
  ["/who-we-serve/general-contractors", "ZedOps for General Contractors",
    "Connect schedule, site execution, submittals and punch in one project record instead of reconciling five tools.",
    0.7, "monthly", "src/pages/personas/GCPage.tsx"],
  ["/who-we-serve/owners", "ZedOps for Owners & Developers",
    "Portfolio oversight without the patchwork. See cost, schedule and quality drift across every project from one view.",
    0.7, "monthly", "src/pages/personas/OwnersPage.tsx"],
  ["/who-we-serve/project-managers", "ZedOps for Project Managers",
    "Know what needs attention today, follow up on the last daily log, and close inspections before they become punch items.",
    0.7, "monthly", "src/pages/personas/PMPage.tsx"],
  ["/who-we-serve/consultants", "ZedOps for Consultants & CM Firms",
    "Advise on live project data instead of chasing updates across subcontractor reports and site photos.",
    0.7, "monthly", "src/pages/personas/ConsultantsPage.tsx"],
  ["/security", "Security - ZedOps",
    "Security is a first principle, not an afterthought. How ZedOps handles tenant isolation, access control and your project data.",
    0.7, "monthly", "src/pages/SecurityPage.tsx"],
  ["/roadmap", "Roadmap - ZedOps",
    "What the ZedOps team is building next for MEP and construction execution, and what has already shipped.",
    0.7, "weekly", "src/pages/RoadmapPage.tsx"],
  ["/about", "About - ZedOps",
    "Who builds ZedOps and why: a platform for mechanical, electrical and plumbing work that actually gets executed.",
    0.6, "monthly", "src/pages/AboutPage.tsx"],
  ["/blog", "Blog - ZedOps",
    "Practical writing on MEP execution, daily logs, inspections, materials and using AI on real construction projects.",
    0.8, "weekly", "src/pages/BlogIndexPage.tsx"],
  ["/early-access", "Request Early Access - ZedOps",
    "Apply for early access to ZedOps. Limited spots for construction teams. Founder-direct onboarding and early access pricing.",
    0.9, "monthly", "src/pages/EarlyAccessPage.tsx"],
  ["/contact", "Contact - ZedOps",
    "Talk to the ZedOps team about a demo, early access, or a question about the platform.",
    0.7, "monthly", "src/pages/ContactPage.tsx"],
  ["/privacy", "Privacy Policy  -  ZedOps",
    "How ZedOps collects, uses, and protects information when you use our website and platform, including your rights and how to contact us.",
    0.2, "yearly", "src/pages/PrivacyPage.tsx"],
  ["/terms", "Terms of Use  -  ZedOps",
    "The terms that govern use of the ZedOps website and platform, including accounts, acceptable use, and intellectual property.",
    0.2, "yearly", "src/pages/TermsPage.tsx"],
];

/** @returns {RouteMeta[]} */
export function routes() {
  /** @type {RouteMeta[]} */
  const out = STATIC.map(([p, title, description, priority, changefreq, source]) => ({
    path: p, title, description, priority, changefreq, type: "website", source,
  }));

  for (const m of moduleMeta()) {
    out.push({
      path: `/platform/module/${m.id}`,
      title: m.title,
      description: m.description,
      priority: 0.8, changefreq: "monthly", type: "website",
      source: "src/data/platformFeatures.ts",
    });
  }

  for (const post of blogPosts()) {
    out.push({
      path: `/blog/${post.slug}`,
      title: `${post.title}  -  ZedOps`,
      description: post.description,
      priority: 0.6, changefreq: "monthly", type: "article",
      image: post.image || undefined,
      source: `src/content/blog/${post.slug}.md`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl(`/blog/${post.slug}`) },
        headline: post.title,
        description: post.description,
        image: post.image ? [post.image] : [`${SITE_URL}/og-image.png`],
        datePublished: post.date ? new Date(post.date).toISOString() : undefined,
        dateModified: post.date ? new Date(post.date).toISOString() : undefined,
        author: { "@type": "Person", name: post.author },
        publisher: { "@id": `${SITE_URL}#organization` },
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}#website` },
        wordCount: post.body.trim().split(/\s+/).filter(Boolean).length,
      },
    });
  }

  return out;
}

export const absolute = (p) => (/^https?:\/\//i.test(p) ? p : `${SITE_URL}${p === "/" ? "/" : p.replace(/\/+$/, "")}`);

/**
 * Absolute URL for a page, with the trailing slash the site is served with.
 * Cloudflare Pages 308-redirects "/solutions" to "/solutions/", so canonical,
 * og:url and sitemap entries must use the slashed form or they advertise a
 * redirect. Assets keep using `absolute` - a trailing slash would break them.
 */
export const pageUrl = (p) => {
  if (/^https?:\/\//i.test(p)) return p;
  const clean = p.startsWith("/") ? p : `/${p}`;
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/+$/, "")}/`;
};
