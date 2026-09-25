import type { ReactNode } from "react";
import { SectionLabel } from "@/components/design-preview/primitives";

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
    <div className={`mb-10 lg:mb-14 ${className}`}>
      {eyebrow ? (
        <SectionLabel>{eyebrow}</SectionLabel>
      ) : null}

      <div
        className={
          subtitle
            ? "flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-x-16"
            : ""
        }
      >
        <h2
          id={id}
          className={`max-w-2xl text-left text-[30px] font-semibold leading-[1.12] tracking-[-0.035em] text-brand-navy sm:text-[36px] lg:max-w-none lg:text-[40px] ${titleClassName}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`max-w-2xl text-left text-base leading-[1.6] text-[#3D4F6E] lg:max-w-none lg:pt-3 ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
