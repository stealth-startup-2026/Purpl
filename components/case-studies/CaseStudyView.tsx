import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyDemo } from "./CaseStudyDemo";
import type { CaseStudy } from "./case-studies";

const ACCENT = "#cbb2ff"; // soft lavender pulled from the logo gradient

/**
 * Long-form editorial case study. Pure content (no overlay / nav chrome) so it
 * can render both inside the modal overlay and as a standalone page.
 */
export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto w-full max-w-[840px] px-8 pb-4 max-sm:px-6">
      {/* hero */}
      <header className="pt-6 pb-2">
        <div
          className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.24em]"
          style={{ color: ACCENT }}
        >
          {study.eyebrow}
        </div>
        <h1 className="font-extralight lowercase tracking-[var(--tracking-title)] text-white text-[clamp(2.8rem,8vw,5.5rem)] leading-[1]">
          {study.brand}
        </h1>
        <p className="mt-5 max-w-[600px] text-[clamp(1.1rem,2.4vw,1.4rem)] font-light leading-[1.5] text-[var(--color-ink-soft)]">
          {study.lede}
        </p>

        {study.meta.length > 0 && (
          <dl className="mt-12 grid grid-cols-4 gap-5 border-t border-[var(--color-line-soft)] pt-7 max-sm:grid-cols-2 max-sm:gap-6">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="mb-2 text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
                  {m.label}
                </dt>
                <dd className="text-[0.9rem] font-normal text-white">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {/* demo video (replaces the old screenshot frame) */}
      {study.demoVideoId && (
        <figure className="mt-12 mb-6">
          <CaseStudyDemo
            videoId={study.demoVideoId}
            poster={study.demoPoster}
            title={`${study.brand} product demo`}
          />
          {study.demoCaption && (
            <figcaption className="mt-3 text-[0.78rem] tracking-[0.04em] text-[var(--color-ink-faint)]">
              {study.demoCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* the problem */}
      <Section kicker={study.problem.kicker} heading={study.problem.heading}>
        {study.problem.paras.map((p, i) => (
          <Para key={i}>{p}</Para>
        ))}
      </Section>

      {/* quote */}
      {study.quote && (
        <figure className="my-12 border-l py-2 pl-7" style={{ borderColor: ACCENT }}>
          <blockquote className="text-[clamp(1.4rem,3.2vw,1.9rem)] font-extralight leading-[1.35] text-white">
            “{study.quote.text}”
          </blockquote>
          <figcaption className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
            {study.quote.by}
          </figcaption>
        </figure>
      )}

      {/* what we built */}
      <Section kicker={study.build.kicker} heading={study.build.heading}>
        {study.build.paras.map((p, i) => (
          <Para key={i}>{p}</Para>
        ))}
      </Section>

      {study.build.features.length > 0 && (
        <div className="my-9 grid grid-cols-2 border-t border-[var(--color-line-soft)] max-sm:grid-cols-1">
          {study.build.features.map((f, i) => (
            <div
              key={f.title}
              className={`border-b border-[var(--color-line-soft)] py-7 ${
                i % 2 === 0
                  ? "pr-8 max-sm:pr-0 sm:border-r sm:border-[var(--color-line-soft)]"
                  : "pl-8 max-sm:pl-0"
              }`}
            >
              <h3 className="mb-2 text-[1.05rem] font-normal lowercase text-white">{f.title}</h3>
              <p className="text-[0.92rem] font-light leading-[1.55] text-[var(--color-ink-soft)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* the outcome */}
      <Section kicker={study.outcome.kicker} heading={study.outcome.heading}>
        {study.outcome.paras.map((p, i) => (
          <Para key={i}>{p}</Para>
        ))}
      </Section>

      {study.outcome.stats.length > 0 && (
        <div className="my-10 grid grid-cols-3 gap-7 max-sm:grid-cols-1 max-sm:gap-6">
          {study.outcome.stats.map((s) => (
            <div key={s.label}>
              <div className="text-[clamp(2.2rem,5vw,3rem)] font-extralight leading-none tracking-[var(--tracking-title)] text-white">
                {s.value}
              </div>
              <div className="mt-3 text-[0.8rem] font-light leading-[1.45] text-[var(--color-ink-soft)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* cta */}
      <section className="mt-14 border-t border-[var(--color-line-soft)] pt-16 pb-6 text-center">
        <h2 className="mb-7 text-[clamp(1.6rem,4vw,2.4rem)] font-extralight lowercase tracking-[var(--tracking-title)] text-white">
          {study.ctaHeading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[0.85rem] lowercase tracking-[0.18em] text-white outline-none transition-all hover:border-white hover:bg-white hover:text-[var(--color-bg-deep)] focus-visible:border-white"
          >
            start a conversation <span aria-hidden="true">&rarr;</span>
          </Link>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 border-b border-white/25 pb-1 text-[0.85rem] font-light tracking-[0.04em] text-[var(--color-ink-soft)] outline-none transition-colors hover:border-white hover:text-white focus-visible:text-white"
            >
              {study.liveLabel ?? study.liveUrl}
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </section>
    </article>
  );
}

function Section({
  kicker,
  heading,
  children,
}: {
  kicker: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8">
      {kicker && (
        <div
          className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.24em]"
          style={{ color: ACCENT }}
        >
          {kicker}
        </div>
      )}
      {heading && (
        <h2 className="mb-5 text-[clamp(1.7rem,4.2vw,2.6rem)] font-extralight lowercase leading-[1.12] tracking-[var(--tracking-title)] text-white">
          {heading}
        </h2>
      )}
      {children}
    </section>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[1.02rem] font-light leading-[1.65] text-[var(--color-ink-soft)]">
      {children}
    </p>
  );
}
