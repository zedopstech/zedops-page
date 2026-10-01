# ZedOps — product site

The public website for **ZedOps**, the AI platform for MEP and construction
execution. ZedOps connects schedule, field work, materials, costs and quality in
one project view for mechanical, electrical and plumbing contractors.

Vite + React 19 + TypeScript + Tailwind v4 single-page app, prerendered to static
HTML and served from Cloudflare Pages. It carries the homepage plus the platform,
module, persona, how-we-help and blog routes.

---

## Requirements

- **Node 20+** and npm

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/public`: `sitemap` → vite → `prerender` → `hash-assets` |
| `npm run serve` | Serve the production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from the route table |
| `npm run typecheck` | `tsc --noEmit` (TypeScript is a devDependency; this gate was dead until 2026-09-26) |
| `npm run hash-assets` | Fingerprint media in `dist/public` and rewrite references. Normally run for you by `build`. |

## How the build fits together

`npm run build` triggers the `prebuild` hook, which regenerates `public/sitemap.xml`
**before** Vite runs. The sitemap is generated from the route list in
`scripts/generate-sitemap.mjs` rather than hand-maintained — the previous
hand-written file had drifted out of sync with the router (it advertised a
commented-out `/pricing` route and omitted the blog entirely).

`lastmod` values come from the last git commit that touched each page's source
file. If git history is unavailable the script notes that and falls back to the
build date.

> **If you add a route, add it to `scripts/generate-sitemap.mjs` too.** Otherwise
> the page works but never appears in the sitemap.

## Project structure

```
src/
  components/
    design-system/     Shared primitives (Container, Highlight, Eyebrow, TicketButton,
                       GradientCard, DotGrid, SplitHeader, ...). Imported by most pages.
    home/             Homepage sections, composed by pages/Home.tsx
    module/           Shared module landing page sections
    howWeHelpHub/     How-we-help hub page sections
    ui/               shadcn/ui primitives
  pages/
    Home.tsx          The homepage ("/" route)
    sandbox/          Internal mockups, noindex and not linked from the site
  hooks/
    useSEO.ts         Per-route document head management
  config/
    site.ts           Canonical origin + brand facts used in structured data
  data/               Page content and copy
  content/blog/       Blog markdown + frontmatter
scripts/
  generate-sitemap.mjs
public/
  _headers            Cloudflare Pages cache + security headers (see Caching)
```

## SEO

`useSEO({ title, description, ... })` runs on every page and manages the
`document.head`: title, description, canonical, `og:*`, `twitter:*`, robots and
per-page JSON-LD. The canonical URL is derived from the router location, so pages
do not need to pass it.

Canonical and `og:url` use the **trailing-slash** form (`/solutions/`), built with
`pageUrl`. Cloudflare Pages serves each prerendered route at `/solutions/` and
308-redirects `/solutions`, so a no-slash canonical would be a canonical URL that
itself redirects. The sitemap and `llms.txt` use the same slashed form. Asset URLs
(images, `og-image.png`) go through `absoluteUrl` and never take a slash.

Optional arguments: `path`, `image`, `imageAlt`, `type` (`"website"` | `"article"`),
`noindex`, `publishedTime`, `modifiedTime`, `author`, `jsonLd`.

Site-wide `Organization` / `WebSite` / `SoftwareApplication` structured data lives
in `index.html` and is tagged `data-seo-jsonld="static"`. The hook only clears
blocks tagged `data-seo-jsonld="page"`, so the static block is never removed.

Per-route head tags are also baked into the HTML at build time by
`scripts/prerender.mjs` (one file per route, plus `404.html`), so social scrapers
which do not run JavaScript still see the correct title, description, canonical,
Open Graph tags and JSON-LD. The client-side hook keeps the head correct during
in-app navigation.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `VITE_SITE_URL` | `https://zedops.com` | Canonical origin, OG URLs and sitemap host. Set per environment so staging never advertises production URLs. |
| `VITE_GA_ID` | unset | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Injected by a Vite plugin at build time, so the ID is never committed. **Unset means the site ships with no analytics at all** - verify it is set in the deploy config or GA will silently not fire. |
| `VITE_LEADS_API_URL` | Strapi default in `src/lib/leads.ts` | Base URL of the Strapi CMS (`zedops-kb-api`) that receives the contact, early-access and roadmap forms. Only set it to point a preview at a non-production CMS. |

## Deployment

The site is deployed to **Cloudflare Pages** by `.github/workflows/deploy-pages.yml`
on every push to `main`. The old VPS/Docker path — an image in GHCR run by
`docker compose` on the stage server, fronted by the shared edge Caddy — has been
retired. It was the rollback target while the move was in progress and is no
longer needed.

