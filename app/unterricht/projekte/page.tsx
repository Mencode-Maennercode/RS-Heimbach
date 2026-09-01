import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ProjekteView from "./ProjekteView";

export const metadata: Metadata = pageMetadata({
  title: "Projekte & Programme",
  description:
    "Projekte der Realschule Am Heimbach Troisdorf: Ankommen und Gemeinschaft, Verantwortung, Stärken entdecken, Praxiserfahrung, Prävention und Abschluss.",
  path: "/unterricht/projekte",
  keywords: [
    "Schulprojekte Troisdorf",
    "Berufsorientierung Realschule NRW",
    "Prävention Schule Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unterricht", path: "/unterricht" },
    { name: "Projekte & Programme", path: "/unterricht/projekte" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <ProjekteView />
    </>
  );
}
