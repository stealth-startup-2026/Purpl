import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "../work/previews/preview-base.module.css";

/**
 * Work-gallery tiles built from real device-framed VolleyTube screens, laid
 * out flat and side by side (no fan/overlap) so each screen's functionality
 * reads clearly. Sizing is height-based on the shared 16:10 tile, so phones
 * stay fully visible. `PhoneShowcase` is a drop-in `gallery` node;
 * `VolleytubeThumb` adds the App Store icon for the work-row thumbnail.
 */
export interface Phone {
  src: string;
  alt: string;
}

const ICON = "/volleytube/icon.png";

// Shared dark, faintly red-lit backdrop so the white app screens pop —
// layered over the tile's default gradient rather than overriding it, to
// dodge CSS-module specificity.
function Backdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #16111f 0%, #0b0910 100%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 85%, rgba(168,32,26,0.30), transparent 64%)",
        }}
      />
    </>
  );
}

const phoneShadow = "drop-shadow-[0_20px_36px_rgba(0,0,0,0.5)]";

export function PhoneShowcase({
  phones,
  className,
}: {
  phones: Phone[];
  className?: string;
}) {
  // Two phones can stand a little taller than three before they crowd the
  // tile width.
  const h = phones.length <= 2 ? "h-[88%]" : "h-[84%]";

  return (
    <div className={cn(base.tile, "isolate", className)}>
      <Backdrop />
      {/* Inner flex layer: the tile itself is `display:block` from the CSS
         module, so we lay the phones out in an absolutely-positioned flex
         row rather than fighting that with a `flex` utility on the tile. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-[3.5%] px-[4%]">
        {phones.map((p) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={620}
            height={1263}
            sizes="(min-width: 1024px) 200px, 120px"
            className={cn("w-auto", h, phoneShadow)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Work-row thumbnail: the App Store icon next to two app screens, on the same
 * branded backdrop. Distinct from the gallery tiles so the list row leads
 * with the brand mark.
 */
export function VolleytubeThumb({ phones }: { phones: [Phone, Phone] }) {
  return (
    <div className={cn(base.tile, "isolate")}>
      <Backdrop />
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-[6%] px-[5%]">
        <div className="aspect-square h-[48%] shrink-0 overflow-hidden rounded-[22.5%] ring-1 ring-white/15 shadow-[0_16px_34px_rgba(0,0,0,0.55)]">
          <Image
            src={ICON}
            alt="VolleyTube app icon"
            width={512}
            height={512}
            sizes="120px"
            className="h-full w-full object-cover"
          />
        </div>
        {phones.map((p) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={620}
            height={1263}
            sizes="120px"
            className={cn("h-[82%] w-auto", phoneShadow)}
          />
        ))}
      </div>
    </div>
  );
}
