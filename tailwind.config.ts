import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        surface: "var(--surface)",
        soft: "var(--soft)",
        brand: "#FFE202",
        brandStrong: "#E5CB00",
        ink: "var(--ink)",
        body: "var(--body)",
        onink: "var(--onink)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-gothic)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
