"use client";

import { useEffect, useRef } from "react";

/**
 * Dot-grid background.
 *
 * Two modes on a single fixed canvas:
 *  - `interactive` (landing page): a breathing grid of dots that brighten near
 *    the cursor, ambient "constellation" lines from the cursor, and
 *    click-to-connect drawing (right-click ends the chain).
 *  - static (every other page): just the breathing dots, no cursor or draw.
 *    Same look, calm. Sits behind all content (negative z, pointer-events off)
 *    so it never needs per-page z-index and never intercepts clicks.
 *
 * Layering (interactive): z-0, below the GrainOverlay (z-1) and page content
 * (z-2+); the canvas takes clicks itself while real links above it
 * (pointer-events:auto) win the hit-test. See HomePage where `main` is
 * pointer-events-none and each Link opts back in.
 */
export function DotGrid({ interactive = false }: { interactive?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 46;
    const RADIUS = 150;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let nodes: { x: number; y: number; ph: number }[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let segments: { a: number; b: number }[] = [];
    let path: number[] = [];
    let t = 0;
    let raf = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          nodes.push({ x: i * SPACING, y: j * SPACING, ph: Math.random() * Math.PI * 2 });
        }
      }
    };

    const nearest = (x: number, y: number) => {
      let best = -1;
      let bd = Infinity;
      for (let k = 0; k < nodes.length; k++) {
        const dx = nodes[k].x - x;
        const dy = nodes[k].y - y;
        const d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = k;
        }
      }
      return best;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onClick = (e: MouseEvent) => {
      const k = nearest(e.clientX, e.clientY);
      if (k < 0) return;
      if (path.length) segments.push({ a: path[path.length - 1], b: k });
      path.push(k);
    };
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      path = [];
    };
    const onResize = () => {
      build();
      segments = [];
      path = [];
    };

    const draw = () => {
      if (!reduceMotion) t += 0.016;
      ctx.clearRect(0, 0, W, H);

      // dots — breathing, brighter near the cursor
      for (const n of nodes) {
        let a = 0.18 + 0.05 * Math.sin(t + n.ph);
        let r = 1.3;
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            a += f * 0.7;
            r += f * 1.6;
          }
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,190,255,${a})`;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ambient constellation lines from cursor to nearby dots
      if (mouse.active) {
        ctx.lineWidth = 1;
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            ctx.strokeStyle = `rgba(168,85,247,${f * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // persistent connect-the-dots lines — glowing magenta
      ctx.save();
      ctx.shadowColor = "#c026d3";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "rgba(232,121,249,0.95)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (const s of segments) {
        const A = nodes[s.a];
        const B = nodes[s.b];
        if (!A || !B) continue;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }
      // rubber-band from last dot to cursor while a chain is open
      if (path.length && mouse.active) {
        const A = nodes[path[path.length - 1]];
        if (A) {
          ctx.strokeStyle = "rgba(232,121,249,0.4)";
          ctx.setLineDash([4, 5]);
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      // highlight dots that are part of the drawing
      ctx.shadowBlur = 8;
      const used = new Set<number>();
      for (const s of segments) {
        used.add(s.a);
        used.add(s.b);
      }
      for (const p of path) used.add(p);
      for (const k of used) {
        const n = nodes[k];
        if (!n) continue;
        ctx.beginPath();
        ctx.fillStyle = "#f5d0fe";
        ctx.arc(n.x, n.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      raf = window.requestAnimationFrame(draw);
    };

    build();
    draw();
    // Only the landing page is interactive; other pages get the calm dots.
    if (interactive) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
      canvas.addEventListener("click", onClick);
      canvas.addEventListener("contextmenu", onContext);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("contextmenu", onContext);
      window.removeEventListener("resize", onResize);
    };
  }, [interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={
        interactive
          ? "fixed inset-0 z-0 h-screen w-screen"
          : "pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      }
    />
  );
}
