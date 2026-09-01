/**
 * Kern der Website-Suche: Textnormalisierung, deutsches Stemming, Koelner
 * Phonetik, Tippfehler-Distanz und Scoring.
 *
 * Diese Datei ist bewusst reines ESM-JavaScript ohne Node- oder React-Importe,
 * denn sie wird von drei Seiten benutzt:
 *   1. scripts/build-search-index.mjs  (Buildzeit, Node)
 *   2. lib/search/client.ts            (Browser)
 *   3. scripts/search-test.mjs         (Regressionstest, Node)
 * Gaebe es zwei Implementierungen, wuerden Index und Suche irgendwann
 * unterschiedlich normalisieren -- und genau dann findet die Suche nichts mehr.
 *
 * Warum kein Fuse.js o. ae.: Die gaengigen Bibliotheken kennen weder deutsche
 * Komposita ("Krankmeldung" enthaelt "krank") noch deutsche Phonetik
 * ("Krangmeldung"). Beides ist hier der Hauptanwendungsfall.
 */

// --- Normalisierung --------------------------------------------------------

const UMLAUTS = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  Ä: "ae",
  Ö: "oe",
  Ü: "ue",
  ß: "ss",
};

/**
 * Vereinheitlicht Text fuer den Vergleich: Kleinschreibung, Umlaute
 * ausgeschrieben (ae/oe/ue -- so trifft "Faecher" auch "Fächer"), Akzente weg,
 * alles Nicht-Alphanumerische zu Leerzeichen.
 * @param {string} text
 * @returns {string}
 */
