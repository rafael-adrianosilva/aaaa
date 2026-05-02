import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        mint: "rgb(var(--color-mint) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        sky: "rgb(var(--color-sky) / <alpha-value>)",
      },
      boxShadow: {
        hard: "0 16px 50px rgb(0 0 0 / 0.28)",
        insetline: "inset 0 0 0 1px rgb(var(--color-line) / 0.9)",
      },
    },
  },
  plugins: [],
} satisfies Config;
