import { useRef, useState, type RefObject } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { contact } from "@/data/contact";
import { LeadError, submitLead, type LeadFields, type LeadForm } from "@/lib/leads";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Shared submit logic for every lead form: sending state, a real error when the save fails,
 * and the anti-bot bits (fill-time clock + hidden honeypot) the server checks.
 */
export function useLeadForm(form: LeadForm) {
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (fields: LeadFields) => {
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      await submitLead(form, fields, { startedAt: startedAt.current, honeypot: honeypot.current?.value });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof LeadError ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return { status, error, submit, sending: status === "sending", sent: status === "sent", honeypot };
}

/** Off-screen field real people never see or fill. Bots that fill every input get dropped. */
export function Honeypot({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={inputRef} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-navy px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#1E3760] disabled:cursor-wait disabled:opacity-70"
    >
      {sending ? (
        <>
          Sending <Loader2 size={16} className="animate-spin" aria-hidden />
        </>
      ) : (
        <>
          {children} <ArrowRight size={16} aria-hidden />
        </>
      )}
    </button>
  );
}

/** Shown when a save fails, with a direct email fallback so the enquiry is never lost. */
export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-5 flex items-start gap-2 rounded-lg border border-[#F5C2B8] bg-[#FFF5F2] px-3.5 py-3 text-[14px] leading-[1.5] text-[#9A3412]">
      <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
      <span>
        {message} You can also email us at{" "}
        <a href={`mailto:${contact.email}`} className="font-medium underline underline-offset-2">
          {contact.email}
        </a>
        .
      </span>
    </p>
  );
}
