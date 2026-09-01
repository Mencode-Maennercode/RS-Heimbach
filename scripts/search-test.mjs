/**
 * Regressionstest der Website-Suche: echte Elternfragen gegen den aktuellen
 * Index. Aufruf: `npm run search:test`.
 *
 * Der Sinn: Eine Suche wird nicht dadurch gut, dass sie einmal funktioniert,
 * sondern dadurch, dass sie nach jeder Aenderung noch funktioniert. Wer an der
 * Bewertung in lib/search/core.mjs oder an den Stichwoertern in
 * lib/search/pages.mjs schraubt, sieht hier sofort, was dadurch kaputtgeht.
 *
 * Neue Faelle einfach unten anhaengen -- besonders wertvoll sind Anfragen, bei
 * denen die Suche in der Praxis danebengelegen hat.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildIndex, search } from "../lib/search/core.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * [Suchanfrage, erwartete Ziel-URL, "top1" (Standard) oder "top3"]
 * "top3" fuer Anfragen, bei denen mehrere Seiten legitim passen -- Hauptsache,
 * das Richtige steht mit im Dropdown.
 */
const CASES = [
  // --- Krankmeldung: der wichtigste Fall, in allen Schreibweisen ---
  ["krankmeldung", "/krankmeldung"],
  ["Krankmeldung", "/krankmeldung"],
  ["krank", "/krankmeldung"],
  ["krankmelden", "/krankmeldung"],
  ["krank melden", "/krankmeldung"],
  ["krangmeldung", "/krankmeldung"],
  ["krankmeldng", "/krankmeldung"],
  ["Krankmledung", "/krankmeldung"],
  ["formular krank", "/krankmeldung"],
  ["kind ist krank", "/krankmeldung"],
  ["mein kind ist krank was tun", "/krankmeldung"],
  ["entschuldigung", "/krankmeldung"],
  ["abmelden", "/krankmeldung"],
  ["attest", "/krankmeldung"],
  ["fehltag", "/krankmeldung"],

  // --- Anmeldung ---
  ["anmeldung", "/anmeldung"],
  ["anmelden", "/anmeldung"],
  ["anmeldng", "/anmeldung"],
  ["klasse 5", "/anmeldung", "top3"],
  ["aufnahme", "/anmeldung"],
  ["tag der offenen tuer", "/anmeldung", "top3"],
  ["schulwechsel", "/anmeldung"],

  // --- Mensa ---
  ["mensa", "/unterricht/mensa"],
  ["menza", "/unterricht/mensa"],
  ["essen", "/unterricht/mensa"],
  ["mittagessen", "/unterricht/mensa"],
  ["speiseplan", "/unterricht/mensa"],
  ["kantine", "/unterricht/mensa"],
  ["was kostet das essen", "/unterricht/mensa"],
  ["vegetarisch", "/unterricht/mensa"],

  // --- Schulzeiten ---
  ["schulzeiten", "/unterricht/schulzeiten"],
  ["stundenplan", "/unterricht/schulzeiten"],
  ["unterrichtszeiten", "/unterricht/schulzeiten"],
  ["wann beginnt der unterricht", "/unterricht/schulzeiten"],
  ["pausenzeiten", "/unterricht/schulzeiten"],
  ["kurzstunden", "/unterricht/schulzeiten"],
  ["schulschluss", "/unterricht/schulzeiten"],

  // --- Termine ---
  ["termine", "/veranstaltungen"],
  ["veranstaltungen", "/veranstaltungen"],
  ["kalender", "/veranstaltungen"],
  ["ferien", "/veranstaltungen", "top3"],
  ["wann sind ferien", "/veranstaltungen", "top3"],

  // --- Kontakt ---
  ["kontakt", "/kontakt"],
  ["kontackt", "/kontakt"],
  ["telefonnummer", "/kontakt"],
  ["adresse", "/kontakt"],
  ["anfahrt", "/kontakt"],
  ["wo ist die schule", "/kontakt", "top3"],
  ["email", "/kontakt", "top3"],

  // --- Sekretariat & Schulleitung ---
  ["sekretariat", "/unsere-schule/sekretariat"],
  ["sekretariath", "/unsere-schule/sekretariat"],
  ["buero", "/unsere-schule/sekretariat"],
  ["oeffnungszeiten", "/unsere-schule/sekretariat", "top3"],
  ["schulleitung", "/unsere-schule/schulleitung", "top3"],
  ["rektorin", "/unsere-schule/schulleitung", "top3"],
  ["wer leitet die schule", "/unsere-schule/schulleitung", "top3"],

  // --- Kollegium ---
  ["kollegium", "/lehrer"],
  ["lehrer", "/lehrer", "top3"],
  ["lehrkraefte", "/lehrer", "top3"],

  // --- Downloads ---
  ["downloads", "/service"],
  ["formulare", "/service", "top3"],
  ["dokumente", "/service", "top3"],

  // --- Ganztag ---
  ["ganztag", "/ganztag"],
  ["ganztagsschule", "/ganztag"],
  ["nachmittagsbetreuung", "/ganztag"],
  ["wahlunterricht", "/ganztag"],
  ["hausaufgaben", "/ganztag", "top3"],
  ["arbeitsgemeinschaft", "/ganztag"],

  // --- Faecher ---
  ["faecher", "/unterricht/faecher"],
  ["fächer", "/unterricht/faecher"],
  ["franzoesisch", "/unterricht/faecher", "top3"],
  ["wahlpflicht", "/unterricht/faecher"],
  ["differenzierung", "/unterricht/faecher"],

  // --- Beratung ---
  ["beratung", "/beratung"],
  ["mobbing", "/beratung"],
  ["schulsozialarbeit", "/beratung"],
  ["sorgen", "/beratung", "top3"],

  // --- Mitwirkung ---
  ["foerderverein", "/foerderverein"],
  ["spenden", "/foerderverein"],
  ["mitglied werden", "/foerderverein"],
  ["schulpflegschaft", "/eltern/schulpflegschaft"],
  ["elternvertretung", "/eltern/schulpflegschaft"],
  ["sv", "/unsere-schule/sv", "top3"],
  ["schuelervertretung", "/unsere-schule/sv", "top3"],
  ["schuelersprecher", "/unsere-schule/sv", "top3"],

  // --- Projekte & Unterricht ---
  ["praktikum", "/unterricht/projekte"],
  ["berufsorientierung", "/unterricht/projekte"],
  ["streitschlichter", "/unterricht/projekte"],
  ["abschluss", "/unterricht", "top3"],
  ["mittlerer schulabschluss", "/unterricht", "top3"],

  // --- Rechtliches ---
  ["impressum", "/impressum"],
  ["datenschutz", "/datenschutz"],
  ["dsgvo", "/datenschutz"],

  // --- Ueber die Schule ---
  ["ueber uns", "/unsere-schule", "top3"],
  ["schulprogramm", "/unsere-schule/schulprogramm"],
  ["leitbild", "/unsere-schule/schulprogramm", "top3"],
];

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

