import type { ReactNode } from "react";
import { ContentPage } from "@/components/brand/ContentPage";
import { BackLink } from "@/components/legal/BackLink";

/**
 * Shared shell for hosted legal docs (privacy, terms, support pages that
 * the App Store and Play Store can link to). Uses the portfolio's white
 * content page, with prose styles tuned for long-form legal text.
 */
export function LegalDocument({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <ContentPage eyebrow={eyebrow} title={title}>
      <div className="-mt-8 mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 max-sm:-mt-4">
        <BackLink />
        {lastUpdated && (
          <p className="text-[0.72rem] uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
            Last updated · {lastUpdated}
          </p>
        )}
      </div>

      <div
        className="
          max-w-[740px]
          text-[0.95rem] md:text-[1.02rem] leading-[1.8] text-[var(--color-ink-soft)]
          [&_h2]:mt-12 [&_h2]:mb-3
          [&_h2]:text-[0.75rem] [&_h2]:uppercase [&_h2]:tracking-[0.1em] [&_h2]:font-semibold [&_h2]:text-[var(--color-ink)]
          [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-[1.02rem] [&_h3]:font-medium [&_h3]:text-[var(--color-ink)]
          [&_p]:mt-3
          [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
          [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
          [&_strong]:font-medium [&_strong]:text-[var(--color-ink)]
          [&_a]:text-[var(--color-ink)] [&_a]:underline [&_a]:decoration-[var(--color-line)] [&_a]:underline-offset-4 [&_a]:transition-[text-decoration-color]
          [&_a:hover]:decoration-[var(--color-ink)]
          [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.9rem]
          [&_th]:text-left [&_th]:py-2.5 [&_th]:px-3 [&_th]:font-medium [&_th]:text-[var(--color-ink)] [&_th]:border-b [&_th]:border-[var(--color-line-soft)]
          [&_td]:py-2.5 [&_td]:px-3 [&_td]:border-b [&_td]:border-[var(--color-line-soft)] [&_td]:align-top
          [&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--color-line-soft)]
        "
      >
        {children}
      </div>
    </ContentPage>
  );
}
