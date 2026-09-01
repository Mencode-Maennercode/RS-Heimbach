import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import MensaView from "./MensaView";

export const metadata: Metadata = pageMetadata({
  title: "Mensa & Mittagessen",
  description:
    "Die Mensa der Realschule Am Heimbach Troisdorf: Informationen zum Mittagessen, zu den Preisen und zum Speiseplan für die Mittagspause im Ganztag.",
  path: "/unterricht/mensa",
  keywords: [
    "Mensa Realschule Troisdorf",
    "Mittagessen Ganztagsschule",
    "Speiseplan Schule Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unterricht", path: "/unterricht" },
    { name: "Mensa", path: "/unterricht/mensa" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <MensaView />
    </>
  );
}
