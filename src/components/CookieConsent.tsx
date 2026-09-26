/**
 * Cookie / analytics consent banner.
 *
 * Mounted once in App. Renders nothing until the visitor has either made a
 * choice or is asked to make one, so it never flashes for someone who has
 * already answered.
 *
 * Accessibility notes, because a banner that covers the bottom of the page is
 * exactly the kind of thing that gets in the way:
 *   - It is a labelled <region>, not a modal dialog. It deliberately does NOT
 *     trap focus or set aria-modal, because the page stays usable behind it and
 *     trapping focus would make the site feel broken to keyboard and screen
 *     reader users on their first visit.
 *   - It is a small card in the bottom-right corner, not a full-width bar. A bar
 *     spanning the viewport covers the footer and reads as a wall on a first
 *     visit; the card sits over the corner and leaves the page intact. The outer
 *     wrapper is pointer-events-none with the card re-enabling them, so the gaps
 *     around the card do not swallow clicks on the page behind it.
 *   - Accept and Reject are real <button>s, so they are reachable by keyboard
 *     and announced as buttons rather than as links.
 *   - Neither choice is pre-selected, and Reject is not visually de-emphasised
 *     into looking like the lesser option: GDPR treats them as equals, and an
 *     unequal pair of buttons is the pattern most often used to manufacture
 *     consent.
 *   - Accept is navy with white text, which is the same pairing as the site's
 *     primary "Request early access" ticket. An earlier version filled it with a
 *     darkened orange to pass contrast, which introduced a second brand colour
 *     that read as brown beside the real orange.
 */
import { useEffect, useRef, useState } from "react";
import { readConsent, writeConsent, type ConsentValue } from "@/lib/consent";
import { loadAnalytics } from "@/lib/analytics";

type Props = {
  /**
   * Bumped by the parent to force the banner back open, which is how the footer's
   * "Cookie settings" link lets someone change a choice they already made.
   */
  openSignal?: number;
  onDismiss?: () => void;
};

export default function CookieConsent({ openSignal = 0, onDismiss }: Props) {
  const [choice, setChoice] = useState<ConsentValue | null>(null);
  const [visible, setVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // localStorage is only safe to touch after mount, and the banner must not
    // appear for a moment on a visitor who already answered.
    setChoice(readConsent());
  }, []);

  useEffect(() => {
    if (openSignal > 0) setVisible(true);
  }, [openSignal]);

  useEffect(() => {
    if (!visible) return;
    // Move focus to the banner so a keyboard or screen-reader user is told it
    // appeared. The heading is a live region, so this is announced rather than
    // silently moved.
    headingRef.current?.focus();
  }, [visible]);

  const decide = (value: ConsentValue) => {
    setChoice(value);
    setVisible(false);
    writeConsent(value);
    // Only a grant contacts Google. Declining leaves the network untouched.
    if (value === "granted") loadAnalytics();
    onDismiss?.();
  };

  if (choice && !visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:justify-end sm:px-0 sm:pr-6 sm:pb-6"
    >
      <div className="pointer-events-auto w-full max-w-[360px] rounded-[10px] border border-[#CFD9E6] bg-white p-5 shadow-[0_18px_44px_-18px_rgba(23,43,77,0.38)]">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[15px] font-semibold tracking-tight text-brand-navy outline-none"
        >
          Analytics cookies
        </h2>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-[#5E6C84]">
          We use Google Analytics to see which pages are read. It stays off until
          you agree &mdash; see the{" "}
          <a
            href="/privacy"
            className="font-medium text-brand-navy underline decoration-brand-orange decoration-2 underline-offset-2 hover:text-[#0E1B33]"
          >
            privacy policy
          </a>
          .
        </p>
        <div className="mt-4 flex gap-2.5">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="flex-1 rounded-[4px] border border-[#CFD9E6] bg-white px-4 py-2 text-[13px] font-semibold text-brand-navy transition hover:border-brand-navy hover:bg-[#F4F6FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="flex-1 rounded-[4px] bg-brand-navy px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
