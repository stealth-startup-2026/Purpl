import { Button } from "@/components/ui/button";

/**
 * Coming-soon CTA on the home page. Hints that we take new client work
 * and opens the visitor's email client to message contact@purpl.au.
 */
export function EnquiryCTA() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[0.95rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)]">
        got an enquiry? we&apos;re taking on new client work.
      </p>
      <Button asChild>
        <a href="mailto:contact@purpl.au?subject=Enquiry">get in touch</a>
      </Button>
    </div>
  );
}
