import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Beim statischen Export (`output: "export"`) muss Next wissen, dass diese
// Route zur Buildzeit einmal erzeugt und als Datei abgelegt wird.
export const dynamic = "force-static";


/**
 * sitemap.xml.
 *
 * Die Prioritaeten bilden ab, worueber Eltern tatsaechlich suchen: Anmeldung,
 * Kontakt und "Was ist das fuer eine Schule" ganz oben, Rechtstexte unten.
 *
 * `lastModified` kommt aus der Datei-Mtime der jeweiligen Seite statt aus dem
 * Build-Zeitpunkt. Wuerden alle Seiten bei jedem Deploy dasselbe Datum melden,
 * wertet Google das Signal als unglaubwuerdig und ignoriert es komplett.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/anmeldung", priority: 0.9, changeFrequency: "weekly" },
  { path: "/unsere-schule", priority: 0.9, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ganztag", priority: 0.8, changeFrequency: "monthly" },
  { path: "/unterricht", priority: 0.8, changeFrequency: "monthly" },
  { path: "/unterricht/faecher", priority: 0.8, changeFrequency: "monthly" },
  { path: "/unsere-schule/schulprogramm", priority: 0.75, changeFrequency: "yearly" },
  { path: "/veranstaltungen", priority: 0.75, changeFrequency: "weekly" },
  { path: "/beratung", priority: 0.7, changeFrequency: "monthly" },
  { path: "/unterricht/schulzeiten", priority: 0.7, changeFrequency: "yearly" },
  { path: "/unterricht/projekte", priority: 0.7, changeFrequency: "monthly" },
  { path: "/krankmeldung", priority: 0.7, changeFrequency: "yearly" },
  { path: "/unsere-schule/sekretariat", priority: 0.7, changeFrequency: "yearly" },
  { path: "/lehrer", priority: 0.65, changeFrequency: "monthly" },
  { path: "/unsere-schule/schulleitung", priority: 0.65, changeFrequency: "yearly" },
  { path: "/unterricht/mensa", priority: 0.6, changeFrequency: "monthly" },
  { path: "/service", priority: 0.6, changeFrequency: "monthly" },
  { path: "/foerderverein", priority: 0.5, changeFrequency: "yearly" },
  { path: "/eltern/schulpflegschaft", priority: 0.5, changeFrequency: "yearly" },
  { path: "/unsere-schule/sv", priority: 0.5, changeFrequency: "yearly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
];

/** Mtime der zur Route gehoerenden page.tsx, mit Build-Zeit als Rueckfallebene. */
function lastModified(route: string): Date {
  const file = path.join(process.cwd(), "app", route === "/" ? "" : route, "page.tsx");
  try {
    return fs.statSync(file).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: lastModified(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
