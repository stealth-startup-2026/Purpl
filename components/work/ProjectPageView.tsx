"use client";

import { useRouter } from "next/navigation";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "./projects";

/**
 * Renders a project as a stand-alone page (used by `app/[project]/page.tsx`
 * when the URL is hit directly, not via the work-list interception).
 *
 * Visually identical to the modal: same overlay, same backdrop, same box.
 * The only behavioural difference is close — `router.back()` is safe when
 * the visitor came from elsewhere on the site, but if they landed straight
 * here (e.g. an App Store reviewer clicking a link), history is empty and we
 * fall back to `/work` rather than leaving them stuck on the page.
 */
export function ProjectPageView({ project }: { project: Project }) {
  const router = useRouter();

  const close = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/work");
    }
  };

  return <ProjectModal project={project} onClose={close} />;
}
