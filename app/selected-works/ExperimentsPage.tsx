"use client";

import { PointerEvent as ReactPointerEvent, useEffect, useId, useRef, useState } from "react";
import { haptic } from "../haptics";
import { HomePill, TimeFooter } from "../SiteChrome";
import { Experiment, experiments } from "../site-data";

const stampColors = [
  { background: "#d63a2f", ink: "#fdf6e3", accent: "#7a1f18" },
  { background: "#2952a3", ink: "#fdf6e3", accent: "#142a5a" },
  { background: "#e0772a", ink: "#fdf6e3", accent: "#7a3e10" },
  { background: "#2d7a4a", ink: "#fdf6e3", accent: "#143a22" },
  { background: "#d9a02a", ink: "#fdf6e3", accent: "#6e4a0e" },
  { background: "#1f3a6a", ink: "#fdf6e3", accent: "#0e1f3a" },
  { background: "#e85a6a", ink: "#fdf6e3", accent: "#7a2730" },
  { background: "#2a8a8a", ink: "#fdf6e3", accent: "#103a3a" },
  { background: "#7a3a6a", ink: "#fdf6e3", accent: "#3a1a32" },
  { background: "#3a8aca", ink: "#fdf6e3", accent: "#184260" },
];

const stampMotifs = ["fuji", "crane", "wave", "koi", "blossom", "torii", "lantern", "fan", "cat", "deer", "tea"] as const;
type StampMotif = (typeof stampMotifs)[number];

