import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SchulleitungView from "./SchulleitungView";

export const metadata: Metadata = pageMetadata({
  title: "Schulleitung",
  description:
    "Die Schulleitung der Realschule Am Heimbach Troisdorf: Schulleitung und Teamleitung mit ihren Aufgabenbereichen und Kontaktmöglichkeiten.",
  path: "/unsere-schule/schulleitung",
  keywords: [
    "Schulleitung Realschule Troisdorf",
    "Schulleiter RS Heimbach",
    "Rektorat Realschule NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
    { name: "Schulleitung", path: "/unsere-schule/schulleitung" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SchulleitungView />
    </>
  );
}
