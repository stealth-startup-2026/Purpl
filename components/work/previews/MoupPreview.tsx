import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";

export function MoupPreview() {
  return (
    <a
      className={cn(base.tile, base.tileLink)}
      href="https://moup.app"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit moup at moup.app"
    >
      <Image
        src="/moup-hero.png"
        alt="moup app screenshot"
        fill
        style={{ objectFit: "cover", objectPosition: "top left" }}
      />
    </a>
  );
}