export function normalize(text) {
  if (!text) return "";
  return String(text)
    .replace(/[äöüÄÖÜß]/g, (c) => UMLAUTS[c])
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Fuellwoerter, die in Suchanfragen keine Bedeutung tragen ("wo ist das
// sekretariat" -> "sekretariat"). Wird nur angewandt, solange danach noch
// mindestens ein Token uebrig bleibt.
const STOPWORDS = new Set(
  ("der die das den dem des ein eine einen einer eines und oder aber wie was wo wann wer warum " +
    "wieso welche welcher welches ist sind war waren wird werden hat habe haben kann koennen " +
    "muss muessen soll sollen darf duerfen ich mein meine mir mich wir uns unser unsere ihr ihre " +
    "sie er es man auf in im an am zu zum zur fuer von vom mit bei nach ueber unter vor durch um " +
    "bis ab als auch nur noch schon nicht kein keine keinen gibt es da dort hier bitte mal etwa " +
    "gerne info infos information informationen seite seiten suche suchen finde finden")
    .split(" ")
);

/**
 * Zerlegt Text in normalisierte Tokens. Zahlen bleiben erhalten (Klasse "7b",
 * Jahrgang "2026"), Tokens unter 2 Zeichen fliegen raus.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  const normalized = normalize(text);
  if (!normalized) return [];
  return normalized.split(" ").filter((t) => t.length >= 2);
}

// Fragewoerter sind KEIN Ballast: "wo ist die schule" meint die Anfahrt,
// "wann beginnt der unterricht" die Schulzeiten. Genau solche Wendungen stehen
// als Stichwort in lib/search/pages.mjs. Sie zaehlen deshalb mit -- aber nur
// als Bonus: fehlt das Fragewort im Zieltext, gilt die Anfrage trotzdem als
// vollstaendig getroffen.
const QUESTION_WORDS = new Set(
  "wo wann wer wie was warum wieso welche welcher welches wieviel wieviele".split(" ")
);

/**
 * Tokens einer Suchanfrage: wie tokenize, aber ohne Fuellwoerter.
 * @param {string} query
 * @returns {string[]}
 */
export function tokenizeQuery(query) {
  const all = tokenize(query);
  const meaningful = all.filter((t) => !STOPWORDS.has(t));
  // "wie geht es" besteht nur aus Fuellwoertern -- dann lieber alles behalten
  // als gar nicht suchen.
  return meaningful.length > 0 ? meaningful : all;
}

/**
 * Zerlegt die Anfrage in bewertbare Tokens.
 * @param {string} query
 * @returns {Array<{raw:string,stem:string,cologne:string,optional:boolean}>}
 */
export function parseQuery(query) {
  const all = tokenize(query);
  const kept = all.filter((t) => !STOPWORDS.has(t) || QUESTION_WORDS.has(t));
  const chosen = kept.length > 0 ? kept : all;
  return chosen.map((t) => ({ ...prepareWord(t), optional: QUESTION_WORDS.has(t) }));
}

// --- Stemming (CISTEM, auf Deutsch trainiert) ------------------------------

/**
 * Leichtes deutsches Stemming nach dem CISTEM-Verfahren (Weissweiler/Fraser).
 * Fuehrt Flexionsformen zusammen: "krankmelden"/"krankmeldungen" -> "krankmeld".
 * Erwartet bereits normalisierten Text (keine Umlaute mehr).
 * @param {string} word
 * @returns {string}
 */
export function stem(word) {
  if (!word) return "";
  let w = word;
  // Vorsilbe "ge" nur bei ausreichender Restlaenge ("gebaeude" bleibt ganz,
  // "gemeldet" -> "meldet").
  if (w.length >= 6 && w.startsWith("ge")) w = w.slice(2);
  // Digraphen schuetzen, damit die Doppelbuchstaben-Regel sie nicht zerlegt.
  w = w.replace(/sch/g, "$").replace(/ei/g, "%").replace(/ie/g, "&");
  w = w.replace(/(.)\1/g, "$1");
  while (w.length > 3) {
    if (w.length > 5 && /(em|er|nd)$/.test(w)) {
      w = w.slice(0, -2);
      continue;
    }
    if (/[tesn]$/.test(w)) {
      w = w.slice(0, -1);
      continue;
    }
    break;
  }
  return w.replace(/\$/g, "sch").replace(/%/g, "ei").replace(/&/g, "ie");
}

// --- Koelner Phonetik ------------------------------------------------------

/**
 * Koelner Phonetik -- das deutsche Gegenstueck zu Soundex. Bildet gleich
 * klingende Woerter auf denselben Code ab: "Krangmeldung"/"Krankmeldung",
 * "Sekretariath"/"Sekretariat", "Meier"/"Mayr".
 * Erwartet normalisierten Text (a-z0-9).
 * @param {string} word
 * @returns {string}
 */
export function cologne(word) {
  const w = String(word || "").replace(/[^a-z]/g, "");
  if (!w) return "";
  const codes = [];
  for (let i = 0; i < w.length; i++) {
    const c = w[i];
    const prev = w[i - 1];
    const next = w[i + 1];
    let code = null;
    switch (c) {
      case "a":
      case "e":
      case "i":
      case "j":
      case "o":
      case "u":
      case "y":
        code = "0";
        break;
      case "h":
        code = null; // traegt keinen eigenen Klang
        break;
      case "b":
        code = "1";
        break;
      case "p":
        code = next === "h" ? "3" : "1";
        break;
      case "d":
      case "t":
        code = next === "c" || next === "s" || next === "z" ? "8" : "2";
        break;
      case "f":
      case "v":
      case "w":
        code = "3";
        break;
      case "g":
      case "k":
      case "q":
        code = "4";
        break;
      case "c":
        if (i === 0) {
          code = "ahkloqrux".includes(next) ? "4" : "8";
        } else if (prev === "s" || prev === "z") {
          code = "8";
        } else {
          code = "ahkoqux".includes(next) ? "4" : "8";
        }
        break;
      case "x":
        code = prev === "c" || prev === "k" || prev === "q" ? "8" : "48";
        break;
      case "l":
        code = "5";
        break;
      case "m":
      case "n":
        code = "6";
        break;
      case "r":
        code = "7";
        break;
      case "s":
      case "z":
        code = "8";
        break;
      default:
        code = null;
    }
    if (code) codes.push(code);
  }
  const joined = codes.join("");
  // Doppelte Codes zusammenfassen, danach alle Vokal-Nullen ausser der ersten
  // Stelle entfernen.
  let deduped = "";
  for (const ch of joined) if (ch !== deduped[deduped.length - 1]) deduped += ch;
  return deduped[0] + deduped.slice(1).replace(/0/g, "");
}

// --- Aehnlichkeitsmasse ----------------------------------------------------

/**
 * Damerau-Levenshtein-Distanz mit Abbruch, sobald das Limit ueberschritten ist
 * (spart bei langen Woertern viel Zeit).
 * @param {string} a
 * @param {string} b
 * @param {number} max
 * @returns {number} Distanz, oder max+1 wenn groesser
 */
export function editDistance(a, b, max = 2) {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return max + 1;
  if (la === 0) return lb;
  if (lb === 0) return la;

  let prevPrev = null;
  let prev = new Array(lb + 1);
  let curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let val = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      // Transposition ("Buhc" -> "Buch") zaehlt als ein Fehler.
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        val = Math.min(val, prevPrev[j - 2] + 1);
      }
      curr[j] = val;
      if (val < rowMin) rowMin = val;
    }
    if (rowMin > max) return max + 1;
    prevPrev = prev;
    prev = curr;
    curr = new Array(lb + 1);
  }
  return prev[lb];
}

