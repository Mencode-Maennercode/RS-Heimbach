/**
 * Erzeugt public/data/search-index.json -- die Datenbasis der Website-Suche.
 *
 * Laeuft im `prebuild` (und beim `npm run dev`), also bei jedem Build. Weil
 * jede Inhaltsaenderung dieser Website ohnehin einen Build ausloest
 * (Sheets-Sync -> Commit -> Deploy, Instagram-Sync alle 10 Min, Kalender
 * naechtlich), kann der Index gar nicht veralten: es gibt keinen Weg, auf dem
 * Inhalt live geht ohne neuen Index.
 *
 * Gezogen wird aus denselben Quellen, aus denen auch die Seiten gerendert
 * werden -- nichts davon wird von Hand gepflegt:
 *   - lib/search/pages.mjs        feste Seiten + Suchsynonyme (redaktionell)
 *   - lib/data/school-content.json News, Downloads, Lehrkraefte, SV, Klassen
 *   - public/data/instagram.json   Instagram-Beitraege
 *   - Nextcloud-ICS                Termine
 *   - app/ ** /*View.tsx           grober Seitentext (Dev-Fallback)
 *
 * Nach `next build` ersetzt scripts/enrich-search-index.mjs den groben
 * Seitentext durch den echten, gerenderten Seitentext aus out/.
 */
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { searchPages } from "../lib/search/pages.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = path.join(ROOT, "public", "data", "search-index.json");

const ICS_URL =
  process.env.CALENDAR_ICS_URL ||
  "https://cloud.rs-heimbach.de/remote.php/dav/public-calendars/iwj5ASdqSHpjGiwK?export";

const warnings = [];

// --- Hilfsfunktionen -------------------------------------------------------

async function readJson(relPath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(ROOT, relPath), "utf8"));
  } catch {
    return fallback;
  }
}

/** Mehrere Textstuecke zu einem sauberen Feldwert verbinden. */
function joinText(...parts) {
  return parts
    .flat()
    .filter(Boolean)
    .map((p) => String(p).replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 0)
    .join(" ")
    .slice(0, 4000);
}

/** 1 = brandaktuell, 0 = aelter als ein Jahr. Steuert einen leichten Ranking-Bonus. */
function freshnessFromDate(value) {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return 0;
  const days = Math.abs(Date.now() - time) / 86_400_000;
  if (days <= 14) return 1;
  if (days >= 365) return 0;
  return 1 - (days - 14) / 351;
}

