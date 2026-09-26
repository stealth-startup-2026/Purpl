import assert from 'node:assert/strict';
import { test } from 'node:test';
import { modelCoastDuration, modelFlickVelocity, modelReleaseVelocity, modelReturnStrength, modelScrollMoved, stepModelRotation } from '../components/brand/modelRotation.ts';

test('dragging follows with weight rather than jumping to the pointer target', () => {
  const result = stepModelRotation(0, 0, 1, 1 / 60, true);
  assert.ok(result.angle > 0 && result.angle < 0.2);
  assert.ok(result.velocity > 0);
});

test('release carries momentum before returning to the resting orientation', () => {
  let state = stepModelRotation(0.4, 8, 0, 1 / 60, false);
  assert.ok(state.angle > 0.4);
  for (let i = 0; i < 180; i++) state = stepModelRotation(state.angle, state.velocity, 0, 1 / 60, false);
  assert.ok(Math.abs(state.angle) < 0.001);
  assert.ok(Math.abs(state.velocity) < 0.001);
});

test('vertical and horizontal full-turn offsets remain stable at slow frame rates', () => {
  for (const initial of [-Math.PI, Math.PI]) {
    let state = { angle: initial, velocity: 12 };
    for (let i = 0; i < 90; i++) state = stepModelRotation(state.angle, state.velocity, 0, 1 / 30, false);
    assert.ok(Math.abs(state.angle) < 0.001);
    assert.ok(Math.abs(state.velocity) < 0.001);
  }
});

test('motion is consistent across 30, 60, and 120 Hz displays', () => {
  const results = [30, 60, 120].map(fps => {
    let state = { angle: 0, velocity: 0 };
    for (let i = 0; i < fps / 2; i++) state = stepModelRotation(state.angle, state.velocity, 1, 1 / fps, true);
    return state.angle;
  });
  assert.ok(Math.max(...results) - Math.min(...results) < 0.001);
});

test('a quick flick registers even before the mesh has had a frame to catch up', () => {
  const flick = modelFlickVelocity([{ x: 0, y: 0, time: 0 }, { x: 60, y: -40, time: 20 }], 24);
  assert.equal(flick.yaw, 10);
  assert.equal(flick.pitch, -10);
});

test('holding still before release does not throw the model', () => {
  assert.deepEqual(modelFlickVelocity([{ x: 0, y: 0, time: 0 }, { x: 60, y: 40, time: 20 }], 200), { yaw: 0, pitch: 0 });
});

test('a short flick after holding the model still still registers', () => {
  const flick = modelFlickVelocity([{ x: 0, y: 0, time: 0 }, { x: 60, y: 0, time: 1000 }], 1005);
  assert.ok(flick.yaw > 5);
  assert.equal(flick.pitch, 0);
});

test('a flick keeps travelling in its thrown direction throughout the coast', () => {
  let state = { angle: 2, velocity: 8 };
  for (let i = 1; i <= 30; i++) {
    const next = stepModelRotation(state.angle, state.velocity, 0, 1 / 60, false, modelReturnStrength(i / 60, 0.5));
    assert.ok(next.angle > state.angle);
    assert.ok(next.velocity > 0 && next.velocity < state.velocity);
    state = next;
  }
  assert.ok(state.angle > 4);
});

test('the return ramps in after coasting and eventually settles', () => {
  assert.equal(modelReturnStrength(0.49, 0.5), 0);
  assert.ok(modelReturnStrength(0.51, 0.5) < 0.001);
  assert.equal(modelReturnStrength(1.2, 0.5), 1);
  let state = { angle: 2, velocity: 8 };
  for (let i = 1; i <= 300; i++) {
    state = stepModelRotation(state.angle, state.velocity, 0, 1 / 60, false, modelReturnStrength(i / 60, 0.5));
  }
  assert.ok(Math.abs(state.angle) < 0.001);
  assert.ok(Math.abs(state.velocity) < 0.001);
});

test('release does not erase visible momentum when the last pointer sample is stale', () => {
  let state = { angle: 0, velocity: 0 };
  for (let i = 0; i < 6; i++) state = stepModelRotation(state.angle, state.velocity, 1.4, 1 / 60, true);
  const flick = modelFlickVelocity([{ x: 0, y: 0, time: 0 }, { x: 100, y: 0, time: 10 }], 100);
  assert.equal(flick.yaw, 0);
  assert.ok(state.velocity > 7);
  const releasedVelocity = modelReleaseVelocity(state.velocity, flick.yaw);
  assert.equal(releasedVelocity, state.velocity);
  const next = stepModelRotation(state.angle, releasedVelocity, 0, 1 / 60, false, 0);
  assert.ok(next.angle > state.angle);
  assert.ok(next.velocity > 0);
});

