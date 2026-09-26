# ZedOps — marketing site

Vite + React 19 + TypeScript + Tailwind v4 single-page app for the ZedOps
marketing site. Serves the homepage plus the platform, module, persona, how-we-help
and blog routes.

---

## Requirements

- **Node 20+** and npm
- Docker only if you want to run the container locally

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/public` (runs `sitemap` first) |
| `npm run serve` | Serve the production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from the route table |
| `npm run typecheck` | `tsc --noEmit` (TypeScript is a devDependency; this gate was dead until 2026-09-26) |

## How the build fits together

`npm run build` triggers the `prebuild` hook, which regenerates `public/sitemap.xml`
**before** Vite runs. The sitemap is generated from the route list in
`scripts/generate-sitemap.mjs` rather than hand-maintained — the previous
hand-written file had drifted out of sync with the router (it advertised a
commented-out `/pricing` route and omitted the blog entirely).

`lastmod` values come from the last git commit that touched each page's source
file. Inside Docker the build context excludes `.git`, so it falls back to the
build date and logs a note.

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
deploy/
  Caddyfile           Static file server config baked into the image
```

## SEO

`useSEO({ title, description, ... })` runs on every page and manages the
`document.head`: title, description, canonical, `og:*`, `twitter:*`, robots and
per-page JSON-LD. The canonical URL is derived from the router location, so pages
do not need to pass it.

Optional arguments: `path`, `image`, `imageAlt`, `type` (`"website"` | `"article"`),
`noindex`, `publishedTime`, `modifiedTime`, `author`, `jsonLd`.

Site-wide `Organization` / `WebSite` / `SoftwareApplication` structured data lives
in `index.html` and is tagged `data-seo-jsonld="static"`. The hook only clears
blocks tagged `data-seo-jsonld="page"`, so the static block is never removed.

**Known limitation:** meta tags are injected client-side. Crawlers that execute JS
see per-route data, but social scrapers (LinkedIn, Slack, WhatsApp, Facebook) do
not. Fixing that needs build-time prerendering — see the roadmap below.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `VITE_SITE_URL` | `https://zedops.com` | Canonical origin, OG URLs and sitemap host. Set per environment so staging never advertises production URLs. |
| `VITE_GA_ID` | unset | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Injected by a Vite plugin at build time, so the ID is never committed. **Unset means the site ships with no analytics at all** - verify it is set in the deploy config or GA will silently not fire. |

## Docker

```bash
docker build -t zedops-page .
docker run --rm -p 3000:3000 zedops-page
```

Multi-stage: Node builds the site, then the output is copied into `caddy:2.8-alpine`
to serve it (~89 MB final image). The build fails if `dist/public/index.html` is
missing, so a broken build cannot ship.

`.dockerignore` matters: it keeps local `node_modules` and `dist` out of the build
context. Do **not** add `scripts/` to it — the build needs
`scripts/generate-sitemap.mjs`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the image,
pushes it to GitHub Container Registry, then SSHes to the server, runs
`docker compose pull && docker compose up -d`, and health-checks the result.
Deploys are tagged by commit SHA, so a running image is traceable to a commit.

### One-time setup

0. Set the repository variable `VITE_GA_ID` (Settings -> Secrets and variables ->
   Actions -> **Variables**, not Secrets). Without it the deployed site has no
   analytics tag at all.
1. Create the image package as **public** so the server can pull it anonymously
   (repo → Packages → `zedops-page` → Package settings → Change visibility).
   Until then the deploy fails at the pull step.
2. Add repository secrets under **Settings → Secrets and variables → Actions**:

   | Secret | Value |
   |---|---|
   | `SERVER_HOST` | server IP or hostname |
   | `SERVER_USER` | `root`, or a restricted deploy user |
   | `SSH_PRIVATE_KEY` | the deploy private key, **without** a `.pub` suffix |

3. The server needs an SSH key in `authorized_keys` for that deploy user. The
   workflow pins the server's host key and refuses to deploy if it changes.

### Server-side notes

- The container **must** keep the name `zedops-live`. The edge Caddy config
  reverse-proxies to `zedops-live:3000` by name; renaming it takes the site down.
- Port 3000 is `expose`d to the Docker network only. Caddy publishes 80/443.
- The edge Caddyfile lives on the host at
  `/home/zedops/zedops-stage/caddy/Caddyfile` and is bind-mounted. It is
  deliberately not in this repo because it spans several projects. Nothing runs
  `caddy reload` automatically after editing it — reload manually or the change
  is inert.
- `deploy.sh` covers the Laravel `stage` and `prelive` services, not this site.

## Caching

`deploy/Caddyfile` sets the policy the previous `serve -s` setup could not:

| Path | `Cache-Control` |
|---|---|
| `/assets/*` (content-hashed) | `public, max-age=31536000, immutable` |
| Images, video, fonts | `public, max-age=604800` |
| HTML | `no-cache` (must revalidate so deploys are picked up) |

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

Two workflows, deliberately split by trust boundary.

| Workflow | Trigger | Secrets | Does |
|---|---|---|---|
| `.github/workflows/ci.yml` | `pull_request` to main | none | typecheck, build, prerender assertions |
| `.github/workflows/deploy.yml` | push to main, manual | SSH key, registry | Docker build, push to GHCR, deploy over SSH |

The split is a security decision, not an organisational one. `deploy.yml` cannot
use `pull_request` or `pull_request_target`: on a public repo,
`pull_request_target` checks out a contributor's code while holding repository
secrets, which is a remote-code-execution path. So `ci.yml` runs on
`pull_request` and holds no secrets at all — it only invokes the toolchain, so
there is nothing to leak and a fork can trigger it safely. `main` is protected so
that `ci.yml` must pass before anything reaches `deploy.yml`.

`ci.yml` also asserts the prerender step produced at least 30 route files and a
`404.html`. That guards a failure mode this repo has already had once: a
prerender step that quietly stops emitting files leaves a site that returns 200
while serving the homepage's title and canonical URL on every route.

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
- [ ] Hash every asset filename, so replacing an image at a stable path is not
      masked by Cloudflare's cache for up to 7 days.
- [ ] Consolidate `react-icons` into `lucide-react`.
- [ ] Decide what to do with the unreachable `*Landing.tsx` generation (see
      Known dead code). Check for copy worth keeping before deleting.
- [ ] Cloudflare is caching nothing: responses carry `cache-control: no-cache`
      and `cf-cache-status: DYNAMIC`, so every visitor and every crawler hits
      the origin. The immutable `/assets/*` paths are content-hashed and safe to
      cache; the HTML is not, and is the thing worth revisiting.
- [ ] Branch protection on `main` is set to require the `Type check and build`
      check. Worth also deciding whether direct pushes to `main` stay allowed for
      solo work, or whether everything goes through a PR.
- [ ] Consider a non-root deploy user with restricted sudo, so a leaked CI key
      cannot reach root.
