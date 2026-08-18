import type { ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 lg:mb-10 ${className}`}>
      {eyebrow ? (
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-brand-orange/50" aria-hidden />
          <p className="text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{eyebrow}</p>
          <span className="h-px w-8 bg-brand-orange/50" aria-hidden />
        </div>
      ) : null}

      <div
        className={
          subtitle
            ? "flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-4 xl:gap-x-14"
            : ""
        }
      >
        <h2
          id={id}
          className={`max-w-2xl text-left text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:max-w-none ${titleClassName}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`max-w-2xl text-left text-base leading-snug text-[#42526E] lg:max-w-none lg:pt-1 ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
