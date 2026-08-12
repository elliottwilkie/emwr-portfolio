"use client";

import { type CSSProperties, PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { bottomImages, caseStudies, headshot, projects, snippets } from "./site-data";
import { TimeFooter } from "./SiteChrome";
import { dragHaptic, haptic } from "./haptics";
import { PageOverlay, ProjectSheet } from "./ProjectSheet";
import { ExperimentsPage } from "./selected-works/ExperimentsPage";
import { ArtGalleryPage, PhotographyPage } from "./GalleryPages";

type SpotifyTrack = {
  trackName: string;
  artistName: string;
  albumArt: string;
  trackUrl: string;
  playedAt: string;
};

function playedAgo(playedAt: string, now: number) {
  const seconds = Math.max(0, Math.floor((now - new Date(playedAt).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

function RecentlyPlayed() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let active = true;
    const load = () => {
      fetch("https://spotify-widget-one.vercel.app/api/spotify")
        .then((response) => {
          if (!response.ok) throw new Error("Spotify request failed");
          return response.json() as Promise<SpotifyTrack>;
        })
        .then((data) => active && setTrack(data))
        .catch(() => undefined);
    };
    load();
    const refresh = window.setInterval(load, 5 * 60_000);
    const clock = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(clock);
    };
  }, []);

  return (
    <a className="music-card" aria-live="polite" aria-label="Recently played on Spotify" href={track?.trackUrl || undefined} target={track ? "_blank" : undefined} rel="noreferrer">
      <div className="record-art">
        <span className="record-disc">
          <img className="record-cover" src={track?.albumArt || bottomImages.album} alt="" />
          <span className="record-grooves" />
          <span className="record-glint" />
          <span className="record-label"><img src={track?.albumArt || bottomImages.album} alt="" /></span>
          <span className="record-hole" />
        </span>
      </div>
      <span className="music-copy">
        <strong>{track?.trackName || "Recently played"}</strong>
        <small>{track?.artistName || "Spotify"}</small>
        <span className="music-divider" />
        <em>Played <b>{track ? playedAgo(track.playedAt, now) : "loading…"}</b></em>
      </span>
    </a>
  );
}

function Ghost({ id, x }: { id: number; x: number }) {
  return (
    <svg className="movie-ghost" style={{ left: `${x}px` }} viewBox="0 0 20 26" aria-hidden="true">
      <defs>
        <linearGradient id={`ghost-fill-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M3 12Q3 3 10 3t7 9v10q-2 3-4 0-2 3-3 0-1 3-3 0-2 3-4 0Z" fill={`url(#ghost-fill-${id})`} stroke="rgba(0,0,0,.09)" strokeWidth=".75" />
      <ellipse cx="7.5" cy="11" rx="1.6" ry="1.8" fill="#999" /><ellipse cx="12.5" cy="11" rx="1.6" ry="1.8" fill="#999" />
    </svg>
  );
}

function HalloweenHover() {
  const [hovered, setHovered] = useState(false);
  const [ghosts, setGhosts] = useState<Array<{ id: number; x: number }>>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!hovered) return;
    const addGhost = () => {
      const id = nextId.current++;
      setGhosts((current) => [...current, { id, x: (Math.random() - 0.5) * 50 + 38 }]);
      window.setTimeout(() => setGhosts((current) => current.filter((ghost) => ghost.id !== id)), 2600);
    };
    addGhost();
    const timer = window.setInterval(addGhost, 350);
    return () => window.clearInterval(timer);
  }, [hovered]);

  return (
    <div className="collage-object drag-halloween movie-card" tabIndex={0} aria-label="Spooky films" onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)} onPointerLeave={() => setHovered(false)} onFocus={(event) => event.currentTarget.matches(":focus-visible") && setHovered(true)} onBlur={() => setHovered(false)}>
      <span className="movie-ghost-layer">{ghosts.map((ghost) => <Ghost key={ghost.id} {...ghost} />)}</span>
      <img className="spooky-cover-image" src={bottomImages.spookyMovies} alt="" draggable={false} />
    </div>
  );
}

