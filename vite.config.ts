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
 * Injects Google Analytics (gtag.js) into the built HTML, but only when a
 * measurement ID is provided. Done here rather than hardcoding the snippet in
 * index.html so that:
 *   - the tag is absent from source control, so the ID is not committed
 *   - local and preview builds can opt out by leaving VITE_GA_ID unset
 *   - `npm run prerender` picks it up automatically, because it copies the built
 *     index.html, so every prerendered route reports page views too
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
        if (!id) return html;
        return {
          html,
          tags: [
            {
              tag: "link",
              attrs: { rel: "preconnect", href: "https://www.googletagmanager.com" },
              injectTo: "head-prepend" as const,
            },
            {
              tag: "script",
              attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${id}` },
              injectTo: "head-prepend" as const,
            },
            {
              tag: "script",
              children: [
                "window.dataLayer = window.dataLayer || [];",
                "function gtag(){dataLayer.push(arguments);}",
                "gtag('js', new Date());",
                `gtag('config', '${id}');`,
              ].join("\n"),
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
