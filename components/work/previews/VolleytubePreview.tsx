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
              <div className={styles.name}>EASTSIDE EAGLES Prems Men</div>
              <div className={styles.role}>HOME</div>
            </div>
            <div>
              <div className={styles.name}>WESTERN TIGERS Prems Men</div>
              <div className={styles.role}>AWAY</div>
            </div>
          </div>
          <div className={styles.score}>
            <span>3</span>
            <em>&ndash;</em>
            <span>2</span>
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
              <th>EAG</th>
              <td>25</td>
              <td>22</td>
              <td>25</td>
              <td>23</td>
              <td>15</td>
            </tr>
            <tr>
              <th>TIG</th>
              <td>23</td>
              <td>25</td>
              <td>21</td>
              <td>25</td>
              <td>13</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
