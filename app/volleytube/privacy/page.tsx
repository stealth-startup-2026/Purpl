import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "VolleyTube · Privacy Policy",
  description:
    "How VolleyTube handles your data. What we collect, where it lives, who can see it, and how to delete it.",
};

export default function VolleytubePrivacyPage() {
  return (
    <LegalDocument
      eyebrow="VolleyTube"
      title="Privacy Policy"
      lastUpdated="13 May 2026"
    >
      <p>
        This is the hosted version of the privacy policy that the App Store and Play Store
        require. The in-app version inside the VolleyTube app covers the same ground in
        app-readable form.
      </p>

      <h2>1 · Who we are</h2>
      <p>
        VolleyTube is operated by Purpl, based in Sydney, Australia. You can reach us at{" "}
        <a href="mailto:contact@purpl.au?subject=VolleyTube%20privacy">contact@purpl.au</a>.
      </p>

      <h2>2 · What we collect</h2>
      <p>When you create an account or use VolleyTube, we collect:</p>
      <ul>
        <li><strong>Email address</strong> — used to authenticate your account.</li>
        <li>
          <strong>Profile information you provide</strong> — display name, @username,
          avatar, position, club, age, height, weight, spike and block heights, and bio.
          All optional except display name and username.
        </li>
        <li><strong>Comments</strong> — text you post on match pages.</li>
        <li>
          <strong>Videos</strong> — short clips you upload (stored in Supabase Storage)
          and YouTube links you share.
        </li>
        <li>
          <strong>Match interactions</strong> — set scores you submit, &ldquo;I was there&rdquo;
          attendance, bookmarks, follows.
        </li>
        <li>
          <strong>Push notification token</strong> — your device&rsquo;s Expo push token, only
          if you grant the OS-level notification permission.
        </li>
        <li>
          <strong>Authentication metadata</strong> — IP address, user-agent, and Apple or
          Google identifiers when you use those sign-in methods.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect: device location, contacts, calendar, IDFA or ad
        tracking IDs, biometric data, payment information, or anything related to children
        under 13.
      </p>

      <h2>3 · Where your data lives</h2>
      <ul>
        <li>
          <strong>Postgres database</strong> — Supabase, hosted on AWS in Sydney
          (<code>ap-southeast-2</code>). TLS in transit, encryption at rest.
        </li>
        <li>
          <strong>Video storage</strong> — Supabase Storage, same region. Files served via
          signed public URLs (clips are intended to be shared).
        </li>
        <li>
          <strong>Authentication tokens</strong> — encrypted on your device via
          <code> expo-secure-store</code> (Keychain on iOS, EncryptedSharedPreferences on
          Android).
        </li>
        <li>
          <strong>Push subscription tokens</strong> — stored in Supabase Postgres, isolated
          to a <code>push_subscriptions</code> table with strict read-self and write-self
          Row-Level Security policies.
        </li>
      </ul>
      <p>
        We don&rsquo;t have offices outside Australia and we don&rsquo;t ship your data to
        non-Australian processors except Apple (sign-in only, no profile data) and Google
        (sign-in only, plus push delivery via Firebase Cloud Messaging on Android).
      </p>

      <h2>4 · How we use your data</h2>
      <p>We only use your data to make VolleyTube work for you:</p>
      <ul>
        <li>Display your profile, comments, and clips on the relevant match pages.</li>
        <li>Personalise your home feed (your team, your matches, your follower activity).</li>
        <li>Send the in-app and push notifications you&rsquo;ve opted into.</li>
        <li>
          Send transactional emails (password reset, signup confirmation) via Supabase Auth.
        </li>
      </ul>
      <p>We do <strong>not</strong>:</p>
      <ul>
        <li>Sell or rent your data to third parties.</li>
        <li>Show advertising in the app.</li>
        <li>Build behavioural or analytics profiles for targeting.</li>
        <li>Use your data to train AI models. We don&rsquo;t run one.</li>
      </ul>

      <h2>5 · Who can see what</h2>
      <ul>
        <li>
          <strong>Public to all signed-in users</strong> — your username, display name,
          profile fields you&rsquo;ve filled (avatar, club, position, stats, bio), your
          comments, your clips, your following and follower counts, your attendance and
          bookmarks (counts only, not contents).
        </li>
        <li>
          <strong>Read-only to you</strong> — your inbox notifications, your match
          bookmarks list, your push subscription record.
        </li>
        <li>
          <strong>Admin-only</strong> — moderation reports you submit, the audit log of
          match score edits, scraper run history.
        </li>
      </ul>
      <p>
        The above is enforced at the database level via Postgres Row-Level Security — not
        just in the client.
      </p>

      <h2>6 · Your rights</h2>
      <p>
        Under the Australian Privacy Act, GDPR (if you&rsquo;re in the EU), and CCPA
        (if you&rsquo;re in California), you have the right to:
      </p>
      <ul>
        <li>
          <strong>Access</strong> your data. Email{" "}
          <a href="mailto:contact@purpl.au?subject=VolleyTube%20data%20access">
            contact@purpl.au
          </a>{" "}
          and we&rsquo;ll send you a JSON dump.
        </li>
        <li>
          <strong>Correct</strong> your data. Edit your profile in-app; for things you
          can&rsquo;t edit (e.g. comment history), email us.
        </li>
        <li>
          <strong>Delete</strong> your account and all associated data. In-app:
          Profile → Settings → Account → Delete account. Or email us. We&rsquo;ll delete
          within 30 days; comments may persist as anonymised (with{" "}
          <code>user_id</code> set to null) so threads stay readable.
        </li>
        <li>
          <strong>Object to processing.</strong> Contact us — though for most of what we
          do, processing is necessary for the service, so we may not be able to comply
          without you closing your account.
        </li>
        <li><strong>Portability.</strong> JSON export of your data on request.</li>
        <li>
          <strong>Withdraw consent</strong> to push notifications via your device settings.
        </li>
      </ul>
      <p>
        To exercise any of these:{" "}
        <a href="mailto:contact@purpl.au?subject=VolleyTube%20rights%20request">
          contact@purpl.au
        </a>
        . We don&rsquo;t charge a fee; we don&rsquo;t require ID for most requests.
      </p>

      <h2>7 · Data retention</h2>
      <ul>
        <li><strong>Active accounts</strong> — indefinitely, until you delete.</li>
        <li>
          <strong>Deleted accounts</strong> — within 30 days. Comments are anonymised but
          not deleted (community thread integrity).
        </li>
        <li>
          <strong>Backup retention</strong> — Supabase keeps point-in-time recovery
          snapshots for 7 days; deletes propagate.
        </li>
        <li>
          <strong>Auth tokens and sessions</strong> — invalidated immediately on sign-out
          or account delete.
        </li>
      </ul>

      <h2>8 · Children under 13</h2>
      <p>
        VolleyTube is <strong>not directed at children under 13</strong>. We don&rsquo;t
        knowingly collect personal information from anyone under 13. If you&rsquo;re a
        parent and believe your child has signed up, email us and we&rsquo;ll remove the
        account.
      </p>
      <p>
        VolleyTube does scrape and display match data for YSVL U15, U17, and U19 leagues —
        but that&rsquo;s tournament-published data, not personal information collected from
        minors directly.
      </p>

      <h2>9 · Third-party processors</h2>
      <table>
        <thead>
          <tr>
            <th>Processor</th>
            <th>What they handle</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Supabase Inc.</td>
            <td>Postgres, auth, storage, edge functions</td>
            <td>AWS ap-southeast-2 (Sydney)</td>
          </tr>
          <tr>
            <td>Apple Inc.</td>
            <td>Sign in with Apple (iOS users)</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Google LLC</td>
            <td>Sign in with Google (optional); FCM push delivery (Android)</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Expo</td>
            <td>Push notification routing</td>
            <td>USA</td>
          </tr>
        </tbody>
      </table>
      <p>We&rsquo;ve reviewed each one&rsquo;s privacy posture; links to their policies on request.</p>

      <h2>10 · Security</h2>
      <ul>
        <li>Passwords hashed with Supabase Auth&rsquo;s bcrypt variant.</li>
        <li>All API calls over TLS 1.2+.</li>
        <li>
          Database access protected by Row-Level Security policies; no client can bypass.
        </li>
        <li>
          Service-role keys held only on operator machines, never in the app bundle.
        </li>
        <li>Regular security audits.</li>
      </ul>
      <p>
        If you find a security issue, please report it to{" "}
        <a href="mailto:contact@purpl.au?subject=SECURITY%20%E2%80%93%20VolleyTube">
          contact@purpl.au
        </a>{" "}
        with subject <code>SECURITY</code>. We&rsquo;ll respond within 48 hours.
      </p>

      <h2>11 · Changes to this policy</h2>
      <p>
        We&rsquo;ll notify users in-app of material changes. The &ldquo;Last updated&rdquo;
        date at the top of this page reflects the most recent edit.
      </p>

      <h2>12 · Contact</h2>
      <p>
        <strong>Email</strong> ·{" "}
        <a href="mailto:contact@purpl.au?subject=VolleyTube">contact@purpl.au</a>
      </p>
      <p>
        For Australian-specific complaints unresolvable via the above: the Office of the
        Australian Information Commissioner (OAIC) at{" "}
        <a
          href="https://www.oaic.gov.au"
          target="_blank"
          rel="noopener noreferrer"
        >
          oaic.gov.au
        </a>
        .
      </p>

      <hr />

      <p style={{ fontStyle: "italic", color: "var(--color-ink-faint)" }}>
        If you&rsquo;ve read this far: thanks. We try to keep the data we collect to the
        minimum needed to make the app work, and to be straight with you about what we do
        with it.
      </p>
    </LegalDocument>
  );
}