function EscapingCat() {
  const cat = useRef<HTMLButtonElement>(null);
  const position = useRef({ x: 230, y: 137 });

  const escape = () => {
    const element = cat.current;
    if (!element) return;

    let next = position.current;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const candidate = {
        x: 24 + Math.random() * (740 - 58 - 48),
        y: 24 + Math.random() * (520 - 56 - 48),
      };
      next = candidate;
      if (Math.hypot(candidate.x - position.current.x, candidate.y - position.current.y) > 150) break;
    }

    position.current = next;
    element.style.left = `${next.x.toFixed(1)}px`;
    element.style.top = `${next.y.toFixed(1)}px`;
    element.style.setProperty("--base-rotation", `${(-8 + Math.random() * 16).toFixed(1)}deg`);
    element.classList.remove("is-escaping");
    void element.offsetWidth;
    element.classList.add("is-escaping");
  };

  return (
    <button
      ref={cat}
      className="collage-object drag-drawing cat-doodle"
      type="button"
      aria-label="Catch the cat"
      onPointerDown={(event) => haptic("nudge", 0.38, event.pointerType !== "mouse")}
      onClick={escape}
      onAnimationEnd={(event) => event.currentTarget.classList.remove("is-escaping")}
    >
      <img src={bottomImages.drawing} alt="" draggable={false} />
    </button>
  );
}

function RowArrow({ direction }: { direction: "right" | "external" | "download" }) {
  if (direction === "external") return <svg className="row-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
  if (direction === "download") return <svg className="row-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12m-5-5 5 5 5-5M5 20h14" /></svg>;
  return <svg className="row-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.75 6.75 19.25 12l-5.5 5.25M4.75 12H19" /></svg>;
}

function ConnectLinks({ onEnter, onLeave }: { onEnter: (event: ReactPointerEvent<HTMLElement>) => void; onLeave: (event: ReactPointerEvent<HTMLElement>) => void }) {
  return <>
    <a className="simple-row connect-row" href="mailto:ewilkie92@gmail.com" target="_blank" onPointerEnter={onEnter} onPointerLeave={onLeave}><span className="simple-name">Email</span><RowArrow direction="external" /></a>
    <a className="simple-row connect-row" href="https://www.linkedin.com/in/elliottwilkie/" target="_blank" rel="noopener" onPointerEnter={onEnter} onPointerLeave={onLeave}><span className="simple-name">LinkedIn</span><RowArrow direction="external" /></a>
    <a className="simple-row connect-row" href="/elliott-wilkie-cv.pdf" download="Elliott-Wilkie-Rosca-CV.pdf" onPointerEnter={onEnter} onPointerLeave={onLeave}><span className="simple-name">Download CV</span><RowArrow direction="download" /></a>
  </>;
}

