import { ReactNode } from "react";
import { motion } from "framer-motion";

function Float({
  children,
  duration,
  delay = 0,
  amplitude = 3,
  className = "",
}: {
  children: ReactNode;
  duration: number;
  delay?: number;
  amplitude?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  float?: boolean;
  floatDuration?: number;
  floatAmplitude?: number;
  floatDelay?: number;
};

export default function DashboardCard({
  children,
  className = "",
  float = false,
  floatDuration = 3.5,
  floatAmplitude = 4,
  floatDelay = 0,
}: DashboardCardProps) {
  const card = (
    <div
      className={`
        absolute
        z-30
        hidden
        w-[220px]
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-[0_20px_45px_-20px_rgba(23,43,77,0.4)]
        lg:block
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (float) {
    return (
      <Float duration={floatDuration} amplitude={floatAmplitude} delay={floatDelay}>
        {card}
      </Float>
    );
  }

  return card;
}

export { Float };
