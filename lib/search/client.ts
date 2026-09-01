/**
 * Browser-Seite der Suche: laedt den Index und fuehrt Anfragen aus.
 *
 * Der Index (~100 KB, gzip ~30 KB) wird NICHT ins Seitenbundle gepackt,
 * sondern erst beim ersten Oeffnen der Lupe geholt. Auf der Startseite kostet
 * die Suche damit exakt nichts.
 */
import { buildIndex, search as coreSearch } from "./core.mjs";

export type SearchType = "page" | "news" | "event" | "download" | "person" | "faq" | "instagram";

export interface SearchDoc {
  id: string;
  type: SearchType;
  url: string;
  title: string;
  description: string;
  keywords: string;
  headings: string;
  meta: string;
  body: string;
  boost: number;
  freshness?: number;
  badge?: string;
  date?: string;
  external?: boolean;
}

export interface SearchHit extends SearchDoc {
  /** Trefferquote 0-99, wird im Dropdown angezeigt. */
  percent: number;
  score: number;
  /** Kontextzeile mit der Fundstelle. */
  snippet: string;
  bestField: string;
}

interface SearchIndexFile {
  generatedAt: string;
  count: number;
  docs: SearchDoc[];
}

// Einmal geladen, dann im Modul gehalten - auch ueber Seitenwechsel hinweg,
// weil Next die App nicht neu laedt.
let indexPromise: Promise<ReturnType<typeof buildIndex>> | null = null;

/**
 * Laedt und praepariert den Suchindex. Mehrfachaufrufe teilen sich denselben
 * Ladevorgang.
 *
 * `cache: "no-cache"` heisst nicht "nicht cachen", sondern "vor Benutzung
 * gegen den Server pruefen". Nach einem Deploy sieht der Besucher damit sofort
 * den neuen Index, ohne dass wir Dateinamen versionieren muessen; unveraendert
 * kostet die Pruefung nur ein 304 ohne Body.
 */
export function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch("/data/search-index.json", { cache: "no-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`Suchindex nicht ladbar (${res.status})`);
        return res.json() as Promise<SearchIndexFile>;
      })
      .then((data) => buildIndex(data.docs ?? []))
      .catch((err) => {
        // Beim naechsten Oeffnen darf es erneut versucht werden.
        indexPromise = null;
        throw err;
      });
  }
  return indexPromise;
}

/**
 * Fuehrt eine Suche aus.
 * @param query Roheingabe des Nutzers
 * @param limit Maximale Trefferzahl
 */
export async function runSearch(query: string, limit = 8): Promise<SearchHit[]> {
  if (query.trim().length < 2) return [];
  const index = await loadSearchIndex();
  return coreSearch(index, query, { limit, minPercent: 35 }) as SearchHit[];
}
