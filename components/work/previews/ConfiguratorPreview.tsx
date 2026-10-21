import base from "./preview-base.module.css";

// Wireframe palette: one ink on a pale ground, with grey blocks for stock.
const GROUND = "#eeefed";
const PAGE = "#fbfbfa";
const LINE = "#1d1e21";
const BLOCK = "#c9cbc7";
const TOP = "#e2e3df";
const SIDE = "#a9aba7";

// A front-on (oblique) view, so shelves face the viewer: x runs across the
// screen, depth d recedes up and to the right, height h goes straight up.
const DEPTH = [0.45, -0.35];
const CELL = 15;
const DEEP = 14;

type Stock = [h: number, x: number, w: number, height: number];
type Fixture = {
  origin: [number, number];
  scale: number;
  /** x of each upright; bays sit between neighbours. */
  uprights: number[];
  height: number;
  rails: number[];
  placed: number[];
  todo?: number[];
  stock: Stock[];
};

function draw({ origin: [ox, oy], scale: s, uprights, height, rails, placed, todo = [], stock }: Fixture) {
  const at = (x: number, d: number, h = 0) =>
    `${(ox + (x + d * DEPTH[0]) * s).toFixed(2)} ${(oy - (h - d * DEPTH[1]) * s).toFixed(2)}`;
  const [left, right] = [uprights[0], uprights[uprights.length - 1]];
  const shelf = (h: number) => `M${at(left, 0, h)} L${at(right, 0, h)} L${at(right, DEEP, h)} L${at(left, DEEP, h)} Z`;
  // Uprights stand at the back only; the shelves cantilever forward from them.
  const frame = [
    ...uprights.map((x) => `M${at(x, DEEP)} L${at(x, DEEP, height)}`),
    ...rails.map((h) => `M${at(left, DEEP, h)} L${at(right, DEEP, h)}`),
  ].join(" ");
  const box = ([h, x, w, bh]: Stock, d = 3, depth = 7) => ({
    front: `M${at(x, d, h)} L${at(x + w, d, h)} L${at(x + w, d, h + bh)} L${at(x, d, h + bh)} Z`,
    top: `M${at(x, d, h + bh)} L${at(x + w, d, h + bh)} L${at(x + w, d + depth, h + bh)} L${at(x, d + depth, h + bh)} Z`,
    side: `M${at(x + w, d, h)} L${at(x + w, d + depth, h)} L${at(x + w, d + depth, h + bh)} L${at(x + w, d, h + bh)} Z`,
  });
  const stroke = 0.7 * Math.max(s, 0.6);
  return {
    floor: (cells: number) => {
      const [x0, x1] = [-cells * CELL, cells * CELL];
      const across = [-DEEP, 0, DEEP, 2 * DEEP].map((d) => `M${at(x0, d)} L${at(x1, d)}`);
      const back = Array.from({ length: cells * 2 + 1 }, (_, i) => x0 + i * CELL).map((x) => `M${at(x, -DEEP)} L${at(x, 2 * DEEP)}`);
      return <path d={[...across, ...back].join(" ")} strokeOpacity="0.14" strokeWidth={stroke} />;
    },
    body: (
      <>
        <path d={frame} strokeOpacity="0.9" strokeWidth={stroke} />
        {placed.map((h) => (
          <path key={h} d={shelf(h)} fill={LINE} fillOpacity={0.05} strokeOpacity="0.9" strokeWidth={stroke} />
        ))}
        {todo.map((h) => (
          <path key={h} d={shelf(h)} strokeOpacity="0.35" strokeWidth={stroke} strokeDasharray={`${1.5 * s} ${2 * s}`} />
        ))}
        {stock.map((item) => {
          const { front, top, side } = box(item);
          return (
            <g key={front} stroke="none">
              <path d={side} fill={SIDE} />
              <path d={top} fill={TOP} />
              <path d={front} fill={BLOCK} />
            </g>
          );
        })}
      </>
    ),
  };
}

