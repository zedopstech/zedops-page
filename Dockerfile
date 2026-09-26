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

# VITE_SITE_URL is a build arg so staging/preview images never advertise
# production URLs in canonical tags, OG tags or the sitemap. Defaults to
# production; override with --build-arg for other environments.
ARG VITE_SITE_URL=https://zedops.com
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

# Fail the build rather than shipping an image with no site in it.
RUN test -f dist/public/index.html || (echo "dist/public/index.html missing" && exit 1)

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
