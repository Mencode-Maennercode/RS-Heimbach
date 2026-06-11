"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import type { CalendarEvent } from "@/lib/calendar";

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string; header: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500", header: "bg-blue-600" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", header: "bg-emerald-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500", header: "bg-orange-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500", header: "bg-purple-600" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", header: "bg-red-600" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function formatShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function getMonthYear(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
}

export default function VeranstaltungenView({ events }: { events: CalendarEvent[] }) {
  const grouped = events.reduce((acc, ev) => {
    const key = getMonthYear(ev.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Termine</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Veranstaltungen</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Alle wichtigen Termine im Schulkalender – von Elternsprechtagen bis zu Projekttagen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events list */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              Aktuell sind keine kommenden Termine eingetragen.
            </div>
          )}
          {Object.entries(grouped).map(([month, evts], mi) => (
            <div key={month} className="mb-14">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: mi * 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="bg-[#1a3a6b] text-white px-5 py-2 rounded-xl font-black text-sm uppercase tracking-wide">
                  {month}
                </div>
                <div className="flex-1 h-px bg-slate-200" />
              </motion.div>

              <div className="space-y-4">
                {evts.map((event, i) => {
                  const colors = colorMap[event.color] || colorMap.blue;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-0.5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-0">
                        {/* Date sidebar */}
                        <div className={`${colors.bg} ${colors.border} border-r flex flex-col items-center justify-center px-6 py-6 min-w-[90px]`}>
                          <div className={`text-3xl font-black ${colors.text}`}>
                            {new Date(event.date).getDate().toString().padStart(2, "0")}
                          </div>
                          <div className={`text-xs font-bold ${colors.text} uppercase`}>
                            {new Date(event.date).toLocaleDateString("de-DE", { month: "short" })}
                          </div>
                        </div>
                        {/* Content */}
                        <div className="p-6">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                              <Tag className="w-3 h-3" />{event.category}
                            </span>
                          </div>
                          <h3 className="font-black text-xl text-slate-900 mb-2 group-hover:text-[#1a3a6b] transition-colors">
                            {event.title}
                          </h3>
                          {event.description && (
                            <p className="text-slate-600 text-sm mb-3 leading-relaxed whitespace-pre-line">{event.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {event.endDate
                                ? `${formatShort(event.date)} – ${formatShort(event.endDate)}`
                                : formatDate(event.date)}
                            </span>
                            {event.time && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {event.time}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info box */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8f9ff] border border-[#1a3a6b]/10 rounded-3xl p-8 text-center">
            <Calendar className="w-10 h-10 text-[#1a3a6b] mx-auto mb-4" />
            <h3 className="text-2xl font-black text-[#1a3a6b] mb-2">Alle Termine als Kalender</h3>
            <p className="text-slate-600 mb-5">
              Abonnieren Sie unseren Schulkalender, um immer auf dem neuesten Stand zu bleiben.
            </p>
            <a
              href="mailto:sekretariat@rs-heimbach.de"
              className="inline-flex items-center gap-2 bg-[#1a3a6b] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0f2447] transition-colors"
            >
              Kalender abonnieren
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
