"use client";

import { motion } from "framer-motion";
import { schoolInfo } from "@/lib/data";

const sections = [
  {
    title: "1. Verantwortlicher",
    content: `Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:\n\n${schoolInfo.name}\n${schoolInfo.address}\n${schoolInfo.city}\nTelefon: ${schoolInfo.phone}\nE-Mail: ${schoolInfo.email}\n\nvertreten durch den Schulleiter Frank Herbst.`,
  },
  {
    title: "2. Datenschutzbeauftragter",
    content: `[Von der Schule zu ergänzen: Name und Kontaktdaten des behördlichen Datenschutzbeauftragten, z. B. des Datenschutzbeauftragten der Stadt Troisdorf. Diese Angabe fehlt aktuell und muss vor Veröffentlichung dieser Erklärung nachgetragen werden.]`,
  },
  {
    title: "3. Ihre Rechte als betroffene Person",
    content: `Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung (Art. 15 DSGVO). Ihnen steht außerdem ein Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie ein Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO) zu. Hierzu sowie zu weiteren Fragen können Sie sich jederzeit an die oben genannte Adresse wenden.\n\nDaneben steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu:\n\nLandesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)\nKavalleriestraße 2–4\n40213 Düsseldorf`,
  },
  {
    title: "4. Hosting",
    content: `Diese Website wird bei einem externen Dienstleister gehostet:\n\nIONOS SE, Elgendorfer Str. 57, 56410 Montabaur\n\nDer Hoster erhebt und verarbeitet in unserem Auftrag Server-Log-Daten (siehe Punkt 5) auf Grundlage eines Vertrags zur Auftragsverarbeitung nach Art. 28 DSGVO. IONOS darf diese Daten nicht für eigene Zwecke nutzen.\n\nWichtiger technischer Hinweis, den wir hier bewusst offen ansprechen: Die Übertragung zu dieser Website ist derzeit noch nicht per SSL/TLS verschlüsselt (kein "https"-Schloss im Browser). Ein Zertifikat wird nachgereicht, sobald die technischen Voraussetzungen dafür geschaffen sind. Da unser Kontaktformular ohnehin keine Daten an den Server überträgt (siehe Punkt 7), sind hiervon aktuell keine über diese Website eingegebenen personenbezogenen Daten betroffen.`,
  },
  {
    title: "5. Server-Log-Dateien",
    content: `Beim Aufruf dieser Website erhebt unser Hoster automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite, Referrer-URL, verwendeter Browser und Betriebssystem. Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien Betriebs der Website, zur Auswertung der Systemsicherheit und -stabilität sowie zu administrativen Zwecken erhoben (Art. 6 Abs. 1 lit. f DSGVO) und nicht mit anderen Datenquellen zusammengeführt.`,
  },
  {
    title: "6. Cookies",
    content: `Diese Website verwendet keine Cookies. Es findet weder ein Tracking noch eine Analyse Ihres Nutzungsverhaltens statt, und es werden keine Cookies für technische Zwecke gesetzt.`,
  },
  {
    title: "7. Kontaktformular",
    content: `Unser Kontaktformular auf der Seite "Kontakt" speichert und überträgt Ihre Eingaben nicht an unseren Server. Beim Absenden öffnet sich stattdessen ein vorausgefüllter E-Mail-Entwurf in Ihrem eigenen E-Mail-Programm, adressiert an ${schoolInfo.email}. Erst wenn Sie diesen Entwurf dort selbst absenden, wird die Nachricht über Ihren eigenen E-Mail-Anbieter verschickt – für diesen Versand gelten die Datenschutzbestimmungen Ihres E-Mail-Anbieters. Die von Ihnen per E-Mail übermittelten Daten (Name, E-Mail-Adresse, Nachricht) verarbeiten wir anschließend ausschließlich zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO) und löschen sie, sobald sie für die Bearbeitung nicht mehr erforderlich sind.\n\nBitte beachten Sie, dass eine normale E-Mail in der Regel unverschlüsselt übertragen wird. Für besonders sensible Anliegen empfehlen wir, uns stattdessen telefonisch zu kontaktieren.`,
  },
  {
    title: "8. Online-Krankmeldung",
    content: `Für Krankmeldungen verlinken wir auf ein Formular unserer eigenen Nextcloud-Installation unter cloud.rs-heimbach.de. Dort eingegebene Daten (u. a. Name des Kindes, Klasse, Zeitraum der Erkrankung) werden nicht über diese Website, sondern direkt auf diesem separaten System verarbeitet. [Von der Schule zu bestätigen: wer betreibt diese Cloud-Instanz technisch, und existiert dafür eine eigene Datenschutzinformation, auf die hier verwiesen werden kann?]`,
  },
  {
    title: "9. Schriftarten (Google Fonts)",
    content: `Diese Website nutzt die Schriftart "Inter" aus der Google-Fonts-Bibliothek. Die Schriftdatei wird jedoch beim Erstellen der Website automatisch heruntergeladen und zusammen mit den übrigen Website-Dateien auf unserem eigenen Server ausgeliefert. Es findet keine Verbindung zu Servern von Google statt, und es werden keine Daten an Google übertragen.`,
  },
  {
    title: "10. Instagram",
    content: `Wir zeigen auf unserer Startseite eine Auswahl unserer Instagram-Beiträge an. Die dazugehörigen Bilder werden dabei nicht direkt von Instagram/Meta geladen, sondern liegen ebenfalls auf unserem eigenen Server – beim Betrachten dieser Vorschau findet daher keine Datenübertragung an Meta statt. Die Schaltflächen "Folgen" und "Profil öffnen" verlinken hingegen direkt auf instagram.com. Wenn Sie auf einen dieser Links klicken, verlassen Sie unsere Website; es gilt dann die Datenschutzerklärung der Meta Platforms Ireland Limited.`,
  },
  {
    title: "11. Google Maps",
    content: `Auf der Kontaktseite verlinken wir auf unseren Standort bei Google Maps. Es handelt sich um einen einfachen Link, keine eingebettete Karte – erst wenn Sie diesen Link anklicken, wird die Seite von Google in einem neuen Tab geöffnet und es gilt die Datenschutzerklärung von Google.`,
  },
  {
    title: "12. Fotografien von Personen",
    content: `Auf dieser Website zeigen wir Fotografien von Lehrkräften und der Schulleitung sowie Impressionen aus dem Schulleben. Fotos von Mitarbeitenden in ihrer dienstlichen Funktion veröffentlichen wir auf Grundlage unseres berechtigten Interesses an einer transparenten Außendarstellung (Art. 6 Abs. 1 lit. f DSGVO). [Von der Schule zu bestätigen: Für Fotos, auf denen Schülerinnen und Schüler erkennbar sind, sollte eine dokumentierte Einwilligung der Erziehungsberechtigten vorliegen (Art. 6 Abs. 1 lit. a DSGVO). Bitte prüfen, ob ein solches Einwilligungsverfahren bereits etabliert ist.] Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft gegenüber der oben genannten Adresse widerrufen werden; das jeweilige Foto wird dann von der Website entfernt.`,
  },
  {
    title: "13. Speicherdauer",
    content: `Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweils genannten Zwecke erforderlich ist, oder solange gesetzliche Aufbewahrungsfristen dies vorschreiben.`,
  },
  {
    title: "14. Änderung dieser Datenschutzerklärung",
    content: `Wir passen diese Datenschutzerklärung an, sobald sich die Website oder die Rechtslage ändern. Es gilt jeweils die aktuell auf dieser Seite veröffentlichte Fassung.\n\nStand: September 2026`,
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
              transition={{ delay: i * 0.05 }}
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
