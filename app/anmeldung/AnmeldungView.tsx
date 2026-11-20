"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, FileText, Check, Download, Printer, Building2 } from "lucide-react";
import { getEnrollmentInfo } from "@/lib/schoolYear";

// Eine zusammengefasste PDF-Mappe (Checkliste + alle Formulare), liegt in public/.
const MAPPE_HREF = "/Anmeldemappe-Klasse-5.pdf";

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
  const { isOpen: enrollmentOpen, schoolYearLong, period } = getEnrollmentInfo();

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
                ? `Für das Schuljahr ${schoolYearLong} – ohne Termin, einfach zu den Anmeldezeiten vorbeikommen.`
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
                <h2 className="text-3xl font-black mb-4 leading-tight">Anmeldung Klasse 5<br />für das Schuljahr {schoolYearLong}</h2>

                <div className="flex items-start gap-3 bg-white/10 border border-[#f5a623]/40 rounded-2xl p-4 mb-5">
                  <Check className="w-5 h-5 text-[#f5a623] shrink-0 mt-0.5" />
                  <p className="text-sm text-white leading-relaxed">
                    <strong>Eine Terminvereinbarung ist nicht nötig.</strong>{" "}
                    Kommen Sie einfach zu den Anmeldezeiten im Sekretariat vorbei.
                  </p>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Liebe Eltern von Grundschulkindern: Die Anmeldung ist im unten genannten Zeitraum
                  persönlich im Sekretariat möglich – an allen Unterrichtstagen <strong>außer mittwochs</strong>.
                </p>
                <div className="bg-white/10 rounded-2xl p-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-bold text-[#f5a623]">
                    <Calendar className="w-4 h-4" /> Anmeldezeitraum {period}
                  </div>
                  <div className="text-white/80">08:00 – 12:00 Uhr</div>
                  <div className="text-white/60 text-xs">Der Tag der Anmeldung innerhalb dieses Zeitraums hat keinen Einfluss auf die Aufnahme.</div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
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
                <h3 className="font-black text-[#0a5a54] text-lg mb-5">In drei Schritten zur Anmeldung</h3>
                <ol className="space-y-4 mb-6">
                  {[
                    { icon: Download, t: "Anmeldemappe herunterladen", d: "Ein PDF mit Checkliste und allen Formularen." },
                    { icon: Printer, t: "Ausdrucken, ausfüllen, unterschreiben", d: "Die Checkliste auf dem ersten Blatt zeigt, was unterschrieben werden muss." },
                    { icon: Building2, t: "Zu den Anmeldezeiten ins Sekretariat", d: "Mappe und die Unterlagen unten mitbringen." },
                  ].map((st, i) => (
                    <li key={st.t} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#0a5a54] text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm text-slate-700 leading-snug">
                        <span className="block font-bold text-slate-900">{st.t}</span>
                        {st.d}
                      </span>
                    </li>
                  ))}
                </ol>
                <a
                  href={MAPPE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 mb-6 p-3.5 rounded-xl bg-[#e8442a]/10 border-2 border-[#e8442a]/40 hover:border-[#e8442a] hover:bg-[#e8442a]/15 transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg bg-[#e8442a] flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-white" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-bold text-slate-900">Anmeldemappe Klasse 5</span>
                    <span className="block text-xs text-[#e8442a] font-semibold">PDF herunterladen · 13 Blätter, einseitig drucken</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#e8442a] group-hover:translate-x-0.5 transition-transform" />
                </a>
                <h4 className="font-black text-[#0a5a54] mb-3">Zusätzlich mitbringen</h4>
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
                <p className="text-xs text-slate-500 font-bold mt-5 leading-relaxed">
                  Bei einer Hauptschulempfehlung bringen Sie Ihr Kind bitte mit – es erfolgt dann ein Beratungsgespräch.
                  Unterlagen bitte im Original und möglichst als Kopie mitbringen. Über die Website werden keine persönlichen Daten übertragen.
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
