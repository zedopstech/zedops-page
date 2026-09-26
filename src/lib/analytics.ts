/**
 * Loads Google Analytics 4 at runtime, only once consent has been recorded as
 * "granted".
 *
 * The measurement ID is not compiled into the JavaScript. It is written into
 * the built HTML as a <meta name="ga-measurement-id"> tag by the Vite plugin, so
 * it stays out of source control, local builds can opt out by leaving
 * VITE_GA_ID unset, and `npm run prerender` propagates it to every static route
 * for free. The gtag.js request itself is made from here, so nothing is fetched
 * from Google until a visitor opts in.
 *
 * Privacy-reducing defaults, which also match what the privacy policy claims:
 *   - allow_google_signals: false  - no Google Signals / ads-personalisation
 *   - ads_data_redaction: true     - redact ad identifiers from payloads
 * GA4 anonymises IP addresses by default, so send_page_view is left on.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ID_TAG = 'meta[name="ga-measurement-id"]';
const SCRIPT_ID = "zedops-ga-loader";

let loaded = false;

/** The measurement ID from the document, or null when analytics is disabled. */
export function analyticsId(): string | null {
  if (typeof document === "undefined") return null;
  const content = document.querySelector(ID_TAG)?.getAttribute("content");
  return content && /^G-[A-Z0-9]+$/i.test(content) ? content : null;
}

export function isAnalyticsLoaded(): boolean {
  return loaded;
}

/**
 * Inject gtag.js and configure it. Safe to call repeatedly - only the first
 * call does anything, so a re-render or a second consent event cannot double-load
 * the tag or double-count the page view.
 */
export function loadAnalytics(): boolean {
  if (loaded || typeof document === "undefined") return loaded;

  const id = analyticsId();
  if (!id) return false;

  // Preconnect only at the point of consent, not on every page load. The DNS
  // lookup and TLS handshake are wasted on a visitor who declines.
  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://www.googletagmanager.com";
  document.head.appendChild(preconnect);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id, {
    allow_google_signals: false,
    ads_data_redaction: true,
  });

  loaded = true;
  return true;
}

/**
 * Report a route change.
 *
 * The app is a single-page app, so gtag's automatic page_view only fires for the
 * first document. Every client-side navigation after that has to be reported by
 * hand or GA shows one page view no matter how many pages were actually read.
 */
export function trackPageView(path: string): void {
  if (!loaded || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
