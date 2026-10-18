import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { BottomFade, PortfolioHeader } from './PortfolioChrome';
import styles from './ContentPage.module.css';

/** White page with the portfolio header, for pages that lay out their own content. */
export function PageShell({ wide = false, children }: { wide?: boolean; children: ReactNode }) {
  return (
    <div className={styles.page} data-purpl-page>
      <PortfolioHeader />
      <main className={cn(styles.content, wide && styles.wide)}>{children}</main>
      <BottomFade />
    </div>
  );
}

export function ContentPage({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <PageShell>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {children}
    </PageShell>
  );
}
