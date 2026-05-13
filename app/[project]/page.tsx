import { notFound } from "next/navigation";
import { projects } from "@/components/work/projects";
import { ProjectPageView } from "@/components/work/ProjectPageView";

/**
 * Real route at `/<project-id>` — what a visitor sees when they reload, open
 * the URL in a new tab, or follow a direct link from the App Store. When the
 * navigation originates from `/work` instead, the intercepting route at
 * `app/@modal/(.)[project]/page.tsx` takes over and renders the same project
 * as a modal overlay so the user never leaves the list view.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ project: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectId } = await params;
  const project = projects.find((p) => p.id === projectId);
  if (!project) return {};
  return {
    title: `${project.brand} · purpl`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectId } = await params;
  const project = projects.find((p) => p.id === projectId);
  if (!project) notFound();
  return <ProjectPageView project={project} />;
}
