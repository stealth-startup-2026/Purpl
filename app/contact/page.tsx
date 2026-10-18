import { Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import { ContentPage } from "@/components/brand/ContentPage";
import styles from "@/components/brand/ContentPage.module.css";

export const metadata = {
  title: "contact · purpl",
  description: "Get in touch with purpl solutions — a Sydney-based dev studio. We're taking on new clients.",
};

const channels: { Icon: LucideIcon; value: string; label?: string; href?: string }[] = [
  { Icon: Mail, value: "contact@purpl.au", label: "email", href: "mailto:contact@purpl.au?subject=Hi" },
  { Icon: Linkedin, value: "purpl solutions", label: "LinkedIn", href: "https://www.linkedin.com/company/purplsolutions" },
  { Icon: MapPin, value: "Sydney, Australia" },
];

export default function ContactPage() {
  return (
    <ContentPage title="contact">
      <p className={styles.contactIntro}>For work, collaborations, or general inquiries, find us here.</p>
      <div className={styles.channels}>
        {channels.map(({ Icon, value, label, href }) => {
          const content = (
            <>
              <span className={styles.profileIcon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span>
              <span className={styles.channelCopy}><strong>{value}</strong>{label && <span>{label}</span>}</span>
            </>
          );
          return href ? (
            <a
              key={value}
              href={href}
              className={styles.channel}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {content}
            </a>
          ) : (
            <div key={value} className={styles.channel}>{content}</div>
          );
        })}
      </div>
    </ContentPage>
  );
}
