import type { ReactNode } from "react";
import { CaatPreview } from "./previews/CaatPreview";
import { MoupPreview } from "./previews/MoupPreview";
import { ProvolleyPreview } from "./previews/ProvolleyPreview";
import { InnerwestPreview } from "./previews/InnerwestPreview";
import { ProsporterPreview } from "./previews/ProsporterPreview";
import { PurplHqPreview } from "./previews/PurplHqPreview";
import { LunchDossierPreview } from "./previews/LunchDossierPreview";
import { ImagePreview } from "./previews/ImagePreview";
import { PhoneShowcase, VolleytubeThumb } from "../volleytube/PhoneShowcase";

export interface GalleryItem {
  id: string;
  alt: string;
  node: ReactNode;
  /**
   * When present, this slot is a video. The modal renders a click-to-play
   * player in the stage and a poster + play badge in the thumbnail, instead of
   * `node`. `node` is still provided as a static fallback poster.
   *
   * Provide either `youtubeId` (YouTube embed, e.g. CAAT) or `src` (a
   * self-hosted file under /public, e.g. VolleyTube). If both are set, `src`
   * wins.
   */
  video?: { poster: string; youtubeId?: string; src?: string };
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
  /**
   * Auxiliary doc links (privacy policy, terms, support page) shown in the
   * modal's right-hand panel beneath the live URL pill. Used for pre-launch
   * apps that need publicly-hosted legal URLs for App Store submission
   * before the app itself ships.
   */
  legalLinks?: { label: string; href: string }[];
  gallery: GalleryItem[];
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
const provolleyPreview = <ProvolleyPreview />;
const innerwestPreview = <InnerwestPreview />;
const prosporterPreview = <ProsporterPreview />;
const purplHqPreview = <PurplHqPreview />;
const lunchDossierPreview = <LunchDossierPreview />;

// Real VolleyTube app screens (device-framed PNGs), grouped into the gallery
// in themed pairs/trios.
const vtScreens = {
  home: { src: "/volleytube/screens/home.png", alt: "VolleyTube home screen with the day's matches" },
  leagues: { src: "/volleytube/screens/leagues.png", alt: "VolleyTube results browsed by league" },
  pvlMen: { src: "/volleytube/screens/results.png", alt: "VolleyTube PVL Premier Men results" },
  videos: { src: "/volleytube/screens/videos.png", alt: "VolleyTube videos feed" },
  matchDetail: { src: "/volleytube/screens/match-detail.png", alt: "VolleyTube match detail with set-by-set scores" },
  matchVideos: { src: "/volleytube/screens/match-videos.png", alt: "VolleyTube clips attached to a match" },
  videoComments: { src: "/volleytube/screens/video-comments.png", alt: "VolleyTube video with comments" },
  ladder: { src: "/volleytube/screens/ladder.png", alt: "VolleyTube league ladder" },
  search: { src: "/volleytube/screens/search.png", alt: "VolleyTube search" },
  saved: { src: "/volleytube/screens/saved.png", alt: "VolleyTube saved items" },
} as const;

// Work-row thumbnail leads with the App Store icon next to two screens.
const volleytubePreview = (
  <VolleytubeThumb phones={[vtScreens.home, vtScreens.pvlMen]} />
);

// terminl uses real captured app screenshots (dark editor theme) for every slot.
const TERMINL_BG = "#0b0f14";
// ProVolley rankings section sits on the site's off-white page background.
const PROVOLLEY_PAGE_BG = "#f8fafc";
const terminlOverview = (
  <ImagePreview
    src="/projects/terminl/overview.png"
    alt="terminl landing page: stop grinding, start seeing the patterns, with feature grid and pricing"
    width={2880}
    height={1800}
    background={TERMINL_BG}
  />
);

const projectsUnordered: Project[] = [
  {
    id: "terminl",
    brand: "terminl",
    category: "webapp · in-house",
    tag: "coming soon",
    description:
      "Coding-interview prep that teaches by pattern: animated walkthroughs, in-browser code, an AI coach that reviews your work, and spaced repetition that makes it stick.",
    detail: [
      "Coming soon. Still in build.",
      "Terminl reframes interview prep around patterns instead of endless grinding. Each pattern gets an animated, step-by-step walkthrough so you see the algorithm move before you write a line. You solve in the browser in Python or JavaScript, get instant AI review on correctness and complexity, and a spaced-repetition queue resurfaces problems right before you'd forget them.",
      "Two ways to run the AI: subscribe and we handle it, or bring your own provider key (Anthropic, OpenAI, DeepSeek, Gemini, OpenRouter). The full write-up lands here when terminl goes live.",
    ],
    preview: terminlOverview,
    gallery: [
      { id: "01", alt: "terminl landing page overview", node: terminlOverview },
      {
        id: "02",
        alt: "today's queue with XP, streak, and badges",
        node: (
          <ImagePreview
            src="/projects/terminl/today.png"
            alt="terminl today page with daily queue, XP/level bar, streak, company filters, and badges"
            width={2880}
            height={1800}
            background={TERMINL_BG}
          />
        ),
      },
      {
        id: "03",
        alt: "in-browser code drill with AI review",
        node: (
          <ImagePreview
            src="/projects/terminl/drill.png"
            alt="terminl drill page with problem statement, in-browser code editor, run, and AI code review"
            width={2880}
            height={1800}
            background={TERMINL_BG}
          />
        ),
      },
      {
        id: "04",
        alt: "animated pattern walkthrough",
        node: (
          <ImagePreview
            src="/projects/terminl/explain.png"
            alt="terminl explain page with an AI walkthrough: core intuition and step-by-step trace"
            width={2880}
            height={1800}
            background={TERMINL_BG}
          />
        ),
      },
    ],
  },
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
    legalLinks: [
      { label: "Privacy Policy", href: "https://www.mycaat.com/privacy" },
      { label: "Terms of Service", href: "https://www.mycaat.com/terms" },
      { label: "Support", href: "https://www.mycaat.com/contact" },
    ],
    gallery: [
      {
        id: "01",
        alt: "product demo video",
        // Click-to-play YouTube walkthrough ("CAAT Product Demo"). The node is
        // a static poster used as a fallback; the modal renders the player from
        // `video` when this slot is active.
        node: (
          <ImagePreview
            src="/projects/caat/demo-poster.jpg"
            alt="caat product demo video"
            width={1280}
            height={720}
            background="#000000"
          />
        ),
        video: {
          youtubeId: "ESIc6o3kMpk",
          poster: "/projects/caat/demo-poster.jpg",
        },
      },
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
    description:
      "A community sports app for Sydney volleyball: match results, video clips, and player profiles across the PVL, SVL, and YSVL leagues.",
    detail: [
      "Sydney volleyball has always had a scattered results problem. Scores from PVL, SVL, and YSVL matches live on the Volleyball NSW website, which works fine for standings but nothing social builds up around it. No clips, no comments, no way to follow players or see what's happening in other leagues without hunting for it.",
      "VolleyTube pulls live results directly from Volleyball NSW, set by set, as matches finish across the weekend. Around that data sits everything social: comments on matches and videos, short clips uploaded courtside to each game's clips tab, full-match recordings shared as YouTube links, player profiles with positions and reach stats, and a home feed that surfaces your next match and activity from people you follow.",
      "If you're rostered for a Premier Men's match Saturday night, it'll be in your feed. If you want to see what happened in SVL Reserve Women while you were playing, it's a tap away. Built by Sydney volleyball players, free on iOS.",
    ],
    preview: volleytubePreview,
    liveUrl: "https://apps.apple.com/au/app/volleytube/id6773233438",
    liveLabel: "Download on the App Store",
    legalLinks: [
      { label: "Privacy Policy", href: "/volleytube/privacy" },
      { label: "Terms of Service", href: "/volleytube/terms" },
      { label: "Support", href: "/volleytube/support" },
    ],
    gallery: [
      {
        id: "01",
        alt: "VolleyTube demo video",
        // Self-hosted ~47s product demo. Stage uses VideoStage; thumbnail uses
        // the poster + play badge. `node` is an unused static fallback.
        node: (
          <ImagePreview
            src="/volleytube/demo-poster.jpg"
            alt="VolleyTube demo video"
            width={1920}
            height={1080}
            background="#000000"
          />
        ),
        video: {
          src: "/volleytube/demo.mp4",
          poster: "/volleytube/demo-poster.jpg",
        },
      },
      {
        id: "02",
        alt: "home, results, and PVL Premier Men",
        node: (
          <PhoneShowcase
            phones={[vtScreens.home, vtScreens.leagues, vtScreens.pvlMen]}
          />
        ),
      },
      {
        id: "03",
        alt: "match detail and match clips",
        node: (
          <PhoneShowcase phones={[vtScreens.matchDetail, vtScreens.matchVideos]} />
        ),
      },
      {
        id: "04",
        alt: "video comments and the videos feed",
        node: (
          <PhoneShowcase phones={[vtScreens.videoComments, vtScreens.videos]} />
        ),
      },
      {
        id: "05",
        alt: "search, saved, and the ladder",
        node: (
          <PhoneShowcase
            phones={[vtScreens.search, vtScreens.saved, vtScreens.ladder]}
          />
        ),
      },
    ],
  },
  {
    id: "provolley",
    brand: "ProVolley",
    category: "website · client work",
    description:
      "One of the most reputable clubs in the Premier Volleyball League and Sydney Volleyball League.",
    // Longer write-up parked in docs/copy/provolley-writeup.md.
    detail: ["Live at provolley.com.au since September 2026."],
    preview: provolleyPreview,
    liveUrl: "https://provolley.com.au",
    liveLabel: "provolley.com.au",
    gallery: [
      { id: "01", alt: "ProVolley homepage hero", node: provolleyPreview },
      {
        id: "02",
        alt: "team rankings table fed live from Volleyball NSW",
        node: (
          <ImagePreview
            src="/projects/provolley/rankings.png"
            alt="ProVolley team rankings and statistics table with played, wins, losses, win rate, points and ladder position for every team"
            width={2560}
            height={1600}
            background={PROVOLLEY_PAGE_BG}
          />
        ),
      },
      {
        id: "03",
        alt: "events calendar with trials and socials",
        node: (
          <ImagePreview
            src="/projects/provolley/calendar.png"
            alt="ProVolley events calendar for September 2026 with colour-coded trials and Thursday mixed socials"
            width={2880}
            height={1800}
            background="#ffffff"
          />
        ),
      },
      {
        id: "04",
        alt: "team page with live season record",
        node: (
          <ImagePreview
            src="/projects/provolley/team.jpg"
            alt="ProVolley Women's Premier team page with season record cards: 13 played, 12 wins, 92% win rate, 1st of 10 on the ladder"
            width={2560}
            height={1600}
            background="#0a1f4c"
          />
        ),
      },
    ],
  },
  {
    id: "innerwest",
    brand: "Inner West Volley",
    category: "website · client work",
    tag: "coming soon",
    description:
      "Sydney's Inner West volleyball club, inclusive indoor and beach volleyball for juniors through to seniors.",
    detail: [
      "Coming soon. Currently in build with Inner West Volleyball Club.",
      "The full write-up lands here when the site goes live.",
    ],
    preview: innerwestPreview,
    gallery: comingSoonGallery(innerwestPreview),
  },
  {
    id: "prosporter",
    brand: "ProSporter",
    category: "online store · client work",
    tag: "coming soon",
    description:
      "An Australian online volleyball store, indoor and beach apparel and gear for players of all levels.",
    detail: [
      "Coming soon. Currently in build with ProSporter Australia.",
      "The full write-up lands here when the site goes live.",
    ],
    preview: prosporterPreview,
    gallery: comingSoonGallery(prosporterPreview),
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
    legalLinks: [
      { label: "Privacy Policy", href: "https://the-lunch-dossier.vercel.app/privacy" },
      { label: "Terms of Service", href: "https://the-lunch-dossier.vercel.app/terms" },
      { label: "Support", href: "https://the-lunch-dossier.vercel.app/support" },
    ],
    gallery: [
      { id: "01", alt: "main preview", node: lunchDossierPreview },
      {
        id: "02",
        alt: "front page with cycle stats and this-week diary",
        node: (
          <ImagePreview
            src="/projects/lunch-dossier/main.png"
            alt="lunch dossier front page with masthead, cycle stats, and within-the-radius list"
            width={1500}
            height={938}
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
            width={1500}
            height={938}
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
            width={1500}
            height={938}
            background="#F0E9D8"
          />
        ),
      },
    ],
  },
  {
    id: "purpl-hq",
    brand: "purpl hq",
    category: "desktop · in-house",
    tag: "coming soon",
    description:
      "A bundle of native desktop productivity tools, powered by your own Claude subscription.",
    detail: [
      "Coming soon. Still in build.",
      "purpl hq is a bundle of native macOS productivity tools that run locally and use your own Claude subscription, so there's no per-message AI bill. The full write-up lands here when purpl hq goes live.",
    ],
    preview: purplHqPreview,
    gallery: comingSoonGallery(purplHqPreview),
  },
];

// Display order for the "our work" gallery. Edit this list to reorder the cards;
// the literal definitions above can stay in any order.
const WORK_ORDER = [
  "caat",
  "volleytube",
  "provolley",
  "innerwest",
  "prosporter",
  "moup",
  "terminl",
  "lunch-dossier",
  "purpl-hq",
];

export const projects: Project[] = [...projectsUnordered].sort(
  (a, b) => WORK_ORDER.indexOf(a.id) - WORK_ORDER.indexOf(b.id),
);
