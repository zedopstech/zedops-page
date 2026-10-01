/**
 * Content-addresses the media copied verbatim out of `public/`.
 *
 * WHY
 * Vite fingerprints `/assets/*` (its own JS and CSS output), but everything in
 * `public/` is copied to the build root with the filename it had in source. So
 * replacing `public/hero/hero-reel.mp4` keeps the URL `/hero/hero-reel.mp4`, and
 * every CDN that already has that path keeps serving the old bytes. That is not
 * theoretical: swapping the hero video deployed correctly, the container had the
 * new file, and Cloudflare served the old one for the rest of its 7-day TTL
 * until it was purged by hand. The same trap applies to every image on the site.
 *
 * WHAT
 * Renames each media file to `name.<hash><ext>` and rewrites every reference to
 * it. The URL changes exactly when the bytes change, so a stale copy can never
 * be served: a new build produces new URLs, and an unchanged file keeps its old
 * URL and stays in cache. That is what makes `Cache-Control: immutable` safe for
 * these, which is the second half of the win.
 *
 * WHAT IS DELIBERATELY NOT HASHED
 *   - `/assets/*` - already fingerprinted by the bundler.
 *   - Root-level brand and SEO files: `og-image.png`, `logo.png`, the favicons,
 *     `apple-touch-icon.png`. These are referenced by absolute URL from Open
 *     Graph tags and from the Organization JSON-LD, where a content-addressed
 *     URL would be wrong - schema.org wants a stable identity for the logo, and
 *     social scrapers cache by the URL they were given. They also change about
 *     once a year, so there is nothing to gain and identity to lose.
 *
 * SCOPE, AND WHY IT IS AN EXPLICIT ALLOWLIST
 * `dist/public/` holds media directories and prerendered route directories in
 * one tree - `/platform/material-management.png` sits next to
 * `/platform/module/core/index.html`. So this cannot be "hash everything in a
 * subdirectory". Two guards keep it safe:
 *   1. Only files whose extension is a media type are considered, so a route's
 *      `index.html` is never a candidate.
 *   2. Only files under an allowlisted top-level directory are considered.
 * References are then rewritten as *exact* full paths, never directory
 * prefixes - replacing the string `/platform/` would corrupt every module URL
 * in sitemap.xml, which is a real trap: those look like matches and are not.
 *
 * Runs after prerender, so it rewrites the generated route files too, and
 * finishes by asserting no unhashed reference survives. Wired into `npm run
 * build` as the last step.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/routes.mjs";

const DIST = path.join(ROOT, "dist/public");

/** Extensions that may be content-addressed. */
const MEDIA_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".mp4", ".webm", ".woff2",
]);

/** Top-level directories under dist/public that hold media, not routes. */
const MEDIA_DIRS = new Set([
  "backgrounds", "blog", "contractors", "hero", "industries",
  "personas", "photos", "platform", "screenshots", "team", "video",
]);

/** Never hashed, though some of these sit in a media dir. */
const NEVER = new Set(["assets"]);

/** File types whose contents may contain references worth rewriting. */
const TEXT_EXT = new Set([
  ".html", ".js", ".css", ".json", ".xml", ".txt", ".webmanifest", ".map",
]);

/** Characters to keep when shortening a hash. Hex only: always URL-safe. */
const HASH_LEN = 10;

/**
 * A filename that already carries a fingerprint, e.g. `hero-reel.67350de94d.mp4`.
 * Used to make this script idempotent: without it, running it twice over the
 * same dist appends a second hash - `hero-reel.67350de94d.67350de94d.mp4` - and
 * public/_headers' content-addressed rules no longer match the file, so it
 * silently drops off the immutable cache rule.
 */
const ALREADY_HASHED = new RegExp(`\\.[0-9a-f]{${HASH_LEN}}$`);

if (!existsSync(DIST)) {
  console.error("  asset hashing: dist/public not found - run this after the build");
  process.exit(1);
}

