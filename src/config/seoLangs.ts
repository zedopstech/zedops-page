import seoLangs from "./seoLangs.json";

/**
 * Languages search engines may index. Edit src/config/seoLangs.json to flip one on: the build
 * scripts (scripts/lib/routes.mjs) read the same file. A language not listed is still served but
 * gets `noindex, follow`, stays out of sitemap.xml and out of every hreflang set.
 */
export const INDEXED_LANGS: readonly string[] = seoLangs.indexedLangs;

export const isIndexedLang = (lang: string): boolean => INDEXED_LANGS.includes(lang);

/** Whether a page that exists in `routeLangs` should advertise hreflang alternates (needs 2+ indexed versions). */
export const hasAlternates = (routeLangs: readonly string[]): boolean =>
  routeLangs.filter(isIndexedLang).length > 1;
