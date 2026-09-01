import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import LeitbildSection from "@/components/home/LeitbildSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import GanztagTeaser from "@/components/home/GanztagTeaser";
import InstagramSection from "@/components/home/InstagramSection";
import ContactSection from "@/components/home/ContactSection";
import JsonLd from "@/components/JsonLd";
import { getCalendarEvents } from "@/lib/calendar";
import { getInstagramPosts } from "@/lib/instagram.server";
import { SITE_URL, contactPointJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Realschule Am Heimbach Troisdorf",
    description:
      "Städtische Realschule und gebundene Ganztagsschule in Troisdorf: rund 590 Schülerinnen und Schüler der Klassen 5 bis 10, Mittlerer Schulabschluss, Anmeldung und Termine.",
    path: "/",
  }),
  // Auf der Startseite steht der Markenname bereits im Titel -- das Suffix aus
  // dem Layout-Template wuerde ihn nur verdoppeln.
  title: {
    absolute: "Realschule Am Heimbach Troisdorf – Städtische Ganztagsschule",
  },
  alternates: { canonical: SITE_URL },
};

// Kein FAQPage-Markup: Google verlangt, dass ausgezeichnete Fragen und
// Antworten auch sichtbar auf der Seite stehen. Ein FAQ-Block allein in den
// strukturierten Daten waere ein Richtlinienverstoss und kann eine manuelle
// Massnahme nach sich ziehen.
const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Realschule Am Heimbach Troisdorf – Städtische Ganztagsschule",
    inLanguage: "de-DE",
    about: { "@id": `${SITE_URL}/#school` },
    primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
    contactPoint: contactPointJsonLd(),
  },
];

export default async function Home() {
  const events = await getCalendarEvents();
  const instagramPosts = await getInstagramPosts(10);
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HeroSection />
      <StatsSection />
      <LeitbildSection />
      <NewsSection />
      <InstagramSection posts={instagramPosts} />
      <EventsSection events={events.slice(0, 6)} />
      <GanztagTeaser />
      <ContactSection />
    </>
  );
}
