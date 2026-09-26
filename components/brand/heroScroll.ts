/** Use the rendered runway, not a second interpretation of mobile viewport units. */
export function readHeroScrollRange() {
  const intro = document.querySelector<HTMLElement>('[data-hero-intro]');
  const viewport = document.querySelector<HTMLElement>('[data-hero-viewport]');
  if (!intro || !viewport) return { start: 0, distance: window.innerHeight * 0.9 };
  const start = intro.getBoundingClientRect().top + window.scrollY;
  const runway = Math.max(1, intro.offsetHeight - viewport.clientHeight);
  // Some Safari versions expose a layout viewport taller than the visible area.
  // The closed folder must still be reachable at the real document boundary.
  const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - start);
  return { start, distance: Math.min(runway, available) };
}

export function heroScrollEnd() {
  const { start, distance } = readHeroScrollRange();
  return start + distance;
}