async function main() {
  // Nach einem Build liegt in out/ der angereicherte Index -- genau der geht
  // live, also wird bevorzugt der geprueft.
  const candidates = [
    path.join(ROOT, "out", "data", "search-index.json"),
    path.join(ROOT, "public", "data", "search-index.json"),
  ];
  let raw = null;
  let source = "";
  for (const file of candidates) {
    try {
      raw = await readFile(file, "utf8");
      source = path.relative(ROOT, file);
      break;
    } catch {
      /* naechster Kandidat */
    }
  }
  if (!raw) throw new Error("Kein Suchindex gefunden - bitte 'npm run search:index' ausfuehren.");
  const index = JSON.parse(raw);
  const searchIndex = buildIndex(index.docs);
  const docs = searchIndex.docs;

  console.log(
    `${source} vom ${new Date(index.generatedAt).toLocaleString("de-DE")}, ${docs.length} Eintraege` +
      `${index.enrichedAt ? " (mit gerendertem Seitentext)" : " (Dev-Fassung ohne gerenderten Seitentext)"}
`
  );

  let passed = 0;
  const failures = [];
  const started = Date.now();

  for (const [query, expected, mode = "top1"] of CASES) {
    const hits = search(searchIndex, query, { limit: 8, minPercent: 35 });
    const positions = hits.map((h) => h.url);
    const rank = positions.indexOf(expected);
    const ok = mode === "top1" ? rank === 0 : rank >= 0 && rank < 3;

    if (ok) {
      passed++;
      console.log(
        `${GREEN}✓${RESET} ${query.padEnd(32)} ${DIM}${hits[0].percent}% ${hits[0].title}${RESET}`
      );
    } else {
      const got = hits.length ? `${hits[0].url} (${hits[0].percent}%)` : "nichts gefunden";
      failures.push({ query, expected, got, mode, rank, hits });
      console.log(`${RED}✗${RESET} ${query.padEnd(32)} erwartet ${expected}, bekommen ${got}`);
    }
  }

  const ms = Date.now() - started;
  console.log(
    `\n${passed}/${CASES.length} bestanden (${Math.round((passed / CASES.length) * 100)} %), ` +
      `${ms} ms fuer ${CASES.length} Anfragen (${(ms / CASES.length).toFixed(1)} ms je Anfrage)`
  );

  if (failures.length) {
    console.log(`\n${RED}Fehlgeschlagen:${RESET}`);
    for (const f of failures) {
      console.log(`\n  „${f.query}" -> erwartet ${f.expected} (${f.mode})`);
      f.hits.slice(0, 4).forEach((h, i) => {
        console.log(`     ${i + 1}. ${String(h.percent).padStart(3)}%  ${h.url}  ${DIM}${h.title}${RESET}`);
      });
      if (f.hits.length === 0) console.log("     (keine Treffer)");
    }
    process.exitCode = 1;
  }
}

await main();
