import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stepModelRotation } from '../components/brand/modelRotation.ts';

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
