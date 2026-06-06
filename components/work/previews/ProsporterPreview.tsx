import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";

/**
 * Preview tile for ProSporter Australia (client work, coming soon).
 * No screenshot yet, so this is the default empty coming-soon placeholder,
 * identical to the other coming-soon slots. Swap in a real landing-page
 * screenshot under /public once the build is live.
 */
export function ProsporterPreview() {
  return (
    <div className={cn(base.tile)} aria-hidden="true">
      <span className="absolute inset-0 z-0 flex items-center justify-center text-[0.7rem] font-light tracking-[0.22em] text-white/40 uppercase">
        coming soon
      </span>
    </div>
  );
}
