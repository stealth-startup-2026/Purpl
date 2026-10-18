import base from "./preview-base.module.css";

// The bay sits on the floor grid's own axes (one cell = 15 x 3.75 along each
// diagonal), two cells wide and one deep, centred on the floor at (80, 80).
const FL: [number, number] = [57.5, 78.125];
const FR: [number, number] = [87.5, 85.625];
const BR: [number, number] = [102.5, 81.875];
const BL: [number, number] = [72.5, 74.375];
const BAY_HEIGHT = 55;

const shelf = (h: number) =>
  `M${[FL, FR, BR, BL].map(([x, y]) => `${x} ${y - h}`).join(" L")} Z`;
const uprights = (corners: [number, number][]) =>
  corners.map(([x, y]) => `M${x} ${y} V${y - BAY_HEIGHT}`).join(" ");

/**
 * Preview tile for the 3D configurator (client work, in progress).
 * A half-built, line-drawn shelving bay on a neutral ground: solid parts are
 * placed, dashed parts are still to come. Stands in until there are
 * screenshots we can show publicly.
 */
export function ConfiguratorPreview() {
  return (
    <div className={base.tile} aria-hidden="true" style={{ background: "linear-gradient(160deg, #f6f5f2 0%, #e8e6e1 100%)", containerType: "inline-size" }}>
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="#2b2a28"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Floor grid */}
        <g strokeOpacity="0.12">
          <path d="M20 80 L80 95 L140 80 L80 65 Z" />
          <path d="M50 72.5 L110 87.5 M35 76.25 L95 91.25 M65 68.75 L125 83.75" />
          <path d="M50 87.5 L110 72.5 M35 83.75 L95 68.75 M65 91.25 L125 76.25" />
        </g>
        {/* Uprights: front pair placed, back pair still to come */}
        <path d={uprights([FL, FR])} strokeOpacity="0.85" />
        <path d={uprights([BL, BR])} strokeOpacity="0.35" strokeDasharray="1.5 2" />
        {/* Shelves: lower two placed, upper two still to come */}
        {[0, 15].map((h) => (
          <path key={h} d={shelf(h)} fill="#2b2a28" fillOpacity={0.06} strokeOpacity="0.85" />
        ))}
        {[30, 45].map((h) => (
          <path key={h} d={shelf(h)} strokeOpacity="0.35" strokeDasharray="1.5 2" />
        ))}
      </svg>
      {/* Sized to the tile (cqw), so it reads the same on cards, thumbnails and full size. */}
      <span className="absolute top-[7%] left-[5.5%] font-[family-name:var(--font-jetbrains)] text-[clamp(10px,2.6cqw,20px)] font-medium uppercase tracking-[0.16em] text-[#2b2a28]/80">
        work in progress
      </span>
    </div>
  );
}
