"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { cn } from "@/lib/utils";
import { CaseStudyView } from "./CaseStudyView";
import type { CaseStudy } from "./case-studies";

interface Props {
  study: CaseStudy | null;
  onClose: () => void;
}

const ENTER_MS = 320;
const EXIT_MS = 220;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Overlay that presents a case study without leaving the /case-studies list.
 * Same backdrop, surface, and transition language as the work ProjectModal,
 * but the body is the long-form CaseStudyView in a scroll container.
 */
export function CaseStudyModal({ study, onClose }: Props) {
  const [render, setRender] = useState<CaseStudy | null>(study);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (study) {
      setRender(study);
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
    const t = window.setTimeout(() => setRender(null), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [study]);

  useEffect(() => {
    if (!render || !visible) return;
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
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
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
  }, [render, visible, onClose]);

  if (!render) return null;

  return (
    <div
      onClick={onClose}
      aria-hidden={!visible}
      className="fixed inset-0 z-[80] flex items-start justify-center p-6 max-sm:p-3"
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
        aria-label={`${render.brand} case study`}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative isolate my-6 flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-2xl border border-[var(--color-line-soft)]",
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
              "radial-gradient(ellipse at 50% 0%, #3f1570 0%, var(--color-bg) 50%, var(--color-bg-deep) 100%)",
          }}
        />
        <GrainOverlay className="absolute inset-0 -z-10 h-full w-full" />

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute right-5 top-5 z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-soft)] bg-[var(--color-bg-deep)]/40 text-[var(--color-ink-soft)] outline-none backdrop-blur-sm transition-all hover:border-white/60 hover:text-white focus-visible:border-white/60 focus-visible:text-white"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="overflow-y-auto py-10">
          <CaseStudyView study={render} />
        </div>
      </div>
    </div>
  );
}
