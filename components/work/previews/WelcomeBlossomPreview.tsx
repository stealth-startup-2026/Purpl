import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./WelcomeBlossomPreview.module.css";

/**
 * Preview tile for Welcome Blossom (client work, live at welcomeblossom.com.au).
 * Uses the homepage hero captured from the live site (1280x800 viewport @2x).
 */
export function WelcomeBlossomPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/welcome-blossom/home.jpg"
        alt="Welcome Blossom site, hero with the watercolour flower arch and logo"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
