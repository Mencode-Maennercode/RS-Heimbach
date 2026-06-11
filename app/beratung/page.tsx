"use client";

import HeroBackground from "@/components/HeroBackground";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Compass,
  MessageCircle,
  ShieldCheck,
  Handshake,
  GraduationCap,
  HeartHandshake,
  Users,
  Building2,
  UserCheck,
  Clock,
  MapPin,
  Heart,
  Lightbulb,
  Briefcase,
  FileText,
  Download,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { schoolInfo } from "@/lib/data";

/* ---------- Daten ---------- */

const topics = [
  {
    id: "beratung",
    icon: MessageCircle,
    title: "Sprechstunde & Beratung",
    desc: "Feste Sprechzeiten und vertrauliche Hilfe bei Sorgen.",
  },
  {
    id: "praevention",
    icon: ShieldCheck,
    title: "Prävention: Sucht & Gewalt",
    desc: "Gesund leben, fair miteinander – vorbeugen statt eingreifen.",
  },
  {
    id: "beruf",
    icon: Compass,
    title: "Berufsorientierung & Kooperationen",
    desc: "Schritt für Schritt zum passenden Beruf – mit echten Partnern aus der Berufswelt.",
  },
] as const;

const sprechstunde = [
  { day: "Montag", time: "9:20 – 10:20 Uhr", person: "Herr Hoffmann", role: "Sonderpädagoge", room: "Raum A016" },
  { day: "Mittwoch", time: "9:15 – 15:00 Uhr", person: "Frau Mittelbach", role: "Beratungslehrerin", room: "Raum A016" },
  { day: "Freitag", time: "13:00 – 14:00 Uhr", person: "Herr Konitz", role: "Sonderpädagoge", room: "Raum A016" },
];

const saeulen = [
  {
    icon: GraduationCap,
    title: "Ausgebildete Lehrkräfte",
    desc: "Pädagogische Fachkräfte mit Fortbildungen in Konfliktprävention, Beratung und Gesundheitsförderung.",
  },
  {
    icon: HeartHandshake,
    title: "Sonderpädagog:innen",
    desc: "Unterstützung in der individuellen Förder- und Präventionsarbeit.",
  },
  {
    icon: Users,
    title: "Peer Education",
    desc: "Ausgebildete Schüler:innen sind Ansprechpartner für ihre Mitschüler:innen – Schüler beraten Schüler.",
  },
  {
    icon: Building2,
    title: "Externe Partner",
    desc: "Enge Zusammenarbeit u. a. mit dem Dezernat Vorbeugung der Polizei (Kripo) und weiteren Beratungsstellen.",
  },
];

const einzelfall = [
  "Fachlehrerinnen und Fachlehrer",
  "Klassenleitungen",
  "GU-Kolleginnen und -Kollegen",
  "Schülervertretung (SV)",
  "Beratungslehrkräfte",
  "Schulleitung",
  "Jugendpsychologischer Dienst",
  "Jugendamt / Jugendhilfe",
];

const suchtPartner = [
  { icon: ShieldCheck, title: "Polizei", desc: "Das Dezernat Vorbeugung der Kriminalpolizei erklärt, wie man Gefahren erkennt und sich schützt." },
  { icon: Heart, title: "Diakonie", desc: "Fachleute sprechen über Alkohol, Medien und andere Süchte." },
  { icon: Lightbulb, title: "Skills4Life", desc: "Fähigkeiten fürs Leben: Entscheidungen treffen und mit Stress umgehen." },
];

const suchtAktionen = [
  { title: "Gemeinsames gesundes Frühstück", desc: "Klassen bereiten ein Frühstück zu und sprechen darüber, wie gesunde Ernährung stark macht." },
  { title: "Elternbrief im Biologie-Unterricht", desc: "Eltern erhalten Informationen über Suchtgefahren und wie sie ihre Kinder unterstützen können." },
  { title: "Peer Education", desc: "Ältere Schüler:innen erklären jüngeren, wie man mit Druck und Versuchungen umgeht." },
];

