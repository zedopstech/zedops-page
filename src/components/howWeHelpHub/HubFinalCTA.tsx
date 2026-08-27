import { ArrowRight } from "lucide-react";

export default function HubFinalCTA() {
  return (
    <section className="bg-[#071B3A] px-4 py-14 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          See your project through one connected lens.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-snug text-[#9DB0CC]">
          Explore how ZedOps connects planning, execution and project data.
        </p>
        <a
          href="/early-access"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#FF6200] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#E25800]"
        >
          Get a personalized demo
          <ArrowRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
