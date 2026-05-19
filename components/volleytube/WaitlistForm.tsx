"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { joinWaitlist } from "@/app/volleytube/waitlist/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "error" | "submitting" | "success";

/**
 * VolleyTube pre-launch email capture. Posts to the `joinWaitlist` server
 * action, which stores the address in the VolleyTube Supabase `waitlist` table.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("Hmm, that doesn't look like an email address.");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Hmm, that doesn't look like an email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await joinWaitlist({ email: value, trap });
    if (result.ok) {
      setStatus("success");
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-center gap-3 rounded-md border border-[var(--color-line-soft)] bg-white/[0.03] px-5 py-4"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white">
          <Check size={14} strokeWidth={2.25} className="text-white" />
        </span>
        <p className="text-[0.95rem] font-light leading-snug text-white/85">
          You&rsquo;re on the list. We&rsquo;ll email you the moment VolleyTube goes live.
        </p>
      </div>
    );
  }

  const invalid = status === "error";
  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {/* Honeypot — hidden from people, tempting to bots. A filled value
         makes the server action silently no-op. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={invalid}
          aria-describedby="waitlist-hint"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={cn(
            "h-12 w-full flex-1 rounded-md border bg-white/[0.03] px-4 text-[0.95rem] text-white tracking-[0.01em] outline-none transition-colors placeholder:text-[var(--color-ink-faint)]",
            invalid
              ? "border-[var(--color-vt-red)]"
              : "border-[var(--color-line-soft)] focus:border-white/55",
          )}
        />
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md border border-[var(--color-line)] px-6 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white outline-none transition-[background,border,opacity] hover:bg-white/10 focus-visible:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {submitting ? "Joining" : "Join waitlist"}
          {!submitting && (
            <ArrowRight
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          )}
        </button>
      </div>
      {invalid && (
        <p
          id="waitlist-hint"
          className="text-[0.8rem] font-light tracking-[0.01em]"
          style={{ color: "var(--color-vt-red)" }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
