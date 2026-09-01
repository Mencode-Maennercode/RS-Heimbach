import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SchulprogrammView from "./SchulprogrammView";

export const metadata: Metadata = pageMetadata({
  title: "Schulprogramm & Leitbild",
  description:
    "Das Schulprogramm der Realschule Am Heimbach Troisdorf: Schwerpunkte der Schulentwicklung – individuelle Förderung, Gemeinschaft, Kreativität, digitale Bildung.",
  path: "/unsere-schule/schulprogramm",
  keywords: [
    "Schulprogramm Realschule Troisdorf",
    "Leitbild Schule NRW",
    "pädagogisches Konzept Realschule",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
    { name: "Schulprogramm", path: "/unsere-schule/schulprogramm" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SchulprogrammView />
    </>
  );
}
