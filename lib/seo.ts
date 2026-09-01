/**
 * Zentrale SEO-Konfiguration.
 *
 * Alles, was Google, Bing und die KI-Crawler (ChatGPT, Claude, Perplexity,
 * Google AI Overviews) ueber diese Schule wissen muessen, steht hier an genau
 * einer Stelle. Aendert sich eine Adresse oder Telefonnummer, wird sie hier
 * gepflegt -- Metadaten, Sitemap, JSON-LD und llms.txt ziehen alle daraus.
 */

import type { Metadata } from "next";
import { schoolInfo, sekretariatInfo } from "@/lib/data";

/** Produktions-Domain. Basis fuer alle Canonicals, OG-Bilder und die Sitemap. */
export const SITE_URL = "https://www.rs-heimbach.de";

/** Klartext-Name, wie ihn Google im Knowledge Panel und KIs in Antworten zitieren sollen. */
export const SITE_NAME = "Realschule Am Heimbach Troisdorf";

/**
 * Geokoordinaten Heimbachstraße 10, 53840 Troisdorf (50.8156 N, 7.1653 O).
 * Wichtig fuer die lokale Sichtbarkeit ("Realschule in meiner Naehe").
 */
export const GEO = { latitude: 50.8156, longitude: 7.1653 } as const;

/**
 * Einzugsgebiet. Google gewichtet `areaServed` bei regionalen Suchanfragen --
 * damit die Schule auch bei "Realschule Rhein-Sieg-Kreis" oder
 * "weiterfuehrende Schule bei Bonn" als oertlich zustaendig erkannt wird.
 *
 * Von der Schule bestaetigt: Neben Troisdorf kommen regelmaessig Kinder aus
 * dem uebrigen Rhein-Sieg-Kreis sowie aus dem Umland von Bonn und Koeln.
 * Bewusst keine einzelnen Nachbarorte -- die sind nicht belegt.
 */
export const AREA_SERVED = ["Troisdorf", "Rhein-Sieg-Kreis", "Bonn", "Köln"] as const;

/** OG-Vorschaubild (1200x630), wird von Google, WhatsApp, Facebook und LinkedIn gezogen. */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Realschule Am Heimbach – städtische Realschule und Ganztagsschule in Troisdorf",
} as const;

/**
 * Sekretariats-Oeffnungszeiten im schema.org-Format. Die Anzeige-Strings aus
 * `sekretariatInfo` sind fuer Menschen gemacht; Suchmaschinen brauchen
 * ISO-Wochentage und 24h-Zeiten, sonst wird das Snippet nicht ausgespielt.
 */
export const OPENING_HOURS = [
  { days: ["Monday"], opens: "07:30", closes: "13:30" },
  { days: ["Tuesday"], opens: "07:30", closes: "13:00" },
  { days: ["Wednesday", "Thursday"], opens: "07:30", closes: "15:45" },
  { days: ["Friday"], opens: "07:30", closes: "13:00" },
] as const;

/**
 * Social-Profile und autoritative Drittquellen. `sameAs` verknuepft die Schule
 * mit ihren Auftritten anderswo im Netz und ist eines der staerksten Signale
 * dafuer, dass Google und KI-Systeme sie als eine bestimmte, reale Einrichtung
 * erkennen (Entity-Erkennung).
 *
 * Nur verifizierte, erreichbare Adressen aufnehmen: ein toter Link hier
 * schwaecht das Signal, statt es zu staerken.
 */
export const SAME_AS = [
  `https://www.instagram.com/${schoolInfo.instagram}/`,
  "https://www.troisdorf.de/de/strukturierte-daten/schulen/weiterfuehrende-schulen/staedtische-realschule-am-heimbach/",
] as const;

/** Absolute URL aus einem internen Pfad -- Canonicals muessen absolut sein. */
export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${SITE_URL}${clean}`;
}

/**
 * Baut die Metadaten einer Unterseite: Titel, Description, Canonical und
 * OpenGraph in einem Rutsch. Jede Seite ruft das auf, damit keine Seite ohne
 * eigenen Titel oder ohne Canonical ausgeliefert wird.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  // Der Markenname gehoert in den OG-Titel, aber nur einmal: Seiten, die ihn
  // schon im eigenen Titel tragen (allen voran die Startseite), bekommen sonst
  // "Realschule Am Heimbach | Realschule Am Heimbach" in der Linkvorschau.
  const ogTitle = title.includes("Am Heimbach")
    ? title
    : `${title} | Realschule Am Heimbach Troisdorf`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "website",
      images: [{ ...OG_IMAGE, url: `${SITE_URL}${OG_IMAGE.url}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [`${SITE_URL}${OG_IMAGE.url}`],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Stabile @id-Werte, damit alle JSON-LD-Bloecke auf dieselbe Entitaet zeigen. */
