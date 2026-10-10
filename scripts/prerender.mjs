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
 * Also emits 404.html, which Cloudflare Pages serves for unknown paths, keeping
 * a real 404 status instead of a soft 200.
 *
 * Run via `npm run prerender`, wired into the build.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { LANGS, ROOT, SITE_URL, absolute, hasAlternates, indexedLangsOf, isIndexedLang, localePath, ogImagePath, pageUrl, routes } from "./lib/routes.mjs";

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

// Build-time render of the real React tree (see src/entry-server.tsx, built to dist/server).
const { render: renderApp, seoText } = await import(pathToFileURL(path.join(ROOT, "dist/server/entry-server.js")).href);

/**
 * Put the rendered body into #root. `data-lang` tells the client which language the markup is
 * in, so it can discard it instead of hydrating when the URL says otherwise (the shared 404.html).
 */
function inject(html, body, lang) {
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error("prerender: index.html has no empty #root to fill");
  return html.replace(marker, () => `<div id="root" data-lang="${lang}">${body}</div>`);
}

/** <html lang dir> for the page language. */
function setHtmlLang(html, lang) {
  const rtl = LANGS.find((l) => l.code === lang)?.rtl;
  return html.replace(/<html[^>]*>/i, `<html lang="${lang}" dir="${rtl ? "rtl" : "ltr"}">`);
}

/** Head tags only some pages have (alternates, og:locale:alternate), inserted before </head>. */
function addHead(html, lines) {
  return lines.length ? html.replace("</head>", `${lines.map((l) => `  ${l}`).join("\n")}\n</head>`) : html;
}

function render(shell, route, lang) {
  const neutral = route.path;
  const url = pageUrl(localePath(neutral, lang));
  // Explicit image (blog frontmatter) wins; otherwise the generated English card for the path.
  const image = absolute(route.image || (route.noindex ? OG_DEFAULT : ogImagePath(neutral)));
  const title = seoText(lang, route.title);
  const description = seoText(lang, route.description);
  const imageAlt = route.imageAlt || (route.noindex ? "ZedOps – AI MEP & Construction Execution Platform" : title);
  const translated = hasAlternates(route);

  let html = setHtmlLang(shell, lang);
  html = setTitle(html, title);
  html = setMeta(html, "name", "description", description);
  html = setCanonical(html, url);
  html = setMeta(html, "property", "og:locale", LANGS.find((l) => l.code === lang).locale);
  html = addHead(html, [
    ...(translated
      ? [
          ...indexedLangsOf(route).map((code) => `<link rel="alternate" hreflang="${code}" href="${escapeAttr(pageUrl(localePath(neutral, code)))}" />`),
          `<link rel="alternate" hreflang="x-default" href="${escapeAttr(pageUrl(neutral))}" />`,
          ...LANGS.filter((l) => l.code !== lang && indexedLangsOf(route).includes(l.code)).map((l) => `<meta property="og:locale:alternate" content="${l.locale}" />`),
        ]
      : []),
  ]);

  html = setMeta(html, "property", "og:type", route.type);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:width", "1200");
  html = setMeta(html, "property", "og:image:height", "630");
  html = setMeta(html, "property", "og:image:alt", imageAlt);
  html = setMeta(html, "property", "og:site_name", "ZedOps");

  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:site", "@zedops");
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", image);
  html = setMeta(html, "name", "twitter:image:alt", imageAlt);

  if (route.type === "article") {
    html = setMeta(html, "property", "article:author", route.author || "ZedOps");
  }
  if (route.noindex) {
    html = setMeta(html, "name", "robots", "noindex, nofollow");
  } else if (!isIndexedLang(lang)) {
    // Live but not indexed until the language is translated (src/config/seoLangs.json).
    html = setMeta(html, "name", "robots", "noindex, follow");
  } else {
    html = setMeta(html, "name", "robots", "index, follow, max-image-preview:large");
  }

  // Every page declares its language. Articles carry their own BlogPosting (inLanguage "en").
  const blocks = route.type === "article"
    ? route.jsonLd
    : [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
        ...[route.jsonLd].flat().filter(Boolean).map((b) => ({ inLanguage: lang, ...b })),
      ];
  return addJsonLd(html, blocks);
}

const shell = readFileSync(path.join(DIST, "index.html"), "utf8");
if (!shell) {
  console.error("dist/public/index.html not found - run vite build first");
  process.exit(1);
}

const all = routes();
let written = 0;

for (const route of all) {
  for (const lang of route.langs) {
    const rendered = render(shell, route, lang);
    const html = inject(rendered, await renderApp(localePath(route.path, lang)), lang);
    const rel = localePath(route.path, lang).replace(/^\//, "");
    const dir = rel ? path.join(DIST, rel) : DIST;
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html);
    written += 1;
  }
}

// Real 404 page: same shell, marked noindex. Cloudflare serves this one file for unknown
// paths in every language; the client re-renders it in the URL's language (see main.tsx).
let notFound = setTitle(setHtmlLang(shell, "en"), "Page not found – ZedOps");
notFound = setMeta(notFound, "name", "description", "That page does not exist. Head back to the ZedOps home page or explore the platform.");
notFound = setCanonical(notFound, pageUrl("/"));
notFound = setMeta(notFound, "name", "robots", "noindex, nofollow");
writeFileSync(path.join(DIST, "404.html"), inject(notFound, await renderApp("/__not-found__"), "en"));

console.log(`prerender: ${written} route files (${all.length} routes, ${LANGS.length} languages) + 404.html`);
