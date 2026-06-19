"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-play stage for a self-hosted video (sibling of YouTubeStage). Shows
 * a poster with the same frosted glass play button, then swaps to a native
 * <video> that autoplays with controls. No third-party embed, so no YouTube
 * branding or suggested-video chrome in the modal.
 *
 * Self-host is primary. If the <video> errors (codec/format unsupported, file
 * missing) AND a `fallbackYoutubeId` is provided, it swaps to a youtube-nocookie
 * embed so the demo still plays. The fallback is dormant until an id is set.
 *
 * State is local and uncontrolled: switching gallery slots unmounts this, so
 * returning to the video resets it back to the poster.
 */
export function VideoStage({
  src,
  poster,
  title,
  fallbackYoutubeId,
}: {
  src: string;
  poster: string;
  title: string;
  fallbackYoutubeId?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Self-hosted file failed to load — fall back to YouTube if we have an id.
  if (failed && fallbackYoutubeId) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${fallbackYoutubeId}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  if (playing) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        onError={() => setFailed(true)}
        className="h-full w-full bg-black object-cover"
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
