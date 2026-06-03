import type { ReactNode } from "react";
import { CaatPreview } from "@/components/work/previews/CaatPreview";
import { MoupPreview } from "@/components/work/previews/MoupPreview";
import { LunchDossierPreview } from "@/components/work/previews/LunchDossierPreview";
import { ImagePreview } from "@/components/work/previews/ImagePreview";

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
  /**
   * Optional locally-hosted poster for the demo facade. Falls back to
   * YouTube's thumbnail when omitted.
   */
  demoPoster?: string;
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
    demoPoster: "/projects/caat/demo-poster.jpg",
    demoCaption: "the caat product demo.",
    problem: {
      kicker: "the problem",
      heading: "students think in schools. most tools don't.",
      paras: [
        "applying to university is a scramble of moving parts. essays sit under one tab, documents in another folder, scholarships somewhere else again, and a dozen deadlines are scattered across browser bookmarks and sticky notes.",
        "we kept hearing the same thing from students. they don't think in essays or documents, they think in schools. “what does this university actually need from me, and how close am i?” but the tools were built around the pieces, so the student ended up being the glue holding everything together.",
      ],
    },
    quote: {
      text: "international students shouldn't need a paid agent just to apply to college.",
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
        {
          value: "10,000+",
          label: "universities you can search and shortlist",
        },
        {
          value: "5",
          label: "tools in one: tracker, essays, scholarships, resume, docs",
        },
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
    lede: "the daily 'so where are we eating' scramble, turned into one walkable shortlist the whole office actually trusts.",
    cardBlurb:
      "the office-lunch ritual, settled: a walkable shortlist, quick votes, and an honest record of everywhere you've already been.",
    meta: [
      { label: "what we did", value: "product + full build" },
      { label: "sector", value: "workplace + food" },
      { label: "stack", value: "next.js · supabase" },
      { label: "status", value: "live at the-lunch-dossier.vercel.app" },
    ],
    preview: <LunchDossierPreview />,
    problem: {
      kicker: "the problem",
      heading: "free lunch sounds simple. picking it every day isn't.",
      paras: [
        "at the job i had at the time, lunch was on the house. mostly a perk with no catch, but the same thing happened every day. someone asked where we were eating, a few names got thrown around, half were a fifteen minute walk each way, and ten minutes later we'd land on the same two spots we always did.",
        "the constraint nobody said out loud was distance. you get maybe forty five minutes, so the only options that count are the ones you can walk to and back without eating at your desk. but that quick read on what's close and good lived in people's heads, so the nearest two places won by default and the decision quietly cost the team time every day.",
        "i kept thinking there should be one shared place for it. not a delivery app, not a reviews site, just the office's own short list of where you can walk to and whose turn it is to pick. that's where the lunch dossier started.",
      ],
    },
    quote: {
      text: "the hard part of free lunch was never the food. it was the day it landed on you to pick, when a perk quietly turned into a chore.",
      by: "the founder, on where the idea came from",
    },
    build: {
      kicker: "what we built",
      heading: "one shared dossier built around the office, not the app.",
      paras: [
        "you tell it where the office is, and everything sorts by walking distance. the list only shows places you can realistically reach and get back from, the ones you keep going to rise to the top, and the worn-out ones are easy to spot.",
        "the daily pick gets a little structure too. each day it's one person's turn to choose, the team can put it to a vote when the choice matters, and every lunch gets logged. after a few weeks, that running log of where you've already been is what stops everyone circling back to the same three places.",
      ],
      features: [
        {
          title: "walkable by default",
          body: "set the office address once and every place is ranked by walking distance, so the list is only ever somewhere you can reach on a lunch break.",
        },
        {
          title: "whose turn is it",
          body: "a simple rotation for who picks, so it stops landing on the same person every time.",
        },
        {
          title: "quick votes",
          body: "drop two or three options and let the table settle it in a few taps, not a five minute huddle.",
        },
        {
          title: "an honest archive",
          body: "every lunch gets logged, so you can skip the repeats and give forgotten places another look.",
        },
      ],
    },
    outcome: {
      kicker: "the outcome",
      heading: "the same daily question, finally answered in one place.",
      paras: [
        "it takes the part of free lunch that quietly cost everyone time, the where, and makes it something the whole office can see and trust. the walk-to list is right there, the rotation keeps it fair, and the decision gets easier the more you use it.",
        "it's the kind of small, specific tool we like building at purpl: a piece of daily friction everyone had stopped noticing, made into something that just quietly works.",
      ],
      stats: [
        {
          value: "1",
          label: "shared dossier instead of a daily debate by the door",
        },
        {
          value: "~5 min",
          label: "handed back to the team on every lunch decision",
        },
        {
          value: "0",
          label: "accidental repeat visits to the same tired spot",
        },
      ],
    },
    liveUrl: "https://the-lunch-dossier.vercel.app",
    liveLabel: "the-lunch-dossier.vercel.app",
    ctaHeading:
      "got a tiny daily ritual that's quietly costing your team time?",
  },
  {
    slug: "terminl",
    brand: "terminl",
    eyebrow: "case study",
    lede: "coming soon.",
    cardBlurb:
      "coding-interview prep that teaches by pattern, with animated walkthroughs and an ai coach that reviews your code.",
    meta: [],
    preview: (
      <ImagePreview
        src="/projects/terminl/overview.png"
        alt="terminl landing page: stop grinding, start seeing the patterns"
        width={2880}
        height={1800}
        background="#0b0f14"
      />
    ),
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
