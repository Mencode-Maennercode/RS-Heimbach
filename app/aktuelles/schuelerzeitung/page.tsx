"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Newspaper, Download, Calendar, Users } from "lucide-react";

const editions = [
  { number: 5, title: "Heimbachbote – 5. Ausgabe", date: "Dezember 2024", pages: 16, topics: ["SV-News", "Interviews", "Sport", "Kunst-Projekt"] },
  { number: 4, title: "Heimbachbote – 4. Ausgabe", date: "März 2024", pages: 14, topics: ["Ausflüge", "Känguru-Mathe", "Schulleben", "Rezepte"] },
  { number: 3, title: "Heimbachbote – 3. Ausgabe", date: "Oktober 2023", pages: 12, topics: ["Zirkusprojekt", "Neue Lehrer", "Fotostrecke"] },
  { number: 2, title: "Heimbachbote – 2. Ausgabe", date: "März 2023", pages: 14, topics: ["Erfinder-AG", "Sport-Events", "Rätselseite"] },
  { number: 1, title: "Heimbachbote – 1. Ausgabe", date: "November 2022", pages: 10, topics: ["Schulstart", "Vorstellung Redaktion", "Erstes Interview"] },
];

export default function SchuelerzeitungPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Medien</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schülerzeitung</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Der Heimbachbote – die Schülerzeitung der Realschule Am Heimbach. Von Schüler*innen für Schüler*innen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3 block">Über uns</span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-5">Der Heimbachbote</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Der Heimbachbote ist die offizielle Schülerzeitung der Realschule Am Heimbach.
                  Seit 2022 berichten unsere jungen Redakteur*innen über Schulneuigkeiten, führen
                  Interviews, kommentieren Sportevents und gestalten die Zeitung von A bis Z selbst.
                </p>
                <p>
                  Wer Lust hat, in der Redaktion mitzumachen, ist herzlich willkommen! Schreibtalente,
                  Fotografen, Layouter und Interviewprofis gesucht.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-7">
                {[{ icon: Newspaper, value: "5", label: "Ausgaben" }, { icon: Users, value: "12", label: "Redakteur*innen" }, { icon: Calendar, value: "2022", label: "Gegründet" }].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-2 bg-[#f8f9ff] rounded-xl px-4 py-3">
                      <Icon className="w-4 h-4 text-[#1a3a6b]" />
                      <div>
                        <div className="text-lg font-black text-[#1a3a6b]">{s.value}</div>
                        <div className="text-xs text-slate-500">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&h=700&fit=crop" alt="Schülerzeitung" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editions */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Archiv</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Alle Ausgaben</h2>
          </motion.div>
          <div className="space-y-4">
            {editions.map((ed, i) => (
              <motion.div
                key={ed.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center text-white font-black text-xl shrink-0">
                    #{ed.number}
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{ed.title}</div>
                    <div className="text-sm text-slate-500 mb-2">{ed.date} · {ed.pages} Seiten</div>
                    <div className="flex flex-wrap gap-1.5">
                      {ed.topics.map((t) => (
                        <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[#1a3a6b] border-2 border-[#1a3a6b] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a3a6b] hover:text-white transition-all shrink-0">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