function StampSubject({ motif, ink, accent }: { motif: StampMotif; ink: string; accent: string }) {
  if (motif === "fuji") return <g><circle className="stamp-sun" cy="-30" r="14" fill={ink} opacity=".95" /><path d="M-46 38L-18-12-8 0 0-32 8-2 18-16 46 38Z" fill={ink} /><path d="M-10-4-4 2 0-32 6 0 10-8 4 6-2-2-6 8Z" fill={accent} opacity=".85" /><rect x="-44" y="22" width="22" height="3" rx="1.5" fill={ink} /><rect x="22" y="26" width="22" height="3" rx="1.5" fill={ink} /></g>;
  if (motif === "crane") return <g><ellipse cx="-2" cy="6" rx="28" ry="13" fill={ink} /><path className="stamp-crane-wing" d="M-14 0Q-4-12 14-8 22-4 16 6Z" fill={accent} opacity=".6" /><g className="stamp-crane-head"><path d="M22-2Q36-22 32-38" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" /><circle cx="32" cy="-40" r="6" fill={ink} /><path d="M38-40 46-38 38-36Z" fill={ink} /></g><path d="M-28 6-42-2-38 6-42 14Z" fill={ink} /><line x1="-6" y1="18" x2="-10" y2="38" stroke={ink} strokeWidth="3" strokeLinecap="round" /><line x1="6" y1="18" x2="4" y2="38" stroke={ink} strokeWidth="3" strokeLinecap="round" /></g>;
  if (motif === "wave") return <g><g className="stamp-wave"><path d="M-48 20Q-32-20-10-14 8-10 14-32 28-44 42-24 48-10 48 8V44H-48Z" fill={ink} /><path d="M-38 14Q-16 4 4 10" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity=".5" /></g><g className="stamp-foam"><circle cx="14" cy="-32" r="6" fill={accent} opacity=".7" /><circle cx="20" cy="-28" r="3.5" fill={ink} /><circle cx="-10" cy="-14" r="4" fill={accent} opacity=".7" /><circle cx="-6" cy="-12" r="2" fill={ink} /></g></g>;
  if (motif === "koi") return <g className="stamp-koi"><path d="M-28 0Q-22-16 6-14 28-12 34 0 28 12 6 14-22 16-28 0Z" fill={ink} /><path className="stamp-koi-tail" d="M30 0 48-16 42 0 48 16Z" fill={ink} /><circle cx="-10" cy="-3" r="4" fill={accent} opacity=".7" /><circle cx="8" cy="4" r="3" fill={accent} opacity=".7" /><circle cx="18" cy="-5" r="2.5" fill={accent} opacity=".7" /><circle cx="-22" cy="-3" r="2" fill={accent} /><path d="M-4 12 2 22 8 13" fill={ink} /></g>;
  if (motif === "blossom") return <g><g className="stamp-petals">{[0,72,144,216,288].map((angle)=><ellipse key={angle} cy="-22" rx="14" ry="22" fill={ink} transform={`rotate(${angle})`} />)}{[0,72,144,216,288].map((angle)=><ellipse key={`d${angle}`} cy="-18" rx="6" ry="10" fill={accent} opacity=".4" transform={`rotate(${angle})`} />)}</g><g className="stamp-center"><circle r="6" fill={accent} /><circle r="3" fill={ink} /></g></g>;
  if (motif === "torii") return <g><circle className="stamp-torii-glow" cy="-8" r="22" fill={ink} /><path d="M-42-28Q0-38 42-28L38-22Q0-30-38-22Z" fill={ink} /><rect x="-34" y="-14" width="68" height="6" fill={ink} /><rect x="-30" y="-8" width="8" height="44" fill={ink} /><rect x="22" y="-8" width="8" height="44" fill={ink} /><rect x="-6" y="-22" width="12" height="8" fill={accent} opacity=".6" /></g>;
  if (motif === "lantern") return <g className="stamp-lantern"><rect x="-16" y="-32" width="32" height="5" fill={ink} /><ellipse className="stamp-lantern-body" cy="-2" rx="24" ry="28" fill={ink} />{[-18,-10,-2,6,14].map((y,index)=><rect key={y} x={-22-(index===2?2:0)} y={y} width={44+(index===2?4:0)} height="2" fill={accent} opacity=".6" />)}<rect x="-14" y="26" width="28" height="4" fill={ink} /><line y1="30" y2="40" stroke={ink} strokeWidth="2" /><circle cy="42" r="3" fill={ink} /></g>;
  if (motif === "fan") return <g className="stamp-fan" transform="translate(0 12)">{[-65,-50,-35,-20,-5,10,25,40,55].map((angle,index)=>{const end=angle+14; return <path key={angle} d={`M0 0L${Math.sin(angle*Math.PI/180)*42} ${-Math.cos(angle*Math.PI/180)*42}L${Math.sin(end*Math.PI/180)*42} ${-Math.cos(end*Math.PI/180)*42}Z`} fill={index%2===0?ink:accent} opacity={index%2===0?1:.7} />})}<path d={`M${Math.sin(-65*Math.PI/180)*42} ${-Math.cos(-65*Math.PI/180)*42}A42 42 0 0 1 ${Math.sin(69*Math.PI/180)*42} ${-Math.cos(69*Math.PI/180)*42}`} fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" /><circle r="5" fill={ink} /><circle r="2" fill={accent} /></g>;
  if (motif === "cat") return <g><path d="M-22 36V-2Q-22-18 0-18T22-2V36Z" fill={ink} /><circle cy="-18" r="20" fill={ink} /><path d="M-18-32-10-24-16-16ZM18-32 10-24 16-16Z" fill={ink} /><path d="M-15-28-12-24-15-20ZM15-28 12-24 15-20Z" fill={accent} opacity=".5" /><ellipse className="stamp-cat-eye" cx="-7" cy="-18" rx="2" ry="2" fill={accent} /><ellipse className="stamp-cat-eye" cx="7" cy="-18" rx="2" ry="2" fill={accent} /><line x1="-18" y1="-12" x2="-8" y2="-11" stroke={accent} strokeWidth="1.2" /><line x1="18" y1="-12" x2="8" y2="-11" stroke={accent} strokeWidth="1.2" /><path d="M-2-10Q0-8 2-10" fill="none" stroke={accent} strokeWidth="1.5" /><ellipse className="stamp-cat-paw" cx="-18" cy="-2" rx="6" ry="9" fill={ink} /><circle cy="2" r="4" fill={accent} opacity=".6" /></g>;
  if (motif === "deer") return <g><ellipse cy="6" rx="24" ry="14" fill={ink} /><g className="stamp-deer-head"><path d="M14-2Q22-16 26-22" stroke={ink} strokeWidth="10" strokeLinecap="round" fill="none" /><ellipse cx="28" cy="-22" rx="8" ry="6" fill={ink} /><path d="M28-28 26-38M28-28 32-36M26-34 22-36M32-34 36-36" stroke={ink} strokeWidth="2" strokeLinecap="round" /><ellipse className="stamp-deer-ear" cx="22" cy="-28" rx="3" ry="5" fill={ink} /><circle cx="30" cy="-22" r="1.2" fill={accent} /></g><circle cx="-10" cy="2" r="2" fill={accent} opacity=".5" /><circle cy="8" r="2" fill={accent} opacity=".5" /><circle cx="10" cy="4" r="2" fill={accent} opacity=".5" />{[-12,-4,6,14].map((x,index)=><line key={x} x1={x} y1="20" x2={x+(index<2?-2:2)} y2="36" stroke={ink} strokeWidth="4" strokeLinecap="round" />)}</g>;
  return <g><path className="stamp-steam stamp-steam-1" d="M-10-16Q-14-22-10-28-6-34-10-40" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /><path className="stamp-steam stamp-steam-2" d="M4-14Q8-20 4-26 0-32 4-38" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /><path className="stamp-steam stamp-steam-3" d="M16-16Q20-22 16-28" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /><path d="M-28-8Q-28 24-20 30H20Q28 24 28-8Z" fill={ink} /><ellipse cy="-8" rx="28" ry="6" fill={accent} opacity=".5" /><ellipse cy="-9" rx="25" ry="4" fill={ink} /><rect x="-26" y="6" width="52" height="3" fill={accent} opacity=".5" /></g>;
}

