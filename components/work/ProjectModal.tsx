"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { cn } from "@/lib/utils";
import type { Project } from "./projects";

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
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
      previousFocus.current?.focus();
    };
  }, [renderProject, visible, onClose]);

  if (!renderProject) return null;
  const active = renderProject.gallery[activeIdx] ?? renderProject.gallery[0];

  return (
    <div
      onClick={onClose}
      aria-hidden={!visible}
      className="fixed inset-0 z-[80] flex items-center justify-center p-6 max-sm:p-3"
      style={{
        backgroundColor: "rgba(8, 5, 20, 0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
        className={cn(
          "relative isolate flex w-full max-w-7xl max-h-[94vh] flex-col overflow-hidden rounded-2xl border border-[var(--color-line-soft)]",
          "shadow-[0_30px_80px_rgba(0,0,0,0.6)]",
        )}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
          transition: `opacity ${visible ? ENTER_MS : EXIT_MS}ms ${EASE}, transform ${visible ? ENTER_MS : EXIT_MS}ms ${EASE}`,
        }}
      >
        {/* Signature surface: same radial + grain as the page */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #3f1570 0%, var(--color-bg) 55%, var(--color-bg-deep) 100%)",
          }}
        />
        <GrainOverlay className="absolute inset-0 -z-10 h-full w-full" />

        <header className="flex items-start justify-between gap-6 border-b border-[var(--color-line-soft)] px-10 pt-7 pb-6 max-sm:px-5 max-sm:pt-5 max-sm:pb-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h2
              id="project-modal-title"
              className="text-[1.6rem] md:text-[2rem] font-light tracking-[var(--tracking-title)] text-white truncate"
            >
              {renderProject.brand}
            </h2>
            <div className="text-[0.78rem] tracking-[0.06em] lowercase text-[var(--color-ink-soft)]">
              {renderProject.category}
              {renderProject.tag ? (
                <span className="ml-2.5 inline-block rounded-sm border border-[var(--color-ink-faint)] px-2 py-0.5 align-middle text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[var(--color-ink-soft)]">
                  {renderProject.tag}
                </span>
              ) : null}
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="close"
            className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full border border-[var(--color-line-soft)] text-[var(--color-ink-soft)] outline-none transition-all hover:text-white hover:border-white/60 focus-visible:text-white focus-visible:border-white/60"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>

        <div className="grid gap-10 overflow-y-auto px-10 py-8 max-sm:px-5 max-sm:py-6 max-sm:gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl aspect-[16/10]">
              {active.node}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {renderProject.gallery.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`view ${item.alt}`}
                  aria-current={i === activeIdx ? "true" : undefined}
                  className={cn(
                    "relative aspect-[16/10] overflow-hidden rounded-md border bg-gradient-to-br from-[#4a3a6c] to-[#2a1f3d] outline-none transition-all duration-200",
                    i === activeIdx
                      ? "border-white/70 opacity-100"
                      : "border-[var(--color-line-soft)] opacity-65 hover:opacity-100 focus-visible:opacity-100 focus-visible:border-white/40",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                >
                  {/* Scaled-down preview filling the thumbnail. The inner
                     wrapper is 5x the thumbnail size and then scaled to 20%,
                     so the preview renders at near-natural fidelity (text,
                     borders, mockups stay crisp) while visually fitting the
                     thumbnail. pointer-events disabled so the button still
                     captures clicks. */}
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
                  className="group inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[0.95rem] font-light tracking-[0.04em] text-white outline-none transition-colors hover:border-white focus-visible:border-white"
                >
                  {renderProject.liveLabel ?? renderProject.liveUrl}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
                  />
                </a>
              ) : (
                <span className="rounded-sm border border-[var(--color-line-soft)] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.22em] font-medium text-[var(--color-ink-faint)]">
                  not live yet
                </span>
              )}

              {renderProject.legalLinks && renderProject.legalLinks.length > 0 && (
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] uppercase tracking-[0.18em] font-light text-[var(--color-ink-faint)]">
                  {renderProject.legalLinks.map((link) => {
                    const isExternal = /^https?:\/\//.test(link.href);
                    const className =
                      "transition-colors hover:text-white/85 focus-visible:text-white/85 outline-none";
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

            <div className="flex flex-col gap-4 text-[1rem] font-light leading-[1.7] text-white/80">
              {(renderProject.detail && renderProject.detail.length > 0
                ? renderProject.detail
                : [renderProject.description]
              ).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
