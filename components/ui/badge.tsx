import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "gold";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary-light text-primary border-transparent",
    secondary: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-success-light text-success-dark border-transparent",
    warning: "bg-warning-light text-warning-dark border-transparent",
    danger: "bg-danger-light text-danger-dark border-transparent",
    gold: "bg-gold-light text-gold-dark border-transparent",
    outline: "text-slate-700 border-slate-200 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
