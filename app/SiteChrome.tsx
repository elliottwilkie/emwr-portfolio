"use client";

import { useEffect, useRef, useState } from "react";
import { haptic, playThemeSwell, warmHaptics } from "./haptics";

function getWalesClock() {
  const date = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase();
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", hourCycle: "h23" }).format(date));
  return { time, night: hour >= 20 || hour < 6 };
}

export function TimeFooter({ wide = false }: { wide?: boolean }) {
  const [clock, setClock] = useState<{ time: string; night: boolean } | null>(null);

  useEffect(() => {
    setClock(getWalesClock());
    const timer = window.setInterval(() => setClock(getWalesClock()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className={`time-footer ${clock?.night ? "is-night" : "is-day"} ${wide ? "time-footer-wide" : ""}`} aria-label={clock ? `${clock.time} in Wales, UK` : "Local time in Wales, UK"}>
      <span className="time-symbol" aria-hidden="true">
        <svg className="day-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg className="night-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.4 15.1A8 8 0 0 1 8.9 3.6 8.5 8.5 0 1 0 20.4 15.1Z" />
        </svg>
        <span className="night-zzz"><i>z</i><i>z</i><i>z</i></span>
      </span>
      <span className="time-details">
        <span className="time-copy">{clock ? `${clock.time} in Wales, UK` : "\u00a0"}</span>
        <span className="time-updated">Updated Aug 2026</span>
      </span>
    </footer>
  );
}

export function HapticPrimer() {
  useEffect(() => {
    const warm = () => void warmHaptics();
    const restore = () => document.visibilityState === "visible" && void warmHaptics();
    window.addEventListener("pointerdown", warm, { capture: true, passive: true });
    window.addEventListener("keydown", warm, { capture: true });
    window.addEventListener("focus", restore);
    document.addEventListener("visibilitychange", restore);
    return () => {
      window.removeEventListener("pointerdown", warm, true);
      window.removeEventListener("keydown", warm, true);
      window.removeEventListener("focus", restore);
      document.removeEventListener("visibilitychange", restore);
    };
  }, []);

  return null;
}

export function ThemeToggle() {
  const button = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);

  const toggle = () => {
    const nextDark = document.documentElement.dataset.theme !== "dark";
    const next = nextDark ? "dark" : "light";
    const bounds = button.current?.getBoundingClientRect();
    const x = bounds ? bounds.left + bounds.width / 2 : window.innerWidth - 44;
    const y = bounds ? bounds.top + bounds.height / 2 : 44;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 180;
    const root = document.documentElement;
    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-r", `${radius}px`);
    root.style.setProperty("--reveal-old-bg", getComputedStyle(document.body).backgroundColor);

    const apply = () => {
      root.dataset.theme = next;
      window.localStorage.setItem("emwr-theme", next);
      setDark(nextDark);
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) playThemeSwell(nextDark ? "up" : "down");
    if (!document.startViewTransition || reduceMotion) return apply();
    document.startViewTransition(apply);
  };

  return (
    <button
      ref={button}
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      aria-pressed={dark}
      onPointerEnter={(event) => event.pointerType === "mouse" && haptic("selection", 0.48)}
      onClick={toggle}
    >
      {dark ? (
        <svg className="theme-icon theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <clipPath id="theme-crescent">
              <path d="M0 2h13a1 1 0 0 0 10 10v14H0Z" />
            </clipPath>
          </defs>
          <circle className="theme-moon-disc" cx="12" cy="12" r="5" fill="currentColor" clipPath="url(#theme-crescent)" />
        </svg>
      ) : (
        <svg className="theme-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <g stroke="currentColor" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            {["M12 1.4v2.4", "m20.3 3.7-2.5 2.5", "M22.6 12h-2.4", "M12 22.6v-2.4", "M1.4 12h2.4", "m20.3 20.3-2.5-2.5", "m3.7 20.3 2.5-2.5", "m3.7 3.7 2.5 2.5"].map((path) => <path key={path} d={path} fill="none" strokeWidth="2" strokeLinejoin="round" />)}
          </g>
        </svg>
      )}
    </button>
  );
}

export function HomePill({ onReturn, overlay = false }: { onReturn?: () => void; overlay?: boolean } = {}) {
  const glass = useRef<HTMLDivElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const redOffset = useRef<SVGFEOffsetElement>(null);
  const blueOffset = useRef<SVGFEOffsetElement>(null);
  const slices = useRef<Array<HTMLSpanElement | null>>([]);
  const filterId = "return-scroll-warp";

  useEffect(() => {
    const glassElement = glass.current;
    if (!glassElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scrollElement = overlay ? document.querySelector<HTMLElement>(".project-modal-scroll") : null;
    const scrollTarget: Window | HTMLElement = scrollElement ?? window;
    const sourceElement = overlay
      ? scrollElement?.firstElementChild as HTMLElement | null
      : document.querySelector<HTMLElement>("main.detail-page");
    const sliceElements = slices.current.filter((slice): slice is HTMLSpanElement => Boolean(slice));
    if (!sourceElement || sliceElements.length === 0) return;

    const clones = sliceElements.map((slice) => {
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      clone.classList.add("home-pill-warp-clone");
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll(".home-pill, .home-pill-glass, .theme-toggle, .project-modal-expand").forEach((element) => element.remove());
      clone.querySelectorAll<HTMLElement>("a, button, input, textarea, select, [tabindex]").forEach((element) => element.setAttribute("tabindex", "-1"));
      slice.replaceChildren(clone);
      return clone;
    });

    const syncClones = () => {
      const sourceRect = sourceElement.getBoundingClientRect();
      const sourceCanvases = Array.from(sourceElement.querySelectorAll("canvas"));

      sliceElements.forEach((slice, index) => {
        const sliceRect = slice.getBoundingClientRect();
        const clone = clones[index];
        clone.style.left = `${sourceRect.left - sliceRect.left}px`;
        clone.style.top = `${sourceRect.top - sliceRect.top}px`;
        clone.style.width = `${sourceRect.width}px`;
        clone.style.height = `${sourceRect.height}px`;
        clone.style.transformOrigin = `${window.innerWidth / 2 - sourceRect.left}px ${window.innerHeight - sourceRect.top}px`;

        clone.querySelectorAll("canvas").forEach((canvas, canvasIndex) => {
          const sourceCanvas = sourceCanvases[canvasIndex];
          if (!sourceCanvas) return;
          const context = (canvas as HTMLCanvasElement).getContext("2d");
          try { context?.drawImage(sourceCanvas, 0, 0); } catch { /* The live page remains visible if a canvas cannot be mirrored. */ }
        });
      });
    };

    syncClones();
    glassElement.style.setProperty("--warp-opacity", "1");
    const readPosition = () => scrollElement?.scrollTop ?? window.scrollY;
    let lastPosition = readPosition();
    let lastTime = performance.now();
    let targetVelocity = 0;
    let velocity = 0;
    let animationFrame = 0;

    const renderWarp = () => {
      targetVelocity *= 0.94;
      velocity += (targetVelocity - velocity) * 0.28;

      const force = Math.min(Math.abs(velocity) / 0.32, 1);
      const direction = Math.sign(velocity) || 1;
      const shift = Math.max(-20, Math.min(20, velocity * 10));
      const channelOffset = direction * force * 8;

      glassElement.style.setProperty("--warp-opacity", "1");
      glassElement.style.setProperty("--warp-scale-one", String(1.04 + force * 0.14));
      glassElement.style.setProperty("--warp-scale-two", String(1.1 + force * 0.2));
      glassElement.style.setProperty("--warp-scale-three", String(1.18 + force * 0.3));
      glassElement.style.setProperty("--warp-shift", `${shift}px`);
      glassElement.style.setProperty("--warp-shift-two", `${shift * 0.65}px`);
      glassElement.style.setProperty("--warp-shift-three", `${shift * 0.35}px`);
      glassElement.style.setProperty("--warp-skew", `${direction * force * 0.7}deg`);
      glassElement.style.setProperty("--warp-skew-inverse", `${direction * force * -0.7}deg`);
      displacement.current?.setAttribute("scale", String(12 + force * 30));
      redOffset.current?.setAttribute("dy", String(channelOffset));
      blueOffset.current?.setAttribute("dy", String(-channelOffset));

      if (Math.abs(velocity) > 0.004 || Math.abs(targetVelocity) > 0.004) {
        animationFrame = window.requestAnimationFrame(renderWarp);
      } else {
        glassElement.style.setProperty("--warp-scale-one", "1.04");
        glassElement.style.setProperty("--warp-scale-two", "1.1");
        glassElement.style.setProperty("--warp-scale-three", "1.18");
        glassElement.style.setProperty("--warp-shift", "0px");
        glassElement.style.setProperty("--warp-shift-two", "0px");
        glassElement.style.setProperty("--warp-shift-three", "0px");
        glassElement.style.setProperty("--warp-skew", "0deg");
        glassElement.style.setProperty("--warp-skew-inverse", "0deg");
        displacement.current?.setAttribute("scale", "12");
        redOffset.current?.setAttribute("dy", "0");
        blueOffset.current?.setAttribute("dy", "0");
        animationFrame = 0;
      }
    };

    const onScroll = () => {
      const now = performance.now();
      const position = readPosition();
      const elapsed = Math.max(8, Math.min(50, now - lastTime));
      const distance = position - lastPosition;
      const timedVelocity = distance / elapsed;
      const distanceVelocity = Math.sign(distance) * Math.min(Math.abs(distance) / 6, 1.4);
      const nextVelocity = Math.abs(timedVelocity) > Math.abs(distanceVelocity) ? timedVelocity : distanceVelocity;
      const retainedVelocity = Math.sign(targetVelocity) === Math.sign(nextVelocity)
        ? targetVelocity * 0.96 + nextVelocity * 0.7
        : nextVelocity;
      targetVelocity = Math.max(-2.8, Math.min(2.8, retainedVelocity));
      lastPosition = position;
      lastTime = now;
      syncClones();
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderWarp);
    };

    const onWheel = (event: WheelEvent) => {
      if (!event.deltaY) return;
      targetVelocity = Math.max(-2.8, Math.min(2.8, event.deltaY / 24));
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderWarp);
    };

    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    scrollTarget.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", syncClones, { passive: true });
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      scrollTarget.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", syncClones);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      sliceElements.forEach((slice) => slice.replaceChildren());
    };
  }, [overlay]);

  return (
    <>
      <div ref={glass} className={`home-pill-glass ${overlay ? "project-overlay-home-glass" : ""}`} aria-hidden="true">
        <svg className="home-pill-glass-filter" width="0" height="0">
          <filter id={filterId} x="-18%" y="-32%" width="136%" height="164%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.032" numOctaves="2" seed="11" result="warp-noise" />
            <feDisplacementMap ref={displacement} in="SourceGraphic" in2="warp-noise" scale="12" xChannelSelector="R" yChannelSelector="B" result="warped" />
            <feColorMatrix in="warped" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feColorMatrix in="warped" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feColorMatrix in="warped" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feOffset ref={redOffset} in="red" dy="0" result="red-shifted" />
            <feOffset ref={blueOffset} in="blue" dy="0" result="blue-shifted" />
            <feBlend in="red-shifted" in2="green" mode="screen" result="red-green" />
            <feBlend in="red-green" in2="blue-shifted" mode="screen" />
          </filter>
        </svg>
        {["one", "two", "three"].map((name, index) => (
          <span
            key={name}
            ref={(element) => { slices.current[index] = element; }}
            className={`home-pill-glass-band glass-band-${name}`}
            style={{ filter: `url(#${filterId})` }}
          />
        ))}
      </div>
      <a
        className={`home-pill ${overlay ? "project-overlay-home" : ""}`}
        href="/"
        aria-label="Return to homepage"
        onClick={(event) => {
          if (!onReturn) return;
          event.preventDefault();
          onReturn();
        }}
        onPointerEnter={(event) => event.pointerType === "mouse" && haptic("rigid", 0.5)}
        onPointerDown={(event) => haptic("medium", 0.5, event.pointerType !== "mouse")}
      >
        <svg className="home-pill-icon home-pill-icon-return" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M.5 9.5h9a4 4 0 0 0 0-8h-3" />
          <path d="m3.5 6.5-3 3 3 3" />
        </svg>
        <span className="home-pill-desktop">Return</span>
      </a>
    </>
  );
}
