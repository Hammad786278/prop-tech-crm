"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn(
        "relative p-2 rounded-xl transition-all duration-300",
        "bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80",
        "border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-amber-300",
        "shadow-xs hover:shadow-md hover:scale-105 active:scale-95",
        className
      )}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-4 h-4">
        <Sun
          className={cn(
            "w-4 h-4 transition-all duration-300 absolute inset-0 text-amber-500",
            theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          )}
        />
        <Moon
          className={cn(
            "w-4 h-4 transition-all duration-300 absolute inset-0 text-amber-300",
            theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          )}
        />
      </div>
    </button>
  );
}
