/**
 * Redaktionelle Beschreibung aller festen Seiten fuer die Suche.
 *
 * Der Fliesstext jeder Seite wird beim Build automatisch aus dem gerenderten
 * HTML gezogen (scripts/enrich-search-index.mjs) -- hier stehen nur die Dinge,
 * die im Seitentext NICHT vorkommen: wie Eltern und Schueler nach der Seite
 * suchen. "Krankmeldung" steht auf der Seite, "kind ist krank", "entschuldigung"
 * und "abmelden" stehen dort nirgends -- gesucht wird aber genau danach.
 *
 * Beim Anlegen einer neuen Seite unter app/ meldet der Build eine Warnung,
 * solange hier kein Eintrag existiert. Vergessen kann man es also nicht.
 *
 * boost: redaktionelle Wichtigkeit 0..1. Entspricht den Prioritaeten aus
 * app/sitemap.ts -- was Eltern am haeufigsten suchen, steht oben.
 */

/**
 * @typedef {object} SearchPage
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {number} boost
 * @property {string[]} keywords Synonyme, Umgangssprache, typische Tippfehlerquellen
 */

/** @type {SearchPage[]} */
export const searchPages = [
  {
    url: "/",
    title: "Startseite",
    description: "Realschule Am Heimbach in Troisdorf – Aktuelles, Termine und Überblick.",
    boost: 1.0,
    keywords: [
      "home", "startseite", "hauptseite", "willkommen", "aktuelles", "news", "neuigkeiten",
      "meldungen", "uebersicht", "realschule am heimbach", "rs heimbach", "schule troisdorf",
    ],
  },
  {
    url: "/krankmeldung",
    title: "Krankmeldung",
    description: "Ihr Kind ist krank? Hier online abmelden – Formular, Fristen und Entschuldigung.",
    boost: 0.95,
    keywords: [
      "krank", "krankmeldung", "krankmelden", "krank melden", "kind ist krank", "krankheit",
      "abmelden", "abmeldung", "abwesend", "abwesenheit", "fehlen", "fehlt", "fehltag",
      "fehlzeiten", "entschuldigung", "entschuldigen", "entschuldigungsformular", "attest",
      "arzt", "arzttermin", "krankschreibung", "nicht in der schule", "formular", "onlineformular",
      "beurlaubung", "freistellung", "unterrichtsbefreiung", "grippe", "erkrankt", "krankgemeldet",
    ],
  },
  {
    url: "/anmeldung",
    title: "Anmeldung Klasse 5",
    description: "Anmeldung für die neue Klasse 5: Termine, Unterlagen und Ablauf.",
    boost: 0.95,
    keywords: [
      "anmeldung", "anmelden", "aufnahme", "aufnehmen", "einschulung", "klasse 5", "klasse fuenf",
      "fuenftklaessler", "neue schueler", "schulwechsel", "wechseln", "uebergang", "grundschule",
      "weiterfuehrende schule", "anmeldeformular", "anmeldeunterlagen", "anmeldezeitraum",
      "anmeldetermin", "tag der offenen tuer", "schnuppertag", "kennenlernen", "platz bekommen",
      "aufnahmeverfahren", "zeugniskopie", "anmeldebogen",
    ],
  },
  {
    url: "/kontakt",
    title: "Kontakt & Anfahrt",
    description: "Adresse, Telefon, E-Mail, Anfahrt und Kontaktformular der Realschule Am Heimbach.",
    boost: 0.9,
    keywords: [
      "kontakt", "kontaktieren", "erreichen", "erreichbar", "adresse", "anschrift", "anfahrt",
      "anreise", "wegbeschreibung", "lageplan", "karte", "standort", "wo ist die schule",
      "telefon", "telefonnummer", "nummer", "anrufen", "email", "e mail", "mail", "schreiben",
      "fax", "bus", "bushaltestelle", "oepnv", "parken", "parkplatz", "heimbachstrasse",
      "troisdorf", "kontaktformular", "nachricht",
    ],
  },
  {
    url: "/unsere-schule",
    title: "Über unsere Realschule",
    description: "Profil, Zahlen und Selbstverständnis der Realschule Am Heimbach.",
    boost: 0.9,
    keywords: [
      "ueber uns", "unsere schule", "profil", "portraet", "wer wir sind", "vorstellung",
      "schulform", "realschule", "geschichte", "gegruendet", "zahlen", "fakten", "schueleranzahl",
      "wie viele schueler", "wie gross", "leitbild", "was zeichnet uns aus", "schulleben",
    ],
  },
  {
    url: "/unsere-schule/schulleitung",
    title: "Schulleitung",
    description: "Schulleiterin, Stellvertretung und Erweiterte Schulleitung im Überblick.",
    boost: 0.7,
    keywords: [
      "schulleitung", "schulleiter", "schulleiterin", "rektor", "rektorin", "konrektor",
      "konrektorin", "direktor", "direktorin", "chef", "chefin", "leitung", "leiter", "leiterin",
      "stellvertreter", "stellvertretung", "erweiterte schulleitung", "didaktische leitung",
      "wer leitet die schule", "verantwortlich",
    ],
  },
  {
    url: "/unsere-schule/sekretariat",
    title: "Sekretariat & Öffnungszeiten",
    description: "Öffnungszeiten, Telefon und Ansprechpartnerinnen im Sekretariat.",
    boost: 0.75,
    keywords: [
      "sekretariat", "sekretaerin", "buero", "verwaltung", "geschaeftszimmer", "empfang",
      "oeffnungszeiten", "sprechzeiten", "wann geoeffnet", "wann offen", "erreichbarkeit",
      "ansprechpartner", "anmeldung im buero", "schulbescheinigung", "bescheinigung",
      "formular abgeben", "unterlagen abgeben",
    ],
  },
  {
    url: "/unsere-schule/schulprogramm",
    title: "Schulprogramm & Leitbild",
    description: "Pädagogisches Konzept, Leitbild und Werte der Schule.",
    boost: 0.75,
    keywords: [
      "schulprogramm", "leitbild", "konzept", "paedagogik", "paedagogisches konzept", "werte",
      "ziele", "grundsaetze", "schulordnung", "hausordnung", "regeln", "schulentwicklung",
      "erziehung", "motto", "philosophie",
    ],
  },
  {
    url: "/unsere-schule/sv",
    title: "Schülervertretung (SV)",
    description: "Schülersprecher, SV-Team und Mitbestimmung der Schülerinnen und Schüler.",
    boost: 0.55,
    keywords: [
      "sv", "schuelervertretung", "schuelersprecher", "schulsprecher", "schuelersprecherin",
      "mitbestimmung", "mitwirkung", "schuelerrat", "klassensprecher", "sv lehrer",
      "verbindungslehrer", "vertrauenslehrer", "schuelerparlament",
    ],
  },
  {
    url: "/lehrer",
    title: "Kollegium & Lehrkräfte",
    description: "Alle Lehrerinnen und Lehrer mit Fächern, Aufgaben und Kontakt.",
    boost: 0.7,
    keywords: [
      "lehrer", "lehrerin", "lehrkraft", "lehrkraefte", "kollegium", "team", "personal",
      "wer unterrichtet", "fachlehrer", "klassenlehrer", "klassenleitung", "klassenlehrerin",
      "email lehrer", "lehrer kontakt", "wer ist mein lehrer", "referendar", "sonderpaedagoge",
    ],
  },
  {
    url: "/unterricht",
    title: "Unterricht & Bildungsgang",
    description: "Bildungsgang, Abschlüsse und Aufbau des Unterrichts von Klasse 5 bis 10.",
    boost: 0.85,
    keywords: [
      "unterricht", "bildungsgang", "schulalltag", "abschluss", "abschluesse", "mittlerer schulabschluss",
      "fachoberschulreife", "for", "qualifikation", "qualifikationsvermerk", "oberstufe", "abitur",
      "klasse 5", "klasse 10", "jahrgang", "jahrgangsstufe", "zeugnis", "noten", "versetzung",
      "lehrplan", "stundentafel",
    ],
  },
  {
    url: "/unterricht/schulzeiten",
    title: "Schulzeiten & Stundenraster",
    description: "Unterrichtszeiten, Pausen und Kurzstundenraster.",
    boost: 0.8,
    keywords: [
      "schulzeiten", "unterrichtszeiten", "stundenplan", "zeiten", "zeitraster", "stundenraster",
      "stunden", "erste stunde", "1 stunde", "sechste stunde", "schulbeginn", "unterrichtsbeginn",
      "wann faengt die schule an", "wann beginnt der unterricht", "schulschluss", "wann aus",
      "wann ende", "feierabend", "pause", "pausen", "pausenzeiten", "mittagspause", "fruehstueckspause",
      "kurzstunden", "kurzstundenplan", "hitzefrei", "60 minuten", "zeitstunden",
    ],
  },
  {
    url: "/unterricht/faecher",
    title: "Fächer & Differenzierung",
    description: "Fächerangebot, Wahlpflichtbereich und Differenzierung ab Klasse 7.",
    boost: 0.8,
    keywords: [
      "faecher", "fach", "faecherangebot", "unterrichtsfaecher", "differenzierung", "diff",
      "wahlpflicht", "wahlpflichtbereich", "wp", "wpi", "wahlfach", "waehlen", "kurs", "kurse",
      "franzoesisch", "sozialwissenschaften", "biologie", "technik", "informatik", "mathe",
      "mathematik", "deutsch", "englisch", "sport", "kunst", "musik", "religion", "praktische philosophie",
      "chemie", "physik", "erdkunde", "geschichte", "politik", "fremdsprache", "zweite fremdsprache",
    ],
  },
  {
    url: "/ganztag",
    title: "Gebundener Ganztag",
    description: "Ganztagskonzept, Wahlunterricht, Lernzeiten und Nachmittagsbetreuung.",
    boost: 0.85,
    keywords: [
      "ganztag", "ganztags", "ganztagsschule", "gebundener ganztag", "nachmittag",
      "nachmittagsunterricht", "betreuung", "nachmittagsbetreuung", "wahlunterricht", "wu",
      "ag", "ags", "arbeitsgemeinschaft", "arbeitsgemeinschaften", "angebote", "lernzeit",
      "lernzeiten", "hausaufgaben", "hausaufgabenbetreuung", "silentium", "uebermittag",
      "wie lange geht die schule", "lange tage",
    ],
  },
  {
    url: "/unterricht/mensa",
    title: "Mensa & Mittagessen",
    description: "Speiseplan, Menüpreise, Öffnungszeiten und Bestellung in der Mensa.",
    boost: 0.7,
    keywords: [
      "mensa", "essen", "mittagessen", "mittag", "verpflegung", "speiseplan", "speisekarte",
      "menue", "menueplan", "gericht", "gerichte", "kantine", "cafeteria", "kiosk", "buffet",
      "preis", "preise", "kosten", "was kostet das essen", "bezahlen", "bestellen", "abbestellen",
      "vegetarisch", "vegan", "halal", "allergie", "allergene", "unvertraeglichkeit",
      "trinken", "getraenke", "brötchen", "fruehstueck",
    ],
  },
  {
    url: "/unterricht/projekte",
    title: "Projekte & Programme",
    description: "Berufsorientierung, Praktika, Streitschlichter, Schulsanitäter und weitere Programme.",
    boost: 0.7,
    keywords: [
      "projekte", "projekt", "programme", "programm", "berufsorientierung", "berufswahl",
      "berufspraktikum", "praktikum", "praktikumsplatz", "betriebspraktikum", "kaoa",
      "potenzialanalyse", "streitschlichter", "streitschlichtung", "schulsanitaeter",
      "sanitaetsdienst", "medienscouts", "paten", "patenschaft", "austausch", "klassenfahrt",
      "wandertag", "ausflug", "sozialpraktikum", "zukunft", "beruf",
    ],
  },
  {
    url: "/beratung",
    title: "Schulberatung & Beratungsteam",
    description: "Beratungslehrkräfte, Schulsozialarbeit und Ansprechpartner bei Problemen.",
    boost: 0.75,
    keywords: [
      "beratung", "beratungsteam", "beratungslehrer", "beratungslehrerin", "schulsozialarbeit",
      "sozialarbeiter", "sozialarbeiterin", "sozialpaedagoge", "hilfe", "unterstuetzung",
      "sorgen", "probleme", "konflikt", "streit", "mobbing", "cybermobbing", "gewalt", "angst",
      "schulverweigerung", "schwierigkeiten", "vertraulich", "gespraech", "psychologe",
      "inklusion", "foerderbedarf", "lrs", "nachteilsausgleich", "sucht", "vertrauensperson",
    ],
  },
  {
    url: "/eltern/schulpflegschaft",
    title: "Schulpflegschaft",
    description: "Elternvertretung, Schulpflegschaft und Elternmitwirkung.",
    boost: 0.55,
    keywords: [
      "schulpflegschaft", "pflegschaft", "eltern", "elternvertretung", "elternvertreter",
      "elternsprecher", "elternmitwirkung", "elternbeirat", "klassenpflegschaft", "elternabend",
      "elternsprechtag", "schulkonferenz", "mitwirkung", "elternrat", "vorsitzende",
    ],
  },
  {
    url: "/foerderverein",
    title: "Förderverein",
    description: "Förderverein der Realschule Am Heimbach: Mitglied werden, spenden, unterstützen.",
    boost: 0.55,
    keywords: [
      "foerderverein", "verein", "foerdern", "foerderung", "spende", "spenden", "spendenkonto",
      "mitglied", "mitgliedschaft", "mitglied werden", "beitrag", "mitgliedsbeitrag",
      "unterstuetzen", "unterstuetzung", "beitrittserklaerung", "aufnahmeantrag", "iban",
      "ueberweisung", "helfen",
    ],
  },
  {
    url: "/veranstaltungen",
    title: "Termine & Veranstaltungen",
    description: "Schulkalender mit Terminen, Ferien, Elternsprechtagen und Veranstaltungen.",
    boost: 0.85,
    keywords: [
      "termine", "termin", "veranstaltungen", "veranstaltung", "kalender", "schulkalender",
      "jahresplan", "terminplan", "ferien", "ferienzeiten", "schulferien", "sommerferien",
      "herbstferien", "weihnachtsferien", "osterferien", "pfingstferien", "feiertage",
      "beweglicher ferientag", "elternsprechtag", "sprechtag", "zeugnisausgabe", "zeugnistag",
      "schuljahr", "schuljahresbeginn", "wann ferien", "wann frei", "schulfrei", "feste", "fest",
      "abschlussfeier", "einschulungsfeier", "projektwoche", "sportfest", "tag der offenen tuer",
    ],
  },
  {
    url: "/service",
    title: "Service & Downloads",
    description: "Formulare, Anträge und Dokumente zum Herunterladen.",
    boost: 0.7,
    keywords: [
      "service", "downloads", "download", "herunterladen", "runterladen", "datei", "dateien",
      "dokument", "dokumente", "formular", "formulare", "antrag", "antraege", "pdf", "vordruck",
      "merkblatt", "unterlagen", "papiere", "ausdrucken", "drucken", "bescheinigung",
    ],
  },
  {
    url: "/impressum",
    title: "Impressum",
    description: "Anbieterkennzeichnung und Verantwortliche der Website.",
    boost: 0.25,
    keywords: [
      "impressum", "rechtliches", "anbieter", "verantwortlich", "herausgeber", "betreiber",
      "haftung", "urheberrecht", "schultraeger", "stadt troisdorf",
    ],
  },
  {
    url: "/datenschutz",
    title: "Datenschutzerklärung",
    description: "Datenschutzhinweise nach DSGVO für diese Website.",
    boost: 0.25,
    keywords: [
      "datenschutz", "datenschutzerklaerung", "dsgvo", "daten", "personenbezogene daten",
      "privatsphaere", "cookies", "einwilligung", "auskunft", "loeschung", "datenschutzbeauftragter",
    ],
  },
];

/** Schneller Zugriff nach URL. */
export const searchPageByUrl = new Map(searchPages.map((p) => [p.url, p]));
