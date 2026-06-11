// Schulkalender aus der Nextcloud-Freigabe.
//
// Quelle ist der oeffentliche ICS-Export der freigegebenen Nextcloud-Kalender-
// Ansicht (kein Login, kein API-Key noetig). Wir holen die Datei serverseitig,
// parsen sie selbst (kein Zusatzpaket) und liefern Termine in exakt der Form,
// die die bestehenden Komponenten erwarten.
//
// Stabilitaet: Der Abruf laeuft via Next.js-ISR (siehe `revalidate`), d. h. der
// einmal geholte Stand wird zwischengespeichert und nur stuendlich aufgefrischt.
// Faellt die Cloud bei einem Refresh aus, serviert Next den letzten guten Stand
// weiter (stale-while-revalidate) – die Seite bricht also nicht.

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd (Start)
  endDate?: string; // ISO yyyy-mm-dd (Ende, nur bei mehrtaegigen Terminen)
  time: string; // z. B. "Ganztägig", "13:15 Uhr", "13:15 – 15:15 Uhr"
  location: string; // "" wenn nicht gepflegt
  category: string;
  color: string; // blue | green | orange | purple | red
  description: string;
};

const ICS_URL =
  process.env.CALENDAR_ICS_URL ||
  "https://cloud.rs-heimbach.de/remote.php/dav/public-calendars/iwj5ASdqSHpjGiwK?export";

// Wie oft Next.js den Kalender im Hintergrund neu zieht (Sekunden).
export const CALENDAR_REVALIDATE = 3600;

// --- ICS-Parsing -----------------------------------------------------------

