"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Utensils, Users, Lightbulb, Dumbbell, Palette } from "lucide-react";

const angebote = [
  { icon: Dumbbell, title: "Sportliche Angebote", desc: "z. B. Rund um den Ball, Fußball – Bewegung und Sport für alle.", color: "from-blue-500 to-blue-700" },
  { icon: Palette, title: "Künstlerische Angebote", desc: "z. B. Malen und Zeichnen – kreative Entfaltung nach eigenen Interessen.", color: "from-rose-500 to-rose-700" },
  { icon: Lightbulb, title: "Kreativ-gestalterische Angebote", desc: "z. B. Arbeiten mit Pappmaché – handwerkliches und kreatives Gestalten.", color: "from-amber-500 to-amber-700" },
  { icon: Users, title: "Soziale Angebote", desc: "z. B. Gesellschaftsspiele – Teamgeist, Miteinander und soziales Lernen.", color: "from-cyan-500 to-cyan-700" },
];

export default function GanztagPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
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
                  Ergänzt wird der Unterricht durch den <strong>Wahlunterricht (WU)</strong> und eine „Bewegte Pause" in der Mittagspause –
                  getragen von Lehrkräften, der AWO, externen Partnern und ehrenamtlichen Unterstützern.
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/kaeng1.jpg" alt="Schülerinnen und Schüler mit Zertifikaten beim Schulprojekt" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wahlunterricht */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Wahlunterricht</span>
            <h2 className="text-4xl font-black text-[#0a5a54]">Interessen entdecken, Talente entfalten</h2>
            <p className="text-slate-600 mt-3">
              Der Wahlunterricht (WU) für die Jahrgänge 5 und 6 findet montags, mittwochs und donnerstags in der 6. Stunde
              (14:35–15:40 Uhr) statt. Die Schülerinnen und Schüler können – je nach Interesse – <strong>ein- bis dreimal pro Woche</strong> teilnehmen.
              Die Kurse werden <strong>halbjährlich neu gewählt</strong>, Anmeldungen sind für ein Halbjahr verbindlich.
              Ansprechpartnerin ist die Ganztagskoordinatorin <strong>Frau Fournes</strong>.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {angebote.map((angebot, i) => {
              const Icon = angebot.icon;
              return (
                <motion.div
                  key={angebot.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${angebot.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-[#0a5a54] mb-2">{angebot.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{angebot.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