/**
 * Wie viele Tippfehler bei diesem Wort noch als "gemeint" durchgehen.
 * Kurze Woerter sind streng, sonst trifft "haus" auf "maus".
 * @param {string} token
 * @returns {number}
 */
export function toleranceFor(token) {
  if (token.length <= 3) return 0;
  if (token.length <= 5) return 1;
  if (token.length <= 8) return 2;
  return 3;
}

/**
 * Trigramm-Aehnlichkeit (Dice) -- weiches Mass fuer Woerter, die sich in
 * mehreren Zeichen unterscheiden, aber offensichtlich verwandt sind.
 * @param {string} a
 * @param {string} b
 * @returns {number} 0..1
 */
export function trigramSimilarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const grams = (s) => {
    const padded = `  ${s} `;
    const out = new Set();
    for (let i = 0; i < padded.length - 2; i++) out.add(padded.slice(i, i + 3));
    return out;
  };
  const ga = grams(a);
  const gb = grams(b);
  let shared = 0;
  for (const g of ga) if (gb.has(g)) shared++;
  return (2 * shared) / (ga.size + gb.size);
}

// --- Matching eines Query-Tokens gegen ein Index-Wort -----------------------

/**
 * Guete des Treffers zwischen Suchwort und indexiertem Wort, 0..1.
 * Die Stufen sind die eigentliche Intelligenz der Suche -- jede faengt einen
 * anderen realen Eingabefehler ab.
 * @param {{ raw: string, stem: string, cologne: string }} q Vorbereitetes Query-Token
 * @param {{ raw: string, stem: string, cologne: string }} w Vorbereitetes Index-Wort
 * @returns {number}
 */
