import { InterceptedModal } from "@/components/work/InterceptedModal";

// Soft-navigation intercept for /volleytube. Renders the project modal inside
// the @modal slot when the user clicks the VolleyTube card on the work list,
// exactly like the other projects. A hard navigation to /volleytube (the
// homepage "download on the app store now" link, a reload, or a deep link)
// bypasses this intercept and hits the real app/volleytube/page.tsx download page.
export default function Page() {
  return <InterceptedModal projectId="volleytube" />;
}
