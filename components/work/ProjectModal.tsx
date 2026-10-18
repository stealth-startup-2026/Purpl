"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Reset gallery slot when switching projects
  useEffect(() => {
    if (project) setActiveIdx(0);
  }, [project]);

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
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
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
          <div className="flex flex-col gap-1.5 min-w-0">
            <h2
              id="project-modal-title"
              className={styles.title}
            >
              {renderProject.brand}
              {renderProject.subtitle && (
                <span className={styles.subtitle}>{renderProject.subtitle}</span>
              )}
            </h2>
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

        <div className={styles.body}>
          <div className={styles.gallery}>
            <div className={styles.stage} key={active.id}>
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
                active.node
              )}
            </div>
            {/* Thumbnail strip. Up to 4 shots fill the row; with more (e.g. a
               demo video pushed in front) it becomes a horizontal scroller so
               the first ~4 stay full-size and the rest peek to signal scroll. */}
            <div
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
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {renderProject.liveUrl ? (
                <a
                  href={renderProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("group", styles.liveLink)}
                >
                  {renderProject.liveLabel ?? renderProject.liveUrl}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
                  />
                </a>
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
      </div>
    </div>
  );
}
