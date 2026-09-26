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
| `npm run typecheck` | `tsc --noEmit` |

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

## Roadmap

- [ ] Page titles and descriptions are declared in two places: the route table
      used at build time, and each page's `useSEO` call. Have the pages read from
      the route table so there is one source.
- [ ] Remaining images: add `width`/`height` and `loading="lazy"` sitewide. Done
      for the industries section, not everywhere.
- [ ] Hash every asset filename, so replacing an image at a stable path is not
      masked by Cloudflare's cache for up to 7 days.
- [ ] Consolidate `react-icons` into `lucide-react`.
- [ ] Consider a non-root deploy user with restricted sudo, so a leaked CI key
      cannot reach root.
