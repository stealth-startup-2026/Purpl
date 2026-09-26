import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { readHeroScrollRange, heroScrollEnd } from '../components/brand/heroScroll.ts';

// Run with Node 22.18+ (native TypeScript support):
// node --test scripts/hero-scroll.test.mjs
const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
afterEach(() => {
  globalThis.window = originalWindow;
  globalThis.document = originalDocument;
});

function layout({ visible = 700, layoutHeight = visible, runway = 630, start = 0, scroll = 0, extra = 0 } = {}) {
  globalThis.window = { innerHeight: layoutHeight, scrollY: scroll };
  globalThis.document = {
    documentElement: { scrollHeight: start + visible + runway + extra },
    querySelector: selector => selector === '[data-hero-intro]'
      ? { offsetHeight: visible + runway, getBoundingClientRect: () => ({ top: start - scroll }) }
      : { clientHeight: visible },
  };
}

test('normal hero reaches exactly 100% at the closed-page boundary', () => {
  layout();
  assert.deepEqual(readHeroScrollRange(), { start: 0, distance: 630 });
  assert.equal(heroScrollEnd(), 630);
});

test('a taller Safari layout viewport cannot leave the folder partly morphed', () => {
  layout({ visible: 700, layoutHeight: 800 });
  assert.equal(heroScrollEnd(), 530);
});

test('toolbar resizing keeps a stable runway when visual and layout heights agree', () => {
  layout({ visible: 700 });
  assert.equal(heroScrollEnd(), 630);
  layout({ visible: 800, scroll: 630 });
  assert.equal(heroScrollEnd(), 630);
});

test('document offset and any extra content do not extend the morph runway', () => {
  layout({ start: 100, scroll: 400, extra: 2000 });
  assert.deepEqual(readHeroScrollRange(), { start: 100, distance: 630 });
  assert.equal(heroScrollEnd(), 730);
});

test('zero-size transient layout never divides by zero', () => {
  layout({ runway: 0 });
  assert.equal(readHeroScrollRange().distance, 1);
});

test('the standalone logo lab keeps its original fallback scroll range', () => {
  layout();
  globalThis.document.querySelector = () => null;
  assert.deepEqual(readHeroScrollRange(), { start: 0, distance: 630 });
});
