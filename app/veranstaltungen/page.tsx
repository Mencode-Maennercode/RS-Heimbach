import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getCalendarEvents } from "@/lib/calendar";
import { breadcrumbJsonLd, eventsJsonLd, pageMetadata } from "@/lib/seo";
import VeranstaltungenView from "./VeranstaltungenView";

export const metadata: Metadata = pageMetadata({
  title: "Termine & Veranstaltungen",
  description:
    "Alle Termine der Realschule Am Heimbach Troisdorf im Überblick – direkt aus dem Schulkalender, mit Datum, Uhrzeit und Ort jeder Veranstaltung.",
  path: "/veranstaltungen",
  keywords: [
    "Termine Realschule Troisdorf",
    "Schulkalender Realschule Troisdorf",
    "Veranstaltungen Schule Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([{ name: "Termine", path: "/veranstaltungen" }]);

// Termine werden beim statischen Build aus der Nextcloud-.ics geholt und
// eingebacken. Aktualisierung erfolgt ueber den geplanten Rebuild (GitHub Action).
export default async function VeranstaltungenPage() {
  const events = await getCalendarEvents();

  // Nur kommende Termine auszeichnen: vergangene Events im JSON-LD wertet
  // Google als veraltete Daten und stellt das Rich Result dann ganz ein.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today).slice(0, 40);

  return (
    <>
      <JsonLd data={[breadcrumb, ...eventsJsonLd(upcoming)]} />
      <VeranstaltungenView events={events} />
    </>
  );
}