export function HomePage() {
  const carousel = useRef<HTMLDivElement>(null);
  const playground = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [openStudy, setOpenStudy] = useState<string | null>(null);
  const [soonCursor, setSoonCursor] = useState({ x: 0, y: 0, visible: false });
  const [playgroundScale, setPlaygroundScale] = useState(1);

  const closeProject = useCallback(() => {
    setOpenStudy(null);
    if (window.location.pathname !== "/") window.history.replaceState(null, "", "/");
  }, []);

  const openPage = useCallback((slug: string, href: string) => {
    setOpenStudy(slug);
    window.history.pushState({ projectSheet: slug }, "", href);
  }, []);

  useEffect(() => {
    const closeOnBack = () => setOpenStudy(null);
    window.addEventListener("popstate", closeOnBack);
    return () => window.removeEventListener("popstate", closeOnBack);
  }, []);

  useEffect(() => {
    const updateScale = () => setPlaygroundScale(Math.min(1, Math.max(0.4, (document.documentElement.clientWidth - 64) / 740)));
    const frame = window.requestAnimationFrame(updateScale);
    window.addEventListener("resize", updateScale);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    const surface = playground.current;
    if (!surface) return;
    let object: HTMLElement | null = null;
    let pointerId = -1;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;
    let startRect: DOMRect | null = null;
    let moved = false;
    let draggedObject: HTMLElement | null = null;
    let dragEndedAt = 0;
    let topLayer = 10;

    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const candidate = (event.target as Element).closest<HTMLElement>(".collage-object");
      if (!candidate || !surface.contains(candidate) || candidate.classList.contains("cat-doodle")) return;
      object = candidate;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      baseX = Number.parseFloat(candidate.style.getPropertyValue("--drag-x")) || 0;
      baseY = Number.parseFloat(candidate.style.getPropertyValue("--drag-y")) || 0;
      startRect = candidate.getBoundingClientRect();
      moved = false;
      candidate.style.zIndex = String(++topLayer);
    };

    const pointerMove = (event: PointerEvent) => {
      if (!object || event.pointerId !== pointerId || !startRect) return;
      let deltaX = event.clientX - startX;
      let deltaY = event.clientY - startY;
      if (!moved && Math.hypot(deltaX, deltaY) < 4) return;
      if (!moved) {
        moved = true;
        object.classList.add("is-dragging");
        object.setPointerCapture(event.pointerId);
        dragHaptic("lift", event.pointerType !== "mouse");
      }
      event.preventDefault();
      const bounds = surface.getBoundingClientRect();
      const scale = bounds.width / surface.offsetWidth || 1;
      deltaX = Math.max(bounds.left + 24 - startRect.right, Math.min(bounds.right - 24 - startRect.left, deltaX));
      deltaY = Math.max(bounds.top + 24 - startRect.bottom, Math.min(bounds.bottom - 24 - startRect.top, deltaY));
      object.style.setProperty("--drag-x", `${baseX + deltaX / scale}px`);
      object.style.setProperty("--drag-y", `${baseY + deltaY / scale}px`);
    };

    const pointerUp = (event: PointerEvent) => {
      if (!object || event.pointerId !== pointerId) return;
      if (object.hasPointerCapture(event.pointerId)) object.releasePointerCapture(event.pointerId);
      object.classList.remove("is-dragging");
      if (moved) {
        draggedObject = object;
        dragEndedAt = performance.now();
        dragHaptic("drop", event.pointerType !== "mouse");
      }
      object = null;
      pointerId = -1;
      startRect = null;
    };

    const preventDraggedClick = (event: MouseEvent) => {
      if (!draggedObject || performance.now() - dragEndedAt > 420) return;
      if (draggedObject.contains(event.target as Node)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const rotateOnHover = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const candidate = (event.target as Element).closest<HTMLElement>(".collage-object");
      if (!candidate || !surface.contains(candidate) || candidate.contains(event.relatedTarget as Node | null)) return;
      const degrees = (2 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);
      candidate.style.setProperty("--hover-rotation", `${degrees.toFixed(2)}deg`);
    };

    const resetHoverRotation = (event: PointerEvent) => {
      const candidate = (event.target as Element).closest<HTMLElement>(".collage-object");
      if (!candidate || !surface.contains(candidate) || candidate.contains(event.relatedTarget as Node | null)) return;
      candidate.style.setProperty("--hover-rotation", "0deg");
    };

    surface.addEventListener("pointerdown", pointerDown);
    surface.addEventListener("pointerover", rotateOnHover);
    surface.addEventListener("pointerout", resetHoverRotation);
    window.addEventListener("pointermove", pointerMove, { passive: false });
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", pointerUp);
    surface.addEventListener("click", preventDraggedClick, true);
    return () => {
      surface.removeEventListener("pointerdown", pointerDown);
      surface.removeEventListener("pointerover", rotateOnHover);
      surface.removeEventListener("pointerout", resetHoverRotation);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      surface.removeEventListener("click", preventDraggedClick, true);
    };
  }, []);

  useEffect(() => {
    const element = carousel.current;
    if (!element) return;
    let pointerId = -1;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let axis: "" | "x" | "y" = "";
    let lastTime = 0;
    let velocity = 0;
    let overscroll = 0;
    let frame: number | null = null;

    const moveCards = (distance: number) => {
      overscroll = distance;
      element.querySelectorAll<HTMLElement>("[data-carousel-content]").forEach((card) => {
        card.style.transform = `translate3d(${distance}px,0,0)`;
      });
    };

    const springBack = () => {
      let position = overscroll;
      let speed = 0;
      let previous = performance.now();
      const tick = (time: number) => {
        const delta = Math.min(Math.max((time - previous) / 1000, 0.001), 0.032);
        previous = time;
        speed += (-position * 190 - speed * 25) * delta;
        position += speed * delta;
        moveCards(position);
        if (Math.abs(position) >= 0.25 || Math.abs(speed) >= 4) frame = requestAnimationFrame(tick);
        else {
          moveCards(0);
          frame = null;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const coast = (target: number, initialVelocity: number) => {
      let position = element.scrollLeft;
      let speed = Math.max(-1800, Math.min(1800, initialVelocity * 1000));
      let previous = performance.now();
      const started = previous;
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      const tick = (time: number) => {
        const delta = Math.min(Math.max((time - previous) / 1000, 0.001), 0.032);
        previous = time;
        speed += ((target - position) * 85 - speed * 18.5) * delta;
        position = Math.max(0, Math.min(max, position + speed * delta));
        element.scrollLeft = position;
        if ((Math.abs(target - position) >= 0.35 || Math.abs(speed) >= 4) && time - started <= 1200) frame = requestAnimationFrame(tick);
        else {
          element.scrollLeft = target;
          frame = null;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = element.scrollLeft;
      axis = "";
      lastTime = performance.now();
      velocity = 0;
    };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (!axis) {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 5) return;
        axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
        if (axis === "y") {
          pointerId = -1;
          return;
        }
        element.setPointerCapture(event.pointerId);
        element.classList.add("is-dragging");
      }
      if (axis !== "x") return;
      event.preventDefault();
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      const raw = startLeft - deltaX;
      const next = Math.max(0, Math.min(max, raw));
      const excess = raw - next;
      moveCards(-excess * 0.35 / (1 + Math.abs(excess) / 180));
      const time = performance.now();
      const elapsed = Math.max(1, time - lastTime);
      velocity = velocity * 0.72 + ((next - element.scrollLeft) / elapsed) * 0.28;
      lastTime = time;
      element.scrollLeft = next;
    };
    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const horizontal = axis === "x";
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      pointerId = -1;
      axis = "";
      element.classList.remove("is-dragging");
      if (!horizontal) {
        moveCards(0);
        return;
      }
      if (Math.abs(overscroll) > 0.5) springBack();
      else {
        const max = Math.max(0, element.scrollWidth - element.clientWidth);
        const momentum = Math.max(-520, Math.min(520, velocity * 100));
        coast(Math.max(0, Math.min(max, element.scrollLeft + momentum)), velocity);
      }
    };

    element.addEventListener("pointerdown", pointerDown, true);
    element.addEventListener("pointermove", pointerMove, { passive: false, capture: true });
    window.addEventListener("pointerup", pointerUp, true);
    window.addEventListener("pointercancel", pointerUp, true);
    return () => {
      element.removeEventListener("pointerdown", pointerDown, true);
      element.removeEventListener("pointermove", pointerMove, true);
      window.removeEventListener("pointerup", pointerUp, true);
      window.removeEventListener("pointercancel", pointerUp, true);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  function rowEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const row = event.currentTarget;
    const bounds = row.getBoundingClientRect();
    row.style.setProperty("--hover-duration", "0s");
    row.style.setProperty("--hover-y", event.clientY - bounds.top < bounds.height / 2 ? "-100%" : "100%");
    row.style.setProperty("--hover-opacity", "1");
    void row.offsetHeight;
    row.style.setProperty("--hover-duration", ".25s");
    row.style.setProperty("--hover-y", "0%");
    if (event.pointerType === "mouse") haptic("selection", 0.65);
  }

  function rowLeave(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const row = event.currentTarget;
    const bounds = row.getBoundingClientRect();
    row.style.setProperty("--hover-y", event.clientY - bounds.top < bounds.height / 2 ? "-100%" : "100%");
    row.style.setProperty("--hover-opacity", "0");
  }

  function projectEnter(index: number, event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    rowEnter(event);
    setActiveProject(index);
  }

  return (
    <main className="home-page">
      <section className="home-column intro home-reveal reveal-intro" aria-labelledby="intro-title">
        <span className="avatar-wrap">
          <img className="avatar" src={headshot} alt="" />
        </span>
        <h1 id="intro-title">Elliott Wilkie-Roşca</h1>
        <p>
          Designer with 12+ years of experience making products <em className="feel-word">feel</em> simple. I've helped startups and global brands simplify complex products across healthcare, AI, <span className="keep-together">e-commerce</span>, and emerging technology.
          <span> Currently, I'm an associate director of experience design at Boldscience.</span>
        </p>
      </section>

      <section className="home-column snippets" aria-labelledby="snippets-title" hidden>
        <h2 id="snippets-title">Snippets</h2>
        <div
          className="snippet-window"
          ref={carousel}
          role="region"
          aria-label="Image carousel"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            carousel.current?.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * 496, behavior: "smooth" });
          }}
        >
          <div
            className="snippet-strip"
          >
            {snippets.map((image, index) => (
              <figure className="snippet-card" data-carousel-content key={image}>
                <img src={image} alt={`Selected product design ${index + 1}`} draggable={false} />
              </figure>
            ))}
            <span className="snippet-end-space" data-carousel-content aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="home-column home-links home-reveal reveal-projects" aria-labelledby="projects-title">
        <h2 id="projects-title">Projects</h2>
        <div className="project-list" onPointerLeave={() => setActiveProject(null)}>
          {projects.map((project, index) => {
            const row = <><span className="project-name">{project.name}</span><span className="project-slash">/</span><span className="project-detail">{project.detail}</span>{project.href && <svg className="project-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.75 6.75 19.25 12l-5.5 5.25M4.75 12H19" /></svg>}</>;
            const interaction = {
              onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => projectEnter(index, event),
              onPointerLeave: rowLeave,
            };
            return project.href ? (
              <a className={`project-row ${activeProject !== null && activeProject !== index ? "is-dimmed" : ""}`} href={project.href} key={project.name} {...interaction} onPointerDown={(event) => haptic("nudge", 0.45, event.pointerType !== "mouse")} onFocus={() => setActiveProject(index)} onClick={(event) => {
                if (!project.href?.startsWith("/work/") && project.href !== "/selected-works") return;
                if (window.matchMedia("(max-width: 720px)").matches) return;
                event.preventDefault();
                const slug = project.href === "/selected-works" ? "experiments" : project.href.slice("/work/".length);
                openPage(slug, project.href);
              }}>{row}</a>
            ) : (
              <button
                className={`project-row project-row-muted ${activeProject !== null && activeProject !== index ? "is-dimmed" : ""}`}
                type="button"
                aria-label={`${project.name}, coming soon`}
                aria-disabled="true"
                key={project.name}
                onPointerEnter={(event) => {
                  projectEnter(index, event);
                  if (event.pointerType === "mouse") setSoonCursor({ x: event.clientX, y: event.clientY, visible: true });
                }}
                onPointerMove={(event) => event.pointerType === "mouse" && setSoonCursor({ x: event.clientX, y: event.clientY, visible: true })}
                onPointerLeave={(event) => {
                  rowLeave(event);
                  setSoonCursor((cursor) => ({ ...cursor, visible: false }));
                }}
                onPointerDown={(event) => haptic("error", 0.22, event.pointerType !== "mouse")}
              >{row}</button>
            );
          })}
        </div>
      </section>

      <section className="home-column home-links home-reveal reveal-side" aria-labelledby="side-title">
        <h2 id="side-title">Side quests</h2>
        <a className="simple-row" href="/art" onPointerEnter={rowEnter} onPointerLeave={rowLeave} onPointerDown={(event) => haptic("nudge", 0.45, event.pointerType !== "mouse")} onClick={(event) => { if (window.matchMedia("(max-width: 720px)").matches) return; event.preventDefault(); openPage("art", "/art"); }}><span className="simple-name">Art and illustration</span><RowArrow direction="right" /></a>
        <a className="simple-row" href="/photos" onPointerEnter={rowEnter} onPointerLeave={rowLeave} onPointerDown={(event) => haptic("nudge", 0.45, event.pointerType !== "mouse")} onClick={(event) => { if (window.matchMedia("(max-width: 720px)").matches) return; event.preventDefault(); openPage("photos", "/photos"); }}><span className="simple-name">Photography</span><RowArrow direction="right" /></a>
      </section>

      <section className="home-column home-links home-reveal reveal-connect" aria-labelledby="connect-title">
        <h2 id="connect-title">Connect</h2>
        <ConnectLinks onEnter={rowEnter} onLeave={rowLeave} />
      </section>

      <div className="home-playground-column home-reveal reveal-playground">
        <section className="playground-shell" style={{ "--playground-scale": playgroundScale, height: `${520 * playgroundScale}px` } as CSSProperties} aria-label="Personal objects">
          <div className="playground" ref={playground}>
            <div className="collage-object drag-music"><RecentlyPlayed /></div>
            <EscapingCat />
            <div className="collage-object drag-main-photo"><div className="photo-stack"><img src={bottomImages.desk} alt="Personal photo" draggable={false} /></div></div>
            <div className="collage-object drag-friends"><img src={bottomImages.friends} alt="Friends at a celebration" draggable={false} /></div>
            <div className="collage-object drag-figma"><img src={bottomImages.figma} alt="Figma" draggable={false} /></div>
            <div className="collage-object drag-spark"><img src={bottomImages.spark} alt="" draggable={false} /></div>
            <div className="collage-object drag-devils"><img src={bottomImages.devils} alt="Cardiff Devils" draggable={false} /></div>
            <HalloweenHover />
            <div className="collage-object drag-run"><img src={bottomImages.run} alt="Running route" draggable={false} /></div>
            <div className="collage-object drag-sketch-video" aria-label="Sketching a portrait on iPad">
              <video src="/media/sketching-portrait-30fps.m4v" autoPlay muted loop playsInline preload="metadata" />
            </div>
            <div className="collage-object drag-wallpaper">
              <img src={bottomImages.wallpaper} alt="Phone wallpaper" draggable={false} />
              <span>my phone wallpaper<br />since '22</span>
            </div>
          </div>
        </section>
        <TimeFooter />
      </div>
      <span className={`soon-cursor ${soonCursor.visible ? "is-visible" : ""}`} style={{ left: soonCursor.x, top: soonCursor.y }} aria-hidden="true"><b>Soon</b></span>
      {openStudy === "experiments" && <PageOverlay label="Experiments" onClose={closeProject}><ExperimentsPage embedded /></PageOverlay>}
      {openStudy === "art" && <PageOverlay label="Art and illustration" onClose={closeProject}><ArtGalleryPage embedded /></PageOverlay>}
      {openStudy === "photos" && <PageOverlay label="Photography" onClose={closeProject}><PhotographyPage embedded /></PageOverlay>}
      {openStudy && !["experiments", "art", "photos"].includes(openStudy) && <ProjectSheet study={caseStudies.find((study) => study.slug === openStudy)!} onClose={closeProject} />}
    </main>
  );
}
