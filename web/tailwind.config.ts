import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "ui-serif", "serif"],
        display: ["var(--font-newsreader)", "Newsreader", "Georgia", "ui-serif", "serif"],
        mono: [
          "var(--font-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        bg: "var(--color-bg)",
        "bg-2": "var(--color-bg-2)",
        ink: "var(--color-ink)",
        "ink-dim": "var(--color-ink-dim)",
        muted: "var(--color-muted)",
        "muted-soft": "var(--color-muted-soft)",
        accent: "var(--color-accent)",
        "accent-dim": "var(--color-accent-dim)",
        sun: "var(--color-sun)",
        danger: "var(--color-danger)",
      },
      maxWidth: {
        prose: "38rem",
        narrow: "30rem",
      },
      letterSpacing: {
        widest: "0.18em",
      },
      animation: {
        "fade-in": "fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-up": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
