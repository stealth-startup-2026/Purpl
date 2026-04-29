import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "h-9 w-64 rounded-sm border border-[var(--color-line)] bg-transparent px-3.5 py-2 text-sm text-white tracking-[0.01em] outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-white disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
