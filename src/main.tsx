import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureAttribution } from "./lib/leads";
import { langFromPath, redirectLegacyLangParam, setCurrentLang } from "./i18n";

// Remember the landing page's UTM tags and referrer so form leads are credited to the right campaign.
captureAttribution();

// Old `?lang=xx` links now map to the language's own URL.
if (!redirectLegacyLangParam()) {
  const container = document.getElementById("root")!;
  const urlLang = langFromPath(window.location.pathname).lang;
  setCurrentLang(urlLang);

  // Prerendered pages ship real markup in #root: hydrate it. In dev (empty #root) render from scratch.
  // The shared 404.html is English and is served for unknown URLs in any language, so when its
  // <html lang> does not match the URL's language the markup is discarded instead of hydrated.
  if (container.hasChildNodes() && container.dataset.lang === urlLang) {
    hydrateRoot(container, <App />);
  } else {
    container.replaceChildren();
    createRoot(container).render(<App />);
  }
}
