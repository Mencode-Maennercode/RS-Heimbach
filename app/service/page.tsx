import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ServiceView from "./ServiceView";

export const metadata: Metadata = pageMetadata({
  title: "Service & Downloads",
  description:
    "Service der Realschule Am Heimbach Troisdorf: Überblick über die Schulformen in Troisdorf, die Schulverwaltung und die Bildungsangebote der Stadt.",
  path: "/service",
  keywords: [
    "Schulformen Troisdorf",
    "Schulverwaltung Troisdorf",
    "weiterführende Schulen Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Service & Downloads", path: "/service" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <ServiceView />
    </>
  );
}
