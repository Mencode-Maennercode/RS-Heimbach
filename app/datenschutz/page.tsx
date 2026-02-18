"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Datenschutz auf einen Blick",
    content: `Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.`,
  },
  {
    title: "2. Datenerfassung auf dieser Website",
    content: `Die Datenschutzhinweise auf dieser Seite entsprechen den Vorgaben der DSGVO. Die Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist die Realschule Am Heimbach, Heimbachstraße 10, 53840 Troisdorf.\n\nWir erheben keine personenbezogenen Daten über unsere Website, sofern Sie uns diese nicht freiwillig mitteilen (z. B. über das Kontaktformular).`,
  },
  {
    title: "3. Kontaktformular",
    content: `Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.`,
  },
  {
    title: "4. Ihre Rechte",
    content: `Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.`,
  },
  {
    title: "5. Cookies",
    content: `Diese Website verwendet keine Tracking-Cookies. Technisch notwendige Cookies können für grundlegende Funktionen der Website eingesetzt werden. Diese werden nach dem Ende der Browsersitzung automatisch gelöscht.`,
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white">
            Datenschutzerklärung
          </motion.h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-[#f8f9ff] rounded-2xl p-7"
            >
              <h2 className="text-lg font-black text-[#1a3a6b] mb-3">{s.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
