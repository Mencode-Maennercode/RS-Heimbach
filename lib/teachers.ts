// Aufbereitung der Lehrkraefte-Daten aus dem Google Sheet.
//
// Alle Regeln stehen absichtlich hier auf der Website-Seite und nicht im
// Apps-Script: so greifen Aenderungen sofort beim naechsten Build, ohne dass
// im Google-Sheet-Editor eine neue Version bereitgestellt werden muss. Das
// Apps-Script liefert nur die Rohwerte der Tabelle aus.

// Bekannte Faecher in ihrer Anzeige-Reihenfolge. Die Liste dient doppelt:
// als feste Sortierung (damit "Mathematik, Deutsch" und "Deutsch, Mathematik"
// gleich aussehen) und als Referenz fuer die Tippfehler-Korrektur.
// Faecher, die hier nicht stehen, gehen nicht verloren - sie werden nur
// alphabetisch hinten angehaengt.
const KNOWN_SUBJECTS = [
  "Deutsch",
  "Mathematik",
  "Englisch",
  "Französisch",
  "Griechisch",
  "Türkisch",
  "Biologie",
  "Chemie",
  "Physik",
  "Geschichte",
  "Erdkunde",
  "Politik",
  "Sozialwissenschaften",
  "Praktische Philosophie",
  "Ev. Religion",
  "Kath. Religion",
  "Kunst",
  "Musik",
  "Sport",
  "Informatik",
  "Technik",
  "Textil",
];

/** Nachname → Dateinamen-Slug, identisch zu scripts/teacher-photos.mjs. */
export function slugifyName(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (m) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" }[m] ?? m))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function levenshtein(a: string, b: string): number {
  const rows: number[][] = [];
  for (let i = 0; i <= a.length; i++) rows.push([i]);
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      rows[i][j] =
        a[i - 1] === b[j - 1]
          ? rows[i - 1][j - 1]
          : 1 + Math.min(rows[i - 1][j], rows[i][j - 1], rows[i - 1][j - 1]);
    }
  }
  return rows[a.length][b.length];
}

/**
 * Gleicht ein eingetragenes Fach gegen KNOWN_SUBJECTS ab — unabhaengig von
 * Gross-/Kleinschreibung und tolerant gegenueber kleinen Tippfehlern
 * ("Matematik" → "Mathematik", "English" → "Englisch"). Ohne ausreichend
 * aehnlichen Treffer: null, der eingetragene Text bleibt dann erhalten.
 */
