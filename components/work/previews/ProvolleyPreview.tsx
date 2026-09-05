import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProvolleyPreview.module.css";

/**
 * Preview tile for ProVolley Academy (client work, live at provolley.com.au).
 * Uses the homepage hero captured from the live site (1280x800 viewport @2x).
 */
export function ProvolleyPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/provolley/home.jpg"
        alt="ProVolley Academy site, hero section"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
