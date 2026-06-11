"use client";

import { useEffect, useRef } from "react";

const ORG_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

#orgchart-rsh, #orgchart-rsh *, #orgchart-rsh *::before, #orgchart-rsh *::after { box-sizing: border-box; }
#orgchart-rsh {
  --font: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --bg: oklch(0.992 0.004 250);
  --bg-2: oklch(0.972 0.008 250);
  --ink: oklch(0.26 0.03 262);
  --muted: oklch(0.52 0.025 262);
  --faint: oklch(0.70 0.02 262);
  --card: #ffffff;
  --line: oklch(0.90 0.012 262);
  --line-soft: oklch(0.93 0.01 262);
  --brand-h: 250;
  --brand: oklch(0.55 0.13 var(--brand-h));
  --brand-d: oklch(0.46 0.14 var(--brand-h));
  --radius: 22px;
  --shadow-1: 0 1px 2px oklch(0.5 0.05 262 / .06), 0 8px 24px oklch(0.5 0.05 262 / .07);
  --shadow-2: 0 2px 6px oklch(0.5 0.05 262 / .08), 0 24px 60px oklch(0.5 0.05 262 / .16);
  position: relative;
  font-family: var(--font);
  color: var(--ink);
  background: radial-gradient(120% 90% at 50% -10%, var(--bg-2), transparent 55%), var(--bg);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  border-radius: 24px;
  overflow: clip;
  container-type: inline-size;
}
#orgchart-rsh::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background-image: radial-gradient(oklch(0.7 0.02 262 / .14) 1px, transparent 1.4px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(80% 70% at 50% 42%, #000 35%, transparent 78%);
  mask-image: radial-gradient(80% 70% at 50% 42%, #000 35%, transparent 78%);
}
#orgchart-rsh .oc-head {
  position: relative; z-index: 4;
  display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
  flex-wrap: wrap; padding: 30px 34px 6px;
}
#orgchart-rsh .oc-eyebrow {
  font-size: 12.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
  color: var(--brand); margin: 0 0 7px;
}
#orgchart-rsh .oc-title { margin: 0; font-size: clamp(22px, 3.4cqw, 31px); font-weight: 800; letter-spacing: -.02em; }
#orgchart-rsh .oc-sub { margin: 6px 0 0; font-size: 14.5px; color: var(--muted); max-width: 52ch; }
#orgchart-rsh .oc-searchwrap { position: relative; width: min(340px, 80vw); }
#orgchart-rsh .oc-search {
  display: flex; align-items: center; gap: 10px;
  background: var(--card); border: 1px solid var(--line);
  border-radius: 999px; padding: 11px 16px;
  box-shadow: var(--shadow-1); transition: border-color .2s, box-shadow .2s;
}
#orgchart-rsh .oc-search:focus-within { border-color: var(--brand); box-shadow: 0 0 0 4px oklch(0.55 0.13 var(--brand-h) / .12); }
#orgchart-rsh .oc-search svg { flex: none; width: 18px; height: 18px; stroke: var(--faint); }
#orgchart-rsh .oc-search input {
  border: 0; outline: 0; background: transparent; width: 100%;
  font-family: var(--font); font-size: 14.5px; color: var(--ink); font-weight: 500;
}
#orgchart-rsh .oc-search input::placeholder { color: var(--faint); }
#orgchart-rsh .oc-clear {
  flex: none; border: 0; background: transparent; cursor: pointer;
  color: var(--faint); padding: 2px; display: none; line-height: 0; border-radius: 50%;
}
#orgchart-rsh .oc-clear:hover { color: var(--ink); }
#orgchart-rsh .oc-search.has-q .oc-clear { display: inline-flex; }
#orgchart-rsh .oc-results {
  position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 30;
  background: var(--card); border: 1px solid var(--line); border-radius: 16px;
  box-shadow: var(--shadow-2); overflow: hidden; max-height: 320px; overflow-y: auto; display: none;
}
#orgchart-rsh .oc-results.open { display: block; }
#orgchart-rsh .oc-res {
  display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
  border: 0; background: transparent; cursor: pointer; padding: 11px 15px; font-family: var(--font);
  border-bottom: 1px solid var(--line-soft);
}
#orgchart-rsh .oc-res:last-child { border-bottom: 0; }
#orgchart-rsh .oc-res:hover, #orgchart-rsh .oc-res.cur { background: var(--bg-2); }
#orgchart-rsh .oc-res .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; background: oklch(0.62 0.16 var(--h)); }
#orgchart-rsh .oc-res .r-main { font-size: 14px; font-weight: 700; color: var(--ink); }
#orgchart-rsh .oc-res .r-sub { font-size: 12.5px; color: var(--muted); }
#orgchart-rsh .oc-res mark { background: oklch(0.62 0.16 var(--h) / .2); color: inherit; border-radius: 3px; padding: 0 1px; }
#orgchart-rsh .oc-res .r-empty { padding: 16px; color: var(--muted); font-size: 13.5px; }
#orgchart-rsh .oc-stage {
  position: relative; z-index: 2;
  width: 100%; height: clamp(740px, 86vh, 1000px); margin-top: 6px;
}
#orgchart-rsh .oc-links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; z-index: 1; pointer-events: none; }
#orgchart-rsh .oc-ring { fill: none; stroke: var(--line); stroke-width: 1.4; stroke-dasharray: 5 7; opacity: .65; }
#orgchart-rsh .oc-stage.is-intro .oc-ring { animation: oc-ringfade .9s ease .35s backwards; }
#orgchart-rsh .oc-spoke {
  fill: none; stroke: var(--line); stroke-width: 1.6; stroke-linecap: round; stroke-dashoffset: 0;
  transition: stroke .25s, stroke-width .25s, filter .25s;
}
#orgchart-rsh .oc-stage.is-intro .oc-spoke { animation: oc-draw 1s cubic-bezier(.22,.61,.36,1) var(--d,0s) backwards; }
#orgchart-rsh .oc-spoke.glow { stroke: oklch(0.6 0.17 var(--h)); stroke-width: 2.6; filter: drop-shadow(0 0 6px oklch(0.62 0.18 var(--h) / .6)); }
@keyframes oc-ringfade { from { opacity: 0; } to { opacity: .65; } }
@keyframes oc-draw { from { stroke-dashoffset: var(--len,400); } to { stroke-dashoffset: 0; } }
@keyframes oc-rise { from { opacity: 0; transform: translate(-50%,-50%) scale(.62); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
@keyframes oc-pop { from { opacity: 0; transform: translate(-50%,-50%) scale(.4); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
#orgchart-rsh .oc-center {
  position: absolute; left: 50%; top: 50%; z-index: 3;
  transform: translate(-50%,-50%);
  width: 244px; height: 244px; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  padding: 24px; cursor: default; color: #fff;
  background: radial-gradient(120% 120% at 30% 22%, oklch(0.62 0.13 var(--brand-h)), oklch(0.45 0.14 var(--brand-h)) 70%);
  box-shadow:
    0 0 0 10px oklch(0.55 0.13 var(--brand-h) / .08),
    0 0 0 22px oklch(0.55 0.13 var(--brand-h) / .045),
    var(--shadow-2);
}
#orgchart-rsh .oc-stage.is-intro .oc-center { animation: oc-rise .7s cubic-bezier(.2,.8,.25,1) .2s backwards; }
#orgchart-rsh .oc-logo {
  width: 50px; height: 50px; border-radius: 14px; margin-bottom: 10px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.32); position: relative;
}
#orgchart-rsh .oc-logo svg { width: 30px; height: 30px; }
#orgchart-rsh .oc-logo .ph {
  position: absolute; bottom: -7px; right: -7px; font-size: 8px; font-weight: 700; letter-spacing: .04em;
  background: #fff; color: var(--brand-d); padding: 2px 5px; border-radius: 6px; box-shadow: var(--shadow-1);
}
#orgchart-rsh .oc-center .c-name { font-size: 19px; font-weight: 800; line-height: 1.12; letter-spacing: -.01em; }
#orgchart-rsh .oc-center .c-name2 { font-size: 18px; font-weight: 800; line-height: 1.12; white-space: nowrap; }
#orgchart-rsh .oc-center .c-place { font-size: 11px; font-weight: 600; opacity: .85; margin-top: 8px; letter-spacing: .14em; text-transform: uppercase; }
#orgchart-rsh .oc-node {
  position: absolute; z-index: 4; transform: translate(-50%,-50%);
  display: flex; flex-direction: column; align-items: center; gap: 9px;
  width: 132px; cursor: pointer; border: 0; background: transparent; font-family: var(--font);
}
#orgchart-rsh .oc-stage.is-intro .oc-node { animation: oc-pop .55s cubic-bezier(.2,.8,.25,1) var(--d,0s) backwards; }
#orgchart-rsh .oc-node .bub {
  position: relative; width: 62px; height: 62px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 19px;
  background: radial-gradient(120% 120% at 32% 25%, oklch(0.70 0.14 var(--h)), oklch(0.55 0.16 var(--h)) 72%);
  box-shadow: 0 6px 16px oklch(0.55 0.16 var(--h) / .35), inset 0 1px 0 rgba(255,255,255,.25);
  transition: transform .26s cubic-bezier(.2,.8,.25,1), box-shadow .26s;
}
#orgchart-rsh .oc-node .bub .ic { width: 26px; height: 26px; }
#orgchart-rsh .oc-node .count {
  position: absolute; top: -5px; right: -5px; min-width: 20px; height: 20px; padding: 0 5px;
  border-radius: 999px; background: #fff; color: oklch(0.45 0.14 var(--h));
  font-size: 11.5px; font-weight: 800; display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-1); border: 1px solid oklch(0.88 0.04 var(--h));
}
#orgchart-rsh .oc-node .lbl {
  font-size: 13px; font-weight: 700; line-height: 1.18; text-align: center; color: var(--ink);
  text-wrap: balance; max-width: 132px;
}
#orgchart-rsh .oc-node:hover .bub, #orgchart-rsh .oc-node:focus-visible .bub {
  transform: translateY(-4px) scale(1.07);
  box-shadow: 0 12px 26px oklch(0.55 0.16 var(--h) / .45), inset 0 1px 0 rgba(255,255,255,.3);
}
#orgchart-rsh .oc-node:focus-visible { outline: none; }
#orgchart-rsh .oc-node:focus-visible .bub { outline: 3px solid oklch(0.62 0.16 var(--h) / .5); outline-offset: 3px; }
#orgchart-rsh .oc-stage.has-focus .oc-node:not(.on) { opacity: .28; filter: saturate(.5); }
#orgchart-rsh .oc-stage.has-focus .oc-node:not(.on) .lbl { color: var(--faint); }
#orgchart-rsh .oc-node.on .bub { transform: translateY(-4px) scale(1.1); box-shadow: 0 14px 30px oklch(0.55 0.16 var(--h) / .5); }
#orgchart-rsh .oc-node.on .bub::after {
  content: ""; position: absolute; inset: -7px; border-radius: 50%;
  border: 2px solid oklch(0.62 0.16 var(--h)); opacity: .6;
}
#orgchart-rsh .oc-node.pulse .bub { animation: oc-pulse 1.6s ease-in-out infinite; }
@keyframes oc-pulse {
  0%,100% { box-shadow: 0 6px 16px oklch(0.55 0.16 var(--h) / .35); }
  50% { box-shadow: 0 6px 16px oklch(0.55 0.16 var(--h) / .35), 0 0 0 10px oklch(0.62 0.16 var(--h) / .14); }
}
#orgchart-rsh .oc-backdrop {
  position: absolute; inset: 0; z-index: 8; background: oklch(0.3 0.03 262 / .28);
  backdrop-filter: blur(3px); opacity: 0; pointer-events: none; transition: opacity .3s;
}
#orgchart-rsh .oc-backdrop.open { opacity: 1; pointer-events: auto; }
#orgchart-rsh .oc-panel {
  position: absolute; z-index: 9; left: 50%; top: 50%; transform: translate(-50%,-46%) scale(.96);
  width: min(640px, calc(100% - 48px)); max-height: min(78%, 720px);
  background: var(--card); border-radius: 26px; box-shadow: var(--shadow-2);
  border: 1px solid var(--line-soft);
  display: flex; flex-direction: column; overflow: hidden;
  opacity: 0; pointer-events: none; transition: opacity .32s ease, transform .42s cubic-bezier(.2,.85,.25,1);
}
#orgchart-rsh .oc-panel.open { opacity: 1; transform: translate(-50%,-50%) scale(1); pointer-events: auto; }
#orgchart-rsh .oc-panel-head {
  position: relative; padding: 24px 26px 20px; color: #fff; flex: none;
  background: linear-gradient(135deg, oklch(0.62 0.15 var(--h)), oklch(0.48 0.16 var(--h)));
}
#orgchart-rsh .oc-panel-head .ph-kicker { font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; opacity: .85; }
#orgchart-rsh .oc-panel-head .ph-title { font-size: 24px; font-weight: 800; margin-top: 5px; letter-spacing: -.01em; display: flex; align-items: center; gap: 12px; }
#orgchart-rsh .oc-panel-head .ph-ic { width: 30px; height: 30px; flex: none; }
#orgchart-rsh .oc-panel-head .ph-meta { font-size: 13px; font-weight: 600; opacity: .9; margin-top: 6px; }
#orgchart-rsh .oc-close {
  position: absolute; top: 18px; right: 18px; width: 34px; height: 34px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.4); background: rgba(255,255,255,.16); color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s;
}
#orgchart-rsh .oc-close:hover { background: rgba(255,255,255,.3); }
#orgchart-rsh .oc-panel-body { padding: 18px; overflow-y: auto; overflow-x: hidden; display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
#orgchart-rsh .oc-panel-body.single { grid-template-columns: 1fr; }
#orgchart-rsh .oc-item {
  border: 1px solid var(--line); border-radius: 16px; padding: 15px 16px; background: var(--card);
  transition: transform .2s, box-shadow .2s, border-color .2s, background .2s;
  opacity: 0; transform: translateY(8px);
}
#orgchart-rsh .oc-panel.open .oc-item {
  opacity: 1; transform: none;
  transition: opacity .4s ease var(--d,0s), transform .4s cubic-bezier(.2,.8,.25,1) var(--d,0s), box-shadow .2s, border-color .2s;
}
#orgchart-rsh .oc-item:hover { border-color: oklch(0.78 0.08 var(--h)); box-shadow: var(--shadow-1); transform: translateY(-2px); }
#orgchart-rsh .oc-item.spot {
  border-color: oklch(0.62 0.16 var(--h));
  box-shadow: 0 0 0 3px oklch(0.62 0.16 var(--h) / .18);
  background: oklch(0.62 0.16 var(--h) / .04);
}
#orgchart-rsh .oc-item .role { font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: oklch(0.5 0.15 var(--h)); }
#orgchart-rsh .oc-item .ppl { font-size: 15.5px; font-weight: 700; color: var(--ink); margin-top: 4px; line-height: 1.3; }
#orgchart-rsh .oc-item .ppl.empty { color: var(--faint); font-weight: 600; font-style: italic; }
#orgchart-rsh .oc-item .tasks { font-size: 12.5px; color: var(--muted); margin-top: 8px; line-height: 1.5; }
#orgchart-rsh .oc-foot { position: relative; z-index: 3; padding: 8px 34px 26px; }
#orgchart-rsh .oc-hint { font-size: 12.5px; color: var(--faint); display: flex; align-items: center; gap: 8px; }
#orgchart-rsh .oc-hint kbd {
  font-family: var(--font); font-size: 11px; font-weight: 700;
  background: var(--card); border: 1px solid var(--line); border-bottom-width: 2px;
  border-radius: 6px; padding: 1px 6px; color: var(--muted);
}
#orgchart-rsh .oc-backdrop.shown { opacity: 1 !important; transition: none !important; }
#orgchart-rsh .oc-panel.shown { opacity: 1 !important; transform: translate(-50%,-50%) scale(1) !important; transition: none !important; }
#orgchart-rsh .oc-panel.shown .oc-item { opacity: 1 !important; transform: none !important; transition: none !important; }
@container (max-width: 820px) {
  #orgchart-rsh .oc-stage { height: auto; min-height: 0; padding: 8px 18px 20px; }
  #orgchart-rsh .oc-links { display: none; }
  #orgchart-rsh .oc-center {
    position: static; transform: none !important; opacity: 1 !important; width: 100%;
    border-radius: var(--radius); min-height: 0; flex-direction: row; gap: 16px; text-align: left;
    padding: 20px 22px; justify-content: flex-start;
  }
  #orgchart-rsh .oc-logo { margin-bottom: 0; }
  #orgchart-rsh .oc-center .c-txt { text-align: left; }
  #orgchart-rsh .oc-center .c-place { margin-top: 4px; }
  #orgchart-rsh .oc-nodes { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 12px; margin-top: 16px; }
  #orgchart-rsh .oc-node {
    position: static !important; transform: none !important; width: auto; opacity: 1 !important;
    flex-direction: row; gap: 13px; align-items: center; justify-content: flex-start;
    background: var(--card); border: 1px solid var(--line) !important; border-radius: 16px;
    padding: 12px 14px; box-shadow: var(--shadow-1);
  }
  #orgchart-rsh .oc-node .bub { width: 46px; height: 46px; font-size: 15px; }
  #orgchart-rsh .oc-node .bub .ic { width: 21px; height: 21px; }
  #orgchart-rsh .oc-node .lbl { text-align: left; font-size: 13.5px; }
  #orgchart-rsh .oc-node:hover .bub, #orgchart-rsh .oc-node.on .bub { transform: none; }
  #orgchart-rsh .oc-stage.has-focus .oc-node:not(.on) { display: none; }
  #orgchart-rsh .oc-panel { top: auto; bottom: 0; left: 0; transform: translateY(100%); width: 100%; max-height: 86%; border-radius: 24px 24px 0 0; }
  #orgchart-rsh .oc-panel.open { transform: translateY(0); }
  #orgchart-rsh .oc-panel.shown { transform: translateY(0) !important; }
  #orgchart-rsh .oc-panel-body { grid-template-columns: 1fr; }
  #orgchart-rsh .oc-head { padding: 24px 20px 4px; }
  #orgchart-rsh .oc-foot { padding: 8px 20px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  #orgchart-rsh * { animation: none !important; transition-duration: .01ms !important; }
  #orgchart-rsh .oc-spoke { stroke-dashoffset: 0 !important; }
}
`;

const ORG_DATA = {
  center: { name: "Realschule", name2: "„Am Heimbach“", place: "Troisdorf" },
  areas: [
    {
      id: "schulleitung", label: "Schulleitung", hue: 248,
      items: [
        { role: "Schulleiter", people: "Hr. Herbst", tasks: "Personalia, Beschwerden, Widersprüche, Konferenzen, Mitwirkungsorgane, An- & Abmeldungen, Beurlaubungen, UVD, Stundenplan, Öffentlichkeitsarbeit, Schulprogramm" },
        { role: "Konrektorin", people: "Fr. Fournes", tasks: "UVD, Vertretung, Stundenplan, Aufsicht, Konferenzen, AKO, Differenzierung, Beratung, Stufenorganisation" },
        { role: "2. Konrektor*in", people: "Hr. Werner", tasks: "Vertretung, Stundenplan, Aufsicht, UVD, Erprobungsstufe, Ganztag, Fortbildung, Schulprogramm" },
      ],
    },
    {
      id: "schulentwicklung", label: "Schul- & Qualitätsentwicklung", hue: 280,
      items: [
        { role: "Lernstand 8", people: "Hr. Engler, Hr. Hagemeyer" },
        { role: "Krisenteam", people: "Fr. Nunner, Fr. Cempel, Fr. Hoffmann, Lehrerrat, Schulleitung" },
        { role: "Steuergruppe", people: "Werner, Herbst, Fournes, Cuypers, Kuhn-Drawe, Cempel, Lehrerrat" },
        { role: "Lernzeiten", people: "" },
        { role: "Zentrale Prüfung", people: "" },
        { role: "Schulprogramm", people: "" },
      ],
    },
    {
      id: "hauptfaecher", label: "Hauptfächer", hue: 158,
      items: [
        { role: "Deutsch", people: "Fr. Kassmann" },
        { role: "Englisch", people: "Fr. Etschenberg" },
        { role: "Mathematik", people: "Fr. Fischer" },
      ],
    },
    {
      id: "differenzierung", label: "Differenzierung", hue: 172,
      items: [
        { role: "Sozialwissenschaften", people: "Hr. Erdogan" },
        { role: "Biologie", people: "Fr. Sliwa" },
        { role: "Informatik", people: "Hr. Stein, Fr. Koller" },
        { role: "Technik", people: "Hr. Harpak" },
        { role: "Französisch", people: "Hr. Engler" },
        { role: "Kunst", people: "Fr. Rieber" },
      ],
    },
    {
      id: "faechergruppe2", label: "Fächergruppe II", hue: 132,
      items: [
        { role: "Musik", people: "Fr. Schulz" },
        { role: "Erdkunde", people: "Fr. Reuber" },
        { role: "Geschichte", people: "Hr. Marx" },
        { role: "Politik", people: "Hr. Erdogan" },
        { role: "Prakt. Philosophie", people: "Hr. Tembe" },
        { role: "Biologie", people: "Fr. Sliwa" },
        { role: "Physik", people: "Hr. Thape" },
        { role: "Chemie", people: "Fr. Gerdesmeyer" },
        { role: "Ev. Religion", people: "Fr. Hoffmann" },
        { role: "Sport", people: "Hr. Stander" },
        { role: "Kunst", people: "Fr. Rieber" },
        { role: "Textil", people: "Fr. Sliwa" },
        { role: "Kath. Religion", people: "Hr. Cuypers" },
      ],
    },
    {
      id: "integration", label: "Integration & Sprachförderung", hue: 196,
      items: [
        { role: "LRS", people: "Fr. Etschenberg, Hr. Schmidt" },
        { role: "Sprachfördergruppe (SFG)", people: "Fr. Loslei" },
      ],
    },
    {
      id: "muttersprachlich", label: "Muttersprachlicher Unterricht", hue: 212,
      items: [
        { role: "Griechisch", people: "Fr. Kyriakopoulou" },
        { role: "Türkisch", people: "Fr. Gümüs-Gerichhausen" },
      ],
    },
    {
      id: "verwaltung", label: "Verwaltung", hue: 230,
      items: [
        { role: "Sekretariat", people: "Fr. Eich" },
        { role: "Hausmeisterei", people: "Hr. Müller" },
      ],
    },
    {
      id: "verpflegung", label: "Verpflegung", hue: 44,
      items: [
        { role: "Mensa", people: "„Die Kette KochWerk“" },
      ],
    },
    {
      id: "gremien", label: "Schulmitwirkung & Gremien", hue: 308,
      items: [
        { role: "Schulpflegschaft", people: "Fr. Viehöver, Fr. Schmitz" },
        { role: "Teilkonferenz", people: "Hr. Stein, Hr. Schmidt, Fr. Grosse" },
        { role: "SV", people: "Fr. Katzner, Hr. Haag" },
        { role: "Küchenausschuss", people: "Fr. Pieper, Hr. Harpak" },
        { role: "Lehrerrat", people: "Fr. Beyers, Fr. Fischer, Hr. Koretz, Fr. Nunner" },
        { role: "Gleichstellung", people: "Fr. Cempel, Fr. Etschenberg" },
        { role: "Schulkonferenz", people: "" },
        { role: "Schulpflegschaft", people: "" },
        { role: "Fachkonferenzen", people: "" },
      ],
    },
    {
      id: "kooperation", label: "Kooperation & Firmen", hue: 32,
      items: [
        { role: "Arbeiterwohlfahrt (AWO)", people: "" },
        { role: "Harmonisierung", people: "Schulen in Troisdorf" },
        { role: "Paten in Ausbildung (PfAu)", people: "" },
        { role: "Ausbildung / Anschluss", people: "„Harry-Brot“, „Böhm-Elektrobau“" },
        { role: "Erfinderclub Troisdorf", people: "Hr. Herzog" },
        { role: "Agentur für Arbeit / Berufsberatung", people: "Hr. Bikliqi" },
        { role: "Jugendbüro / Ausbildung & Beruf", people: "Fr. Eilers" },
      ],
    },
    {
      id: "sonderaufgaben", label: "Sonderaufgaben", hue: 14,
      items: [
        { role: "Beratung", people: "Fr. Mittelbach, Hr. Koretz, Fr. Haffmans" },
        { role: "Suchtprävention / Peers", people: "Fr. Katzner, Fr. Jünger" },
        { role: "Homepage", people: "Hr. Haag" },
        { role: "Zeugnisse / Schild", people: "Hr. Marx, Hr. Cuypers" },
        { role: "Ganztag", people: "Fr. Fournes" },
        { role: "Praktikanten", people: "Fr. Nunner" },
        { role: "LAA / Praxissemester", people: "Fr. Hoffmann, Fr. Nunner" },
        { role: "Diff. Orga", people: "Fr. Nunner" },
        { role: "GU / Inklusion", people: "Fr. Haffmans, Fr. Pieper, Hr. Haag, Hr. Hagemeyer, Hr. Koretz (Sopä), Hr. Stander (MPT)" },
        { role: "EDV / Neue Medien", people: "Hr. Trimborn, Hr. Engler, Fr. Strack, Hr. Haag" },
        { role: "Trainingsraum", people: "Hr. Dittrich, Fr. Wiechmann, Fr. Musielak" },
        { role: "Berufsorientierung", people: "Fr. Beyers, Hr. Dittrich, Fr. Pieper (GU)" },
        { role: "Sicherheit", people: "Hr. Thape" },
        { role: "Bücher", people: "Fr. Oppermann" },
        { role: "Sanitäter", people: "Hr. Marx" },
        { role: "Streitschlichtung", people: "Fr. Gerdesmeyer" },
        { role: "Schülerzeitung", people: "Hr. Richter" },
      ],
    },
    {
      id: "foerderverein", label: "Förderverein", hue: 88,
      items: [
        { role: "Vorstand", people: "Fr. Viehöver, Fr. Fournes" },
      ],
    },
  ],
};

const ICONS: Record<string, string> = {
  schulleitung:     '<path d="M12 3l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15l-4.6 2.4.9-5.2-3.8-3.7 5.2-.8z"/>',
  schulentwicklung: '<path d="M4 17l5-5 3 3 7-7"/><path d="M15 8h5v5"/>',
  hauptfaecher:     '<path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H18v15.5H6.5A1.5 1.5 0 0 0 5 21z"/><path d="M5 17.5A1.5 1.5 0 0 1 6.5 16H18"/>',
  differenzierung:  '<path d="M12 4l8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/>',
  faechergruppe2:   '<rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/>',
  integration:      '<path d="M20 11.5a7.5 7.5 0 0 1-10.5 6.9L4 20l1.6-5A7.5 7.5 0 1 1 20 11.5z"/>',
  muttersprachlich: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.6 2.4 2.6 13.6 0 16M12 4c-2.6 2.4-2.6 13.6 0 16"/>',
  verwaltung:       '<path d="M4 7.5A1.5 1.5 0 0 1 5.5 6H9l2 2h7.5A1.5 1.5 0 0 1 20 9.5V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17z"/>',
  verpflegung:      '<path d="M6.5 3v7a2 2 0 0 0 4 0V3M8.5 12v9M17.5 3c-1.4 0-2.4 2.2-2.4 5s1 3.5 2.4 3.5V21"/>',
  gremien:          '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 6M20.5 19.5a5.5 5.5 0 0 0-3.7-5.2"/>',
  kooperation:      '<path d="M9.5 12.5 8 14a3 3 0 0 0 4.2 4.2l2.3-2.3"/><path d="M14.5 11.5 16 10a3 3 0 0 0-4.2-4.2L9.5 8.1"/><path d="M10 14l4-4"/>',
  sonderaufgaben:   '<circle cx="12" cy="12" r="3.4"/><path d="M12 3v2.6M12 18.4V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M19.8 7.5l-2.2 1.3M6.4 15.2l-2.2 1.3"/>',
  foerderverein:    '<path d="M12 20s-6.5-4.2-6.5-9A3.5 3.5 0 0 1 12 7.5 3.5 3.5 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9z"/>',
};

const HOUSE = '<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>';

function escHtml(s: string): string {
  return (s || "").replace(/[&<>]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"));
}

function svgIcon(inner: string, cls = ""): string {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

export default function OrganigrammWidget() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const clearBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const svgEl = svgRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const input = inputRef.current;
    const searchBox = searchBoxRef.current;
    const results = resultsRef.current;
    const clearBtn = clearBtnRef.current;

    if (!root || !stage || !svgEl || !panel || !backdrop || !input || !searchBox || !results || !clearBtn) return;

    const areas = ORG_DATA.areas;
    const NS = "http://www.w3.org/2000/svg";

    // Build center node
    const center = document.createElement("div");
    center.className = "oc-center";
    center.innerHTML =
      `<div class="oc-logo">${svgIcon(HOUSE)}<span class="ph">LOGO</span></div>` +
      `<div class="c-txt">` +
        `<div class="c-name">${escHtml(ORG_DATA.center.name)}</div>` +
        `<div class="c-name2">${escHtml(ORG_DATA.center.name2)}</div>` +
        `<div class="c-place">${escHtml(ORG_DATA.center.place)}</div>` +
      `</div>`;

    // Build area node buttons
    const nodesWrap = document.createElement("div");
    nodesWrap.className = "oc-nodes";

    const nodeEls: HTMLButtonElement[] = [];
    let spokeEls: SVGPathElement[] = [];

    areas.forEach((a, i) => {
      const n = document.createElement("button");
      n.className = "oc-node";
      n.type = "button";
      n.style.setProperty("--h", String(a.hue));
      n.setAttribute("data-id", a.id);
      n.setAttribute("aria-label", `${a.label} öffnen`);
      n.innerHTML =
        `<span class="bub">${svgIcon(ICONS[a.id] || "", "ic")}<span class="count">${a.items.length}</span></span>` +
        `<span class="lbl">${escHtml(a.label)}</span>`;
      n.addEventListener("click", () => openArea(a.id));
      n.addEventListener("mouseenter", () => { if (spokeEls[i]) spokeEls[i].classList.add("glow"); });
      n.addEventListener("mouseleave", () => { if (spokeEls[i] && !n.classList.contains("on")) spokeEls[i].classList.remove("glow"); });
      n.style.setProperty("--d", `${0.22 + i * 0.05}s`);
      nodesWrap.appendChild(n);
      nodeEls.push(n);
    });

    stage.insertBefore(center, backdrop);
    stage.insertBefore(nodesWrap, backdrop);

    // Layout
    let positions: Array<{ x: number; y: number }> = [];

    function isMobile() { return root.clientWidth < 820; }

    function layout() {
      if (isMobile()) { svgEl.innerHTML = ""; return; }
      const W = stage.clientWidth, H = stage.clientHeight;
      const cx = W / 2, cy = H / 2;
      const ry = Math.max(230, H / 2 - 116);
      const rx = Math.max(Math.min(W / 2 - 128, ry * 1.6), 196);
      const N = areas.length;
      positions = areas.map((_, i) => {
        const ang = -Math.PI / 2 + i * (2 * Math.PI / N);
        return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
      });
      nodeEls.forEach((n, i) => { n.style.left = `${positions[i].x}px`; n.style.top = `${positions[i].y}px`; });
      drawLinks(cx, cy, W, H);
    }

    function drawLinks(cx: number, cy: number, W: number, H: number) {
      svgEl.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svgEl.innerHTML = "";
      spokeEls = [];

      const ringD = positions.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
      const ring = document.createElementNS(NS, "path");
      ring.setAttribute("class", "oc-ring");
      ring.setAttribute("d", ringD);
      svgEl.appendChild(ring);

      positions.forEach((p, i) => {
        const mx = (cx + p.x) / 2, my = (cy + p.y) / 2;
        const dx = p.x - cx, dy = p.y - cy;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const bow = 16 * (i % 2 ? 1 : -1);
        const d = `M${cx.toFixed(1)} ${cy.toFixed(1)} Q${(mx + nx * bow).toFixed(1)} ${(my + ny * bow).toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        const sp = document.createElementNS(NS, "path") as SVGPathElement;
        sp.setAttribute("class", "oc-spoke");
        sp.setAttribute("d", d);
        sp.style.setProperty("--h", String(areas[i].hue));
        svgEl.appendChild(sp);
        const total = sp.getTotalLength();
        sp.style.strokeDasharray = String(total);
        sp.style.setProperty("--len", String(total));
        sp.style.setProperty("--d", `${0.2 + i * 0.04}s`);
        spokeEls.push(sp);
      });
    }

    // Panel open/close
    let activeId: string | null = null;
    let shownTimer: ReturnType<typeof setTimeout> | null = null;

    function openArea(id: string, spotIdx?: number) {
      const a = areas.find((x) => x.id === id);
      if (!a) return;
      activeId = id;
      panel.style.setProperty("--h", String(a.hue));

      const single = a.items.length <= 2;
      panel.innerHTML =
        `<div class="oc-panel-head">` +
          `<button class="oc-close" id="ocClose" aria-label="Schließen"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>` +
          `<div class="ph-kicker">Bereich</div>` +
          `<div class="ph-title">${svgIcon(ICONS[a.id] || "", "ph-ic")}${escHtml(a.label)}</div>` +
          `<div class="ph-meta">${a.items.length} Zuständigkeit${a.items.length === 1 ? "" : "en"}</div>` +
        `</div>` +
        `<div class="oc-panel-body${single ? " single" : ""}">` +
          a.items.map((it, k) => {
            const ppl = it.people ? `<div class="ppl">${escHtml(it.people)}</div>` : `<div class="ppl empty">noch offen</div>`;
            const tasks = it.tasks ? `<div class="tasks">${escHtml(it.tasks)}</div>` : "";
            return `<div class="oc-item${spotIdx === k ? " spot" : ""}" data-k="${k}" style="--d:${0.05 + k * 0.035}s"><div class="role">${escHtml(it.role)}</div>${ppl}${tasks}</div>`;
          }).join("") +
        `</div>`;

      document.getElementById("ocClose")?.addEventListener("click", closeArea);

      clearHighlights();
      stage.classList.add("has-focus");
      nodeEls.forEach((n, i) => {
        const on = areas[i].id === id;
        n.classList.toggle("on", on);
        if (spokeEls[i]) spokeEls[i].classList.toggle("glow", on);
      });

      backdrop.classList.add("open");
      panel.classList.add("open");
      if (shownTimer) clearTimeout(shownTimer);
      shownTimer = setTimeout(() => {
        if (panel.classList.contains("open")) { panel.classList.add("shown"); backdrop.classList.add("shown"); }
      }, 380);

      if (typeof spotIdx === "number") {
        requestAnimationFrame(() => {
          const bodyEl = panel.querySelector(".oc-panel-body") as HTMLElement | null;
          const item = panel.querySelector(`.oc-item[data-k="${spotIdx}"]`) as HTMLElement | null;
          if (bodyEl && item) bodyEl.scrollTop = Math.max(0, item.offsetTop - 16);
        });
      }
    }

    function closeArea() {
      activeId = null;
      if (shownTimer) clearTimeout(shownTimer);
      panel.classList.remove("open", "shown");
      backdrop.classList.remove("open", "shown");
      clearHighlights();
      applySearchHighlights();
    }

    function clearHighlights() {
      stage.classList.remove("has-focus");
      nodeEls.forEach((n) => n.classList.remove("on", "pulse"));
      spokeEls.forEach((sp) => sp.classList.remove("glow"));
    }

    // Search index
    interface Entry { areaId: string; areaLabel: string; hue: number; role: string; people: string; k: number; hay: string; }
    const index: Entry[] = [];
    areas.forEach((a) => {
      a.items.forEach((it, k) => {
        index.push({ areaId: a.id, areaLabel: a.label, hue: a.hue, role: it.role, people: it.people, k,
          hay: `${a.label} ${it.role} ${it.people}`.toLowerCase() });
      });
    });

    let curQuery = "";

    function matchesFor(q: string) { return index.filter((r) => r.hay.includes(q)); }
    function matchingAreaIds(q: string) {
      const set: Record<string, boolean> = {};
      matchesFor(q).forEach((r) => { set[r.areaId] = true; });
      return set;
    }

    function applySearchHighlights() {
      if (activeId) return;
      if (!curQuery) { clearHighlights(); return; }
      const set = matchingAreaIds(curQuery);
      const any = Object.keys(set).length > 0;
      stage.classList.toggle("has-focus", any);
      nodeEls.forEach((n, i) => {
        const on = !!set[areas[i].id];
        n.classList.toggle("on", on);
        n.classList.toggle("pulse", on);
        if (spokeEls[i]) spokeEls[i].classList.toggle("glow", on);
      });
    }

    function hl(text: string, q: string): string {
      if (!q) return escHtml(text);
      const lt = text.toLowerCase();
      let out = "", i = 0, idx: number;
      while ((idx = lt.indexOf(q, i)) !== -1) {
        out += escHtml(text.slice(i, idx)) + `<mark>${escHtml(text.slice(idx, idx + q.length))}</mark>`;
        i = idx + q.length;
      }
      return out + escHtml(text.slice(i));
    }

    function renderResults(q: string) {
      if (!q) { results.classList.remove("open"); results.innerHTML = ""; return; }
      const m = matchesFor(q).slice(0, 12);
      if (!m.length) {
        results.innerHTML = `<div class="r-empty">Keine Treffer für „${escHtml(q)}".</div>`;
        results.classList.add("open");
        return;
      }
      results.innerHTML = m.map((r) => {
        const main = r.people || r.role;
        const sub = r.people ? `${r.role} · ${r.areaLabel}` : r.areaLabel;
        return `<button class="oc-res" style="--h:${r.hue}" data-area="${r.areaId}" data-k="${r.k}"><span class="dot"></span><span><span class="r-main">${hl(main, q)}</span><br><span class="r-sub">${hl(sub, q)}</span></span></button>`;
      }).join("");
      results.classList.add("open");
      Array.from(results.querySelectorAll(".oc-res")).forEach((b) => {
        b.addEventListener("click", () => {
          openArea(b.getAttribute("data-area")!, parseInt(b.getAttribute("data-k")!, 10));
          results.classList.remove("open");
        });
      });
    }

    // Event handlers
    const handleInput = () => {
      curQuery = input.value.trim().toLowerCase();
      searchBox.classList.toggle("has-q", !!curQuery);
      renderResults(curQuery);
      applySearchHighlights();
    };
    const handleInputKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const first = results.querySelector(".oc-res") as HTMLButtonElement | null;
        if (first) { e.preventDefault(); first.click(); }
      }
    };
    const handleInputFocus = () => { if (curQuery) renderResults(curQuery); };
    const handleClearClick = () => {
      input.value = ""; curQuery = "";
      searchBox.classList.remove("has-q");
      results.classList.remove("open");
      applySearchHighlights();
      input.focus();
    };
    const handleDocClick = (e: MouseEvent) => {
      if (!searchBox.contains(e.target as Node) && !results.contains(e.target as Node))
        results.classList.remove("open");
    };
    const handleDocKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (panel.classList.contains("open")) closeArea();
        else if (curQuery) handleClearClick();
      }
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", handleInputKeydown);
    input.addEventListener("focus", handleInputFocus);
    clearBtn.addEventListener("click", handleClearClick);
    backdrop.addEventListener("click", closeArea);
    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleDocKeydown);

    // Init
    stage.classList.add("is-intro");
    const introTimer = setTimeout(() => stage.classList.remove("is-intro"), 2400);
    const ro = new ResizeObserver(() => layout());
    ro.observe(stage);
    layout();

    return () => {
      clearTimeout(introTimer);
      if (shownTimer) clearTimeout(shownTimer);
      ro.disconnect();
      input.removeEventListener("input", handleInput);
      input.removeEventListener("keydown", handleInputKeydown);
      input.removeEventListener("focus", handleInputFocus);
      clearBtn.removeEventListener("click", handleClearClick);
      backdrop.removeEventListener("click", closeArea);
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleDocKeydown);
      center.parentNode?.removeChild(center);
      nodesWrap.parentNode?.removeChild(nodesWrap);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ORG_STYLES }} />
      <div
        ref={rootRef}
        id="orgchart-rsh"
        aria-label="Interaktives Organigramm der Realschule Am Heimbach"
      >
        <div className="oc-head">
          <div>
            <p className="oc-eyebrow">Organigramm</p>
            <h2 className="oc-title">Wer macht was an unserer Schule?</h2>
            <p className="oc-sub">
              Klicken Sie auf einen Bereich, um Zuständigkeiten und Ansprechpersonen zu entdecken –
              oder suchen Sie direkt nach Name oder Fach.
            </p>
          </div>
          <div className="oc-searchwrap">
            <div ref={searchBoxRef} className="oc-search">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Name oder Fach suchen …"
                autoComplete="off"
                aria-label="Suche"
              />
              <button ref={clearBtnRef} className="oc-clear" aria-label="Suche löschen">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div ref={resultsRef} className="oc-results" />
          </div>
        </div>

        <div ref={stageRef} className="oc-stage">
          <svg
            ref={svgRef}
            className="oc-links"
            aria-hidden="true"
          />
          <div ref={backdropRef} className="oc-backdrop" />
          <div
            ref={panelRef}
            className="oc-panel"
            role="dialog"
            aria-modal={true}
            aria-label="Bereichsdetails"
          />
        </div>

        <div className="oc-foot">
          <div className="oc-hint">
            <span>
              Tipp: Bereich anklicken · <kbd>Esc</kbd> schließt das Fenster
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
