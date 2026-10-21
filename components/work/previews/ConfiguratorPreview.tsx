import base from "./preview-base.module.css";

// Wireframe palette: one ink on a pale ground, with grey blocks for stock.
const GROUND = "#eeefed";
const LINE = "#1d1e21";
const BLOCK = "#c9cbc7";
const TOP = "#e2e3df";
const SIDE = "#a9aba7";

// A front-on (oblique) view, so the shelves face the viewer: x runs across the
// screen, depth d recedes up and to the right, height h goes straight up.
// Origin placed so the drawing sits centred in the area below the banner.
const ORIGIN = [76.8, 84];
const DEPTH = [0.45, -0.35];
const at = (x: number, d: number, h = 0) =>
  `${ORIGIN[0] + x + d * DEPTH[0]} ${ORIGIN[1] - h + d * DEPTH[1]}`;

// The bay: two grid cells wide, one deep, centred on the floor grid.
const CELL = 15;
const WIDE = [-CELL, CELL];
const DEEP = [0, 14];
const BAY_HEIGHT = 55;

const shelf = (h: number) =>
  `M${at(WIDE[0], DEEP[0], h)} L${at(WIDE[1], DEEP[0], h)} L${at(WIDE[1], DEEP[1], h)} L${at(WIDE[0], DEEP[1], h)} Z`;
// Uprights stand at the back only; the shelves cantilever forward from them.
const uprights = WIDE.map((x) => `M${at(x, DEEP[1])} L${at(x, DEEP[1], BAY_HEIGHT)}`).join(" ");
const rail = (h: number) => `M${at(WIDE[0], DEEP[1], h)} L${at(WIDE[1], DEEP[1], h)}`;
const floorGrid = () => {
  const [x0, x1, d0, d1] = [-3 * CELL, 3 * CELL, -14, 28];
  const across = [d0, 0, DEEP[1], d1].map((d) => `M${at(x0, d)} L${at(x1, d)}`);
  const back = Array.from({ length: 7 }, (_, i) => x0 + i * CELL).map((x) => `M${at(x, d0)} L${at(x, d1)}`);
  return [...across, ...back].join(" ");
};
// A box of stock on the shelf at height h: x is its left edge, set back d.
const stock = (h: number, x: number, w: number, height: number, d = 3, depth = 7) => ({
  front: `M${at(x, d, h)} L${at(x + w, d, h)} L${at(x + w, d, h + height)} L${at(x, d, h + height)} Z`,
  top: `M${at(x, d, h + height)} L${at(x + w, d, h + height)} L${at(x + w, d + depth, h + height)} L${at(x, d + depth, h + height)} Z`,
  side: `M${at(x + w, d, h)} L${at(x + w, d + depth, h)} L${at(x + w, d + depth, h + height)} L${at(x + w, d, h + height)} Z`,
});

/**
 * Preview tile for the 3D configurator (client work, in progress).
 * A half-built, line-drawn shelving bay on a floor grid, seen front-on: the
 * back frame and lower shelves are placed, dashed shelves are still to come.
 * Stands in until there are screenshots we can show publicly.
 */
export function ConfiguratorPreview() {
  return (
    <div className={base.tile} aria-hidden="true" style={{ background: GROUND, containerType: "inline-size" }}>
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke={LINE}
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={floorGrid()} strokeOpacity="0.14" />
        {/* Back frame: uprights and rails, placed */}
        <path d={`${uprights} ${rail(30)} ${rail(45)}`} strokeOpacity="0.9" />
        {/* Shelves: lower two placed, upper two still to come */}
        {[0, 15].map((h) => (
          <path key={h} d={shelf(h)} fill={LINE} fillOpacity={0.05} strokeOpacity="0.9" />
        ))}
        {[30, 45].map((h) => (
          <path key={h} d={shelf(h)} strokeOpacity="0.35" strokeDasharray="1.5 2" />
        ))}
        {/* Stock on the placed shelves */}
        {[stock(15, -12, 10, 6), stock(15, 1, 8, 4), stock(0, -6, 13, 7)].map(({ front, top, side }) => (
          <g key={front} stroke="none">
            <path d={side} fill={SIDE} />
            <path d={top} fill={TOP} />
            <path d={front} fill={BLOCK} />
          </g>
        ))}
      </svg>
      {/* Status banner across the top, in the title purple. Sized to the tile
          (cqw), so it reads the same on cards, thumbnails and full size. */}
      <div className="absolute inset-x-0 top-0 flex h-[13%] items-center bg-[#310c5d] px-[5%] font-[family-name:var(--font-inter)] text-[clamp(11px,3cqw,22px)] font-medium tracking-[-0.01em] text-white">
        work in progress
      </div>
    </div>
  );
}