function PostageStamp({ motif, palette }: { motif: StampMotif; palette: number }) {
  const rawId = useId();
  const maskId = `stamp-mask-${rawId.replace(/:/g, "")}`;
  const colors = stampColors[palette];
  const horizontal = Array.from({ length: 11 }, (_, index) => 8 + index * 8);
  const vertical = Array.from({ length: 15 }, (_, index) => 8 + index * 8);
  return (
    <svg className="postage-stamp" viewBox="0 0 104 136" aria-label="Animated postage stamp">
      <defs><mask id={maskId}><rect width="96" height="128" fill="white" />{horizontal.flatMap((position) => [<circle key={`t${position}`} cx={position} cy="0" r="3" />, <circle key={`b${position}`} cx={position} cy="128" r="3" />])}{vertical.flatMap((position) => [<circle key={`l${position}`} cx="0" cy={position} r="3" />, <circle key={`r${position}`} cx="96" cy={position} r="3" />])}</mask></defs>
      <rect width="104" height="136" fill="#fdf6e3" rx="2" />
      <g transform="translate(4 4)" mask={`url(#${maskId})`}><rect width="96" height="128" fill={colors.background} /><rect x="5" y="5" width="86" height="118" fill="none" stroke={colors.ink} strokeWidth="1.5" /><g transform="translate(48 64)"><StampSubject motif={motif} ink={colors.ink} accent={colors.accent} /></g></g>
    </svg>
  );
}

