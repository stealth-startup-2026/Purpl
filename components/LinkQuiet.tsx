import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LinkQuietProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  className?: string;
  children: ReactNode;
}

/**
 * Reusable "floating text" link. Used in the top nav, but designed so
 * footer links, social links, etc. can share the same hover behaviour.
 */
export function LinkQuiet({ className, children, ...props }: LinkQuietProps) {
  return (
    <Link
      {...props}
      className={cn(
        "text-white no-underline font-light tracking-[var(--tracking-link)] opacity-[0.78] outline-none transition-opacity duration-150",
        "hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
