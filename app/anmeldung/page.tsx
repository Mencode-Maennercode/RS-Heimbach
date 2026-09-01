import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import AnmeldungView from "./AnmeldungView";

export const metadata: Metadata = pageMetadata({
  title: "Anmeldung Klasse 5",
  description:
    "Anmeldung zur Klasse 5 an der Realschule Am Heimbach Troisdorf: Termine, benötigte Unterlagen und Ablauf. Nur nach vorheriger Terminvereinbarung.",
  path: "/anmeldung",
  keywords: [
    "Anmeldung Realschule Troisdorf",
    "Schulanmeldung Klasse 5 Troisdorf",
    "weiterführende Schule anmelden Rhein-Sieg-Kreis",
    "Anmeldetermine Realschule NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Anmeldung", path: "/anmeldung" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <AnmeldungView />
    </>
  );
}
