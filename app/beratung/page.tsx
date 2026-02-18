"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeartHandshake, Users, GraduationCap, Phone, Mail, ArrowRight } from "lucide-react";

const services = [
  {
    icon: HeartHandshake,
    title: "Schulberatung",
    desc: "Unsere ausgebildeten Beratungslehrkräfte begleiten Schülerinnen und Schüler bei persönlichen Problemen, Lernkonflikten und Lebenskrisen – vertraulich und kostenlos.",
    contact: "Vereinbaren Sie einen Termin über das Sekretariat",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: GraduationCap,
    title: "Laufbahnberatung",
    desc: "Welchen Abschluss kann mein Kind erreichen? Welche weiterführenden Schulen gibt es? Wir beraten Eltern und Schüler*innen individuell zu Bildungswegen.",
    contact: "Schulleiterin Frau Weber berät gerne persönlich",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: Users,
    title: "Nachhilfe & Förderung",
    desc: "Individuelle Fördermaßnahmen innerhalb und außerhalb des Unterrichts. Vom Förderunterricht bis zu externen Nachhilfe-Vermittlungen.",
    contact: "Angebote im Sekretariat erfragen",
    color: "from-purple-500 to-purple-700",
  },
];

export default function BeratungPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Unterstützung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Beratung & Service</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Wir sind für Schülerinnen, Schüler und Eltern da – in schwierigen Situationen genauso wie bei Fragen zur Schullaufbahn.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                >
                  <div className={`bg-gradient-to-br ${s.color} p-8`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-black text-[#1a3a6b] mb-3">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="bg-[#f8f9ff] rounded-xl p-3 text-xs text-slate-500 font-medium">
                      💡 {s.contact}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=700&fit=crop" alt="Beratung" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3 block">Kontakt</span>
              <h2 className="text-3xl font-black text-[#1a3a6b] mb-5">Beratungsgespräch vereinbaren</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Alle Beratungsleistungen sind kostenlos und vertraulich. Bitte melden Sie sich vorab
                beim Sekretariat für einen Termin an.
              </p>
              <div className="space-y-3">
                <a href="tel:0224177715" className="flex items-center gap-3 p-4 bg-[#f8f9ff] rounded-xl hover:bg-[#1a3a6b]/5 transition-colors group">
                  <Phone className="w-5 h-5 text-[#1a3a6b]" />
                  <div>
                    <div className="text-xs text-slate-500">Telefon</div>
                    <div className="font-bold text-slate-800">02241 – 77715</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-[#1a3a6b] transition-colors" />
                </a>
                <a href="mailto:sekretariat@rs-heimbach.de" className="flex items-center gap-3 p-4 bg-[#f8f9ff] rounded-xl hover:bg-[#1a3a6b]/5 transition-colors group">
                  <Mail className="w-5 h-5 text-[#1a3a6b]" />
                  <div>
                    <div className="text-xs text-slate-500">E-Mail</div>
                    <div className="font-bold text-slate-800">sekretariat@rs-heimbach.de</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-[#1a3a6b] transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
