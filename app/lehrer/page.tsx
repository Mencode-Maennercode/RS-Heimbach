"use client";

import { useState, useMemo } from "react";
import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, BookOpen, Users } from "lucide-react";
import { teachers, subjects, schoolInfo } from "@/lib/data";

export default function LehrerPage() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const filteredTeachers = useMemo(
    () => (activeSubject ? teachers.filter((t) => t.subjects.includes(activeSubject)) : teachers),
    [activeSubject]
  );

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Team</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Unser Kollegium</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Engagierte Lehrerinnen und Lehrer begleiten unsere Schüler*innen auf ihrem Lernweg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {[
              { icon: Users, value: "55", label: "Lehrerinnen & Lehrer" },
              { icon: BookOpen, value: "5", label: "Sonderpädagog*innen" },
              { icon: BookOpen, value: "16", label: "Fächer" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#1a3a6b]">{s.value}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Fächerangebot</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">Unsere Fächer</h2>
            <p className="text-slate-500 text-sm mt-2">Auf ein Fach klicken, um passende Lehrkräfte zu finden.</p>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              type="button"
              onClick={() => setActiveSubject(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`font-semibold px-5 py-2.5 rounded-full text-sm transition-colors ${
                activeSubject === null
                  ? "bg-[#1a3a6b] text-white"
                  : "bg-[#f8f9ff] border border-[#1a3a6b]/10 text-[#1a3a6b] hover:bg-[#1a3a6b] hover:text-white"
              }`}
            >
              Alle
            </motion.button>
            {subjects.map((s, i) => (
              <motion.button
                key={s}
                type="button"
                onClick={() => setActiveSubject((cur) => (cur === s ? null : s))}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`font-semibold px-5 py-2.5 rounded-full text-sm transition-colors ${
                  activeSubject === s
                    ? "bg-[#1a3a6b] text-white"
                    : "bg-[#f8f9ff] border border-[#1a3a6b]/10 text-[#1a3a6b] hover:bg-[#1a3a6b] hover:text-white"
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher grid */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Unser Team</span>
            <h2 className="text-4xl font-black text-[#1a3a6b]">
              {activeSubject ? `Lehrkräfte für ${activeSubject}` : "Lehrerinnen & Lehrer"}
            </h2>
          </motion.div>

          {filteredTeachers.length === 0 ? (
            <p className="text-slate-500 text-sm">Keine Lehrkraft für dieses Fach gefunden.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTeachers.map((teacher, i) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      unoptimized={teacher.image.startsWith("data:")}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-black text-lg leading-tight">{teacher.name}</div>
                      <div className="text-[#f5a623] text-sm font-semibold">{teacher.role}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {teacher.subjects.map((s) => (
                        <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{teacher.bio}</p>
                    <a
                      href={schoolInfo.phoneLink}
                      aria-label={`Anrufen: ${schoolInfo.phone}`}
                      className="mt-4 flex items-center gap-2 text-[#1a3a6b] text-xs font-bold hover:text-[#e8442a] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Sekretariat anrufen
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
