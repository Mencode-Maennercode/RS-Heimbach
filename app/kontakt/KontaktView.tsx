"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Instagram, FileText, Calendar, HeartPulse, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { schoolInfo } from "@/lib/data";
import { getEnrollmentInfo } from "@/lib/schoolYear";

export default function KontaktPage() {
  const { isOpen: enrollmentOpen } = getEnrollmentInfo();
  const [mailOpened, setMailOpened] = useState(false);

  // Statischer Export hat keinen Server, der das Formular entgegennehmen
  // koennte. Statt eines Drittanbieter-Formularservices (der als externer
  // Auftragsverarbeiter in der Datenschutzerklaerung fehlt) oeffnet der
  // Klick auf "Absenden" einen vorausgefuellten Mail-Entwurf im E-Mail-
  // Programm des Besuchers, adressiert an schoolInfo.email. Der eigentliche
  // Versand passiert erst, wenn der Besucher dort selbst auf "Senden" klickt.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const vorname = form.get("vorname");
    const nachname = form.get("nachname");
    const email = form.get("email");
    const betreff = form.get("betreff");
    const nachricht = form.get("nachricht");

    const subject = `Kontaktformular: ${betreff} – ${vorname} ${nachname}`;
    const body = [
      `Name: ${vorname} ${nachname}`,
      `E-Mail: ${email}`,
      `Betreff: ${betreff}`,
      "",
      "Nachricht:",
      nachricht,
      "",
      "— Gesendet über das Kontaktformular auf rs-heimbach.de",
    ].join("\n");

    window.location.href = `mailto:${schoolInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailOpened(true);
    e.currentTarget.reset();
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">Kontakt</span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Wir sind für Sie da</h1>
            <p className="text-white/80 text-xl max-w-xl">
              Haben Sie Fragen? Wir helfen Ihnen gerne weiter – Sekretariat, Schulleitung oder direkt per E-Mail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Telefon prominent + Anmeldung */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Großer Telefon-Block */}
            <a href={schoolInfo.phoneLink} className="lg:col-span-2 bg-[#0a5a54] rounded-3xl p-8 md:p-10 text-white flex items-center gap-6 group">
              <div className="w-20 h-20 rounded-3xl bg-[#1DA499] flex items-center justify-center shrink-0 shadow-xl group-hover:scale-105 transition-transform">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Direkt anrufen</div>
                <div className="text-4xl sm:text-5xl font-black leading-none mb-2">{schoolInfo.phone}</div>
                <div className="text-white/70 text-sm">Mo–Fr im Sekretariat · {schoolInfo.email}</div>
              </div>
            </a>

            {/* Krankmeldung */}
            <Link href="/krankmeldung" className="group bg-[#f8f9ff] rounded-3xl p-7 flex flex-col justify-center hover:bg-[#f0fffe] transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#e8442a] flex items-center justify-center mb-3"><HeartPulse className="w-5 h-5 text-white" /></div>
              <h3 className="font-black text-[#0a5a54] mb-1">Krankmeldung</h3>
              <p className="text-slate-600 text-sm">Ihr Kind ist krank? Bitte am selben Tag bis 8:00 Uhr über unser Online-Formular abmelden.</p>
              <span className="text-[#1DA499] text-xs font-bold mt-2 flex items-center gap-1">Zum Formular <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
            </Link>
          </div>

          {/* Anmeldung Klasse 5 — nur waehrend der Anmeldephase (siehe
              getEnrollmentInfo, gleiche Logik wie der CTA-Banner im Footer). */}
          {enrollmentOpen && (
            <div className="mt-6 bg-white border border-[#1DA499]/20 rounded-3xl p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-[#1DA499]/10 flex items-center justify-center"><FileText className="w-5 h-5 text-[#1DA499]" /></div>
                  <div>
                    <h3 className="font-black text-[#0a5a54]">Anmeldung Klasse 5</h3>
                    <p className="text-slate-500 text-xs">Schuljahr 2026/2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                  <Calendar className="w-4 h-4 text-[#e8442a]" /> Termine im Zeitraum Mo, 23.02.2026 – Fr, 19.03.2026
                </div>
                <p className="text-slate-600 text-sm sm:ml-auto">
                  <span className="inline-flex items-center gap-1.5 text-[#e8442a] font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" /> Nur mit Termin
                  </span>
                  {" "}— bitte vorher telefonisch vereinbaren. Details unter{" "}
                  <Link href="/anmeldung" className="text-[#1DA499] font-bold hover:underline">Anmeldung</Link>.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-24 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: MapPin, label: "Adresse", value: `${schoolInfo.address}\n${schoolInfo.city}`, color: "from-blue-500 to-blue-700" },
                { icon: Phone, label: "Telefon", value: schoolInfo.phone, color: "from-emerald-500 to-emerald-700" },
                { icon: Mail, label: "E-Mail", value: schoolInfo.email, color: "from-rose-500 to-rose-700" },
                { icon: Clock, label: "Sekretariat", value: "Mo 07:30–13:30 Uhr\nDi & Fr 07:30–13:00 Uhr\nMi & Do 07:30–15:45 Uhr", color: "from-amber-500 to-amber-700" },
                { icon: Instagram, label: "Instagram", value: `@${schoolInfo.instagram}`, color: "from-purple-500 to-pink-600" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">{item.label}</div>
                      <div className="text-slate-800 font-semibold text-sm whitespace-pre-line">{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-sm"
            >
              <h2 className="text-2xl font-black text-[#1a3a6b] mb-7">Nachricht senden</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vorname *</label>
                    <input
                      type="text"
                      name="vorname"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nachname *</label>
                    <input
                      type="text"
                      name="nachname"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all"
                    placeholder="max.mustermann@email.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Betreff *</label>
                  <select name="betreff" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all bg-white">
                    <option>Allgemeine Anfrage</option>
                    <option>Anmeldung / Schulwechsel</option>
                    <option>Elterngespräch</option>
                    <option>Technische Frage</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nachricht *</label>
                  <textarea
                    name="nachricht"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 transition-all resize-none"
                    placeholder="Ihre Nachricht an uns..."
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="datenschutz" className="mt-0.5 rounded" required />
                  <label htmlFor="datenschutz" className="text-sm text-slate-600">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                    <a href="/datenschutz" className="text-[#1a3a6b] font-semibold hover:underline">Datenschutzerklärung</a> zu.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 gradient-hero text-white py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  Nachricht absenden
                </button>
                {mailOpened && (
                  <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Ihr E-Mail-Programm hat sich mit einem vorausgefüllten Entwurf geöffnet. Bitte dort noch auf „Senden" klicken.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f9ff] flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-[#1a3a6b] mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-lg">Heimbachstraße 10, 53840 Troisdorf</p>
            <a
              href="https://maps.google.com/?q=Heimbachstraße+10,+53840+Troisdorf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#1a3a6b] font-bold text-sm border-2 border-[#1a3a6b] px-6 py-2.5 rounded-xl hover:bg-[#1a3a6b] hover:text-white transition-all"
            >
              In Google Maps öffnen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
