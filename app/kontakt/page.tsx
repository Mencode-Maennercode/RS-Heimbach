import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  SCHOOL_ID,
  absoluteUrl,
  breadcrumbJsonLd,
  contactPointJsonLd,
  pageMetadata,
} from "@/lib/seo";
import KontaktView from "./KontaktView";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt & Anfahrt",
  description:
    "Kontakt zur Realschule Am Heimbach Troisdorf: Heimbachstraße 10, 53840 Troisdorf, Telefon 02241 77715. Öffnungszeiten des Sekretariats, E-Mail, Anfahrt und Ansprechpartner.",
  path: "/kontakt",
  keywords: [
    "Realschule Am Heimbach Kontakt",
    "Realschule Troisdorf Telefon",
    "Heimbachstraße 10 Troisdorf",
    "Schule Troisdorf Anfahrt",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Kontakt", path: "/kontakt" },
]);

// Eigener ContactPage-Typ mit Sekretariats-Zeiten: damit beantwortet Google
// die haeufige Anfrage "Realschule Am Heimbach Telefon / Oeffnungszeiten"
// direkt im Suchergebnis.
const contactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absoluteUrl("/kontakt"),
  name: "Kontakt & Anfahrt – Realschule Am Heimbach Troisdorf",
  inLanguage: "de-DE",
  about: { "@id": SCHOOL_ID },
  mainEntity: { "@id": SCHOOL_ID },
  contactPoint: contactPointJsonLd(),
};

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumb, contactPage]} />
      <KontaktView />
    </>
  );
}
