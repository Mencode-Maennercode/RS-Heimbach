import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ImpressumView from "./ImpressumView";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description:
    "Impressum der Realschule Am Heimbach Troisdorf: Anschrift, Kontakt, Schulträger und Verantwortliche nach § 5 TMG.",
  path: "/impressum",
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Impressum", path: "/impressum" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <ImpressumView />
    </>
  );
}
