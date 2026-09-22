# Purpl model + interaction — v1

Saved September 22, 2026. This package contains the approved interactive model,
without the study's text, sliders, material controls or navigation.

## Contents

- `components/brand/PurplModel.tsx`: renderable React component, including
  keyboard interaction and a static logo fallback.
- `components/brand/PurplModel.module.css`: responsive canvas sizing.
- `components/brand/usePurplModel.ts`: Three.js scene, matte grain, studio
  lighting, scroll morph, click/tap opening, drag and elastic return.
- `public/models/purpl-pebble.glb`: logo geometry plus the folder-back morph.
- `public/brand/purpl_grain_transparent.png`: original outline and fallback.
- `scripts/build-logo-model.mjs`: reproducible asset generator.

The GLB by itself does not contain the complete interactive folder. Its cover,
three paper sheets, lights and procedural grain are built by the scene code.
Keep the component, hook and model together to preserve the full appearance
and behaviour. The archive is the complete reusable source package.

## Use in a Next.js / React project

Tested here with Next.js 15.5.15, React 19, Three.js 0.186.0 and
`@types/three` 0.186.0. Copy the directories above into the project, and install
`three` plus `@types/three`. The component imports `next/image`; outside Next.js,
replace only that fallback image with a normal image element.

```tsx
import { PurplModel } from './components/brand/PurplModel';

export default function Example() {
  return (
    <main style={{ minHeight: '190svh', background: '#fff' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', display: 'grid', placeItems: 'center' }}>
        <PurplModel />
      </div>
    </main>
  );
}
```

The scene listens to page scrolling; start this section at the top of the page.
The initial 90% of one viewport of scroll morphs the logo into a closed folder.
Click/tap the folder to open/close. Drag horizontally on touch screens to
rotate while retaining native vertical scrolling. Release to spring back to
the view from slightly above and to the left. Keyboard: focus the model, Enter
or Space to form the folder, then open/close; Escape to close and reset the view.

Reduced-motion preferences disable ambient motion and elastic overshoot.
Offscreen tab rendering is skipped. WebGL failure displays the original logo.
The page has no UI controls; additional material options remain internal to
the shared hook for the separate `/lab/logo` study.

## Art direction

- Background: #FFFFFF.
- Logo / folder back: #310C5D.
- Front cover: #582B85.
- Matte, nonmetallic finish with fine procedural grain.
- Two separate panels; no bottom spine or rounded fold.
- Closed lower edges align; the cover opens about 37 degrees.
- The page's separate wordmark uses Inter 500 with tight letter spacing.

Regenerate the GLB using `node scripts/build-logo-model.mjs`; regeneration also
requires `sharp`, which is already present through Next.js in this repository.
The ZIP is a versioned snapshot, so future component edits do not change v1.
