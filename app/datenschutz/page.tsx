import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import DatenschutzView from "./DatenschutzView";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Realschule Am Heimbach Troisdorf nach DSGVO: Welche Daten auf dieser Website verarbeitet werden und welche Rechte Sie haben.",
  path: "/datenschutz",
  noIndex: true,
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Datenschutz", path: "/datenschutz" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <DatenschutzView />
    </>
  );
}
