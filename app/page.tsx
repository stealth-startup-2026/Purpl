import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { VolleytubePreview } from "@/components/work/previews/VolleytubePreview";

export default function HomePage() {
  return (
    <>
      <TopNav />
      {/* main is pulled up under the fixed-height nav (pt-7 + h-10 logo =
         4.25rem; 3.25rem on mobile) and spans the full viewport, so the
         1fr/auto/1fr grid centres the hero on the true viewport centre line.
         Latest news flows into the lower track, below the centred hero. */}
      <main className="relative z-[2] -mt-[4.25rem] grid min-h-[100dvh] grid-rows-[1fr_auto_1fr] p-8 max-sm:-mt-[3.25rem]">
        <div aria-hidden="true" />

        <div className="flex flex-col items-center gap-3">
          <Title variant="display">purpl solutions</Title>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-[0.95rem] md:text-[1.1rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)] outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            we are taking on new clients.
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Latest news: a quiet preview pointing at the VolleyTube waitlist page. */}
        <section
          aria-label="Latest news"
          className="flex flex-col items-center gap-5 pt-16 max-sm:pt-12"
        >
          <span className="text-[0.72rem] tracking-[0.16em] font-light text-[var(--color-ink-faint)]">
            latest news
          </span>
          <Link
            href="/volleytube/waitlist"
            className="group flex flex-col items-center gap-3.5 outline-none"
          >
            {/* Render the preview at 2x then scale to 0.5 so the match card
               reads as a faithful miniature — same trick as the work modal. */}
            <div className="relative aspect-[16/10] w-[300px] max-sm:w-[240px] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
              >
                <VolleytubePreview />
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[0.95rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)] transition-colors group-hover:text-white group-focus-visible:text-white">
              volleytube waitlist
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
