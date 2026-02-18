"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { newsItems } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "SV-News": "bg-blue-100 text-blue-700",
  Projekte: "bg-purple-100 text-purple-700",
  Ausflüge: "bg-green-100 text-green-700",
  Kunst: "bg-pink-100 text-pink-700",
  Musik: "bg-indigo-100 text-indigo-700",
  Schulleben: "bg-orange-100 text-orange-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsSection() {
  const featured = newsItems[0];
  const rest = newsItems.slice(1, 5);

  return (
    <section className="py-24 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">
              Neuigkeiten
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b]">
              News & Schulleben
            </h2>
          </div>
          <Link
            href="/aktuelles"
            className="flex items-center gap-2 text-[#1a3a6b] font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            Alle Nachrichten <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 card-hover"
          >
            <Link href={`/aktuelles/${featured.slug}`} className="block">
              <div className="relative h-72 sm:h-80">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[featured.category] || "bg-slate-100 text-slate-700"}`}>
                    <Tag className="w-3 h-3" />
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(featured.date)}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#1a3a6b] transition-colors line-clamp-2">
                  {featured.title}
                </h3>
                <p className="text-slate-600 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-1 mt-4 text-[#1a3a6b] font-bold text-sm">
                  Weiterlesen <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Side articles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex gap-4 p-4"
              >
                <Link href={`/aktuelles/${item.slug}`} className="flex gap-4 w-full">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-400"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-flex text-xs font-bold px-2 py-0.5 rounded-full mb-1.5 ${categoryColors[item.category] || "bg-slate-100 text-slate-700"}`}>
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1a3a6b] transition-colors line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">{formatDate(item.date)}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
