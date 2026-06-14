import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "purpl solutions — software solutions and web design services",
  description: "Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.",
};
import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { DotGrid } from "@/components/DotGrid";
import { VolleytubeAppIcon } from "@/components/volleytube/AppIcon";

export default function HomePage() {
  return (
    <>
      {/* Interactive dot-grid background — landing page only. Sits at z-0,
         under the grain (z-1) and content (z-2+). */}
      <DotGrid />
      <TopNav />
      {/* main is pulled up under the fixed-height nav (pt-7 + h-10 logo =
         4.25rem; 3.25rem on mobile) and spans the full viewport, so the
         1fr/auto/1fr grid centres the hero on the true viewport centre line.
         Latest news flows into the lower track, below the centred hero. */}
      <main className="pointer-events-none relative z-[2] -mt-[4.25rem] grid min-h-[100dvh] grid-rows-[1fr_auto_1fr] p-8 max-sm:-mt-[3.25rem]">
        <div aria-hidden="true" />

        <div className="flex flex-col items-center gap-3">
          <Title variant="display">purpl solutions</Title>
          <Link
            href="/contact"
            className="group pointer-events-auto inline-flex items-center gap-1.5 text-[0.95rem] md:text-[1.1rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)] outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            we are taking on new clients.
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Latest news: VolleyTube App Store launch. */}
        <section
          aria-label="Latest news"
          className="flex flex-col items-center gap-5 pt-16 max-sm:pt-12"
        >
          <span className="text-[0.85rem] tracking-[0.16em] font-light text-[var(--color-ink-faint)]">
            latest news
          </span>
          <Link
            href="/volleytube"
            className="group pointer-events-auto flex flex-row items-center gap-3.5 outline-none transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1"
          >
            <VolleytubeAppIcon className="w-14 max-sm:w-12" />
            <span className="inline-flex items-center gap-2 text-[1.5rem] max-sm:text-[1.3rem] font-light tracking-[0.01em] text-[var(--color-ink-soft)] transition-colors group-hover:text-white group-focus-visible:text-white">
              download volleytube on the app store now
              <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        </section>
      </main>
    </>
  );
}