export function matchQuality(q, w) {
  // 1. Exakt.
  if (q.raw === w.raw) return 1;

  // 2. Gleicher Wortstamm: "krankmelden" / "krankmeldest".
  if (q.stem && q.stem === w.stem) return 0.94;

  // 3. Wortanfang: "krank" -> "krankmeldung", "sekret" -> "sekretariat".
  //    Je mehr vom Indexwort abgedeckt ist, desto besser.
  if (w.raw.startsWith(q.raw) && q.raw.length >= 3) {
    return 0.74 + 0.24 * (q.raw.length / w.raw.length);
  }
  if (w.stem.startsWith(q.stem) && q.stem.length >= 3) {
    return 0.7 + 0.22 * (q.stem.length / Math.max(w.stem.length, 1));
  }

  // 4. Kompositum-Bestandteil in der Wortmitte oder am Ende:
  //    "meldung" -> "krankmeldung", "formular" -> "anmeldeformular".
  if (q.raw.length >= 4 && w.raw.includes(q.raw)) {
    return 0.62 + 0.2 * (q.raw.length / w.raw.length);
  }

  // 5. Tippfehler. Bei langen Woertern erlauben wir mehr Abweichung, messen
  //    aber gegen den gemeinsamen Wortanfang mit, damit "krangmeldung" naeher
  //    an "krankmeldung" liegt als an "anmeldung".
  const tol = toleranceFor(q.raw);
  if (tol > 0) {
    const dist = editDistance(q.raw, w.raw, tol);
    if (dist <= tol) {
      // Wer sich vertippt, trifft den Anfangsbuchstaben fast immer richtig.
      // Weicht schon der ab, ist es eher ein anderes Wort ("krank"/"Frank").
      const sameStart = q.raw[0] === w.raw[0] ? 1 : 0.75;
      return Math.max(0.4, (0.82 - 0.14 * dist) * sameStart);
    }
    // Auch der Wortanfang eines Kompositums darf vertippt sein:
    // "krangmeldung" gegen den Index-Eintrag "krank".
    if (w.raw.length >= 4 && q.raw.length > w.raw.length) {
      const head = q.raw.slice(0, w.raw.length);
      const headDist = editDistance(head, w.raw, 1);
      if (headDist <= 1) return 0.6 - 0.1 * headDist;
    }
  }

  // 6. Phonetik: klingt gleich, schreibt sich anders.
  if (q.cologne && q.cologne === w.cologne && q.raw.length >= 4) return 0.66;

  // 7. Letzte Instanz: Trigramme. Faengt Faelle wie "schulpflegschft".
  if (q.raw.length >= 5 && w.raw.length >= 5) {
    const sim = trigramSimilarity(q.raw, w.raw);
    if (sim >= 0.55) return 0.34 + 0.3 * sim;
  }

  return 0;
}

/**
 * Bereitet ein Wort einmalig auf (Stamm + Phonetik), damit das im Scoring
 * nicht pro Vergleich neu berechnet wird.
 * @param {string} raw
 */
export function prepareWord(raw) {
  return { raw, stem: stem(raw), cologne: cologne(raw) };
}

// --- Scoring ---------------------------------------------------------------

/**
 * Feldgewichte. Ein Titeltreffer ist rund siebenmal so viel wert wie ein
 * Treffer irgendwo im Fliesstext -- sonst gewinnen lange Seiten immer.
 */
export const FIELD_WEIGHTS = {
  title: 10,
  keywords: 8.5,
  headings: 5.5,
  description: 4,
  meta: 3,
  body: 2.2,
};

/**
 * Rang-Gewicht je Inhaltstyp.
 *
 * Wer "Schulpflegschaft" sucht, will die Seite mit den Informationen -- nicht
 * den einzelnen Sitzungstermin, der zufaellig genauso heisst. Feste Seiten sind
 * deshalb die primaere Antwort, Einzelinhalte kommen dahinter. Das wirkt NUR
 * auf die Reihenfolge, nicht auf die angezeigte Trefferquote: ein Termin, der
 * exakt so heisst wie die Anfrage, zeigt weiterhin ehrliche 99 %.
 */
export const TYPE_WEIGHTS = {
  page: 1,
  news: 0.88,
  person: 0.85,
  download: 0.85,
  event: 0.78,
  faq: 0.8,
  instagram: 0.55,
};

const FIELD_ORDER = ["title", "keywords", "headings", "description", "meta", "body"];

