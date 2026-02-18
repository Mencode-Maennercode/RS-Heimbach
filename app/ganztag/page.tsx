"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Utensils, BookOpen, Users, Lightbulb, Dumbbell, Music, Palette, Code } from "lucide-react";
import { scheduleData } from "@/lib/data";

const ags = [
  { icon: Dumbbell, title: "Sport-AG", desc: "Verschiedene Sportarten und Fitness-Training für alle Jahrgangsstufen", color: "from-blue-500 to-blue-700" },
  { icon: Music, title: "Musik-AG", desc: "Chor, Band und Instrumentalunterricht – Musik erleben und machen", color: "from-purple-500 to-purple-700" },
  { icon: Palette, title: "Kunst-AG", desc: "Zeichnen, Malen, Gestalten – kreative Selbstentfaltung", color: "from-rose-500 to-rose-700" },
  { icon: Code, title: "Informatik-AG", desc: "Programmieren, Robotik und digitale Kreativität", color: "from-emerald-500 to-emerald-700" },
  { icon: Lightbulb, title: "Erfinder-AG", desc: "Technische Projekte und kreative Problemlösungen im Alltag", color: "from-amber-500 to-amber-700" },
  { icon: Users, title: "Theater-AG", desc: "Schauspiel, Improvisation und Bühnenpräsenz", color: "from-cyan-500 to-cyan-700" },
];

const subjects = [
  { name: "Deutsch", icon: "📚" },
  { name: "Mathematik", icon: "📐" },
  { name: "Englisch", icon: "🌍" },
  { name: "Biologie", icon: "🌱" },
  { name: "Chemie", icon: "🧪" },
  { name: "Physik", icon: "⚡" },
  { name: "Geschichte", icon: "🏛️" },
  { name: "Erdkunde", icon: "🗺️" },
  { name: "Kunst", icon: "🎨" },
  { name: "Musik", icon: "🎵" },
  { name: "Sport", icon: "⚽" },
  { name: "Informatik", icon: "💻" },
];

export default function GanztagPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=500&fit=crop" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Schulkonzept</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Gebundener Ganztag</h1>
            <p className="text-white/80 text-xl max-w-2xl">
              Fünf-Tage-Woche mit 60-Minuten-Stunden, Lehrerraumprinzip und einer modernen Lernkultur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">Unser Konzept</span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-6 leading-tight">
                Lernen ohne Hetze –<br />mit Zeit für Tiefe
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Die Realschule Am Heimbach arbeitet nach dem <strong>Lehrerraumprinzip</strong>: Jede Lehrkraft hat ihren eigenen,
                  fachspezifisch eingerichteten Unterrichtsraum. Die Schülerinnen und Schüler wechseln zwischen den Stunden
                  den Raum – das fördert Selbstständigkeit und gibt jedem Fach seinen eigenen Charakter.
                </p>
                <p>
                  Unsere <strong>60-Minuten-Stunden</strong> ermöglichen tieferes Eintauchen in Themen. Weniger Unterbrechungen,
                  mehr Konzentration, bessere Ergebnisse. Der Ganztagsbetrieb läuft an Montag, Mittwoch und Donnerstag
                  bis 15:40 Uhr.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=700&fit=crop" alt="Unterricht" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section id="zeiten" className="py-24 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Stundenplan</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Unterrichtszeiten</h2>
          </motion.div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            {scheduleData.map((row, i) => (
              <motion.div
                key={row.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-center justify-between px-7 py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#f8f9ff]"
                } ${row.period.includes("pause") || row.period.includes("Anfang") ? "border-l-4 border-[#f5a623]" : "border-l-4 border-transparent"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                    row.period.includes("pause") || row.period.includes("Anfang") ? "bg-[#f5a623]" : "gradient-hero"
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{row.period}</div>
                    {row.note && <div className="text-xs text-slate-500">{row.note}</div>}
                  </div>
                </div>
                <div className="text-slate-700 font-semibold text-sm">{row.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section id="faecher" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Unterricht</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Unsere Fächer</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#f8f9ff] rounded-2xl p-5 text-center hover:bg-[#1a3a6b] hover:text-white transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-white">{s.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wahlunterricht / AGs */}
      <section id="wahl" className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Wahlunterricht</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">AGs & Projekte</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Schülerinnen und Schüler wählen nach Interessen – für Tiefe statt Breite.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ags.map((ag, i) => {
              const Icon = ag.icon;
              return (
                <motion.div
                  key={ag.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ag.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-[#1a3a6b] mb-2">{ag.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{ag.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mensa */}
      <section id="mensa" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=900&h=700&fit=crop" alt="Mensa" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mb-5">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">Verpflegung</span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-5">Unsere Mensa</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  In unserer modernen Mensa werden täglich frische Mahlzeiten für alle Schülerinnen und Schüler zubereitet.
                  Das Angebot umfasst ein Hauptgericht, vegetarische Alternativen und eine Salatbar.
                </p>
                <div className="bg-[#f8f9ff] rounded-2xl p-5">
                  <h4 className="font-bold text-slate-900 mb-3">Mensazeiten:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Frühstückspause:</span><span className="font-semibold">Mo bis Do | 10:20 – 10:40 Uhr</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Mittagessen:</span><span className="font-semibold">Mo, Mi, Do | 12:50 – 13:30 Uhr</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inklusion */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a3a6b] rounded-3xl p-10 md:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Gemeinsames Lernen</span>
                <h2 className="text-4xl font-black mb-5">Inklusion an der RS Heimbach</h2>
                <p className="text-white/80 leading-relaxed">
                  Wir glauben daran, dass alle Kinder gemeinsam lernen können. Mit 5 Sonderpädagog*innen
                  begleiten wir Schülerinnen und Schüler mit besonderem Förderbedarf individuell und professionell
                  auf ihrem ganz persönlichen Lernweg.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "5", label: "Sonderpädagog*innen" },
                  { value: "100%", label: "Barrierefreier Zugang" },
                  { value: "Individuell", label: "Förderpläne für jedes Kind" },
                  { value: "Gemeinsam", label: "Lernen in einem Klassenverband" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-2xl p-5 text-center">
                    <div className="text-2xl font-black text-[#f5a623] mb-1">{item.value}</div>
                    <div className="text-white/70 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
