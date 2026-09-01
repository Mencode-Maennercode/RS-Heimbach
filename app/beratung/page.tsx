import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import BeratungView from "./BeratungView";

export const metadata: Metadata = pageMetadata({
  title: "Schulberatung & Beratungsteam",
  description:
    "Beratung an der Realschule Am Heimbach Troisdorf: Beratungsteam, feste Sprechzeiten und Berufsorientierung – vertraulich, kostenlos und immer ansprechbar.",
  path: "/beratung",
  keywords: [
    "Schulberatung Troisdorf",
    "Schulsozialarbeit Realschule",
    "Beratungslehrer Rhein-Sieg-Kreis",
    "Berufsorientierung Realschule NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Beratung", path: "/beratung" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <BeratungView />
    </>
  );
}
