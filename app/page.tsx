import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { EmailSignup } from "@/components/EmailSignup";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-11 p-8">
        <Title variant="display">purpl.solutions</Title>
        <EmailSignup />
      </main>
      <footer className="relative z-[2] px-4 pt-8 pb-10 text-center text-[0.95rem] font-light tracking-[0.01em] text-[var(--color-ink-soft)]">
        We&apos;re under construction. Please check back for an update soon.
      </footer>
    </>
  );
}
