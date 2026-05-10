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
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className={cn(base.tile)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
