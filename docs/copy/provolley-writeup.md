# ProVolley modal write-up (parked)

Drafted 5 Sep 2026 for the ProVolley card in `components/work/projects.tsx`.
The modal currently shows only the "Live at provolley.com.au" line; this is the
longer version if we want it back.

ProVolley runs 16 teams across the Premier Volleyball League, the Sydney Volleyball League and the junior divisions, and their old WordPress site had fallen behind the club. We rebuilt it end to end: Next.js on Vercel, Sanity so the club edits its own pages, and the club's navy and gold carried through every screen.

The part we care about most is the live data. Ladders and results pull straight from Volleyball NSW, so every team page shows its real record and ladder position without anyone touching a spreadsheet. Trials, socials and tournaments run off one calendar, programs and camps link straight to registration, and the newsletter is wired in with double opt-in. Live at provolley.com.au since September 2026.