// Being configured: a single bay, half built on the floor grid.
const configuring = draw({
  origin: [86, 158],
  scale: 1.05,
  uprights: [-CELL, CELL],
  height: 55,
  rails: [30, 45],
  placed: [0, 15],
  todo: [30, 45],
  stock: [[15, -12, 10, 6], [15, 1, 8, 4], [0, -6, 13, 7]],
});

// On the website: a finished, wider two-bay run, fully stocked.
const finished = draw({
  origin: [244, 120],
  scale: 0.5,
  uprights: [-2 * CELL, 0, 2 * CELL],
  height: 62,
  rails: [62],
  placed: [0, 16, 32, 48],
  stock: [
    [0, -27, 12, 9], [0, -12, 9, 6], [0, 4, 14, 9], [0, 21, 7, 5],
    [16, -26, 8, 7], [16, -15, 13, 5], [16, 5, 9, 8], [16, 17, 10, 6],
    [32, -27, 10, 5], [32, -13, 8, 8], [32, 3, 12, 6], [32, 18, 9, 8],
    [48, -24, 14, 6], [48, 6, 8, 7], [48, 17, 11, 5],
  ],
});

// A browser window showing the website for the range.
const SITE = { x: 176, y: 52, w: 124, h: 120, bar: 9 };
const text = (x: number, y: number, widths: number[]) =>
  widths.map((w, i) => (
    <rect key={i} x={x} y={y + i * 4.2} width={w} height="2.2" rx="0.8" fill={LINE} fillOpacity={i === 0 ? 0.85 : 0.25} />
  ));

/**
 * Preview tile for the 3D configurator and website (client work, in progress).
 * Left, a single shelving bay half built on a floor grid, as in the
 * configurator: placed parts solid, parts still to come dashed. Right, the
 * website for the range, with a finished fixture in its looping hero footage.
 * Stands in until there are screenshots we can show publicly.
 */
export function ConfiguratorPreview() {
  const { x, y, w, h, bar } = SITE;
  return (
    <div className={base.tile} aria-hidden="true" style={{ background: GROUND, containerType: "inline-size" }}>
      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke={LINE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {configuring.floor(3)}
        {configuring.body}

        <rect x={x} y={y + 2.5} width={w} height={h} rx="3" fill="#000" fillOpacity="0.06" stroke="none" />
        <rect x={x} y={y} width={w} height={h} rx="3" fill={PAGE} strokeOpacity="0.9" strokeWidth="0.7" />
        <path d={`M${x} ${y + bar} H${x + w}`} strokeOpacity="0.25" strokeWidth="0.6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={x + 5 + i * 4} cy={y + bar / 2} r="1.1" fill={LINE} fillOpacity="0.35" stroke="none" />
        ))}
        {/* Hero footage: the finished fixture, with a play mark for the loop */}
        <rect x={x + 7} y={y + 16} width={w - 14} height="58" rx="1.5" fill={TOP} stroke="none" />
        {finished.body}
        <circle cx={x + 18} cy={y + 66} r="5" fill={PAGE} fillOpacity="0.9" stroke="none" />
        <path d={`M${x + 16.6} ${y + 63.6} L${x + 20.6} ${y + 66} L${x + 16.6} ${y + 68.4} Z`} fill={LINE} fillOpacity="0.8" stroke="none" />
        <g stroke="none">{text(x + 7, y + 82, [62, 84, 70])}</g>
        <rect x={x + 7} y={y + 98} width="26" height="9" rx="1.5" fill={LINE} fillOpacity="0.85" stroke="none" />
        <rect x={x + 36} y={y + 98} width="26" height="9" rx="1.5" strokeOpacity="0.5" strokeWidth="0.6" />
      </svg>
      {/* Status banner across the top, in the title purple. Sized to the tile
          (cqw), so it reads the same on cards, thumbnails and full size. */}
      <div className="absolute inset-x-0 top-0 flex h-[13%] items-center bg-[#310c5d] px-[5%] font-[family-name:var(--font-inter)] text-[clamp(11px,3cqw,22px)] font-medium tracking-[-0.01em] text-white">
        work in progress
      </div>
    </div>
  );
}
