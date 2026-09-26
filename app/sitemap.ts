import { MetadataRoute } from "next";
import { projects } from "@/components/work/projects";

const base = "https://purpl.solutions";

// Archived projects leave the sitemap at the same moment they leave the site.
const projectSlugs = projects.map((p) => p.id);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/work`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "yearly" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...projectRoutes];
}
