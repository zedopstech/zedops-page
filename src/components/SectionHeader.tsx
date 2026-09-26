import type { ReactNode } from "react";
import { h2Class, SectionLabel } from "@/components/design-system/primitives";

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
            ? "flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-x-16"
            : ""
        }
      >
        <h2
          id={id}
          className={`max-w-2xl text-left ${h2Class} text-brand-navy lg:max-w-none ${titleClassName}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`max-w-2xl text-left text-[16px] leading-[1.6] text-[#5E6C84] sm:text-[17px] lg:max-w-md lg:pb-2 ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
