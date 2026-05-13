import Link from "next/link";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "VolleyTube · Support",
  description:
    "Bugs, questions, feature requests — how to reach the VolleyTube team.",
};

export default function VolleytubeSupportPage() {
  return (
    <LegalDocument
      eyebrow="VolleyTube"
      title="Support"
      lastUpdated="13 May 2026"
    >
      <p>
        Got a bug? Got a question? Want a feature? Email us. We typically reply within 24
        hours.
      </p>
      <p style={{ marginTop: "1.75rem" }}>
        <a
          href="mailto:contact@purpl.au?subject=VolleyTube%20support"
          style={{
            fontSize: "1.25rem",
            letterSpacing: "0.04em",
            fontWeight: 300,
          }}
        >
          contact@purpl.au
        </a>
      </p>

      <h2>Common questions</h2>
      <h3>I can&rsquo;t sign in.</h3>
      <p>
        Reset your password from the login screen via the &ldquo;Forgot password?&rdquo;
        link, or email us at{" "}
        <a href="mailto:contact@purpl.au?subject=VolleyTube%20sign-in%20help">
          contact@purpl.au
        </a>{" "}
        with your account email. If you originally signed up with Sign in with Apple or
        Sign in with Google, use the same method — passwords aren&rsquo;t set up for
        social-only accounts.
      </p>

      <h3>I want to delete my account.</h3>
      <p>
        In the app: Profile → Settings → Account → Delete account. Everything is removed
        within 30 days. Comments you&rsquo;ve posted may persist as anonymised
        (author shown as &ldquo;Deleted user&rdquo;) so threads stay readable. You can
        also email us if the in-app flow doesn&rsquo;t work for you.
      </p>

      <h3>The scores look wrong.</h3>
      <p>
        If a match shows old scores, pull-to-refresh on the match page. If they&rsquo;re
        still wrong, email us with the match URL and what you think the correct score is —
        we&rsquo;ll cross-check against Volleyball NSW&rsquo;s published data.
      </p>

      <h3>How do I report a player or a comment?</h3>
      <p>
        On any comment, clip, or profile, tap the kebab menu (three dots) and select{" "}
        <em>Report</em>. We review all reports within 24 hours; severe reports
        (harassment, CSAM, doxxing) are actioned within an hour.
      </p>

      <h3>Push notifications aren&rsquo;t coming through.</h3>
      <p>
        First, confirm push permission is granted in your device settings (iOS → Settings
        → VolleyTube → Notifications; Android → Settings → Apps → VolleyTube → Notifications).
        Then in the app go to Profile → Settings → Notifications and toggle the categories
        you want. If they&rsquo;re still missing, email us with your device model and
        we&rsquo;ll investigate.
      </p>

      <h3>Where can I see what data you collect?</h3>
      <p>
        Full disclosure in our <Link href="/volleytube/privacy">Privacy Policy</Link>. Short
        version: email, profile fields you fill in, comments and clips you post, match
        interactions, and a push token. No location, no tracking, no ads.
      </p>

      <h2>Security disclosure</h2>
      <p>
        Found a vulnerability? Please email{" "}
        <a href="mailto:contact@purpl.au?subject=SECURITY%20%E2%80%93%20VolleyTube">
          contact@purpl.au
        </a>{" "}
        with subject <code>SECURITY</code>. We respond within 48 hours.
      </p>

      <h2>Status</h2>
      <p>
        If something looks broken across the whole app (not just for you), check our
        status page or our most recent post — link will appear here when we add one. For
        now: if nothing&rsquo;s loading, give it 5 minutes and try again, and email us if
        it persists.
      </p>

      <h2>Suggest a feature</h2>
      <p>
        Email <a href="mailto:contact@purpl.au?subject=VolleyTube%20feature%20idea">
          contact@purpl.au
        </a>{" "}
        with the subject &ldquo;feature idea&rdquo; and tell us what you&rsquo;d use. We
        read everything; we ship what fits the product.
      </p>
    </LegalDocument>
  );
}
