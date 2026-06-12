import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { VolleytubeAppIcon } from "@/components/volleytube/AppIcon";
import { VolleytubeAppScreens } from "@/components/volleytube/AppScreens";
import { cn } from "@/lib/utils";
import styles from "./waitlist/waitlist.module.css";

export const metadata: Metadata = {
  title: "VolleyTube · Now on the App Store",
  description:
    "VolleyTube is now available on the App Store. The community app for Sydney volleyball — match results, video clips, and player profiles across the PVL, SVL, and YSVL leagues.",
};

const features = [
  {
    no: "01",
    title: "Results",
    body: "Set-by-set scores and final outcomes, posted the moment a match wraps.",
  },
  {
    no: "02",
    title: "Clips",
    body: "Short video highlights uploaded by the people who were actually courtside.",
  },
  {
    no: "03",
    title: "Profiles",
    body: "Positions, clubs, stats, and the plays that show how you play the game.",
  },
];

const mono = { fontFamily: "var(--font-jetbrains), monospace" };

export default function VolleytubePage() {
  return (
    <>
      <TopNav />
      <main className="relative z-[2] flex flex-1 flex-col px-10 py-16 max-sm:px-5 max-sm:py-12">
        <div className="mx-auto my-auto w-full max-w-6xl">
          {/* ---- Hero ---- */}
          <section className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
            <div className="flex flex-col">
              <div
                className={cn("mb-8 flex items-center gap-3.5", styles.reveal)}
                style={{ animationDelay: "0.02s" }}
              >
                <VolleytubeAppIcon className="w-14" />
                <span
                  className="text-[0.78rem] font-medium tracking-[0.22em] text-[var(--color-ink-faint)]"
                  style={mono}
                >
                  VOLLEYTUBE
                </span>
              </div>
              <h1
                className={cn(
                  "text-[2.2rem] leading-[1.05] tracking-[-0.01em] text-white md:text-[3.4rem]",
                  styles.reveal,
                )}
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 300,
                  animationDelay: "0.05s",
                }}
              >
                VolleyTube is now on the App Store.
              </h1>

              <p
                className={cn(
                  "mt-6 max-w-xl text-[1.02rem] font-light leading-[1.7] text-white/75",
                  styles.reveal,
                )}
                style={{ animationDelay: "0.13s" }}
              >
                The community app for Sydney volleyball. Match results, video
                clips, and player profiles across the PVL, SVL, and YSVL
                leagues. Free on iOS.
              </p>

              <div
                className={cn("mt-9", styles.reveal)}
                style={{ animationDelay: "0.21s" }}
              >
                <a
                  href="https://apps.apple.com/au/app/volleytube/id6773233438"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md border border-[var(--color-line)] px-6 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white outline-none transition-[background,border,opacity] hover:bg-white/10"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  Download on the App Store
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Visual */}
            <div
              className={cn("relative", styles.reveal)}
              style={{ animationDelay: "0.29s" }}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 42%, rgba(168,32,26,0.34), transparent 70%)",
                }}
              />
              <VolleytubeAppScreens className="px-2" />
            </div>
          </section>

          {/* ---- What it is ---- */}
          <section
            className={cn(
              "mt-24 border-t border-[var(--color-line-soft)] pt-12 max-sm:mt-16",
              styles.reveal,
            )}
            style={{ animationDelay: "0.37s" }}
          >
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {features.map((f) => (
                <div key={f.no} className="flex flex-col gap-2.5">
                  <span
                    className="text-[0.7rem] font-medium tracking-[0.2em] text-[var(--color-ink-faint)]"
                    style={mono}
                  >
                    {f.no}
                  </span>
                  <h2 className="text-[1.05rem] font-normal tracking-[0.01em] text-white">
                    {f.title}
                  </h2>
                  <p className="text-[0.92rem] font-light leading-[1.65] text-white/65">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
