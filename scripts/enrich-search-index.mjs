/**
 * Reichert den Suchindex im `out/`-Ordner mit dem echten Seitentext an.
 *
 * Laeuft als `postbuild`, also nach `next build`. Waehrend
 * scripts/build-search-index.mjs den Seitentext nur grob aus den TSX-Quellen
 * schaetzt (fuer den Dev-Server), steht hier das fertig gerenderte HTML zur
 * Verfuegung -- inklusive aller Inhalte, die erst zur Buildzeit entstehen
 * (Termine aus der Cloud, Lehrerlisten, Downloads aus dem Sheet).
 *
 * Damit findet die Suche auch Formulierungen, die niemand als Stichwort
 * gepflegt hat: was auf der Seite steht, ist im Index.
 *
 * Wichtig ist der Boilerplate-Filter: Navigation und Footer stehen in JEDEM
 * out/**\/index.html. Ohne Filter enthielte jede Seite das Wort "Krankmeldung"
 * (weil es im Menue steht) und die Suche wuerde bei jeder Anfrage alle Seiten
 * zurueckgeben. Textbausteine, die auf vielen Seiten identisch vorkommen,
 * fliegen deshalb raus -- ohne Pflegeliste, rein statistisch.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "out");
const INDEX_FILE = path.join(OUT_DIR, "data", "search-index.json");

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", shy: "",
  auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß",
  eacute: "é", egrave: "è", hellip: "…", ndash: "–", mdash: "—", laquo: "«", raquo: "»",
  bdquo: "„", ldquo: "“", rdquo: "”", sbquo: "‚", lsquo: "‘", rsquo: "’", euro: "€",
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name] ?? m);
}

/**
 * Zerlegt eine HTML-Seite in Textbausteine (ein Baustein je Elementinhalt).
 * @returns {{ segments: string[], headings: string[] }}
 */
function extractSegments(html) {
  // Nur der Inhaltsbereich zaehlt; das Layout rendert <main class="pt-20">.
  const mainStart = html.indexOf("<main");
  const mainEnd = html.lastIndexOf("</main>");
  const scope = mainStart >= 0 && mainEnd > mainStart ? html.slice(mainStart, mainEnd) : html;

  const stripped = scope
    .replace(/<!--[\s\S]*?-->/g, " ")
    // Skripte und JSON-LD gehoeren nicht in die Suche: Was dort steht (etwa die
    // strukturierten Daten fuer Google), steht so nicht auf der Seite.
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    // Nur was Besucher wirklich sehen: Elemente fuer Screenreader-only,
    // ausgeblendete Bereiche und dekoratives Beiwerk fliegen raus.
    .replace(/<(\w+)[^>]*\bclass="[^"]*\bsr-only\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(\w+)[^>]*\baria-hidden="true"[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(\w+)[^>]*\shidden(=""|\s|>)[\s\S]*?<\/\1>/gi, " ");

  const headings = [];
  for (const m of stripped.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)) {
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (text.length >= 3 && text.length <= 120) headings.push(text);
  }

  const segments = [];
  for (const raw of stripped.split(/<[^>]+>/)) {
    const text = decodeEntities(raw).replace(/\s+/g, " ").trim();
    if (text.length < 3) continue;
    segments.push(text);
  }

  return { segments, headings };
}

/** Alle index.html unter out/ einsammeln, Route -> Dateipfad. */
async function collectPages(dir = OUT_DIR, route = "") {
  const pages = new Map();
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return pages;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next" || entry.name === "data") continue;
      for (const [r, f] of await collectPages(full, `${route}/${entry.name}`)) pages.set(r, f);
    } else if (entry.name === "index.html") {
      pages.set(route === "" ? "/" : route, full);
    }
  }
  return pages;
}

async function main() {
  let index;
  try {
    index = JSON.parse(await readFile(INDEX_FILE, "utf8"));
  } catch {
    console.warn("  ! out/data/search-index.json fehlt - Anreicherung uebersprungen.");
    return;
  }

  const pages = await collectPages();
  if (pages.size === 0) {
    console.warn("  ! Keine gebauten Seiten in out/ gefunden - Anreicherung uebersprungen.");
    return;
  }

  // Erst alle Seiten lesen, dann Boilerplate bestimmen.
  const parsed = new Map();
  const segmentCounts = new Map();
  for (const [route, file] of pages) {
    const { segments, headings } = extractSegments(await readFile(file, "utf8"));
    parsed.set(route, { segments, headings });
    for (const seg of new Set(segments)) {
      segmentCounts.set(seg, (segmentCounts.get(seg) ?? 0) + 1);
    }
  }

  // Ein Textbaustein, der auf mehr als der Haelfte aller Seiten steht, gehoert
  // zu Navigation/Footer und sagt ueber die einzelne Seite nichts aus.
  const boilerplateLimit = Math.max(2, Math.ceil(pages.size * 0.5));
  const isBoilerplate = (seg) => (segmentCounts.get(seg) ?? 0) >= boilerplateLimit;

  let enriched = 0;
  for (const doc of index.docs) {
    if (doc.type !== "page") continue;
    const page = parsed.get(doc.url === "/" ? "/" : doc.url.replace(/\/$/, ""));
    if (!page) continue;

    const body = page.segments
      .filter((seg) => !isBoilerplate(seg))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);

    const headings = page.headings.filter((h) => !isBoilerplate(h)).join(" · ");

    if (body.length > 80) {
      doc.body = body;
      doc.headings = headings;
      enriched++;
    }
  }

  index.enrichedAt = new Date().toISOString();
  await writeFile(INDEX_FILE, JSON.stringify(index));

  const size = Buffer.byteLength(JSON.stringify(index)) / 1024;
  console.log(
    `Suchindex angereichert: ${enriched}/${pages.size} Seiten mit echtem Seitentext, ${size.toFixed(0)} KB`
  );
}

await main();
