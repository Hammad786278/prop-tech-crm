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
        background: "#F8FAFC",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#6366F1", // Electric Royal Indigo
          hover: "#4F46E5",
          foreground: "#FFFFFF",
          light: "#EEF2FF",
          dark: "#3730A3",
        },
        cyan: {
          DEFAULT: "#06B6D4", // Radiant Digital Cyan
          hover: "#0891B2",
          light: "#ECFEFF",
          dark: "#0E7490",
        },
        navy: {
          DEFAULT: "#0F172A",
          deep: "#070B14",
          light: "#1E293B",
          surface: "#111A2E",
          card: "#162035",
        },
        gold: {
          DEFAULT: "#F59E0B", // Champagne Gold
          light: "#FEF3C7",
          dark: "#D97706",
          accent: "#FCD34D",
        },
        emerald: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
          dark: "#059669",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          light: "#F5F3FF",
          dark: "#7C3AED",
        },
        text: {
          primary: "#0F172A",
          secondary: "#64748B",
          muted: "#94A3B8",
        },
        border: "#E2E8F0",
        success: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
          dark: "#D97706",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
          dark: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        premium: "0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 8px 16px -6px rgba(15, 23, 42, 0.04)",
        dropdown: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glow-primary": "0 0 35px -5px rgba(99, 102, 241, 0.45)",
        "glow-cyan": "0 0 30px -5px rgba(6, 182, 212, 0.4)",
        "glow-gold": "0 0 30px -5px rgba(245, 158, 11, 0.35)",
        "glow-emerald": "0 0 30px -5px rgba(16, 185, 129, 0.35)",
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
