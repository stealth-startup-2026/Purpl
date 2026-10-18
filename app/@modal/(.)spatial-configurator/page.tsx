import { InterceptedModal } from "@/components/work/InterceptedModal";

// Soft-navigation intercept for /spatial-configurator. Renders the project modal inside the
// @modal slot when the user clicks the project's card in the homepage folder. Direct
// visits to /spatial-configurator (reload, deep link) bypass this and hit app/[project]/page.tsx.
export default function Page() {
  return <InterceptedModal projectId="spatial-configurator" />;
}
