import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Sample the original mark, rather than approximating its distinctive dent.
const { data, info } = await sharp(new URL('../public/brand/purpl_grain_transparent.png', import.meta.url).pathname)
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const cx = info.width / 2, cy = info.height / 2;
const count = 256;
const radii = Array.from({ length: count }, (_, i) => {
  const angle = i / count * Math.PI * 2;
  let edge = 0;
  for (let r = 0; r < Math.min(cx, cy); r += 0.5) {
    const x = Math.round(cx + Math.cos(angle) * r);
    const y = Math.round(cy - Math.sin(angle) * r);
    const p = (y * info.width + x) * 4;
    if (data[p + 3] > 128 && data[p] < 150 && data[p + 1] < 130 && data[p + 2] > data[p] * 1.15) edge = r;
  }
  if (edge < 100) throw new Error('Could not locate the purple logo contour');
  return edge / (info.width * 0.288);
});
const smooth = radii.map((_, i) => [-2, -1, 0, 1, 2].reduce((sum, offset) => sum + radii[(i + offset + count) % count], 0) / 5);
const geometry = new THREE.SphereGeometry(1, 128, 96);
const documentGeometry = geometry.clone();
const documentPositions = documentGeometry.attributes.position;
const folderOutline = new THREE.Shape();
// Match the closed cover's lower edge: hinge (-0.67) + centre (0.65) - half-height (0.59).
const backBottom = -0.61;
folderOutline.moveTo(-0.88, backBottom);
folderOutline.lineTo(0.88, backBottom);
folderOutline.quadraticCurveTo(1, backBottom, 1, backBottom + 0.12);
folderOutline.lineTo(1, 0.49);
folderOutline.quadraticCurveTo(1, 0.61, 0.88, 0.61);
folderOutline.lineTo(-0.28, 0.61);
folderOutline.quadraticCurveTo(-0.34, 0.61, -0.39, 0.7);
folderOutline.quadraticCurveTo(-0.43, 0.8, -0.5, 0.8);
folderOutline.lineTo(-0.88, 0.8);
folderOutline.quadraticCurveTo(-1, 0.8, -1, 0.68);
folderOutline.lineTo(-1, backBottom + 0.12);
folderOutline.quadraticCurveTo(-1, backBottom, -0.88, backBottom);
const outline = folderOutline.getPoints(24);
for (let i = 0; i < documentPositions.count; i++) {
  const x = documentPositions.getX(i), y = documentPositions.getY(i), z = documentPositions.getZ(i);
  const angle = Math.atan2(y, x);
  const cos = Math.cos(angle), sin = Math.sin(angle);
  let radius = 1;
  for (let j = 0; j < outline.length - 1; j++) {
    const a = outline[j], b = outline[j + 1];
    const dx = b.x - a.x, dy = b.y - a.y;
    const cross = cos * dy - sin * dx;
    if (Math.abs(cross) < 1e-8) continue;
    const t = (a.x * dy - a.y * dx) / cross;
    const u = (a.x * sin - a.y * cos) / cross;
    if (t > 0 && u >= 0 && u <= 1) { radius = t; break; }
  }
  documentPositions.setXYZ(i, x * radius, y * radius, z * 0.045);
}
documentGeometry.computeVertexNormals();
const positions = geometry.attributes.position;
for (let i = 0; i < positions.count; i++) {
  const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
  const angle = (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  const index = angle / (Math.PI * 2) * count;
  const a = Math.floor(index), fraction = index - a;
  const radius = THREE.MathUtils.lerp(smooth[a % count], smooth[(a + 1) % count], fraction);
  // Fade angular variation near the front/back poles for a smooth surface.
  const scale = THREE.MathUtils.lerp(1, radius, Math.min(1, Math.hypot(x, y) * 2));
  positions.setXYZ(i, x * scale, y * scale, z * 0.62);
}
geometry.computeVertexNormals();
geometry.morphAttributes.position = [documentPositions];
geometry.morphAttributes.normal = [documentGeometry.attributes.normal];
const material = new THREE.MeshPhysicalMaterial({ color: '#310c5d', roughness: 1, metalness: 0, specularIntensity: 0.08 });
const mesh = new THREE.Mesh(geometry, material);
mesh.name = 'Purpl — original silhouette, rounded depth';
mesh.morphTargetDictionary = { folder: 0 };

// GLTFExporter uses the browser FileReader API for binary packing.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then(result => {
      this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`;
      this.onloadend?.();
    });
  }
};
const glb = await new GLTFExporter().parseAsync(mesh, { binary: true });
const output = new URL('../public/models/', import.meta.url);
await mkdir(output, { recursive: true });
await writeFile(new URL('purpl-pebble.glb', output), Buffer.from(glb));
console.log(`Generated purpl-pebble.glb: ${Math.round(glb.byteLength / 1024)} KB, ${positions.count} vertices. Source silhouette sampled at ${count} angles.`);
