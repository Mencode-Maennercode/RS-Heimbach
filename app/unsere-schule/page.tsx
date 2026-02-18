"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Heart, Star, Users, BookOpen, Award, MapPin } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Gemeinschaft",
    desc: "Wir pflegen ein respektvolles und herzliches Miteinander. Jede Schülerin und jeder Schüler gehört dazu.",
    color: "from-rose-500 to-rose-700",
  },
  {
    icon: Target,
    title: "Individuelle Förderung",
    desc: "Wir begleiten jedes Kind auf seinem persönlichen Lernweg und fördern Stärken gezielt.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Star,
    title: "Exzellenz",
    desc: "Wir fordern und fördern – damit unsere Schüler*innen ihr volles Potenzial entfalten können.",
    color: "from-amber-500 to-amber-700",
  },
  {
    icon: BookOpen,
    title: "Moderne Bildung",
    desc: "Digitale Medien, kreative Projekte und Zukunftskompetenzen sind fester Bestandteil unseres Unterrichts.",
    color: "from-emerald-500 to-emerald-700",
  },
];

const timeline = [
  { year: "1975", event: "Gründung der Realschule Am Heimbach in Troisdorf" },
  { year: "1990", event: "Erweiterung des Schulgebäudes und neue Fachräume" },
  { year: "2005", event: "Einführung des Ganztagsbetriebs" },
  { year: "2010", event: "Modernisierung der Medienausstattung und IT-Räume" },
  { year: "2018", event: "Zirkusprojektwoche und Kooperation mit SPORTAG" },
  { year: "2022", event: "Großes Sport- und Zirkusprojekt – Schüler*innen begeistern Eltern" },
  { year: "2025", event: "Schuljahr 2025/26 – über 590 Schüler*innen, 55 Lehrkräfte" },
];

export default function UnsereSchulePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=600&fit=crop"
            alt="Schulgebäude"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
              Willkommen
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 max-w-3xl leading-tight">
              Unsere Schule
            </h1>
            <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
              Die Realschule Am Heimbach in Troisdorf – eine lebendige Gemeinschaft aus Schülerinnen,
              Schülern und Lehrkräften, die gemeinsam die Zukunft gestalten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Über uns */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
                Über uns
              </span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-6">
                Herzlich Willkommen <br />zum Schuljahr 2025/2026
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Wir begrüßen Sie herzlich auf der Schulhomepage der Realschule Am Heimbach.
                  Unsere Schule ist eine gebundene Ganztagsschule im Herzen von Troisdorf und
                  begleitet rund <strong>590 Schülerinnen und Schüler</strong> auf ihrem Bildungsweg.
                </p>
                <p>
                  Mit <strong>ca. 55 Lehrerinnen und Lehrern</strong> sowie 5 Sonderpädagog*innen
                  bieten wir individuelle Förderung für jeden Lerntyp. Unser Schulkonzept verbindet
                  modernen Unterricht mit kreativen Projekten und einem starken Gemeinschaftsgefühl.
                </p>
                <p>
                  Wir arbeiten nach dem Lehrerraumprinzip – jede Lehrkraft hat ihren eigenen Fachraum,
                  der speziell für das jeweilige Fach ausgestattet ist. Dies schafft eine optimale
                  Lernumgebung für alle Jahrgangsstufen.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 text-[#e8442a]" />
                  Heimbachstraße 10, 53840 Troisdorf
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&h=700&fit=crop"
                  alt="Schüler beim Lernen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#f5a623] rounded-2xl p-5 shadow-xl text-white">
                <div className="text-3xl font-black">50+</div>
                <div className="text-sm font-bold text-white/90">Jahre Bildung</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
              Unser Leitbild
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b]">
              Unsere Werte
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-xl text-[#1a3a6b] mb-3">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a3a6b] rounded-3xl p-10 md:p-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              {[
                { icon: Users, value: "590+", label: "Schülerinnen & Schüler" },
                { icon: Award, value: "55", label: "Lehrkräfte" },
                { icon: BookOpen, value: "Klasse 5–10", label: "Jahrgangsstufen" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-black text-[#f5a623]">{item.value}</div>
                    <div className="text-white/70 font-medium">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
              Geschichte
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b]">
              Unsere Geschichte
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1a3a6b] to-[#e8442a]" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow inline-block max-w-sm">
                      <div className="text-lg font-black text-[#1a3a6b] mb-1">{item.year}</div>
                      <div className="text-slate-600 text-sm">{item.event}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#e8442a] border-4 border-white shadow-md shrink-0 z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Schulleitung", href: "/unsere-schule/schulleitung", desc: "Unsere Schulleiterin und ihr Team" },
              { label: "Lehrerkollegium", href: "/lehrer", desc: "Alle Lehrerinnen und Lehrer" },
              { label: "Schülervertretung", href: "/unsere-schule/sv", desc: "Die Stimme der Schüler*innen" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between p-6 border-2 border-slate-100 rounded-2xl hover:border-[#1a3a6b] hover:bg-[#1a3a6b] transition-all duration-300"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-white transition-colors">{item.label}</div>
                  <div className="text-sm text-slate-500 group-hover:text-white/70 transition-colors">{item.desc}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
