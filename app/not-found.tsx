import Link from "next/link";
import { ContentPage } from "@/components/brand/ContentPage";
import styles from "@/components/brand/ContentPage.module.css";

export const metadata = { title: "page not found · purpl" };

export default function NotFound() {
  return (
    <ContentPage title="page not found">
      <p className={styles.contactIntro}>That page doesn&apos;t exist, or it has moved.</p>
      <Link href="/" className={styles.email}>back to purpl</Link>
    </ContentPage>
  );
}
