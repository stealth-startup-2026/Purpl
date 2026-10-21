import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./ProvolleyPreview.module.css";

/**
 * Preview tile for ProVolley Academy (client work, live at provolley.com.au).
 * The home page on desktop and phone, captured from the live site and framed on
 * a soft ground (desktop 1440x900 @2x, phone 390x844 @3x).
 */
export function ProvolleyPreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <Image
        src="/projects/provolley/responsive.jpg"
        alt="ProVolley home page on desktop and phone"
        width={2560}
        height={1600}
        className={styles.image}
        priority
      />
    </div>
  );
}
