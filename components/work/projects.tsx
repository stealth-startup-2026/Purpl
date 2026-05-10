import type { ReactNode } from "react";
import { CaatPreview } from "./previews/CaatPreview";
import { MoupPreview } from "./previews/MoupPreview";
import { VolleytubePreview } from "./previews/VolleytubePreview";
import { ProvolleyPreview } from "./previews/ProvolleyPreview";
import { LunchDossierPreview } from "./previews/LunchDossierPreview";
import { ImagePreview } from "./previews/ImagePreview";

export interface GalleryItem {
  id: string;
  alt: string;
  node: ReactNode;
}

export interface Project {
  id: string;
  brand: string;
  category: string;
  /** Short blurb shown on the row in the project list. */
  description: string;
  /**
   * Longer write-up shown in the modal. One entry per paragraph.
   * Falls back to `description` if omitted.
   */
  detail?: string[];
  tag?: string;
  preview: ReactNode;
  liveUrl?: string;
  liveLabel?: string;
  gallery: GalleryItem[];
}

function PlaceholderImage({ index }: { index: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#4a3a6c] to-[#2a1f3d]">
      <span className="text-[0.7rem] uppercase tracking-[0.22em] font-light text-white/30">
        image {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}

function placeholderGallery(hero: ReactNode, count = 4): GalleryItem[] {
  const items: GalleryItem[] = [
    { id: "01", alt: "main preview", node: hero },
  ];
  for (let i = 2; i <= count; i++) {
    items.push({
      id: String(i).padStart(2, "0"),
      alt: `placeholder image ${i}`,
      node: <PlaceholderImage index={i} />,
    });
  }
  return items;
}

const caatPreview = <CaatPreview />;
const moupPreview = <MoupPreview />;
const volleytubePreview = <VolleytubePreview />;
const provolleyPreview = <ProvolleyPreview />;
const lunchDossierPreview = <LunchDossierPreview />;

export const projects: Project[] = [
  {
    id: "caat",
    brand: "caat",
    category: "webapp · in-house",
    description:
      "A college application platform where students track every deadline, essay, scholarship, and document, all in one place.",
    detail: [
      "[detail paragraph 1 — write a longer story about caat here]",
      "[detail paragraph 2 — what we built, how it came together, what's next]",
    ],
    preview: caatPreview,
    liveUrl: "https://www.mycaat.com",
    liveLabel: "mycaat.com",
    gallery: [
      { id: "01", alt: "main preview", node: caatPreview },
      {
        id: "02",
        alt: "dashboard with widget grid",
        node: (
          <ImagePreview
            src="/projects/caat/dashboard.png"
            alt="caat dashboard with application readiness, to-do list, and widget grid"
            width={1247}
            height={701}
          />
        ),
      },
      {
        id: "03",
        alt: "essay workshop with prompts and tips",
        node: (
          <ImagePreview
            src="/projects/caat/essay-workshop.png"
            alt="caat essay workshop with prompts sidebar and response editor"
            width={1112}
            height={626}
          />
        ),
      },
      {
        id: "04",
        alt: "resume builder with live preview",
        node: (
          <ImagePreview
            src="/projects/caat/resume-builder.png"
            alt="caat resume builder with section editor and live A4 preview"
            width={1264}
            height={711}
          />
        ),
      },
    ],
  },
  {
    id: "moup",
    brand: "moup",
    category: "webapp · in-house",
    description:
      "Movies Ordered Using Pairwise. A film ranking app that replaces broken star ratings with head-to-head comparisons. Pick this or that, and build a perfectly ordered list of your favourites.",
    detail: [
      "[detail paragraph 1 — write a longer story about moup here]",
      "[detail paragraph 2 — what we built, how it came together, what's next]",
    ],
    preview: moupPreview,
    liveUrl: "https://moup.app",
    liveLabel: "moup.app",
    gallery: placeholderGallery(moupPreview),
  },
  {
    id: "volleytube",
    brand: "volleytube",
    category: "app · in-house",
    tag: "coming soon",
    description:
      "A community sports app for Sydney volleyball: match results, video clips, and player profiles across the PVL, SVL, and YSVL leagues.",
    detail: [
      "[detail paragraph 1 — write a longer story about volleytube here]",
      "[detail paragraph 2 — what we built, how it came together, what's next]",
    ],
    preview: volleytubePreview,
    gallery: placeholderGallery(volleytubePreview),
  },
  {
    id: "provolley",
    brand: "ProVolley",
    category: "website · client work",
    tag: "coming soon",
    description:
      "One of the most reputable clubs in the Premier Volleyball League and Sydney Volleyball League.",
    detail: [
      "[detail paragraph 1 — write a longer story about ProVolley here]",
      "[detail paragraph 2 — what we built, how it came together, what's next]",
    ],
    preview: provolleyPreview,
    gallery: placeholderGallery(provolleyPreview),
  },
  {
    id: "lunch-dossier",
    brand: "the lunch dossier",
    category: "webapp · in-house",
    tag: "coming soon",
    description:
      "A small dossier for the Friday-lunch ritual: rotate who picks, run quick votes, and keep an honest archive of where your team has eaten.",
    detail: [
      "[detail paragraph 1 — write a longer story about the lunch dossier here]",
      "[detail paragraph 2 — what we built, how it came together, what's next]",
    ],
    preview: lunchDossierPreview,
    gallery: placeholderGallery(lunchDossierPreview),
  },
];
