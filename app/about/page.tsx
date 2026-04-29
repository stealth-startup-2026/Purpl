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
        <div className="max-w-xl text-center text-[clamp(1rem,1.45vw,1.12rem)] leading-relaxed font-light tracking-[0.005em] text-white/85 max-sm:text-left">
          <p>
            Purpl is a Sydney-based dev studio. We&apos;re passionate about web development and turning ideas
            into implementation, fast.
          </p>
        </div>
      </main>
    </>
  );
}
