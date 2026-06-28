import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eclectic: {
          blue: "#3D6EBA",
          orange: "#FB803D",
          pink: "#FC98BB",
          coral: "#F47781",
          cream: "#FDE8CD",
          ink: "#212026",
          mint: "#D2E1D9",
          mauve: "#5D5C7E"
        },
        blue: "#3D6EBA",
        orange: "#FB803D",
        pink: "#FC98BB",
        coral: "#F47781",
        cream: "#FDE8CD",
        ink: "#212026",
        mint: "#D2E1D9",
        mauve: "#5D5C7E",
        paper: "#FDE8CD"
      },
      boxShadow: {
        brutal: "8px 8px 0 #212026",
        "brutal-sm": "4px 4px 0 #212026",
        "brutal-lg": "14px 14px 0 #212026"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
