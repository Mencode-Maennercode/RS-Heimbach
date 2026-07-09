"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, FileText, Check } from "lucide-react";

const anmeldungDocs = [
  "Geburtsurkunde",
  "Endjahreszeugnis des 3. Schuljahres",
  "Halbjahreszeugnis des 4. Schuljahres",
  "Original-Anmeldeschein der Grundschule",
  "Kompetenzbeurteilung der Troisdorfer Grundschulen",
  "Nachweis über den Masern-Impfschutz",
  "ggf. Sorgeberechtigungsnachweis",
];

export default function AnmeldungPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Anmeldung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Anmeldung Klasse 5</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Für das Schuljahr 2026/2027 – alle Termine und Unterlagen auf einen Blick.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-lg border border-[#1DA499]/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Linke Seite: Termine */}
              <div className="bg-[#0a5a54] p-8 md:p-10 text-white">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
                  <FileText className="w-4 h-4" /> Anmeldung
                </span>
                <h2 className="text-3xl font-black mb-4 leading-tight">Anmeldung Klasse 5<br />für das Schuljahr 2026/2027</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Liebe Eltern von Grundschulkindern: Die Anmeldungen werden im Sekretariat entgegengenommen –
                  an allen Unterrichtstagen <strong>außer mittwochs</strong>.
                </p>
                <div className="bg-white/10 rounded-2xl p-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-bold text-[#f5a623]">
                    <Calendar className="w-4 h-4" /> Mo, 23.02.2026 – Fr, 19.03.2026
                  </div>
                  <div className="text-white/80">08:00 – 13:00 Uhr (montags nur bis 12:00 Uhr)</div>
                  <div className="text-white/60 text-xs">Der Tag der Anmeldung innerhalb dieses Zeitraums hat keinen Einfluss auf die Aufnahme.</div>
                </div>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 mt-6 bg-[#1DA499] hover:bg-[#17a89d] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Kontakt & Beratung <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Rechte Seite: Unterlagen */}
              <div className="bg-white p-8 md:p-10">
                <h3 className="font-black text-[#0a5a54] text-lg mb-4">Bitte zur Anmeldung mitbringen</h3>
                <ul className="space-y-2.5">
                  {anmeldungDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#1DA499]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#1DA499]" />
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-5 leading-relaxed">
                  Bei einer Hauptschulempfehlung bringen Sie Ihr Kind bitte mit – es erfolgt dann ein Beratungsgespräch.
                  Unterlagen bitte im Original und möglichst als Kopie mitbringen.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            Weitere Fragen? Zur Kontaktseite <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
