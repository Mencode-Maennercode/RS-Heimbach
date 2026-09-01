import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import FaecherView from "./FaecherView";

export const metadata: Metadata = pageMetadata({
  title: "Fächer & Differenzierung",
  description:
    "Das Fächerangebot der Realschule Am Heimbach Troisdorf: die Hauptfächer und die sechs Differenzierungsfächer, die ab Klasse 7 gewählt werden können.",
  path: "/unterricht/faecher",
  keywords: [
    "Wahlpflichtfach Realschule NRW",
    "Differenzierung Klasse 7 Realschule",
    "Fächer Realschule Troisdorf",
    "Französisch Realschule Rhein-Sieg-Kreis",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unterricht", path: "/unterricht" },
    { name: "Fächer & Differenzierung", path: "/unterricht/faecher" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <FaecherView />
    </>
  );
}