function shortHash(buffer) {
  return createHash("sha256").update(buffer).digest("hex").slice(0, HASH_LEN);
}

/** Walk dist/public, returning every file as a root-relative POSIX path. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push("/" + path.relative(DIST, full).split(path.sep).join("/"));
  }
  return out;
}

const allFiles = walk(DIST);

// ── 1. decide what gets hashed ──────────────────────────────────────────────
const targets = allFiles.filter((rel) => {
  const parts = rel.split("/").filter(Boolean);
  if (parts.length < 2) return false; // root-level: brand + SEO files, kept stable
  if (NEVER.has(parts[0])) return false;
  if (!MEDIA_DIRS.has(parts[0])) return false;
  const name = parts[parts.length - 1];
  if (!MEDIA_EXT.has(path.extname(name).toLowerCase())) return false;
  // Already fingerprinted by a previous run over this same dist.
  if (ALREADY_HASHED.test(path.basename(name, path.extname(name)))) return false;
  return true;
});

if (targets.length === 0) {
  console.log("  asset hashing: nothing to fingerprint (already content-addressed)");
  process.exit(0);
}

// ── 2. rename each one to name.<hash><ext> ───────────────────────────────────
const renames = new Map(); // old public path -> new public path
for (const rel of targets) {
  const abs = path.join(DIST, rel);
  const buf = readFileSync(abs);
  const ext = path.extname(rel);
  const base = path.basename(rel, ext);
  const hashed = `${base}.${shortHash(buf)}${ext}`;
  const nextRel = rel.replace(/\/[^/]+$/, `/${hashed}`);
  const nextAbs = path.join(DIST, nextRel);

  if (existsSync(nextAbs)) {
    // Same content, same hash: a rebuild of unchanged media. Keep the original
    // file too rather than clobbering it, so the previous URL stays valid.
    renames.set(rel, nextRel);
    continue;
  }
  renameSync(abs, nextAbs);
  renames.set(rel, nextRel);
}

// ── 3. rewrite every reference ──────────────────────────────────────────────
const candidates = allFiles.filter(
  (f) => TEXT_EXT.has(path.extname(f).toLowerCase()) && statSync(path.join(DIST, f)).size < 40 * 1024 * 1024,
);

let replacements = 0;
const touched = new Set();

for (const rel of candidates) {
  const abs = path.join(DIST, rel);
  let text = readFileSync(abs, "utf8");
  const before = text;

  for (const [from, to] of renames) {
    // Exact whole-path match only. `from` always starts with a slash and ends
    // with an extension, so this cannot match a bare directory reference.
    const pattern = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    if (pattern.test(text)) {
      text = text.replace(pattern, to);
      replacements++;
      touched.add(rel);
    }
  }

  if (text !== before) writeFileSync(abs, text, "utf8");
}

// ── 4. assert the rewrite was complete ──────────────────────────────────────
// A missed reference means a 404 in production, and a 404 on an image is
// invisible in a build log. So this is a hard failure, not a warning.
const survivors = [];
for (const rel of candidates) {
  const text = readFileSync(path.join(DIST, rel), "utf8");
  for (const from of renames.keys()) {
    if (text.includes(from)) survivors.push(`${rel} -> ${from}`);
  }
}

if (survivors.length > 0) {
  console.error("  asset hashing: FAILED - these files still reference pre-hash paths:");
  for (const s of survivors.slice(0, 20)) console.error(`    ${s}`);
  if (survivors.length > 20) console.error(`    ...and ${survivors.length - 20} more`);
  process.exit(1);
}

let bytes = 0;
for (const to of renames.values()) bytes += statSync(path.join(DIST, to)).size;

console.log(
  `  asset hashing: ${renames.size} media file(s) fingerprinted ` +
    `(${(bytes / 1048576).toFixed(1)} MB), ${replacements} reference(s) rewritten ` +
    `across ${touched.size} file(s)`,
);
