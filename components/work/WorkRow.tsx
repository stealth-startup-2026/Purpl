import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorkRowProps {
  preview: ReactNode;
  brand: string;
  category: string;
  tag?: string;
  description: string;
  onOpen: () => void;
  style?: CSSProperties;
}

export function WorkRow({ preview, brand, category, tag, description, onOpen, style }: WorkRowProps) {
  return (
    <article
      style={style}
      className="border-b border-[var(--color-line-soft)]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`open ${brand} project details`}
        className={cn(
          "group grid w-full items-center gap-14 px-6 py-13 text-left outline-none rounded-md",
          "[grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)]",
          "max-[720px]:grid-cols-1 max-[720px]:gap-7 max-[720px]:px-2 max-[720px]:py-10",
          "focus-visible:ring-1 focus-visible:ring-white/15",
        )}
      >
        <div className="transition-transform duration-200 ease-out group-hover:-translate-y-[3px]">
          {preview}
        </div>
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
      </button>
    </article>
  );
}
