import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import UnsereSchuleView from "./UnsereSchuleView";

export const metadata: Metadata = pageMetadata({
  title: "Über unsere Realschule",
  description:
    "Die Städtische Realschule Am Heimbach ist gebundene Ganztagsschule in Troisdorf: rund 590 Schülerinnen und Schüler der Klassen 5 bis 10, Leitbild und Schulprofil.",
  path: "/unsere-schule",
  keywords: [
    "Realschule Troisdorf",
    "städtische Realschule Rhein-Sieg-Kreis",
    "Schulprofil Realschule NRW",
    "weiterführende Schule Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <UnsereSchuleView />
    </>
  );
}
