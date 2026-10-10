/**
 * Where a page's generated Open Graph card lives. Shared by the build (scripts/generate-og.mjs,
 * prerender, routes) and the client (useSEO), so both compute the same URL from a path.
 * Cards are English-only: every language of a page uses the English card for that path.
 *
 * "/" -> "home", "/blog/my-post" -> "blog-my-post", "/platform/module/core" -> "platform-module-core".
 */
export const ogSlug = (neutralPath) => {
  const s = String(neutralPath).split(/[?#]/)[0].replace(/^\/+|\/+$/g, "").replace(/\/+/g, "-");
  return s || "home";
};

/** Root-relative URL of the card for a language-neutral path. */
export const ogImagePath = (neutralPath) => `/og/${ogSlug(neutralPath)}.png`;
