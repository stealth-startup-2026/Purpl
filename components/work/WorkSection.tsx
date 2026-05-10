"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Title } from "@/components/Title";
import { Folder } from "./Folder";
import { WorkRow } from "./WorkRow";
import { ProjectModal } from "./ProjectModal";
import { projects, type Project } from "./projects";
import styles from "./WorkSection.module.css";
import { cn } from "@/lib/utils";

type Filter = "all" | "in-house" | "client";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "all" },
  { id: "in-house", label: "in-house" },
  { id: "client", label: "client" },
];

function matchesFilter(category: string, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "in-house") return category.includes("in-house");
  if (filter === "client") return category.includes("client");
  return true;
}

export function WorkSection() {
  const [open, setOpen] = useState(false);
  const [spilled, setSpilled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const listRef = useRef<HTMLElement>(null);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p.category, filter)),
    [filter],
  );

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

      {/* Minimal filter toggle. Only visible once the list is open so it
          doesn't hover beneath the closed folder. */}
      {!collapsed && (
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mb-6 flex items-center gap-7 text-[0.85rem] font-light tracking-[0.06em] lowercase max-sm:gap-5"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative pb-1 outline-none transition-opacity duration-150",
                  active
                    ? "text-white opacity-100"
                    : "text-[var(--color-ink-soft)] opacity-65 hover:opacity-100 focus-visible:opacity-100",
                )}
              >
                {f.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-white transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      )}

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
        {filteredProjects.length === 0 ? (
          <p className="py-12 text-center text-[0.9rem] font-light tracking-[0.04em] text-[var(--color-ink-soft)]">
            no projects in this category yet.
          </p>
        ) : (
          filteredProjects.map((p, i) => {
            const reverseIndex = filteredProjects.length - 1 - i;
            const step = filteredProjects.length > 1 ? 0.5 / (filteredProjects.length - 1) : 0;
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
                onOpen={() => setActiveProject(p)}
                style={
                  {
                    "--item-start-y": startY,
                    transitionDelay: spilled ? delay : "0s",
                  } as React.CSSProperties
                }
              />
            );
          })
        )}
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
