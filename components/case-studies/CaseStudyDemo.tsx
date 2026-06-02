"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-play YouTube facade. Shows the video thumbnail with a play button
 * and only loads the (heavy) youtube-nocookie iframe once the user clicks, so
 * the case study stays fast. Mirrors CAAT's own landing-page DemoPlayer,
 * restyled into the purpl palette.
 */
export function CaseStudyDemo({
  videoId,
  title,
  poster,
}: {
  videoId: string;
  title: string;
  /**
   * Optional locally-hosted poster. When set it avoids the third-party
   * i.ytimg.com request and the layout shift it can cause. Falls back to
   * YouTube's maxres thumbnail when omitted, so existing callers are
   * unaffected.
   */
  poster?: string;
}) {
  const [activated, setActivated] = useState(false);
  const thumb = poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  if (activated) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-line-soft)] bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`play ${title}`}
      className="group relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-line-soft)] bg-black outline-none focus-visible:ring-1 focus-visible:ring-white/40"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#1e0838]/70 via-transparent to-transparent transition-colors group-hover:from-[#1e0838]/50" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/20">
          <Play size={26} strokeWidth={1.5} fill="currentColor" className="ml-0.5" />
        </span>
      </span>
    </button>
  );
}
