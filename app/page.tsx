import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-3 p-8">
        <Title variant="display">purpl.solutions</Title>
        <p className="text-[0.95rem] md:text-[1.1rem] font-light tracking-[0.02em] text-[var(--color-ink-soft)]">
          we are taking on new clients.
        </p>
      </main>
      <footer className="relative z-[2] px-4 pt-8 pb-10 text-center text-[0.95rem] md:text-[1.1rem] font-light tracking-[0.01em] text-[var(--color-ink-soft)]">
        a small team. taking it one project at a time.
      </footer>
    </>
  );
}
