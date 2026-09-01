"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BookOpen, Users, Utensils, ArrowRight } from "lucide-react";

const topics = [
  {
    icon: Clock,
    title: "Schulzeiten & Raster",
    desc: "Unterrichtszeiten, Kurzstundenraster und das Prinzip der 60-Minuten-Stunden.",
    href: "/unterricht/schulzeiten",
  },
  {
    icon: BookOpen,
    title: "Fächer & Differenzierung",
    desc: "Unsere Fächer und das Differenzierungsfach ab Klasse 7 – Schwerpunkte nach Interesse.",
    href: "/unterricht/faecher",
  },
  {
    icon: Users,
    title: "Ganztag & AGs",
    desc: "Gebundener Ganztag, Wahlunterricht, Arbeitsgemeinschaften und Inklusion.",
    href: "/ganztag",
  },
  {
    icon: Utensils,
    title: "Mensa",
    desc: "Frische, ausgewogene Mahlzeiten – Zeiten, Preise und Speiseplan.",
    href: "/unterricht/mensa",
  },
];

export default function UnterrichtPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Unterricht & Organisation</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Unterricht an der RS Heimbach</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Alles rund um den Schultag: Schulzeiten, Fächer, Ganztag und Mensa – übersichtlich und an einer Stelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topic cards */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={t.href}
                    className="group flex items-start gap-5 bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="font-black text-xl text-[#0a5a54] mb-2 flex items-center gap-2">
                        {t.title}
                        <ArrowRight className="w-4 h-4 text-[#1DA499] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
