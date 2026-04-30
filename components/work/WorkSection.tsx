"use client";

import { useEffect, useRef, useState } from "react";
import { Title } from "@/components/Title";
import { Folder } from "./Folder";
import { WorkRow } from "./WorkRow";
import { projects } from "./projects";
import styles from "./WorkSection.module.css";
import { cn } from "@/lib/utils";

export function WorkSection() {
  const [open, setOpen] = useState(false);
  const [spilled, setSpilled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const listRef = useRef<HTMLElement>(null);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const articles = Array.from(list.querySelectorAll("article"));
    setItemOffsets(articles.map((el) => (el as HTMLElement).offsetTop));
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
          <Title variant="display">our work</Title>
        </div>
        <Folder open={open} onClick={onClick} />
      </div>

      <section
        ref={listRef}
        id="work-list"
        aria-label="Project list"
        className={cn(
          styles.list,
          collapsed && styles.collapsed,
          "w-full max-w-5xl border-t border-[var(--color-line-soft)]",
        )}
      >
        {projects.map((p, i) => {
          const reverseIndex = projects.length - 1 - i;
          const step = projects.length > 1 ? 0.5 / (projects.length - 1) : 0;
          const delay = `${reverseIndex * step}s`;
          const startY = itemOffsets[i] !== undefined ? `-${itemOffsets[i] / 1.5}px` : "-28px";
          return (
            <WorkRow
              key={p.id}
              preview={p.preview}
              brand={p.brand}
              category={p.category}
              tag={p.tag}
              description={p.description}
              style={
                {
                  "--item-start-y": startY,
                  transitionDelay: spilled ? delay : "0s",
                } as React.CSSProperties
              }
            />
          );
        })}
      </section>
    </main>
  );
}
