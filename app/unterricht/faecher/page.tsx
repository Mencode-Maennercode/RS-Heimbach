"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Info, ArrowRight } from "lucide-react";

const subjects = [
  { name: "Deutsch", icon: "📚" },
  { name: "Mathematik", icon: "📐" },
  { name: "Englisch", icon: "🌍" },
  { name: "Biologie", icon: "🌱" },
  { name: "Chemie", icon: "🧪" },
  { name: "Physik", icon: "⚡" },
  { name: "Geschichte", icon: "🏛️" },
  { name: "Erdkunde", icon: "🗺️" },
  { name: "Politik/Wirtschaft", icon: "⚖️" },
  { name: "Religion / Praktische Philosophie", icon: "🕊️" },
  { name: "Kunst", icon: "🎨" },
  { name: "Musik", icon: "🎵" },
  { name: "Sport", icon: "⚽" },
  { name: "Informatik", icon: "💻" },
  { name: "Technik", icon: "🔧" },
];

const diffCourses = [
  { name: "Französisch", desc: "Eine weitere Fremdsprache – internationale Kommunikation und neue schulische Wege." },
  { name: "Informatik", desc: "Grundlagen der Programmierung, digitale Medien, Datenverarbeitung und informatisches Denken." },
  { name: "Kunst", desc: "Vertiefung kreativer Techniken, gestalterische Projekte und Auseinandersetzung mit Medien." },
  { name: "Naturwissenschaften", desc: "Praxisorientiertes, experimentelles Arbeiten in Biologie, Chemie und Physik." },
  { name: "Sozialwissenschaften", desc: "Gesellschaftliche, politische und wirtschaftliche Zusammenhänge verstehen und reflektieren." },
  { name: "Technik", desc: "Technisches Planen und Konstruieren, Arbeiten mit Materialien, Einblicke in technische Berufe." },
];

export default function FaecherPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Unterricht</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Fächer & Differenzierung</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Eine breite Fächervielfalt – und ab Klasse 7 ein eigener Schwerpunkt nach Interesse und Neigung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fächer-Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Unsere Fächer</span>
            <h2 className="text-4xl font-black text-[#0a5a54]">Was bei uns unterrichtet wird</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#f8f9ff] rounded-2xl p-5 text-center hover:bg-[#1DA499] hover:text-white transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-white">{s.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differenzierung ab Klasse 7 */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Schwerpunkt ab Klasse 7</span>
            <h2 className="text-4xl font-black text-[#0a5a54] mb-5">Das Differenzierungsfach</h2>
            <p className="text-slate-600 leading-relaxed">
              Nach der Erprobungsstufe (Klasse 5 und 6) wählen unsere Schülerinnen und Schüler mit Beginn der Klasse 7 ein
              <strong> viertes Hauptfach</strong>. Es begleitet sie verbindlich bis zum Ende der Klasse 10, ist versetzungswirksam
              und wird im Umfang eines Hauptfaches im Kurssystem unterrichtet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diffCourses.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mb-5 shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-xl text-[#0a5a54] mb-2">{c.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-3xl p-7 flex items-start gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-[#1DA499]/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-[#1DA499]" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong className="text-slate-800">Information &amp; Beratung:</strong> Im zweiten Halbjahr der Klasse 6 stellen wir
              die Fächer in einer Informationsveranstaltung für Eltern, Schülerinnen und Schüler vor – mit einer fundierten
              Entscheidungsgrundlage und Raum für individuelle Fragen.
            </p>
          </div>

          <Link
            href="/beratung"
            className="group inline-flex items-center gap-2 mt-8 bg-[#1DA499] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0a5a54] transition-all duration-300 hover:shadow-xl"
          >
            Zur Schulberatung
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
