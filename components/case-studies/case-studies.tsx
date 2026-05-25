import type { ReactNode } from "react";
import { CaatPreview } from "@/components/work/previews/CaatPreview";
import { MoupPreview } from "@/components/work/previews/MoupPreview";
import { LunchDossierPreview } from "@/components/work/previews/LunchDossierPreview";

export interface CaseStudy {
  slug: string;
  brand: string;
  eyebrow: string;
  /** One-line hook under the title. */
  lede: string;
  /** Short blurb shown on the folder card. */
  cardBlurb: string;
  meta: { label: string; value: string }[];
  /** Preview node for the folder card. */
  preview: ReactNode;
  /** YouTube id for the demo facade. Omit to hide the demo band. */
  demoVideoId?: string;
  demoCaption?: string;
  problem: { kicker: string; heading: string; paras: string[] };
  quote?: { text: string; by: string };
  build: {
    kicker: string;
    heading: string;
    paras: string[];
    features: { title: string; body: string }[];
  };
  outcome: {
    kicker: string;
    heading: string;
    paras: string[];
    stats: { value: string; label: string }[];
  };
  liveUrl?: string;
  liveLabel?: string;
  ctaHeading: string;
  /** Placeholder card with no write-up yet. */
  comingSoon?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "caat",
    brand: "caat",
    eyebrow: "case study",
    lede: "turning the chaos of applying to university into one place that finally makes sense.",
    cardBlurb:
      "a college application platform that pulls every deadline, essay, scholarship, and document into one place.",
    meta: [
      { label: "what we did", value: "product + full build" },
      { label: "sector", value: "edtech" },
      { label: "stack", value: "next.js · supabase" },
      { label: "status", value: "live at mycaat.com" },
    ],
    preview: <CaatPreview />,
    demoVideoId: "ESIc6o3kMpk",
    demoCaption: "the caat product demo, two minutes start to finish.",
    problem: {
      kicker: "the problem",
      heading: "students think in schools. most tools don't.",
      paras: [
        "applying to university is a scramble of moving parts. essays sit under one tab, documents in another folder, scholarships somewhere else again, and a dozen deadlines are scattered across browser bookmarks and sticky notes.",
        "we kept hearing the same thing from students. they don't think in essays or documents, they think in schools. “what does this university actually need from me, and how close am i?” but the tools were built around the pieces, so the student ended up being the glue holding everything together.",
      ],
    },
    quote: {
      text: "international students shouldn't need a project manager just to apply to college.",
      by: "the founder, on why caat exists",
    },
    build: {
      kicker: "what we built",
      heading: "we made the school application the spine of the whole product.",
      paras: [
        "every school a student is applying to gets its own hub. it pulls together the essays that school needs, the documents on its checklist, the scholarships worth chasing, and a simple readiness bar that shows exactly how close they are to hitting submit.",
        "the libraries didn't go away. essays and documents still live in their own organised spaces, but now they surface in the right place at the right time. nothing is lost, and the student stops being the integration layer.",
      ],
      features: [
        {
          title: "one tracker for everything",
          body: "every deadline, requirement, and document for every school, in one honest timeline.",
        },
        {
          title: "essay workshop",
          body: "prompts, tips, and drafts that save as you write, so a good line is never lost.",
        },
        {
          title: "scholarship finder",
          body: "surfaces scholarships that match your profile and tracks each one from interested to awarded.",
        },
        {
          title: "resume builder",
          body: "templates admissions offices actually expect, with a clean live preview.",
        },
      ],
    },
    outcome: {
      kicker: "the outcome",
      heading: "from a pile of useful tools to one coherent assistant.",
      paras: [
        "caat indexes thousands of universities and reorganises the whole process around the way students actually work. the pieces that used to feel like separate apps now feel like one product that has your back.",
      ],
      stats: [
        { value: "10,000+", label: "universities you can search and shortlist" },
        { value: "5", label: "tools in one: tracker, essays, scholarships, resume, docs" },
        { value: "1", label: "home for the entire application" },
      ],
    },
    liveUrl: "https://www.mycaat.com",
    liveLabel: "mycaat.com",
    ctaHeading: "got something that feels this tangled?",
  },
  {
    slug: "moup",
    brand: "moup",
    eyebrow: "case study",
    lede: "coming soon.",
    cardBlurb:
      "a film ranking app that replaces broken star ratings with head-to-head comparisons.",
    meta: [],
    preview: <MoupPreview />,
    problem: { kicker: "", heading: "", paras: [] },
    build: { kicker: "", heading: "", paras: [], features: [] },
    outcome: { kicker: "", heading: "", paras: [], stats: [] },
    ctaHeading: "",
    comingSoon: true,
  },
  {
    slug: "lunch-dossier",
    brand: "the lunch dossier",
    eyebrow: "case study",
    lede: "coming soon.",
    cardBlurb:
      "a small dossier for the team-lunch ritual: rotate who picks, run quick votes, keep an honest archive.",
    meta: [],
    preview: <LunchDossierPreview />,
    problem: { kicker: "", heading: "", paras: [] },
    build: { kicker: "", heading: "", paras: [], features: [] },
    outcome: { kicker: "", heading: "", paras: [], stats: [] },
    ctaHeading: "",
    comingSoon: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug && !c.comingSoon);
}

/** Slugs that have a real write-up (used for static params). */
export const publishedCaseStudies = caseStudies.filter((c) => !c.comingSoon);
