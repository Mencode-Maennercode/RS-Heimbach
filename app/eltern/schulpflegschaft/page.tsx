import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import SchulpflegschaftView from "./SchulpflegschaftView";

export const metadata: Metadata = pageMetadata({
  title: "Schulpflegschaft",
  description:
    "Die Schulpflegschaft der Realschule Am Heimbach Troisdorf: Elternvertretung, Aufgaben und Ansprechpartner für Eltern der Schule im Überblick.",
  path: "/eltern/schulpflegschaft",
  keywords: [
    "Schulpflegschaft Troisdorf",
    "Elternvertretung Realschule",
    "Elternmitwirkung NRW",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Schulpflegschaft", path: "/eltern/schulpflegschaft" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <SchulpflegschaftView />
    </>
  );
}
