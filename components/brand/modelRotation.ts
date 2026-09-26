/** Rotation in radians, with velocity in radians per second. */
export function stepModelRotation(angle: number, velocity: number, target: number, elapsed: number, held: boolean) {
  const delta = Math.max(0, Math.min(elapsed, 0.05));
  const steps = Math.max(1, Math.ceil(delta * 120));
  const step = delta / steps;
  // Follow the hand with weight, then keep momentum in a softer return spring.
  const stiffness = held ? 240 : 100;
  const damping = held ? 28 : 13.5;
  for (let i = 0; i < steps; i++) {
    velocity += ((target - angle) * stiffness - velocity * damping) * step;
    angle += velocity * step;
  }
  return { angle, velocity };
}
