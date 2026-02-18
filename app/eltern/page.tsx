"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Calendar, Users, MessageSquare, FileText, ArrowRight } from "lucide-react";

const downloads = [
  { title: "Schulordnung RS Heimbach", type: "PDF", size: "245 KB" },
  { title: "Informationsblatt für neue Fünftklässler", type: "PDF", size: "380 KB" },
  { title: "Anmeldeformular Klasse 5", type: "PDF", size: "190 KB" },
  { title: "Schulprogramm 2024/25", type: "PDF", size: "1.2 MB" },
  { title: "WU-Angebote 2024/25", type: "PDF", size: "310 KB" },
  { title: "Stundenpläne aktuelles Halbjahr", type: "PDF", size: "220 KB" },
];

const resources = [
  {
    icon: Calendar,
    title: "Elternsprechtage",
    desc: "Termine für persönliche Gespräche mit den Fachlehrer*innen Ihres Kindes finden Sie im Schulkalender.",
    href: "/veranstaltungen",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Users,
    title: "Elternpflegschaft",
    desc: "Werden Sie aktiv in der Schulgemeinschaft. Die Klassenpflegschaft vertritt die Interessen der Eltern.",
    href: "/unsere-schule",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: MessageSquare,
    title: "Schulberatung",
    desc: "Bei Fragen und Problemen stehen unsere Beratungslehrkräfte und die Schulleitung zur Verfügung.",
    href: "/beratung",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: FileText,
    title: "Downloads & Formulare",
    desc: "Alle wichtigen Formulare, Informationsblätter und das Schulprogramm als Download.",
    href: "/service",
    color: "from-orange-500 to-orange-700",
  },
];

export default function ElternPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Familie & Schule</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Für Eltern</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Informationen, Downloads und alles Wissenswerte für Eltern unserer Schülerinnen und Schüler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Überblick</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Elternservice</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={r.href} className="group block bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 h-full">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-[#1a3a6b] mb-2">{r.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-[#1a3a6b] font-bold text-sm">
                      Mehr erfahren <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Service</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Downloads & Formulare</h2>
          </motion.div>
          <div className="space-y-3">
            {downloads.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group flex items-center justify-between p-5 bg-[#f8f9ff] rounded-2xl hover:bg-[#1a3a6b] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e8442a] flex items-center justify-center text-white text-xs font-black">
                    {d.type}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-white transition-colors text-sm">{d.title}</div>
                    <div className="text-xs text-slate-500 group-hover:text-white/60 transition-colors">{d.size}</div>
                  </div>
                </div>
                <Download className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important info */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a3a6b] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-black mb-4">Anmeldung für das Schuljahr 2026/27</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              Die Anmeldung für neue Fünftklässler für das Schuljahr 2026/27 findet statt.
              Bitte bringen Sie folgende Unterlagen mit: Halbjahreszeugnis Klasse 4,
              Grundschulempfehlung und ausgefülltes Anmeldeformular.
            </p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-[#f5a623] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
              Jetzt informieren <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