test('a stronger hand impulse drives a flick without stale samples erasing existing momentum', () => {
  assert.equal(modelReleaseVelocity(4, 10), 10);
  assert.equal(modelReleaseVelocity(-6, 0), -6);
  assert.equal(modelReleaseVelocity(3, -10), -10);
  assert.equal(modelReleaseVelocity(6, 2), 6);
  assert.equal(modelReleaseVelocity(0.02, 8), 8);
});

test('the same drag distance makes a stronger throw when released quickly', () => {
  function releaseAfter(duration) {
    const distance = 30;
    const samples = Array.from({ length: 13 }, (_, i) => ({ x: distance * i / 12, y: 0, time: duration * i / 12 }));
    let state = { angle: 0, velocity: 0 };
    const frames = Math.max(1, Math.round(duration / 1000 * 120));
    for (let i = 1; i <= frames; i++) {
      state = stepModelRotation(state.angle, state.velocity, distance * 0.014 * i / frames, duration / 1000 / frames, true);
    }
    const flick = modelFlickVelocity(samples, duration);
    return { current: state.velocity, released: modelReleaseVelocity(state.velocity, flick.yaw) };
  }
  const slow = releaseAfter(1000);
  const quick = releaseAfter(30);
  assert.ok(quick.released > quick.current * 2, 'a fast flick must not be limited by the mesh lag');
  assert.ok(quick.released > slow.released * 4, 'release speed must respond to gesture speed, not just distance');
});

test('a flick before the first animation frame can still seed momentum', () => {
  assert.equal(modelReleaseVelocity(0, 10), 10);
  assert.equal(modelReleaseVelocity(0, -8), -8);
  assert.equal(modelReleaseVelocity(0, 0), 0);
});

test('a normal throw keeps momentum through the shorter coast and still settles', () => {
  const coast = modelCoastDuration(5);
  assert.equal(coast, 1.05);
  let state = { angle: 0, velocity: 5 };
  for (let i = 1; i <= 54; i++) {
    state = stepModelRotation(state.angle, state.velocity, 0, 1 / 60, false, modelReturnStrength(i / 60, coast));
  }
  assert.ok(state.angle > 3.4);
  assert.ok(state.velocity > 3);
  assert.equal(modelReturnStrength(0.9, coast), 0);
  for (let i = 55; i <= 360; i++) {
    state = stepModelRotation(state.angle, state.velocity, 0, 1 / 60, false, modelReturnStrength(i / 60, coast));
  }
  assert.ok(Math.abs(state.angle) < 0.001);
  assert.ok(Math.abs(state.velocity) < 0.001);
});

test('small movements do not gain an artificial coasting delay', () => {
  assert.equal(modelCoastDuration(0), 0);
  assert.equal(modelCoastDuration(0.4), 0);
  assert.equal(modelCoastDuration(100), 1.32);
});

test('real vertical scrolling interrupts a coast in either direction', () => {
  assert.equal(modelScrollMoved(100, 104, 800), true);
  assert.equal(modelScrollMoved(104, 100, 800), true);
});

test('stationary pointer gestures, subpixel jitter, and boundary bounce do not count as scrolling', () => {
  assert.equal(modelScrollMoved(100, 100, 800), false);
  assert.equal(modelScrollMoved(100, 101.5, 800), false);
  assert.equal(modelScrollMoved(0, -40, 800), false);
  assert.equal(modelScrollMoved(800, 850, 800), false);
  assert.equal(modelScrollMoved(0, 40, 0), false);
});

test('scroll interruption engages the return without waiting out the remaining coast', () => {
  const coast = modelCoastDuration(5);
  assert.equal(modelReturnStrength(0.1, coast), 0);
  const strength = modelReturnStrength(0.25, 0);
  assert.ok(strength > 0.3);
  const free = stepModelRotation(1, 5, 0, 1 / 60, false, 0);
  const returning = stepModelRotation(1, 5, 0, 1 / 60, false, strength);
  assert.ok(returning.velocity < free.velocity);
  assert.ok(Math.abs(returning.angle - 1) < 0.1, 'scroll should not snap to the resting angle');
});
