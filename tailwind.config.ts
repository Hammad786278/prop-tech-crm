import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7FB",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#4F46E5", // Royal Indigo
          hover: "#4338CA",
          foreground: "#FFFFFF",
          light: "#EEF2FF",
          dark: "#3730A3",
        },
        navy: {
          DEFAULT: "#111827",
          deep: "#0B1220",
          light: "#1F2937",
          surface: "#1E293B",
        },
        gold: {
          DEFAULT: "#D6B36A", // Champagne Gold
          light: "#F5EACB",
          dark: "#B89243",
        },
        violet: {
          DEFAULT: "#7C3AED",
          light: "#F3E8FF",
        },
        text: {
          primary: "#172033",
          secondary: "#667085",
          muted: "#9CA3AF",
        },
        border: "#E5E7EB",
        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
          dark: "#15803D",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
          dark: "#B45309",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
          dark: "#B91C1C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        premium: "0 10px 25px -5px rgba(17, 24, 39, 0.06), 0 8px 10px -6px rgba(17, 24, 39, 0.04)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
