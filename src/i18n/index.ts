import { ar } from "./ar";
import { fr } from "./fr";
import { es } from "./es";
import { tr } from "./tr";

export type Lang = "en" | "ar" | "fr" | "es" | "tr";

/**
 * Each language is listed under its own name so a visitor can find it whatever the page
 * language. `locale` is the Open Graph locale. Mirrored in scripts/lib/routes.mjs (LANGS) for the
 * sitemap, which runs before the app is built; keep the two in step.
 */
export const LANGUAGES: { code: Lang; label: string; locale: string; rtl?: boolean }[] = [
  { code: "en", label: "English", locale: "en_US" },
  { code: "ar", label: "العربية", locale: "ar_AE", rtl: true },
  { code: "fr", label: "Français", locale: "fr_FR" },
  { code: "es", label: "Español", locale: "es_ES" },
  { code: "tr", label: "Türkçe", locale: "tr_TR" },
];

const dictionaries: Record<Exclude<Lang, "en">, Record<string, string>> = { ar, fr, es, tr };
export const isLang = (v: unknown): v is Lang => LANGUAGES.some((l) => l.code === v);
export const isRtlLang = (lang: Lang) => !!LANGUAGES.find((l) => l.code === lang)?.rtl;

const STORAGE_KEY = "zedops-lang";

/**
 * The page language comes from the URL (`/ar/...`), never from storage, so the server render,
 * the first client render and a crawler all see the same language for a given URL. It is set
 * synchronously by <App> before anything renders and does not change for the life of the page:
 * switching language is a navigation to the other language's URL.
 */
let current: Lang = "en";

/** Split a pathname into its language prefix and the language-neutral path ("/ar/blog/" -> ar, "/blog/"). */
export function langFromPath(pathname: string): { lang: Lang; path: string } {
  const m = /^\/(ar|fr|es|tr)(?=\/|$)/.exec(pathname);
  if (!m) return { lang: "en", path: pathname || "/" };
  return { lang: m[1] as Lang, path: pathname.slice(m[0].length) || "/" };
}

/** Root-relative internal paths only; external URLs, mailto:, tel:, #hash and files with an extension are left alone. */
export function isLocalizable(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const pathOnly = href.split(/[?#]/)[0];
  return !/\.[a-z0-9]{2,5}$/i.test(pathOnly);
}

/** Blog posts exist only in English; the blog index is translated. */
const isBlogPost = (path: string) => /^\/blog\/[^/?#]+/.test(path);

/**
 * Prefix a language-neutral internal path with the language ("/blog" -> "/ar/blog").
 * English stays at the root. Blog posts stay on the English URL in every language.
 */
export function localize(href: string, lang: Lang = current): string {
  if (!isLocalizable(href)) return href;
  const { lang: existing, path } = langFromPath(href);
  const base = withTrailingSlash(existing === "en" ? href : path + href.slice(href.split(/[?#]/)[0].length));
  if (lang === "en" || isBlogPost(base)) return base;
  return `/${lang}${base}`;
}

/**
 * Pages are served at their trailing-slash URL (that is the canonical), and Cloudflare
 * answers "/solutions" with a 308 to "/solutions/". Linking to the slash form directly
 * saves every internal link a redirect hop. Query and hash are kept as they are.
 */
export function withTrailingSlash(href: string): string {
  const pathEnd = href.search(/[?#]/);
  const path = pathEnd === -1 ? href : href.slice(0, pathEnd);
  if (!path.startsWith("/") || path.endsWith("/")) return href;
  return `${path}/${pathEnd === -1 ? "" : href.slice(pathEnd)}`;
}

/** Where the same page lives in `lang`. A blog post has no translation, so it maps to the blog index. */
export function switchPath(pathname: string, lang: Lang): string {
  const { path } = langFromPath(pathname);
  if (isBlogPost(path)) return lang === "en" ? path : localize("/blog/", lang);
  const target = localize(path, lang);
  return lang !== "en" && target === `/${lang}` ? `/${lang}/` : target;
}

function applyToDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = isRtlLang(lang) ? "rtl" : "ltr";
}

/** Set the page language (synchronous, idempotent). Called by <App> from the URL before render. */
export function setCurrentLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  applyToDocument(lang);
}

/** Remember the visitor's choice. It never redirects anyone; it is only a stored preference. */
export function savePreference(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage can throw in private windows */
  }
}

/** Navigate to this page in another language. */
export function switchLang(lang: Lang) {
  savePreference(lang);
  const { pathname, search, hash } = window.location;
  window.location.assign(switchPath(pathname, lang) + search + hash);
}

/**
 * Backward compatibility for old `?lang=xx` links: send the browser to the prefixed URL.
 * Returns true when a redirect was started.
 */
export function redirectLegacyLangParam(): boolean {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (!isLang(q)) return false;
  params.delete("lang");
  const rest = params.toString();
  window.location.replace(
    switchPath(window.location.pathname, q) + (rest ? `?${rest}` : "") + window.location.hash,
  );
  return true;
}

/**
 * Translate an English source string. English is the key, so a string with no entry
 * simply renders in English instead of breaking.
 */
export function translateTo(lang: Lang, text: string): string {
  return lang === "en" ? text : (dictionaries[lang][text] ?? text);
}

export function t(text: string): string {
  return translateTo(current, text);
}

/**
 * Page titles/descriptions that route modules compose from data ("{title} – ZedOps platform")
 * are translated from a template plus the translated module title.
 */
const SEO_TEMPLATES = [
  /^(.+?) – ZedOps platform$/,
  /^(.+?) in ZedOps\. Explore the connected workflows, project records, and capabilities for MEP and construction teams\.$/,
];

/** Translate head-tag copy (title, description) for a language. */
export function seoText(lang: Lang, text: string): string {
  if (lang === "en") return text;
  const direct = dictionaries[lang][text];
  if (direct) return direct;
  for (const re of SEO_TEMPLATES) {
    const m = re.exec(text);
    if (!m) continue;
    const key = text.replace(m[1], "{title}");
    const tpl = dictionaries[lang][key];
    if (tpl) return tpl.replace("{title}", dictionaries[lang][m[1]] ?? m[1]);
  }
  return text;
}

/** The current language and `t`. The language is fixed per page, so this never re-renders. */
export function useI18n() {
  return { lang: current, isRtl: isRtlLang(current), t, localize };
}
