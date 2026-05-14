"use client";

import { useRouter } from "next/navigation";
import { projects } from "./projects";
import { ProjectModal } from "./ProjectModal";

/**
 * Inner of every per-project intercepting route under `app/@modal/(.)<id>/`.
 * Looks up the project by id and renders the existing ProjectModal with a
 * close handler that pops the browser history (returns the user to /work).
 *
 * Why this lives behind a wrapper instead of one shared `(.)[project]/page.tsx`:
 *
 *   [project] is a single-segment wildcard, so it also caught /about,
 *   /contact, /work and any other peer route. When the user soft-navigated
 *   to one of those, Next.js's RSC diff machinery flagged the navigation as
 *   modal-slot-only (the intercepting route matched), and the children-slot
 *   update was suppressed — so the URL bar updated but the visible content
 *   stayed on the previous page. By using explicit per-project paths,
 *   only the 5 real project URLs are intercepted; everything else passes
 *   through normally.
 */
export function InterceptedModal({ projectId }: { projectId: string }) {
  const router = useRouter();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;
  return <ProjectModal project={project} onClose={() => router.back()} />;
}
