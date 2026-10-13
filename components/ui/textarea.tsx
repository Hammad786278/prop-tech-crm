import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[80px] w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-cyan focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            error && "border-danger focus:ring-danger dark:border-red-500 dark:focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-danger dark:text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
