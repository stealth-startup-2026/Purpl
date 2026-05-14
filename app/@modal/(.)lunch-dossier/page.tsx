import { InterceptedModal } from "@/components/work/InterceptedModal";

// Soft-navigation intercept for /lunch-dossier. Renders the project modal inside the
// @modal slot when the user clicks the project's card on /work. Direct
// visits to /lunch-dossier (reload, deep link) bypass this and hit app/[project]/page.tsx.
export default function Page() {
  return <InterceptedModal projectId="lunch-dossier" />;
}
