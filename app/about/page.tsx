import { Linkedin } from "lucide-react";
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

export default function AboutPage() {
  return (
    <ContentPage title="about us">
      <div className={styles.prose}>
        <p>purpl solutions is a small team that believes the hardest part of building software isn&apos;t the building, it&apos;s knowing what to build. we fill the gap between knowing what&apos;s needed and knowing what&apos;s technically possible.</p>
        <p>by working closely with different businesses and clients, we find the day-to-day friction they&apos;ve stopped noticing, the workarounds they&apos;ve come to adopt, and the small inefficiencies that quietly cost them time and money.</p>
        <p>with that knowledge, we propose and build what&apos;s actually useful, in whatever form makes sense. we&apos;re not tied to a stack or a single industry. we&apos;re tied to the problem in front of us, and to the people we&apos;re solving it for.</p>
      </div>
      <section className={styles.team} aria-labelledby="team-heading">
        <h2 id="team-heading">the team</h2>
        <div className={styles.people}>
          {team.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`} className={styles.person}>
              <span className={styles.profileIcon}><Linkedin size={23} strokeWidth={1.6} aria-hidden="true" /></span>
              <span className={styles.profileCopy}><strong>{name}</strong><span>LinkedIn profile</span></span>
            </a>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
