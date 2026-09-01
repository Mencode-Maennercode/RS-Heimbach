"use client";

/**
 * Globale Suche hinter dem Lupensymbol.
 *
 * Zeigt zunaechst die drei besten Treffer mit ihrer Trefferquote in Prozent;
 * auf Wunsch klappt die Liste auf bis zu acht Treffer auf und wird scrollbar.
 * Auf dem Desktop als Dropdown unter der Lupe, auf dem Handy als Vollbild-
 * Overlay (dort war das alte Dropdown gar nicht sichtbar).
 *
 * Die Suchlogik selbst steckt in lib/search/core.mjs, die Daten kommen aus
 * public/data/search-index.json und werden erst beim ersten Oeffnen geladen.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  FileText,
  Newspaper,
  CalendarDays,
  Download,
  User,
  HelpCircle,
  Instagram,
  Loader2,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { runSearch, loadSearchIndex, type SearchHit } from "@/lib/search/client";
import { normalize, tokenizeQuery } from "@/lib/search/core.mjs";
import { cn } from "@/lib/utils";

const COLLAPSED_COUNT = 3;
const MAX_COUNT = 8;

const TYPE_ICONS = {
  page: FileText,
  news: Newspaper,
  event: CalendarDays,
  download: Download,
  person: User,
  faq: HelpCircle,
  instagram: Instagram,
} as const;

/** Farbe der Trefferquote: je sicherer der Treffer, desto kraeftiger. */
function scoreStyle(percent: number) {
  if (percent >= 80) return "bg-[#1DA499]/12 text-[#12796f]";
  if (percent >= 60) return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-500";
}

/**
 * Hebt die Suchwoerter im Kontexttext hervor. Der Vergleich laeuft ueber die
 * normalisierte Form, damit "faecher" auch "Fächer" markiert.
 */
