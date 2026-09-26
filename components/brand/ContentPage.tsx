import type { ReactNode } from 'react';
import { BottomFade, PortfolioHeader } from './PortfolioChrome';
import styles from './ContentPage.module.css';

export function ContentPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.page} data-purpl-page>
      <PortfolioHeader />
      <main className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
      <BottomFade />
    </div>
  );
}
