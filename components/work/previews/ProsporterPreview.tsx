import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProsporterPreview.module.css";

/**
 * Preview tile for ProSporter (client work, live at prosporter.com.au).
 * The home page on desktop and phone, captured from the live site and framed on
 * a ground in the brand colour (desktop 1440x900 @2x, phone 390x844 @3x).
 */
export function ProsporterPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/prosporter/responsive.jpg"
        alt="ProSporter home page on desktop and phone"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