/**
 * Wandelt einen Rohscore in die angezeigte Trefferquote um.
 *
 * Ohne Kurve wuerde ein sauberer Volltexttreffer bei 14 % landen (weil Body
 * nur Gewicht 1.4 hat) und damit unter der Anzeigeschwelle verschwinden. Die
 * Wurzelkurve spreizt den unteren Bereich, laesst oben aber Luft: exakter
 * Titeltreffer ~99 %, Tippfehler ~80 %, reiner Fliesstexttreffer ~45 %.
 * @param {number} raw Summe der Tokenscores
 * @param {number} tokenCount Anzahl Suchwoerter
 * @returns {number} 0..100
 */
export function toPercent(raw, tokenCount) {
  if (raw <= 0 || tokenCount <= 0) return 0;
  const ideal = tokenCount * FIELD_WEIGHTS.title;
  const ratio = Math.min(raw / ideal, 1);
  return Math.round(100 * Math.pow(ratio, 0.5));
}

/**
 * Bewertet ein Dokument gegen die vorbereiteten Query-Tokens.
 *
 * Liefert zwei getrennte Zahlen, und diese Trennung ist wichtig:
 *   percent -- wie gut der Text zur Anfrage passt. Das ist die Zahl, die der
 *              Nutzer sieht, und sie darf nur vom Text abhaengen.
 *   score   -- die Reihenfolge im Dropdown. Hier fliesst zusaetzlich ein, um
 *              was fuer einen Inhalt es sich handelt und wie wichtig/aktuell
 *              er ist.
 * Sonst muesste man einen exakt passenden Termin kuenstlich auf 82 % druecken,
 * nur damit die Info-Seite darueber steht.
 *
 * @param {object} doc Mit prepareDoc vorbereitetes Dokument
 * @param {Array<{raw:string,stem:string,cologne:string}>} queryTokens
 * @returns {{ score: number, percent: number, coverage: number, bestField: string }}
 */
export function scoreDoc(doc, queryTokens, index = null) {
  let raw = 0;
  let hits = 0;
  let required = 0;
  let bestField = "body";
  let bestFieldScore = 0;

  for (const q of queryTokens) {
    let tokenBest = 0;
    let tokenField = null;

    for (const field of FIELD_ORDER) {
      const entry = doc.fields[field];
      if (!entry || entry.words.length === 0) continue;
      const weight = FIELD_WEIGHTS[field];
      // Selbst ein perfekter Treffer in diesem Feld koennte den bisherigen
      // Bestwert nicht mehr schlagen -- Felder sind nach Gewicht sortiert.
      if (weight <= tokenBest) break;

      let fieldBest = 0;
      // Die beiden haeufigsten Faelle kosten nur einen Set-Zugriff.
      if (entry.raws.has(q.raw)) {
        fieldBest = 1;
      } else if (q.stem && entry.stems.has(q.stem)) {
        fieldBest = 0.94;
      } else if (field === "body") {
        // Der Fliesstext ist das laengste und am schwaechsten gewichtete Feld.
        // Hier lohnt keine Tippfehlerrechnung ueber hunderte Woerter: ein
        // Teilstringtreffer im zusammengefassten Text genuegt und ist nativ
        // um Groessenordnungen schneller.
        if (q.raw.length >= 4 && entry.joined.includes(q.raw)) fieldBest = 0.72;
      } else {
        // Erst jetzt der teure Weg: Wortanfang, Kompositum, Tippfehler, Phonetik.
        for (const w of entry.words) {
          const quality = matchQuality(q, w);
          if (quality > fieldBest) {
            fieldBest = quality;
            if (fieldBest >= 0.99) break;
          }
        }
      }

      const fieldScore = fieldBest * weight;
      if (fieldScore > tokenBest) {
        tokenBest = fieldScore;
        tokenField = field;
      }
    }

    // Fragewoerter steuern nur einen Bonus bei; Allerweltswoerter zaehlen
    // weniger als spezifische.
    const share = (q.optional ? 0.5 : 1) * tokenWeight(q.raw, index);
    if (!q.optional) required++;

    if (tokenBest > 0) {
      raw += tokenBest * share;
      if (tokenBest > bestFieldScore) {
        bestFieldScore = tokenBest;
        bestField = tokenField || "body";
      }
      // Ein Token gilt als getroffen, wenn es irgendwo halbwegs sauber
      // gefunden wurde -- ein schwacher Trigrammtreffer im Fliesstext zaehlt nicht.
      if (!q.optional && tokenBest >= FIELD_WEIGHTS.body * 0.6) hits++;
    }
  }

  if (raw <= 0) return { score: 0, percent: 0, coverage: 0, bestField };

  // Mehrwortsuche ist UND-artig gemeint: "mensa preise" soll nicht jede Seite
  // finden, die irgendwo "Preise" schreibt. Fehlende Woerter druecken den Wert
  // ueberproportional.
  const coverage = required > 0 ? hits / required : 1;
  let score = raw * Math.pow(coverage, 1.6);

  // Art des Inhalts, redaktionelle Wichtigkeit und Aktualitaet gehen mit ein:
  // eine Themenseite schlaegt den gleichnamigen Einzeltermin.
  score *= TYPE_WEIGHTS[doc.type] ?? 0.9;
  score *= 0.88 + 0.24 * (doc.boost ?? 0.5);
  if (doc.freshness) score *= 1 + 0.05 * doc.freshness;

  // Bezugsgroesse: Pflichtwoerter voll, Fragewoerter halb.
  // Bezugsgroesse absichtlich OHNE Wortgewichtung: sonst kuerzt sie sich
  // heraus und "schule" -- ein Wort, das auf jeder Seite steht -- bekaeme
  // dieselben 98 % wie ein eindeutiger Volltreffer. Genau das soll die Zahl
  // dem Besucher ja sagen: wie sicher der Treffer ist.
  const optional = queryTokens.length - required;
  const percent = toPercent(score, required + optional * 0.5);

  return { score, percent, coverage, bestField };
}

