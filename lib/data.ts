export const schoolInfo = {
  name: "Realschule Am Heimbach",
  shortName: "RS Heimbach",
  address: "Heimbachstraße 10",
  city: "53840 Troisdorf",
  phone: "02241 - 77715",
  phoneLink: "tel:+49224177715",
  fax: "02241 - 75105",
  email: "schule.verwaltung@rs-heimbach.de",
  instagram: "realschule-am-heimbach",
  // Online-Krankmeldung: Nextcloud-Formular (eigene Cloud). Wird auf der Seite
  // /krankmeldung und in den Cross-Links verlinkt. Bei neuem Formular hier ändern.
  krankmeldungUrl: "https://cloud.rs-heimbach.de/apps/forms/s/5TbFkcjxm3ZDk8ajoWmGMFNn",
  students: 590,
  teachers: 55,
  specialEdTeachers: 5,
  founded: 1975,
  motto: "Gemeinsam wachsen – Zukunft gestalten",
};

export const navItems = [
  { label: "Start", href: "/" },
  {
    label: "Unsere Schule",
    href: "/unsere-schule",
    children: [
      { label: "Über uns", href: "/unsere-schule" },
      { label: "Schulleitung", href: "/unsere-schule/schulleitung" },
      { label: "Kollegium", href: "/lehrer" },
      { label: "Sekretariat", href: "/unsere-schule/sekretariat" },
      { label: "Schülervertretung (SV)", href: "/unsere-schule/sv" },
    ],
  },
  {
    label: "Schulalltag",
    href: "/unterricht",
    children: [
      { label: "Schulzeiten & Raster", href: "/unterricht/schulzeiten" },
      { label: "Fächer & Differenzierung", href: "/unterricht/faecher" },
      { label: "Ganztag & Wahlunterricht", href: "/ganztag" },
      { label: "Projekte & Programme", href: "/unterricht/projekte" },
      { label: "Mensa", href: "/unterricht/mensa" },
    ],
  },
  {
    label: "Beratung & Service",
    href: "/beratung",
    children: [
      { label: "Schulberatung", href: "/beratung" },
      { label: "Schulpflegschaft", href: "/eltern/schulpflegschaft" },
      { label: "Förderverein", href: "/foerderverein" },
      { label: "Termine", href: "/veranstaltungen" },
      { label: "Downloads", href: "/service" },
    ],
  },
];

// Lehrer- und News-Inhalte kommen aus einem Google Sheet, das per
// google-apps-script/Code.gs + scripts/sheets-sync.mjs periodisch (und
// manuell ueber das "Jetzt aktualisieren"-Menue im Sheet) nach
// lib/data/school-content.json synchronisiert wird. Siehe
// GOOGLE_SHEETS_ANLEITUNG.md fuer die Einrichtung.
import schoolContent from "./data/school-content.json";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop";

export const teachers = schoolContent.lehrer.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.rolle,
  subjects: t.faecher,
  image: t.bildUrl || FALLBACK_IMAGE,
  bio: t.bio,
}));

export const leadershipTeam = schoolContent.lehrer
  .filter((t) => t.schulleitung)
  .map((t) => ({
    name: t.name,
    role: t.rolle,
    image: t.bildUrl || FALLBACK_IMAGE,
    bio: t.bio,
    subjects: t.faecher,
    phone: t.telefon || `${schoolInfo.phone} (Sekretariat)`,
    email: t.email || schoolInfo.email,
  }));

// Beitraege mit gesetztem "Hauptbeitrag"-Feld im Sheet stehen zuerst (in der
// Reihenfolge, wie sie im Sheet stehen), der Rest danach nach Datum absteigend.
export const newsItems = [...schoolContent.news]
  .sort((a, b) => {
    if (a.hauptbeitrag && !b.hauptbeitrag) return -1;
    if (!a.hauptbeitrag && b.hauptbeitrag) return 1;
    if (a.hauptbeitrag && b.hauptbeitrag) return 0;
    return new Date(b.datum).getTime() - new Date(a.datum).getTime();
  })
  .map((n) => ({
    id: n.id,
    title: n.titel,
    date: n.datum,
    category: n.kategorie,
    excerpt: n.teaser,
    fullText: n.volltext,
    image: n.bildUrl || FALLBACK_IMAGE,
    slug: n.slug,
  }));

