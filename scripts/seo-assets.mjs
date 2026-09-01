/**
 * Erzeugt die statischen SEO-Bilder in public/:
 *   og-image.jpg          1200x630, Vorschau in Google, WhatsApp, Facebook, LinkedIn
 *   apple-touch-icon.png  180x180, Icon beim "Zum Homescreen hinzufuegen"
 *   icon-192.png          Web-App-Manifest
 *   icon-512.png          Web-App-Manifest
 *
 * Einmalig aufrufen: `node scripts/seo-assets.mjs`. Die Ergebnisse werden
 * eingecheckt, damit der Build nicht von sharp abhaengt. Erneut ausfuehren,
 * wenn sich das Schulfoto oder der Markenname aendert.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const TEAL = "#0a5a54";

/** Quellfoto fuer das OG-Bild, mit Rueckfallebene falls umbenannt. */
const SOURCE_CANDIDATES = [
  "images/schulhof-eyecatcher.jpg",
  "hero/unsere-schule.jpg",
  "hero/schulalltag.jpg",
];

function findSource() {
  for (const rel of SOURCE_CANDIDATES) {
    const file = path.join(PUBLIC, rel);
    if (fs.existsSync(file)) return file;
  }
  throw new Error("Kein Quellfoto fuer das OG-Bild gefunden.");
}

/** Textebene des OG-Bilds: Verlauf von links plus Schrift. */
const ogOverlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0%"   stop-color="${TEAL}" stop-opacity="0.96"/>
      <stop offset="55%"  stop-color="${TEAL}" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#12786f" stop-opacity="0.45"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="80" y="150" width="72" height="8" rx="4" fill="#f5a623"/>
  <text x="80" y="245" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="76" font-weight="bold" fill="#ffffff">Realschule</text>
  <text x="80" y="330" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="76" font-weight="bold" fill="#ffffff">Am Heimbach</text>
  <text x="80" y="400" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="34" font-weight="600" fill="#f5a623">Städtische Realschule in Troisdorf</text>
  <text x="80" y="452" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="27" fill="#ffffff" opacity="0.85">Gebundene Ganztagsschule · Klassen 5–10</text>
  <text x="80" y="530" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="24" fill="#ffffff" opacity="0.6">rs-heimbach.de</text>
</svg>`;

/** Quadratisches App-Icon: Teal-Flaeche, Akzentbogen, Kuerzel "RS". */
const iconSvg = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${TEAL}"/>
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.34}"
          fill="none" stroke="#f5a623" stroke-width="${size * 0.045}" opacity="0.55"/>
  <text x="50%" y="50%" dy="${size * 0.13}" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="${size * 0.38}" font-weight="bold" fill="#ffffff">RS</text>
</svg>`;

const source = findSource();

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .composite([{ input: Buffer.from(ogOverlay), top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(PUBLIC, "og-image.jpg"));
console.log("public/og-image.jpg");

for (const [name, size] of [
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
]) {
  await sharp(Buffer.from(iconSvg(size))).png().toFile(path.join(PUBLIC, name));
  console.log(`public/${name}`);
}
