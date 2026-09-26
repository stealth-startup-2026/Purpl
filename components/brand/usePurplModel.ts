'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { readHeroScrollRange } from './heroScroll';
import { stepModelRotation } from './modelRotation';

export const finishes = {
  clay: { label: 'Matte clay', color: '#310c5d', roughness: 1, metalness: 0, transmission: 0, clearcoat: 0, specularIntensity: 0.08 },
  resin: { label: 'Purple resin', color: '#8240d4', roughness: 0.12, metalness: 0, transmission: 0.72, clearcoat: 1, specularIntensity: 1 },
  chrome: { label: 'Liquid metal', color: '#a777e0', roughness: 0.19, metalness: 0.96, transmission: 0, clearcoat: 1, specularIntensity: 1 },
};
export type Finish = keyof typeof finishes;

export function usePurplModel({ lockOpenMorph = false, onFolderBottomChange }: { lockOpenMorph?: boolean; onFolderBottomChange?: (ratio: number) => void } = {}) {
  const host = useRef<HTMLDivElement>(null);
  const folderBottomCallback = useRef(onFolderBottomChange);
  folderBottomCallback.current = onFolderBottomChange;
  const settings = useRef({ finish: 'clay' as Finish, paused: false, reset: 0, morph: 0, folderOpen: false, manualMorph: false });
  const [finish, setFinish] = useState<Finish>('clay');
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('Loading the shape…');
  const [morph, setMorph] = useState(0);
  const [folderOpen, setFolderOpen] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setStatus('3D is unavailable in this browser.');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.domElement.setAttribute('aria-label', 'Interactive Purpl logo. Scroll to form the folder, then click to open. Drag to rotate.');
    renderer.domElement.setAttribute('role', 'img');
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0, 4.7);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight('#efe8ff', '#48306b', 0.8));
    const key = new THREE.DirectionalLight('#fff4e9', 3.2);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight('#c8acff', 2);
    rim.position.set(4, 1, -2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight('#ddd4ff', 0.55);
    fill.position.set(1, -2, 3);
    scene.add(fill);
    const { label: _initialLabel, ...initialMaterial } = finishes.clay;
    const material = new THREE.MeshPhysicalMaterial({ ...initialMaterial, thickness: 1.2, ior: 1.46, envMapIntensity: 0.8 });
    const grainUniform = { value: 0.22 };
    material.onBeforeCompile = shader => {
      shader.uniforms.grainAmount = grainUniform;
      shader.vertexShader = 'varying vec3 vClayPosition;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvClayPosition = position;');
      shader.fragmentShader = 'uniform float grainAmount;\nvarying vec3 vClayPosition;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
        vec3 grainCell = floor(vClayPosition * 460.0);
        float clayGrain = fract(sin(dot(grainCell, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        diffuseColor.rgb *= 1.0 + (clayGrain - 0.5) * grainAmount * 2.0;
      `);
    };
    let model: THREE.Object3D | undefined;
    const hitArea = container.querySelector<HTMLElement>('[data-model-hit-area]');
    const hitMeshes: { mesh: THREE.Mesh; blob: THREE.Box3; folder: THREE.Box3 }[] = [];
    const details = new THREE.Group();
    const detailMaterial = new THREE.MeshStandardMaterial({ color: '#eee5f6', roughness: 1, transparent: true, opacity: 0 });
    const papers: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const paper = new THREE.Mesh(new RoundedBoxGeometry(1.35 + i * 0.12, 1.06 - i * 0.1, 0.018, 4, 0.045), detailMaterial);
      paper.position.set(0, -0.02, 0.06 + i * 0.024);
      details.add(paper);
      papers.push(paper);
    }
    const coverMaterial = material.clone();
    coverMaterial.color.set('#582b85');
    coverMaterial.onBeforeCompile = material.onBeforeCompile;
    coverMaterial.transparent = true;
    coverMaterial.opacity = 0;
    const coverHinge = new THREE.Group();
    coverHinge.position.set(0, -0.67, 0.16);
    const cover = new THREE.Mesh(new RoundedBoxGeometry(1.98, 1.18, 0.06, 5, 0.05), coverMaterial);
    cover.position.y = 0.65;
    coverHinge.add(cover);
    details.add(coverHinge);
    const folderYaw = 0.2 + THREE.MathUtils.degToRad(5), folderPitch = 0.14;
    const folderRestRotation = new THREE.Euler(folderPitch, folderYaw, 0);
    const folderRestPoints: THREE.Vector3[] = [];
    // Project the actual open folder geometry at its resting angle. Ignore drag
    // and idle motion so the surrounding page never shifts while it is handled.
    cover.updateMatrix();
    const coverPositions = cover.geometry.attributes.position;
    for (let i = 0; i < coverPositions.count; i++) {
      folderRestPoints.push(new THREE.Vector3().fromBufferAttribute(coverPositions, i)
        .applyMatrix4(cover.matrix).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.65)
        .add(coverHinge.position).applyEuler(folderRestRotation));
    }
    const disposeModel = (object: THREE.Object3D) => object.traverse(child => {
      if (child instanceof THREE.Mesh) child.geometry.dispose();
    });
    new GLTFLoader().load('/models/purpl-pebble.glb', gltf => {
      gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const original = Array.isArray(child.material) ? child.material : [child.material];
          original.forEach(m => m.dispose());
          child.material = material;
          const positions = child.geometry.attributes.position;
          const blob = new THREE.Box3().setFromBufferAttribute(positions);
          const folder = blob.clone();
          const folderPositions = child.geometry.morphAttributes.position?.[0];
          if (folderPositions) {
            folder.makeEmpty();
            const base = new THREE.Vector3();
            for (let i = 0; i < folderPositions.count; i++) {
              const point = new THREE.Vector3().fromBufferAttribute(folderPositions, i);
              if (child.geometry.morphTargetsRelative) {
                point.add(base.fromBufferAttribute(child.geometry.attributes.position, i));
              }
              folder.expandByPoint(point);
              folderRestPoints.push(point.applyMatrix4(child.matrixWorld).applyEuler(folderRestRotation));
            }
          }
          hitMeshes.push({ mesh: child, blob, folder });
        }
      });
      if (disposed) { disposeModel(gltf.scene); return; }
      model = gltf.scene;
      model.add(details);
      scene.add(model);
      resize();
      setStatus('Drag to explore the shape');
    }, undefined, () => {
      if (!disposed) setStatus('The model could not load. Refresh to try again.');
    });

    const resize = () => {
      // Layout dimensions exclude the parent's animated CSS scale.
      const width = container.clientWidth, height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 4.7 / camera.aspect : 4.7;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      if (folderBottomCallback.current) {
        const projected = new THREE.Vector3();
        let bottom = 0.5;
        for (const point of folderRestPoints) {
          projected.copy(point).project(camera);
          bottom = Math.max(bottom, (1 - projected.y) / 2);
        }
        folderBottomCallback.current(bottom);
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    // Drag offsets spring back to zero. Only the folder adds the angled resting pose.
    const restingYaw = 0, restingPitch = 0;
    let yaw = restingYaw, pitch = restingPitch, yawVelocity = 0, pitchVelocity = 0;
    let targetYaw = restingYaw, targetPitch = restingPitch;
    let drag = false, lastX = 0, lastY = 0, downX = 0, downY = 0;
    let pointer: number | null = null;
    let moved = false;
    const raycaster = new THREE.Raycaster();
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
      pointer = event.pointerId;
      moved = false;
      drag = true; lastX = event.clientX; lastY = event.clientY;
      yawVelocity = 0; pitchVelocity = 0;
      targetYaw = yaw; targetPitch = pitch;
      downX = event.clientX; downY = event.clientY;
      container.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== pointer) return;
      moved ||= Math.hypot(event.clientX - downX, event.clientY - downY) >= 7;
      targetYaw += (event.clientX - lastX) * 0.014;
      targetPitch += (event.clientY - lastY) * 0.014;
      lastX = event.clientX; lastY = event.clientY;
    };
    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      if (event.type === 'lostpointercapture'
        && (event.target !== container || container.hasPointerCapture(event.pointerId))) return;
      const isClick = drag && !moved && Math.hypot(event.clientX - downX, event.clientY - downY) < 7;
      pointer = null;
      drag = false;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      // Return by the shortest arc after any full turns during dragging.
      yaw = restingYaw + THREE.MathUtils.euclideanModulo(yaw - restingYaw + Math.PI, Math.PI * 2) - Math.PI;
      pitch = restingPitch + THREE.MathUtils.euclideanModulo(pitch - restingPitch + Math.PI, Math.PI * 2) - Math.PI;
      // Preserve the velocity built while following the hand. Limit strong
      // flicks so the return remains controlled rather than spinning endlessly.
      yawVelocity = event.type === 'pointerup' ? THREE.MathUtils.clamp(yawVelocity, -12, 12) : 0;
      pitchVelocity = event.type === 'pointerup' ? THREE.MathUtils.clamp(pitchVelocity, -12, 12) : 0;
      if (!isClick || event.type !== 'pointerup' || !model || displayedMorph < 0.9) return;
      const rect = container.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
      if (raycaster.intersectObject(model, true).length) {
        settings.current.folderOpen = !settings.current.folderOpen;
        setFolderOpen(settings.current.folderOpen);
      }
    };
    container.addEventListener('pointerdown', down);
    container.addEventListener('pointermove', move);
    container.addEventListener('pointerup', up);
    container.addEventListener('pointercancel', up);
    container.addEventListener('lostpointercapture', up);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastFinish: Finish = 'clay', lastReset = 0, time = 0, previous = 0, displayedMorph = 0, displayedOpen = 0;
    const hitBox = new THREE.Box3(), point = new THREE.Vector3();
    let lastHitInset = '';
    // Eight projected corners per mesh, not a per-frame vertex scan. Bounds
    // interpolate with the morph and follow rotations without a full-canvas overlay.
    const updateHitArea = () => {
      if (!model || !hitArea || drag) return;
      model.updateMatrixWorld(true);
      let left = 1, top = 1, right = -1, bottom = -1;
      const projectBox = (box: THREE.Box3, matrix: THREE.Matrix4) => {
        for (let i = 0; i < 8; i++) {
          point.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z)
            .applyMatrix4(matrix).project(camera);
          left = Math.min(left, point.x); right = Math.max(right, point.x);
          top = Math.min(top, -point.y); bottom = Math.max(bottom, -point.y);
        }
      };
      for (const { mesh, blob, folder } of hitMeshes) {
        hitBox.min.copy(blob.min).lerp(folder.min, displayedMorph);
        hitBox.max.copy(blob.max).lerp(folder.max, displayedMorph);
        projectBox(hitBox, mesh.matrixWorld);
      }
      if (displayedMorph > 0.85) {
        for (const mesh of [cover, ...papers]) {
          if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
          projectBox(mesh.geometry.boundingBox!, mesh.matrixWorld);
        }
      }
      const inset = [top + 1, 1 - right, 1 - bottom, left + 1]
        .map(edge => `${Math.max(0, edge * 50 - 1).toFixed(1)}%`).join(' ');
      if (inset !== lastHitInset) {
        hitArea.style.inset = inset;
        lastHitInset = inset;
      }
    };
    renderer.setAnimationLoop(now => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (document.hidden) return;
      if (lastFinish !== settings.current.finish) {
        lastFinish = settings.current.finish;
        const { label: _label, color, ...properties } = finishes[lastFinish];
        material.color.set(color);
        material.setValues(properties);
        coverMaterial.color.set(lastFinish === 'clay' ? '#582b85' : color).lerp(new THREE.Color('#c6a4e0'), lastFinish === 'clay' ? 0 : 0.2);
        coverMaterial.setValues(properties);
        coverMaterial.needsUpdate = true;
        grainUniform.value = lastFinish === 'clay' ? 0.22 : 0.025;
        material.needsUpdate = true;
      }
      if (lastReset !== settings.current.reset) {
        lastReset = settings.current.reset; yaw = restingYaw; pitch = restingPitch;
        targetYaw = restingYaw; targetPitch = restingPitch;
        yawVelocity = 0; pitchVelocity = 0; time = 0;
      }
      if (motion.matches) {
        yaw = drag ? targetYaw : restingYaw;
        pitch = drag ? targetPitch : restingPitch;
        yawVelocity = 0; pitchVelocity = 0;
      } else {
        const nextYaw = stepModelRotation(yaw, yawVelocity, drag ? targetYaw : restingYaw, delta, drag);
        const nextPitch = stepModelRotation(pitch, pitchVelocity, drag ? targetPitch : restingPitch, delta, drag);
        yaw = nextYaw.angle; yawVelocity = nextYaw.velocity;
        pitch = nextPitch.angle; pitchVelocity = nextPitch.velocity;
      }
      const animate = !motion.matches && !settings.current.paused;
      if (animate) time += delta;
      // A broader, slow studio-light sweep reveals the matte surface and panel edges.
      key.position.set(-2.4 + Math.sin(time * 0.4) * 3, 3.5 + Math.cos(time * 0.32), 3.5 + Math.sin(time * 0.26) * 0.7);
      key.intensity = 3.2 + Math.sin(time * 0.4) * 0.3;
      rim.position.set(3.5 + Math.cos(time * 0.34), 1.2 + Math.sin(time * 0.3) * 1.5, -0.6 + Math.sin(time * 0.34) * 1.6);
      rim.intensity = 2 + Math.sin(time * 0.34) * 0.35;
      fill.position.set(1 - Math.sin(time * 0.28) * 1.5, -2, 3);
      if (model) {
        const ease = motion.matches ? 1 : 1 - Math.exp(-delta * 9);
        displayedMorph = THREE.MathUtils.lerp(displayedMorph, THREE.MathUtils.smoothstep(settings.current.morph, 0, 1), ease);
        const openTarget = settings.current.morph > 0.8 ? Number(settings.current.folderOpen) : 0;
        displayedOpen = THREE.MathUtils.lerp(displayedOpen, openTarget, ease);
        model.traverse(child => {
          if (child instanceof THREE.Mesh && child.morphTargetInfluences) child.morphTargetInfluences[0] = displayedMorph;
        });
        details.visible = displayedMorph > 0.75;
        detailMaterial.opacity = THREE.MathUtils.smoothstep(displayedMorph, 0.82, 1);
        coverMaterial.opacity = THREE.MathUtils.smoothstep(displayedMorph, 0.75, 1);
        coverHinge.rotation.x = displayedOpen * 0.65;
        papers.forEach((paper, i) => {
          paper.position.x = [-0.5, 0.5, 0][i] * displayedOpen;
          paper.position.y = -0.02 + [0.52, 0.5, 0.77][i] * displayedOpen;
          paper.rotation.z = [0.2, -0.2, -0.07][i] * displayedOpen;
        });
        model.rotation.set(
          pitch + displayedMorph * (folderPitch + (animate ? Math.sin(time * 0.5) * 0.045 : 0)),
          yaw + displayedMorph * folderYaw,
          0,
        );
        model.position.y = animate ? Math.sin(time * 0.8) * 0.035 : 0;
      }
      updateHitArea();
      renderer.render(scene, camera);
    });
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      container.removeEventListener('pointerdown', down);
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerup', up);
      container.removeEventListener('pointercancel', up);
      container.removeEventListener('lostpointercapture', up);
      if (model) disposeModel(model);
      else disposeModel(details);
      material.dispose();
      detailMaterial.dispose();
      coverMaterial.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (lockOpenMorph && settings.current.folderOpen) {
        settings.current.morph = 1;
        setMorph(1);
        return;
      }
      if (settings.current.manualMorph) return;
      const { start, distance } = readHeroScrollRange();
      const value = THREE.MathUtils.clamp((window.scrollY - start) / distance, 0, 1);
      settings.current.morph = value;
      if (value < 0.8) { settings.current.folderOpen = false; setFolderOpen(false); }
      setMorph(value);
    };
    onScroll();
    const resumeScroll = () => { settings.current.manualMorph = false; };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', resumeScroll, { passive: true });
    window.addEventListener('touchmove', resumeScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const observer = new ResizeObserver(onScroll);
    const intro = document.querySelector('[data-hero-intro]');
    if (intro) observer.observe(intro);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', resumeScroll);
      window.removeEventListener('touchmove', resumeScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, [lockOpenMorph]);

  return { host, settings, finish, setFinish, paused, setPaused, status, morph, setMorph, folderOpen, setFolderOpen };
}
