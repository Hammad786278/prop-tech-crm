import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "gold" | "cyan";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-cyan border-indigo-200/50 dark:border-indigo-800/50",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50",
    danger: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-800/50",
    gold: "bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 border-amber-300/60 dark:border-amber-700/60",
    cyan: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/50",
    outline: "text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
