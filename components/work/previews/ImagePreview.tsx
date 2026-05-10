import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";

/**
 * Generic preview tile that renders a single screenshot as the project
 * preview. Use this for gallery slots that come from real captured app
 * screenshots rather than hand-built React mockups.
 */
export function ImagePreview({
  src,
  alt,
  width,
  height,
  background = "#ffffff",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Fill colour shown around the screenshot when its aspect doesn't match
   * the 16:10 tile. Defaults to white so app screenshots with white page
   * backgrounds blend seamlessly. Override with a colour matching the
   * screenshot's edge for non-white themes.
   */
  background?: string;
}) {
  return (
    <div className={cn(base.tile)} style={{ background }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        // object-contain so the full screenshot is always visible. The
        // surrounding background colour matches the screenshot's edge so
        // the contain "bars" disappear visually, making the screenshot
        // appear to fill the entire tile.
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}
