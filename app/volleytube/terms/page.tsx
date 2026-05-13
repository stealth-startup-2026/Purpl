import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = {
  title: "VolleyTube · Terms of Service",
  description:
    "The terms that govern your use of the VolleyTube app.",
};

export default function VolleytubeTermsPage() {
  return (
    <LegalDocument
      eyebrow="VolleyTube"
      title="Terms of Service"
      lastUpdated="13 May 2026"
    >
      <p>
        These terms govern your use of the VolleyTube mobile app and any associated
        website. By creating an account, you agree to them.
      </p>

      <h2>1 · Who we are</h2>
      <p>
        VolleyTube is operated by Purpl (&ldquo;<strong>we</strong>&rdquo;,
        &ldquo;<strong>our</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;). The
        service is provided as-is.
      </p>

      <h2>2 · Your account</h2>
      <ul>
        <li>You must be at least 13 years old to create an account.</li>
        <li>You&rsquo;re responsible for keeping your sign-in credentials secure.</li>
        <li>One person, one account. Don&rsquo;t share an account.</li>
        <li>We may suspend or terminate accounts that violate these terms.</li>
      </ul>

      <h2>3 · What you can post</h2>
      <p>
        You retain ownership of comments and clips you upload. By posting, you grant
        VolleyTube a non-exclusive, royalty-free, worldwide license to display the content
        within the app, for as long as the content remains in your account or until you
        delete it.
      </p>
      <p>You agree not to post:</p>
      <ul>
        <li>Anything illegal in Australia.</li>
        <li>
          Harassment, threats, hate speech, or slurs targeting individuals or groups.
        </li>
        <li>Spam, repetitive promotional content, or off-topic political content.</li>
        <li>
          Content depicting minors in any sexual or exploitative context. Strict
          zero-tolerance — accounts are terminated and reported to authorities.
        </li>
        <li>
          Copyrighted material you don&rsquo;t have the right to share. YouTube links to
          public uploads are fine; uploading a copy of a paid broadcast is not.
        </li>
        <li>
          Personally identifying information about another person (phone, address, etc.)
          without their consent.
        </li>
        <li>
          Anything intentionally misleading about match outcomes. You can be wrong about a
          score honestly; you can&rsquo;t deliberately falsify.
        </li>
      </ul>
      <p>
        We moderate reactively (report and review) rather than proactively. We&rsquo;ll act
        on reports within 24 hours where practical.
      </p>

      <h2>4 · Match data</h2>
      <p>
        Match fixtures, results, and ladders are scraped from publicly-available pages on{" "}
        <a
          href="https://www.volleyballnsw.com.au"
          target="_blank"
          rel="noopener noreferrer"
        >
          volleyballnsw.com.au
        </a>
        . We do our best to keep this accurate but we don&rsquo;t guarantee it. If a result
        looks wrong, please report it.
      </p>

      <h2>5 · Acceptable use</h2>
      <p>Don&rsquo;t:</p>
      <ul>
        <li>
          Try to break in. No DDoS, no enumeration scripts, no scraping our content.
        </li>
        <li>
          Pretend to be someone else. Impersonating other players is a fast track to
          termination.
        </li>
        <li>Use VolleyTube to send unsolicited bulk messages.</li>
        <li>
          Probe the app&rsquo;s security and disclose findings publicly without giving us
          a chance to fix first. We&rsquo;re happy to receive responsible disclosure — see
          the security section of the Privacy Policy.
        </li>
      </ul>

      <h2>6 · Third-party sign-ins</h2>
      <p>
        If you use Sign in with Apple or Sign in with Google, your use is also subject to
        those companies&rsquo; terms.
      </p>

      <h2>7 · Service availability</h2>
      <p>
        VolleyTube is &ldquo;best effort.&rdquo; We don&rsquo;t guarantee uptime. If the
        app is down on a Saturday night during finals, we&rsquo;re probably also
        disappointed.
      </p>

      <h2>8 · Disclaimers</h2>
      <p>
        VolleyTube is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We make
        no warranties express or implied. Use at your own risk. We aren&rsquo;t liable for
        missed match notifications, lost clip uploads, follower counts that update slow,
        or any other indirect or consequential damages.
      </p>
      <p>
        To the extent permitted by law (Australian Consumer Law applies; some warranties
        cannot be excluded), our total liability for any claim is capped at the greater of
        A$50 or the amount you&rsquo;ve paid us in the preceding 12 months (likely $0 —
        VolleyTube is currently free).
      </p>

      <h2>9 · Termination</h2>
      <p>
        You can delete your account at any time:
        Profile → Settings → Account → Delete. We can terminate accounts that violate
        these terms — typically with a warning first, but for severe violations (CSAM,
        repeated harassment) immediately.
      </p>
      <p>
        On termination, your data is removed within 30 days. Comments may persist as
        anonymised threads.
      </p>

      <h2>10 · Changes</h2>
      <p>
        We can update these terms. If we change anything material, we&rsquo;ll notify you
        in-app. Continuing to use VolleyTube after the change date means you accept the
        new terms.
      </p>

      <h2>11 · Governing law</h2>
      <p>
        These terms are governed by the laws of New South Wales, Australia. Disputes are
        subject to the courts of NSW.
      </p>

      <h2>12 · Contact</h2>
      <p>
        <strong>Email</strong> ·{" "}
        <a href="mailto:contact@purpl.au?subject=VolleyTube%20terms">contact@purpl.au</a>
      </p>

      <hr />

      <p style={{ fontStyle: "italic", color: "var(--color-ink-faint)" }}>
        By tapping &ldquo;Create account&rdquo; in the app you confirm that you&rsquo;ve
        read and agreed to these terms and the{" "}
        <a href="/volleytube/privacy">Privacy Policy</a>.
      </p>
    </LegalDocument>
  );
}
