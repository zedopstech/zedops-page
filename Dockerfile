# syntax=docker/dockerfile:1

# ── Stage 1: build the static site ────────────────────────────────────────────
# `npm run build` also runs the prebuild hook, which regenerates sitemap.xml from
# the route table, so the sitemap can never drift from the router again.
FROM node:24-alpine AS builder

WORKDIR /app

# Copy manifests first so `npm ci` is cached until dependencies actually change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build args so staging/preview images never advertise production URLs in
# canonical tags, OG tags or the sitemap, and so the analytics tag can be added
# or omitted per environment.
#
# BOTH args must be declared here. Passing --build-arg without a matching ARG
# leaves the value outside the build environment entirely: the build still
# succeeds, the vite plugin still sees an empty variable, and the site ships with
# no tag. That is exactly what happened before this was fixed.
ARG VITE_SITE_URL=https://zedops.com
ENV VITE_SITE_URL=$VITE_SITE_URL

# Google Analytics 4 measurement ID. Empty means "ship without a tag", which is
# what local and preview builds want.
ARG VITE_GA_ID=
ENV VITE_GA_ID=$VITE_GA_ID

RUN npm run build

# Fail the build rather than shipping an image with no site in it.
RUN test -f dist/public/index.html || (echo "dist/public/index.html missing" && exit 1)

# If a measurement ID was supplied, prove the tag reached the output. This turns
# a silent "deployed with no analytics" into a failed build.
RUN if [ -n "$VITE_GA_ID" ]; then \
      grep -q "googletagmanager" dist/public/index.html \
        || (echo "VITE_GA_ID was set but no analytics tag is in dist/public/index.html" && exit 1); \
      echo "analytics tag present for $VITE_GA_ID"; \
    else \
      echo "no VITE_GA_ID set - building without analytics (expected for local builds)"; \
    fi

# ── Stage 2: serve the static output ──────────────────────────────────────────
# Caddy (89 MB) instead of node:alpine + `npm install -g serve` (~180 MB and a
# global, unpinned install at image build time). Caddy also gives us real 404
# status codes, which `serve -s` could not: it answered 200 for every unknown URL.
FROM caddy:2.8-alpine

COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/public /srv

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
