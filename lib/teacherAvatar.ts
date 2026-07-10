// Generiert deterministisch ein dezentes SVG-Hintergrundbild pro Lehrkraft,
// damit fuer das Kollegium keine 50 einzelnen Bilddateien gepflegt werden
// muessen. Derselbe Name ergibt immer dasselbe Motiv (Hash als Seed),
// unterschiedliche Namen ergeben unterschiedliche Farben/Formen. Optional
// werden die Initialen als Monogramm und das erste Fach als grosses
// Wasserzeichen-Icon eingezeichnet.
//
// Die Rueckgabe ist eine Data-URL (data:image/svg+xml,...), die direkt im
// src-Attribut eines <img>/<Image unoptimized> oder als CSS background-image
// verwendet werden kann. Es wird bewusst encodeURIComponent statt Base64
// benutzt, damit die Funktion ohne Buffer sowohl in Node.js (Build/Sync-
// Skripte) als auch im Browser-Bundle laeuft.

// Farbwelten passend zum Seiten-Design (#1a3a6b Blau, #f5a623 Orange,
// dazu Teal- und Beige-Toene). base = Verlaufshintergrund, accents = Formen,
// dark steuert, ob Monogramm/Icon in Weiss oder Schulblau gezeichnet werden.
const PALETTES: Array<{ base: [string, string]; accents: string[]; dark: boolean }> = [
  { base: ["#1a3a6b", "#2d5da8"], accents: ["#f5a623", "#7fa8d9", "#e9dcc3"], dark: true },  // Schulblau
  { base: ["#0f2447", "#1a3a6b"], accents: ["#f5a623", "#4f7fc0", "#8fb3e0"], dark: true },  // Navy
  { base: ["#1f6f66", "#2f8f83"], accents: ["#e9dcc3", "#f5a623", "#7cc4b8"], dark: true },  // Teal dunkel
  { base: ["#2f8f83", "#5aae9f"], accents: ["#f3ead9", "#1a3a6b", "#9fd4c8"], dark: true },  // Teal hell
  { base: ["#b97a2a", "#d99a3d"], accents: ["#f3ead9", "#1a3a6b", "#f5c268"], dark: true },  // warmes Orange
  { base: ["#8a94a6", "#a8b2c2"], accents: ["#e9dcc3", "#1a3a6b", "#f5a623"], dark: false }, // Graublau
  { base: ["#c9b489", "#e9dcc3"], accents: ["#1a3a6b", "#2f8f83", "#b97a2a"], dark: false }, // Beige
];

// Fach-Icons als Stroke-Pfade im 24x24-Raster (gleicher Stil wie im
// OrganigrammWidget). Punkte entstehen durch Null-Laengen-Pfade mit
// rundem Linienende. Zuordnung ueber subjectIcon() per Schluesselwort.
const SUBJECT_ICONS: Record<string, string> = {
  buch:    '<path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H18v15.5H6.5A1.5 1.5 0 0 0 5 21z"/><path d="M5 17.5A1.5 1.5 0 0 1 6.5 16H18"/>',
  mathe:   '<rect x="6" y="3.5" width="12" height="17" rx="2"/><path d="M9 7.5h6M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01"/>',
  sprache: '<path d="M20 11.5a7.5 7.5 0 0 1-10.5 6.9L4 20l1.6-5A7.5 7.5 0 1 1 20 11.5z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>',
  globus:  '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.6 2.4 2.6 13.6 0 16M12 4c-2.6 2.4-2.6 13.6 0 16"/>',
  blatt:   '<path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z"/><path d="M5 19c3-6 7-10 11-12"/>',
  kolben:  '<path d="M10 3.5h4M11 3.5v5l-5.2 8.7A2 2 0 0 0 7.5 20h9a2 2 0 0 0 1.7-2.8L13 8.5v-5"/><path d="M8.5 14h7"/>',
  atom:    '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>',
  sanduhr: '<path d="M7 3.5h10M7 20.5h10M8 3.5v3.5l4 5 4-5V3.5M8 20.5V17l4-5 4 5v3.5"/>',
  waage:   '<path d="M12 4v16M7.5 20h9M12 6.5 7 7.7m5-1.2 5 1.2"/><path d="M4 13.5a3 3 0 0 0 6 0L7 7.7zM14 13.5a3 3 0 0 0 6 0L17 7.7z"/>',
  herz:    '<path d="M12 20s-6.5-4.2-6.5-9A3.5 3.5 0 0 1 12 7.5 3.5 3.5 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9z"/>',
  lampe:   '<path d="M9.5 17.5v-1.6a6 6 0 1 1 5 0v1.6"/><path d="M9.5 17.5h5M10 20.5h4"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.8 2-1.7 0-1.5-1.6-1.9-1.6-3.2 0-1 .8-1.6 2-1.6h2.1a4 4 0 0 0 4-4c0-3.7-3.9-6.5-8.5-6.5z"/><path d="M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01M17 10.5h.01"/>',
  note:    '<path d="M9 17.5V6l10-2v11.5"/><circle cx="6.8" cy="17.5" r="2.3"/><circle cx="16.8" cy="15.5" r="2.3"/>',
  ball:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M4.2 9.5c4.6 1.8 11 1.8 15.6 0M4.2 14.5c4.6-1.8 11-1.8 15.6 0"/>',
  code:    '<path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.2 5l-2.4 14"/>',
  zahnrad: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/>',
  schere:  '<circle cx="6.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/><path d="M8.6 8.1 20 17M8.6 15.9 20 7"/>',
};

