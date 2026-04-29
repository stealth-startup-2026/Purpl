import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./CaatPreview.module.css";

/**
 * Preview tile for caat (mycaat.com). Real link, opens the site in a new tab.
 */
export function CaatPreview() {
  return (
    <a
      className={cn(base.tile, base.tileLink, styles.tile)}
      href="https://www.mycaat.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit caat at mycaat.com"
    >
      <div className={styles.hero}>
        <div className={styles.left}>
          <span className={styles.badge}>YOUR FUTURE, CURATED</span>
          <h3 className={styles.title}>
            <span className={styles.titleRow}>Master Your Path to</span>
            <span className={styles.titleAccent}>University</span>
          </h3>
          <p className={styles.subtitle}>
            Organize deadlines, essays, and documents in one intelligent platform. Stop juggling spreadsheets and start focusing on what matters.
          </p>
          <span className={styles.cta}>GET STARTED FOR FREE &rarr;</span>
          <p className={styles.early}>
            Be part of the <strong>early release</strong> and get in before everyone else.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.shadow} aria-hidden="true" />
          <div className={styles.mockup}>
            <div className={styles.bar}>
              <span>CAAT DASHBOARD</span>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className={styles.body}>
              <div className={styles.greeting}>
                <strong>Good evening, Alex!</strong>
                <em>Here&apos;s an overview of your admissions journey.</em>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.cardTitle}>Application Readiness</span>
                  <span className={styles.pct}>40%</span>
                </div>
                <div className={styles.progress}>
                  <div />
                </div>
                <div className={styles.pills}>
                  <span className={styles.done}>Profile</span>
                  <span className={styles.done}>Schools</span>
                  <span className={styles.done}>Majors</span>
                  <span className={styles.done}>Applications</span>
                  <span>Resume</span>
                  <span>Essays</span>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.cardTitle}>Upcoming Deadlines</span>
                <div className={styles.deadlines}>
                  <div className={styles.deadline}>
                    <i style={{ background: "#b81f2f" }} />
                    Stanford University
                    <em>Application</em>
                    <b style={{ color: "#b81f2f" }}>3d</b>
                  </div>
                  <div className={styles.deadline}>
                    <i style={{ background: "#f59e0b" }} />
                    Gates Scholarship
                    <em>Scholarship</em>
                    <b style={{ color: "#d97706" }}>12d</b>
                  </div>
                  <div className={styles.deadline}>
                    <i style={{ background: "#16a34a" }} />
                    Yale University
                    <em>Application</em>
                    <b style={{ color: "#16a34a" }}>45d</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
