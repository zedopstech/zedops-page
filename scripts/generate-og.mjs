/**
 * Renders one 1200x630 Open Graph card per route into dist/public/og/<slug>.png
 * (slug from src/config/ogImage.mjs, shared with prerender and the client's useSEO).
 * Cards are English-only; every language of a page points at the same card.
 *
 * Routes with an explicit frontmatter `image` keep that image and get no card.
 * Fonts are committed in scripts/og/fonts (Geist, SIL OFL 1.1 - see OFL.txt there), so the
 * build needs no network. Run via `npm run og`, wired into `npm run build` after prerender.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { ROOT, routes } from "./lib/routes.mjs";
import { ogSlug } from "../src/config/ogImage.mjs";

const OUT = path.join(ROOT, "dist/public/og");
const W = 1200;
const H = 630;
const NAVY = "#172B4D";
const ORANGE = "#FE5D02"; // --accent in src/index.css

const font = (file) => readFileSync(path.join(ROOT, "scripts/og/fonts", file));
const fonts = [
  { name: "Geist", data: font("Geist-Regular.ttf"), weight: 400, style: "normal" },
  { name: "Geist", data: font("Geist-SemiBold.ttf"), weight: 600, style: "normal" },
  { name: "Geist", data: font("Geist-Bold.ttf"), weight: 700, style: "normal" },
];

// Interlocking mark, geometry from src/components/ZedOpsMark.tsx (white ribbons for a dark surface).
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="254 84 487 388" stroke-linejoin="round" stroke-width="2">
<path d="m340 279-73-76c-12-12-11-27 0-39l77-73q5-5 13-4h278c22 0 37 15 37 38 0 21-15 40-36 40h-181z" fill="#fff" stroke="#fff"/>
<path d="m340 280h147q11 0 11 9 0 4-5 10l-91 91q-3 4-8 3h-119q-13 1-16-11-6-13 3-24z" fill="#fff" stroke="#fff"/>
<path d="m563 269 63-59q7-7 18-7h76q12 0 16 11 4 10-5 19l-53 51q-5 6-13 6l-102-2q-13 0 0-19z" fill="${ORANGE}" stroke="${ORANGE}"/>
<path d="m668 291 61 64q8 8 8 18 0 13-10 23l-72 69q-5 5-13 5h-204c-21 0-34-14-34-34-1-22 14-41 36-41l121-2z" fill="${ORANGE}" stroke="${ORANGE}"/>
</svg>`;
const MARK_URI = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;

const PERSONA = /^\/who-we-serve\/./;
const SECTIONS = [
  [/^\/$/, "Construction operations"],
  [/^\/blog/, "Blog"],
  [/^\/(solutions|platform)/, "Platform"],
  [/^\/zed-ai/, "Zed AI"],
  [/^\/how-we-help/, "How we help"],
  [/^\/who-we-serve/, "Who we serve"],
  [/^\/security/, "Security"],
  [/^\/roadmap/, "Roadmap"],
  [/^\/about/, "About"],
  [/^\/early-access/, "Early access"],
  [/^\/contact/, "Contact"],
  [/^\/(privacy|terms)/, "Legal"],
];

function label(route) {
  if (PERSONA.test(route.path)) {
    const m = /^ZedOps for (.+)$/.exec(route.title);
    return m ? `For ${m[1].replace(/ &.*$/, "").replace(/ \(.*$/, "")}` : "Who we serve";
  }
  return SECTIONS.find(([re]) => re.test(route.path))?.[1] ?? "ZedOps";
}

/** Page title without the site suffix ("Security – ZedOps", "Core – ZedOps platform"). */
function cardTitle(route) {
  const t = route.title.replace(/\s+[–-]\s+ZedOps( platform)?$/, "").replace(/^ZedOps\s+[–-]\s+/, "");
  return t;
}

function fontSize(text) {
  const n = text.length;
  if (n <= 24) return 92;
  if (n <= 40) return 80;
  if (n <= 62) return 68;
  if (n <= 90) return 58;
  return 50;
}

const h = (type, style, children) => ({ type, props: { style, children } });

function card(route) {
  const title = cardTitle(route);
  const size = fontSize(title);
  return h("div", {
    width: W, height: H, display: "flex", flexDirection: "column", justifyContent: "space-between",
    background: NAVY, padding: "60px 80px", boxSizing: "border-box", fontFamily: "Geist", color: "#fff", position: "relative",
  }, [
    // Accent bar down the left edge.
    h("div", { position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: ORANGE }),
    h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
      h("div", { display: "flex", alignItems: "center" }, [
        { type: "img", props: { src: MARK_URI, width: 62, height: 49, style: { marginRight: 18 } } },
        h("div", { fontSize: 40, fontWeight: 700, letterSpacing: -1 }, "ZedOps"),
      ]),
      h("div", {
        display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
        color: ORANGE,
      }, label(route)),
    ]),
    h("div", {
      display: "flex", width: W - 160, fontSize: size, fontWeight: 600, lineHeight: 1.08, letterSpacing: -size * 0.02,
      lineClamp: 3, maxHeight: size * 1.08 * 3 + 8, overflow: "hidden",
    }, title),
    h("div", { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "#9FB0CC" }, [
      h("div", { display: "flex", fontWeight: 400 }, "zedops.com"),
      h("div", { display: "flex", width: 120, height: 6, borderRadius: 3, background: ORANGE }),
    ]),
  ]);
}

const started = Date.now();
mkdirSync(OUT, { recursive: true });
let count = 0;
for (const route of routes()) {
  if (route.image || route.noindex) continue;
  const svg = await satori(card(route), { width: W, height: H, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W }, font: { loadSystemFonts: false } }).render().asPng();
  writeFileSync(path.join(OUT, `${ogSlug(route.path)}.png`), png);
  count += 1;
}
console.log(`generate-og: ${count} cards in ${((Date.now() - started) / 1000).toFixed(1)}s`);
