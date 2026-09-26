'use client';

import Link from 'next/link';
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { projects } from '@/components/work/projects';
import { PurplModel } from './PurplModel';
import { ScrollCue } from './ScrollCue';
import { StudioIndex } from './StudioIndex';
import { ElasticWordmark } from './ElasticWordmark';
import styles from './FolderPortfolio.module.css';

const featuredProjects = projects.slice(0, 3);
const moreProjects = projects.slice(3);

export function FolderPortfolio() {
  const [open, setOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(0);
  const page = useRef<HTMLElement>(null);
  const folderBottom = useRef(0.72);
  const updateFolderBottom = useCallback((ratio: number) => {
    folderBottom.current = ratio;
    page.current?.style.setProperty('--folder-bottom-offset', String(ratio - 0.5));
  }, []);
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
      + modelPosition.current.offsetHeight * (mobile ? 0.82 : 0.78) * (folderBottom.current - 0.5) - 16;
    const cards = Array.from(featured.current.children);
    const targets = cards.map(card => card.getBoundingClientRect());
    const firstCardDistance = Math.max(1, targets[0].top + window.scrollY - sourceY);
    const smoothStep = (value: number) => value * value * (3 - 2 * value);
    const animations = cards.map((card, index) => {
      const target = targets[index];
      const startY = sourceY - (target.top + window.scrollY);
      const travelDistance = Math.max(1, -startY);
      // One continuous descent, with gentle acceleration and deceleration.
      // Longer flights get more time; every card stays at its final size.
      const duration = 1250 + Math.max(0, travelDistance - firstCardDistance) * 0.65;
      const frames = Array.from({ length: 61 }, (_, frame) => {
        const time = frame / 60;
        const progress = smoothStep(time);
        // Straighten each sheet over the same distance from the folder.
        const straighten = smoothStep(Math.min(1, progress * travelDistance / firstCardDistance));
        return {
          transform: `translateY(${startY * (1 - progress)}px) rotate(${-4 * (1 - straighten)}deg)`,
          opacity: Math.min(1, time * duration / 160),
          offset: time,
        };
      });
      return card.animate(frames, {
        duration, delay: 260 + index * 230, easing: 'linear', fill: 'backwards',
      });
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
    <main ref={page} className={styles.page} data-purpl-home data-folder-open={open}>
      <header className={styles.header}>
        <h1><ElasticWordmark /></h1>
      </header>
      <StudioIndex onWork={() => {
        window.scrollTo({ top: openRef.current ? 0 : window.innerHeight * 0.9, behavior: 'instant' });
        setOpenRequest(value => value + 1);
      }} />

      <div ref={intro} className={styles.intro}>
        <div ref={viewport} className={styles.viewport}>
          <div ref={modelPosition} className={styles.modelPosition}>
            <PurplModel onOpenChange={changeOpen} onFolderBottomChange={updateFolderBottom} controls="folder-projects" lockOpenMorph showHint openRequest={openRequest} />
          </div>
        </div>
      </div>

      <div className={styles.spill} data-open={open} inert={!open} aria-hidden={!open}>
        <div className={styles.spillClip}>
          <section id="folder-projects" className={styles.projects} aria-label="Our work">
            <div ref={featured} className={styles.featured} aria-label="Featured projects">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/${project.id}`}
                  aria-label={`View ${project.brand} project`}
                  className={styles.card}
                  style={{ '--card-index': index } as CSSProperties}
                >
                  <div className={styles.artwork}>{project.preview}</div>
                  <div className={styles.cardCopy}>
                    <div className={styles.cardMeta}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{project.category}</span>
                      {project.tag && <span className={styles.tag}>{project.tag}</span>}
                    </div>
                    <div className={styles.cardHeading}>
                      <h2>{project.brand}</h2>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <p>{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.more} aria-label="More projects">
              <p className={styles.moreLabel}>More from the folder</p>
              {moreProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/${project.id}`}
                  aria-label={`View ${project.brand} project`}
                  className={styles.row}
                  style={{ '--card-index': index + 3 } as CSSProperties}
                >
                  <span className={styles.rowNumber}>{String(index + 4).padStart(2, '0')}</span>
                  <span className={styles.rowPreview}>{project.preview}</span>
                  <span className={styles.rowCopy}>
                    <strong>{project.brand}</strong>
                    <small>{project.category}</small>
                  </span>
                  {project.tag && <span className={styles.rowTag}>{project.tag}</span>}
                  <span className={styles.rowArrow} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className={styles.bottomFade} aria-hidden="true" />
      {!open && <ScrollCue />}
    </main>
  );
}
