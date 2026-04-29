// Animated noise overlay - port of reactbits.dev/animations/noise.
// Expects a <canvas id="grain" class="noise-overlay"></canvas> in the page.
(() => {
  const canvas = document.getElementById("grain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  const size = 1024;
  const patternAlpha = 8;             // 0–255; lower = subtler grain
  const patternRefreshInterval = 3;   // redraw every N frames (higher = calmer shimmer)

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
  const loop = () => {
    if (frame % patternRefreshInterval === 0) drawGrain();
    frame++;
    requestAnimationFrame(loop);
  };

  window.addEventListener("resize", resize);
  resize();
  loop();
})();
