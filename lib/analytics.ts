/**
 * Client-side analytics.
 *
 * GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set on the
 * environment (see `components/analytics/GoogleAnalytics.tsx`), so local
 * builds and preview deploys never get a `gtag`. `trackEvent` is therefore a
 * no-op on the server, a no-op when the tag is absent, and never throws: it is
 * called from success paths, where an analytics failure must not be mistaken
 * for the enquiry itself failing.
 */

/** GA4 event parameters. Flat by design: GA4 does not accept nested objects. */
export type EventParams = Record<string, string | number | boolean | undefined>;

type Gtag = (command: "event", name: string, params?: EventParams) => void;

/** Send a GA4 event, if this page has GA4. Silent otherwise. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    // Measurement is never worth breaking the page it measures.
  }
}
