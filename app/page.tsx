import type { Metadata } from 'next';
import { FolderPortfolio } from '@/components/brand/FolderPortfolio';

export const metadata: Metadata = {
  title: 'purpl solutions',
  description: 'Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.',
};

export default function HomePage() {
  return <FolderPortfolio />;
}
