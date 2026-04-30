import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";

export const metadata = {
  title: "about us · purpl",
};

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-11 px-8 pt-16 pb-24 max-sm:gap-8 max-sm:px-6 max-sm:pt-10 max-sm:pb-16">
        <Title variant="display">about us</Title>
        <div className="max-w-md text-center text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed tracking-[0.008em] font-light text-white/60 space-y-3 max-sm:text-left">
          <p>purpl is a Sydney-based dev studio.</p>
          <p>We care deeply about software — not just how it works, but how it feels.</p>
          <p>Every project is a chance to build something people actually enjoy using.</p>
        </div>
      </main>
    </>
  );
}
