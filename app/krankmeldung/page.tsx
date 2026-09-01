import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import KrankmeldungView from "./KrankmeldungView";

export const metadata: Metadata = pageMetadata({
  title: "Krankmeldung",
  description:
    "Krankmeldung an der Realschule Am Heimbach Troisdorf: Ihr Kind bitte am selben Tag bis 8:00 Uhr über das Online-Formular abmelden. Ablauf und Fristen.",
  path: "/krankmeldung",
  keywords: [
    "Krankmeldung Realschule Troisdorf",
    "Schule krankmelden online",
    "Entschuldigung Schule NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Krankmeldung", path: "/krankmeldung" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <KrankmeldungView />
    </>
  );
}
