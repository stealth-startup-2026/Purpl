import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./InnerwestPreview.module.css";

/**
 * Preview tile for Inner West Volley (client work, live at innerwestvolley.com.au).
 * Uses the homepage hero captured from the live site (1280x800 viewport @2x).
 */
export function InnerwestPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/innerwest/home.jpg"
        alt="Inner West Volleyball Club site, hero section"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
