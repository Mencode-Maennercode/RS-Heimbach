"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, FileText, Check } from "lucide-react";
import { newsItems } from "@/lib/data";

const anmeldungDocs = [
  "Geburtsurkunde",
  "Endjahreszeugnis des 3. Schuljahres",
  "Halbjahreszeugnis des 4. Schuljahres",
  "Original-Anmeldeschein der Grundschule",
  "Kompetenzbeurteilung der Troisdorfer Grundschulen",
  "Nachweis über den Masern-Impfschutz",
  "ggf. Sorgeberechtigungsnachweis",
];

const categoryColors: Record<string, string> = {
  "SV-News": "bg-blue-100 text-blue-700",
  Projekte: "bg-purple-100 text-purple-700",
  Ausflüge: "bg-green-100 text-green-700",
  Kunst: "bg-pink-100 text-pink-700",
  Musik: "bg-indigo-100 text-indigo-700",
  Schulleben: "bg-orange-100 text-orange-700",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

export default function AktuellesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Neuigkeiten</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">News & Schulleben</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Alles Wissenswerte aus dem Schulalltag – Projekte, Ausflüge, Veranstaltungen und mehr.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Anmeldung – hervorgehoben */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-lg border border-[#1DA499]/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Linke Seite: Termine */}
              <div className="bg-[#0a5a54] p-8 md:p-10 text-white">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
                  <FileText className="w-4 h-4" /> Anmeldung
                </span>
                <h2 className="text-3xl font-black mb-4 leading-tight">Anmeldung Klasse 5<br />für das Schuljahr 2026/2027</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Liebe Eltern von Grundschulkindern: Die Anmeldungen werden im Sekretariat entgegengenommen –
                  an allen Unterrichtstagen <strong>außer mittwochs</strong>.
                </p>
                <div className="bg-white/10 rounded-2xl p-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 font-bold text-[#f5a623]">
                    <Calendar className="w-4 h-4" /> Mo, 23.02.2026 – Fr, 19.03.2026
                  </div>
                  <div className="text-white/80">08:00 – 13:00 Uhr (montags nur bis 12:00 Uhr)</div>
                  <div className="text-white/60 text-xs">Der Tag der Anmeldung innerhalb dieses Zeitraums hat keinen Einfluss auf die Aufnahme.</div>
                </div>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 mt-6 bg-[#1DA499] hover:bg-[#17a89d] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Kontakt & Beratung <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Rechte Seite: Unterlagen */}
              <div className="bg-white p-8 md:p-10">
                <h3 className="font-black text-[#0a5a54] text-lg mb-4">Bitte zur Anmeldung mitbringen</h3>
                <ul className="space-y-2.5">
                  {anmeldungDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#1DA499]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#1DA499]" />
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-5 leading-relaxed">
                  Bei einer Hauptschulempfehlung bringen Sie Ihr Kind bitte mit – es erfolgt dann ein Beratungsgespräch.
                  Unterlagen bitte im Original und möglichst als Kopie mitbringen.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-slate-100 py-5 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {["Alle", "Projekte", "Kunst", "Musik", "Ausflüge", "Schulleben", "SV-News"].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  cat === "Alle"
                    ? "bg-[#1a3a6b] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 mb-8"
          >
            <Link href={`/aktuelles/${newsItems[0].slug}`} className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-full min-h-[280px] overflow-hidden">
                <Image src={newsItems[0].image} alt={newsItems[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[newsItems[0].category] || "bg-slate-100 text-slate-700"}`}>
                    <Tag className="w-3 h-3" />{newsItems[0].category}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{formatDate(newsItems[0].date)}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-[#1a3a6b] transition-colors">
                  {newsItems[0].title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">{newsItems[0].excerpt}</p>
                <div className="flex items-center gap-2 text-[#1a3a6b] font-bold text-sm">
                  Weiterlesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.slice(1).map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
              >
                <Link href={`/aktuelles/${item.slug}`}>
                  <div className="relative h-52 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category] || "bg-slate-100 text-slate-700"}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-slate-500 text-xs flex items-center gap-1 mb-2">
                      <Calendar className="w-3 h-3" />{formatDate(item.date)}
                    </div>
                    <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-[#1a3a6b] transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
                    <div className="flex items-center gap-1 mt-4 text-[#1a3a6b] font-bold text-sm">
                      Weiterlesen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
