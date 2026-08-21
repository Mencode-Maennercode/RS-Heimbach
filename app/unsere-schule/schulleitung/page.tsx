"use client";

import HeroBackground from "@/components/HeroBackground";
import LeadershipCard from "@/components/schulleitung/LeadershipCard";

import { motion } from "framer-motion";
import { Mail, Phone, Printer, MapPin } from "lucide-react";
import { leadershipTeam, schoolInfo } from "@/lib/data";

export default function SchulleitungPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Teamleitung</span>
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
              <LeadershipCard key={person.name} person={person} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Telefon-Block */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a5a54] rounded-3xl p-8 md:p-10 text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <a href={schoolInfo.phoneLink} className="md:col-span-2 flex items-center gap-5 group">
                <div className="w-16 h-16 rounded-2xl bg-[#1DA499] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Direkt anrufen (Sekretariat)</div>
                  <div className="text-3xl sm:text-4xl font-black leading-none">{schoolInfo.phone}</div>
                </div>
              </a>
              <div className="space-y-2 text-sm">
                <a href={`mailto:${schoolInfo.email}`} className="flex items-center gap-2.5 text-white/80 hover:text-[#f5a623] transition-colors break-all">
                  <Mail className="w-4 h-4 text-[#f5a623] shrink-0" /> {schoolInfo.email}
                </a>
                <div className="flex items-center gap-2.5 text-white/80">
                  <Printer className="w-4 h-4 text-[#f5a623] shrink-0" /> Fax: {schoolInfo.fax}
                </div>
                <div className="flex items-center gap-2.5 text-white/80">
                  <MapPin className="w-4 h-4 text-[#f5a623] shrink-0" /> {schoolInfo.address}, {schoolInfo.city}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
