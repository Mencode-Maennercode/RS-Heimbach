"use client";

import { motion } from "framer-motion";
import { schoolInfo } from "@/lib/data";

export default function ImpressumPage() {
  return (
    <>
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white">
            Impressum
          </motion.h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-slate-700">
                <strong>{schoolInfo.name}</strong><br />
                {schoolInfo.address}<br />
                {schoolInfo.city}
              </p>
            </div>
            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Kontakt</h2>
              <p className="text-slate-700">
                Telefon: {schoolInfo.phone}<br />
                E-Mail: {schoolInfo.email}
              </p>
            </div>
            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Verantwortlich für den Inhalt</h2>
              <p className="text-slate-700">
                Schulleitung der Realschule Am Heimbach<br />
                {schoolInfo.address}<br />
                {schoolInfo.city}
              </p>
            </div>
            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Schulträger</h2>
              <p className="text-slate-700">
                Stadt Troisdorf<br />
                Kölner Str. 176<br />
                53840 Troisdorf
              </p>
            </div>
            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Haftungsausschluss</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als
                Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