### Cloudflare Pages

The project is named `zedops-page`. It is a **direct-upload** project: the site is
built on the GitHub runner and the static output is pushed with
`wrangler pages deploy`. No build runs on Cloudflare's side and no Cloudflare
GitHub app is installed, so the repository stays the single source of both the
build and its configuration.

It answers on `zedops-page.pages.dev` and on the custom domains `zedops.com` and
`www.zedops.com`. The zone is already on Cloudflare, so those are the only records
that point at Pages; `*.zedops.com` (which carries the app, docs, kb-api and pdf
subdomains) and the mail records are untouched.

One-time setup — repository secrets under **Settings → Secrets and variables →
Actions**:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with **Account → Cloudflare Pages → Edit** on the account that owns the project |
| `CLOUDFLARE_ACCOUNT_ID` | the account id that owns the `zedops-page` project |

The build reads `VITE_SITE_URL`, `VITE_GA_ID` and `VITE_LEADS_API_URL`, with
`vars.VITE_GA_ID` taking precedence over `secrets.VITE_GA_ID`.

Cache and security headers live in `public/_headers`, which Vite copies to the
build root — see Caching.

To rotate `CLOUDFLARE_API_TOKEN`: create a new token with the same permission in
the Cloudflare dashboard, update the GitHub secret (repository **Settings →
Secrets and variables → Actions**, or
`gh secret set CLOUDFLARE_API_TOKEN -R zedopstech/zedops-page`), and delete the old
token in Cloudflare.

## Caching

The policy is expressed in `public/_headers`, which Cloudflare Pages reads from
the build root.

| Path | `Cache-Control` |
|---|---|
| `/assets/*` and hashed media | `public, max-age=31536000, immutable` |
| Root brand/SEO files (not hashed) | `public, max-age=604800` |
| HTML shell, `robots.txt`, `sitemap.xml`, `llms.txt` | revalidate on every request |

There is deliberately no catch-all rule: Pages' default for anything `_headers`
does not match is `public, max-age=0, must-revalidate`, the revalidate-every-time
behaviour the shell needs. It has to be left to the default, because **Pages
`_headers` rules are additive, not first-match-wins** — a catch-all
`Cache-Control` would be joined onto every specific rule and effectively take
over. The header comment in `public/_headers` spells this out, including why
`/platform/*` and `/blog/*` are qualified by file extension (they hold route HTML
next to media).

## Verifying analytics is actually live

The tag failing to appear is silent by nature: the build succeeds and the site
deploys with no tag, and nothing reports an error. The build log now prints
`google analytics: enabled (G-...)` or a DISABLED warning, so check the Actions log
first. Then confirm on the deployed site:

```bash
curl -s https://zedops.com/ | grep -c G-YOURID   # expect > 0
curl -s https://zedops.com/solutions | grep -c G-YOURID  # prerendered routes too
```

If the count is 0, the ID never reached the build. It is read from
`vars.VITE_GA_ID || secrets.VITE_GA_ID`; GitHub keeps Variables and Secrets in
separate stores and one is ignored by the other, so check the **name** matches
exactly (`VITE_GA_ID`, no spaces) and that the value has no stray whitespace.

Google's "tag wasn't detected" message can also appear for ~10 minutes after a
deploy, because the check reads a cached copy of the page.

## CI

