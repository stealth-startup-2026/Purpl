import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type Variant = "display" | "section";

const sizeFor: Record<Variant, string> = {
  display: "text-[clamp(2rem,5.5vw,4.5rem)]",
  section: "text-[clamp(1.4rem,2.6vw,2rem)]",
};

interface TitleProps<T extends ElementType> {
  as?: T;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared display title style. Matches the lowercase, light-weight,
 * wide-tracked aesthetic of the home "purpl.solutions" headline.
 */
export function Title<T extends ElementType = "h1">({
  as,
  variant = "display",
  className,
  children,
  ...rest
}: TitleProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TitleProps<T>>) {
  const Component = (as ?? "h1") as ElementType;
  return (
    <Component
      {...rest}
      className={cn(
        "font-light text-white text-center select-none tracking-[var(--tracking-title)]",
        sizeFor[variant],
        className,
      )}
    >
      {children}
    </Component>
  );
}
