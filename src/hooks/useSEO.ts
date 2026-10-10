import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE, SITE_URL, absoluteUrl, pageUrl } from "@/config/site";
import { LANGUAGES, langFromPath, localize, seoText, useI18n } from "@/i18n";
import { INDEXED_LANGS, isIndexedLang } from "@/config/seoLangs";
import { ogImagePath } from "@/config/ogImage.mjs";

interface SEOProps {
  title: string;
  description: string;
  /** Overrides the auto-derived canonical path. Rarely needed. */
  path?: string;
  /** Absolute or root-relative share image. Defaults to the site-wide OG image. */
  image?: string;
  imageAlt?: string;
  /** "website" for marketing pages, "article" for blog posts. */
  type?: "website" | "article";
  /** Keeps the page out of the index. Use for sandboxes, thin or duplicate pages. */
  noindex?: boolean;
  /** ISO date, for article:published_time / article:modified_time. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /**
   * Whether this page has a version in every language, so it advertises hreflang alternates.
   * False for English-only pages (blog posts), which then carry only their own canonical.
   */
  alternates?: boolean;
  /** JSON-LD objects injected as application/ld+json. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

type Attrs = Record<string, string>;

/**
 * Create the tag if it is missing, then set attributes on it.
 *
 * Generic over the element type because it handles both <meta> and <link>.
 * `document.createElement` is typed to return HTMLElement for an arbitrary tag
 * name, so without this the assignment was a type error that the old code
 * papered over with four `!` assertions. The assertions were not free: they
 * silenced the compiler on exactly the nullability that mattered, which is why
 * this function went untyped for as long as it did.
 */
function upsert<T extends Element>(
  selector: string,
  create: { tag: string; attrs: Attrs },
  attrs: Attrs,
): T {
  let el = document.head.querySelector<T>(selector);
  if (!el) {
    const created = document.createElement(create.tag);
    for (const [k, v] of Object.entries(create.attrs)) created.setAttribute(k, v);
    document.head.appendChild(created);
    // createElement is typed to return HTMLElement for a dynamic tag name, so
    // this is a genuine widening rather than a mistake: the caller states which
    // element it needs and the selector above is what actually guarantees it.
    el = created as unknown as T;
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function setMeta(keyAttr: "name" | "property", key: string, content: string) {
  upsert<HTMLMetaElement>(
    `meta[${keyAttr}="${key}"]`,
    { tag: "meta", attrs: { [keyAttr]: key } },
    { content },
  );
}

function removeMeta(keyAttr: "name" | "property", key: string) {
  document.head.querySelector(`meta[${keyAttr}="${key}"]`)?.remove();
}

/**
 * Per-route document head management.
 *
 * Rewritten to cover the tags the previous version silently skipped. It used to update
 * only tags that already existed in index.html, which meant canonical, og:url, og:image
 * and twitter:image stayed pinned to the homepage on every route - so search engines and
 * social scrapers treated all 25 pages as duplicates of "/".
 *
 * The canonical path is derived from the router location, so pages get a correct URL
 * without each one having to pass it.
 */
export function useSEO({
  title: rawTitle,
  description: rawDescription,
  path,
  image,
  imageAlt,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  alternates: alternatesProp,
  jsonLd,
}: SEOProps) {
  const [location] = useLocation();
  const { lang } = useI18n();
  // A noindex page (404, sandbox) is not part of the language set.
  const alternates = alternatesProp ?? !noindex;
  // Titles and descriptions are written once, in English (see scripts/lib/routes.mjs), and
  // translated here and by the prerenderer through the same function.
  const title = seoText(lang, rawTitle);
  const description = seoText(lang, rawDescription);

  useEffect(() => {
    // `location` is relative to the router base, which carries the language prefix.
    const neutralPath = langFromPath(path ?? location).path;
    const url = pageUrl(localize(neutralPath, lang));
    // Explicit image wins; otherwise the generated English card for this path (all languages share it).
    const imageUrl = absoluteUrl(image ?? (noindex ? SITE.ogImage : ogImagePath(neutralPath)));
    const imageDescription = imageAlt ?? (noindex ? `${SITE.name} – ${SITE.tagline}` : title);

    document.title = title;
    setMeta("name", "description", description);

    // Canonical + indexability.
    upsert<HTMLLinkElement>("link[rel='canonical']", { tag: "link", attrs: { rel: "canonical" } }, { href: url });
    upsert<HTMLMetaElement>(
      "meta[name='robots']",
      { tag: "meta", attrs: { name: "robots" } },
      {
        content: noindex
          ? "noindex, nofollow"
          : isIndexedLang(lang)
            ? "index, follow, max-image-preview:large"
            : "noindex, follow",
      },
    );

    // Language alternates. Replaced wholesale so a page without translations leaves none behind.
    document.head.querySelectorAll("link[rel='alternate'][hreflang]").forEach((n) => n.remove());
    // Only indexed languages appear in a set, and a set needs at least two of them.
    const hreflangs = LANGUAGES.filter((l) => INDEXED_LANGS.includes(l.code));
    const emitAlternates = alternates && hreflangs.length > 1;
    if (emitAlternates) {
      const addAlternate = (hreflang: string, code: (typeof LANGUAGES)[number]["code"]) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("href", pageUrl(localize(neutralPath, code)));
        document.head.appendChild(link);
      };
      hreflangs.forEach((l) => addAlternate(l.code, l.code));
      addAlternate("x-default", "en");
    }

    // Open Graph.
    setMeta("property", "og:locale", LANGUAGES.find((l) => l.code === lang)?.locale ?? "en_US");
    document.head.querySelectorAll("meta[property='og:locale:alternate']").forEach((n) => n.remove());
    if (emitAlternates) {
      hreflangs.filter((l) => l.code !== lang).forEach((l) => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:locale:alternate");
        meta.setAttribute("content", l.locale);
        document.head.appendChild(meta);
      });
    }
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:width", String(SITE.ogImageWidth));
    setMeta("property", "og:image:height", String(SITE.ogImageHeight));
    setMeta("property", "og:image:alt", imageDescription);
    setMeta("property", "og:site_name", SITE.name);

    // Twitter / X.
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", SITE.twitter);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);
    setMeta("name", "twitter:image:alt", imageDescription);

    // Article-only tags; removed on non-article routes so stale values cannot leak.
    if (type === "article") {
      if (publishedTime) setMeta("property", "article:published_time", publishedTime);
      if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime);
      if (author) setMeta("property", "article:author", author);
    } else {
      removeMeta("property", "article:published_time");
      removeMeta("property", "article:modified_time");
      removeMeta("property", "article:author");
    }

    // JSON-LD is replaced wholesale per route so one page's schema cannot leak into another.
    // Only page-managed blocks are cleared; the sitewide block in index.html is marked
    // data-seo-jsonld="static" and must survive.
    document.head.querySelectorAll('script[data-seo-jsonld="page"]').forEach((n) => n.remove());
    {
      // Every page declares its language; articles carry their own BlogPosting.
      const base = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
      const blocks: Record<string, unknown>[] = base.map((b) => ({ inLanguage: lang, ...b }));
      if (type !== "article") {
        blocks.unshift({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        });
      }
      blocks.filter(Boolean).forEach((block) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoJsonld = "page";
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
      });
    }
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    type,
    noindex,
    publishedTime,
    modifiedTime,
    author,
    alternates,
    jsonLd,
    location,
    lang,
  ]);
}
