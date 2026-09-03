"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Utensils, Clock, Euro, Salad, FileText, X, ArrowRight, Printer } from "lucide-react";
import { mensaPlan, type MensaGericht } from "@/lib/data";

// Zusatzstoff-/Allergen-Kuerzel wie in der Vorlage des Caterers hochgestellt
// hinter den Namen -- die Aufloesung steht in der Legende unter dem Plan.
function Codes({ codes }: { codes: string[] }) {
  if (!codes.length) return null;
  return <sup className="ml-0.5 text-[9px] font-semibold text-[#1DA499]">{codes.join(",")}</sup>;
}

function Gericht({
  gericht,
  zeigeNaehrwerte,
}: {
  gericht: MensaGericht;
  zeigeNaehrwerte: boolean;
}) {
  return (
    <div className="print-avoid-break">
      <p className="font-bold text-slate-900 leading-snug">
        {gericht.name}
        <Codes codes={gericht.codes} />
      </p>
      {!!gericht.komponenten.length && (
        <ul className="mt-1.5 space-y-0.5">
          {gericht.komponenten.map((k, i) => (
            <li
              key={i}
              className={`text-[11px] leading-snug ${
                k.dge ? "font-semibold text-[#2e7d32]" : "text-slate-500"
              }`}
              title={k.dge ? "Hauptkomponente nach DGE-Qualitätsstandard" : undefined}
            >
              {k.text}
              <Codes codes={k.codes} />
            </li>
          ))}
        </ul>
      )}
      {zeigeNaehrwerte && gericht.naehrwerte && (
        <p className="mt-1.5 text-[10px] text-slate-400 leading-snug">{gericht.naehrwerte}</p>
      )}
    </div>
  );
}

