"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { CaseStudyContent } from "./CaseStudyContent";
import { CaseStudy } from "./site-data";
import { haptic } from "./haptics";
import { HomePill } from "./SiteChrome";

export function PageOverlay({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    closingRef.current = true;
    setClosing(true);
    closeTimer.current = window.setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    windowRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && requestClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [requestClose]);

  return (
    <div
      className={`project-modal-layer ${expanded ? "is-expanded" : ""} ${closing ? "is-closing" : ""}`}
      role="presentation"
      onPointerDown={(event) => event.target === event.currentTarget && requestClose()}
    >
      <div ref={windowRef} className="project-modal" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <button className="project-modal-expand" type="button" aria-label={`Expand ${label} to full page`} disabled={closing || expanded} onPointerDown={(event) => haptic("medium", .38, event.pointerType !== "mouse")} onClick={() => setExpanded(true)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 4.5h-5v5M4.75 4.75 10 10M14.5 19.5h5v-5M19.25 19.25 14 14" />
          </svg>
        </button>
        <div className="project-modal-scroll">{children}</div>
      </div>
      <HomePill overlay onReturn={requestClose} />
    </div>
  );
}

export function ProjectSheet({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  return <PageOverlay label={`${study.title} case study`} onClose={onClose}><CaseStudyContent study={study} embedded /></PageOverlay>;
}
