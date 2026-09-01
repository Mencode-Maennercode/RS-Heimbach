"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Compass,
  Briefcase,
  GraduationCap,
  Globe,
  HeartHandshake,
  Flame,
  CheckCircle2,
} from "lucide-react";

const jahrgaenge = [
  {
    stufe: "Klasse 5 & 6",
    titel: "Ankommen & Gemeinschaft",
    farbe: "from-[#1DA499] to-[#0a5a54]",
    icon: Users,
    akzent: "text-[#1DA499]",
    bg: "bg-teal-50",
    punkte: [
      "Zwei Orientierungstage direkt nach Schulbeginn",
      "\"Skills 4 Life\" - 3-tägiges Programm in der Jugendherberge Bad Honnef",
      "Teambildung und Gewaltprävention",
      "Classroom-Management mit Fokus auf Konfliktlösung",
    ],
  },
  {
    stufe: "Klasse 7",
    titel: "Verantwortung übernehmen",
    farbe: "from-blue-500 to-blue-700",
    icon: Shield,
    akzent: "text-blue-600",
    bg: "bg-blue-50",
    punkte: [
      "Girls' Day / Boys' Day",
      "Einwöchige Klassenfahrt - Sport & Freizeitgestaltung",
      "Ausbildung zu Streitschlichter·innen (1. Halbjahr), Einsatz ab 2. Halbjahr",
      "Suchtprävention",
    ],
  },
  {
    stufe: "Klasse 8",
    titel: "Stärken entdecken",
    farbe: "from-amber-500 to-amber-700",
    icon: Compass,
    akzent: "text-amber-600",
    bg: "bg-amber-50",
    punkte: [
      "Potenzialanalyse / Kompetenzcheck",
      "Dreitägiges Berufspraktikum",
      "Ausbildung zu Schulsanitäter·innen",
      "Streitschlichtung & Antimobbingprojekte",
      "Peersystem",
    ],
  },
  {
    stufe: "Klasse 9",
    titel: "Berufs- & Praxiserfahrung",
    farbe: "from-violet-500 to-violet-700",
    icon: Briefcase,
    akzent: "text-violet-600",
    bg: "bg-violet-50",
    punkte: [
      "Berufsberatung durch das Jugendbüro Troisdorf",
      "Dreiwöchiges Berufspraktikum vor den Herbstferien",
      "Sanitätereinsatz",
    ],
  },
  {
    stufe: "Klasse 10",
    titel: "Abschluss & Zukunft",
    farbe: "from-rose-500 to-rose-700",
    icon: GraduationCap,
    akzent: "text-rose-600",
    bg: "bg-rose-50",
    punkte: [
      "Kontinuierliche Berufsberatung",
      "Assessment-Center-Training",
      "Abschlussklassenfahrt",
      "Fußballturnier & Abschlussfeier",
    ],
  },
];

const uebergreifend = [
  { icon: HeartHandshake, titel: "Schulgottesdienste", desc: "Monatlich für die Klassen 5-7" },
  { icon: Flame, titel: "Fußballturnier", desc: "Für alle Klassen 5-9" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" } }),
};

export default function ProjektePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-[#f5a623] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
              Schulalltag
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Projekte & Programme</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Von Klasse 5 bis zum Abschluss: gezielte Projekte, die Schüler·innen stärken, begleiten und auf das Leben vorbereiten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jahrgangskarten */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">
              Jahrgangsstufen im Überblick
            </span>
            <h2 className="text-4xl font-black text-[#0a5a54]">Was erwartet uns in welcher Klasse?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {jahrgaenge.map((j, i) => {
              const Icon = j.icon;
              return (
                <motion.div
                  key={j.stufe}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 overflow-hidden group"
                >
                  {/* Farbstreifen oben */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${j.farbe}`} />
                  <div className="p-7">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${j.farbe} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-widest ${j.akzent}`}>{j.stufe}</p>
                        <h3 className="text-lg font-black text-[#0a5a54] leading-tight">{j.titel}</h3>
                      </div>
                    </div>

                    {/* Punkte */}
                    <ul className="space-y-2.5">
                      {j.punkte.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${j.akzent}`} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}

            {/* Jahrgangsübergreifend */}
            <motion.div
              custom={jahrgaenge.length}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 overflow-hidden group md:col-span-2 xl:col-span-1"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-slate-400 to-slate-600" />
              <div className="p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Alle Jahrgänge</p>
                    <h3 className="text-lg font-black text-[#0a5a54] leading-tight">Jahrgangsübergreifend</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {uebergreifend.map((u) => {
                    const UIcon = u.icon;
                    return (
                      <div key={u.titel} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                          <UIcon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{u.titel}</p>
                          <p className="text-xs text-slate-500">{u.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#1DA499]/10 mb-6">
              <HeartHandshake className="w-8 h-8 text-[#1DA499]" />
            </div>
            <h2 className="text-3xl font-black text-[#0a5a54] mb-3">Fragen zu unseren Projekten?</h2>
            <p className="text-slate-600 mb-7">
              Unser Beratungsteam informiert Sie gerne über alle Programme und Angebote.
            </p>
            <a
              href="/beratung"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1DA499] hover:bg-[#0a5a54] text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-[#1DA499]/25"
            >
              Zur Schulberatung
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
