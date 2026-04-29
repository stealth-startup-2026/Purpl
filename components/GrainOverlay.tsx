"use client";

import { useEffect, useRef } from "react";

/**
 * Animated noise overlay (port of reactbits.dev/animations/noise).
 * Renders a fixed full-viewport canvas behind interactive content.
 */
export function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const size = 1024;
    const patternAlpha = 8;
    const patternRefreshInterval = 3;

    const resize = () => {
      canvas.width = size;
      canvas.height = size;
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let frame = 0;
    let raf = 0;
    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[1]"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