const gewaltProjekte = [
  { klasse: "5", title: "Classroom Management (CM)", desc: "Gut zusammenarbeiten, respektvoll sprechen und Konflikte vermeiden." },
  { klasse: "5", title: "Klassenfahrt zur Teambildung", desc: "Gemeinsam unterwegs – Vertrauen aufbauen und zusammenhalten." },
  { klasse: "6", title: "Projekt Ringen und Raufen", desc: "Fair kämpfen, Grenzen setzen, Selbstbeherrschung statt Gewalt." },
  { klasse: "8", title: "Ausbildung der Peers", desc: "Lernen, andere zu beraten und zu unterstützen – etwa bei Streit oder Problemen." },
];

const bausteine = [
  { title: "Betriebspraktika", desc: "Echte Einblicke in den Arbeitsalltag von Betrieben." },
  { title: "Berufsfelderkundungen", desc: "Verschiedene Berufsfelder kennenlernen und ausprobieren." },
  { title: "Bewerbungstrainings", desc: "Sicher auftreten – von der Mappe bis zum Gespräch." },
  { title: "Infoabende zu weiterführenden Schulen", desc: "Orientierung für den Weg nach der Realschule." },
  { title: "Beratung der Agentur für Arbeit", desc: "Persönliche Gespräche zu Ausbildung und Studium." },
];

const agenturHilfe = [
  "eigene Stärken, Interessen und Neigungen erkennen",
  "passende Ausbildungs- und Studienmöglichkeiten finden",
  "Bewerbungsstrategien und Praktikumsplätze besprechen",
  "Fragen zu schulischen Übergängen klären",
];

const fahrplan = [
  {
    klasse: "7",
    titel: "Erste Orientierung",
    massnahmen: [
      { title: "Boys' & Girls' Day", desc: "Bundesweiter Aktionstag: Berufe kennenlernen, in denen Frauen bzw. Männer bislang unterrepräsentiert sind." },
    ],
  },
  {
    klasse: "8",
    titel: "Stärken entdecken",
    massnahmen: [
      { title: "Potenzialanalyse", desc: "Individuelle Fähigkeiten, Interessen und Stärken frühzeitig entdecken." },
      { title: "Berufserleben", desc: "Verschiedene Berufsfelder aktiv erleben und ausprobieren." },
      { title: "Berufswahlpass im Politikunterricht", desc: "Begleitet die Schüler:innen über mehrere Schuljahre hinweg." },
      { title: "Bewerbungen im Deutschunterricht", desc: "Das Rüstzeug für die Bewerbung um einen Praktikums- oder Ausbildungsplatz." },
      { title: "3-tägiges Praktikum", desc: "Erste praxisnahe Einblicke in die Berufswelt." },
    ],
  },
  {
    klasse: "9",
    titel: "Praxis sammeln",
    massnahmen: [
      { title: "3-wöchiges Betriebspraktikum", desc: "Die Arbeitswelt intensiv und realistisch kennenlernen." },
      { title: "Berufswahlbörsen", desc: "Orientierung aus erster Hand zu Ausbildung und Studium in der Region." },
      { title: "Berufsberatung an der Schule", desc: "Professionelle Unterstützung der Agentur für Arbeit bei der Zukunftsplanung." },
    ],
  },
  {
    klasse: "10",
    titel: "Start ins Berufsleben",
    massnahmen: [
      { title: "Berufswahlbörsen", desc: "Direkte Einblicke in die Vielfalt der Ausbildungs- und Studienmöglichkeiten." },
      { title: "Berufsberatung an der Schule", desc: "Individuelle Begleitung durch die Agentur für Arbeit." },
      { title: "Bewerbungstrainings", desc: "Fit für den Start: Vorbereitung auf Bewerbungen für Praktikum, Ausbildung oder weiterführende Schule." },
    ],
  },
];

