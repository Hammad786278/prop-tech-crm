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
    <div className={cn("flex items-center gap-2.5 select-none transition-opacity hover:opacity-95", className)}>
      {/* Geometric Architectural SkyRise Icon */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-navy-deep flex items-center justify-center shadow-md overflow-hidden border border-slate-800">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          <defs>
            <linearGradient id="logoSkyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="logoGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D6B36A" />
              <stop offset="100%" stopColor="#E9D39C" />
            </linearGradient>
          </defs>
          {/* Left Tower */}
          <path d="M10 38V22L17 18V38H10Z" fill="#334155" opacity="0.9" />
          {/* Center Tower */}
          <path d="M19 38V12L25 8L31 12V38H19Z" fill="url(#logoSkyGrad)" />
          {/* Right Tower */}
          <path d="M33 38V20L39 24V38H33Z" fill="#312E81" />
          {/* Upward Growth Gold Swoop */}
          <path d="M8 34L25 18L30 22L14 36L8 34Z" fill="url(#logoGoldGrad)" />
          {/* Windows / Lighting */}
          <rect x="22" y="14" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.8" />
          <rect x="26" y="14" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.8" />
          <rect x="22" y="20" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.8" />
          <rect x="26" y="20" width="2" height="3" rx="0.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </div>

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={cn(
                "font-extrabold tracking-tight text-lg text-slate-900",
                variant === "monochrome-dark" && "text-white"
              )}
            >
              SkyVista
            </span>
            <span
              className={cn(
                "font-bold text-xs uppercase tracking-wider text-primary",
                variant === "monochrome-dark" && "text-gold"
              )}
            >
              CRM
            </span>
          </div>
          {showTagline && (
            <span
              className={cn(
                "text-[10px] font-medium tracking-tight text-slate-500 mt-0.5",
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
