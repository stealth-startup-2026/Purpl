import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProvolleyPreview.module.css";

/**
 * Preview tile for ProVolley Academy (client work, coming soon).
 * Uses the actual landing-page screenshot stored under /public.
 * Not clickable; hover shows the "coming soon" overlay.
 */
export function ProvolleyPreview() {
  return (
    <div
      className={cn(base.tile, base.tileStatic, base.comingSoon, styles.tile)}
      aria-label="ProVolley Academy, coming soon"
      tabIndex={0}
    >
      <Image
        src="/provolley.png"
        alt="ProVolley Academy site, hero section"
        width={1027}
        height={642}
        className={styles.image}
        priority
      />
    </div>
  );
}
