import { useSyncExternalStore } from "react";
import { ar } from "./ar";
import { fr } from "./fr";
import { es } from "./es";
import { tr } from "./tr";

export type Lang = "en" | "ar" | "fr" | "es" | "tr";

/** Each language is listed under its own name so a visitor can find it whatever the page language. */
export const LANGUAGES: { code: Lang; label: string; rtl?: boolean }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية", rtl: true },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "tr", label: "Türkçe" },
];

const dictionaries: Record<Exclude<Lang, "en">, Record<string, string>> = { ar, fr, es, tr };
const isLang = (v: unknown): v is Lang => LANGUAGES.some((l) => l.code === v);

const STORAGE_KEY = "zedops-lang";
const listeners = new Set<() => void>();

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (isLang(q)) return q;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage can throw in private windows */
  }
  return "en";
}

let current: Lang = initialLang();

function applyToDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = LANGUAGES.find((l) => l.code === lang)?.rtl ? "rtl" : "ltr";
}
applyToDocument(current);

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  applyToDocument(lang);
  listeners.forEach((l) => l());
}

/**
 * Translate an English source string. English is the key, so a string with no Arabic
 * entry simply renders in English instead of breaking.
 */
export function t(text: string): string {
  return current === "en" ? text : (dictionaries[current][text] ?? text);
}

/** Subscribe a component to language changes. Returns `t` bound to the current language. */
export function useI18n() {
  const lang = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "en" as Lang,
  );
  return { lang, isRtl: !!LANGUAGES.find((l) => l.code === lang)?.rtl, t, setLang };
}
