import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/TopNav";
import { CaseStudyView } from "@/components/case-studies/CaseStudyView";
import { getCaseStudy, publishedCaseStudies } from "@/components/case-studies/case-studies";

/**
 * Standalone case study page at `/case-studies/<slug>` — what a visitor sees on
 * a direct link, reload, or share. Soft navigation from the `/case-studies`
 * folder opens the same content in the CaseStudyModal overlay instead.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.brand} case study · purpl`,
    description: study.lede,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <TopNav />
      <main className="relative z-[2] pb-24 pt-4">
        <div className="mx-auto w-full max-w-[840px] px-8 max-sm:px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[0.8rem] lowercase tracking-[0.18em] text-[var(--color-ink-soft)] outline-none transition-colors hover:text-white focus-visible:text-white"
          >
            <span aria-hidden="true">&larr;</span> all case studies
          </Link>
        </div>
        <CaseStudyView study={study} />
      </main>
    </>
  );
}
