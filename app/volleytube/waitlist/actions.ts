"use server";

import { getSupabaseClient } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistResult = { ok: true } | { ok: false; error: string };

/**
 * Stores a VolleyTube waitlist signup in Purpl's Supabase `waitlist` table.
 * A duplicate email is treated as success — no scary error for someone who
 * signs up twice. Reads are never performed; the list is dashboard-only.
 */
export async function joinWaitlist(input: {
  email: string;
  trap: string;
}): Promise<WaitlistResult> {
  // Honeypot: a real person never fills the hidden field. Pretend success.
  if (input.trap.trim() !== "") return { ok: true };

  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Hmm, that doesn't look like an email address." };
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, project: "volleytube" });

    if (error) {
      // 23505 = unique violation → already on the list, count it as a win.
      if (error.code === "23505") return { ok: true };
      console.error("[waitlist] insert failed:", error.message);
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[waitlist] action error:", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