const kooperation = [
  { icon: Briefcase, title: "Ausbildungsberufe kennenlernen", desc: "Partner stellen Berufe vor – mit Aufgaben, Anforderungen und Entwicklungsmöglichkeiten." },
  { icon: Users, title: "Ehemalige als Vorbild", desc: "Ehemalige Schüler:innen berichten aus Ausbildung und Beruf und geben Orientierung." },
  { icon: MessageCircle, title: "Training für Bewerbungsgespräche", desc: "Realitätsnahe Übungssituationen mit hilfreichem Feedback und Tipps." },
];

const partnerLogos = [
  "Harry-Brot GmbH",
  "Elektro Böhm",
  "Agentur für Arbeit",
  "Jugendbüro",
  "Polizei (Kripo)",
  "Diakonie",
  "Skills4Life",
];

/* ---------- Bausteine ---------- */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl mb-12">
      <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2 block">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl font-black text-[#0a5a54]">{title}</h2>
      {lead && <p className="text-slate-600 leading-relaxed mt-4 text-lg">{lead}</p>}
    </div>
  );
}

/* ---------- Panel-Inhalte ---------- */

const FLYER_PATH = "/Weitere%20Bilder/Sond.paed_._Fachberatung_RSK_Flyer2023-08%20(1).pdf";

