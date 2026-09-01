"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import { Thermometer, Clock, PencilLine, ArrowRight, ExternalLink } from "lucide-react";
import { schoolInfo } from "@/lib/data";

const steps = [
  {
    icon: Clock,
    title: "Am selben Tag bis 8:00 Uhr",
    desc: "Melden Sie Ihr Kind am Krankheitstag bitte bis spätestens 8:00 Uhr über das Online-Formular ab – ganz bequem vom Handy.",
  },
  {
    icon: PencilLine,
    title: "Schriftliche Entschuldigung mitgeben",
    desc: "Wenn Ihr Kind wieder zur Schule kommt, geben Sie ihm bitte eine schriftliche Entschuldigung für die Klassenleitung mit. Eine Krankmeldung über das Formular ersetzt nicht die schriftliche Entschuldigung.",
  },
];

export default function KrankmeldungPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
              <Thermometer className="w-4 h-4" /> Für Eltern
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Krankmeldung</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Ihr Kind ist krank oder kann nicht zur Schule kommen? Melden Sie es hier in wenigen
              Sekunden online ab.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA + Ablauf */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Großer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:sticky lg:top-28"
            >
              <div className="relative overflow-hidden rounded-3xl gradient-accent p-8 sm:p-10 shadow-xl shadow-[#e8442a]/20">
                {/* Deko-Kreise */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" aria-hidden="true" />
                <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/10" aria-hidden="true" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <Thermometer className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Jetzt online krankmelden
                  </h2>
                  <p className="text-white/85 text-sm sm:text-base mb-8 leading-relaxed">
                    Das Formular liegt sicher in unserer eigenen Schul-Cloud. Sie benötigen kein Login –
                    einfach ausfüllen und absenden.
                  </p>
                  <a
                    href={schoolInfo.krankmeldungUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 bg-white text-[#e8442a] px-8 py-4 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02]"
                  >
                    Zum Krankmeldungs-Formular
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="flex items-center justify-center gap-1.5 text-white/70 text-xs mt-4">
                    <ExternalLink className="w-3.5 h-3.5" /> Öffnet sich in einem neuen Tab
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ablauf / Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">
                So geht's
              </span>
              <h2 className="text-3xl font-black text-[#1a3a6b] mb-8">In zwei Schritten erledigt</h2>

              <div className="space-y-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 sm:p-6 shadow-sm"
                  >
                    <div className="shrink-0 relative">
                      <div className="w-12 h-12 rounded-xl bg-[#1DA499]/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-[#1DA499]" />
                      </div>
                      <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#1a3a6b] text-white text-xs font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