// Ordnet einen Fachnamen (wie er im Sheet steht) einem Icon zu. Neue
// Faecher landen automatisch beim Buch-Icon, bis hier ein Eintrag ergaenzt wird.
function subjectIcon(subject: string): string {
  const s = subject.toLowerCase();
  if (s.includes("mathe")) return SUBJECT_ICONS.mathe;
  if (/(englisch|franz|griech|türk|latein|span|italien|sprach)/.test(s)) return SUBJECT_ICONS.sprache;
  if (s.includes("erdkunde") || s.includes("geograph")) return SUBJECT_ICONS.globus;
  if (s.includes("bio")) return SUBJECT_ICONS.blatt;
  if (s.includes("chemie")) return SUBJECT_ICONS.kolben;
  if (s.includes("physik")) return SUBJECT_ICONS.atom;
  if (s.includes("geschichte")) return SUBJECT_ICONS.sanduhr;
  if (/(politik|sozial|wirtschaft)/.test(s)) return SUBJECT_ICONS.waage;
  if (s.includes("religion")) return SUBJECT_ICONS.herz;
  if (s.includes("philosoph")) return SUBJECT_ICONS.lampe;
  if (s.includes("kunst")) return SUBJECT_ICONS.palette;
  if (s.includes("musik")) return SUBJECT_ICONS.note;
  if (s.includes("sport")) return SUBJECT_ICONS.ball;
  if (s.includes("informatik")) return SUBJECT_ICONS.code;
  if (s.includes("technik")) return SUBJECT_ICONS.zahnrad;
  if (s.includes("textil")) return SUBJECT_ICONS.schere;
  return SUBJECT_ICONS.buch;
}

