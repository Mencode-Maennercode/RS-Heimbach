"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, HeartPulse, ArrowRight } from "lucide-react";
import { schoolInfo, sekretariatInfo } from "@/lib/data";

export default function ContactSection() {
  return (
    <section className="py-20 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">Kontakt</span>
          <h2 className="text-4xl font-black text-[#0a5a54]">So erreichen Sie uns</h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            Fragen zur Schule, zur Anmeldung oder eine Krankmeldung? Rufen Sie uns einfach an – wir sind für Sie da.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Telefon (groß, klickbar) */}
          <motion.a
            href={schoolInfo.phoneLink}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#0a5a54] rounded-3xl p-8 md:p-10 text-white flex items-center gap-6 group"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#1DA499] flex items-center justify-center shrink-0 shadow-xl group-hover:scale-105 transition-transform">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Direkt anrufen</div>
              <div className="text-2xl sm:text-3xl font-black leading-none mb-2">{schoolInfo.phone}</div>
              <div className="text-white/70 text-sm">Sekretariat der Realschule Am Heimbach</div>
            </div>
          </motion.a>

          {/* Öffnungszeiten */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center"><Clock className="w-5 h-5 text-white" /></div>
              <h3 className="font-black text-[#0a5a54]">Sekretariat</h3>
            </div>
            <div className="space-y-1.5 text-sm">
              {sekretariatInfo.hours.map((h) => (
                <div key={h.day} className="flex justify-between">
                  <span className="text-slate-500">{h.day}</span>
                  <span className="font-semibold text-slate-800">{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Untere Reihe: Adresse, E-Mail, Krankmeldung */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <a
            href="https://maps.google.com/?q=Heimbachstraße+10,+53840+Troisdorf"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-blue-600" /></div>
            <div>
              <div className="font-bold text-slate-900 text-sm mb-0.5">Adresse</div>
              <div className="text-slate-600 text-sm">{schoolInfo.address}, {schoolInfo.city}</div>
              <div className="text-[#1DA499] text-xs font-bold mt-1 flex items-center gap-1">In Google Maps öffnen <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></div>
            </div>
          </a>

          <a href={`mailto:${schoolInfo.email}`} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-rose-600" /></div>
            <div>
              <div className="font-bold text-slate-900 text-sm mb-0.5">E-Mail</div>
              <div className="text-slate-600 text-sm break-all">{schoolInfo.email}</div>
            </div>
          </a>

          <Link href="/krankmeldung" className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center shrink-0"><HeartPulse className="w-5 h-5 text-[#e8442a]" /></div>
            <div>
              <div className="font-bold text-slate-900 text-sm mb-0.5">Krankmeldung</div>
              <div className="text-slate-600 text-sm">Vorgehen im Krankheitsfall</div>
              <div className="text-[#1DA499] text-xs font-bold mt-1 flex items-center gap-1">Mehr erfahren <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
