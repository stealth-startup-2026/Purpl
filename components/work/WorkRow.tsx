import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorkRowProps {
  /** Visual preview tile. Each project supplies its own. */
  preview: ReactNode;
  /** Brand / project name. */
  brand: string;
  /** Category line beside brand, e.g. "webapp · in-house". */
  category: string;
  /** Optional small status pill (e.g. "coming soon", "live"). */
  tag?: string;
  /** Short description. */
  description: string;
}

/**
 * Generic work row. The preview is fully owned by the project component
 * so each project keeps its own visual identity.
 */
export function WorkRow({ preview, brand, category, tag, description }: WorkRowProps) {
  return (
    <article
      className={cn(
        "grid items-center gap-14 px-6 py-13 border-b border-[var(--color-line-soft)]",
        "[grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)]",
        "max-[720px]:grid-cols-1 max-[720px]:gap-7 max-[720px]:px-2 max-[720px]:py-10",
      )}
    >
      {preview}
      <div className="flex flex-col gap-2">
        <div className="text-[clamp(1.4rem,2.2vw,2rem)] font-medium tracking-[0.01em] text-white">
          {brand}
        </div>
        <div className="text-[0.85rem] tracking-[0.06em] lowercase text-[var(--color-ink-soft)]">
          {category}
          {tag ? (
            <span className="ml-2.5 inline-block rounded-sm border border-[var(--color-ink-faint)] px-2 py-0.5 align-middle text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--color-ink-soft)]">
              {tag}
            </span>
          ) : null}
        </div>
        <p className="mt-2 max-w-lg text-[0.98rem] font-light leading-[1.55] text-white/80">
          {description}
        </p>
      </div>
    </article>
  );
}
