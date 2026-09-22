import type { Metadata } from 'next';
import { LogoPlayground } from '@/components/brand/LogoPlayground';

export const metadata: Metadata = {
  title: 'Purpl — shape studies',
  robots: { index: false, follow: false },
};

export default function LogoLabPage() {
  return <LogoPlayground />;
}
