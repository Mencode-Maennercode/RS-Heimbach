import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import UnterrichtView from "./UnterrichtView";

export const metadata: Metadata = pageMetadata({
  title: "Unterricht & Bildungsgang",
  description:
    "Unterricht an der Realschule Am Heimbach Troisdorf: Bildungsgang von Klasse 5 bis 10, Differenzierung ab Klasse 7 und der Weg zum Mittleren Schulabschluss.",
  path: "/unterricht",
  keywords: [
    "Unterricht Realschule Troisdorf",
    "Bildungsgang Realschule NRW",
    "Mittlerer Schulabschluss Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unterricht", path: "/unterricht" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <UnterrichtView />
    </>
  );
}