function BeratungPanel() {
  const [flyerOpen, setFlyerOpen] = useState(false);

  return (
    <>
      <SectionHeading
        eyebrow="Persönliche Beratung"
        title="Sprechstunde & Beratungskonzept"
        lead="Seit vielen Jahren hat die Schule ein umfassendes Konzept zur Vorbeugung von Gewalt, Mobbing und Sucht. Es wird regelmäßig überprüft und an die Bedürfnisse der Schulgemeinschaft angepasst."
      />

      {/* Sprechstunden-Zeiten */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="bg-[#0a5a54] rounded-3xl p-8 md:p-10 text-white mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#1DA499] flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black leading-tight">Schüler:innen-Sprechstunde</h3>
            <p className="text-white/70 text-sm">Komm einfach vorbei oder schreib uns – ganz vertraulich.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sprechstunde.map((s) => (
            <div key={s.day} className="bg-white/10 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-1">{s.day}</div>
              <div className="flex items-center gap-1.5 text-lg font-black mb-3">
                <Clock className="w-4 h-4 text-white/70" /> {s.time}
              </div>
              <div className="font-semibold">{s.person}</div>
              <div className="text-sm text-white/70">{s.role}</div>
              <div className="flex items-center gap-1.5 text-sm text-white/70 mt-2">
                <MapPin className="w-3.5 h-3.5 text-[#f5a623]" /> {s.room}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vier Säulen */}
      <h3 className="text-lg font-black text-[#0a5a54] mb-5">Worauf das Beratungskonzept aufbaut</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {saeulen.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title} {...fadeUp} transition={{ delay: 0.1 + i * 0.07 }} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#1DA499]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#1DA499]" />
              </div>
              <h4 className="font-black text-[#0a5a54] mb-2">{s.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Einzelfallberatung */}
      <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-black text-[#0a5a54] mb-3">Einzelfallberatung</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bei Bedarf findet eine individuelle Beratung statt – je nach Situation durch die passenden Ansprechpartner.
              Die Gespräche finden häufig im Beratungsraum neben dem Sekretariat statt.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 self-center">
            {einzelfall.map((e) => (
              <div key={e} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#1DA499] shrink-0" />
                {e}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setFlyerOpen(true)}
            className="group w-full flex items-center gap-4 p-4 bg-[#f8f9ff] hover:bg-[#0a5a54] rounded-2xl transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0a5a54] group-hover:bg-white/15 flex items-center justify-center shrink-0 transition-colors">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-black text-[#0a5a54] group-hover:text-white text-sm transition-colors">
                Flyer: Sonderpädagogische Fachberatung
              </div>
              <div className="text-xs text-slate-500 group-hover:text-white/60 mt-0.5 transition-colors">
                Direkt im Browser ansehen – kein Download nötig
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </motion.div>

      {/* Flyer Modal */}
      <AnimatePresence>
        {flyerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlyerOpen(false)}
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
                  <div className="w-9 h-9 rounded-xl bg-[#0a5a54] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-[#0a5a54]">Sonderpädagogische Fachberatung</span>
                </div>
                <button
                  onClick={() => setFlyerOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center"
                  aria-label="Schließen"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <iframe
                src={FLYER_PATH}
                className="flex-1 w-full"
                title="Flyer Sonderpädagogische Fachberatung"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PraeventionPanel() {
  return (
    <>
      <SectionHeading
        eyebrow="Vorbeugung"
        title="Prävention: Sucht & Gewalt"
        lead="Viele Angebote helfen unseren Schüler:innen, gesund zu leben, gut miteinander umzugehen und Probleme friedlich zu lösen."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sucht */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-[#0a5a54]">Suchtvorbeugung</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Organisiert von <strong>Frau Katzner</strong> und <strong>Frau Jünger</strong> – gemeinsam mit erfahrenen
            Fachleuten.
          </p>

          <div className="space-y-3 mb-7">
            {suchtPartner.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-3.5 bg-[#f8f9ff] rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-lg bg-[#1DA499]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#1DA499]" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{p.title}</div>
                    <div className="text-sm text-slate-600 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <h4 className="font-black text-[#0a5a54] mb-3 text-sm uppercase tracking-wide">Angebote & Aktionen</h4>
          <div className="space-y-3">
            {suchtAktionen.map((a) => (
              <div key={a.title} className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1DA499] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 text-sm">{a.title}</span>
                  <span className="text-sm text-slate-600"> – {a.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-[#0a5a54] hover:text-[#1DA499] transition-colors">
            <FileText className="w-4 h-4" /> Handlungsleitfaden Suchtprävention
            <Download className="w-4 h-4 text-slate-400" />
          </button>
        </motion.div>

        {/* Gewalt */}
        <motion.div {...fadeUp} transition={{ delay: 0.12 }} className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-[#0a5a54]">Gewaltprävention</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Damit aus Streit keine Gewalt wird – mit Streitschlichtung, festen Projekten und klaren Regeln.
          </p>

          <div className="bg-[#f8f9ff] rounded-2xl p-5 mb-4">
            <div className="font-bold text-slate-800 text-sm mb-1">Streitschlichtung</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Verantwortlich ist <strong>Frau Gerdesmeyer</strong>. Ausgebildete Schüler:innen aus den Klassen 8–10
              helfen besonders den Klassen 5–7, Konflikte friedlich zu lösen.
            </p>
          </div>

          <h4 className="font-black text-[#0a5a54] mb-3 text-sm uppercase tracking-wide">
            Projekte für ein gutes Miteinander
          </h4>
          <div className="space-y-2.5 mb-4">
            {gewaltProjekte.map((g, i) => (
              <div key={i} className="flex gap-3 bg-[#f8f9ff] rounded-2xl p-3.5">
                <span className="shrink-0 w-12 h-7 rounded-lg bg-[#1DA499]/10 text-[#1DA499] text-xs font-black flex items-center justify-center">
                  Kl. {g.klasse}
                </span>
                <div>
                  <span className="font-semibold text-slate-800 text-sm">{g.title}</span>
                  <span className="text-sm text-slate-600"> – {g.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#f8f9ff] rounded-2xl p-5">
            <div className="font-bold text-slate-800 text-sm mb-1">Trainingsraum</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bei wiederholter Unterrichtsstörung wird im Trainingsraum in Ruhe besprochen, was schieflief, wie es
              besser geht und wie der Unterricht gut weitergeht.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function BerufPanel({ onOpenGrade }: { onOpenGrade: (i: number) => void }) {
  return (
    <>
      <SectionHeading
        eyebrow="Zukunft gestalten"
        title="Berufsorientierung"
        lead="Frühzeitig und praxisnah bereiten wir unsere Schüler:innen auf ihren Bildungs- und Berufsweg vor – und helfen ihnen, eigene Stärken und Interessen zu entdecken."
      />

      <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="bg-white rounded-3xl p-8 shadow-sm mb-6 flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#0a5a54] mb-2">Unsere Ansprechpartnerinnen</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Die Studien- und Berufswahlkoordinatorinnen (StuBos) <strong>Frau Beyers</strong> und{" "}
            <strong>Frau Pieper</strong> begleiten den gesamten Prozess. Sie beraten Schüler:innen und Eltern,
            koordinieren die Maßnahmen und unterstützen bei Praktikum, Bewerbung, Ausbildung und der Wahl
            weiterführender Schulen.
          </p>
        </div>
      </motion.div>

      <h3 className="text-lg font-black text-[#0a5a54] mb-5">Bausteine der Berufsorientierung</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {bausteine.map((b, i) => (
          <motion.div key={b.title} {...fadeUp} transition={{ delay: 0.08 + i * 0.05 }} className="bg-white rounded-3xl p-6 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1DA499]/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-[#1DA499]" />
            </div>
            <div>
              <h4 className="font-black text-[#0a5a54] text-sm mb-1">{b.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-black text-[#0a5a54] mb-3">Berufsberatung an der Schule</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Fachkräfte der <strong>Agentur für Arbeit</strong> und des <strong>Jugendbüros</strong> beraten direkt an
              unserer Schule – zu Ausbildung, Studium und beruflicher Zukunft.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Das Jugendbüro ergänzt die Beratung mit außerschulischen Projekten, Förderprogrammen und Hilfe bei
              Bewerbungen und Praktika – in enger Abstimmung mit Frau Beyers und Frau Pieper.
            </p>
          </div>
          <div className="bg-[#f8f9ff] rounded-2xl p-6 self-center">
            <div className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-4">
              Persönliche Beratung hilft dabei,
            </div>
            <div className="space-y-3">
              {agenturHilfe.map((h) => (
                <div key={h} className="flex gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1DA499] shrink-0 mt-0.5" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <h3 className="text-lg font-black text-[#0a5a54] mb-1.5">Dein Fahrplan – Klasse 7 bis 10</h3>
      <p className="text-sm text-slate-600 mb-5">
        Jede Klassenstufe hat ihre eigenen Stationen. Tippe auf eine Stufe für die Details.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {fahrplan.map((g, i) => (
          <motion.button
            key={g.klasse}
            {...fadeUp}
            transition={{ delay: 0.12 + i * 0.07 }}
            type="button"
            onClick={() => onOpenGrade(i)}
            className="group text-left bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-white">{g.klasse}</span>
            </div>
            <h4 className="font-black text-[#0a5a54] mb-1">{g.klasse}. Klasse</h4>
            <p className="text-sm text-slate-500 mb-4">{g.titel}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1DA499]">
              {g.massnahmen.length} {g.massnahmen.length === 1 ? "Station" : "Stationen"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-14">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-11 h-11 rounded-2xl gradient-hero flex items-center justify-center shrink-0 shadow-md">
            <Handshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] block mb-0.5">Gemeinsam stark</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a5a54]">Außerschulische Kooperationspartner</h2>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-10 max-w-3xl">
          Durch gemeinsame Projekte, Workshops, Praktika und Veranstaltungen öffnen unsere Partner den Blick in die
          Berufswelt und machen Lernen praxisnah.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {kooperation.map((k, i) => {
            const Icon = k.icon;
            return (
              <motion.div key={k.title} {...fadeUp} transition={{ delay: 0.05 + i * 0.08 }} className="bg-white rounded-3xl p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mb-5 shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-[#0a5a54] text-lg mb-2">{k.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{k.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-[#0a5a54] rounded-3xl p-8 text-center">
          <Handshake className="w-9 h-9 text-[#f5a623] mx-auto mb-3" />
          <h3 className="text-white font-black text-xl mb-2">Unsere Partner</h3>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-6">
            Wir danken allen Kooperationspartnern für ihr Engagement und die vertrauensvolle Zusammenarbeit.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {partnerLogos.map((p) => (
              <span key={p} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ---------- Seite ---------- */

export default function BeratungPage() {
  const [activeGrade, setActiveGrade] = useState<number | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>("beratung");

  return (
    <>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#f5a623] mb-3">
              Beratung & Unterstützung
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Schulberatung</h1>
            <p className="text-white/85 text-xl max-w-2xl">
              Wir begleiten Schülerinnen, Schüler und Eltern – bei persönlichen Sorgen, in der Prävention und auf dem
              Weg in den richtigen Beruf. Vertraulich, kostenlos und immer ansprechbar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Themen-Auswahl */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 text-sm mb-8"
          >
            Wähle ein Thema – die Inhalte klappen darunter auf.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topics.map((t, i) => {
              const Icon = t.icon;
              const active = activeTopic === t.id;
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTopic((cur) => (cur === t.id ? null : t.id))}
                  aria-expanded={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`group text-left rounded-3xl p-6 transition-all duration-300 border ${
                    active
                      ? "bg-[#0a5a54] border-[#0a5a54] shadow-xl -translate-y-1"
                      : "bg-[#f8f9ff] border-transparent hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md transition-transform group-hover:scale-110 ${
                        active ? "bg-white/15" : "gradient-hero"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-all duration-300 ${
                        active ? "rotate-180 text-[#f5a623]" : "text-slate-300 group-hover:text-[#1DA499]"
                      }`}
                    />
                  </div>
                  <h3 className={`font-black mb-1.5 ${active ? "text-white" : "text-[#0a5a54]"}`}>{t.title}</h3>
                  <p className={`text-sm leading-relaxed ${active ? "text-white/75" : "text-slate-600"}`}>{t.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aufklappbarer Themen-Inhalt */}
      <AnimatePresence mode="wait" initial={false}>
        {activeTopic && (
          <motion.section
            key={activeTopic}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.3 } }}
            className="overflow-hidden bg-[#f8f9ff]"
          >
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {activeTopic === "beratung" && <BeratungPanel />}
              {activeTopic === "praevention" && <PraeventionPanel />}
              {activeTopic === "beruf" && <BerufPanel onOpenGrade={setActiveGrade} />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Kontakt-CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f8f9ff] rounded-3xl p-8 md:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3 block">Kontakt</span>
                <h2 className="text-3xl font-black text-[#0a5a54] mb-4">Beratungstermin vereinbaren</h2>
                <p className="text-slate-600 leading-relaxed">
                  Alle Beratungsangebote sind kostenlos und vertraulich. Für ein Gespräch melden Sie sich bitte vorab im
                  Sekretariat – der Beratungsraum befindet sich direkt nebenan.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={schoolInfo.phoneLink}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:bg-[#1DA499]/5 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl gradient-hero flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Telefon (Sekretariat)</div>
                    <div className="font-bold text-slate-800">{schoolInfo.phone}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-[#1DA499] transition-colors" />
                </a>
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:bg-[#1DA499]/5 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1DA499]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#1DA499]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">E-Mail</div>
                    <div className="font-bold text-slate-800 break-all">{schoolInfo.email}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 ml-auto shrink-0 group-hover:text-[#1DA499] transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal: Fahrplan-Detail */}
      <AnimatePresence>
        {activeGrade !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGrade(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="gradient-hero px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                    <span className="text-xl font-black text-white">{fahrplan[activeGrade].klasse}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg leading-tight">
                      {fahrplan[activeGrade].klasse}. Klasse
                    </h3>
                    <p className="text-white/70 text-xs">{fahrplan[activeGrade].titel}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveGrade(null)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white"
                  aria-label="Schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="space-y-3">
                  {fahrplan[activeGrade].massnahmen.map((m) => (
                    <div key={m.title} className="bg-[#f8f9ff] rounded-2xl p-4 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#1DA499] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{m.title}</div>
                        <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
