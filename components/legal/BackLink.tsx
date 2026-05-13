"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * "Back" affordance for legal sub-pages. Pops the browser history so the user
 * lands wherever they came from (e.g. the work modal at `/work`). When the
 * page is the very first entry in the session — typical of a reviewer
 * following the Privacy URL straight from App Store Connect — falls back to
 * the home page so the link is never a dead-end.
 */
export function BackLink() {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.22em] font-light text-[var(--color-ink-faint)] outline-none transition-colors hover:text-white/85 focus-visible:text-white/85"
    >
      <ArrowLeft
        size={13}
        strokeWidth={1.5}
        className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5"
      />
      back
    </button>
  );
}
