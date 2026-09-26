import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProsporterPreview.module.css";

/**
 * Preview tile for ProSporter (client work, live at prosporter.com.au).
 * Uses the homepage hero captured from the live site (1280x800 viewport @2x).
 */
export function ProsporterPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/prosporter/home.jpg"
        alt="ProSporter store homepage, hero section"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
