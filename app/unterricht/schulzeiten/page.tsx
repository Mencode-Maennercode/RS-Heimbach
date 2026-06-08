"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, AlertTriangle, DoorOpen, ArrowRight } from "lucide-react";
import { scheduleData, kurzstundenData } from "@/lib/data";

function Timetable({ rows, accent }: { rows: { period: string; time: string; note?: string }[]; accent: string }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      {rows.map((row, i) => {
        const isPause = row.period.toLowerCase().includes("pause");
        return (
          <div
            key={`${row.period}-${i}`}
            className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f9ff]"} ${
              isPause ? "border-l-4 border-[#f5a623]" : "border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${isPause ? "bg-[#f5a623]" : accent}`}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{row.period}</div>
                {row.note && <div className="text-xs text-slate-500">{row.note}</div>}
              </div>
            </div>
            <div className="text-slate-700 font-semibold text-sm whitespace-nowrap">{row.time}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function SchulzeitenPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Unterricht</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schulzeiten & Stundenraster</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Unterricht in 60-Minuten-Zeitstunden – verlässlich, klar rhythmisiert und mit Zeit für Tiefe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Konzept 60-Minuten */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">Unterricht in Zeitstunden</span>
          <h2 className="text-3xl font-black text-[#0a5a54] mb-5">Eine Stunde, die wirklich 60 Minuten dauert</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Der Unterricht an unserer Schule findet in <strong>60-Minuten-Stunden (Zeitstunden)</strong> statt. Diese klare
              Zeitstruktur schafft Verlässlichkeit und sorgt für einen ruhigen, gut rhythmisierten Schultag.
            </p>
            <p>
              Die längeren Unterrichtseinheiten ermöglichen es, Themen intensiver zu behandeln und Arbeitsphasen ohne Zeitdruck
              umzusetzen. So bleibt ausreichend Raum für Erklärungen, Übungsphasen, kooperative Lernformen und individuelle Förderung.
            </p>
          </div>
        </div>
      </section>

      {/* Zeiten + Kurzstunden */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-black text-[#0a5a54] mb-2">Unterrichtszeiten</h3>
              <p className="text-slate-500 text-sm mb-5">Regulärer Schultag (Ganztag Mo, Mi, Do bis 15:40 Uhr).</p>
              <Timetable rows={scheduleData} accent="gradient-hero" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#0a5a54] mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#f5a623]" /> Kurzstundenraster
              </h3>
              <p className="text-slate-500 text-sm mb-5">Bei extremer Witterung, Veranstaltungen oder organisatorischen Erfordernissen – wird frühzeitig angekündigt.</p>
              <Timetable rows={kurzstundenData} accent="bg-[#0a5a54]" />
            </div>
          </div>
        </div>
      </section>

      {/* Fach- und Lehrerraumprinzip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shrink-0">
              <DoorOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-1">Raumkonzept</span>
              <h2 className="text-3xl font-black text-[#0a5a54]">Fach- und Lehrerraumprinzip</h2>
            </div>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Der Unterricht findet in speziell ausgestatteten <strong>Fachräumen</strong> statt; die Lehrkräfte unterrichten in
              ihren jeweiligen Räumen. Die Schülerinnen und Schüler wechseln zu Beginn jeder Stunde den Raum.
            </p>
            <p>
              Jeder Fachraum ist auf sein Unterrichtsfach abgestimmt – moderne Medien und fachspezifische Materialien schaffen
              optimale Lernbedingungen. Der regelmäßige Raumwechsel fördert Bewegung und stärkt Pünktlichkeit, Organisation und
              Eigenverantwortung.
            </p>
          </div>

          <Link
            href="/ganztag"
            className="group inline-flex items-center gap-2 mt-8 bg-[#1DA499] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0a5a54] transition-all duration-300 hover:shadow-xl"
          >
            Mehr zum Ganztag & Wahlunterricht
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
