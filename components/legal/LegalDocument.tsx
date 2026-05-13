import type { ReactNode } from "react";
import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { BackLink } from "@/components/legal/BackLink";

/**
 * Shared shell for hosted legal docs (privacy, terms, support pages that
 * the App Store and Play Store can link to). Same dark editorial chrome
 * as the rest of purpl.solutions, with serif body type, generous line
 * height, and section dividers tuned for long-form prose.
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
    <>
      <TopNav />
      <div className="relative z-[2] px-10 pt-5 max-sm:px-5 max-sm:pt-3">
        <BackLink />
      </div>
      <main className="relative z-[2] flex flex-1 flex-col items-center px-8 pt-10 pb-24 max-sm:px-6 max-sm:pt-8 max-sm:pb-16">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-[0.7rem] uppercase tracking-[0.22em] font-light text-[var(--color-ink-faint)]">
              {eyebrow}
            </span>
            <Title variant="display">{title}</Title>
            {lastUpdated && (
              <p className="text-[0.78rem] uppercase tracking-[0.18em] font-light text-[var(--color-ink-faint)]">
                Last updated · {lastUpdated}
              </p>
            )}
          </div>

          <div
            className="
              mt-14 max-sm:mt-10
              text-[0.95rem] md:text-[1.02rem] leading-[1.75] tracking-[0.005em] font-light
              text-[var(--color-ink-soft)]
              [&_h2]:mt-12 [&_h2]:mb-3
              [&_h2]:text-[0.72rem] [&_h2]:uppercase [&_h2]:tracking-[0.22em] [&_h2]:font-light [&_h2]:text-[var(--color-ink-faint)]
              [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-[1.02rem] [&_h3]:tracking-[0.005em] [&_h3]:font-normal [&_h3]:text-white/80
              [&_p]:mt-3
              [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
              [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
              [&_li>strong]:font-normal [&_li>strong]:text-white/85
              [&_a]:text-white/80 [&_a]:underline [&_a]:decoration-white/20 [&_a]:underline-offset-4 [&_a]:transition-[color,text-decoration-color]
              [&_a:hover]:text-white [&_a:hover]:decoration-white/60
              [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.9rem]
              [&_th]:text-left [&_th]:py-2.5 [&_th]:px-3 [&_th]:font-normal [&_th]:text-white/65 [&_th]:border-b [&_th]:border-[var(--color-line-soft)]
              [&_td]:py-2.5 [&_td]:px-3 [&_td]:border-b [&_td]:border-[var(--color-line-soft)] [&_td]:align-top
              [&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--color-line-soft)]
            "
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
