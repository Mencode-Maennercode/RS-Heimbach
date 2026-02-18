"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Euro, Users, Star, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Unterstützung von Schulveranstaltungen und Projekten",
  "Finanzierung von Lernmitteln und Ausstattung",
  "Förderung von Exkursionen und Klassenfahrten",
  "Unterstützung der Schülerzeitung",
  "Mitfinanzierung der Zirkusprojektwoche",
  "Beiträge zur Verbesserung des Schulklimas",
];

const stats = [
  { icon: Users, value: "120+", label: "Mitglieder" },
  { icon: Euro, value: "8.500€", label: "Jährliches Budget" },
  { icon: Star, value: "30+", label: "Projekte unterstützt" },
  { icon: Heart, value: "1992", label: "Gegründet" },
];

export default function FoerdervereinPage() {
  return (
    <>
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Engagement</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Förderverein</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Der Förderverein der Realschule Am Heimbach unterstützt unsere Schule seit über 30 Jahren
              mit Engagement und Herzblut.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-[#1a3a6b]">{s.value}</div>
                  <div className="text-slate-500 text-sm">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3 block">Unser Auftrag</span>
              <h2 className="text-4xl font-black text-[#1a3a6b] mb-5">Was wir tun</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Der Förderverein der Realschule Am Heimbach e.V. wurde gegründet, um die Schule in ihrer
                pädagogischen und sozialen Arbeit zu unterstützen. Wir finanzieren Projekte, die aus dem
                regulären Schulbudget nicht möglich wären.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Jedes Mitglied zahlt einen kleinen Jahresbeitrag und trägt damit zu einem besseren
                Schulklima und mehr Möglichkeiten für alle Schüler*innen bei.
              </p>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] mb-8">
                <Image src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=700&fit=crop" alt="Förderverein" fill className="object-cover" />
              </div>
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2d6a9f] rounded-3xl p-8 text-white">
                <Heart className="w-8 h-8 text-[#f5a623] mb-4" />
                <h3 className="text-2xl font-black mb-3">Mitglied werden</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Der Jahresbeitrag beträgt <strong className="text-[#f5a623]">15 € für Einzelpersonen</strong> und{" "}
                  <strong className="text-[#f5a623]">20 € für Familien</strong>. Mit Ihrer Mitgliedschaft
                  unterstützen Sie direkt die Schüler*innen der RS Heimbach.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-[#f5a623] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Beitrittsformular anfordern <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
