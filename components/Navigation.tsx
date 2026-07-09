"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Phone, Search, Thermometer } from "lucide-react";
import { navItems, schoolInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

const searchIndex = [
  { label: "Startseite", href: "/", keywords: "home willkommen schule" },
  { label: "Unsere Schule", href: "/unsere-schule", keywords: "über uns profil leitbild" },
  { label: "Schulleitung", href: "/unsere-schule/schulleitung", keywords: "rektorin direktion leitung" },
  { label: "Kollegium", href: "/lehrer", keywords: "lehrer lehrerinnen team" },
  { label: "Sekretariat", href: "/unsere-schule/sekretariat", keywords: "büro öffnungszeiten verwaltung" },
  { label: "Schülervertretung (SV)", href: "/unsere-schule/sv", keywords: "sv schüler vertreter" },
  { label: "Schulzeiten", href: "/unterricht/schulzeiten", keywords: "stundenplan zeiten raster stunden" },
  { label: "Fächer & Differenzierung", href: "/unterricht/faecher", keywords: "fächer kurse wahlpflicht differenzierung" },
  { label: "Ganztag & Wahlunterricht", href: "/ganztag", keywords: "ganztag wahlunterricht wu betreuung nachmittag" },
  { label: "Mensa", href: "/unterricht/mensa", keywords: "mensa essen mittagessen cafeteria" },
  { label: "Projekte & Programme", href: "/unterricht/projekte", keywords: "projekte programme jahrgänge orientierung berufspraktikum streitschlichter sanitäter" },
  { label: "Schulberatung", href: "/beratung", keywords: "beratung hilfe unterstützung" },
  { label: "Schulpflegschaft", href: "/eltern/schulpflegschaft", keywords: "eltern pflegschaft schulpflegschaft elternvertretung" },
  { label: "Förderverein", href: "/foerderverein", keywords: "förderverein spenden unterstützung" },
  { label: "Veranstaltungen", href: "/veranstaltungen", keywords: "termine events kalender" },
  { label: "Downloads", href: "/service", keywords: "downloads formulare service dokumente" },
  { label: "Krankmeldung", href: "/krankmeldung", keywords: "krankmeldung krank krankmelden entschuldigung fehlen abwesenheit fehltag formular abmelden" },
  { label: "Anmeldung", href: "/anmeldung", keywords: "aktuelles news neuigkeiten anmeldung anmelden klasse 5" },
  { label: "Kontakt", href: "/kontakt", keywords: "kontakt telefon email adresse" },
  { label: "Impressum", href: "/impressum", keywords: "impressum rechtliches" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const searchResults =
    searchQuery.length >= 2
      ? searchIndex
          .filter(
            (item) =>
              item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.keywords.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 7)
      : [];

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur",
        scrolled
          ? "bg-white/95 shadow-lg shadow-teal-900/10"
          : "bg-white/80"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#1DA499] flex items-center justify-center shadow-lg group-hover:shadow-[#1DA499]/30 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#1DA499] leading-none">Realschule</p>
              <p className="text-lg font-black text-[#1DA499] leading-none tracking-tight">Am Heimbach</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    pathname === item.href
                      ? "bg-[#1DA499] text-white"
                      : "text-slate-700 hover:bg-[#1DA499]/8 hover:text-[#1DA499]"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#1DA499] hover:text-white transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop: Suche + Anrufen + Krankmeldung */}
          <div className="hidden lg:flex items-center gap-2 lg:ml-6">
            {/* Suchicon + Popup */}
            <div ref={searchRef} className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Suche"
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                  searchOpen
                    ? "bg-[#1DA499] text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#1DA499]"
                )}
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }
                          if (e.key === "Enter" && searchResults.length > 0) {
                            handleSearchSelect(searchResults[0].href);
                          }
                        }}
                        placeholder="Seite suchen …"
                        className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {searchResults.length > 0 && (
                      <ul className="py-1.5">
                        {searchResults.map((item) => (
                          <li key={item.href}>
                            <button
                              onClick={() => handleSearchSelect(item.href)}
                              className="w-full text-left flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#1DA499] hover:text-white transition-colors duration-150"
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <p className="px-4 py-3 text-sm text-slate-400">Keine Ergebnisse für „{searchQuery}"</p>
                    )}

                    {searchQuery.length < 2 && (
                      <p className="px-4 py-3 text-xs text-slate-400">Mindestens 2 Zeichen eingeben …</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Anrufen – dezentes Icon neben der Suche */}
            <a
              href={schoolInfo.phoneLink}
              aria-label={`Anrufen: ${schoolInfo.phone}`}
              title={schoolInfo.phone}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#1DA499] transition-all duration-200"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>

            {/* Krankmeldung – gleiches Icon wie Suche/Anrufen, nur rot beim Hover */}
            <Link
              href="/krankmeldung"
              aria-label="Krankmeldung"
              title="Krankmeldung"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#e8442a] transition-all duration-200"
            >
              <Thermometer className="w-4.5 h-4.5" />
            </Link>
          </div>

          {/* Mobile: Krankmeldung + Suche + Anruf + Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/krankmeldung"
              aria-label="Krankmeldung"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e8442a] text-white shadow-md shadow-[#e8442a]/25"
            >
              <Thermometer className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Suche"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                searchOpen
                  ? "bg-[#1DA499] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href={schoolInfo.phoneLink}
              aria-label={`Anrufen: ${schoolInfo.phone}`}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#1DA499] transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Suchpopup */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                    if (e.key === "Enter" && searchResults.length > 0) {
                      handleSearchSelect(searchResults[0].href);
                    }
                  }}
                  placeholder="Seite suchen …"
                  autoFocus
                  className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {searchResults.length > 0 && (
                <ul className="mt-2 space-y-0.5">
                  {searchResults.map((item) => (
                    <li key={item.href}>
                      <button
                        onClick={() => handleSearchSelect(item.href)}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-[#1DA499] hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <p className="mt-2 px-3 py-2 text-sm text-slate-400">Keine Ergebnisse für „{searchQuery}"</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && !searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <Link
                href="/krankmeldung"
                className="flex items-center justify-center gap-2 mb-3 py-3.5 bg-[#e8442a] text-white font-bold rounded-xl shadow-md shadow-[#e8442a]/25"
              >
                <Thermometer className="w-5 h-5" /> Krankmeldung
              </Link>
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-[#1DA499] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-[#1DA499] hover:bg-teal-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <a
                  href={schoolInfo.phoneLink}
                  className="flex items-center justify-center gap-2 py-3 border-2 border-[#1DA499] text-[#1DA499] font-bold rounded-xl"
                >
                  <Phone className="w-4 h-4" /> {schoolInfo.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
