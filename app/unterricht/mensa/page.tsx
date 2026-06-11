"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Utensils, Clock, Euro, Salad, FileText, X, Download, ArrowRight } from "lucide-react";

// Mock-Speiseplan – wird später durch das echte PDF des Caterers ersetzt
const speiseplan = [
  { tag: "Montag", gericht: "Spaghetti Bolognese mit Parmesan", beilage: "Blattsalat · Joghurt-Dessert" },
  { tag: "Dienstag", gericht: "Kein Mittagsangebot", beilage: "" },
  { tag: "Mittwoch", gericht: "Hähnchengeschnetzeltes mit Reis", beilage: "Gemüse der Saison · Obst" },
  { tag: "Donnerstag", gericht: "Gemüselasagne (vegetarisch)", beilage: "Rohkost · Pudding" },
  { tag: "Freitag", gericht: "Kein Mittagsangebot", beilage: "" },
];

export default function MensaPage() {
  const [planOpen, setPlanOpen] = useState(false);

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
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600">Frühstückspause</span>
                  <span className="font-semibold text-slate-900">Mo – Fr · 10:20 – 10:40 Uhr</span>
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

      {/* Speiseplan-Modal (PDF-Mock) */}
      <AnimatePresence>
        {planOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlanOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Kopf */}
              <div className="gradient-hero px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg leading-tight">Speiseplan</h3>
                    <p className="text-white/70 text-xs">Diese Woche · KW 24</p>
                  </div>
                </div>
                <button
                  onClick={() => setPlanOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white"
                  aria-label="Schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Inhalt */}
              <div className="p-6 overflow-y-auto">
                <div className="space-y-3">
                  {speiseplan.map((tag) => (
                    <div
                      key={tag.tag}
                      className={`rounded-2xl p-4 ${tag.beilage ? "bg-[#f8f9ff]" : "bg-slate-50"}`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a]">{tag.tag}</span>
                      </div>
                      {tag.beilage ? (
                        <>
                          <p className="font-semibold text-slate-900 mt-1">{tag.gericht}</p>
                          <p className="text-sm text-slate-500 mt-0.5">{tag.beilage}</p>
                        </>
                      ) : (
                        <p className="text-sm text-slate-400 italic mt-1">{tag.gericht}</p>
                      )}
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-[#0a5a54] hover:bg-[#0c6760] transition-colors text-white font-bold rounded-2xl py-3 text-sm"
                >
                  <Download className="w-4 h-4" /> Als PDF herunterladen
                </a>
                <p className="text-center text-xs text-slate-400 mt-3">
                  Beispielansicht – der aktuelle Plan wird wöchentlich vom Caterer Kette KochWerk bereitgestellt.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