export default function MensaPage() {
  const [planOpen, setPlanOpen] = useState(false);
  const [zeigeNaehrwerte, setZeigeNaehrwerte] = useState(false);
  // Das Popup wird per Portal direkt an <body> gehaengt, damit der Ausdruck
  // alles andere sauber ausblenden kann (siehe @media print in globals.css).
  // Erst nach dem Mounten rendern, sonst gibt es eine SSR-Abweichung.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hatPlan = mensaPlan.tage.some((t) => t.gerichte.length > 0);
  // Zwei Standard-Fusstexte des Caterers sind auf Wunsch ausgeblendet: die
  // DGE-Erklaerung (Logo-Werbung, ohne das Logo selbst wenig aussagekraeftig)
  // und der allgemeine Betriebsleiter-Disclaimer. Die Allergen-Legende und
  // der Hinweis auf die gruene Markierung selbst bleiben stehen.
  const AUSGEBLENDETE_HINWEISE = ["grün hinterlegten Komponenten", "Bei Fragen, Wünschen oder Anregungen"];
  const sichtbareHinweise = mensaPlan.hinweise.filter(
    (h) => !AUSGEBLENDETE_HINWEISE.some((muster) => h.includes(muster))
  );
  // Kategorien nicht hartkodieren, sondern aus dem Plan ableiten (in der
  // Reihenfolge, in der sie im Sheet stehen) -- so wirken neue oder
  // umbenannte Kategorien des Caterers ohne Code-Aenderung.
  const kategorien = Array.from(
    new Set(mensaPlan.tage.flatMap((t) => t.gerichte.map((g) => g.kategorie)))
  );

  return (
    <>
      {/* Hero */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Verpflegung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Unsere Mensa</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Eine gute Schule braucht gutes Essen – täglich frisch und ausgewogen, zubereitet von unserem Caterer Kette KochWerk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Mensa/9bfb5cca-0c91-4392-8628-aee8bce30cbb.jpg" alt="Frau Cigdem Kisaoglu – Leiterin unserer Schulküche" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mb-5">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">Wohlfühlen & Auftanken</span>
              <h2 className="text-4xl font-black text-[#0a5a54] mb-5">Gemeinsam essen, lachen, Energie tanken</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  In freundlicher Atmosphäre genießen unsere Schülerinnen und Schüler täglich frisch zubereitete, ausgewogene
                  Mahlzeiten. Wir legen Wert auf Qualität, Abwechslung und eine kindgerechte Auswahl.
                </p>
                <p>
                  Caterer ist das Team von <strong>Kette KochWerk</strong>. Die Leitung unserer Schulküche hat
                  <strong> Frau Cigdem Kisaoglu</strong>, die täglich mit viel Engagement für eine frische Verpflegung sorgt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zeiten & Preise */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center"><Clock className="w-5 h-5 text-white" /></div>
                <h3 className="text-xl font-black text-[#0a5a54]">Öffnungszeiten</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-slate-600">Frühstückspause</span>
                    <span className="block text-xs text-slate-500 mt-1">(u. a. frisch belegte Brötchen)</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block font-semibold text-slate-900 whitespace-nowrap">Mo – Fr · 10:20 – 10:45 Uhr</span>
                    <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wide bg-[#f5a623]/15 text-[#a86f14] px-2 py-0.5 rounded-full">
                      1. große Pause
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Mittagessen</span>
                  <span className="font-semibold text-slate-900">Mo, Mi, Do · 12:50 – 13:30 Uhr</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center"><Euro className="w-5 h-5 text-white" /></div>
                <h3 className="text-xl font-black text-[#0a5a54]">Menüpreise</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600">Schülerinnen und Schüler</span>
                  <span className="font-semibold text-slate-900">4,90 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Lehrerinnen und Lehrer</span>
                  <span className="font-semibold text-slate-900">5,50 €</span>
                </div>
              </div>
              <p className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                <Salad className="w-4 h-4 text-[#1DA499]" /> Inklusive Salat, Hauptspeise und Nachspeise.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPlanOpen(true)}
            className="mt-6 w-full group bg-[#0a5a54] hover:bg-[#0c6760] transition-colors rounded-3xl p-8 text-white text-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-2">Aktueller Speiseplan</h3>
            <p className="text-white/75 text-sm max-w-xl mx-auto">
              Unser Speiseplan informiert übersichtlich über die abwechslungsreichen Mahlzeiten der Woche.
            </p>
            <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#f5a623]">
              Speiseplan öffnen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Speiseplan-Modal: zeigt den aus dem Google-Sheet erzeugten Wochenplan */}
      {mounted && createPortal(
      <AnimatePresence>
        {planOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlanOpen(false)}
            id="speiseplan-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              id="speiseplan-print"
              className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Kopf */}
              <div className="gradient-hero px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-black text-lg leading-tight truncate">Speiseplan</h3>
                    {(mensaPlan.woche || mensaPlan.kw) && (
                      <p className="text-white/75 text-xs mt-0.5 truncate">
                        {mensaPlan.woche ? `Woche ${mensaPlan.woche}` : mensaPlan.kw}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 print-hidden">
                  {hatPlan && (
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 h-9 px-3 sm:px-4 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-bold"
                    >
                      <Printer className="w-4 h-4" />
                      <span className="hidden sm:inline">Drucken</span>
                    </button>
                  )}
                  <button
                    onClick={() => setPlanOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white"
                    aria-label="Schließen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {hatPlan ? (
                <div className="overflow-y-auto print-scroll">
                  {/* Wochenraster wie in der Vorlage des Caterers: Kategorien
                      als Zeilen, Wochentage als Spalten. */}
                  <div className="hidden md:block p-5">
                    <table className="w-full table-fixed border-collapse text-sm">
                      <colgroup>
                        <col className="w-[104px]" />
                        {mensaPlan.tage.map((tag) => (
                          <col key={tag.tag} />
                        ))}
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="border border-slate-200 bg-slate-50 px-2 py-2 text-left text-[11px] font-black uppercase tracking-wide text-slate-500">
                            &nbsp;
                          </th>
                          {mensaPlan.tage.map((tag) => (
                            <th
                              key={tag.tag}
                              className="border border-slate-200 bg-[#0a5a54] px-3 py-2 text-left align-bottom"
                            >
                              <span className="block text-white font-black leading-tight">{tag.tag}</span>
                              {tag.datum && (
                                <span className="block text-white/70 text-[11px] font-medium">{tag.datum}</span>
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {kategorien.map((kategorie) => (
                          <tr key={kategorie} className="align-top">
                            <th
                              scope="row"
                              className="border border-slate-200 bg-slate-50 px-2 py-3 text-left text-[11px] font-black uppercase tracking-wide text-[#0a5a54]"
                            >
                              {kategorie}
                            </th>
                            {mensaPlan.tage.map((tag) => {
                              const gericht = tag.gerichte.find((g) => g.kategorie === kategorie);
                              return (
                                <td key={tag.tag} className="border border-slate-200 px-3 py-3">
                                  {gericht ? (
                                    <Gericht gericht={gericht} zeigeNaehrwerte={zeigeNaehrwerte} />
                                  ) : (
                                    <span className="text-slate-300 text-xs">–</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobil: nach Tagen gestapelt, weil eine 5-Spalten-Tabelle
                      auf dem Handy nicht lesbar waere. */}
                  <div className="md:hidden p-4 space-y-4">
                    {mensaPlan.tage.map((tag) => (
                      <div key={tag.tag} className="rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="bg-[#0a5a54] px-4 py-2.5">
                          <span className="text-white font-black">{tag.tag}</span>
                          {tag.datum && <span className="text-white/70 text-xs ml-2">{tag.datum}</span>}
                        </div>
                        {tag.gerichte.length ? (
                          <div className="divide-y divide-slate-100">
                            {tag.gerichte.map((gericht, i) => (
                              <div key={i} className="px-4 py-3">
                                <span className="block text-[10px] font-black uppercase tracking-wide text-[#1DA499] mb-1">
                                  {gericht.kategorie}
                                </span>
                                <Gericht gericht={gericht} zeigeNaehrwerte={zeigeNaehrwerte} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="px-4 py-3 text-sm text-slate-400">Kein Mittagsangebot</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Hinweise & Legende */}
                  <div className="px-5 pb-6 space-y-4 text-[11px] leading-relaxed text-slate-600">
                    {sichtbareHinweise.map((hinweis, i) => (
                      <p key={i} className="print-avoid-break">
                        {hinweis}
                      </p>
                    ))}

                    {!!mensaPlan.legende.zusatzstoffe.length && (
                      <div className="print-avoid-break">
                        <h4 className="font-black text-[#0a5a54] uppercase tracking-wide mb-1">
                          Zusatzstoffe
                        </h4>
                        <p>
                          {mensaPlan.legende.zusatzstoffe
                            .map((e) => `${e.code} ${e.text}`)
                            .join(" · ")}
                        </p>
                      </div>
                    )}

                    {!!mensaPlan.legende.allergene.length && (
                      <div className="print-avoid-break">
                        <h4 className="font-black text-[#0a5a54] uppercase tracking-wide mb-1">
                          Allergene und daraus hergestellte Erzeugnisse
                        </h4>
                        <p>
                          {mensaPlan.legende.allergene
                            .map((e) => `${e.code} ${e.text}`)
                            .join(" · ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#0a5a54]/10 flex items-center justify-center mx-auto mb-5">
                    <Utensils className="w-6 h-6 text-[#0a5a54]" />
                  </div>
                  <p className="font-semibold text-slate-900">Hier erscheint bald der Speiseplan.</p>
                  <p className="text-sm text-slate-500 mt-2">Guten Appetit!</p>
                </div>
              )}

              {hatPlan && (
                <div className="shrink-0 border-t border-slate-100 px-5 py-3 flex items-center justify-between gap-4 print-hidden">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={zeigeNaehrwerte}
                      onChange={(e) => setZeigeNaehrwerte(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#0a5a54]"
                    />
                    Nährwerte anzeigen
                  </label>
                  <span className="text-[11px] text-slate-400 text-right">
                    Änderungen vorbehalten
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
