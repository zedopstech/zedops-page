import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 text-[#172B4D]">
      <div className="w-full max-w-md border border-gray-200 bg-white px-8 py-10 text-center shadow-[0_12px_40px_-28px_rgba(23,43,77,0.18)]" style={{ borderRadius: 8 }}>
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EBF0FF]">
          <AlertCircle className="h-6 w-6 text-brand-orange" aria-hidden />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#97A0AF]">404</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#172B4D]">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6B778C]">
          That link doesn’t exist or may be outdated. Head back home or explore the platform.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
            style={{ borderRadius: 6 }}
          >
            Back to home
            <ArrowRight size={14} aria-hidden />
          </a>
          <a
            href="/platform"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#172B4D] px-6 py-3 text-sm font-bold text-[#172B4D] transition-all hover:bg-[#172B4D] hover:text-white"
            style={{ borderRadius: 6 }}
          >
            Platform
          </a>
        </div>
      </div>
    </div>
  );
}
