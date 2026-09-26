'use client';

import { ElasticWordmark } from './ElasticWordmark';
import { StudioIndex } from './StudioIndex';
import styles from './PortfolioChrome.module.css';

export function PortfolioHeader({ home = false, onWork, onHome }: { home?: boolean; onWork?: () => void; onHome?: () => void }) {
  const Wordmark = home ? 'h1' : 'div';
  return (
    <>
      <header className={styles.header}>
        <Wordmark className={styles.wordmark}><ElasticWordmark onHome={onHome} /></Wordmark>
      </header>
      <StudioIndex onWork={onWork} />
    </>
  );
}

export function BottomFade() {
  return <div className={styles.bottomFade} aria-hidden="true" />;
}
