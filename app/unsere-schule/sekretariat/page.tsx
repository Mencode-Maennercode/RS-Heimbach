import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SekretariatView from "./SekretariatView";

export const metadata: Metadata = pageMetadata({
  title: "Sekretariat & Öffnungszeiten",
  description:
    "Das Sekretariat der Realschule Am Heimbach Troisdorf ist Mo–Fr ab 7:30 Uhr erreichbar. Öffnungszeiten, Telefon 02241 77715 und Ansprechpartnerinnen.",
  path: "/unsere-schule/sekretariat",
  keywords: [
    "Sekretariat Realschule Troisdorf",
    "Öffnungszeiten Schule Troisdorf",
    "Realschule Am Heimbach Telefon",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Unsere Schule", path: "/unsere-schule" },
    { name: "Sekretariat", path: "/unsere-schule/sekretariat" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SekretariatView />
    </>
  );
}