function matchKnownSubject(raw: string): string | null {
  const needle = raw.trim().toLowerCase();
  if (!needle) return null;

  const exact = KNOWN_SUBJECTS.find((s) => s.toLowerCase() === needle);
  if (exact) return exact;

  let best: string | null = null;
  let bestDistance = Infinity;
  for (const candidate of KNOWN_SUBJECTS) {
    const distance = levenshtein(needle, candidate.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  // Toleranz waechst mit der Wortlaenge, damit ein Buchstabendreher erkannt
  // wird, ohne verschiedene Faecher zu verschmelzen.
  const tolerance = Math.max(1, Math.floor(needle.length / 5));
  return bestDistance <= tolerance ? best : null;
}

function capitalize(text: string): string {
  const trimmed = text.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : "";
}

/**
 * Vereinheitlicht die Faecher einer Lehrkraft: Schreibweise korrigieren,
 * Doppelnennungen entfernen und immer in derselben Reihenfolge ausgeben —
 * egal in welcher Reihenfolge sie im Sheet stehen.
 */
export function normalizeSubjects(faecher: string[]): string[] {
  const known: string[] = [];
  const unknown: string[] = [];
  const seen = new Set<string>();

  for (const entry of faecher) {
    const canonical = matchKnownSubject(entry);
    const value = canonical ?? capitalize(entry);
    if (!value || seen.has(value.toLowerCase())) continue;
    seen.add(value.toLowerCase());
    (canonical ? known : unknown).push(value);
  }

  known.sort((a, b) => KNOWN_SUBJECTS.indexOf(a) - KNOWN_SUBJECTS.indexOf(b));
  unknown.sort((a, b) => a.localeCompare(b, "de"));
  return [...known, ...unknown];
}

/**
 * Bringt mehrere Faecher-Listen in eine gemeinsame, stabil sortierte Liste —
 * Grundlage der Filter-Buttons auf der Kollegium-Seite. Neu im Sheet
 * eingetragene Faecher erscheinen dadurch automatisch, ohne Code-Aenderung.
 */
export function collectSubjects(perTeacher: string[][]): string[] {
  return normalizeSubjects(perTeacher.flat());
}

/**
 * Vereinheitlicht die Bio (zusaetzliche Aufgaben). Komma-Listen wie
 * "SV-Lehrer, Sonderpädagoge" werden alphabetisch sortiert, damit die
 * Reihenfolge unabhaengig von der Eintragung im Sheet immer gleich ist.
 */
export function normalizeBio(bio: string): string {
  const collapsed = bio.replace(/\s+/g, " ").trim();
  if (!collapsed) return "";
  const parts = collapsed.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length <= 1) return capitalize(collapsed);
  return parts.map(capitalize).sort((a, b) => a.localeCompare(b, "de")).join(", ");
}

/** Anrede aus der Sheet-Spalte "Geschlecht". Leer, wenn nichts Eindeutiges drinsteht. */
export type Anrede = "Hr." | "Fr." | "";

export function normalizeAnrede(value: string): Anrede {
  const v = value.trim().toLowerCase().replace(/\.$/, "");
  if (["hr", "herr", "m", "männlich", "maennlich"].includes(v)) return "Hr.";
  if (["fr", "frau", "w", "f", "weiblich"].includes(v)) return "Fr.";
  return "";
}

/**
 * Anzeigename: immer "Hr./Fr. Nachname" — Vornamen erscheinen nie auf der
 * Website, sie dienen nur der E-Mail-Bildung. Fehlt die Anrede, bleibt der
 * Nachname allein stehen.
 */
export function displayName(anrede: Anrede, nachname: string): string {
  return [anrede, nachname.trim()].filter(Boolean).join(" ");
}

/**
 * Setzt Rollenbezeichnungen mit Genderstern passend zur Anrede: "Lehrer*in"
 * wird zu "Lehrer" bzw. "Lehrerin", "2. Konrektor*in" zu "2. Konrektor" bzw.
 * "2. Konrektorin". Ohne Anrede bleibt die Sternform stehen, weil sich das
 * Geschlecht dann nicht ableiten laesst. Rollen ohne Stern ("Konrektorin",
 * "AWO - Team") werden nie angetastet.
 */
export function genderRole(rolle: string, anrede: Anrede): string {
  if (!anrede) return rolle;

  return rolle.replace(/([A-Za-zÄÖÜäöüß]+)[*:_]in\b/g, (match, stem: string) => {
    if (anrede === "Fr.") return `${stem}in`;
    // Maennliche Form von "-og" ist "-oge" (Sonderpädagog*in → Sonderpädagoge).
    return /og$/i.test(stem) ? `${stem}e` : stem;
  });
}

/**
 * Dienstliche Adresse nach dem Schema
 * "<erster-Buchstabe-Vorname>.<nachname>@rs-heimbach.de".
 *
 * Die Sonderfaelle sind an den Adressen der alten Website geprueft:
 *   Marcel Werner              → m.werner
 *   Merve Köylüoglu            → m.koeylueoglu   (Umlaute als ue/oe)
 *   Güllüzar Gümüs-Gerichhausen → g.guemues      (nur der Teil vor dem Bindestrich)
 *   Lara van Oost              → l.van-oost      (Leerzeichen bleibt als Bindestrich)
 *
 * Ohne Vornamen ist keine Adresse bildbar (dann leerer String).
 */
export function schoolEmail(vorname: string, nachname: string): string {
  const initial = slugifyName(vorname).charAt(0);
  // Am echten Bindestrich trennen, bevor Leerzeichen zu Bindestrichen werden.
  const surname = slugifyName(nachname.split("-")[0]);
  if (!initial || !surname) return "";
  return `${initial}.${surname}@rs-heimbach.de`;
}

/**
 * Locker normalisierter Schluessel fuer die Foto-Zuordnung. Dateinamen im
 * Bilder-Ordner sind nicht immer gleich transliteriert ("koeyluoglu.jpg" vs.
 * Slug "koeylueoglu"), darum werden Umlaut-Schreibweisen hier auf den
 * Grundvokal zusammengezogen und Trennzeichen entfernt:
 *   "Köylüoglu" → koyluoglu   ·   "koeyluoglu.jpg" → koyluoglu
 *   "van Oost"  → vanoost     ·   "van-oost.jpg"   → vanoost
 */
export function photoKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöü]/g, (m) => ({ ä: "a", ö: "o", ü: "u" }[m] ?? m))
    .replace(/ß/g, "ss")
    .replace(/ae|oe|ue/g, (m) => ({ ae: "a", oe: "o", ue: "u" }[m] ?? m))
    .replace(/[^a-z0-9]+/g, "");
}
