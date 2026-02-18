export const schoolInfo = {
  name: "Realschule Am Heimbach",
  shortName: "RS Heimbach",
  address: "Heimbachstraße 10",
  city: "53840 Troisdorf",
  phone: "02241 - 77715",
  fax: "02241 - 77716",
  email: "sekretariat@rs-heimbach.de",
  instagram: "rs_heimbach",
  students: 590,
  teachers: 55,
  specialEdTeachers: 5,
  founded: 1975,
  motto: "Gemeinsam wachsen – Zukunft gestalten",
};

export const navItems = [
  {
    label: "Unsere Schule",
    href: "/unsere-schule",
    children: [
      { label: "Über uns", href: "/unsere-schule" },
      { label: "Schulleitung", href: "/unsere-schule/schulleitung" },
      { label: "Lehrerkollegium", href: "/lehrer" },
      { label: "Schülervertretung (SV)", href: "/unsere-schule/sv" },
      { label: "Schulprogramm", href: "/unsere-schule/schulprogramm" },
    ],
  },
  {
    label: "Ganztag",
    href: "/ganztag",
    children: [
      { label: "Unterrichtszeiten", href: "/ganztag#zeiten" },
      { label: "Fächer", href: "/ganztag#faecher" },
      { label: "Wahlunterricht", href: "/ganztag#wahl" },
      { label: "Mensa", href: "/ganztag#mensa" },
      { label: "Projekte", href: "/ganztag#projekte" },
    ],
  },
  {
    label: "Aktuelles",
    href: "/aktuelles",
    children: [
      { label: "News & Schulleben", href: "/aktuelles" },
      { label: "Veranstaltungen", href: "/veranstaltungen" },
      { label: "Kunst-Blog", href: "/kunst-blog" },
      { label: "Schülerzeitung", href: "/aktuelles/schuelerzeitung" },
    ],
  },
  {
    label: "Beratung & Service",
    href: "/beratung",
    children: [
      { label: "Schulberatung", href: "/beratung" },
      { label: "Eltern", href: "/eltern" },
      { label: "Förderverein", href: "/foerderverein" },
      { label: "Downloads", href: "/service" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
];

export const teachers = [
  {
    id: 1,
    name: "Frau Stephanie Weber",
    role: "Schulleiterin",
    subjects: ["Deutsch", "Geschichte"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Seit 2015 leitet Frau Weber unsere Schule mit großem Engagement für individuelle Förderung und modernes Lernen.",
  },
  {
    id: 2,
    name: "Herr Thomas Müller",
    role: "Stellvertretender Schulleiter",
    subjects: ["Mathematik", "Physik"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Herr Müller bringt innovative Unterrichtsmethoden in den MINT-Bereich und koordiniert unsere Inklusion.",
  },
  {
    id: 3,
    name: "Frau Anna Beyers",
    role: "Lehrerin",
    subjects: ["Kunst", "Geschichte"],
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop",
    bio: "Frau Beyers begeistert Schülerinnen und Schüler für Kunst und kreatives Gestalten. Ihre Graffiti-Projekte sind legendär.",
  },
  {
    id: 4,
    name: "Herr Hans-Ulrich Herzog",
    role: "Lehrer & AG-Leiter",
    subjects: ["Technik", "Sport"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: 'Herr Herzog leitet die beliebte "Erfinder-AG" und bringt technische Kreativität in den Schulalltag.',
  },
  {
    id: 5,
    name: "Frau Petra Strack",
    role: "Lehrerin & Medienpädagogin",
    subjects: ["Deutsch", "Medien"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    bio: "Frau Strack verbindet Sprache und digitale Medien – von Videoschnitt bis zur Schülerzeitung.",
  },
  {
    id: 6,
    name: "Frau Claudia Richter",
    role: "Sonderpädagogin",
    subjects: ["Förderpädagogik", "Inklusion"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    bio: "Frau Richter begleitet Schülerinnen und Schüler mit besonderem Förderbedarf liebevoll auf ihrem Lernweg.",
  },
  {
    id: 7,
    name: "Herr Michael Schneider",
    role: "Lehrer & Sportkoordinator",
    subjects: ["Sport", "Biologie"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Herr Schneider koordiniert Sport-AGs und Projekttage und hat das Zirkusprojekt ins Leben gerufen.",
  },
  {
    id: 8,
    name: "Frau Julia Hartmann",
    role: "Lehrerin",
    subjects: ["Englisch", "Erdkunde"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    bio: "Frau Hartmann organisiert Austauschprogramme und internationale Projekte für unsere Schülerinnen und Schüler.",
  },
];

export const events = [
  {
    id: 1,
    title: "Tag der offenen Tür 2026",
    date: "2026-03-21",
    time: "10:00 – 14:00 Uhr",
    location: "Realschule Am Heimbach",
    category: "Schule",
    color: "blue",
    description:
      "Lernen Sie unsere Schule kennen! Führungen, Mitmachangebote, Gespräche mit Lehrern und Schülerinnen und Schülern. Wir freuen uns auf Sie!",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Elternsprechtag Frühjahr",
    date: "2026-03-05",
    time: "14:00 – 18:30 Uhr",
    location: "Schulgebäude",
    category: "Eltern",
    color: "green",
    description:
      "Persönliche Gespräche mit den Fachlehrer*innen Ihres Kindes. Bitte melden Sie sich vorab über das Schulportal an.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Känguru-Wettbewerb Mathematik",
    date: "2026-03-19",
    time: "8:15 Uhr",
    location: "Schulgebäude",
    category: "Wettbewerb",
    color: "orange",
    description:
      "Mathe-Knobeln für alle Jahrgangsstufen! Der internationale Känguru-Wettbewerb fördert logisches Denken und Freude an Mathematik.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Zirkusprojektwoche",
    date: "2026-06-15",
    time: "8:15 – 15:40 Uhr",
    location: "Schulhof & Turnhalle",
    category: "Projekt",
    color: "purple",
    description:
      "Eine Woche voller Akrobatik, Jonglage und Artistik! Zusammen mit SPORTAG verwandeln wir unsere Schule in einen Zirkus.",
    image: "https://images.unsplash.com/photo-1567602878053-eb5e4b2de940?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Erfinder-AG Präsentation",
    date: "2026-02-26",
    time: "14:00 Uhr",
    location: "Aula",
    category: "Schule",
    color: "blue",
    description:
      "Die Erfinder-AG stellt ihre diesjährigen Projekte vor. Von cleveren Alltagshelfern bis zu umweltfreundlichen Lösungen – kreative Ideen unserer Schülerinnen und Schüler.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Anmeldung Klasse 5 – Schuljahr 2026/27",
    date: "2026-02-10",
    time: "8:00 – 12:00 Uhr",
    location: "Sekretariat",
    category: "Anmeldung",
    color: "red",
    description:
      "Herzlich willkommen zukünftige Fünftklässler! Bringen Sie bitte alle Unterlagen mit. Beratung und Unterstützung erhalten Sie von unserem Team.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop",
  },
];

export const newsItems = [
  {
    id: 1,
    title: "Schickes neues Fenster fürs Büdchen",
    date: "2025-06-10",
    category: "SV-News",
    excerpt:
      "Die Schülervertretung hat das SV-Büdchen mit einem neuen, selbstgestalteten Fenster verschönert. Ein tolles Gemeinschaftsprojekt!",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=500&fit=crop",
    slug: "sv-fenster-2025",
  },
  {
    id: 2,
    title: 'Erfinder-AG dreht Videoclip "Sport macht Spaß"',
    date: "2025-03-19",
    category: "Projekte",
    excerpt:
      "Schülerinnen und Schüler der Erfinder-AG produzieren einen Videoclip zur Bewegungsförderung. In nur vier Stunden entstand ein beeindruckendes Werk!",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
    slug: "erfinder-ag-video-2025",
  },
  {
    id: 3,
    title: "Betriebserkundung bei Harry Brot",
    date: "2025-05-15",
    category: "Ausflüge",
    excerpt:
      "Klasse 8b besichtigt die Großbäckerei Harry Brot und lernt moderne Produktionstechniken und Berufsfelder kennen.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop",
    slug: "harry-brot-2025",
  },
  {
    id: 4,
    title: "Graffiti im Kunstunterricht – Klasse 6c",
    date: "2025-02-14",
    category: "Kunst",
    excerpt:
      "Unter Anleitung von Frau Beyers verwandeln Schülerinnen und Schüler die Schulwand in ein buntes Kunstwerk. Street Art meets Schule!",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=500&fit=crop",
    slug: "graffiti-6c-2025",
  },
  {
    id: 5,
    title: "Kölner Opernkiste bringt Mozart ans Heimbach",
    date: "2024-03-19",
    category: "Musik",
    excerpt:
      'Alle 5er und 6er erlebten Mozarts Zauberflöte live – und sangen die Arien selbst mit! Ein unvergessliches Erlebnis für unsere jüngsten Schüler*innen.',
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=500&fit=crop",
    slug: "oper-2024",
  },
  {
    id: 6,
    title: "5er-Party – Willkommen an der RS Heimbach!",
    date: "2024-12-13",
    category: "Schulleben",
    excerpt:
      "Die Schülervertretung organisiert die jährliche Party für die neuen Fünftklässler – Spiele, Musik und ein herzliches Miteinander.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    slug: "5er-party-2024",
  },
];

export const artBlogPosts = [
  {
    id: 1,
    title: "Graffiti & Street Art – Klasse 6c",
    artist: "Klasse 6c mit Frau Beyers",
    date: "2025-02-14",
    category: "Malerei & Grafik",
    excerpt:
      "Im Kunstunterricht der Klasse 6c entstand ein atemberaubendes Graffiti-Kunstwerk. Von Skizze bis Farbgebung – ein kreativer Prozess, der begeistert.",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=500&fit=crop",
    tags: ["Graffiti", "Kunst", "Klasse 6"],
  },
  {
    id: 2,
    title: "Portfolios zur Welt der Griechen",
    artist: "Klasse 6c mit Frau Beyers",
    date: "2024-04-20",
    category: "Gestaltung & Design",
    excerpt:
      "Im Geschichtsunterricht entstanden kreative Portfolios zur Antike. Geschichte und Kunst verbinden sich zu einem einzigartigen Projekt.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=500&fit=crop",
    tags: ["Geschichte", "Design", "Portfolio"],
  },
  {
    id: 3,
    title: "SV-Logo Kunstwerk von Lucy (9c)",
    artist: "Lucy, Klasse 9c",
    date: "2025-05-12",
    category: "Illustration",
    excerpt:
      "Lucy aus der 9c gestaltete das neue SV-Büro-Bild mit dem Schülervertretungslogo – ein professionelles Kunstwerk, das alle begeistert.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop",
    tags: ["SV", "Logo", "Illustration"],
  },
  {
    id: 4,
    title: "Müllkampagne – Kreative Umweltkunst",
    artist: "Erfinder-AG mit Herrn Herzog",
    date: "2024-04-15",
    category: "Angewandte Kunst",
    excerpt:
      "Witzige Sprüche auf Mülltonnen: Die Erfinder-AG gestaltete kreative Aufkleber zur Umweltbewusstseinsstärkung auf dem Schulhof.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=500&fit=crop",
    tags: ["Umwelt", "Design", "Kampagne"],
  },
  {
    id: 5,
    title: "Spielplatz-Modell – Träume aus Pappe",
    artist: "Erfinder-AG mit Herrn Herzog",
    date: "2024-03-20",
    category: "3D & Modellbau",
    excerpt:
      "Schülerinnen und Schüler bauten Modelle ihres Traumspielplatzes – mit echten Präsentationen vor dem Bürgermeister!",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=500&fit=crop",
    tags: ["Modellbau", "Kreativität", "Projekt"],
  },
  {
    id: 6,
    title: "Schülerzeitung – Heimbachbote #5",
    artist: "Redaktion Schülerzeitung",
    date: "2024-12-05",
    category: "Medien & Design",
    excerpt:
      "Die fünfte Ausgabe des Heimbachboten ist erschienen! Schülerinnen und Schüler berichten, interviewen und gestalten ihr eigenes Magazin.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
    tags: ["Zeitung", "Medien", "Redaktion"],
  },
];

export const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=600&fit=crop",
    caption: "Tag der offenen Tür 2025 – so viele neugierige Gesichter! 🎉 #RSHeimbach #Troisdorf",
    likes: 142,
    comments: 18,
    date: "2025-11-16",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
    caption: 'Unsere Erfinder-AG im Einsatz 💡 "Sport macht Spaß" – der Videoclip ist fertig! #Erfinder',
    likes: 98,
    comments: 12,
    date: "2025-03-20",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop",
    caption: "Mittagspause in der Mensa 🍽️ Heute: Pasta Bolognese und Salatbar. #Schulessen #Mensa",
    likes: 76,
    comments: 9,
    date: "2025-04-08",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=600&fit=crop",
    caption: "Street Art im Kunstunterricht 🎨 Klasse 6c mit Frau Beyers. #Graffiti #Kunst",
    likes: 215,
    comments: 31,
    date: "2025-02-14",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=600&fit=crop",
    caption: "Känguru-Wettbewerb 2025 🦘 Mathe macht Spaß! #Mathematik #Känguru",
    likes: 63,
    comments: 5,
    date: "2025-04-03",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop",
    caption: "5er-Party 2024 🎊 Herzlich willkommen, neue Fünftklässler! #RSHeimbach #Willkommen",
    likes: 189,
    comments: 24,
    date: "2024-12-13",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=600&h=600&fit=crop",
    caption: "Mozarts Zauberflöte in der Aula 🎭 Die Kölner Opernkiste war da! #Mozart #Musik",
    likes: 134,
    comments: 16,
    date: "2024-03-19",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop",
    caption: "Projekttag Zukunftsberufe 🚀 Klasse 9 erkundet die Arbeitswelt #Berufsorientierung",
    likes: 87,
    comments: 11,
    date: "2025-01-22",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=600&fit=crop",
    caption: "Neues SV-Büdchen Fenster ✨ Selbst gestaltet von unserer SV! #SV #Schüler",
    likes: 101,
    comments: 14,
    date: "2025-06-10",
  },
];

export const scheduleData = [
  { period: "Offener Anfang", time: "7:40 – 8:10 Uhr", note: "Aula (5er/6er und Frühstücker)" },
  { period: "1. Stunde", time: "8:15 – 9:15 Uhr" },
  { period: "2. Stunde", time: "9:15 – 10:15 Uhr" },
  { period: "Frühstückspause", time: "10:15 – 10:35 Uhr" },
  { period: "3. Stunde", time: "10:35 – 11:35 Uhr" },
  { period: "4. Stunde", time: "11:35 – 12:35 Uhr" },
  { period: "Mittagspause", time: "12:35 – 13:15 Uhr" },
  { period: "5. Stunde", time: "13:15 – 14:15 Uhr" },
  { period: "6. Stunde", time: "14:15 – 15:15 Uhr" },
  { period: "7. Stunde", time: "15:15 – 15:40 Uhr", note: "Nur Mo, Mi, Do" },
];

export const subjects = [
  "Deutsch", "Mathematik", "Englisch", "Biologie", "Chemie", "Physik",
  "Geschichte", "Erdkunde", "Politik/Wirtschaft", "Religionslehre", "Philosophie",
  "Kunst", "Musik", "Sport", "Informatik", "Technik",
];
