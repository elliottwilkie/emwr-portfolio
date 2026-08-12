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
    <button ref={button} className="theme-toggle" type="button" aria-label={`Switch to ${dark ? "light" : "dark"} mode`} aria-pressed={dark} onClick={toggle}>
      {dark ? (
        <svg className="theme-icon theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.28 4.48A8 8 0 1 0 19.52 14.72A8 8 0 0 1 9.28 4.48Z" />
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
  return (
    <>
      <span className={`home-pill-glass ${overlay ? "project-overlay-home-glass" : ""}`} aria-hidden="true" />
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
