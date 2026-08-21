"use client";

import { Fragment } from "react";
import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, Clock, HeartPulse, FileText, Wrench, ArrowRight, AlertTriangle } from "lucide-react";
import { schoolInfo, sekretariatInfo } from "@/lib/data";
import { getEnrollmentInfo } from "@/lib/schoolYear";

const secretariatStaff = ["Frau Umlauf", "Frau Abt", "Frau Baden", "Frau Eich"];

export default function SekretariatPage() {
  const { isOpen: enrollmentOpen } = getEnrollmentInfo();

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Unsere Schule</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Sekretariat</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Die zentrale Anlaufstelle für Schülerinnen und Schüler, Eltern und Lehrkräfte – hier werden Fragen beantwortet,
              Mitteilungen entgegengenommen und Termine koordiniert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sekretariat */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a3a6b] rounded-3xl p-8 md:p-10 text-white">
            <h2 className="text-2xl font-black mb-6">Sekretariat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr_1.4fr] gap-6">
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Mitarbeiterinnen</div>
                {secretariatStaff.map((s) => (
                  <div key={s} className="text-white/80 text-sm">{s}</div>
                ))}
              </div>
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Öffnungszeiten</div>
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
                  {sekretariatInfo.hours.map((h) => (
                    <Fragment key={h.day}>
                      <span className="text-white/80 text-sm whitespace-nowrap">{h.day}:</span>
                      <span className="text-white/80 text-sm whitespace-nowrap">{h.time}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#f5a623] text-xs font-bold uppercase tracking-wide mb-2">Kontakt</div>
                <a href={schoolInfo.phoneLink} className="flex items-center gap-2 text-white/80 text-sm hover:text-white mb-1">
                  <Phone className="w-3.5 h-3.5" />{schoolInfo.phone}
                </a>
                <a href={`mailto:${schoolInfo.email}`} className="flex items-center gap-2 text-white/80 text-sm hover:text-white whitespace-nowrap">
                  <Mail className="w-3.5 h-3.5 shrink-0" />{schoolInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öffnungszeiten + Krankmeldung */}
      <section className="py-12 bg-[#f8f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Öffnungszeiten */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center"><Clock className="w-5 h-5 text-white" /></div>
                <h2 className="text-xl font-black text-[#0a5a54]">Öffnungszeiten</h2>
              </div>
              <div className="space-y-2.5">
                {sekretariatInfo.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm border-b border-slate-100 pb-2.5 last:border-0">
                    <span className="text-slate-600">{h.day}</span>
                    <span className="font-semibold text-slate-900">{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 bg-[#f8f9ff] rounded-xl px-4 py-3">{sekretariatInfo.closedNote}</p>
            </div>

            {/* Krankmeldung */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#e8442a] flex items-center justify-center"><HeartPulse className="w-5 h-5 text-white" /></div>
                <h2 className="text-xl font-black text-[#0a5a54]">Krankmeldung</h2>
              </div>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Ist Ihr Kind krank, melden Sie es bitte <strong>am selben Tag vor Unterrichtsbeginn</strong> ab –
                  telefonisch im Sekretariat.
                </p>
                <p>
                  Zusätzlich ist eine <strong>schriftliche Entschuldigung</strong> spätestens bis zum 3. Krankheitstag an die
                  Klassenlehrerin bzw. den Klassenlehrer zu übermitteln.
                </p>
                <p className="text-xs text-slate-500">
                  Beurlaubungen (Unterrichtsbefreiung) sind nur in Sonderfällen möglich und vorher schriftlich über die
                  Klassenleitung bei der Schulleitung zu beantragen.
                </p>
              </div>
              <Link
                href="/krankmeldung"
                className="group inline-flex items-center gap-1 mt-4 text-[#1DA499] text-sm font-bold hover:underline"
              >
                Mehr erfahren <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Anmeldung + Hausmeister (kurz) — Anmeldung nur waehrend der
              Anmeldephase (siehe getEnrollmentInfo, gleiche Logik wie der
              CTA-Banner im Footer). */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {enrollmentOpen && (
              <Link href="/anmeldung" className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1DA499]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#1DA499]" />
                </div>
                <div>
                  <h3 className="font-black text-[#0a5a54] mb-1 group-hover:text-[#1DA499] transition-colors">Anmeldung Klasse 5</h3>
                  <div className="inline-flex items-center gap-1.5 bg-[#e8442a]/10 text-[#e8442a] text-xs font-bold px-2.5 py-1 rounded-full mt-1 mb-2">
                    <AlertTriangle className="w-3 h-3" /> Nur mit Termin
                  </div>
                  <p className="text-slate-600 text-sm">
                    Bitte nicht ohne Termin vorbeikommen — vorher telefonisch im Sekretariat einen Termin
                    vereinbaren. Alle Infos und Unterlagen auf der Anmeldeseite.
                  </p>
                </div>
              </Link>
            )}
            <div className={`bg-white rounded-3xl p-7 shadow-sm flex items-start gap-4 ${enrollmentOpen ? "" : "lg:col-span-2"}`}>
              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-black text-[#0a5a54] mb-1">Hausmeisterei</h3>
                <p className="text-slate-600 text-sm">Zuständig für Gebäude, Technik und Außenanlagen. Anliegen bitte über das Sekretariat melden.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
