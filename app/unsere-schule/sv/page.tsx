"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Star, Megaphone, Heart } from "lucide-react";

const svActivities = [
  { icon: Star, title: "5er-Party", desc: "Jedes Jahr organisiert die SV eine Willkommensparty für die neuen Fünftklässler." },
  { icon: Megaphone, title: "Schülerinteressen vertreten", desc: "Die SV ist Sprachrohr aller Schüler*innen bei der Schulleitung und im Schulausschuss." },
  { icon: Heart, title: "Schulgestaltung", desc: "Von der Wanddekoration bis zum Büdchen – die SV macht unsere Schule lebendiger." },
  { icon: Users, title: "Aktionen & Events", desc: "Benefizaktionen, Aktionstage und gemeinsame Projekte für die gesamte Schulgemeinschaft." },
];

export default function SVPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Mitbestimmung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schülervertretung (SV)</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Die Stimme aller Schülerinnen und Schüler der Realschule Am Heimbach.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3 block">Demokratie in der Schule</span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-5">Eure Stimme zählt!</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Die Schülervertretung (SV) der Realschule Am Heimbach ist die demokratisch gewählte
                  Interessenvertretung aller Schülerinnen und Schüler. Sie setzt sich aktiv für die
                  Belange aller Schüler*innen ein.
                </p>
                <p>
                  In den Klassensprecher*innen-Wahlen wählen alle Klassen ihre Vertreter*innen. Diese
                  bilden zusammen die Schülervertretung und wählen aus ihrer Mitte die Schulsprecher*innen.
                </p>
                <p>
                  Bekannte Projekte der SV: Die <strong>5er-Party</strong> für neue Fünftklässler,
                  die Gestaltung des <strong>SV-Büdchens</strong> und regelmäßige Aktionen
                  zur Verbesserung des Schulklimas.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=700&fit=crop" alt="Schülervertretung" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Aktivitäten</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Was wir tun</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {svActivities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={a.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-[#1a3a6b] mb-2">{a.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2d6a9f] rounded-3xl p-10 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Aktuelles aus der SV</span>
                <h3 className="text-2xl font-black mt-2 mb-3">Neues Fenster fürs SV-Büdchen</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Die SV hat das Büdchen mit einem neuen, selbst gestalteten Fenster verschönert.
                  Lucy aus der 9c hat außerdem ein Kunstwerk mit dem SV-Logo für das Büro gestaltet –
                  ein echtes Gemeinschaftsprojekt!
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=450&fit=crop" alt="SV Büdchen" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
