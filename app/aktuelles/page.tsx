"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { newsItems } from "@/lib/data";

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
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=500&fit=crop" alt="" fill className="object-cover" />
        </div>
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
