/** Rotation in radians, with velocity in radians per second. */
export function stepModelRotation(angle: number, velocity: number, target: number, elapsed: number, held: boolean, returnStrength = 1) {
  const delta = Math.max(0, Math.min(elapsed, 0.05));
  const steps = Math.max(1, Math.ceil(delta * 120));
  const step = delta / steps;
  // No restoring force during the coast. Blend the return spring in gradually
  // afterwards, rather than applying the full pull toward home on release.
  const strength = Math.max(0, Math.min(1, returnStrength));
  const stiffness = held ? 240 : 100 * strength;
  // Lower free-spin drag keeps a released throw moving; the held-drag and
  // fully engaged return still use their existing damping values.
  const damping = held ? 28 : 0.55 + 12.95 * strength;
  for (let i = 0; i < steps; i++) {
    velocity += ((target - angle) * stiffness - velocity * damping) * step;
    angle += velocity * step;
  }
  return { angle, velocity };
}

export type RotationSample = { x: number; y: number; time: number };

/** A quick flick can outrun the weighty mesh. Use that stronger hand impulse,
 * but never let a weak/stale sample erase momentum already on screen. */
export function modelReleaseVelocity(currentVelocity: number, sampledVelocity: number) {
  return Math.abs(sampledVelocity) > Math.abs(currentVelocity) ? sampledVelocity : currentVelocity;
}

/** Sample the hand, not the lagging mesh, so even a very short flick registers. */
export function modelFlickVelocity(samples: RotationSample[], releasedAt: number) {
  const firstRecent = samples.findIndex(sample => releasedAt - sample.time <= 100);
  // Keep the preceding position as an anchor when the user holds still before
  // making a short flick; there may be only one fresh pointermove in that case.
  const first = firstRecent < 0 ? undefined : samples[Math.max(0, firstRecent - 1)];
  const last = samples[samples.length - 1];
  if (!first || !last || first === last || releasedAt - last.time > 80) return { yaw: 0, pitch: 0 };
  const seconds = Math.max(1 / 120, Math.min(0.1, (releasedAt - first.time) / 1000));
  const weightedVelocity = (distance: number) => Math.max(-10, Math.min(10, distance * 0.014 * 0.8 / seconds));
  return { yaw: weightedVelocity(last.x - first.x), pitch: weightedVelocity(last.y - first.y) };
}

export function modelReturnStrength(releasedFor: number, coastDuration: number) {
  const progress = Math.max(0, Math.min(1, (releasedFor - coastDuration) / 0.65));
  return progress * progress * (3 - 2 * progress);
}

export function modelCoastDuration(speed: number) {
  return speed > 0.5 ? 1.3 + Math.min(0.9, speed * 0.09) : 0;
}
