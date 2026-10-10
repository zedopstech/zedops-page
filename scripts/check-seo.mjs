/**
 * Fails when a page component's useSEO title/description differs from the one in
 * scripts/lib/routes.mjs (the source of truth for prerendered head tags). Static routes
 * only: module and blog pages compose their copy from data and are generated from it.
 *
 * Run via `npm run check:seo`.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { ROOT, routes } from "./lib/routes.mjs";

const literal = (src, key) => {
  const block = src.slice(src.indexOf("useSEO({"));
  const m = new RegExp(`\\b${key}:\\s*(?:t\\()?\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
  return m ? JSON.parse(`"${m[1]}"`) : null;
};

let bad = 0;
for (const r of routes()) {
  if (!r.source.startsWith("src/pages/")) continue;
  const src = readFileSync(path.join(ROOT, r.source), "utf8");
  for (const key of ["title", "description"]) {
    const found = literal(src, key);
    if (found !== r[key]) {
      bad += 1;
      console.error(`${r.path} (${r.source}) ${key}:\n  page:   ${found}\n  routes: ${r[key]}`);
    }
  }
}
if (bad) {
  console.error(`check:seo: ${bad} mismatch(es)`);
  process.exit(1);
}
console.log("check:seo: page titles and descriptions match routes.mjs");
