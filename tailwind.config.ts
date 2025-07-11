import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
} satisfies Config;

export default config;
