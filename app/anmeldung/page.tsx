"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, FileText, Check, AlertTriangle, Phone } from "lucide-react";
import { schoolInfo } from "@/lib/data";
import { getEnrollmentInfo } from "@/lib/schoolYear";

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
  const { isOpen: enrollmentOpen } = getEnrollmentInfo();

  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Anmeldung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Anmeldung Klasse 5</h1>
            <p className="text-white/80 text-xl max-w-xl">
              {enrollmentOpen
                ? "Für das Schuljahr 2026/2027 – ausschließlich nach vorheriger Terminvereinbarung."
                : "Der Anmeldezeitraum ist aktuell nicht geöffnet."}
            </p>
          </motion.div>
        </div>
      </section>

      {!enrollmentOpen && (
        <section className="py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0a5a54]/10 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-[#0a5a54]" />
            </div>
            <h2 className="text-2xl font-black text-[#1a3a6b] mb-3">Aktuell keine Anmeldungen möglich</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Die Anmeldung für die 5. Klasse ist jedes Jahr von November bis April möglich. Schauen Sie in
              diesem Zeitraum wieder vorbei — bei dringenden Fragen erreichen Sie uns über die Kontaktseite.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-[#1a3a6b] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Zur Kontaktseite <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {enrollmentOpen && (
      <>
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

                <div className="flex items-start gap-3 bg-[#e8442a]/15 border border-[#f5a623]/40 rounded-2xl p-4 mb-5">
                  <AlertTriangle className="w-5 h-5 text-[#f5a623] shrink-0 mt-0.5" />
                  <p className="text-sm text-white leading-relaxed">
                    <strong>Anmeldungen sind ausschließlich nach vorheriger Terminvereinbarung möglich.</strong>{" "}
                    Bitte kommen Sie nicht ohne Termin vorbei – rufen Sie vorher im Sekretariat an.
                  </p>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Liebe Eltern von Grundschulkindern: Vereinbaren Sie telefonisch im Sekretariat einen Termin –
                  an allen Unterrichtstagen <strong>außer mittwochs</strong> erreichbar.
                </p>
                <div className="bg-white/10 rounded-2xl p-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-bold text-[#f5a623]">
                    <Calendar className="w-4 h-4" /> Termine im Zeitraum Mo, 23.02.2026 – Fr, 19.03.2026
                  </div>
                  <div className="text-white/80">08:00 – 13:00 Uhr (montags nur bis 12:00 Uhr)</div>
                  <div className="text-white/60 text-xs">Der Tag des vereinbarten Termins innerhalb dieses Zeitraums hat keinen Einfluss auf die Aufnahme.</div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={schoolInfo.phoneLink}
                    className="inline-flex items-center gap-2 bg-[#1DA499] hover:bg-[#17a89d] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Termin telefonisch vereinbaren
                  </a>
                  <a
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    Kontakt & Beratung <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
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
      )}
    </>
  );
}