function formatDate(value) {
  const d = new Date(value);
  if (!Number.isFinite(d.getTime())) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

// --- 1. Feste Seiten -------------------------------------------------------

// Tailwind-Klassen, Pfade und Bezeichner sehen in TSX aus wie Text. Dieser
// Filter haelt sie aus dem Index heraus.
const CODEY = /(^|\s)(flex|grid|block|hidden|absolute|relative|sticky|rounded|border|shadow|gap-|w-|h-|p[xytblrs]?-|m[xytblrs]?-|text-\[?[a-z0-9#]|bg-|from-|to-|via-|hover:|focus:|group-|sm:|md:|lg:|xl:|2xl:|transition|duration-|ease-|z-\d|opacity-|translate|scale-|object-|overflow-|items-|justify-|space-|leading-|tracking-|font-\w|min-|max-)/;

/**
 * Holt groben Fliesstext aus einer TSX-Datei. Bewusst heuristisch: dient nur
 * als Fallback fuer den Dev-Server. Im echten Build wird dieser Text durch den
 * gerenderten HTML-Text ersetzt.
 */
function extractTsxText(source) {
  const cleaned = source
    // SEO-Metadata zuerst raus: Title-Template, OpenGraph-Texte und
    // JSON-LD beschreiben die Seite fuer Suchmaschinen und KI-Crawler, stehen
    // aber nirgends sichtbar auf der Seite. Sie gehoeren nicht in die Suche.
    .replace(/export const metadata[\s\S]*?\r?\n\};/g, " ")
    .replace(/export const viewport[\s\S]*?\r?\n\};/g, " ")
    .replace(/<JsonLd[\s\S]*?\/>/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^\s*\/\/.*$/gm, " ")
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?/gm, " ")
    .replace(/className=(["'])(?:(?!\1).)*\1/g, " ")
    .replace(/className=\{[\s\S]*?\}\}/g, " ");

  const chunks = [];

  // Text zwischen JSX-Tags.
  for (const m of cleaned.matchAll(/>([^<>{}]{4,})</g)) {
    chunks.push(m[1]);
  }
  // Laengere String-Literale aus Datenarrays (Ueberschriften, Absaetze).
  for (const m of cleaned.matchAll(/["']([^"'`\n]{18,})["']/g)) {
    chunks.push(m[1]);
  }

  const seen = new Set();
  const text = [];
  for (const chunk of chunks) {
    const value = chunk.replace(/\s+/g, " ").trim();
    if (value.length < 4) continue;
    if (CODEY.test(value)) continue;
    if (!/[a-zA-ZäöüÄÖÜß]{3}/.test(value)) continue;
    if (/^[A-Za-z]+([A-Z][a-z]+)+$/.test(value)) continue; // camelCase-Bezeichner
    if (/^[/#.@]/.test(value)) continue; // Pfade, Anker, Selektoren
    if (/^https?:\/\//.test(value) || value.includes("schema.org")) continue; // URLs, JSON-LD
    if (value.includes("%s")) continue; // Title-Template aus den Metadata
    if (seen.has(value)) continue;
    seen.add(value);
    text.push(value);
  }
  return text.join(" ");
}

// Rahmen-Dateien von Next: Layout, Fehlerseiten und Ladezustaende. Ihr Text
// gehoert keiner Seite, sondern allen -- und die 404-Seite ist kein Suchziel.
const FRAMEWORK_FILES = new Set([
  "layout.tsx",
  "not-found.tsx",
  "template.tsx",
  "error.tsx",
  "global-error.tsx",
  "loading.tsx",
]);

/** Liest die description aus dem pageMetadata()-Aufruf einer page.tsx. */
function extractMetaDescription(source) {
  const m = source.match(/description:\s*\n?\s*["']([^"']{20,})["']/);
  return m ? m[1] : "";
}

/** Alle Routen unter app/ finden (jedes Verzeichnis mit page.tsx). */
async function findRoutes(dir = path.join(ROOT, "app"), base = "") {
  const routes = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return routes;
  }
  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    routes.push(base === "" ? "/" : base);
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_") || entry.name.startsWith("(")) continue;
    routes.push(...(await findRoutes(path.join(dir, entry.name), `${base}/${entry.name}`)));
  }
  return routes;
}

async function buildPageDocs() {
  const docs = [];
  const routes = await findRoutes();

  for (const page of searchPages) {
    const dir = path.join(ROOT, "app", page.url === "/" ? "" : page.url);
    let body = "";
    let metaDescription = "";

    try {
      const files = (await readdir(dir)).filter(
        (f) => f.endsWith(".tsx") && !FRAMEWORK_FILES.has(f)
      );
      // Der sichtbare Inhalt steht in den View-Komponenten; page.tsx enthaelt
      // im Wesentlichen Metadata und wird nur herangezogen, wenn es keine
      // eigene View-Datei gibt.
      const views = files.filter((f) => f !== "page.tsx");
      const contentFiles = views.length > 0 ? views : files;
      for (const file of files) {
        const source = await readFile(path.join(dir, file), "utf8");
        if (file === "page.tsx") metaDescription ||= extractMetaDescription(source);
        if (contentFiles.includes(file)) body += " " + extractTsxText(source);
      }
    } catch {
      warnings.push(`Seitenverzeichnis nicht gefunden: app${page.url}`);
    }

    // Die Startseite besteht aus Komponenten unter components/home/.
    if (page.url === "/") {
      const homeDir = path.join(ROOT, "components", "home");
      try {
        for (const file of await readdir(homeDir)) {
          if (!file.endsWith(".tsx")) continue;
          body += " " + extractTsxText(await readFile(path.join(homeDir, file), "utf8"));
        }
      } catch {
        /* Startseiten-Komponenten optional */
      }
    }

    docs.push({
      id: `page:${page.url}`,
      type: "page",
      url: page.url,
      title: page.title,
      description: page.description || metaDescription,
      keywords: page.keywords.join(" "),
      headings: "",
      meta: "Seite",
      body: joinText(body),
      boost: page.boost,
    });
  }

  // Neue Seite ohne Registry-Eintrag faellt hier auf.
  const known = new Set(searchPages.map((p) => p.url));
  for (const route of routes) {
    if (!known.has(route)) {
      warnings.push(
        `Route ${route} hat keinen Eintrag in lib/search/pages.mjs -- sie ist NICHT auffindbar.`
      );
    }
  }

  return docs;
}

// --- 2. News ---------------------------------------------------------------

function buildNewsDocs(content) {
  return (content.news ?? [])
    .filter((n) => n.titel)
    .map((n) => ({
      id: `news:${n.slug || n.id}`,
      type: "news",
      // Oeffnet den Beitrag direkt im Modal auf der Startseite.
      url: `/#news-${n.slug || n.id}`,
      title: n.titel,
      description: n.teaser || "",
      keywords: joinText("news", "aktuelles", "neuigkeiten", "meldung", "artikel", n.kategorie),
      headings: "",
      meta: joinText(n.kategorie, formatDate(n.datum)),
      body: joinText(n.teaser, n.volltext),
      boost: 0.8,
      freshness: freshnessFromDate(n.datum),
      badge: n.kategorie || "Aktuelles",
      date: formatDate(n.datum),
    }));
}

// --- 3. Downloads ----------------------------------------------------------

function buildDownloadDocs(content) {
  return (content.downloads ?? [])
    .filter((d) => d.gefunden && d.url && d.titel)
    .map((d, i) => ({
      id: `download:${i}`,
      type: "download",
      url: d.url,
      external: true,
      title: d.titel,
      description: joinText(d.kategorie, "– Download"),
      keywords: joinText(
        "download",
        "herunterladen",
        "formular",
        "dokument",
        "datei",
        "pdf",
        "antrag",
        "vordruck",
        d.kategorie
      ),
      headings: "",
      meta: joinText(d.typ || "Datei", d.kategorie),
      body: "",
      boost: 0.6,
      badge: (d.typ || "Datei").toUpperCase(),
    }));
}

// --- 4. Lehrkraefte & Klassenleitungen -------------------------------------

function buildTeacherDocs(content) {
  const classesByTeacher = new Map();
  for (const k of content.klassenlehrer ?? []) {
    if (!k.klasse) continue;
    for (const name of [k.lehrer, ...(k.co ?? [])].filter(Boolean)) {
      const list = classesByTeacher.get(name) ?? [];
      list.push(k.klasse);
      classesByTeacher.set(name, list);
    }
  }

  const docs = (content.lehrer ?? [])
    .filter((t) => t.nachname)
    .map((t) => {
      const anrede = t.anrede === "Fr." ? "Frau" : t.anrede === "Hr." ? "Herr" : t.anrede || "";
      const classes = classesByTeacher.get(t.nachname) ?? [];
      const subjects = (t.faecher ?? []).join(", ");
      const roleText = t.schulleitung ? joinText(t.rolle, "Schulleitung") : t.rolle;
      return {
        id: `teacher:${t.id}`,
        type: "person",
        url: "/lehrer",
        title: joinText(anrede, t.nachname),
        description:
          joinText(subjects && `Unterrichtet ${subjects}`, roleText, classes.length && `Klasse ${classes.join(", ")}`) ||
          "Lehrkraft der Realschule Am Heimbach",
        keywords: joinText(
          t.vorname,
          t.nachname,
          anrede,
          "lehrer lehrerin lehrkraft kollegium",
          classes.length ? `klassenlehrer klassenleitung ${classes.join(" ")}` : "",
          t.schulleitung ? "schulleitung rektor rektorin chef leitung" : "",
          subjects
        ),
        headings: "",
        meta: joinText(roleText, subjects),
        body: joinText(t.bio),
        boost: t.schulleitung ? 0.65 : 0.45,
        badge: "Lehrkraft",
      };
    });

  // Klassenleitungen zusaetzlich unter der Klassenbezeichnung auffindbar
  // ("Wer ist Klassenlehrer von 7b?").
  for (const k of content.klassenlehrer ?? []) {
    if (!k.klasse || !k.lehrer) continue;
    const co = (k.co ?? []).filter(Boolean);
    docs.push({
      id: `class:${k.klasse}`,
      type: "person",
      url: "/lehrer",
      title: `Klasse ${k.klasse}`,
      description: joinText(
        "Klassenleitung:",
        k.lehrer,
        co.length ? `(gemeinsam mit ${co.join(", ")})` : ""
      ),
      keywords: joinText(
        k.klasse,
        `klasse ${k.klasse}`,
        "klassenlehrer klassenlehrerin klassenleitung klasse jahrgang",
        k.lehrer,
        co
      ),
      headings: "",
      meta: "Klassenleitung",
      body: "",
      boost: 0.5,
      badge: "Klasse",
    });
  }

  return docs;
}

// --- 5. Schuelervertretung -------------------------------------------------

function buildSvDocs(content) {
  const members = (content.sv ?? []).map((m) => m.name).filter(Boolean);
  if (members.length === 0) return [];
  return [
    {
      id: "sv:team",
      type: "page",
      url: "/unsere-schule/sv",
      title: "SV-Team",
      description: `Aktuelle Schülervertretung: ${members.join(", ")}`,
      keywords: joinText("sv", "schuelervertretung", "schuelersprecher", "sv team", members),
      headings: "",
      meta: "Schülervertretung",
      body: members.join(", "),
      boost: 0.45,
      badge: "SV",
    },
  ];
}

// --- 6. Instagram ----------------------------------------------------------

function buildInstagramDocs(instagram) {
  return (instagram.media ?? [])
    .filter((p) => p.caption)
    .slice(0, 24)
    .map((p, i) => {
      const caption = String(p.caption).replace(/\s+/g, " ").trim();
      return {
        id: `instagram:${p.id ?? i}`,
        type: "instagram",
        url: "/#instagram",
        title: caption.split(/[.!?\n]/)[0].slice(0, 70) || "Instagram-Beitrag",
        description: caption.slice(0, 180),
        keywords: joinText("instagram", "insta", "social media", "beitrag", "post", "foto", "bild"),
        headings: "",
        meta: joinText("Instagram", formatDate(p.timestamp)),
        body: caption,
        boost: 0.35,
        freshness: freshnessFromDate(p.timestamp),
        badge: "Instagram",
      };
    });
}

// --- 7. Termine aus der Nextcloud-ICS --------------------------------------

/**
 * Minimaler ICS-Leser: nur die Felder, die die Suche braucht. Die vollstaendige
 * Aufbereitung (Farben, Kategorien, Mehrtagestermine) macht weiterhin
 * lib/calendar.ts fuer die Terminseite selbst.
 */
function parseIcs(ics) {
  const lines = [];
  for (const raw of ics.replace(/\r\n/g, "\n").split("\n")) {
    if ((raw.startsWith(" ") || raw.startsWith("\t")) && lines.length) {
      lines[lines.length - 1] += raw.slice(1);
    } else {
      lines.push(raw);
    }
  }

  const events = [];
  let current = null;
  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      current = {};
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      if (current?.summary) events.push(current);
      current = null;
      continue;
    }
    if (!current) continue;
    const sep = line.indexOf(":");
    if (sep < 0) continue;
    const key = line.slice(0, sep).split(";")[0].toUpperCase();
    const value = line
      .slice(sep + 1)
      .replace(/\\n/gi, " ")
      .replace(/\\,/g, ",")
      .replace(/\\;/g, ";")
      .trim();
    if (key === "SUMMARY") current.summary = value;
    else if (key === "DESCRIPTION") current.description = value;
    else if (key === "LOCATION") current.location = value;
    else if (key === "CATEGORIES") current.category = value;
    else if (key === "DTSTART") current.start = value;
  }
  return events;
}

/** ICS-Datumswert (20260415 oder 20260415T081500Z) zu Date. */
function icsDate(value) {
  if (!value) return null;
  const m = value.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

async function buildEventDocs() {
  let ics;
  try {
    const res = await fetch(ICS_URL, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    ics = await res.text();
  } catch (err) {
    warnings.push(`Kalender nicht erreichbar (${err.message}) -- Termine fehlen im Suchindex.`);
    return [];
  }

  const now = Date.now();
  const from = now - 30 * 86_400_000; // knapp vergangene Termine noch mitnehmen
  const until = now + 400 * 86_400_000;

  return parseIcs(ics)
    .map((e) => ({ ...e, date: icsDate(e.start) }))
    .filter((e) => e.date && e.date.getTime() >= from && e.date.getTime() <= until)
    .sort((a, b) => a.date - b.date)
    .slice(0, 120)
    .map((e, i) => ({
      id: `event:${i}`,
      type: "event",
      url: "/veranstaltungen",
      title: e.summary,
      description: joinText(formatDate(e.date), e.location),
      keywords: joinText(
        "termin termine kalender veranstaltung wann datum",
        /ferien|frei/i.test(e.summary) ? "ferien schulfrei frei unterrichtsfrei" : "",
        e.category,
        e.location
      ),
      headings: "",
      meta: joinText(formatDate(e.date), e.location, e.category),
      body: joinText(e.description),
      boost: 0.7,
      freshness: freshnessFromDate(e.date),
      badge: "Termin",
      date: formatDate(e.date),
    }));
}

// --- Zusammenbauen ---------------------------------------------------------

async function main() {
  const content = await readJson("lib/data/school-content.json", {});
  const instagram = await readJson("public/data/instagram.json", {});

  const docs = [
    ...(await buildPageDocs()),
    ...buildNewsDocs(content),
    ...buildDownloadDocs(content),
    ...buildTeacherDocs(content),
    ...buildSvDocs(content),
    ...buildInstagramDocs(instagram),
    ...(await buildEventDocs()),
  ];

  const index = {
    generatedAt: new Date().toISOString(),
    count: docs.length,
    docs,
  };

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(index));

  const size = (await stat(OUT_FILE)).size;
  const byType = docs.reduce((acc, d) => ({ ...acc, [d.type]: (acc[d.type] ?? 0) + 1 }), {});
  console.log(
    `Suchindex: ${docs.length} Eintraege (${Object.entries(byType)
      .map(([k, v]) => `${v} ${k}`)
      .join(", ")}), ${(size / 1024).toFixed(0)} KB`
  );
  for (const w of warnings) console.warn(`  ! ${w}`);
}

await main();
