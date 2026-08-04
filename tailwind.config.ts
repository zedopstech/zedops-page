import type { Config } from "tailwindcss";

/**
 * Brand palette from design swatches.
 * Orange → buttons (DEFAULT + hover)
 * Navy → dark surfaces / text
 */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: "#FE5D02",
            soft: "#F15F22",
          },
          navy: {
            DEFAULT: "#041129",
            soft: "#0C162A",
          },
        },
        // Semantic aliases for buttons
        button: {
          DEFAULT: "#FE5D02",
          hover: "#F15F22",
        },
      },
    },
  },
} satisfies Config;

export default config;
