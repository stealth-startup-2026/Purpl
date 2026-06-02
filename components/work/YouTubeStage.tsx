"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-play YouTube player used as a gallery stage item. Shows a poster
 * (a locally-hosted thumbnail, so no third-party request or layout shift on
 * open) with a frosted "glass" play button that matches the Purpl modal's
 * restrained aesthetic. The first click swaps the poster for a
 * youtube-nocookie embed that autoplays — YouTube itself is only loaded
 * after the click.
 *
 * State is intentionally local and uncontrolled: when the gallery switches to
 * another slot this component unmounts, so returning to the video resets it
 * back to the poster.
 */
export function YouTubeStage({
  youtubeId,
  poster,
  title,
}: {
  youtubeId: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group relative h-full w-full overflow-hidden bg-black outline-none"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-[rgba(8,5,20,0.18)] transition-colors group-hover:bg-[rgba(8,5,20,0.08)]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/45 bg-white/[0.16] backdrop-blur-md transition-transform duration-200 ease-out group-hover:scale-110 group-focus-visible:scale-110"
          style={{ WebkitBackdropFilter: "blur(6px)" }}
        >
          {/* Play triangle */}
          <span
            aria-hidden="true"
            className="ml-[5px] block h-0 w-0"
            style={{
              borderStyle: "solid",
              borderWidth: "11px 0 11px 19px",
              borderColor: "transparent transparent transparent #fff",
            }}
          />
        </span>
      </span>
    </button>
  );
}
