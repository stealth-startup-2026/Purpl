import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * VolleyTube's App Store logo, rendered as an iOS-style rounded app icon.
 * Used as the visual on the homepage "latest news" preview and the waitlist
 * hero, in place of the in-build match-card mockup.
 */
export function VolleytubeAppIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-[22.5%] ring-1 ring-white/10 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <Image
        src="/volleytube/icon.png"
        alt="VolleyTube app icon"
        width={512}
        height={512}
        sizes="(min-width: 1024px) 320px, 240px"
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
