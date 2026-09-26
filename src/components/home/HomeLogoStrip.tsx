import { motion, useReducedMotion } from "framer-motion";
import { PiBankFill, PiBuildingsFill, PiDatabaseFill, PiFactoryFill, PiGasPumpFill, PiHospitalFill, PiLightningFill } from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

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

function Plate({ title, icon: Icon }: { title: string; icon: IconType }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 text-[18px] font-semibold tracking-[-0.02em] text-[#5E6C84]">
      <Icon size={20} className="text-[#A5AEBF]" aria-hidden />
      {title}
    </span>
  );
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {industries.map((it) => (
        <Plate key={it.title} {...it} />
      ))}
    </div>
  );
}

/** Proof strip: one quiet caption over a slow marquee of the industries served. */
export default function LogoStripPreview() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  return (
    <section className="relative bg-white pt-16 pb-14 sm:pt-20" aria-label="Industries">
      <motion.p {...scrollMotionProps(isMobile, { y: 20 })} className="mb-8 px-5 text-center text-[14px] font-medium text-[#6B778C]">
        One platform for every contractor, across every industry
      </motion.p>
      <motion.div {...scrollMotionProps(isMobile, { y: 24, delay: 0.08 })} className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <Row />
          <Row />
        </motion.div>
      </motion.div>
    </section>
  );
}
