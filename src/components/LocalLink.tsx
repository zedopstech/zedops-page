import { forwardRef, type AnchorHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { Link as WouterLink, type LinkProps as WouterLinkProps } from "wouter";
import { isLocalizable, localize, useI18n, withTrailingSlash } from "@/i18n";

/**
 * Internal links must stay inside the current language ("/solutions" on an Arabic page
 * is "/ar/solutions"). These two wrappers are the one place that happens, so call sites
 * keep writing plain root-relative paths and external, mailto:, tel: and #hash targets pass
 * through untouched.
 */

/** Plain anchor (full page load) whose root-relative href is prefixed with the page language. */
export const LocalA = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function LocalA({ href, ...rest }, ref) {
    const { lang } = useI18n();
    return <a ref={ref} href={href && isLocalizable(href) ? localize(href, lang) : href} {...rest} />;
  },
);

/**
 * Client-side link. The router base already carries the language prefix, so same-language
 * targets are handed to wouter as-is. Targets that only exist in English (blog posts) leave
 * the language router, so they are plain anchors that load the English page.
 */
export function Link({ href, ...rest }: WouterLinkProps & { href: string }) {
  const { lang } = useI18n();
  if (!isLocalizable(href)) return <WouterLink href={href} {...rest} />;
  const target = withTrailingSlash(href);
  if (localize(target, lang) === target && lang !== "en") {
    return <a href={target} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <WouterLink href={target} {...rest} />;
}

/** `motion.a` with a localized href. */
export const MotionLocalA = motion.create(LocalA);
