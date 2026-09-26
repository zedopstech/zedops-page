/**
 * Generates one static HTML file per route, with the head tags for that route baked
 * in, so crawlers and social scrapers that do not execute JavaScript see the right
 * title, description, canonical URL, Open Graph tags and JSON-LD.
 *
 * Before this existed the app shipped a single index.html for every URL, so
 * Facebook, LinkedIn, X, Slack and WhatsApp all rendered the homepage's preview
 * for every link on the site. The SPA still boots and takes over client-side, so
 * this changes nothing for a real visitor.
 *
 * Also emits 404.html, which lets deploy/Caddyfile return a real 404 status for
 * unknown paths instead of a soft 200.
 *
 * Run via `npm run prerender`, wired into the build.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, SITE_URL, absolute, routes } from "./lib/routes.mjs";

const DIST = path.join(ROOT, "dist/public");
const OG_DEFAULT = `${SITE_URL}/og-image.png`;

/** Replace the content of a <meta name|property="..."> tag, adding it if missing. */
function setMeta(html, keyAttr, key, content) {
  const tag = new RegExp(`<meta\\s+${keyAttr}="${key}"[^>]*?\\/?>`, "i");
  const replacement = `<meta ${keyAttr}="${key}" content="${escapeAttr(content)}" />`;
  if (tag.test(html)) return html.replace(tag, replacement);

  // Fall back to updating an existing content= on a loosely-matched tag, then append.
  const loose = new RegExp(`<meta[^>]*${keyAttr}=["']${key}["'][^>]*>`, "i");
  if (loose.test(html)) {
    return html.replace(loose, (m) =>
      /content=/i.test(m) ? m.replace(/content="[^"]*"/i, `content="${escapeAttr(content)}"`) : replacement,
    );
  }
  return html.replace("</head>", `  ${replacement}\n</head>`);
}

function setCanonical(html, url) {
  const tag = /<link\s+rel="canonical"[^>]*?>/i;
  const replacement = `<link rel="canonical" href="${escapeAttr(url)}" />`;
  if (tag.test(html)) return html.replace(tag, replacement);
  return html.replace("</head>", `  ${replacement}\n</head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Page-level JSON-LD is appended after the static sitewide block. */
function addJsonLd(html, blocks) {
  if (!blocks) return html;
  const list = (Array.isArray(blocks) ? blocks : [blocks]).filter(Boolean);
  if (!list.length) return html;
  const tags = list
    .map((b) => `  <script type="application/ld+json" data-seo-jsonld="page">\n    ${JSON.stringify(b)}\n  </script>`)
    .join("\n");
  return html.replace("</head>", `${tags}\n</head>`);
}

function render(shell, route) {
  const url = absolute(route.path);
  const image = absolute(route.image || OG_DEFAULT);
  const imageAlt = route.imageAlt || `${route.title}`;

  let html = setTitle(shell, route.title);
  html = setMeta(html, "name", "description", route.description);
  html = setCanonical(html, url);

  html = setMeta(html, "property", "og:type", route.type);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:alt", imageAlt);
  html = setMeta(html, "property", "og:site_name", "ZedOps");

  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:site", "@zedops");
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", image);
  html = setMeta(html, "name", "twitter:image:alt", imageAlt);

  if (route.type === "article") {
    html = setMeta(html, "property", "article:author", route.author || "ZedOps");
  }
  if (route.noindex) {
    html = setMeta(html, "name", "robots", "noindex, nofollow");
  }

  return addJsonLd(html, route.jsonLd);
}

const shell = readFileSync(path.join(DIST, "index.html"), "utf8");
if (!shell) {
  console.error("dist/public/index.html not found - run vite build first");
  process.exit(1);
}

const all = routes();
let written = 0;

for (const route of all) {
  const html = render(shell, route);
  const dir = route.path === "/" ? DIST : path.join(DIST, route.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  written += 1;
}

// The SPA shell at the root keeps the static defaults from index.html, which are
// already correct for "/". Re-render it anyway so both stay identical.
writeFileSync(path.join(DIST, "index.html"), render(shell, all.find((r) => r.path === "/") ?? all[0]));

// Real 404 page: same shell, marked noindex.
let notFound = setTitle(shell, "Page not found  -  ZedOps");
notFound = setMeta(notFound, "name", "description", "That page does not exist. Head back to the ZedOps home page or explore the platform.");
notFound = setCanonical(notFound, absolute("/"));
notFound = setMeta(notFound, "name", "robots", "noindex, nofollow");
writeFileSync(path.join(DIST, "404.html"), notFound);

console.log(`prerender: ${written} route files + 404.html`);
