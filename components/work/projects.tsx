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

function ComingSoonPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#4a3a6c] to-[#2a1f3d]">
      <span className="text-[0.7rem] uppercase tracking-[0.22em] font-light text-white/40">
        coming soon
      </span>
    </div>
  );
}

function comingSoonGallery(hero: ReactNode, count = 4): GalleryItem[] {
  const items: GalleryItem[] = [
    { id: "01", alt: "main preview", node: hero },
  ];
  for (let i = 2; i <= count; i++) {
    items.push({
      id: String(i).padStart(2, "0"),
      alt: "coming soon",
      node: <ComingSoonPlaceholder />,
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
      "I applied to universities overseas a few years back as an international student. Every school wanted different exams, essays, forms, and evidence. I was juggling spreadsheets, Google Docs, Drive folders, and a group chat with friends doing the same thing. None of it talked to anything else. CAAT started because that mess shouldn't be the price of studying abroad.",
      "So we built one place to keep all of it. You search 10,000+ universities, add your shortlist, and the tracker holds every deadline, requirement, and document. The Essay Workshop walks you through prompts and saves drafts. The Scholarship Finder surfaces matches. The Resume Builder uses templates admissions offices expect. Transcripts and rec letters sit in encrypted storage. A community feed lets students compare notes on results, scores, and what worked. International students shouldn't need a project manager to apply to college.",
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
      "It started with a friend calling me out for never giving things ratings. We'd be talking about a film or a show and I'd just say whether I liked it or not. My defence was that 1-10 is inherently flawed. Tell someone a restaurant was a 6/10 and the first thing they ask is 'what was wrong with it?' Somewhere along the way 7/10 became socially accepted as average, which leaves 8-9-10 as the only real band to rank the stuff you actually like. Two films on the same number can also feel completely different. The digit just flattens what made each one good. What pulled me out of that loop was thinking about ranking in competitive games. Chess, Counter-Strike, League of Legends. Ranks there aren't assigned. They're earned through head-to-head results.",
      "moup is what happens when you point that idea at film and replace 1-10 with one question: do you like this or that more? Search any title, log it, add to a watchlist, then keep running those quick gut calls. The ordered list of your favourites drops out the bottom. The first version is something we're genuinely happy with. Next on the roadmap is Letterboxd import. Most film people already have years of ratings sitting there, and asking them to start from zero is a real barrier. The goal isn't max users. If you've got a minute, the live demo's on the landing page.",
    ],
    preview: moupPreview,
    liveUrl: "https://moup.app",
    liveLabel: "moup.app",
    gallery: [
      { id: "01", alt: "main preview", node: moupPreview },
      {
        id: "02",
        alt: "search and browse view with movie grid",
        node: (
          <ImagePreview
            src="/projects/moup/search.png"
            alt="moup search page with movie grid, masthead, search bar, and floating bottom nav"
            width={2000}
            height={1051}
            background="#0A0A0B"
          />
        ),
      },
      {
        id: "03",
        alt: "pairwise comparison view with two film posters",
        node: (
          <ImagePreview
            src="/projects/moup/pairwise.png"
            alt="moup pairwise page asking the user to choose between Malena and Send Help"
            width={2000}
            height={1054}
            background="#0A0A0B"
          />
        ),
      },
      {
        id: "04",
        alt: "ranked list of films from pairwise results",
        node: (
          <ImagePreview
            src="/projects/moup/rankings.png"
            alt="moup rankings page with The Super Mario Galaxy Movie, Malena, Swapped, Send Help, and Apex ordered top to bottom"
            width={2000}
            height={1056}
            background="#0A0A0B"
          />
        ),
      },
    ],
  },
  {
    id: "volleytube",
    brand: "volleytube",
    category: "app · in-house",
    tag: "coming soon",
    description:
      "A community sports app for Sydney volleyball: match results, video clips, and player profiles across the PVL, SVL, and YSVL leagues.",
    detail: [
      "Coming soon. Still in build.",
      "The full story lands here once VolleyTube is live.",
    ],
    preview: volleytubePreview,
    gallery: comingSoonGallery(volleytubePreview),
  },
  {
    id: "provolley",
    brand: "ProVolley",
    category: "website · client work",
    tag: "coming soon",
    description:
      "One of the most reputable clubs in the Premier Volleyball League and Sydney Volleyball League.",
    detail: [
      "Coming soon. Currently in build with the ProVolley club.",
      "The full write-up lands here when the site goes live.",
    ],
    preview: provolleyPreview,
    gallery: comingSoonGallery(provolleyPreview),
  },
  {
    id: "lunch-dossier",
    brand: "the lunch dossier",
    category: "webapp · in-house",
    description:
      "A small dossier for the team-lunch ritual: rotate who picks, run quick votes, and keep an honest archive of where your team has eaten.",
    detail: [
      "A lot of offices do free team lunches, and it sounds great until you actually try to run one. Someone has to pick the place, half the team's been there twice, somebody mentions burgers, somebody else groans, and forty minutes later you're still in the kitchen scrolling Maps. We kept having the same argument. Worse, by the third month nobody could remember whether we'd already been to that pho place around the corner or just talked about going. The free part stops feeling free when the decision tax keeps eating into the lunch hour.",
      "The Lunch Dossier is built around one idea: the office, the walkable restaurants around it, and a clean record of every team lunch you've had. Set one lunch day or set five and the rotation adapts. The desk shows what's left in the cycle, who's on duty, and quick filters for cuisine, distance, and what's open at lunchtime. There's a small roulette for the days nobody wants to decide. Each lunch day gets its own issue, published like a tiny newspaper, which turns the ritual into something the team actually looks forward to instead of admin. By the end of the cycle every walkable place has had its turn and it starts over. Free lunches go back to feeling free.",
    ],
    preview: lunchDossierPreview,
    liveUrl: "https://the-lunch-dossier.vercel.app",
    liveLabel: "the-lunch-dossier.vercel.app",
    gallery: [
      { id: "01", alt: "main preview", node: lunchDossierPreview },
      {
        id: "02",
        alt: "front page with cycle stats and this-week diary",
        node: (
          <ImagePreview
            src="/projects/lunch-dossier/main.png"
            alt="lunch dossier front page with masthead, cycle stats, and within-the-radius list"
            width={1506}
            height={941}
            background="#F0E9D8"
          />
        ),
      },
      {
        id: "03",
        alt: "standing orders page with masthead config and members section",
        node: (
          <ImagePreview
            src="/projects/lunch-dossier/standing-orders.png"
            alt="lunch dossier standing orders page with masthead, lunch days, rotation cadence, and members & invitations"
            width={1473}
            height={921}
            background="#F0E9D8"
          />
        ),
      },
      {
        id: "04",
        alt: "the selection page with roulette pick and filterable candidates list",
        node: (
          <ImagePreview
            src="/projects/lunch-dossier/the-selection.png"
            alt="lunch dossier the selection page with roulette draw, cuisine filters, and ranked candidate list"
            width={1488}
            height={930}
            background="#F0E9D8"
          />
        ),
      },
    ],
  },
];
