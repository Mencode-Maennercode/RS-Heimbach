import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SchulzeitenView from "./SchulzeitenView";

export const metadata: Metadata = pageMetadata({
  title: "Schulzeiten & Stundenraster",
  description:
    "Schulzeiten der Realschule Am Heimbach Troisdorf: Unterrichtsbeginn 8:15 Uhr, Stundenraster mit allen Pausen und die Ganztage bis 15:40 Uhr.",
  path: "/unterricht/schulzeiten",
  keywords: [
    "Schulzeiten Realschule Troisdorf",
    "Stundenplan Ganztagsschule",
    "Unterrichtszeiten Schule Rhein-Sieg-Kreis",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unterricht", path: "/unterricht" },
    { name: "Schulzeiten", path: "/unterricht/schulzeiten" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SchulzeitenView />
    </>
  );
}
