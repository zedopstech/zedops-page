import { motion, useReducedMotion } from "framer-motion";
import { PiBankFill, PiBuildingsFill, PiDatabaseFill, PiFactoryFill, PiGasPumpFill, PiHospitalFill, PiLightningFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { HazardTape } from "./primitives";

/** No client logos yet, so the proof strip marquees the real industry list. */
const industries: { title: string; icon: IconType }[] = [
  { title: "Infrastructure", icon: PiBankFill },
  { title: "Power Generation", icon: PiLightningFill },
  { title: "Oil & Gas", icon: PiGasPumpFill },
  { title: "Industrial", icon: PiFactoryFill },
  { title: "Commercial", icon: PiBuildingsFill },
  { title: "Healthcare", icon: PiHospitalFill },
  { title: "Data Centres", icon: PiDatabaseFill },
];

/** Site-board chip: white board, hairline border, industry glyph in a navy square. */
function Plate({ title, icon: Icon }: { title: string; icon: IconType }) {
  return (
    <span className="flex h-14 shrink-0 items-center gap-3 rounded-lg border border-[#E3E8F0] bg-white py-2 pr-5 pl-2 text-[15px] font-semibold tracking-tight text-brand-navy shadow-[0_6px_16px_-12px_rgba(23,43,77,0.35)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-navy">
        <Icon
          size={18}
          className="text-white"
          aria-hidden
        />
      </span>
      {title}
    </span>
  );
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {industries.map((it) => (
        <Plate key={it.title} {...it} />
      ))}
    </div>
  );
}

/** Proof strip: caption, marquee of industry boards, thin hazard-tape rule. */
export default function LogoStripPreview() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <section
      className="relative bg-white pt-14 sm:pt-16"
      aria-label="Industries"
    >
      <motion.p {...scrollMotionProps(isMobile, { y: 20 })} className="mb-6 px-5 text-center text-[14px] font-medium text-brand-navy/80">
        One Platform. Every Industry.{" "}
        <span className="text-brand-orange">
          Every Contractor. Every Project.
        </span>
      </motion.p>
      <motion.div {...scrollMotionProps(isMobile, { y: 24, delay: 0.08 })} className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        >
          <Row />
          <Row />
        </motion.div>
      </motion.div>
      <div className="mt-6">
        <HazardTape className="!h-1.5" />
      </div>
    </section>
  );
}
