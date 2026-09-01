"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Users, ChevronRight, CheckCircle2 } from "lucide-react";

const tasks = [
  "Interessen der Eltern gegenüber Schulleitung und Lehrkräften vertreten",
  "Mitsprache in Schulkonferenzen und schulischen Gremien",
  "Förderung des Austauschs zwischen Eltern und Schule",
  "Vermittlung bei Fragen oder Anliegen aus der Elternschaft",
  "Schulveranstaltungen aktiv mitgestalten und unterstützen",
];

const reasons = [
  { label: "Schulleben mitgestalten", desc: "Eigene Ideen einbringen und das Miteinander prägen" },
  { label: "Einblick gewinnen", desc: "Schulische Entscheidungsprozesse verstehen und begleiten" },
  { label: "Transparenz stärken", desc: "Offene Kommunikation zwischen Eltern und Schule fördern" },
  { label: "Bildung fördern", desc: "Die Erziehungs- und Bildungsarbeit der Schule aktiv stärken" },
];

export default function SchulpflegschaftPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Eltern</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schulpflegschaft</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Ihre gewählten Vertreterinnen – Stimme der Elternschaft an der Realschule Am Heimbach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vorstand + Kontakt */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Bild */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/Weitere%20Bilder/Elternvertretung.jpg"
                  alt="Schulpflegschaft der Realschule Am Heimbach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Vorstand</span>
                <h2 className="text-3xl font-black text-[#1a3a6b] mb-5">Ihre Ansprechpartnerinnen</h2>

                <div className="space-y-3">
                  {["Melanie Viehöver", "Bettina Schmitz"].map((name) => (
                    <div key={name} className="flex items-center gap-3 p-4 bg-[#f8f9ff] rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#1DA499] flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1a3a6b]">{name}</div>
                        <div className="text-xs text-slate-500">Schulpflegschaftsvorsitzende</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontakt */}
              <a
                href="mailto:schulpflegschaft@rs-heimbach.de"
                className="group flex items-center gap-4 p-5 bg-[#1a3a6b] rounded-2xl text-white hover:bg-[#1DA499] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60 mb-0.5">E-Mail schreiben</div>
                  <div className="font-bold text-sm">schulpflegschaft@rs-heimbach.de</div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aufgaben */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Aufgaben</span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Was wir tun</h2>
          </motion.div>

          <div className="space-y-3">
            {tasks.map((task, i) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1DA499] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-black">{i + 1}</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum Mitwirkung wichtig ist */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Engagement</span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Warum Mitwirkung wichtig ist</h2>
            <p className="text-slate-500 mt-2 text-sm">Eine lebendige Schulgemeinschaft lebt vom Engagement aller Beteiligten.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-[#f8f9ff] rounded-2xl"
              >
                <CheckCircle2 className="w-5 h-5 text-[#1DA499] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1a3a6b] text-sm">{r.label}</div>
                  <div className="text-slate-500 text-sm mt-0.5">{r.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitmachen */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a3a6b] rounded-3xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-black mb-3">Aktiv werden?</h3>
            <p className="text-white/80 max-w-md mx-auto leading-relaxed">
              Klassenelternvertreterinnen und -vertreter werden beim ersten Elternabend zu Schuljahresbeginn gewählt.
              Engagieren Sie sich für unsere Schulgemeinschaft!
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
