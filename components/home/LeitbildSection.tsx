"use client";

import { motion } from "framer-motion";
import { Heart, Users, Rocket } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Vielfalt leben.",
    tagline: "Jedes Kind ist einzigartig – und genau das ist unsere Stärke.",
    points: [
      "Individuelle Förderung & sonderpädagogische Unterstützung",
      "Respektvolles Miteinander & Präventionsarbeit",
      "Beratung und Unterstützung für Schüler und Eltern",
    ],
    gradient: "from-[#FF6B9D] to-[#C44569]",
    bg: "bg-rose-50",
    border: "border-rose-100",
    iconGradient: "from-[#FF6B9D] to-[#C44569]",
    dot: "bg-rose-400",
    titleColor: "text-rose-700",
  },
  {
    icon: Users,
    title: "Gemeinsam wachsen.",
    tagline: "Gemeinschaft stärkt. Verantwortung formt Charakter.",
    points: [
      "Einführungstage, Klassenfahrten & Teamtage",
      "Streitschlichter, SV & Schülerfirma",
      "Trainingsraumprinzip für ein respektvolles Lernklima",
    ],
    gradient: "from-[#FFD93D] to-[#FFA726]",
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconGradient: "from-[#FFD93D] to-[#FFA726]",
    dot: "bg-amber-400",
    titleColor: "text-amber-700",
  },
  {
    icon: Rocket,
    title: "Zukunft gestalten.",
    tagline: "Moderne Bildung. Echte Chancen. Klare Perspektiven.",
    points: [
      "60-Minuten-Takt & fachbezogene Lernräume",
      "Digitale Ausstattung & kooperatives Lernen",
      "Berufsorientierung & Wahlpflichtbereich ab Klasse 7",
    ],
    gradient: "from-[#FFA726] to-[#F57C00]",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconGradient: "from-[#FFA726] to-[#F57C00]",
    dot: "bg-orange-400",
    titleColor: "text-orange-700",
  },
];

export default function LeitbildSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
            Unser Leitbild
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499] mb-4">
            Was uns ausmacht
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Drei Grundsätze, die unseren Schulalltag prägen – für jedes Kind, jeden Tag.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-3xl p-8 ${v.bg} border ${v.border} overflow-hidden group hover:shadow-xl transition-all duration-300`}
              >
                <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${v.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.iconGradient} flex items-center justify-center mb-6 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className={`text-2xl font-black mb-2 ${v.titleColor}`}>{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{v.tagline}</p>

                <ul className="space-y-2.5">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-slate-700 text-sm">
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${v.dot}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
