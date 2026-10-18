"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { YouTubeStage } from "./YouTubeStage";
import { VideoStage } from "./VideoStage";
import type { Project } from "./projects";
import styles from "./ProjectModal.module.css";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ENTER_MS = 320;
const EXIT_MS = 220;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function ProjectModal({ project, onClose }: Props) {
  const [renderProject, setRenderProject] = useState<Project | null>(project);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [thumbScroll, setThumbScroll] = useState({ prev: false, next: false });
  const [moreBelow, setMoreBelow] = useState(false);
  const [fullImage, setFullImage] = useState<{ src: string; alt: string; width: number; height: number } | null>(null);
  // The keyboard handler below is bound once per open; refs let it see the
  // current lightbox state and gallery position without rebinding.
  const expandedRef = useRef(false);
  expandedRef.current = expanded;
  const stepRef = useRef<(dir: 1 | -1) => void>(() => {});
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Reset gallery slot when switching projects
  useEffect(() => {
    if (project) {
      setActiveIdx(0);
      setExpanded(false);
    }
  }, [project]);

  // Keep the selected thumbnail in view when the strip scrolls.
  useEffect(() => {
    const thumb = thumbsRef.current?.children[activeIdx] as HTMLElement | undefined;
    const strip = thumbsRef.current;
    if (!thumb || !strip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: "smooth" });
  }, [activeIdx]);

  // Screenshots and photos open at their own shape, filling the screen; read
  // the original from the stage's ImagePreview tile. Hand-built mockups have
  // no original and keep the 16:10 tile they were designed for.
  useLayoutEffect(() => {
    if (!expanded) return;
    const tile = stageRef.current?.querySelector<HTMLElement>("[data-full-src]");
    setFullImage(
      tile
        ? {
            src: tile.dataset.fullSrc!,
            alt: tile.dataset.fullAlt ?? "",
            width: Number(tile.dataset.fullWidth),
            height: Number(tile.dataset.fullHeight),
          }
        : null,
    );
  }, [expanded, activeIdx]);

  // Show the strip's arrows only while there are more thumbnails that way.
  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const update = () =>
      setThumbScroll({
        prev: strip.scrollLeft > 2,
        next: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2,
      });
    update();
    strip.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    return () => {
      strip.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [renderProject]);
  const scrollThumbs = (dir: 1 | -1) =>
    thumbsRef.current?.scrollBy({ left: dir * thumbsRef.current.clientWidth * 0.75, behavior: "smooth" });

  // Show the fade cue while the scrollable body has more content below.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const update = () => setMoreBelow(body.scrollHeight - body.scrollTop - body.clientHeight > 24);
    update();
    body.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(body);
    Array.from(body.children).forEach((child) => observer.observe(child));
    return () => {
      body.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [renderProject]);

  // Move focus into the full-size view when it opens.
  useEffect(() => {
    if (expanded) lightboxRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [expanded]);

  // Mount/unmount + enter/exit transitions
  useEffect(() => {
    if (project) {
      setRenderProject(project);
      // Double RAF so the browser paints the collapsed state before we flip
      // `visible` — otherwise the opacity/transform transition has nothing to
      // animate from and the modal just snaps in.
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        if (inner) cancelAnimationFrame(inner);
      };
    }
    setVisible(false);
    const t = window.setTimeout(() => setRenderProject(null), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [project]);

  // Focus, scroll lock, escape, focus trap
  useEffect(() => {
    if (!renderProject || !visible) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), ENTER_MS);
    const prevOverflow = document.body.style.overflow;
    const prevRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        // Escape steps back one layer: full-size view first, then the modal.
        if (expandedRef.current) setExpanded(false);
        else onClose();
        return;
      }
      if (expandedRef.current && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        stepRef.current(e.key === "ArrowLeft" ? -1 : 1);
        return;
      }
      const trap = expandedRef.current ? lightboxRef.current : dialogRef.current;
      if (e.key === "Tab" && trap) {
        const focusables = trap.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevRootOverflow;
      previousFocus.current?.focus();
    };
  }, [renderProject, visible, onClose]);

  if (!renderProject) return null;
  const active = renderProject.gallery[activeIdx] ?? renderProject.gallery[0];
  // The full-size view steps through still shots only; videos have their own
  // player controls.
  const stills = renderProject.gallery.flatMap((item, i) => (item.video ? [] : [i]));
  const stillPos = stills.indexOf(activeIdx);
  stepRef.current = (dir) => {
    if (stills.length < 2) return;
    setActiveIdx(stills[(stillPos + dir + stills.length) % stills.length]);
  };

  return (
    <div
      onClick={onClose}
      aria-hidden={!visible}
      className={styles.overlay}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${visible ? ENTER_MS : EXIT_MS}ms ${EASE}`,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={styles.panel}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: `opacity ${visible ? ENTER_MS : EXIT_MS}ms ${EASE}, transform ${visible ? ENTER_MS : EXIT_MS}ms ${EASE}`,
        }}
      >
        <header className={styles.header}>
          <div className={styles.heading}>
            <h2
              id="project-modal-title"
              className={styles.title}
            >
              {renderProject.brand}
            </h2>
            {renderProject.subtitle && (
              <p className={styles.subtitle}>{renderProject.subtitle}</p>
            )}
            <div className={styles.meta}>
              {renderProject.category}
              {renderProject.tag ? (
                <span className={styles.tag}>
                  {renderProject.tag}
                </span>
              ) : null}
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className={styles.close}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>

        <div className={styles.body} ref={bodyRef}>
          <div className={styles.gallery}>
            <div className={styles.stage} key={active.id} ref={stageRef}>
              {active.video ? (
                active.video.src ? (
                  <VideoStage
                    src={active.video.src}
                    poster={active.video.poster}
                    title={`${renderProject.brand} demo`}
                    fallbackYoutubeId={active.video.youtubeId}
                  />
                ) : (
                  <YouTubeStage
                    youtubeId={active.video.youtubeId!}
                    poster={active.video.poster}
                    title={`${renderProject.brand} demo`}
                  />
                )
              ) : (
                <>
                  <div className={styles.stageFrame} onClick={() => setExpanded(true)}>
                    {active.node}
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label={`View ${active.alt} full size`}
                    className={styles.expand}
                  >
                    <Maximize2 size={15} strokeWidth={1.6} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail strip. Up to 4 shots fill the row; with more (e.g. a
               demo video pushed in front) it becomes a horizontal scroller so
               the first ~4 stay full-size and the rest peek to signal scroll. */}
            <div className={styles.thumbWrap}>
            {thumbScroll.prev && (
              <button
                type="button"
                aria-label="Scroll thumbnails back"
                className={cn(styles.thumbArrow, styles.thumbPrev)}
                onClick={() => scrollThumbs(-1)}
              >
                <ChevronLeft size={16} strokeWidth={1.8} />
              </button>
            )}
            <div
              ref={thumbsRef}
              className={cn(
                "gap-2",
                renderProject.gallery.length > 4
                  ? "flex overflow-x-auto pb-1 [scrollbar-width:thin]"
                  : "grid grid-cols-4",
              )}
            >
              {renderProject.gallery.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`view ${item.alt}`}
                  aria-current={i === activeIdx ? "true" : undefined}
                  className={cn(
                    styles.thumbnail,
                    renderProject.gallery.length > 4 &&
                      "shrink-0 basis-[calc((100%-1.5rem)/4.4)]",
                    i === activeIdx
                      ? styles.selected
                      : styles.unselected,
                  )}
                  style={{ transitionTimingFunction: EASE }}
                >
                  {item.video ? (
                    // Video slot: poster image + a small glass play badge so the
                    // thumbnail reads as "video" rather than a static shot.
                    <>
                      <Image
                        src={item.video.poster}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-black/15" />
                      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/45 bg-white/20 backdrop-blur-sm"
                          style={{ WebkitBackdropFilter: "blur(4px)" }}
                        >
                          <span
                            className="ml-[2px] block h-0 w-0"
                            style={{
                              borderStyle: "solid",
                              borderWidth: "4px 0 4px 7px",
                              borderColor: "transparent transparent transparent #fff",
                            }}
                          />
                        </span>
                      </span>
                    </>
                  ) : (
                    /* Scaled-down preview filling the thumbnail. The inner
                       wrapper is 5x the thumbnail size and then scaled to 20%,
                       so the preview renders at near-natural fidelity (text,
                       borders, mockups stay crisp) while visually fitting the
                       thumbnail. pointer-events disabled so the button still
                       captures clicks. */
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 origin-top-left"
                      style={{
                        width: "500%",
                        height: "500%",
                        transform: "scale(0.2)",
                      }}
                    >
                      {item.node}
                    </div>
                  )}
                  <span className="absolute bottom-1.5 left-1.5 z-10 inline-flex rounded-[3px] bg-black/55 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.22em] font-light text-white/85 backdrop-blur-sm">
                    {item.id}
                  </span>
                </button>
              ))}
            </div>
            {thumbScroll.next && (
              <button
                type="button"
                aria-label="Scroll thumbnails forward"
                className={cn(styles.thumbArrow, styles.thumbNext)}
                onClick={() => scrollThumbs(1)}
              >
                <ChevronRight size={16} strokeWidth={1.8} />
              </button>
            )}
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {renderProject.liveUrl ? (
                [
                  { href: renderProject.liveUrl, label: renderProject.liveLabel ?? renderProject.liveUrl },
                  ...(renderProject.moreLiveLinks ?? []),
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("group", styles.liveLink)}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
                    />
                  </a>
                ))
              ) : (
                <span className={styles.tag}>
                  not live yet
                </span>
              )}

              {renderProject.legalLinks && renderProject.legalLinks.length > 0 && (
                <ul className={styles.legalLinks}>
                  {renderProject.legalLinks.map((link) => {
                    const isExternal = /^https?:\/\//.test(link.href);
                    const className = styles.legalLink;
                    // Always a real anchor — never next/link. The modal lives in
                    // the @modal parallel slot, and a soft navigation to an
                    // internal legal page (e.g. /volleytube/privacy) doesn't match
                    // the slot, so Next keeps the modal mounted on top of the doc.
                    // A full navigation leaves the modal context and renders the
                    // page on its own.
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={className}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className={styles.description}>
              {(renderProject.detail && renderProject.detail.length > 0
                ? renderProject.detail
                : [renderProject.description]
              ).map((block, i) =>
                typeof block === "string" ? (
                  <p key={i}>{block}</p>
                ) : (
                  <h3 key={i} className={styles.detailHeading}>{block.heading}</h3>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={styles.moreFade} data-visible={moreBelow} aria-hidden="true">
          <ChevronDown size={18} strokeWidth={1.5} />
        </div>
      </div>
      {expanded && !active.video && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.alt}, full size`}
          className={styles.lightbox}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(false);
          }}
        >
          {fullImage ? (
            <Image
              key={fullImage.src}
              src={fullImage.src}
              alt={fullImage.alt}
              width={fullImage.width}
              height={fullImage.height}
              sizes="100vw"
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className={styles.lightboxFrame} onClick={(e) => e.stopPropagation()}>
              {active.node}
            </div>
          )}
          <button
            type="button"
            aria-label="Close full size view"
            className={cn(styles.lightboxButton, styles.lightboxClose)}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          {stills.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className={cn(styles.lightboxButton, styles.lightboxPrev)}
                onClick={(e) => {
                  e.stopPropagation();
                  stepRef.current(-1);
                }}
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className={cn(styles.lightboxButton, styles.lightboxNext)}
                onClick={(e) => {
                  e.stopPropagation();
                  stepRef.current(1);
                }}
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
              <span className={styles.lightboxCount} aria-live="polite">
                {stillPos + 1} / {stills.length}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
