/**
 * Analytics consent state.
 *
 * Why this exists: GA4 was previously injected straight into index.html by a
 * Vite plugin, so it fetched from googletagmanager.com on every page view
 * before the visitor had expressed any preference. That is the behaviour GDPR
 * and UK GDPR require consent for, and the site's own privacy policy told
 * visitors they could change it "via our cookie banner" - a banner that did not
 * exist. Analytics now loads only after a deliberate choice recorded here.
 *
 * Storage is localStorage rather than a cookie on purpose: it is not sent to the
 * server on every request, so it is not itself a cookie the visitor needs to
 * consent to in order to store their consent. It is namespaced and versioned
 * (".v1") so the key can be rotated later without inheriting old choices.
 *
 * localStorage access is wrapped because it throws in private-mode Safari and
 * when storage is disabled by policy. A visitor who cannot be remembered is
 * asked again next visit, which is the correct failure: we never treat "we
 * could not save your choice" as consent.
 */
export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "zedops.consent.v1";

/**
 * Window event the footer dispatches to reopen the banner, so a visitor can
 * change a choice they already made. A custom event rather than shared state
 * because the banner lives inside the router and the footer link lives in every
 * page's own markup - there is no common ancestor that could pass a prop down
 * without threading it through every page component.
 */
export const COOKIE_SETTINGS_EVENT = "zedops:open-cookie-settings";

type Listener = (value: ConsentValue | null) => void;
const listeners = new Set<Listener>();

/** The recorded choice, or null if the visitor has not decided yet. */
export function readConsent(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "granted" || raw === "denied" ? raw : null;
  } catch {
    return null;
  }
}

/** Record a choice and notify anything watching (the banner and the loader). */
export function writeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Nothing to do: the in-memory listeners still fire below, so the choice
    // applies to this page view even if it cannot be persisted.
  }
  for (const listener of listeners) listener(value);
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
