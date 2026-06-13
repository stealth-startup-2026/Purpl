import { InterceptedModal } from "@/components/work/InterceptedModal";

// Soft-navigation intercept for /purpl-hq. Renders the project modal inside the
// @modal slot when the user clicks the project's card on /work. Direct
// visits to /purpl-hq (reload, deep link) bypass this and hit app/[project]/page.tsx.
export default function Page() {
  return <InterceptedModal projectId="purpl-hq" />;
}
