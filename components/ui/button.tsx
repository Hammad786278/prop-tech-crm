import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold" | "cyan" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 focus:ring-indigo-500 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30",
      secondary:
        "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:ring-slate-300 shadow-2xs",
      outline:
        "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-slate-400",
      ghost:
        "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus:ring-slate-300",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
      gold:
        "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold hover:from-amber-400 hover:to-yellow-400 focus:ring-amber-500 shadow-md shadow-amber-500/20",
      cyan:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-500 shadow-md shadow-cyan-500/20",
      glass:
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-white/40 dark:border-slate-700/60 hover:bg-white/95 dark:hover:bg-slate-800 shadow-sm",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
      md: "text-sm px-4 py-2 h-10 gap-2",
      lg: "text-base px-6 py-3 h-12 gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
