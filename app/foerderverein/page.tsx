"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  Users,
  Mail,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

const vorstand = [
  { name: "Melanie Viehöver", role: "Vorsitzende" },
  { name: "Christiane Strack", role: "Stellv. Vorsitzende & Schriftführerin" },
  { name: "Sigrid Fournes", role: "Kassenwartin" },
  { name: "Frank Herbst", role: "Kassenprüfer" },
  { name: "Jürgen Over", role: "Kassenprüfer" },
];

const benefits = [
  { bold: "Anschaffung von Lehr- und Lernmitteln", detail: "zur Förderung und Verbesserung des Ausbildungsniveaus" },
  { bold: "Finanzielle Unterstützung von Kindern aus sozialen Gründen", detail: "bei Klassenfahrten (bei nachgewiesener Bedürftigkeit)" },
  { bold: "Zuschüsse zu Projektarbeiten", detail: "im Rahmen der regelmäßigen Projektwochen" },
  { bold: "Aktive Mitgestaltung schulischer Möglichkeiten", detail: "– über die reguläre Ausstattung hinaus" },
  { bold: "Gewinnung von Sponsoren", detail: 'zur Verbesserung der schulischen Ausstattung im Sinne der „Öffnung der Schule nach außen"' },
  { bold: "Beschaffung zusätzlicher Praktikumsplätze", detail: "für die 9er und 10er Klassen zur besseren Vorbereitung auf das Berufsleben" },
];

const docs = [
  {
    label: "Vereinssatzung",
    file: "/Weitere%20Bilder/Satzung.pdf",
    desc: "Zweck, Struktur und Regeln des Vereins",
    icon: FileText,
  },
  {
    label: "Datenschutzerklärung",
    file: "/Weitere%20Bilder/Datenschutzerklaerung_VFRH.pdf",
    desc: "Umgang mit personenbezogenen Daten",
    icon: ShieldCheck,
  },
];

const BEITRITTSERKLAERUNG = "/Weitere%20Bilder/Beitrittserklaerung-Foerderverein.pdf";

export default function FoerdervereinPage() {
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const activeDoc = docs.find((d) => d.file === openDoc) ?? (openDoc === BEITRITTSERKLAERUNG ? { label: "Beitrittserklärung" } : null);

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
                Engagement
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Förderverein</h1>
              <p className="text-white/80 text-xl max-w-xl">
                Seit über 50 Jahren unterstützen wir die Realschule Am Heimbach – mit Herz und Engagement.
              </p>
              <a
                href="#mitglied-werden"
                className="inline-flex items-center gap-2 mt-6 bg-[#f5a623] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Mitglied werden <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="shrink-0"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-white/15 backdrop-blur-sm shadow-2xl flex items-center justify-center p-2">
                <Image
                  src="/Weitere%20Bilder/foerderverein_logo.jpg"
                  alt="Förderverein Logo"
                  width={140}
                  height={140}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Was wir tun + Bilder */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Bilder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/Weitere%20Bilder/foerderverein1.jpg"
                  alt="Förderverein Aktion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/7] shadow-xl">
                <Image
                  src="/Weitere%20Bilder/foerderverein2.png"
                  alt="Förderverein"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Unser Ziel</span>
                <h2 className="text-3xl font-black text-[#1a3a6b] mb-5">Was wir fördern</h2>
                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <motion.div
                      key={b.bold}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 p-4 bg-[#f8f9ff] rounded-2xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#1DA499] shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        <span className="font-bold text-[#1a3a6b]">{b.bold}</span>{" "}
                        <span className="text-slate-500">{b.detail}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">
              Ihre Ansprechpartner
            </span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Vorstand</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vorstand.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-4 bg-white rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1DA499] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#1a3a6b] text-sm">{v.name}</div>
                  <div className="text-xs text-slate-500">{v.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitglied werden */}
      <section id="mitglied-werden" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a3a6b] to-[#2d6a9f] rounded-3xl p-8 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Heart className="w-8 h-8 text-[#f5a623] mb-4" />
                <h3 className="text-2xl font-black mb-3">Mitglied werden</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Unterstützen Sie unsere Schülerinnen und Schüler direkt. Die Beitrittserklärung kann über den
                  Klassenlehrer oder direkt beim Förderverein eingereicht werden.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:schule.foerderverein@rs-heimbach.de"
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f5a623]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#f5a623]" />
                  </div>
                  <span className="text-sm font-semibold min-w-0 overflow-hidden">
                    schule.foerderverein<wbr />@rs-heimbach.de
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpenDoc(BEITRITTSERKLAERUNG)}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f5a623]/20 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-5 h-5 text-[#f5a623]" />
                  </div>
                  <span className="text-sm font-semibold">Beitrittserklärung ansehen</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vereinsdokumente */}
      <section className="py-16 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">Transparenz</span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Vereinsdokumente</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {docs.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <motion.button
                  key={doc.label}
                  type="button"
                  onClick={() => setOpenDoc(doc.file)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left w-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1a3a6b] flex items-center justify-center shrink-0 group-hover:bg-[#1DA499] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-[#1a3a6b] mb-1">{doc.label}</div>
                    <div className="text-sm text-slate-500 mb-3">{doc.desc}</div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1DA499]">
                      Jetzt ansehen{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      <AnimatePresence>
        {openDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenDoc(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ height: "85vh" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1a3a6b] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-[#1a3a6b]">{activeDoc?.label}</span>
                </div>
                <button
                  onClick={() => setOpenDoc(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center"
                  aria-label="Schließen"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <iframe
                src={openDoc}
                className="flex-1 w-full"
                title={activeDoc?.label}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
