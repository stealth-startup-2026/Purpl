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
      "Movies Ordered Using Pairwise. A film ranking app that replaces broken star ratings with head-to-head comparisons. Pick this or that, and build a perfectly ordered list of your favourites.",
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
  // {
  //   id: "placeholder-1",
  //   brand: "placeholder one",
  //   category: "webapp · placeholder",
  //   tag: "placeholder",
  //   description: "Placeholder project for animation testing.",
  //   preview: <div className="aspect-video w-full rounded-xl bg-white/5" />,
  // },
  // {
  //   id: "placeholder-2",
  //   brand: "placeholder two",
  //   category: "app · placeholder",
  //   tag: "placeholder",
  //   description: "Placeholder project for animation testing.",
  //   preview: <div className="aspect-video w-full rounded-xl bg-white/5" />,
  // },
  // {
  //   id: "placeholder-3",
  //   brand: "placeholder three",
  //   category: "website · placeholder",
  //   tag: "placeholder",
  //   description: "Placeholder project for animation testing.",
  //   preview: <div className="aspect-video w-full rounded-xl bg-white/5" />,
  // },
  // {
  //   id: "placeholder-4",
  //   brand: "placeholder four",
  //   category: "webapp · placeholder",
  //   tag: "placeholder",
  //   description: "Placeholder project for animation testing.",
  //   preview: <div className="aspect-video w-full rounded-xl bg-white/5" />,
  // },
];
