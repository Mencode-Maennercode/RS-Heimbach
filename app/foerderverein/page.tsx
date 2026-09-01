import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import FoerdervereinView from "./FoerdervereinView";

export const metadata: Metadata = pageMetadata({
  title: "Förderverein",
  description:
    "Der Förderverein der Realschule Am Heimbach Troisdorf: wie er die Schule unterstützt und wie Eltern und Freunde der Schule mitwirken können.",
  path: "/foerderverein",
  keywords: [
    "Förderverein Realschule Troisdorf",
    "Schulförderverein Rhein-Sieg-Kreis",
    "Schule unterstützen Troisdorf",
  ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Förderverein", path: "/foerderverein" },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <FoerdervereinView />
    </>
  );
}
