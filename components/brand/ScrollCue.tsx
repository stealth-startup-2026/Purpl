'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollCue.module.css';
import { heroScrollEnd } from './heroScroll';

export function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const finalFolderScroll = heroScrollEnd();
      setVisible(window.scrollY < finalFolderScroll - 2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const observer = new ResizeObserver(onScroll);
    const intro = document.querySelector('[data-hero-intro]');
    if (intro) observer.observe(intro);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      className={styles.cue}
      data-visible={visible}
      aria-label="Scroll to explore our work"
      aria-hidden={!visible}
      disabled={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({
        top: heroScrollEnd(),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      })}
    >
      <span className={styles.label}>scroll</span>
      <svg width="28" height="32" viewBox="0 0 18 22" fill="none" aria-hidden="true">
        <path d="M9 4v13m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
