import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { Linkedin } from "lucide-react";

export const metadata = {
  title: "contact · purpl",
  description: "Get in touch with purpl solutions — a Sydney-based dev studio. We're taking on new clients.",
};

export default function ContactPage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-7 px-8 pt-16 pb-24 max-sm:gap-6 max-sm:px-6 max-sm:pt-10 max-sm:pb-16">
        <Title variant="display">contact</Title>
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-[1rem] md:text-[1.12rem] leading-relaxed font-light tracking-[0.005em] text-white/60">
            For client work, collaborations, or just to say hi:
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="mailto:contact@purpl.au?subject=Hi"
              className="text-[1rem] md:text-[1.35rem] font-light tracking-[0.04em] text-white/60 underline decoration-white/20 underline-offset-8 transition-[color,text-decoration-color] hover:text-white hover:decoration-white/60"
            >
              contact@purpl.au
            </a>
            <a
              href="https://www.linkedin.com/company/purplsolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Purpl on LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white/60 transition-all hover:text-white hover:border-white/60"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