/**
 * Bereitet ein Roh-Dokument aus dem Index fuer die Suche auf: Felder werden in
 * Wortlisten zerlegt, jeweils mit Stamm und Phonetik. Die Sets daneben machen
 * den Normalfall (Wort steht genau so im Text) zu einem Hash-Zugriff, statt
 * hunderte Woerter durchzurechnen.
 *
 * Passiert einmal beim Laden des Index, nicht bei jedem Tastendruck.
 * @param {object} doc
 */
export function prepareDoc(doc) {
  const fields = {};
  for (const field of FIELD_ORDER) {
    const value = doc[field];
    const text = Array.isArray(value) ? value.join(" ") : value || "";
    const seen = new Set();
    const words = [];
    const raws = new Set();
    const stems = new Set();
    for (const t of tokenize(text)) {
      if (seen.has(t)) continue;
      seen.add(t);
      const prepared = prepareWord(t);
      words.push(prepared);
      raws.add(prepared.raw);
      stems.add(prepared.stem);
    }
    // Fuer den Fliesstext-Schnelltest: alle Woerter als ein String.
    fields[field] = { words, raws, stems, joined: words.map((w) => w.raw).join(" ") };
  }
  return { ...doc, fields };
}

/**
 * Baut aus den Roh-Dokumenten den fertigen Suchindex.
 *
 * Nebenbei wird gezaehlt, in wie vielen Dokumenten jedes Wort vorkommt. Das
 * ist der Unterschied zwischen "Wort gefunden" und "aussagekraeftiges Wort
 * gefunden": "Schule" steht auf jeder Seite dieser Website und sagt deshalb
 * fast nichts, "Krankmeldung" steht auf dreien und sagt alles. Ohne diese
 * Gewichtung liefert die Suche nach "schule" fuenf Treffer mit je 97 %.
 *
 * @param {object[]} rawDocs
 */
