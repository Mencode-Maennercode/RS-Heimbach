"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Laptop, Compass, Handshake, Heart, Users, Rocket, Target, Star, BookOpen } from "lucide-react";
import OrganigrammWidget from "@/components/OrganigrammWidget";
import HeroBackground from "@/components/HeroBackground";

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

const pillars = [
  {
    icon: Laptop,
    title: "Digitale Bildung",
    desc: "Wir integrieren digitale Medien und Werkzeuge konsequent in den Unterricht und bereiten unsere Schüler*innen auf eine vernetzte Welt vor.",
    color: "from-[#1DA499] to-teal-700",
  },
  {
    icon: Target,
    title: "Individuelle Förderung & Inklusion",
    desc: "Mit differenzierten Lernangeboten und sonderpädagogischer Unterstützung begleiten wir jedes Kind auf seinem ganz eigenen Weg.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Compass,
    title: "Berufsorientierung",
    desc: "Betriebserkundungen, Berufspraktika und Kooperationen mit regionalen Unternehmen bereiten unsere Schüler*innen gezielt auf die Arbeitswelt vor.",
    color: "from-amber-500 to-amber-700",
  },
  {
    icon: Handshake,
    title: "Schulgemeinschaft & Kultur",
    desc: "Gemeinsame Projekte, Schulveranstaltungen und ein lebendiges SV-Leben stärken den Zusammenhalt und machen unsere Schule zu einem Ort zum Wohlfühlen.",
    color: "from-rose-500 to-rose-700",
  },
];

export default function UnsereSchulePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 gradient-hero overflow-hidden">
        <HeroBackground />
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
                  begleitet unsere Schülerinnen und Schüler auf ihrem Bildungsweg.
                </p>
                <p>
                  Unser Schulkonzept verbindet modernen Unterricht mit kreativen Projekten und
                  einem starken Gemeinschaftsgefühl. Individuelle Förderung steht dabei für jeden
                  Lerntyp im Mittelpunkt.
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
                  src="/images/schulhof-eyecatcher.jpg"
                  alt="Schülerinnen und Schüler auf dem Schulhof der Realschule Am Heimbach"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
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

      {/* Inklusion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a5a54] rounded-3xl p-10 md:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Gemeinsames Lernen</span>
                <h2 className="text-4xl font-black mb-5">Inklusion an der RS Heimbach</h2>
                <p className="text-white/80 leading-relaxed">
                  Wir glauben daran, dass alle Kinder gemeinsam lernen können. Mit Sonderpädagog*innen
                  begleiten wir Schülerinnen und Schüler mit besonderem Förderbedarf individuell und professionell
                  auf ihrem ganz persönlichen Lernweg.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "Inklusiv", label: "Unterricht für alle" },
                  { value: "100%", label: "Barrierefreier Zugang" },
                  { value: "Individuell", label: "Förderpläne für jedes Kind" },
                  { value: "Gemeinsam", label: "Lernen in einem Klassenverband" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-2xl p-5 text-center">
                    <div className="text-2xl font-black text-[#f5a623] mb-1">{item.value}</div>
                    <div className="text-white/70 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Säulen */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
              Schulentwicklung
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b]">
              Unsere Säulen
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Schwerpunkte unserer Schulentwicklung
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-black text-lg text-[#1a3a6b] mb-3">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organigramm */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
              Struktur
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b]">
              Organigramm
            </h2>
          </motion.div>
          <OrganigrammWidget />
        </div>
      </section>
    </>
  );
}
