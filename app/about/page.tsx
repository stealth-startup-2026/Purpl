import Link from "next/link";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { ContentPage } from "@/components/brand/ContentPage";
import styles from "@/components/brand/ContentPage.module.css";

export const metadata = {
  title: "about us · purpl",
  description: "purpl solutions is a small Sydney-based dev studio. We find the friction businesses have stopped noticing and build what's actually useful.",
};

const team = [
  { name: "violet nwe", href: "https://www.linkedin.com/in/violet-nwe-3125712b3/" },
  { name: "jaden khuu", href: "https://www.linkedin.com/in/jaden-khuu/" },
  { name: "kevin hu", href: "https://www.linkedin.com/in/kevin-hu-aus/" },
];

const approach = [
  {
    title: "find the friction",
    body: "by working closely with different businesses and clients, we find the day-to-day friction they've stopped noticing, the workarounds they've come to adopt, and the small inefficiencies that quietly cost them time and money.",
  },
  {
    title: "build what's useful",
    body: "with that knowledge, we propose and build what's actually useful, in whatever form makes sense.",
  },
  {
    title: "stay problem-first",
    body: "we're not tied to a stack or a single industry. we're tied to the problem in front of us, and to the people we're solving it for.",
  },
];

export default function AboutPage() {
  return (
    <ContentPage title="about us">
      <section className={styles.team} aria-label="The team">
        <div className={styles.people}>
          {team.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} className={styles.person}>
              <span className={styles.profileIcon}><Linkedin size={23} strokeWidth={1.6} aria-hidden="true" /></span>
              <span className={styles.profileCopy}><strong>{name}</strong><span>LinkedIn</span></span>
            </a>
          ))}
        </div>
      </section>

      <p className={styles.lead}>
        purpl solutions is a small team that believes the hardest part of building software isn&apos;t the building,
        it&apos;s knowing what to build. we fill the gap between knowing what&apos;s needed and knowing what&apos;s
        technically possible.
      </p>

      <section className={styles.approach} aria-label="How we work">
        {approach.map(({ title, body }) => (
          <div key={title}>
            <h2 className={styles.smallHeading}>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>

      <nav className={styles.nextLinks} aria-label="Next">
        <Link href="/#folder-projects" className={styles.contactValue}>
          see our work <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
        </Link>
        <Link href="/contact" className={styles.contactValue}>
          get in touch <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </nav>
    </ContentPage>
  );
}
