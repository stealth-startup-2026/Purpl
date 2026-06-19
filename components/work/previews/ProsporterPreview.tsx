import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProsporterPreview.module.css";

/**
 * Preview tile for ProSporter Australia (client work, coming soon).
 * Uses the actual store homepage hero screenshot stored under /public.
 * Not clickable; hover shows the "coming soon" overlay.
 */
export function ProsporterPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/prosporter.png"
        alt="ProSporter store homepage, hero section"
        width={1280}
        height={800}
        className={styles.image}
        priority
      />
    </div>
  );
}
