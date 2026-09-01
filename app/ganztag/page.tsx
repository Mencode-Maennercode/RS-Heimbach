import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import GanztagView from "./GanztagView";

export const metadata: Metadata = pageMetadata({
  title: "Gebundener Ganztag",
  description:
    "Die Realschule Am Heimbach Troisdorf ist gebundene Ganztagsschule: Unterricht und Freizeitgestaltung an Montag, Mittwoch und Donnerstag bis 15:40 Uhr.",
  path: "/ganztag",
  keywords: [
    "Ganztagsschule Troisdorf",
    "gebundener Ganztag Realschule",
    "Ganztagsbetreuung Rhein-Sieg-Kreis",
    "AG Angebot Schule Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Ganztag", path: "/ganztag" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <GanztagView />
    </>
  );
}
