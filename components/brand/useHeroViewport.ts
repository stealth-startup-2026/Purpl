'use client';

import { useLayoutEffect, type RefObject } from 'react';

/** Follow browser chrome without treating a pinch zoom as a layout resize. */
export function useHeroViewport(page: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const element = page.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.visualViewport;
      if (viewport && Math.abs(viewport.scale - 1) > 0.01) return;
      const height = viewport?.height ?? window.innerHeight;
      if (height > 0) element.style.setProperty('--hero-viewport-height', `${height}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
      element.style.removeProperty('--hero-viewport-height');
    };
  }, [page]);
}
