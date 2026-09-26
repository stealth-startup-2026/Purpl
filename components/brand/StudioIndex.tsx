'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './StudioIndex.module.css';

export function StudioIndex({ onWork }: { onWork?: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuLines = useRef<HTMLSpanElement>(null);
  const legal = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lines = menuLines.current;
    if (!lines) return;
    // Equal CSS heights can rasterize differently at fractional browser zoom.
    // Snap both thickness and row positions to the same physical pixel grid.
    const align = () => {
      const ratio = window.devicePixelRatio || 1;
      lines.style.setProperty('--bar-height', `${Math.max(2, Math.round(3 * ratio)) / ratio}px`);
      lines.style.setProperty('--bar-step', `${Math.round(10 * ratio) / ratio}px`);
      lines.style.removeProperty('transform');
      const top = lines.getBoundingClientRect().top;
      lines.style.transform = `translateY(${Math.round(top * ratio) / ratio - top}px)`;
    };
    align();
    window.addEventListener('resize', align);
    window.visualViewport?.addEventListener('resize', align);
    return () => {
      window.removeEventListener('resize', align);
      window.visualViewport?.removeEventListener('resize', align);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    // Dialog autofocus can select the only selectable text in the sheet.
    // Clear that opening artifact, without disabling deliberate copying later.
    const selection = window.getSelection();
    if (legal.current && selection?.containsNode(legal.current, true)) selection.removeAllRanges();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = previousOverflow; };
  }, [open]);

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="studio-index"
        onClick={() => { dialog.current?.showModal(); setOpen(true); }}
      >
        <span ref={menuLines} className={styles.menuLines} aria-hidden="true"><i /><i /><i /></span>
      </button>
      <dialog
        ref={dialog}
        id="studio-index"
        className={styles.dialog}
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const box = event.currentTarget.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
        }}
      >
        <div className={styles.sheet}>
          <div className={styles.heading}>
            <button type="button" className={styles.close} onClick={close} aria-label="Close menu" autoFocus>
              <X size={19} strokeWidth={1.25} />
            </button>
          </div>
          <nav aria-label="Main navigation" className={styles.links}>
            <Link href={onWork ? '#folder-projects' : '/#folder-projects'} className={styles.item} onClick={event => { close(); if (onWork) { event.preventDefault(); onWork(); } }}>
              our work
            </Link>
            <Link href="/about" className={styles.item} onClick={close}>
              about us
            </Link>
            <span className={styles.item} aria-disabled="true">
              case studies
            </span>
            <Link href="/contact" className={styles.item} onClick={close}>
              contact
            </Link>
          </nav>
          <p ref={legal} className={styles.legal}>purpl solutions | ABN 35 957 511 248</p>
        </div>
      </dialog>
    </>
  );
}
