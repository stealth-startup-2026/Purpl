'use client';

import Image from 'next/image';
import { Pointer } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { usePurplModel } from './usePurplModel';
import styles from './PurplModel.module.css';

/** Self-contained model and interactions. The parent provides the scroll space. */
export function PurplModel({ onOpenChange, onFolderBottomChange, controls, lockOpenMorph = false, showHint = false, openRequest = 0 }: { onOpenChange?: (open: boolean) => void; onFolderBottomChange?: (ratio: number) => void; controls?: string; lockOpenMorph?: boolean; showHint?: boolean; openRequest?: number }) {
  const { host, settings, status, morph, setMorph, folderOpen, setFolderOpen } = usePurplModel({ lockOpenMorph, onFolderBottomChange });
  const isFolder = morph > 0.9;
  const ready = status === 'Drag to explore the shape';
  const hintVisible = ready && isFolder && !folderOpen;
  const changeOpen = useRef(onOpenChange);
  changeOpen.current = onOpenChange;
  useEffect(() => { changeOpen.current?.(folderOpen); }, [folderOpen]);
  useEffect(() => {
    if (!openRequest) return;
    settings.current.manualMorph = true;
    settings.current.morph = 1;
    settings.current.folderOpen = true;
    setMorph(1);
    setFolderOpen(true);
  }, [openRequest, settings, setMorph, setFolderOpen]);

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
        <div className={styles.hitArea} data-model-hit-area aria-hidden="true" />
      </div>
      {showHint && (
        <button
          type="button"
          className={styles.hint}
          data-visible={hintVisible}
          aria-hidden={!hintVisible}
          aria-label="Open folder to view our work"
          aria-controls={controls}
          disabled={!hintVisible}
          tabIndex={hintVisible ? 0 : -1}
          onClick={() => {
            settings.current.folderOpen = true;
            setFolderOpen(true);
          }}
        >
          <span>open to explore</span>
          <Pointer size={18} strokeWidth={1.25} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
