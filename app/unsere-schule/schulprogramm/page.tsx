"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, Target, Users, Lightbulb } from "lucide-react";

const pillars = [
  { icon: Target, title: "Individuelle Förderung", desc: "Jedes Kind wird nach seinen Stärken und Schwächen gefördert. Differenzierungsmaßnahmen sind fest im Schulalltag verankert." },
  { icon: Users, title: "Gemeinschaft & Inklusion", desc: "Wir leben Vielfalt. Gemeinsames Lernen aller Schüler*innen unabhängig von Herkunft oder Förderbedarf." },
  { icon: Lightbulb, title: "Kreativität & Projekte", desc: "Projektwochen, AGs und außerschulische Aktivitäten fördern soziale Kompetenzen und kreatives Denken." },
  { icon: BookOpen, title: "Digitale Bildung", desc: "Medienkompetenz und digitale Tools sind selbstverständlicher Teil unseres Unterrichts." },
];

export default function SchulprogrammPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Konzept</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schulprogramm</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Das Schulprogramm der Realschule Am Heimbach beschreibt unsere pädagogischen Ziele und Schwerpunkte.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Unsere Säulen</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Schwerpunkte unserer Schulentwicklung</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 flex gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-[#1a3a6b] mb-2">{p.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <BookOpen className="w-12 h-12 text-[#1a3a6b] mx-auto mb-5" />
            <h2 className="text-3xl font-black text-[#1a3a6b] mb-3">Schulprogramm als Download</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Das vollständige Schulprogramm der Realschule Am Heimbach steht Ihnen als PDF zur Verfügung.
            </p>
            <button className="inline-flex items-center gap-2 gradient-hero text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity hover:shadow-xl">
              <Download className="w-5 h-5" />
              Schulprogramm herunterladen (PDF)
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
