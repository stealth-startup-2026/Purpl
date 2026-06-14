import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-3 p-8">
        <Title variant="display">purpl.solutions</Title>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-1.5 text-[0.95rem] md:text-[1.1rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)] outline-none transition-colors hover:text-white focus-visible:text-white"
        >
          we are taking on new clients.
          <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
            →
          </span>
        </Link>
      </main>
    </>
  );
}
