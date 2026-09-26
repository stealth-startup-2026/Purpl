'use client';

import Link from 'next/link';
import { useEffect, useRef, type CSSProperties } from 'react';
import styles from './ElasticWordmark.module.css';

/** Real text with a shallow CSS-3D extrusion; no extra WebGL renderer. */
export function ElasticWordmark({ onHome }: { onHome?: () => void }) {
  const link = useRef<HTMLAnchorElement>(null);
  const shape = useRef<HTMLSpanElement>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const target = link.current;
    const model = shape.current;
    if (!target || !model) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pointer: number | null = null;
    let dragging = false;
    let startX = 0, startY = 0, lastX = 0, lastY = 0;
    let yaw = 0, pitch = 0, yawVelocity = 0, pitchVelocity = 0;
    let frame = 0, previous = 0, settleStarted = 0;

    const rest = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      yaw = pitch = yawVelocity = pitchVelocity = 0;
      model.style.removeProperty('transform');
      delete target.dataset.active;
      delete target.dataset.dragging;
      delete target.dataset.settling;
      settleStarted = 0;
    };
    const tick = (now: number) => {
      frame = 0;
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!dragging) {
        if (motion.matches || document.hidden) { rest(); return; }
        // Same underdamped spring as the hero, integrated in stable small steps.
        const steps = Math.max(1, Math.ceil(delta * 120));
        const step = delta / steps;
        for (let i = 0; i < steps; i++) {
          yawVelocity += (-yaw * 180 - yawVelocity * 18) * step;
          pitchVelocity += (-pitch * 180 - pitchVelocity * 18) * step;
          yaw += yawVelocity * step;
          pitch += pitchVelocity * step;
        }
        if (!settleStarted && Math.max(Math.abs(yaw), Math.abs(pitch)) < 0.012
          && Math.max(Math.abs(yawVelocity), Math.abs(pitchVelocity)) < 0.12) {
          settleStarted = now;
          target.dataset.settling = 'true';
        }
        if (settleStarted && now - settleStarted >= 240
          && Math.max(Math.abs(yaw), Math.abs(pitch)) < 0.0005
          && Math.max(Math.abs(yawVelocity), Math.abs(pitchVelocity)) < 0.005) {
          rest(); return;
        }
      }
      model.style.transform = `rotateX(${pitch}rad) rotateY(${yaw}rad)`;
      // No idle loop, and pointer moves are coalesced into one paint per frame.
      if (!dragging) frame = requestAnimationFrame(tick);
    };
    const requestPaint = () => {
      if (frame) return;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const release = () => {
      const captured = pointer;
      pointer = null;
      if (captured !== null && target.hasPointerCapture(captured)) target.releasePointerCapture(captured);
      if (!dragging) return;
      dragging = false;
      delete target.dataset.dragging;
      // A full spin returns by its shortest arc, not by unwinding every turn.
      yaw = ((yaw + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      pitch = ((pitch + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      requestPaint();
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
      pointer = event.pointerId;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      yawVelocity = pitchVelocity = 0;
      suppressClick.current = false;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      if (!dragging) {
        if (Math.hypot(event.clientX - startX, event.clientY - startY) < 5) return;
        dragging = true;
        settleStarted = 0;
        delete target.dataset.settling;
        suppressClick.current = true;
        target.dataset.active = 'true';
        target.dataset.dragging = 'true';
        target.setPointerCapture(event.pointerId);
      }
      yaw += (event.clientX - lastX) * 0.014;
      pitch -= (event.clientY - lastY) * 0.014;
      lastX = event.clientX;
      lastY = event.clientY;
      requestPaint();
    };
    const up = (event: PointerEvent) => { if (event.pointerId === pointer) release(); };
    const hide = () => {
      if (document.hidden) { release(); rest(); }
    };
    target.addEventListener('pointerdown', down);
    target.addEventListener('pointermove', move);
    target.addEventListener('lostpointercapture', up);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('blur', release);
    document.addEventListener('visibilitychange', hide);
    return () => {
      target.removeEventListener('pointerdown', down);
      target.removeEventListener('pointermove', move);
      target.removeEventListener('lostpointercapture', up);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('blur', release);
      document.removeEventListener('visibilitychange', hide);
      release();
      rest();
    };
  }, []);

  return (
    <Link
      ref={link}
      href="/"
      className={styles.link}
      aria-label="purpl solutions — home"
      onDragStart={event => event.preventDefault()}
      onClick={event => {
        // Keep ordinary clicks / keyboard activation as Home; never navigate on a drag.
        if (suppressClick.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (onHome && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          onHome();
        }
      }}
    >
      <span className={styles.flat}>purpl solutions</span>
      <span className={styles.volume} aria-hidden="true">
        <span ref={shape} className={styles.shape}>
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} className={styles.depth} aria-hidden="true" style={{ '--depth': `${-(index + 1) * 0.65}px` } as CSSProperties}>purpl solutions</span>
          ))}
          <span className={styles.face}>purpl solutions</span>
        </span>
      </span>
    </Link>
  );
}
