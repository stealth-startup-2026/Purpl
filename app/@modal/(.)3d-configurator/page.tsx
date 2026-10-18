import { InterceptedModal } from "@/components/work/InterceptedModal";

// Soft-navigation intercept for /3d-configurator. Renders the project modal inside the
// @modal slot when the user clicks the project's card in the homepage folder. Direct
// visits to /3d-configurator (reload, deep link) bypass this and hit app/[project]/page.tsx.
export default function Page() {
  return <InterceptedModal projectId="3d-configurator" />;
}
