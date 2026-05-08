import { cn } from "@/lib/utils";
import base from "./preview-base.module.css";
import styles from "./VolleytubePreview.module.css";

/**
 * Preview tile for volleytube (Sydney volleyball results app, in development).
 * Not clickable; hover shows the "coming soon" overlay.
 */
export function VolleytubePreview() {
  return (
    <div className={cn(base.tile, styles.tile)} aria-hidden="true">
      <div className={styles.preview}>
        <div className={styles.head}>
          <span className={styles.kicker}>PVL · PREMIER MEN</span>
          <span className={styles.subline}>Sunday 12 April · 12:10 pm · Netball Central, Court 4</span>
          <span className={styles.final}>FINAL</span>
        </div>

        <div className={styles.body}>
          <div className={styles.teams}>
            <div>
              <div className={styles.name}>PROVOLLEY ACADEMY Prems Men</div>
              <div className={styles.role}>HOME</div>
            </div>
            <div>
              <div className={styles.name}>SYDNEY UNITED X WESTSIDE</div>
              <div className={styles.role}>AWAY</div>
            </div>
          </div>
          <div className={styles.score}>
            <span>0</span>
            <em>&ndash;</em>
            <span>3</span>
          </div>
        </div>

        <div className={styles.attendees}>NO ATTENDEES YET</div>

        <table className={styles.sets}>
          <thead>
            <tr>
              <th />
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
              <th>S4</th>
              <th>S5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>PAP</th>
              <td>18</td>
              <td>16</td>
              <td>19</td>
              <td className={styles.empty}>&ndash;</td>
              <td className={styles.empty}>&ndash;</td>
            </tr>
            <tr>
              <th>SUX</th>
              <td>25</td>
              <td>25</td>
              <td>25</td>
              <td className={styles.empty}>&ndash;</td>
              <td className={styles.empty}>&ndash;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