function StampExperiment() {
  const [stamp, setStamp] = useState({ motif: 1, palette: 6, key: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const refresh = () => {
    if (refreshing) return;
    setRotation((current) => current + 1);
    setRefreshing(true);
    window.setTimeout(() => {
      setStamp((current) => {
        let motif = Math.floor(Math.random() * stampMotifs.length);
      const palette = Math.floor(Math.random() * stampColors.length);
        if (motif === current.motif && palette === current.palette) motif = (motif + 1) % stampMotifs.length;
        return { motif, palette, key: current.key + 1 };
      });
      setRefreshing(false);
    }, 300);
  };
  return (
    <div className="stamp-experiment">
      <div className={`stamp-stage ${refreshing ? "is-refreshing" : ""}`}><PostageStamp key={stamp.key} motif={stampMotifs[stamp.motif]} palette={stamp.palette} /></div>
      <button type="button" className="stamp-refresh" onClick={refresh} onPointerDown={(event) => haptic("nudge", 0.45, event.pointerType !== "mouse")} onPointerEnter={(event) => event.pointerType === "mouse" && haptic("selection", 0.4)}><span key={rotation} className={rotation ? "is-spinning" : undefined} aria-hidden="true">↻</span> Refresh</button>
    </div>
  );
}

type GardenBlade = { shape: string; x: number; y: number; sway?: string };
type GardenFlower = { shape: string; x: number; y: number; delay: string };
type GardenPlot = { x: number; y: number; back: GardenBlade[]; grave: GardenBlade; front: GardenBlade[]; flowers: GardenFlower[] };

const gardenPlots: GardenPlot[] = [
  { x: 50, y: 356, back: [{ shape: "blade-tall", x: -16, y: -14 }, { shape: "blade-curve-l", x: -19, y: -12, sway: "s2" }, { shape: "blade-tall", x: 22, y: -14, sway: "s3" }, { shape: "blade-curve-r", x: 20, y: -12, sway: "s4" }], grave: { shape: "grave-round", x: -9, y: -26 }, front: [{ shape: "blade-short", x: -3, y: -6, sway: "s2" }, { shape: "blade-short", x: 11, y: -6, sway: "s4" }], flowers: [{ shape: "flower-daisy", x: -3, y: -36, delay: "d1" }, { shape: "flower-cross", x: 9, y: -34, delay: "d2" }] },
  { x: 228, y: 352, back: [{ shape: "blade-tall", x: -15, y: -13 }, { shape: "blade-curve-l", x: -18, y: -10, sway: "s2" }, { shape: "blade-mid", x: 20, y: -10, sway: "s4" }, { shape: "blade-tall", x: 23, y: -13, sway: "s3" }], grave: { shape: "grave-slab", x: -8, y: -18 }, front: [{ shape: "blade-short", x: -1, y: -4, sway: "s2" }, { shape: "blade-short", x: 9, y: -5 }], flowers: [{ shape: "flower-tall", x: -4, y: -30, delay: "d1" }, { shape: "flower-daisy", x: 6, y: -28, delay: "d2" }] },
  { x: 406, y: 358, back: [{ shape: "blade-mid", x: -10, y: -10, sway: "s2" }, { shape: "blade-curve-r", x: -13, y: -9, sway: "s4" }, { shape: "blade-mid", x: 11, y: -10 }, { shape: "blade-tall", x: 14, y: -13, sway: "s3" }], grave: { shape: "grave-cross", x: -4, y: -18 }, front: [{ shape: "blade-short", x: 0, y: -5, sway: "s3" }], flowers: [{ shape: "flower-cross", x: -3, y: -26, delay: "d1" }] },
  { x: 584, y: 354, back: [{ shape: "blade-tall", x: -16, y: -14, sway: "s3" }, { shape: "blade-curve-l", x: -20, y: -11 }, { shape: "blade-tall", x: 22, y: -14, sway: "s2" }, { shape: "blade-curve-r", x: 20, y: -12, sway: "s4" }], grave: { shape: "grave-round", x: -9, y: -28 }, front: [{ shape: "blade-short", x: -3, y: -6, sway: "s4" }, { shape: "blade-short", x: 11, y: -6, sway: "s2" }], flowers: [{ shape: "flower-tall", x: -3, y: -40, delay: "d1" }, { shape: "flower-cross", x: 6, y: -36, delay: "d2" }, { shape: "flower-daisy", x: -9, y: -36, delay: "d3" }] },
];

const gardenAtmosphere = [[100, 60], [240, 92], [380, 44], [500, 80], [600, 120], [160, 130], [450, 160], [60, 180]];

function GraveyardExperiment() {
  const field = useRef<HTMLDivElement>(null);
  const garden = useRef<SVGSVGElement>(null);
  const cursor = useRef<SVGSVGElement>(null);
  const timers = useRef<number[]>([]);
  const watering = useRef(new Set<number>());
  const nextEffect = useRef(0);
  const rawId = useId();
  const scope = `garden-${rawId.replace(/:/g, "")}`;
  const [blooms, setBlooms] = useState<number[]>([]);
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [ghosts, setGhosts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [cans, setCans] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const waterPlot = (plotIndex: number, x: number, y: number, touch = false) => {
    if (watering.current.has(plotIndex)) return;
    watering.current.add(plotIndex);
    haptic("soft", 0.42, touch);

    const dropBatch = [0, 90, 180].map((delay, index) => ({ id: nextEffect.current++, x: x + (index - 1) * 3, y: y - 2, delay }));
    setDrops((current) => [...current, ...dropBatch]);
    later(() => setDrops((current) => current.filter((drop) => !dropBatch.some((item) => item.id === drop.id))), 1150);

    if (touch) {
      const id = nextEffect.current++;
      setCans((current) => [...current, { id, x, y }]);
      later(() => setCans((current) => current.filter((can) => can.id !== id)), 600);
    }

    later(() => setBlooms((current) => current.includes(plotIndex) ? current : [...current, plotIndex]), 520);
    later(() => {
      const id = nextEffect.current++;
      const plot = gardenPlots[plotIndex];
      setGhosts((current) => [...current, { id, x: plot.x, y: plot.y - 36 }]);
      later(() => setGhosts((current) => current.filter((ghost) => ghost.id !== id)), 4600);
    }, 720);
    later(() => {
      setBlooms((current) => current.filter((index) => index !== plotIndex));
      watering.current.delete(plotIndex);
    }, 5500);
  };

  const pointFromPointer = (clientX: number, clientY: number) => {
    const matrix = garden.current?.getScreenCTM()?.inverse();
    if (!matrix) return null;
    return { x: matrix.a * clientX + matrix.c * clientY + matrix.e, y: matrix.b * clientX + matrix.d * clientY + matrix.f };
  };

  const water = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const point = pointFromPointer(event.clientX, event.clientY);
    if (!point) return;
    let nearest = 0;
    gardenPlots.forEach((plot, index) => {
      if (Math.hypot(plot.x - point.x, plot.y - point.y) < Math.hypot(gardenPlots[nearest].x - point.x, gardenPlots[nearest].y - point.y)) nearest = index;
    });
    field.current?.classList.add("is-watering");
    later(() => field.current?.classList.remove("is-watering"), 180);
    waterPlot(nearest, point.x, point.y, event.pointerType !== "mouse");
  };

  const moveCursor = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cursor.current || !field.current) return;
    const bounds = field.current.getBoundingClientRect();
    cursor.current.style.transform = `translate(${event.clientX - bounds.left - 25}px, ${event.clientY - bounds.top - 21}px)`;
    cursor.current.classList.add("is-visible");
  };

  const shape = (name: string) => `#${scope}-${name}`;
  const renderBlades = (blades: GardenBlade[], prefix: string) => blades.map((blade, index) => <g key={`${prefix}-${index}`} className={`grave-sway ${blade.sway || ""}`}><use href={shape(blade.shape)} x={blade.x} y={blade.y} /></g>);

  return (
    <div ref={field} className="graveyard-experiment" role="button" tabIndex={0} aria-label="Water a grave" onPointerDown={water} onPointerMove={moveCursor} onPointerEnter={moveCursor} onPointerLeave={() => cursor.current?.classList.remove("is-visible")} onKeyDown={(event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const index = gardenPlots.findIndex((_, plotIndex) => !watering.current.has(plotIndex));
      const next = index < 0 ? 0 : index;
      waterPlot(next, gardenPlots[next].x, gardenPlots[next].y - 10);
    }}>
      <svg ref={garden} className="grave-garden" viewBox="0 0 640 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <g id={`${scope}-blade-tall`}><path d="M0 0h2v14H0z" /></g>
          <g id={`${scope}-blade-mid`}><path d="M0 0h2v10H0z" /></g>
          <g id={`${scope}-blade-short`}><path d="M0 0h2v6H0z" /></g>
          <g id={`${scope}-blade-curve-r`}><path d="M0 6h2v6H0zM1 3h2v3H1zM2 0h2v3H2z" /></g>
          <g id={`${scope}-blade-curve-l`}><path d="M2 6h2v6H2zM1 3h2v3H1zM0 0h2v3H0z" /></g>
          <g id={`${scope}-grave-round`}><path className="grave-stone-body" d="M6 0h6v2H6zM4 2h10v2H4zM2 4h14v2H2zM1 6h16v16H1z" /><path className="grave-stone-shadow" d="M1 6h2v16H1zM2 4h2v2H2z" /><path className="grave-stone-detail" d="M8 10h2v8H8zM5 13h8v2H5z" /></g>
          <g id={`${scope}-grave-slab`}><path className="grave-stone-shadow" d="M0 0h16v2H0zM0 2h2v12H0z" /><path className="grave-stone-body" d="M2 2h14v12H2z" /><path className="grave-stone-detail" d="M3 6h2v2H3zM7 6h2v2H7zM11 6h2v2h-2z" /></g>
          <g id={`${scope}-grave-cross`}><path className="grave-stone-body" d="M3 0h2v14H3zM0 3h8v2H0z" /><path className="grave-stone-shadow" d="M3 0h1v14H3zM0 3h8v1H0z" /></g>
          <g id={`${scope}-flower-daisy`}><path className="grave-bloom" d="M2 0h2v2H2zM0 2h2v2H0zM4 2h2v2H4zM2 4h2v2H2z" /><path className="grave-bloom-center" d="M2 2h2v2H2z" /></g>
          <g id={`${scope}-flower-cross`}><path className="grave-bloom" d="M2 0h2v2H2zM0 2h6v2H0zM2 4h2v2H2z" /></g>
          <g id={`${scope}-flower-tall`}><path className="grave-bloom" d="M1 0h4v2H1zM0 2h6v2H0zM1 4h4v2H1z" /><path className="grave-bloom-center" d="M2 2h2v2H2z" /></g>
          <g id={`${scope}-ghost`}><path className="grave-bloom" d="M7 0h6v2H7zM5 2h10v2H5zM3 4h14v2H3zM1 6h18v8H1zM1 14h3v3H1zM6 14h3v3H6zM11 14h3v3h-3zM16 14h3v3h-3z" /><path className="grave-stone-detail" d="M6 8h2v3H6zM12 8h2v3h-2zM9 11h2v1H9z" /></g>
          <g id={`${scope}-can`}><path className="grave-can-fill" d="M10 14h12v10H10zM11 12h10v2H11zM13 8h6v2h-6zM13 10h2v2h-2zM17 10h2v2h-2zM22 15h4v3h-4zM24 13h2v2h-2z" /></g>
        </defs>
        {gardenAtmosphere.map(([x, y], index) => <rect className="grave-dot" key={`${x}-${y}`} x={x} y={y} width="2" height="2" />)}
        {gardenPlots.map((plot, index) => <g className={`grave-plot ${blooms.includes(index) ? "is-bloomed" : ""}`} key={plot.x} transform={`translate(${plot.x} ${plot.y}) scale(2)`}>
          {renderBlades(plot.back, `back-${index}`)}
          <use href={shape(plot.grave.shape)} x={plot.grave.x} y={plot.grave.y} />
          {renderBlades(plot.front, `front-${index}`)}
          {plot.flowers.map((flower, flowerIndex) => <g className={`grave-flower ${flower.delay}`} key={`flower-${flowerIndex}`}><use href={shape(flower.shape)} x={flower.x} y={flower.y} /></g>)}
        </g>)}
        {drops.map((drop) => <rect className="grave-drop" key={drop.id} x={drop.x - 1} y={drop.y} width="2" height="4" style={{ animationDelay: `${drop.delay}ms` }} />)}
        {ghosts.map((ghost) => <g key={ghost.id} transform={`translate(${ghost.x} ${ghost.y})`}><g className="grave-ghost-rise"><g className="grave-ghost-bob"><g transform="scale(2) translate(-10 -17)"><use href={shape("ghost")} /></g></g></g></g>)}
        {cans.map((can) => <g key={can.id} transform={`translate(${can.x - 25} ${can.y - 21}) rotate(40 16 16)`}><use href={shape("can")} /></g>)}
      </svg>
      <svg ref={cursor} className="grave-can-cursor" viewBox="0 0 32 32" aria-hidden="true"><g className="grave-can-shape"><use href={shape("can")} /></g></svg>
    </div>
  );
}

