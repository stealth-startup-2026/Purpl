# Unpublished case-study routes

These route entry points are preserved outside `app` while case studies are unfinished.
Their data and components remain in `components/case-studies`.

To publish later, restore `index.tsx` to `app/case-studies/page.tsx` and
`detail.tsx` to `app/case-studies/[slug]/page.tsx`, then re-enable navigation and
the case-study entries in `app/sitemap.ts`.
