import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

// Exercise the actual component's handlers with a small DOM/React harness.
// This tests event ordering, not mobile browser rendering or native gestures.
const source = readFileSync(new URL('../components/brand/ElasticWordmark.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    addEventListener(name, handler) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(handler);
    },
    removeEventListener(name, handler) { listeners.get(name)?.delete(handler); },
    fire(name, props = {}) {
      const event = { target: this, pointerId: 1, isPrimary: true, button: 0, clientX: 20, clientY: 20, ...props };
      for (const handler of listeners.get(name) ?? []) handler(event);
    },
  };
}

function setup() {
  const target = { ...eventTarget(), dataset: {}, captured: null };
  target.setPointerCapture = id => { target.captured = id; };
  target.hasPointerCapture = id => target.captured === id;
  target.releasePointerCapture = () => {
    target.captured = null;
    target.fire('lostpointercapture');
  };
  const model = { style: { removeProperty(name) { delete this[name]; } } };
  const win = { ...eventTarget(), matchMedia: () => ({ matches: false }) };
  const doc = { ...eventTarget(), hidden: false };
  const refs = [{ current: target }, { current: model }, { current: false }];
  const frames = new Map();
  let effect, cleanup, nextFrame = 0, now = 0, homes = 0;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  runInNewContext(compiled, {
    exports,
    require: name => {
      if (name === 'react') return { useRef: () => refs.shift(), useEffect: fn => { effect = fn; } };
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'next/link') return () => {};
      if (name.endsWith('.css')) return {};
      throw new Error(`Unexpected dependency: ${name}`);
    },
    window: win, document: doc, performance: { now: () => now },
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const rendered = exports.ElasticWordmark({ onHome: () => homes++ });
  cleanup = effect();
  return {
    target, model, win, cleanup, rendered,
    homes: () => homes,
    frame() {
      now += 16;
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach(fn => fn(now));
    },
    click(detail = 1) {
      let prevented = false;
      rendered.props.onClick({ detail, preventDefault() { prevented = true; }, stopPropagation() {} });
      return prevented;
    },
  };
}

test('touch capture is owned from pointerdown; a child losing capture cannot end the drag', () => {
  const h = setup();
  h.target.fire('pointerdown');
  assert.equal(h.target.captured, 1);
  h.target.fire('pointermove', { clientX: 60, clientY: 80 });
  h.target.fire('lostpointercapture', { target: {} });
  assert.equal(h.target.dataset.dragging, 'true');
  h.frame();
  assert.match(h.model.style.transform, /rotateX\(-0\.84.*rotateY\(0\.56/);
  h.cleanup();
});

test('release returns to flat, and a mobile click with zero detail cannot navigate after dragging', () => {
  const h = setup();
  h.target.fire('pointerdown');
  h.target.fire('pointermove', { clientX: 60, clientY: 80 });
  h.win.fire('pointerup');
  assert.equal(h.click(0), true);
  assert.equal(h.homes(), 0);
  for (let i = 0; i < 200; i++) h.frame();
  assert.equal(h.target.dataset.active, undefined);
  assert.equal(h.model.style.transform, undefined);
  h.cleanup();
});

test('a normal tap still navigates Home', () => {
  const h = setup();
  h.target.fire('pointerdown');
  h.win.fire('pointerup');
  h.click();
  assert.equal(h.homes(), 1);
  h.cleanup();
});

test('keyboard Home activation works after a drag', () => {
  const h = setup();
  h.target.fire('pointerdown');
  h.target.fire('pointermove', { clientY: 80 });
  h.win.fire('pointerup');
  h.rendered.props.onKeyDown({ key: 'Enter' });
  h.click(0);
  assert.equal(h.homes(), 1);
  h.cleanup();
});

test('pointer cancellation releases the gesture and permits the next tap', () => {
  const h = setup();
  h.target.fire('pointerdown');
  h.target.fire('pointermove', { clientY: 80 });
  h.win.fire('pointercancel');
  assert.equal(h.target.captured, null);
  assert.equal(h.target.dataset.dragging, undefined);
  h.target.fire('pointerdown');
  h.win.fire('pointerup');
  h.click();
  assert.equal(h.homes(), 1);
  h.cleanup();
});
