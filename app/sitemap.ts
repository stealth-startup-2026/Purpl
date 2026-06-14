import { MetadataRoute } from "next";

const base = "https://purpl.solutions";

const projectSlugs = [
  "terminl", "caat", "moup", "volleytube",
  "provolley", "innerwest", "prosporter", "lunch-dossier", "purpl-hq",
];

const caseStudySlugs = ["caat", "lunch-dossier"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/work`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/case-studies`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "yearly" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${base}/case-studies/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...projectRoutes, ...caseStudyRoutes];
}
