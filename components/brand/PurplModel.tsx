'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { usePurplModel } from './usePurplModel';
import styles from './PurplModel.module.css';

/** Self-contained model and interactions. The parent provides the scroll space. */
export function PurplModel({ onOpenChange, onFolderBottomChange, controls, lockOpenMorph = false }: { onOpenChange?: (open: boolean) => void; onFolderBottomChange?: (ratio: number) => void; controls?: string; lockOpenMorph?: boolean }) {
  const { host, settings, status, morph, setMorph, folderOpen, setFolderOpen } = usePurplModel({ lockOpenMorph, onFolderBottomChange });
  const isFolder = morph > 0.9;
  const ready = status === 'Drag to explore the shape';
  const changeOpen = useRef(onOpenChange);
  changeOpen.current = onOpenChange;
  useEffect(() => { changeOpen.current?.(folderOpen); }, [folderOpen]);

  return (
    <div className={styles.model}>
      {!ready && <Image src="/brand/purpl_grain_transparent.png" alt="" fill sizes="(max-width: 640px) 90vw, 620px" className={styles.fallback} priority />}
      <div
        ref={host}
        className={styles.canvas}
        tabIndex={0}
        role="button"
        aria-label={isFolder ? `${folderOpen ? 'Close' : 'Open'} project folder. Drag to rotate.` : 'Purpl logo. Scroll or press Enter to form a folder. Drag to rotate.'}
        aria-expanded={isFolder ? folderOpen : undefined}
        aria-controls={controls}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            settings.current.manualMorph = true;
            if (!isFolder) {
              settings.current.morph = 1;
              setMorph(1);
            } else {
              settings.current.folderOpen = !folderOpen;
              setFolderOpen(!folderOpen);
            }
          }
          if (event.key === 'Escape') {
            settings.current.reset += 1;
            settings.current.folderOpen = false;
            setFolderOpen(false);
          }
        }}
      >
        <div className={styles.hitArea} aria-hidden="true" />
      </div>
    </div>
  );
}
