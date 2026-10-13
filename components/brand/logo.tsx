import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "compact" | "monochrome-dark" | "monochrome-light";
  className?: string;
  showTagline?: boolean;
  href?: string;
}

export function Logo({
  variant = "full",
  className,
  showTagline = false,
  href = "/",
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2.5 select-none transition-all group", className)}>
      {/* Ultra-Premium Geometric Architectural Skyscraper Icon */}
      <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center shadow-md dark:shadow-glow-primary/20 overflow-hidden border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          <defs>
            <linearGradient id="propTechIndigoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="propTechGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
            <linearGradient id="propTechTowerLeft" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          {/* Left Tower */}
          <path d="M9 40V22L17 18V40H9Z" fill="url(#propTechTowerLeft)" />
          {/* Center Tower - Primary Glowing Gradient */}
          <path d="M19 40V10L25 6L31 10V40H19Z" fill="url(#propTechIndigoGrad)" />
          {/* Right Tower */}
          <path d="M33 40V19L39 23V40H33Z" fill="#1E1B4B" />
          {/* Upward Growth Gold Arrow Swoop */}
          <path d="M7 36L25 18L30 22L14 38L7 36Z" fill="url(#propTechGoldGrad)" />
          {/* Architectural Window Light Accents */}
          <rect x="22" y="13" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="26" y="13" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="22" y="19" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          <rect x="26" y="19" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="25" cy="7" r="1" fill="#FCD34D" />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={cn(
                "font-extrabold tracking-tight text-xl text-slate-900 dark:text-white transition-colors",
                variant === "monochrome-dark" && "text-white"
              )}
            >
              Prop<span className="text-primary dark:text-cyan">Tech</span>
            </span>
            <span
              className={cn(
                "font-bold text-xs uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-cyan border border-indigo-200/50 dark:border-indigo-800/50",
                variant === "monochrome-dark" && "text-gold bg-slate-800 border-slate-700"
              )}
            >
              CRM
            </span>
          </div>
          {showTagline && (
            <span
              className={cn(
                "text-[10px] font-medium tracking-tight text-slate-500 dark:text-slate-400 mt-1",
                variant === "monochrome-dark" && "text-slate-400"
              )}
            >
              More Leads. Better Relationships. More Deals.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
