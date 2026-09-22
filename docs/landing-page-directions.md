# Purpl: ideas taking shape

## Brief

Prioritise impressive, intuitive composition on mobile and desktop: typography,
spacing, scrolling and clear project navigation. 3D supports those qualities.
The logo is the purple circular organic mark with the lower-right indentation,
not the thin wordmark. Preserve that distinguishing contour.

Latest direction: site-purple (#310c5d) matte clay, retaining the brand's
grain/static character, with gently moving light for depth. Explore a
native-scroll transition from the blob into the opening folder on `/work`,
including its tab and three sheets fanning out. This supersedes the file-icon
idea. Prioritise this over the alternate concepts below. Blender is permitted
if it improves the final form or motion.

Scrolling morphs the blob into a closed folder. Opening and closing requires
clicking/tapping the folder (or the labelled keyboard-accessible button).
The preferred treatment is restored: a lighter front cover (#582b85) and
darker back (#310c5d). The original blob stays the site's primary purple.
The folder uses two separate, closely spaced panels without a bottom fold,
giving the opening a layered, cascading appearance. The front opens about
37 degrees to keep the folder compact while exposing the sheets.
The back's lower edge is trimmed to align with the closed front panel; its
upper tab remains unchanged.
The resting view is slightly above and to the left (another 5 degrees left
from the initial angled view). Dragging rotates the
object; releasing returns it to that view with a softly underdamped spring.
Reduced-motion users get an immediate return without the overshoot.

## Model study

Visit `/lab/logo`. The rounded model is sampled from the existing logo image at
256 angles, with light smoothing of the pixel boundary. Its silhouette comes
from the source; the front/back volume is an artistic interpretation. Three
material studies are available: soft clay, purple resin and liquid metal.

Download `/models/purpl-pebble.glb`. Regenerate with
`node scripts/build-logo-model.mjs`. This is an initial form/material study,
not the complete proposed homepage. The root homepage now starts fresh with
a white background, the Inter wordmark “purpl solutions”, and the reusable
model only. `/lab/logo` remains available as the separate study.

The study now includes a blob-to-folder morph target and a scroll/slider
preview. The GLB contains the base shape and folder morph; the hinged cover,
paper sheets, procedural surface grain and lighting are currently added by
the browser scene and are not baked into the download. The study uses a pinned
stage so both endpoints can be inspected. Final homepage pacing should hand
off promptly into real project content.

## Directions to discuss

### 1. Ideas taking shape — recommended

A warm, nearly white canvas; oversized purple mark; a clear two-line headline
such as “Good ideas. Beautifully built.” A small studio descriptor explains
what Purpl does, with “View our work” and a contact link immediately visible.

The first scroll turns the shape slightly, showing its depth, then lets it
recede as the first project arrives. One deliberate handover, followed by
normal scrolling through substantial project previews. The object reinforces
the idea of turning an idea into something tangible.

Desktop: offset headline and shape share the opening composition. Mobile:
headline and primary link first, shape below, a glimpse of the next section
indicates there is more. Avoid a full-screen decorative introduction that
pushes the message out of view.

### 2. The purple window

Use the recognisable logo outline as a window onto the work. A purple sculptural
object gradually becomes a shape-framed project image, then expands into the
first case study as the user scrolls. It makes the logo part of navigation and
storytelling, rather than separate decoration.

Desktop: generous asymmetric composition and large imagery. Mobile: a centred
window, short headline and project name; the transition happens over a short
natural scroll. Links remain ordinary, labelled, tappable elements.

### 3. The studio shelf

A calm, editorial portfolio with a few large “objects”: the logo, one project
preview and one product icon. Strong spacing and shadows make the page feel
like a curated physical display. Small hover lifts on desktop; direct links
and full-width image panels on mobile. No horizontal scroll requirement.

This is the most work-first option and needs the least choreography. The logo
can reappear as a quiet bookend beside the final contact invitation.

## References inspected, September 2026

- [Lusion v3, Awwwards SOTD](https://www.awwwards.com/sites/lusion-v3),
  [live studio site](https://lusion.co/): tactile materials, reactive objects,
  and strong hierarchy between introduction and work. The live site can evolve
  independently of the awarded version. Borrow the hierarchy/material care,
  not its objects, typography, composition or animations.
- [Igloo Inc, Awwwards SOTD](https://www.awwwards.com/sites/igloo-inc),
  [live site](https://www.igloo.inc/): one coherent visual world. Useful as an
  art-direction reference, but its immersive navigation is not the proposed
  UX for Purpl.
- [constant performance, One Page Love](https://onepagelove.com/constant-performance):
  a focused 3D hero within an agency portfolio. Reference for the scope of the
  visual statement; not a layout to reproduce.
- [Flowcard, One Page Love](https://onepagelove.com/flowcard): one object moves
  between sections as you scroll. Useful continuity principle for the logo's
  handover into project content. This is a featured template, not an Awwwards
  winner; do not copy its implementation or assets.

## Shared UX rules

- Explain the studio and expose the primary action immediately.
- Use native scrolling. Avoid loaders, forced tours, mandatory dragging and
  long pinned sequences before visitors can reach work.
- Establish a consistent spacing rhythm; let project imagery carry detail.
- Keep all meaningful content and links outside the 3D canvas.
- Make touch targets at least 44px; do not hide information behind hover.
- Compose mobile deliberately rather than shrinking the desktop arrangement.
- Reduced motion gets the same content and a composed static logo.
- Use the existing mark as a fallback if WebGL is unavailable in the final
  homepage implementation. The current study reports errors instead.
- Keep the exploration controls in the lab, not in the final homepage.

Next design decision: choose between a sculptural hero (1), a logo-shaped
project reveal (2), or a restrained editorial showcase (3). Develop one mobile
and desktop composition before adding further motion.
