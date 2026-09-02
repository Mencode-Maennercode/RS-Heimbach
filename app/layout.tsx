import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  GEO,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  schoolJsonLd,
  webSiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Pflicht fuer korrekte Canonicals und absolute OG-Bild-URLs. Ohne
  // metadataBase erzeugt Next relative og:image-Pfade, die Google, WhatsApp
  // und LinkedIn nicht aufloesen koennen.
  metadataBase: new URL(SITE_URL),
  title: {
    // Der wichtigste Titel der Seite: Marke + Schulform + Ort. "Realschule
    // Troisdorf" ist die Suchanfrage, auf die diese Seite ranken muss.
    default: "Realschule Am Heimbach Troisdorf – Städtische Ganztagsschule",
    template: "%s | Realschule Am Heimbach Troisdorf",
  },
  description:
    "Städtische Realschule und gebundene Ganztagsschule in Troisdorf: rund 590 Schülerinnen und Schüler der Klassen 5 bis 10, Mittlerer Schulabschluss, Anmeldung und Termine.",
  applicationName: SITE_NAME,
  authors: [{ name: "Realschule Am Heimbach", url: SITE_URL }],
  creator: "Realschule Am Heimbach",
  publisher: "Realschule Am Heimbach",
  category: "education",
  keywords: [
    "Realschule Troisdorf",
    "Realschule Am Heimbach",
    "RS Heimbach",
    "Ganztagsschule Troisdorf",
    "weiterführende Schule Troisdorf",
    "Städtische Realschule Troisdorf",
    "Realschule Rhein-Sieg-Kreis",
    "weiterführende Schule Rhein-Sieg-Kreis",
    "Schule Troisdorf Anmeldung Klasse 5",
    "Mittlerer Schulabschluss Troisdorf",
    "Fachoberschulreife NRW",
    "Realschule Raum Bonn",
    "Realschule Raum Köln",
  ],
  alternates: {
    canonical: SITE_URL,
    types: {
      // Der Termin-Feed macht Schulveranstaltungen fuer Aggregatoren und
      // Kalender-Apps auffindbar.
      "application/rss+xml": `${SITE_URL}/veranstaltungen/`,
    },
  },
  openGraph: {
    title: "Realschule Am Heimbach Troisdorf – Städtische Ganztagsschule",
    description:
      "Gebundene Ganztagsschule in Troisdorf mit rund 590 Schülerinnen und Schülern. Klassen 5 bis 10, Mittlerer Schulabschluss.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "de_DE",
    images: [{ ...OG_IMAGE, url: `${SITE_URL}${OG_IMAGE.url}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Realschule Am Heimbach Troisdorf",
    description:
      "Städtische Realschule und gebundene Ganztagsschule in Troisdorf. Klassen 5 bis 10, Mittlerer Schulabschluss.",
    images: [`${SITE_URL}${OG_IMAGE.url}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Grosse Bildvorschau und ungekuerzte Snippets in den Suchergebnissen --
      // ohne diese Freigaben kuerzt Google Snippets auf ca. 160 Zeichen und
      // zeigt nur Thumbnails.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    // Klassische Geo-Meta-Tags. Google wertet sie nicht mehr aus, diverse
    // regionale Verzeichnisse und Schulportale dagegen schon.
    "geo.region": "DE-NW",
    "geo.placename": "Troisdorf",
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
  verification: {
    google: "tfYXURak1Pb7Kjm-dbtowgbLDGI3eh8X-m9B_pJEmeM",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a5a54",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        {/* Schule und Website als schema.org-Entitaeten -- global, damit jede
            Unterseite auf dieselbe Entitaet verweisen kann. */}
        <JsonLd data={[schoolJsonLd(), webSiteJsonLd()]} />
      </head>
      <body className="antialiased bg-white text-slate-900">
        <Navigation />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