export const instagramPosts: Array<{
  id: number;
  type: "photo" | "reel" | "carousel";
  media: string | string[];
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  date: string;
  url: string;
}> = [
  {
    id: 1,
    type: "reel",
    media: "/Instagram/rs_heimbach_reel_22_4_2026_17_11_313880994523149263374.mp4",
    thumbnail: "/Instagram/rs_heimbach_reel_22_4_2026_17_11_313880994523149263374.mp4",
    caption: "Neue Sportgeräte in der Turnhalle! 🏀⚽ Die Schüler sind begeistert! #RSHeimbach #Sport",
    likes: 245,
    comments: 32,
    timestamp: "vor 3 Stunden",
    date: "2026-04-22",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 2,
    type: "carousel",
    media: [
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458707477757808.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458711487480216.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458714767403326.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458716990407531.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458717661463193.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458719238556918.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458723625774228.jpg",
      "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458724892464282.jpg"
    ],
    thumbnail: "/Instagram/rs_heimbach-fotostrecke/rs_heimbach_post_26_3_2026_17_17_363861458707477757808.jpg",
    caption: "Projekttag: Unsere Schule wird bunt! 🎨 Alle Klassen haben mitgemacht. #Kunstprojekt #Gemeinsam",
    likes: 189,
    comments: 24,
    timestamp: "vor 2 Tagen",
    date: "2026-03-26",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 3,
    type: "photo",
    media: "/Instagram/rs_heimbach_post_27_3_2026_13_17_503862063446833822007.jpg",
    thumbnail: "/Instagram/rs_heimbach_post_27_3_2026_13_17_503862063446833822007.jpg",
    caption: "Mittagsessen in der Mensa 🍽️ Heute: Köstliche Pasta! #Schulessen #Mensa",
    likes: 87,
    comments: 12,
    timestamp: "vor 3 Tagen",
    date: "2026-03-27",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 4,
    type: "reel",
    media: "/Instagram/rs_heimbach_reel_27_3_2026_11_48_433862018528513938118.mp4",
    thumbnail: "/Instagram/rs_heimbach_reel_27_3_2026_11_48_433862018528513938118.mp4",
    caption: "Musikunterricht mit Frau Meyer 🎵 Die Schüler rocken die Bühne! #Musik #Talent",
    likes: 156,
    comments: 19,
    timestamp: "vor 4 Tagen",
    date: "2026-03-27",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 5,
    type: "reel",
    media: "/Instagram/rs_heimbach_reel_15_2_2026_15_23_343833134361265101617.mp4",
    thumbnail: "/Instagram/rs_heimbach_reel_15_2_2026_15_23_343833134361265101617.mp4",
    caption: "Basketball-Turnier 🏀 Unser Team spielt groß auf! #Sport #Teamgeist",
    likes: 203,
    comments: 28,
    timestamp: "vor 1 Woche",
    date: "2026-02-15",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 6,
    type: "photo",
    media: "/Instagram/rs_heimbach_post_25_3_2026_17_32_233860740377477442152.jpg",
    thumbnail: "/Instagram/rs_heimbach_post_25_3_2026_17_32_233860740377477442152.jpg",
    caption: "Bibliothek neu eingerichtet 📚 Gemütliche Lese-Ecken für alle. #Lesen #Lernen",
    likes: 134,
    comments: 15,
    timestamp: "vor 1 Woche",
    date: "2026-03-25",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 7,
    type: "carousel",
    media: [
      "/Instagram/rs_heimbach-fotostrecke2/rs_heimbach_post_26_3_2026_17_22_423861461107886309454.jpg",
      "/Instagram/rs_heimbach-fotostrecke2/rs_heimbach_post_26_3_2026_17_22_423861461111459811107.jpg",
      "/Instagram/rs_heimbach-fotostrecke2/rs_heimbach_post_26_3_2026_17_22_423861461118002985532.mp4"
    ],
    thumbnail: "/Instagram/rs_heimbach-fotostrecke2/rs_heimbach_post_26_3_2026_17_22_423861461107886309454.jpg",
    caption: "Theaterstück: Romeo und Julia 🎭 Die Schüler haben brilliert! #Theater #Kultur",
    likes: 178,
    comments: 22,
    timestamp: "vor 1 Woche",
    date: "2026-03-26",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 8,
    type: "reel",
    media: "/Instagram/rs_heimbach_reel_15_2_2026_15_39_033833138454654123237.mp4",
    thumbnail: "/Instagram/rs_heimbach_reel_15_2_2026_15_39_033833138454654123237.mp4",
    caption: "Chemie-Experiment � Die Schüler sind fasziniert! #Wissenschaft #Experiment",
    likes: 167,
    comments: 21,
    timestamp: "vor 2 Wochen",
    date: "2026-02-15",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  },
  {
    id: 9,
    type: "reel",
    media: "/Instagram/rs_heimbach_reel_15_2_2026_15_41_073833144157380846057.mp4",
    thumbnail: "/Instagram/rs_heimbach_reel_15_2_2026_15_41_073833144157380846057.mp4",
    caption: "Schulgarten im Frühling 🌱 Die ersten Pflanzen sprießen! #Natur #Garten",
    likes: 145,
    comments: 18,
    timestamp: "vor 2 Wochen",
    date: "2026-02-15",
    url: "https://www.instagram.com/realschule-am-heimbach/"
  }
];