function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!text) return null;
  if (tokens.length === 0) return <>{text}</>;
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) => {
        const word = normalize(part);
        const hit = word.length > 0 && tokens.some((t) => word.includes(t) || t.includes(word));
        return hit ? (
          <mark key={i} className="bg-[#1DA499]/15 text-[#0f6d65] rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export default function SiteSearch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const listId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Verhindert, dass eine langsamere aeltere Anfrage eine neuere ueberschreibt.
  const requestId = useRef(0);

  // Unter zwei Zeichen zeigt die Liste nichts. Abgeleitet statt im Effekt
  // zurueckgesetzt: so entsteht beim Loeschen der Eingabe kein Zwischenbild
  // mit veralteten Treffern.
  const activeHits = query.trim().length >= 2 ? hits : [];
  const visible = expanded ? activeHits.slice(0, MAX_COUNT) : activeHits.slice(0, COLLAPSED_COUNT);
  const hiddenCount = Math.min(activeHits.length, MAX_COUNT) - visible.length;
  const tokens = useMemo(() => (query.length >= 2 ? tokenizeQuery(query) : []), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setHits([]);
    setExpanded(false);
    setActive(0);
  }, []);

  // Index schon beim Oeffnen holen, nicht erst beim ersten Tastendruck.
  useEffect(() => {
    if (!open) return;
    loadSearchIndex().catch(() => setFailed(true));
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  // Suche ausfuehren.
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    const id = ++requestId.current;
    let cancelled = false;
    // Der Ladebalken erscheint erst, wenn es wirklich dauert (also solange der
    // Index noch geladen wird). Die Suche selbst braucht wenige Millisekunden --
    // ein sofortiger Spinner wuerde bei jedem Tastendruck aufblitzen.
    const spinner = setTimeout(() => {
      if (!cancelled) setLoading(true);
    }, 120);

    runSearch(trimmed, MAX_COUNT)
      .then((results) => {
        // Zuerst den Spinner abbestellen: liefert die Suche schneller als die
        // 120 ms, wuerde er sonst nachtraeglich anspringen und dauerhaft
        // drehen, obwohl die Treffer laengst dastehen.
        clearTimeout(spinner);
        if (cancelled || id !== requestId.current) return;
        setHits(results);
        setActive(0);
        setExpanded(false);
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(spinner);
        if (cancelled || id !== requestId.current) return;
        setFailed(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(spinner);
    };
  }, [query]);

  // Klick ausserhalb schliesst das Dropdown (nur Desktop; mobil ist es modal).
  useEffect(() => {
    if (!open || variant === "mobile") return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, variant, close]);

  // Strg+K / Cmd+K oeffnet die Suche (nur die Desktop-Instanz, sonst waeren
  // beide gleichzeitig offen).
  useEffect(() => {
    if (variant !== "desktop") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  const openHit = useCallback(
    (hit: SearchHit) => {
      close();
      if (hit.external) {
        window.open(hit.url, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(hit.url);
    },
    [close, router]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      // Am Ende der Kurzliste automatisch aufklappen statt zu blockieren.
      if (active === visible.length - 1 && hiddenCount > 0) {
        setExpanded(true);
        setActive(active + 1);
        return;
      }
      setActive((i) => Math.min(i + 1, visible.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const hit = visible[active] ?? visible[0];
      if (hit) openHit(hit);
    }
  };

  const panel = (
    <div className={cn(variant === "mobile" && "flex flex-col h-full")}>
      {/* Eingabezeile */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          // Combobox statt einfachem Textfeld: nur diese Rolle darf ueber
          // aria-expanded/aria-controls auf die Ergebnisliste verweisen.
          role="combobox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Wonach suchen Sie?"
          aria-label="Website durchsuchen"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={activeHits.length > 0}
          className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
        />
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 text-slate-300 animate-spin shrink-0" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Eingabe löschen"
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
        {variant === "mobile" && (
          <button
            type="button"
            onClick={close}
            aria-label="Suche schließen"
            className="ml-1 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Abbrechen
          </button>
        )}
      </div>

      {/* Ergebnisse */}
      {visible.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            "py-1.5",
            expanded && "max-h-[22rem] overflow-y-auto overscroll-contain",
            variant === "mobile" && "flex-1 overflow-y-auto max-h-none"
          )}
        >
          {visible.map((hit, i) => {
            const Icon = TYPE_ICONS[hit.type] ?? FileText;
            return (
              <li key={hit.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => openHit(hit)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 px-3.5 py-2.5 transition-colors duration-100",
                    i === active ? "bg-slate-50" : "bg-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      i === active ? "bg-[#1DA499] text-white" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-800 truncate">
                        {hit.title}
                      </span>
                      {hit.external && <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />}
                    </span>
                    <span className="block text-xs text-slate-500 line-clamp-2 leading-snug mt-0.5">
                      <Highlight text={hit.snippet || hit.description} tokens={tokens} />
                    </span>
                    {hit.badge && (
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {hit.badge}
                        {hit.date ? ` · ${hit.date}` : ""}
                      </span>
                    )}
                  </span>

                  <span
                    className={cn(
                      "shrink-0 text-[11px] font-bold tabular-nums rounded-md px-1.5 py-0.5 mt-0.5",
                      scoreStyle(hit.percent)
                    )}
                    title="Übereinstimmung mit Ihrer Suche"
                  >
                    {hit.percent}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Aufklappen auf bis zu acht Treffer */}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1DA499] hover:bg-slate-50 border-t border-slate-100 transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          {hiddenCount} weitere{hiddenCount === 1 ? "s" : ""} Ergebnis{hiddenCount === 1 ? "" : "se"}
        </button>
      )}

      {/* Zustaende ohne Ergebnis */}
      {failed && (
        <p className="px-4 py-3 text-sm text-slate-400">
          Die Suche ist gerade nicht verfügbar. Bitte nutzen Sie das Menü.
        </p>
      )}
      {!failed && query.trim().length >= 2 && !loading && activeHits.length === 0 && (
        <div className="px-4 py-3">
          <p className="text-sm text-slate-500">
            Nichts gefunden für „{query.trim()}“.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Versuchen Sie es mit einem einzelnen Stichwort, zum Beispiel „Krankmeldung“, „Mensa“ oder
            „Termine“.
          </p>
        </div>
      )}
      {!failed && query.trim().length < 2 && (
        <p className="px-4 py-3 text-xs text-slate-400">
          Seiten, Termine, Downloads und Lehrkräfte durchsuchen – mindestens 2 Zeichen.
        </p>
      )}
    </div>
  );

  // --- Mobil: Vollbild-Overlay ---------------------------------------------
  if (variant === "mobile") {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Suche öffnen"
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
            open ? "bg-[#1DA499] text-white" : "text-slate-600 hover:bg-slate-100"
          )}
        >
          <Search className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60] bg-white flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Suche"
            >
              <div className="pt-3 px-2 flex-1 flex flex-col min-h-0">{panel}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // --- Desktop: Dropdown unter der Lupe ------------------------------------
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Suche"
        title="Suchen (Strg+K)"
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
          open ? "bg-[#1DA499] text-white" : "text-slate-500 hover:bg-slate-100 hover:text-[#1DA499]"
        )}
      >
        <Search className="w-4.5 h-4.5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-[26rem] bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden"
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
