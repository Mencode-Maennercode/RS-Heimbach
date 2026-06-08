"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils, Clock, Euro, Salad } from "lucide-react";

export default function MensaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1920&h=500&fit=crop" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Verpflegung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Unsere Mensa</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Eine gute Schule braucht gutes Essen – täglich frisch und ausgewogen, zubereitet von unserem Caterer Kette KochWerk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
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
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">Wohlfühlen & Auftanken</span>
              <h2 className="text-4xl font-black text-[#0a5a54] mb-5">Gemeinsam essen, lachen, Energie tanken</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  In freundlicher Atmosphäre genießen unsere Schülerinnen und Schüler täglich frisch zubereitete, ausgewogene
                  Mahlzeiten. Wir legen Wert auf Qualität, Abwechslung und eine kindgerechte Auswahl.
                </p>
                <p>
                  Caterer ist das Team von <strong>Kette KochWerk</strong>. Die Leitung unserer Schulküche hat
                  <strong> Frau Cigdem Kisaoglu</strong>, die täglich mit viel Engagement für eine frische Verpflegung sorgt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zeiten & Preise */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center"><Clock className="w-5 h-5 text-white" /></div>
                <h3 className="text-xl font-black text-[#0a5a54]">Öffnungszeiten</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600">Frühstückspause</span>
                  <span className="font-semibold text-slate-900">Mo – Fr · 10:20 – 10:40 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Mittagessen</span>
                  <span className="font-semibold text-slate-900">Mo, Mi, Do · 12:50 – 13:30 Uhr</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center"><Euro className="w-5 h-5 text-white" /></div>
                <h3 className="text-xl font-black text-[#0a5a54]">Menüpreise</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600">Schülerinnen und Schüler</span>
                  <span className="font-semibold text-slate-900">4,90 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Lehrerinnen und Lehrer</span>
                  <span className="font-semibold text-slate-900">5,50 €</span>
                </div>
              </div>
              <p className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                <Salad className="w-4 h-4 text-[#1DA499]" /> Inklusive Salat, Hauptspeise und Nachspeise.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#0a5a54] rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-black mb-2">Aktueller Speiseplan</h3>
            <p className="text-white/75 text-sm max-w-xl mx-auto">
              Unser Speiseplan informiert übersichtlich über die abwechslungsreichen Mahlzeiten der Woche. Den aktuellen Plan
              erhalten Sie über das Sekretariat bzw. den Bestelldienst des Caterers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