// RFC-5545-Zeilen koennen umgebrochen werden ("folding"): eine Folgezeile
// beginnt mit Leerzeichen oder Tab und gehoert an die vorige Zeile.
function unfold(ics: string): string[] {
  const raw = ics.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

// Maskierte Zeichen aus ICS-Textwerten zurueckwandeln.
function unescapeText(value: string): string {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

type RawEvent = Record<string, { value: string; params: Record<string, string> }>;

function splitEvents(lines: string[]): RawEvent[] {
  const events: RawEvent[] = [];
  let current: RawEvent | null = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
      continue;
    }
    if (!current) continue;

    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const left = line.slice(0, colon);
    const value = line.slice(colon + 1);
    const [name, ...paramParts] = left.split(";");
    const params: Record<string, string> = {};
    for (const p of paramParts) {
      const eq = p.indexOf("=");
      if (eq !== -1) params[p.slice(0, eq).toUpperCase()] = p.slice(eq + 1);
    }
    // Nur die erste Auspraegung eines Feldes behalten (genuegt fuer SUMMARY etc.).
    if (!(name.toUpperCase() in current)) {
      current[name.toUpperCase()] = { value, params };
    }
  }
  return events;
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

// Parst einen ICS-Datumswert. Gibt das Datum als lokale Wanduhrzeit zurueck –
// fuer reine Anzeige genuegt das (keine TZ-Umrechnung noetig).
function parseDt(field: { value: string; params: Record<string, string> }) {
  const v = field.value.trim();
  const isDateOnly = field.params.VALUE === "DATE" || /^\d{8}$/.test(v);
  const y = Number(v.slice(0, 4));
  const mo = Number(v.slice(4, 6)) - 1;
  const da = Number(v.slice(6, 8));
  if (isDateOnly) {
    return { date: new Date(y, mo, da), allDay: true as const };
  }
  const h = Number(v.slice(9, 11)) || 0;
  const mi = Number(v.slice(11, 13)) || 0;
  return { date: new Date(y, mo, da, h, mi), allDay: false as const };
}

function timeLabel(hStart: Date, end?: Date): string {
  const fmt = (d: Date) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  if (end && (end.getHours() !== hStart.getHours() || end.getMinutes() !== hStart.getMinutes())) {
    return `${fmt(hStart)} – ${fmt(end)} Uhr`;
  }
  return `${fmt(hStart)} Uhr`;
}

// Stichwort-basierte Zuordnung von Label + Farbe, solange in Nextcloud keine
// CATEGORIES gepflegt sind. Wird eine Kategorie gepflegt, hat diese Vorrang.
const KEYWORD_RULES: Array<{ re: RegExp; category: string; color: string }> = [
  { re: /eltern|pflegschaft|sprechtag/i, category: "Eltern", color: "green" },
  { re: /anmeld/i, category: "Anmeldung", color: "red" },
  { re: /ferien|feiertag|beweglich|frei\b/i, category: "Ferien", color: "orange" },
  { re: /wettbewerb|känguru|kanguru/i, category: "Wettbewerb", color: "orange" },
  { re: /zeugnis/i, category: "Zeugnis", color: "purple" },
  { re: /prüfung|pruefung|klausur|lernstand|zp10|zp 10|zentrale|vera\b|test/i, category: "Prüfung", color: "red" },
  { re: /projekt|projektwoche|woche/i, category: "Projekt", color: "purple" },
  { re: /konferenz|sitzung|dienstbesprechung|zeugniskonferenz/i, category: "Konferenz", color: "blue" },
  { re: /tag der offenen|info.?abend|kennenlern/i, category: "Schule", color: "blue" },
];

const COLOR_BY_CATEGORY: Record<string, string> = {
  eltern: "green",
  anmeldung: "red",
  ferien: "orange",
  wettbewerb: "orange",
  zeugnis: "purple",
  prüfung: "red",
  projekt: "purple",
  konferenz: "blue",
  schule: "blue",
};

function classify(title: string, categories?: string): { category: string; color: string } {
  // Gepflegte Nextcloud-Kategorie hat Vorrang.
  if (categories) {
    const first = categories.split(",")[0].trim();
    if (first) {
      const color = COLOR_BY_CATEGORY[first.toLowerCase()] || "blue";
      return { category: first, color };
    }
  }
  for (const rule of KEYWORD_RULES) {
    if (rule.re.test(title)) return { category: rule.category, color: rule.color };
  }
  return { category: "Termin", color: "blue" };
}

function mapEvent(raw: RawEvent): CalendarEvent | null {
  const summary = raw.SUMMARY?.value;
  const dtstart = raw.DTSTART;
  if (!summary || !dtstart) return null;

  const title = unescapeText(summary);
  const start = parseDt(dtstart);
  const end = raw.DTEND ? parseDt(raw.DTEND) : null;

  let endDate: string | undefined;
  let time: string;

  if (start.allDay) {
    time = "Ganztägig";
    if (end) {
      // DTEND ist bei Ganztagsterminen exklusiv -> letzter realer Tag = Ende - 1 Tag.
      const last = new Date(end.date.getTime() - 24 * 60 * 60 * 1000);
      if (toISODate(last) !== toISODate(start.date)) endDate = toISODate(last);
    }
  } else {
    const sameDayEnd = end && toISODate(end.date) === toISODate(start.date) ? end.date : undefined;
    time = timeLabel(start.date, sameDayEnd);
  }

  const { category, color } = classify(title, raw.CATEGORIES?.value);

  return {
    id: raw.UID?.value || `${toISODate(start.date)}-${title}`,
    title,
    date: toISODate(start.date),
    endDate,
    time,
    location: raw.LOCATION ? unescapeText(raw.LOCATION.value) : "",
    category,
    color,
    description: raw.DESCRIPTION ? unescapeText(raw.DESCRIPTION.value) : "",
  };
}

// --- Oeffentliche API ------------------------------------------------------

function parseIcs(ics: string): CalendarEvent[] {
  return splitEvents(unfold(ics))
    .map(mapEvent)
    .filter((e): e is CalendarEvent => e !== null);
}

/**
 * Liefert die kommenden Termine (ab heute), aufsteigend sortiert.
 * Bei Abrufproblemen wird eine leere Liste zurueckgegeben – die aufrufende
 * Seite faengt das ab (und Next serviert bei ISR ohnehin den letzten Stand).
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  let events: CalendarEvent[] = [];
  try {
    const res = await fetch(ICS_URL, {
      next: { revalidate: CALENDAR_REVALIDATE },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`ICS HTTP ${res.status}`);
    events = parseIcs(await res.text());
  } catch (err) {
    console.error("[calendar] Abruf fehlgeschlagen:", err);
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();

  return events
    .filter((e) => {
      const ref = new Date(`${e.endDate || e.date}T23:59:59`).getTime();
      return ref >= todayMs;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
