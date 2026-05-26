import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Three real VolleyTube app screens (home, results, videos) laid out flat and
 * side by side to show different states of the app. Used as the waitlist hero
 * visual in place of the in-build match-card mockup.
 */
const screens = [
  {
    src: "/volleytube/screens/home.png",
    alt: "VolleyTube home screen showing the day's matches",
  },
  {
    src: "/volleytube/screens/results.png",
    alt: "VolleyTube results screen for PVL Premier Men",
  },
  {
    src: "/volleytube/screens/videos.png",
    alt: "VolleyTube videos feed",
  },
];

export function VolleytubeAppScreens({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end justify-center gap-3 max-sm:gap-2", className)}>
      {screens.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={620}
          height={1263}
          sizes="(min-width: 1024px) 160px, 110px"
          priority
          className="h-auto w-1/3 drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
        />
      ))}
    </div>
  );
}
