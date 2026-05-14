"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/components/work/projects";
import { ProjectModal } from "@/components/work/ProjectModal";

/**
 * Intercepting route — when a user is on `/work` and clicks a project card,
 * Next.js navigates to `/<project-id>` but intercepts that navigation and
 * renders this component inside the `@modal` slot instead of replacing the
 * page. The work list stays mounted underneath; the URL updates to the
 * project id; the back button closes the modal.
 *
 * Direct visits to `/<project-id>` (reload, bookmark, App Store link) bypass
 * this interception and hit `app/[project]/page.tsx` as a real page.
 *
 * `[project]` is a single-segment wildcard, so it also matches the static
 * sibling routes `/about`, `/contact`, `/work`. For those we have to render
 * `null` (NOT `notFound()`) so the modal slot stays empty and the children
 * slot's real page is the only thing the user sees. Calling `notFound()`
 * here would paint the root not-found UI on top of the genuine page, which
 * is exactly the regression that hit prod.
 */
export default function InterceptedProjectModalPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const router = useRouter();
  const { project: projectId } = use(params);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return null;
  }

  // Close → pop back to the work list. The modal's exit transition runs as
  // the component unmounts.
  return <ProjectModal project={project} onClose={() => router.back()} />;
}
