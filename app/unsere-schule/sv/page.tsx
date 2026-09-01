import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SvView from "./SvView";

export const metadata: Metadata = pageMetadata({
  title: "Schülervertretung (SV)",
  description:
    "Die Schülervertretung der Realschule Am Heimbach Troisdorf: die SV, ihre Ansprechpartner und wie Schülerinnen und Schüler ihre Schule mitgestalten.",
  path: "/unsere-schule/sv",
  keywords: [
    "Schülervertretung Troisdorf",
    "SV Realschule",
    "Schülersprecher NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
    { name: "Schülervertretung", path: "/unsere-schule/sv" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SvView />
    </>
  );
}
