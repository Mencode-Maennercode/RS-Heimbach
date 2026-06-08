"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Utensils, Users, Lightbulb, Dumbbell, Music, Palette, Code, ArrowRight } from "lucide-react";

const ags = [
  { icon: Dumbbell, title: "Sport (Rund um den Ball)", desc: "Fußball und vielfältige Bewegungsangebote – auch in der „Bewegten Pause“.", color: "from-blue-500 to-blue-700" },
  { icon: Palette, title: "Malen & Zeichnen", desc: "Künstlerische Angebote und kreatives Gestalten nach Interesse.", color: "from-rose-500 to-rose-700" },
  { icon: Lightbulb, title: "Pappmaché & Werken", desc: "Kreativ-gestalterisches Arbeiten mit den Händen.", color: "from-amber-500 to-amber-700" },
  { icon: Users, title: "Gesellschaftsspiele", desc: "Soziale Angebote, die Teamgeist und Miteinander fördern.", color: "from-cyan-500 to-cyan-700" },
  { icon: Music, title: "Musik-AG", desc: "Chor, Band und gemeinsames Musizieren – Musik erleben und machen.", color: "from-purple-500 to-purple-700" },
  { icon: Code, title: "Informatik-AG", desc: "Programmieren, Robotik und digitale Kreativität.", color: "from-emerald-500 to-emerald-700" },
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
            <p className="text-white/85 text-xl max-w-2xl">
              Unterricht und sinnvolle Freizeitgestaltung Hand in Hand – an Montag, Mittwoch und Donnerstag bis 15:40 Uhr.
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
              <h2 className="text-4xl font-black text-[#0a5a54] mb-6 leading-tight">
                Lernen ohne Hetze –<br />mit Zeit für Tiefe
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Die Realschule Am Heimbach ist eine <strong>Ganztagsschule</strong>, in der Unterricht und Freizeit ineinandergreifen.
                  Unsere 60-Minuten-Stunden und das Lehrerraumprinzip schaffen Ruhe und Struktur im Schultag.
                </p>
                <p>
                  Ergänzt wird der Unterricht durch Wahlangebote, Arbeitsgemeinschaften und eine „Bewegte Pause“ – getragen von
                  Lehrkräften, der AWO, externen Partnern und ehrenamtlichen Unterstützern.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/unterricht/schulzeiten" className="inline-flex items-center gap-2 bg-[#1DA499] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#0a5a54] transition-colors">
                  <Clock className="w-4 h-4" /> Schulzeiten ansehen
                </Link>
                <Link href="/unterricht/mensa" className="inline-flex items-center gap-2 bg-white border-2 border-[#1DA499] text-[#1DA499] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#1DA499]/5 transition-colors">
                  <Utensils className="w-4 h-4" /> Zur Mensa
                </Link>
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

      {/* Wahlunterricht / AGs */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Wahlunterricht & AGs</span>
            <h2 className="text-4xl font-black text-[#0a5a54]">Interessen entdecken, Talente entfalten</h2>
            <p className="text-slate-600 mt-3">
              Der Wahlunterricht (WU) für die Jahrgänge 5 und 6 findet montags, mittwochs und donnerstags in der 6. Stunde
              (14:40 – 15:40 Uhr) statt – jahrgangsübergreifend und halbjährlich neu wählbar. Ansprechpartnerin ist die
              Ganztagskoordinatorin Frau Fournes.
            </p>
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
                  <h3 className="font-black text-xl text-[#0a5a54] mb-2">{ag.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{ag.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inklusion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a5a54] rounded-3xl p-10 md:p-14 text-white">
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

          <div className="text-center mt-12">
            <Link
              href="/unterricht"
              className="group inline-flex items-center gap-2 text-[#1DA499] font-bold text-sm hover:gap-3 transition-all"
            >
              Zurück zur Übersicht „Unterricht“
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
