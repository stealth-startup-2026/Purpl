import type { ReactNode } from "react";
import { CaatPreview } from "./previews/CaatPreview";
import { MoupPreview } from "./previews/MoupPreview";
import { VolleytubePreview } from "./previews/VolleytubePreview";
import { ProvolleyPreview } from "./previews/ProvolleyPreview";

export interface Project {
  id: string;
  brand: string;
  category: string;
  description: string;
  tag?: string;
  preview: ReactNode;
}

export const projects: Project[] = [
  {
    id: "caat",
    brand: "caat",
    category: "webapp · in-house",
    description:
      "A college application platform where students track every deadline, essay, scholarship, and document, all in one place.",
    preview: <CaatPreview />,
  },
  {
    id: "moup",
    brand: "moup",
    category: "webapp · in-house",
    description:
      "Movies Ordered Using Pairwise. A film ranking app that replaces broken star ratings with head-to-head comparisons — pick this or that, and build a perfectly ordered list of your favourites.",
    preview: <MoupPreview />,
  },
  {
    id: "volleytube",
    brand: "volleytube",
    category: "app · in-house",
    tag: "coming soon",
    description:
      "A community sports app for Sydney volleyball: match results, video clips, and player profiles across the PVL, SVL, and YSVL leagues.",
    preview: <VolleytubePreview />,
  },
  {
    id: "provolley",
    brand: "ProVolley",
    category: "website · client work",
    tag: "coming soon",
    description:
      "One of the most reputable clubs in the Premier Volleyball League and Sydney Volleyball League.",
    preview: <ProvolleyPreview />,
  },
];
