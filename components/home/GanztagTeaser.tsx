"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Utensils, BookOpen, Users, Lightbulb } from "lucide-react";

const features = [
  { icon: Clock, title: "60-Minuten-Stunden", desc: "Tiefes Lernen durch längere Unterrichtseinheiten" },
  { icon: Utensils, title: "Mensa-Betrieb", desc: "Frische Mahlzeiten Mo bis Do in der Mittagspause" },
  { icon: BookOpen, title: "Lehrerraumprinzip", desc: "Jede Lehrkraft hat ihren eigenen Fachraum" },
  { icon: Users, title: "Inklusion", desc: "Gemeinsames Lernen mit 5 Sonderpädagog*innen" },
  { icon: Lightbulb, title: "Wahlunterricht", desc: "Individuelle Schwerpunkte setzen" },
];

export default function GanztagTeaser() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-900/20 aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&h=700&fit=crop"
                alt="Schüler im Unterricht"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1DA499]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-[#1DA499]">8:15</div>
                  <div className="text-xs text-slate-500 font-medium">Unterrichtsbeginn</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -left-6 bg-[#e8442a] rounded-2xl shadow-xl px-5 py-3 text-white"
            >
              <div className="text-lg font-black">Ganztag</div>
              <div className="text-xs text-white/80">Mo, Mi & Do bis 15:40 Uhr</div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
              Schulkonzept
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499] mb-5 leading-tight">
              Schule im gebundenen
              <span className="text-[#e8442a]"> Ganztag</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Die Realschule Am Heimbach bietet ein durchdachtes Ganztagskonzept mit individueller
              Förderung, kreativen Projekten und einem starken Gemeinschaftsgefühl.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f0fffe] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{f.title}</div>
                      <div className="text-slate-500 text-sm">{f.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/ganztag"
              className="group inline-flex items-center gap-2 bg-[#1DA499] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0a5a54] transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/25"
            >
              Mehr zum Ganztagskonzept
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
