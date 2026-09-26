import { Linkedin } from "lucide-react";
import { ContentPage } from "@/components/brand/ContentPage";
import styles from "@/components/brand/ContentPage.module.css";

export const metadata = {
  title: "contact · purpl",
  description: "Get in touch with purpl solutions — a Sydney-based dev studio. We're taking on new clients.",
};

export default function ContactPage() {
  return (
    <ContentPage title="contact">
      <p className={styles.contactIntro}>For work, collaborations, or general inquiries, find us here.</p>
      <a href="mailto:contact@purpl.au?subject=Hi" className={styles.email}>contact@purpl.au</a>
      <a href="https://www.linkedin.com/company/purplsolutions" target="_blank" rel="noopener noreferrer" aria-label="Purpl on LinkedIn" className={styles.social}>
        <span className={styles.profileIcon}><Linkedin size={23} strokeWidth={1.6} aria-hidden="true" /></span>
        <span className={styles.profileCopy}><strong>purpl solutions</strong><span>find us on LinkedIn</span></span>
      </a>
    </ContentPage>
  );
}