export function buildIndex(rawDocs) {
  const docs = rawDocs.map(prepareDoc);
  const df = new Map();
  for (const doc of docs) {
    const seen = new Set();
    for (const field of FIELD_ORDER) {
      for (const w of doc.fields[field].words) {
        if (seen.has(w.raw)) continue;
        seen.add(w.raw);
        df.set(w.raw, (df.get(w.raw) ?? 0) + 1);
      }
    }
  }
  return { docs, df, size: docs.length };
}

/**
 * Aussagekraft eines Suchworts, 0.55 (Allerweltswort) bis 1 (spezifisch).
 * Bewusst gedaempft: ein haeufiges Wort soll an Gewicht verlieren, aber nicht
 * wirkungslos werden -- sonst findet "schule troisdorf" nichts mehr.
 */
export function tokenWeight(token, index) {
  if (!index || !index.df || index.size < 8) return 1;
  const df = index.df.get(token) ?? 0;
  if (df === 0) return 1;
  const rarity = Math.log(1 + index.size / df) / Math.log(1 + index.size / 2);
  return 0.55 + 0.45 * Math.min(1, rarity);
}

/**
 * Fuehrt die Suche aus.
 * @param {object[]} docs Mit prepareDoc vorbereitete Dokumente
 * @param {string} query
 * @param {{ limit?: number, minPercent?: number }} [options]
 * @returns {Array<object & { percent: number, score: number }>}
 */
export function search(index, query, options = {}) {
  const { limit = 8, minPercent = 35 } = options;
  const tokens = parseQuery(query);
  if (tokens.length === 0) return [];

  // Rueckwaertskompatibel: ein blankes Dokument-Array ist weiterhin erlaubt,
  // dann entfaellt nur die Wortgewichtung.
  const prepared = Array.isArray(index) ? { docs: index, df: null, size: index.length } : index;

  const results = [];
  for (const doc of prepared.docs) {
    const { score, percent, bestField } = scoreDoc(doc, tokens, prepared);
    if (percent >= minPercent) results.push({ doc, score, percent, bestField });
  }

  results.sort((a, b) => b.score - a.score || a.doc.title.length - b.doc.title.length);

  // Nicht zweimal praktisch dasselbe Ziel anbieten (z. B. Seite + gleichnamiger
  // Abschnitt derselben Seite).
  const seenUrls = new Set();
  const deduped = [];
  for (const r of results) {
    const key = r.doc.url;
    if (seenUrls.has(key)) continue;
    seenUrls.add(key);
    deduped.push(r);
    if (deduped.length >= limit) break;
  }

  return deduped.map((r) => ({
    ...r.doc,
    fields: undefined,
    percent: Math.min(r.percent, 99),
    score: r.score,
    bestField: r.bestField,
    snippet: buildSnippet(r.doc, tokens),
  }));
}

/**
 * Baut die Kontextzeile unter dem Treffer: bevorzugt die Stelle im Fliesstext
 * mit der hoechsten Trefferdichte, sonst die redaktionelle Beschreibung.
 * @param {object} doc
 * @param {Array<{raw:string}>} tokens
 * @returns {string}
 */
export function buildSnippet(doc, tokens) {
  const body = doc.body || "";
  if (!body) return doc.description || "";

  const haystack = normalize(body);
  let bestPos = -1;
  let bestLen = 0;
  for (const t of tokens) {
    const pos = haystack.indexOf(t.raw);
    if (pos >= 0 && t.raw.length > bestLen) {
      bestPos = pos;
      bestLen = t.raw.length;
    }
  }
  if (bestPos < 0) return doc.description || body.slice(0, 140).trim();

  // Normalisierte Position auf den Originaltext uebertragen: beide haben
  // dieselbe Wortfolge, daher ueber die Wortnummer gehen.
  const wordIndex = haystack.slice(0, bestPos).split(" ").filter(Boolean).length;
  const words = body.split(/\s+/);
  const start = Math.max(0, wordIndex - 6);
  const snippet = words.slice(start, start + 24).join(" ");
  return (start > 0 ? "… " : "") + snippet + (start + 24 < words.length ? " …" : "");
}
