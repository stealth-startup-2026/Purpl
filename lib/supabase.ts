import { createClient } from "@supabase/supabase-js";

/**
 * Server-side client for the VolleyTube Supabase project.
 *
 * Env vars are namespaced `VOLLEYTUBE_` so Purpl can hold credentials for
 * other backends later without collision. Used only inside server actions —
 * the URL and publishable key never reach the browser. The publishable key
 * is insert-only on the `waitlist` table, enforced by Row-Level Security, so
 * it cannot read or edit existing signups.
 */
export function getVolleytubeSupabase() {
  const url = process.env.VOLLEYTUBE_SUPABASE_URL;
  const key = process.env.VOLLEYTUBE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing VolleyTube Supabase env vars — set VOLLEYTUBE_SUPABASE_URL and " +
        "VOLLEYTUBE_SUPABASE_PUBLISHABLE_KEY in .env.local.",
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}
