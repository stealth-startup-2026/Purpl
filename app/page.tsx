import type { Metadata } from 'next';
import Link from 'next/link';
import { PurplModel } from '@/components/brand/PurplModel';
import { ScrollCue } from '@/components/brand/ScrollCue';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'purpl solutions',
  description: 'Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.',
};

export default function HomePage() {
  return (
    <main className={styles.page} data-purpl-home>
      <header className={styles.header}>
        <h1><Link href="/">purpl solutions</Link></h1>
      </header>
      <div className={styles.viewport}>
        <PurplModel />
      </div>
      <ScrollCue />
    </main>
  );
}