Two workflows. See [Deployment](#deployment).

| Workflow | Trigger | Secrets | Does |
|---|---|---|---|
| `.github/workflows/ci.yml` | `pull_request` to main | none | typecheck, build, prerender assertions |
| `.github/workflows/deploy-pages.yml` | push to main, manual | Cloudflare API token | build, upload `dist/public` to Cloudflare Pages |

`deploy-pages.yml` may not use `pull_request` or `pull_request_target`: on a
public repo, `pull_request_target` checks out a contributor's code while holding
repository secrets, which is a remote-code-execution path. So `ci.yml` runs on
`pull_request` and holds no secrets at all — it only invokes the toolchain, so
there is nothing to leak and a fork can trigger it safely. `main` is protected so
that `ci.yml` must pass before anything deploys.

`ci.yml` also asserts the prerender step produced at least 30 route files and a
`404.html`. That guards a failure mode this repo has already had once: a
prerender step that quietly stops emitting files leaves a site that returns 200
while serving the homepage's title and canonical URL on every route.

## Asset caching

Vite fingerprints its own output, but everything in `public/` is copied to the
build root under the filename it had in source. Replacing an asset therefore kept
its URL, and any CDN that already had that path kept serving the old bytes.

That is not hypothetical. Swapping the hero video deployed correctly — the
container had the new file — and Cloudflare served the old one for the rest of
its 7-day TTL until it was purged by hand.

`scripts/hash-assets.mjs` runs as the last build step and renames each media file
to `name.<sha256-prefix><ext>`, then rewrites every reference. The URL changes
exactly when the bytes change, so a stale copy is unreachable and `immutable` is
safe.

```
/hero/hero-reel.67350de94d.mp4
/photos/at-office.86bf827856.png
```

**What is not hashed, on purpose:** `/assets/*` (the bundler already fingerprints
it) and the root-level brand and SEO files — `og-image.png`, `logo.png`, the
favicons, `apple-touch-icon.png`. The Open Graph tags and the Organization
JSON-LD reference those by absolute URL, and schema.org wants a stable identity
for the logo; a content-addressed URL there would change the declared identity
every time the logo did. They change about once a year, so there is nothing to
gain.

**Two traps this had to avoid.** Media directories and prerendered route
directories live in the same tree — `/platform/material-management.png` sits
beside `/platform/module/core/index.html` — so the script filters by extension
*and* allowlists media directories, and a route's `index.html` is never a
candidate. And references are rewritten as exact full paths, never directory
prefixes: replacing the string `/platform/` would silently corrupt all twelve
module URLs in `sitemap.xml`, which match a naive search but are page URLs.

If any pre-hash reference survives anywhere in `dist`, the build **fails**. A
missing image is a 404 that no build log would ever show.

### Cache policy in `public/_headers`

| what | policy | why |
|---|---|---|
| `/assets/*` and hashed media | `max-age=31536000, immutable` | addressed by content; bytes cannot change under the name |
| root brand/SEO files | `max-age=604800` | stable URLs by design, so they must revalidate |
| route HTML, `robots.txt`, `sitemap.xml`, `llms.txt` | revalidate on every request | a deploy replaces these in place |

The rules are mutually exclusive by construction, because Pages applies every
matching `_headers` rule and comma-joins a header that is set twice. The hashed
media directories that also hold route HTML (`/platform`, `/blog`) are therefore
matched with path placeholders qualified by file extension — `/platform/:file.png`
cannot match `/platform/module/core`. Verified against the real deployment,
including the pair that matters most:
`/platform/material-management.<hash>.png` → `immutable`, while
`/platform/module/core` revalidates.

## Known dead code

`src/components/*Landing.tsx` contains two generations of page. The live set is
`src/components/home/Home*.tsx` plus `ModuleLandingTemplate`; the older
top-level `*Landing.tsx` files (`CoreLanding`, `MaterialManagementLanding`,
`TasksResolutionLanding`, `WorkforceIntelligenceLanding`, `PunchListLanding`,
`DailyIntelligenceLanding`, `BudgetCostControlLanding`, `QualitySafetyLanding`,
`ModulePatternLanding`, `Hero`, `Platform`, `Testimonials`, `IndustriesHomeSection`)
are not reachable from `main.tsx`.

Roughly 600 KB across 43 component files. Most of the rest of the unreachable
set is unused `shadcn/ui` primitives, which are fine to keep as a library — the
`Landing` files are the ones worth deciding about. They are still type checked,
which is how a missing colour tone in `MaterialManagementLanding` surfaced: a
latent crash that never fired only because the component is never rendered.

Deleting them is a separate piece of work, not a drive-by. Some contain copy
worth salvaging first.

## Roadmap

- [ ] Page titles and descriptions are declared in two places: the route table
      used at build time, and each page's `useSEO` call. Have the pages read from
      the route table so there is one source.
- [ ] Remaining images: add `width`/`height` and `loading="lazy"` sitewide. Done
      for the industries section, not everywhere.
- [ ] Consolidate `react-icons` into `lucide-react`.
- [ ] Decide what to do with the unreachable `*Landing.tsx` generation (see
      Known dead code). Check for copy worth keeping before deleting.
- [x] Hash every asset filename, so replacing an image at a stable path is not
      masked by Cloudflare's cache. Done — see Asset caching.
- [x] Cache the HTML at the edge without staling on deploy. Done by moving to
      Cloudflare Pages: HTML is served with `max-age=0, must-revalidate`, so a
      deploy is picked up on the next request, and the site is no longer
      proxied through a VPS origin at all.
- [ ] Branch protection on `main` is set to require the `Type check and build`
      check. Worth also deciding whether direct pushes to `main` stay allowed for
      solo work, or whether everything goes through a PR.
- [x] No CI key can reach the server as root. Retiring the VPS deployment removed
      `.github/workflows/deploy.yml`, so no repository secret holds an SSH key for
      the server any more. Manual SSH still uses a key in root's `authorized_keys`.
