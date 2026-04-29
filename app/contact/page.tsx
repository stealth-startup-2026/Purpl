import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";

export const metadata = {
  title: "contact · purpl",
};

export default function ContactPage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-12 px-8 pt-16 pb-24 max-sm:gap-8 max-sm:px-6 max-sm:pt-10 max-sm:pb-16">
        <Title variant="display">contact</Title>
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-md text-[clamp(1rem,1.45vw,1.12rem)] leading-relaxed font-light tracking-[0.005em] text-white/85">
            For client work, collaborations, or just to say hi:
          </p>
          <a
            href="mailto:contact@purpl.au?subject=Hi"
            className="text-[clamp(1.4rem,3vw,2.2rem)] font-light tracking-[0.04em] text-white underline decoration-white/30 underline-offset-8 transition-[color,text-decoration-color] hover:decoration-white"
          >
            contact@purpl.au
          </a>
        </div>
      </main>
    </>
  );
}
