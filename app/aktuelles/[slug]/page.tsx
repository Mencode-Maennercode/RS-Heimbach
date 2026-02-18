"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { newsItems } from "@/lib/data";
import { use } from "react";

const categoryColors: Record<string, string> = {
  "SV-News": "bg-blue-100 text-blue-700",
  Projekte: "bg-purple-100 text-purple-700",
  Ausflüge: "bg-green-100 text-green-700",
  Kunst: "bg-pink-100 text-pink-700",
  Musik: "bg-indigo-100 text-indigo-700",
  Schulleben: "bg-orange-100 text-orange-700",
};

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = newsItems.find((n) => n.slug === slug) || newsItems[0];
  const related = newsItems.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Back nav */}
      <section className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/aktuelles" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1a3a6b] text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Article */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[article.category] || "bg-slate-100 text-slate-700"}`}>
                <Tag className="w-3 h-3" />{article.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#1a3a6b] mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
              {article.excerpt}
            </p>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                An der Realschule Am Heimbach passiert immer etwas! Unsere Schülerinnen und Schüler
                engagieren sich täglich für ihre Schulgemeinschaft und nehmen an spannenden Projekten teil.
                Lesen Sie hier mehr über die aktuellen Aktivitäten an unserer Schule.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Wir sind stolz auf das Engagement unserer Schüler*innen und möchten ihre Leistungen
                und Erlebnisse mit Ihnen teilen. Gemeinsam gestalten wir eine lebendige und
                inspirierende Schulgemeinschaft.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Möchten Sie mehr über unsere Schulprojekte erfahren? Besuchen Sie uns beim nächsten
                Tag der offenen Tür oder kontaktieren Sie uns direkt. Wir freuen uns auf Ihren Besuch!
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
              <Share2 className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500">Teilen:</span>
              {["Facebook", "Instagram", "E-Mail"].map((s) => (
                <button key={s} className="text-xs font-bold text-slate-600 hover:text-[#1a3a6b] border border-slate-200 px-3 py-1.5 rounded-lg hover:border-[#1a3a6b] transition-all">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1a3a6b] mb-7">Weitere Neuigkeiten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <Link href={`/aktuelles/${item.slug}`}>
                  <div className="relative h-40 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" />
                  </div>
                  <div className="p-5">
                    <span className={`inline-flex text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 ${categoryColors[item.category] || "bg-slate-100 text-slate-700"}`}>
                      {item.category}
                    </span>
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-[#1a3a6b] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
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
