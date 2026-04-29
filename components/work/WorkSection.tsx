"use client";

import { useState } from "react";
import { Title } from "@/components/Title";
import { Folder } from "./Folder";
import { WorkRow } from "./WorkRow";
import { projects } from "./projects";
import styles from "./WorkSection.module.css";
import { cn } from "@/lib/utils";

/**
 * State holder for the work page. Click the folder, the papers spill,
 * and the row list reveals beneath with a staggered fade.
 */
export function WorkSection() {
  const [open, setOpen] = useState(false);
  const [spilled, setSpilled] = useState(false);

  function onClick() {
    const next = !open;
    setOpen(next);
    if (next) {
      // wait for the folder spill animation, then reveal rows
      window.setTimeout(() => setSpilled(true), 380);
    } else {
      setSpilled(false);
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
        id="work-list"
        aria-label="Project list"
        className={cn(styles.list, "w-full max-w-5xl border-t border-[var(--color-line-soft)]")}
      >
        {projects.map((p) => (
          <WorkRow
            key={p.id}
            preview={p.preview}
            brand={p.brand}
            category={p.category}
            tag={p.tag}
            description={p.description}
          />
        ))}
      </section>
    </main>
  );
}
