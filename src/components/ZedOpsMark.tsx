/**
 * ZedOps interlocking mark (the four ribbons, no wordmark). Geometry copied from
 * zedops-ai `resources/js/components/shared/ZedOpsSymbol.tsx`. `tone` names the surface:
 * "light" surfaces get navy ribbons, "dark" surfaces get white ones; orange stays orange.
 */
const PATHS = {
  upperNavy: "m340 279-73-76c-12-12-11-27 0-39l77-73q5-5 13-4h278c22 0 37 15 37 38 0 21-15 40-36 40h-181z",
  lowerNavy: "m340 280h147q11 0 11 9 0 4-5 10l-91 91q-3 4-8 3h-119q-13 1-16-11-6-13 3-24z",
  upperOrange: "m563 269 63-59q7-7 18-7h76q12 0 16 11 4 10-5 19l-53 51q-5 6-13 6l-102-2q-13 0 0-19z",
  lowerOrange: "m668 291 61 64q8 8 8 18 0 13-10 23l-72 69q-5 5-13 5h-204c-21 0-34-14-34-34-1-22 14-41 36-41l121-2z",
} as const;

export default function ZedOpsMark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const navy = tone === "dark" ? "#FFFFFF" : "#172B4D";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="254 84 487 388" className={className} aria-hidden strokeLinejoin="round" strokeWidth={2}>
      <path d={PATHS.upperNavy} fill={navy} stroke={navy} className="transition-[fill,stroke] duration-300" />
      <path d={PATHS.lowerNavy} fill={navy} stroke={navy} className="transition-[fill,stroke] duration-300" />
      <path d={PATHS.upperOrange} fill="#FE5D02" stroke="#FE5D02" />
      <path d={PATHS.lowerOrange} fill="#FE5D02" stroke="#FE5D02" />
    </svg>
  );
}