// "Fr. Kuhn-Drawe" -> "KD", "Hr. Herbst" -> "H": Anrede/Titel entfernen,
// dann die Anfangsbuchstaben der ersten beiden Namensteile nehmen. Der Punkt
// bzw. das Leerzeichen ist Pflicht, damit nicht "Dr" aus "Drawe" o. Ae.
// herausgeschnitten wird.
function monogram(name: string): string {
  const clean = name.replace(/\b(hr|fr|dr|prof)\.\s*/gi, "").replace(/\b(herr|frau)\s+/gi, "").trim();
  const parts = clean.split(/[\s\-]+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function escXml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

// FNV-1a-Hash: kleine Schleife ueber charCodeAt, liefert fuer denselben
// String immer denselben 32-Bit-Wert.
function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Mulberry32: deterministischer Pseudozufallsgenerator auf Basis des Hashes,
// damit aus einem Seed beliebig viele Werte (Positionen, Radien, ...) gezogen
// werden koennen, ohne dass sich die Formen gegenseitig beeinflussen.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Weiche Welle: kubische Bezierkurve von links nach rechts, nach unten
// geschlossen. yBase steuert die Hoehe, rnd variiert Amplitude und Neigung.
function wavePath(rnd: () => number, w: number, h: number, yBase: number): string {
  const r = (v: number) => Math.round(v);
  const y0 = yBase + (rnd() - 0.5) * h * 0.15;
  const y1 = yBase + (rnd() - 0.5) * h * 0.15;
  const c1x = w * (0.15 + rnd() * 0.25);
  const c1y = y0 - h * (0.1 + rnd() * 0.25);
  const c2x = w * (0.55 + rnd() * 0.25);
  const c2y = y1 + h * (0.1 + rnd() * 0.25);
  return `M0 ${r(y0)}C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${w} ${r(y1)}L${w} ${h}L0 ${h}Z`;
}

export interface TeacherBackgroundOptions {
  width?: number;
  height?: number;
  /** Initialen als Monogramm einzeichnen (Standard: true). */
  initials?: boolean;
  /** Fachname (z. B. faecher[0]) -> grosses Wasserzeichen-Icon oben rechts. */
  subject?: string;
}

/**
 * Erzeugt aus dem Namen einer Lehrkraft ein individuelles, dezentes
 * SVG-Hintergrundbild als Data-URL - optional mit Monogramm und Fach-Icon.
 */
export function teacherBackground(name: string, options: TeacherBackgroundOptions = {}): string {
  const { width = 400, height = 300, initials = true, subject } = options;
  const seed = hashString(name.trim().toLowerCase());
  const rnd = mulberry32(seed);
  const palette = PALETTES[seed % PALETTES.length];
  const [from, to] = palette.base;
  // Monogramm/Icon in Weiss auf dunklen, in Schulblau auf hellen Farbwelten.
  const ink = palette.dark ? "#fff" : "#1a3a6b";

  // Verlaufsrichtung variiert leicht pro Person.
  const diag = rnd() > 0.5;
  const gradient =
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="${diag ? 1 : 0.3}">` +
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>` +
    `</linearGradient>`;

  // 2-3 grosse, halbtransparente Kreise als ruhige Grundstruktur.
  const circleCount = 2 + Math.floor(rnd() * 2);
  let circles = "";
  for (let i = 0; i < circleCount; i++) {
    const cx = Math.round(rnd() * width);
    const cy = Math.round(rnd() * height * 0.7);
    const radius = Math.round(height * (0.15 + rnd() * 0.3));
    const color = palette.accents[Math.floor(rnd() * palette.accents.length)];
    const opacity = (0.12 + rnd() * 0.18).toFixed(2);
    circles += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" opacity="${opacity}"/>`;
  }

  // Zwei ueberlagerte Wellen im unteren Drittel.
  const waves =
    `<path d="${wavePath(rnd, width, height, height * 0.62)}" fill="${palette.accents[0]}" opacity="0.3"/>` +
    `<path d="${wavePath(rnd, width, height, height * 0.78)}" fill="${palette.accents[1]}" opacity="0.3"/>`;

  // Fach-Icon als grosses, leicht gedrehtes Wasserzeichen oben rechts.
  let watermark = "";
  if (subject) {
    const size = height * 0.55;
    const x = Math.round(width - size * (0.75 + rnd() * 0.2));
    const y = Math.round(height * 0.04 + rnd() * height * 0.08);
    const rot = ((rnd() - 0.5) * 16).toFixed(1);
    watermark =
      `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${(size / 24).toFixed(2)})" ` +
      `fill="none" stroke="${ink}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity="0.16">` +
      subjectIcon(subject) +
      `</g>`;
  }

  // Monogramm als kalligrafisches Wasserzeichen: kursive Serifenschrift mit
  // Schwunglinie darunter, bewusst ausserhalb der Mitte (links, das Fach-Icon
  // sitzt rechts) und halbtransparent, damit es mit dem Hintergrund
  // verschwimmt. Unten bleibt Platz fuer die Namenszeile der Karten.
  let mono = "";
  if (initials) {
    const letters = monogram(name);
    if (letters) {
      const f = Math.round(height * 0.3);
      const cx = Math.round(width * (0.28 + rnd() * 0.06));
      const cy = Math.round(height * 0.4);
      const rot = (-6 + rnd() * 5).toFixed(1);
      const ys = cy + f * 0.48;
      const swash =
        `M${Math.round(cx - f * 0.95)} ${Math.round(ys)}` +
        `C${Math.round(cx - f * 0.3)} ${Math.round(ys + f * 0.14)} ${Math.round(cx + f * 0.3)} ${Math.round(ys - f * 0.14)} ${Math.round(cx + f * 0.95)} ${Math.round(ys)}` +
        `c${Math.round(f * 0.12)} ${Math.round(f * 0.06)} ${Math.round(f * 0.24)} ${Math.round(f * 0.04)} ${Math.round(f * 0.32)} ${-Math.round(f * 0.08)}`;
      mono =
        `<g transform="rotate(${rot} ${cx} ${cy})">` +
        `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" ` +
        `font-family="'Palatino Linotype','Book Antiqua',Georgia,'Times New Roman',serif" font-style="italic" ` +
        `font-size="${f}" font-weight="600" letter-spacing="2" fill="${ink}" opacity="0.5">${escXml(letters)}</text>` +
        `<path d="${swash}" fill="none" stroke="${ink}" stroke-width="${(f * 0.035).toFixed(1)}" stroke-linecap="round" opacity="0.4"/>` +
        `</g>`;
    }
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">` +
    `<defs>${gradient}</defs>` +
    `<rect width="${width}" height="${height}" fill="url(#g)"/>` +
    circles +
    waves +
    watermark +
    mono +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
