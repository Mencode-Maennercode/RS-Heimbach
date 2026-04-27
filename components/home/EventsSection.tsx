"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { events } from "@/lib/data";

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
};

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("de-DE", { day: "2-digit" }),
    month: d.toLocaleDateString("de-DE", { month: "short" }),
    year: d.getFullYear(),
  };
}

export default function EventsSection() {
  return (
    <section className="py-24 bg-white">
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
              Kalender
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499]">
              Kommende Veranstaltungen
            </h2>
          </div>
          <Link
            href="/veranstaltungen"
            className="flex items-center gap-2 text-[#1DA499] font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            Alle Termine <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {events.slice(0, 6).map((event, i) => {
            const dateInfo = formatEventDate(event.date);
            const colors = colorMap[event.color] || colorMap.blue;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
              >
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div className={`${colors.bg} ${colors.border} border rounded-2xl p-3 text-center min-w-[60px] shrink-0`}>
                    <div className={`text-2xl font-black ${colors.text}`}>{dateInfo.day}</div>
                    <div className={`text-xs font-bold ${colors.text} uppercase`}>{dateInfo.month}</div>
                    <div className="text-xs text-slate-400">{dateInfo.year}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <span className={`text-xs font-bold uppercase tracking-wide ${colors.text}`}>{event.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#1DA499] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-4 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Full calendar CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/veranstaltungen"
            className="inline-flex items-center gap-2 border-2 border-[#1DA499] text-[#1DA499] px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#1DA499] hover:text-white transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            Alle Termine im Schulkalender
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
