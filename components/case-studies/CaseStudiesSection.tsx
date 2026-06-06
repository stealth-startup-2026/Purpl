"use client";

import { useEffect, useRef, useState } from "react";
import { Title } from "@/components/Title";
import { Folder } from "@/components/work/Folder";
import { cn } from "@/lib/utils";
import { caseStudies, type CaseStudy } from "./case-studies";
import { CaseStudyModal } from "./CaseStudyModal";
import styles from "./CaseStudiesSection.module.css";

export function CaseStudiesSection() {
  const [open, setOpen] = useState(false);
  const [spilled, setSpilled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure each card's natural top so it can start displaced upward (toward
  // the folder) and drop into place — same trick the work list uses.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll("article"));
    setItemOffsets(cards.map((el) => (el as HTMLElement).offsetTop));
  }, []);

  function onClick() {
    const next = !open;
    setOpen(next);
    setSpilled(next);
    if (next) {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
      setCollapsed(false);
    } else {
      collapseTimer.current = setTimeout(() => setCollapsed(true), 500);
    }
  }

  return (
    <main
      className={cn(
        "relative z-[2] flex flex-1 flex-col items-center px-8 pt-16 pb-24",
        spilled && styles.spilled,
      )}
    >
      <div className="mb-20 flex flex-col items-center gap-20 max-sm:mb-12 max-sm:gap-12">
        <div className={cn(styles.title, open && styles.titleHidden)}>
          <Title variant="display">our case studies</Title>
        </div>
        <Folder open={open} onClick={onClick} />
      </div>

      <div
        ref={gridRef}
        className={cn(
          styles.grid,
          collapsed && styles.collapsed,
          "grid w-full max-w-4xl grid-cols-2 gap-7 max-sm:grid-cols-1 max-sm:gap-6",
        )}
      >
        {caseStudies.map((cs, i) => {
          const reverseIndex = caseStudies.length - 1 - i;
          const step = caseStudies.length > 1 ? 0.5 / (caseStudies.length - 1) : 0;
          const delay = `${reverseIndex * step}s`;
          const startY =
            itemOffsets[i] !== undefined ? `-${itemOffsets[i] / 1.5}px` : "-28px";
          return (
            <article
              key={cs.slug}
              style={
                {
                  "--item-start-y": startY,
                  transitionDelay: spilled ? delay : "0s",
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                disabled={cs.comingSoon}
                onClick={() => !cs.comingSoon && setSelected(cs)}
                aria-label={
                  cs.comingSoon
                    ? `${cs.brand} case study coming soon`
                    : `read the ${cs.brand} case study`
                }
                className={cn(
                  "group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[var(--color-line-soft)] bg-white/[0.02] text-left outline-none transition-all duration-300",
                  cs.comingSoon
                    ? "cursor-default opacity-55"
                    : "hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] focus-visible:border-white/40",
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-line-soft)]">
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-0 origin-top-left"
                    style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
                  >
                    {cs.preview}
                  </div>
                  {cs.comingSoon && (
                    <span className="absolute right-3 top-3 rounded-sm border border-[var(--color-ink-faint)] bg-[var(--color-bg-deep)]/70 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[var(--color-ink-soft)] backdrop-blur-sm">
                      coming soon
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[1.15rem] font-medium lowercase text-white">{cs.brand}</h3>
                    {!cs.comingSoon && (
                      <span
                        aria-hidden="true"
                        className="text-[0.82rem] font-light tracking-[0.04em] text-[var(--color-ink-soft)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                      >
                        read &rarr;
                      </span>
                    )}
                  </div>
                  <p className="text-[0.9rem] font-light leading-[1.5] text-[var(--color-ink-soft)]">
                    {cs.cardBlurb}
                  </p>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      <CaseStudyModal study={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
