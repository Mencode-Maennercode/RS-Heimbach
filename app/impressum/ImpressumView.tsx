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
              <p className="text-slate-600 text-sm mt-3">
                Die {schoolInfo.name} ist eine öffentliche Schule in Trägerschaft der Stadt Troisdorf
                (Realschule, keine eigene Rechtspersönlichkeit).
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Vertreten durch</h2>
              <p className="text-slate-700">
                Schulleiter Frank Herbst
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Kontakt</h2>
              <p className="text-slate-700">
                Telefon: {schoolInfo.phone}<br />
                Telefax: {schoolInfo.fax}<br />
                E-Mail: {schoolInfo.email}
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Zuständige Aufsichtsbehörde</h2>
              <p className="text-slate-700">
                Bezirksregierung Köln<br />
                Zeughausstraße 2–10<br />
                50667 Köln
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
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">
                Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
              </h2>
              <p className="text-slate-700">
                Frank Herbst (Schulleiter)<br />
                {schoolInfo.address}<br />
                {schoolInfo.city}
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Haftung für Inhalte</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als
                Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
                den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir
                diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Haftung für Links</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unsere Website enthält Links zu externen Websites Dritter (z. B. zu Instagram, Google
                Maps oder unserem eigenen Nextcloud-Formular für Krankmeldungen unter
                cloud.rs-heimbach.de), auf deren Inhalte wir keinen Einfluss haben. Für diese fremden
                Inhalte können wir daher keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
                ist stets der jeweilige Anbieter verantwortlich. Verlinkte Seiten wurden zum Zeitpunkt
                der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung
                nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                umgehend entfernen.
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Urheberrecht</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>

            <div className="bg-[#f8f9ff] rounded-2xl p-7">
              <h2 className="text-xl font-black text-[#1a3a6b] mb-4">Bildnachweis</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Die meisten Fotografien auf dieser Website (u. a. Kollegium, Schulleitung, Schulleben,
                Instagram-Beiträge) sind eigene Aufnahmen der {schoolInfo.name}. Einzelne Symbolbilder
                ohne erkennbaren Bezug zu unserer Schule stammen von der Bildagentur Unsplash Inc. und
                werden gemäß der Unsplash-Lizenz genutzt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
