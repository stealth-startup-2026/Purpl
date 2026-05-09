import Image from "next/image";
import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";

export function LunchDossierPreview() {
  return (
    <div className={cn(base.tile)}>
      <Image
        src="/projects/lunch-dossier.png"
        alt="The Lunch Dossier app screenshot"
        width={1387}
        height={811}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
}
