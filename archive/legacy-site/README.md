# Original portfolio design

Source snapshots from production commit `5a99a4b`, before the portfolio overhaul.
The original homepage, About, Contact, project modal, navigation, background,
footer, and global styling are preserved here without adding public routes.

Each file mirrors its original repository path with a `.source` suffix. Remove
that suffix when restoring or reusing it. Existing project data, media and
preview components remain in their normal locations.

The original `/work` page was archived later, to `app/work/page.tsx.source`. Its
components (`components/work/WorkSection.tsx` and friends) stay in place, and
`next.config.ts` redirects `/work` to the homepage folder. To restore it, move
the page back and remove that redirect.
Unpublished case-study routes are separately saved in `archive/case-studies-routes`.

The full original site is also recoverable from Git commit `5a99a4b`.