function ExperimentMedia({ item }: { item: Experiment }) {
  if (item.type === "image") {
    const dimensions = item.image.includes("ome1gB4")
      ? [640, 800]
      : item.image.includes("Fi56tUI")
        ? [640, 384]
        : item.image.includes("SdkAUV")
          ? [640, 260]
          : [640, 418];
    return <img src={item.image} alt={item.label} width={dimensions[0]} height={dimensions[1]} loading="lazy" />;
  }
  if (item.type === "video") return <div className={`experiment-video experiment-video-${item.variant}`}><video src={item.video} autoPlay loop muted playsInline preload="metadata" /></div>;
  if (item.type === "stamp") return <StampExperiment />;
  return <GraveyardExperiment />;
}

export function ExperimentsPage({ embedded = false }: { embedded?: boolean }) {
  const Wrapper = embedded ? "div" : "main";
  return (
    <Wrapper className={`detail-page gallery-page experiments-page ${embedded ? "experiments-page-embedded" : ""}`}>
      <header className="gallery-intro"><h1>Experiments</h1><p>Some of these ideas shipped and grew. Some died on the vine. Some are still blooming.</p></header>
      <div className="experiment-stream">
        {experiments.map((item) => <figure key={item.label}><ExperimentMedia item={item} /><figcaption>{item.label}</figcaption></figure>)}
      </div>
      <p className="best-yet">The best is yet to come…</p>
      {!embedded && <TimeFooter wide />}
      {!embedded && <HomePill />}
    </Wrapper>
  );
}
