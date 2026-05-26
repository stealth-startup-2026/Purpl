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
        <div className="max-w-xl w-full flex flex-col gap-11">
          <div className="text-left text-[0.95rem] md:text-[1.1rem] leading-relaxed tracking-[0.008em] font-light text-[var(--color-ink-soft)] space-y-3">
            <p>purpl solutions is a small team that believes the hardest part of building software isn&apos;t the building, it&apos;s knowing what to build. we fill the gap between knowing what&apos;s needed and knowing what&apos;s technically possible.</p>
            <p>by working closely with different businesses and clients, we find the day-to-day friction they&apos;ve stopped noticing, the workarounds they&apos;ve come to adopt, and the small inefficiencies that quietly cost them time and money.</p>
            <p>with that knowledge, we propose and build what&apos;s actually useful, in whatever form makes sense. we&apos;re not tied to a stack or a single industry. we&apos;re tied to the problem in front of us, and to the people we&apos;re solving it for.</p>
          </div>
          <div className="flex flex-col items-center gap-6 pt-8 border-t border-[var(--color-line-soft)]">
            <span className="text-[0.7rem] uppercase tracking-[0.22em] font-light text-[var(--color-ink-faint)]">
              the team
            </span>
            <div className="flex justify-center gap-7">
              {team.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on LinkedIn`}
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--color-line-soft)] text-[var(--color-ink-soft)] transition-all group-hover:text-white group-hover:border-white/60">
                    <Linkedin size={18} strokeWidth={1.5} />
                  </span>
                  <span className="text-[0.8rem] tracking-[0.09em] font-light text-[var(--color-ink-soft)] transition-colors group-hover:text-white">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
