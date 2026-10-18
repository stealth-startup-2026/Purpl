import { ArrowUpRight } from "lucide-react";
import { ContentPage } from "@/components/brand/ContentPage";
import styles from "@/components/brand/ContentPage.module.css";

export const metadata = {
  title: "contact · purpl",
  description: "Get in touch with purpl solutions — a Sydney-based dev studio. We're taking on new clients.",
};

const channels = [
  { label: "email", value: "contact@purpl.au", href: "mailto:contact@purpl.au?subject=Hi" },
  { label: "linkedin", value: "purpl solutions", href: "https://www.linkedin.com/company/purplsolutions" },
  { label: "based in", value: "Sydney, Australia" },
];

export default function ContactPage() {
  return (
    <ContentPage title="contact">
      <p className={styles.contactIntro}>For work, collaborations, or general inquiries, find us here.</p>
      <dl className={styles.contactList}>
        {channels.map(({ label, value, href }) => (
          <div key={label} className={styles.contactRow}>
            <dt>{label}</dt>
            <dd>
              {href ? (
                <a
                  href={href}
                  className={styles.contactValue}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {value}
                  <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
                </a>
              ) : (
                <span className={styles.contactValue}>{value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </ContentPage>
  );
}
