import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for Purpl.
 *
 * Used only inside server actions — the URL and publishable key never reach
 * the browser. The publishable key is insert-only on the `waitlist` table,
 * enforced by Row-Level Security, so it cannot read or edit existing signups.
 */
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars — set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local.",
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}