// Echte Unterrichtszeiten (60-Minuten-Zeitstunden), Quelle: alte Schul-Website
export const scheduleData = [
  { period: "1. Stunde", time: "08:15 – 09:15 Uhr" },
  { period: "2. Stunde", time: "09:15 – 10:15 Uhr" },
  { period: "Frühstückspause", time: "10:20 – 10:40 Uhr" },
  { period: "3. Stunde", time: "10:45 – 11:45 Uhr" },
  { period: "4. Stunde", time: "11:50 – 12:50 Uhr" },
  { period: "Mittagspause", time: "12:50 – 13:30 Uhr", note: "Mo, Mi, Do" },
  { period: "5. Stunde", time: "13:35 – 14:35 Uhr" },
  { period: "6. Stunde", time: "14:40 – 15:40 Uhr", note: "Ganztag: Mo, Mi, Do" },
];

// Kurzstundenraster (z. B. bei extremer Witterung oder Veranstaltungen)
export const kurzstundenData = [
  { period: "1. Stunde", time: "08:15 – 09:00 Uhr" },
  { period: "2. Stunde", time: "09:05 – 09:50 Uhr" },
  { period: "Pause", time: "09:50 – 10:00 Uhr" },
  { period: "3. Stunde", time: "10:00 – 10:45 Uhr" },
  { period: "4. Stunde", time: "10:50 – 11:35 Uhr" },
  { period: "Pause", time: "11:35 – 12:00 Uhr" },
  { period: "5. Stunde", time: "12:05 – 12:50 Uhr" },
];

// Sekretariat – Öffnungszeiten (zentrale Anlaufstelle)
export const sekretariatInfo = {
  hours: [
    { day: "Montag", time: "07:00 – 13:30 Uhr" },
    { day: "Dienstag", time: "07:00 – 13:00 Uhr" },
    { day: "Mittwoch & Donnerstag", time: "07:00 – 15:45 Uhr" },
    { day: "Freitag", time: "07:00 – 13:00 Uhr" },
    { day: "Samstag & Sonntag", time: "Geschlossen" },
  ],
  closedNote: "Täglich von 10:50 – 11:45 Uhr geschlossen.",
};

export const subjects = [
  "Deutsch", "Mathematik", "Englisch", "Biologie", "Chemie", "Physik",
  "Geschichte", "Erdkunde", "Politik/Wirtschaft", "Religionslehre", "Philosophie",
  "Kunst", "Musik", "Sport", "Informatik", "Technik",
];
