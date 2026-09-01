import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import LehrerView from "./LehrerView";

export const metadata: Metadata = pageMetadata({
  title: "Kollegium & Lehrkräfte",
  description:
    "Das Kollegium der Realschule Am Heimbach Troisdorf: rund 55 Lehrkräfte mit ihren Fächern und Aufgaben – nach Fach filterbar.",
  path: "/lehrer",
  keywords: [
    "Lehrer Realschule Troisdorf",
    "Kollegium RS Heimbach",
    "Lehrkräfte Realschule Rhein-Sieg-Kreis",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
    { name: "Kollegium", path: "/lehrer" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <LehrerView />
    </>
  );
}
