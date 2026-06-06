import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./InnerwestPreview.module.css";

/**
 * Preview tile for Inner West Volleyball Club (client work, coming soon).
 * Uses the actual landing-page screenshot stored under /public.
 * Not clickable; hover shows the "coming soon" overlay.
 */
export function InnerwestPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/innerwest.png"
        alt="Inner West Volleyball Club site, hero section"
        width={1280}
        height={800}
        className={styles.image}
        priority
      />
    </div>
  );
}
