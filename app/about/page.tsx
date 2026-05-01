import { TopNav } from "@/components/TopNav";
import { Title } from "@/components/Title";
import { Linkedin } from "lucide-react";

export const metadata = {
  title: "about us · purpl",
};

const team = [
  { name: "violet nwe", href: "https://www.linkedin.com/in/violet-nwe-3125712b3/" },
  { name: "jaden khuu", href: "https://www.linkedin.com/in/jaden-khuu/" },
  { name: "kevin hu", href: "https://www.linkedin.com/in/kevin-hu-aus/" },
];

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-11 px-8 pt-16 pb-24 max-sm:gap-8 max-sm:px-6 max-sm:pt-10 max-sm:pb-16">
        <Title variant="display">about us</Title>
        <div className="max-w-md w-full flex flex-col gap-11">
          <div className="text-left text-[0.95rem] md:text-[1.1rem] leading-relaxed tracking-[0.008em] font-light text-white/60 space-y-3">
            <p>purpl is a software development studio based in Sydney.</p>
            <p>we care deeply about software. not just how it works, but how it feels</p>
            <p>every project is a chance to build something people actually enjoy using</p>
          </div>
          <div className="flex justify-center gap-7 pt-11 border-t border-white/60">
            {team.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="group flex flex-col items-center gap-2"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white/60 transition-all group-hover:text-white group-hover:border-white/60">
                  <Linkedin size={18} strokeWidth={1.5} />
                </span>
                <span className="text-[0.8rem] tracking-[0.09em] font-light text-white/35 transition-colors group-hover:text-white/60">
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
