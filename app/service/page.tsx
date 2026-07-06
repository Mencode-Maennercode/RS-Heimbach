"use client";

import HeroBackground from "@/components/HeroBackground";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, FileText, Link2, ExternalLink, Thermometer, ArrowRight } from "lucide-react";

const downloadGroups = [
  {
    title: "Formulare & Anmeldung",
    items: [
      { name: "Anmeldeformular Klasse 5 (2026/27)", type: "PDF" },
      { name: "Antrag auf Beurlaubung", type: "PDF" },
      { name: "Antrag Lernmittelfreiheit", type: "PDF" },
    ],
  },
  {
    title: "Schulprogramm & Ordnungen",
    items: [
      { name: "Schulprogramm 2024/25", type: "PDF" },
      { name: "Schulordnung", type: "PDF" },
      { name: "Hausordnung RS Heimbach", type: "PDF" },
      { name: "Mediennutzungsordnung", type: "PDF" },
    ],
  },
  {
    title: "Stunden- & Terminpläne",
    items: [
      { name: "Stundenplan Jahrgang 5/6", type: "PDF" },
      { name: "Stundenplan Jahrgang 7/8", type: "PDF" },
      { name: "Stundenplan Jahrgang 9/10", type: "PDF" },
      { name: "Jahres-Terminplan 2025/26", type: "PDF" },
    ],
  },
  {
    title: "WU & Wahlunterricht",
    items: [
      { name: "WU-Angebote 2024/25", type: "PDF" },
      { name: "Übersicht AG-Angebote", type: "PDF" },
      { name: "Wahlunterricht Klasse 8–10", type: "PDF" },
    ],
  },
];

const links = [
  { name: "Schulformen in Troisdorf", href: "https://youtu.be/w53SqKeevrg", desc: "Video: Weiterführende Schulen im Überblick" },
  { name: "Neuneinhalb – ARD Mediathek", href: "https://www.ardmediathek.de", desc: "Bericht über Schulessen an unserer Schule" },
  { name: "Hausmeister Krause", href: "https://hausmeisterkrause.com/", desc: "Unser Hausmeister-Service" },
  { name: "Schulverwaltung Troisdorf", href: "#", desc: "Stadt Troisdorf – Bildungsinfos" },
];

export default function ServicePage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Downloads</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Service & Downloads</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Alle wichtigen Formulare, Stundenpläne und Informationen zum Herunterladen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Krankmeldung – Online statt PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Link
              href="/krankmeldung"
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl gradient-accent p-6 sm:p-7 shadow-lg shadow-[#e8442a]/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">Krankmeldung – jetzt online</h3>
                  <p className="text-white/85 text-sm">
                    Kind krankmelden am selben Tag bis 8:00 Uhr – bequem über unser Formular.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center gap-2 bg-white text-[#e8442a] px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap group-hover:scale-[1.03] transition-transform">
                Zur Krankmeldung <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {downloadGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="px-7 py-5 bg-[#1a3a6b] flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#f5a623]" />
                  <h3 className="font-black text-white">{group.title}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {group.items.map((item, i) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="w-full flex items-center justify-between px-7 py-4 hover:bg-[#f8f9ff] transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#e8442a]/10 text-[#e8442a] flex items-center justify-center text-xs font-black">
                          {item.type}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-[#1a3a6b] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-[#1a3a6b] transition-colors shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Externe Ressourcen</span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Nützliche Links</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group flex items-center justify-between p-5 bg-[#f8f9ff] rounded-2xl hover:bg-[#1a3a6b] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Link2 className="w-5 h-5 text-[#1a3a6b] group-hover:text-[#f5a623] transition-colors shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-white transition-colors text-sm">{link.name}</div>
                    <div className="text-xs text-slate-500 group-hover:text-white/60 transition-colors">{link.desc}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
