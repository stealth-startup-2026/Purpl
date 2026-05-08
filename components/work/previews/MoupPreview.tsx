import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";

export function MoupPreview() {
  return (
    <div className={cn(base.tile)}>
      <Image
        src="/moup-hero.png"
        alt="moup app screenshot"
        width={1332}
        height={888}
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