export const SCHOOL_ID = `${SITE_URL}/#school`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Die Schule als schema.org-Entitaet. Das ist der wichtigste einzelne
 * SEO-Baustein der Seite: Google baut daraus das Knowledge Panel, und
 * KI-Systeme zitieren genau diese Felder, wenn jemand nach einer Realschule in
 * Troisdorf fragt.
 */
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": SCHOOL_ID,
    name: schoolInfo.name,
    alternateName: [
      "Städtische Realschule Am Heimbach",
      "RS Heimbach",
      "Realschule Am Heimbach Troisdorf",
      "Realschule Heimbach",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}${OG_IMAGE.url}`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    // Schulform, Traegerschaft und Zahlen stammen aus lib/data.ts; Abschluss
    // und Jahrgangsstufen sind von der Schule bestaetigt.
    description:
      "Die Städtische Realschule Am Heimbach ist eine gebundene Ganztagsschule in Troisdorf im Rhein-Sieg-Kreis. Rund 590 Schülerinnen und Schüler lernen hier in den Klassen 5 bis 10, begleitet von etwa 55 Lehrkräften, und erwerben den Mittleren Schulabschluss (Fachoberschulreife). Schulträger ist die Stadt Troisdorf.",
    slogan: schoolInfo.motto,
    foundingDate: String(schoolInfo.founded),
    telephone: "+49-2241-77715",
    faxNumber: "+49-2241-75105",
    email: schoolInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolInfo.address,
      postalCode: "53840",
      addressLocality: "Troisdorf",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${schoolInfo.name}, ${schoolInfo.address}, ${schoolInfo.city}`
    )}`,
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Place", name })),
    sameAs: [...SAME_AS],
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "Stadt Troisdorf",
      url: "https://www.troisdorf.de",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: schoolInfo.teachers,
    },
    // Schulform, Abschluss und Jahrgangsstufen explizit -- danach fragen Eltern,
    // und KI-Systeme brauchen es als belastbaren Fakt.
    educationalLevel: "Sekundarstufe I (Klasse 5 bis 10)",
    keywords:
      "Realschule Troisdorf, Ganztagsschule Troisdorf, weiterführende Schule Rhein-Sieg-Kreis, Mittlerer Schulabschluss, Fachoberschulreife",
  };
}

/** Die Website selbst -- verankert Sitename und Sprache fuer Sitelinks. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "de-DE",
    publisher: { "@id": SCHOOL_ID },
  };
}

/**
 * Breadcrumb-Pfad einer Unterseite. Google ersetzt damit die nackte URL im
 * Suchergebnis durch eine lesbare Pfadangabe -- messbar bessere Klickrate.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Sekretariat als schema.org-ContactPoint samt Oeffnungszeiten. */
export function contactPointJsonLd() {
  return {
    "@type": "ContactPoint",
    contactType: "Sekretariat",
    telephone: "+49-2241-77715",
    email: schoolInfo.email,
    availableLanguage: ["de"],
    hoursAvailable: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

/** Menschenlesbare Oeffnungszeiten fuer llms.txt und Textbausteine. */
export const OPENING_HOURS_TEXT = sekretariatInfo.hours
  .map((h) => `${h.day}: ${h.time}`)
  .join(" · ");

/**
 * Schulveranstaltungen als schema.org-Events.
 *
 * Google zeigt korrekt ausgezeichnete Termine als Event-Rich-Result mit Datum
 * direkt im Suchergebnis an -- und KI-Assistenten koennen "Wann ist der Tag der
 * offenen Tuer?" damit ueberhaupt erst beantworten.
 */
export function eventsJsonLd(
  events: {
    id: string;
    title: string;
    date: string;
    endDate?: string;
    time: string;
    location: string;
    description: string;
  }[]
) {
  const place = {
    "@type": "Place",
    name: schoolInfo.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolInfo.address,
      postalCode: "53840",
      addressLocality: "Troisdorf",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
  };

  return events.map((event) => {
    // "13:15 Uhr" oder "13:15 - 15:15 Uhr" -> ISO-Zeitanteil. Ganztaegige
    // Termine bleiben ein reines Datum, so verlangt es schema.org.
    const times = event.time.match(/\d{1,2}:\d{2}/g) ?? [];
    const pad = (t: string) => (t.length === 4 ? `0${t}` : t);
    const startDate = times[0] ? `${event.date}T${pad(times[0])}:00+01:00` : event.date;
    const endRaw = event.endDate ?? event.date;
    const endDate = times[1] ? `${endRaw}T${pad(times[1])}:00+01:00` : event.endDate;

    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      startDate,
      ...(endDate ? { endDate } : {}),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: event.location ? { ...place, name: `${schoolInfo.name} – ${event.location}` } : place,
      organizer: { "@id": SCHOOL_ID },
      ...(event.description ? { description: event.description } : {}),
      url: absoluteUrl("/veranstaltungen"),
      isAccessibleForFree: true,
    };
  });
}
