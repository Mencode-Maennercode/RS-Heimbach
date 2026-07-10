"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { leadershipTeam } from "@/lib/data";

const secretariat = {
  name: "Sekretariat",
  staff: ["Frau Claudia Hoffmann", "Frau Sandra Berger"],
  hours: ["Mo–Do: 7:30 – 14:30 Uhr", "Fr: 7:30 – 12:00 Uhr"],
  phone: "02241 – 77715",
  email: "sekretariat@rs-heimbach.de",
};

export default function SchulleitungPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Führung</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schulleitung</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Unser Leitungsteam steht für eine offene, moderne und zukunftsorientierte Schule.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {leadershipTeam.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-0">
                  <div className="relative h-72 sm:h-full min-h-[280px]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      unoptimized={person.image.startsWith("data:")}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/60 via-transparent to-transparent sm:bg-gradient-to-r" />
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="inline-block bg-[#1a3a6b] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {person.role}
                    </div>
                    <h2 className="text-2xl font-black text-[#1a3a6b] mb-2">{person.name}</h2>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {person.subjects.map((s) => (
                        <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{person.bio}</p>
                    <div className="space-y-2">
                      <a href={`tel:0224177715`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1a3a6b]">
                        <Phone className="w-4 h-4 text-[#1a3a6b]" />{person.phone}
                      </a>
                      <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1a3a6b]">
                        <Mail className="w-4 h-4 text-[#1a3a6b]" />{person.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekretariat */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a3a6b] rounded-3xl p-8 md:p-10 text-white"
          >
            <h2 className="text-2xl font-black mb-6">Sekretariat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Mitarbeiterinnen</div>
                {secretariat.staff.map((s) => (
                  <div key={s} className="text-white/80 text-sm">{s}</div>
                ))}
              </div>
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Öffnungszeiten</div>
                {secretariat.hours.map((h) => (
                  <div key={h} className="text-white/80 text-sm">{h}</div>
                ))}
              </div>
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Kontakt</div>
                <a href={`tel:0224177715`} className="flex items-center gap-2 text-white/80 text-sm hover:text-white mb-1">
                  <Phone className="w-3.5 h-3.5" />{secretariat.phone}
                </a>
                <a href={`mailto:${secretariat.email}`} className="flex items-center gap-2 text-white/80 text-sm hover:text-white">
                  <Mail className="w-3.5 h-3.5" />{secretariat.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
