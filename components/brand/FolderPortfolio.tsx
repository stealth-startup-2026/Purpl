'use client';

import Link from 'next/link';
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { PurplModel } from './PurplModel';
import { ScrollCue } from './ScrollCue';
import styles from './FolderPortfolio.module.css';

/** Blank layout study. Real project data stays in components/work/projects.tsx. */
export function FolderPortfolio() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const intro = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const modelPosition = useRef<HTMLDivElement>(null);
  const featured = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef<{ scrollY: number; introHeight: number } | null>(null);
  const changeOpen = useCallback((next: boolean) => {
    if (next === openRef.current) return;
    openRef.current = next;
    scrollAnchor.current = { scrollY: window.scrollY, introHeight: intro.current?.offsetHeight ?? 0 };
    setOpen(next);
  }, []);

  useLayoutEffect(() => {
    const anchor = scrollAnchor.current;
    if (!anchor || !intro.current) return;
    // Remove the already-travelled morph runway while open. The folder becomes
    // the natural top of the document, with native project scrolling below it.
    // Restore that runway on close, compensating before paint to avoid a jump.
    window.scrollTo({
      top: Math.max(0, anchor.scrollY + intro.current.offsetHeight - anchor.introHeight),
      behavior: 'instant',
    });
    scrollAnchor.current = null;
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !viewport.current || !modelPosition.current || !featured.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = viewport.current.getBoundingClientRect();
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    // All three real cards start at the same point behind the folder's lower
    // edge. Measure final list positions so this also works on narrow screens.
    const sourceY = scene.top + window.scrollY + scene.height * (mobile ? 0.38 : 0.37)
      + modelPosition.current.offsetHeight * (mobile ? 0.82 : 0.78) * 0.12;
    const animations = Array.from(featured.current.children).map((card, index) => {
      const target = card.getBoundingClientRect();
      const startY = sourceY - (target.top + window.scrollY);
      const angle = [-4, 3, -2][index];
      return card.animate([
        { transform: `translateY(${startY}px) scale(.44) rotate(${angle}deg)`, opacity: 0, offset: 0 },
        { transform: `translateY(${startY + 24}px) scale(.47) rotate(${angle}deg)`, opacity: 1, offset: 0.13 },
        { transform: 'translateY(8px) scale(1.008) rotate(0deg)', opacity: 1, offset: 0.86 },
        { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1, offset: 1 },
      ], { duration: 1250 + index * 90, delay: 260 + index * 230, easing: 'cubic-bezier(.22,.7,.22,1)', fill: 'backwards' });
    });
    // Resizing should immediately settle the cards into their responsive layout.
    const settle = () => animations.forEach(animation => animation.finish());
    window.addEventListener('resize', settle);
    return () => {
      window.removeEventListener('resize', settle);
      animations.forEach(animation => animation.cancel());
    };
  }, [open]);

  return (
    <main className={styles.page} data-purpl-home data-folder-open={open}>
      <header className={styles.header}>
        <h1><Link href="/">purpl solutions</Link></h1>
      </header>

      <div ref={intro} className={styles.intro}>
        <div ref={viewport} className={styles.viewport}>
          <div ref={modelPosition} className={styles.modelPosition}>
            <PurplModel onOpenChange={changeOpen} controls="folder-projects" lockOpenMorph />
          </div>
        </div>
      </div>

      <div className={styles.spill} data-open={open} inert={!open} aria-hidden={!open}>
        <div className={styles.spillClip}>
          <section id="folder-projects" className={styles.projects} aria-label="Project layout">
            <div ref={featured} className={styles.featured} role="list" aria-label="Three featured projects">
              {[0, 1, 2].map(index => (
                <div key={index} role="listitem" aria-label={`Featured project ${index + 1}, empty card`} className={styles.card} style={{ '--card-index': index } as CSSProperties} />
              ))}
            </div>
            <div className={styles.more} role="list" aria-label="More projects">
              {[0, 1, 2, 3].map(index => (
                <div key={index} role="listitem" aria-label={`Additional project ${index + 1}, empty row`} className={styles.row} style={{ '--card-index': index + 3 } as CSSProperties} />
              ))}
            </div>
          </section>
        </div>
      </div>
      {!open && <ScrollCue />}
    </main>
  );
}
