"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Coming-soon "notify me" capture. Validates locally; no backend yet.
 * When we wire one up, swap the setStatus path for a real fetch.
 */
export function EmailSignup() {
  const [status, setStatus] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!EMAIL_RE.test(email)) {
      setStatus("please enter a valid email");
      return;
    }
    setStatus("thanks, we'll be in touch.");
    form.reset();
  }

  return (
    <div>
      <form onSubmit={onSubmit} autoComplete="off" noValidate className="flex items-center gap-2.5 max-[480px]:flex-col">
        <Input
          type="email"
          name="email"
          placeholder="your@email.com"
          aria-label="Email address"
          required
          className="max-[480px]:w-[min(80vw,18rem)]"
        />
        <Button type="submit" className="max-[480px]:w-[min(80vw,18rem)]">
          notify me
        </Button>
      </form>
      <p
        aria-live="polite"
        className="min-h-[1.1em] mt-1.5 text-center text-[0.78rem] tracking-[0.02em] text-[var(--color-ink-soft)]"
      >
        {status}
      </p>
    </div>
  );
}
