import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT ?? "5173");

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

/**
 * Publishes the Google Analytics 4 measurement ID into the built HTML, but only
 * when one is provided. Done here rather than hardcoding the snippet in
 * index.html so that:
 *   - the tag is absent from source control, so the ID is not committed
 *   - local and preview builds can opt out by leaving VITE_GA_ID unset
 *   - `npm run prerender` picks it up automatically, because it copies the built
 *     index.html, so every prerendered route reports page views too
 *
 * It publishes only a <meta> tag, NOT the gtag.js <script>. That script used to
 * be injected here, which meant Google was contacted on every single page view
 * before the visitor had agreed to anything. The loader now lives in
 * src/lib/analytics.ts and only runs after a recorded "granted" consent, so
 * declining genuinely means no request is made - not merely that no events are
 * sent afterwards.
 *
 * Set with: VITE_GA_ID=G-XXXXXXXXXX npm run build
 */
function googleAnalytics(): Plugin {
  const id = process.env.VITE_GA_ID;
  return {
    name: "inject-google-analytics",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Say so in the build log. Without this, a missing VITE_GA_ID produces a
        // successful build and a deployed site with no tag, and nothing anywhere
        // reports a problem - which is exactly how this was missed the first time.
        if (id) {
          console.log(`  google analytics: enabled (${id}, loads after consent)`);
        } else {
          console.warn(
            "  google analytics: DISABLED - VITE_GA_ID is not set. The site will build and ship without a tag.",
          );
        }
        if (!id) return html;
        return {
          html,
          tags: [
            {
              tag: "meta",
              attrs: { name: "ga-measurement-id", content: id },
              injectTo: "head-prepend" as const,
            },
          ],
        };
      },
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), googleAnalytics()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
  },
});
